import io
import csv
from datetime import datetime, timedelta
from django.shortcuts import render
from django.contrib import messages
from django.db.models import Count, Max
from django.db.models.functions import TruncMonth, TruncYear
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import Review
from .utils import predict_sentiment, generate_wordcloud, process_product_link, get_negative_aspects

IMAGE_PATH=''

@ensure_csrf_cookie
def form_submit(request):
    if request.method == 'POST':
        Review.objects.all().delete()

        if 'myfile' in request.FILES:
            review_data = request.FILES['myfile']
            
            if not review_data.name.endswith('csv'):
                messages.info(request, 'Please upload CSV files only.')
                return render(request, 'home.html')
            else:
                messages.info(request, 'File successfully uploaded.')

            data = review_data.read().decode('UTF-8')
            io_string = io.StringIO(data)
            next(io_string)
            for column in csv.reader(io_string, delimiter=',', quotechar='"'):
                try:
                    Review.objects.update_or_create(
                        created_at=column[0],
                        review_text=column[1],
                        rating=float(column[2])  # Convert rating to float
                    )
                except ValueError as e:
                    messages.error(request, f"Error processing row {column}: {e}")
                    continue
        elif 'product_link' in request.POST:  
            product_link = request.POST['product_link']
            try:
                review_data = process_product_link(product_link)

                for index, row in review_data.iterrows():
                    Review.objects.update_or_create(
                        created_at=row['Date'],
                        review_text=row['Review'],
                        rating=float(row['Rating'])
                    )
            except Exception as e:
                messages.error(request, 'Error fetching data from the provided link:')
                return render(request, 'home.html')

        predict_sentiment()
        IMAGE_PATH = generate_wordcloud()
        
        return JsonResponse({'message': 'Form submitted successfully'})
        
    return render(request, 'home.html')

def get_sentiment_prediction(request):
    prediction_data = Review.objects.values('sentiment_prediction').annotate(count=Count('sentiment_prediction')).order_by('sentiment_prediction')
    prediction_data = {entry['sentiment_prediction']: entry['count'] for entry in prediction_data}
    return JsonResponse({'prediction_data': prediction_data}, safe=False)

def get_customer_rating(request):
    rating_data = Review.objects.values('rating').annotate(count=Count('rating'))
    rating_data = {entry['rating']: entry['count'] for entry in rating_data}
    return JsonResponse({'rating_data': rating_data}, safe=False)

def get_customer_overtime_positive_sentiment(request):
    one_sentiment_by_month_year = Review.objects.filter(sentiment_prediction=1).annotate(month=TruncMonth('created_at'), year=TruncYear('created_at')).values('month', 'year').annotate(count=Count('id'))
    overtime_sentiment_data = {
        f"{entry['year'].strftime('%Y')}-{entry['month'].strftime('%m')}": entry['count']
        for entry in one_sentiment_by_month_year
    }
    return JsonResponse({'overtime_sentiment_data': overtime_sentiment_data}, safe=False)

def get_customer_overtime_sentiment(request):
    zero_sentiment_by_month_year = Review.objects.filter(sentiment_prediction=0).annotate(
                    month=TruncMonth('created_at'), year=TruncYear('created_at')).values(
                    'month', 'year').annotate(count=Count('id')).order_by('year', 'month')
    one_sentiment_by_month_year = Review.objects.filter(sentiment_prediction=1).annotate(
                    month=TruncMonth('created_at'), year=TruncYear('created_at')).values(
                    'month', 'year').annotate(count=Count('id')).order_by('year', 'month')
    zero_overtime_sentiment_data = {
        f"{entry['year'].strftime('%Y')}-{entry['month'].strftime('%m')}": entry['count']
        for entry in zero_sentiment_by_month_year
    }
    one_overtime_sentiment_data = {
        f"{entry['year'].strftime('%Y')}-{entry['month'].strftime('%m')}": entry['count']
        for entry in one_sentiment_by_month_year
    }
    response_data = {
        'zero_overtime_sentiment_data': zero_overtime_sentiment_data,
        'one_overtime_sentiment_data': one_overtime_sentiment_data
    }
    return JsonResponse(response_data, safe=False)

def get_sentiment_info(request):
    prediction_data = Review.objects.values('sentiment_prediction').annotate(count=Count('sentiment_prediction')).order_by('sentiment_prediction')
    prediction_data = {entry['sentiment_prediction']: entry['count'] for entry in prediction_data}

    latest_review_date = Review.objects.aggregate(latest_date=Max('created_at'))['latest_date']
    last_month = latest_review_date - timedelta(days=latest_review_date.day)  
    last_month_positive_reviews = Review.objects.filter(sentiment_prediction=1, created_at__year=last_month.year, created_at__month=last_month.month).count()
    last_month_negative_reviews = Review.objects.filter(sentiment_prediction=0, created_at__year=last_month.year, created_at__month=last_month.month).count()
    
    
    response_data = {
        'prediction_data': prediction_data,
        'last_month_reviews': {
            'positive': last_month_positive_reviews,
            'negative': last_month_negative_reviews
        }
    }
    return JsonResponse(response_data, safe=False)

def get_aspects(request):
    negative_aspects = get_negative_aspects()
    return JsonResponse({'negative_aspects': negative_aspects}, safe=False)

def dashboard(request):
    IMAGE_PATHS = generate_wordcloud()
    context = {'positive_wordcloud_image_path': IMAGE_PATHS['positive_wordcloud_image'], 'negative_wordcloud_image_path': IMAGE_PATHS['negative_wordcloud_image']}
    return JsonResponse({'message': 'Dashboard display.'})