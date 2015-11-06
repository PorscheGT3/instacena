from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse

from .models import Video

def index(request):
	template = loader.get_template('test_cena/index.html')
	return HttpResponse(template.render())
