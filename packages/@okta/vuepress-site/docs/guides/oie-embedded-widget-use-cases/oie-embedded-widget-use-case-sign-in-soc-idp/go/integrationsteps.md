## Integration steps

### Step 1: Navigate to sign-in page

When the user navigates to the sign-in page, the Widget
[loads](/docs/guides/oie-embedded-widget-use-cases/java/oie-embedded-widget-use-case-load/)
and automatically displays the **Sign in with Facebook** button. If the Facebook button does not appear,
make sure that you have completed all the steps in [Configuration Updates](#configuration-updates).
Notice the Facebook button in the following screenshot:

<div class="common-image-format">

![A screenshot of the sign-in widget showing the username and password](/img/oie-embedded-sdk/oie-embedded-widget-golang-sample-app-idp-sign-in-page.png)

</div>

### Step 2: Click on Facebook link

When the user opts for a Facebook sign-in and clicks the **Sign in with Facebook** button, they are redirected to
the Facebook sign-in page.

<div class="common-image-format">

![A screenshot of the Facebook sign-in page](/img/oie-embedded-sdk/oie-embedded-widget-golang-sample-app-fb-sign-in-page.png)

</div>

### Step 3: Sign in using Facebook sign-in page

Once the user enters their credentials in the Facebook sign-in page, Facebook validates the sign-in
request and if successful redirects the request to the Okta org URL you entered for
**Valid OAuth Redirect URIs** and **Site URL** in [Set up your Okta org (for social identity providers)](/docs/guides/oie-embedded-common-org-setup/go/main/#set-up-your-okta-org-for-social-identity-providers).
The value takes on the following format: `https://{Okta org domain}/oauth2/v1/authorize/callback`, for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`.


### Step 4: Handle callback from Okta

After Facebook sends the success login request to your Okta org, the org redirects the request
to your app through the Application's **Sign-in redirect URIs** field. This field was set up in
[Create and set up your Okta org](/docs/guides/oie-embedded-common-org-setup/go/main/). The code
that wires up the callback URL to a function is idential to the code described in
[step 2](/docs/guides/oie-embedded-widget-use-cases/go/oie-embedded-widget-use-case-basic-sign-in/#step-2-handle-callback-from-okta) in
[Basic sign-in using the widget](/docs/guides/oie-embedded-widget-use-cases/go/oie-embedded-widget-use-case-basic-sign-in/).
See that guide for more details.

### Step 5: Get tokens, store them, and redirect to default sign-in page

The next step is to get the tokens from the `/token` endpoint using the
returned `interaction_code` and the PCKE parameters. After the tokens are fetched,
store them in session for later use. The code that fetches and stores these tokens
is identical to the code in described in
[step 3](/docs/guides/oie-embedded-widget-use-cases/go/oie-embedded-widget-use-case-basic-sign-in/#step-3-get-tokens-store-them-and-redirect-to-default-sign-in-page) in Basic sign-in using the widget.
See that guide for more details.

### Step 6 (Optional): Retrieve user profile information

You can obtain basic user information by making a request to the authorization server.
Make a call to the `/v1/userinfo` endpoint using the tokens obtained from the `LoginResponse`
object's `Token` property.

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
