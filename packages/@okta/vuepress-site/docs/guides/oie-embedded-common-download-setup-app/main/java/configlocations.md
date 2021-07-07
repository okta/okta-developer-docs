There are several options to set the application's configuration:

1. Configure the `okta.yaml` file at the root of the application's classpath
2. Configure the `okta.yaml` file in the `.okta` folder from your home directory (for example, `~/.okta/okta.yaml` or `%userprofile%\.okta\okta.yaml`)
3. Set environment variables
4. Configure Java system properties
5. Program the configuration explicitly in your application

Each increasing configuration option supersedes the previous configuration. For example, if you configure the `~/.okta/okta.yaml` file and set environment variables with different configuration values, the values in the environment variables will override the configurations in the `~/.okta/okta.yaml` file.

### Option 1 and 2: YAML configuration

Create a YAML file named `okta.yaml` in one of the following three directories:

* Current user's home directory.
  * **Unix/Linux**:    `~/.okta/okta.yaml`
  * **Windows**:       `%userprofile%\.okta\okta.yaml`

* Application or project's root directory

Below is the required content format for the YAML file:

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
    redirectUri: "http://localhost:8080/login"
```

Where you are using the default Custom Authorization Server and

* `{yourOktaDomain}=dev-1234.okta.com`
* `{clientId}=123xyz`
* `{clientSecret}=123456abcxyz`
* `{redirectUri}=http://localhost:8080/login`

### Option 3: Environment variables

Add the configuration values as environment variables with the following naming convention:

* `OKTA_IDX_ISSUER`
* `OKTA_IDX_CLIENTID`
* `OKTA_IDX_CLIENTSECRET`
* `OKTA_IDX_REDIRECTURI`
* `OKTA_IDX_SCOPES`

Here is an example of setting `OKTA_IDX_ISSUER` in bash or zsh:

```bash
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

```bash
mvn -Dokta.idx.issuer=https://dev-1234.okta.com/oauth2/default \
    -Dokta.idx.clientId=123xyz \
    -Dokta.idx.clientSecret=123456abcxyz \
    -Dokta.idx.scopes="openid profile offline_access" \
    -Dokta.idx.redirectUri=http://localhost:8080/login
```

### Option 5: Add configuration to the SDK's client constructor

> **Note:**  Maybe remove this section for Java? This should be an advanced topic and should not be spelled out for the novice.