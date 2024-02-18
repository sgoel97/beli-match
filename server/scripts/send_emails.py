import smtplib, ssl, csv
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def read_csv():
    with open('your_file.csv', newline='') as csvfile:
        csvreader = csv.reader(csvfile)
        for row in csvreader:
            print(row)

def make_email(sender_email, receiver_email):
    message = MIMEMultipart("alternative")
    message["Subject"] = "multipart test"
    message["From"] = sender_email
    message["To"] = receiver_email

    # Create the plain-text and HTML version of your message
    text = """\
    Hi,
    How are you?
    Real Python has many great tutorials:
    www.realpython.com"""
    
    html = """\
    <html>
    <body>
        <p>Hi,<br>
        How are you?<br>
        <a href="http://www.realpython.com">Real Python</a> 
        has many great tutorials.
        </p>
    </body>
    </html>
    """

    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    message.attach(part1)
    message.attach(part2)

    return message.as_string()


def send_email():

    port = 465  # For SSL
    # password = input("Type your password and press enter: ")
    password = "logz yylr goea rldv"

    # Create a secure SSL context
    context = ssl.create_default_context()

    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
        server.login("belimatch90@gmail.com", password)
        # TODO: Send email here
        
        receiver = "sgoel9@berkeley.edu"

        server.sendmail("belimatch90@gmail.com", receiver, make_email("belimatch90@gmail.com", receiver))
        server.sendmail("belimatch90@gmail.com", "timg51237@gmail.com", make_email("belimatch90@gmail.com", "timg51237@gmail.com"))
        print("Email sent!")


send_email()
