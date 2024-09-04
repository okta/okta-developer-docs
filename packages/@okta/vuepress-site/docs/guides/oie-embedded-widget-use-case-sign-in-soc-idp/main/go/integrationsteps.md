### 1: The user navigates to the sign-in page

When the user navigates to the sign-in page, the Widget
[loads](/docs/guides/oie-embedded-widget-use-case-load/go/main)
and automatically displays the **Sign in with Facebook** button. If the Facebook button doesn't appear,
make sure that you have completed all the steps in [Configuration Updates](#configuration-updates).
The following Sign-In Widget displays the Facebook button:

<div class="half wireframe-border">

![The Okta Sign-In Widget's sign-in form with a field for a username, a Next button, a Sign in with Facebook button, and links to reset your password and sign up](/img/wireframes/widget-sign-in-form-username-only-sign-up-forgot-your-password-facebook-links.png)

<!--
Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4662-25341&mode=design&t=mABNx7Cm2rdSOFyx-11 widget-sign-in-form-username-only-sign-up-forgot-your-password-facebook-links
 -->

</div>

### 2: The user selects the Facebook sign-in link

When the user selects **Sign in with Facebook**, they are redirected to
the Facebook sign-in page.

<div class="half border">

![Displays the Facebook sign-in form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-social-sign-in-fb-login.png)

</div>

### 3: The user signs in to Facebook

Once the user enters their credentials in the Facebook sign-in page, Facebook first validates the sign-in
request. If the sign-in is successful, Facebook redirects the request to the Okta org URL that you've entered in the
**Valid OAuth Redirect URIs** and **Site URL** fields. These field values, described in [Set up your Okta org for a social IdP use case](/docs/guides/oie-embedded-common-org-setup/go/main/#set-up-your-okta-org-for-a-social-idp-use-case), have the following format: `https://{yourOktaDomain}/oauth2/v1/authorize/callback`, for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`.

### 4: Handle the callback from Okta

After Facebook sends the success login request to your Okta org, the org redirects the request
to your app through the Application's **Sign-in redirect URIs** field. This field was set up in
[Create a new application](/docs/guides/oie-embedded-common-org-setup/go/main/#create-a-new-application). The application
code that connects the callback URL to a function is identical to the code described in
[step 2](/docs/guides/oie-embedded-widget-use-case-basic-sign-in/go/main/#_2-handle-the-callback-from-okta) in
[Basic sign-in using the Widget](/docs/guides/oie-embedded-widget-use-case-basic-sign-in/go/main/).
See that guide for more details.

### 5: Get and store the tokens and redirect the user to the default sign-in page

The next step is to get the tokens from the `/token` endpoint using the
returned `interaction_code` and the PKCE parameters. After the tokens are fetched,
store them in session for later use. The code that fetches and stores these tokens
is identical to the code described in
[step 3](/docs/guides/oie-embedded-widget-use-case-basic-sign-in/go/main/#_3-get-and-store-the-tokens-and-redirect-the-request-to-the-default-sign-in-page) in [Basic sign-in flow using the Widget](/docs/guides/oie-embedded-widget-use-case-basic-sign-in/go/main/).
See that guide for more details.

### 6 (Optional): Get the user profile information

You can obtain basic user information by making a request to the authorization server.
Make a call to the [`/v1/userinfo`](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/userinfoCustomAS) endpoint using the tokens
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
