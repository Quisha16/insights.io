from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import form_submit, dashboard, get_customer_rating, get_customer_overtime_sentiment, get_customer_overtime_positive_sentiment, get_sentiment_prediction
urlpatterns = [
    path('', form_submit, name='home'),
    path('dashboard/', dashboard, name='dashboard'),
    path('customer_rating/', get_customer_rating, name='customer_rating'),
    path('customer_overtime_positive_sentiment/', get_customer_overtime_positive_sentiment, name='customer_overtime_positive_sentiment'),
    path('customer_overtime_sentiment/', get_customer_overtime_sentiment, name='customer_overtime_sentiment'),
    path('sentiment_prediction/', get_sentiment_prediction, name='sentiment_prediction'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)