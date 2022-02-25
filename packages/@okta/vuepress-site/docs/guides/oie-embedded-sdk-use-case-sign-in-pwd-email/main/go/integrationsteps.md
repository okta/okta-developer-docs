### 1: The user navigates to the home page

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

### 2: Capture credentials with the sign-in page

Build a sign-in page that captures the username and password.

<div class="common-image-format common-image-format-vertical-margin">

![Displays a basic sign-in page in a Golang application](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-basic-sign-on-page.png)

</div>

During page load, call the `Client` object's `InitLogin` method. This method returns an object of type
`LoginResponse` that is used to initiate the sign-in process with Okta. The object
also contains a list of available social Identity Providers (IdPs) that is discussed in more detail in the
[Sign in with Facebook](/docs/guides/oie-embedded-sdk-use-case-sign-in-soc-idp/go/main/)
use case.

```go
lr, err := s.idxClient.InitLogin(context.TODO())
if err != nil {
	log.Fatalf("Could not initalize login: %s", err.Error())
}
```

### 3: Submit the credentials

After the user enters their credentials and submits their sign-in request,
create an `IdentityRequest` object, passing in the username and password from the
sign-in form.

```go
    ir := &idx.IdentifyRequest{
        Identifier: r.FormValue("identifier"),
        Credentials: idx.Credentials{
            Password: r.FormValue("password"),
        },
    }
```

Next, call the `Identify` method of the `LoginResponse` object obtained in
[Step 2](#_2-capture-credentials-with-the-sign-in-page), passing in the `IdentifyRequest`
created in the previous step.

```go
lr, err = lr.Identify(context.TODO(), ir)
if err != nil {
    session.Values["Errors"] = err.Error()
    session.Save(r, w)
    http.Redirect(w, r, "/login", http.StatusFound)
    return
}
```

### 4: Determine whether additional factors are required

The `Identity` method returns `LoginResponse` and `error`
objects. Use the `error` object to determine if there were errors in the
user sign-in. If the `error` object is `nil` and `LoginResponse` object's
`Token` property is equal to `nil`, then the user needs to confirm their identity
with additional factors. The following code from the sample application shows
a redirect to a factors page when there are no errors or tokens in the `LoginResponse`.

```go
lr, err = lr.Identify(context.TODO(), ir)
if err != nil {
 //Error handling code
}

if lr.Token() != nil {
 //Login completion code
}

 //Additional factors required -  redirect to factors page
s.cache.Set("loginResponse", lr, time.Minute*5)
http.Redirect(w, r, "/login/factors", http.StatusFound)
return
```

### 5: Show an option to choose the email factor

The next step is to build a page that allows the user to choose a factor
to continue the authentication flow.

<div class="common-image-format">

![Displays an option to choose verification through the email factor](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-email-verify-page.png)

</div>

During page load, call `LoginResponse` object's `HasStep` method, passing in the
 `LoginStepEmailVerification` constant. If the method returns `true`, display
 the email factor option.

```go
clr, _ := s.cache.Get("loginResponse")
lr := clr.(*idx.LoginResponse)

if lr.HasStep(idx.LoginStepEmailVerification) {
  s.ViewData["FactorEmail"] = true
} else {
  s.ViewData["FactorEmail"] = false
}
```

### 6: Submit the email factor to verify the user's identity

When the user selects the email factor and clicks submit, call the `LoginResponse` object's
`VerifyEmail` method. Calling this method instructs the Okta org server to send an
email to the email address the user provided in [Step 3](#_3-submit-the-credentials).

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

### 7: Show the email code verification page

The next step is to build the code verification page. After the user chooses the email factor
to validate their identity, the user needs to enter the verification code from their email.

<div class="common-image-format">

![Displays an option to choose verification through the email factor](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-email-code-confirm-page.png)

</div>

### 8: Submit the verification code

After the user checks their email for the code and submits it, call the `LoginResponse` object's `ConfirmEmail`
method to verify the code. For this use case the method should return tokens signifying a successful sign-in.

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

### 9: Store the tokens in a session

Store the tokens from the `LoginResponse` object in session to be used for
additional calls. After the tokens are stored, redirect the user to the
default signed-in home page.

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

### 10 (Optional): Get the user profile information

Optionally, you can obtain basic user information after a successful user sign-in by making a request to Okta's Open ID Connect authorization server. See [Get the user profile information](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/go/main/#get-the-user-profile-information) for more information.
