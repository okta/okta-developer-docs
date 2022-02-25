1. Rename the default layout file for the app to `app/src/main/res/layout/activity_browser_sign_in.xml`:

2. Add a sign-in button, sign-out button, and a text view by updating the existing `TextView` tag to the following:

```xml
<androidx.constraintlayout.widget.ConstraintLayout
  android:id="@+id/auth_container"
  android:layout_width="0dp"
  android:layout_height="wrap_content"
  android:layout_marginStart="8dp"
  android:layout_marginTop="8dp"
  android:layout_marginEnd="8dp"
  android:visibility="visible"
  app:layout_constraintEnd_toEndOf="parent"
  app:layout_constraintStart_toStartOf="parent"
  app:layout_constraintTop_toTopOf="parent">

  <Button
    android:id="@+id/browser_sign_in_btn"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginStart="8dp"
    android:layout_marginTop="16dp"
    android:layout_marginEnd="8dp"
    android:text="@string/sign_in_btn"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintHorizontal_bias="0.0"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toBottomOf="@+id/have_account" />

  <Button
    android:id="@+id/logout_btn"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginStart="8dp"
    android:layout_marginTop="16dp"
    android:layout_marginEnd="8dp"
    android:text="@string/sign_out_btn"
    android:backgroundTint="@android:color/holo_red_light"
    android:visibility="gone"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintHorizontal_bias="0.0"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toBottomOf="@+id/have_account" />

  <TextView
    android:id="@+id/have_account"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:layout_marginStart="8dp"
    android:layout_marginTop="32dp"
    android:layout_marginEnd="8dp"
    android:text="@string/have_account"
    android:textAlignment="center"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintHorizontal_bias="0.53"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent"
    tools:text="@string/have_account" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

3. Fill in strings for the `text` values referenced above, in `app/src/main/res/values/strings.xml`:

```xml
<resources>
    <string name="app_name">Browser sign in</string>
    <string name="sign_in_btn">Sign in</string>
    <string name="sign_out_btn">Sign out</string>
    <string name="have_account">Have an account?</string>
    <string name="welcome_user">Welcome </string>
</resources>
```

4. Update the contents of `app/src/main/java/com/okta/android/samples/browser_sign_in/service/AuthClient.java` to initialize the client:

```java
public class AuthClient {
  private final static String FIRE_FOX = "org.mozilla.firefox";
  private final static String CHROME_BROWSER = "com.android.chrome";

  private static AuthClient INSTANCE = null;
  private static volatile WebAuthClient webAuthClient;

  private AuthClient(Context context) {
    var config = new OIDCConfig.Builder()
      .withJsonFile(context, R.raw.okta_oidc_config)
      .create();

    webAuthClient = new Okta.WebAuthBuilder()
      .withConfig(config)
      .withContext(context)
      .withStorage(new SharedPreferenceStorage(context))
      .withCallbackExecutor(Executors.newSingleThreadExecutor())
      .withTabColor(Color.BLUE)
      .supportedBrowsers(CHROME_BROWSER, FIRE_FOX)
      //.setRequireHardwareBackedKeyStore(false) // required for emulators
      .create();
    }

  public static WebAuthClient getWebAuthClient(Context context) {
    if (INSTANCE == null) {
      INSTANCE = new AuthClient(context);
    }
    return webAuthClient;
  }
}
```

5. Create a new file called `app/src/main/java/com/okta/android/samples/browser_sign_in/BrowserSignInActivity.java` to handle client callbacks and button clicks.

6. Give the class the following content:

```java
public class BrowserSignInActivity extends AppCompatActivity {
  private static final Logger logger = Logger.getLogger("BrowserSignInActivity");
  private WebAuthClient client;
  private SessionClient sessionClient;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_browser_sign_in);

    findViewById(R.id.browser_sign_in_btn).setOnClickListener(v -> client.signIn(this, null));
    findViewById(R.id.logout_btn).setOnClickListener(v -> client.signOutOfOkta(this));

    client = AuthClient.getWebAuthClient(this);
    sessionClient = client.getSessionClient();

    client.registerCallback(new ResultCallback<>() {
      @Override
      public void onSuccess(@NonNull AuthorizationStatus status) {
        if (status == AuthorizationStatus.AUTHORIZED) {
          // client is authorized.
          logger.info("Auth success");
          runOnUiThread(() -> {
            findViewById(R.id.browser_sign_in_btn).setVisibility(View.GONE);
            findViewById(R.id.logout_btn).setVisibility(View.VISIBLE);
          });
        } else if (status == AuthorizationStatus.SIGNED_OUT) {
          // this only clears the browser session.
          logger.info("Sign out success");
          runOnUiThread(() -> {
            findViewById(R.id.browser_sign_in_btn).setVisibility(View.VISIBLE);
            findViewById(R.id.logout_btn).setVisibility(View.GONE);
          });
        }
      }

      @Override
      public void onCancel() {
        // authorization canceled
        logger.info("Auth cancelled");
      }

      @Override
      public void onError(String msg, AuthorizationException error) {
        logger.severe(String.format("Error: %s : %s", error.error, error.errorDescription));
      }
    }, this);
  }
}
```

In the code above, the authentication flow is triggered from the sign-in button by assigning an on-click listener to `browser_sign_in_btn` that calls the `signIn()` method of the Okta SDK `client`. The result of the authentication is handled by the callback registered above in the call to `client.registerCallback`. You could also call `client.signIn(this, null)` from anywhere else in the code to trigger the authentication flow. For example, when visiting a protected route.

#### Using an emulator

To run your app on an Android virtual device (emulator) during development:

1. Set the requirement for a hardware-backed key store to false by calling `setRequireHardwareBackedKeyStore(false)` while creating the `Okta.WebAuthBuilder()` instance inside `AuthClient.java` (not required for real devices). The code you added earlier contains a commented-out copy of the line you need, so you can uncomment it if required.

2. Install a supported browser APK, such as the [Firefox APK](https://github.com/mozilla-mobile/fenix/releases) using the [Android Debug Bridge (ADB)](https://developer.android.com/studio/command-line/adb).

To run your app on a physical Android device during development, see [the Android Studio documentation](https://developer.android.com/studio/run/device).
