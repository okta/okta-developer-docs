### Your app displays the sign-in page

The user launches the app. When the sign-in page loads, create an SDK `Client` object by calling `NewClient`.

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

Build a sign-in page that captures the user's name and password.

<div class="half wireframe-border">

![A sign-in form with fields for username and password and a next button](/img/wireframes/sign-in-form-username-password.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36678&t=wzNwSZkdctajVush-1 sign-in-form-username-password
 -->

</div>

During the page load, call `Client.InitLogin` to return a `LoginResponse` object used to initiate the sign-in process.

```go
lr, err := s.idxClient.InitLogin(context.TODO())
if err != nil {
    log.Fatalf("Could not initalize login: %s", err.Error())
}
```

### Capture the user's login credentials

Create an `IdentityRequest` object and assign its `identifier` and `password` properties to the values entered by the user to capture their login credentials. Pass this object as a parameter to `LoginResponse.Identify` to begin the authentication process.

```go
ir := &idx.IdentifyRequest{
    Identifier: r.FormValue("identifier"),
    Credentials: idx.Credentials{
        Password: r.FormValue("password"),
    },
}

lr, err = lr.Identify(context.TODO(), ir)
if err != nil {
    session.Values["Errors"] = err.Error()
    session.Save(r, w)
    http.Redirect(w, r, "/login", http.StatusFound)
    return
}
```

### Your app processes the authentication success response

When the user correctly supplies their login credentials `err` is `nil`. In addition, `LoginResponse.Token` will contain the access and ID tokens required to retrieve the user's OIDC claims information. The user is now signed in.

The below code demonstrates the successful and unsuccessful sign-in flow. In the latter, `log.Fatal` is called, an error message is displayed, and the login process is terminated.

```go
 //If we have tokens we have success, so lets store tokens
if lr.Token() != nil {
  session, err := sessionStore.Get(r, "direct-auth")
  if err != nil {
    log.Fatalf("could not get store: %s", err)
  }
  session.Values["access_token"] = lr.Token().AccessToken
  session.Values["id_token"] = lr.Token().IDToken

  err = session.Save(r, w)
  if err != nil {
    log.Fatalf("could not save access token: %s", err)
  }
 //Redirect the user to /profile
  http.Redirect(w, r, "/", http.StatusFound)
  return
}
```

After a successful sign-in, the tokens are stored for future requests and the user is redirected to the home page.
