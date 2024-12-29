from dataclasses import dataclass
from typing import Callable

from django.apps import AppConfig


class LearningConfig(AppConfig):
    @dataclass
    class UserOption:
        update_handler: Callable
        get_handler: Callable
        group_name: str
        key: str
        display_name: str
        default_value: bool

    default_auto_field = "django.db.models.BigAutoField"
    name = "learning"
    POOL_SIZE = 20
    REPETITIONS_TO_LEARN = 7
    user_options: dict[str, dict[str, UserOption]] = {}
    CONTENT_KEY_GERMAN_WORDS = "german_words"
    CONTENT_KEY_POKEMON_NAMES = "pokemon_names"

    def ready(self):
        self.register_user_option(
            self.UserOption(
                update_handler=self.set_content_enabled,
                get_handler=self.is_content_enabled,
                group_name="Content",
                key=self.CONTENT_KEY_GERMAN_WORDS,
                display_name="German words",
                default_value=True,
            )
        )
        self.register_user_option(
            self.UserOption(
                update_handler=self.set_content_enabled,
                get_handler=self.is_content_enabled,
                group_name="Content",
                key=self.CONTENT_KEY_POKEMON_NAMES,
                display_name="Pokemon names",
                default_value=True,
            )
        )

    @classmethod
    def register_user_option(cls, user_option: UserOption):
        if user_option.group_name not in cls.user_options.keys():
            cls.user_options[user_option.group_name] = {}

        cls.user_options[user_option.group_name][user_option.key] = user_option

    @classmethod
    def set_content_enabled(cls, user, user_option: UserOption, enabled: bool):
        from learning.models import EnabledContent

        EnabledContent.objects.update_or_create(
            user=user, content_key=user_option.key, enabled=enabled
        )

    @classmethod
    def is_content_enabled(cls, user, user_option: UserOption) -> bool | None:
        from learning.models import EnabledContent

        enabled_content = EnabledContent.objects.filter(
            user=user, content_key=user_option.key
        ).first()

        if enabled_content:
            return enabled_content.enabled

        return None
