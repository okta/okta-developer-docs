First create an encryption manager and set it in the `WebAuthBuilder` like the following:

```java
private GuardedEncryptionManager keyguardEncryptionManager = new GuardedEncryptionManager(this, Integer.MAX_VALUE);
...
...
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    config = new OIDCConfig.Builder()
        .clientId("{yourClientId}")
        .redirectUri("{redirectUri}")
        .endSessionRedirectUri("endSessionUri")
        .scopes("openid", "profile", "offline_access")
        .discoveryUri("{discoveryUri}")
        .create();

    webAuth = new Okta.WebAuthBuilder()
        .withConfig(config)
        .withContext(getApplicationContext())
        .withEncryptionManager(keyguardEncryptionManager)
        .create();
        }
}
```

This sets up the client to require that the device be authenticated in order to use the private key.
