# events/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Event

# Serializer to securely register users
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        # Using create_user ensures the plain-text password gets properly hashed
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

# Serializer to manage Event CRUD entries
class EventSerializer(serializers.ModelSerializer):
    # Hide user field representation; it will be injected automatically during creation
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Event
        fields = ('id', 'user', 'title', 'description', 'start_time', 'end_time', 'created_at')