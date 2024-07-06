from django.contrib.auth.models import User

from content.models import Word
from learning.apps import LearningConfig
from learning.models import Result


class WordLearnedChecker:
    @classmethod
    def is_word_learned(cls, user: User, word: Word) -> bool:
        last_results = Result.objects.filter(user=user, word=word).order_by(
            "-created_at"
        )[: LearningConfig.REPETITIONS_TO_LEARN]

        return all([result.answer == word.gender for result in last_results])
