Set up utility methods to use the `KeyguardManager` as a challenge for device authentication.

```java
private static final int REQUEST_CODE_CREDENTIALS = 1000;
...
...
private boolean isKeyguardSecure() {
    KeyguardManager keyguardManager =
        (KeyguardManager) getSystemService(Context.KEYGUARD_SERVICE);
    return keyguardManager.isKeyguardSecure();
}

private void showKeyguard() {
    KeyguardManager keyguardManager =
        (KeyguardManager) getSystemService(Context.KEYGUARD_SERVICE);
    Intent intent = null;
    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
        intent = keyguardManager.createConfirmDeviceCredentialIntent("Confirm credentials", "");
    }
    if (intent != null) {
        startActivityForResult(intent, REQUEST_CODE_CREDENTIALS);
    }
}
```

We require device authentication every time the user leaves the app, so put that check in `onResume`:

```java
@Override
protected void onResume() {
    super.onResume();
    if (webAuth.getSessionClient.isAuthenticated() &&
        !keyguardEncryptionManager.isUserAuthenticatedOnDevice()) {
            showKeyguard();
        }
    }
```
