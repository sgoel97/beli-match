# Import necessary libraries
import requests
from bs4 import BeautifulSoup

# The URL of the webpage you want to scrape
url = 'https://app.beliapp.com/lists/wallie'

# Use requests to fetch the content of the URL
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Use Beautiful Soup to parse the HTML content
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Print the entire webpage content
    # Use .prettify() for better readability of the HTML structure
    print(soup.prettify())
else:
    print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
