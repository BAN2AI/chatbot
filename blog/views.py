from django.shortcuts import render

def login (req) :
    data = ['lorem', 'ipsum', 'ads dolorem']
    return render(req, 'login/login.html', {'data' : data})

def logup (req) :
    return render(req, 'logup/logup.html')

def index (req) :
    return render(req, 'index.html')