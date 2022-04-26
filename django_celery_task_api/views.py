from django.http import JsonResponse
from django.conf import settings
from .utils import *


__all__ = [
    "check_task_status",
]


def check_task_status(request, task_id):
    celery_app = get_celery_app()

    task = celery_app.AsyncResult(task_id)

    return JsonResponse({
        "task_id": task_id,
        "status": task.status.lower(),
        "is_completed": task.ready(),
        "is_failed": task.failed()
    })
