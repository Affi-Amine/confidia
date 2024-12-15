from rest_framework import serializers
from .models import Project, User, Notification, NotificationProject, NotificationUser, Script

class ScriptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Script
        fields = ('id', 'content')
        
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['project_id', 'project_name', 'project_description', 'created_at', 'updated_at']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id_user', 'name', 'surname', 'email', 'github', 
            'pays', 'phone', 'image', 'projects', 'created_at', 'updated_at'
        ]

class NotificationSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = Notification
        fields = [
            'notification_id', 'type', 'author', 'notification_title', 
            'notification_message', 'context', 'created_at', 'updated_at'
        ]

class NotificationProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationProject
        fields = ['notification', 'project']

class NotificationUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationUser
        fields = ['notification', 'user']
