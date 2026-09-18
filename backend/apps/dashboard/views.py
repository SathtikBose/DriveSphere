from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Sum
from apps.cars.models import Car
from apps.orders.models import Order

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_view(request):
    user = request.user
    
    # Cars Listed by this user
    cars_listed = Car.objects.filter(seller=user).exclude(status='INACTIVE').count()
    
    # Orders where the user is the seller
    seller_orders = Order.objects.filter(car__seller=user, status='COMPLETED')
    orders_count = seller_orders.count()
    
    total_earnings = seller_orders.aggregate(Sum('amount'))['amount__sum'] or 0.00
    
    sales_overview = [
        {"name": "Jan", "sales": 0},
        {"name": "Feb", "sales": 0},
        {"name": "Mar", "sales": 0},
        {"name": "Apr", "sales": 0},
        {"name": "May", "sales": float(total_earnings)},
    ]
    
    return Response({
        "total_earnings": float(total_earnings),
        "cars_listed": cars_listed,
        "orders": orders_count,
        "sales_overview": sales_overview
    })
