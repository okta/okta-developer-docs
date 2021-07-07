There are several options to set the application's configuration:

1. Configure the `okta.yaml` file at the root of the application's classpath
2. Configure the `okta.yaml` file in the `.okta` folder from your home directory (for example, `~/.okta/okta.yaml` or `%userprofile%\.okta\okta.yaml`)
3. Set environment variables
4. Configure Java system properties
5. Program the configuration explicitly in your application

Each increasing configuration step supersedes the previous configuration. For example, if you configure the `~/.okta/okta.yaml` file and set environment variables with different configuration values, the values in the environment variables will override the configurations in the `~/.okta/okta.yaml` file.

### Option 1 and 2: YAML configuration

Create a YAML file named `okta.yaml` in one of the following three directories:

* Current user's home directory.
  * **Unix/Linux**:    `~/.okta/okta.yaml`
  * **Windows**:       `%userprofile%\.okta\okta.yaml`

* Application or project's root directory

The file format is shown below:

```yaml
okta:
  idx:
    issuer: "https://{yourOktaDomain}/oauth2/{authorizationServerId}"
    clientId: "{clientId}"
    clientSecret: "{clientSecret}"
    scopes:
    - "{scope1}"
    - "{scope2}"
    redirectUri: "{redirectUri}"
```

Here is an example of a YAML configuration file:

```yaml
okta:
  idx:
    issuer: "https://dev-1234.okta.com/oauth2/default"
    clientId: "123xyz"
    clientSecret: "123456abcxyz"
    scopes:
    - "openid"
    - "profile"
    - "offline_access"
    redirectUri: "https://loginredirect.com"
```

Where you are using the default Custom Authorization Server and

* `{yourOktaDomain}=dev-1234.okta.com`
* `{clientId}=123xyz`
* `{clientSecret}=123456abcxyz`
* `{redirectUri}=https://loginredirect.com`

### Option 3: Environment variables

Add the configuration values as environment variables with the following naming convention:

* `OKTA_IDX_ISSUER`
* `OKTA_IDX_CLIENTID`
* `OKTA_IDX_CLIENTSECRET`
* `OKTA_IDX_REDIRECTURI`
* `OKTA_IDX_SCOPES`

For example, in bash or zsh, set `OKTA_IDX_ISSUER`:

```zsh
export OKTA_IDX_ISSUER=https://dev-1234.okta.com/oauth2/default
```

### Option 4: Java system properties

Use the following configuration values, written in 'dot' notation, as Java system properties:

* `okta.idx.issuer`
* `okta.idx.clientId`
* `okta.idx.clientSecret`
* `okta.idx.scopes`
* `okta.idx.redirectUri`

For example:

```zsh
mvn -Dokta.idx.issuer=https://dev-1234.okta.com/oauth2/default \
    -Dokta.idx.clientId=123xyz \
    -Dokta.idx.clientSecret=123456abcxyz \
    -Dokta.idx.scopes="openid profile offline_access" \
    -Dokta.idx.redirectUri=https://loginredirect.com
```

### Option 5: Add configuration to the SDK's client constructor

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

> **Note:** NOT SURE IF THIS APPLIES to JAVA! Maybe remove this section???
