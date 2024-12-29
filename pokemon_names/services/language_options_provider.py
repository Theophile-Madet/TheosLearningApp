from learning.services.options_manager import OptionsManager


class LanguageOptionsProvider:
    @staticmethod
    def provide_language_options():
        from content.models import Language

        return [
            OptionsManager.UserOption(
                update_handler=LanguageOptionsProvider.set_language_enabled,
                get_handler=LanguageOptionsProvider.is_language_enabled,
                group_name="Pokemon languages",
                key=language.short_name,
                display_name=language.full_name,
                default_value=language.full_name in ["English", "French", "German"],
            )
            for language in Language.objects.all()
        ]

    @classmethod
    def set_language_enabled(
        cls, user, user_option: OptionsManager.UserOption, enabled: bool
    ):
        from pokemon_names.models import PokemonEnabledLanguage

        PokemonEnabledLanguage.objects.update_or_create(
            user=user, language__short_name=user_option.key, enabled=enabled
        )

    @classmethod
    def is_language_enabled(
        cls, user, user_option: OptionsManager.UserOption
    ) -> bool | None:
        from pokemon_names.models import PokemonEnabledLanguage

        enabled_language = PokemonEnabledLanguage.objects.filter(
            user=user, language__short_name=user_option.key
        ).first()

        if enabled_language:
            return enabled_language.enabled

        return None
