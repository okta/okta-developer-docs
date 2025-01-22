---
title: Configure claims sharing
excerpt: Learn how to configure an identity provider to send claims during SSO
layout: Guides
---

<ApiLifecycle access="ea" />

This guide explains how to configure an <OpenID Connect Identity Provider (IdP)> to send authentication claims during Single Sign-On (SSO).

---

#### Learning outcomes

* Know the purpose of claims sharing
* Configure your <type of Identity Provider (IdP)> to send authentication claims during SSO

#### What you need

* [Okta Developer Edition org](https://developer.okta.com/signup)
* An Okta SP org and an Okta IdP org configured for an [Okta-to-Okta](/docs/guides/add-an-external-idp/oktatookta/main/) use case. This guide covers how to configure authentication claims sharing for this use case.
* The **Org2Org Claims Sharing** feature enabled for both orgs. To enable, go to **Settings | Features**, locate the feature and enable.

---

## Overview

Claims sharing is the exchange of identity-related information (claims) between different orgs to enable secure access to resources. A claim is a statement made about a user or entity, such as their username, email address, roles, or permissions, that's shared to help determine access rights.

Authentication claims sharing allows an admin to configure their Okta org to trust claims from <type of IdPs> during SSO. Sharing claims also allows Okta to interpret the authentication context from an IdP. This helps eliminate duplicate factor challenges during user authentication and helps improve security posture.

Claims sharing provides important context to Okta during policy evaluation. For example, these claims give Okta a better understanding of which factors were used by the IdP to verify the user's identity. Claims do this by conveying all the information from the IdP that's needed to make policy decisions in the SP. The Okta session updates the details of the authentications. This creates a seamless and secure user experience, which reduces friction and boosts productivity to achieve end-to-end security.

### <oktasaml> IdP authentication claims sharing

When you use SAML with claims sharing, the data shared between an Okta IdP and an Okta SP is included in the <SAMLResponse> in a new reserved tag in the `Extension` section called `OktaAuth`. The content is communicated in a JSON Web Token embedded within the `Assertion` response. The Okta authentication JWT payload is securely encrypted with a published encryption key from the SP org. The payload contains information about authentication performed at the Okta IdP org.

#### Example <SAML> IdP response

> **Note:** The `OktaAuth` JWT payload is redacted.

```JSON
<saml2:AuthnStatement AuthnInstant="2024-08-21T21:22:21.250Z" SessionIndex="id29513242525044581346797160">
    <saml2:AuthnContext>
        <saml2:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:X509</saml2:AuthnContextClassRef>
        <saml2:AuthnContextDecl>
            <AuthenticationContextDeclaration xmlns="urn:okta:saml:2.0:OktaAuth">
                <Extension>
                    <OktaAuth xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">
                        ...encrypted payload...
                    </OktaAuth>
                </Extension>
            </AuthenticationContextDeclaration>
        </saml2:AuthnContextDecl>
    </saml2:AuthnContext>
</saml2:AuthnStatement>
```

### <oktaoidc> Authentication claims sharing

When you use SAML with claims sharing, the data shared between an Okta IdP and an Okta SP is included in the ID token under a new reserved claim name called `okta-auth`. The `okta_auth` payload is in JWT format within the ID token. The entire Okta authentication JWT payload is securely encrypted with a published encryption key from the SP org. The payload contains information about authentication performed at the Okta IdP org.

#### Example ID token

> **Note:** The `okta_auth` payload is redacted.

```JSON
{
  "aud": "ts1hjc8xh3",
  "auth_time": 1720481750,
  "email": "jon.smith@example.com",
  "exp": 1720482230,
  "family_name": "Smith",
  "given_name": "Jon",
  "iat": 1720481810,
  "iss": "https://idp.okta.com",
  "nonce": "3byzgGdVLxjNUQ3X73rYgQBUc_DO4AJ2",
  "sub": "jon.smith@example.com",
  "okta_auth": {...encrypted JWT payload...}
}
```

## Configure claims sharing

With this claims sharing release, Okta supports only claims sharing between Okta orgs. This section covers how to configure authentication claims sharing for this use case.

### Okta IdP org app

There are no configuration requirements for claims sharing for the Okta IdP org app. This is the app that you use for authenticating and authorizing your users. Okta supports the use of a SAML 2.0 app, an Org2Org OIN app, and an OpenID Connect app with authentication claims sharing.

### Configure the Okta IdP connector to send authentication claims

To use claims sharing, update your Okta <type of> IdP connector in the Okta SP org to send authentication claims. Add the `trust claims: true` key and value pair to your PUT request to update the IdP. Alternatively, you can enable the **Trust claims from this provider** checkbox in the Admin Console. See [robs link here]().

> **Note:** The `mapAMRClaims` property (**Trust AMR claims from this identity provider** checkbox in the Admin Console) is associated with the legacy claims mapping feature. When you have the new claims sharing feature enabled for your orgs, and you include this property and the `trust claims: true` property in your request, this feature takes precedence.

#### Example Okta <type of> IdP update request

This request is an example of an Okta SAML IdP update to trust claims. In the `policy` section, the `trust claims: true` key and value pair appears.

> **Note:** The request example is truncated for brevity.

```JSON
{
    "type":"SAML2",
    "status":"ACTIVE",
    "features":[],
    "id":"0oa78rktqwQbG2m9O0g4",
    "orgUrl":"http://{yourOktaDomain}",
    "name":"Org2Org",
    "created":null,
    "lastUpdated":"2025-01-15T19:45:03.000Z",
    "protocol":{
        "endpoints":{
            "authorization":{"binding":"HTTP-REDIRECT"},
            "token":{"binding":"HTTP-POST"},
            "userInfo":null,
            "jwks":{"binding":"HTTP-REDIRECT"},
            "acs":{
                "binding":"HTTP-POST",
                "type":"INSTANCE"},
            "sso":{
                "url":"http://{yourOktaDomain}/app/okta_org2org/exk78hrRdLRNV4EZY0g4/sso/saml",
                "binding":"HTTP-POST",
                "destination":"http://okta.com"
                }
        },
        "scopes":[],
        "settings":{
            "nameFormat":"urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
            "honorPersistentNameId":true
        },
        "type":"SAML2",
        "algorithms":{
            "response":{
                "signature":{
                    "algorithm":"SHA-256",
                        "scope":"ANY"
                }
            },
        "request":{
            "signature":{
                "algorithm":"SHA-256",
                    "scope":"REQUEST"
              }
          }
        },
        "credentials":{
            "trust":{
                "issuer":"http://{yourOktaDomain}/exk78hrRdLRNV4EZY0g4",
                "audience":"https://{yourOktaDomain}/saml2/service-provider/spjhiydxfezknoimtoye",
                "kid":"eb5c22a1-c2c2-484b-839f-2ca6d29fd519",
                "revocation":null,
                "revocationCacheLifetime":0
             },
        "signing":{"kid":"uiiidnMQ4_WXZlt-ovtrRKJDK6UivJfFSnrfN4nNdwg"}
        }
    },
      "policy":{
        "trustClaims":true,
        "accountLink":{
            "action":"AUTO",
            "filter":null
        },
        "provisioning":{
              "action":"AUTO",
              "profileMaster":false,
              "groups":{"action":"NONE"}
        },
        "maxClockSkew":120000,
        "subject":{
          "userNameTemplate":{ "template":"idpuser.subjectNameId"},
          "filter":"",
          "matchType":"USERNAME",
          "matchAttribute":null
        },
        "mapAMRClaims":false
    },
    .....
}
```

#### Response example

> **Note:** The request example is truncated for brevity.

```JSON
{
    "id": "0oa78rktqwQbG2m9O0g4",
    "name": "Org2Org",
    "status": "ACTIVE",
    "created": null,
    "lastUpdated": "2025-01-15T19:45:16.000Z",
    "protocol": {
        "type": "SAML2",
        "endpoints": {
            "sso": {
                "url": "http://{yourOktaDomain}/app/okta_org2org/exk78hrRdLRNV4EZY0g4/sso/saml",
                "binding": "HTTP-POST",
                "destination": "http://okta.com"
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
            "nameFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
            "honorPersistentNameId": true
        },
        "credentials": {
            "trust": {
                "issuer": "http://www.okta.com/exk78hrRdLRNV4EZY0g4",
                "audience": "https://www.okta.com/saml2/service-provider/spjhiydxfezknoimtoye",
                "kid": "eb5c22a1-c2c2-484b-839f-2ca6d29fd519",
                "revocation": null,
                "revocationCacheLifetime": 0
            },
            "signing": {
                "kid": "uiiidnMQ4_WXZlt-ovtrRKJDK6UivJfFSnrfN4nNdwg"
            }
        }
    },
    "policy": {
        "provisioning": {
            "action": "AUTO",
            "profileMaster": false,
            "groups": {
                "action": "NONE"
            },
            "conditions": {
                "deprovisioned": {
                    "action": "NONE"
                },
                "suspended": {
                    "action": "NONE"
                }
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
            "filter": "",
            "matchType": "USERNAME",
            "matchAttribute": null
        },
        "maxClockSkew": 120000,
        "mapAMRClaims": false,
        "trustClaims": true
    },
    .....
}
```

#### Update OIDC IdP request example

```JSON
{
    "id": "0oa3q52z4b7iDGJfh806",
    "issuerMode": "DYNAMIC",
    "name": "Org2Org OIDC IdP",
    "status": "ACTIVE",
    "created": "2025-01-14T21:56:04.000Z",
    "lastUpdated": "2025-01-17T20:01:09.000Z",
    "protocol": {
        "type": "OIDC",
        "endpoints": {
            "authorization": {
                "url": "https://cmdip-curd-ct18.clouditude.com/oauth2/v1/authorize",
                "binding": "HTTP-REDIRECT"
            },
            "token": {
                "url": "https://cmdip-curd-ct18.clouditude.com/oauth2/v1/token",
                "binding": "HTTP-POST"
            },
            "jwks": {
                "url": "https://cmdip-curd-ct18.clouditude.com/oauth2/v1/keys",
                "binding": "HTTP-REDIRECT"
            }
        },
        "scopes": [
            "email",
            "openid",
            "profile"
        ],
        "issuer": {
            "url": "https://cmdip-curd-ct18.clouditude.com"
        },
        "credentials": {
            "client": {
                "client_id": "0oa3q52oiB4UBbQFT806",
                "client_secret": "X7i4OV8UXUkrqIhr2vFs0RzeYFy3AUmXe_huqfgMw-eiw1KMUUCEs7X7YXrR_9Sq"
            }
        }
    },
    "policy": {
        "provisioning": {
            "action": "AUTO",
            "profileMaster": false,
            "groups": {
                "action": "NONE"
            },
            "conditions": {
                "deprovisioned": {
                    "action": "NONE"
                },
                "suspended": {
                    "action": "NONE"
                }
            }
        },
        "accountLink": {
            "filter": null,
            "action": "AUTO"
        },
        "subject": {
            "userNameTemplate": {
                "template": "idpuser.email"
            },
            "filter": "",
            "matchType": "USERNAME",
            "matchAttribute": ""
        },
        "maxClockSkew": 0,
        "trustClaims": true
    },
    "type": "OIDC"
}
```

#### Response example

> **Note:** This example is truncated for brevity.

```JSON
{
    "id": "0oa3q52z4b7iDGJfh806",
    "issuerMode": "DYNAMIC",
    "name": "Org2Org OIDC IdP",
    "status": "ACTIVE",
    "created": null,
    "lastUpdated": "2025-01-21T19:52:54.000Z",
    "protocol": {
        "type": "OIDC",
        "endpoints": {
            "authorization": {
                "url": "https://cmdip-curd-ct18.clouditude.com/oauth2/v1/authorize",
                "binding": "HTTP-REDIRECT"
            },
            "token": {
                "url": "https://cmdip-curd-ct18.clouditude.com/oauth2/v1/token",
                "binding": "HTTP-POST"
            },
            "jwks": {
                "url": "https://cmdip-curd-ct18.clouditude.com/oauth2/v1/keys",
                "binding": "HTTP-REDIRECT"
            }
        },
        "scopes": [
            "email",
            "openid",
            "profile"
        ],
        "issuer": {
            "url": "https://cmdip-curd-ct18.clouditude.com"
        },
        "credentials": {
            "client": {
                "client_id": "0oa3q52oiB4UBbQFT806",
                "client_secret": "X7i4OV8UXUkrqIhr2vFs0RzeYFy3AUmXe_huqfgMw-eiw1KMUUCEs7X7YXrR_9Sq"
            }
        }
    },
    "policy": {
        "provisioning": {
            "action": "AUTO",
            "profileMaster": false,
            "groups": {
                "action": "NONE"
            },
            "conditions": {
                "deprovisioned": {
                    "action": "NONE"
                },
                "suspended": {
                    "action": "NONE"
                }
            }
        },
        "accountLink": {
            "filter": null,
            "action": "AUTO"
        },
        "subject": {
            "userNameTemplate": {
                "template": "idpuser.email"
            },
            "filter": "",
            "matchType": "USERNAME",
            "matchAttribute": ""
        },
        "maxClockSkew": 0,
        "trustClaims": true
    },
    "type": "OIDC",
    .....
}
```

### Configure a routing rule for the IdP

To test your integration in the next section, configure a [routing rule](https://help.okta.com/okta_help.htm?id=ext-cfg-routing-rules) for the IdP in the Okta SP org.

## Use the IdP to sign in

1. To test your configuration, access your Okta SP org using your browser's privacy or incognito mode to avoid false positive or negative results.
1. On the Okta sign-in page, click **Sign in with {Name of IdP}**.

   If everything is configured properly:

   * The user is redirected to the IdP's sign-in page.
   * The authenticators configured in the authentication policy prompt the user for additional authentication.
   * After successful authentication, the user is redirected to the redirect URI specified in the Okta IdP org app.

   If something is configured incorrectly, the authorization response contains error information to help you resolve the issue. See the [FAQ](#faq) section next.

## FAQ

### What happens if my IdP isn't an Okta IdP?

This claims sharing version supports only Okta IdPs and SPs.

### What type of authenticators from my Okta IdP can the Okta SP accept?

All authenticators that are natively performed on the Okta IdP are accepted. For example, WebAuthN, password, Okta Verify, Okta FastPass, SMS, Email, and so on. If you use any custom authenticators for MFA, leveraging another IdP or smart card, then that authenticator isn't supported by this claims sharing version.

### What happens when I have the deprecated claims mapping feature enabled in my org?

When you enable the new **Org2Org Claims Sharing** feature, that takes precedence over the deprecated **IdP AMR Claims Mapping**.

### What happens with Protected Actions?

?????

### How can I enforce factor verification in the authentication policies

Use the **AND User must authenticate with** field and the **AND Possession factor constraints are** field in the rule.

#### Additional constraints

If you select an option in the **AND Authentication methods** section, Okta has additional constraints:

* **Allow any method that can be used to meet the requirement**: Okta accepts any satisfying authenticator even if it's not configured locally.
* **Disallow specific authentication methods**: If you specify authentication methods to disallow, then Okta disallows those authentication methods.
* **Allow specific authentication methods**: If you specify authentication methods to allow, then Okta only considers those authentication methods.

After you define these conditions, if you still haven't met the policy requirement, then Okta redirects you to verify any locally configured authenticator. If there is no local authenticator available, or the enrollment policy for a particular authenticator is disabled, then Okta displays an error.

### What happens when I have a reauthentication scenario?

This claims sharing version doesn't support reauthentication. The user needs to sign out and then sign in.
