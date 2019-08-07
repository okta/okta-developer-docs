Override `onActivityResult` to get the results from the `Keyguard`.

```java
@Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_CODE_CREDENTIALS && resultCode == RESULT_OK) {
            if (keyguardEncryptionManager.getCipher() == null) {
                keyguardEncryptionManager.recreateCipher();
            }
        } else {
            webAuth.handleActivityResult(requestCode, resultCode, data);
        }
    }
```

After `RESULT_OK` is returned, the device is authenticated and `keyguardEncryptionManager` is able
to decrypt all of the encrypted data including the access and refresh tokens.
