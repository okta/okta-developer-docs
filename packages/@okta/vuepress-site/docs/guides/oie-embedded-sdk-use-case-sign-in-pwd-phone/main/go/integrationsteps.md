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

Build a sign-in page that captures both the user's name and password.

<div class="half wireframe-border">

![A sign-in form with fields for username and password, a next button, and links to the sign-up and forgot your password forms](/img/wireframes/sign-in-form-username-password-sign-up-forgot-your-password-links.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36729&t=wzNwSZkdctajVush-1 sign-in-form-username-password-sign-up-forgot-your-password-links
 -->

</div>

During page load, call the `Client` object's `InitLogin` method. This method returns an object of type
`LoginResponse` that is used to initate the sign-in process with Okta.  The object
also contains a list of available social Identity Providers (IdPs) that is discussed in more detail in the
[Sign-in flow with Facebook](/docs/guides/oie-embedded-sdk-use-case-sign-in-soc-idp/go/main)
use case.

```go
lr, err := s.idxClient.InitLogin(context.TODO())
if err != nil {
	log.Fatalf("Could not initalize login: %s", err.Error())
}
```

### 3: Submit the user credentials

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

Next, call the `Identify` method of the `LoginResponse` object obtained
in [step 2](#_2-capture-credentials-with-the-sign-in-page), passing in the `IdentifyRequest` created in the previous step.

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

 //Additional factors required -  redirect to factors page
s.cache.Set("loginResponse", lr, time.Minute*5)
http.Redirect(w, r, "/login/factors", http.StatusFound)
return
```

### 5: Show an option to choose the phone factor

The next step is to build a page that allows the user to choose a factor to continue the authentication flow.

<div class="half wireframe-border">

![A choose your authenticator form with only a phone authenticator option and a next button](/img/wireframes/choose-authenticator-form-phone-only.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A36858&t=2h5Mmz3COBLhqVzv-1 choose-authenticator-form-phone-only
 -->

</div>

When the page loads call the `LoginResponse` object's `HasStep`method once for the `LoginStepPhoneVerification` and `LoginStepPhoneInitialVerification` constants. If the method returns `true` for either constants, show the phone factor option.

```go
clr, _ := s.cache.Get("loginResponse")
lr := clr.(*idx.LoginResponse)

if lr.HasStep(idx.LoginStepPhoneVerification) || lr.HasStep(idx.LoginStepPhoneInitialVerification) {
  s.ViewData["FactorPhone"] = true
} else {
  s.ViewData["FactorPhone"] = false
}
```

### 6: Submit the phone factor to verify the user's identity

After the user chooses the phone factor, the next step is for them to choose a phone method type and
optional phone number. The phone number field should be displayed only when the user has not yet set up
their phone number within the Okta org. In this case, the `LoginResponse` object's `HasStep` method returns
true when `LoginStepPhoneInitialVerification` is passed in.

The sample application toggles the display of phone number field by first setting the
`InitialPhoneSetup` flag.

```go
if lr.HasStep(idx.LoginStepPhoneInitialVerification) {
  s.ViewData["InitialPhoneSetup"] = true
} else {
  s.ViewData["InitialPhoneSetup"] = false
}
```

This flag is then used in a template to decide whether or not to display the field.

```go
{{if .InitialPhoneSetup}}
  <div>
    <label for="phoneNumber" class="block text-sm font-medium text-gray-700">
      Enter your phone number in format: (+) {country code} {area code} {number}
      <br> For e.g. +1 555 666 7777
    </label>
    <div class="mt-1">
      <input id="phoneNumber" name="phoneNumber" type="text" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
    </div>
  </div>
{{end}}
```

This code is used to create a form for the user to enter their phone number to receive a verification code, similar to the wireframe below.

<div class="half wireframe-border">

![A form with a field for a phone number, formatting advice and a next button](/img/wireframes/enter-phone-number-form.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3399%3A37078&t=2h5Mmz3COBLhqVzv-1 enter-phone-number-form
 -->

</div>

### 7: Submit the phone factor details

After the user submits their phone factor details, call the `LoginResponse` object's `VerifyPhoneInitial`
method if the user has not enrolled their phone number, else use `VerifyPhone`. Calling either method instructs
the Okta server to send a message to the user's phone with the verification code.

```go
if lr.HasStep(idx.LoginStepPhoneInitialVerification) {
  lr, err = lr.VerifyPhoneInitial(r.Context(), idx.PhoneMethodSMS, r.FormValue("phoneNumber"))
} else {
  lr, err = lr.VerifyPhone(r.Context(), idx.PhoneMethodSMS)
}

```

> **Note:** Only the SMS method type is currently supported. Voice will be supported in a future
> release.

### 8: Show the phone code verification page

The next step is to build the code verification page. After the user submits the method type
and optional phone number, they need to enter the verification code from their phone.

<div class="half wireframe-border">

![A form with a field for a verification code, a note to find the code in a SMS and a submit button](/img/wireframes/enter-verification-code-form-with-sms-message.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3400%3A37154&t=vr9MuCR8C4rCt3hC-1 enter-verification-code-form-with-sms-message
 -->

</div>

### 9: Submit the verification code

After the user checks their phone for the code and submits it, call the
`LoginResponse` object's `ConfirmPhone` method to verify the code. For this use case
the method should return tokens signifying a successful sign-in.

```go
 //Get LoginResponse from session
clr, _ := s.cache.Get("loginResponse")
lr := clr.(*idx.LoginResponse)

session, err := sessionStore.Get(r, "direct-auth")
if err != nil {
  log.Fatalf("could not get store: %s", err)
  }

lr, err = lr.ConfirmPhone(r.Context(), r.FormValue("code"))
if err != nil {
 //Error handling code
}

s.cache.Set("loginResponse", lr, time.Minute*5)
http.Redirect(w, r, "/login/factors", http.StatusFound)
```

### 10: Store the tokens in a session

Store the tokens in session to be used for additional calls. After the tokens
are stored, redirect the user to the default signed-in home page.

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

### 11 (Optional): Get the user profile information

Optionally, you can obtain basic user information after a successful user
sign-in by making a request to the Okta OpenID Connect authorization server. See [Get the user profile information](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/go/main/#get-the-user-profile-information) for more information.
