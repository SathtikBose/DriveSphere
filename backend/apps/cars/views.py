from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from .models import Car
from .serializers import CarSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def car_list(request):
    """
    List all active cars with optional filtering.
    """
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
