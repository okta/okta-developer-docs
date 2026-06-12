1. Retrieve your `idpId` by using the List all IdPs [endpoint](https://developer.okta.com/docs/api/openapi/oag/oag/tags/idps/other/listidps). Select the IdP that has failover mode set to `AUTOMATIC`.
1. Create the SAML app in Access Gateway by sending a `POST` request to the Create an application [endpoint](https://developer.okta.com/docs/api/openapi/oag/oag/tags/applications/other/createapplication). Use the following request example as a template.
1. In the request body, set `clientId` to the SP entity ID that you retrieved from your client app's metadata.
1. Optional. Include the SP's public certificate as the `spCertificate`. The SP certificate is required when any of `clientSignature`, `encryptAssertion`, `signAssertion`, or `signDocument` are set to `true`.
1. Adjust other settings as needed for your app and SP requirements.
1. Send the POST request.
1. Copy the `id` and `idpMetadata` values from the response. Use `id` in the next step and `idpMetadata` to configure your client app.

### Request example

```bash
curl -i -X POST \
  'https://{oaghostname}/api/v2/apps' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>' \
  -d '{
    "type": "OAG_SAML",
    "label": "SAML Test App",
    "description": "SAML based application",
    "idpId": "3f63f461-c7fc-483b-b2ae-961633d251ac",
    "groups": [
      "00ghsrbfqxmSf7Ekw1d7"
    ],
    "clientId": "saml-client-123",
    "acsUrl": "https://samlapp.domain.tld/acs",
    "logoutUrl": "https://samlapp.domain.tld/logout",
    "postLoginUrl": "https://samlapp.domain.tld/landing",
    "encryptAssertion": true,
    "encryptionAlgorithm": "AES256_CBC",
    "keyTransportAlgorithm": "RSA_OAEP_256",
    "signDocument": true,
    "signAssertion": true,
    "signingAlgorithm": "RSA_SHA256",
    "clientSignature": true,
    "spCertificate": "MIIC2DCCAcCgAwIBAgIJAK8...",
    "nameIdFormat": "UNSPECIFIED",
    "binding": "HTTP_POST"
  }'
```

### Response example

```json

{
  "id": "55931df2-4464-4c4d-97ce-5d0177b09f31",
  "name": "samltestapp",
  "type": "OAG_SAML",
  "description": "SAML based application",
  "label": "SAML Test App",
  "status": "CREATED",
  "groups": [
    "00ghsrbfqxmSf7Ekw1d7"
  ],
  "idpId": "3f63f461-c7fc-483b-b2ae-961633d251ac",
  "clientId": "saml-client-123",
  "acsUrl": "https://samlapp.domain.tld/acs",
  "logoutUrl": "https://samlapp.domain.tld/logout",
  "postLoginUrl": "https://samlapp.domain.tld/landing",
  "encryptAssertion": true,
  "encryptionAlgorithm": "AES256_CBC",
  "keyTransportAlgorithm": "RSA_OAEP_256",
  "signDocument": true,
  "signAssertion": true,
  "signingAlgorithm": "RSA_SHA256",
  "clientSignature": true,
  "nameIdFormat": "UNSPECIFIED",
  "idpMetadata": "PD94bWwgdmVyc2lvbj0iM...",
  "binding": "HTTP_POST",
  "_embedded": {
    "behavior": {
      "singleLogout": false,
      "universalLogout": false,
      "globalTokenRevocation": false
    },
    "attributes": [
      {
        "id": "9c471061-8981-43c5-a7bc-deef2150a5a2",
        "active": true,
        "name": "sampleheader",
        "source": "IDP",
        "value": "firstName",
        "type": "HEADER"
      }
    ]
  }
}
```

## Create attributes

Add attributes to the app to specify what user data Access Gateway includes in the SAML assertion it sends to the SP. Without attributes, the assertion contains only the `NameID`. Adding attributes lets you pass additional user information, such as their email address or display name, that the SP requires to identify and authorize the user.

The user attributes available for SAML assertions are determined by what has been synced from your directory to your offline authentication service. There's an automated sync that happens every hour, but changes made to the directory aren't synced immediately. See [Create and configure the offline mode directory](/docs/guides/oag-offline-mode/#create-and-configure-the-offline-mode-directory).

> **Note:** The `NameID` in the SAML assertion defaults to `uid` for LDAP directories or `sAMAccountName` for Active Directory. To use a different attribute, such as email, set `usernameLDAPAttribute` when you [configure the offline mode directory](/docs/guides/oag-offline-mode/#create-and-configure-the-offline-mode-directory). This can't be changed in the app configuration.

1. Use the Create an attribute [endpoint](https://developer.okta.com/docs/api/openapi/oag/oag/tags/application-attributes/other/createattribute) to add attributes to your SAML app.
1. Use the `id` from the previous step as the `appId` path parameter.
1. In this example, set the `value` to `email` to pass the user's email address to the SP.
1. Send the POST request.
1. Repeat this request for each attribute required by your SP.

> **Note:** The `type` field in the attribute request (`HEADER` or `COOKIE`) has no effect on SAML apps. It's required by the schema but is ignored for SAML apps. The attribute is always included in the SAML assertion regardless of the value in `type`.

### Request example

```bash
curl -i -X POST \
  'https://{oaghostname}/api/v2/apps/{appId}/attributes' \
  -H 'Authorization: Bearer <YOUR_JWT_HERE>' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "email",
    "source": "IDP",
    "value": "email",
    "type": "HEADER"
  }'
```

## Configure your client app with Access Gateway IdP metadata

Configure your SAML client application using the `idpMetadata` value from the [response](#response-example) when you created the app. The `idpMetadata` contains the information your client app needs to trust Access Gateway as an IdP. For example, it contains the SSO URL and signing certificate.

The `idpMetadata` property in the response is Base64-encoded XML. Decode it and import it into your SP's IdP configuration to complete the SAML trust configuration.

The exact steps to configure the client app depend on the app itself. Refer to your client app's documentation.
