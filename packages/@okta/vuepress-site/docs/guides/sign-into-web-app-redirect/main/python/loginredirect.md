Create a link for the user to start the sign-in process and be redirected to Okta.

1. Create **templates**/**signin.html**.
1. Add the code for a sign-in and sign-out link. The sign-in button displays if the user is signed out and vice versa.


   ```python
   {% if current_user.is_authenticated %}
   <form method="post" action="{{ url_for("signout") }}">
       <button id="signout-button" type="submit">Sign out</button>
   </form>
   {% else %}
   <form method="get" action="signin">
       <button id="signin-button" type="submit">Sign in</button>
   </form>
   {% endif %}
   ```

1. Open `app.py`.
1. Add a route handler for the sign-in funtionality:

   ```py
   @app.route("/signin")
   def signin():
       # store app state and code verifier in session
       session['app_state'] = secrets.token_urlsafe(64)
       session['code_verifier'] = secrets.token_urlsafe(64)

       # calculate code challenge
       hashed = hashlib.sha256(session['code_verifier'].encode('ascii')).digest()
       encoded = base64.urlsafe_b64encode(hashed)
       code_challenge = encoded.decode('ascii').strip('=')

       # get request params
       query_params = {'client_id': config["client_id"],
                       'redirect_uri': config["redirect_uri"],
                       'scope': "openid email profile",
                       'state': session['app_state'],
                       'code_challenge': code_challenge,
                       'code_challenge_method': 'S256',
                       'response_type': 'code',
                       'response_mode': 'query'}

       # build request_uri
       request_uri = "{base_url}?{query_params}".format(
           base_url=config["auth_uri"],
           query_params=requests.compat.urlencode(query_params)
       )

       return redirect(request_uri)
   ```

   Your sign-in handler generates the link URI and redirects the user to Okta's hosted sign-in page where they can authenticate, after which they are redirected back to your app.

1. Add a route handler for the sign-out funtionality:

   ```py
   @app.route("/signout", methods=["GET", "POST"])
   @login_required
   def signout():
       logout_user()
       return redirect(url_for("signin"))
   ```
