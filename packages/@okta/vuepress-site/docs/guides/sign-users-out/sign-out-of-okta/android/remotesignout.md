### Clear the Okta session

Clear the Okta session in the browser by calling the method
`signOutOfOkta` in the `WebAuth` object. For example:

```java
OIDCConfig config = new OIDCConfig.Builder()
    .withJsonFile(this, R.raw.okta_oidc_config)
    .create();

WebAuth client = new Okta.WebAuthBuilder()
        .withConfig(config)
        .withContext(this)
        .create();

client.signOutOfOkta(this);
```

This opens the browser and clears the session, but doesn't remove or revoke the tokens in the application. Your user can still access data from the resource server. If you want to remove the tokens from the application:

```java
client.getSessionClient().clear();
```
