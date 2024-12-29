import random

from django.contrib.auth.models import User

from content.models import Pokemon
from learning.models import LearnedPokemonName
from pokemon_names.models import PokemonEnabledLanguage


class LanguagePicker:
    @classmethod
    def pick_languages(cls, user: User, pokemon: Pokemon):
        enabled_languages = cls.get_enabled_languages(user)
        if not enabled_languages:
            raise ValueError("No enabled language found")

        learned_languages = LearnedPokemonName.objects.filter(
            pokemon=pokemon, user=user
        ).values_list("language")

        expected_language = random.choice(
            [
                language
                for language in enabled_languages
                if language not in learned_languages
            ]
        )

        given_language = random.choice(
            [
                language
                for language in enabled_languages
                if language != expected_language
            ]
        )

        return given_language, expected_language

    @staticmethod
    def get_enabled_languages(user: User):
        return PokemonEnabledLanguage.objects.filter(
            user=user, enabled=True
        ).values_list("language", flat=True)
