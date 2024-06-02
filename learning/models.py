from django.db import models

from content.models import Word


# Create your models here.
class Result(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    answer = models.CharField(max_length=10)
