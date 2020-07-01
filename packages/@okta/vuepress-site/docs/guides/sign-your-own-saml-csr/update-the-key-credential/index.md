---
title: Update the key credential
---

Update the key credential for the app or IdP to specify the new signing Key ID.

* For Outbound SAML, call the [Update Application API](/docs/reference/api/apps/#update-application). Pass the app ID that you obtained in <GuideLink link="../list-your-apps">step 1</GuideLink> in the URL. In the body, include the app name and the app label that you obtained in step 1 and the Key ID that you obtained in <GuideLink link="../sign-the-csr">step 4</GuideLink>.

* For Inbound SAML, call the [Update IdP API](/docs/reference/api/idps/#update-identity-provider). Pass the entire [IdP](/docs/reference/api/idps/#update-identity-provider) that you obtained in <GuideLink link="../list-your-apps">step 1</GuideLink> and use the Key ID value that you obtained in <GuideLink link="../sign-the-csr">step 4</GuideLink>. Partial updates aren't supported by the `Updated IdP API`.

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

<NextSectionLink/>
