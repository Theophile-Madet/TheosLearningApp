from django.apps import AppConfig

from learning.services.options_manager import OptionsManager
from pokemon_names.services.generation_options_provider import GenerationOptionsProvider
from pokemon_names.services.language_options_provider import LanguageOptionsProvider


class PokemonNamesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "pokemon_names"
    default = True

    def ready(self):
        super().ready()
        OptionsManager.register_option_provider(
            GenerationOptionsProvider.provide_generation_options
        )
        OptionsManager.register_option_provider(
            LanguageOptionsProvider.provide_language_options
        )
