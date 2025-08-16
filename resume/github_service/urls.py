from django.urls import path
from . import views

urlpatterns = [
    path("user/<str:username>/resume/", views.profile_view, name="user_resume"),
]
