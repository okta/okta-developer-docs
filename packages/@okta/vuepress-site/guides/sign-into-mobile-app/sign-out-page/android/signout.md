If the user is signed in using the browser-initiated authorization flow, then logging out is a two or three step process depending on whether you also revoke the tokens.

1. Clear the browser session.
2. Revoke the tokens (optional).
3. Clear the app session (stored tokens) in device memory.

### Clear Browser Session

This step assumes that you are already signed in and have a `WebAuthClient`. You can clear the browser session by calling `signOutOfOkta()`.

```java
    client.signOutOfOkta(this);
```

This clears only the current browser session. It doesn't remove or revoke the cached tokens stored on the device.
Until the tokens are removed or revoked, the user can still access data from the resource server.

### Revoke Tokens (optional)

Tokens are still active (unless expired) even if you have cleared the browser session. An optional step is to revoke the tokens to make them inactive. You can revoke tokens using the following request:

```java
try {
    Tokens token = client.getSessionClient.getTokens();
    client.getSessionClient().revokeToken(token.getRefreshToken(),
        new RequestCallback<Boolean, AuthorizationException>() {
            @Override
            public void onSuccess(@NonNull Boolean result) {
                //handle result
            }
            @Override
            public void onError(String error, AuthorizationException exception) {
                //handle request error
            }
        });
} catch (AuthorizationException e) {
    //handle error
}
```

**Note:** Access, refresh, and ID tokens need to be revoked in separate requests.

### Clear Tokens From the Device

You can clear tokens from the device by simply calling:

```java
    client.getSessionClient().clear();
```

After this, the user is logged out.