from django.apps import AppConfig

from learning.apps import LearningConfig


class PokemonNamesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "pokemon_names"

    def ready(self):
        super().ready()
        return
        from content.models import Pokemon

        generations = (
            Pokemon.objects.values("generation")
            .distinct()
            .order_by("generation")
            .values_list("generation", flat=True)
        )
        for generation in generations:
            LearningConfig.register_user_option(
                "Pokemon generations",
                f"Generation {self.get_roman_numeral(generation)}",
                True,
            )

        from content.models import Language

        languages = Language.objects.values_list("full_name", flat=True)
        for language in languages:
            LearningConfig.register_user_option(
                "Pokemon languages",
                language,
                language in ["English", "French", "German"],
            )

    @staticmethod
    def get_roman_numeral(input_number):
        ROMAN = [
            (1000, "M"),
            (900, "CM"),
            (500, "D"),
            (400, "CD"),
            (100, "C"),
            (90, "XC"),
            (50, "L"),
            (40, "XL"),
            (10, "X"),
            (9, "IX"),
            (5, "V"),
            (4, "IV"),
            (1, "I"),
        ]

        result = ""
        for arabic, roman in ROMAN:
            (factor, input_number) = divmod(input_number, arabic)
            result += roman * factor
        return result
