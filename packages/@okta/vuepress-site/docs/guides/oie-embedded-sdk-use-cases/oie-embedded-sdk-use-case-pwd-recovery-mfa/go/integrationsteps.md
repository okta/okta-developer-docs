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

### Step 2: Build a page with an email input field

When the user clicks on the **Recover password** link on your site, send the
user to a page where they can enter in their email and start the password
recovery flow.

<div class="common-image-format common-image-format-vertical-margin">

![Screenshot of first page in the password recovery flow showing the email field](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-pwd-recover-page-first.png)

</div>

### Step 3: Call InitPasswordReset and VerifyEmail when user submits email

When the user submits their email to start the password recovery flow the following steps need
to be performed:

1.  Call the `Client's` `InitPasswordReset` method by passing in
`IdentifyRequest` object with it's `Identifier` property set to the email. Calling this method
validates the email and returns a list of additional steps needed to complete the recovery.

```go
var rpr *idx.ResetPasswordResponse

ir := &idx.IdentifyRequest{
  Identifier: r.FormValue("identifier"),
}
var err error
rpr, err = s.idxClient.InitPasswordReset(context.TODO(), ir)
if err != nil {
//Error handling
}

if !rpr.HasStep(idx.ResetPasswordStepEmailVerification) {
  //If the Okta org is correctly configured HasStep will equal true when
  //ResetPasswordStepEmailVerification is passed
}
```

1. The second step is to call `VerifyEmail`, which will send a verification code
to the provided email. The method returns a `ResetPasswordResponse` object.

```go
rpr, err = rpr.VerifyEmail(context.TODO())
if err != nil {
  //Handle error
}

if !rpr.HasStep(idx.ResetPasswordStepEmailConfirmation) {
  //This is an error case.
}
//Store the response in cache
s.cache.Set("resetPasswordFlow", rpr, time.Minute*5)
```

### Step 4: Build a page that captures the verification code

The next step is for the user to enter the verification code from their email.
Build a page that captures this code.

<div class="common-image-format common-image-format-vertical-margin">

![Screenshot of second page in the password recovery flow showing the verification code field](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-pwd-recover-page-second.png)

</div>

### Step 5: Call ConfirmEmail when user submits the verification code

When the user submits the verification code, call the `ResetPasswordResponse's`
`ConfirmEmail` method passing in the verification code.

```go
// Get session store so we can store our tokens
session, err := sessionStore.Get(r, "direct-auth")

rpr, err = rpr.ConfirmEmail(context.TODO(), r.FormValue("code"))
if err != nil {
  //Error handling
}

if !rpr.HasStep(idx.ResetPasswordStepNewPassword) {
  //Error condition
}

s.cache.Set("resetPasswordFlow", rpr, time.Minute*5)

http.Redirect(w, r, "/passwordRecovery/newPassword", http.StatusFound)
return
```

### Step 6: Build a page to capture the new password

After the code has been confirmed, the next step is to send the user
to a page that allows them to enter their new password.

<div class="common-image-format common-image-format-vertical-margin">

![Screenshot of third page in the password recovery flow showing the password fields](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-pwd-recover-page-third.png)

</div>

### Step 7: Call SetNewPassword on new password submission

Once the user enters their password and submits, call the `ResetPasswordResponse's`
`SetNewPassword` method to change their password to the new password. If successful
this method should return the sign tokens.

```go
rpr := tmp.(*idx.ResetPasswordResponse)

rpr, err = rpr.SetNewPassword(context.TODO(), newPassword)
if err != nil {
  //Error handling
}

if !rpr.HasStep(idx.ResetPasswordStepSuccess) {
  //Error handling
}
```

### Step 8: Store tokens in session

Store the tokens from the `ResetPasswordResponse` in session to be used for
additional calls. Once the tokens are stored, redirect the user to the
default signed-in home page.

```go
// If we have tokens we have success, so lets store tokens
if rpr.Token() != nil {
  session.Values["access_token"] = rpr.Token().AccessToken
  session.Values["id_token"] = rpr.Token().IDToken
  err = session.Save(r, w)
  if err != nil {
    log.Fatalf("could not save access token: %s", err)
  }
} else {
  //Error handling
}

// redirect the user to /profile
http.Redirect(w, r, "/", http.StatusFound)
return
```

### Step 9 (Optional): Get user profile information

Optionally, you can obtain basic user information after a successful user
sign-in by making a request to Okta's Open ID Connect authorization server.
See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/aspnet/main/#getuserprofileinfo).
