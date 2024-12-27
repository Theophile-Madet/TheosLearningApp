import random

from learning.serializers import QuestionSerializer


class QuestionTypePicker:
    @staticmethod
    def get_next_question_type():
        return random.choice(QuestionSerializer.Type.values)
