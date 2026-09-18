from django.db import models
from apps.users.models import UserProfile

class Car(models.Model):
    STATUS_CHOICES = (
        ('DRAFT', 'Draft'),
        ('ACTIVE', 'Active'),
        ('SOLD', 'Sold'),
        ('INACTIVE', 'Inactive'),
    )

    seller = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='cars')
    title = models.CharField(max_length=255)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    mileage = models.IntegerField(default=0)
    fuel_type = models.CharField(max_length=50, blank=True)
    transmission = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='DRAFT')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.year} {self.brand} {self.model}"
