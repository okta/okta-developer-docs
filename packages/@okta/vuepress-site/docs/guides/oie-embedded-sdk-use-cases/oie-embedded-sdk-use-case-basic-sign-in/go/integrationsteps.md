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

### Step 2: Navigate to the sign-in page

Build a sign-in page that captures the user's name and password.

<div class="common-image-format common-image-format-vertical-margin">

![A basic sign-in page in a Golang application](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-basic-sign-on-page.png)

</div>

During page load, call the `Client` object's `InitLogin` method. This method returns an object of type
`LoginResponse` that is used to initate the sign-in process with Okta. This object
also contains a list of available social identity providers (IdPs) that are discussed in more detail in the
[Sign in with Facebook](/docs/guides/oie-embedded-sdk-use-cases/go/oie-embedded-sdk-use-case-sign-in-soc-idp)
use case.

```go
lr, err := s.idxClient.InitLogin(context.TODO())
if err != nil {
	log.Fatalf("Could not initalize login: %s", err.Error())
}
```

### Step 3: Initiate the sign-in

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

Next, using the `LoginResponse` object obtained from
[Step 2](#step-2-reconfigure-application-for-password-factor-only),
call its `Identify` method, passing in this new `IdentifyRequest` object.

```go
lr, err = lr.Identify(context.TODO(), ir)
if err != nil {
    session.Values["Errors"] = err.Error()
    session.Save(r, w)
    http.Redirect(w, r, "/login", http.StatusFound)
    return
}
```

### Step 4: Save the tokens and redirect user to the default home page

The `Identity` method returns a `LoginResponse` and `error`
object. Use the `error` object to determine if there were errors in the
user sign-in. If the `error` object is `nil` and the`LoginResponse` object's
`Token` property is not `nil`, the sign-in is successfully completed.
Store the tokens in session for later use, such as fetching user profile
information and refreshing the tokens.

```go
lr, err = lr.Identify(context.TODO(), ir)
if err != nil {
  session.Values["Errors"] = err.Error()
  session.Save(r, w)
  http.Redirect(w, r, "/login", http.StatusFound)
  return
}

if lr.Token() != nil {
  session.Values["access_token"] = lr.Token().AccessToken
  session.Values["id_token"] = lr.Token().IDToken
  err = session.Save(r, w)
  if err != nil {
  log.Fatalf("could not save access token: %s", err)
  }
  http.Redirect(w, r, "/", http.StatusFound)
  return
}
```

### Step 5 (Optional): Retrieve user profile information

Optionally, you can obtain basic user information after a successful user
sign-in by making a request to Okta's Open ID Connect authorization server.
See the next section for more information.
