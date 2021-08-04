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

### Step 2: Build sign-in page and intialize client object

Build a sign-in page that captures both the user's name and password.

<div class="common-image-format common-image-format-vertical-margin">

![A basic sign in page in a Golang application](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-basic-sign-on-page.png)

</div>

During page load, call the `Client's` `InitLogin` method. This method returns an object of type
`LoginResponse` that is used to initate the sign in process with Okta in the subsquent steps.  The object
also contains a list of available social identity providers (IdPs) that is discussed in more detail in the
[Sign in with Facebook](docs/guides/oie-embedded-sdk-use-cases/go/oie-embedded-sdk-use-case-sign-in-soc-idp/)
use case.

```go
lr, err := s.idxClient.InitLogin(context.TODO())
if err != nil {
	log.Fatalf("Could not initalize login: %s", err.Error())
}
```

### Step 3: Submit credentials when user signs in

After the user enters their credentials and submits their sign in request,
create an `IdentityRequest` object passing in the username and password from the
sign-in form.

```go
    ir := &idx.IdentifyRequest{
        Identifier: r.FormValue("identifier"),
        Credentials: idx.Credentials{
            Password: r.FormValue("password"),
        },
    }
```

Next, using the `LoginResponse` object obtained from
[Step 2](#step-2-reconfigure-application-for-password-factor-only),
call its `Identify` method passing in the `IdentifyRequest` created
in the previous step.

```go
lr, err = lr.Identify(context.TODO(), ir)
if err != nil {
    session.Values["Errors"] = err.Error()
    session.Save(r, w)
    http.Redirect(w, r, "/login", http.StatusFound)
    return
}
```

### Step 4: Determine that additional factors are required

The `Identity` method returns a `LoginResponse` and `error`
object. Use the `error` object to determine if there were errors in the
user sign-in. If the `error` object is `nil` and `LoginResponse's`
`Token` property is equal to `nil`, the user needs to confirm their identity
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

// Additional factors required -  redirect to factors page
s.cache.Set("loginResponse", lr, time.Minute*5)
http.Redirect(w, r, "/login/factors", http.StatusFound)
return
```

### Step 5: Show user option to choose the email factor

The next step is to build a page that allows the user to choose a factor
to continue the authentication flow.

<div class="common-image-format">

![Screenshot showing an option to choose verification through the email factor](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-email-verify-page.png)

</div>

On page load display the email factor option when the `LoginResponse's` `HasStep` returns
`true` when the `LoginStepEmailVerification` constant is passed.

```go
clr, _ := s.cache.Get("loginResponse")
lr := clr.(*idx.LoginResponse)

if lr.HasStep(idx.LoginStepEmailVerification) {
  s.ViewData["FactorEmail"] = true
} else {
  s.ViewData["FactorEmail"] = false
}
```

### Step 6: Call VerifyEmail when user submits email factor

When the user selects the email factor and clicks submit, call the `LoginResponse's`
`VerifyEmail` method. Calling this method instructs the Okta org server to send an
email to the email address the user provided in [Step 3](#step-3-submit-credentials-when-user-signs-in).

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

### Step 7: Show email code verification page

The next step is to build the code verification page. After the user chooses the email factor
to validate their identity, a page is shown that allows the user to enter the verification code
from their email.

<div class="common-image-format">

![Screenshot showing an option to choose verification through the email factor](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-email-code-confirm-page.png)

</div>

### Step 8: Call ConfirmEmail when user submits the verification code

Once the user checks their email for the code and submits it in the verification code
page, call the `LoginResponse's` `ConfirmEmail` method to verify the code. For this use case
the method should return tokens signifying a successful sign in.

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

//Set returned LoginResopnse in session
s.cache.Set("loginResponse", lr, time.Minute*5)
s.ViewData["InvalidEmailCode"] = false

```

### Step 9: Store tokens in session

Store the tokens from the `LoginResponse` in session to be used for
additional calls. Once the tokens are stored, redirect the user to the
default signed-in home page.

```go
// If we have tokens we have success, so lets store tokens
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
  // redirect the user to /profile
  http.Redirect(w, r, "/", http.StatusFound)
  return
}
```

### Step 10 (Optional): Get user profile information

Optionally, you can obtain basic user information after a successful user
sign-in by making a request to Okta's Open ID Connect authorization server.
See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/aspnet/main/#getuserprofileinfo).
