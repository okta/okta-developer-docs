### 1: Create a sign-out UI element

The first step is to create a link, button, or other similar UI element that allows the user to sign out of the app.

### 2: Revoke the access token

When the sign-out request is initiated, create the following flow:

1. Obtain the access token from the active session state.

1. Call the [`IDXAuthenticationWrapper.revoketoken()`](https://github.com/okta/okta-idx-java/blob/master/api/src/main/java/com/okta/idx/sdk/api/client/IDXAuthenticationWrapper.java) method, passing in the access token obtained from the previous step.

1. Invalidate the current session.

```kotlin
   ...
    fun signOut() {
        transitionToForm(form = initialForm())
    }
    ...
```

### 3: Send the user to the signed-out page

After the access token is revoked and the session is no longer valid, redirect the user to the signed-out page.
