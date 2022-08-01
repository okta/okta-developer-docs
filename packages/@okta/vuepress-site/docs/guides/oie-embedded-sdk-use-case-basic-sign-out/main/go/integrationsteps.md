### 1: Create a sign-out UI element

The first step is to create an element that allows the user to sign out of the app.

<div class="quarter">

![Displays a sign-out link that initiates the user sign-out flow](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-simple-sign-out-link.png)

</div>

### 2: Remove the tokens from the local session

Remove the tokens stored in session during a sign-in flow from session state.

```go
session, err := sessionStore.Get(r, "okta-custom-login-session-store")
if err != nil {
  http.Error(w, err.Error(), http.StatusInternalServerError)
  }

  delete(session.Values, "id_token")
  delete(session.Values, "access_token")

```

### 3: Remove the tokens from the server

The next step is to revoke the tokens on the server. Use the
[token revocation endpoint](/docs/guides/revoke-tokens/main/#revoke-an-access-token-or-a-refresh-token)
to remove the tokens from the server and clear it from use in any location.

<!-- The goland SDK and sample app do not have code to revoke a token. It's a bug and a JIRA ticket
has been opened. In the meantime, a reference to manually revoke the token using the endpoints is used. -->

### 4: Redirect the user to the default signed-out page

After the user is signed out, send them to the default page after a sign-out.
