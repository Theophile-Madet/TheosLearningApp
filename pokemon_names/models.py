from django.contrib.auth.models import User
from django.db import models

from content.models import Language


class PokemonEnabledLanguage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)


class PokemonEnabledGeneration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    generation = models.IntegerField()
