from django.contrib.auth.models import User
from django.db import models

from content.models import Language


class PokemonEnabledLanguage(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "language"], name="unique_language_per_user"
            ),
        ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    enabled = models.BooleanField()

    def __str__(self):
        return f"{self.user.username} - {self.language.short_name} - {self.enabled}"


class PokemonEnabledGeneration(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "generation"], name="unique_generation_per_user"
            ),
        ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    generation = models.IntegerField()
    enabled = models.BooleanField()

    def __str__(self):
        return f"{self.user.username} - {self.generation}th gen - {self.enabled}"
