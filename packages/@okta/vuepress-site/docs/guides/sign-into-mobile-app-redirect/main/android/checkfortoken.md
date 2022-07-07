1. Verify that a user is already signed in via the `token` property:

   ```kotlin
   if (CredentialBootstrap.defaultCredential().token == null) {
       // There is no user signed in.
   } else {
       // The user has signed in.
   }
   ```

2. Verify that an authorized user still has access by checking that the access token is still valid. There are two ways to do this:

   The simplest way is by checking the `getAccessTokenIfValid` method.

   ```kotlin
   if (CredentialBootstrap.defaultCredential().getAccessTokenIfValid() == null) {
     // The user no longer has valid credentials.
   } else {
     // The user is still authorized.
   }
   ```

   Another way is to use the [introspect](/docs/reference/api/oidc/#introspect) endpoint. This gives you more information about the token in the [response properties](/docs/reference/api/oidc/#response-properties-3), and you can use that information to check for token expiration:

    ```kotlin
    when (val result = CredentialBootstrap.defaultCredential().introspectToken(TokenType.ACCESS_TOKEN)) {
        is OidcClientResult.Error -> {
            // There was an error fetching the result.
            // See the exception in `result.exception`.
        }
        is OidcClientResult.Success -> {
            val oidcIntrospectInfo = result.result
            if (oidcIntrospectInfo.active) {
                // The user is still authorized.
            } else {
                // The user no longer has valid credentials.
            }
        }
    }
    ```
