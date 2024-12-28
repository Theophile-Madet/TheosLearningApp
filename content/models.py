from django.db import models
from django.utils.translation import gettext_lazy as _


class Word(models.Model):
    class Type(models.TextChoices):
        NOUN = "noun", _("Noun")
        VERB = "verb", _("Verb")
        ADJECTIVE = "adjective", _("Adjective")

    word = models.CharField(max_length=100, unique=True)
    type = models.CharField(max_length=100, choices=Type)
    gender = models.CharField(max_length=10, null=True)
    usage_frequency = models.IntegerField()  # higher is more frequent

    def __str__(self):
        return f"{self.word}, {self.gender}, {self.usage_frequency}"


class Pokemon(models.Model):
    class Meta:
        indexes = [models.Index(fields=["id_from_csv"])]

    id_from_csv = models.CharField(max_length=100)
    generation = models.IntegerField()

    def __str__(self):
        return f"{self.id_from_csv} ({self.generation}th gen)"


class Language(models.Model):
    short_name = models.CharField(max_length=100)
    full_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.full_name} ({self.short_name})"


class PokemonName(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["language", "pokemon"],
                name="only_one_pokemon_name_per_language",
            )
        ]

    name = models.CharField(max_length=100)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    pokemon = models.ForeignKey(Pokemon, on_delete=models.CASCADE, related_name="names")

    def __str__(self):
        return f"{self.name}, {self.pokemon}, {self.language}"
