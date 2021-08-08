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

### Step 2: Build sign-in page and initialize client object

Build a sign-in page that captures both the user's name and password.

<div class="common-image-format">

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

### Step 5: Show option to choose the phone factor

The next step is to build a page that allows the user to choose a factor
to continue the authentication flow.

<div class="common-image-format">

![Screenshot showing an option to choose verification through the phone factor](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-phone-verify-page.png)

</div>

When the page loads call the `LoginResponse's` `HasStep`method once for the `LoginStepPhoneVerification` and `LoginStepPhoneInitialVerification` constants. If the method returns `true` for either constants show the
phone factor option.

```go
clr, _ := s.cache.Get("loginResponse")
lr := clr.(*idx.LoginResponse)

if lr.HasStep(idx.LoginStepPhoneVerification) || lr.HasStep(idx.LoginStepPhoneInitialVerification) {
  s.ViewData["FactorPhone"] = true
} else {
  s.ViewData["FactorPhone"] = false
}
```

### Step 6: Show phone verification method and optional phone number field

Once the user chooses the phone factor, the next step is for them to choose a phone method type and
optionally phone number. Currently, SMS is the only supported method type but voice is planned for
a future release. The phone number field should be displayed only when the user has not yet setup
their phone number within the Okta org. In this case, `LoginResponse's` `HasStep` method returns
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

The following page from the sample applicatino shows the phone number field and phone method type options.

<div class="common-image-format">

![Screenshot showing an option to choose phone method for the phone factor](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-phone-method-page.png)

</div>

### Step 7: Call VerifyPhone when user submits phone factor details

After the user submits their phone factor details, call the `LoginResponse's` `VerifyPhoneInitial`
if the user has not enrolled their phone number, else use `VerifyPhone`. Calling either method instructs
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

### Step 8: Show phone code verification page

The next step is to build the code verification page. After the user chooses the phone factor
to validate their identity, a page is shown that allows the user to enter the verification code
sent to their phone.

<div class="common-image-format common-image-format-vertical-margin">

![Screenshot showing an option to choose verification through the phone factor](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-phone-code-verify-page.png)

</div>

### Step 9: Call ConfirmPhone when user submits the verification code

Once the user checks their phone for the code and submits it in the verification code
page, call the `LoginResponse's` `ConfirmPhone` method to verify the code. For this use case
the method should return tokens signifying a successful sign in.

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

### Step 10: Store tokens in session

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

### Step 11 (Optional): Get user profile information

Optionally, you can obtain basic user information after a successful user
sign-in by making a request to Okta's Open ID Connect authorization server.
See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/aspnet/main/#getuserprofileinfo).
