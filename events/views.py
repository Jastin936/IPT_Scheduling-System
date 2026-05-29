# events/views.py
from rest_framework import generics, viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings
from .models import Event
from .serializers import RegisterSerializer, EventSerializer

# Registration API View
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,) # Accessible globally without token
    serializer_class = RegisterSerializer # Fixed typo from serializer_serializer

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # --- AUTHENTICATION/WELCOME EMAIL ---
            try:
                if user.email:
                    subject = "Access Granted: Workspace Profile Active"
                    message_text = f"Hello {user.username},\n\nYour core scheduling authority profile has been configured successfully."
                    
                    html_message = f"""
                    <div style="background-color: #0b0f19; padding: 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; text-align: center;">
                        <div style="max-width: 500px; margin: 0 auto; background-color: #111827; border: 1px solid rgba(255,255,255,0.06); padding: 40px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
                            <h2 style="color: #6366f1; margin-top: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.02em;">Workspace Activated</h2>
                            <p style="color: #9ca3af; font-size: 15px; line-height: 1.6; text-align: left; margin-bottom: 20px;">Hello <strong>{user.username}</strong>,</p>
                            <p style="color: #9ca3af; font-size: 14px; line-height: 1.6; text-align: left; margin-bottom: 24px;">Your core scheduling authority profile has been configured successfully. You now hold pipeline manipulation access.</p>
                            <div style="margin: 32px 0 12px 0;">
                                <span style="background-color: rgba(16, 185, 129, 0.08); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.15); padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; letter-spacing: 0.05em;">SECURED ACCOUNT</span>
                            </div>
                        </div>
                    </div>
                    """
                    
                    send_mail(
                        subject=subject,
                        message=message_text,
                        from_email=settings.DEFAULT_FROM_EMAIL,
                        recipient_list=[user.email],
                        html_message=html_message,
                        fail_silently=True,
                    )
            except Exception as e:
                print(f"Failed to transmit registration notification: {e}")
            # ------------------------------------

            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Event management controller dealing with secure processing
class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated] # Requires JWT validation header

    def get_queryset(self):
        # Explanatory point: Only extract entries belonging exclusively to the logged-in user
        return Event.objects.filter(user=self.request.user).order_by('start_time')

    def perform_create(self, serializer):
        # Automatically tie the active user instance to the brand new event mapping
        event = serializer.save(user=self.request.user)
        
        # --- EVENT CREATION PIPELINE EMAIL ---
        try:
            if self.request.user.email:
                subject = f"📅 Event Scheduled: {event.title}"
                message_text = f"Hello {self.request.user.username},\n\nYour new event '{event.title}' has been successfully scheduled."
                
                # Format datetime objects cleanly for readability in incoming inbox notifications
                start_formatted = event.start_time.strftime("%b %d, %Y, %I:%M %p") if hasattr(event.start_time, 'strftime') else event.start_time
                end_formatted = event.end_time.strftime("%b %d, %Y, %I:%M %p") if hasattr(event.end_time, 'strftime') else event.end_time
                
                html_message = f"""
                <div style="background-color: #0b0f19; padding: 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; text-align: center;">
                    <div style="max-width: 500px; margin: 0 auto; background-color: #111827; border: 1px solid rgba(255,255,255,0.06); padding: 40px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
                        <h2 style="color: #6366f1; margin-top: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.02em;">Pipeline Updated</h2>
                        <p style="color: #9ca3af; font-size: 15px; line-height: 1.6; text-align: left; margin-bottom: 8px;">Hello <strong>{self.request.user.username}</strong>,</p>
                        <p style="color: #9ca3af; font-size: 14px; line-height: 1.6; text-align: left; margin-bottom: 24px;">A new blueprint milestone has successfully initialized inside your pipeline.</p>
                        
                        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 16px; padding: 20px; text-align: left; margin-bottom: 24px;">
                            <h4 style="color: #ffffff; margin: 0 0 6px 0; font-size: 16px; font-weight: 600;">{event.title}</h4>
                            <p style="color: #9ca3af; margin: 0 0 16px 0; font-size: 13px; line-height: 1.5;">{event.description or 'No supplementary context provided.'}</p>
                            
                            <div style="display: inline-block; padding: 6px 12px; background: rgba(99, 102, 241, 0.08); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.15); border-radius: 20px; font-size: 12px; font-weight: 500;">
                                ⏱️ {start_formatted} — {end_formatted}
                            </div>
                        </div>
                    </div>
                </div>
                """
                
                send_mail(
                    subject=subject,
                    message=message_text,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[self.request.user.email],
                    html_message=html_message,
                    fail_silently=False,
                )
        except Exception as e:
            print(f"Failed to transmit scheduling notification: {e}")
        # -------------------------------------