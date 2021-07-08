You have several options for setting the configuration values:

### Option 1: Configuration file

Create a dotenv file named `testenv` (no extension) in the root level of the sample project.

The file format is shown below:

```yaml
ISSUER=https://oie-9102348.oktapreview.com/oauth2/default
CLIENT_ID=0oazcjm779c5MPY0O1d6
CLIENT_SECRET=hCBX_o3OFZMMZMOUzmXb3kHBJd-_Q4IcxIT
```

### Option 2: Environment variables

> **Note:** Environment variables are currently not supported.

Add the values as environment variables with the following naming convention:

* `OKTA_IDX_ISSUER`
* `OKTA_IDX_CLIENTID`
* `OKTA_IDX_CLIENTSECRET`
* `OKTA_IDX_REDIRECTURI`
* `OKTA_IDX_SCOPES`

### Option 3: Add parameter to the SDK's client constructor

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
