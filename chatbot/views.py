from django.shortcuts import render

def home (request) :
    return render(request,'home.html')

def about (req) :
    return render(req, 'pages/about.html')