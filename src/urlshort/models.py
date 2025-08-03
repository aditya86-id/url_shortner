from django.db import models

# Create your models here.
class SHortURL(models.Model):
    original_url = models.URLField(max_length=700)
    time_date_created = models.DateTimeField()
    short_url = models.CharField(max_length=100)
    
