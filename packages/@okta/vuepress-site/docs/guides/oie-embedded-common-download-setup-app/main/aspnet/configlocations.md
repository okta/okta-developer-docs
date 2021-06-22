There are several options you have to set the configuration values. They are:

### Option 1: Configuration file

Create a YAML file named `okta.yaml` in one of the following three available directories:

* Current user’s home directory.
  * **Unix/Linux**:    `~/.okta/okta.yaml`
  * **Windows**:       `%userprofile%\.okta\okta.yaml`

* Application or project’s root directory

> **Note:** If you're using the **IISExpress** debugger (recommended) in Visual Studio
to run your app, the location of the `okta.yaml` file needs to be in the
following location: `{IIS Express install location}\IIS Express`
(for example, `C:\Program Files (x86)\IIS Express\okta.yaml`)

The file format is shown below:

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

### Option 2: Environment variables

> **Note:** Environment variables are currently not yet supported.

Add the values as environment variables with the following naming convention:

* `OKTA_IDX_ISSUER`
* `OKTA_IDX_CLIENTID`
* `OKTA_IDX_CLIENTSECRET`
* `OKTA_IDX_REDIRECTURI`
* `OKTA_IDX_SCOPES`

### Option 3: Add parameter to the SDK’s client constructor

Add the values as parameters to `IdxClient’s` constructor.

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

Note that the sample app uses dependency injection to instantiate the `IdxClient`
so the constructor code is located int he `UnityConfig.cs` file.
