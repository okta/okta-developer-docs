> **Note:** The examples in this guide use dynamic UI components to build authenticator enrollment and challenge views based on remediations sent in server response by IDX SDK.

### 1: Display the initial sign-in UI

Enable the user to start the sign-in flow, such as presenting a Sign In button or a form with fields for a username and password (you won't use those values until step 3 when you [authenticate the user credentials](#_3-authenticate-the-user-credentials)).

### 2: Start the sign-on flow

Initialize the SDK client and request the initial server response after the user starts the sign-in process. In the example app this is done in a [view model class](https://github.com/okta-samples/okta-android-oie-authenticators-quickstart/blob/main/app/src/main/java/com/okta/android/samples/authenticator/ui/login/LoginViewModel.kt)

```kotlin
@Volatile
private var client: IdxClient? = null

...
private fun createClient() {
    viewModelScope.launch {
        // initiate the IDX client and start IDX flow
        when (val clientResult = IdxClient.start(IdxClientConfigurationProvider.get())) {
            is IdxClientResult.Error -> {
                // handle errors
            }
            is IdxClientResult.Success -> {
                client = clientResult.result
                // calls the IDX API resume to receive the first IDX response.
                when (val resumeResult = clientResult.result.resume()) {
                    is IdxClientResult.Error -> {
                        // handle errors
                    }
                    is IdxClientResult.Success -> {
                        // handle the response `resumeResult.result`
                        handleResponse(resumeResult.result)
                    }
                }
            }
        }
    }
}
```

The `IdxClientConfigurationProvider` class used in the call to `IdxClient.start()` contains the configuration information for your Okta org, and in the sample app it is initialized from an `okta.properties` file found in the project root. The call to `clientResult.result.resume()` requests the first response of the sign-sequence.

### 3: Authenticate the user credentials

The SDK uses an `IdxResponse` object to represent the server response for the current sign-on step. It contains a collection of remediations (`IdxRemediation`) that specify the type of step, any general messages, and a nested collection of forms (`IdxRemediation.Form`) containing fields (`IdxRemediation.Form.Field`) that represent the various elements required for the UI, such as an text field with a label or a QR code. Completing a step usually requires setting the value of one or more fields. The remediation is then sent back to the server with the updated values by calling the `proceed()` function on the `IdxClient` instance. The server processes the values and then sends the next step and the the cycle continues until the user is authenticated.

The kind of sign-on step is represented by the `type` property of the remediation. In the first step the server is requesting the username and password, an `IDENTIFY` remediation type.

This code shows the `handleResponse` function that handles the an SDK response indicating a next step and includes all the types of remediations that are part of a Google Authenticator flow:

```kotlin
private suspend fun handleResponse(response: IdxResponse) {
    // If a response is successful, immediately exchange it for a token and handle success scenario
    if (response.isLoginSuccessful) {
        when (val exchangeCodesResult = client?.exchangeInteractionCodeForTokens(response.remediations[ISSUE]!!)) {
            is IdxClientResult.Error -> {
                // handle error
            }
            is IdxClientResult.Success -> {
               // handle success and get tokens from `exchangeCodesResult.result`
            }
        }
        return
    }

    // Check for messages, such as entering an incorrect code or auth error and abort if there is a message.
    if (response.messages.isNotEmpty()) {
        // handle error
        return
    }

    // If no remediations are present, abort the login process and show error
    if (response.remediations.isEmpty()) {
        // handle error
        return
    }

    // Handle the different sign-in steps (remediations) for a policy.
    val remediation = response.remediations.first()
    // check if there is a skip action
    val skipRemediation = response.remediations.find { it.type == SKIP }

    when (remediation.type) {
        // Username and password, though password may be separate; see the next case.
        IDENTIFY -> handleIdentify(remediation)
        // Request a password or a passcode, such as one from Google Authenticator.
        // Identity-first policies request the password separately.
        CHALLENGE_AUTHENTICATOR -> handleChallenge(remediation)
        // Display a list of authenticators to select or Enroll in an Authenticator
        SELECT_AUTHENTICATOR_ENROLL, ENROLL_AUTHENTICATOR -> handleAuthenticatorEnrollOrChallenge(remediation, skipRemediation)
        else -> {
            // handle other remediation types or throw and handle an error
        }
    }
}
```

The `handleIdentify()` function updates the username and password fields in the remediation object, and then calls `client.proceed(remediation)` which both sends the updated remediation to the server and requests the next step.

```kotlin
private fun handleIdentify(remediation: IdxRemediation) {
    // Update the values in the remediation object and proceed to the next step in IDX flow
    remediation["identifier"]?.value = username
    remediation["credentials.passcode"]?.value = password
    remediation.proceed()
}
```

You can create `proceed()` as an extension function for `IdxRemediation` so that you can just call `remediation.proceed()` and reuse the code for updating the remediation and sending it to the server.

```kotlin
private fun IdxRemediation.proceed() {
    val remediation = this
    viewModelScope.launch {
        when (val resumeResult = client?.proceed(remediation)) {
            is IdxClientResult.Error -> {
                // handle error
            }
            is IdxClientResult.Success -> {
                handleResponse(resumeResult.result)
            }
        }
    }
}
```

Some types of policies ask for the password in a separate step using a `CHALLENGE_AUTHENTICATOR` remediation type. The `handleChallenge()` function sets the password and calls `proceed()`:

```kotlin
private suspend fun handleChallenge(remediation: IdxRemediation) {
    // If no authenticators are found for challenge show error and abort
    if (remediation.authenticators.isEmpty()) {
        // handle error
        return
    }
    val authenticator = remediation.authenticators.first()

    when (authenticator.type) {
        IdxAuthenticator.Kind.PASSWORD -> {
            // Update the value in the remediation object and proceed to the next step in IDX flow
            remediation["credentials.passcode"]?.value = password
            remediation.proceed()
        }
        // handle other authenticators
        else -> {
            // handle unknown authenticator error
            return
        }
    }
}
```

> **Note:** The response from the server specifies either the next step, an error, or a
> message, such as an incorrect code. The code that handles the response may need to show
> different UI, depending on the step. In the example app [`LoginActivity`](https://github.com/okta-samples/okta-android-oie-authenticators-quickstart/blob/main/app/src/main/java/com/okta/android/samples/authenticator/ui/login/LoginActivity.kt) handles receiving a sign-in token in case of success, receiving errors and rendering dynamic UI fields.

### 4: Display a list of possible authenticator factors

After verifying the username and password, the server sends a remediation of type `SELECT_AUTHENTICATOR_ENROLL` that contains the possible authenticators. The list of choices are in the `options` property of a field with `name` set to `"authenticator"` in the remediation's `forms`, `visibleFields` property.

In the sample application we use a data structure ([`IdxDynamicField`](https://github.com/okta-samples/okta-android-oie-authenticators-quickstart/blob/main/app/src/main/java/com/okta/android/samples/authenticator/ui/login/IdxDynamicField.kt)) to hold details to build a dynamic UI

The display name of an authenticator is in the `label` property of the field. Use this name to build your selection UI. See the `IdxRemediation.Form.Field.asIdxDynamicFields()` function in the [LoginViewModel class of the sample application](https://github.com/okta-samples/okta-android-oie-authenticators-quickstart/blob/main/app/src/main/java/com/okta/android/samples/authenticator/ui/login/LoginViewModel.kt) for an example of building a dynamic field from options.

When the user selects an option, set the `selectedOption` property of the field containing the options (the one with the `name` `"authenticator"`) to the field containing the selected option. Call `proceed()` on the remediation once the user has finalized their choice to send the information and request the next step.

You may receive multiple enrollment requests during the sign-on flow when a policy includes more than one authenticator. When the policy allows the user to skip enrolling in additional authenticators the server returns at least one remediation with a `type` of `IdxRemediation.Type.SKIP` and you can use that to display a skip action and call proceed on that remediation.

```kotlin
private suspend fun handleAuthenticatorEnrollOrChallenge(remediation: IdxRemediation, skipRemediation: IdxRemediation?) {
    val fields = mutableListOf<IdxDynamicField>()
    ...
    for (visibleField in remediation.form.visibleFields) {
        fields += visibleField.asIdxDynamicFields()
    }
    fields += remediation.asDynamicAuthFieldActions()
    if (skipRemediation != null) {
        fields += skipRemediation.asDynamicAuthFieldActions()
    }
    ...
}

// Extract text fields and radio groups from IdxRemediation.form.visibleFields
private fun IdxRemediation.Form.Field.asIdxDynamicFields(): List<IdxDynamicField> {
    return when (true) {
        ...
        // options represent multiple choice items like authenticators and can be nested
        options?.isNullOrEmpty() == false -> {
            options?.let { options ->
                val transformed = options.map {
                    val fields =
                        it.form?.visibleFields?.flatMap { field -> field.asIdxDynamicFields() }
                            ?: emptyList()
                    IdxDynamicField.Options.Option(it, it.label, fields)
                }
                val displayMessages = messages.joinToString(separator = "\n") { it.message }
                listOf(
                    IdxDynamicField.Options(
                        label,
                        transformed,
                        isRequired,
                        displayMessages
                    ) {
                        selectedOption = it
                    })
            } ?: emptyList()
        }
        ...
    }
}

// Create actions for IdxRemediations with visibleFields
private fun IdxRemediation.asDynamicAuthFieldActions(): List<IdxDynamicField> {
    // Don't show action for actions that are pollable without visible fields.
    if (form.visibleFields.isEmpty() && capabilities.get<IdxPollRemediationCapability>() != null) {
        return emptyList()
    }

    val title = when (type) {
        SKIP -> "Skip"
        SELECT_AUTHENTICATOR_AUTHENTICATE, SELECT_AUTHENTICATOR_ENROLL -> "Choose Authenticator"
        else -> "Continue"
    }

    return listOf(IdxDynamicField.Action(title) { this.proceed() })
}
```

Display a UI for selecting an authenticator, or if there no options or some other issue, present an error.

One way to do this is building a dynamic UI based on the remediation form fields as below as shown in the [`LoginActivity`](https://github.com/okta-samples/okta-android-oie-authenticators-quickstart/blob/main/app/src/main/java/com/okta/android/samples/authenticator/ui/login/LoginActivity.kt) class of the sample application. The [`IdxDynamicField`](https://github.com/okta-samples/okta-android-oie-authenticators-quickstart/blob/main/app/src/main/java/com/okta/android/samples/authenticator/ui/login/IdxDynamicField.kt) class is used as a data model.

```kotlin
// if there are dynamic fields remove current view, iterate through fields and render them
if (loginResult.dynamicFields.isNotEmpty()) {
    binding.dynamicContainer.removeAllViews()
    for (field in loginResult.dynamicFields) {
        binding.dynamicContainer.addView(field.createView())
    }
}

/**
  * Render IdxDynamicFields dynamically on the given view
  */
private fun IdxDynamicField.createView(): View {
    return when (this) {
        // render text fields
        ...
        // render actions as buttons
        is IdxDynamicField.Action -> {
            val actionBinding = binding.dynamicContainer.inflateBinding(FormActionPrimaryBinding::inflate)
            actionBinding.button.text = label
            // set the onclick function of the IDX field as listener
            actionBinding.button.setOnClickListener { onClick() }
            actionBinding.root
        }
        // render radio groups for authenticator selection
        is IdxDynamicField.Options -> {
            fun showSelectedContent(group: RadioGroup) {
                for (view in group) {
                    val tagOption = view.getTag(R.id.option) as? IdxDynamicField.Options.Option?
                    if (tagOption != null) {
                        val nestedContentView = view.getTag(R.id.nested_content) as View
                        nestedContentView.visibility = if (tagOption == option) View.VISIBLE else View.GONE
                    }
                }
            }

            val optionsBinding = binding.dynamicContainer.inflateBinding(FormOptionsBinding::inflate)
            optionsBinding.labelTextView.text = label
            optionsBinding.labelTextView.visibility = if (label == null) View.GONE else View.VISIBLE
            for (option in options) {
                val optionBinding = optionsBinding.radioGroup.inflateBinding(
                    FormOptionBinding::inflate,
                    attachToParent = true
                )
                optionBinding.radioButton.id = View.generateViewId()
                optionBinding.radioButton.text = option.label
                optionBinding.radioButton.setTag(R.id.option, option)
                val nestedContentBinding = optionsBinding.radioGroup.inflateBinding(
                    FormOptionNestedBinding::inflate, attachToParent = true
                )
                optionBinding.radioButton.setTag(R.id.nested_content, nestedContentBinding.root)
                for (field in option.fields) {
                    nestedContentBinding.nestedContent.addView(field.createView())
                }
            }
            optionsBinding.radioGroup.setOnCheckedChangeListener { group, checkedId ->
                val radioButton = group.findViewById<View>(checkedId)
                option = radioButton.getTag(R.id.option) as IdxDynamicField.Options.Option?
                showSelectedContent(group)
            }

            showSelectedContent(optionsBinding.radioGroup)
            optionsBinding.root
        }
        // render image for authenticator QR code
        ...
    }
}

```

This screenshots show the dynamic UI for selecting an authenticator.

<div class="common-image-format">

![The authentication selection picker](/img/authenticators/android-authenticators-google-choose-authenticator.png "Dynamic UI shows the list of choices for authenticator.")

</div>

### 5: Display the shared secret, QR Code, and request the code

After selecting the authenticator, the server sends an enrollment request in a remediation of type `ENROLL_AUTHENTICATOR`. Enrolling uses a secret key shared between Okta and Google Authenticator that's used to generate and verify the generated time-based one-time passcode (TOTP).

The remediation includes the shared secret as both a QR Code and as text. It also includes a form field to enter a Google Authenticator code after enrollment.

The `handleAuthenticatorEnrollOrChallenge()` can be reused here with some additional code as we will be building the UI dynamically. This also works for many different authenticators because the `form` property of the remediation contains the information required to build the UI:

```kotlin
private suspend fun handleAuthenticatorEnrollOrChallenge(remediation: IdxRemediation, skipRemediation: IdxRemediation?) {
    val fields = mutableListOf<IdxDynamicField>()
    // handle QR code images
    fields += remediation.asTotpImageDynamicAuthField()

    for (visibleField in remediation.form.visibleFields) {
        fields += visibleField.asIdxDynamicFields()
    }
    fields += remediation.asDynamicAuthFieldActions()
    if (skipRemediation != null) {
        fields += skipRemediation.asDynamicAuthFieldActions()
    }
    ...
}

// Extract text fields and radio groups from IdxRemediation.form.visibleFields
private fun IdxRemediation.Form.Field.asIdxDynamicFields(): List<IdxDynamicField> {
    return when (true) {
        // nested form inside a field
        form?.visibleFields?.isNullOrEmpty() == false -> {
            val result = mutableListOf<IdxDynamicField>()
            form?.visibleFields?.forEach {
                result += it.asIdxDynamicFields()
            }
            result
        }
        // options represent multiple choice items like authenticators and can be nested
        ...
        // simple text field
        type == "string" -> {
            val displayMessages = messages.joinToString(separator = "\n") { it.message }
            val field =
                IdxDynamicField.Text(label ?: "", isRequired, isSecret, displayMessages) {
                    value = it
                }
            (value as? String?)?.let {
                field.value = it
            }
            listOf(field)
        }
        else -> {
            emptyList()
        }
    }
}

// Extract a bitmap from IdxRemediation.authenticators
private suspend fun IdxRemediation.asTotpImageDynamicAuthField(): List<IdxDynamicField> {
    val authenticator =
        authenticators.firstOrNull { it.capabilities.get<IdxTotpCapability>() != null }
            ?: return emptyList()
    val field = authenticator.asTotpImageDynamicAuthField() ?: return emptyList()
    return listOf(field)
}

// Extract a bitmap from IdxAuthenticator
private suspend fun IdxAuthenticator.asTotpImageDynamicAuthField(): IdxDynamicField? {
    val capability = capabilities.get<IdxTotpCapability>() ?: return null
    val bitmap = withContext(Dispatchers.Default) {
        capability.asImage()
    } ?: return null
    val label = displayName?: "Launch Google Authenticator, tap the \"+\" icon, then select \"Scan a QR code\"."
    return IdxDynamicField.Image(label, bitmap, capability.sharedSecret)
}
```

The collection of authenticators related to the current request are in the `authenticators` property of the remediation. Each one is an instance of the `IdxAuthenticator` class which includes an identifier in the `key` property and a name for display in the UI in the `displayName` property.

Authenticators may include one or more capabilities that describe associated data and behaviors, such as the QR Code or the ability to send a code.

For the dynamic UI, the existing `IdxDynamicField.createView()` function can be updated to also render images and text fields.

```kotlin
private fun IdxDynamicField.createView(): View {
    return when (this) {
        // render text fields
        is IdxDynamicField.Text -> {
            val textBinding = binding.dynamicContainer.inflateBinding(FormTextBinding::inflate)
            textBinding.textInputLayout.hint = label

            if (isSecure) {
                // password or sensitive fields
            }
            val valueField = ::value
            textBinding.editText.setText(valueField.get())
            textBinding.editText.doOnTextChanged { text, _, _, _ ->
                valueField.set(text.toString())
            }

            errorsLiveData.observe(this@LoginActivity) { errorMessage ->
                textBinding.textInputLayout.error = errorMessage
            }

            textBinding.root
        }
        // render actions as buttons
        ...
        // render radio groups for authenticator selection
        ...
        // render image for authenticator QR code
        is IdxDynamicField.Image -> {
            val imageBinding =
                binding.dynamicContainer.inflateBinding(FormImageBinding::inflate)
            imageBinding.labelTextView.text = label
            imageBinding.imageView.setImageBitmap(bitmap)
            if (sharedSecret != null) {
                imageBinding.sharedSecretText.text = sharedSecret
            }
            imageBinding.root
        }
    }
}
```

The following screenshot shows the form displaying the shared secret used for enrollment in addition to the OTP entry field.

<div class="common-image-format">

![Display a QR Code and shared secret.](/img/authenticators/android-authenticators-google-enroll.png "An app displaying a form containing the QR Code, shared secret, code entry field, and continue button.")

</div>

There are three possible results after sending the code to the server:

- Sending the correct code signs the user in.
- Sending an incorrect code results in another `ENROLL_AUTHENTICATOR` response with a message indicating that the code doesn't match. The UI code handles that case by displaying a form that includes the message.
- An error, such as a disconnected server.

A successful sign-in sets `isLoginSuccessful` to `true`. Your code then requests a token from the server by calling `client.exchangeInteractionCodeForTokens()` as shown in the `handleResponse()` function earlier.
