### 1: The user navigates to the sign-in page

Begin the authentication process by calling the Java SDK's `IDXAuthenticationWrapper.begin()` method and getting a new `ProceedContext` object.

```kotlin
    val beginResponse = idxAuthenticationWrapper.begin()
    val beginProceedContext = beginResponse.proceedContext
```

Use the `AuthenticationResponse.getIdps()` function to return a list of social Identity Provider (IdP) options configured in your org's routing rule.

```kotlin
    val idps = authenticationResponse.getIdps()
```

### 2: The user signs in with Facebook

When the user selects the **Login with Facebook** option, they are directed to the Facebook sign-in page.

After the user signs in to Facebook successfully, Facebook routes the user to the location specified in **Valid OAuth Redirect URIs** from the Facebook developer site.

> **Note:** The **Valid OAuth Redirect URIs** for your Okta org is in the format: `https://{yourOktaDomain}/oauth2/v1/authorize/callback`. See [Create a Facebook app in Facebook](/docs/guides/oie-embedded-common-org-setup/android/main/#_1-create-a-facebook-app-in-facebook) for details on configuring the **Valid OAuth Redirect URIs** value.

### 3: Handle the callback from Okta

Okta returns the Interaction code in the callback to the **Sign-in redirect URI** location specified in the [Create a new application](/docs/guides/oie-embedded-common-org-setup/android/main/#create-a-new-application) section. You need to handle the callback by exchanging the Interaction code for the required tokens (access, refresh, ID).

```kotlin
    val authenticationResponse = authenticationWrapper.fetchTokenWithInteractionCode(issuer, proceedContext, interactionCode)
```

With the obtained access token, the user is successfully signed in and can be sent to the default sign-in page.
