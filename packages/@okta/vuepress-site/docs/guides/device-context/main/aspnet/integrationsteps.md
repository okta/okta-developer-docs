### 1. Create a device ID for each device

Create a device ID to identify each device. These IDs must be unique per device, or unpredictable behavior can result. For example, you can generate a UUID of the format `123e4567-e89b-12d3-a456-426655440000` in the following ways:

* In a Powershell window with the command `[guid]::NewGuid()`
* In C# with `Guid.NewGuid().ToString("N")`

When you use the Embedded SDK, it's your responsibility to generate and store these device ID values.

> **Note:**  The SDK expects the device ID to be exactly 32 characters long. UUIDs are 36 characters long including the hyphens.

### 2. Pass the device ID to the Okta SDK

Add the device ID to your application's [configuration](https://github.com/okta/okta-idx-dotnet#configuration-reference). Identify it as `deviceToken`. For example

```yaml
okta:
  idx:
    issuer: "{YOUR_ISSUER}"
    clientId: "{YOUR_CLIENT_ID}"
    clientSecret: "{YOUR_CLIENT_SECRET}"
    scopes:
      - "openid"
      - "profile"
    redirectUri: "{YOUR_REDIRECT_URI}"
    deviceToken: "123e4567e89b12d3a456426655440000"
```

If `clientSecret` is set, the SDK includes the device ID in a HTTP header named `X-Device-Token` in each call it makes to Okta.
