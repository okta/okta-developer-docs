After a user signs in, the application has ID and access tokens from Okta in session storage. In this section, you create a simple profile page that uses an access token to query for and display a user's basic information.

1. Create **templates**/**profile.html**.
1. Add the code to display the user's name after the user signs in:

   ```html
   <div>
       <h2>My Profile</h2>
       <p>Hello, <span>{{ user.name }}</span>.</p>
   </div>
   ```

1. Create **user.py**.
1. Add the code for a custom user model to store information about the signed-in user:

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

1. Open `app.py`.
1. Add a route handler for `/profile` to the end of the file:

   ```py
   @app.route("/profile")
   def profile():
       return render_template("profile.html", user=current_user)
   ```

1. Import the user model into the `app.py` file by adding the following code immediately above the route handler for `/`:

   ```py
   from user import User

   @login_manager.user_loader
   def load_user(user_id):
       return User.get(user_id)
   ```
