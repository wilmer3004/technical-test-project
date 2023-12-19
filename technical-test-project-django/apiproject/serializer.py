from rest_framework import serializers

from .models import *

# serializador ciudad
class CiudadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciudad
        fields = '__all__'

# serializador ocupacion
class OcupasionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ocupacion
        fields = '__all__'

# serializador cliente
class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'





