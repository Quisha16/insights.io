import nltk
#nltk.download('stopwords')
#nltk.download('punkt')
#nltk.download('wordnet')
import re
import numpy as np
import random
import matplotlib.pyplot as plt
from bs4 import BeautifulSoup
from string import punctuation
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from .models import Review
from .apps import SentimentAnalyserConfig


Cstopwords=set(stopwords.words('english')+list(punctuation))
stemmer=SnowballStemmer('english')
lemma=WordNetLemmatizer()

def update_cleaned_reviews():
    reviews = Review.objects.all()

    for review in reviews:
        cleaned_review = review.review_text
        cleaned_review = re.sub('[^a-zA-Z]',' ', cleaned_review)
        cleaned_review = cleaned_review.lower()
        cleaned_review = word_tokenize(cleaned_review)
        #cleaned_review = [stemmer.stem(w) for w in cleaned_review if w not in Cstopwords]
        cleaned_review = [lemma.lemmatize(w) for w in cleaned_review if w not in Cstopwords]
        cleaned_review = ' '.join(cleaned_review)
        review.cleaned_review_text = cleaned_review
        review.save()

def predict():
    update_cleaned_reviews()
    reviews = Review.objects.all()
    predictions = []
    probabilities = []    
    for review in reviews:
        vector = SentimentAnalyserConfig.vectorizer.transform([review.cleaned_review_text])
        prediction = int(SentimentAnalyserConfig.model.predict(vector)[0])
        proba = np.max(SentimentAnalyserConfig.model.predict_proba(vector))
        probabilities.append(round(proba * 100, 2))
        probabilities.append(round(proba * 100, 2))
        
        review.sentiment_prediction = prediction
        review.save()
    
