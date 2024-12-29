from django.contrib.auth.models import User
from django.db.models import Q
from django.db.models.aggregates import Count

from content.models import Pokemon
from learning.services.options_manager import OptionsManager
from pokemon_names.services.generation_options_provider import GenerationOptionsProvider
from pokemon_names.services.language_picker import LanguagePicker


class PokemonPicker:
    @staticmethod
    def pick_pokemon(user: User):
        enabled_generations = []
        for user_option in GenerationOptionsProvider.provide_generation_options():
            if OptionsManager.is_option_enabled(user, user_option):
                enabled_generations.append(
                    GenerationOptionsProvider.option_key_to_generation_number(
                        user_option.key
                    )
                )

        if not enabled_generations:
            raise ValueError("No enabled generation found")

        pokemons = Pokemon.objects.filter(generation__in=enabled_generations)

        enabled_languages = LanguagePicker.get_enabled_languages(user)
        pokemons = pokemons.annotate(
            nb_learned=Count(
                "learnedpokemonname",
                filter=Q(user=user, language__in=enabled_languages),
            )
        ).filter(nb_learned__lt=len(enabled_languages))

        picked_pokemon = pokemons.order_by("?").first()
        if not picked_pokemon:
            raise ValueError(
                f"No pokemon found for {user.username} "
                f"with generations {enabled_generations} "
                f"and languages {enabled_languages}"
            )

        return picked_pokemon
