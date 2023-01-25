1. Create a class called `BrowserSignInApplication.kt` in `app/src/main/java/com/okta/android/samples/browser_sign_in/BrowserSignInApplication.kt`.

1. Replace the contents of the new file with the following code that initializes the SDK:

    ```kotlin
    class BrowserSignInApplication : Application() {
        override fun onCreate() {
            super.onCreate()
            // Initializes Auth Foundation and Credential Bootstrap classes.
            AuthFoundationDefaults.cache = SharedPreferencesCache.create(this)
            val oidcConfiguration = OidcConfiguration(
                clientId = BuildConfig.CLIENT_ID,
                defaultScope = "openid email profile offline_access",
            )
            val client = OidcClient.createFromDiscoveryUrl(
                oidcConfiguration,
                BuildConfig.DISCOVERY_URL.toHttpUrl(),
            )
            CredentialBootstrap.initialize(client.createCredentialDataSource(this))
        }
    }
    ```

1. Update `app/src/main/AndroidManifest.xml` to use the newly defined `Application` subclass:
    ```
    <?xml version="1.0" encoding="utf-8"?>
    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
        package="com.okta.android.samples.browser_sign_in">

        <application
            ...
            android:name=".BrowserSignInApplication"
            ...
            >
            ...
        </application>
    </manifest>
    ```

1. Add sign-in and sign-out buttons and a text view to the app's default layout file by adding the following code to `app/src/main/res/layout/activity_browser_sign_in.xml`:

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_margin="8dp"
        android:orientation="vertical"
        tools:context=".BrowserSignInActivity"
        >

            <TextView
                android:id="@+id/status_text_view"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="16dp"
                />

            <Button
                android:id="@+id/login_button"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="16dp"
                android:text="@string/login_button"
                />

            <Button
                android:id="@+id/logout_of_browser_button"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="16dp"
                android:backgroundTint="@android:color/holo_red_light"
                android:text="@string/logout_of_browser_button"
                />

            <ProgressBar
                android:layout_gravity="center"
                android:id="@+id/progress_bar"
                android:layout_width="50dp"
                android:layout_height="50dp"
                />
    </LinearLayout>
    ```

1. Add the following code to `app/src/main/res/values/strings.xml` to add the strings for the `text` values of the buttons:

    ```xml
    <resources>
        <string name="app_name">Browser sign in</string>
        <string name="login_button">Login</string>
        <string name="logout_of_browser_button">Logout of Browser</string>
        <string name="have_account">Have an account?</string>
        <string name="welcome_user">Welcome %1$s</string>
    </resources>
    ```

1. Create `BrowserSignInViewModel.kt` in `app/src/main/java/com/okta/android/samples/browser_sign_in/BrowserSignInViewModel.kt`:

    ```kotlin
    class BrowserSignInViewModel : ViewModel() {
        private val _state = MutableLiveData<BrowserState>(BrowserState.Loading)
        val state: LiveData<BrowserState> = _state

        init {
            viewModelScope.launch {
                _state.value = BrowserState.currentCredentialState()
            }
        }

        fun login(context: Context) {
            viewModelScope.launch {
                _state.value = BrowserState.Loading

                val result = CredentialBootstrap.oidcClient.createWebAuthenticationClient().login(
                    context = context,
                    redirectUrl = BuildConfig.SIGN_IN_REDIRECT_URI,
                )
                when (result) {
                    is OidcClientResult.Error -> {
                        Timber.e(result.exception, "Failed to login.")
                        _state.value = BrowserState.currentCredentialState("Failed to login.")
                    }
                    is OidcClientResult.Success -> {
                        val credential = CredentialBootstrap.defaultCredential()
                        credential.storeToken(token = result.result)
                        _state.value = BrowserState.LoggedIn.create()
                    }
                }
            }
        }

        fun logoutOfBrowser(context: Context) {
            viewModelScope.launch {
                _state.value = BrowserState.Loading

                val result = CredentialBootstrap.oidcClient.createWebAuthenticationClient().logoutOfBrowser(
                    context = context,
                    redirectUrl = BuildConfig.SIGN_OUT_REDIRECT_URI,
                    CredentialBootstrap.defaultCredential().token?.idToken ?: "",
                )
                when (result) {
                    is OidcClientResult.Error -> {
                        Timber.e(result.exception, "Failed to logout.")
                        _state.value = BrowserState.currentCredentialState("Failed to logout.")
                    }
                    is OidcClientResult.Success -> {
                        CredentialBootstrap.defaultCredential().delete()
                        _state.value = BrowserState.LoggedOut()
                    }
                }
            }
        }
    }

    /**
     * Represents the current state of the [BrowserSignInViewModel].
     */
    sealed class BrowserState {
        object Loading : BrowserState()
        class LoggedOut(val errorMessage: String? = null) : BrowserState()
        class LoggedIn private constructor(
            val name: String,
            val errorMessage: String?
        ) : BrowserState() {
            companion object {
                /**
                 * Creates the [LoggedIn] state using the [CredentialBootstrap.defaultCredential]s ID Token name claim.
                 */
                suspend fun create(errorMessage: String? = null): BrowserState {
                    val credential = CredentialBootstrap.defaultCredential()
                    val name = credential.idToken()?.name ?: ""
                    return LoggedIn(name, errorMessage)
                }
            }
        }

        companion object {
            /**
             * Creates the [BrowserState] given the [CredentialBootstrap.defaultCredential]s presence of a token.
             *
             * @return Either [LoggedIn] or [LoggedOut].
             */
            suspend fun currentCredentialState(errorMessage: String? = null): BrowserState {
                val credential = CredentialBootstrap.defaultCredential()
                return if (credential.token == null) {
                    LoggedOut(errorMessage)
                } else {
                    LoggedIn.create(errorMessage)
                }
            }
        }
    }
    ```

1. Add the following code that handles button clicks and browser state events to `app/src/main/java/com/okta/android/samples/browser_sign_in/BrowserSignInActivity.kt`:

    ```kotlin
    class BrowserSignInActivity : AppCompatActivity() {
        private val viewModel by viewModels<BrowserSignInViewModel>()

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_browser_sign_in)

            val progressBar = findViewById<View>(R.id.progress_bar)
            val statusTextView = findViewById<TextView>(R.id.status_text_view)
            val loginButton = findViewById<View>(R.id.login_button)
            val logoutOfBrowserButton = findViewById<View>(R.id.logout_of_browser_button)

            loginButton.setOnClickListener {
                viewModel.login(this)
            }
            logoutOfBrowserButton.setOnClickListener {
                viewModel.logoutOfBrowser(this)
            }

            /**
             * Update the user interface for changes in the sign-in flow.
             *
             * Use an observer to react to updates in [BrowserState]. Updates are asynchronous and are triggered both by user actions,
             * such as button clicks, and completing the flow.
             */
            viewModel.state.observe(this) { state ->
                when (state) {
                    is BrowserState.LoggedIn -> {
                        progressBar.visibility = View.GONE
                        loginButton.visibility = View.GONE
                        logoutOfBrowserButton.visibility= View.VISIBLE
                        statusTextView.visibility = View.VISIBLE
                        if (state.errorMessage == null) {
                            statusTextView.text = getString(R.string.welcome_user, state.name)
                        } else {
                            statusTextView.text = state.errorMessage
                        }
                    }
                    is BrowserState.LoggedOut -> {
                        progressBar.visibility = View.GONE
                        loginButton.visibility = View.VISIBLE
                        logoutOfBrowserButton.visibility= View.GONE
                        statusTextView.visibility = View.VISIBLE
                        if (state.errorMessage == null) {
                            statusTextView.text = getString(R.string.have_account)
                        } else {
                            statusTextView.text = state.errorMessage
                        }
                    }
                    BrowserState.Loading -> {
                        progressBar.visibility = View.VISIBLE
                        loginButton.visibility = View.GONE
                        logoutOfBrowserButton.visibility= View.GONE
                        statusTextView.visibility = View.GONE
                    }
                }
            }
        }
    }
    ```
