## Integration steps

### Create a sign out UI element

The first step is to create a link, button, or another similar UI
element that allows the user to sign out of the app.

<div class="common-image-format">

![Image of a sign out link that initiates the user sign out](/img/oie-embedded-sdk/oie-embedded-sdk-go-use-case-simple-sign-out-link.png)

</div>

### Step 2: Remove tokens from session state

Remove the tokens, which were stored in session during sign in, from session state.

```go
session, err := sessionStore.Get(r, "okta-custom-login-session-store")
if err != nil {
  http.Error(w, err.Error(), http.StatusInternalServerError)
  }

  delete(session.Values, "id_token")
  delete(session.Values, "access_token")

```

### Step 3: Send user to the signed out page

After the user is signed out, send them to the default page after a sign-out.
