from german_words.services.word_learned_checker import WordLearnedChecker
from german_words.services.word_to_learn_picker import WordToLearnPicker
from learning.models import GermanWordResult
from learning.serializers import (
    GermanWordQuestionContentSerializer,
    QuestionStatsSerializer,
    QuestionSerializer,
)


class GermanWordQuestionBuilder:
    @staticmethod
    def build_german_word_question_serializer(request):
        word, rank = WordToLearnPicker.pick_next_word_for_user(request.user)
        total_answers = GermanWordResult.objects.filter(user=request.user, word=word)
        word_question_serializer = GermanWordQuestionContentSerializer(
            {
                "word": word,
                "rank": rank,
            }
        )
        stats_serializer = QuestionStatsSerializer(
            {
                "nb_answers_total": total_answers.count(),
                "nb_answers_correct": total_answers.filter(answer=word.gender).count(),
                "nb_answers_correct_in_a_row": WordLearnedChecker.nb_correct_in_a_row(
                    request.user, word
                ),
            }
        )
        return QuestionSerializer(
            {
                "question_type": QuestionSerializer.Type.GERMAN_WORD,
                "german_word_content": word_question_serializer.data,
                "stats": stats_serializer.data,
            }
        )
