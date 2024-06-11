There are several options to set the sample app's configuration:

* [Option 1: Create a YAML file](#option-1-create-a-yaml-file)
* [Option 2: Set environment variables](#option-2-set-environment-variables)
* [Option 3: Use Java system properties](#option-3-use-java-system-properties)
* [Option 4: Add the values as parameters to the SDK's client constructor](#option-4-add-the-values-as-parameters-to-the-sdk-s-client-constructor)

### Option 1: Create a YAML file

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

### Option 2: Set environment variables

#### SDK environment variables

Set the following environment variables with your app's configuration values before running an embedded authentication with SDK app:

* `OKTA_IDX_ISSUER`
* `OKTA_IDX_CLIENTID`
* `OKTA_IDX_CLIENTSECRET`
* `OKTA_IDX_REDIRECTURI`
* `OKTA_IDX_SCOPES`

The following is a Unix example of setting the environment variables for the sample app:

```bash
export OKTA_IDX_ISSUER=https://dev-1234.okta.com/oauth2/default
export OKTA_IDX_CLIENTID=123xyz
export OKTA_IDX_CLIENTSECRET=123456abcxyz
export OKTA_IDX_SCOPES="openid profile offline_access"
export OKTA_IDX_REDIRECTURI=http://localhost:8080
```

#### Sign-In Widget environment variables

Set the following environment variables with your app's configuration values before running an embedded Sign-In Widget app:

* `OKTA_OAUTH2_ISSUER`
* `OKTA_OAUTH2_CLIENTID`
* `OKTA_OAUTH2_CLIENTSECRET`
* `OKTA_OAUTH2_REDIRECTURI`
* `OKTA_IDX_SCOPES`

### Option 3: Use Java system properties

#### SDK Java properties

Use the following Java system properties when you run the embedded authentication with SDK app:

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

#### Sign-In Widget Java properties

Use the following Java system properties when you run the embedded Sign-In Widget app:

* `okta.oauth2.issuer`
* `okta.oauth2.clientId`
* `okta.oauth2.clientSecret`
* `okta.idx.scopes`
* `okta.oauth2.redirectUri`

### Option 4: Add the values as parameters to the SDK's client constructor

Add the configuration values as parameters to the constructor for `IDXAuthenticationWrapper`:

```java
/**
* Creates {@link IDXAuthenticationWrapper} instance.
*
* @param issuer the issuer url
* @param clientId the client id
* @param clientSecret the client secret
* @param scopes the set of scopes
* @param redirectUri the redirect uri
*/
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
