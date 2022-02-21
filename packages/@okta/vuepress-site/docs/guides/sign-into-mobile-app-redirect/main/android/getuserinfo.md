To find information about the user, use the `getUserProfile()` method. The `UserInfo` object passed into the `onSuccess()` method contains information for the signed-in user.

1. Add the code below to `BrowserSignInActivity` to display a welcome message that includes the users' name:

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

2. To update the User Interface, add the following code to your `onSuccess()` method inside the `client.registerCallback`:

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
