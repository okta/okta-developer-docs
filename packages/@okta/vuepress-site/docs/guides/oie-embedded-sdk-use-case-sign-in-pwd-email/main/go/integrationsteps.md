### 1: Your app displays the sign-in page

When the user navigates to the sing-in page and the application loads for the first time, create a new SDK `Client` object by calling `NewClient()`.

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

Display a sign-in page that captures the username and password.

<div class="half border">

![A sign-in page with username and password fields and a Sign in button](/img/oie-embedded-sdk/wireframes/pwd-optional-sign-up-link-sign-in-page-g1r7.png)

</div>

During page load, call `Client.InitLogin()`. This returns an object of type `LoginResponse` that is used to initiate the sign-in process with Okta.

```go
lr, err := s.idxClient.InitLogin(context.TODO())
if err != nil {
   log.Fatalf("Could not initalize login: %s", err.Error())
}
```

### 2: The user submits their username and password

When the user submits their username and password, create an `IdentifyRequest` object and assign its `identifier` and `password` properties to the values entered by the user. Pass this object as a parameter to `LoginResponse.Identify()`.

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

### 3: Your app displays a list of authenticators

`Identify()` returns `error` and `LoginResponse` objects. The `error` object contains any errors thrown in the user sign-in. The `LoginResponse`'s `Token` property contains any ID and access tokens returned by the server if the user has logged in successfully. If the `error` object is `nil` and the `LoginResponse.Token()` returns `nil`, the user needs to confirm their identity with additional factors.

```go
lr, err = lr.Identify(context.TODO(), ir)
if err != nil {
 //Error handling code
}

if lr.Token() != nil {
 //Login completion code
}
```

Display a list of all of the authenticators that the user has enrolled and are ready for use. For example:

<div class="half border">

![A Choose Your Authenticator page with the choices of email and phone, and a Next button](/img/oie-embedded-sdk/wireframes/choose-authenticator-email-phone-form-g2r28.png)

</div>

During page load, call `LoginResponse` object's `HasStep` method, passing in the  `LoginStepEmailVerification` constant. If the method returns `true`, display the email factor option.

```go
clr, _ := s.cache.Get("loginResponse")
lr := clr.(*idx.LoginResponse)

if lr.HasStep(idx.LoginStepEmailVerification) {
  s.ViewData["FactorEmail"] = true
} else {
  s.ViewData["FactorEmail"] = false
}
```

Use the other [LoginStep](https://github.com/okta/okta-idx-golang/blob/master/identify.go#L692)s to populate the rest of the list.

### 4: The user submits the email authenticator

When the user submits the email authenticator, call `LoginResponse.VerifyEmail()`. Identity Engine sends a verification email to the user if the call is succcessful.

```go
if !ok || !invCode.(bool) {
  lr, err := lr.VerifyEmail(r.Context())
  if err != nil {
    http.Redirect(w, r, "/login", http.StatusFound)
    return
  }
  s.cache.Set("loginResponse", lr, time.Minute*5)
  }
  s.render("loginFactorEmail.gohtml", w, r)

```

Display a page for the user to submit the verification code from their email.

<div class="half border">

![A form to enter an email verification code, and a Submit button](/img/oie-embedded-sdk/wireframes/enter-verification-code-form-g2r5.png)

</div>

### 5: The user submits the email verification code

When the user checks their email for the code and submits it, pass it as a parameter to `LoginResponse.ConfirmEmail()`.

```go
 //Get LoginResponse from session
clr, _ := s.cache.Get("loginResponse")
lr := clr.(*idx.LoginResponse)

session, err := sessionStore.Get(r, "direct-auth")
if err != nil {
  log.Fatalf("could not get store: %s", err)
}

 //Call ConfirmEmail
lr, err = lr.ConfirmEmail(r.Context(), r.FormValue("code"))
if err != nil {
 //Error handling code
}

 //Set returned LoginResponse in session
s.cache.Set("loginResponse", lr, time.Minute*5)
s.ViewData["InvalidEmailCode"] = false

```

### 6: Your app handles an authentication success response

If the request to verify the code is successful, `LoginResponse.Token()` now returns the required tokens (access, refresh, ID) for authenticated user activity. Store the tokens in session for later use and then redirect the user to the default signed-in home page.

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

> **Note**:  You can request basic user information from Okta's OpenID Connect authorization server once a user has signed in successfully. See [Get the user profile information](https://developer.okta.com/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/go/main/#get-the-user-profile-information).
