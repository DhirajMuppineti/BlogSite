# Generated by Django 4.2.1 on 2023-07-04 06:13

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("blog", "0004_alter_blog_lastupdated"),
    ]

    operations = [
        migrations.AlterField(
            model_name="blog",
            name="lastupdated",
            field=models.DateField(default=datetime.date(2023, 7, 4)),
        ),
    ]
