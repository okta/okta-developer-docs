Needs update
<!--
Apart from errors that you might encounter while calling the IDX API methods like `IdxClient.start()`, `resume()`, etc, there could also be error messages from the API in `response.messages` (like wrong password, or wrong OTP, etc)

```kotlin
private suspend fun handleResponse(response: IdxResponse) {
    ...

    // Check for messages, such as entering an incorrect code or auth error and abort if there is message.
    if (response.messages.isNotEmpty()) {
        val messages = mutableListOf<String>()
        for (message in response.messages) {
            messages += message.message
        }
        // Show messages to the user and offer a retry
        return
    }

    // If no remediations are present, abort the login process and show error.
    if (response.remediations.isEmpty()) {
        // Handle the error. For example, go back to login page.
        return
    }

    ...
}
```
-->
