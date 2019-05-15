First initialize the Okta OIDC SDK in the `Activity#onCreate` method of the Activity that you are using to sign users in to your app. For example:

```java
public class LoginActivity extends AppCompatActivity {
    private OIDCAccount account;
    private AuthenticateClient client;

    account = new OIDCAccount.Builder()
        .withResId(this, R.id.okta_oidc_config)
        .create();

    client = new AuthenticateClient.Builder()
        .withAccount(account)
        .withContext(this)
        .withStorage(new SimpleOktaStorage(this))
        .withTabColor(getColorCompat(R.color.colorPrimary))
        .create();
}
```

After the `AuthenticateClient` instance is initialized, start the authorization flow by simply calling `logIn` whenever you're ready:

```java
client.logIn(this, null);
```
