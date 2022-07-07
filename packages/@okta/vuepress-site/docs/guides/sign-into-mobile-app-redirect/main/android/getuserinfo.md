To find information about the user, use the `idToken` method. The `Jwt` object contains information for the user.

```kotlin
suspend fun showPreferredUsername() {
    val idToken: Jwt = CredentialBootstrap.defaultCredential().idToken() ?: return
    println(idToken.preferredUsername)
}
```

The method reads the user information from the local ID token. The available information depends on the scopes that are used to authenticate the user. You can also request information from the server with the `getUserInfo` method of the `Credential` class.
