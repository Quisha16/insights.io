# Generated by Django 5.0.3 on 2024-03-20 08:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_reviews_delete_review'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviews',
            name='created_at',
            field=models.DateField(null=True),
        ),
    ]
