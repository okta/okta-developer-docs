1. Create a new template file in `templates/login.html`.

2. Inside it, provide sign-in and sign-out controls to direct the user to your sign-in/sign-out routes. For a complete example, see [template.html](https://github.com/okta-samples/okta-flask-sample/blob/3f965a50fa04dccf9d2648a802dc86f762c12a1a/templates/template.html) in our okta-flask-sample code:

```html
{% if current_user.is_authenticated %}
<form method="post" action="{{ url_for("logout") }}">
    <button id="logout-button" type="submit">Logout</button>
</form>
{% else %}
<form method="get" action="login">
    <button id="login-button" type="submit">Login</button>
</form>
{% endif %}
```

The sign-out button only displays if the user is signed in and vice versa.

3. Add the following near the bottom of `app.py`:

```py
@app.route("/login")
def login():
    # get request params
    query_params = {'client_id': config["client_id"],
                    'redirect_uri': config["redirect_uri"],
                    'scope': "openid email profile",
                    'state': APP_STATE,
                    'nonce': NONCE,
                    'response_type': 'code',
                    'response_mode': 'query'}

    # build request_uri
    request_uri = "{base_url}?{query_params}".format(
        base_url=config["auth_uri"],
        query_params=requests.compat.urlencode(query_params)
    )

    return redirect(request_uri)
```

Your login handler generates the link URI and redirects the user to Okta's hosted sign-in page where they can authenticate, after which they are redirected back to your app.

4. Add the following callback handler below your previous code block to handle the callback redirect:

```py
@app.route("/authorization-code/callback")
def callback():
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    code = request.args.get("code")
    if not code:
            return "The code was not returned or is not accessible", 403
    query_params = {'grant_type': 'authorization_code',
                    'code': code,
                    'redirect_uri': request.base_url
                    }
    query_params = requests.compat.urlencode(query_params)
    exchange = requests.post(
        config["token_uri"],
        headers=headers,
        data=query_params,
        auth=(config["client_id"], config["client_secret"]),
    ).json()

    # Get tokens and validate
    if not exchange.get("token_type"):
            return "Unsupported token type. Should be 'Bearer'.", 403
    access_token = exchange["access_token"]
    id_token = exchange["id_token"]

    # Authorization flow successful, get userinfo and login user
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

    return redirect(url_for("profile"))
```

5. Add the functionality to sign users out.

```py
@app.route("/logout", methods=["GET", "POST"])
@login_required
def logout():
    logout_user()
    return redirect(url_for("login"))
```
