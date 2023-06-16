1. Add the required packages for your application with the following command:

   ```bash
   pip install requests==2.27.1 Flask==2.0.2 flask-cors==3.0.10 python-dotenv==0.19.2 pyOpenSSL==22.0.0 Flask-Login==0.5.0
   ```

1. Use [dotenv](https://pypi.org/project/python-dotenv/) to manage your Okta credentials. Add the following to your app file:

   ```python
   from dotenv import load_dotenv
   ```

1. Use [flask_login](https://flask-login.readthedocs.io/en/latest/) to manage user actions. Add the following below your previous code:

   ```python
   from flask_login import (
      LoginManager,
      current_user,
      login_required,
      login_user,
      logout_user,
   )

   from flask import Flask, render_template, redirect, request, url_for
   ```
