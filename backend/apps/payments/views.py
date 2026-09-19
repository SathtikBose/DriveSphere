import stripe
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from django.http import HttpResponse

from apps.cars.models import Car
from apps.orders.models import Order
from apps.users.models import UserProfile

stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_checkout_session(request):
    car_id = request.data.get('car_id')
    if not car_id:
        return Response({'error': 'car_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
    try:
        car = Car.objects.get(id=car_id)
    except Car.DoesNotExist:
        return Response({'error': 'Car not found'}, status=status.HTTP_404_NOT_FOUND)

    # Double purchase protection
    if car.status == 'SOLD':
        return Response({'error': 'This car has already been sold.'}, status=status.HTTP_400_BAD_REQUEST)
        
    if car.seller == request.user:
        return Response({'error': 'You cannot buy your own car.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Create Stripe Checkout Session
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': int(car.price * 100),  # Stripe uses cents
                        'product_data': {
                            'name': f"{car.year} {car.brand} {car.model}",
                            'images': [car.primary_image_url] if car.primary_image_url else [],
                        },
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=f"{settings.FRONTEND_URL}/checkout/success",
            cancel_url=f"{settings.FRONTEND_URL}/checkout/cancel",
            metadata={
                'car_id': str(car.id),
                'buyer_id': str(request.user.id),
            }
        )
        return Response({'url': checkout_session.url})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret = settings.STRIPE_WEBHOOK_SECRET

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)

    # Handle the checkout.session.completed event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        
        metadata = session.get('metadata', {})
        car_id = metadata.get('car_id')
        buyer_id = metadata.get('buyer_id')
        
        if car_id and buyer_id:
            try:
                with transaction.atomic():
                    car = Car.objects.select_for_update().get(id=car_id)
                    buyer = UserProfile.objects.get(id=buyer_id)
                    
                    if car.status != 'SOLD':
                        car.status = 'SOLD'
                        car.save()
                        
                        # Create Order
                        Order.objects.create(
                            buyer=buyer,
                            car=car,
                            stripe_session_id=session.get('id'),
                            amount=car.price,
                            status='COMPLETED'
                        )
            except (Car.DoesNotExist, UserProfile.DoesNotExist):
                # Log error
                pass

    return HttpResponse(status=200)
