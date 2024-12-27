from django.middleware import csrf
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from drf_spectacular.utils import extend_schema
from rest_framework import status, permissions
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from content.models import Word
from learning.apps import LearningConfig
from learning.models import Result, InvalidWord, LearnedWord, WrongAnswer
from learning.serializers import (
    WasAnswerCorrectSerializer,
    SendAnswerSerializer,
    MarkWordAsInvalidSerializer,
    MarkAnswerAsWrongSerializer,
    CsrfTokenSerializer,
    GermanWordQuestionContentSerializer,
    QuestionSerializer,
    QuestionStatsSerializer,
)
from learning.services.WordLearnedChecker import WordLearnedChecker
from learning.services.WordToLearnPicker import WordToLearnPicker


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
        word, rank = WordToLearnPicker.pick_next_word_for_user(request.user)
        total_answers = Result.objects.filter(user=request.user, word=word)
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
        serializer = QuestionSerializer(
            {
                "question_type": QuestionSerializer.Type.GERMAN_WORD,
                "german_word_content": word_question_serializer.data,
                "stats": stats_serializer.data,
            }
        )
        return Response(serializer.data, status=status.HTTP_200_OK)


class SendAnswer(APIView):
    @extend_schema(
        responses={200: WasAnswerCorrectSerializer},
        request=SendAnswerSerializer,
    )
    def post(self, request):
        request_serializer = SendAnswerSerializer(data=request.data)
        request_serializer.is_valid(raise_exception=True)

        answer = request_serializer.validated_data["answer"]
        word = get_object_or_404(Word, id=request_serializer.validated_data["word_id"])
        Result.objects.create(answer=answer, word=word, user=request.user)

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
