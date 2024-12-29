class GetAvailableLanguages(APIView):
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
