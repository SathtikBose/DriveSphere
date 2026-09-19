from django.urls import path
from .views import download_invoice

urlpatterns = [
    path('<int:order_id>/download/', download_invoice, name='download_invoice'),
]
