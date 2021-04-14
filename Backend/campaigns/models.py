from django.db import models
from datetime import datetime



# Create your models here.
class Campaign(models.Model):
    title = models.CharField(max_length=100, blank=False, default='')
    owner = models.CharField(max_length=100, blank=True, default='')
    description = models.TextField(max_length=5000, blank=False, default='')
    category = models.CharField(max_length=70, blank=False, default='')
    subcategory = models.CharField(max_length=100, blank=False, default='')
    country = models.CharField(max_length=70, blank=False, default='')
    raisedAmmount = models.CharField(max_length=100, blank=False, default='0')
    targetammount = models.CharField(max_length=100, blank=False, default='0')
    backers = models.CharField(max_length=100, blank=True, default='0')
    summary =  models.TextField(max_length=5000, blank=False, default='') 
    details =  models.TextField(max_length=5000, blank=False, default='')
    intro =  models.TextField(max_length=5000, blank=False, default='')
    impact =  models.TextField(max_length=5000, blank=False, default='')
    status = models.CharField(max_length=100, blank=True, default='')
    comment =  models.TextField(max_length=5000, blank=True, default='')
    targetDate = models.DateField()
    PhotoFileName = models.CharField(max_length=100)
    PhotoFileName2 = models.CharField(max_length=100)
    PhotoFileName3 = models.CharField(max_length=100)
    published = models.BooleanField(default=False)
