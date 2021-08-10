## Integration steps

### Step 1: Click the sign-out link

The first step is to create a element that allows the user to sign out of the app.

<div class="common-image-format">

![Image of a sign out link that initiates the user sign out](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-simple-sign-out-link.png)

</div>

### Step 2: Remove the tokens from local session

Remove the tokens, which were stored in session during sign-in, from session state.

```go
session, err := sessionStore.Get(r, "okta-custom-login-session-store")
if err != nil {
  http.Error(w, err.Error(), http.StatusInternalServerError)
  }

  delete(session.Values, "id_token")
  delete(session.Values, "access_token")

```

### Step 3: Remove the tokens from server

The next step is to revoke the tokens on the server. Use the
[token revocation endpoint](/docs/guides/revoke-tokens/revokeatrt/)
to remove the tokens from the server and clear it from use in any location.

<!-- The goland SDK and sample app do not have code to revoke a token. It's a bug and a JIRA ticket
has been opened. In the meantime, a reference to manually revoke the token using the endpoints is used. -->

### Step 4: Redirect the user to the default signed-out page

After the user is signed out, send them to the default page after a sign-out.
