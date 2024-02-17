from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time

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
print("trying to find elements")
for element in soup.find_all('tag', {'class': 'text-item-title'}):  # Customize tag and class
    print(element.text)  # or any other attribute or operation

# Define the filename for the prettified HTML content
file_path = current_dir + '/formatted_webpage_source_will.txt'

# Save the formatted HTML to a file
with open(file_path, 'w', encoding='utf-8') as file:
    file.write(formatted_html)

print(f"The formatted HTML has been saved as '{file_path}'.")