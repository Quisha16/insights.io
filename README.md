# insights.io

## Software Tools and Technology
```Django``` ```React``` ```Python``` ```Sqlite```

## UI
![Screenshot 2024-06-15 124518](https://github.com/user-attachments/assets/768071a1-465b-4420-91ac-3392121b1a79)
![Screenshot 2024-06-15 125521](https://github.com/user-attachments/assets/80dcb96a-3ab9-4d28-9c2a-0fba1c66ac96)
![Screenshot 2024-06-15 125634](https://github.com/user-attachments/assets/bd58e955-4aa5-4d70-a39b-c261be326228)
![Screenshot 2024-06-15 125834](https://github.com/user-attachments/assets/356c7e97-8815-4aff-9cdb-cd365eb24246)
![Screenshot 2024-06-15 130058](https://github.com/user-attachments/assets/32c560ba-964d-4849-b19f-0aa79d33f887)
![Screenshot 2024-06-15 130135](https://github.com/user-attachments/assets/ed760678-772a-412b-9436-ed3b136a6497)



## Setting up local environment

    Install Python (version 3.12): 
    Link: https://www.python.org/downloads/

    Install nodejs: 
    Link: https://nodejs.org/en/download/package-manager

    Clone repository: 
                                                    > git clone https://github.com/Quisha16/insights.io.git
                                                    > cd insights.io
    BACKEND SETUP
                                                    > cd backend                                                    
    Create virtual environment:  
                                                    > python -m venv venv
    Activate virtual environment: 
                                                    > .\venv\Scripts\activate
    Install python packages:
                                                    > pip install -r requirements.txt
                                                    
    Download nltk packages mentioned in insights.io\backend\app\utils.py:
                                                    > nltk.download('stopwords')
                                                    > nltk.download('punkt')
                                                    > nltk.download('wordnet')
                                                    > nltk.download('vader_lexicon')
    Create django admin superuser if necessary:
                                                    > python manage.py createsuperuser
    Migrate Django models:
                                                    > python manage.py migrate
                                                    
    Install Chromedriver matching your Chrome version: 
    Link: https://googlechromelabs.github.io/chrome-for-testing/#stable  
    
    Update Chromedriver path in insights.io\backend\app\utils.py:  
    CHROMEDRIVER_PATH = "path/to/chromedriver.exe"
                                                  
    Run the Django development server:   
                                                    > python manage.py runserver
    FRONTEND SETUP
                                                    > cd insights.io
                                                    > cd frontend
    Install npm packages:
                                                    > npm install
    Build the React application:
                                                    > npm run build
    Start React application:
                                                    > npm run
    
    
