First initialize the Okta OIDC SDK in the `Activity#onCreate` method of the Activity that you are using to sign users in to your app. In this example, we call it LoginActivity:

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

After the `AuthenticateClient` instance is initialized, you can start the authorization flow by simply calling `logIn` whenever you're ready:

```java
client.logIn(this, null);
```

If you need to add extra request parameters to the [authorize](https://developer.okta.com/docs/reference/api/oidc/#authorize) endpoint, you can use `AuthenticationPayload`:

```java
AuthenticationPayload payload = new AuthenticationPayload.Builder()
    .setLoginHint("youraccount@okta.com")
    .addParameter("max_age", "5000")
    .build();

client.logIn(this, payload);
```
