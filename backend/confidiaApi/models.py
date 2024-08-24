from django.db import models

# Create your models here.

class Script(models.Model):
    content = models.TextField(max_length=560)


class Test(models.Model):
    new_content = models.TextField(max_length=560)
    
# These are the models. 

class Notification(models.Model):
    notification_id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=20, choices=(
        ('activity', 'Activity'),
        ('message', 'Message'),
        ('alert', 'Alert'),
        ('report', 'Report')
    ))
    author = models.ForeignKey('User', on_delete=models.SET_NULL, null=True)  # ForeignKey to User
    notification_title = models.CharField(max_length=255)
    notification_message = models.TextField()
    context = models.TextField()  
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Project(models.Model):
    project_id = models.AutoField(primary_key=True)
    project_name = models.CharField(max_length=255)
    project_description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

# These are junction Tables
class NotificationProject(models.Model):
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

class NotificationUser(models.Model):
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

