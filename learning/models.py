from django.contrib.auth.models import User
from django.db import models

from content.models import Word


class Result(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    answer = models.CharField(max_length=10)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class LearnedWord(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "word"], name="unique_word_per_user"
            ),
        ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    word = models.ForeignKey(Word, on_delete=models.CASCADE)


class InvalidWord(models.Model):
    word = models.OneToOneField(Word, on_delete=models.CASCADE)
