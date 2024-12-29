from learning.services.options_manager import OptionsManager


class ContentOptionsProvider:
    CONTENT_KEY_GERMAN_WORDS = "content_german_words"
    CONTENT_KEY_POKEMON_NAMES = "content_pokemon_names"

    @staticmethod
    def provide_content_options():
        return [
            OptionsManager.UserOption(
                update_handler=ContentOptionsProvider.set_content_enabled,
                get_handler=ContentOptionsProvider.is_content_enabled,
                group_name="Content",
                key=ContentOptionsProvider.CONTENT_KEY_GERMAN_WORDS,
                display_name="German words",
                default_value=True,
            ),
            OptionsManager.UserOption(
                update_handler=ContentOptionsProvider.set_content_enabled,
                get_handler=ContentOptionsProvider.is_content_enabled,
                group_name="Content",
                key=ContentOptionsProvider.CONTENT_KEY_POKEMON_NAMES,
                display_name="Pokemon names",
                default_value=True,
            ),
        ]

    @classmethod
    def set_content_enabled(
        cls, user, user_option: OptionsManager.UserOption, enabled: bool
    ):
        from learning.models import EnabledContent

        enabled_content = EnabledContent.objects.filter(
            user=user, content_key=user_option.key
        )
        if enabled_content.exists():
            enabled_content.update(enabled=enabled)
        else:
            EnabledContent.objects.create(
                user=user, content_key=user_option.key, enabled=enabled
            )

    @classmethod
    def is_content_enabled(
        cls, user, user_option: OptionsManager.UserOption
    ) -> bool | None:
        from learning.models import EnabledContent

        enabled_content = EnabledContent.objects.filter(
            user=user, content_key=user_option.key
        ).first()

        if enabled_content:
            return enabled_content.enabled

        return None
