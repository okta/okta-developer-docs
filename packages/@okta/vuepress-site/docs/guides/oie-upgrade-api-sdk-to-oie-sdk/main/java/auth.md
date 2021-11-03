### Use case: basic sign in with username and password

### Okta Java Authentication SDK authentication flow

Using the Classic Engine Java Auth SDK, a typical app starts the basic sign-in authentication flow by instantiating the `AuthenticationClient` object and calling the `authenticate()` method with the username and password parameters. This call returns an `AuthenticationResponse` object, which provides a session token if the status is `SUCCESS`. If success status is not returned, the app has to handle the returned error or a list of additional factors to verify.

The following code snippet returns a client instance:

```java
public AuthenticationClient authenticationClient() {
       return AuthenticationClients.builder().build();
    }
```

> **Note:** Environment variables are used to configure the client object, see [Java Auth SDK configuration reference](https://github.com/okta/okta-auth-java#configuration-reference) for details.

The following code snippet shows how the `authenticate()` method is handled with the Java Auth SDK:

```java
try {
    authenticationResponse = authenticationClient.authenticate(username,
         password.toCharArray(), null, ignoringStateHandler);

    // handle factors, if any
     if (authenticationResponse != null &&
        !CollectionUtils.isEmpty(authenticationResponse.getFactors())) {
         return AuthHelper.proceedToVerifyView(authenticationResponse,
              authenticationClient, ignoringStateHandler);
    }
} catch (final AuthenticationException e) {
    logger.error("Authentication Error - Status: {}, Code: {}, Message: {}",
        e.getStatus(), e.getCode(), e.getMessage());
    modelAndView.addObject("error",
        e.getStatus() + ":" + e.getCode() + ":" + e.getMessage());
    return modelAndView;
}
```

#### Upgrade to the Okta Java Identity Engine SDK authentication flow

> **Note:** Before implementing your embedded app with the Java Identity Engine SDK, ensure you have all the prerequisites. See [Add the Identity Engine SDK to your app](/docs/guides/oie-upgrade-add-sdk-to-your-app/java/main/).


For the Identity Engine SDK, you generally start the authentication flow with a call to the `idx.authenticate` method on an OktaAuth object (for example, `authClient`), using the parameters of username and password, or no parameters at all (see [Okta Identity Engine code options](/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/nodejs/main/#okta-identity-engine-sdk-code-options)). This call returns a status on the transaction object (`transaction.status`), which must be handled by the application code. If successful (`transaction.status === IdxStatus.SUCCESS`), your application receives access and ID tokens with the success response.

See the following code snippet for this example:

```JavaScript
const transaction = await authClient.idx.authenticate({
  username: 'some-username',
  password: 'some-password',
});

if (transaction.status === IdxStatus.SUCCESS) {
  authClient.tokenManager.setTokens(transaction.tokens); // App receives tokens directly
}

```

For further details and reference material, see [Migrating from authn to IDX](https://github.com/okta/okta-auth-js/blob/master/docs/migrate-from-authn-to-idx.md) in the Okta Auth JavaScript SDK.

For further details on the password authentication flow using Identity Engine and a sample application, see [Basic Sign in flow with the password factor](https://developer.okta.com/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/nodejs/main/).

#### Okta Identity Engine SDK code options

The Identity Engine SDK methods provide an opportunity to mirror the code styles used in the Classic Engine Authentication SDK, which can facilitate an easier migration path. It also provides an opportunity to use a more open, flexible code style that takes advantage of the recursive nature of the SDK.These styles are respectively referenced in the Identity Engine SDK as Up-Front and On-Demand. See [Approaches](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#approaches) in the Identity Engine SDK.
