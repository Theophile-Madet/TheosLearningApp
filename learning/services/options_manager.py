from dataclasses import dataclass
from typing import Callable, Set


class OptionsManager:
    @dataclass
    class UserOption:
        update_handler: Callable
        get_handler: Callable
        group_name: str
        key: str
        display_name: str
        default_value: bool

    option_providers: Set[Callable] = set()

    @classmethod
    def register_option_provider(cls, option_provider: Callable):
        cls.option_providers.add(option_provider)

    @staticmethod
    def is_option_enabled(user, user_option: UserOption):
        enabled = user_option.get_handler(user, user_option)
        if enabled is None:
            enabled = user_option.default_value
        return enabled
