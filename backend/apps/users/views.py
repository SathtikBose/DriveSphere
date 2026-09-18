from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    return Response({
        "id": request.user.id,
        "clerk_user_id": request.user.clerk_user_id,
        "email": request.user.email,
        "first_name": request.user.first_name,
        "last_name": request.user.last_name,
    })
