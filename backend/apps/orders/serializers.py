from rest_framework import serializers
from .models import Order
from apps.cars.serializers import CarSerializer

class OrderSerializer(serializers.ModelSerializer):
    car = CarSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'car', 'stripe_session_id', 'amount', 'status', 'created_at']
