import datetime
import random

from django.contrib.auth.models import User
from django.db.models import Window, F
from django.db.models.functions import Rank
from django.utils import timezone

from content.models import Word
from learning.apps import LearningConfig
from learning.models import LearnedWord, InvalidWord, GermanWordResult, WrongAnswer


class WordToLearnPicker:
    @classmethod
    def pick_next_word_for_user(cls, user: User) -> (Word, int):

        invalid_word_ids = InvalidWord.objects.all().values_list("word__id", flat=True)
        wrong_answer_word_ids = WrongAnswer.objects.all().values_list(
            "word__id", flat=True
        )

        potential_words = (
            Word.objects.order_by("-usage_frequency")
            .exclude(id__in=invalid_word_ids)
            .exclude(id__in=wrong_answer_word_ids)
            .annotate(
                rank=Window(expression=Rank(), order_by=F("usage_frequency").desc()),
            )
        )

        # Get the rank before removing the learned words & co
        word_id_to_rank_map = {word.id: word.rank for word in potential_words}

        learned_words_ids = LearnedWord.objects.filter(user=user).values_list(
            "word__id", flat=True
        )
        words_tried_in_the_last_hours_ids = GermanWordResult.objects.filter(
            user=user,
            created_at__gte=timezone.now() - datetime.timedelta(hours=8),
        ).values_list("word__id", flat=True)

        potential_words = (
            potential_words.exclude(id__in=learned_words_ids).exclude(
                id__in=words_tried_in_the_last_hours_ids
            )
        )[: LearningConfig.POOL_SIZE]

        chosen_word = random.choice(potential_words)
        return chosen_word, word_id_to_rank_map[chosen_word.id]
