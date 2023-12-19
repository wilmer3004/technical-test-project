from django.db import models


# Create your models here.

# Modelo de ciudad
class Ciudad(models.Model):
    idCiudad = models.AutoField(primary_key=True)
    nombreCiudad = models.CharField(max_length=255, null=False)
    estadoCiudad = models.BooleanField(null=False)

# Modelo de ocupacion
class Ocupacion(models.Model):
    idOcupacion = models.AutoField(primary_key=True)
    nombreOcupacion = models.CharField(max_length=115, null=False)
    estadoOcupacion = models.BooleanField(null=False)

# Modelo de cliente
class Cliente(models.Model):
    numIdentCliente = models.BigIntegerField(primary_key=True, null = False, unique=True)
    nombresCliente = models.CharField(max_length=85, null=False)
    apellidosCliente = models.CharField(max_length=85, null=False)
    correoCliente = models.CharField(max_length=255, null=False, unique=True)
    correoCliente = models.BigIntegerField(null=False, unique=True)
    fechaNacimientoCiene = models.DateField()
    estadoCliente = models.BooleanField(null=False)
    clienteEsViable = models.BooleanField(null=False, default=False)
    idCiudadFk = models.ForeignKey(Ciudad, on_delete=models.CASCADE)
    idOcupacionFk = models.ForeignKey(Ocupacion, on_delete=models.CASCADE)


