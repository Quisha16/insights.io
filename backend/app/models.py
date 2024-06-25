from django.db import models  # type: ignore

class Review(models.Model):
    created_at = models.DateField(null=True)
    review_text = models.TextField()
    cleaned_review_text = models.TextField(null=True, blank=True)
    rating = models.FloatField()
    sentiment_prediction = models.IntegerField(null=True, blank=True)