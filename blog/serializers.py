from rest_framework import serializers
from .models import Blog,LikedPost,Comment,User

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'
        
class LikedPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikedPost
        fields = '__all__'
        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        
    
