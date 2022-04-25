### 1: Initiate a use case requiring authentication

The first step is to initiate a use case that requires authentication. This guide uses the sign-in with username and password flow that is initiated with calls to `IDXAuthenticatorWrapper.begin()`, `AuthenticationResponse.getProceedContext()`, and `IDXAuthenticatorWrapper.authenticate()`.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin();
ProceedContext proceedContext = beginResponse.getProceedContext();

AuthenticationResponse authenticationResponse;
authenticationResponse = idxAuthenticationWrapper.authenticate(
          new AuthenticationOptions(username, password.toCharArray()), proceedContext);
```

### 2: Display WebAuthn authenticator option

After the user submits their password, make a call to `IDXAuthenticationWrapper.verifyAuthenticator()` to verify their password. If you configure your Okta org as detailed in [Configuration updates](#update-configurations) and WebAuthn is already [enrolled](#integrate-sdk-for-authenticator-enrollment) for the user, `verifyAuthenticator()` returns an `AuthenticationResponse` object with `authenticationStatus` set to `AWAITING_AUTHENTICATOR_SELECTION` and `authenticators` including a `webauthn` authenticator item.

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

Use the `type` and `label` properties to show the available list of authenticators to the user. The sample app constructs a dropdown list using the [Thymeleaf](https://www.thymeleaf.org/) template engine.

```xml
<tr th:each="authenticator : ${authenticators}">
    <div class="form-check">
        <input class="form-check-input" type="radio" name="authenticator-type" th:value="${authenticator.label}" checked="true">
        <label class="form-check-label" th:text="${authenticator.label}"></label>
    </div>
</tr>
```

Authenticator selection page example from the sample app:

<div class="common-image-format">

![Page showing webauthn option in list](/img/authenticators/authenticators-webauthn-java-dropdown-selection.png)

</div>

### 3: Submit WebAuthn authenticator option

When the user selects the WebAuthn option and clicks submit, call `IDXAuthenticatorWrapper.enrollAuthenticator()` passing in `ProceedContext` and the authenticator Id returned from `AuthenticationResponse.authenticators[n].factors[n].id` in the previous step.

```java
Optional<Authenticator> authenticatorOptional =
                    authenticators.stream().filter(auth -> auth.getType().equals("webauthn")).findFirst();
String authId = authenticatorOptional.get().getId();

AuthenticationResponse enrollResponse = idxAuthenticationWrapper.enrollAuthenticator(proceedContext, authId);

```

### 4: Pull challenge and other data from the response

The `AuthenticationResponse` object from `IDXAuthenticatorWrapper.enrollAuthenticator()` has `authenticationStatus` set to `AWAITING_AUTHENTICATOR_VERIFICATION`, which indicates the user must verify their WebAuthn credentials. The code below shows an example response. Additionally, `AuthenticationResponse` returns the challenge, credential Id, and other information needed to verify the WebAuthn credentials on the user's device.

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
    "webauthnCredentialId": "AYqpxcR9Jrw6BzVJyZf-ImP7OffDl9-pHcRV2fLD9wexskXac7-DFXrX29A7oFURAwT1oFKoI1loau..."
  }
}
```

### 5: Display page to verify WebAuthn credentials

Redirect the user to a page that verifies the WebAuthn credentials. Allow this page access to `AuthenticationResponse.webAuthnParams.currentAuthenticator.contextualData.challengeData` and  `AuthenticationResponse.webAuthnParams.webauthnCredentialId`. Using the [Thymeleaf](https://www.thymeleaf.org/) template engine, the sample app specifically does the following:

1. Calls `ModelandView.addObject` and adds the `webauthnCredentialId` and `challengeData` information.

  ```java
  String webauthnCredentialId = enrollResponse.getWebAuthnParams().getWebauthnCredentialId();

  modelAndView.addObject("title", "Select Webauthn Authenticator");
  modelAndView.addObject("webauthnCredentialId", webauthnCredentialId);
  modelAndView.addObject("challengeData", enrollResponse.getWebAuthnParams()
          .getCurrentAuthenticator().getValue().getContextualData().getChallengeData());
  ```

2. Sets client-side javascript variables

  ```javascript
    <script th:inline="javascript">
        const challengeData = /*[[${challengeData}]]*/ '';
        const webauthnCredentialId = /*[[${webauthnCredentialId}]]*/ '';
   </script>
  ```

  As an example, the above javascript renders the following javascript.

  ```javascript
  const challengeData = {"userVerification":"preferred","challenge":"O99tLUgxcY5fzANLKS7B5rUGZor2Kbn2",...};
  const webauthnCredentialId = "AYqpxcR9Jrw6BzVJyZf-ImP7OffDl9-pHcRV2fLD9wexskXac7-DFXrX29A7oFURAwT1oFKoI1loaud.";
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
    return Uint8Array.from(atob(base64UrlSafeToBase64(str)), c => c.charCodeAt(0));
}
```

### 7: Get credential and create cryptographic signature

Call the Web Authentication API's `navigator.credentials.get()` in the client browser and pass in the `CredentialRequestOptions` object created in the previous step.

```javascript
navigator.credentials.get({
      publicKey: publicKeyCredentialRequestOptions
  }).then((assertion) ...
```

This call initiates the following steps:

1. The authenticator looks up the information stored for the credential ID and checks that the domain name matches the one used during enrollment.

2. If the validations are successful, the authenticator prompts the user for consent. In the following example, the **Touch ID** authenticator prompts the user for a fingerprint to confirm consent.

<div class="common-image-format">

![UI showing user consent through fingerprint verification](/img/authenticators/authenticators-webauthn-user-consent.png)

</div>

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

### 8: Build parameter for sending the signature to Okta

The returned `PublicKeyCredential` object contains the signature and other binary formatted data that you need to convert to strings before sending it back to the Okta servers. The sample app uses client-side javascript to convert this data into a variable.

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
          return btoa(new Uint8Array(bin).reduce((s, byte) => s + String.fromCharCode(byte), ''));
      }
```

### 9: Forward signature to Okta for validation

1. First, send the converted signature data to the Okta SDK. The sample app sends the data through an HTTP Post request from the client browser to the server.

```javascript
fetch('/verify-webauthn', options)
                .then(res => { ...
```

2. Next, send the data to `IDXAuthenticationWrapper.verifyWebAuthn` to have the server validate the signature corresponding to the challenge and public key.

```java
ProceedContext proceedContext = Util.getProceedContextFromSession(session);

AuthenticationResponse authenticationResponse = idxAuthenticationWrapper.verifyWebAuthn(
  proceedContext, webauthnRequest);
```

3. Depending on the org configuration, `AuthenticationResponse` from `idxAuthenticationWrapper.verifyWebAuthn()` can return `SUCCESS` for `authenticationStatus` along with token information or another status indicating there are additional remediation steps to complete.
