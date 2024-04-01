from django.shortcuts import render
from django.contrib import messages
from django.conf import settings
from django.db.models import Count
from django.db.models.functions import TruncMonth, TruncYear
from django.http import JsonResponse, HttpResponse, FileResponse
from django.template import loader
from .models import Review
from .model_predictions import predict
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import csv
import io
import pandas as pd
import numpy  as np
import tempfile
import os
import base64

def upload(request):
    # NOTES: Validate the dates to ensure YYYY-MM-DD format
    #        Validate the reviews to ensure no commas in the review
    if request.method == 'POST':
        # Delete all existing records in the Review table
        Review.objects.all().delete()

        new_review_data = request.FILES['myfile']
        
        if not new_review_data.name.endswith('csv'):
            messages.info(request, 'Please upload CSV files only.')
            return render(request, 'home.html')
        else:
            messages.info(request, 'File successfully uploaded.')

        data = new_review_data.read().decode('UTF-8')
        io_string = io.StringIO(data)
        next(io_string)
        for column in csv.reader(io_string, delimiter=',', quotechar='|'):
            created = Review.objects.update_or_create(
                created_at = column[0],
                review_text = column[1],
                rating = column[2]
            )
        predict()
        return render(request, 'dashboard.html')
        
    return render(request, 'home.html')

def reviews(request):
    review = Review.objects.all()

    data = {  'created_at': [obj.created_at for obj in review],
                'review_text': [obj.review_text for obj in review],
                'rating': [obj.rating for obj in review],
            }
    df = pd.DataFrame(data)
    rating = df.rating
    
    context = {
        'review': review,  
    }

    return render(request, 'reviews.html', context)

def get_sentiment_prediction(request):
    # Query to get the count of each rating value
    prediction_data = Review.objects.values('sentiment_prediction').annotate(count=Count('sentiment_prediction'))
    prediction_data = {entry['sentiment_prediction']: entry['count'] for entry in prediction_data}
    return JsonResponse({'prediction_data': prediction_data}, safe=False)

def get_customer_rating(request):
    # Query to get the count of each rating value
    rating_data = Review.objects.values('rating').annotate(count=Count('rating'))
    rating_data = {entry['rating']: entry['count'] for entry in rating_data}
    return JsonResponse({'rating_data': rating_data}, safe=False)

def get_customer_overtime_positive_sentiment(request):
    # Query to get the count of 1 values for each month and year
    one_sentiment_by_month_year = Review.objects.filter(sentiment_prediction=1).annotate(month=TruncMonth('created_at'), year=TruncYear('created_at')).values('month', 'year').annotate(count=Count('id'))
    overtime_sentiment_data = {
        f"{entry['year'].strftime('%Y')}-{entry['month'].strftime('%m')}": entry['count']
        for entry in one_sentiment_by_month_year
    }

    #rating_data = Review.objects.values('rating').annotate(count=Count('rating'))
    #overtime_rating_data = {review.created_at.strftime('%Y-%m-%d'): review.sentiment_prediction for review in reviews}
    return JsonResponse({'overtime_sentiment_data': overtime_sentiment_data}, safe=False)


def get_customer_overtime_sentiment(request):
    zero_sentiment_by_month_year = Review.objects.filter(sentiment_prediction=0).annotate(month=TruncMonth('created_at'), year=TruncYear('created_at')).values('month', 'year').annotate(count=Count('id')).order_by('year', 'month')
    one_sentiment_by_month_year = Review.objects.filter(sentiment_prediction=1).annotate(month=TruncMonth('created_at'), year=TruncYear('created_at')).values('month', 'year').annotate(count=Count('id')).order_by('year', 'month')
    zero_overtime_sentiment_data = {
        f"{entry['year'].strftime('%Y')}-{entry['month'].strftime('%m')}": entry['count']
        for entry in zero_sentiment_by_month_year
    }
    one_overtime_sentiment_data = {
        f"{entry['year'].strftime('%Y')}-{entry['month'].strftime('%m')}": entry['count']
        for entry in one_sentiment_by_month_year
    }

    print(zero_overtime_sentiment_data)
    print(one_overtime_sentiment_data)
    
    response_data = {
        'zero_overtime_sentiment_data': zero_overtime_sentiment_data,
        'one_overtime_sentiment_data': one_overtime_sentiment_data
    }
    return JsonResponse(response_data, safe=False)

def dashboard(request):
    image_path = generate_wordcloud()
    context = {'image_path': image_path}
    return render(request, 'dashboard.html', context)

def generate_wordcloud():
    data = {'word1': 100, 'word2': 80, 'word3': 50, 'word4': 30, 'word5': 20}
    wordcloud = WordCloud(background_color='white', colormap='Pastel1').generate_from_frequencies(data)

    image_dir = settings.MEDIA_ROOT
    os.makedirs(image_dir, exist_ok=True)
    image_filename = os.path.join(image_dir, 'wordcloud.png')
    wordcloud.to_file(image_filename)

    with open(image_filename, 'rb') as f:
        image_data = base64.b64encode(f.read()).decode('utf-8')
    print(settings.MEDIA_ROOT)
    return image_filename