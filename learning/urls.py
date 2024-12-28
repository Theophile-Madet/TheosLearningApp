from django.urls import path

from learning import views

app_name = "learning"

urlpatterns = [
    path(
        "api/get_csrf_token",
        views.GetCSRFToken.as_view(),
        name="get_csrf_token",
    ),
    path(
        "api/get_next_question/",
        views.GetNextQuestion.as_view(),
        name="get_next_question",
    ),
    path(
        "api/send_answer_german_word/",
        views.SendAnswerGermanWord.as_view(),
        name="send_answer_german_word",
    ),
    path(
        "api/mark_word_as_invalid/",
        views.MarkWordAsInvalid.as_view(),
        name="mark_word_as_invalid",
    ),
    path(
        "api/mark_answer_as_wrong/",
        views.MarkAnswerAsWrong.as_view(),
        name="mark_answer_as_wrong",
    ),
    path(
        "api/send_answer_pokemon_name/",
        views.SendAnswerPokemonName.as_view(),
        name="send_answer_pokemon_name",
    ),
]
