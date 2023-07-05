from django.shortcuts import render,redirect
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import *
from .serializers import *

from rest_framework import permissions
from rest_framework import viewsets
from rest_framework import response
from rest_framework.views import APIView

    
class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-likes')
    serializer_class = BlogSerializer
    permission_classes = [permissions.AllowAny]
    
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('commented_date')
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]

class LikedPostViewSet(viewsets.ModelViewSet):
    queryset = LikedPost.objects.all()
    serializer_class = LikedPostSerializer
    permission_classes = [permissions.AllowAny]
    
    