from django.apps import AppConfig

from learning.services.content_options_provider import ContentOptionsProvider
from learning.services.options_manager import OptionsManager


class LearningConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "learning"
    POOL_SIZE = 20
    REPETITIONS_TO_LEARN = 7

    def ready(self):
        super().ready()
        OptionsManager.register_option_provider(
            ContentOptionsProvider.provide_content_options
        )
