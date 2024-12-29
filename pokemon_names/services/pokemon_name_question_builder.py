import random

from content.models import PokemonName, Language
from learning.serializers import (
    QuestionStatsSerializer,
    PokemonNameQuestionContentSerializer,
    QuestionSerializer,
)
from pokemon_names.services.pokemon_picker import PokemonPicker


class PokemonNameQuestionBuilder:
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
