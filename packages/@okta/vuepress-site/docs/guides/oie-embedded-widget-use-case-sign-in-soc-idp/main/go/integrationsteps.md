### The user goes to the sign-in page

When the user goes to the sign-in page, the Widget [loads](/docs/guides/oie-embedded-widget-use-case-load/go/main) and automatically displays the **Sign in with Facebook** button. If the Facebook button doesn't appear, make sure that you’ve completed all the steps in [Configuration Updates](#configuration-updates).

### The user selects the Facebook sign-in link

When the user selects **Sign in with Facebook**, they’re redirected to the Facebook sign-in page.

### The user signs in to Facebook

After the user enters their credentials in the Facebook sign-in page, Facebook first validates the sign-in request. If the sign-in flow is successful, Facebook redirects the request to the Okta org URL that you entered in the **Valid OAuth Redirect URIs** and **Site URL** fields. These field values, described in [Set up your Okta org for a social IdP use case](/docs/guides/oie-embedded-common-org-setup/go/main/#set-up-your-okta-org-for-a-social-idp-use-case), have the following format: `https://{yourOktaDomain}/oauth2/v1/authorize/callback`, for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`.

### Handle the callback from Okta

After Facebook sends the success login request to your Okta org, the org redirects the request to your app. The org uses the value in the **Sign-in redirect URIs** field. You added a value for this field when you [created an app](/docs/guides/oie-embedded-common-org-setup/go/main/#create-a-new-application). The app code that connects the callback URL to a function is identical to the code described in [Basic sign-in flow using the Widget](/docs/guides/oie-embedded-widget-use-case-basic-sign-in/go/main/#_2-handle-the-callback-from-okta).

### Get and store tokens and redirect the user

The next step is to get the tokens from the `/token` endpoint using the returned `interaction_code` and the PKCE parameters. After the tokens are fetched, store them in session for later use. The code that fetches and stores these tokens is identical to the code described in [Basic sign-in flow using the Widget](/docs/guides/oie-embedded-widget-use-case-basic-sign-in/go/main/#_3-get-and-store-the-tokens-and-redirect-the-request-to-the-default-sign-in-page).

### Get the user profile information (optional)

You can obtain basic user information by making a request to the authorization server. Make a request to the [`/v1/userinfo`](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/userinfoCustomAS) endpoint using the tokens that you obtained from the `LoginResponse` object's `Token` property.

```go
func getProfileData(r *http.Request) map[string]string {
  m := make(map[string]string)

  session, err := sessionStore.Get(r, "okta-custom-login-session-store")

  if err != nil || session.Values["access_token"] == nil || session.Values["access_token"] == "" {
    return m
  }

  reqUrl := os.Getenv("ISSUER") + "/v1/userinfo"

  req, _ := http.NewRequest("GET", reqUrl, bytes.NewReader([]byte("")))
  h := req.Header
  h.Add("Authorization", "Bearer "+session.Values["access_token"].(string))
  h.Add("Accept", "application/json")

  client := &http.Client{}
  resp, _ := client.Do(req)
  body, _ := ioutil.ReadAll(resp.Body)
  defer resp.Body.Close()
  json.Unmarshal(body, &m)

  return m
}
```
