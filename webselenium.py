from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time
import json

import os

# Print the current working directory
current_dir = os.getcwd()

# Set up Chrome options
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run Chrome in headless mode (without GUI)

# Set up the Chrome driver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

# The URL you want to scrape
url = 'https://app.beliapp.com/lists/will570'

# Navigate to the URL
driver.get(url)

# Optional: wait for JavaScript to render (if needed)
time.sleep(5)  # Adjust sleep time according to your needs

# Get the page source from Selenium
page_source = driver.page_source

# Close the browser
driver.quit()

# Use BeautifulSoup to format the HTML
soup = BeautifulSoup(page_source, 'html.parser')
formatted_html = soup.prettify()

# Parsing part: Find elements using BeautifulSoup
top_restaurants = {}

for i, element in enumerate(soup.find_all('p', {'class': 'text-item-title'})):  # Customize tag and class
    name = element.text.split('.')[1].strip()
    print(name)
    top_restaurants[i] = {'name': name}


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
    # top_tags[i] = element.text

print(top_restaurants)
# write the dictionary as a json file
with open(current_dir + '/top_restaurants.json', 'w') as file:
    json.dump(top_restaurants, file)

# Define the filename for the prettified HTML content
# file_path = current_dir + '/formatted_webpage_source_will.txt'

# Save the formatted HTML to a file
# with open(file_path, 'w', encoding='utf-8') as file:
#     file.write(formatted_html)

# print(f"The formatted HTML has been saved as '{file_path}'.")