from django.apps import AppConfig
from django.conf import settings
import os
import joblib

class SentimentAnalyserConfig(AppConfig):
    model_path = os.path.join(settings.BASE_DIR, 'app', 'models', 'NoLemmatizationPartialStopwordRemovalWithStemming_model.pkl')
    vectorizer_path = os.path.join(settings.BASE_DIR, 'app', 'models', 'NoLemmatize_cv.pkl')
    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)

    name = 'app'


