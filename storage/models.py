from email.policy import default
from django.db import models

# Create your models here.
class Champion(models.Model):
  name=models.CharField(max_length=50, default="Aatrox")
  region=models.CharField(max_length=50, default="Runeterra")
  image=models.URLField(default="")
 
  def __str__(self):
    return self.name