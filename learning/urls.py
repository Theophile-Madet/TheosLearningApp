from django.urls import path

from learning import views

app_name = "learning"
urlpatterns = [
    path(
        "test",
        views.TestView.as_view(),
        name="test",
    ),
]
