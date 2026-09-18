from rest_framework import serializers
from .models import Car
from apps.users.models import UserProfile

class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'first_name', 'last_name', 'email']

class CarSerializer(serializers.ModelSerializer):
    seller = SellerSerializer(read_only=True)

    class Meta:
        model = Car
        fields = [
            'id', 'seller', 'title', 'brand', 'model', 'year', 'price',
            'mileage', 'fuel_type', 'transmission', 'description',
            'primary_image_url', 'status', 'created_at', 'updated_at'
        ]
