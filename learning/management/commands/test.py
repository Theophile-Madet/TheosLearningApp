from django.contrib.auth.models import User
from django.core.management import BaseCommand

from content.models import Word
from learning.models import LearnedWord
from learning.services.WordToLearnPicker import WordToLearnPicker


class Command(BaseCommand):

    def handle(self, *args, **options):
        hallo = Word.objects.get(word="Es")
        user = User.objects.get(username="admin")
        LearnedWord.objects.all().delete()

        print("Before")
        for i in range(10):
            print(WordToLearnPicker.pick_next_word_for_user(user))

        LearnedWord.objects.create(word=hallo, user=user)
        print("After")
        for i in range(10):
            print(WordToLearnPicker.pick_next_word_for_user(user))
