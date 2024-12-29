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
                key=f"pokemon_language_{language.short_name}",
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

        enabled_language = PokemonEnabledLanguage.objects.filter(
            user=user, language__short_name=user_option.key
        ).first()
        if enabled_language:
            enabled_language.enabled = enabled
            enabled_language.save()
        else:
            from content.models import Language

            PokemonEnabledLanguage.objects.create(
                user=user,
                language=Language.objects.get(
                    short_name=cls.option_key_to_language_short_name(user_option.key)
                ),
                enabled=enabled,
            )

    @classmethod
    def is_language_enabled(
        cls, user, user_option: OptionsManager.UserOption
    ) -> bool | None:
        from pokemon_names.models import PokemonEnabledLanguage

        enabled_language = PokemonEnabledLanguage.objects.filter(
            user=user,
            language__short_name=cls.option_key_to_language_short_name(user_option.key),
        ).first()

        if enabled_language:
            return enabled_language.enabled

        return None

    @classmethod
    def option_key_to_language_short_name(cls, option_key: str):
        return option_key.split("_")[-1]
