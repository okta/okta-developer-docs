You have several options for setting the configuration values in your app.

### Option 1: Create a configuration file

Create a YAML file named `okta.yaml` in one of the following directories:

* Current user's home directory
  * **Unix/Linux**:    `~/.okta/okta.yaml`
  * **Windows**:       `%userprofile%\.okta\okta.yaml`

* Application or project's root directory

> **Note:** If you're using the recommended **IISExpress** debugger in Visual Studio to run your app, the `okta.yaml` file needs to be in the following location: `{IIS Express install location}\IIS Express`, for example, `C:\Program Files (x86)\IIS Express\okta.yaml`.

The following is the required content format for the YAML file:

```yaml
okta:
  idx:
    issuer: "https://{yourOktaDomain}/oauth2/default"
    clientId: "{clientId}"
    clientSecret: "{clientSecret}"
    scopes:
      - "{scope1}"
      - "{scope2}"
    redirectUri: "{redirectUri}"
```

### Option 2: Set the values as environment variables

Set the following environment variables with the configuration values:

* `OKTA_IDX_ISSUER`
* `OKTA_IDX_CLIENTID`
* `OKTA_IDX_CLIENTSECRET`
* `OKTA_IDX_REDIRECTURI`
* `OKTA_IDX_SCOPES`

### Option 3: Add the values as parameters to the SDK's client constructor

Add the values as parameters to the constructor for the `IdxClient`.

```csharp
 var client = new IdxClient(new IdxConfiguration()
           {
               Issuer = "{YOUR_ISSUER}",
               ClientId = "{YOUR_CLIENT_ID}",
               ClientSecret = "{YOUR_CLIENT_SECRET}",
               RedirectUri = "{YOUR_REDIRECT_URI}",
               Scopes = new List<string>{"openid","profile", "offline_access"}
           });
```

> **Note:** The sample app uses dependency injection to instantiate the `IdxClient`,
so the constructor code is located in the `UnityConfig.cs` file.
