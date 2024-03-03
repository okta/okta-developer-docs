This quickstart uses several packages to build the API  and consume access tokens from Okta. Install each of them with [Composer](https://getcomposer.org):

1. Add the required packages for your application with the following command:

   ```bash
   pip install requests==2.27.1
      Flask==2.0.2
      flask-cors==3.0.10
      python-dotenv==0.19.2
      pyOpenSSL==22.0.0
      Flask-Login==0.6.3
      Werkzeug==2.2.2
      pybase64==1.3.2
   ```

1. Use [dotenv](https://pypi.org/project/python-dotenv/) to manage your Okta credentials. Add the following to `app.py`:

   ```python
   from dotenv import load_dotenv
   ```

1. Use [flask](https://flask.palletsprojects.com/en/3.0.x/) to build your API on. Add the following below your previous code:

   ```python
   from flask import Flask, make_response, request, session
   ```
