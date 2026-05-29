# events/models.py
from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    # cascade ensures that deleting a user profile automatically purges their schedule entries
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.user.username})"