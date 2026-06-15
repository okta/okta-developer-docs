Use a `ViewModel` with Jetpack Compose to keep your UI clean and testable.

#### Understand the UI architecture

Before diving into code, understand the components that you build and how they work together:

`LoginViewModel`: The bridge between UI and business logic

The `LoginViewModel` acts as an intermediary layer between your composables and the `AuthService`. This separation provides several benefits:

* **UI state management**: The view model holds UI-specific state (like the username, password, and error message) and exposes it as `StateFlow`s that your composables collect.
* **Action coordination**: It translates user actions (button taps) into service calls inside `viewModelScope`, handling coroutine lifecycle for you.
* **Testability**: You can test view logic independently by injecting a fake `AuthServicing`.

`LoginScreen`: The main authentication interface

The `LoginScreen` is your app's primary authentication screen. It recomposes based on the authentication state that's collected from the view model:

* **Login form** (`NotAuthenticated` or `Error`): Username and password fields with a sign-in button.
* **Loading state** (`Authenticating`): A progress indicator while credentials are verified.
* **Authenticated view** (`Authenticated`): Token preview, action buttons, and navigation to other screens.

#### Create the view model

Create a package named `ui` and add `LoginViewModel.kt`:

```kotlin
package com.okta.android.passwordauth.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.okta.android.passwordauth.auth.AuthService
import com.okta.android.passwordauth.auth.AuthServicing
import com.okta.android.passwordauth.auth.AuthState
import com.okta.authfoundation.client.dto.OidcUserInfo
import com.okta.authfoundation.credential.Credential
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class LoginViewModel(
    private val authService: AuthServicing = AuthService(),
) : ViewModel() {

    val authState: StateFlow<AuthState> = authService.authenticationState

    private val _username = MutableStateFlow("")
    val username: StateFlow<String> = _username.asStateFlow()

    private val _password = MutableStateFlow("")
    val password: StateFlow<String> = _password.asStateFlow()

    private val _errorMessage = MutableStateFlow<String?>(null)
    val errorMessage: StateFlow<String?> = _errorMessage.asStateFlow()

    init {
        // Restore an existing session when the app starts.
        viewModelScope.launch { authService.restoreSession() }
    }

    fun onUsernameChange(value: String) { _username.value = value }
    fun onPasswordChange(value: String) { _password.value = value }

    fun login() {
        viewModelScope.launch {
            _errorMessage.value = null
            authService.authenticate(_username.value, _password.value)
            val state = authService.authenticationState.value
            if (state is AuthState.Error) _errorMessage.value = state.message
            if (state is AuthState.Authenticated) _password.value = ""
        }
    }

    fun logout() {
        viewModelScope.launch {
            authService.logout()
            _username.value = ""
            _password.value = ""
            _errorMessage.value = null
        }
    }

    fun refreshToken() {
        viewModelScope.launch { authService.refreshAccessToken() }
    }

    suspend fun fetchUserProfile(): OidcUserInfo? = authService.getCurrentUser()

    suspend fun currentAccessToken(): String =
        authService.currentAccessToken() ?: "No token"

    suspend fun tokenDetails(): Map<String, String> {
        val token = Credential.getDefaultAsync()?.token ?: return emptyMap()
        return buildMap {
            put("Token type", token.tokenType)
            put("Access token", token.accessToken)
            token.scope?.let { put("Scopes", it) }
            token.idToken?.let { put("ID token", it) }
            token.refreshToken?.let { put("Refresh token", it) }
            put("Expires in", "${token.expiresIn} seconds")
        }
    }
}
```

#### Create the login screen

Replace the contents of your `MainActivity`'s composable (or create `LoginScreen.kt` in the `ui` package) with the following code:

```kotlin
package com.okta.android.passwordauth.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.okta.android.passwordauth.auth.AuthState

@Composable
fun LoginScreen(viewModel: LoginViewModel = viewModel()) {
    val authState by viewModel.authState.collectAsState()

    when (authState) {
        is AuthState.Authenticated -> AuthenticatedView(viewModel)
        AuthState.Authenticating -> LoadingView()
        else -> LoginForm(viewModel)
    }
}

@Composable
private fun LoginForm(viewModel: LoginViewModel) {
    val username by viewModel.username.collectAsState()
    val password by viewModel.password.collectAsState()
    val errorMessage by viewModel.errorMessage.collectAsState()
    val canSubmit = username.isNotEmpty() && password.isNotEmpty()

    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text("Welcome back", style = MaterialTheme.typography.headlineMedium)
        Text("Sign in with your Okta credentials", style = MaterialTheme.typography.bodyMedium)

        OutlinedTextField(
            value = username,
            onValueChange = viewModel::onUsernameChange,
            label = { Text("Email or username") },
            singleLine = true,
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
            modifier = Modifier.fillMaxWidth()
        )

        OutlinedTextField(
            value = password,
            onValueChange = viewModel::onPasswordChange,
            label = { Text("Password") },
            singleLine = true,
            visualTransformation = PasswordVisualTransformation(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
            modifier = Modifier.fillMaxWidth()
        )

        Button(
            onClick = viewModel::login,
            enabled = canSubmit,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Sign In")
        }

        errorMessage?.let {
            Text(it, color = MaterialTheme.colorScheme.error)
        }
    }
}

@Composable
private fun LoadingView() {
    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            CircularProgressIndicator()
            Spacer(Modifier.height(16.dp))
            Text("Signing in...")
        }
    }
}

@Composable
private fun AuthenticatedView(viewModel: LoginViewModel) {
    var showProfile by remember { mutableStateOf(false) }
    var showTokens by remember { mutableStateOf(false) }
    var token by remember { mutableStateOf("") }

    LaunchedEffect(Unit) { token = viewModel.currentAccessToken() }

    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text("Successfully authenticated", style = MaterialTheme.typography.headlineSmall)
        Text("Access token", style = MaterialTheme.typography.labelMedium)
        Text(token, style = MaterialTheme.typography.bodySmall, maxLines = 4)

        Button(onClick = { showProfile = true }, modifier = Modifier.fillMaxWidth()) {
            Text("View Profile")
        }
        Button(onClick = { showTokens = true }, modifier = Modifier.fillMaxWidth()) {
            Text("Token Details")
        }
        Button(onClick = viewModel::refreshToken, modifier = Modifier.fillMaxWidth()) {
            Text("Refresh Token")
        }
        Button(onClick = viewModel::logout, modifier = Modifier.fillMaxWidth()) {
            Text("Sign Out")
        }
    }

    if (showProfile) ProfileDialog(viewModel) { showProfile = false }
    if (showTokens) TokenDetailsDialog(viewModel) { showTokens = false }
}
```

#### Create the supporting screens

`ProfileDialog` displays the signed-in user's profile, and `TokenDetailsDialog` inspects the issued tokens. Add both to `LoginScreen.kt`:

```kotlin
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import com.okta.authfoundation.claims.email
import com.okta.authfoundation.claims.name
import com.okta.authfoundation.claims.preferredUsername
import com.okta.authfoundation.claims.subject

@Composable
private fun ProfileDialog(viewModel: LoginViewModel, onDismiss: () -> Unit) {
    var profile by remember { mutableStateOf<Map<String, String>?>(null) }

    LaunchedEffect(Unit) {
        val userInfo = viewModel.fetchUserProfile()
        profile = if (userInfo == null) {
            emptyMap()
        } else {
            mapOf(
                "Name" to (userInfo.name ?: "Not provided"),
                "Email" to (userInfo.email ?: "Not provided"),
                "Username" to (userInfo.preferredUsername ?: "Not provided"),
                "User ID" to (userInfo.subject ?: "Unknown")
            )
        }
    }

    AlertDialog(
        onDismissRequest = onDismiss,
        confirmButton = { TextButton(onClick = onDismiss) { Text("Done") } },
        title = { Text("Profile") },
        text = {
            when (val current = profile) {
                null -> CircularProgressIndicator()
                else -> Column {
                    current.forEach { (label, value) ->
                        Text(label, style = MaterialTheme.typography.labelSmall)
                        Text(value, style = MaterialTheme.typography.bodyMedium)
                        Spacer(Modifier.height(8.dp))
                    }
                }
            }
        }
    )
}

@Composable
private fun TokenDetailsDialog(viewModel: LoginViewModel, onDismiss: () -> Unit) {
    var details by remember { mutableStateOf<Map<String, String>>(emptyMap()) }

    LaunchedEffect(Unit) { details = viewModel.tokenDetails() }

    AlertDialog(
        onDismissRequest = onDismiss,
        confirmButton = { TextButton(onClick = onDismiss) { Text("Done") } },
        title = { Text("Token Details") },
        text = {
            Column(modifier = Modifier.verticalScroll(rememberScrollState())) {
                details.forEach { (label, value) ->
                    Text(label, style = MaterialTheme.typography.labelMedium)
                    Text(value, style = MaterialTheme.typography.bodySmall)
                    Spacer(Modifier.height(8.dp))
                }
            }
        }
    )
}
```

Finally, show the `LoginScreen` from your `MainActivity`:

```kotlin
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.okta.android.passwordauth.ui.LoginScreen

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                LoginScreen()
            }
        }
    }
}
```
