Add the following code to your app to send the `X-Device-Token` header with a device ID attached.

### Create a device ID

Generate a unique identifier for the device with a maximum length of 32 characters. Some operating systems include an API to generate an application-specific device ID. Other ways to generate the ID include using a UUID or GUID directly or as a source for a hash, or for an encrypted string using a public key.

> **Warning**: Each device must have a unique ID or unknown results may occur.

### Add the device ID to the header

Add the device ID to the `X-Device-Token` request header in the constructor of the OktaAuth IDX client class. Do this by calling the `OktaAuth.setHeaders()` method and pass `X-Device-Token` as the header name with a user-defined value.

```javascript
authClient.setHeaders({'X-Device-Token': '${yourDeviceID}'});
```
