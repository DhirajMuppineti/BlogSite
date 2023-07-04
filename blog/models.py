
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from ckeditor.fields import RichTextField


User=get_user_model()

# Create your models here.    
class Blog(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=50,null=True)
    content= RichTextField(blank = True,null = True)
    written_date = models.DateField(auto_now_add=True)
    lastupdated = models.DateField(default=timezone.now().date())
    likes = models.IntegerField(default=0)
    readCount = models.IntegerField(default=0)

    def __str__(self):
        return self.title
    
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()
    commented_date = models.DateField(auto_now_add=True)
    blog = models.ForeignKey(Blog,on_delete=models.CASCADE)
    username = models.CharField(max_length=100,default="",null=True)
    
    def save(self,*args, **kwargs):
        self.username = self.user.username
        super(Comment, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.user.username
    
class LikedPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    blog = models.ForeignKey(Blog,on_delete=models.CASCADE)
    
    def save(self,*args, **kwargs):
        if not self.pk:
            blog_to_like = Blog.objects.get(pk=self.blog.id)
            blog_to_like.likes +=1
            blog_to_like.save()
        super(LikedPost, self).save(*args, **kwargs)
            
            
    def delete(self,*args, **kwargs):
        blog_to_unlike = Blog.objects.get(pk=self.blog.id)
        blog_to_unlike.likes -=1
        blog_to_unlike.save()
        super(LikedPost, self).delete(*args, **kwargs)