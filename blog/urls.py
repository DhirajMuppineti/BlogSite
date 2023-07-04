
from django.urls import path,include
from . import views

from rest_framework import routers

app_name = 'blog'

router = routers.DefaultRouter()
router.register(r'blogs', views.BlogViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'likes',views.LikedPostViewSet)


urlpatterns = [
    path('api/', include(router.urls)),
]