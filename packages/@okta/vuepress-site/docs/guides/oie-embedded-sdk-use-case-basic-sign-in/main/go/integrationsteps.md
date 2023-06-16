### 1: The user navigates to the home page

When the user navigates to the home page and the application loads, create a new
SDK Client object by calling the `NewClient()` method.

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

Build a sign-in page that captures the user's name and password.

<div class="half wireframe-border">

![A sign-in form with fields for username and password and a next button](/img/wireframes/sign-in-form-username-password.png)

<!--

Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3398%3A36678&t=wzNwSZkdctajVush-1 sign-in-form-username-password
 -->

</div>

During page load, call the `Client` object's `InitLogin()` method. This method returns a `LoginResponse` object that is used to initiate the sign-in process with Okta. This object also contains a list of available social Identity Providers (IdPs) that are discussed in more detail in the [Sign in with Facebook](/docs/guides/oie-embedded-sdk-use-case-sign-in-soc-idp/go/main/)
use case.

```go
lr, err := s.idxClient.InitLogin(context.TODO())
if err != nil {
	log.Fatalf("Could not initalize login: %s", err.Error())
}
```

### 3: The user initiates the sign-in flow

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

Next, you can use the `LoginResponse` object obtained from [step 2](#_2-capture-credentials-with-the-sign-in-page) to call the `Identify()` method with the new `IdentifyRequest` object as an argument.

```go
lr, err = lr.Identify(context.TODO(), ir)
if err != nil {
    session.Values["Errors"] = err.Error()
    session.Save(r, w)
    http.Redirect(w, r, "/login", http.StatusFound)
    return
}
```

### 4: Save the tokens and redirect the user to the default home page

The `Identify()` method returns two objects: `LoginResponse` and `error`. Use the `error` object to determine if there were errors in the
user sign-in. If the `error` object is `nil` and the`LoginResponse` object's
`Token` property is not `nil`, then the sign-in process is successful. Store the tokens in a session for later use, such as fetching user profile information and refreshing the tokens.

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

### 5 (Optional): Get the user profile information

Optionally, you can obtain basic user information after the user successfully signs in by making a request to the Okta OpenID Connect authorization server. See the next section for more information.
