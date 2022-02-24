Since you requested the scopes `openid profile email`, Okta also returns an ID token along with the access token. You can parse out the claims in the ID token to find the user's profile information.

Note that since the ID token was received by your app in response to exchanging the authorization code, it's okay to skip the normal checks you would need to do on an ID token that your app received in a redirect.

Since the previous code stored the ID token in the session, add the following code to your `index()` function right above the `Hello...` line to extract the user's name from the ID token and show it in the app.

```php
    $claims = json_decode(base64_decode(explode('.', $_SESSION['okta_id_token'])[1]), true);
    $_SESSION['name'] = $claims['name'];
```
