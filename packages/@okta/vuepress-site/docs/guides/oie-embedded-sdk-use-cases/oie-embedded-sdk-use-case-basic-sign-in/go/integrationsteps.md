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

### Step 4: Store tokens in session and redirect user to default sign-in page

The `Identity` method returns a `LoginResponse` and `error`
object. Use the `error` object to determine if there were errors in the
user sign-in. If the `error` object is `nil` and `LoginResponse's`
`Token` property is not `nil`, the sign-in is successfully completed.
Store the tokens in session for later use such as fetching user profile
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

### Step 5 (Optional): Get user profile information

Optionally, you can obtain basic user information after a successful user
sign-in by making a request to Okta's Open ID Connect authorization server.
See [Get user profile information after sign in](/docs/guides/oie-embedded-sdk-alternate-flows/aspnet/main/#getuserprofileinfo).
