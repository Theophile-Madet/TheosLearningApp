from django.contrib.auth.models import User
from django.db.models import Q
from django.db.models.aggregates import Count

from content.models import Pokemon
from pokemon_names.services.generation_options_provider import GenerationOptionsProvider
from pokemon_names.services.language_options_provider import LanguageOptionsProvider


class PokemonPicker:
    @staticmethod
    def pick_pokemon(user: User):
        enabled_generations = GenerationOptionsProvider.get_enabled_generation(user)
        if not enabled_generations:
            raise ValueError("No enabled generation found")

        pokemons = Pokemon.objects.filter(generation__in=enabled_generations)

        enabled_languages = LanguageOptionsProvider.get_enabled_languages(user)
        pokemons = pokemons.annotate(
            nb_learned=Count(
                "learnedpokemonname",
                filter=Q(
                    learnedpokemonname__user=user,
                    learnedpokemonname__language__in=enabled_languages,
                ),
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
