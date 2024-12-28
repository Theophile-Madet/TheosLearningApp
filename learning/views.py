import random

from django.middleware import csrf
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from drf_spectacular.utils import extend_schema
from rest_framework import status, permissions
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from content.models import Word, PokemonName, Language
from learning.apps import LearningConfig
from learning.models import (
    InvalidWord,
    LearnedWord,
    WrongAnswer,
    GermanWordResult,
    PokemonNameResult,
    LearnedPokemonName,
)
from learning.serializers import (
    WasAnswerCorrectSerializer,
    SendAnswerGermanWordSerializer,
    MarkWordAsInvalidSerializer,
    MarkAnswerAsWrongSerializer,
    CsrfTokenSerializer,
    GermanWordQuestionContentSerializer,
    QuestionSerializer,
    QuestionStatsSerializer,
    PokemonNameQuestionContentSerializer,
    SendAnswerPokemonNameSerializer,
    WasAnswerCorrectPokemonNameSerializer,
)
from learning.services.german_words.word_learned_checker import WordLearnedChecker
from learning.services.german_words.word_to_learn_picker import WordToLearnPicker
from learning.services.pokemon_names.pokemon_name_learned_checker import (
    PokemonNameLearnedChecker,
)
from learning.services.pokemon_names.pokemon_picker import PokemonPicker
from learning.services.question_type_picker import QuestionTypePicker


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    @extend_schema(responses={200: CsrfTokenSerializer})
    def get(self, request):
        token = csrf.get_token(request)
        return Response(
            CsrfTokenSerializer({"csrf_token": token}).data, status=status.HTTP_200_OK
        )


class GetNextQuestion(APIView):
    @extend_schema(
        responses={200: QuestionSerializer},
    )
    def get(self, request):
        question_type = QuestionTypePicker.get_next_question_type()
        if question_type == QuestionSerializer.Type.GERMAN_WORD:
            serializer = self.build_german_word_question_serializer(request)
        elif question_type == QuestionSerializer.Type.POKEMON_NAME:
            serializer = self.build_pokemon_name_question_serializer(request)
        else:
            raise NotImplementedError(f"Unknown question type: {question_type}")

        return Response(serializer.data, status=status.HTTP_200_OK)

    @staticmethod
    def build_pokemon_name_question_serializer(request):
        pokemon = PokemonPicker.get_next_pokemon()
        allowed_languages = ["en", "fr", "de"]
        given_language = random.choice(allowed_languages)
        expected_language = random.choice(
            [language for language in allowed_languages if language != given_language]
        )
        stats_serializer = QuestionStatsSerializer(
            {
                "nb_answers_total": 999,
                "nb_answers_correct": 888,
                "nb_answers_correct_in_a_row": 777,
            }
        )
        pokemon_question_serializer = PokemonNameQuestionContentSerializer(
            {
                "pokemon_id": pokemon.id,
                "given_name": PokemonName.objects.get(
                    pokemon=pokemon, language__short_name=given_language
                ).name,
                "given_language_id": Language.objects.get(short_name=given_language).id,
                "given_language_name": Language.objects.get(
                    short_name=given_language
                ).full_name,
                "expected_name": PokemonName.objects.get(
                    pokemon=pokemon, language__short_name=expected_language
                ).name,
                "expected_language_id": Language.objects.get(
                    short_name=expected_language
                ).id,
                "expected_language_name": Language.objects.get(
                    short_name=expected_language
                ).full_name,
            }
        )
        return QuestionSerializer(
            {
                "question_type": QuestionSerializer.Type.POKEMON_NAME,
                "pokemon_name_content": pokemon_question_serializer.data,
                "stats": stats_serializer.data,
            }
        )

    @staticmethod
    def build_german_word_question_serializer(request):
        word, rank = WordToLearnPicker.pick_next_word_for_user(request.user)
        total_answers = GermanWordResult.objects.filter(user=request.user, word=word)
        word_question_serializer = GermanWordQuestionContentSerializer(
            {
                "word": word,
                "rank": rank,
            }
        )
        stats_serializer = QuestionStatsSerializer(
            {
                "nb_answers_total": total_answers.count(),
                "nb_answers_correct": total_answers.filter(answer=word.gender).count(),
                "nb_answers_correct_in_a_row": WordLearnedChecker.nb_correct_in_a_row(
                    request.user, word
                ),
            }
        )
        return QuestionSerializer(
            {
                "question_type": QuestionSerializer.Type.GERMAN_WORD,
                "german_word_content": word_question_serializer.data,
                "stats": stats_serializer.data,
            }
        )


class SendAnswerGermanWord(APIView):
    @extend_schema(
        responses={200: WasAnswerCorrectSerializer},
        request=SendAnswerGermanWordSerializer,
    )
    def post(self, request):
        request_serializer = SendAnswerGermanWordSerializer(data=request.data)
        request_serializer.is_valid(raise_exception=True)

        answer = request_serializer.validated_data["answer"]
        word = get_object_or_404(Word, id=request_serializer.validated_data["word_id"])
        GermanWordResult.objects.create(answer=answer, word=word, user=request.user)

        learned = False
        if WordLearnedChecker.is_word_learned(request.user, word):
            learned = True
            LearnedWord.objects.create(user=request.user, word=word)

        return Response(
            WasAnswerCorrectSerializer(
                {
                    "correct": answer == word.gender,
                    "learned": learned,
                    "nb_answers_correct_in_a_row": WordLearnedChecker.nb_correct_in_a_row(
                        request.user, word
                    ),
                    "repetitions_to_learn": LearningConfig.REPETITIONS_TO_LEARN,
                }
            ).data,
            status=status.HTTP_200_OK,
        )


class SendAnswerPokemonName(APIView):
    @extend_schema(
        responses={200: WasAnswerCorrectPokemonNameSerializer},
        request=SendAnswerPokemonNameSerializer,
    )
    def post(self, request):
        request_serializer = SendAnswerPokemonNameSerializer(data=request.data)
        request_serializer.is_valid(raise_exception=True)

        given_answer = request_serializer.validated_data["answer"]
        pokemon_id = request_serializer.validated_data["pokemon_id"]
        expected_language_id = request_serializer.validated_data["expected_language_id"]
        given_language_id = request_serializer.validated_data["given_language_id"]

        was_correct_data_expected_language = (
            self.create_result_and_check_learned_status(
                pokemon_id=pokemon_id,
                language_id=expected_language_id,
                given_answer=given_answer,
                user=request.user,
            )
        )

        was_correct_data_given_language = None
        if was_correct_data_expected_language["correct"]:
            was_correct_data_given_language = (
                self.create_result_and_check_learned_status(
                    pokemon_id=pokemon_id,
                    language_id=given_language_id,
                    given_answer=PokemonName.objects.get(
                        pokemon=pokemon_id, language=given_language_id
                    ).name,
                    user=request.user,
                )
            )

        return Response(
            WasAnswerCorrectPokemonNameSerializer(
                {
                    "was_correct_given_language": was_correct_data_given_language,
                    "was_correct_expected_language": was_correct_data_expected_language,
                }
            ).data,
            status=status.HTTP_200_OK,
        )

    @staticmethod
    def create_result_and_check_learned_status(
        pokemon_id, language_id, given_answer, user
    ):
        PokemonNameResult.objects.create(
            answer=given_answer,
            pokemon_id=pokemon_id,
            language_id=language_id,
            user=user,
        )

        learned = False
        if PokemonNameLearnedChecker.is_pokemon_name_learned(
            user, pokemon_id, language_id
        ):
            learned = True
            LearnedPokemonName.objects.create(
                user=user, pokemon_id=pokemon_id, language_id=language_id
            )

        correct_answer = PokemonName.objects.get(
            pokemon_id=pokemon_id,
            language_id=language_id,
        ).name

        return WasAnswerCorrectSerializer(
            {
                "correct": given_answer == correct_answer,
                "learned": learned,
                "nb_answers_correct_in_a_row": PokemonNameLearnedChecker.nb_correct_in_a_row(
                    user=user, pokemon_id=pokemon_id, language_id=language_id
                ),
                "repetitions_to_learn": LearningConfig.REPETITIONS_TO_LEARN,
            }
        ).data


class MarkWordAsInvalid(APIView):
    @extend_schema(
        responses={200: None},
        request=MarkWordAsInvalidSerializer,
    )
    def post(self, request):
        request_serializer = MarkWordAsInvalidSerializer(data=request.data)
        request_serializer.is_valid(raise_exception=True)

        word = get_object_or_404(Word, id=request_serializer.validated_data["word_id"])
        InvalidWord.objects.create(word=word)
        return Response(status=status.HTTP_200_OK)


class MarkAnswerAsWrong(APIView):
    @extend_schema(
        responses={200: None},
        request=MarkAnswerAsWrongSerializer,
    )
    def post(self, request):
        request_serializer = MarkAnswerAsWrongSerializer(data=request.data)
        request_serializer.is_valid(raise_exception=True)

        word = get_object_or_404(Word, id=request_serializer.validated_data["word_id"])
        WrongAnswer.objects.create(word=word)
        return Response(status=status.HTTP_200_OK)
