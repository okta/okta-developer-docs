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

<div class="common-image-format">

![A basic sign in page in a Golang application](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-basic-sign-on.png)

</div>

During page load, call the `Client's` `InitLogin` method. Currently, this method returns
a list of social identity providers (IdPs) that identifies which IdPs to show on the page
as available sign-in options. See the
[Sign in with Facebook](docs/guides/oie-embedded-sdk-use-cases/go/oie-embedded-sdk-use-case-sign-in-soc-idp/)
use case for more details on social sign-ins.

```go
lr, err := s.idxClient.InitLogin(context.TODO())
if err != nil {
	log.Fatalf("Could not initalize login: %s", err.Error())
}
```

### Step 3: Authenticate user credentials

When the user initiates the sign in (for example, Continue button click), create
an `AuthenticationOptions` object and set its `Username` and `Password`
properties to the values entered by the user. Send this object to the
`IdxClient AuthenticateAsync` method.

```csharp
var idxAuthClient = new IdxClient();
 var authnOptions = new Okta.Idx.Sdk.AuthenticationOptions()
      {
          Username = model.UserName,
          Password = model.Password,
      };

var authnResponse = await idxAuthClient.AuthenticateAsync(authnOptions).ConfigureAwait
(false);
```

