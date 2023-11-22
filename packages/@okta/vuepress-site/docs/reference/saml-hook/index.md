---
title: SAML assertion inline hook reference
excerpt: Customize SAML assertions returned by Okta.
---

# SAML assertion inline hook reference

This page provides reference documentation for SAML assertion inline hooks, one type of inline hook supported by Okta. It provides sample JSON objects that are contained in the outbound request from Okta to your external service, and sample JSON objects that you can include in your response.

## See also

- For a general introduction to Okta inline hooks, see [inline hooks](/docs/concepts/inline-hooks/).

- For information on the API for registering external service endpoints with Okta, see [Inline Hooks Management API](/docs/reference/api/inline-hooks/).

- For a use case example of how to implement a SAML assertion inline hook, see [SAML assertion inline hook](/docs/guides/saml-inline-hook/).

- For steps to enable this inline hook, see below, [Enabling a SAML assertion inline hook](#enabling-a-saml-assertion-inline-hook).

## About

This type of inline hook is triggered when Okta generates a SAML assertion in response to an authentication request. Before sending the SAML assertion to the app that will consume it, Okta calls out to your external service. Your external service can respond with commands to add attributes to the assertion or to modify its existing attributes.

This functionality can be used to add data to assertions, which might be data that is sensitive, calculated at runtime, or complexly-structured and not appropriate for storing in Okta user profiles. Data added this way is never logged or stored by Okta. As an example, SAML assertions generated for a medical app could be augmented with confidential patient data provided by your external service and not stored in Okta.

This inline hook works only when using custom SAML apps, not apps from the OIN.

## Objects in the request from Okta

The outbound call from Okta to your external service provides the contents of the SAML assertion that was generated, which you can augment or modify by means of the commands you return. Also provided is contextual information about the authentication request.

Because SAML is XML-based, but the call from Okta to your service uses a JSON payload, the contents of the SAML assertion are mapped to a JSON representation for sending.

### data.assertion.subject

Provides a JSON representation of the `<saml:Subject>` element of the SAML assertion. The following is an example of how the SAML XML is represented in JSON:

```JSON
{
   "subject":{
      "nameId":"administrator1@example.net",
      "nameFormat":"urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
      "confirmation":{
         "method":"urn:oasis:names:tc:SAML:2.0:cm:bearer",
         "data":{
            "recipient":"http://www.example.com/saml/sso"
         }
      }
   }
}
```

### data.assertion.authentication

Provides a JSON representation of the `<saml:AuthnStatement>` element of the SAML assertion.

```JSON
"authentication": {
        "sessionIndex": "id1553800523546.312669168",
        "authnContext": {
          "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport"
        }
}
```

### data.assertion.conditions

Provides a JSON representation of the `<saml:Conditions>` element of the SAML assertion.

```JSON
"conditions": {
        "audienceRestriction": [
          "urn:example:sp"
        ]
}
```

### data.assertion.claims

Provides a JSON representation of the `<saml:AttributeStatement>` element contained in the generated SAML assertion, which will contain any optional SAML attribute statements that you have defined for the app using the Okta Admin Console's **SAML Settings**.

The following is an example of how an XML `<saml:AttributeStatement>` element is represented in JSON in this object:

```JSON
{
  "claims": {
    "extPatientId": {
      "attributes": {
        "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"
      },
      "attributeValues": [
        {
          "attributes": {
            "xsi:type": "xs:integer"
          },
          "value": "4321"
        }
      ]
    }
  }
}
```

### data.assertion.lifetime

Specifies the expiration time, in seconds, of the SAML assertion.

```JSON
"lifetime": {
    "expiration": 300
}
```

### data.context

This object contains a number of sub-objects, each of which provides some type of contextual information. Unlike the `data.assertion.*` objects, you cannot affect the `data.context.*` objects by means of the commands you return.

The following sub-objects are included:

- `data.context.request`: Details of the SAML request that triggered the generation of the SAML assertion
- `data.context.protocol`: Details of the assertion protocol being used
- `data.context.session`: Details of the user session
- `data.context.user`: Identifies the Okta user that the assertion was generated to authenticate and provides details of their Okta user profile

## Sample listing of JSON payload of request

```JSON
{
  "source": "https://${yourOktaDomain}/app/saml20app_1/exkth8lMzFm0HZOTU0g3/sso/saml",
  "eventId": "XMFoHCM1S4Wi_SGWzL8T9A",
  "eventTime": "2019-03-28T19:15:23.000Z",
  "data": {
    "context": {
      "request": {
        "id": "reqqXypjzYJRSu2j1G1imUovA",
        "method": "GET",
        "url": {
          "value": "https://${yourOktaDomain}/app/saml20app_1/exkth8lMzFm0HZOTU0g3/sso/saml"
        },
        "ipAddress": "127.0.0.1"
      },
      "protocol": {
        "type": "SAML2.0",
        "issuer": {
          "id": "0oath92zlO60urQOP0g3",
          "name": "SAML 2.0 App",
          "uri": "http://www.okta.com/exkth8lMzFm0HZOTU0g3"
        }
      },
      "session": {
        "id": "102LN9Bnuc4S_ewfc9BYwageA",
        "userId": "00uq8tMo3zV0OfJON0g3",
        "login": "administrator1@example.com",
        "createdAt": "2019-03-28T16:45:55.000Z",
        "expiresAt": "2019-03-28T21:15:23.000Z",
        "status": "ACTIVE",
        "lastPasswordVerification": "2019-03-28T16:45:55.000Z",
        "amr": [
          "PASSWORD"
        ],
        "idp": {
          "id": "00oq6kcVwvrDY2YsS0g3",
          "type": "OKTA"
        },
        "mfaActive": false
      },
      "user": {
        "id": "00uq8tMo3zV0OfJON0g3",
        "passwordChanged": "2018-09-11T23:19:12.000Z",
        "profile": {
          "login": "administrator1@example.com",
          "firstName": "Admin",
          "lastName": "Last",
          "locale": "en",
          "timeZone": "America/Los_Angeles"
        },
        "_links": {
          "groups": {
            "href": "https://${yourOktaDomain}/00uq8tMo3zV0OfJON0g3/groups"
          },
          "factors": {
            "href": "https://${yourOktaDomain}/api/v1/users/00uq8tMo3zV0OfJON0g3/factors"
          }
        }
      }
    },
    "assertion": {
      "subject": {
        "nameId": "administrator1@example.com",
        "nameFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
        "confirmation": {
          "method": "urn:oasis:names:tc:SAML:2.0:cm:bearer",
          "data": {
            "recipient": "http://www.example.com:7070/saml/sso"
          }
        }
      },
      "authentication": {
        "sessionIndex": "id1553800523546.312669168",
        "authnContext": {
          "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport"
        }
      },
      "conditions": {
        "audienceRestriction": [
          "urn:example:sp"
        ]
      },
      "claims": {
        "extPatientId": {
          "attributes": {
            "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"
          },
          "attributeValues": [
            {
              "attributes": {
                "xsi:type": "xs:integer"
              },
              "value": "4321"
            }
          ]
        },
        "array": {
          "attributes": {
            "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"
          },
          "attributeValues": [
            {
              "attributes": {
                "xsi:type": "xs:string"
              },
              "value": "Array 1"
            },
            {
              "attributes": {
                "xsi:type": "xs:string"
              },
              "value": "Array2"
            },
            {
              "attributes": {
                "xsi:type": "xs:string"
              },
              "value": "Array3"
            }
          ]
        },
        "middle": {
          "attributes": {
            "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"
          },
          "attributeValues": [
            {
              "attributes": {
                "xsi:type": "xs:string"
              },
              "value": "admin"
            }
          ]
        },
        "firstAndLast": {
          "attributes": {
            "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"
          },
          "attributeValues": [
            {
              "attributes": {
                "xsi:type": "xs:string"
              },
              "value": "7d6a50c8-4d7e-4058-9c5b-2cc98cecd294"
            }
          ]
        }
      },
      "lifetime": {
        "expiration": 300
      }
    }
  },
  "eventTypeVersion": "1.0",
  "cloudEventVersion": "0.1",
  "eventType": "com.okta.saml.tokens.transform",
  "contentType": "application/json"
}
```

## Objects in response you send

For the SAML assertion inline hook, the objects that you can return in the JSON payload of your response are defined in the following sections.

<HookResponseSize/>

### commands

The `commands` object is where you can tell Okta to add additional claims to the assertion or to modify the existing assertion statements.

`commands` is an array, allowing you to send multiple commands. In each array element, you include a `type` property and a `value` property. The `type` property is where you specify which of the supported commands you want to execute, and `value` is where you supply an operand for that command.

In the case of the SAML assertion inline hook, the `value` property is itself a nested object, in which you specify a particular operation, a path to act on, and a value.

| Property | Description                                                              | Data Type       |
|----------|--------------------------------------------------------------------------|-----------------|
| type     | One of the [supported commands](#supported-commands)                    | String          |
| value    | Operand to pass to the command. It specifies a particular op to perform. | [value](#value) |

#### Supported commands

The following command is currently supported for the SAML assertion inline hook type:

| Command                  | Description              |
|--------------------------|--------------------------|
| com.okta.assertion.patch | Modify a SAML assertion |

#### value

The `value` object is where you specify the specific operation to perform. It is an array, allowing you to request more than one operation.

| Property | Description                                                                                                                                                                                                           | Data Type       |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|
| op       | The name of one of the [supported ops](#list-of-supported-ops)                                                                                                                                                       | String          |
| path     | Location, within the assertion, to apply the operation. See [Specifying Location within the Assertion](#specifying-location-within-the-assertion) below. | String          |
| value    | The value of the claim that you add or replace, and can also include other attributes. If adding to a claim, you need to add another `value` attribute residing within an array called `attributeValues`. See the [Sample listing of JSON payload response](#sample-listing-of-json-payload-of-response) for an example.                                                                                                                                                                                          | Any JSON object |

#### List of supported ops

| Op      | Description                             |
|---------|-----------------------------------------|
| add     | Add a new claim to the assertion       |
| replace | Modify any element of the assertion   |

>**Note:** If a response to the SAML assertion inline hook request is not received from your external service within 3 seconds, a timeout occurs. In this scenario, the Okta process flow continues with the original SAML assertion returned.

### Specify location within the assertion

Specify the location within the assertion where you want to apply your operation using a slash-delimited path, which follows JSON Patch conventions.

When you perform an `add` op to add a new attribute statement, begin with `/claims/` and follow that with the name of the new attribute that you are adding.

When you modify an existing assertions statement, begin the path with `/subject/`, `/authentication/`, `/conditions/`, or `/claims/`, depending on which part of the assertion you want to modify. You then drill down within the child elements using slash-delimited element names, for example, `/claims/array/attributeValues/1/value`. (The `/1/` in the path indicates the index of the array, using zero-based indexing.)

### URI claims

Okta supports URI claims with SAML assertion hooks. When you need to replace or add a URI claim, you must encode the claim name within the command per the [JavaScript Object Notation (JSON) Pointer](https://tools.ietf.org/html/rfc6901) specification. Specifically, this replaces `~` with `~0` and  `/` with `~1`.

### SessionNotOnOrAfter support

In some scenarios, your service provider may require the `SessionNotOnOrAfter` attribute for the `<saml:AuthnStatement>` in the SAML assertion, which sets the provider session time correctly. Use `add` op with the path `/authentication/sessionLifetime` and a value for session lifetime in seconds to add this attribute. See the [Sample listing of JSON payload response](/docs/reference/saml-hook/#sample-listing-of-json-payload-of-response) for an example. Okta calculates `SessionNotOnOrAfter` by adding the `/authentication/sessionLifetime` value to the `issueInstant` attribute and returns it in the SAML assertion.

### error

When you return an error object, it should have the following structure:

| Property     | Description                          | Data type |
|--------------|--------------------------------------|-----------|
| errorSummary | Human-readable summary of the error  | String    |

> **Note:** If the error object doesn't include the defined `errorSummary` property, the following common default message is returned to the end user: `The callback service returned an error`.

## Timeout behavior

If there is a response timeout after receiving the Okta request, the Okta process flow proceeds with the original SAML assertion returned.

## Sample listing of JSON payload of response

```JSON
{
   "commands": [
    {
      "type": "com.okta.assertion.patch",
      "value": [
        {
          "op": "replace",
          "path": "/claims/array/attributeValues/1/value",
          "value": "replacementValue"
        },
        {
          "op": "replace",
          "path": "/authentication/authnContext",
          "value": {
            "authnContextClassRef": "replacementValue"
          }
        },
        {
          "op": "add",
          "path": "/claims/extPatientId",
          "value": {
            "attributes": {
              "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:basic"
            },
            "attributeValues": [
              {
                "attributes": {
                  "xsi:type": "xs:string"
                },
                "value": "4321"
              }
            ]
          }
        },
        {
          "op": "add",
          "path": "/authentication/sessionLifetime",
          "value": 300
        }
      ]
    },
    {
      "type": "com.okta.assertion.patch",
      "value": [
        {
          "op": "replace",
          "path": "/authentication/sessionIndex",
          "value": "definitelyARealSession"
        }
      ]
    }
  ]
}
```

## URI format response example

This example displays `replace` and `add` operations with the URI formatted claim encoded.

```JSON
{
  "commands": [
    {
      "type": "com.okta.assertion.patch",
      "value": [
        {
          "op": "replace",
          "path": "/claims/http:~1~1schemas.xmlsoap.org~1ws~12005~105~1identity~1claims~1foo/attributeValues/0/value",
          "value": "replacementValue"
        },
        {
          "op": "replace",
          "path": "/claims/http:~1~1schemas.xmlsoap.org~1ws~12005~105~1identity~1claims~1foo/attributes",
          "value": {
            "attributes": {
              "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:basic"
            }
          }
        },
        {
          "op": "add",
          "path": "/claims/http:~1~1schemas.xmlsoap.org~1ws~12005~105~1identity~1claims~1bar",
          "value": {
            "attributes": {
              "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:basic"
            },
            "attributeValues": [
              {
                "attributes": {
                  "xsi:type": "xs:string"
                },
                "value": "bearer"
              }
            ]
          }
        }
      ]
    }
  ]
}
```

## Enabling a SAML assertion inline hook

To activate the inline hook, you first need to register your external service endpoint with Okta using the [Inline Hooks Management API](/docs/reference/api/inline-hooks/).

You then need to associate the registered inline hook with a SAML app by completing the following steps in Admin Console:

1. Go to **Applications** and select your SAML app.

1. Click the **General** tab.

1. In the SAML Settings section, click **Edit**.

1. Click **Next** to get to **SAML Settings** section.

1. Click **Show Advanced Settings**.

1. In the **Assertion Inline Hook** field, select your registered inline hook.

> **Note:** You can associate only one inline hook with each app.
