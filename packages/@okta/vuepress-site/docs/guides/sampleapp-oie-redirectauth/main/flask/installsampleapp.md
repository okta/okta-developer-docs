1. Install the sample app wherever you want using: `git clone https://github.com/okta/samples-python-flask.git`
2. From the command line, enter the `samples-python-flask` directory and run `pip install -r requirements.txt` to install the dependencies.
3. In the `samples-python-flask` directory, open the `okta-hosted-login` directory.
4. Copy the `client_secrets.json.dist` to `client_secrets.json` and fill in the information that you copied in previous steps.

    ```json
    {
    "web": {
        "auth_uri": "https://{yourOktaDomain}/oauth2/default/v1/authorize",
        "client_id": "{yourClientId}",
        "client_secret": "{yourClientSecret}",
        "redirect_uris": [
            "http://localhost:8080/authorization-code/callback"
     ],
        "issuer": "https://{yourOktaDomain}/oauth2/default",
        "token_uri": "https://{yourOktaDomain}/oauth2/default/v1/token",
        "token_introspection_uri": "https://{yourOktaDomain}/oauth2/default/v1/introspect",
        "userinfo_uri": "https://{yourOktaDomain}/oauth2/default/v1/userinfo"
        }
    }
    ```

You have now created your App in Okta and installed the Okta <StackSelector snippet="applang" noSelector inline /> sample app.
