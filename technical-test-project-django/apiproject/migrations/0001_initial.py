# Generated by Django 5.0 on 2023-12-19 13:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ciudad',
            fields=[
                ('idCiudad', models.AutoField(primary_key=True, serialize=False)),
                ('nombreCiudad', models.CharField(max_length=255)),
                ('estadoCiudad', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Ocupacion',
            fields=[
                ('idOcupacion', models.AutoField(primary_key=True, serialize=False)),
                ('nombreOcupacion', models.CharField(max_length=115)),
                ('estadoOcupacion', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('numIdentCliente', models.BigIntegerField(primary_key=True, serialize=False, unique=True)),
                ('nombresCliente', models.CharField(max_length=85)),
                ('apellidosCliente', models.CharField(max_length=85)),
                ('correoCliente', models.BigIntegerField(unique=True)),
                ('estadoCliente', models.BooleanField()),
                ('clienteEsViable', models.BooleanField()),
                ('idCiudadFk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apiproject.ciudad')),
                ('idOcupacionFk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apiproject.ocupacion')),
            ],
        ),
    ]
