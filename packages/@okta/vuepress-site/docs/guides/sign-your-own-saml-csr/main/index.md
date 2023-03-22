---
title: Sign the Okta certificate with your own CA
excerpt: How to use a custom SAML certificate for apps
layout: Guides
---

This guide explains how to upload your SAML certificates to sign the assertion for Outbound SAML apps, sign the AuthN request, and decrypt the assertion for Inbound SAML.

---

**Learning outcomes**

* List your apps by using Okta APIs.
* Generate, sign, and publish a certificate signing request (CSR).
* Update your app and ISV to use the new certificate.
* Clone the certificate for use across multiple apps.

---

## Outbound and Inbound SAML apps

Okta as a SAML Service Provider is referred to as Inbound SAML. Okta as a SAML Identity Provider (IdP) is referred to as Outbound SAML. The general procedure is the same for both. However, some of the API calls are different as described in the following sections.

> **Note:** After you update the key credential, users can't access the SAML app until you upload the new certificate to the ISV.

See [Get Started with the Okta REST APIs](/code/rest/) for information on how to use the Postman REST API test client for these steps.

## List your apps

* For Outbound SAML, use the [Apps API](/docs/reference/api/apps/#list-applications) to return a list of all the apps and to collect the app `id` for each app that you want to update.

* For Inbound SAML, use the [IdPs API](/docs/reference/api/idps/#list-identity-providers-with-defaults) to return a list of all the Identity Providers (IdP) and to collect the full response for each IdP that you want to update.

The following example shows a call for Outbound SAML apps.

Request: `GET /api/v1/apps`

Truncated Response:

```json
{
    "id": "00000id1U3iyFqLu0g4",
    "name": "appname",
    "label": "Application Name",
    "status": "ACTIVE",
    "lastUpdated": "2015-01-24T00:09:01.000Z",
    "created": "2014-01-06T23:42:40.000Z",
    "accessibility": {
      "selfService": false,
      "errorRedirectUrl": null,
      "loginRedirectUrl": null
    },
    "visibility": {
      "autoSubmitToolbar": true,
      "hide": {
        "iOS": false,
        "web": false
      },
      "appLinks": {
        "login": true
      }
    },
    "features": [],
    "signOnMode": "SAML_2_0",
    "credentials": {
      "scheme": "EDIT_USERNAME_AND_PASSWORD",
      "userNameTemplate": {
        "template": "${source.login}",
        "type": "BUILT_IN"
      },
      "revealPassword": true,
      "signing": {
        "kid": "ZcLGUsl4Xn3996YYel6KPvOxZOhNWfly5-q36CByH4o"
      }
    },
    "settings": {
      "app": {
        "instanceType": null
      },
      "notifications": {
        "vpn": {
          "network": {
            "connection": "DISABLED"
          },
          "message": null,
          "helpUrl": null
        }
      }
    }
  }
```

## Generate a CSR

* Use the [Apps API](/docs/reference/api/apps/#list-csrs-for-application) to return a list of all apps to use with Outbound SAML apps.
* Use the [IdPs API](/docs/reference/api/idps/#list-signing-csrs-for-idp) to return a list of all IdPs to use with Inbound SAML apps.

You can generate a CSR and receive the response in either JSON or [PKCS#10](https://tools.ietf.org/html/rfc2986) format.

Use one of the following requests to generate a CSR in JSON format to use with Outbound SAML apps:

* For Inbound SAML, change the POST statement to `POST /api/v1/idps/yourIdPID/credentials/csrs/`.

* For PKCS#10 format, change the Accept statement to `Accept: application/pkcs10`.

> **Note:** `Accept` specifies the response format, and `Content-Type` specifies the request format.

### Request

```json
POST /api/v1/apps/yourAppID/credentials/csrs/
Accept: application/json
Content-Type: application/json

{
  "subject": {
    "countryName"            : "US",
    "stateOrProvinceName"    : "California",
    "localityName"           : "San Francisco",
    "organizationName"       : "Your Company, Inc.",
    "organizationalUnitName" : "YourOrgUnit",
    "commonName"             : "IdP Issuer"
  },
  "subjectAltNames":
    {
      "dnsNames": [ "yourorgunit.example.com" ]
    }
}
```

### Response

Collect the values for both the CSR `id` and the `csr` from the response for use in the next steps.

```json
201 Created
Location: https://{yourOktaDomain}/api/v1/apps/00000id1U3iyFqLu0g4/credentials/csrs/abckutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azh000

{
  "id": "abckutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azh000",
  "created": "2017-04-19T12:50:58.000Z",
  "csr":  "ABCC6jCCAdICAQAwdjELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xEzARBgNVBAoMCk9rdGEsIEluYy4xEDAOBgNVBAsMB0phbmt5Q28xEzARBgNVBAMMCklkUCBJc3N1ZXIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCpus1zL9sVhEDhwEcdQFWYerAOkDn+J3OkpXFyTPBUFLDYe21CoQN0TQOl5CgtEa8rViyNj0Drv8bWppojLbEkBO3FY6YqDbqSlU+ZuBlhvwiaxnGBnKeRLH6RoWn/6+I1GwHkJJDGYzVtYfELu92sZnhLzNJFcleI41OK7Ll1fWI+un4N5Ryd2JHHtczo7t9N0hWgulckmXHM+qOk1/0abXGZUV2QMDNVIgDcSswyK/n3Ri1p5ccJGX8sJdYCiihxE+Ms97z+PO7oLVbdVLkRDcSDE0T/dTK8CThI5otvhM4PlEeYbNUa8/9f88bUteA2oxDdTWJVurH6FeMvZ6iFAgMBAAGgLzAtBgkqhkiG9w0BCQ4xIDAeMBwGA1UdEQQVMBOCEWphbmt5LmV4YW1wbGUuY29tMA0GCSqGSIb3DQEBCwUAA4IBAQB3o1VcZ+NnwBzSKITWKnf9Pb0wY8hrHsVo+jAX0eUrotMCSnCIL3hyLOZW+LXvITfaREM6l/L0vKLqbhNto9trmpn9wy+fFqRboC/0zAyIotPiRDBsCVD+UEKea5IIrDAWsq2Guv1RfUcyI79rblwctfNZbIHj5rpoYVpDqYvQpCHRMmQrzKMDb9qVtZVHbAHqTKEDQTLnQbyvwuw/kmaiPMK7SDSHTPpgq+izW2M6Qqqjn8Mz8RNgQcantXvjcb70uAFt1uxkQR4j9K/kRoY7pjR4d/FrAq/oxfnNPQxyvXYr+/MzOxEFdDKts4vSCYqpOLgQs2xpC6vfhAeHGYEFK",
  "kty": "RSA",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/apps/00000id1U3iyFqLu0g4/credentials/csrs/abckutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azh000",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "publish": {
      "href": "https://{yourOktaDomain}/api/v1/apps/00000id1U3iyFqLu0g4/credentials/csrs/abckutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azh000/lifecycle/publish",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

## Sign the CSR

Follow the third-party Certificate Authority (CA) process that your company uses to sign the CSR. You can't proceed to the next step until your certificate is signed using this process.

> **Note:** There is a cost associated with SSL certificates being signed by a third-party CA.

The CA that you choose provides instructions on how to upload the CSR that you generated in the previous step.

Okta generates the CSR in Base64-encoded DER format. If your process requires a different format, convert it using OpenSSL or a third-party decoder. Free third-party decoders are readily available.

## Publish a CSR with a certificate

* Use the [Apps API](/docs/reference/api/apps/#publish-csr-for-application) to publish the certificate for Outbound SAML apps.

* Use the [IdPs API](/docs/reference/api/idps/#publish-signing-csr-for-idp) to publish the certificate for Inbound SAML apps.

Base64 encoding and PEM, DER, and CER certificate formats are supported.

* For CER format, change the Content-Type statement to `Content-Type: application/x-x509-ca-cert`.

* For DER format, change the Content-Type statement to `Content-Type: application/pkix-cert`.

* For Base64-encoded format, add the statement `Content-Transfer-Encoding: base64` after the Content-Type statement.

Collect the returned Key ID (`credentials.signing.kid`) to use in the next step.

The following request publishes a CSR with a certificate in Base64-encoded `DER` format.

### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/pkix-cert" \
-H "Authorization: SSWS ${api_token}" \
-H "Content-Transfer-Encoding: base64" \
-d "MIIFgjCCA2qgAwIBAgICEAcwDQYJKoZIhvcNAQELBQAwXjELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMQ0wCwYDVQQKDARPa3RhMQwwCgYDVQQLDANFbmcxDTALBgNVBAMMBFJvb3QwHhcNMTcwMzI3MjEyMDQ3WhcNMTgwNDA2MjEyMDQ3WjB4MQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzETMBEGA1UECgwKT2t0YSwgSW5jLjEQMA4GA1UECwwHSmFua3lDbzEVMBMGA1UEAwwMSWRQIElzc3VlciA3MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmkC6yAJVvFwUlmM9gKjb2d+YK5qHFt+mXSsbjWKKs4EfNm+BoQeeovBZtSACyaqLc8IYFTPEURFcbDQ9DkAL04uUIRD2gaHYY7uK0jsluEaXGq2RAIsmzAwNTzkiDw4q9pDL/q7n0f/SDt1TsMaMQayB6bU5jWsmqcWJ8MCRJ1aJMjZ16un5UVx51IIeCbe4QRDxEXGAvYNczsBoZxspDt28esSpq5W0dBFxcyGVudyl54Er3FzAguhgfMVjH.........+nuz+hlAinU9Xn9Jf2QsfKvcbMRq7iuqgkabgdmObmWb9KK0Vm7TDkxCH0pB0onPr6epVUP8Obg/pT1Oj/1hOLbfR8CHHWdAWzUBGGvp2TIy2A8LUaEoFnwkxZfdL7Bnd0RH/ClBtAjzLOxmUo7NbZmEnYCcD5pZz7BdZI0db/eBXFqfOlA88rEe+9Sv+NndIq0/WNIIsJi2RgjJnxsxvB5MjhhzmItpFIUl5yqoO3C9jcCp6HDBJxtCGbvAr5ALPn5RCJeBIr67WpAiTd7L3Ebu9SQZlXnoHX8kP04EA6ylR3W0EFbh7KUtq8M2H2vo0wjMj7ysl/3tT7cEZ97s1ygO5iJx3GfMDyrDhtLXSBJ20uSxTJeptRw8SDiwTqunIh1WyKlcQz1WGauSbW4eXdj/r9KYMJ3qMMkdP/9THQUtTcOYx51r8RV9pdzqF2HPnZZNziBa+wXJZHEWp70NyoakNthgYwtypqiDHs2f3Q==" \
"https://${yourOktaDomain}/api/v1/apps/yourAppId/credentials/csrs/theCSRId/lifecycle/publish"
```

### Response

```json
201 Created
Location: https://{yourOktaDomain}/api/v1/apps/0oa1ysid1U3iyFqLu0g4/credentials/keys/ElsCzR8nbPamANBFu7QPRvtLD6Q3O1KQNJ92zkfFJNw
Content-Type: application/json;charset=UTF-8

{
  "created": "2017-03-15T00:03:43.000Z",
  "lastUpdated": "2017-03-15T00:03:43.000Z",
  "expiresAt": "2018-03-25T11:58:43.000Z",
  "x5c": [
    "MIIFgDCCA2igAwIBAgICEAEwDQYJKoZIhvcNAQELBQAwXjELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMQ0wCwYDVQQKDARPa3RhMQwwCgYDVQQLDANFbmcxDTALBgNVBAMMBFJvb3QwHhcNMTcwMzE1MTE...RF6YATOwwX1DOx5WhmQExOF7xtxFb93mPe0g+voSLNZjsQYUHDs30T+iVmUbp+SQE7HofPB4JTO7ZRUaagvFUo1EO9m1xnjpLDIa7+M="
  ],
  "e": "AQAB",
  "n": "vQ3U2VsfmF9yYs-JxJlgjPm12d4LUZZZf7WEopc1CAdtqxiA7hPQGzdvKBKR-xGLYUeMY3vQ1nObiIFGci1kvtPbiwWoafPS8zNupMIvEZ5b9zANUtuuvaBnQN0VOABt9crKvhMQIGj6k1Uz0bPooiwNt0Fz9jr_JsuD1-OSrot6Nro-AH8otGvlineMOR380CbKuJVQvOqRlRne-M6VEY_aX96RZfBBOFEKstJfemV-uimd8QyIuv6iazoVcJ9qVMKbfqJ0Na1W1_zAC0SgvScgzF6058GatFdfHYyl-EXIp0-MCfpjcH-gR5fOPo4052gOvWpBSiW6HTOCG-cjJw",
  "kid": "your-key-id",
  "kty": "RSA",
  "use": "sig",
  "x5t#S256": "6ZA0gDvExTUMszE4Dvs72pEj396Q7vOHJkQQrdSddVE"
}
```

## Update the key credential

Update the key credential for the app or IdP to specify the new signing Key ID.

* For Outbound SAML, call the [Update Application API](/docs/reference/api/apps/#update-application). Pass the app ID that you obtained in the [List your apps](#list-your-apps) step in the URL. In the body, include the app name and the app label that you obtained when you listed your apps and the Key ID that you obtained in the [Sign the CSR](#sign-the-csr) step.

* For Inbound SAML, call the [Update IdP API](/docs/reference/api/idps/#update-identity-provider). Pass the entire [IdP](/docs/reference/api/idps/#update-identity-provider) that you obtained in the [List your apps](#list-your-apps) step and use the Key ID value that you obtained in the [Sign the CSR](#sign-the-csr) step. Partial updates aren't supported by the `Updated IdP API`.

> **Caution:** After you update the key credential, your users can't access the SAML app or the Identity Provider until you upload the new certificate to the Service Provider (SP).

The following request is for Outbound SAML.

``` json
PUT /api/v1/apps/00000id1U3iyFqLu0g4
Accept: application/json
Content-Type: application/json

{
  "name": "appname",
  "label": "Application Name",
  "signOnMode": "SAML_2_0",
  "credentials": {
    "signing": {
      "kid": "your-key-id"
    }
  }
 }
```

The following request is for Inbound SAML.

``` json
PUT /api/v1/idps/00000id1U3iyFqLu0g4
Accept: application/json
Content-Type: application/json

{
  "id": "00000id1U3iyFqLu0g4",
  "type": "SAML2",
  "name": "Example IdP",
  "status": "ACTIVE",
  "created": null,
  "lastUpdated": "2016-03-29T21:23:45.000Z",
  "protocol": {
    "type": "SAML2",
    "endpoints": {
      "sso": {
        "url": "https://idp.example.com/saml2/sso",
        "binding": "HTTP-REDIRECT",
        "destination": "https://idp.example.com/saml2/sso"
      },
      "acs": {
        "binding": "HTTP-POST",
        "type": "INSTANCE"
      }
    },
    "algorithms": {
      "request": {
        "signature": {
          "algorithm": "SHA-256",
          "scope": "REQUEST"
        }
      },
      "response": {
        "signature": {
          "algorithm": "SHA-256",
          "scope": "ANY"
        }
      }
    },
    "settings": {
      "nameFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified"
    },
    "credentials": {
      "trust": {
        "issuer": "https://idp.example.com",
        "audience": "https://www.okta.com/saml2/service-provider/spCQJRNaaxs7ANqKBO7M",
        "kid": "ZcLGUsl4Xn3996YYel6KPvOxZOhNWfly5-q36CByH4o"
      },
      "signing": {
        "kid": "your-key-id"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "AUTO",
      "profileMaster": true,
      "groups": {
        "action": "NONE"
      }
    },
    "accountLink": {
      "filter": null,
      "action": "AUTO"
    },
    "subject": {
      "userNameTemplate": {
        "template": "idpuser.subjectNameId"
      },
      "filter": null,
      "matchType": "USERNAME"
    },
    "maxClockSkew": 120000
  }
}
```

## Clone the certificate (optional)

To share the certificate that you created across multiple apps, clone it with the
[Apps API](/docs/reference/api/apps/#clone-application-key-credential) by using the key `id` that you generated.

To share the certificate that you created across multiple IdPs, clone it with the [IdPs API](/docs/reference/api/idps/) by using the key `id` that you generated.

Ensure that you clone the certificate to every app or IdP that you want to share it with. After the certificate is cloned, you need to [update the key credential](#update-the-key-credential) for the target app.

If the certificate that you cloned from changes, you must repeat the cloning operation for each app or IdP.

> **Important:** Sharing certificates isn't a recommended security practice. This API is provided to support legacy use cases.

## Upload the new certificate to the ISV

> **Caution:** After you complete the [publish a CSR with a certificate](#publish-a-CSR-with-a-certificate) step, users can't access the SAML app or the Identity Provider until you complete these next steps.

For Outbound SAML, complete the following steps (note that these steps can't be automated):

1. In the Admin Console, go to **Applications** > **Applications**.
1. Select your app integration.
1. Select **Sign-On Options**.
1. Click **View Setup Instructions**.
1. Perform the setup for your app integration again by using the instructions provided. During this setup, you can upload the certificate in a specified format, the metadata, or the certificate fingerprint.

For Inbound SAML, follow the existing procedures for your setup.

## See also

* [Get Started with the Okta REST APIs](/code/rest/)
