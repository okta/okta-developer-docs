The Credential class manages the tokens for a user. Although there are methods available to check if a credential is expired and to request a refresh, this code uses `getValidAccessToken()` that only tries to refresh the token if it's expired.

```Kotlin
    if (CredentialBootstrap.defaultCredential().getValidAccessToken() == null) {
      // The user no longer has valid credentials.
    } else {
      // The user is still authorized.
    }
```
