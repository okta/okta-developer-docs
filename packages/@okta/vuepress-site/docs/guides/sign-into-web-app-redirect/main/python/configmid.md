The Okta CLI created an `.okta.env` file in your current directory containing these values, for example:

```properties
export OKTA_OAUTH2_ISSUER=https://${yourOktaDomain}/oauth2/${authorizationServerId}
export OKTA_OAUTH2_CLIENT_ID=${clientId}
export OKTA_OAUTH2_CLIENT_SECRET=${clientSecret}
```

You can configure the properties of your application with configuration files, environment variables, or other framework specific techniques.

1. Create an `app.py` file to import the installed packages and configure the Flask app.

   ```py
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
       return render_template("login.html")

   if __name__ == '__main__':
       app.run(host="localhost", port=5000, debug=True)
   ```

2. Add the following Okta config dictionary to the bottom of `app.py`. Replace the placeholders with the values you obtained earlier (from `.okta.env`, and from your org admin).

   ```py
   config = {
       "auth_uri": "https://${yourOktaDomain}/oauth2/default/v1/authorize",
       "client_id": "${clientId}",
       "client_secret": "${clientSecret}",
       "redirect_uri": "http://localhost:5000/authorization-code/callback",
       "issuer": "https://${yourOktaDomain}/oauth2/default",
       "token_uri": "https://${yourOktaDomain}/oauth2/default/v1/token",
       "userinfo_uri": "https://${yourOktaDomain}/oauth2/default/v1/userinfo"
   }
   ```

If you use `okta start flask` to create an app, it has an `.okta.env` file in it that looks a bit different. That's because it's configured to use [python-dotenv](https://github.com/theskumar/python-dotenv) to load its configuration.
