from django.apps import AppConfig
from django.conf import settings
import os
import joblib

class SentimentAnalyserConfig(AppConfig):
    model_path = os.path.join(settings.BASE_DIR, 'app', 'models', 'model.pkl')
    vectorizer_path = os.path.join(settings.BASE_DIR, 'app', 'models', 'tfidf.pkl')
    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)

    name = 'app'


