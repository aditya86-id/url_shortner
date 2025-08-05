from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request,'home.html')


def createSHortURL(request):
    pass

def redirect(request):
    pass