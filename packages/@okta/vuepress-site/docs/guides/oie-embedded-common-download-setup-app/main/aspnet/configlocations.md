You have several options for setting the configuration values in your app.

### Option 1: Create a YAML configuration file

Create a YAML file named `okta.yaml` in:

- A folder called `.okta` whose parent is the current user's home directory
  - On Mac/Linux, this is `~/.okta/okta.yaml`
  - On Windows, this is `%userprofile%\.okta\okta.yaml`
- The application's current working directory
  - If you're using the recommended IISExpress debugger in Visual Studio to run your app, this is `{IIS Express install location}\IIS Express`, for example, `C:\Program Files\IIS Express\okta.yaml`.

The information in the YAML file should be formatted as follows:

```yaml
okta:
  idx:
    issuer: "{YOUR_ISSUER}"
    clientId: "{YOUR_CLIENT_ID}"
    clientSecret: "{YOUR_CLIENT_SECRET}"
    scopes:
      - "openid"
      - "profile"
      - "offline_access"
    redirectUri: "{YOUR_REDIRECT_URI}"
```

### Option 2: Create a JSON configuration file

Create a JSON file named `appsettings.json` in:

- The application’s current working directory
  - If you're using the recommended IISExpress debugger in Visual Studio to run your app, this is `{IIS Express install location}\IIS Express`, for example, `C:\Program Files\IIS Express\appsettings.json`.

The information in the JSON file should be formatted as follows:

```json
{
    "okta": {
        "idx": {
            "issuer" : "{YOUR_ISSUER}",
            "clientId" : "{YOUR_CLIENT_ID}",
            "clientSecret": "{YOUR_CLIENT_SECRET}",
            "redirectUri": "{YOUR_REDIRECT_URI}",
            "scopes": [ "openid", "profile", "offline_access" ]
        }
    }
}
```

### Option 3: Set the values as environment variables

Set the following environment variables with the configuration values:

* `OKTA_IDX_ISSUER`
* `OKTA_IDX_CLIENTID`
* `OKTA_IDX_CLIENTSECRET`
* `OKTA_IDX_REDIRECTURI`

Environment variables hold only single values so you need to create one for each scope you need to give to your application.

```
OKTA_IDX_SCOPES_0 = "openid"
OKTA_IDX_SCOPES_1 = "profile"
OKTA_IDX_SCOPES_2 = "offline_access"
```

### Option 4: Add the values as parameters to the SDK's client constructor

Add the values as parameters to the constructor for the `IdxClient`.

```csharp
var client = new IdxClient(new IdxConfiguration()
{
    Issuer = "{YOUR_ISSUER}",
    ClientId = "{YOUR_CLIENT_ID}",
    ClientSecret = "{YOUR_CLIENT_SECRET}",
    RedirectUri = "{YOUR_REDIRECT_URI}",
    Scopes = new List<string> { "openid", "profile", "offline_access" }
});
```

> **Note:** The sample app uses dependency injection to instantiate the `IdxClient`,
so the constructor code is located in the `UnityConfig.cs` file.
