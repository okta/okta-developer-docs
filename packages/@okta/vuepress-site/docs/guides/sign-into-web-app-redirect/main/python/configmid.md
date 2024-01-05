1. Open **app.py**.
1. Add the following Okta config dictionary to the bottom of the file. Replace the placeholders with your own values.

   ```python
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
