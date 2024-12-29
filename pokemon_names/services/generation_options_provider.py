from learning.services.options_manager import OptionsManager


class GenerationOptionsProvider:
    @staticmethod
    def provide_generation_options():
        from content.models import Pokemon

        generations = (
            Pokemon.objects.values("generation")
            .distinct()
            .order_by("generation")
            .values_list("generation", flat=True)
        )

        return [
            OptionsManager.UserOption(
                GenerationOptionsProvider.set_generation_enabled,
                GenerationOptionsProvider.is_generation_enabled,
                "Pokemon generations",
                generation,
                f"Generation {GenerationOptionsProvider.get_roman_numeral(generation)}",
                generation == 1,
            )
            for generation in generations
        ]

    @classmethod
    def set_generation_enabled(
        cls, user, user_option: OptionsManager.UserOption, enabled: bool
    ):
        from pokemon_names.models import PokemonEnabledGeneration

        PokemonEnabledGeneration.objects.update_or_create(
            user=user, generation=user_option.key, enabled=enabled
        )

    @classmethod
    def is_generation_enabled(
        cls, user, user_option: OptionsManager.UserOption
    ) -> bool | None:
        from pokemon_names.models import PokemonEnabledGeneration

        enabled_generation = PokemonEnabledGeneration.objects.filter(
            user=user, generation=user_option.key
        ).first()

        if enabled_generation:
            return enabled_generation.enabled

        return None

    @staticmethod
    def get_roman_numeral(input_number):
        roman_reference = [
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
        for arabic, roman_reference in roman_reference:
            (factor, input_number) = divmod(input_number, arabic)
            result += roman_reference * factor
        return result
