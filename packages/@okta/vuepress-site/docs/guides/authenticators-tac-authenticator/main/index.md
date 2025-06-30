---
title: Temporary access code authenticator integration guide
---

<ApiLifecycle access="ie" /><br>

This guide shows you how to integrate a temporary access code (TAC) authenticator into your authentication use cases with Okta APIs.

---
#### Learning outcomes

* Understand how to configure the TAC authenticator
* Configure the TAC authenticator for different use cases

#### What you need

* [Okta Integrator Free Plan org](https://developer.okta.com/signup)
* A test [user account](https://help.okta.com/okta_help.htm?type=oie&id=ext-usgp-add-users) that you can use to enroll an authenticator
* A test [group](https://help.okta.com/okta_help.htm?type=oie&id=usgp-groups-create) in your org that the test user is added to

---

## About the TAC authenticator

TAC is an authenticator that allows users to authenticate with a temporary access code that admins generate. It’s commonly used in onboarding and account recovery scenarios. In those scenarios, users might not have access to other authenticators and can require temporary access to enroll other authenticators or unlock their account.

After an admin configures the TAC authenticator settings, admins or help-desk agents can generate a TAC. After an admin generates a TAC, they contact the user who needs it and verifies their identity and their need for a TAC. The admin then sends the TAC to the user.

> **Note:** There’s no default way to send a TAC to a user. Okta recommends that admins or help-desk agents send a TAC through a secure out-of-band channel.

### Use the TAC authenticator in policies

This guide outlines two authentication policy scenarios that allow the use of the TAC authenticator. When you add the TAC authenticator to your own org policies remember that it's a knowledge factor.

Users can use TAC, security questions, and their password as knowledge factors, depending on your authentication policy configuration and which authenticators they have access to. However, if your [global session policy](#create-a-global-session-policy-for-tac) requires MFA, users must also have access to a possession or biometric factor.

## Configure the TAC authenticator

Use the [Create an authenticator](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/createAuthenticator) endpoint to set up TAC as an authenticator.

1. Use the values and format provided in the [request body example](#create-tac-authenticator-request-example).
1. Ensure that the following request body parameters are set correctly:
   * Set the authenticator `key` as `tac`.
   * Enter a value for `name`.
   * Set the provider `type` as `TAC`.
   * Set the minimum time-to-live (`minTtl`) for the TAC as `10` minutes.
   * Set the maximum TTL (`maxTtl`) for the TAC as `720` minutes (12 hours).
   * Set the default TTL as `480` minutes (8 hours).
   * Set the number of characters in the TAC (`length`) as `16`.
   * Set all the complexity parameters as `true`. This ensures that the TAC includes numbers, letters, and special characters.
      > **Note:** You can’t set numbers as `false`.
   * Set `multiUseAllowed` as `true`. This means that the TAC can be used multiple times before it expires.
1. Send the `POST /api/v1/authenticators` request.
1. Copy and paste the `id` of the response into a text editor to use it later.

### Create a TAC authenticator request example

```json
{
  "key": "tac",
  "name": "Temporary Access Code",
  "provider": {
    "type": "tac",
    "configuration": {
      "minTtl": 10,
      "maxTtl": 720,
      "defaultTtl": 480,
      "length": 16,
      "complexity": {
        "numbers": true,
        "letters": true,
        "specialCharacters": true
      },
      "multiUseAllowed": true
    }
  }
}
```

### Create a TAC authenticator response example

```json
{
    "type": "tac",
    "id": "aut8j8vbvcr5b4a8l0g7",
    "key": "tac",
    "status": "ACTIVE",
    "name": "Temporary Access Code",
    "created": "2025-05-29T15:28:36.000Z",
    "lastUpdated": "2025-05-29T15:28:36.000Z",
    "provider": {
        "type": "TAC",
        "configuration": {
            "length": 16,
            "minTtl": 10,
            "maxTtl": 180,
            "defaultTtl": 120,
            "multiUseAllowed": true,
            "complexity": {
                "numbers": true,
                "letters": true,
                "specialCharacters": true
            }
        }
    },
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut8j8vbvcr5b4a8l0g7",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        },
        "deactivate": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut8j8vbvcr5b4a8l0g7/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "methods": {
            "href": "https://{yourOktaDomain}/api/v1/authenticators/aut8j8vbvcr5b4a8l0g7/methods",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

## Configure the TAC authenticator with policies

Users aren't able to use the TAC authenticator until you configure it in the necessary policies. Configure the TAC authenticator with the following policies:

* [Add TAC to an authenticator enrollment policy](#add-tac-to-an-authenticator-enrollment-policy)
* [Create a global session policy](#create-a-global-session-policy-for-tac) and [global session policy rule](#create-a-global-session-policy-rule) for TAC
* [Configure authentication policies for TAC](#configure-authentication-policies-for-tac)

### Add TAC to an authenticator enrollment policy

Add the TAC authenticator to an authenticator enrollment policy so that it’s available for use by the test user. Use the [Create a policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) endpoint.

Before you create the authenticator enrollment policy, use the [List all groups](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Group/#tag/Group/operation/listGroups) endpoint to retrieve the group `id` of your test group.

1. Use the values and format provided in the [request body example](#create-an-authenticator-enrollment-policy-example-request).
1. Ensure that the following parameters are set correctly:
    1. Under `groups.include` use the group `id` of your test group.
    1. In the `settings` property, include the following array:

   ```json
    {
        "key": "tac",
        "enroll": {
            "self": "OPTIONAL"
        }
    }
    ```

1. Send the `POST /api/v1/policies` request.

Users in that group are now able to use the TAC authenticator.

#### Create an authenticator enrollment policy example request

```json
{
    "description": null,
    "name": "Authenticator enrollment policy",
    "priority": "1",
    "status": "ACTIVE",
    "system": false,
    "type": "MFA_ENROLL",
    "conditions": {
        "people": {
            "groups": {
                "include": [
                    "{groupId}"
                ]
            }
        }
    },
    "settings": {
        "authenticators": [
            {
                "key": "okta_email",
                "enroll": {
                    "self": "OPTIONAL"
                }
            },
            {
                "key": "okta_verify",
                "enroll": {
                    "self": "OPTIONAL"
                }
            },
            {
                "key": "okta_password",
                "enroll": {
                    "self": "REQUIRED"
                }
            },
            {
                "key": "webauthn",
                "enroll": {
                    "self": "OPTIONAL"
                }
            },
            {
                "key": "security_question",
                "enroll": {
                    "self": "OPTIONAL"
                }
            },
             {
                "key": "tac",
                "enroll": {
                    "self": "OPTIONAL"
                }
            }
        ],
            "type": "AUTHENTICATORS"
    }
}
```

### Create a global session policy for TAC

Create a new global session policy that applies to users in your test group. Use the [Create a policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) endpoint.

1. Use the values and format provided in the [request body example](#global-session-policy-request-example).
1. Ensure that the following parameters are set correctly:
    * Enter a value for `name`. For example, `TAC global session policy`.
    * Under `groups.include` use the group `id` of your test group.
    * Set the `type` as `OKTA_SIGN_ON`.
1. Send the `POST /api/v1/policies` request.
1. In the response, copy and paste the `id` of the global session policy. Use it in the [next section](#create-a-global-session-policy-rule).

#### Global session policy request example

```json
{
  "description": null,
  "name": "TAC global session policy",
  "priority": "1",
  "status": "ACTIVE",
  "system": false,
  "type": "OKTA_SIGN_ON",
  "conditions": {
    "people": {
      "groups": {
        "include": [
          "{groupId}"
        ]
      }
    }
  }
}
```

### Create a global session policy rule

Create a global session policy rule that requires users to authenticate with TAC and a second possession or biometric factor. Use the [Create a policy rule](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule) endpoint.

1. Use the values and format provided in the [request body example](#global-session-policy-rule-request-example).
1. In the path of the POST request, set the `policyId` as the `id` of the **TAC global session policy**.
1. Ensure that the following parameters are set correctly:
    * Enter a value for `name`. For example, `Require two factors for TAC users`.
    * Set the `type` as `SIGN_ON`.
    * Set `factorPromptMode` as `ALWAYS`.
    * Set `requireFactor` as `true`.
1. Send the `POST /api/v1/policies` request.

#### Global session policy rule request example

```json
{
  "type": "SIGN_ON",
  "status": "ACTIVE",
  "name": "Require two factors for TAC users",
  "conditions": {
    "network": {
      "connection": "ANYWHERE"
    },
    "authContext": {
      "authType": "ANY"
    }
  },
  "actions": {
    "signon": {
      "access": "ALLOW",
      "requireFactor": true,
      "factorPromptMode": "ALWAYS",
      "rememberDeviceByDefault": false,
      "session": {
        "usePersistentCookie": false,
        "maxSessionIdleMinutes": 720,
        "maxSessionLifetimeMinutes": 720
      }
    }
  }
}
```

### Configure authentication policies for TAC

There are various ways to configure TAC with authentication policies. Use either of the following authentication policy examples in your own org.

#### Create an authentication policy

First, create an authentication policy. Use the [Create a policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy) endpoint.

1. Use the values and format provided in the [request body example](#authentication-policy-request-example).
1. Enter a value for `name`. For example, `TAC authentication policy`.
1. Set the `type` as `ACCESS_POLICY`.
1. Send the `POST /api/v1/policies` request.
1. In the response, copy and paste the `id` of the authentication policy.

##### Authentication policy request example

```json
{
  "description": null,
  "name": "TAC authentication policy",
  "priority": "1",
  "status": "ACTIVE",
  "system": false,
  "type": "ACCESS_POLICY",
  "conditions": null,
  "_embedded": {
    "resourceType": "string",
    "property1": {},
    "property2": {}
  }
}
```

#### Use TAC in an authentication method chain

Use this authentication policy rule when you want users to specifically authenticate with TAC and a [WebAuthn](https://help.okta.com/okta_help.htm?type=oie&id=ext-webauthn) factor. You can customize which authenticators to require in the authentication method chain. This policy rule can be used in the following scenario.

One of your users doesn't have their phone with them and doesn't have access to their Phone or Okta Verify authenticators. You generate a TAC for them that they can use for eight hours. With this policy rule, they're required to use the TAC and their WebAuthn authenticator whenever they sign in.

Use the [Create a policy rule](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule) endpoint to create the rule.

1. Use the values and format provided in the [request body example](#tac-and-authentication-method-chain-request-example).
1. In the path of the POST request, set the `policyId` as the `id` of the **TAC authentication policy**.
1. Ensure that the following parameters are set correctly:
    * Enter a value for `name`. For example, `TAC and authentication method chain`.
    * Under `groups.include` use the group `id` of your test group.
    * Set the `verificationMethod.type` as `AUTH_METHOD_CHAIN`.
1. Send the `POST /api/v1/policies` request.

##### TAC and authentication method chain request example

```json
{
    "name": "TAC and authentication method chain",
    "type": "ACCESS_POLICY",
    "conditions": {
        "people": {
            "groups": {
                "include": [
                    "{groupId}"
                ]
            }
        }
    },
    "actions": {
        "appSignOn": {
            "access": "ALLOW",
            "verificationMethod": {
                "type": "AUTH_METHOD_CHAIN",
                "chains": [
                    {
                        "authenticationMethods": [
                            {
                                "key": "tac",
                                "method": "tac"
                            }
                        ],
                        "next": [
                            {
                                "authenticationMethods": [
                                    {
                                        "key": "webauthn",
                                        "userVerification": "REQUIRED",
                                        "method": "webauthn"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    }
}
```

#### Use TAC with any two factor types

Use this authentication policy rule to provide more flexibility for users when they sign in. With this rule, they can use TAC, and any other authenticator to sign in.

> **Note:** To allow users to sign in with TAC and another knowledge factor, your [global session policy](#create-a-global-session-policy-rule) can't require MFA.

Use the [Create a policy rule](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicyRule) endpoint to create the rule.

1. Use the values and format provided in the [request body example](#any-two-factors-and-tac-request-example).
1. In the path of the POST request, set the `policyId` as the `id` of the **TAC authentication policy**.
1. Ensure that the following parameters are set correctly:
    * Enter a value for `name`. For example, `Allow any two factors for TAC users`.
    * Under `groups.include` use the group `id` of your test group.
    * Set the `verificationMethod.type` as `ASSURANCE`.
1. Send the `POST /api/v1/policies` request.

##### Any two factors and TAC request example

```json
{
    "name": "Allow any two factors for TAC users",
    "type": "ACCESS_POLICY",
    "conditions": {
        "people": {
            "groups": {
                "include": [
                    "{groupId}"
                ]
            }
        }
    },
    "actions": {
        "appSignOn": {
            "access": "ALLOW",
            "verificationMethod": {
                "factorMode": "2FA",
                "type": "ASSURANCE",
                "reauthenticateIn": "PT0S",
                "constraints": [
                    {
                        "possession": {
                            "required": true,
                            "userPresence": "OPTIONAL"
                        }
                    }
                ]
            }
        }
    }
}
```

## Generate a TAC for a user

After you've configured the TAC with your policies, you can then generate it for your users, as needed. Use the [Create an authenticator enrollment]() endpoint to generate a TAC for a user.

> **Note:** A user can only have one active TAC at any time. If you generate a TAC for a user and then generate a second one, the first TAC becomes invalid and can't be used.

Before you generate the TAC for a user, ensure that you have the following information:

* Use the [List all users](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/listUsers) endpoint to retrieve the `id` of the user.
* Use the [List all authenticators](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Authenticator/#tag/Authenticator/operation/listAuthenticators) endpoint to retrieve the TAC authenticator `id`.

1. Use the values and format provided in the [request body example](#generate-a-tac-request-example).
1. In the path of the POST request, set the `userId` as the `id` of the user.
1. In the request body, set the following parameters:
   * Set the `authenticatorId` as the `id` of the TAC authenticator.
   * Set the `authenticatorType` as `tac`.
   * Set the `ttl` of the TAC as `480`.
   * Set `multiUse` as `true`.
1. Send the `POST /api/v1/users/{userId}/authenticator-enrollments/tac` request.

After you generate the TAC, copy and paste the value of the `tac` from the [response](#generate-a-tac-response-example) into a text editor. The actual `tac` value is only accessible from the POST response. It's not possible to retrieve the value of the TAC from any other GET requests.

### Generate a TAC request example

```json
{
    "authenticatorId": "{authenticatorId}",
    "authenticatorType": "tac",
    "config": {
        "ttl": 480,
        "multiUse": true
    }
}
```

### Generate a TAC response example

```json
{
    "id": "tac8k59d3cvCEYniC0g7",
    "type": "tac",
    "key": "tac",
    "name": "Temporary Access Code",
    "status": "ACTIVE",
    "profile": {
        "tac": "4&^CnBV^3^u4b^Hg",
        "multiUse": true,
        "expiresAt": "2025-05-12T22:43:30"
    },
    "created": "2025-05-12T20:43:30.000Z",
    "lastUpdated": "2025-05-12T20:43:30.000Z",
    "nickname": "",
    "_links": {
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/users/00u8ja5c4uf26HSeN0g7/authenticator-enrollments/tac8k59d3cvCEYniC0g7",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "user": {
            "href": "https://{yourOktaDomain}/api/v1/users/00u8ja5c4uf26HSeN0g7",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

## Delete a TAC for a user

Use the [Delete an authenticator enrollment]() to delete a TAC that you've generated for a user. When you delete a TAC enrollment, the user can't use that code and you can generate a new TAC for them, if needed.

Before you delete a TAC for a user, ensure that you have the following information:

* Use the [List all users](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/listUsers) endpoint to retrieve the `id` of the user.
* Use the [List all authenticator enrollments]() endpoint to retrieve the TAC `enrollmentid`.
