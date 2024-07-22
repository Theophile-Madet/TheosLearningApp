import datetime
import random

from django.contrib.auth.models import User
from django.utils import timezone

from content.models import Word
from learning.apps import LearningConfig
from learning.models import LearnedWord, InvalidWord, Result


class WordToLearnPicker:
    @classmethod
    def pick_next_word_for_user(cls, user: User) -> Word:
        learned_words_ids = LearnedWord.objects.filter(user=user).values_list(
            "word__id", flat=True
        )
        invalid_word_ids = InvalidWord.objects.all().values_list("word__id", flat=True)
        words_tried_in_the_last_hours_ids = Result.objects.filter(
            user=user,
            created_at__gte=timezone.now() - datetime.timedelta(hours=8),
        ).values_list("word__id", flat=True)
        potential_words = (
            Word.objects.order_by("-usage_frequency")
            .exclude(id__in=learned_words_ids)
            .exclude(id__in=invalid_word_ids)
            .exclude(id__in=words_tried_in_the_last_hours_ids)
                          )[: LearningConfig.POOL_SIZE]

        return random.choice(potential_words)
