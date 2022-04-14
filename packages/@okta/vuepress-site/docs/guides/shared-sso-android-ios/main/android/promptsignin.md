Add the `prompt=login` parameter in the second app's `MainActivity.kt` file within Android Studio.

```kotlin
private fun signIn() {
   webAuthClient.signIn(this, AuthenticationPayload.Builder()
      .setLoginHint(hintOrUsername)
      .addParameter("prompt", "login")
      .build()
   )
}
```
