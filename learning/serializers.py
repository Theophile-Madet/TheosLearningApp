from rest_framework import serializers

from content.models import Word


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = "__all__"


class GetNextWordSerializer(serializers.Serializer):
    word = WordSerializer()
    rank = serializers.IntegerField()
    nb_answers_total = serializers.IntegerField()
    nb_answers_correct = serializers.IntegerField()
    nb_answers_correct_in_a_row = serializers.IntegerField()


class WasAnswerCorrectSerializer(serializers.Serializer):
    correct = serializers.BooleanField()
    learned = serializers.BooleanField()
    nb_answers_correct_in_a_row = serializers.IntegerField()
    repetitions_to_learn = serializers.IntegerField()


class SendAnswerSerializer(serializers.Serializer):
    word_id = serializers.IntegerField()
    answer = serializers.CharField()


class MarkWordAsInvalidSerializer(serializers.Serializer):
    word_id = serializers.IntegerField()


class MarkAnswerAsWrongSerializer(serializers.Serializer):
    word_id = serializers.IntegerField()


class CsrfTokenSerializer(serializers.Serializer):
    csrf_token = serializers.CharField()
