from django.apps import AppConfig
from django.conf import settings
from transformers import BertTokenizer, BertForSequenceClassification
import os
import joblib

class SentimentAnalyserConfig(AppConfig):
    #ML model
    model_path = os.path.join(settings.BASE_DIR, 'app', 'models', 'NoLemmatizationPartialStopwordRemovalWithStemming_model.pkl')
    vectorizer_path = os.path.join(settings.BASE_DIR, 'app', 'models', 'NoLemmatize_cv.pkl')
    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)

    # Load BERT model and tokenizer
    # model_path = os.path.join(settings.BASE_DIR, 'app', 'models', 'model')
    # tokeniser_path = os.path.join(settings.BASE_DIR, 'app', 'models', 'tokeniser')
    # tokenizer = BertTokenizer.from_pretrained(tokeniser_path)
    # model = BertForSequenceClassification.from_pretrained(model_path)

    name = 'app'


