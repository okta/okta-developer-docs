## Integration steps

### Step 1: Navigate to the homepage

When the user navigates to the home page and the application loads, create a new
SDK Client object by calling the `NewClient` method.

```go
idx, err := idx.NewClient(
      c.Okta.IDX.ClientID,
      c.Okta.IDX.ClientSecret,
      c.Okta.IDX.Issuer,
      c.Okta.IDX.Scopes,
      c.Okta.IDX.RedirectURI)
if err != nil {
    log.Fatalf("new client error: %+v", err)
}
```

### Step 2: Navigate to the sign-in page

Build a sign-in page that captures both the user's name and password.

<div class="common-image-format common-image-format-vertical-margin">

![A basic sign-in page in a Golang application](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-basic-sign-on-page.png)

</div>

During page load, call the `Client` object's `InitLogin` method. This method returns an object of type
`LoginResponse` that is used to initate the sign-in process with Okta.  The object
also contains a list of available social identity providers (IdPs) that is discussed in more detail in
the next step.

```go
lr, err := s.idxClient.InitLogin(context.TODO())
if err != nil {
	log.Fatalf("Could not initalize login: %s", err.Error())
}
```

### Step 3: Get the available list of identity providers

#### Get the list of identity providers

Using the `LoginResponse` object returned from `InitLogin`, get the available identity providers
from its `IdentityProviders` property.

```go
idps := lr.IdentityProviders()
s.ViewData["IDPs"] = idps
s.ViewData["IdpCount"] = func() int {
  return len(idps)
}
```

#### Build the list of indentity providers on the sign-in page

Use this array of `IdentityProvider` objects to show a list of available identity providers on the
sign-in page. The code snippet below shows how the sample application builds out links for each available
identity provider.

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

### Step 4: Click on the sign-in with Facebook link

When the user clicks the Facebook IdP link, initially they are sent to the Okta org using the link provided in the
`IdentityProvider` object's `HRef` property. At the Org, the request gets routed to Facebook for user sign-in. You don't need to implement additional code changes to perform this step.

### Step 5: Sign in with Facebook

After the user clicks on the sign-in link, the browser should redirect to a sign-in page hosted by Facebook. The credentials
you enter originate from a test user that you configured in [Set up your Okta org (for social identity providers)](/docs/guides/oie-embedded-common-org-setup/go/main/#set-up-your-okta-org-for-social-identity-providers). You don't need to make any code changes in your app to perform this step.

<div class="common-image-format">

![Screenshot of a facebook sign-in page](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-social-fb-sign-in.png)

</div>

### Step 6: Facebook redirects to your Okta org

If the Facebook login is successful, Facebook routes the user to the Org URL that you entered in **Valid OAuth Redirect URIs** and **Site URL** in [Set up your Okta org (for social identity providers)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-social-identity-providers). The values use the following format: `https://{Okta org domain}/oauth2/v1/authorize/callback.` (for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`)

### Step 7: Store the tokens when Okta redirects to your application

After Facebook sends the success login request to your Okta org, the org redirects the request to your app through the application's **Sign-in redirect URIs** field, which was configured in [Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-common-org-setup/aspnet/main/#set-up-your-okta-org-for-password-factor-only-use-cases).

The value for the sample app is `http://localhost:8000/login/callback`.

The following code wires up the callback URL to a `handleLoginCallback` function.

```go
r.HandleFunc("/login/callback", s.handleLoginCallback).Methods("GET")
```

The `handleLoginCallback` function handles the callback and stores the incoming tokens
into session state.

```go
func (s *Server) handleLoginCallback(w http.ResponseWriter, r *http.Request) {
  clr, _ := s.cache.Get("loginResponse")
  s.cache.Delete("loginResponse")
  lr := clr.(*idx.LoginResponse)

 //Get session store so we can store our tokens
  session, err := sessionStore.Get(r, "direct-auth")
  if err != nil {
 //Error condition
  }

  lr, err = lr.WhereAmI(context.TODO())
  if err != nil {
 //Error condition
  }

 //If we have tokens we have success, so lets store tokens
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
 //Redirect the user to /profile
  http.Redirect(w, r, "/", http.StatusFound)
}
```

### Step 8 (Optional): Retrieve user profile information

Optionally, you can obtain basic user information after a successful user
sign-in by making a request to Okta's Open ID Connect authorization server.
See [Get user profile information](/docs/guides/oie-embedded-sdk-use-cases/go/oie-embedded-sdk-use-case-basic-sign-in/#get-user-profile-information) for more information.
