from django.db import models

# Create your models here.

class Script(models.Model):
    content = models.TextField(max_length=560)


class Test(models.Model):
    new_content = models.TextField(max_length=560)
