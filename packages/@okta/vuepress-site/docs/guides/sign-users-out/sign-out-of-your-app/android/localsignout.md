Clear the user's tokens by calling:

```java
client.getSessionClient().clear();
```

#### Revoke tokens (optional)

Calling `clear()` discards tokens from local device storage, but they are technically still active until they expire. An optional step is to revoke the tokens so they can't be used, even by accident. You can revoke tokens using the following request:

```java
client.getSessionClient().revokeToken(client.getTokens().getRefreshToken(),
    new RequestCallback<Boolean, AuthorizationException>() {
        @Override
        public void onSuccess(@NonNull Boolean result) {
            // Token was revoked
        }
        @Override
        public void onError(String error, AuthorizationException exception) {
            // An error occurred
        }
    });
```

Access and refresh tokens need to be revoked in separate requests.