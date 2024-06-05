import random

from django.contrib.auth.models import User

from content.models import Word
from learning.models import LearnedWord, InvalidWord


class WordToLearnPicker:
    @classmethod
    def pick_next_word_for_user(cls, user: User) -> Word:
        potential_words = (
            Word.objects.order_by("-usage_frequency")
            .exclude(
                id__in=LearnedWord.objects.filter(user=user).values_list(
                    "word__id", flat=True
                ),
            )
            .exclude(
                id__in=InvalidWord.objects.all().values_list("word__id", flat=True)
            )[:5]
        )

        return random.choice(potential_words)
