# Generated by Django 5.0.3 on 2024-03-30 03:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_rename_reviews_review'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='sentiment_prediction',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
