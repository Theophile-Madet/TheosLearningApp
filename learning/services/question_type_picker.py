import random

from django.contrib.auth.models import User

from learning.serializers import QuestionSerializer
from learning.services.content_options_provider import ContentOptionsProvider
from learning.services.options_manager import OptionsManager


class QuestionTypePicker:
    CONTENT_KEY_TO_QUESTION_TYPE_MAP = {
        ContentOptionsProvider.CONTENT_KEY_GERMAN_WORDS: QuestionSerializer.Type.GERMAN_WORD.value,
        ContentOptionsProvider.CONTENT_KEY_POKEMON_NAMES: QuestionSerializer.Type.POKEMON_NAME.value,
    }

    @classmethod
    def get_next_question_type(cls, user: User):
        choices = []
        for user_option in ContentOptionsProvider.provide_content_options():
            if OptionsManager.is_option_enabled(user, user_option):
                choices.append(cls.CONTENT_KEY_TO_QUESTION_TYPE_MAP[user_option.key])

        return random.choice(choices)
