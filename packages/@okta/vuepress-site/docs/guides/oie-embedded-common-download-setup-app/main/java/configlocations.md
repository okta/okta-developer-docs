There are several options to set the sample app's configuration.

### Option 1: YAML configuration

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
* `openid`, `profile`, and `offline_access` scopes are used for the sample app

### Option 2: Environment variables

#### Embedded authentication with SDK sample app

Set the following environment variables with your app's configuration values before running the embedded authentication with SDK sample app:

* `OKTA_IDX_ISSUER`
* `OKTA_IDX_CLIENTID`
* `OKTA_IDX_CLIENTSECRET`
* `OKTA_IDX_REDIRECTURI`
* `OKTA_IDX_SCOPES`

The following is an example of setting environment variables for the embedded authentication with SDK sample app, in bash or zsh:

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

### Option 3: Java system properties

#### Embedded authentication with SDK sample app

Use the following Java system properties when you run the embedded authentication with SDK sample app:

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

### Option 4: Add configuration to the SDK's client constructor

Add the configuration values as parameters to the constructor for `IDXAuthenticationWrapper`:

```java
public IDXAuthenticationWrapper(String issuer, String clientId, String clientSecret,
                                    Set<String> scopes, String redirectUri) {
        this.client = Clients.builder()
                .setIssuer(issuer)
                .setClientId(clientId)
                .setClientSecret(clientSecret)
                .setScopes(scopes)
                .setRedirectUri(redirectUri)
                .build();
    }
```

> **Note:** The sample app uses Java system properties to instantiate the `IDXAuthenticationWrapper`.
