### 1: Start enrollment flow

The first step is to initiate a use case that requires authentication. This guide uses the sign-in with username and password flow that is initiated with calls to `IDXAuthenticatorWrapper.begin()`, `AuthenticationResponse.getProceedContext()`, and `IDXAuthenticatorWrapper.authenticate()`.

```java
AuthenticationResponse beginResponse = idxAuthenticationWrapper.begin();
ProceedContext proceedContext = beginResponse.getProceedContext();

AuthenticationResponse authenticationResponse;
authenticationResponse = idxAuthenticationWrapper.authenticate(
          new AuthenticationOptions(username, password.toCharArray()), proceedContext);
```

### 2: Display WebAuthn option

After the user submits their password, make a call to `IDXAuthenticationWrapper.verifyAuthenticator()` to verify their password. If you configure your Okta org as detailed in [Configuration updates](#update-configurations) and WebAuthn is **not** already [enrolled](#integrate-sdk-for-authenticator-enrollment) for the user, `verifyAuthenticator()` returns an `AuthenticationResponse` object with `authenticationStatus` equal to `AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION` and a `webauthn` authenticator item in the `authenticators` array.

```json
{
  "authenticationStatus": "AWAITING_AUTHENTICATOR_ENROLLMENT_SELECTION",
  "authenticators": [
    {
    "id": "autc4m63eWYtQ0x3c696",
    "type": "webauthn",
    "label": "Security Key or Biometric",
    "factors": [{
    "id": "autc4m63eWYtQ0x3c696",
    "method": "webauthn",
    "label": "Security Key or Biometric"
    }],
    "hasNestedFactors": false
    }]
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

![Page showing webauthn option in list](/img/authenticators/authenticators-webauthn-java-enroll-dropdown-selection.png)

</div>

### 3:  Submit WebAuthn option

When the user selects the WebAuthn option and clicks submit, call `IDXAuthenticatorWrapper.enrollAuthenticator()` passing in `ProceedContext` and the authenticator Id returned from `AuthenticationResponse.authenticators[n].factors[n].id`.

```java
Optional<Authenticator> authenticatorOptional =
                    authenticators.stream().filter(auth -> auth.getType().equals("webauthn")).findFirst();
String authId = authenticatorOptional.get().getId();

AuthenticationResponse enrollResponse = idxAuthenticationWrapper.enrollAuthenticator(proceedContext, authId);

```

### 4: Identify data for creating a new credential

The `AuthenticationResponse` object from `IDXAuthenticatorWrapper.enrollAuthenticator()` has `authenticationStatus` set to `AWAITING_AUTHENTICATOR_VERIFICATION`, which indicates the user must verify their WebAuthn credentials. Additionally, `AuthenticationResponse` returns the challenge and other information needed to verify the WebAuthn credentials on the user's device.

```json
{
	"authenticationStatus": "AWAITING_AUTHENTICATOR_ENROLLMENT", `
	"webAuthnParams": {
		"currentAuthenticator": {
			"value": {
				"type": "security_key",
				"id": "autc4m63eWYtQ0x3...",
				"key": "webauthn",
				"displayName": "Security Key or Biometric",
				"contextualData": {
					"activationData": {
						"user": {
							"id": "00uunttkoePFgXjQO696",
							"name": "johndoe@email.com",
							"displayName": "John Doe"
						},
						"challenge": "pMhDjTZmaxwBYqLe4-mpOSCVbafd..."
					}
				}
			}
		}
	}
}
```

### 5: Display page to verify WebAuthn credentials

Redirect the user to a page that creates the WebAuthn credentials and allow this page access to the `AuthenticationResponse` properties. The sample app builds this page in the following way:

1. Calls `ModelandView.addObject` to add the `AuthenticationResponse.currentAuthenticator` property, which is used later to extract the `challenge` and other information.

    ```java
    modelAndView = new ModelAndView("enroll-webauthn-authenticator");
    modelAndView.addObject("title", "Enroll Webauthn Authenticator");
    modelAndView.addObject("currentAuthenticator",
            enrollResponse.getWebAuthnParams().getCurrentAuthenticator());
    ```

2. Sets client-side javascript variables to values originating from `currentAuthenticator`. The sample app uses the [Thymeleaf](https://www.thymeleaf.org/) template engine to set these variables.

    ```javascript
    <script th:inline="javascript">
        const challenge = /*[[${currentAuthenticator.value.contextualData.activationData.challenge}]]*/ '';
        const userId = /*[[${currentAuthenticator.value.contextualData.activationData.user.id}]]*/ '';
        const username = /*[[${currentAuthenticator.value.contextualData.activationData.user.name}]]*/ '';
        const displayName = /*[[${currentAuthenticator.value.contextualData.activationData.user.displayName}]]*/ '';
    </script>
    ```

    As an example, the previous javascript code snippet renders the following javascript.

    ```javascript
    <script th:inline="javascript">
        const challenge = "ktbYamV1etMLBrLKIVD4xKvkDrL...";
        const userId = "00uuoauaxfdMkYw4...";
        const username = "johndoe@gmail.com";
        const displayName = "John Doe";
    </script>
    ```

### 6: Build the parameter for creating a new credential

On page load, create the parameter needed to make a new credential. When creating this parameter, use the `challenge` and `user.id` properties.

```javascript
const publicKeyCredentialCreationOptions = {
    rp: {
        name: "localhost",
        id: "localhost",
    },
    challenge: strToBin(challenge),
    user: {
        id: strToBin(userId),
        name: name,
        displayName: displayName,
    },
    pubKeyCredParams: [{alg: -7, type: "public-key"}],
};

function strToBin(str) {
    return Uint8Array.from(atob(base64UrlSafeToBase64(str)), c => c.charCodeAt(0));
}
```

### 7: Create a new credential

Call the Web Authentication API's `navigator.credentials.create()` in the client browser and pass in the `CredentialCreationOptions` object created in the previous step.

```javascript
navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
    }).then((newCredential) ...
```

This call initiates the following steps:

1. Browser prompts the user to choose an authenticator.

<div class="common-image-format">

![UI showing the authenticator options](/img/authenticators/authenticators-webauthn-authenticator-options.png)

</div>

2. After the user chooses the authenticator, the device's local authenticator asks for consent to create the credentials. In the following example, the **Touch ID** authenticator prompts the user for a fingerprint to confirm the consent.

<div class="common-image-format">

![UI showing user consent through fingerprint verification](/img/authenticators/authenticators-webauthn-user-consent.png)

</div></br>

3. The private and public key pairs are created. The private key is stored internally on the device and linked to the user and domain name. Specifically, `navigator.credentials.create()` returns an object of type `PublicKeyCredential` containing the public key, credential ID, and other information used to associate the new credential with the server and browser.

    ```json
    {
    "id": "Aa9rTddZCalI...",
    "rawId": ..,
    "response" : {
      "attestationObject" : Binary data ... ,
      "clientDataJSON": Binary data ... ,
    "type": "public-key"
    }
    ```

### 8: Build the parameter for sending the public key to the Okta server

The returned `PublicKeyCredential` object contains the signature and other binary formatted data that you need to convert to strings before sending it back to the Okta servers. The sample app uses client-side javascript to convert this data into a variable.

```javascript
.then((assertion) => {
.then((newCredential) => {
    const clientDataJSON = binToStr(newCredential.response.clientDataJSON);
    const attestationObject = binToStr(newCredential.response.attestationObject);

    const params = {
        "clientData": clientDataJSON,
        "attestation": attestationObject
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

### 9: Forward signature to Okta for enrollment

Forward the signature to Okta for validation. Specifically, perform the following steps:

1. First, send the converted signature data to the Okta SDK. The sample app sends the data through an HTTP Post request from the client browser to the server.

    ```javascript
    fetch("/enroll-webauthn", options)
                    .then(res => {
    ```

2. Next, send the data to `IDXAuthenticationWrapper.verifyWebAuthn` to have the server validate the signature and store the credential ID and public key associated with the user's account.

    ```java
    ProceedContext proceedContext = Util.getProceedContextFromSession(session);

    AuthenticationResponse authenticationResponse = idxAuthenticationWrapper.verifyWebAuthn(
      proceedContext, webauthnRequest);
    ```

3. Depending on the org configuration, `AuthenticationResponse` from `idxAuthenticationWrapper.verifyWebAuthn()` can return an `authenticationStatus` of `SUCCESS` along with token information, or another status indicating there are additional remediation steps to complete.
