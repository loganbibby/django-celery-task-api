from django.apps import AppConfig
from django.conf import settings


class DjangoCeleryTaskApiConfig(AppConfig):
    name = "django_celery_task_api"
    verbose_name = "Django Celery Task API"

    def ready(self):
        if not hasattr(settings, "CELERY_APP"):
            raise NotImplementedError("Django settings does not define CELERY_APP")
