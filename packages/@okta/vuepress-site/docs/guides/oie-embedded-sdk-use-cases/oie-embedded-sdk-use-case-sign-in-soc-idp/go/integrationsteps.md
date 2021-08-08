## Integration steps

### Step 1: Create the SDK client on application load

The first step is to create the SDK client when the user navigates to
the home page and the application loads. Create a new SDK Client by
calling the `NewClient` method that returns an object of type
`Client`.

```go
idx, err := idx.NewClient(
        idx.WithClientID(c.Okta.IDX.ClientID),
        idx.WithClientSecret(c.Okta.IDX.ClientSecret),
        idx.WithIssuer(c.Okta.IDX.Issuer),
        idx.WithScopes(c.Okta.IDX.Scopes),
        idx.WithRedirectURI(c.Okta.IDX.RedirectURI))
if err != nil {
    log.Fatalf("new client error: %+v", err)
}
```

### Step 2: Build sign-in page and initialize client object

Build a sign-in page that captures both the user's name and password.

<div class="common-image-format common-image-format-vertical-margin">

![A basic sign-in page in a Golang application](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-basic-sign-on-page.png)

</div>

During page load, call the `Client's` `InitLogin` method. This method returns an object of type
`LoginResponse` that is used to initate the sign-in process with Okta in the subsquent steps.  The object
also contains a list of available social identity providers (IdPs) that is discussed in more detail in the
[Sign in with Facebook](docs/guides/oie-embedded-sdk-use-cases/go/oie-embedded-sdk-use-case-sign-in-soc-idp/)
use case.

```go
lr, err := s.idxClient.InitLogin(context.TODO())
if err != nil {
	log.Fatalf("Could not initalize login: %s", err.Error())
}
```

### Step 3: Get available identity providers to show on sign-in page

#### Get list of identity providers

Using the `LoginReponse` returned from `InitLogin`, get the available identity providers
from its `IdentityProviders` property.

```go
idps := lr.IdentityProviders()
s.ViewData["IDPs"] = idps
s.ViewData["IdpCount"] = func() int {
  return len(idps)
}
```

#### Build list of indentity providers on sign-in page

Use this array of `IdentityProvider` objects to show a list of available identity providers on the
sign-in page. The code below from the sample application shows how the page builds out links for
each available identity provider.

```go
{{ range .IDPs }}
<div>
  <a href="{{ .URL }}" >
    <span class="sr-only">Sign in with {{ .Name }}</span>
    {{ if eq .Type "FACEBOOK" }}
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fill-rule="evenodd" d="M20 ..." clip-rule="evenodd" />
    </svg>
    {{ end }}
    <span class="px-4">{{ .Name }}</span>
  </a>
</div>
{{ end }}
```

#### Example of sign-in page with identity provider links

Screenshot from the sample application showing the Facebook and Google identity
providers.

<div class="common-image-format common-image-format-vertical-margin">

![A screenshot of a sign-in page showing the available identity providers](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-social-sign-in.png)

</div>

### Step 4: User clicks on the Facebook IdP link

The user clicks the sign-in link, which sends them initially to the Okta org. The `HRef` property contains a URL that's linked to the Okta org. From the org, the request gets routed to Facebook for user sign-in. You don't need to implement additional code changes to perform this step.

### Step 5: User signs in to Facebook

After the user clicks on the sign-in link, the browswer should redirect to a sign-in page hosted by Facebook. The credentials
you enter originates from a test user that you configured in [Set up your Okta org (for social identity providers)](/docs/guides/oie-embedded-common-org-setup/go/main/#set-up-your-okta-org-for-social-identity-providers). You don't need to mae any code changes in your app to perform this step.

<div class="common-image-format">

![Screenshot of a facebook sign-in page(/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-social-fb-sign-in.png)

</div>

### Step 6: Facebook redirects to your Okta org

If the Facebook login is successful, Facebook routes the user to the URL that you entered in **Valid OAuth Redirect URIs** and **Site URL** in [Set up your Okta org (for social identity providers)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-social-identity-providers). The values use the following format: `https://{Okta org domain}/oauth2/v1/authorize/callback.` (for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`)

### Step 7: Okta org redirects to your app through the sign-in redirect URIs

After Facebook sends the success login request to your Okta org, the org redirects the request to your app through the application's **Sign-in redirect URIs** field, which was configured in [Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-password-factor-only-use-cases).

The value for the sample app is `http://localhost:8000/login/callback`.

The callback to your app contains the sign-in tokens that need to be stored in session state.

The code that wires up the URL to the function that will fetch the tokens returned from the
successful sign-in:

```go
r.HandleFunc("/login/callback", s.handleLoginCallback).Methods("GET")
```

The function is called when the Okta org redirects the user after a successful
sign-in. It fetches and stores the tokens into session for later use.

```go
func (s *Server) handleLoginCallback(w http.ResponseWriter, r *http.Request) {
  clr, _ := s.cache.Get("loginResponse")
  s.cache.Delete("loginResponse")
  lr := clr.(*idx.LoginResponse)

  // Get session store so we can store our tokens
  session, err := sessionStore.Get(r, "direct-auth")
  if err != nil {
    //Error condition
  }

  lr, err = lr.WhereAmI(context.TODO())
  if err != nil {
    //Error condition
  }

  // If we have tokens we have success, so lets store tokens
  if lr.Token() != nil {
    session.Values["access_token"] = lr.Token().AccessToken
    session.Values["id_token"] = lr.Token().IDToken
    err = session.Save(r, w)
    if err != nil {
      //Error condition
    }
  } else {
    //Error condition
  }

  // redirect the user to /profile
  http.Redirect(w, r, "/", http.StatusFound)
}
```

### Step 8 (Optional): Get user profile information

Optionally, you can obtain basic user information after a successful user
sign-in by making a request to Okta's Open ID Connect authorization server.
See [Get user profile information after sign-in](/docs/guides/oie-embedded-sdk-alternate-flows/aspnet/main/#getuserprofileinfo).
