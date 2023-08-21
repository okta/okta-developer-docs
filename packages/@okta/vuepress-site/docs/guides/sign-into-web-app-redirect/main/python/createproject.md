1. Create a project folder named `okta-flask-quickstart` and a subfolder called `venv`.
1. Activate the corresponding environment using the following commands:

   ```bash
   cd okta-flask-quickstart
   python -m venv venv
   . venv/scripts/activate  #linux or mac
   venv/scripts/activate.bat  #windows
   ```

   Use the appropriate command for `activate` for your OS.

1. Create **app.py** in your project's root folder.
1. Add the following code to configure the app.

   ```python
   import base64
   import hashlib
   import requests
   import secrets

   from flask import Flask, render_template, redirect, request, session, url_for
   from flask_cors import CORS
   from flask_login import (
       LoginManager,
       current_user,
       login_required,
       login_user,
       logout_user,
   )

   app = Flask(__name__)
   app.config.update({'SECRET_KEY': secrets.token_hex(64)})
   CORS(app)

   login_manager = LoginManager()
   login_manager.init_app(app)

   @app.route("/")
   def home():
       return render_template("signin.html")

   if __name__ == '__main__':
       app.run(host="localhost", port=5000, debug=True)
   ```
