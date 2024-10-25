### The user goes to the home page

When the user goes to the home page and the app loads, create an SDK client object by calling the `NewClient()` method.

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

### Capture the credentials with the sign-in page

Build a sign-in page that captures both the user's name and password, similar to the following wireframe.

<div class="half wireframe-border">

![A sign-in form with fields for username and password and a next button](/img/wireframes/sign-in-form-username-password.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36678&t=wzNwSZkdctajVush-1 sign-in-form-username-password
 -->

</div>

During page load, call the `Client` object's `InitLogin()` method. This method returns an object of type `LoginResponse` that is used to initiate the sign-in process with Okta. The object also contains a list of available social Identity Providers (IdPs) that is discussed in more detail in the next step.

```go
lr, err := s.idxClient.InitLogin(context.TODO())
if err != nil {
   log.Fatalf("Could not initalize login: %s", err.Error())
}
```

### Get the available list of Identity Providers

Using the `LoginResponse` object, returned from `InitLogin()`, get the available Identity Providers from its `IdentityProviders` property.

```go
idps := lr.IdentityProviders()
s.ViewData["IDPs"] = idps
s.ViewData["IdpCount"] = func() int {
  return len(idps)
}
```

#### Build the list of Identity Providers on the sign-in page

Use the array of `IdentityProvider` objects to show a list of available Identity Providers on the sign-in page. The following code snippet shows how the sample app builds out links for each available Identity Provider.

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

#### Example of the sign-in page with Identity Provider links

The following wireframe includes Facebook and Google IdP sign-in options.

<div class="half wireframe-border">

![A sign-in form with fields for username and password, a next button, and also buttons for signing in with Facebook or Google](/img/wireframes/sign-in-form-username-password-facebook-google.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36701&t=wzNwSZkdctajVush-1 sign-in-form-username-password-facebook-google
 -->

</div>

### The user selects the Facebook sign-in link

When the user clicks the Facebook IdP link, they’re sent to the Okta org using the link provided in the `IdentityProvider` object's `HRef` property. At the Org, the request gets routed to Facebook for user sign-in. You don't need to implement any code changes to perform this step.

### The user signs in with Facebook

When the user clicks the sign-in link, the browser redirects them to a sign-in page hosted by Facebook. To test this step, use the Facebook test user credentials that you configured in [Set up your Okta org for a social IdP use case](/docs/guides/oie-embedded-common-org-setup/go/main/#set-up-your-okta-org-for-a-social-idp-use-case). You don't need to make any code changes in your app to perform this step.

<div class="half border">

![Displays an example Facebook sign-in form](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-social-sign-in-fb-login.png)

</div>

### Facebook redirects the user to your Okta org

On successful sign-in, Facebook routes the user to the **Valid OAuth Redirect URIs** and **Site URL** previously set in [Set up your Okta org for a social IdP use case](/docs/guides/oie-embedded-common-org-setup/go/main/#set-up-your-okta-org-for-a-social-idp-use-case). The values use the following format: `https://{Okta org domain}/oauth2/v1/authorize/callback` (for example, `https://dev-12345678.okta.com/oauth2/v1/authorize/callback`).

### Store the tokens when Okta redirects the request to your app

Facebook sends the successful login request to your Okta org. The org then redirects the request to the app's **Sign-in redirect URIs** field, which was configured in [Create a new application](/docs/guides/oie-embedded-common-org-setup/go/main/#create-a-new-application).

The value for the sample app is `http://localhost:8000/login/callback`.

The following code wires up the callback URL to a `handleLoginCallback()` function.

```go
r.HandleFunc("/login/callback", s.handleLoginCallback).Methods("GET")
```

The `handleLoginCallback()` function handles the callback and stores the incoming tokens
into the session state.

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

### (Optional) Get the user profile information

Optionally, you can obtain basic user information after the user successfully signs in by making a request to the Okta OpenID Connect authorization server.
See [Get the user profile information](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/go/main/#get-the-user-profile-information) for more information.
