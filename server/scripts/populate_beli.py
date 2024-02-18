import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time
import json

import os

# Get the current working directory
cwd = os.getcwd()

# Construct the path to the service account key file
service_account_path = os.path.join(cwd, 'scripts', 'firebase-service-key.json')
cred = credentials.Certificate(service_account_path)
firebase_admin.initialize_app(cred)

db = firestore.client()

# Set up Chrome options
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run Chrome in headless mode (without GUI)
chrome_options.add_argument('--no-sandbox')  # Bypass OS security model
chrome_options.add_argument('--disable-dev-shm-usage')  # Overcome limited resource problems

# Set up the Chrome driver
chrome_service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=chrome_service, options=chrome_options)

def get_top_restaurants(beli_username):

    try:
        url = f'https://app.beliapp.com/lists/{beli_username}'

        # Navigate to the URL
        driver.get(url)

        # Optional: wait for JavaScript to render (if needed)
        time.sleep(5)  # Adjust sleep time according to your needs
    except Exception as e:
        print(f"Failed to populate data for {beli_username}: {e}")

    # Get the page source from Selenium
    page_source = driver.page_source

    # Use BeautifulSoup to format the HTML
    soup = BeautifulSoup(page_source, 'html.parser')
    # formatted_html = soup.prettify()

    # Parsing part: Find elements using BeautifulSoup
    top_restaurants = []

    for i, element in enumerate(soup.find_all('p', {'class': 'text-item-title'})):  # Customize tag and class
        name = element.text.split('.')[1].strip()
        # print(name)
        top_restaurants.append({'name': name})

    for i, element in enumerate(soup.find_all('p', {'class': 'text-item-subtitle'})):  # Customize tag and class
        # even numbers are price and tags
        if (i%2 == 0):
            # dollar, tags, *_ = element.text.split('|')
            array = element.text.split('|')
            # print(array)
            dollar = array[0].strip()
            tags = []
            if len(array) > 1:
                tags = [tag.strip() for tag in array[1].split(",")]
            top_restaurants[i//2]['price'] = dollar.strip()
            top_restaurants[i//2]['tags'] = tags
        else:
            # odd numbers are locations
            location = element.text.strip()
            top_restaurants[i//2]['location'] = location

    print(top_restaurants)
    return top_restaurants

def populate_restaurants_from_beli(user_id):
    beli_username = db.collection('users').document(user_id).get().to_dict().get('beli', None)
    beli_restaurants = db.collection('users').document(user_id).get().to_dict().get('top_beli_restaurants', None)
    if beli_username and not beli_restaurants:
        beli_username = beli_username.strip('@')
        top_restaurants = get_top_restaurants(beli_username)
        db.collection('users').document(user_id).update({'top_beli_restaurants': top_restaurants})
    else:
        print(f'User {user_id} does not have a beli username or already has top beli restaurants')

def populate_all_beli_restaurants():
    users_ref = db.collection('users')
    docs = users_ref.stream()
    for doc in docs:
        # populate_restaurants_from_beli(doc.id)
        populate_restaurants_from_beli(doc.id)
        time.sleep(1)

# def populate_all_beli_restaurants():
#     users_ref = db.collection('users')
#     docs = users_ref.stream()
#     for doc in docs:
#         # populate_restaurants_from_beli(doc.id)
#         user_dict = doc.to_dict()
#         beli_username, beli_restaurants = user_dict.get('beli', None), user_dict.get('top_beli_restaurants', None)
#         if beli_username and not beli_restaurants:
#             beli_username = beli_username.strip('@')
#             top_restaurants = get_top_restaurants(beli_username)
#             # update the document with the top restaurants
#             db.collection('users').document(doc.id).update({'top_beli_restaurants': top_restaurants})
#         else:
#             print(f'User {doc.id} does not have a beli username or already has top beli restaurants')


def download_all_data_as_json():
    users_ref = db.collection('users')
    docs = users_ref.stream()
    user_dict = {}
    for doc in docs:
        user_dict[doc.id] = doc.to_dict()
    with open('user_data.json', 'w') as file:
        json.dump(user_dict, file)

# download_all_data_as_json()
# populate_restaurants_from_beli('sgoel9@berkeley.edu')
# populate_all_beli_restaurants()
# Close the browser
driver.quit()