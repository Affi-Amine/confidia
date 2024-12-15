from django.db import models

class Script(models.Model):
    content = models.TextField(max_length=560)

class Test(models.Model):
    new_content = models.TextField(max_length=560)

class Notification(models.Model):
    notification_id = models.AutoField(primary_key=True)
    type = models.CharField(
        max_length=20, 
        choices=(
            ('activity', 'Activity'),
            ('message', 'Message'),
            ('alert', 'Alert'),
            ('report', 'Report')
        )
    )
    author = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, blank=True)  # ForeignKey to User
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
    id_user = models.CharField(max_length=255, unique=True, primary_key=True)
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    github = models.URLField(null=True, blank=True)  # Nullable
    pays = models.CharField(max_length=255)
    phone = models.CharField(max_length=20, blank=True, default='')  # Nullable
    image = models.URLField(null=True, blank=True)  # Nullable
    projects = models.JSONField(default=list)  # Default to an empty list
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

# Junction Tables
class NotificationProject(models.Model):
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

class NotificationUser(models.Model):
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
class Connector(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=50)  
    admin = models.ForeignKey(User, related_name="admin_connectors", on_delete=models.CASCADE)
    users = models.ManyToManyField(User, related_name="connectors")
    token = models.CharField(max_length=255, blank=True, null=True)
    repo_user = models.CharField(max_length=255, blank=True, null=True)
    repo_name = models.CharField(max_length=255, blank=True, null=True)