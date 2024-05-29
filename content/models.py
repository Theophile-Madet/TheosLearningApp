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
