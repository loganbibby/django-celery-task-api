import importlib
from django.conf import settings


__all__ = [
    "get_celery_app",
]


def get_celery_app():
    celery_app_setting = settings.CELERY_APP.split(".")
    celery_app_name = celery_app_setting.pop()
    celery_module_name = ".".join(celery_app_setting)

    celery_module = importlib.import_module(celery_module_name)

    return getattr(celery_module, celery_app_name)
