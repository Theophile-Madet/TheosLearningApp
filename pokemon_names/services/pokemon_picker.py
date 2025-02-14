import datetime
import random

from django.contrib.auth.models import User
from django.db.models import Q
from django.db.models.aggregates import Count
from django.utils import timezone

from content.models import Pokemon
from learning.apps import LearningConfig
from learning.models import PokemonNameResult
from pokemon_names.services.generation_options_provider import GenerationOptionsProvider
from pokemon_names.services.language_options_provider import LanguageOptionsProvider


class PokemonPicker:
    @staticmethod
    def pick_pokemon(user: User):
        enabled_generations = GenerationOptionsProvider.get_enabled_generation(user)
        if not enabled_generations:
            raise ValueError("No enabled generation found")

        potential_pokemons = Pokemon.objects.filter(generation__in=enabled_generations)

        enabled_languages = LanguageOptionsProvider.get_enabled_languages(user)
        potential_pokemons = potential_pokemons.annotate(
            nb_learned=Count(
                "learnedpokemonname",
                filter=Q(
                    learnedpokemonname__user=user,
                    learnedpokemonname__language__in=enabled_languages,
                ),
            )
        ).filter(nb_learned__lt=len(enabled_languages))

        pokemons_tried_in_the_last_24_hours = PokemonNameResult.objects.filter(
            user=user, created_at__gte=timezone.now() - datetime.timedelta(days=1)
        ).values_list("pokemon_id")

        potential_pokemons = potential_pokemons.exclude(
            id__in=pokemons_tried_in_the_last_24_hours
        )

        potential_pokemons = potential_pokemons.order_by("id")[
            : LearningConfig.POOL_SIZE
        ]

        picked_pokemon = random.choice(potential_pokemons)
        if not picked_pokemon:
            raise ValueError(
                f"No pokemon found for {user.username} "
                f"with generations {enabled_generations} "
                f"and languages {enabled_languages}"
            )

        return picked_pokemon
