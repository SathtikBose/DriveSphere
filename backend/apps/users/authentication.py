import os
import jwt
from jwt import PyJWKClient
from rest_framework import authentication
from rest_framework import exceptions
from .models import UserProfile

class ClerkAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        auth_parts = auth_header.split()
        if len(auth_parts) != 2 or auth_parts[0].lower() != 'bearer':
            return None

        token = auth_parts[1]
        clerk_frontend_url = os.getenv('CLERK_FRONTEND_API_URL')
        
        if not clerk_frontend_url:
            raise exceptions.AuthenticationFailed('Clerk configuration missing')

        try:
            jwks_url = f"{clerk_frontend_url}/.well-known/jwks.json"
            jwk_client = PyJWKClient(jwks_url)
            signing_key = jwk_client.get_signing_key_from_jwt(token)

            data = jwt.decode(
                token,
                signing_key.key,
                algorithms=["RS256"],
                options={"verify_aud": False}
            )
            
            clerk_user_id = data.get('sub')
            if not clerk_user_id:
                raise exceptions.AuthenticationFailed('Invalid token payload')
                
        except Exception as e:
            raise exceptions.AuthenticationFailed(f'Token validation failed: {str(e)}')
        
        user, created = UserProfile.objects.get_or_create(clerk_user_id=clerk_user_id)
        
        # Sync User Data from Clerk if missing
        if created or not user.email:
            import requests
            clerk_secret = os.getenv('CLERK_SECRET_KEY')
            if clerk_secret:
                try:
                    headers = {"Authorization": f"Bearer {clerk_secret}"}
                    resp = requests.get(f"https://api.clerk.com/v1/users/{clerk_user_id}", headers=headers)
                    if resp.status_code == 200:
                        c_data = resp.json()
                        emails = c_data.get('email_addresses', [])
                        if emails:
                            user.email = emails[0].get('email_address')
                        user.first_name = c_data.get('first_name', '')
                        user.last_name = c_data.get('last_name', '')
                        user.save()
                except Exception:
                    pass
        
        return (user, token)
