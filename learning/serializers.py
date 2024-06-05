from rest_framework import serializers

from content.models import Word


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = "__all__"


class WasAnswerCorrectSerializer(serializers.Serializer):
    correct = serializers.BooleanField()


class SendAnswerSerializer(serializers.Serializer):
    word_id = serializers.IntegerField()
    answer = serializers.CharField()


class MarkWordAsInvalidSerializer(serializers.Serializer):
    word_id = serializers.IntegerField()
