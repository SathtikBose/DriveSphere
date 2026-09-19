from django.contrib import admin
from django.urls import path, include
from .views import health_check

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/health/', health_check, name='health_check'),
    path('api/v1/users/', include('apps.users.urls')),
    path('api/v1/dashboard/', include('apps.dashboard.urls')),
    path('api/v1/cars/', include('apps.cars.urls')),
    path('api/v1/payments/', include('apps.payments.urls')),
    path('api/v1/orders/', include('apps.orders.urls')),
    path('api/v1/invoices/', include('apps.invoices.urls')),
]
