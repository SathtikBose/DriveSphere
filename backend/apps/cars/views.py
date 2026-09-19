from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .models import Car, CarImage
from .serializers import CarSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def car_list(request):
    """
    List all active cars, or create a new car.
    """
    if request.method == 'GET':
        cars = Car.objects.filter(status='ACTIVE').order_by('-created_at')

        brand = request.query_params.get('brand')
        model = request.query_params.get('model')
        year_min = request.query_params.get('year_min')
        year_max = request.query_params.get('year_max')
        max_price = request.query_params.get('max_price')

        if brand:
            cars = cars.filter(brand__icontains=brand)
        if model:
            cars = cars.filter(model__icontains=model)
        if year_min:
            try:
                cars = cars.filter(year__gte=int(year_min))
            except ValueError:
                pass
        if year_max:
            try:
                cars = cars.filter(year__lte=int(year_max))
            except ValueError:
                pass
        if max_price:
            try:
                cars = cars.filter(price__lte=float(max_price))
            except ValueError:
                pass

        serializer = CarSerializer(cars, many=True)
        return Response(serializer.data)
        
    elif request.method == 'POST':
        # Create a new car listing
        serializer = CarSerializer(data=request.data)
        if serializer.is_valid():
            # Save the Car, attaching the current user as the seller
            # By default new cars can be ACTIVE for this MVP
            car = serializer.save(seller=request.user, status='ACTIVE')
            
            # Handle image_urls array if present
            image_urls = serializer.validated_data.pop('image_urls', [])
            
            if image_urls:
                # Set primary image URL to the first image
                car.primary_image_url = image_urls[0]
                car.save()
                
                # Create CarImage objects
                for url in image_urls:
                    CarImage.objects.create(car=car, image_url=url)
                    
            # Re-serialize to return full data including created images
            return Response(CarSerializer(car).data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
