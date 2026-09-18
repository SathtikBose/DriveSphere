from django.db import models
from apps.users.models import UserProfile
from apps.cars.models import Car

class Order(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('COMPLETED', 'Completed'),
        ('FAILED', 'Failed'),
        ('CANCELLED', 'Cancelled'),
    )

    buyer = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='orders')
    car = models.ForeignKey(Car, on_delete=models.PROTECT, related_name='orders')
    stripe_session_id = models.CharField(max_length=255, blank=True, null=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id} - {self.car.title}"
