from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView


class TestView(LoginRequiredMixin, TemplateView):
    template_name = "learning/test.html"
