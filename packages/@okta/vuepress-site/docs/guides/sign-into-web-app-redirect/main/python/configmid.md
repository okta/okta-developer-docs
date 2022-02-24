The Okta CLI created an `.okta.env` file in your current directory. This file includes your Okta domain, client ID, and client secret:

```properties
export OKTA_OAUTH2_ISSUER=https://${yourOktaDomain}/oauth2/${authorizationServerId}
export OKTA_OAUTH2_CLIENT_ID=${clientId}
export OKTA_OAUTH2_CLIENT_SECRET=${clientSecret}
```

You can configure the properties of your application with configuration files, environment variables, or other framework specific techniques.

Create an `app.py` file to import the installed packages and configure the Flask app.

```py
import requests
from flask import Flask, render_template, redirect, request, url_for
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)

app = Flask(__name__)
app.config.update({'SECRET_KEY': 'SomethingNotEntirelySecret'})

login_manager = LoginManager()
login_manager.init_app(app)


APP_STATE = 'ApplicationState'
NONCE = 'SampleNonce'

@app.route("/")
def home():
    return render_template("home.html")


if __name__ == '__main__':
    app.run(host="localhost", port=8080, debug=True)
```

Add the following Okta config dictionary. You should set the correct values that you obtained from the Okta CLI.

```py
config = {
  "auth_uri": "https://${yourOktaDomain}/oauth2/default/v1/authorize",
  "client_id": "${CLIENT_ID}",
  "client_secret": "${clientSecret}",
  "redirect_uri": "http://localhost:8080/authorization-code/callback",
  "issuer": "https://${yourOktaDomain}/oauth2/default",
  "token_uri": "https://${yourOktaDomain}/oauth2/default/v1/token",
  "userinfo_uri": "https://${yourOktaDomain}/oauth2/default/v1/userinfo"
}
```

If you use `okta start flask` to create an app, it has an `.okta.env` file in it that looks a bit different. That's because it's configured to use [python-dotenv](https://github.com/theskumar/python-dotenv) to load its configuration.
