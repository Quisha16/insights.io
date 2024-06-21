#Please download the following nltk packages:
#nltk.download('stopwords')
#nltk.download('punkt')
#nltk.download('wordnet')
#nltk.download('vader_lexicon')
from django.conf import settings
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.stem import SnowballStemmer
from nltk.tokenize import word_tokenize
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from collections import Counter
from wordcloud import WordCloud
from textblob import TextBlob
from datetime import datetime
from bs4 import BeautifulSoup
from sklearn.metrics import accuracy_score
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from transformers import BertTokenizer, BertForSequenceClassification
import torch
import pandas as pd
import numpy as np
import re
import os
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap
from .models import Review
from .apps import SentimentAnalyserConfig

CHROMEDRIVER_PATH = "path\to\chromedriver.exe"

#nltk stopwords list without negative words
stopword_list = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 
             'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', 
             "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 
             'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 
             'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 
             'of', 'at', 'by', 'for', 'with', 'about', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 
             'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 
             'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
            'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'should',"should've", 
            'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ma', "'s"]
Cstopwords=set(stopwords.words('english'))
lemma = WordNetLemmatizer()
stemmer=SnowballStemmer('english')

def preprocess_reviews():
    reviews = Review.objects.all()
    cleaned_reviews = []

    for review in reviews:
        cleaned_review = review.review_text.lower()
        cleaned_review = re.sub('[^a-zA-Z]',' ', cleaned_review)
        cleaned_review = word_tokenize(cleaned_review)
        cleaned_review = [stemmer.stem(w) for w in cleaned_review if w not in stopword_list]
        cleaned_review = ' '.join(cleaned_review)
        cleaned_reviews.append(cleaned_review)
        review.cleaned_review_text = cleaned_review
        review.save()

    return cleaned_reviews

def process_reviews_absa():
    reviews = Review.objects.all()
    cleaned_reviews = []

    for review in reviews:
        cleaned_review = review.review_text.lower()
        cleaned_review = re.sub('[^a-zA-Z]',' ', cleaned_review)
        cleaned_review = word_tokenize(cleaned_review)
        cleaned_review = [w for w in cleaned_review if w not in stopword_list]
        cleaned_review = ' '.join(cleaned_review)
        cleaned_reviews.append(cleaned_review)

    return cleaned_reviews

def predict_sentiment():
    cleaned_reviews = preprocess_reviews()  #Uncomment for ML model
    reviews = Review.objects.all()

    predictions = []
    probabilities = []    
    true_labels = []

    # for review in reviews:
    #     inputs = SentimentAnalyserConfig.tokenizer(review.review_text, return_tensors='pt', truncation=True, padding=True, max_length=380) #change maxlen?
    #     with torch.no_grad():
    #         outputs = SentimentAnalyserConfig.model(**inputs)
    #     logits = outputs.logits
    #     prediction = torch.argmax(logits, dim=1).item()
    #     proba = torch.softmax(logits, dim=1).max().item()
    #     probabilities.append(round(proba * 100, 2))
    #     predictions.append(prediction)

    for review in reviews:   #Uncomment for ML model
        vector = SentimentAnalyserConfig.vectorizer.transform([review.cleaned_review_text])
        prediction = int(SentimentAnalyserConfig.model.predict(vector)[0])
        proba = np.max(SentimentAnalyserConfig.model.predict_proba(vector))
        probabilities.append(round(proba * 100, 2))
        predictions.append(prediction)

        true_label = 1 if review.rating >= 3 else 0
        true_labels.append(true_label)

        review.sentiment_prediction = prediction
        review.save()
    
    accuracy = accuracy_score(true_labels, predictions)
    print('Accuracy: ', accuracy)
    return probabilities, predictions


    
def get_reviews():
    review = Review.objects.all()
    data = {  
                'created_at': [obj.created_at for obj in review],
                'review_text': [obj.review_text.lower() for obj in review],
                'rating': [obj.rating for obj in review],
                'sentiment_prediction': [obj.sentiment_prediction for obj in review]
            }
    df = pd.DataFrame(data)
    return df

def save_wordcloud(name, reviews):
    colors = [ (0, "#0079E7"), (0.25,"#5291D3"),   (0.5, "#4921EC"), (0.75,"#6C22A6"),  (1, "#876CDF")]
    
    cmap = plt.cm.colors.LinearSegmentedColormap.from_list('custom_palette', colors)
    wordcloud = WordCloud(stopwords=stopword_list, max_words=20,  mode='RGBA', background_color=None, colormap=cmap);
    wordcloud.generate(reviews)
    image_dir = settings.MEDIA_ROOT
    os.makedirs(image_dir, exist_ok=True)
    image_filename = os.path.join(image_dir, name)
    wordcloud.to_file(image_filename)

    return image_filename
    

def generate_wordcloud():
    df = get_reviews()
    positive_reviews = []
    negative_reviews = []

    for review in df['review_text']:
        review = review.lower()
        review = re.sub('[^a-zA-Z]',' ', review)
        analysis = TextBlob(review)
        review = word_tokenize(review)
        review = [word for word in review if not word in Cstopwords]
        review = " ".join(review)
        if analysis.sentiment.polarity > 0:
            positive_reviews.append(review)
        elif analysis.sentiment.polarity < 0:
            negative_reviews.append(review)

    positive_reviews = ' '.join(positive_reviews)
    negative_reviews = ' '.join(negative_reviews)
        
    positive_wordcloud_image = save_wordcloud('wordcloud_positive.png', positive_reviews)
    negative_wordcloud_image = save_wordcloud('wordcloud_negative.png', negative_reviews)
    return {'positive_wordcloud_image': positive_wordcloud_image, 'negative_wordcloud_image': negative_wordcloud_image}

def get_negative_aspects():
    sid = SentimentIntensityAnalyzer()
    reviews = process_reviews_absa()

    negative_topics = {}
    for review in reviews:
        sentiment_scores = sid.polarity_scores(review)
        if sentiment_scores['compound'] < 0:
            words = nltk.word_tokenize(review)
            topics = [word for word, pos in nltk.pos_tag(words) if pos.startswith('NN')]
            for topic in topics:
                negative_topics[topic] = negative_topics.get(topic, 0) + 1

    negative_topics = dict(sorted(negative_topics.items(), key=lambda item: item[1], reverse=True))
    negative_topics = dict(list(negative_topics.items())[:20])

    return negative_topics
    
def get_amazon_search(url, driver):
    try:
        driver.get(url)
        return driver.page_source
    except Exception as e:
        print(f"Error: {e}")
        return None

def parse_review_data(page, driver):
    soup = BeautifulSoup(page, "html.parser")
    link = soup.find("a", {'data-hook': "see-all-reviews-link-foot"})['href']
    
    reviews = []
    dates = []
    ratings = []

    for page_num in range(15):  
        page_source = get_amazon_search('https://www.amazon.in'+link+'&pageNumber='+str(page_num), driver)
        soup = BeautifulSoup(page_source, features='lxml')

        for review in soup.findAll("div", {'data-hook': "review"}):
            review_text = review.find("span", {'data-hook': 'review-body'}).text.strip()
            review_date = review.find("span", {'data-hook': 'review-date'}).text.strip().split(' on ')[1]
            review_date = datetime.strptime(review_date, '%d %B %Y').strftime('%Y-%m-%d')
            review_rating = float(review.find("span", {'class': 'a-icon-alt'}).text.split()[0])

            reviews.append(review_text)
            dates.append(review_date)
            ratings.append(review_rating)

    review_data = pd.DataFrame({'Date': dates, 'Review': reviews, 'Rating': ratings})
    if not review_data.empty:
        return review_data
    else:
        print('ERROR: Failed to retrieve reviews.')
        return None

def process_product_link(url):
    service = Service(CHROMEDRIVER_PATH)
    driver = webdriver.Chrome(service=service)
    driver.set_page_load_timeout(500)

    page=get_amazon_search(url, driver)

    if page:
        review_data = parse_review_data(page, driver)
        if review_data is not None:
            scraper_dir = os.path.join(settings.BASE_DIR, 'app', 'webscraper')
            os.makedirs(scraper_dir, exist_ok=True)
            scraper_path = os.path.join(scraper_dir, 'AmazonReviews.csv')
            review_data.to_csv(scraper_path, index=False)
            print("Data saved to 'AmazonReviews.csv'")
            return review_data
        else:
            print("No review data found.")
    else:
        print("Failed to fetch search results.")

    driver.quit() 
