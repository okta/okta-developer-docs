### 1. Capture device ID from your users

Capture the device ID from the user sign-in flow. When you use the Embedded SDK, it's your responsibility to generate and store these device ID values. These IDs are often UUIDs that take the following format: `123e4567-e89b-12d3-a456-426655440000` and are unique per device. These IDs must be unique per the user's device, or unpredictable behavior can result.

### 2. Pass device ID to the Okta SDK

Pass the device ID to the Okta SDK. Do this by calling the  `OktaAuth.setHeaders()` method and pass `X-Device-Token` as the header name with a user-defined value.

```javascript
authClient.setHeaders({'X-Device-Token': '123e4567-e89b-12d3-a456-426614174000'});
```

Call this method after instantiating `OktaAuth` as in the following example.

```javascript
authClient = new OktaAuth({
      ...oidc,
      state: transactionId,
      storageManager: {
        token: {
          storageProvider
        },
        transaction: {
          storageKey: `transaction-${transactionId}`, // unique storage per transaction
          storageProvider
        }
      },
      ...options
    });

authClient.setHeaders({'X-Device-Token': '123e4567-e89b-12d3-a456-426614174000'});
```
