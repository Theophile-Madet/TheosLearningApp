from django.contrib.auth.models import User
from django.db import models

from content.models import Word, Pokemon, Language


class GermanWordResult(models.Model):
    class Meta:
        indexes = [models.Index(fields=["created_at"])]

    created_at = models.DateTimeField(auto_now_add=True)
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    answer = models.CharField(max_length=10)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class PokemonNameResult(models.Model):
    class Meta:
        indexes = [models.Index(fields=["created_at"])]

    created_at = models.DateTimeField(auto_now_add=True)
    pokemon = models.ForeignKey(Pokemon, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
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
                fields=["user", "pokemon", "language"],
                name="unique_learned_pokemon_per_user",
            )
        ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pokemon = models.ForeignKey(Pokemon, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)


class EnabledContent(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "content_key"], name="unique_enabled_content_per_user"
            )
        ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content_key = models.CharField(max_length=100)
    enabled = models.BooleanField()
