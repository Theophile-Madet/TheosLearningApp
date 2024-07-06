from django.apps import AppConfig


class LearningConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "learning"
    POOL_SIZE = 20
    REPETITIONS_TO_LEARN = 7
