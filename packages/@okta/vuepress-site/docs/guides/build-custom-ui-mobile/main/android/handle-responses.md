### Response handling

Once you have a username and password, you can pass it to the `authenticationClient`. It requires a `AuthenticationStateHandlerAdapter` to handle the response:

```java
try {
    authenticationClient.authenticate(username, password.toCharArray(),null, new AuthenticationStateHandlerAdapter() {
        @Override
        public void handleUnknown(AuthenticationResponse authenticationResponse) {
            //Handle response
        }

        @Override
        public void handleLockedOut(AuthenticationResponse lockedOut) {
            //Handle response
        }

        @Override
        public void handleSuccess(AuthenticationResponse successResponse) {
            sessionToken = successResponse.getSessionToken();
        }
    } catch (AuthenticationException e) {
        //Handle exception
    }
}
```

### Success status handling

Once you have the `sessionToken`, you can exchange it for tokens:

```java
client.signIn(sessionToken, null,new RequestCallback<Result, AuthorizationException>() {
    @Override
    public void onSuccess(@NonNull Result result) {
        try {
            //sessionClient instance is now authorized.
            Tokens tokens = sessionClient.getTokens();
        } catch (AuthorizationException e) {
            //Handle error
        }
    }

    @Override
    public void onError(String error, AuthorizationException exception) {
        //Handle error
    }
});
```