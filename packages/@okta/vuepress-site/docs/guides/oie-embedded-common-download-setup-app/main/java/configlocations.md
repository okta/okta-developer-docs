There are several options to set the app's configuration:

1. Configure the `okta.yaml` file at the root of the app's classpath
2. Configure the `okta.yaml` file in the `.okta` folder from your home directory (for instance, `~/.okta/okta.yaml` or `%userprofile%\.okta\okta.yaml`)
3. Set environment variables
4. Configure Java system properties
5. Program the configuration explicitly in your app

Each increasing configuration option supersedes the previous configuration. For example, if you configure the `~/.okta/okta.yaml` file and set the environment variables with different configuration values, the environment variable values will override the `~/.okta/okta.yaml` configuration values when the app starts.

> **Note:** We recommend that you only use one configuration option to avoid confusion.

### Option 1 and 2: YAML configuration

Create a YAML file named `okta.yaml` in one of the following three directories:

* Current user's home directory.
  * **Unix/Linux**:    `~/.okta/okta.yaml`
  * **Windows**:       `%userprofile%\.okta\okta.yaml`

* Application or project's root directory

The following is the required content format for the YAML file:

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

YAML configuration file example:

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
    redirectUri: "http://localhost:8080"
```

Where

* `{authorizationServerId}=default` (the default Custom Authorization Server)
* `{yourOktaDomain}=dev-1234.okta.com`
* `{clientId}=123xyz`
* `{clientSecret}=123456abcxyz`
* `{redirectUri}=http://localhost:8080`

### Option 3: Environment variables

#### Embedded SDK sample app

Set the following environment variables with your app's configuration values before running the embedded SDK sample app:

* `OKTA_IDX_ISSUER`
* `OKTA_IDX_CLIENTID`
* `OKTA_IDX_CLIENTSECRET`
* `OKTA_IDX_REDIRECTURI`
* `OKTA_IDX_SCOPES`

The following is an example of setting environment variables for the embedded SDK sample app, in bash or zsh:

```bash
export OKTA_IDX_ISSUER=https://dev-1234.okta.com/oauth2/default
export OKTA_IDX_CLIENTID=123xyz
export OKTA_IDX_CLIENTSECRET=123456abcxyz
export OKTA_IDX_SCOPES="openid profile offline_access"
export OKTA_IDX_REDIRECTURI=http://localhost:8080
```

#### Embedded Sign-In Widget sample app

Set the following environment variables with your app's configuration values before running the embedded Sign-In Widget sample app:

* `OKTA_OAUTH2_ISSUER`
* `OKTA_OAUTH2_CLIENTID`
* `OKTA_OAUTH2_CLIENTSECRET`
* `OKTA_OAUTH2_REDIRECTURI`
* `OKTA_IDX_SCOPES`


### Option 4: Java system properties

#### Embedded SDK sample app

Use the following Java system properties when you run the embedded SDK sample app:

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
    -Dokta.idx.redirectUri=http://localhost:8080
```

#### Embedded Sign-In Widget sample app

Use the following Java system properties when you run the embedded Sign-In Widget sample app:

* `okta.oauth2.issuer`
* `okta.oauth2.clientId`
* `okta.oauth2.clientSecret`
* `okta.idx.scopes`
* `okta.oauth2.redirectUri`

### Option 5: Add configuration to the SDK's client constructor

> **Note:**  Maybe remove this section for Java? This should be an advanced topic and should not be spelled out for the novice???