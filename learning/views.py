from django.contrib.auth.models import User
from django.middleware import csrf
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from drf_spectacular.utils import extend_schema
from rest_framework import status, permissions
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from content.models import Word, PokemonName
from german_words.services.german_word_question_builder import GermanWordQuestionBuilder
from german_words.services.word_learned_checker import WordLearnedChecker
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
    QuestionSerializer,
    SendAnswerPokemonNameSerializer,
    WasAnswerCorrectPokemonNameSerializer,
    OptionsSerializer,
    OptionGroupSerializer,
    OptionSerializer,
    SetOptionRequestSerializer,
)
from learning.services.options_manager import OptionsManager
from learning.services.question_type_picker import QuestionTypePicker
from pokemon_names.services.pokemon_name_learned_checker import (
    PokemonNameLearnedChecker,
)
from pokemon_names.services.pokemon_name_question_builder import (
    PokemonNameQuestionBuilder,
)


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
        question_type = QuestionTypePicker.get_next_question_type(request.user)
        if question_type == QuestionSerializer.Type.GERMAN_WORD:
            serializer = (
                GermanWordQuestionBuilder.build_german_word_question_serializer(
                    request.user
                )
            )
        elif question_type == QuestionSerializer.Type.POKEMON_NAME:
            serializer = (
                PokemonNameQuestionBuilder.build_pokemon_name_question_serializer(
                    request.user
                )
            )
        else:
            raise NotImplementedError(f"Unknown question type: {question_type}")

        return Response(serializer.data, status=status.HTTP_200_OK)


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


class GetOptions(APIView):
    @extend_schema(
        responses={200: OptionsSerializer},
    )
    def get(self, request):
        options_by_group = {}
        for provider in OptionsManager.option_providers:
            for user_option in provider():
                if user_option.group_name not in options_by_group.keys():
                    options_by_group[user_option.group_name] = []

                options_by_group[user_option.group_name].append(user_option)

        groups = [
            self.build_option_group_data(request.user, group_name, options_in_group)
            for group_name, options_in_group in options_by_group.items()
        ]

        serializer = OptionsSerializer({"groups": groups})

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @classmethod
    def build_option_group_data(cls, user: User, group_name, options_in_group):
        options = [
            cls.build_option_data(user, user_option) for user_option in options_in_group
        ]

        return OptionGroupSerializer({"name": group_name, "options": options}).data

    @staticmethod
    def build_option_data(user: User, user_option: OptionsManager.UserOption):
        return OptionSerializer(
            {
                "key": user_option.key,
                "display_name": user_option.display_name,
                "enabled": OptionsManager.is_option_enabled(user, user_option),
            }
        ).data


class SetOption(APIView):
    @extend_schema(
        responses={200: None},
        request=SetOptionRequestSerializer,
    )
    def post(self, request):
        request_serializer = SetOptionRequestSerializer(data=request.data)
        request_serializer.is_valid(raise_exception=True)

        user_option = self.get_option_with_key(
            request_serializer.validated_data["option_key"]
        )

        if not user_option:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_option.update_handler(
            request.user,
            user_option,
            request_serializer.validated_data["enabled"],
        )

        return Response(status=status.HTTP_200_OK)

    @staticmethod
    def get_option_with_key(key: str):
        for provider in OptionsManager.option_providers:
            for user_option in provider():
                if user_option.key == key:
                    return user_option

        return None
