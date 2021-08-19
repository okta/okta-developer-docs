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

### Step 2: Navigate to the sign-up page

Build a sign-in page that captures the user's first name, last name, and email.

<div class="common-image-format common-image-format-vertical-margin">

![A screenshot of a sign up page in a Golang application](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-self-reg-page.png)

</div>

### Step 3: Submit sign-up information

When the user submits their sign-up information, create a `UserProfile` object and set its
`FirstName`, `LastName`, and `Email` to the values they entered on the page. Call the
`Client` object's `InitProfileEnroll` method, passing in this object.

```go
profile := &idx.UserProfile{
  FirstName: r.FormValue("firstName"),
  LastName:  r.FormValue("lastName"),
  Email:     r.FormValue("email"),
}

enrollResponse, err := s.idxClient.InitProfileEnroll(context.TODO(), profile)
if err != nil {
 //Error handling
}

s.cache.Set("enrollResponse", enrollResponse, time.Minute*5)
if enrollResponse.HasStep(idx.EnrollmentStepPasswordSetup) {
  http.Redirect(w, r, "/enrollPassword", http.StatusFound)
  return
}
```

The `InitProfileEnroll` method returns an `EnrollmentResponse` object. Execute the `HasStep` method
on this object, passing in the `EnrollmentStepPasswordSetup` constant. If
the Okta configuration is set up correctly, `HasStep` should return `true`. At this point, the
user should enter their password.

### Step 4: Show the password page

Create a page for the user to enter their password.

<div class="common-image-format common-image-format-vertical-margin">

![A screenshot of a password page in a Golang application](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-self-reg-pwd-page.png)

</div>

### Step 5: Submit the password

When the user submits their password, call the `EnrollmentResponse` object's `SetNewPassword` method,
passing in the password the user entered on the page. The method returns an `EnrollmentResponse`
object. Call the `HasStep` method on this object and pass in the `EnrollmentStepSuccess` constant.
The method should return `true`, which indicates the next phase is the factor enrollment.

```go
cer, _ := s.cache.Get("enrollResponse")
enrollResponse := cer.(*idx.EnrollmentResponse)

newPassword := r.FormValue("newPassword")
confirmPassword := r.FormValue("confirmPassword")

enrollResponse, err = enrollResponse.SetNewPassword(context.TODO(), r.FormValue("newPassword"))
if err != nil {
 //Error Handling
}

if !enrollResponse.HasStep(idx.EnrollmentStepSuccess) {
  http.Redirect(w, r, "/enrollFactor", http.StatusFound)
  return
}
```

### Step 6: Build a list of available factors to display to user

The next step is to build a page to display the list of available factors
that the user can enroll into. In this use case it will be the email and phone
factors. Use the `EnrollmentResponse` object's `HasStep` method
to identify which factors can be displayed and whether the user can skip the
remaining factors. The constants used are:

* `EnrollmentStepSkip`
* `EnrollmentStepPhoneVerification`
* `EnrollmentStepEmailVerification`

The sample application's code below shows the logic used to display the factors page.

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

The flags set in the previous code are used in the following code to toggle the
factor display and skip option.

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

An example of the page from the sample application is shown below:

<div class="common-image-format common-image-format-vertical-margin">

![A screenshot of the factor list page in a Golang application](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-self-reg-factor-list-page.png)

</div>

### Step 7: Submit the email factor for verification

Assuming the user selected the email factor and clicked continue, the next step is to
call the `EnrollmentResponse` object's `VerifyEmail` method.

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

After `VerifyEmail` is called, redirect the user to a page that accepts the
email confirmation code.

<div class="common-image-format common-image-format-vertical-margin">

![A screenshot of the email verification page in a Golang application](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-self-reg-email-code-page.png)

</div>

### Step 8: Submit the verification code

After the user submits the verfication code from their email, call the `EnrollmentResponse`
object's `ConfirmEmail` method, passing in the verification code. Assuming the verification was
successful, call the `WhereAmI` method on the returned `EnrollmentResponse` object.
`WhereAmI` returns an `EnrollmentResponse` object with information about
how to proceed.

```go
cer, _ := s.cache.Get("enrollResponse")
enrollResponse := cer.(*idx.EnrollmentResponse)

if enrollResponse.Token() != nil {
 //Since the phone factor is available in this use case, tokens won't exist until the
 //user skips the phone factor in the next step
}

enrollResponse, err = enrollResponse.ConfirmEmail(r.Context(), r.FormValue("code"))

 //Identify what is next to proceed with the register
enrollResponse, err = enrollResponse.WhereAmI(r.Context())

s.cache.Set("enrollResponse", enrollResponse, time.Minute*5)
http.Redirect(w, r, "/enrollFactor", http.StatusFound)
```

### Step 9: Again show the list containing the available factors to enroll

The next step is to show a list of available factors using the same page created in
Step 6. Based on how you configured the Okta org for this use case, only the phone
factor should be displayed. The `EnrollmentResponse` object's `HasStep` method you called in
[Step 6](#step-6-build-a-list-of-available-factors-to-display-to-user) is used to toggle the visibility of the skip button and show the avaiable factors. In this step, the skip button and phone factor option should be visible.


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

<div class="common-image-format">

![A screenshot of the phone factor with skip buttin in the Golang application](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-self-reg-phone-factor-skip.png)

</div>

### Step 10: Skip the phone factor

Assuming the user skips the phone factor and completes the registration with only the email,
call the `EnrollmentResponses` object's `Skip` method.

```go
func (s *Server) transitionToProfile(er *idx.EnrollmentResponse, w http.ResponseWriter, r *http.Request) {
  session, err := sessionStore.Get(r, "direct-auth")

  enrollResponse, err := er.Skip(r.Context())

  ...
```

For more details about enrolling the phone factor see the sample application. For details on how
to verify a sign-in with the phone factor, see
[Sign in with password and phone factors](/docs/guides/oie-embedded-sdk-use-cases/go/oie-embedded-sdk-use-case-sign-in-pwd-phone/).

### Step 11: Store the tokens in session and go to the signed-in home page

The `EnrollmentResponse` object returned from the `Skip` method should return tokens
indicating the register and sign-in was successful. Send the user to their
signed-in home page.

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

### Step 12 (Optional): Retrieve the user profile information

Optionally, you can obtain basic user information after a successful user
sign-in by making a request to Okta's Open ID Connect authorization server.
See [Get user profile information](/docs/guides/oie-embedded-sdk-use-cases/go/oie-embedded-sdk-use-case-basic-sign-in/#get-user-profile-information) for more information.
