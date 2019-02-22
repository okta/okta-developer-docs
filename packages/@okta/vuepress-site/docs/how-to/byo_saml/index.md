---
title: Upload Your Own Certificates for Outbound SAML Apps
excerpt: How to use a custom SAML certificate for apps
---

# Upload Your Own SAML Certificates for Outbound SAML Apps

Okta Admins can upload their own SAML certificates to sign the assertion for Outbound SAML apps and to sign the AuthNRequest and decrypt the assertion for Inbound SAML.

**Note:** Okta as a SAML SP is referred to as Inbound SAML. Okta as a SAML IdP is referred to as Outbound SAML.

## Prerequisite

To use your own SAML certificate, update the key credential for the affected apps or IdPs.

### Outbound and Inbound SAML Applications

The general procedure is the same for Outbound and Inbound SAML application; however, some of the api calls are different, as described in the steps below. The general procedure contains the following seven steps:

  1. [List your apps](#step-1-list-your-apps)
  2. [Generate a certificate signing request (CSR)](#step-2-generate-a-csr)
  3. [Sign the CSR](#step-3-sign-the-csr)
  4. [Publish the CSR](#step-4-publish-the-csr)
  5. [Update the key credential for the app to specify the new certificate](#step-5-update-the-key-credential)
  6. [Clone the certificate (optional)](#step-6-clone-the-certificate-optional)
  7. [Upload the new certificate to the ISV](#step-7-upload-the-new-certificate-to-the-isv)

> **Important:** In the third step, use your own process to sign the CSR. You can't move to step four until the process is completed.

For information on using the Postman REST API test client for these steps, see [Get Started with the Okta REST APIs](/code/rest/).

#### Step 1: List your apps

- For Outbound SAML, use the [/api/v1/apps API](/docs/api/resources/apps#list-applications) to return a list of all apps and collect the `id`, `name`, and `label` elements for each app to update.
- For Inbound SAML, use the [/api/v1/idps API](/docs/api/resources/idps#list-identity-providers-with-defaults) to return a list of all identity providers and collect the full response for each IdP to update.

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

#### Step 2: Generate a CSR

* Use the [/api/v1/apps/credentials/csrs/ API](#top) to return a list of all apps to use with Outbound SAML apps.
* Use the [/api/v1/idps/credentials/csrs/ API](#top) to return a list of all IdPs to use with Inbound SAML apps.

You can generate a CSR and receive the response in either JSON or [PKCS#10](https://tools.ietf.org/html/rfc2986) format.

The following request generates a CSR in JSON format to use with Outbound SAML apps.

- For Inbound SAML, change the POST statement to `POST /api/v1/idps/00000id1U3iyFqLu0g4/credentials/csrs/`.
- For PKCS#10 format, change the Accept statement to `Accept: application/pkcs10`. <br />*Accept* specifies the response format; *Content-Type* specifies the request format.


```json
POST /api/v1/apps/00000id1U3iyFqLu0g4/credentials/csrs/
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

#### Step 3: Sign the CSR

Follow the third-party process that your company uses to sign the CSR. **You can't move to step four until the process is completed**, as the signed CSR is required to continue.

**Note:** The CSR is generated in Base64 DER format. If your process requires a different format, convert it using OpenSSL or a third-party decoder. Free, third-party decoders are readily available.

#### Step 4: Publish the CSR

- Use the [/api/v1/apps/credentials/csrs/${csrId}/lifecycle/publish API](/docs/api/resources/apps#publish-csr-for-application) to publish the certificate for Outbound SAML apps.
- Use the [/api/v1/idps/credentials/csrs/${csrId}/lifecycle/publish API](/docs/api/resources/idps#publish-signing-csr-for-idp) to publish the certificate for Inbound SAML apps.

Base64 encoding and both PEM and CER certificate formats are supported.

- For CER format, change the Content-Type statement to `Content-Type: application/x-x509-ca-cert`.
- For Base64-encoded format, add the statement `Content-Transfer-Encoding: base64` after the Content-Type statement.

Collect the returned Key ID (credentials.signing.kid) to use in the next step.

The following request publishes a CSR with a certificate in PEM format.

```
MIIFgDCCA2igAwIBAgICEAEwDQYJKoZIhvcNAQELBQAwXjELMAkGA1UEBhMCVVMx
CzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMQ0wCwYDVQQKDARP
...
ZZc+BUqujfMzY+coqgn0gCRUSIKy/Jrj7VJkbrnq6zjbb1FVFqBE5pSgf9Pbhald
++kto/WJsmtwBQmZmwP87YAeWoDMkCSSN+mtX13kJYp0pLTu3wwHZj5V1vt9Bv2k
WIUayqnunOUqjF7ZcOr3UegJHPFEJ9VaDpMQR3nBTVce+xbi2NgV3m+lLQc4s7xc
FjGQoNZ/hJ+xBkcXaoxvpOyMV7Z2VHOV5UC8CLcU5Bwc6p+GB0R+RF6YATOwwX1D
Ox5WhmQExOF7xtxFb93mPe0g+voSLNZjsQYUHDs30T+iVmUbp+SQE7HofPB4JTO7
ZRUaagvFUo1EO9m1xnjpLDIa7+M=


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


#### Step 5: Update the key credential

Update the key credential for the app or IdP to specify the new signing Key ID.

- For Outbound SAML, call the [Updating Application API](/docs/api/resources/apps#update-application). Pass the app ID you obtained in step 1 in the URL. In the body, include the app name and the app label that you obtained in step 1 and the Key ID that you obtained in step 4.
- For Inbound SAML, call the [Update IdP API](/docs/api/resources/idps#update-identity-provider). Pass the entire [identity provider](/docs/api/resources/idps#update-identity-provider) that you obtained in step 1 and use the Key ID value obtained in step 4. Partial updates are not supported by the `Updated IdP API`.

The following request is for Outbound SAML.

Request:

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

Request:

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

#### Step 6: Clone the certificate (optional)

- To share the certificate you created across multiple apps, clone it with the
[/api/v1/apps/${applicationId}/credentials/keys/${keyId}/clone?targetAid=${targetApplicationId} API](/docs/api/resources/apps#clone-application-key-credential) using the key `id` you generated.

- To share the certificate you created across multiple Identity Providers, clone it with the
[/api/v1/idps/${idpId}/credentials/keys/${keyId}/clone?targetIdpId=${targetIdpId} API](#top) using the key `id` you generated.

Be sure to clone the certificate to every app or IdP with which you want to share it.

If the certificate you cloned from changes, you must repeat the cloning operation for each app or IdP.

**Important:** Sharing certificates is not a recommended security practice. This API is provided to support legacy use cases.

#### Step 7: Upload the new certificate to the ISV

> After completing step 5, your users cannot access the SAML app or IdP until you complete this step.

**Note:** This step cannot be automated.

For Outbound SAML, complete the following four steps.

1. In the administrator UI, select **Applications** and choose your app.
2. Select **Sign-On Options**.
3.Click**ViewSetupInstructions**,asshownbelow.<br/>{%imgsaml_setup_link.pngalt:"AccessingSAMLSetupInstructions"%}![](/assets/img/ "")
4. Perform the setup for your app again, using the instructions provided. During this setup, you will upload the certificate in a specified format, the metadata, or the certificate fingerprint.

For Inbound SAML, follow the existing procedures for your setup.
