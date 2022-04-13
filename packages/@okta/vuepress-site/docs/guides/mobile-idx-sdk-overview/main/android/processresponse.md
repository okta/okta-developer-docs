```kotlin
private suspend fun handleResponse(response: IdxResponse) {
    // If a response is successful, immediately exchange it for a token.
    if (response.isLoginSuccessful) {
        // Get the token from the response and exit the flow.
        return
    }

    // Check for messages, such as entering an incorrect code or auth error and abort if there is message.
    if (response.messages.isNotEmpty()) {
        // Handle the error.
        return
    }

    // If no remediations are present, abort the login process and show error.
    if (response.remediations.isEmpty()) {
        // Handle the error. For example, go back to login page.
        return
    }

    // Handle the different sign-in steps (remediations) for a policy.
    for (remediation in response.remediations) {
        // Handle different types of remediations.
        // Call `proceed(remediation)` after user input is processed for a remediation.
    }

    if (response.authenticators.isNotEmpty()) {
        // Process authenticators.
    }
}

/**
  * Proceed to the next step in the IDX flow using the specified remediation.
  */
private fun proceed(remediation: IdxRemediation) {
    viewModelScope.launch {
        when (val resumeResult = client?.proceed(remediation)) {
            is IdxClientResult.Error -> {
                // Handle error.
            }
            is IdxClientResult.Success -> {
                handleResponse(resumeResult.result)
            }
        }
    }
}
```
