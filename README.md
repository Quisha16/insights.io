# insights.io

## Software Tools and Technology
```Django``` ```React``` ```Python``` ```Sqlite```

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
    
    
