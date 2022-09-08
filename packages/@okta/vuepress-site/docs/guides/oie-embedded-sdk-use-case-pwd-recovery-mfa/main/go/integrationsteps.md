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

### 2: Navigate to the password recovery page

When the user clicks on the **Recover password** link on your site, send the
user to a page where they can enter their email and start the password
recovery flow.

<div class="half wireframe-border">

![Reset password form with an email field](/img/oie-embedded-sdk/wireframes/reset-password-form-enter-email-g2r3.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 3

-->

### 3: The user enters their email and initiates password recovery

After the user submits their email to start the password recovery, perform the following steps:

1. Call the `Client` object's `InitPasswordReset` method by passing in a
`IdentifyRequest` object with its `Identifier` property set to the user's email. Calling this method
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

2. The second requirement is to call `VerifyEmail`, which sends a verification code
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

### 4: Show the code verification page

The next step is for the user to enter the verification code from their email.
Build a page that captures this code.

<div class="half wireframe-border">

![Email verification code input form](/img/oie-embedded-sdk/wireframes/enter-verification-code-form-g2r5.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 5

-->

### 5: Submit the verification code

When the user submits the verification code, call the `ResetPasswordResponse` object's
`ConfirmEmail` method, passing in the verification code.

```go
 //Get session store so we can store our tokens
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

### 6: Show the new password page

After the code has been confirmed, the next step is to send the user
to a page that allows them to enter their new password.

<div class="half wireframe-border">

![Password reset new password form](/img/oie-embedded-sdk/wireframes/reset-password-form-choose-new-password-g2r6.png)

</div>

<!--

Source image:

https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%8C%9F-Updated-Diagrams-for-Dev-Docs?node-id=2393%3A2128#233281241

Group 2, row 6

-->

### 7: Submit the new password

After the user enters their password and submits, call the `ResetPasswordResponse` object's
`SetNewPassword` method to change their password to the new password. If successful,
this method should return the sign-in tokens.

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

### 8: Store the tokens in a session and redirect the user to the signed-in home page

Store the tokens from the `ResetPasswordResponse` into session
for later use. After the tokens are stored, redirect the user to the
default signed-in home page.

```go
 //If we have tokens we have success, so let's store tokens
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

 //Redirect the user to /profile
http.Redirect(w, r, "/", http.StatusFound)
return
```

### 9 (Optional): Get the user profile information

Optionally, you can obtain basic user information after a successful user
sign-in by making a request to Okta's Open ID Connect authorization server.
See [Get the user profile information](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/go/main/#get-the-user-profile-information) for more information.
