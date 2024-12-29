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
                key=f"pokemon_language_{language.id}",
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
            user=user,
            language=LanguageOptionsProvider.option_key_to_language(user_option.key),
        ).first()
        if enabled_language:
            enabled_language.enabled = enabled
            enabled_language.save()
        else:
            from content.models import Language

            PokemonEnabledLanguage.objects.create(
                user=user,
                language=cls.option_key_to_language(user_option.key),
                enabled=enabled,
            )

    @classmethod
    def is_language_enabled(
        cls, user, user_option: OptionsManager.UserOption
    ) -> bool | None:
        from pokemon_names.models import PokemonEnabledLanguage

        enabled_language = PokemonEnabledLanguage.objects.filter(
            user=user,
            language=cls.option_key_to_language(user_option.key),
        ).first()

        if enabled_language:
            return enabled_language.enabled

        return None

    @classmethod
    def option_key_to_language(cls, option_key: str):
        from content.models import Language

        language_id = option_key.split("_")[-1]
        return Language.objects.get(id=language_id)

    @classmethod
    def get_enabled_languages(cls, user):
        enabled_languages = []
        for user_option in cls.provide_language_options():
            if OptionsManager.is_option_enabled(user, user_option):
                enabled_languages.append(cls.option_key_to_language(user_option.key))
        return enabled_languages
