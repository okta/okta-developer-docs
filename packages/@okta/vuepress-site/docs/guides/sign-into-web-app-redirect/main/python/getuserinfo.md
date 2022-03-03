1. Add the following code to handle the `/profile` route in `app.py`. 

```py
@app.route("/profile")
def profile():
    return render_template("profile.html", user=current_user)
```

2. Add a new file called `templates/profile.html` to render information on the logged in user. It should contain the follow body content:

```html
<div>
    <h2>My Profile</h2>
    <p>Hello, <span>{{ user.name }}</span>.</p>
</div>
```

3. You need to define a custom user model. Create a `user.py` file in the root of your main app folder and add the following code to it:

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

4. Import the user model into the `app.py` file by adding the following code:

```py
from user import User

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)
```
