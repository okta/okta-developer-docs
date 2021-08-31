## Integration steps

### 1: The user navigates to the sign-in page

When the user navigates to the sign-in page, the Widget
[loads](/docs/guides/oie-embedded-widget-use-cases/go/oie-embedded-widget-use-case-load/)
and automatically displays the **Sign in with Facebook** button. If the Facebook button doesn't appear,
make sure that you have completed all the steps in [Configuration Updates](#configuration-updates).
The following Sign-In Widget displays the Facebook button:

<div class="common-image-format">

![Displays the Sign-In Widget with the username, password, and Facebook button](/img/oie-embedded-sdk/oie-embedded-widget-golang-sample-app-idp-sign-in-page.png)

</div>

### 2: The user selects the Facebook sign-in link

When the user selects **Sign in with Facebook**, they are redirected to
the Facebook sign-in page.

<div class="common-image-format">

![Displays the Facebook sign-in page](/img/oie-embedded-sdk/oie-embedded-widget-golang-sample-app-fb-sign-in-page.png)

</div>

### 3: The user signs in to Facebook

Once the user enters their credentials in the Facebook sign-in page, Facebook first validates the sign-in
request. If the sign-in is successful, Facebook redirects the request to the Okta org URL that you've entered in the
**Valid OAuth Redirect URIs** and **Site URL** fields. These field values, described in [Set up your Okta org (for social identity providers)](/docs/guides/oie-embedded-common-org-setup/go/main/#set-up-your-okta-org-for-social-identity-providers), have the following format: `https://{yourOktaDomain}/oauth2/v1/authorize/callback`, for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`.

### 4: Handle the callback from Okta

After Facebook sends the success login request to your Okta org, the org redirects the request
to your app through the Application's **Sign-in redirect URIs** field. This field was set up in
[Create a new application](/docs/guides/oie-embedded-common-org-setup/go/main/#create-a-new-application). The application
code that connects the callback URL to a function is identical to the code described in
[step 2](/docs/guides/oie-embedded-widget-use-cases/go/oie-embedded-widget-use-case-basic-sign-in/#step-2-handle-the-callback-from-okta) in
[Basic sign-in using the widget](/docs/guides/oie-embedded-widget-use-cases/go/oie-embedded-widget-use-case-basic-sign-in/).
See that guide for more details.

### 5: Get and store the tokens and redirect the user to the default sign-in page

The next step is to get the tokens from the `/token` endpoint using the
returned `interaction_code` and the PCKE parameters. After the tokens are fetched,
store them in session for later use. The code that fetches and stores these tokens
is identical to the code described in
[step 3](/docs/guides/oie-embedded-widget-use-cases/go/oie-embedded-widget-use-case-basic-sign-in/#step-3-get-tokens-store-them-and-redirect-to-default-sign-in-page) in [Basic sign-in using the widget](/docs/guides/oie-embedded-widget-use-cases/go/oie-embedded-widget-use-case-basic-sign-in/).
See that guide for more details.

### 6 (Optional): Get the user profile information

You can obtain basic user information by making a request to the authorization server.
Make a call to the [`/v1/userinfo`](/docs/reference/api/oidc/#userinfo) endpoint using the tokens
obtained from the `LoginResponse` object's `Token` property.

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
