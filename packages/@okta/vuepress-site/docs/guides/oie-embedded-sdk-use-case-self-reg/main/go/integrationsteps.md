### The user enters the site

When the user goes to the home page and the application loads, call `idx.NewClient` to create an SDK client object.

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

### The user clicks the sign-up link

Add a **Sign up** link to your app's sign-in page. The self-registration flow begins when the user clicks the **Sign up** link and the browser takes them to the Create Account page.

<div class="half wireframe-border">

![A sign-in form with fields for username and password, a next button, and links to the sign-up and forgot your password forms](/img/wireframes/sign-in-form-username-password-sign-up-forgot-your-password-links.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36729&t=wzNwSZkdctajVush-1 sign-in-form-username-password-sign-up-forgot-your-password-links
 -->

</div>

> **Note**: The account's username is also its email address.

Create a page for the user to enter their basic profile information: their email, first name, and family name.

<div class="half wireframe-border">

![A sign-up form with fields for first name, family name, and email address, and a create account button](/img/wireframes/sign-up-form-first-last-name-email.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A36911&t=2h5Mmz3COBLhqVzv-1  sign-up-form-first-last-name-email
 -->

</div>

### The user submits their profile data

When the user clicks **Sign Up**, create a `UserProfile` object and set its `FirstName`, `LastName`, and `Email` to the values entered by the user. Pass this object as a parameter to `idxClient.InitProfileEnroll`.

```go
profile := &idx.UserProfile{
    FirstName: r.FormValue("firstName"),
    LastName: r.FormValue("lastName"),
    Email: r.FormValue("email"),
}

enrollResponse, err := s.idxClient.InitProfileEnroll(
    context.TODO(), profile)
if err != nil {
    //Error handling
}

s.cache.Set("enrollResponse", enrollResponse, time.Minute*5)
if enrollResponse.HasStep(idx.EnrollmentStepPasswordSetup) {
    http.Redirect(w, r, "/enrollPassword", http.StatusFound)
    return
}
```

`InitProfileEnroll` returns an `EnrollmentResponse` object. Call its `HasStep` method passing in the `EnrollmentStepPasswordSetup` constant for the status of the registration process. `HasStep` returns `true` indicating that the user should enroll their password.

### The user enrolls their password

Create a page that allows the user to supply a new password for verification. For example:

<div class="half wireframe-border">

![A set password form with two fields to enter and to confirm a password and a submit button](/img/wireframes/set-password-form-new-password-fields.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A36973&t=2h5Mmz3COBLhqVzv-1 set-password-form-new-password-fields
 -->

</div>

When the user submits their password, call `enrollResponse.SetNewPassword`, passing in the new password as a parameter.

```go
cer, _ := s.cache.Get("enrollResponse")
enrollResponse := cer.(*idx.EnrollmentResponse)

newPassword := r.FormValue("newPassword")
confirmPassword := r.FormValue("confirmPassword")

enrollResponse, err = enrollResponse.SetNewPassword(context.TODO(), r.FormValue("newPassword"))
if err != nil {
 //Error Handling
}
```

### The app displays a list of authenticators to enroll

Call `enrollmentResponse.HasStep` passing in the `EnrollmentStepSuccess` constant for the status of the registration process. `HasStep` returns `true` indicating that the user should enroll another factor.

```go
if !enrollResponse.HasStep(idx.EnrollmentStepSuccess) {
  http.Redirect(w, r, "/enrollFactor", http.StatusFound)
  return
}
```

Create a page that displays a list of required authentication factors the user can enroll to verify their identity. They must choose a factor from the list and click **Next**. Use `EnrollmentResponse.HasStep` to identify which factors to display and whether the user can skip the remaining factors. The constants used are:

* `EnrollmentStepSkip`
* `EnrollmentStepPhoneVerification`
* `EnrollmentStepEmailVerification`

The following code shows the logic used to build the list.

```go
cer, _ := s.cache.Get("enrollResponse")
enrollResponse := cer.(*idx.EnrollmentResponse)

phoneFactor := false
emailFactor := false
skipFactor := false

if enrollResponse.HasStep(idx.EnrollmentStepSkip) {
  skipFactor = true
}

if enrollResponse.HasStep(idx.EnrollmentStepPhoneVerification) {
  phoneFactor = true
}

if enrollResponse.HasStep(idx.EnrollmentStepEmailVerification) {
  emailFactor = true
}

if !phoneFactor && !emailFactor {
  s.transitionToProfile(enrollResponse, w, r)
  return
}
```

The flags set in the previous code are used in the following code to toggle the factor display and skip option.

```go
{{ if not .FactorSkip }}
  <p class="text-sm text-gray-500">We require you to enroll in the following factors:</p>
{{end}}
<div class="mt-4 space-y-4">
  {{if .FactorEmail}}
    <div class="flex items-center">
      <input id="push_email" name="push_factor" value="push_email" type="radio" checked>
      <label for="push_email">
        Email
      </label>
    </div>
  {{end}}
  {{if .FactorPhone}}
    <div class="flex items-center">
      <input id="push_phone" name="push_factor" value="push_phone" type="radio" {if not .FactorEmail}} checked{{end}}>
      <label for="push_phone">
        Phone
      </label>
    </div>
  {{end}}
```

In this scenario, you configure the app's authentication policy to require a password and another factor. Therefore, the user must enroll at least one of either the email or phone factors.

<div class="half wireframe-border">

![A choose your authenticator form with email and phone authenticator options and a next button](/img/wireframes/choose-authenticator-form-email-phone.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A37020&t=2h5Mmz3COBLhqVzv-1 choose-authenticator-form-email-phone
 -->

</div>

### The user submits the email authenticator

If the user chooses and submits the email authenticator, call `EnrollmentResponse.VerifyEmail`.

```go
cer, _ := s.cache.Get("enrollResponse")
enrollResponse := cer.(*idx.EnrollmentResponse)

enrollResponse, err := enrollResponse.VerifyEmail(r.Context())

if err != nil {
  http.Redirect(w, r, "/enrollFactor", http.StatusFound)
  return
}

  s.cache.Set("enrollResponse", enrollResponse, time.Minute*5)
}
  s.render("enrollEmail.gohtml", w, r)
```

### The app displays an OTP input page

If the call is successful, a one-time passcode (OTP) is sent to the user's email. Build a form that allows the user to enter that OTP.

<div class="half wireframe-border">

![A form with a field for a verification code and a submit button](/img/wireframes/enter-verification-code-form.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36808&t=2h5Mmz3COBLhqVzv-1 enter-verification-code-form
 -->

</div>

### The user submits the OTP

The user opens the email and copies the OTP into the form. When the user submits the OTP, call  `EnrollmentResponse.ConfirmEmail`, passing in the OTP as a parameter.

```go
cer, _ := s.cache.Get("enrollResponse")
enrollResponse := cer.(*idx.EnrollmentResponse)

if enrollResponse.Token() != nil {
 //Since the phone factor is available in this use case, tokens won't exist until the
 //user skips the phone factor in the next step
}

enrollResponse, err = enrollResponse.ConfirmEmail(r.Context(), r.FormValue("code"))
```

### The app displays a second list of optional authenticators to enroll

Assuming that the verification was successful, call `WhereAmI` on the returned `EnrollmentResponse` object. `WhereAmI` returns an `EnrollmentResponse` object with information about how to proceed. In this scenario, the user still has authentication factors to enroll before registration is complete.

```go
 //Identify what is next to proceed with the register
enrollResponse, err = enrollResponse.WhereAmI(r.Context())

s.cache.Set("enrollResponse", enrollResponse, time.Minute*5)
http.Redirect(w, r, "/enrollFactor", http.StatusFound)
```

Redirect the user to the list page you created earlier to choose another authentication factor. The code is the same. The page should show only the phone factor. However, since this factor is optional and the user has now enrolled two factors, `enrollResponse.HasStep(idx.EnrollmentStepSkip)` returns `true` meaning that the list page should now also display a **Skip** button.

```go
if enrollResponse.HasStep(idx.EnrollmentStepSkip) {
 //This method should return true
}

if enrollResponse.HasStep(idx.EnrollmentStepPhoneVerification) {
 //This call should return true
}

if enrollResponse.HasStep(idx.EnrollmentStepEmailVerification) {
 //This call should return false because the email was already enrolled
}
```

<div class="half wireframe-border">

![A choose your authenticator form with only a phone authenticator option, and next and skip buttons](/img/wireframes/choose-authenticator-form-phone-only-with-skip.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A37043&t=2h5Mmz3COBLhqVzv-1 choose-authenticator-form-phone-only-with-skip
 -->

</div>

### The user skips the phone authenticator

If the user skips phone enrollment, call `EnrollmentResponse.Skip`. This skips the authenticator enrollment and eliminates the need to verify the factor:

```go
func (s *Server) transitionToProfile(er *idx.EnrollmentResponse, w http.ResponseWriter, r *http.Request) {
  session, err := sessionStore.Get(r, "direct-auth")

  enrollResponse, err := er.Skip(r.Context())

  ...
```

For more details about enrolling the phone factor, see the sample application. For details on how to verify a sign-in flow with the phone factor, see [Sign in with password and phone factors](/docs/guides/oie-embedded-sdk-use-case-sign-in-pwd-phone/go/main/).

### Complete registration

The user is now registered with no more factors to be verified. The `EnrollmentResponse` object returned from the `Skip` method returns tokens indicating that the registration and sign-in flows were successful. Redirect the user to the app's default signed-in page.

```go
if enrollResponse.Token() != nil {
  session.Values["access_token"] = enrollResponse.Token().AccessToken
  session.Values["id_token"] = enrollResponse.Token().IDToken
  err = session.Save(r, w)
  if err != nil {
    log.Fatalf("could not save access token: %s", err)
  }
}
```
