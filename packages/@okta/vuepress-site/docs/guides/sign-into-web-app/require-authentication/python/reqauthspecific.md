For example, you could require authentication for any route by adding the decorator `@login_required` from lib flask-login:

```py
from flask_login import login_required, current_user


@app.route("/profile")
@login_required
def profile():
    return render_template("profile.html", user=current_user)
```

But first you need to set up LoginManager:

```py
from flask_login import LoginManager


login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)
```

Users are being logged in and logged out with functions `login_user` and `logout_user`, respectively:

```py
from flask_login login_user, logout_user
```

Login is being performed during [Define a callback step](/docs/guides/sign-into-web-app/python/define-callback/).

More details on login and user management can be found in [Flask-Login docs](https://flask-login.readthedocs.io/en/latest/).

The other possible way to manage users and require authentication is to do everything by hand:

```py
@app.route("/profile")
def profile():
    if is_authenticated():
        return render_template("profile.html", user=user)
    else:
        return "Unauthenticated", 401


def is_authenticated():
    token = request.headers.get("Authorization").split("Bearer ")[1]
    return is_access_token_valid(token, config["issuer"], config["client_id"])
```

For both variants you need to define custom `User` model:
```py
from flask_login import UserMixin


# Simulate user database
USERS_DB = {}


class User(UserMixin):

    """Custom User class."""

    def __init__(self, id_, name, email):
        self.id = id_
        self.name = name
        self.email = email

    def claims(self):
        """Use this method to render all assigned claims on profile page."""
        return {'name': self.name,
                'email': self.email}.items()

    @staticmethod
    def get(user_id):
        return USERS_DB.get(user_id)

    @staticmethod
    def create(user_id, name, email):
        USERS_DB[user_id] = User(user_id, name, email)
```
