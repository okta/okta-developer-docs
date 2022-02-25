To find information about the user, use the `getUserProfile()` method. The `UserInfo` object passed into the `onSuccess()` method contains information for the signed-in user.

Add the code below to `BrowserSignInActivity` to display a welcome message that includes the user's name:

```java
private void showUserInfo() {
  sessionClient.getUserProfile(new RequestCallback<>() {
    @Override
    public void onSuccess(@NonNull UserInfo result) {
      // handle UserInfo result.
      var user = (String) result.get("name");
      TextView textView =  findViewById(R.id.have_account);
      textView.setText(String.format("%s %s", getString(R.string.welcome_user), user));
    }

    @Override
    public void onError(String msg, AuthorizationException error) {
      logger.severe(String.format("Error: %s : %s", error.error, error.errorDescription));
    }
  });
}
```

You've already got code to update the UI with this information; see the `onSuccess()` method inside the `client.registerCallback`:

```java
if (status == AuthorizationStatus.AUTHORIZED) {
  …
  runOnUiThread(() -> {
    …
    showUserInfo();
  });

} else if (status == AuthorizationStatus.SIGNED_OUT) {
  …
  runOnUiThread(() -> {
    …
    TextView textView =  findViewById(R.id.have_account);
    textView.setText(getString(R.string.have_account));
  });
}
```
