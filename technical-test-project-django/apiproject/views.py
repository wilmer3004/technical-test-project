from rest_framework import viewsets
from .models import * 
from .serializer import *

# Create your views here.

# View ciudad
class CiudadViewSet(viewsets.ModelViewSet):
    queryset=Ciudad.objects.all()
    serializer_class=CiudadSerializer

# View cliente
class ClienteViewSet(viewsets.ModelViewSet):
    queryset=Cliente.objects.all()
    serializer_class=ClienteSerializer

# View ocupacion
class OcupacionViewSet(viewsets.ModelViewSet):
    queryset=Ocupacion.objects.all()
    serializer_class=OcupasionSerializer




