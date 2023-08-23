When you [created an app integration in the admin console](#create-an-app-integration-in-the-admin-console), you set the sign-in redirect URL to <StackSnippet snippet="signinredirecturi" inline /> and the sign-out redirect URL to <StackSnippet snippet="signoutredirecturi" inline />.

1. Open `app.py`.
1. Add a route handler for the sign-in callback handler URI to the end of the file:

   ```py
   @app.route("/authorization-code/callback")
   def callback():
       headers = {'Content-Type': 'application/x-www-form-urlencoded'}
       code = request.args.get("code")
       app_state = request.args.get("state")
       if app_state != session['app_state']:
           return "The app state does not match"
       if not code:
               return "The code was not returned or is not accessible", 403
       query_params = {'grant_type': 'authorization_code',
                       'code': code,
                       'redirect_uri': request.base_url,
                       'code_verifier': session['code_verifier'],
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

       # Authorization flow successful, get userinfo and sign in user
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
