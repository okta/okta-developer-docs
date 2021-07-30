## Integration steps

### Step 1: Create a sign-out UI element

The first step is to create a link, button, or other similar UI element that allows the user to sign out of the app.

<div class="common-image-format">

![Sign-out link](/img/oie-embedded-sdk/oie-embedded-sdk-use-case-simple-sign-out-link.png "Sign-out link")

</div>

### Step 2: Revoke access token

When the sign-out request is initiated, create the following flow:

1. Obtain the access token from the active session state.

1. Call `revokeToken` on [IDXAuthenticationWrapper](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java), passing in the access token obtained from the previous step.

1. Invalidate the current session.

```kotlin
   ...
    fun signOut() {
        transitionToForm(form = initialForm())
    }
    ...
```

### Step 3: Send user to the signed-out page

After the access token is revoked and the session is no longer valid, redirect the user to the signed-out page.
