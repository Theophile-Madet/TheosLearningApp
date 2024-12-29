from django.contrib.auth.models import User

from content.models import PokemonName, Pokemon, Language
from learning.models import PokemonNameResult
from learning.serializers import (
    QuestionStatsSerializer,
    PokemonNameQuestionContentSerializer,
    QuestionSerializer,
)
from pokemon_names.services.language_picker import LanguagePicker
from pokemon_names.services.pokemon_name_learned_checker import (
    PokemonNameLearnedChecker,
)
from pokemon_names.services.pokemon_picker import PokemonPicker


class PokemonNameQuestionBuilder:
    @classmethod
    def build_pokemon_name_question_serializer(cls, user: User):
        pokemon = PokemonPicker.pick_pokemon(user)

        given_language, expected_language = LanguagePicker.pick_languages(user, pokemon)

        correct_answer = PokemonName.objects.get(
            pokemon=pokemon, language__short_name=expected_language
        ).name

        pokemon_question_serializer = PokemonNameQuestionContentSerializer(
            {
                "pokemon_id": pokemon.id,
                "given_name": PokemonName.objects.get(
                    pokemon=pokemon, language__short_name=given_language
                ).name,
                "given_language_id": given_language.id,
                "given_language_name": given_language.full_name,
                "expected_name": correct_answer,
                "expected_language_id": expected_language.id,
                "expected_language_name": expected_language.full_name,
            }
        )

        return QuestionSerializer(
            {
                "question_type": QuestionSerializer.Type.POKEMON_NAME,
                "pokemon_name_content": pokemon_question_serializer.data,
                "stats": cls.build_stats_data(user, pokemon, expected_language),
            }
        )

    @staticmethod
    def build_stats_data(user: User, pokemon: Pokemon, expected_language: Language):
        all_answers = PokemonNameResult.objects.filter(
            pokemon=pokemon, user=user, language=expected_language
        )
        correct_answer = PokemonName.objects.get(
            pokemon=pokemon, language__short_name=expected_language
        ).name
        correct_answers = all_answers.filter(answer=correct_answer)

        QuestionStatsSerializer(
            {
                "nb_answers_total": all_answers.count(),
                "nb_answers_correct": correct_answers.count(),
                "nb_answers_correct_in_a_row": PokemonNameLearnedChecker.nb_correct_in_a_row(
                    user, pokemon.id, expected_language.id
                ),
            }
        )
