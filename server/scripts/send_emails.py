import smtplib, ssl


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
        message = """\
Subject: Hi there

This message is sent from Python."""
        server.sendmail("belimatch90@gmail.com", receiver, message)
        server.sendmail("belimatch90@gmail.com", "timg51237@gmail.com", message)
        print("Email sent!")


send_email()