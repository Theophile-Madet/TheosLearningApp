from django.contrib.auth.models import User
from django.db import models

from content.models import Word, Pokemon, Language


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

    def __str__(self):
        return f"{self.word}"


class WrongAnswer(models.Model):
    word = models.OneToOneField(Word, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.word}"


class LearnedPokemonName(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "pokemon", "given_language", "expected_language"],
                name="unique_learned_pokemon_per_user",
            )
        ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pokemon = models.ForeignKey(Pokemon, on_delete=models.CASCADE)
    given_language = models.ForeignKey(
        Language, on_delete=models.CASCADE, related_name="dummy1"
    )
    expected_language = models.ForeignKey(
        Language, on_delete=models.CASCADE, related_name="dummy2"
    )
