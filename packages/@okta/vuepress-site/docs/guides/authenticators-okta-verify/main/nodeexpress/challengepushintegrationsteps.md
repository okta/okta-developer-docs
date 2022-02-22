<!--
### 1: Initiate use case requiring authentication

The first step is to initiate a use case requiring authentication. This guide uses sign-in with username and password, which is initiated with a call to `OktaAuth.idx.authenticate()`.

```javascript
  const transaction = await authClient.idx.authenticate({
    username,
    password,
  });
```

### 2: Handle WebAuthN challenge response

If you've configured your Okta org as detailed in [Configuration updates](#update-configurations) and the WebAuthn has already been [enrolled](#integrate-sdk-for-authenticator-enrollment) for the user, `authenticate()` returns a response indicating WebAuthn is required for verification. Specifically, `IdxTransaction` is returned with a `status` of `PENDING` and `nextStep.name` set to `challenge-authenticator`.

Additionaly, `IdxTransaction` returns challenge and other information to verify the WebAuthn credentials on the user's device. Specifically, `nextStep.authenticator.contextualData.challengeData.challenge` contains the challenge and `nextStep.authenticator.authenticatorEnrollments` contains the authenticator details including the credentialId.


```json
{
  status: "PENDING",
  nextStep: {
    name: "challenge-authenticator",
    type: "security_key",
    authenticator: {
      contextualData: {
        challengeData: {
          challenge: "HXIGggWAMeey15wTIqWTwkLFaIQ",
        },
      },
    authenticatorEnrollments: [
      {
        type: "security_key",
        key: "webauthn",
        id: "fwfeklc4ywN8Ndd3X696",
        displayName: "MacBook Touch ID",
        credentialId: "Aa6yUSWzI1uqaAf0beVxPKIA ...",
        methods: [
          {
            type: "webauthn",
          }, ],
      },],
  }, }, }
```


### 3: Display page to verify WebAuthn credentials

Redirect the user to a page that verifies the WebAuthn credentials. Allow this page access to `Idxtransaction.nextStep.authenticator.contextualData.challengeData` and `Idxtransaction.nextStep.authenticatorEnrollments` retrieved from the previous step. The sample app accesses these objects by converting them to JSON strings and assigning them to server-side variables.

```javascript
  const authenticatorEnrollmentsJSON = authenticatorEnrollments ? JSON.stringify(authenticatorEnrollments) : null;
  const challengeData = contextualData ? JSON.stringify(contextualData.challengeData) : null;
```

These variables are then used to set client-side javascript variables using a [Mustache](https://mustache.github.io/) template.

```javascript
const challengeData = {{{challengeData}}};
const authenticatorEnrollments = {{{authenticatorEnrollments}}};
```

The [Mustache](https://mustache.github.io/) template renders the following javascript.

``` javascript
const challengeData = {"challenge":"oSWT1iFttMs1KX_dxefvgozvzTg","userVerification": ...};
const authenticatorEnrollments = [{"type":"security_key","key":"webauthn","id": ...}];

```

### 4: Build parameter for getting a credential

On page load, build the parameter needed to request the credential. The parameter is created by a call to `OktaAuth.webauthn.buildCredentialRequestOptions()` in the client browser.  Pass into the method the `challengeData` and `authenticatorEnrollments` variables that were set in the previous step.

```javascript
const options = OktaAuth.webauthn.buildCredentialRequestOptions(challengeData, authenticatorEnrollments);
```

The response is an object of type `CredentialRequestOptions` and includes the challenge and credentials.

```json
{
    "publicKey": {
        "challenge": {
            "0": 161, "1": 37, "2": 147, ..
        },
        "userVerification": "preferred",
        "allowCredentials": [
            {
                "type": "public-key",
                "id": {
                    "0": 1,"1": 174, "2": 178, ..

                }
            }
        ]
    }
}
```

### 5: Get credential and create cryptographic signature

Call the Web Authentication API's `navigator.credentials.get()` in the client browser and pass in the `CredentialRequestOptions` object created in the previous step.

```javascript
              const credential = await navigator.credentials.get(options);
```

This call initiates the following steps:

1. The authenticator looks up the information stored for the credential id and checks that the domain name matches the one that was used during enrollment.

1. If the validations are successful, the authenticator prompts the user for consent. In the example below the **Touch ID** authenticator is prompting the user for a fingerprint to confirm the consent.

<div class="common-image-format">

![UI showing user consent through fingerprint verification](/img/authenticators/authenticators-webauthn-user-consent.png)

</div>

1. If the user is verified successfully, the authenticator uses the private key to generate a cryptographic signature over the domain name and challenge. Specifically, `navigator.credentials.get()` returns an object of type `PublicKeyCredential`, which contains this signature.

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

### 6: Build parameter for sending the signature to Okta

The returned `PublicKeyCredential` object contains binary formatted data that needs to get converted to a string before being sent back to the Okta servers. Call `OktaAuth.webauthn.getAssertion()` to retrieve a string formatted object of the information required to verify the user.

```javascript
const res = OktaAuth.webauthn.getAssertion(credential);
```

The returned assertion object looks as follows:

```json
{
    "id": "Aa6yUSWzI1uqaAf0beVx...",
    "clientData": "eyJ0eXBlIjoid2ViYXV0aG4...",
    "authenticatorData": "SZYN5YgOjGh0NBcPZ...",
    "signatureData": "MEYCIQCja1jQB+J2D4oM..."
}
```

### 7: Forward signature to Okta

Send the values of the assertion object's `clientData`, `authenticatorData`, and 'signatureData` properties back to the server. The sample app assigns these values in elements within the page.

```javascript
document.getElementById('credentials-clientData').value = res.clientData;
document.getElementById('credentials-authenticatorData').value = res.authenticatorData;
document.getElementById('credentials-signatureData').value = res.signatureData;
```

On the server, extract these elements from the page and pass the values to `OktaAuth.idx.proceed()` to have the server validate the signature
corresponds to the challenge and public key.

``` javascript
const transaction = await authClient.idx.proceed({
  clientData,
  authenticatorData,
  signatureData
});
```

Depending on how the org is configured, the returned `IdxTransaction` object can either return a status of `PENDING` or `SUCCESS` with access and ID tokens.
-->
