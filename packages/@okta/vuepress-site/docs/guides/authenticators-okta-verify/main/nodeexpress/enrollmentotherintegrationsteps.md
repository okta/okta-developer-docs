<!--
### 1: Initiate use case requiring authentication

The first step is to initiate a use case requiring authentication. This guide uses sign-in with username and password, which is initiated with a call to `OktaAuth.idx.authenticate()`.

```javascript
  const transaction = await authClient.idx.authenticate({
    username,
    password,
  });
```

### 2: Display WebAuthn option

If you've configured your Okta org as detailed in [Configuration updates](#update-configurations), `authenticate()` returns a response with Okta Verify in the list of available authenticators. Specifically, `IdxTransaction` is returned with a `status` of `PENDING`, `nextStep.name` set to `select-authenticator-enroll`, and Okta Verify is included as an option in the `nextStep.options` array. See the following `IdxTransaction` example for more details.

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
        label: "Okta Verify",
        value: "okta_verify",
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

UI showing the Okta Verify authenticator option:

<div class="common-image-format">

![Okta Verify option shown in UI](/img/authenticators/authenticators-oktaverify-dropdown-selection.png)

</div>

### 3: Submit Okta Verify option

When the user selects and submits the WebAuthn option, call `OktaAuth.idx.proceed()` passing in the `okta_verify` value from `IdxOption.value`.

```javascript
    const transaction = await authClient.idx.proceed({ authenticator });
    handleTransaction({ req, res, next, authClient, transaction });
```

### 4: Display QR Code


### 5: Show other ways to complete Okta Verify setup

**TBD:** Currently, completing Okta Verify setup using SMS or email is not working in the Javascript SDK

### 6: Poll for user to complete Okta Verify setup

### 7: User adds account to Okta Verify using QR Code





### 4: Display shared secret and QR Code

Next, display the QR code and


1. Display QR Code
1. Poll for when user taps on push notificaiton
3



Next, display the shared secret to the user so they can copy the value to the Google Authenticator app. The response from `OktaAuth.idx.proceed()` allows you to display a string and QR code containing the shared secret. `IdxTransaction` is returned with `authenticator.contextualData.sharedsecret` set to a string of the secret and `authenticator.contextualData.qrcode.href` storing the secret in a base64-encoded PNG image. See the following `IdxTransaction` example for more details.

contextualData.qrcode.href


{
  name: "enroll-poll",
  inputs: [
  ],
  authenticator: {
    contextualData: {
      qrcode: {
        method: "embedded",
        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYA...=",
        type: "image/png",
      },
      selectedChannel: "qrcode",
    },
    key: "okta_verify",
    displayName: "Okta Verify",
    methods: [
      {
        type: "signed_nonce",
      },
    ],
  },
  poll: {
    required: true,
    refresh: 4000,
  },
}






``` json
{
  status: "PENDING",
  nextStep: {
    name: "enroll-authenticator",
    inputs: [
      {
        name: "verificationCode",
        ...
      },
    ],
    type: "app",
    authenticator: {
      contextualData: {
        qrcode: {
          method: "embedded",
          href: "data:image/png;base64,iVBORw0KGgoAAAANSUh ... ",
          type: "image/png",
        },
        sharedSecret: "6BCSPLSQTAYWOCDX",
      },
      ...
    },
  },
}
```

The following [Mustache](https://mustache.github.io/) template snippet shows how the sample app displays the QR code and shared secret string.

```xml
    <div class="ui segment">
      {{#contextualData.qrcode}}
        <div class="ui fluid image">
          <img id="authenticator-qr-code" src="{{contextualData.qrcode.href}}" />
        </div>
      {{/contextualData.qrcode}}
    </div>
    <div class="ui segment">
      {{#contextualData.sharedSecret}}
        <div class="ui label">SharedSecret: </div>
        <p id="authenticator-shared-secret">{{contextualData.sharedSecret}}</p>
      {{/contextualData.sharedSecret}}
    </div>
```

Example UI showing the Google Authenticator in the dropdown list:

<div class="common-image-format">

![Shared secret shown in UI](/img/authenticators/authenticators-google-shared-secret.png)

</div>

--

`IdxTransaction.status`: "PENDING"
`IdxTransaction.nextStep.name`: "enroll-poll"
`IdxTransaction.nextStep.authenticator.contextualData.qrcode.href`: ""data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."

`availableSteps:[n].name:` "select-enrollment-channel"
`availableSteps:[n].options[n].value:` "email"

`IdxTransaction.nextStep.poll.refresh`: 4000


next step. poll

```json
{
  status: "PENDING",
  availableSteps: [
    {
      name: "enroll-poll",
      poll: {
        required: true,
        refresh: 4000,
      },
    },
    {
      name: "select-enrollment-channel",
      inputs: [
      ],
      options: [
        {
          label: "QRCODE",
          value: "qrcode",
        },
        {
          label: "EMAIL",
          value: "email",
        },
        {
          label: "SMS",
          value: "sms",
        },
      ],
      authenticator: {
        contextualData: {
          qrcode: {
            method: "embedded",
            href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFnUlEQVR42u3dQZKjMAwF0Nz/0t2LWc8ibX1JhverepOaSQL4pZDA5vMjIv/Nxy4QAUQEEBFARAARAUQEEBFARAARAUREABEBRAQQEUBEABEBRAQQEUBEABEBREQAEQFEBBARQEQAEQHk3wd9PuV/337uyXf79j2r9s+323Wyr0628dvvkz7ugAACCCCAAPJCIIn3+XZgn/z7b7/PCYqqH4eqATn1YwIIIIAAAggggJSfo1btqE6kVTVRomap2rdVPyBTdR8ggAACCCCAAPLnwVnVQky3K6daymlQgAACCCCAAALII2uQqs9NtGrTrdeqWixR9wECCCCAAAIIIG3nvVMDPg1kw+BM1HQbjjsggAACCCCAALKqTer1/tfNBwHE64AA4nVArk6iLthwDp/4AUnvh+vHEiCAAAIIIIA8twY5aeemp+h2/qVbo5378xZ0gAACCCCAAHIRkEQdkfi/iffv3N70HQXpBe4AAQQQQAABBJBVtUnV+W0C2tQATs8lSd+o+dor6YAAAggggACypy5I10rpRzNUIUq3cKewAAIIIIAAAggg5W29qcXZ0oMkjaKqNum8+q8GAQQQQAABBJBom/f2miLxQ5HA2znIt0EABBBAAAEEkAfUIBt2+NRV420PwZxqI1vVBBBAAAEEEEBG2rzpqabpK+CJ99kwR2Zq8AMCCCCAAAIIIG01SOLfnxz0qgHT2abeXCsp0gEBBBBAAAGk/Dx2qiWbWLwuXYNsO8/vvDMBEEAAAQQQQF4OZGqHb6hB0i3ibfVdYi6MJ0wBAggggAACyEgrOA0kPWASbeptoKqOCyCAAAIIIIAA8ueBlGgVptuqVe9Z9SMw9eSsRI3pSjoggAACCCCAjLRS0y3fRE2RaBFvwDu1fi8ggAACCCCAvLzN23kzXuf01VuuIE8h7bwRFBBAAAEEEECs7t523ps+171l3d1t26UGAQQQQAABBJCReiRxbnxysKZqpc59uLkGBAQQQAABBBBA2s4/08vyb9iuqbsO0q1yNQgggAACCCCAjADZfJ6faGt33nxYBSG9kJ1bTQABBBBAAAGkbWBU1RHpVmrn4wmqvn+iVZ74XEAAAQQQQAABZOS8tHPuRqLtXLVvO1vKJ99t2xV2QAABBBBAALkISOdAmnroZAJaoiWb+KzNNx8CAggggAACyMOApFF0PkzzlkG1+dEMVjUBBBBAAAEEkBEUm1fhmPqrGngbarGTMQMIIIAAAggggIy0fxP1TmetkbjZsnO7Oh9XAQgggAACCCBqkLZpnptbu1WDLVHHTdU1Fo4DBBBAAAEEkGjdkahNpuYsbGirJkBN1WtuNQEEEEAAAQSQtgNdha6qBpmqdzpXCHlD3QEIIIAAAgggl7Z5E4MhvX7s5nWAb3lgaHrxQEAAAQQQQAB5OZDEhk+1W7cNjKk5Jk9d4QQQQAABBBBALmrzJlbSmLrCnq5ZEvskgaKqlnElHRBAAAEEEEDG65HEyiedU0en1uytar8n3idxrAEBBBBAAAHEhcKSc++qg1K1LZ31y9RcmM5nsgMCCCCAAAIIIKvqms5nlyfOvdPt0G3btWJcAQIIIIAAAsj9Nci2c9fEjY7bnpw19XiFqfoREEAAAQQQQB4MJP0+U8vsbxvk6e9wsg9dSQcEEEAAAQSQKJDORwlUQXvqCiqb584AAggggAACCCDjQKpamp01yIYWd2et1HlcAAEEEEAAAQSQ8hpkqoWYnseRaJmmW+I3LiIHCCCAAAIIIJcCmTrP7zyvTq+UsmHt36ljAQgggAACCCCArJ0P0vmIgan3SXyHzVOVAQEEEEAAAeSFq7uLaPOKACICiAggIgKICCAigIgAIgKICCAigIgAIgKIiAAiAogIICKAiAAiAogIICKAiAAiAoiIACICiAggIun8ArtN7fn5ASugAAAAAElFTkSuQmCC",
            type: "image/png",
          },
          selectedChannel: "qrcode",
        },
        displayName: "Okta Verify",
        methods: [
          {
            type: "signed_nonce",
          },
        ],
      },
    },
    {
      name: "select-authenticator-enroll",
      inputs: [
        {
          name: "authenticator",
          key: "string",
        },
      ],
      options: [
        {
          label: "Google Authenticator",
          value: "google_otp",
        },
        {
          label: "Okta Verify",
          value: "okta_verify",
        },
        {
          label: "Security Key or Biometric",
          value: "webauthn",
        },
      ],
    },
  ],
  nextStep: {
    name: "enroll-poll",
    inputs: [
    ],
    authenticator: {
      contextualData: {
        qrcode: {
          method: "embedded",
          href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFnUlEQVR42u3dQZKjMAwF0Nz/0t2LWc8ibX1JhverepOaSQL4pZDA5vMjIv/Nxy4QAUQEEBFARAARAUQEEBFARAARAUREABEBRAQQEUBEABEBRAQQEUBEABEBREQAEQFEBBARQEQAEQHk3wd9PuV/337uyXf79j2r9s+323Wyr0628dvvkz7ugAACCCCAAPJCIIn3+XZgn/z7b7/PCYqqH4eqATn1YwIIIIAAAggggJSfo1btqE6kVTVRomap2rdVPyBTdR8ggAACCCCAAPLnwVnVQky3K6daymlQgAACCCCAAALII2uQqs9NtGrTrdeqWixR9wECCCCAAAIIIG3nvVMDPg1kw+BM1HQbjjsggAACCCCAALKqTer1/tfNBwHE64AA4nVArk6iLthwDp/4AUnvh+vHEiCAAAIIIIA8twY5aeemp+h2/qVbo5378xZ0gAACCCCAAHIRkEQdkfi/iffv3N70HQXpBe4AAQQQQAABBJBVtUnV+W0C2tQATs8lSd+o+dor6YAAAggggACypy5I10rpRzNUIUq3cKewAAIIIIAAAggg5W29qcXZ0oMkjaKqNum8+q8GAQQQQAABBJBom/f2miLxQ5HA2znIt0EABBBAAAEEkAfUIBt2+NRV420PwZxqI1vVBBBAAAEEEEBG2rzpqabpK+CJ99kwR2Zq8AMCCCCAAAIIIG01SOLfnxz0qgHT2abeXCsp0gEBBBBAAAGk/Dx2qiWbWLwuXYNsO8/vvDMBEEAAAQQQQF4OZGqHb6hB0i3ibfVdYi6MJ0wBAggggAACyEgrOA0kPWASbeptoKqOCyCAAAIIIIAA8ueBlGgVptuqVe9Z9SMw9eSsRI3pSjoggAACCCCAjLRS0y3fRE2RaBFvwDu1fi8ggAACCCCAvLzN23kzXuf01VuuIE8h7bwRFBBAAAEEEECs7t523ps+171l3d1t26UGAQQQQAABBJCReiRxbnxysKZqpc59uLkGBAQQQAABBBBA2s4/08vyb9iuqbsO0q1yNQgggAACCCCAjADZfJ6faGt33nxYBSG9kJ1bTQABBBBAAAGkbWBU1RHpVmrn4wmqvn+iVZ74XEAAAQQQQAABZOS8tHPuRqLtXLVvO1vKJ99t2xV2QAABBBBAALkISOdAmnroZAJaoiWb+KzNNx8CAggggAACyMOApFF0PkzzlkG1+dEMVjUBBBBAAAEEkBEUm1fhmPqrGngbarGTMQMIIIAAAggggIy0fxP1TmetkbjZsnO7Oh9XAQgggAACCCBqkLZpnptbu1WDLVHHTdU1Fo4DBBBAAAEEkGjdkahNpuYsbGirJkBN1WtuNQEEEEAAAQSQtgNdha6qBpmqdzpXCHlD3QEIIIAAAgggl7Z5E4MhvX7s5nWAb3lgaHrxQEAAAQQQQAB5OZDEhk+1W7cNjKk5Jk9d4QQQQAABBBBALmrzJlbSmLrCnq5ZEvskgaKqlnElHRBAAAEEEEDG65HEyiedU0en1uytar8n3idxrAEBBBBAAAHEhcKSc++qg1K1LZ31y9RcmM5nsgMCCCCAAAIIIKvqms5nlyfOvdPt0G3btWJcAQIIIIAAAsj9Nci2c9fEjY7bnpw19XiFqfoREEAAAQQQQB4MJP0+U8vsbxvk6e9wsg9dSQcEEEAAAQSQKJDORwlUQXvqCiqb584AAggggAACCCDjQKpamp01yIYWd2et1HlcAAEEEEAAAQSQ8hpkqoWYnseRaJmmW+I3LiIHCCCAAAIIIJcCmTrP7zyvTq+UsmHt36ljAQgggAACCCCArJ0P0vmIgan3SXyHzVOVAQEEEEAAAeSFq7uLaPOKACICiAggIgKICCAigIgAIgKICCAigIgAIgKIiAAiAogIICKAiAAiAogIICKAiAAiAoiIACICiAggIun8ArtN7fn5ASugAAAAAElFTkSuQmCC",
          type: "image/png",
        },
        selectedChannel: "qrcode",
      },
      type: "app",
      key: "okta_verify",
      id: "autc4jtfmwtz7GVqM696",
      displayName: "Okta Verify",
      methods: [
        {
          type: "signed_nonce",
        },
      ],
    },
    poll: {
      required: true,
      refresh: 4000,
    },
  },
  interactionCode: undefined,
  actions: {
    cancel: async function (params) {
      const headers = {
        'content-type': 'application/json',
        'accept': actionDefinition.accepts || 'application/ion+json'
      };
      const body = (0, _stringify.default)({ ...defaultParamsForAction,
        ...params,
        ...immutableParamsForAction
      });
      const credentials = toPersist && toPersist.withCredentials === false ? 'omit' : 'include';
      return (0, _client.request)(target, {
        method: actionDefinition.method,
        headers,
        body,
        credentials
      }).then(response => {
        const respJson = response.json();

        if (response.ok) {
          return respJson;
        } else if (response.status === 401 && response.headers.get('WWW-Authenticate') === 'Oktadevicejwt realm="Okta Device"') {
          // Okta server responds 401 status code with WWW-Authenticate header and new remediation
          // so that the iOS/MacOS credential SSO extension (Okta Verify) can intercept
          // the response reaches here when Okta Verify is not installed
          // we need to return an idx object so that
          // the SIW can proceed to the next step without showing error
          return respJson.then(err => {
            let ms = (0, _makeIdxState.makeIdxState)(err, toPersist); // set to true if flow should be continued without showing any errors

            ms.stepUp = true;
            return _promise.default.reject(ms);
          });
        }

        return respJson.then(err => {
          return _promise.default.reject((0, _makeIdxState.makeIdxState)(err, toPersist));
        });
      }).then(idxResponse => (0, _makeIdxState.makeIdxState)(idxResponse, toPersist));
    },
  },
  context: {
    version: "1.0.0",
    stateHandle: "02MEfA-K8QF4TjDMsFkMvs7zz_Vmm7D6TYjTvK66Hw",
    expiresAt: "2022-02-18T20:08:18.000Z",
    intent: "LOGIN",
    currentAuthenticator: {
      type: "object",
      value: {
        contextualData: {
          qrcode: {
            method: "embedded",
            href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFnUlEQVR42u3dQZKjMAwF0Nz/0t2LWc8ibX1JhverepOaSQL4pZDA5vMjIv/Nxy4QAUQEEBFARAARAUQEEBFARAARAUREABEBRAQQEUBEABEBRAQQEUBEABEBREQAEQFEBBARQEQAEQHk3wd9PuV/337uyXf79j2r9s+323Wyr0628dvvkz7ugAACCCCAAPJCIIn3+XZgn/z7b7/PCYqqH4eqATn1YwIIIIAAAggggJSfo1btqE6kVTVRomap2rdVPyBTdR8ggAACCCCAAPLnwVnVQky3K6daymlQgAACCCCAAALII2uQqs9NtGrTrdeqWixR9wECCCCAAAIIIG3nvVMDPg1kw+BM1HQbjjsggAACCCCAALKqTer1/tfNBwHE64AA4nVArk6iLthwDp/4AUnvh+vHEiCAAAIIIIA8twY5aeemp+h2/qVbo5378xZ0gAACCCCAAHIRkEQdkfi/iffv3N70HQXpBe4AAQQQQAABBJBVtUnV+W0C2tQATs8lSd+o+dor6YAAAggggACypy5I10rpRzNUIUq3cKewAAIIIIAAAggg5W29qcXZ0oMkjaKqNum8+q8GAQQQQAABBJBom/f2miLxQ5HA2znIt0EABBBAAAEEkAfUIBt2+NRV420PwZxqI1vVBBBAAAEEEEBG2rzpqabpK+CJ99kwR2Zq8AMCCCCAAAIIIG01SOLfnxz0qgHT2abeXCsp0gEBBBBAAAGk/Dx2qiWbWLwuXYNsO8/vvDMBEEAAAQQQQF4OZGqHb6hB0i3ibfVdYi6MJ0wBAggggAACyEgrOA0kPWASbeptoKqOCyCAAAIIIIAA8ueBlGgVptuqVe9Z9SMw9eSsRI3pSjoggAACCCCAjLRS0y3fRE2RaBFvwDu1fi8ggAACCCCAvLzN23kzXuf01VuuIE8h7bwRFBBAAAEEEECs7t523ps+171l3d1t26UGAQQQQAABBJCReiRxbnxysKZqpc59uLkGBAQQQAABBBBA2s4/08vyb9iuqbsO0q1yNQgggAACCCCAjADZfJ6faGt33nxYBSG9kJ1bTQABBBBAAAGkbWBU1RHpVmrn4wmqvn+iVZ74XEAAAQQQQAABZOS8tHPuRqLtXLVvO1vKJ99t2xV2QAABBBBAALkISOdAmnroZAJaoiWb+KzNNx8CAggggAACyMOApFF0PkzzlkG1+dEMVjUBBBBAAAEEkBEUm1fhmPqrGngbarGTMQMIIIAAAggggIy0fxP1TmetkbjZsnO7Oh9XAQgggAACCCBqkLZpnptbu1WDLVHHTdU1Fo4DBBBAAAEEkGjdkahNpuYsbGirJkBN1WtuNQEEEEAAAQSQtgNdha6qBpmqdzpXCHlD3QEIIIAAAgggl7Z5E4MhvX7s5nWAb3lgaHrxQEAAAQQQQAB5OZDEhk+1W7cNjKk5Jk9d4QQQQAABBBBALmrzJlbSmLrCnq5ZEvskgaKqlnElHRBAAAEEEEDG65HEyiedU0en1uytar8n3idxrAEBBBBAAAHEhcKSc++qg1K1LZ31y9RcmM5nsgMCCCCAAAIIIKvqms5nlyfOvdPt0G3btWJcAQIIIIAAAsj9Nci2c9fEjY7bnpw19XiFqfoREEAAAQQQQB4MJP0+U8vsbxvk6e9wsg9dSQcEEEAAAQSQKJDORwlUQXvqCiqb584AAggggAACCCDjQKpamp01yIYWd2et1HlcAAEEEEAAAQSQ8hpkqoWYnseRaJmmW+I3LiIHCCCAAAIIIJcCmTrP7zyvTq+UsmHt36ljAQgggAACCCCArJ0P0vmIgan3SXyHzVOVAQEEEEAAAeSFq7uLaPOKACICiAggIgKICCAigIgAIgKICCAigIgAIgKIiAAiAogIICKAiAAiAogIICKAiAAiAoiIACICiAggIun8ArtN7fn5ASugAAAAAElFTkSuQmCC",
            type: "image/png",
          },
          selectedChannel: "qrcode",
        },
        type: "app",
        key: "okta_verify",
        id: "autc4jtfmwtz7GVqM696",
        displayName: "Okta Verify",
        methods: [
          {
            type: "signed_nonce",
          },
        ],
      },
    },
    authenticators: {
      type: "array",
      value: [
        {
          type: "app",
          key: "google_otp",
          id: "autc4m1ze3b3RW3hl696",
          displayName: "Google Authenticator",
          methods: [
            {
              type: "otp",
            },
          ],
        },
        {
          type: "app",
          key: "okta_verify",
          id: "autc4jtfmwtz7GVqM696",
          displayName: "Okta Verify",
          methods: [
            {
              type: "push",
            },
            {
              type: "signed_nonce",
            },
            {
              type: "totp",
            },
          ],
        },
        {
          type: "security_key",
          key: "webauthn",
          id: "autc4m63eWYtQ0x3c696",
          displayName: "Security Key or Biometric",
          methods: [
            {
              type: "webauthn",
            },
          ],
        },
      ],
    },
    authenticatorEnrollments: {
      type: "array",
      value: [
        {
          type: "email",
          key: "okta_email",
          id: "eaegwpl7zBuKFeEkN696",
          displayName: "Email",
          methods: [
            {
              type: "email",
            },
          ],
        },
        {
          type: "password",
          key: "okta_password",
          id: "lae1piwpuRpQRA1z7696",
          displayName: "Password",
          methods: [
            {
              type: "password",
            },
          ],
        },
      ],
    },
    enrollmentAuthenticator: {
      type: "object",
      value: {
        type: "app",
        key: "okta_verify",
        id: "autc4jtfmwtz7GVqM696",
        displayName: "Okta Verify",
        methods: [
          {
            type: "signed_nonce",
          },
        ],
      },
    },
    user: {
      type: "object",
      value: {
        id: "00ugwpl7ubRby1KKO696",
        identifier: "robnicolo+oie-ciam2022-13@gmail.com",
        profile: {
          firstName: "John",
          lastName: "Doe 13",
          timeZone: "America/Los_Angeles",
          locale: "en_US",
        },
      },
    },
    app: {
      type: "object",
      value: {
        name: "oidc_client",
        label: "Express AuthJS Web App",
        id: "0oac4jylqmEmVykvE696",
      },
    },
  },
  neededToProceed: [
    {
      rel: [
        "create-form",
      ],
      name: "enroll-poll",
      href: "https://rnicolo-test.okta.com/idp/idx/challenge/poll",
      method: "POST",
      produces: "application/ion+json; okta-version=1.0.0",
      refresh: 4000,
      value: [
        {
          name: "stateHandle",
          required: true,
          value: "02MEfA-K8QF4TjDMsFkMvs7zz_Vmm7D6TYjTvK66Hw",
          visible: false,
          mutable: false,
        },
      ],
      accepts: "application/json; okta-version=1.0.0",
      action: async function (params) {
        const headers = {
          'content-type': 'application/json',
          'accept': actionDefinition.accepts || 'application/ion+json'
        };
        const body = (0, _stringify.default)({ ...defaultParamsForAction,
          ...params,
          ...immutableParamsForAction
        });
        const credentials = toPersist && toPersist.withCredentials === false ? 'omit' : 'include';
        return (0, _client.request)(target, {
          method: actionDefinition.method,
          headers,
          body,
          credentials
        }).then(response => {
          const respJson = response.json();

          if (response.ok) {
            return respJson;
          } else if (response.status === 401 && response.headers.get('WWW-Authenticate') === 'Oktadevicejwt realm="Okta Device"') {
            // Okta server responds 401 status code with WWW-Authenticate header and new remediation
            // so that the iOS/MacOS credential SSO extension (Okta Verify) can intercept
            // the response reaches here when Okta Verify is not installed
            // we need to return an idx object so that
            // the SIW can proceed to the next step without showing error
            return respJson.then(err => {
              let ms = (0, _makeIdxState.makeIdxState)(err, toPersist); // set to true if flow should be continued without showing any errors

              ms.stepUp = true;
              return _promise.default.reject(ms);
            });
          }

          return respJson.then(err => {
            return _promise.default.reject((0, _makeIdxState.makeIdxState)(err, toPersist));
          });
        }).then(idxResponse => (0, _makeIdxState.makeIdxState)(idxResponse, toPersist));
      },
    },
    {
      rel: [
        "create-form",
      ],
      name: "select-enrollment-channel",
      href: "https://rnicolo-test.okta.com/idp/idx/credential/enroll",
      method: "POST",
      produces: "application/ion+json; okta-version=1.0.0",
      value: [
        {
          name: "authenticator",
          type: "object",
          label: "Okta Verify",
          value: {
            form: {
              value: [
                {
                  name: "id",
                  required: true,
                  value: "autc4jtfmwtz7GVqM696",
                  mutable: false,
                },
                {
                  name: "channel",
                  type: "string",
                  required: false,
                  options: [
                    {
                      label: "QRCODE",
                      value: "qrcode",
                    },
                    {
                      label: "EMAIL",
                      value: "email",
                    },
                    {
                      label: "SMS",
                      value: "sms",
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          name: "stateHandle",
          required: true,
          value: "02MEfA-K8QF4TjDMsFkMvs7zz_Vmm7D6TYjTvK66Hw",
          visible: false,
          mutable: false,
        },
      ],
      accepts: "application/json; okta-version=1.0.0",
      action: async function (params) {
        const headers = {
          'content-type': 'application/json',
          'accept': actionDefinition.accepts || 'application/ion+json'
        };
        const body = (0, _stringify.default)({ ...defaultParamsForAction,
          ...params,
          ...immutableParamsForAction
        });
        const credentials = toPersist && toPersist.withCredentials === false ? 'omit' : 'include';
        return (0, _client.request)(target, {
          method: actionDefinition.method,
          headers,
          body,
          credentials
        }).then(response => {
          const respJson = response.json();

          if (response.ok) {
            return respJson;
          } else if (response.status === 401 && response.headers.get('WWW-Authenticate') === 'Oktadevicejwt realm="Okta Device"') {
            // Okta server responds 401 status code with WWW-Authenticate header and new remediation
            // so that the iOS/MacOS credential SSO extension (Okta Verify) can intercept
            // the response reaches here when Okta Verify is not installed
            // we need to return an idx object so that
            // the SIW can proceed to the next step without showing error
            return respJson.then(err => {
              let ms = (0, _makeIdxState.makeIdxState)(err, toPersist); // set to true if flow should be continued without showing any errors

              ms.stepUp = true;
              return _promise.default.reject(ms);
            });
          }

          return respJson.then(err => {
            return _promise.default.reject((0, _makeIdxState.makeIdxState)(err, toPersist));
          });
        }).then(idxResponse => (0, _makeIdxState.makeIdxState)(idxResponse, toPersist));
      },
    },
    {
      rel: [
        "create-form",
      ],
      name: "select-authenticator-enroll",
      href: "https://rnicolo-test.okta.com/idp/idx/credential/enroll",
      method: "POST",
      produces: "application/ion+json; okta-version=1.0.0",
      value: [
        {
          name: "authenticator",
          type: "object",
          options: [
            {
              label: "Google Authenticator",
              value: {
                form: {
                  value: [
                    {
                      name: "id",
                      required: true,
                      value: "autc4m1ze3b3RW3hl696",
                      mutable: false,
                    },
                    {
                      name: "methodType",
                      required: false,
                      value: "otp",
                      mutable: false,
                    },
                  ],
                },
              },
              relatesTo: {
                type: "app",
                key: "google_otp",
                id: "autc4m1ze3b3RW3hl696",
                displayName: "Google Authenticator",
                methods: [
                  {
                    type: "otp",
                  },
                ],
              },
            },
            {
              label: "Okta Verify",
              value: {
                form: {
                  value: [
                    {
                      name: "id",
                      required: true,
                      value: "autc4jtfmwtz7GVqM696",
                      mutable: false,
                    },
                    {
                      name: "channel",
                      type: "string",
                      required: false,
                      options: [
                        {
                          label: "QRCODE",
                          value: "qrcode",
                        },
                        {
                          label: "EMAIL",
                          value: "email",
                        },
                        {
                          label: "SMS",
                          value: "sms",
                        },
                      ],
                    },
                  ],
                },
              },
              relatesTo: {
                type: "app",
                key: "okta_verify",
                id: "autc4jtfmwtz7GVqM696",
                displayName: "Okta Verify",
                methods: [
                  {
                    type: "push",
                  },
                  {
                    type: "signed_nonce",
                  },
                  {
                    type: "totp",
                  },
                ],
              },
            },
            {
              label: "Security Key or Biometric",
              value: {
                form: {
                  value: [
                    {
                      name: "id",
                      required: true,
                      value: "autc4m63eWYtQ0x3c696",
                      mutable: false,
                    },
                    {
                      name: "methodType",
                      required: false,
                      value: "webauthn",
                      mutable: false,
                    },
                  ],
                },
              },
              relatesTo: {
                type: "security_key",
                key: "webauthn",
                id: "autc4m63eWYtQ0x3c696",
                displayName: "Security Key or Biometric",
                methods: [
                  {
                    type: "webauthn",
                  },
                ],
              },
            },
          ],
        },
        {
          name: "stateHandle",
          required: true,
          value: "02MEfA-K8QF4TjDMsFkMvs7zz_Vmm7D6TYjTvK66Hw",
          visible: false,
          mutable: false,
        },
      ],
      accepts: "application/json; okta-version=1.0.0",
      action: async function (params) {
        const headers = {
          'content-type': 'application/json',
          'accept': actionDefinition.accepts || 'application/ion+json'
        };
        const body = (0, _stringify.default)({ ...defaultParamsForAction,
          ...params,
          ...immutableParamsForAction
        });
        const credentials = toPersist && toPersist.withCredentials === false ? 'omit' : 'include';
        return (0, _client.request)(target, {
          method: actionDefinition.method,
          headers,
          body,
          credentials
        }).then(response => {
          const respJson = response.json();

          if (response.ok) {
            return respJson;
          } else if (response.status === 401 && response.headers.get('WWW-Authenticate') === 'Oktadevicejwt realm="Okta Device"') {
            // Okta server responds 401 status code with WWW-Authenticate header and new remediation
            // so that the iOS/MacOS credential SSO extension (Okta Verify) can intercept
            // the response reaches here when Okta Verify is not installed
            // we need to return an idx object so that
            // the SIW can proceed to the next step without showing error
            return respJson.then(err => {
              let ms = (0, _makeIdxState.makeIdxState)(err, toPersist); // set to true if flow should be continued without showing any errors

              ms.stepUp = true;
              return _promise.default.reject(ms);
            });
          }

          return respJson.then(err => {
            return _promise.default.reject((0, _makeIdxState.makeIdxState)(err, toPersist));
          });
        }).then(idxResponse => (0, _makeIdxState.makeIdxState)(idxResponse, toPersist));
      },
    },
  ],
  proceed: async function (remediationChoice, paramsFromUser = {}) {
    /*
    remediationChoice is the name attribute on each form
    name should remain unique for items inside the remediation that are considered forms(identify, select-factor)
    name can be duplicate for items like redirect where its not considered a form(redirect)
    when names are not unique its a redirect to a href, so widget wont POST to idx-js layer.
    */
    const remediationChoiceObject = (0, _find.default)(remediations).call(remediations, remediation => remediation.name === remediationChoice);

    if (!remediationChoiceObject) {
      return _promise.default.reject(`Unknown remediation choice: [${remediationChoice}]`);
    }

    return remediationChoiceObject.action(paramsFromUser);
  },
  rawIdxState: {
    version: "1.0.0",
    stateHandle: "02MEfA-K8QF4TjDMsFkMvs7zz_Vmm7D6TYjTvK66Hw",
    expiresAt: "2022-02-18T20:08:18.000Z",
    intent: "LOGIN",
    remediation: {
      type: "array",
      value: [
        {
          rel: [
            "create-form",
          ],
          name: "enroll-poll",
          href: "https://rnicolo-test.okta.com/idp/idx/challenge/poll",
          method: "POST",
          produces: "application/ion+json; okta-version=1.0.0",
          refresh: 4000,
          value: [
            {
              name: "stateHandle",
              required: true,
              value: "02MEfA-K8QF4TjDMsFkMvs7zz_Vmm7D6TYjTvK66Hw",
              visible: false,
              mutable: false,
            },
          ],
          accepts: "application/json; okta-version=1.0.0",
        },
        {
          rel: [
            "create-form",
          ],
          name: "select-enrollment-channel",
          href: "https://rnicolo-test.okta.com/idp/idx/credential/enroll",
          method: "POST",
          produces: "application/ion+json; okta-version=1.0.0",
          value: [
            {
              name: "authenticator",
              type: "object",
              label: "Okta Verify",
              value: {
                form: {
                  value: [
                    {
                      name: "id",
                      required: true,
                      value: "autc4jtfmwtz7GVqM696",
                      mutable: false,
                    },
                    {
                      name: "channel",
                      type: "string",
                      required: false,
                      options: [
                        {
                          label: "QRCODE",
                          value: "qrcode",
                        },
                        {
                          label: "EMAIL",
                          value: "email",
                        },
                        {
                          label: "SMS",
                          value: "sms",
                        },
                      ],
                    },
                  ],
                },
              },
            },
            {
              name: "stateHandle",
              required: true,
              value: "02MEfA-K8QF4TjDMsFkMvs7zz_Vmm7D6TYjTvK66Hw",
              visible: false,
              mutable: false,
            },
          ],
          accepts: "application/json; okta-version=1.0.0",
        },
        {
          rel: [
            "create-form",
          ],
          name: "select-authenticator-enroll",
          href: "https://rnicolo-test.okta.com/idp/idx/credential/enroll",
          method: "POST",
          produces: "application/ion+json; okta-version=1.0.0",
          value: [
            {
              name: "authenticator",
              type: "object",
              options: [
                {
                  label: "Google Authenticator",
                  value: {
                    form: {
                      value: [
                        {
                          name: "id",
                          required: true,
                          value: "autc4m1ze3b3RW3hl696",
                          mutable: false,
                        },
                        {
                          name: "methodType",
                          required: false,
                          value: "otp",
                          mutable: false,
                        },
                      ],
                    },
                  },
                  relatesTo: {
                    type: "app",
                    key: "google_otp",
                    id: "autc4m1ze3b3RW3hl696",
                    displayName: "Google Authenticator",
                    methods: [
                      {
                        type: "otp",
                      },
                    ],
                  },
                },
                {
                  label: "Okta Verify",
                  value: {
                    form: {
                      value: [
                        {
                          name: "id",
                          required: true,
                          value: "autc4jtfmwtz7GVqM696",
                          mutable: false,
                        },
                        {
                          name: "channel",
                          type: "string",
                          required: false,
                          options: [
                            {
                              label: "QRCODE",
                              value: "qrcode",
                            },
                            {
                              label: "EMAIL",
                              value: "email",
                            },
                            {
                              label: "SMS",
                              value: "sms",
                            },
                          ],
                        },
                      ],
                    },
                  },
                  relatesTo: {
                    type: "app",
                    key: "okta_verify",
                    id: "autc4jtfmwtz7GVqM696",
                    displayName: "Okta Verify",
                    methods: [
                      {
                        type: "push",
                      },
                      {
                        type: "signed_nonce",
                      },
                      {
                        type: "totp",
                      },
                    ],
                  },
                },
                {
                  label: "Security Key or Biometric",
                  value: {
                    form: {
                      value: [
                        {
                          name: "id",
                          required: true,
                          value: "autc4m63eWYtQ0x3c696",
                          mutable: false,
                        },
                        {
                          name: "methodType",
                          required: false,
                          value: "webauthn",
                          mutable: false,
                        },
                      ],
                    },
                  },
                  relatesTo: {
                    type: "security_key",
                    key: "webauthn",
                    id: "autc4m63eWYtQ0x3c696",
                    displayName: "Security Key or Biometric",
                    methods: [
                      {
                        type: "webauthn",
                      },
                    ],
                  },
                },
              ],
            },
            {
              name: "stateHandle",
              required: true,
              value: "02MEfA-K8QF4TjDMsFkMvs7zz_Vmm7D6TYjTvK66Hw",
              visible: false,
              mutable: false,
            },
          ],
          accepts: "application/json; okta-version=1.0.0",
        },
      ],
    },
    currentAuthenticator: {
      type: "object",
      value: {
        contextualData: {
          qrcode: {
            method: "embedded",
            href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFnUlEQVR42u3dQZKjMAwF0Nz/0t2LWc8ibX1JhverepOaSQL4pZDA5vMjIv/Nxy4QAUQEEBFARAARAUQEEBFARAARAUREABEBRAQQEUBEABEBRAQQEUBEABEBREQAEQFEBBARQEQAEQHk3wd9PuV/337uyXf79j2r9s+323Wyr0628dvvkz7ugAACCCCAAPJCIIn3+XZgn/z7b7/PCYqqH4eqATn1YwIIIIAAAggggJSfo1btqE6kVTVRomap2rdVPyBTdR8ggAACCCCAAPLnwVnVQky3K6daymlQgAACCCCAAALII2uQqs9NtGrTrdeqWixR9wECCCCAAAIIIG3nvVMDPg1kw+BM1HQbjjsggAACCCCAALKqTer1/tfNBwHE64AA4nVArk6iLthwDp/4AUnvh+vHEiCAAAIIIIA8twY5aeemp+h2/qVbo5378xZ0gAACCCCAAHIRkEQdkfi/iffv3N70HQXpBe4AAQQQQAABBJBVtUnV+W0C2tQATs8lSd+o+dor6YAAAggggACypy5I10rpRzNUIUq3cKewAAIIIIAAAggg5W29qcXZ0oMkjaKqNum8+q8GAQQQQAABBJBom/f2miLxQ5HA2znIt0EABBBAAAEEkAfUIBt2+NRV420PwZxqI1vVBBBAAAEEEEBG2rzpqabpK+CJ99kwR2Zq8AMCCCCAAAIIIG01SOLfnxz0qgHT2abeXCsp0gEBBBBAAAGk/Dx2qiWbWLwuXYNsO8/vvDMBEEAAAQQQQF4OZGqHb6hB0i3ibfVdYi6MJ0wBAggggAACyEgrOA0kPWASbeptoKqOCyCAAAIIIIAA8ueBlGgVptuqVe9Z9SMw9eSsRI3pSjoggAACCCCAjLRS0y3fRE2RaBFvwDu1fi8ggAACCCCAvLzN23kzXuf01VuuIE8h7bwRFBBAAAEEEECs7t523ps+171l3d1t26UGAQQQQAABBJCReiRxbnxysKZqpc59uLkGBAQQQAABBBBA2s4/08vyb9iuqbsO0q1yNQgggAACCCCAjADZfJ6faGt33nxYBSG9kJ1bTQABBBBAAAGkbWBU1RHpVmrn4wmqvn+iVZ74XEAAAQQQQAABZOS8tHPuRqLtXLVvO1vKJ99t2xV2QAABBBBAALkISOdAmnroZAJaoiWb+KzNNx8CAggggAACyMOApFF0PkzzlkG1+dEMVjUBBBBAAAEEkBEUm1fhmPqrGngbarGTMQMIIIAAAggggIy0fxP1TmetkbjZsnO7Oh9XAQgggAACCCBqkLZpnptbu1WDLVHHTdU1Fo4DBBBAAAEEkGjdkahNpuYsbGirJkBN1WtuNQEEEEAAAQSQtgNdha6qBpmqdzpXCHlD3QEIIIAAAgggl7Z5E4MhvX7s5nWAb3lgaHrxQEAAAQQQQAB5OZDEhk+1W7cNjKk5Jk9d4QQQQAABBBBALmrzJlbSmLrCnq5ZEvskgaKqlnElHRBAAAEEEEDG65HEyiedU0en1uytar8n3idxrAEBBBBAAAHEhcKSc++qg1K1LZ31y9RcmM5nsgMCCCCAAAIIIKvqms5nlyfOvdPt0G3btWJcAQIIIIAAAsj9Nci2c9fEjY7bnpw19XiFqfoREEAAAQQQQB4MJP0+U8vsbxvk6e9wsg9dSQcEEEAAAQSQKJDORwlUQXvqCiqb584AAggggAACCCDjQKpamp01yIYWd2et1HlcAAEEEEAAAQSQ8hpkqoWYnseRaJmmW+I3LiIHCCCAAAIIIJcCmTrP7zyvTq+UsmHt36ljAQgggAACCCCArJ0P0vmIgan3SXyHzVOVAQEEEEAAAeSFq7uLaPOKACICiAggIgKICCAigIgAIgKICCAigIgAIgKIiAAiAogIICKAiAAiAogIICKAiAAiAoiIACICiAggIun8ArtN7fn5ASugAAAAAElFTkSuQmCC",
            type: "image/png",
          },
          selectedChannel: "qrcode",
        },
        type: "app",
        key: "okta_verify",
        id: "autc4jtfmwtz7GVqM696",
        displayName: "Okta Verify",
        methods: [
          {
            type: "signed_nonce",
          },
        ],
      },
    },
    authenticators: {
      type: "array",
      value: [
        {
          type: "app",
          key: "google_otp",
          id: "autc4m1ze3b3RW3hl696",
          displayName: "Google Authenticator",
          methods: [
            {
              type: "otp",
            },
          ],
        },
        {
          type: "app",
          key: "okta_verify",
          id: "autc4jtfmwtz7GVqM696",
          displayName: "Okta Verify",
          methods: [
            {
              type: "push",
            },
            {
              type: "signed_nonce",
            },
            {
              type: "totp",
            },
          ],
        },
        {
          type: "security_key",
          key: "webauthn",
          id: "autc4m63eWYtQ0x3c696",
          displayName: "Security Key or Biometric",
          methods: [
            {
              type: "webauthn",
            },
          ],
        },
      ],
    },
    authenticatorEnrollments: {
      type: "array",
      value: [
        {
          type: "email",
          key: "okta_email",
          id: "eaegwpl7zBuKFeEkN696",
          displayName: "Email",
          methods: [
            {
              type: "email",
            },
          ],
        },
        {
          type: "password",
          key: "okta_password",
          id: "lae1piwpuRpQRA1z7696",
          displayName: "Password",
          methods: [
            {
              type: "password",
            },
          ],
        },
      ],
    },
    enrollmentAuthenticator: {
      type: "object",
      value: {
        type: "app",
        key: "okta_verify",
        id: "autc4jtfmwtz7GVqM696",
        displayName: "Okta Verify",
        methods: [
          {
            type: "signed_nonce",
          },
        ],
      },
    },
    user: {
      type: "object",
      value: {
        id: "00ugwpl7ubRby1KKO696",
        identifier: "robnicolo+oie-ciam2022-13@gmail.com",
        profile: {
          firstName: "John",
          lastName: "Doe 13",
          timeZone: "America/Los_Angeles",
          locale: "en_US",
        },
      },
    },
    cancel: {
      rel: [
        "create-form",
      ],
      name: "cancel",
      href: "https://rnicolo-test.okta.com/idp/idx/cancel",
      method: "POST",
      produces: "application/ion+json; okta-version=1.0.0",
      value: [
        {
          name: "stateHandle",
          required: true,
          value: "02MEfA-K8QF4TjDMsFkMvs7zz_Vmm7D6TYjTvK66Hw",
          visible: false,
          mutable: false,
        },
      ],
      accepts: "application/json; okta-version=1.0.0",
    },
    app: {
      type: "object",
      value: {
        name: "oidc_client",
        label: "Express AuthJS Web App",
        id: "0oac4jylqmEmVykvE696",
      },
    },
  },
}

```






---- RAW NOTES


4. Show QR COde or enroll a different waY

Backend call from website poll - code that get's called

```javascript
router.post('/poll-authenticator/:authenticator', async (req, res) => {
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.poll();
  handleTransactionWithoutRedirect({ req, res, authClient, transaction });
});
```

Waiting

it goes to

```javascript
    case 'enroll-poll':
      nextRoute = `/enroll-authenticator/${key}/poll`;
      break;
```
next route: "/enroll-authenticator/okta_verify/poll"

Sends back to client
```javascript
      sendJson(req, res, {
        ...transaction.nextStep,
        nextRoute: appendTransactionIdToPath(
          getNextRouteFromTransaction(transaction),
          transactionId),
      });
```


```json
{
  status: "PENDING",
  meta: {
    issuer: "https://rnicolo-test.okta.com/oauth2/default",
    urls: {
      issuer: "https://rnicolo-test.okta.com/oauth2/default",
      authorizeUrl: "https://rnicolo-test.okta.com/oauth2/default/v1/authorize",
      userinfoUrl: "https://rnicolo-test.okta.com/oauth2/default/v1/userinfo",
      tokenUrl: "https://rnicolo-test.okta.com/oauth2/default/v1/token",
      revokeUrl: "https://rnicolo-test.okta.com/oauth2/default/v1/revoke",
      logoutUrl: "https://rnicolo-test.okta.com/oauth2/default/v1/logout",
    },
    clientId: "0oac4jylqmEmVykvE696",
    redirectUri: "http://localhost:8080/login/callback",
    responseType: "code",
    scopes: [
      "openid",
      "profile",
      "email",
    ],
    state: "4e0fa9811fc00be1fa9a77dd9bc21436",
    nonce: "ZZaG0UxZP9sx0xOUO4GyLk3XWI3Mj97rZF90hleXk2a3iRie0nhHifljFfHHE1Zx",
    ignoreSignature: false,
    codeVerifier: "aa518b8e9389e18080d0d34bd9afdee09b208b761b8",
    codeChallengeMethod: "S256",
    codeChallenge: "8osLDAqxhmJkBjLbX5jZSFXjBUCRRummig7-wkAv8n0",
    flow: "authenticate",
    withCredentials: true,
    interactionHandle: "1r3yEUTvBQ6KXtnRnoJ-1PVhzXIYWGPKyIoxmulx8S4",
    "okta-idx-response-storage": "{\"version\":\"1.0.0\",\"stateHandle\":\"02qyGmx5Moe7NWw4OnQ0QRzD-GJ6ES3eQ2YnaX-BEH\",\"expiresAt\":\"2022-02-17T20:30:13.000Z\",\"intent\":\"LOGIN\",\"remediation\":{\"type\":\"array\",\"value\":[{\"rel\":[\"create-form\"],\"name\":\"enroll-poll\",\"href\":\"https://rnicolo-test.okta.com/idp/idx/challenge/poll\",\"method\":\"POST\",\"produces\":\"application/ion+json; okta-version=1.0.0\",\"refresh\":4000,\"value\":[{\"name\":\"stateHandle\",\"required\":true,\"value\":\"02qyGmx5Moe7NWw4OnQ0QRzD-GJ6ES3eQ2YnaX-BEH\",\"visible\":false,\"mutable\":false}],\"accepts\":\"application/json; okta-version=1.0.0\"},{\"rel\":[\"create-form\"],\"name\":\"select-enrollment-channel\",\"href\":\"https://rnicolo-test.okta.com/idp/idx/credential/enroll\",\"method\":\"POST\",\"produces\":\"application/ion+json; okta-version=1.0.0\",\"value\":[{\"name\":\"authenticator\",\"type\":\"object\",\"label\":\"Okta Verify\",\"value\":{\"form\":{\"value\":[{\"name\":\"id\",\"required\":true,\"value\":\"autc4jtfmwtz7GVqM696\",\"mutable\":false},{\"name\":\"channel\",\"type\":\"string\",\"required\":false,\"options\":[{\"label\":\"QRCODE\",\"value\":\"qrcode\"},{\"label\":\"EMAIL\",\"value\":\"email\"},{\"label\":\"SMS\",\"value\":\"sms\"}]}]}}},{\"name\":\"stateHandle\",\"required\":true,\"value\":\"02qyGmx5Moe7NWw4OnQ0QRzD-GJ6ES3eQ2YnaX-BEH\",\"visible\":false,\"mutable\":false}],\"accepts\":\"application/json; okta-version=1.0.0\"},{\"rel\":[\"create-form\"],\"name\":\"select-authenticator-enroll\",\"href\":\"https://rnicolo-test.okta.com/idp/idx/credential/enroll\",\"method\":\"POST\",\"produces\":\"application/ion+json; okta-version=1.0.0\",\"value\":[{\"name\":\"authenticator\",\"type\":\"object\",\"options\":[{\"label\":\"Google Authenticator\",\"value\":{\"form\":{\"value\":[{\"name\":\"id\",\"required\":true,\"value\":\"autc4m1ze3b3RW3hl696\",\"mutable\":false},{\"name\":\"methodType\",\"required\":false,\"value\":\"otp\",\"mutable\":false}]}},\"relatesTo\":{\"type\":\"app\",\"key\":\"google_otp\",\"id\":\"autc4m1ze3b3RW3hl696\",\"displayName\":\"Google Authenticator\",\"methods\":[{\"type\":\"otp\"}]}},{\"label\":\"Okta Verify\",\"value\":{\"form\":{\"value\":[{\"name\":\"id\",\"required\":true,\"value\":\"autc4jtfmwtz7GVqM696\",\"mutable\":false},{\"name\":\"channel\",\"type\":\"string\",\"required\":false,\"options\":[{\"label\":\"QRCODE\",\"value\":\"qrcode\"},{\"label\":\"EMAIL\",\"value\":\"email\"},{\"label\":\"SMS\",\"value\":\"sms\"}]}]}},\"relatesTo\":{\"type\":\"app\",\"key\":\"okta_verify\",\"id\":\"autc4jtfmwtz7GVqM696\",\"displayName\":\"Okta Verify\",\"methods\":[{\"type\":\"push\"},{\"type\":\"signed_nonce\"},{\"type\":\"totp\"}]}},{\"label\":\"Security Key or Biometric\",\"value\":{\"form\":{\"value\":[{\"name\":\"id\",\"required\":true,\"value\":\"autc4m63eWYtQ0x3c696\",\"mutable\":false},{\"name\":\"methodType\",\"required\":false,\"value\":\"webauthn\",\"mutable\":false}]}},\"relatesTo\":{\"type\":\"security_key\",\"key\":\"webauthn\",\"id\":\"autc4m63eWYtQ0x3c696\",\"displayName\":\"Security Key or Biometric\",\"methods\":[{\"type\":\"webauthn\"}]}}]},{\"name\":\"stateHandle\",\"required\":true,\"value\":\"02qyGmx5Moe7NWw4OnQ0QRzD-GJ6ES3eQ2YnaX-BEH\",\"visible\":false,\"mutable\":false}],\"accepts\":\"application/json; okta-version=1.0.0\"}]},\"currentAuthenticator\":{\"type\":\"object\",\"value\":{\"contextualData\":{\"qrcode\":{\"method\":\"embedded\",\"href\":\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFnElEQVR42u3dQY7bMAwF0Nz/0u1i1l1MxU9S0ftANwGacRy9QKRt6fNHRP6Zj1MgAogIICKAiAAiAogIICKAiAAiAoiIACICiAggIoCIACICiAggIoCIACICiIgAIgKICCAigIgAIgLIzx/6fMr//fbvnhzPb9+z6pxUfa6T76vzPFd974AAAggggADyIJDE+5wMsJP3TH+hVT8OVQOy6sdkavwAAggggAACyCNApk54+rN0ftGJH4QqvLd/74AAAggggADyOJBEO7ezXdnZ0uwEBQgggAACCCCAfGUNkm7PVrVGO684V53DF2pPQAABBBBAALkUSLrFWjXfrsKVAJ5uw07hAgQQQAABBBBA/nuunmiTen3n654HAcTrgADidUCuTmKevPmx3PRV78TnumYsAQIIIIAAAsj31iAn71M1yDf86/yhqKo1OlvKgAACCCCAAPI4kKoTfvK3EleoE6ujJH58ToAkahZAAAEEEEAAAWQETnpunBgwnTVRVU2RbvOmzz8ggAACCCCAPAikc36bfs9EG7bzps0Ni7xNPVcCCCCAAAIIIA8C2fwYaWdrN10XdN5FkPjRAAQQQAABBBBAoq28dE2x4Xiq6pd0S3wDLkAAAQQQQAB5EEjnDYeJuiMx/686D9vO57a6BhBAAAEEEEC0eUd2Wdo8aBPHvHmLh6ofWEAAAQQQQAB5BMgUnPRNett2jErXFOnHY11JBwQQQAABBJDyD57ej7vqeKoGRuc6vZ3z/M47EwABBBBAAAHkcSDpFmICZtUA2LDCSVX7t3PxPUU6IIAAAggggLRhSdcgne+fPrZtoKrqSkAAAQQQQAABpGQe3jn/T7emO3eSmrpDoPMSACCAAAIIIIAA0jZgqubqVXPj9B7r2/BOrd8LCCCAAAIIII+3eTfMjRMYb7mCPIU0fdcEIIAAAggggOhijcx7EzVFYu7dWb901hRqEEAAAQQQQAAZAZJ4PX1snZtvdp7bDZuKbggggAACCCCAPAKkc5B31i/ptnD60Vo1CCCAAAIIIICMAKk6+elVStJf1oZ5/oY93zsfEwYEEEAAAQQQq7tftzd35+CsqilOfhymrqQDAggggAACCCBRIFO7L3WuppI4t50t5ZNj23aFHRBAAAEEEEAuAlI1x07Pvada1om/VVU3JWBuDiCAAAIIIIAsB5IYbFUDPr1TUme7u7M9O7W5KiCAAAIIIIAAMnJC0uvrJtqknc+/bKjFqs45IIAAAggggADStrvTVK0x9WxL+op5+v8CAggggAACCCDRdm5nC7ez1Tx1hf2WusbCcYAAAggggAASrUcSA3hqUbXE/00fQ9WV8c13FwACCCCAAALIFwPpxJI4nkS7csOzJOlW+S11ByCAAAIIIIBcBGTbKiI37sPeOWi37aX+7PMggAACCCCAAJJrLSYGSeKEp1ugVed5250AahBAAAEEEEAAGWntbtvhaEPNMrWwXuedDG41AQQQQAABBJCRemTbI7SJ2mSqJZvGeMuVd0AAAQQQQAB5pM3buX7vhjolvQ3B1AotdpgCBBBAAAEEkDuueDa2f6uOoeqHZepZj6nHfgEBBBBAAAEEkKvnrp17o6cHYedxdraXAQEEEEAAAQSQr1x1pKo1na5r0lex01fGAQEEEEAAAQSQ8jZs5/uc1E3pmqtznr/t2RlAAAEEEEAAAWQcSFVLc8Nn7Gxxd9ZKnd8LIIAAAggggADSdoU33XLs3Hlq6lHlqVY/IIAAAggggACyap6/YV5dBWSqfZq+aXMbLkAAAQQQQAC5CMi250G2LfufXpkk0YadWgcYEEAAAQQQQB4HInJjABEBRAQQEUBEABEBRAQQEUBEABEBREQAEQFEBBARQEQAEQFEBBARQEQAEQFERAARAUQEEBFARAARAUTk3vwF2J24L2lCmBAAAAAASUVORK5CYII=\",\"type\":\"image/png\"},\"selectedChannel\":\"qrcode\"},\"type\":\"app\",\"key\":\"okta_verify\",\"id\":\"autc4jtfmwtz7GVqM696\",\"displayName\":\"Okta Verify\",\"methods\":[{\"type\":\"signed_nonce\"}]}},\"authenticators\":{\"type\":\"array\",\"value\":[{\"type\":\"app\",\"key\":\"google_otp\",\"id\":\"autc4m1ze3b3RW3hl696\",\"displayName\":\"Google Authenticator\",\"methods\":[{\"type\":\"otp\"}]},{\"type\":\"app\",\"key\":\"okta_verify\",\"id\":\"autc4jtfmwtz7GVqM696\",\"displayName\":\"Okta Verify\",\"methods\":[{\"type\":\"push\"},{\"type\":\"signed_nonce\"},{\"type\":\"totp\"}]},{\"type\":\"security_key\",\"key\":\"webauthn\",\"id\":\"autc4m63eWYtQ0x3c696\",\"displayName\":\"Security Key or Biometric\",\"methods\":[{\"type\":\"webauthn\"}]}]},\"authenticatorEnrollments\":{\"type\":\"array\",\"value\":[{\"type\":\"email\",\"key\":\"okta_email\",\"id\":\"eaegwpl7zBuKFeEkN696\",\"displayName\":\"Email\",\"methods\":[{\"type\":\"email\"}]},{\"type\":\"password\",\"key\":\"okta_password\",\"id\":\"lae1piwpuRpQRA1z7696\",\"displayName\":\"Password\",\"methods\":[{\"type\":\"password\"}]}]},\"enrollmentAuthenticator\":{\"type\":\"object\",\"value\":{\"type\":\"app\",\"key\":\"okta_verify\",\"id\":\"autc4jtfmwtz7GVqM696\",\"displayName\":\"Okta Verify\",\"methods\":[{\"type\":\"signed_nonce\"}]}},\"user\":{\"type\":\"object\",\"value\":{\"id\":\"00ugwpl7ubRby1KKO696\",\"identifier\":\"robnicolo+oie-ciam2022-13@gmail.com\",\"profile\":{\"firstName\":\"John\",\"lastName\":\"Doe 13\",\"timeZone\":\"America/Los_Angeles\",\"locale\":\"en_US\"}}},\"cancel\":{\"rel\":[\"create-form\"],\"name\":\"cancel\",\"href\":\"https://rnicolo-test.okta.com/idp/idx/cancel\",\"method\":\"POST\",\"produces\":\"application/ion+json; okta-version=1.0.0\",\"value\":[{\"name\":\"stateHandle\",\"required\":true,\"value\":\"02qyGmx5Moe7NWw4OnQ0QRzD-GJ6ES3eQ2YnaX-BEH\",\"visible\":false,\"mutable\":false}],\"accepts\":\"application/json; okta-version=1.0.0\"},\"app\":{\"type\":\"object\",\"value\":{\"name\":\"oidc_client\",\"label\":\"Express AuthJS Web App\",\"id\":\"0oac4jylqmEmVykvE696\"}}}",
  },
  enabledFeatures: [
  ],
  availableSteps: [
    {
      name: "enroll-poll",
      inputs: [
      ],
      authenticator: {
        contextualData: {
          qrcode: {
            method: "embedded",
            href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFnElEQVR42u3dQY7bMAwF0Nz/0u1i1l1MxU9S0ftANwGacRy9QKRt6fNHRP6Zj1MgAogIICKAiAAiAogIICKAiAAiAoiIACICiAggIoCIACICiAggIoCIACICiIgAIgKICCAigIgAIgLIzx/6fMr//fbvnhzPb9+z6pxUfa6T76vzPFd974AAAggggADyIJDE+5wMsJP3TH+hVT8OVQOy6sdkavwAAggggAACyCNApk54+rN0ftGJH4QqvLd/74AAAggggADyOJBEO7ezXdnZ0uwEBQgggAACCCCAfGUNkm7PVrVGO684V53DF2pPQAABBBBAALkUSLrFWjXfrsKVAJ5uw07hAgQQQAABBBBA/nuunmiTen3n654HAcTrgADidUCuTmKevPmx3PRV78TnumYsAQIIIIAAAsj31iAn71M1yDf86/yhqKo1OlvKgAACCCCAAPI4kKoTfvK3EleoE6ujJH58ToAkahZAAAEEEEAAAWQETnpunBgwnTVRVU2RbvOmzz8ggAACCCCAPAikc36bfs9EG7bzps0Ni7xNPVcCCCCAAAIIIA8C2fwYaWdrN10XdN5FkPjRAAQQQAABBBBAoq28dE2x4Xiq6pd0S3wDLkAAAQQQQAB5EEjnDYeJuiMx/686D9vO57a6BhBAAAEEEEC0eUd2Wdo8aBPHvHmLh6ofWEAAAQQQQAB5BMgUnPRNett2jErXFOnHY11JBwQQQAABBJDyD57ej7vqeKoGRuc6vZ3z/M47EwABBBBAAAHkcSDpFmICZtUA2LDCSVX7t3PxPUU6IIAAAggggLRhSdcgne+fPrZtoKrqSkAAAQQQQAABpGQe3jn/T7emO3eSmrpDoPMSACCAAAIIIIAA0jZgqubqVXPj9B7r2/BOrd8LCCCAAAIIII+3eTfMjRMYb7mCPIU0fdcEIIAAAggggOhijcx7EzVFYu7dWb901hRqEEAAAQQQQAAZAZJ4PX1snZtvdp7bDZuKbggggAACCCCAPAKkc5B31i/ptnD60Vo1CCCAAAIIIICMAKk6+elVStJf1oZ5/oY93zsfEwYEEEAAAQQQq7tftzd35+CsqilOfhymrqQDAggggAACCCBRIFO7L3WuppI4t50t5ZNj23aFHRBAAAEEEEAuAlI1x07Pvada1om/VVU3JWBuDiCAAAIIIIAsB5IYbFUDPr1TUme7u7M9O7W5KiCAAAIIIIAAMnJC0uvrJtqknc+/bKjFqs45IIAAAggggADStrvTVK0x9WxL+op5+v8CAggggAACCCDRdm5nC7ez1Tx1hf2WusbCcYAAAggggAASrUcSA3hqUbXE/00fQ9WV8c13FwACCCCAAALIFwPpxJI4nkS7csOzJOlW+S11ByCAAAIIIIBcBGTbKiI37sPeOWi37aX+7PMggAACCCCAAJJrLSYGSeKEp1ugVed5250AahBAAAEEEEAAGWntbtvhaEPNMrWwXuedDG41AQQQQAABBJCRemTbI7SJ2mSqJZvGeMuVd0AAAQQQQAB5pM3buX7vhjolvQ3B1AotdpgCBBBAAAEEkDuueDa2f6uOoeqHZepZj6nHfgEBBBBAAAEEkKvnrp17o6cHYedxdraXAQEEEEAAAQSQr1x1pKo1na5r0lex01fGAQEEEEAAAQSQ8jZs5/uc1E3pmqtznr/t2RlAAAEEEEAAAWQcSFVLc8Nn7Gxxd9ZKnd8LIIAAAggggADSdoU33XLs3Hlq6lHlqVY/IIAAAggggACyap6/YV5dBWSqfZq+aXMbLkAAAQQQQAC5CMi250G2LfufXpkk0YadWgcYEEAAAQQQQB4HInJjABEBRAQQEUBEABEBRAQQEUBEABEBREQAEQFEBBARQEQAEQFEBBARQEQAEQFERAARAUQEEBFARAARAUTk3vwF2J24L2lCmBAAAAAASUVORK5CYII=",
            type: "image/png",
          },
          selectedChannel: "qrcode",
        },
        type: "app",
        key: "okta_verify",
        id: "autc4jtfmwtz7GVqM696",
        displayName: "Okta Verify",
        methods: [
          {
            type: "signed_nonce",
          },
        ],
      },
      poll: {
        required: true,
        refresh: 4000,
      },
    },
    {
      name: "select-enrollment-channel",
      inputs: [
      ],
      options: [
        {
          label: "QRCODE",
          value: "qrcode",
        },
        {
          label: "EMAIL",
          value: "email",
        },
        {
          label: "SMS",
          value: "sms",
        },
      ],
      authenticator: {
        contextualData: {
          qrcode: {
            method: "embedded",
            href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFnElEQVR42u3dQY7bMAwF0Nz/0u1i1l1MxU9S0ftANwGacRy9QKRt6fNHRP6Zj1MgAogIICKAiAAiAogIICKAiAAiAoiIACICiAggIoCIACICiAggIoCIACICiIgAIgKICCAigIgAIgLIzx/6fMr//fbvnhzPb9+z6pxUfa6T76vzPFd974AAAggggADyIJDE+5wMsJP3TH+hVT8OVQOy6sdkavwAAggggAACyCNApk54+rN0ftGJH4QqvLd/74AAAggggADyOJBEO7ezXdnZ0uwEBQgggAACCCCAfGUNkm7PVrVGO684V53DF2pPQAABBBBAALkUSLrFWjXfrsKVAJ5uw07hAgQQQAABBBBA/nuunmiTen3n654HAcTrgADidUCuTmKevPmx3PRV78TnumYsAQIIIIAAAsj31iAn71M1yDf86/yhqKo1OlvKgAACCCCAAPI4kKoTfvK3EleoE6ujJH58ToAkahZAAAEEEEAAAWQETnpunBgwnTVRVU2RbvOmzz8ggAACCCCAPAikc36bfs9EG7bzps0Ni7xNPVcCCCCAAAIIIA8C2fwYaWdrN10XdN5FkPjRAAQQQAABBBBAoq28dE2x4Xiq6pd0S3wDLkAAAQQQQAB5EEjnDYeJuiMx/686D9vO57a6BhBAAAEEEEC0eUd2Wdo8aBPHvHmLh6ofWEAAAQQQQAB5BMgUnPRNett2jErXFOnHY11JBwQQQAABBJDyD57ej7vqeKoGRuc6vZ3z/M47EwABBBBAAAHkcSDpFmICZtUA2LDCSVX7t3PxPUU6IIAAAggggLRhSdcgne+fPrZtoKrqSkAAAQQQQAABpGQe3jn/T7emO3eSmrpDoPMSACCAAAIIIIAA0jZgqubqVXPj9B7r2/BOrd8LCCCAAAIIII+3eTfMjRMYb7mCPIU0fdcEIIAAAggggOhijcx7EzVFYu7dWb901hRqEEAAAQQQQAAZAZJ4PX1snZtvdp7bDZuKbggggAACCCCAPAKkc5B31i/ptnD60Vo1CCCAAAIIIICMAKk6+elVStJf1oZ5/oY93zsfEwYEEEAAAQQQq7tftzd35+CsqilOfhymrqQDAggggAACCCBRIFO7L3WuppI4t50t5ZNj23aFHRBAAAEEEEAuAlI1x07Pvada1om/VVU3JWBuDiCAAAIIIIAsB5IYbFUDPr1TUme7u7M9O7W5KiCAAAIIIIAAMnJC0uvrJtqknc+/bKjFqs45IIAAAggggADStrvTVK0x9WxL+op5+v8CAggggAACCCDRdm5nC7ez1Tx1hf2WusbCcYAAAggggAASrUcSA3hqUbXE/00fQ9WV8c13FwACCCCAAALIFwPpxJI4nkS7csOzJOlW+S11ByCAAAIIIIBcBGTbKiI37sPeOWi37aX+7PMggAACCCCAAJJrLSYGSeKEp1ugVed5250AahBAAAEEEEAAGWntbtvhaEPNMrWwXuedDG41AQQQQAABBJCRemTbI7SJ2mSqJZvGeMuVd0AAAQQQQAB5pM3buX7vhjolvQ3B1AotdpgCBBBAAAEEkDuueDa2f6uOoeqHZepZj6nHfgEBBBBAAAEEkKvnrp17o6cHYedxdraXAQEEEEAAAQSQr1x1pKo1na5r0lex01fGAQEEEEAAAQSQ8jZs5/uc1E3pmqtznr/t2RlAAAEEEEAAAWQcSFVLc8Nn7Gxxd9ZKnd8LIIAAAggggADSdoU33XLs3Hlq6lHlqVY/IIAAAggggACyap6/YV5dBWSqfZq+aXMbLkAAAQQQQAC5CMi250G2LfufXpkk0YadWgcYEEAAAQQQQB4HInJjABEBRAQQEUBEABEBRAQQEUBEABEBREQAEQFEBBARQEQAEQFEBBARQEQAEQFERAARAUQEEBFARAARAUTk3vwF2J24L2lCmBAAAAAASUVORK5CYII=",
            type: "image/png",
          },
          selectedChannel: "qrcode",
        },
        type: "app",
        key: "okta_verify",
        id: "autc4jtfmwtz7GVqM696",
        displayName: "Okta Verify",
        methods: [
          {
            type: "signed_nonce",
          },
        ],
      },
    },
    {
      name: "select-authenticator-enroll",
      inputs: [
        {
          name: "authenticator",
          key: "string",
        },
      ],
      options: [
        {
          label: "Google Authenticator",
          value: "google_otp",
        },
        {
          label: "Okta Verify",
          value: "okta_verify",
        },
        {
          label: "Security Key or Biometric",
          value: "webauthn",
        },
      ],
    },
  ],
  nextStep: {
    name: "enroll-poll",
    inputs: [
    ],
    authenticator: {
      contextualData: {
        qrcode: {
          method: "embedded",
          href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFnElEQVR42u3dQY7bMAwF0Nz/0u1i1l1MxU9S0ftANwGacRy9QKRt6fNHRP6Zj1MgAogIICKAiAAiAogIICKAiAAiAoiIACICiAggIoCIACICiAggIoCIACICiIgAIgKICCAigIgAIgLIzx/6fMr//fbvnhzPb9+z6pxUfa6T76vzPFd974AAAggggADyIJDE+5wMsJP3TH+hVT8OVQOy6sdkavwAAggggAACyCNApk54+rN0ftGJH4QqvLd/74AAAggggADyOJBEO7ezXdnZ0uwEBQgggAACCCCAfGUNkm7PVrVGO684V53DF2pPQAABBBBAALkUSLrFWjXfrsKVAJ5uw07hAgQQQAABBBBA/nuunmiTen3n654HAcTrgADidUCuTmKevPmx3PRV78TnumYsAQIIIIAAAsj31iAn71M1yDf86/yhqKo1OlvKgAACCCCAAPI4kKoTfvK3EleoE6ujJH58ToAkahZAAAEEEEAAAWQETnpunBgwnTVRVU2RbvOmzz8ggAACCCCAPAikc36bfs9EG7bzps0Ni7xNPVcCCCCAAAIIIA8C2fwYaWdrN10XdN5FkPjRAAQQQAABBBBAoq28dE2x4Xiq6pd0S3wDLkAAAQQQQAB5EEjnDYeJuiMx/686D9vO57a6BhBAAAEEEEC0eUd2Wdo8aBPHvHmLh6ofWEAAAQQQQAB5BMgUnPRNett2jErXFOnHY11JBwQQQAABBJDyD57ej7vqeKoGRuc6vZ3z/M47EwABBBBAAAHkcSDpFmICZtUA2LDCSVX7t3PxPUU6IIAAAggggLRhSdcgne+fPrZtoKrqSkAAAQQQQAABpGQe3jn/T7emO3eSmrpDoPMSACCAAAIIIIAA0jZgqubqVXPj9B7r2/BOrd8LCCCAAAIIII+3eTfMjRMYb7mCPIU0fdcEIIAAAggggOhijcx7EzVFYu7dWb901hRqEEAAAQQQQAAZAZJ4PX1snZtvdp7bDZuKbggggAACCCCAPAKkc5B31i/ptnD60Vo1CCCAAAIIIICMAKk6+elVStJf1oZ5/oY93zsfEwYEEEAAAQQQq7tftzd35+CsqilOfhymrqQDAggggAACCCBRIFO7L3WuppI4t50t5ZNj23aFHRBAAAEEEEAuAlI1x07Pvada1om/VVU3JWBuDiCAAAIIIIAsB5IYbFUDPr1TUme7u7M9O7W5KiCAAAIIIIAAMnJC0uvrJtqknc+/bKjFqs45IIAAAggggADStrvTVK0x9WxL+op5+v8CAggggAACCCDRdm5nC7ez1Tx1hf2WusbCcYAAAggggAASrUcSA3hqUbXE/00fQ9WV8c13FwACCCCAAALIFwPpxJI4nkS7csOzJOlW+S11ByCAAAIIIIBcBGTbKiI37sPeOWi37aX+7PMggAACCCCAAJJrLSYGSeKEp1ugVed5250AahBAAAEEEEAAGWntbtvhaEPNMrWwXuedDG41AQQQQAABBJCRemTbI7SJ2mSqJZvGeMuVd0AAAQQQQAB5pM3buX7vhjolvQ3B1AotdpgCBBBAAAEEkDuueDa2f6uOoeqHZepZj6nHfgEBBBBAAAEEkKvnrp17o6cHYedxdraXAQEEEEAAAQSQr1x1pKo1na5r0lex01fGAQEEEEAAAQSQ8jZs5/uc1E3pmqtznr/t2RlAAAEEEEAAAWQcSFVLc8Nn7Gxxd9ZKnd8LIIAAAggggADSdoU33XLs3Hlq6lHlqVY/IIAAAggggACyap6/YV5dBWSqfZq+aXMbLkAAAQQQQAC5CMi250G2LfufXpkk0YadWgcYEEAAAQQQQB4HInJjABEBRAQQEUBEABEBRAQQEUBEABEBREQAEQFEBBARQEQAEQFEBBARQEQAEQFERAARAUQEEBFARAARAUTk3vwF2J24L2lCmBAAAAAASUVORK5CYII=",
          type: "image/png",
        },
        selectedChannel: "qrcode",
      },
      type: "app",
      key: "okta_verify",
      id: "autc4jtfmwtz7GVqM696",
      displayName: "Okta Verify",
      methods: [
        {
          type: "signed_nonce",
        },
      ],
    },
    poll: {
      required: true,
      refresh: 4000,
    },
  },
  interactionCode: undefined,
  actions: {
    cancel: async function (params) {
      const headers = {
        'content-type': 'application/json',
        'accept': actionDefinition.accepts || 'application/ion+json'
      };
      const body = (0, _stringify.default)({ ...defaultParamsForAction,
        ...params,
        ...immutableParamsForAction
      });
      const credentials = toPersist && toPersist.withCredentials === false ? 'omit' : 'include';
      return (0, _client.request)(target, {
        method: actionDefinition.method,
        headers,
        body,
        credentials
      }).then(response => {
        const respJson = response.json();

        if (response.ok) {
          return respJson;
        } else if (response.status === 401 && response.headers.get('WWW-Authenticate') === 'Oktadevicejwt realm="Okta Device"') {
          // Okta server responds 401 status code with WWW-Authenticate header and new remediation
          // so that the iOS/MacOS credential SSO extension (Okta Verify) can intercept
          // the response reaches here when Okta Verify is not installed
          // we need to return an idx object so that
          // the SIW can proceed to the next step without showing error
          return respJson.then(err => {
            let ms = (0, _makeIdxState.makeIdxState)(err, toPersist); // set to true if flow should be continued without showing any errors

            ms.stepUp = true;
            return _promise.default.reject(ms);
          });
        }

        return respJson.then(err => {
          return _promise.default.reject((0, _makeIdxState.makeIdxState)(err, toPersist));
        });
      }).then(idxResponse => (0, _makeIdxState.makeIdxState)(idxResponse, toPersist));
    },
  },
  context: {
    version: "1.0.0",
    stateHandle: "02qyGmx5Moe7NWw4OnQ0QRzD-GJ6ES3eQ2YnaX-BEH",
    expiresAt: "2022-02-17T20:30:13.000Z",
    intent: "LOGIN",
    currentAuthenticator: {
      type: "object",
      value: {
        contextualData: {
          qrcode: {
            method: "embedded",
            href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFnElEQVR42u3dQY7bMAwF0Nz/0u1i1l1MxU9S0ftANwGacRy9QKRt6fNHRP6Zj1MgAogIICKAiAAiAogIICKAiAAiAoiIACICiAggIoCIACICiAggIoCIACICiIgAIgKICCAigIgAIgLIzx/6fMr//fbvnhzPb9+z6pxUfa6T76vzPFd974AAAggggADyIJDE+5wMsJP3TH+hVT8OVQOy6sdkavwAAggggAACyCNApk54+rN0ftGJH4QqvLd/74AAAggggADyOJBEO7ezXdnZ0uwEBQgggAACCCCAfGUNkm7PVrVGO684V53DF2pPQAABBBBAALkUSLrFWjXfrsKVAJ5uw07hAgQQQAABBBBA/nuunmiTen3n654HAcTrgADidUCuTmKevPmx3PRV78TnumYsAQIIIIAAAsj31iAn71M1yDf86/yhqKo1OlvKgAACCCCAAPI4kKoTfvK3EleoE6ujJH58ToAkahZAAAEEEEAAAWQETnpunBgwnTVRVU2RbvOmzz8ggAACCCCAPAikc36bfs9EG7bzps0Ni7xNPVcCCCCAAAIIIA8C2fwYaWdrN10XdN5FkPjRAAQQQAABBBBAoq28dE2x4Xiq6pd0S3wDLkAAAQQQQAB5EEjnDYeJuiMx/686D9vO57a6BhBAAAEEEEC0eUd2Wdo8aBPHvHmLh6ofWEAAAQQQQAB5BMgUnPRNett2jErXFOnHY11JBwQQQAABBJDyD57ej7vqeKoGRuc6vZ3z/M47EwABBBBAAAHkcSDpFmICZtUA2LDCSVX7t3PxPUU6IIAAAggggLRhSdcgne+fPrZtoKrqSkAAAQQQQAABpGQe3jn/T7emO3eSmrpDoPMSACCAAAIIIIAA0jZgqubqVXPj9B7r2/BOrd8LCCCAAAIIII+3eTfMjRMYb7mCPIU0fdcEIIAAAggggOhijcx7EzVFYu7dWb901hRqEEAAAQQQQAAZAZJ4PX1snZtvdp7bDZuKbggggAACCCCAPAKkc5B31i/ptnD60Vo1CCCAAAIIIICMAKk6+elVStJf1oZ5/oY93zsfEwYEEEAAAQQQq7tftzd35+CsqilOfhymrqQDAggggAACCCBRIFO7L3WuppI4t50t5ZNj23aFHRBAAAEEEEAuAlI1x07Pvada1om/VVU3JWBuDiCAAAIIIIAsB5IYbFUDPr1TUme7u7M9O7W5KiCAAAIIIIAAMnJC0uvrJtqknc+/bKjFqs45IIAAAggggADStrvTVK0x9WxL+op5+v8CAggggAACCCDRdm5nC7ez1Tx1hf2WusbCcYAAAggggAASrUcSA3hqUbXE/00fQ9WV8c13FwACCCCAAALIFwPpxJI4nkS7csOzJOlW+S11ByCAAAIIIIBcBGTbKiI37sPeOWi37aX+7PMggAACCCCAAJJrLSYGSeKEp1ugVed5250AahBAAAEEEEAAGWntbtvhaEPNMrWwXuedDG41AQQQQAABBJCRemTbI7SJ2mSqJZvGeMuVd0AAAQQQQAB5pM3buX7vhjolvQ3B1AotdpgCBBBAAAEEkDuueDa2f6uOoeqHZepZj6nHfgEBBBBAAAEEkKvnrp17o6cHYedxdraXAQEEEEAAAQSQr1x1pKo1na5r0lex01fGAQEEEEAAAQSQ8jZs5/uc1E3pmqtznr/t2RlAAAEEEEAAAWQcSFVLc8Nn7Gxxd9ZKnd8LIIAAAggggADSdoU33XLs3Hlq6lHlqVY/IIAAAggggACyap6/YV5dBWSqfZq+aXMbLkAAAQQQQAC5CMi250G2LfufXpkk0YadWgcYEEAAAQQQQB4HInJjABEBRAQQEUBEABEBRAQQEUBEABEBREQAEQFEBBARQEQAEQFEBBARQEQAEQFERAARAUQEEBFARAARAUTk3vwF2J24L2lCmBAAAAAASUVORK5CYII=",
            type: "image/png",
          },
          selectedChannel: "qrcode",
        },
        type: "app",
        key: "okta_verify",
        id: "autc4jtfmwtz7GVqM696",
        displayName: "Okta Verify",
        methods: [
          {
            type: "signed_nonce",
          },
        ],
      },
    },
    authenticators: {
      type: "array",
      value: [
        {
          type: "app",
          key: "google_otp",
          id: "autc4m1ze3b3RW3hl696",
          displayName: "Google Authenticator",
          methods: [
            {
              type: "otp",
            },
          ],
        },
        {
          type: "app",
          key: "okta_verify",
          id: "autc4jtfmwtz7GVqM696",
          displayName: "Okta Verify",
          methods: [
            {
              type: "push",
            },
            {
              type: "signed_nonce",
            },
            {
              type: "totp",
            },
          ],
        },
        {
          type: "security_key",
          key: "webauthn",
          id: "autc4m63eWYtQ0x3c696",
          displayName: "Security Key or Biometric",
          methods: [
            {
              type: "webauthn",
            },
          ],
        },
      ],
    },
    authenticatorEnrollments: {
      type: "array",
      value: [
        {
          type: "email",
          key: "okta_email",
          id: "eaegwpl7zBuKFeEkN696",
          displayName: "Email",
          methods: [
            {
              type: "email",
            },
          ],
        },
        {
          type: "password",
          key: "okta_password",
          id: "lae1piwpuRpQRA1z7696",
          displayName: "Password",
          methods: [
            {
              type: "password",
            },
          ],
        },
      ],
    },
    enrollmentAuthenticator: {
      type: "object",
      value: {
        type: "app",
        key: "okta_verify",
        id: "autc4jtfmwtz7GVqM696",
        displayName: "Okta Verify",
        methods: [
          {
            type: "signed_nonce",
          },
        ],
      },
    },
    user: {
      type: "object",
      value: {
        id: "00ugwpl7ubRby1KKO696",
        identifier: "robnicolo+oie-ciam2022-13@gmail.com",
        profile: {
          firstName: "John",
          lastName: "Doe 13",
          timeZone: "America/Los_Angeles",
          locale: "en_US",
        },
      },
    },
    app: {
      type: "object",
      value: {
        name: "oidc_client",
        label: "Express AuthJS Web App",
        id: "0oac4jylqmEmVykvE696",
      },
    },
  },
  neededToProceed: [
    {
      rel: [
        "create-form",
      ],
      name: "enroll-poll",
      href: "https://rnicolo-test.okta.com/idp/idx/challenge/poll",
      method: "POST",
      produces: "application/ion+json; okta-version=1.0.0",
      refresh: 4000,
      value: [
        {
          name: "stateHandle",
          required: true,
          value: "02qyGmx5Moe7NWw4OnQ0QRzD-GJ6ES3eQ2YnaX-BEH",
          visible: false,
          mutable: false,
        },
      ],
      accepts: "application/json; okta-version=1.0.0",
      action: async function (params) {
        const headers = {
          'content-type': 'application/json',
          'accept': actionDefinition.accepts || 'application/ion+json'
        };
        const body = (0, _stringify.default)({ ...defaultParamsForAction,
          ...params,
          ...immutableParamsForAction
        });
        const credentials = toPersist && toPersist.withCredentials === false ? 'omit' : 'include';
        return (0, _client.request)(target, {
          method: actionDefinition.method,
          headers,
          body,
          credentials
        }).then(response => {
          const respJson = response.json();

          if (response.ok) {
            return respJson;
          } else if (response.status === 401 && response.headers.get('WWW-Authenticate') === 'Oktadevicejwt realm="Okta Device"') {
            // Okta server responds 401 status code with WWW-Authenticate header and new remediation
            // so that the iOS/MacOS credential SSO extension (Okta Verify) can intercept
            // the response reaches here when Okta Verify is not installed
            // we need to return an idx object so that
            // the SIW can proceed to the next step without showing error
            return respJson.then(err => {
              let ms = (0, _makeIdxState.makeIdxState)(err, toPersist); // set to true if flow should be continued without showing any errors

              ms.stepUp = true;
              return _promise.default.reject(ms);
            });
          }

          return respJson.then(err => {
            return _promise.default.reject((0, _makeIdxState.makeIdxState)(err, toPersist));
          });
        }).then(idxResponse => (0, _makeIdxState.makeIdxState)(idxResponse, toPersist));
      },
    },
    {
      rel: [
        "create-form",
      ],
      name: "select-enrollment-channel",
      href: "https://rnicolo-test.okta.com/idp/idx/credential/enroll",
      method: "POST",
      produces: "application/ion+json; okta-version=1.0.0",
      value: [
        {
          name: "authenticator",
          type: "object",
          label: "Okta Verify",
          value: {
            form: {
              value: [
                {
                  name: "id",
                  required: true,
                  value: "autc4jtfmwtz7GVqM696",
                  mutable: false,
                },
                {
                  name: "channel",
                  type: "string",
                  required: false,
                  options: [
                    {
                      label: "QRCODE",
                      value: "qrcode",
                    },
                    {
                      label: "EMAIL",
                      value: "email",
                    },
                    {
                      label: "SMS",
                      value: "sms",
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          name: "stateHandle",
          required: true,
          value: "02qyGmx5Moe7NWw4OnQ0QRzD-GJ6ES3eQ2YnaX-BEH",
          visible: false,
          mutable: false,
        },
      ],
      accepts: "application/json; okta-version=1.0.0",
      action: async function (params) {
        const headers = {
          'content-type': 'application/json',
          'accept': actionDefinition.accepts || 'application/ion+json'
        };
        const body = (0, _stringify.default)({ ...defaultParamsForAction,
          ...params,
          ...immutableParamsForAction
        });
        const credentials = toPersist && toPersist.withCredentials === false ? 'omit' : 'include';
        return (0, _client.request)(target, {
          method: actionDefinition.method,
          headers,
          body,
          credentials
        }).then(response => {
          const respJson = response.json();

          if (response.ok) {
            return respJson;
          } else if (response.status === 401 && response.headers.get('WWW-Authenticate') === 'Oktadevicejwt realm="Okta Device"') {
            // Okta server responds 401 status code with WWW-Authenticate header and new remediation
            // so that the iOS/MacOS credential SSO extension (Okta Verify) can intercept
            // the response reaches here when Okta Verify is not installed
            // we need to return an idx object so that
            // the SIW can proceed to the next step without showing error
            return respJson.then(err => {
              let ms = (0, _makeIdxState.makeIdxState)(err, toPersist); // set to true if flow should be continued without showing any errors

              ms.stepUp = true;
              return _promise.default.reject(ms);
            });
          }

          return respJson.then(err => {
            return _promise.default.reject((0, _makeIdxState.makeIdxState)(err, toPersist));
          });
        }).then(idxResponse => (0, _makeIdxState.makeIdxState)(idxResponse, toPersist));
      },
    },
    {
      rel: [
        "create-form",
      ],
      name: "select-authenticator-enroll",
      href: "https://rnicolo-test.okta.com/idp/idx/credential/enroll",
      method: "POST",
      produces: "application/ion+json; okta-version=1.0.0",
      value: [
        {
          name: "authenticator",
          type: "object",
          options: [
            {
              label: "Google Authenticator",
              value: {
                form: {
                  value: [
                    {
                      name: "id",
                      required: true,
                      value: "autc4m1ze3b3RW3hl696",
                      mutable: false,
                    },
                    {
                      name: "methodType",
                      required: false,
                      value: "otp",
                      mutable: false,
                    },
                  ],
                },
              },
              relatesTo: {
                type: "app",
                key: "google_otp",
                id: "autc4m1ze3b3RW3hl696",
                displayName: "Google Authenticator",
                methods: [
                  {
                    type: "otp",
                  },
                ],
              },
            },
            {
              label: "Okta Verify",
              value: {
                form: {
                  value: [
                    {
                      name: "id",
                      required: true,
                      value: "autc4jtfmwtz7GVqM696",
                      mutable: false,
                    },
                    {
                      name: "channel",
                      type: "string",
                      required: false,
                      options: [
                        {
                          label: "QRCODE",
                          value: "qrcode",
                        },
                        {
                          label: "EMAIL",
                          value: "email",
                        },
                        {
                          label: "SMS",
                          value: "sms",
                        },
                      ],
                    },
                  ],
                },
              },
              relatesTo: {
                type: "app",
                key: "okta_verify",
                id: "autc4jtfmwtz7GVqM696",
                displayName: "Okta Verify",
                methods: [
                  {
                    type: "push",
                  },
                  {
                    type: "signed_nonce",
                  },
                  {
                    type: "totp",
                  },
                ],
              },
            },
            {
              label: "Security Key or Biometric",
              value: {
                form: {
                  value: [
                    {
                      name: "id",
                      required: true,
                      value: "autc4m63eWYtQ0x3c696",
                      mutable: false,
                    },
                    {
                      name: "methodType",
                      required: false,
                      value: "webauthn",
                      mutable: false,
                    },
                  ],
                },
              },
              relatesTo: {
                type: "security_key",
                key: "webauthn",
                id: "autc4m63eWYtQ0x3c696",
                displayName: "Security Key or Biometric",
                methods: [
                  {
                    type: "webauthn",
                  },
                ],
              },
            },
          ],
        },
        {
          name: "stateHandle",
          required: true,
          value: "02qyGmx5Moe7NWw4OnQ0QRzD-GJ6ES3eQ2YnaX-BEH",
          visible: false,
          mutable: false,
        },
      ],
      accepts: "application/json; okta-version=1.0.0",
      action: async function (params) {
        const headers = {
          'content-type': 'application/json',
          'accept': actionDefinition.accepts || 'application/ion+json'
        };
        const body = (0, _stringify.default)({ ...defaultParamsForAction,
          ...params,
          ...immutableParamsForAction
        });
        const credentials = toPersist && toPersist.withCredentials === false ? 'omit' : 'include';
        return (0, _client.request)(target, {
          method: actionDefinition.method,
          headers,
          body,
          credentials
        }).then(response => {
          const respJson = response.json();

          if (response.ok) {
            return respJson;
          } else if (response.status === 401 && response.headers.get('WWW-Authenticate') === 'Oktadevicejwt realm="Okta Device"') {
            // Okta server responds 401 status code with WWW-Authenticate header and new remediation
            // so that the iOS/MacOS credential SSO extension (Okta Verify) can intercept
            // the response reaches here when Okta Verify is not installed
            // we need to return an idx object so that
            // the SIW can proceed to the next step without showing error
            return respJson.then(err => {
              let ms = (0, _makeIdxState.makeIdxState)(err, toPersist); // set to true if flow should be continued without showing any errors

              ms.stepUp = true;
              return _promise.default.reject(ms);
            });
          }

          return respJson.then(err => {
            return _promise.default.reject((0, _makeIdxState.makeIdxState)(err, toPersist));
          });
        }).then(idxResponse => (0, _makeIdxState.makeIdxState)(idxResponse, toPersist));
      },
    },
  ],
  proceed: async function (remediationChoice, paramsFromUser = {}) {
    /*
    remediationChoice is the name attribute on each form
    name should remain unique for items inside the remediation that are considered forms(identify, select-factor)
    name can be duplicate for items like redirect where its not considered a form(redirect)
    when names are not unique its a redirect to a href, so widget wont POST to idx-js layer.
    */
    const remediationChoiceObject = (0, _find.default)(remediations).call(remediations, remediation => remediation.name === remediationChoice);

    if (!remediationChoiceObject) {
      return _promise.default.reject(`Unknown remediation choice: [${remediationChoice}]`);
    }

    return remediationChoiceObject.action(paramsFromUser);
  },
  rawIdxState: {
    version: "1.0.0",
    stateHandle: "02qyGmx5Moe7NWw4OnQ0QRzD-GJ6ES3eQ2YnaX-BEH",
    expiresAt: "2022-02-17T20:30:13.000Z",
    intent: "LOGIN",
    remediation: {
      type: "array",
      value: [
        {
          rel: [
            "create-form",
          ],
          name: "enroll-poll",
          href: "https://rnicolo-test.okta.com/idp/idx/challenge/poll",
          method: "POST",
          produces: "application/ion+json; okta-version=1.0.0",
          refresh: 4000,
          value: [
            {
              name: "stateHandle",
              required: true,
              value: "02qyGmx5Moe7NWw4OnQ0QRzD-GJ6ES3eQ2YnaX-BEH",
              visible: false,
              mutable: false,
            },
          ],
          accepts: "application/json; okta-version=1.0.0",
        },
        {
          rel: [
            "create-form",
          ],
          name: "select-enrollment-channel",
          href: "https://rnicolo-test.okta.com/idp/idx/credential/enroll",
          method: "POST",
          produces: "application/ion+json; okta-version=1.0.0",
          value: [
            {
              name: "authenticator",
              type: "object",
              label: "Okta Verify",
              value: {
                form: {
                  value: [
                    {
                      name: "id",
                      required: true,
                      value: "autc4jtfmwtz7GVqM696",
                      mutable: false,
                    },
                    {
                      name: "channel",
                      type: "string",
                      required: false,
                      options: [
                        {
                          label: "QRCODE",
                          value: "qrcode",
                        },
                        {
                          label: "EMAIL",
                          value: "email",
                        },
                        {
                          label: "SMS",
                          value: "sms",
                        },
                      ],
                    },
                  ],
                },
              },
            },
            {
              name: "stateHandle",
              required: true,
              value: "02qyGmx5Moe7NWw4OnQ0QRzD-GJ6ES3eQ2YnaX-BEH",
              visible: false,
              mutable: false,
            },
          ],
          accepts: "application/json; okta-version=1.0.0",
        },
        {
          rel: [
            "create-form",
          ],
          name: "select-authenticator-enroll",
          href: "https://rnicolo-test.okta.com/idp/idx/credential/enroll",
          method: "POST",
          produces: "application/ion+json; okta-version=1.0.0",
          value: [
            {
              name: "authenticator",
              type: "object",
              options: [
                {
                  label: "Google Authenticator",
                  value: {
                    form: {
                      value: [
                        {
                          name: "id",
                          required: true,
                          value: "autc4m1ze3b3RW3hl696",
                          mutable: false,
                        },
                        {
                          name: "methodType",
                          required: false,
                          value: "otp",
                          mutable: false,
                        },
                      ],
                    },
                  },
                  relatesTo: {
                    type: "app",
                    key: "google_otp",
                    id: "autc4m1ze3b3RW3hl696",
                    displayName: "Google Authenticator",
                    methods: [
                      {
                        type: "otp",
                      },
                    ],
                  },
                },
                {
                  label: "Okta Verify",
                  value: {
                    form: {
                      value: [
                        {
                          name: "id",
                          required: true,
                          value: "autc4jtfmwtz7GVqM696",
                          mutable: false,
                        },
                        {
                          name: "channel",
                          type: "string",
                          required: false,
                          options: [
                            {
                              label: "QRCODE",
                              value: "qrcode",
                            },
                            {
                              label: "EMAIL",
                              value: "email",
                            },
                            {
                              label: "SMS",
                              value: "sms",
                            },
                          ],
                        },
                      ],
                    },
                  },
                  relatesTo: {
                    type: "app",
                    key: "okta_verify",
                    id: "autc4jtfmwtz7GVqM696",
                    displayName: "Okta Verify",
                    methods: [
                      {
                        type: "push",
                      },
                      {
                        type: "signed_nonce",
                      },
                      {
                        type: "totp",
                      },
                    ],
                  },
                },
                {
                  label: "Security Key or Biometric",
                  value: {
                    form: {
                      value: [
                        {
                          name: "id",
                          required: true,
                          value: "autc4m63eWYtQ0x3c696",
                          mutable: false,
                        },
                        {
                          name: "methodType",
                          required: false,
                          value: "webauthn",
                          mutable: false,
                        },
                      ],
                    },
                  },
                  relatesTo: {
                    type: "security_key",
                    key: "webauthn",
                    id: "autc4m63eWYtQ0x3c696",
                    displayName: "Security Key or Biometric",
                    methods: [
                      {
                        type: "webauthn",
                      },
                    ],
                  },
                },
              ],
            },
            {
              name: "stateHandle",
              required: true,
              value: "02qyGmx5Moe7NWw4OnQ0QRzD-GJ6ES3eQ2YnaX-BEH",
              visible: false,
              mutable: false,
            },
          ],
          accepts: "application/json; okta-version=1.0.0",
        },
      ],
    },
    currentAuthenticator: {
      type: "object",
      value: {
        contextualData: {
          qrcode: {
            method: "embedded",
            href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFnElEQVR42u3dQY7bMAwF0Nz/0u1i1l1MxU9S0ftANwGacRy9QKRt6fNHRP6Zj1MgAogIICKAiAAiAogIICKAiAAiAoiIACICiAggIoCIACICiAggIoCIACICiIgAIgKICCAigIgAIgLIzx/6fMr//fbvnhzPb9+z6pxUfa6T76vzPFd974AAAggggADyIJDE+5wMsJP3TH+hVT8OVQOy6sdkavwAAggggAACyCNApk54+rN0ftGJH4QqvLd/74AAAggggADyOJBEO7ezXdnZ0uwEBQgggAACCCCAfGUNkm7PVrVGO684V53DF2pPQAABBBBAALkUSLrFWjXfrsKVAJ5uw07hAgQQQAABBBBA/nuunmiTen3n654HAcTrgADidUCuTmKevPmx3PRV78TnumYsAQIIIIAAAsj31iAn71M1yDf86/yhqKo1OlvKgAACCCCAAPI4kKoTfvK3EleoE6ujJH58ToAkahZAAAEEEEAAAWQETnpunBgwnTVRVU2RbvOmzz8ggAACCCCAPAikc36bfs9EG7bzps0Ni7xNPVcCCCCAAAIIIA8C2fwYaWdrN10XdN5FkPjRAAQQQAABBBBAoq28dE2x4Xiq6pd0S3wDLkAAAQQQQAB5EEjnDYeJuiMx/686D9vO57a6BhBAAAEEEEC0eUd2Wdo8aBPHvHmLh6ofWEAAAQQQQAB5BMgUnPRNett2jErXFOnHY11JBwQQQAABBJDyD57ej7vqeKoGRuc6vZ3z/M47EwABBBBAAAHkcSDpFmICZtUA2LDCSVX7t3PxPUU6IIAAAggggLRhSdcgne+fPrZtoKrqSkAAAQQQQAABpGQe3jn/T7emO3eSmrpDoPMSACCAAAIIIIAA0jZgqubqVXPj9B7r2/BOrd8LCCCAAAIIII+3eTfMjRMYb7mCPIU0fdcEIIAAAggggOhijcx7EzVFYu7dWb901hRqEEAAAQQQQAAZAZJ4PX1snZtvdp7bDZuKbggggAACCCCAPAKkc5B31i/ptnD60Vo1CCCAAAIIIICMAKk6+elVStJf1oZ5/oY93zsfEwYEEEAAAQQQq7tftzd35+CsqilOfhymrqQDAggggAACCCBRIFO7L3WuppI4t50t5ZNj23aFHRBAAAEEEEAuAlI1x07Pvada1om/VVU3JWBuDiCAAAIIIIAsB5IYbFUDPr1TUme7u7M9O7W5KiCAAAIIIIAAMnJC0uvrJtqknc+/bKjFqs45IIAAAggggADStrvTVK0x9WxL+op5+v8CAggggAACCCDRdm5nC7ez1Tx1hf2WusbCcYAAAggggAASrUcSA3hqUbXE/00fQ9WV8c13FwACCCCAAALIFwPpxJI4nkS7csOzJOlW+S11ByCAAAIIIIBcBGTbKiI37sPeOWi37aX+7PMggAACCCCAAJJrLSYGSeKEp1ugVed5250AahBAAAEEEEAAGWntbtvhaEPNMrWwXuedDG41AQQQQAABBJCRemTbI7SJ2mSqJZvGeMuVd0AAAQQQQAB5pM3buX7vhjolvQ3B1AotdpgCBBBAAAEEkDuueDa2f6uOoeqHZepZj6nHfgEBBBBAAAEEkKvnrp17o6cHYedxdraXAQEEEEAAAQSQr1x1pKo1na5r0lex01fGAQEEEEAAAQSQ8jZs5/uc1E3pmqtznr/t2RlAAAEEEEAAAWQcSFVLc8Nn7Gxxd9ZKnd8LIIAAAggggADSdoU33XLs3Hlq6lHlqVY/IIAAAggggACyap6/YV5dBWSqfZq+aXMbLkAAAQQQQAC5CMi250G2LfufXpkk0YadWgcYEEAAAQQQQB4HInJjABEBRAQQEUBEABEBRAQQEUBEABEBREQAEQFEBBARQEQAEQFEBBARQEQAEQFERAARAUQEEBFARAARAUTk3vwF2J24L2lCmBAAAAAASUVORK5CYII=",
            type: "image/png",
          },
          selectedChannel: "qrcode",
        },
        type: "app",
        key: "okta_verify",
        id: "autc4jtfmwtz7GVqM696",
        displayName: "Okta Verify",
        methods: [
          {
            type: "signed_nonce",
          },
        ],
      },
    },
    authenticators: {
      type: "array",
      value: [
        {
          type: "app",
          key: "google_otp",
          id: "autc4m1ze3b3RW3hl696",
          displayName: "Google Authenticator",
          methods: [
            {
              type: "otp",
            },
          ],
        },
        {
          type: "app",
          key: "okta_verify",
          id: "autc4jtfmwtz7GVqM696",
          displayName: "Okta Verify",
          methods: [
            {
              type: "push",
            },
            {
              type: "signed_nonce",
            },
            {
              type: "totp",
            },
          ],
        },
        {
          type: "security_key",
          key: "webauthn",
          id: "autc4m63eWYtQ0x3c696",
          displayName: "Security Key or Biometric",
          methods: [
            {
              type: "webauthn",
            },
          ],
        },
      ],
    },
    authenticatorEnrollments: {
      type: "array",
      value: [
        {
          type: "email",
          key: "okta_email",
          id: "eaegwpl7zBuKFeEkN696",
          displayName: "Email",
          methods: [
            {
              type: "email",
            },
          ],
        },
        {
          type: "password",
          key: "okta_password",
          id: "lae1piwpuRpQRA1z7696",
          displayName: "Password",
          methods: [
            {
              type: "password",
            },
          ],
        },
      ],
    },
    enrollmentAuthenticator: {
      type: "object",
      value: {
        type: "app",
        key: "okta_verify",
        id: "autc4jtfmwtz7GVqM696",
        displayName: "Okta Verify",
        methods: [
          {
            type: "signed_nonce",
          },
        ],
      },
    },
    user: {
      type: "object",
      value: {
        id: "00ugwpl7ubRby1KKO696",
        identifier: "robnicolo+oie-ciam2022-13@gmail.com",
        profile: {
          firstName: "John",
          lastName: "Doe 13",
          timeZone: "America/Los_Angeles",
          locale: "en_US",
        },
      },
    },
    cancel: {
      rel: [
        "create-form",
      ],
      name: "cancel",
      href: "https://rnicolo-test.okta.com/idp/idx/cancel",
      method: "POST",
      produces: "application/ion+json; okta-version=1.0.0",
      value: [
        {
          name: "stateHandle",
          required: true,
          value: "02qyGmx5Moe7NWw4OnQ0QRzD-GJ6ES3eQ2YnaX-BEH",
          visible: false,
          mutable: false,
        },
      ],
      accepts: "application/json; okta-version=1.0.0",
    },
    app: {
      type: "object",
      value: {
        name: "oidc_client",
        label: "Express AuthJS Web App",
        id: "0oac4jylqmEmVykvE696",
      },
    },
  },
}

```

Status is PENDING

Polling on client

```javascript
function poll(url, refresh) {
  setTimeout(function () {
    fetch(url, {
      method: 'POST'
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('Poll request failed: ', response.statusText);
      }
    })
    .then(nextStep => {
      if (nextStep.poll) {
        poll(url, nextStep.poll.refresh);
      } else {
        window.location.href = nextStep.nextRoute;
      }
    });
  }, refresh);
}
```

Wait Response is:

```javascript
Reponse: ok true

```

Nextstep

```json
{
    "name": "enroll-poll",
    "inputs": [],
    "authenticator": {
        "contextualData": {
            "qrcode": {
                "method": "embedded",
                "href": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFpklEQVR42u3dwW4qMQwFUP7/p/sWb10Jiq/tTM6VukEtHSBnFHtI5vUjIr/m5S0QAUQEEBFARAARAUQEEBFARAARAUREABEBRAQQEUBEABEBRAQQEUBEABEBREQAEQFEBBARQEQAEQHk/z96vcp/Ov/vb8/5zuPvHNunz/PO3356POnX0vm5AwIIIIAAAsiFQBLP8+mb+SmExO9UHefUyeGbk8nU+AEEEEAAAQSQS4B0vuGd8/POAZM4IVQdwzZogAACCCCAAAJISYu1qoWYbldum89XHQ8ggAACCCCAAPLIGiTRek20edPt1sR7eErtCQgggAACCCCupJe84Yn59obBOdWGncIFCCCAAAIIIID8+cOaWqPh8f7HrQcBxOOAAOJxQI5OYp5cVWt0run45jWmX9cxYwkQQAABBBBAnluDJFqsiSvg6fqr80RRVWt0tpQBAQQQQAAB5EIgVYjSdUontG9qnE7I6ZoFEEAAAQQQQABZi2XDpm3pGmdqc7zEiaWqJgIEEEAAAQSQy4FsnrdX1SDb2uDpFu4UFkAAAQQQQAABpGTApzdeS9cXne3ZBJapq/9qEEAAAQQQQABpq02qUCQ+lPTV56mWeGc9tW1dCSCAAAIIIIAcBKTziu22Jagblu6mj2dbXQMIIIAAAggglwOZusnm1P6xnTXCibd4+Oa9BQQQQAABBJBLgKTnt1MDcmrP4USrPNE67mz7AwIIIIAAAggg0dZu5wCrAlg1aDfM8zu/mQAIIIAAAggglwNJtH87r6qnB2p6x5Wq55laC2PbH0AAAQQQQACJtl47W8dT+8d2toI7QSU+X0AAAQQQQADR5h25apzeMG1q47sN7eKpJbqAAAIIIIAAAkh5LVDVnk3/Tme9s+FWEemT4VU1CCCAAAIIIID01CkbrlwnWpdTc+/0Pc0Tn4uvmgACCCCAAAJISQ3SuXag877kG/bdnWrRq0EAAQQQQAABZATL1Bx423qQzvdqw+vadssDQAABBBBAAHlYDZKYqyf+tnPnkM1LejfcjQsQQAABBBBAdLH+/OZMzfM7B1XnPL9zbUt6RxpAAAEEEEAAuRzI1J63G5a7bsNbdbKqqq0AAQQQQAABBJByIOl5aeJ/pZeUpr/QmG4pV50obBwHCCCAAAIIION1RHoQJubnU0uJE3XTKV8+BAQQQAABBJCHAekcbFN4N+xz29menVrXAwgggAACCCCAtLUoNwyMxBy+897rmzFeW4MAAggggAACSO08Pz04q45ham1LAnsnaktuAQEEEEAAAWQESOc8PI0lMdgSddxUXWPjOEAAAQQQQACJtnYT8+epNSadS30714901ia2/QEEEEAAAQSQn2loVYNqareNqTqls11/St0BCCCAAAIIIA9o83bO7afuw54eSKfcMHTDGhlAAAEEEEAAeTCQqTl8eg68oY254fYQT9rhBBBAAAEEEEAOavN2Lnf9ptW5YdO2zpZ11XG6kg4IIIAAAgggq76s2Hk1Nn1rg6r25lRLNo3xlCvvgAACCCCAAHJJm3fb+oupn6r3Nl0vuMMUIIAAAggggBydxAeaPoap+qWz5Zs+YQICCCCAAALI5UCeNHed2uwusRHc1O0VppY2AwIIIIAAAsiDgaSfJ32jyaqTQGddk76Knb4yDggggAACCCCAlLdhO5+nasCfsoNK55cn7WoCCCCAAAIIIEcDqWppTrV/T7+lQuJ1TQUQQAABBBBAACn/kl661Ty19Dh9k9NtrVpAAAEEEEAAuRBIAtrUQOq8gj/VPk1voLcNFyCAAAIIIIAcBGTzzh6JuinRFk689nR7uXMtDCCAAAIIIIBcuLu7iDavCCAigIgAIiKAiAAiAogIICKAiAAiAogIICKAiAggIoCIACICiAggIoCIACICiAggIoCICCAigIgAIpLOP4hFTJvk06MbAAAAAElFTkSuQmCC",
                "type": "image/png"
            },
            "selectedChannel": "qrcode"
        },
        "type": "app",
        "key": "okta_verify",
        "id": "autc4jtfmwtz7GVqM696",
        "displayName": "Okta Verify",
        "methods": [
            {
                "type": "signed_nonce"
            }
        ]
    },
    "poll": {
        "required": true,
        "refresh": 4000
    },
    "nextRoute": "/enroll-authenticator/okta_verify/poll?state=320979dcb32fea767f14df5c661f45b7"
}
```


DONE

```javascript
{
  status: "PENDING",
  meta: {
    issuer: "https://rnicolo-test.okta.com/oauth2/default",
    urls: {
      issuer: "https://rnicolo-test.okta.com/oauth2/default",
      authorizeUrl: "https://rnicolo-test.okta.com/oauth2/default/v1/authorize",
      userinfoUrl: "https://rnicolo-test.okta.com/oauth2/default/v1/userinfo",
      tokenUrl: "https://rnicolo-test.okta.com/oauth2/default/v1/token",
      revokeUrl: "https://rnicolo-test.okta.com/oauth2/default/v1/revoke",
      logoutUrl: "https://rnicolo-test.okta.com/oauth2/default/v1/logout",
    },
    clientId: "0oac4jylqmEmVykvE696",
    redirectUri: "http://localhost:8080/login/callback",
    responseType: "code",
    scopes: [
      "openid",
      "profile",
      "email",
    ],
    state: "38dcb86ea3139a784f2c3b3298073b23",
    nonce: "MUUGH3vhi8OQvQWcaXbaYJpB6x9VFQA9yboMCx4qEsKIPvz13Anhx1TFgyKXexee",
    ignoreSignature: false,
    codeVerifier: "fd1058c4bb546ef522963b00a02314e087a8c82feaf",
    codeChallengeMethod: "S256",
    codeChallenge: "hPc5VitQyKzTNcOAEOPbO1wGKUZP4Qs1_iESm3-PeyM",
    flow: "authenticate",
    withCredentials: true,
    interactionHandle: "xHAfvKiF2t4_2KB0wm67QFhyTyoogYQbnSB9vM17UdM",
    "okta-idx-response-storage": "{\"version\":\"1.0.0\",\"stateHandle\":\"02rTjcyHK0a9fgp7pdzHoumViaAJ3sQN6fpby2Ie_P\",\"expiresAt\":\"2022-02-17T20:48:55.000Z\",\"intent\":\"LOGIN\",\"remediation\":{\"type\":\"array\",\"value\":[{\"rel\":[\"create-form\"],\"name\":\"enroll-poll\",\"href\":\"https://rnicolo-test.okta.com/idp/idx/challenge/poll\",\"method\":\"POST\",\"produces\":\"application/ion+json; okta-version=1.0.0\",\"refresh\":4000,\"value\":[{\"name\":\"stateHandle\",\"required\":true,\"value\":\"02rTjcyHK0a9fgp7pdzHoumViaAJ3sQN6fpby2Ie_P\",\"visible\":false,\"mutable\":false}],\"accepts\":\"application/json; okta-version=1.0.0\"},{\"rel\":[\"create-form\"],\"name\":\"select-enrollment-channel\",\"href\":\"https://rnicolo-test.okta.com/idp/idx/credential/enroll\",\"method\":\"POST\",\"produces\":\"application/ion+json; okta-version=1.0.0\",\"value\":[{\"name\":\"authenticator\",\"type\":\"object\",\"label\":\"Okta Verify\",\"value\":{\"form\":{\"value\":[{\"name\":\"id\",\"required\":true,\"value\":\"autc4jtfmwtz7GVqM696\",\"mutable\":false},{\"name\":\"channel\",\"type\":\"string\",\"required\":false,\"options\":[{\"label\":\"QRCODE\",\"value\":\"qrcode\"},{\"label\":\"EMAIL\",\"value\":\"email\"},{\"label\":\"SMS\",\"value\":\"sms\"}]}]}}},{\"name\":\"stateHandle\",\"required\":true,\"value\":\"02rTjcyHK0a9fgp7pdzHoumViaAJ3sQN6fpby2Ie_P\",\"visible\":false,\"mutable\":false}],\"accepts\":\"application/json; okta-version=1.0.0\"},{\"rel\":[\"create-form\"],\"name\":\"select-authenticator-enroll\",\"href\":\"https://rnicolo-test.okta.com/idp/idx/credential/enroll\",\"method\":\"POST\",\"produces\":\"application/ion+json; okta-version=1.0.0\",\"value\":[{\"name\":\"authenticator\",\"type\":\"object\",\"options\":[{\"label\":\"Google Authenticator\",\"value\":{\"form\":{\"value\":[{\"name\":\"id\",\"required\":true,\"value\":\"autc4m1ze3b3RW3hl696\",\"mutable\":false},{\"name\":\"methodType\",\"required\":false,\"value\":\"otp\",\"mutable\":false}]}},\"relatesTo\":{\"type\":\"app\",\"key\":\"google_otp\",\"id\":\"autc4m1ze3b3RW3hl696\",\"displayName\":\"Google Authenticator\",\"methods\":[{\"type\":\"otp\"}]}},{\"label\":\"Okta Verify\",\"value\":{\"form\":{\"value\":[{\"name\":\"id\",\"required\":true,\"value\":\"autc4jtfmwtz7GVqM696\",\"mutable\":false},{\"name\":\"channel\",\"type\":\"string\",\"required\":false,\"options\":[{\"label\":\"QRCODE\",\"value\":\"qrcode\"},{\"label\":\"EMAIL\",\"value\":\"email\"},{\"label\":\"SMS\",\"value\":\"sms\"}]}]}},\"relatesTo\":{\"type\":\"app\",\"key\":\"okta_verify\",\"id\":\"autc4jtfmwtz7GVqM696\",\"displayName\":\"Okta Verify\",\"methods\":[{\"type\":\"push\"},{\"type\":\"signed_nonce\"},{\"type\":\"totp\"}]}},{\"label\":\"Security Key or Biometric\",\"value\":{\"form\":{\"value\":[{\"name\":\"id\",\"required\":true,\"value\":\"autc4m63eWYtQ0x3c696\",\"mutable\":false},{\"name\":\"methodType\",\"required\":false,\"value\":\"webauthn\",\"mutable\":false}]}},\"relatesTo\":{\"type\":\"security_key\",\"key\":\"webauthn\",\"id\":\"autc4m63eWYtQ0x3c696\",\"displayName\":\"Security Key or Biometric\",\"methods\":[{\"type\":\"webauthn\"}]}}]},{\"name\":\"stateHandle\",\"required\":true,\"value\":\"02rTjcyHK0a9fgp7pdzHoumViaAJ3sQN6fpby2Ie_P\",\"visible\":false,\"mutable\":false}],\"accepts\":\"application/json; okta-version=1.0.0\"}]},\"currentAuthenticator\":{\"type\":\"object\",\"value\":{\"contextualData\":{\"qrcode\":{\"method\":\"embedded\",\"href\":\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFnUlEQVR42u3dQW4jMQwEQP//08lhz3sIxCYpqxrYi5FNMhOVIVKW5vMjIv/Nxy0QAUQEEBFARAARAUQEEBFARAARAUREABEBRAQQEUBEABEBRAQQEUBEABEBREQAEQFEBBARQEQAEQHk3w/6fMr//fXnnvw+f72uqntVdV2J3yFxn6v+7oAAAggggADyIJDE90kM7PTXpAEmBuTJ128YP4AAAggggADyCJDOG76tRkgM7Ko3hBOA2/7ugAACCCCAAAJIyQ3vbOdOze07gVdhBwQQQAABBBBAvqYGSQ/IqsHfCarqHt5SewICCCCAAAKIlfSSG37yPRNANgzORE23rbUOCCCAAAIIII8DSc/Jvb7zdftBAPE6IIB4HZCrk6gLEu3l9BtL4hq3tWEBAQQQQAAB5HEgnSvIG07kSMzD063RxP6OzpYyIIAAAggggADStieic6U4fTpK1ZvPhtpt8wcUAQEEEEAAAeQL2rydK+lTh7Ylrr3zcLyqN5b0B0EBAQQQQAAB5EEgne3ZRBszXSt1tkw3HPI2ta8EEEAAAQQQQB5v86ZbqWkU6RX2TixTq/9qEEAAAQQQQAAZqU0Sq72drd2qdmu6Jd7Zut+2rwQQQAABBBBAvqAGmRoMJ4M58X/Tg7YK5i11DSCAAAIIIIA8fjZveg489bOqEHWeIbxt8AMCCCCAAAIIIOMt0Kp27uaTWKra1NueAKUGAQQQQAABBJBxOJ3tx3RNUTVoN8zzp/b7AAIIIIAAAggg0fnwCZCpgZrYb5Jo/3ZuW1aDAAIIIIAAAsjIfLVz78OG9mZiQHaCStSegAACCCCAAPI4kPTJJJ2IOlfh0+3lDc8xV4MAAggggAACSFsLt3M+nJ4bp+ftGx4VkW4FP1WDAAIIIIAAAkhPDXLjIWlV8+3EINn26YIEUkAAAQQQQADxWazxvQMbDrKruj+JFf/0dalBAAEEEEAAASTa8q2aA3fOw7c9/WqqjpiqAQEBBBBAAAEEkOj8c9vBdFP1TvoJVlX3TQ0CCCCAAAIIIG2t3Q3z4U74U/P8zc9831anAAIIIIAAAshyIJ2Hp3W2IjfsDek8XWRqJR0QQAABBBBAACmZeycGWHrvRvp6E9c4VUfcssIOCCCAAAIIIBcB6Zz/T52pm7jGzg9G3rg9FhBAAAEEEEAeBJJGkX5WeNXv0HmSyS1t6s3oAAEEEEAAAeTL2rzpG5Leoju1n2LDBzU7V9sBAQQQQAABBJBVp2Tc0p7dsI03/X8BAQQQQAABBJCR1u7JDZw6HSXRFj4Z8JvrGgfHAQIIIIAAAsgIlqk9I51z+ERbNQFqwzPlAQEEEEAAAQSQEjid89j0ADipdzYcwvZC3QEIIIAAAgggX9Dm7ZzbJ/ZrbFsZr/o+256l/tR+EEAAAQQQQAA5b0t21g7pOXDnowHSbzKdbXk1CCCAAAIIIICMtHM3nHay4SlOVfckgaKqlrGSDggggAACCCDj9cjUXH2qNulsyaYx3rLyDggggAACCCCPtHkT8+2pgbFt1X7q0whViAABBBBAAAHkQSAbWsedh9cl5t6dq/AbrmvFuAIEEEAAAQSQ+2uQbXPXqRXqdGs0/SbQ2V4GBBBAAAEEEECig/bkxt5yyFvVNd5yBnJi/AACCCCAAALII0DST5iaOrRt6gSVzmvsvF5AAAEEEEAAAWQcSFVLs/Mav+mRCok3makAAggggAACCCAjj07oPP0j3TJNP7v8xkPkAAEEEEAAAeRSIIkBOTWQEo9p6GyrVtUpifrCR00AAQQQQAABZOQPuuF82s7nrVfVMlPnCVe94QACCCCAAALI40BEbgwgIoCIACICiAggIoCIACICiAggIoCICCAigIgAIgKICCAigIgAIgKICCAigIgIICKAiAAiAogIICKAiNybXwC74PgvuLG+AAAAAElFTkSuQmCC\",\"type\":\"image/png\"},\"selectedChannel\":\"qrcode\"},\"type\":\"app\",\"key\":\"okta_verify\",\"id\":\"autc4jtfmwtz7GVqM696\",\"displayName\":\"Okta Verify\",\"methods\":[{\"type\":\"signed_nonce\"}]}},\"authenticators\":{\"type\":\"array\",\"value\":[{\"type\":\"app\",\"key\":\"google_otp\",\"id\":\"autc4m1ze3b3RW3hl696\",\"displayName\":\"Google Authenticator\",\"methods\":[{\"type\":\"otp\"}]},{\"type\":\"app\",\"key\":\"okta_verify\",\"id\":\"autc4jtfmwtz7GVqM696\",\"displayName\":\"Okta Verify\",\"methods\":[{\"type\":\"push\"},{\"type\":\"signed_nonce\"},{\"type\":\"totp\"}]},{\"type\":\"security_key\",\"key\":\"webauthn\",\"id\":\"autc4m63eWYtQ0x3c696\",\"displayName\":\"Security Key or Biometric\",\"methods\":[{\"type\":\"webauthn\"}]}]},\"authenticatorEnrollments\":{\"type\":\"array\",\"value\":[{\"type\":\"email\",\"key\":\"okta_email\",\"id\":\"eaegwpl7zBuKFeEkN696\",\"displayName\":\"Email\",\"methods\":[{\"type\":\"email\"}]},{\"type\":\"password\",\"key\":\"okta_password\",\"id\":\"lae1piwpuRpQRA1z7696\",\"displayName\":\"Password\",\"methods\":[{\"type\":\"password\"}]}]},\"enrollmentAuthenticator\":{\"type\":\"object\",\"value\":{\"type\":\"app\",\"key\":\"okta_verify\",\"id\":\"autc4jtfmwtz7GVqM696\",\"displayName\":\"Okta Verify\",\"methods\":[{\"type\":\"signed_nonce\"}]}},\"user\":{\"type\":\"object\",\"value\":{\"id\":\"00ugwpl7ubRby1KKO696\",\"identifier\":\"robnicolo+oie-ciam2022-13@gmail.com\",\"profile\":{\"firstName\":\"John\",\"lastName\":\"Doe 13\",\"timeZone\":\"America/Los_Angeles\",\"locale\":\"en_US\"}}},\"cancel\":{\"rel\":[\"create-form\"],\"name\":\"cancel\",\"href\":\"https://rnicolo-test.okta.com/idp/idx/cancel\",\"method\":\"POST\",\"produces\":\"application/ion+json; okta-version=1.0.0\",\"value\":[{\"name\":\"stateHandle\",\"required\":true,\"value\":\"02rTjcyHK0a9fgp7pdzHoumViaAJ3sQN6fpby2Ie_P\",\"visible\":false,\"mutable\":false}],\"accepts\":\"application/json; okta-version=1.0.0\"},\"app\":{\"type\":\"object\",\"value\":{\"name\":\"oidc_client\",\"label\":\"Express AuthJS Web App\",\"id\":\"0oac4jylqmEmVykvE696\"}}}",
  },
  enabledFeatures: [
  ],
  availableSteps: [
    {
      name: "select-authenticator-enroll",
      inputs: [
        {
          name: "authenticator",
          key: "string",
        },
      ],
      options: [
        {
          label: "Email",
          value: "okta_email",
        },
        {
          label: "Google Authenticator",
          value: "google_otp",
        },
        {
          label: "Phone",
          value: "phone_number",
        },
        {
          label: "Security Key or Biometric",
          value: "webauthn",
        },
      ],
    },
    {
      name: "skip",
      inputs: [
      ],
    },
  ],
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
        label: "Email",
        value: "okta_email",
      },
      {
        label: "Google Authenticator",
        value: "google_otp",
      },
      {
        label: "Phone",
        value: "phone_number",
      },
      {
        label: "Security Key or Biometric",
        value: "webauthn",
      },
    ],
    canSkip: true,
  },
  interactionCode: undefined,
  actions: {
    cancel: async function (params) {
      const headers = {
        'content-type': 'application/json',
        'accept': actionDefinition.accepts || 'application/ion+json'
      };
      const body = (0, _stringify.default)({ ...defaultParamsForAction,
        ...params,
        ...immutableParamsForAction
      });
      const credentials = toPersist && toPersist.withCredentials === false ? 'omit' : 'include';
      return (0, _client.request)(target, {
        method: actionDefinition.method,
        headers,
        body,
        credentials
      }).then(response => {
        const respJson = response.json();

        if (response.ok) {
          return respJson;
        } else if (response.status === 401 && response.headers.get('WWW-Authenticate') === 'Oktadevicejwt realm="Okta Device"') {
          // Okta server responds 401 status code with WWW-Authenticate header and new remediation
          // so that the iOS/MacOS credential SSO extension (Okta Verify) can intercept
          // the response reaches here when Okta Verify is not installed
          // we need to return an idx object so that
          // the SIW can proceed to the next step without showing error
          return respJson.then(err => {
            let ms = (0, _makeIdxState.makeIdxState)(err, toPersist); // set to true if flow should be continued without showing any errors

            ms.stepUp = true;
            return _promise.default.reject(ms);
          });
        }

        return respJson.then(err => {
          return _promise.default.reject((0, _makeIdxState.makeIdxState)(err, toPersist));
        });
      }).then(idxResponse => (0, _makeIdxState.makeIdxState)(idxResponse, toPersist));
    },
  },
  context: {
    version: "1.0.0",
    stateHandle: "02rTjcyHK0a9fgp7pdzHoumViaAJ3sQN6fpby2Ie_P",
    expiresAt: "2022-02-17T20:48:55.000Z",
    intent: "LOGIN",
    authenticators: {
      type: "array",
      value: [
        {
          type: "email",
          key: "okta_email",
          id: "autc4jtfi4OFlB17F696",
          displayName: "Email",
          methods: [
            {
              type: "email",
            },
          ],
        },
        {
          type: "app",
          key: "google_otp",
          id: "autc4m1ze3b3RW3hl696",
          displayName: "Google Authenticator",
          methods: [
            {
              type: "otp",
            },
          ],
        },
        {
          type: "phone",
          key: "phone_number",
          id: "autc4jtfkKj7QIdaH696",
          displayName: "Phone",
          methods: [
            {
              type: "sms",
            },
          ],
        },
        {
          type: "security_key",
          key: "webauthn",
          id: "autc4m63eWYtQ0x3c696",
          displayName: "Security Key or Biometric",
          methods: [
            {
              type: "webauthn",
            },
          ],
        },
      ],
    },
    authenticatorEnrollments: {
      type: "array",
      value: [
        {
          type: "email",
          key: "okta_email",
          id: "eaegwpl7zBuKFeEkN696",
          displayName: "Email",
          methods: [
            {
              type: "email",
            },
          ],
        },
        {
          type: "app",
          key: "okta_verify",
          id: "pfdgzks9oPnMtERBG696",
          displayName: "Okta Verify",
          methods: [
            {
              type: "push",
            },
            {
              type: "signed_nonce",
            },
            {
              type: "totp",
            },
          ],
        },
        {
          type: "password",
          key: "okta_password",
          id: "lae1piwpuRpQRA1z7696",
          displayName: "Password",
          methods: [
            {
              type: "password",
            },
          ],
        },
      ],
    },
    user: {
      type: "object",
      value: {
        id: "00ugwpl7ubRby1KKO696",
        identifier: "robnicolo+oie-ciam2022-13@gmail.com",
        profile: {
          firstName: "John",
          lastName: "Doe 13",
          timeZone: "America/Los_Angeles",
          locale: "en_US",
        },
      },
    },
    app: {
      type: "object",
      value: {
        name: "oidc_client",
        label: "Express AuthJS Web App",
        id: "0oac4jylqmEmVykvE696",
      },
    },
  },
  neededToProceed: [
    {
      rel: [
        "create-form",
      ],
      name: "select-authenticator-enroll",
      href: "https://rnicolo-test.okta.com/idp/idx/credential/enroll",
      method: "POST",
      produces: "application/ion+json; okta-version=1.0.0",
      value: [
        {
          name: "authenticator",
          type: "object",
          options: [
            {
              label: "Email",
              value: {
                form: {
                  value: [
                    {
                      name: "id",
                      required: true,
                      value: "autc4jtfi4OFlB17F696",
                      mutable: false,
                    },
                    {
                      name: "methodType",
                      required: false,
                      value: "email",
                      mutable: false,
                    },
                  ],
                },
              },
              relatesTo: {
                type: "email",
                key: "okta_email",
                id: "autc4jtfi4OFlB17F696",
                displayName: "Email",
                methods: [
                  {
                    type: "email",
                  },
                ],
              },
            },
            {
              label: "Google Authenticator",
              value: {
                form: {
                  value: [
                    {
                      name: "id",
                      required: true,
                      value: "autc4m1ze3b3RW3hl696",
                      mutable: false,
                    },
                    {
                      name: "methodType",
                      required: false,
                      value: "otp",
                      mutable: false,
                    },
                  ],
                },
              },
              relatesTo: {
                type: "app",
                key: "google_otp",
                id: "autc4m1ze3b3RW3hl696",
                displayName: "Google Authenticator",
                methods: [
                  {
                    type: "otp",
                  },
                ],
              },
            },
            {
              label: "Phone",
              value: {
                form: {
                  value: [
                    {
                      name: "id",
                      required: true,
                      value: "autc4jtfkKj7QIdaH696",
                      mutable: false,
                    },
                    {
                      name: "methodType",
                      type: "string",
                      required: false,
                      options: [
                        {
                          label: "SMS",
                          value: "sms",
                        },
                      ],
                    },
                    {
                      name: "phoneNumber",
                      label: "Phone number",
                      required: false,
                    },
                  ],
                },
              },
              relatesTo: {
                type: "phone",
                key: "phone_number",
                id: "autc4jtfkKj7QIdaH696",
                displayName: "Phone",
                methods: [
                  {
                    type: "sms",
                  },
                ],
              },
            },
            {
              label: "Security Key or Biometric",
              value: {
                form: {
                  value: [
                    {
                      name: "id",
                      required: true,
                      value: "autc4m63eWYtQ0x3c696",
                      mutable: false,
                    },
                    {
                      name: "methodType",
                      required: false,
                      value: "webauthn",
                      mutable: false,
                    },
                  ],
                },
              },
              relatesTo: {
                type: "security_key",
                key: "webauthn",
                id: "autc4m63eWYtQ0x3c696",
                displayName: "Security Key or Biometric",
                methods: [
                  {
                    type: "webauthn",
                  },
                ],
              },
            },
          ],
        },
        {
          name: "stateHandle",
          required: true,
          value: "02rTjcyHK0a9fgp7pdzHoumViaAJ3sQN6fpby2Ie_P",
          visible: false,
          mutable: false,
        },
      ],
      accepts: "application/json; okta-version=1.0.0",
      action: async function (params) {
        const headers = {
          'content-type': 'application/json',
          'accept': actionDefinition.accepts || 'application/ion+json'
        };
        const body = (0, _stringify.default)({ ...defaultParamsForAction,
          ...params,
          ...immutableParamsForAction
        });
        const credentials = toPersist && toPersist.withCredentials === false ? 'omit' : 'include';
        return (0, _client.request)(target, {
          method: actionDefinition.method,
          headers,
          body,
          credentials
        }).then(response => {
          const respJson = response.json();

          if (response.ok) {
            return respJson;
          } else if (response.status === 401 && response.headers.get('WWW-Authenticate') === 'Oktadevicejwt realm="Okta Device"') {
            // Okta server responds 401 status code with WWW-Authenticate header and new remediation
            // so that the iOS/MacOS credential SSO extension (Okta Verify) can intercept
            // the response reaches here when Okta Verify is not installed
            // we need to return an idx object so that
            // the SIW can proceed to the next step without showing error
            return respJson.then(err => {
              let ms = (0, _makeIdxState.makeIdxState)(err, toPersist); // set to true if flow should be continued without showing any errors

              ms.stepUp = true;
              return _promise.default.reject(ms);
            });
          }

          return respJson.then(err => {
            return _promise.default.reject((0, _makeIdxState.makeIdxState)(err, toPersist));
          });
        }).then(idxResponse => (0, _makeIdxState.makeIdxState)(idxResponse, toPersist));
      },
    },
    {
      rel: [
        "create-form",
      ],
      name: "skip",
      href: "https://rnicolo-test.okta.com/idp/idx/skip",
      method: "POST",
      produces: "application/ion+json; okta-version=1.0.0",
      value: [
        {
          name: "stateHandle",
          required: true,
          value: "02rTjcyHK0a9fgp7pdzHoumViaAJ3sQN6fpby2Ie_P",
          visible: false,
          mutable: false,
        },
      ],
      accepts: "application/json; okta-version=1.0.0",
      action: async function (params) {
        const headers = {
          'content-type': 'application/json',
          'accept': actionDefinition.accepts || 'application/ion+json'
        };
        const body = (0, _stringify.default)({ ...defaultParamsForAction,
          ...params,
          ...immutableParamsForAction
        });
        const credentials = toPersist && toPersist.withCredentials === false ? 'omit' : 'include';
        return (0, _client.request)(target, {
          method: actionDefinition.method,
          headers,
          body,
          credentials
        }).then(response => {
          const respJson = response.json();

          if (response.ok) {
            return respJson;
          } else if (response.status === 401 && response.headers.get('WWW-Authenticate') === 'Oktadevicejwt realm="Okta Device"') {
            // Okta server responds 401 status code with WWW-Authenticate header and new remediation
            // so that the iOS/MacOS credential SSO extension (Okta Verify) can intercept
            // the response reaches here when Okta Verify is not installed
            // we need to return an idx object so that
            // the SIW can proceed to the next step without showing error
            return respJson.then(err => {
              let ms = (0, _makeIdxState.makeIdxState)(err, toPersist); // set to true if flow should be continued without showing any errors

              ms.stepUp = true;
              return _promise.default.reject(ms);
            });
          }

          return respJson.then(err => {
            return _promise.default.reject((0, _makeIdxState.makeIdxState)(err, toPersist));
          });
        }).then(idxResponse => (0, _makeIdxState.makeIdxState)(idxResponse, toPersist));
      },
    },
  ],
  proceed: async function (remediationChoice, paramsFromUser = {}) {
    /*
    remediationChoice is the name attribute on each form
    name should remain unique for items inside the remediation that are considered forms(identify, select-factor)
    name can be duplicate for items like redirect where its not considered a form(redirect)
    when names are not unique its a redirect to a href, so widget wont POST to idx-js layer.
    */
    const remediationChoiceObject = (0, _find.default)(remediations).call(remediations, remediation => remediation.name === remediationChoice);

    if (!remediationChoiceObject) {
      return _promise.default.reject(`Unknown remediation choice: [${remediationChoice}]`);
    }

    return remediationChoiceObject.action(paramsFromUser);
  },
  rawIdxState: {
    version: "1.0.0",
    stateHandle: "02rTjcyHK0a9fgp7pdzHoumViaAJ3sQN6fpby2Ie_P",
    expiresAt: "2022-02-17T20:48:55.000Z",
    intent: "LOGIN",
    remediation: {
      type: "array",
      value: [
        {
          rel: [
            "create-form",
          ],
          name: "select-authenticator-enroll",
          href: "https://rnicolo-test.okta.com/idp/idx/credential/enroll",
          method: "POST",
          produces: "application/ion+json; okta-version=1.0.0",
          value: [
            {
              name: "authenticator",
              type: "object",
              options: [
                {
                  label: "Email",
                  value: {
                    form: {
                      value: [
                        {
                          name: "id",
                          required: true,
                          value: "autc4jtfi4OFlB17F696",
                          mutable: false,
                        },
                        {
                          name: "methodType",
                          required: false,
                          value: "email",
                          mutable: false,
                        },
                      ],
                    },
                  },
                  relatesTo: {
                    type: "email",
                    key: "okta_email",
                    id: "autc4jtfi4OFlB17F696",
                    displayName: "Email",
                    methods: [
                      {
                        type: "email",
                      },
                    ],
                  },
                },
                {
                  label: "Google Authenticator",
                  value: {
                    form: {
                      value: [
                        {
                          name: "id",
                          required: true,
                          value: "autc4m1ze3b3RW3hl696",
                          mutable: false,
                        },
                        {
                          name: "methodType",
                          required: false,
                          value: "otp",
                          mutable: false,
                        },
                      ],
                    },
                  },
                  relatesTo: {
                    type: "app",
                    key: "google_otp",
                    id: "autc4m1ze3b3RW3hl696",
                    displayName: "Google Authenticator",
                    methods: [
                      {
                        type: "otp",
                      },
                    ],
                  },
                },
                {
                  label: "Phone",
                  value: {
                    form: {
                      value: [
                        {
                          name: "id",
                          required: true,
                          value: "autc4jtfkKj7QIdaH696",
                          mutable: false,
                        },
                        {
                          name: "methodType",
                          type: "string",
                          required: false,
                          options: [
                            {
                              label: "SMS",
                              value: "sms",
                            },
                          ],
                        },
                        {
                          name: "phoneNumber",
                          label: "Phone number",
                          required: false,
                        },
                      ],
                    },
                  },
                  relatesTo: {
                    type: "phone",
                    key: "phone_number",
                    id: "autc4jtfkKj7QIdaH696",
                    displayName: "Phone",
                    methods: [
                      {
                        type: "sms",
                      },
                    ],
                  },
                },
                {
                  label: "Security Key or Biometric",
                  value: {
                    form: {
                      value: [
                        {
                          name: "id",
                          required: true,
                          value: "autc4m63eWYtQ0x3c696",
                          mutable: false,
                        },
                        {
                          name: "methodType",
                          required: false,
                          value: "webauthn",
                          mutable: false,
                        },
                      ],
                    },
                  },
                  relatesTo: {
                    type: "security_key",
                    key: "webauthn",
                    id: "autc4m63eWYtQ0x3c696",
                    displayName: "Security Key or Biometric",
                    methods: [
                      {
                        type: "webauthn",
                      },
                    ],
                  },
                },
              ],
            },
            {
              name: "stateHandle",
              required: true,
              value: "02rTjcyHK0a9fgp7pdzHoumViaAJ3sQN6fpby2Ie_P",
              visible: false,
              mutable: false,
            },
          ],
          accepts: "application/json; okta-version=1.0.0",
        },
        {
          rel: [
            "create-form",
          ],
          name: "skip",
          href: "https://rnicolo-test.okta.com/idp/idx/skip",
          method: "POST",
          produces: "application/ion+json; okta-version=1.0.0",
          value: [
            {
              name: "stateHandle",
              required: true,
              value: "02rTjcyHK0a9fgp7pdzHoumViaAJ3sQN6fpby2Ie_P",
              visible: false,
              mutable: false,
            },
          ],
          accepts: "application/json; okta-version=1.0.0",
        },
      ],
    },
    authenticators: {
      type: "array",
      value: [
        {
          type: "email",
          key: "okta_email",
          id: "autc4jtfi4OFlB17F696",
          displayName: "Email",
          methods: [
            {
              type: "email",
            },
          ],
        },
        {
          type: "app",
          key: "google_otp",
          id: "autc4m1ze3b3RW3hl696",
          displayName: "Google Authenticator",
          methods: [
            {
              type: "otp",
            },
          ],
        },
        {
          type: "phone",
          key: "phone_number",
          id: "autc4jtfkKj7QIdaH696",
          displayName: "Phone",
          methods: [
            {
              type: "sms",
            },
          ],
        },
        {
          type: "security_key",
          key: "webauthn",
          id: "autc4m63eWYtQ0x3c696",
          displayName: "Security Key or Biometric",
          methods: [
            {
              type: "webauthn",
            },
          ],
        },
      ],
    },
    authenticatorEnrollments: {
      type: "array",
      value: [
        {
          type: "email",
          key: "okta_email",
          id: "eaegwpl7zBuKFeEkN696",
          displayName: "Email",
          methods: [
            {
              type: "email",
            },
          ],
        },
        {
          type: "app",
          key: "okta_verify",
          id: "pfdgzks9oPnMtERBG696",
          displayName: "Okta Verify",
          methods: [
            {
              type: "push",
            },
            {
              type: "signed_nonce",
            },
            {
              type: "totp",
            },
          ],
        },
        {
          type: "password",
          key: "okta_password",
          id: "lae1piwpuRpQRA1z7696",
          displayName: "Password",
          methods: [
            {
              type: "password",
            },
          ],
        },
      ],
    },
    user: {
      type: "object",
      value: {
        id: "00ugwpl7ubRby1KKO696",
        identifier: "robnicolo+oie-ciam2022-13@gmail.com",
        profile: {
          firstName: "John",
          lastName: "Doe 13",
          timeZone: "America/Los_Angeles",
          locale: "en_US",
        },
      },
    },
    cancel: {
      rel: [
        "create-form",
      ],
      name: "cancel",
      href: "https://rnicolo-test.okta.com/idp/idx/cancel",
      method: "POST",
      produces: "application/ion+json; okta-version=1.0.0",
      value: [
        {
          name: "stateHandle",
          required: true,
          value: "02rTjcyHK0a9fgp7pdzHoumViaAJ3sQN6fpby2Ie_P",
          visible: false,
          mutable: false,
        },
      ],
      accepts: "application/json; okta-version=1.0.0",
    },
    app: {
      type: "object",
      value: {
        name: "oidc_client",
        label: "Express AuthJS Web App",
        id: "0oac4jylqmEmVykvE696",
      },
    },
  },
}
```


Objectd on client
```javascript
{
    "name": "select-authenticator-enroll",
    "inputs": [
        {
            "name": "authenticator",
            "key": "string"
        }
    ],
    "options": [
        {
            "label": "Email",
            "value": "okta_email"
        },
        {
            "label": "Google Authenticator",
            "value": "google_otp"
        },
        {
            "label": "Phone",
            "value": "phone_number"
        },
        {
            "label": "Security Key or Biometric",
            "value": "webauthn"
        }
    ],
    "canSkip": true,
    "nextRoute": "/select-authenticator?state=38dcb86ea3139a784f2c3b3298073b23"
}
```

```javascript
// Handle select-authenticator
router.get('/select-authenticator', (req, res) => {
  const {
    idx: { nextStep: { options, canSkip } }
  } = req.getFlowStates();
  renderPage({
    req, res,
    render: () => renderTemplate(req, res, 'select-authenticator', {
      options,
      action: '/select-authenticator',
      canSkip,
      skipAction: '/select-authenticator/skip'
    })
  });
});
```
-->
