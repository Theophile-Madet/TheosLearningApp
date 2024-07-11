from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from content.models import Word
from learning.models import Result, InvalidWord, LearnedWord
from learning.serializers import (
    WordSerializer,
    WasAnswerCorrectSerializer,
    SendAnswerSerializer,
    MarkWordAsInvalidSerializer,
)
from learning.services.WordLearnedChecker import WordLearnedChecker
from learning.services.WordToLearnPicker import WordToLearnPicker


class GetNextWord(APIView):
    @extend_schema(
        responses={200: WordSerializer},
    )
    def get(self, request):
        word = WordToLearnPicker.pick_next_word_for_user(request.user)
        return Response(WordSerializer(word).data, status=status.HTTP_200_OK)


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

        if WordLearnedChecker.is_word_learned(request.user, word):
            LearnedWord.objects.create(user=request.user, word=word)

        return Response(
            WasAnswerCorrectSerializer({"correct": answer == word.gender}).data,
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
