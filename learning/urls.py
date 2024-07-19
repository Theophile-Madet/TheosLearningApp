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
        "api/get_next_word/",
        views.GetNextWord.as_view(),
        name="get_next_word",
    ),
    path(
        "api/send_answer/",
        views.SendAnswer.as_view(),
        name="send_answer",
    ),
    path(
        "api/mark_word_as_invalid/",
        views.MarkWordAsInvalid.as_view(),
        name="mark_word_as_invalid",
    ),
]
