from django.db import models
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from content.models import Word


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = "__all__"


class GermanWordQuestionContentSerializer(serializers.Serializer):
    word = WordSerializer()
    rank = serializers.IntegerField()


class WasAnswerCorrectSerializer(serializers.Serializer):
    correct = serializers.BooleanField()
    learned = serializers.BooleanField()
    nb_answers_correct_in_a_row = serializers.IntegerField()
    repetitions_to_learn = serializers.IntegerField()


class SendAnswerGermanWordSerializer(serializers.Serializer):
    word_id = serializers.IntegerField()
    answer = serializers.CharField()


class SendAnswerPokemonNameSerializer(serializers.Serializer):
    pokemon_id = serializers.IntegerField()
    answer = serializers.CharField()
    expected_language_id = serializers.IntegerField()
    given_language_id = serializers.IntegerField()


class WasAnswerCorrectPokemonNameSerializer(serializers.Serializer):
    was_correct_given_language = WasAnswerCorrectSerializer(allow_null=True)
    was_correct_expected_language = WasAnswerCorrectSerializer()


class MarkWordAsInvalidSerializer(serializers.Serializer):
    word_id = serializers.IntegerField()


class MarkAnswerAsWrongSerializer(serializers.Serializer):
    word_id = serializers.IntegerField()


class CsrfTokenSerializer(serializers.Serializer):
    csrf_token = serializers.CharField()


class QuestionStatsSerializer(serializers.Serializer):
    nb_answers_total = serializers.IntegerField()
    nb_answers_correct = serializers.IntegerField()
    nb_answers_correct_in_a_row = serializers.IntegerField()


class PokemonNameQuestionContentSerializer(serializers.Serializer):
    pokemon_id = serializers.IntegerField()
    given_name = serializers.CharField()
    given_language_id = serializers.IntegerField()
    given_language_name = serializers.CharField()
    expected_name = serializers.CharField()
    expected_language_id = serializers.IntegerField()
    expected_language_name = serializers.CharField()


class QuestionSerializer(serializers.Serializer):
    class Type(models.TextChoices):
        POKEMON_NAME = "pokemon_name", _("Pokemon name")
        GERMAN_WORD = "german_word", _("German word")

    question_type = serializers.ChoiceField(choices=Type)
    german_word_content = GermanWordQuestionContentSerializer(allow_null=True)
    pokemon_name_content = PokemonNameQuestionContentSerializer(allow_null=True)
    stats = QuestionStatsSerializer()
