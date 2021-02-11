Get userinfo to create user from model and login user:
```py
userinfo_response = requests.get(config["userinfo_uri"],
                                 headers={'Authorization': f'Bearer {access_token}'}).json()

unique_id = userinfo_response["sub"]
user_email = userinfo_response["email"]
user_name = userinfo_response["given_name"]

user = User(
    id_=unique_id, name=user_name, email=user_email
)

if not User.get(unique_id):
    User.create(unique_id, user_name, user_email)

login_user(user)
```

This step is being performed during [Define a callback step](/docs/guides/sign-into-web-app/python/define-callback/).
