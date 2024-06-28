### Your app displays the sign-in page

When the user goes to the sign-in page and the app loads for the first time, create an SDK `Client` object by calling `NewClient`.

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

Display a sign-in page where users input their username and password.

<div class="half wireframe-border">

![A sign-in form with fields for username and password and a next button](/img/wireframes/sign-in-form-username-password.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36678&t=wzNwSZkdctajVush-1 sign-in-form-username-password
 -->

</div>

During page load, call `Client.InitLogin`. This returns a `LoginResponse` object that is used to initiate the sign-in process with Okta.

```go
lr, err := s.idxClient.InitLogin(context.TODO())
if err != nil {
    log.Fatalf("Could not initalize login: %s", err.Error())
}
```

### The user submits their username and password

When the user submits their username and password, create an `IdentityRequest` object and assign its `identifier` and `password` properties to the values entered by the user. Pass this object as a parameter to `LoginResponse.Identify`.

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

### Your app handles an authentication success response

When the user correctly supplies their password, `err` is `nil` and `LoginResponse.Token` contains the required access and ID tokens to retrieve the user's OIDC claims information. The user is now signed in.

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

Store these tokens for future requests and redirect the user to the default page after a successful sign-in attempt.
