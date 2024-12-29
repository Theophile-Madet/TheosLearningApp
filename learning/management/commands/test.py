from django.contrib.auth.models import User
from django.core.management import BaseCommand

from learning.services.question_type_picker import QuestionTypePicker


class Command(BaseCommand):

    def handle(self, *args, **options):
        for i in range(20):
            print(QuestionTypePicker.get_next_question_type(User.objects.get()))
