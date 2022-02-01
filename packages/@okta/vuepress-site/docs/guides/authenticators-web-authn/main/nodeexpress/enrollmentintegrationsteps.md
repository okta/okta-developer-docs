### Initiate use case requiring authentication

Initiate a use case requiring authentication. This guide uses [basic user sign-in](/docs/guides/oie-embedded-sdk-use-case-basic-sign-in/nodejs/main/), which is initiated with a call to `OktaAuth.idx.authenticate()`.

```javascript
  const transaction = await authClient.idx.authenticate({
    username,
    password,
  });
```

### Display WebAuthn option

If you've configured your Okta org as detailed in [Configuration updates](#update-configurations), `authenticate()` returns a response with WebAuthn in the list of available authenticators. Specifically, `IdxTransaction` is returned with a `status` of `PENDING`, `nextStep.name` set to `select-authenticator-enroll`, and WebAuthn included as an option in the `nextStep.options` array. See the following `IdxTransaction` example for more details.

```json
{
  status: "PENDING",
  nextStep: {
    name: "select-authenticator-enroll",
    inputs: [
      {
        name: "authenticator",
        key: "string",
      },
    ],
    options: [
      {
        label: "Security Key or Biometric",
        value: "webauthn",
      }
    ],
  },
```

Using the `value` and `label` properties, show the available list of authenticators to the user. The sample app constructs a dropdown using a [Mustache](https://mustache.github.io/) template.

```xml
  <select id="authenticator-options" class="ui selection dropdown" name="authenticator">
    {{#options}}
      <option value="{{value}}">{{label}}</option>
    {{/options}}
  </select>
```

UI showing the Google Authenticator option:

<div class="common-image-format">

![WebAuthNoption shown in UI](/img/authenticators/authenticators-webauthn-dropdown-selection.png)

</div>

### Submit WebAuthn option

When the user selects and submits Google Authenticator, call `OktaAuth.idx.proceed()` passing in the `webauthn` value from `IdxOption.value`.

```javascript
    const transaction = await authClient.idx.proceed({ authenticator });
    handleTransaction({ req, res, next, authClient, transaction });
```

### Get identifier data for registering a WebAuthn credential

The response from `OktaAuth.idx.proceed()` returns objects needed to create a WebAuthn credential on the client. Specifically, `IdxTransaction` is returned with `nextStep.authenticator.contextualData.activationData` that contains the randomly generated challenge and user information and `nextStep.authenticatorEnrollments` which includes a list of enrolled authenticators. See the following `IdxTransaction` example for more details.

```json
{
  status: "PENDING",
  nextStep: {
    authenticator: {
      contextualData: {
        activationData: {
          user: {
            displayName: "John Doe",
            name: "email@email.com",
            id: "00ucgff4u...",
          },
          pubKeyCredParams: [ ... ],
          challenge: "FNRDfaU0V17cS17JMV9eG8jsCoU",
        },
      },
   }
},
    authenticatorEnrollments: [
      { type: "email", key: "okta_email" },
      { type: "password", key: "okta_password" },
    ],
  },
}
```

### Display page to create WebAuthn credentials

Redirect the user to page that creates the WebAuthn credentials. Allow this page access to `Idxtransaction.nextStep.authenticator.contextualData.activationData` and `Idxtransaction.nextStep.authenticatorEnrollments` retrieved from the previous step.

The sample app accesses these objects by converting them to JSON strings and assigning them to server side variables.

```javascript
const authenticatorEnrollmentsJSON = authenticatorEnrollments ? JSON.stringify(authenticatorEnrollments) : null;
const activationData = contextualData ? JSON.stringify(contextualData.activationData) : null;
```

These variables are then used to set client side javascript variables using a [Mustache](https://mustache.github.io/) template.

```javascript
const activationData = {{{activationData}}};
const authenticatorEnrollments = {{{authenticatorEnrollments}}};
```

The [Mustache](https://mustache.github.io/) template renders the following javascript.

``` javascript
  const activationData = {"rp":{"name":"John Doe"}} "challenge":"FNRDfaU0V17cS17JMV9eG8jsCoU" ... ;

  const authenticatorEnrollments = [{"type":"email","key":"okta_email","id":"eaecgff4vUrS ... ","displayName":"Email","methods":[{"type":"email"}]},
  {"type":"password","key":"okta_password","id":"lae15gwr6... ","displayName":"Password","methods":[{"type":"password"}]}];
```

### Build parameter for creating a new credential

On page load, build the parameter needed to create a new credential. The parameter is created by a call to `OktaAuth.webauthn.buildCredentialCreationOptions()` in the client browser.  Pass into the method the `activateData` and `authenticatorEnrollments` variables that were set in the previous step.

```javascript
const options = OktaAuth.webauthn.buildCredentialCreationOptions(activationData, authenticatorEnrollments);
```

The response is an object of type `CredentialCreationOptions` and includes the challenge and user information.

```json

{
    "publicKey": {
        "rp": {
            "name": "Test okta org"
        },
        "user": {
            "id": {
                "0": 211, "1": 75, "2": 156, ...
            },
            "name": "johndoe@email.com",
            "displayName": "John Doe"
        },
        "challenge": {
            "0": 20, "1": 212, "2": 67 ...
        },
        ...
    }
}
```

### Create a new credential

Call the Web Authentication API's `navigator.credentials.create()` in the client browser and pass in the `CredentialCreationOptions` object created in the previous step.

```javascript
const credential = await navigator.credentials.create(options);
```

This call initiates the following steps:

1. Browser prompts the user to choose an authenticator.

<div class="common-image-format">

![UI showing the authenticator options](/img/authenticators/authenticators-webauthn-authenticator-options.png)

</div>

1. After choosing the authenticator, it asks the user for consent. In the example below the **Touch Id** authenticator is prompting the user for a fingerprint to confirm the consent.

<div class="common-image-format">

![UI showing user consent through fingerprint verification](/img/authenticators/authenticators-webauthn-user-consent.png)

</div>

1. Private and public key pair are created. The private key is stored internally on the device and linked to the user and domain name. Specifically, `navigator.credentials.create()` returns an object of type `PublicKeyCredential`, which contains the public key, credential id, and other information used to associated the new credential with the server and browser.

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

### Build parameter for sending the public key to the Okta server

The returned `PublicKeyCredential` object contains binary formatted data that needs to get converted to a string before being sent back to the Okta servers. Call `OktaAuth.webauthn.getAttestation()` to retrieve a string formatted object of the public key and other information required to complete the credential registration.

```javascript
const res = OktaAuth.webauthn.getAttestation(credential);
```

The returned attestation object looks as follows:

```json
{
    "id": "Aa9rTddZCalIkflnqoxRd6gXf...",
    "clientData": "eyJ0eXBlIjoid2ViY...",
    "attestation": "o2NmbXRmcGFja2Vk..."
}

```

### Forward public key credentials to Okta server

Send the values of the attestation object's `clientData` and `attestation` properties back to the server. The sample app assigns these values in elements within the page.

```javascript
document.getElementById('credentials-clientData').value = res.clientData;
document.getElementById('credentials-attestation').value = res.attestation;
```

On the server, extract these elements from the page as shown in the following sample app's code example.

```javascript
const { clientData, attestation } = req.body;
```

Then, pass these values to `OktaAuth.idx.proceed()` to have the server validate the signature and store the credential Id and public key in association with the user's account.

``` javascript
const transaction = await authClient.idx.proceed({
  clientData,
  attestation
});
```

Depending on how the org is configured, the returned `IdxTransaction` object can either return a status of `PENDING` or `SUCCESS` with access and Id tokens.
