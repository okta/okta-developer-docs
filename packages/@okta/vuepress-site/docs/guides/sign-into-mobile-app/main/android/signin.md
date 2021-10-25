First initialize the Okta OIDC SDK in the `Activity#onCreate` method of the Activity that you are using to sign users in to your app. For example:

```java
public class LoginActivity extends AppCompatActivity {
    OIDCConfig config = new OIDCConfig.Builder()
        .withResId(this, R.id.okta_oidc_config)
        .create();

    WebAuthClient client = new Okta.WebAuthBuilder()
        .withConfig(config)
        .withContext(this)
        .withStorage(new SharedPreferenceStorage(this))
        .withCallbackExecutor(Executors.newSingleThreadExecutor())
        .withTabColor(Color.BLUE)
        .supportedBrowsers("com.android.chrome", "org.mozilla.firefox")
        .create();

    final SessionClient sessionClient = client.getSessionClient();

    client.registerCallback(new ResultCallback<AuthorizationStatus, AuthorizationException>() {
        @Override
        public void onSuccess(@NonNull AuthorizationStatus status) {
            if (status == AuthorizationStatus.AUTHORIZED) {
                //client is authorized.
                Tokens tokens = sessionClient.getTokens();
            } else if (status == AuthorizationStatus.SIGNED_OUT) {
                //this only clears the browser session.
            }
        }

        @Override
        public void onCancel() {
            //authorization canceled
        }

        @Override
        public void onError(@NonNull String msg, AuthorizationException error) {
            //error encounted
        }
    }, this);
}
```

After the `WebAuthClient` instance is initialized, start the authorization flow by simply calling `signIn` whenever you're ready:

```java
client.signIn(this, null);
```
