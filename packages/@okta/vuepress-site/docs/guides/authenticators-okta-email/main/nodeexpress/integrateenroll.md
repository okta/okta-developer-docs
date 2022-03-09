> **TBD:** Waiting for Product Management clarification

<!-- ### 1. Register a new user

```javascript
  const authClient = getAuthClient(req);
  const transaction = await authClient.idx.authenticate({ username,password});
```

password setup

### 2. Show Email to Enroll

nextSTep.name select-authenticator-enroll

FROM NEW USER REGISTRATION

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
    clientId: "0oai9ifvveyL3QZ8K696",
    redirectUri: "http://localhost:8080/login/callback",
    responseType: "code",
    scopes: [
      "openid",
      "profile",
      "email",
    ],
    state: "210c26ee3b1c704364c6510a8cbe60f6",
    nonce: "S1eUW0wWAAPbIwfN3MxGYtOqEt5SXBy1b2o756zUK9FxtjFgVIQjMYiPwRoDTsSB",
    ignoreSignature: false,
    codeVerifier: "16b99c2494072d13a9d49a0e624415acd411c78ac67",
    codeChallengeMethod: "S256",
    codeChallenge: "aK1C4LbWy7VIMXm4H0xls6c_Rl19d9bQ5ZcjdXcAyio",
    flow: "register",
    withCredentials: false,
    interactionHandle: "OTl8G73MrkisvObSBxVjOyVsNGyfzIAYgKe5uIpn7Y0",
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
    ],
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
    stateHandle: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
    expiresAt: "2022-03-07T16:54:25.000Z",
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
      ],
    },
    authenticatorEnrollments: {
      type: "array",
      value: [
        {
          type: "email",
          key: "okta_email",
          id: "eaeik4nqe8Ue1MAL2696",
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
          id: "lae1yzhuttrYVWC8x696",
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
        id: "00uik4nq7E9tO4RJi696",
        identifier: "robnicolo+oie-ciam2022-26@gmail.com",
        profile: {
          firstName: "John",
          lastName: "Doe 26",
          timeZone: "America/Los_Angeles",
          locale: "en_US",
        },
      },
    },
    app: {
      type: "object",
      value: {
        name: "oidc_client",
        label: "My Express Web App 2",
        id: "0oai9ifvveyL3QZ8K696",
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
          ],
        },
        {
          name: "stateHandle",
          required: true,
          value: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
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
    stateHandle: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
    expiresAt: "2022-03-07T16:54:25.000Z",
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
              ],
            },
            {
              name: "stateHandle",
              required: true,
              value: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
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
      ],
    },
    authenticatorEnrollments: {
      type: "array",
      value: [
        {
          type: "email",
          key: "okta_email",
          id: "eaeik4nqe8Ue1MAL2696",
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
          id: "lae1yzhuttrYVWC8x696",
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
        id: "00uik4nq7E9tO4RJi696",
        identifier: "robnicolo+oie-ciam2022-26@gmail.com",
        profile: {
          firstName: "John",
          lastName: "Doe 26",
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
          value: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
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
        label: "My Express Web App 2",
        id: "0oai9ifvveyL3QZ8K696",
      },
    },
  },
}
```

### 3. Select Email

`okta_email`

```javascript
    const { authenticator } = req.body;
    const authClient = getAuthClient(req);
    const transaction = await authClient.idx.proceed({ authenticator });
    handleTransaction({ req, res, next, authClient, transaction });

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
    clientId: "0oai9ifvveyL3QZ8K696",
    redirectUri: "http://localhost:8080/login/callback",
    responseType: "code",
    scopes: [
      "openid",
      "profile",
      "email",
    ],
    state: "210c26ee3b1c704364c6510a8cbe60f6",
    nonce: "S1eUW0wWAAPbIwfN3MxGYtOqEt5SXBy1b2o756zUK9FxtjFgVIQjMYiPwRoDTsSB",
    ignoreSignature: false,
    codeVerifier: "16b99c2494072d13a9d49a0e624415acd411c78ac67",
    codeChallengeMethod: "S256",
    codeChallenge: "aK1C4LbWy7VIMXm4H0xls6c_Rl19d9bQ5ZcjdXcAyio",
    flow: "register",
    withCredentials: false,
    interactionHandle: "OTl8G73MrkisvObSBxVjOyVsNGyfzIAYgKe5uIpn7Y0",
  },
  enabledFeatures: [
  ],
  availableSteps: [
    {
      name: "enroll-authenticator",
      inputs: [
        {
          name: "verificationCode",
          label: "Enter code",
          type: "string",
          required: true,
        },
      ],
      type: "email",
      authenticator: {
        resend: {
          rel: [
            "create-form",
          ],
          name: "resend",
          href: "https://rnicolo-test.okta.com/idp/idx/challenge/resend",
          method: "POST",
          produces: "application/ion+json; okta-version=1.0.0",
          value: [
            {
              name: "stateHandle",
              required: true,
              value: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
              visible: false,
              mutable: false,
            },
          ],
          accepts: "application/json; okta-version=1.0.0",
        },
        poll: {
          rel: [
            "create-form",
          ],
          name: "poll",
          href: "https://rnicolo-test.okta.com/idp/idx/challenge/poll",
          method: "POST",
          produces: "application/ion+json; okta-version=1.0.0",
          refresh: 4000,
          value: [
            {
              name: "stateHandle",
              required: true,
              value: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
              visible: false,
              mutable: false,
            },
          ],
          accepts: "application/json; okta-version=1.0.0",
        },
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
      authenticatorEnrollments: [
        {
          type: "email",
          key: "okta_email",
          id: "eaeik4nqe8Ue1MAL2696",
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
          id: "lae1yzhuttrYVWC8x696",
          displayName: "Password",
          methods: [
            {
              type: "password",
            },
          ],
        },
      ],
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
          label: "Email",
          value: "okta_email",
        },
      ],
    },
  ],
  nextStep: {
    name: "enroll-authenticator",
    inputs: [
      {
        name: "verificationCode",
        label: "Enter code",
        type: "string",
        required: true,
      },
    ],
    type: "email",
    authenticator: {
      resend: {
        rel: [
          "create-form",
        ],
        name: "resend",
        href: "https://rnicolo-test.okta.com/idp/idx/challenge/resend",
        method: "POST",
        produces: "application/ion+json; okta-version=1.0.0",
        value: [
          {
            name: "stateHandle",
            required: true,
            value: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
            visible: false,
            mutable: false,
          },
        ],
        accepts: "application/json; okta-version=1.0.0",
      },
      poll: {
        rel: [
          "create-form",
        ],
        name: "poll",
        href: "https://rnicolo-test.okta.com/idp/idx/challenge/poll",
        method: "POST",
        produces: "application/ion+json; okta-version=1.0.0",
        refresh: 4000,
        value: [
          {
            name: "stateHandle",
            required: true,
            value: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
            visible: false,
            mutable: false,
          },
        ],
        accepts: "application/json; okta-version=1.0.0",
      },
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
    authenticatorEnrollments: [
      {
        type: "email",
        key: "okta_email",
        id: "eaeik4nqe8Ue1MAL2696",
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
        id: "lae1yzhuttrYVWC8x696",
        displayName: "Password",
        methods: [
          {
            type: "password",
          },
        ],
      },
    ],
    canResend: true,
  },
  interactionCode: undefined,
  actions: {
    "currentAuthenticator-resend": async function (params) {
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
    "currentAuthenticator-poll": async function (params) {
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
    stateHandle: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
    expiresAt: "2022-03-07T16:58:48.000Z",
    intent: "LOGIN",
    currentAuthenticator: {
      type: "object",
      value: {
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
      ],
    },
    authenticatorEnrollments: {
      type: "array",
      value: [
        {
          type: "email",
          key: "okta_email",
          id: "eaeik4nqe8Ue1MAL2696",
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
          id: "lae1yzhuttrYVWC8x696",
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
    user: {
      type: "object",
      value: {
        id: "00uik4nq7E9tO4RJi696",
        identifier: "robnicolo+oie-ciam2022-26@gmail.com",
        profile: {
          firstName: "John",
          lastName: "Doe 26",
          timeZone: "America/Los_Angeles",
          locale: "en_US",
        },
      },
    },
    app: {
      type: "object",
      value: {
        name: "oidc_client",
        label: "My Express Web App 2",
        id: "0oai9ifvveyL3QZ8K696",
      },
    },
  },
  neededToProceed: [
    {
      rel: [
        "create-form",
      ],
      name: "enroll-authenticator",
      relatesTo: {
        type: "object",
        value: {
          resend: {
            rel: [
              "create-form",
            ],
            name: "resend",
            href: "https://rnicolo-test.okta.com/idp/idx/challenge/resend",
            method: "POST",
            produces: "application/ion+json; okta-version=1.0.0",
            value: [
              {
                name: "stateHandle",
                required: true,
                value: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
                visible: false,
                mutable: false,
              },
            ],
            accepts: "application/json; okta-version=1.0.0",
          },
          poll: {
            rel: [
              "create-form",
            ],
            name: "poll",
            href: "https://rnicolo-test.okta.com/idp/idx/challenge/poll",
            method: "POST",
            produces: "application/ion+json; okta-version=1.0.0",
            refresh: 4000,
            value: [
              {
                name: "stateHandle",
                required: true,
                value: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
                visible: false,
                mutable: false,
              },
            ],
            accepts: "application/json; okta-version=1.0.0",
          },
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
      href: "https://rnicolo-test.okta.com/idp/idx/challenge/answer",
      method: "POST",
      produces: "application/ion+json; okta-version=1.0.0",
      value: [
        {
          name: "credentials",
          type: "object",
          form: {
            value: [
              {
                name: "passcode",
                label: "Enter code",
              },
            ],
          },
          required: true,
        },
        {
          name: "stateHandle",
          required: true,
          value: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
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
          ],
        },
        {
          name: "stateHandle",
          required: true,
          value: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
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
    stateHandle: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
    expiresAt: "2022-03-07T16:58:48.000Z",
    intent: "LOGIN",
    remediation: {
      type: "array",
      value: [
        {
          rel: [
            "create-form",
          ],
          name: "enroll-authenticator",
          relatesTo: {
            type: "object",
            value: {
              resend: {
                rel: [
                  "create-form",
                ],
                name: "resend",
                href: "https://rnicolo-test.okta.com/idp/idx/challenge/resend",
                method: "POST",
                produces: "application/ion+json; okta-version=1.0.0",
                value: [
                  {
                    name: "stateHandle",
                    required: true,
                    value: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
                    visible: false,
                    mutable: false,
                  },
                ],
                accepts: "application/json; okta-version=1.0.0",
              },
              poll: {
                rel: [
                  "create-form",
                ],
                name: "poll",
                href: "https://rnicolo-test.okta.com/idp/idx/challenge/poll",
                method: "POST",
                produces: "application/ion+json; okta-version=1.0.0",
                refresh: 4000,
                value: [
                  {
                    name: "stateHandle",
                    required: true,
                    value: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
                    visible: false,
                    mutable: false,
                  },
                ],
                accepts: "application/json; okta-version=1.0.0",
              },
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
          href: "https://rnicolo-test.okta.com/idp/idx/challenge/answer",
          method: "POST",
          produces: "application/ion+json; okta-version=1.0.0",
          value: [
            {
              name: "credentials",
              type: "object",
              form: {
                value: [
                  {
                    name: "passcode",
                    label: "Enter code",
                  },
                ],
              },
              required: true,
            },
            {
              name: "stateHandle",
              required: true,
              value: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
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
              ],
            },
            {
              name: "stateHandle",
              required: true,
              value: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
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
        resend: {
          rel: [
            "create-form",
          ],
          name: "resend",
          href: "https://rnicolo-test.okta.com/idp/idx/challenge/resend",
          method: "POST",
          produces: "application/ion+json; okta-version=1.0.0",
          value: [
            {
              name: "stateHandle",
              required: true,
              value: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
              visible: false,
              mutable: false,
            },
          ],
          accepts: "application/json; okta-version=1.0.0",
        },
        poll: {
          rel: [
            "create-form",
          ],
          name: "poll",
          href: "https://rnicolo-test.okta.com/idp/idx/challenge/poll",
          method: "POST",
          produces: "application/ion+json; okta-version=1.0.0",
          refresh: 4000,
          value: [
            {
              name: "stateHandle",
              required: true,
              value: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
              visible: false,
              mutable: false,
            },
          ],
          accepts: "application/json; okta-version=1.0.0",
        },
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
      ],
    },
    authenticatorEnrollments: {
      type: "array",
      value: [
        {
          type: "email",
          key: "okta_email",
          id: "eaeik4nqe8Ue1MAL2696",
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
          id: "lae1yzhuttrYVWC8x696",
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
    user: {
      type: "object",
      value: {
        id: "00uik4nq7E9tO4RJi696",
        identifier: "robnicolo+oie-ciam2022-26@gmail.com",
        profile: {
          firstName: "John",
          lastName: "Doe 26",
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
          value: "02YimFL6VGe9UQCVRXOryO_o1MxjeXF4THmBTWx_71",
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
        label: "My Express Web App 2",
        id: "0oai9ifvveyL3QZ8K696",
      },
    },
  },
}
```

FROM ENROLLMENT
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
    clientId: "0oai9ifvveyL3QZ8K696",
    redirectUri: "http://localhost:8080/login/callback",
    responseType: "code",
    scopes: [
      "openid",
      "profile",
      "email",
    ],
    state: "ab96610f17c18707e1d6f6c29d843400",
    nonce: "MsH9t286X3XYL4che0vU30sfBhzJcD7YO2D32lY6khWkAjCCZTJKLh8ihM4a2Vj2",
    ignoreSignature: false,
    codeVerifier: "31820342ff51e86e4e8f6491dc9a9968bd3872daf61",
    codeChallengeMethod: "S256",
    codeChallenge: "Zucp-LGKyli6a_uk98iWS2TpgEINuiaYjzzxA-7BTis",
    flow: "register",
    withCredentials: false,
    interactionHandle: "Wixz0Fvh0B6Oax17a8xyLE6sOjtmtbP_6HMFrb2cWnM",
  },
  enabledFeatures: [
  ],
  availableSteps: [
    {
      name: "enroll-authenticator",
      inputs: [
        {
          name: "verificationCode",
          label: "Enter code",
          type: "string",
          required: true,
        },
      ],
      type: "email",
      authenticator: {
        resend: {
          rel: [
            "create-form",
          ],
          name: "resend",
          href: "https://rnicolo-test.okta.com/idp/idx/challenge/resend",
          method: "POST",
          produces: "application/ion+json; okta-version=1.0.0",
          value: [
            {
              name: "stateHandle",
              required: true,
              value: "02SzZN0yMM4ZA3Pjl6Uv0xARWifC_NnnyoddtmoJDf",
              visible: false,
              mutable: false,
            },
          ],
          accepts: "application/json; okta-version=1.0.0",
        },
        poll: {
          rel: [
            "create-form",
          ],
          name: "poll",
          href: "https://rnicolo-test.okta.com/idp/idx/challenge/poll",
          method: "POST",
          produces: "application/ion+json; okta-version=1.0.0",
          refresh: 4000,
          value: [
            {
              name: "stateHandle",
              required: true,
              value: "02SzZN0yMM4ZA3Pjl6Uv0xARWifC_NnnyoddtmoJDf",
              visible: false,
              mutable: false,
            },
          ],
          accepts: "application/json; okta-version=1.0.0",
        },
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
      authenticatorEnrollments: [
        {
          type: "email",
          key: "okta_email",
          id: "eaeikalq3HocuxQLc696",
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
          id: "pfdik9dt4zlYWEUD0696",
          displayName: "Okta Verify",
          methods: [
            {
              type: "push",
            },
            {
              type: "totp",
            },
          ],
        },
        {
          type: "password",
          key: "okta_password",
          id: "lae1z09p52sRrLfhl696",
          displayName: "Password",
          methods: [
            {
              type: "password",
            },
          ],
        },
      ],
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
    name: "enroll-authenticator",
    inputs: [
      {
        name: "verificationCode",
        label: "Enter code",
        type: "string",
        required: true,
      },
    ],
    type: "email",
    authenticator: {
      resend: {
        rel: [
          "create-form",
        ],
        name: "resend",
        href: "https://rnicolo-test.okta.com/idp/idx/challenge/resend",
        method: "POST",
        produces: "application/ion+json; okta-version=1.0.0",
        value: [
          {
            name: "stateHandle",
            required: true,
            value: "02SzZN0yMM4ZA3Pjl6Uv0xARWifC_NnnyoddtmoJDf",
            visible: false,
            mutable: false,
          },
        ],
        accepts: "application/json; okta-version=1.0.0",
      },
      poll: {
        rel: [
          "create-form",
        ],
        name: "poll",
        href: "https://rnicolo-test.okta.com/idp/idx/challenge/poll",
        method: "POST",
        produces: "application/ion+json; okta-version=1.0.0",
        refresh: 4000,
        value: [
          {
            name: "stateHandle",
            required: true,
            value: "02SzZN0yMM4ZA3Pjl6Uv0xARWifC_NnnyoddtmoJDf",
            visible: false,
            mutable: false,
          },
        ],
        accepts: "application/json; okta-version=1.0.0",
      },
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
    authenticatorEnrollments: [
      {
        type: "email",
        key: "okta_email",
        id: "eaeikalq3HocuxQLc696",
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
        id: "pfdik9dt4zlYWEUD0696",
        displayName: "Okta Verify",
        methods: [
          {
            type: "push",
          },
          {
            type: "totp",
          },
        ],
      },
      {
        type: "password",
        key: "okta_password",
        id: "lae1z09p52sRrLfhl696",
        displayName: "Password",
        methods: [
          {
            type: "password",
          },
        ],
      },
    ],
    canSkip: true,
    canResend: true,
  },
  interactionCode: undefined,
  actions: {
    "currentAuthenticator-resend": async function (params) {
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
    "currentAuthenticator-poll": async function (params) {
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
    stateHandle: "02SzZN0yMM4ZA3Pjl6Uv0xARWifC_NnnyoddtmoJDf",
    expiresAt: "2022-03-07T17:26:54.000Z",
    intent: "LOGIN",
    currentAuthenticator: {
      type: "object",
      value: {
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
          id: "eaeikalq3HocuxQLc696",
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
          id: "pfdik9dt4zlYWEUD0696",
          displayName: "Okta Verify",
          methods: [
            {
              type: "push",
            },
            {
              type: "totp",
            },
          ],
        },
        {
          type: "password",
          key: "okta_password",
          id: "lae1z09p52sRrLfhl696",
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
    user: {
      type: "object",
      value: {
        id: "00uikalpvbEgc3tCZ696",
        identifier: "robnicolo+oie-ciam2022-27@gmail.com",
        profile: {
          firstName: "John",
          lastName: "Doe 27",
          timeZone: "America/Los_Angeles",
          locale: "en_US",
        },
      },
    },
    app: {
      type: "object",
      value: {
        name: "oidc_client",
        label: "My Express Web App 2",
        id: "0oai9ifvveyL3QZ8K696",
      },
    },
  },
  neededToProceed: [
    {
      rel: [
        "create-form",
      ],
      name: "enroll-authenticator",
      relatesTo: {
        type: "object",
        value: {
          resend: {
            rel: [
              "create-form",
            ],
            name: "resend",
            href: "https://rnicolo-test.okta.com/idp/idx/challenge/resend",
            method: "POST",
            produces: "application/ion+json; okta-version=1.0.0",
            value: [
              {
                name: "stateHandle",
                required: true,
                value: "02SzZN0yMM4ZA3Pjl6Uv0xARWifC_NnnyoddtmoJDf",
                visible: false,
                mutable: false,
              },
            ],
            accepts: "application/json; okta-version=1.0.0",
          },
          poll: {
            rel: [
              "create-form",
            ],
            name: "poll",
            href: "https://rnicolo-test.okta.com/idp/idx/challenge/poll",
            method: "POST",
            produces: "application/ion+json; okta-version=1.0.0",
            refresh: 4000,
            value: [
              {
                name: "stateHandle",
                required: true,
                value: "02SzZN0yMM4ZA3Pjl6Uv0xARWifC_NnnyoddtmoJDf",
                visible: false,
                mutable: false,
              },
            ],
            accepts: "application/json; okta-version=1.0.0",
          },
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
      href: "https://rnicolo-test.okta.com/idp/idx/challenge/answer",
      method: "POST",
      produces: "application/ion+json; okta-version=1.0.0",
      value: [
        {
          name: "credentials",
          type: "object",
          form: {
            value: [
              {
                name: "passcode",
                label: "Enter code",
              },
            ],
          },
          required: true,
        },
        {
          name: "stateHandle",
          required: true,
          value: "02SzZN0yMM4ZA3Pjl6Uv0xARWifC_NnnyoddtmoJDf",
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
          value: "02SzZN0yMM4ZA3Pjl6Uv0xARWifC_NnnyoddtmoJDf",
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
          value: "02SzZN0yMM4ZA3Pjl6Uv0xARWifC_NnnyoddtmoJDf",
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
    stateHandle: "02SzZN0yMM4ZA3Pjl6Uv0xARWifC_NnnyoddtmoJDf",
    expiresAt: "2022-03-07T17:26:54.000Z",
    intent: "LOGIN",
    remediation: {
      type: "array",
      value: [
        {
          rel: [
            "create-form",
          ],
          name: "enroll-authenticator",
          relatesTo: {
            type: "object",
            value: {
              resend: {
                rel: [
                  "create-form",
                ],
                name: "resend",
                href: "https://rnicolo-test.okta.com/idp/idx/challenge/resend",
                method: "POST",
                produces: "application/ion+json; okta-version=1.0.0",
                value: [
                  {
                    name: "stateHandle",
                    required: true,
                    value: "02SzZN0yMM4ZA3Pjl6Uv0xARWifC_NnnyoddtmoJDf",
                    visible: false,
                    mutable: false,
                  },
                ],
                accepts: "application/json; okta-version=1.0.0",
              },
              poll: {
                rel: [
                  "create-form",
                ],
                name: "poll",
                href: "https://rnicolo-test.okta.com/idp/idx/challenge/poll",
                method: "POST",
                produces: "application/ion+json; okta-version=1.0.0",
                refresh: 4000,
                value: [
                  {
                    name: "stateHandle",
                    required: true,
                    value: "02SzZN0yMM4ZA3Pjl6Uv0xARWifC_NnnyoddtmoJDf",
                    visible: false,
                    mutable: false,
                  },
                ],
                accepts: "application/json; okta-version=1.0.0",
              },
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
          href: "https://rnicolo-test.okta.com/idp/idx/challenge/answer",
          method: "POST",
          produces: "application/ion+json; okta-version=1.0.0",
          value: [
            {
              name: "credentials",
              type: "object",
              form: {
                value: [
                  {
                    name: "passcode",
                    label: "Enter code",
                  },
                ],
              },
              required: true,
            },
            {
              name: "stateHandle",
              required: true,
              value: "02SzZN0yMM4ZA3Pjl6Uv0xARWifC_NnnyoddtmoJDf",
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
              value: "02SzZN0yMM4ZA3Pjl6Uv0xARWifC_NnnyoddtmoJDf",
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
              value: "02SzZN0yMM4ZA3Pjl6Uv0xARWifC_NnnyoddtmoJDf",
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
        resend: {
          rel: [
            "create-form",
          ],
          name: "resend",
          href: "https://rnicolo-test.okta.com/idp/idx/challenge/resend",
          method: "POST",
          produces: "application/ion+json; okta-version=1.0.0",
          value: [
            {
              name: "stateHandle",
              required: true,
              value: "02SzZN0yMM4ZA3Pjl6Uv0xARWifC_NnnyoddtmoJDf",
              visible: false,
              mutable: false,
            },
          ],
          accepts: "application/json; okta-version=1.0.0",
        },
        poll: {
          rel: [
            "create-form",
          ],
          name: "poll",
          href: "https://rnicolo-test.okta.com/idp/idx/challenge/poll",
          method: "POST",
          produces: "application/ion+json; okta-version=1.0.0",
          refresh: 4000,
          value: [
            {
              name: "stateHandle",
              required: true,
              value: "02SzZN0yMM4ZA3Pjl6Uv0xARWifC_NnnyoddtmoJDf",
              visible: false,
              mutable: false,
            },
          ],
          accepts: "application/json; okta-version=1.0.0",
        },
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
          id: "eaeikalq3HocuxQLc696",
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
          id: "pfdik9dt4zlYWEUD0696",
          displayName: "Okta Verify",
          methods: [
            {
              type: "push",
            },
            {
              type: "totp",
            },
          ],
        },
        {
          type: "password",
          key: "okta_password",
          id: "lae1z09p52sRrLfhl696",
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
    user: {
      type: "object",
      value: {
        id: "00uikalpvbEgc3tCZ696",
        identifier: "robnicolo+oie-ciam2022-27@gmail.com",
        profile: {
          firstName: "John",
          lastName: "Doe 27",
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
          value: "02SzZN0yMM4ZA3Pjl6Uv0xARWifC_NnnyoddtmoJDf",
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
        label: "My Express Web App 2",
        id: "0oai9ifvveyL3QZ8K696",
      },
    },
  },
}
```


### 4 Handle response

`nextstep.name` `enroll-authenticator`
`/enroll-authenticator/okta_email`

-->
