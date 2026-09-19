from rest_framework import serializers
from .models import Car, CarImage
from apps.users.models import UserProfile

class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'clerk_user_id', 'first_name', 'last_name', 'email']

class CarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        fields = ['id', 'image_url', 'created_at']

class CarSerializer(serializers.ModelSerializer):
    seller = SellerSerializer(read_only=True)
    images = CarImageSerializer(many=True, read_only=True)
    
    # Write-only field for creating cars with multiple images from frontend
    image_urls = serializers.ListField(
        child=serializers.URLField(max_length=1024),
        write_only=True,
        required=False
    )

    class Meta:
        model = Car
        fields = [
            'id', 'seller', 'title', 'brand', 'model', 'year', 'price',
            'mileage', 'fuel_type', 'transmission', 'description',
            'primary_image_url', 'status', 'created_at', 'updated_at',
            'images', 'image_urls'
        ]
