from django.urls import path,include
from rest_framework import routers
from apiproject import views

# instancia de DefaultRouter
router=routers.DefaultRouter()

# Urls
router.register(r'clientes',views.ClienteViewSet)
router.register(r'ciudades', views.CiudadViewSet)
router.register(r'ocupaciones', views.OcupacionViewSet)

# Url principal
urlpatterns=[
    path('',include(router.urls)),

]


