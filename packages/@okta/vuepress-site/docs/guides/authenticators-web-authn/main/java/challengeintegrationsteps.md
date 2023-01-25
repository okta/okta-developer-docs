### 1: Start challenge flow

Start the challenge flow with calls to `IDXAuthenticationWrapper.begin()` and `AuthenticationResponse.getProceedContext()`. Then send the username and password to the Okta server with `IDXAuthenticationWrapper.authenticate()`.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin();
ProceedContext proceedContext = beginResponse.getProceedContext();

AuthenticationResponse authenticationResponse;
authenticationResponse = idxAuthenticationWrapper.authenticate(
    new AuthenticationOptions(username, password.toCharArray()),
    proceedContext);
```

### 2: Display WebAuthn option

 If you configure your Okta org as detailed in [Configuration updates](#update-configurations) and WebAuthn is already [enrolled](#integrate-sdk-for-authenticator-enrollment) for the user, `authenticate()` returns an `AuthenticationResponse` object with `authenticationStatus` equal to `AWAITING_AUTHENTICATOR_SELECTION` and a `webauthn` authenticator item in the `authenticators` array.

```json
{
"authenticationStatus": "AWAITING_AUTHENTICATOR_SELECTION",
  "authenticators": [{
  "id": "autc4m63eWYtQ0x3...",
  "type": "webauthn",
  "label": "Security Key or Biometric",
  "factors": [{
    "id": "autc4m63eWYtQ0x3...",
    "method": "webauthn",
    "label": "Security Key or Biometric"
    }],
    "hasNestedFactors": false
  }],
}
```

Use the `type` and `label` properties to show the available list of authenticators to the user.

```xml
<tr th:each="authenticator : ${authenticators}">
    <div class="form-check">
        <input class="form-check-input" type="radio" name="authenticator-type"
           th:value="${authenticator.label}" checked="true">
        <label class="form-check-label" th:text="${authenticator.label}"></label>
    </div>
</tr>
```

A simple authenticator selection page should look like this:

<div class="three-quarter">

![Screenshot illustrating the select authenticator page showing the available sign-in authenticators, including the WebAuthn.](/img/authenticators/authenticators-webauthn-java-dropdown-selection.png)

</div>

### 3: Submit WebAuthn authenticator option

When the user selects the WebAuthn option, call `IDXAuthenticationWrapper.enrollAuthenticator()` passing in `ProceedContext` and the authenticator ID returned from `AuthenticationResponse.authenticators[n].factors[n].id`.

```java
Optional<Authenticator> authenticatorOptional =
    authenticators.stream().filter(auth -> auth.getType().equals
    ("webauthn")).findFirst();
String authId = authenticatorOptional.get().getId();

AuthenticationResponse enrollResponse = idxAuthenticationWrapper
    .enrollAuthenticator(proceedContext, authId);

```

### 4: Identify data for getting the credential

The `AuthenticationResponse` object from `IDXAuthenticationWrapper.enrollAuthenticator()` has `authenticationStatus` set to `AWAITING_AUTHENTICATOR_VERIFICATION` that indicates the user must verify their WebAuthn credentials. The code below shows an example response. Additionally, `AuthenticationResponse` returns the challenge, credential ID, and other information needed to verify the WebAuthn credentials on the user's device.

```json
{
  "authenticationStatus": "AWAITING_AUTHENTICATOR_VERIFICATION",
  "webAuthnParams": {
    "currentAuthenticator": {
      "value": {
        "type": "security_key",
        "id": "autc4m63eWYtQ0x3...",
        "key": "webauthn",
        "displayName": "Security Key or Biometric",
        "contextualData": {
          "challengeData": {
            "userVerification": "preferred",
            "challenge": "O99tLUgxcY5fzANLKS7B5rUGZor2...",
            "extensions": {
              "appid": "https://test.okta.com"
            }
          }
        }
      }
    },
    "webauthnCredentialId": "AYqpxcR9Jrw6BzVJyZf-ImP7OffDl9-pHcRV2fLD9wexskXac7-..."
  }
}
```

### 5: Display page to verify WebAuthn credentials

Redirect the user to a page that verifies the WebAuthn credentials returned in the `AuthenticationResponse.webAuthnParams` object; specifically `currentAuthenticator.contextualData.challengeData` and `webauthnCredentialId`.

1. Call `ModelandView.addObject()` and add `webauthnCredentialId` and `challengeData`.

    ```java
    String webauthnCredentialId = enrollResponse.getWebAuthnParams()
        .getWebauthnCredentialId();

    modelAndView.addObject("title", "Select WebAuthn Authenticator");
    modelAndView.addObject("webauthnCredentialId", webauthnCredentialId);
    modelAndView.addObject("challengeData", enrollResponse.getWebAuthnParams()
        .getCurrentAuthenticator().getValue().getContextualData()
        .getChallengeData());
    ```

2. Set client-side javascript variables used later to get the credential.

    ```javascript
    <script th:inline="javascript">
        const challengeData = /*[[${challengeData}]]*/ '';
        const webauthnCredentialId = /*[[${webauthnCredentialId}]]*/ '';
    </script>
    ```

    The previous javascript code snippet produces the following code in the browser:

    ```javascript
    <script th:inline="javascript">
        const challengeData = {"userVerification":"preferred","challenge":"O99tLUgxcY5fz",...};
        const webauthnCredentialId = "AYqpxcR9Jrw6BzVJyZf-ImP7OffDl9-pHcRV2fLD9wexskXac7
    </script>
    ```

### 6: Build parameter for getting a credential

On page load, build the parameter needed to request the credential. Use the `challengeData.challenge` and `webauthnCredentialId` values to create this parameter.

```javascript
const publicKeyCredentialRequestOptions = {
  challenge: strToBin(challengeData.challenge),
  allowCredentials: [{
      id: strToBin(webauthnCredentialId),
      type: 'public-key',
  }],
  userVerification: 'discouraged',
  timeout: 60000,
  };

function strToBin(str) {
    return Uint8Array.from(atob(base64UrlSafeToBase64(str)),
    c => c.charCodeAt(0));
}
```

### 7: Receive credential and create cryptographic signature

Call `navigator.credentials.get()` in the client browser and pass in the `CredentialRequestOptions` object created in the previous step.

```javascript
navigator.credentials.get({
    publicKey: publicKeyCredentialRequestOptions
}).then((assertion) ...
```

This call initiates the following steps:

1. The authenticator looks up the information stored for the credential ID and checks that the domain name matches the one used during enrollment.

2. If the validations are successful, the authenticator prompts the user for consent. In the following example, the **Touch ID** authenticator prompts the user for a fingerprint to confirm consent.

<div class="half">

![Screenshot showing the user consent screen that prompts the user to verify through a fingerprint or password.](/img/authenticators/authenticators-webauthn-user-consent.png)

</div>
<br>

3. If the user is verified successfully, the authenticator uses the private key to generate a cryptographic signature over the domain name and challenge. Specifically, `navigator.credentials.get()` returns an object of type `PublicKeyCredential` that contains this signature.

```json
{
"id": "Aa9rTddZCalI...",
"rawId": ..,
"response" : {
  "authenticatorData" : Binary data ... ,
  "clientDataJSON": Binary data ... ,
  "signature": Binary data ... ,
  "userHandle": Binary data ... ,
"type": "public-key"
}
```

### 8: Build the parameter for sending the public key to the Okta server

The returned `PublicKeyCredential` object contains the signature and other binary-formatted data that you need to convert to strings before sending it back to the Okta servers.

```javascript
.then((assertion) => {
    const clientData = binToStr(assertion.response.clientDataJSON);
    const authenticatorData = binToStr(assertion.response.authenticatorData);
    const signatureData = binToStr(assertion.response.signature);

    const params = {
       "clientData": clientData,
        "authenticatorData": authenticatorData,
        "signatureData": signatureData
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    };

function binToStr(bin) {
    return btoa(new Uint8Array(bin).reduce((s, byte) => s
        + String.fromCharCode(byte), ''));
}
```

### 9: Forward signature to Okta server for validation

Forward the signature to the Okta server for validation. Specifically, perform the following steps:

1. Send the converted signature data from the client browser to the server side of your web application.

    ```javascript
    fetch('/verify-webauthn', options)
        .then(res => { ...
    ```

2. Call `IDXAuthenticationWrapper.verifyWebAuthn()` to have the server validate the signature corresponding to the challenge and public key.

    ```java
    ProceedContext proceedContext = Util.getProceedContextFromSession(session);

    AuthenticationResponse authenticationResponse = idxAuthenticationWrapper
        .verifyWebAuthn(proceedContext, webauthnRequest);
    ```

3. Depending on the org configuration, the `AuthenticationResponse` returned by `IDXAuthenticationWrapper.verifyWebAuthn()` may contain `authenticationStatus` of `SUCCESS` along with token information, or another status to indicate that there are further remediation steps to complete.
