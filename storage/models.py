from email.policy import default
from django.db import models

# Create your models here.
class Champion(models.Model):
  name=models.CharField(max_length=50, default="Aatrox")
  region=models.CharField(max_length=50, default="Runeterra")
  release_date=models.CharField(max_length=50, default="")
  image=models.URLField(default="")
  imagePosition=models.CharField(max_length=50, default="50% 50%")
 
  def __str__(self):
    return self.name