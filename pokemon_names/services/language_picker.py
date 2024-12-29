import random

from django.contrib.auth.models import User

from content.models import Pokemon
from learning.models import LearnedPokemonName
from pokemon_names.services.language_options_provider import LanguageOptionsProvider


class LanguagePicker:
    @classmethod
    def pick_languages(cls, user: User, pokemon: Pokemon):
        enabled_languages = LanguageOptionsProvider.get_enabled_languages(user)
        if len(enabled_languages) < 2:
            raise ValueError(
                f"Not enough enabled languages, enabled: {enabled_languages}"
            )

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
