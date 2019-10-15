Add the following to the `MainActivity.kt` file within Android Studio.

```kotlin
private fun clearSession() {
   webAuthClient.signOutOfOkta(this)
}
```
