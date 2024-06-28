### Okta Authentication SDK authentication flow

Using the Classic Engine Java Auth SDK, a typical app starts the basic sign-in authentication flow by instantiating the `AuthenticationClient` object and calling the `authenticate()` method with the username and password parameters. This call returns an `AuthenticationResponse` object, which provides a session token if the status is `SUCCESS`. If success status isn't returned, the app has to handle the returned error or a list of additional factors to verify.

The following code snippet returns a client instance:

```java
public AuthenticationClient authenticationClient() {
    return AuthenticationClients.builder().build();
}
```

> **Note:** Environment variables are used to configure the client object, see [Java Auth SDK configuration reference](https://github.com/okta/okta-auth-java#configuration-reference) for details.

The following code snippet shows how the `authenticate()` method is handled with the Java Auth SDK:

```java
authenticationResponse = authenticationClient.authenticate(username, password.toCharArray(), null, ignoringStateHandler);

// handle factors, if any
if (authenticationResponse != null && !CollectionUtils.isEmpty(authenticationResponse.getFactors())) {
    return AuthHelper.proceedToVerifyView(authenticationResponse, authenticationClient, ignoringStateHandler);
}
```

### Identity Engine SDK authentication flow

> **Note:** Before implementing your embedded app with the Java Identity Engine SDK, ensure that you have all the prerequisites. See [Add the Identity Engine SDK to your app](/docs/guides/oie-upgrade-add-sdk-to-your-app/java/main/).

The basic sign-in flow is similar to implement using the Java Identity Engine SDK. The authentication flow starts when the app instantiates the `IDXAuthenticationWrapper` client object and calls the `begin()` method. After receiving the username and password from the user, the app passes them as arguments to the `authenticate()` method (similar to the Java Auth SDK’s `AuthenticationClient.authenticate()` method). This method returns the Identity Engine `AuthenticationResponse` object with an `AuthenticationStatus`. If `AuthenticationStatus=SUCCESS`, then the app calls the `AuthenticationResponse.getTokenResponse()` method to retrieve the required tokens for authenticated user activity. The app needs to handle all the other `AuthenticationStatus` options returned, including failed authentication.

The following code snippet shows how the `IDXAuthenticationWrapper.authenticate()` method is called with the Java Identity Engine SDK:

```java
// begin transaction
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin();

// get proceed context
ProceedContext proceedContext = beginResponse.getProceedContext();

// trigger authentication
AuthenticationResponse authenticationResponse =
    idxAuthenticationWrapper.authenticate(new AuthenticationOptions(username, password.toCharArray()), proceedContext);
```

See [Sign-in flow: password-only](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/java/main/) for further details on the Identity Engine password authentication flow.
