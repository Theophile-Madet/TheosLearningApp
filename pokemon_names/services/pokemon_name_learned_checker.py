from django.contrib.auth.models import User

from content.models import PokemonName
from learning.apps import LearningConfig
from learning.models import PokemonNameResult


class PokemonNameLearnedChecker:
    @classmethod
    def is_pokemon_name_learned(
        cls, user: User, pokemon_id: int, language_id: int
    ) -> bool:
        # double the requirement because when correct answers are given,
        # we create results for both the given and the expected language
        return (
            cls.nb_correct_in_a_row(user, pokemon_id, language_id)
            > LearningConfig.REPETITIONS_TO_LEARN * 2
        )

    @classmethod
    def nb_correct_in_a_row(cls, user: User, pokemon_id: int, language_id: int) -> int:
        last_results = PokemonNameResult.objects.filter(
            user=user, pokemon_id=pokemon_id, language_id=language_id
        ).order_by("-created_at")

        correct_answer = PokemonName.objects.get(
            pokemon_id=pokemon_id, language_id=language_id
        ).name

        count = 0
        for result in last_results:
            if not cls.is_answer_correct(result.answer, correct_answer):
                break
            count += 1

        return count

    @staticmethod
    def is_answer_correct(given_answer: str, correct_answer: str) -> bool:
        return given_answer.lower() == correct_answer.lower()
