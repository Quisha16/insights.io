# Please download following nltk resources
#nltk.download('stopwords'), nltk.download('punkt'), nltk.download('wordnet')

from django.conf import settings
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.stem import SnowballStemmer
from nltk.tokenize import word_tokenize
from collections import Counter
from wordcloud import WordCloud
from datetime import datetime
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import numpy as np
import re
import os
import pandas as pd
from .models import Review
from .apps import SentimentAnalyserConfig

CHROMEDRIVER_PATH = "C:\\Users\\Quisha Coutinho\\GoogleDriver\\chromedriver-win64\\chromedriver.exe"
AMAZON_LOGIN_URL = "https://www.amazon.in/gp/sign-in.html"

Cstopwords = set(stopwords.words('english'))
lemma = WordNetLemmatizer()
stemmer=SnowballStemmer('english')

def preprocess_reviews():
    reviews = Review.objects.all()
    cleaned_reviews = []

    for review in reviews:
        cleaned_review = review.review_text.lower()
        cleaned_review = re.sub('[^a-zA-Z]',' ', cleaned_review)
        cleaned_review = word_tokenize(cleaned_review)
        #cleaned_review = [stemmer.stem(w) for w in cleaned_review if w not in Cstopwords]
        cleaned_review = [lemma.lemmatize(w) for w in cleaned_review if w not in Cstopwords]
        cleaned_review = ' '.join(cleaned_review)
        cleaned_reviews.append(cleaned_review)
        review.cleaned_review_text = cleaned_review
        review.save()

    return cleaned_reviews

def predict_sentiment():
    cleaned_reviews = preprocess_reviews()
    reviews = Review.objects.all()

    predictions = []
    probabilities = []    
    for review in reviews:
        vector = SentimentAnalyserConfig.vectorizer.transform([review.cleaned_review_text])
        prediction = int(SentimentAnalyserConfig.model.predict(vector)[0])
        proba = np.max(SentimentAnalyserConfig.model.predict_proba(vector))
        probabilities.append(round(proba * 100, 2))
        predictions.append(prediction)
        review.sentiment_prediction = prediction
        review.save()

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

def generate_wordcloud():
    df = get_reviews()
    word_freq = Counter()

    for review in df['review_text']:
        review = review.lower()
        review = re.sub('[^a-zA-Z]',' ', review)
        review = word_tokenize(review)
        review = [word for word in review if not word in Cstopwords]
        word_freq.update(review)

    wordcloud = WordCloud(stopwords=Cstopwords, max_words=20, background_color="white", colormap='Pastel1').generate_from_frequencies(word_freq)
    
    image_dir = settings.MEDIA_ROOT
    os.makedirs(image_dir, exist_ok=True)
    image_filename = os.path.join(image_dir, 'wordcloud.png')
    wordcloud.to_file(image_filename)

    return image_filename

def login_amazon(driver):
    try:
        driver.get(AMAZON_LOGIN_URL)
        email_input = driver.find_element(By.ID, "ap_email")
        email_input.send_keys("lizzencamelo02@gmail.com")

        continue_button = driver.find_element(By.ID, "continue")
        continue_button.click()

        password_input = driver.find_element(By.ID, "ap_password")
        password_input.send_keys("K1ll1ngC0mm;")

        sign_in_button = driver.find_element(By.ID, "signInSubmit")
        sign_in_button.click()

        WebDriverWait(driver, 10).until(EC.url_contains("https://www.amazon.in/"))
        print("Login successful")

    except Exception as e:
        print(f"Error during login: {e}")

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

    for page_num in range(10):  
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
    print(url)
    service = Service(CHROMEDRIVER_PATH)
    driver = webdriver.Chrome(service=service)
    driver.set_page_load_timeout(5000)

    login_amazon(driver)
    
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