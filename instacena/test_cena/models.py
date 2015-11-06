from django.db import models

class Video(models.Model):
	url = models.CharField(max_length=300)
	name = models.CharField(max_length=20, 
							primary_key=True)
	start_time = models.IntegerField()
	duration = models.IntegerField()