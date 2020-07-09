---
title: Identity Providers
category: management
---

# Identity Providers API

The Okta Identity Providers API provides operations to manage federations with external Identity Providers (IdP). For example, your app can support signing in with credentials from Apple, Facebook, Google, LinkedIn, Microsoft, an enterprise IdP using SAML 2.0, or an IdP using the OpenID Connect (`OIDC`) protocol.

## Get started

Explore the Identity Providers API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/b6ae6cc993c84d50d927)

## Setup guides

Each IdP requires some setup. Use the Okta setup guide for your IdP:

* [Apple](/docs/guides/add-an-external-idp/apple/before-you-begin/)
* [Facebook](/docs/guides/add-an-external-idp/facebook/before-you-begin/)
* [Google](/docs/guides/add-an-external-idp/google/before-you-begin/)
* [LinkedIn](/docs/guides/add-an-external-idp/linkedin/before-you-begin/)
* [Microsoft](/docs/guides/add-an-external-idp/microsoft/before-you-begin/)
* [Generic OIDC Identity Providers](/docs/guides/add-an-external-idp/openidconnect/before-you-begin/)

## Identity Provider operations

### Add Identity Provider

<ApiOperation method="post" url="/api/v1/idps" />

Adds a new IdP to your organization

- [Add Generic OIDC Identity Provider](#add-generic-openid-connect-identity-provider)
- [Add SAML 2.0 Identity Provider](#add-saml-2-0-identity-provider)
- [Add Apple Identity Provider](#add-apple-identity-provider)
- [Add Facebook Identity Provider](#add-facebook-identity-provider)
- [Add Google Identity Provider](#add-google-identity-provider)
- [Add LinkedIn Identity Provider](#add-linkedin-identity-provider)
- [Add Microsoft Identity Provider](#add-microsoft-identity-provider)
- [Add Smart Card Identity Provider](#add-smart-card-identity-provider)

##### Request parameters

| Parameter | Description       | Param Type | DataType                                      | Required |
| --------- | ----------------- | ---------- | --------------------------------------------- | -------- |
| idp       | IdP settings      | Body       | [Identity Provider](#identity-provider-object) | TRUE     |

##### Response parameters

The created [Identity Provider](#identity-provider-object)

#### Add Generic OpenID Connect Identity Provider

Adds a new `OIDC` type IdP to your organization

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "OIDC",
  "name": "Example OpenID Connect IdP",
  "protocol": {
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
    "endpoints": {
      "acs": {
        "binding": "HTTP-POST",
        "type": "INSTANCE"
      },
      "authorization": {
        "binding": "HTTP-REDIRECT",
        "url": "https://idp.example.com/authorize"
      },
      "token": {
        "binding": "HTTP-POST",
        "url": "https://idp.example.com/token"
      },
      "userInfo": {
        "binding": "HTTP-REDIRECT",
        "url": "https://idp.example.com/userinfo"
      },
      "jwks": {
        "binding": "HTTP-REDIRECT",
        "url": "https://idp.example.com/keys"
      }
    },
    "scopes": [
      "openid",
      "profile",
      "email"
    ],
    "type": "OIDC",
    "credentials": {
      "client": {
        "client_id": "your-client-id",
        "client_secret": "your-client-secret"
      }
    },
    "issuer": {
      "url": "https://idp.example.com"
    }
  },
  "policy": {
    "accountLink": {
      "action": "AUTO",
      "filter": null
    },
    "provisioning": {
      "action": "AUTO",
      "conditions": {
        "deprovisioned": {
          "action": "NONE"
        },
        "suspended": {
          "action": "NONE"
        }
      },
      "groups": {
        "action": "NONE"
      }
    },
    "maxClockSkew": 120000,
    "subject": {
      "userNameTemplate": {
        "template": "idpuser.email"
      },
      "matchType": "USERNAME"
    }
  }
}' "https://${yourOktaDomain}/api/v1/idps"
```

##### Response example

```json
{
    "id": "0oaulob4BFVa4zQvt0g3",
    "type": "OIDC",
    "name": "Example OpenID Connect IdP",
    "status": "ACTIVE",
    "created": "2019-02-07T20:07:47.000Z",
    "lastUpdated": "2019-02-07T20:07:47.000Z",
    "protocol": {
        "type": "OIDC",
        "endpoints": {
            "authorization": {
                "url": "https://idp.example.com/authorize",
                "binding": "HTTP-REDIRECT"
            },
            "token": {
                "url": "https://idp.example.com/token",
                "binding": "HTTP-POST"
            },
            "userInfo": {
                "url": "https://idp.example.com/userinfo",
                "binding": "HTTP-REDIRECT"
            },
            "jwks": {
                "url": "https://idp.example.com/keys",
                "binding": "HTTP-REDIRECT"
            }
        },
        "scopes": [
            "openid"
        ],
        "issuer": {
            "url": "https://idp.example.com"
        },
        "credentials": {
            "client": {
                "client_id": "your-client-id",
                "client_secret": "your-client-secret"
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
            "filter": null,
            "matchType": "USERNAME",
            "matchAttribute": null
        },
        "maxClockSkew": 0
    },
    "_links": {
        "authorize": {
            "href": "https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oaulob4BFVa4zQvt0g3&client_id={clientId}&response_type={responseType}&response_mode={responseMode}&scope={scopes}&redirect_uri={redirectUri}&state={state}&nonce={nonce}",
            "templated": true,
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "clientRedirectUri": {
            "href": "https://${yourOktaDomain}/oauth2/v1/authorize/callback",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

#### Add SAML 2.0 Identity Provider

Adds a new `SAML2` type IdP to your organization

> **Notes:** You must first add the IdP's signature certificate to the IdP key store before you can add a SAML 2.0 IdP with a `kid` credential reference.<br><br>
Don't use `fromURI` to automatically redirect a user to a particular app after successfully authenticating with a third-party IdP. Instead, use [SAML Deep Links](#redirecting-with-saml-deep-links). Using `fromURI` isn't tested and not supported. For more information about using deep links when signing users in using an SP-initiated flow, see [Understanding SP-Initiated Login Flow](/docs/concepts/saml/#understanding-sp-initiated-login-flow).

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "SAML2",
  "name": "Example SAML IdP",
  "protocol": {
    "type": "SAML2",
    "endpoints": {
      "sso": {
        "url": "https://idp.example.com",
        "binding": "HTTP-POST",
        "destination": "https://idp.example.com"
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
    "credentials": {
      "trust": {
        "issuer": "https://idp.example.com",
        "audience": "http://www.okta.com/123",
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
        "template": "saml.subjectNameId"
      },
      "format": [
          "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified"
      ],
      "filter": "(\\S+@example\\.com)",
      "matchType": "USERNAME"
    }
  }
}' "https://${yourOktaDomain}/api/v1/idps"
```

##### Response example

```json
{
  "id": "0oa62bc8wppPw0UGr0h7",
  "type": "SAML2",
  "name": "Example SAML IdP",
  "status": "ACTIVE",
  "created": "2016-03-24T23:14:54.000Z",
  "lastUpdated": "2016-03-24T23:14:54.000Z",
  "protocol": {
    "type": "SAML2",
    "endpoints": {
      "sso": {
        "url": "https://idp.example.com",
        "binding": "HTTP-POST",
        "destination": "https://idp.example.com"
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
        "audience": "http://www.okta.com/123",
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
        "template": "saml.subjectNameId"
      },
      "filter": "(\\S+@example\\.com)",
      "matchType": "USERNAME"
    },
    "maxClockSkew": 0
  },
  "_links": {
    "metadata": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/metadata.xml",
      "type": "application/xml",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "acs": {
      "href": "https://${yourOktaDomain}/sso/saml2/0oa62bc8wppPw0UGr0h7",
      "type": "application/xml",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "users": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/users",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

##### Redirect with SAML deep links

Use SAML deep links to automatically redirect the user to an app after successfully authenticating with a third-party IdP. To use deep links, assemble these three parts into a URL:

* SP ACS URL<br>
For example: `https://{myOktaDomain}.com/sso/saml2/:idpId`
* The app to which the user is automatically redirected after successfully authenticating with the IdP <br>
For example: `/app/:app-location/:appId/sso/saml`
* Optionally, if the app is an outbound SAML app, you can specify the `relayState` passed to it.<br>
For example: `?RelayState=:anyUrlEncodedValue`

The deep link for the above three parts is:<br>
`https://{myOktaDomain}.com/sso/saml2/:idpId/app/:app-location/:appId/sso/saml?RelayState=:anyUrlEncodedValue`

#### Add Apple Identity Provider

Adds a new `Apple` type IdP to your organization

##### Request example

> **Note:** The key is truncated for brevity.

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "APPLE",
  "name": "Apple Identity Provider",
  "protocol": {
    "type": "OIDC",
    "scopes": ["openid", "email", "name"],
    "credentials": {
      "client": {
        "client_id": "your-client-id"
      },
      "signing": {
        "privateKey": "MIGTAgEAMBM........Cb9PnybCnzDv+3cWSGWqpAIsQQZ",
        "kid": "test key id",
        "teamId": "test team id"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "AUTO",
      "profileMaster": true,
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
      "action": "AUTO"
    },
    "subject": {
      "userNameTemplate": {
        "template": "idpuser.email"
      },
      "matchType": "USERNAME"
    }
  }
}' "https://${yourOktaDomain}/api/v1/idps"
```

##### Response example

> **Note:** The key is truncated for brevity.

```json
{
  "id": "0oa18hsHsG3boVejU0g4",
  "type": "APPLE",
  "issuerMode": "ORG_URL",
  "name": "Apple Identity Provider",
  "status": "ACTIVE",
  "created": "2020-06-05T20:57:51.000Z",
  "lastUpdated": "2020-06-05T20:57:51.000Z",
  "protocol": {
    "type": "OIDC",
    "endpoints": {
      "authorization": {
        "url": "https://appleid.apple.com/auth/authorize",
        "binding": "HTTP-REDIRECT"
      },
      "token": {
        "url": "https://appleid.apple.com/auth/token",
        "binding": "HTTP-POST"
      }
    },
    "scopes": [
      "openid",
      "email",
      "name"
    ],
    "credentials": {
      "client": {
        "client_id": "your-client-id"
      },
      "signing": {
        "teamId": "test team id",
        "privateKey": "MIGTAgEAMBM........Cb9PnybCnzDv+3cWSGWqpAIsQQZ",
        "kid": "test key id"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "AUTO",
      "profileMaster": true,
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
      "filter": null,
      "matchType": "USERNAME",
      "matchAttribute": null
    },
    "maxClockSkew": 0
  },
  "_links": {
    "authorize": {
      "href": "http://{yourOktaDomain}/oauth2/v1/authorize?idp=0oa18hsHsG3boVejU0g4&client_id={clientId}&response_type={responseType}&response_mode={responseMode}&scope={scopes}&redirect_uri={redirectUri}&state={state}&nonce={nonce}",
      "templated": true,
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "clientRedirectUri": {
      "href": "http://{yourOktaDomain}/oauth2/v1/authorize/callback",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Add Facebook Identity Provider

Adds a new `FACEBOOK` type IdP to your organization

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "FACEBOOK",
  "name": "Facebook",
  "protocol": {
    "type": "OAUTH2",
    "scopes": [
      "public_profile",
      "email"
    ],
    "credentials": {
      "client": {
        "client_id": "your-client-id",
        "client_secret": "your-client-secret"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "AUTO",
      "profileMaster": true,
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
        "template": "idpuser.userPrincipalName",
        "type": null
      },
      "filter": null,
      "matchType": "USERNAME"
    },
    "maxClockSkew": 0
  }
}' "https://${yourOktaDomain}/api/v1/idps"
```

##### Response example


```json
{
  "id": "0oa62b57p7c8PaGpU0h7",
  "type": "FACEBOOK",
  "name": "Facebook",
  "status": "ACTIVE",
  "created": "2016-03-24T23:18:27.000Z",
  "lastUpdated": "2016-03-24T23:18:27.000Z",
  "protocol": {
    "type": "OAUTH2",
    "endpoints": {
      "authorization": {
        "url": "https://www.facebook.com/dialog/oauth",
        "binding": "HTTP-REDIRECT"
      },
      "token": {
        "url": "https://graph.facebook.com/v2.5/oauth/access_token",
        "binding": "HTTP-POST"
      }
    },
    "scopes": [
      "public_profile",
      "email"
    ],
    "credentials": {
      "client": {
        "client_id": "your-client-id",
        "client_secret": "your-client-secret"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "AUTO",
      "profileMaster": true,
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
        "template": "idpuser.userPrincipalName"
      },
      "filter": null,
      "matchType": "USERNAME"
    },
    "maxClockSkew": 0
  },
  "_links": {
    "authorize": {
      "href": "https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oa62b57p7c8PaGpU0h7&
          client_id={clientId}&response_type={responseType}&response_mode={responseMode}&
          scope={scopes}&redirect_uri={redirectUri}&state={state}",
      "templated": true,
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "clientRedirectUri": {
      "href": "https://${yourOktaDomain}/oauth2/v1/authorize/callback",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Add Google Identity Provider

Adds a new `Google` type IdP to your organization

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "GOOGLE",
  "name": "Google",
  "protocol": {
    "type": "OAUTH2",
    "scopes": [
      "profile",
      "email",
      "openid"
    ],
    "credentials": {
      "client": {
        "client_id": "your-client-id",
        "client_secret": "your-client-secret"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "AUTO",
      "profileMaster": true,
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
        "template": "idpuser.userPrincipalName",
        "type": null
      },
      "filter": null,
      "matchType": "USERNAME"
    },
    "maxClockSkew": 0
  }
}' "https://${yourOktaDomain}/api/v1/idps"
```

##### Response example

```json
{
  "id": "0oa62bfdiumsUndnZ0h7",
  "type": "GOOGLE",
  "name": "Google",
  "status": "ACTIVE",
  "created": "2016-03-24T23:21:49.000Z",
  "lastUpdated": "2016-03-24T23:21:49.000Z",
  "protocol": {
    "type": "OIDC",
    "endpoints": {
      "authorization": {
        "url": "https://accounts.google.com/o/oauth2/auth",
        "binding": "HTTP-REDIRECT"
      },
      "token": {
        "url": "https://www.googleapis.com/oauth2/v3/token",
        "binding": "HTTP-POST"
      }
    },
    "scopes": [
      "profile",
      "email",
      "openid"
    ],
    "credentials": {
      "client": {
        "client_id": "your-client-id",
        "client_secret": "your-client-secret"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "AUTO",
      "profileMaster": true,
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
        "template": "idpuser.userPrincipalName"
      },
      "filter": null,
      "matchType": "USERNAME"
    },
    "maxClockSkew": 0
  },
  "_links": {
    "authorize": {
      "href": "https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oa62bfdiumsUndnZ0h7&
          client_id={clientId}&response_type={responseType}&response_mode={responseMode}&
          scope={scopes}&redirect_uri={redirectUri}&state={state}",
      "templated": true,
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "clientRedirectUri": {
      "href": "https://${yourOktaDomain}/oauth2/v1/authorize/callback",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Add LinkedIn Identity Provider

Adds a new `LINKEDIN` type IdP to your organization

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "LINKEDIN",
  "name": "LinkedIn",
  "protocol": {
    "type": "OAUTH2",
    "scopes": [
      "r_basicprofile",
      "r_emailaddress"
    ],
    "credentials": {
      "client": {
        "client_id": "your-client-id",
        "client_secret": "your-client-secret"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "AUTO",
      "profileMaster": true,
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
        "template": "idpuser.userPrincipalName",
        "type": null
      },
      "filter": null,
      "matchType": "USERNAME"
    },
    "maxClockSkew": 0
  }
}' "https://${yourOktaDomain}/api/v1/idps"
```

##### Response example

```json
{
  "id": "0oa62bfdjnK55Z5x80h7",
  "type": "LINKEDIN",
  "name": "LinkedIn",
  "status": "ACTIVE",
  "created": "2016-03-24T23:23:59.000Z",
  "lastUpdated": "2016-03-24T23:23:59.000Z",
  "protocol": {
    "type": "OAUTH2",
    "endpoints": {
      "authorization": {
        "url": "https://www.linkedin.com/uas/oauth2/authorization",
        "binding": "HTTP-REDIRECT"
      },
      "token": {
        "url": "https://www.linkedin.com/uas/oauth2/accessToken",
        "binding": "HTTP-POST"
      }
    },
    "scopes": [
      "r_basicprofile",
      "r_emailaddress"
    ],
    "credentials": {
      "client": {
        "client_id": "your-client-id",
        "client_secret": "your-client-secret"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "AUTO",
      "profileMaster": true,
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
        "template": "idpuser.userPrincipalName"
      },
      "filter": null,
      "matchType": "USERNAME"
    },
    "maxClockSkew": 0
  },
  "_links": {
    "authorize": {
      "href": "https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oa62bfdjnK55Z5x80h7&
          client_id={clientId}&response_type={responseType}&response_mode={responseMode}&
          scope={scopes}&redirect_uri={redirectUri}&state={state}",
      "templated": true,
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "clientRedirectUri": {
      "href": "https://${yourOktaDomain}/oauth2/v1/authorize/callback",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Add Microsoft Identity Provider

Adds a new `Microsoft` type IdP to your organization

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "MICROSOFT",
  "name": "Microsoft",
  "protocol": {
    "type": "OIDC",
    "scopes": ["openid", "email", "profile", "https://graph.microsoft.com/User.Read"],
    "credentials": {
      "client": {
        "client_id": "your-client-id",
        "client_secret": "your-client-secret"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "AUTO",
      "profileMaster": true,
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
        "template": "idpuser.userPrincipalName",
        "type": null
      },
      "filter": null,
      "matchType": "USERNAME"
    },
    "maxClockSkew": 0
  }
}' "https://${yourOktaDomain}/api/v1/idps"
```

##### Response example

```json
{
  "id": "0oajmvdFawBih4gey0g3",
  "type": "MICROSOFT",
  "name": "Microsoft",
  "status": "ACTIVE",
  "created": "2016-03-29T16:47:36.000Z",
  "lastUpdated": "2016-03-29T16:47:36.000Z",
  "protocol": {
    "type": "OIDC",
    "endpoints": {
      "authorization": {
        "url": "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
        "binding": "HTTP-REDIRECT"
      },
      "token": {
        "url": "https://login.microsoftonline.com/common/oauth2/v2.0/token",
        "binding": "HTTP-POST"
      }
    },
    "scopes": [
      "openid",
      "email",
      "profile",
      "https://graph.microsoft.com/User.Read"
    ],
    "credentials": {
      "client": {
        "client_id": "your-client-id",
        "client_secret": "your-client-secret"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "AUTO",
      "profileMaster": true,
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
        "template": "idpuser.userPrincipalName"
      },
      "filter": null,
      "matchType": "USERNAME"
    },
    "maxClockSkew": 0
  },
  "_links": {
    "authorize": {
      "href": "https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oajmvdFawBih4gey0g3&
          client_id={clientId}&response_type={responseType}&response_mode={responseMode}&
          scope={scopes}&redirect_uri={redirectUri}&state={state}",
      "templated": true,
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "clientRedirectUri": {
      "href": "https://${yourOktaDomain}/oauth2/v1/authorize/callback",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Add Smart Card Identity Provider

Adds a new Smart Card `X509` type IdP to your organization

##### Request example

> **Notes:** You must first add the IdP's server certificate to the IdP key store before you can add a Smart Card `X509` IdP with a `kid` credential reference. You need to upload the whole trust chain as a single key using the [Key Store API](#add-x-509-certificate-public-key).<br>
Depending on the information stored in the smart card, select the proper [template](/docs/reference/okta-expression-language/#idp-user-profile) `idpuser.subjectAltNameEmail` or `idpuser.subjectAltNameUpn`.

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "type": "X509",
  "status": "ACTIVE",
  "features": [],
  "name": "Smart Card IDP Name",
  "protocol": {
    "type": "MTLS",
    "credentials": {
      "trust": {
        "revocation": "CRL",
        "revocationCacheLifetime": 2880,
        "issuer": "your-issuer",
        "kid": "your-kid"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action":"DISABLED"
      }
    },
    "maxClockSkew":120000,
    "subject": {
      "matchType": "EMAIL",
      "matchAttribute": "",
      "userNameTemplate": {
        "template": "idpuser.subjectAltNameEmail"
      }
    }
  }
}' "https://${yourOktaDomain}/api/v1/idps"
```

##### Response example


```json
{
  "id": "0oa6jxasyhwM2ZHJh0g4",
  "type": "X509",
  "name": "Smart Card IDP Name",
  "status": "ACTIVE",
  "created": "2020-01-07T00:19:27.000Z",
  "lastUpdated": "2020-01-07T00:19:27.000Z",
  "protocol": {
    "type": "MTLS",
    "endpoints": {
      "sso": {
        "url": "https://${yourOktaDomain}.okta.com/login/cert"
      }
    },
    "credentials": {
      "trust": {
        "issuer": "CN=Test Smart Card, OU=Test OU, O=Test O, C=US",
        "audience": null,
        "kid":"45dec5ff-8cdc-48c0-85fe-a4869f1753dc",
        "revocation":"CRL",
        "revocationCacheLifetime":2880
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "DISABLED",
      "profileMaster": false,
      "groups": null
    },
    "subject": {
      "userNameTemplate": {
        "template": "idpuser.subjectAltNameEmail"
      },
      "filter": null,
      "matchType": "EMAIL",
      "matchAttribute": null
    },
    "maxClockSkew":0
  },
  "_links": {
    "deactivate": {
      "href": "https://${yourOktaDomain}.okta.com/api/v1/idps/0oa6jxasyhwM2ZHJh0g4/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "users": {
      "href": "https://${yourOktaDomain}.okta.com/api/v1/idps/0oa6jxasyhwM2ZHJh0g4/users",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "keys": {
      "href":"https://${yourOktaDomain}.okta.com/api/v1/idps/credentials/keys/45dec5ff-8cdc-48c0-85fe-a4869f1753dc",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  } 
}
```

### Get Identity Provider

<ApiOperation method="get" url="/api/v1/idps/${idpId}" />

Fetches an IdP by `id`

##### Request parameters


Parameter | Description     | Param Type | DataType | Required |
--------- | --------------- | ---------- | -------- | -------- |
idpId       | `id` of an IdP  | URL        | String   | TRUE     |

##### Response parameters

[Identity Provider](#identity-provider-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/idps/0oa62bfdjnK55Z5x80h7"
```

##### Response example

```json
{
  "id": "0oa62bfdjnK55Z5x80h7",
  "type": "LINKEDIN",
  "name": "LinkedIn",
  "status": "ACTIVE",
  "created": "2016-03-24T23:23:59.000Z",
  "lastUpdated": "2016-03-24T23:23:59.000Z",
  "protocol": {
    "type": "OAUTH2",
    "endpoints": {
      "authorization": {
        "url": "https://www.linkedin.com/uas/oauth2/authorization",
        "binding": "HTTP-REDIRECT"
      },
      "token": {
        "url": "https://www.linkedin.com/uas/oauth2/accessToken",
        "binding": "HTTP-POST"
      }
    },
    "scopes": [
      "r_basicprofile",
      "r_emailaddress"
    ],
    "credentials": {
      "client": {
        "client_id": "your-client-id",
        "client_secret": "your-client-secret"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "AUTO",
      "profileMaster": true,
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
        "template": "idpuser.userPrincipalName"
      },
      "filter": null,
      "matchType": "USERNAME"
    },
    "maxClockSkew": 0
  },
  "_links": {
    "authorize": {
      "href": "https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oa62bfdjnK55Z5x80h7&
          client_id={clientId}&response_type={responseType}&response_mode={responseMode}&
          scope={scopes}&redirect_uri={redirectUri}&state={state}",
      "templated": true,
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "clientRedirectUri": {
      "href": "https://${yourOktaDomain}/oauth2/v1/authorize/callback",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### List Identity Providers

<ApiOperation method="get" url="/api/v1/idps" />

Enumerates IdPs in your organization with pagination. A subset of IdPs can be returned that match a supported filter expression or query.

- [List Identity Providers with defaults](#list-identity-providers-with-defaults)
- [List Identity Providers with name](#find-identity-providers-by-name)
- [List Identity Providers with type](#find-identity-providers-by-type)

##### Request parameters

Parameter | Description                                                                                | Param Type | DataType | Required | Default
--------- | ------------------------------------------------------------------------------------------ | ---------- | -------- | -------- | -------
after     | Specifies the pagination cursor for the next page of IdPs                                  | Query      | String   | FALSE    |
limit     | Specifies the number of IdP results in a page                                              | Query      | Number   | FALSE    | 20
q         | Searches the `name` property of IdPs for matching value                                    | Query      | String   | FALSE    |
type      | Filters IdPs by `type`                                                                     | Query      | String   | FALSE    |

**Parameter details**

* Treat the `after` cursor as an opaque value and obtain it through the next link relationship. See [Pagination](/docs/reference/api-overview/#pagination).
* Search currently performs a `startsWith` match, but it should be considered an implementation detail and may change without notice in the future.

##### Response parameters

Array of [Identity Provider](#identity-provider-object)

#### List Identity Providers with defaults

Enumerates all IdPs in your organization

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/idps?limit=20"
```

##### Response example

```json
[
  {
    "id": "0oa62b57p7c8PaGpU0h7",
    "type": "FACEBOOK",
    "name": "Facebook",
    "status": "ACTIVE",
    "created": "2016-03-24T23:18:27.000Z",
    "lastUpdated": "2016-03-24T23:18:27.000Z",
    "protocol": {
      "type": "OAUTH2",
      "endpoints": {
        "authorization": {
          "url": "https://www.facebook.com/dialog/oauth",
          "binding": "HTTP-REDIRECT"
        },
        "token": {
          "url": "https://graph.facebook.com/v2.5/oauth/access_token",
          "binding": "HTTP-POST"
        }
      },
      "scopes": [
        "public_profile",
        "email"
      ],
      "credentials": {
        "client": {
          "client_id": "your-client-id",
          "client_secret": "your-client-secret"
        }
      }
    },
    "policy": {
      "provisioning": {
        "action": "AUTO",
        "profileMaster": true,
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
          "template": "idpuser.userPrincipalName"
        },
        "filter": null,
        "matchType": "USERNAME"
      },
      "maxClockSkew": 0
    },
    "_links": {
      "authorize": {
        "href": "https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oa62b57p7c8PaGpU0h7&
            client_id={clientId}&response_type={responseType}&response_mode={responseMode}&
            scope={scopes}&redirect_uri={redirectUri}&state={state}",
        "templated": true,
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "clientRedirectUri": {
        "href": "https://${yourOktaDomain}/oauth2/v1/authorize/callback",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "id": "0oa62bc8wppPw0UGr0h7",
    "type": "SAML2",
    "name": "Example SAML IdP",
    "status": "ACTIVE",
    "created": "2016-03-24T23:14:54.000Z",
    "lastUpdated": "2016-03-24T23:14:54.000Z",
    "protocol": {
      "type": "SAML2",
      "endpoints": {
        "sso": {
          "url": "https://idp.example.com",
          "binding": "HTTP-POST",
          "destination": "https://idp.example.com"
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
          "audience": "http://www.okta.com/123",
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
          "template": "saml.subjectNameId"
        },
        "filter": "(\\S+@example\\.com)",
        "matchType": "USERNAME"
      },
      "maxClockSkew": 0
    },
    "_links": {
      "metadata": {
        "href": "https://${yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/metadata.xml",
        "type": "application/xml",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "acs": {
        "href": "https://${yourOktaDomain}/sso/saml2/0oa62bc8wppPw0UGr0h7",
        "type": "application/xml",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "users": {
        "href": "https://${yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/users",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "deactivate": {
        "href": "https://${yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/lifecycle/deactivate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "id": "0oa62bfdiumsUndnZ0h7",
    "type": "GOOGLE",
    "name": "Google",
    "status": "ACTIVE",
    "created": "2016-03-24T23:21:49.000Z",
    "lastUpdated": "2016-03-24T23:21:49.000Z",
    "protocol": {
      "type": "OIDC",
      "endpoints": {
        "authorization": {
          "url": "https://accounts.google.com/o/oauth2/auth",
          "binding": "HTTP-REDIRECT"
        },
        "token": {
          "url": "https://www.googleapis.com/oauth2/v3/token",
          "binding": "HTTP-POST"
        }
      },
      "scopes": [
        "profile",
        "email",
        "openid"
      ],
      "credentials": {
        "client": {
          "client_id": "your-client-id",
          "client_secret": "your-client-secret"
        }
      }
    },
    "policy": {
      "provisioning": {
        "action": "AUTO",
        "profileMaster": true,
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
          "template": "idpuser.userPrincipalName"
        },
        "filter": null,
        "matchType": "USERNAME"
      },
      "maxClockSkew": 0
    },
    "_links": {
      "authorize": {
        "href": "https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oa62bfdiumsUndnZ0h7&
            client_id={clientId}&response_type={responseType}&response_mode={responseMode}&
            scope={scopes}&redirect_uri={redirectUri}&state={state}",
        "templated": true,
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "clientRedirectUri": {
        "href": "https://${yourOktaDomain}/oauth2/v1/authorize/callback",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "id": "0oa62bfdjnK55Z5x80h7",
    "type": "LINKEDIN",
    "name": "LinkedIn",
    "status": "ACTIVE",
    "created": "2016-03-24T23:23:59.000Z",
    "lastUpdated": "2016-03-24T23:23:59.000Z",
    "protocol": {
      "type": "OAUTH2",
      "endpoints": {
        "authorization": {
          "url": "https://www.linkedin.com/uas/oauth2/authorization",
          "binding": "HTTP-REDIRECT"
        },
        "token": {
          "url": "https://www.linkedin.com/uas/oauth2/accessToken",
          "binding": "HTTP-POST"
        }
      },
      "scopes": [
        "r_basicprofile",
        "r_emailaddress"
      ],
      "credentials": {
        "client": {
          "client_id": "your-client-id",
          "client_secret": "your-client-secret"
        }
      }
    },
    "policy": {
      "provisioning": {
        "action": "AUTO",
        "profileMaster": true,
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
          "template": "idpuser.userPrincipalName"
        },
        "filter": null,
        "matchType": "USERNAME"
      },
      "maxClockSkew": 0
    },
    "_links": {
      "authorize": {
        "href": "https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oa62bfdjnK55Z5x80h7&
            client_id={clientId}&response_type={responseType}&response_mode={responseMode}&
            scope={scopes}&redirect_uri={redirectUri}&state={state}",
        "templated": true,
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "clientRedirectUri": {
        "href": "https://${yourOktaDomain}/oauth2/v1/authorize/callback",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "id": "0oajmvdFawBih4gey0g3",
    "type": "MICROSOFT",
    "name": "Microsoft",
    "status": "ACTIVE",
    "created": "2016-03-29T16:47:36.000Z",
    "lastUpdated": "2016-03-29T16:47:36.000Z",
    "protocol": {
      "type": "OIDC",
      "endpoints": {
        "authorization": {
          "url": "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
          "binding": "HTTP-REDIRECT"
        },
        "token": {
          "url": "https://login.microsoftonline.com/common/oauth2/v2.0/token",
          "binding": "HTTP-POST"
        }
      },
      "scopes": [
        "openid",
        "email",
        "profile",
        "https://graph.microsoft.com/User.Read"
      ],
      "credentials": {
        "client": {
          "client_id": "your-client-id",
          "client_secret": "your-client-secret"
        }
      }
    },
    "policy": {
      "provisioning": {
        "action": "AUTO",
        "profileMaster": true,
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
          "template": "idpuser.userPrincipalName"
        },
        "filter": null,
        "matchType": "USERNAME"
      },
      "maxClockSkew": 0
    },
    "_links": {
      "authorize": {
        "href": "https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oajmvdFawBih4gey0g3&
            client_id={clientId}&response_type={responseType}&response_mode={responseMode}&
            scope={scopes}&redirect_uri={redirectUri}&state={state}",
        "templated": true,
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "clientRedirectUri": {
        "href": "https://${yourOktaDomain}/oauth2/v1/authorize/callback",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
      "id": "0oaulob4BFVa4zQvt0g3",
      "type": "OIDC",
      "name": "Example OpenID Connect IdP",
      "status": "ACTIVE",
      "created": "2019-02-07T20:07:47.000Z",
      "lastUpdated": "2019-02-07T20:07:47.000Z",
      "protocol": {
          "type": "OIDC",
          "endpoints": {
              "authorization": {
                  "url": "https://idp.example.com/authorize",
                  "binding": "HTTP-REDIRECT"
              },
              "token": {
                  "url": "https://idp.example.com/token",
                  "binding": "HTTP-POST"
              },
              "userInfo": {
                  "url": "https://idp.example.com/userinfo",
                  "binding": "HTTP-REDIRECT"
              },
              "jwks": {
                  "url": "https://idp.example.com/keys",
                  "binding": "HTTP-REDIRECT"
              }
          },
          "scopes": [
              "openid"
          ],
          "issuer": {
              "url": "https://idp.example.com"
          },
          "credentials": {
              "client": {
                  "client_id": "your-client-id",
                  "client_secret": "your-client-secret"
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
              "filter": null,
              "matchType": "USERNAME",
              "matchAttribute": null
          },
          "maxClockSkew": 0
      },
      "_links": {
          "authorize": {
              "href": "https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oaulob4BFVa4zQvt0g3&client_id={clientId}&response_type={responseType}&response_mode={responseMode}&scope={scopes}&redirect_uri={redirectUri}&state={state}&nonce={nonce}",
              "templated": true,
              "hints": {
                  "allow": [
                      "GET"
                  ]
              }
          },
          "clientRedirectUri": {
              "href": "https://${yourOktaDomain}/oauth2/v1/authorize/callback",
              "hints": {
                  "allow": [
                      "POST"
                  ]
              }
          }
      }
  },
  {
  "id": "0oa6jxasyhwM2ZHJh0g4",
  "type": "X509",
  "name": "Smart Card IDP Name",
  "status": "ACTIVE",
  "created": "2020-01-07T00:19:27.000Z",
  "lastUpdated": "2020-01-07T00:19:27.000Z",
  "protocol": {
    "type": "MTLS",
    "endpoints": {
      "sso": {
        "url": "https://${yourOktaDomain}.okta.com/login/cert"
      }
    },
    "credentials": {
      "trust": {
        "issuer": "CN=Test Smart Card, OU=Test OU, O=Test O, C=US",
        "audience": null,
        "kid":"45dec5ff-8cdc-48c0-85fe-a4869f1753dc",
        "revocation":"CRL",
        "revocationCacheLifetime":2880
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "DISABLED",
      "profileMaster": false,
      "groups": null
    },
    "subject": {
      "userNameTemplate": {
        "template": "idpuser.subjectAltNameEmail"
      },
      "filter": null,
      "matchType": "EMAIL",
      "matchAttribute": null
    },
    "maxClockSkew":0
  },
  "_links": {
    "deactivate": {
      "href": "https://${yourOktaDomain}.okta.com/api/v1/idps/0oa6jxasyhwM2ZHJh0g4/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "users": {
      "href": "https://${yourOktaDomain}.okta.com/api/v1/idps/0oa6jxasyhwM2ZHJh0g4/users",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "keys": {
      "href":"https://${yourOktaDomain}.okta.com/api/v1/idps/credentials/keys/45dec5ff-8cdc-48c0-85fe-a4869f1753dc",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    }
  } 
}
]
```

#### Find Identity Providers by name

Searches for IdPs by `name` in your organization

Search currently performs a `startsWith` match, but it should be considered an implementation detail and may change without notice in the future. Exact matches are returned before partial matches.

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/idps?q=Example SAML&limit=10"
```

##### Response example

```json
[
  {
    "id": "0oa62bc8wppPw0UGr0h7",
    "type": "SAML2",
    "name": "Example SAML IdP",
    "status": "ACTIVE",
    "created": "2016-03-24T23:14:54.000Z",
    "lastUpdated": "2016-03-24T23:14:54.000Z",
    "protocol": {
      "type": "SAML2",
      "endpoints": {
        "sso": {
          "url": "https://idp.example.com",
          "binding": "HTTP-POST",
          "destination": "https://idp.example.com"
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
          "audience": "http://www.okta.com/123",
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
          "template": "saml.subjectNameId"
        },
        "filter": "(\\S+@example\\.com)",
        "matchType": "USERNAME"
      },
      "maxClockSkew": 0
    },
    "_links": {
      "metadata": {
        "href": "https://${yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/metadata.xml",
        "type": "application/xml",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "acs": {
        "href": "https://${yourOktaDomain}/sso/saml2/0oa62bc8wppPw0UGr0h7",
        "type": "application/xml",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "users": {
        "href": "https://${yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/users",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "deactivate": {
        "href": "https://${yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/lifecycle/deactivate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  }
]
```

#### Find Identity Providers by type

Finds all IdPs with a [specific type](#identity-provider-type)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/idps?type=SAML2"
```

##### Response example

```JSON
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://${yourOktaDomain}/api/v1/idps?limit=20>; rel="self"
Link: <https://${yourOktaDomain}/api/v1/idps?after=0oaxdqpA88PtFNmhu0g3&limit=20>; rel="next"
[
  {
    "id": "0oa62bc8wppPw0UGr0h7",
    "type": "SAML2",
    "name": "Example SAML IdP",
    "status": "ACTIVE",
    "created": "2016-03-24T23:14:54.000Z",
    "lastUpdated": "2016-03-24T23:14:54.000Z",
    "protocol": {
      "type": "SAML2",
      "endpoints": {
        "sso": {
          "url": "https://idp.example.com",
          "binding": "HTTP-POST",
          "destination": "https://idp.example.com"
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
          "audience": "http://www.okta.com/123",
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
          "template": "saml.subjectNameId"
        },
        "filter": "(\\S+@example\\.com)",
        "matchType": "USERNAME"
      },
      "maxClockSkew": 0
    },
    "_links": {
      "metadata": {
        "href": "https://${yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/metadata.xml",
        "type": "application/xml",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "acs": {
        "href": "https://${yourOktaDomain}/sso/saml2/0oa62bc8wppPw0UGr0h7",
        "type": "application/xml",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "users": {
        "href": "https://${yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/users",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "deactivate": {
        "href": "https://${yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/lifecycle/deactivate",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  }
]
```

### Update Identity Provider

<ApiOperation method="put" url="/api/v1/idps/${idpId}" />

Updates the configuration for an IdP

##### Request parameters

| Parameter | Description                       | Param Type | DataType                                      | Required |
| --------- | --------------------------------- | ---------- | --------------------------------------------- | -------- |
| id        | `id` of the IdP to update           | URL        | String                                        | TRUE     |
| idp       | Updated configuration for the IdP | Body       | [Identity Provider](#identity-provider-object) | TRUE     |

All properties must be specified when updating the IdP configuration. Partial updates aren't supported.

##### Response parameters

Updated [Identity Provider](#identity-provider-object)

##### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/idps/your-idps-id"
```

##### Response example

```json
{
  "id": "0oa62bc8wppPw0UGr0h7",
  "type": "SAML2",
  "name": "Example SAML IdP",
  "status": "INACTIVE",
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
      "filter": null,
      "matchType": "USERNAME"
    },
    "maxClockSkew": 120000
  },
  "_links": {
    "metadata": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/metadata.xml",
      "type": "application/xml",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "acs": {
      "href": "https://${yourOktaDomain}/sso/saml2/0oa62bc8wppPw0UGr0h7",
      "type": "application/xml",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "users": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/users",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "activate": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```
### Delete Identity Provider

<ApiOperation method="delete" url="/api/v1/idps/${idpId}" />

Removes an IdP from your organization

* All existing IdP users are unlinked with the highest order profile master taking precedence for each IdP user.
* Unlinked users keep their existing authentication provider such as `FEDERATION` or `SOCIAL`.

##### Request parameters

| Parameter | Description                 | Param Type | Data Type | Required |
| --------- | --------------------------- | ---------- | --------- | -------- |
| idpId     | `id` of the IdP to delete   | URL        | String    | TRUE     |

##### Response parameters

There are no response parameters.

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/idps/your-idps-id"
```

##### Response example

```http
HTTP/1.1 204 No Content
```

## Identity Provider lifecycle operations

### Activate Identity Provider

<ApiOperation method="post" url="/api/v1/idps/${idpId}/lifecycle/activate" />

Activates an inactive IdP

##### Request parameters

| Parameter | Description             | Param Type | DataType | Required |
| --------- | ----------------------- | ---------- | -------- | -------- |
| idpId     | `id` of IdP to activate | URL        | String   | TRUE     |

##### Response parameters

Activated [Identity Provider](#identity-provider-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/idps/your-idps-id/lifecycle/activate"
```

##### Response example

```json
{
  "id": "0oa62bfdiumsUndnZ0h7",
  "type": "GOOGLE",
  "name": "Google",
  "status": "ACTIVE",
  "created": "2016-03-24T23:21:49.000Z",
  "lastUpdated": "2016-03-25T19:14:23.000Z",
  "protocol": {
    "type": "OIDC",
    "endpoints": {
      "authorization": {
        "url": "https://accounts.google.com/o/oauth2/auth",
        "binding": "HTTP-REDIRECT"
      },
      "token": {
        "url": "https://www.googleapis.com/oauth2/v3/token",
        "binding": "HTTP-POST"
      }
    },
    "scopes": [
      "profile",
      "email",
      "openid"
    ],
    "credentials": {
      "client": {
        "client_id": "your-client-id",
        "client_secret": "your-client-secret"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "AUTO",
      "profileMaster": true,
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
      "filter": null,
      "matchType": "USERNAME"
    },
    "maxClockSkew": 0
  },
  "_links": {
    "authorize": {
      "href": "https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oa62bfdiumsUndnZ0h7&
          client_id={clientId}&response_type={responseType}&response_mode={responseMode}&
          scope={scopes}&redirect_uri={redirectUri}&state={state}",
      "templated": true,
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "clientRedirectUri": {
      "href": "https://${yourOktaDomain}/oauth2/v1/authorize/callback",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Deactivate Identity Provider

<ApiOperation method="post" url="/api/v1/idps/${idpId}/lifecycle/deactivate" />

Deactivates an active IdP

##### Request parameters

| Parameter | Description               | Param Type | DataType | Required |
| --------- | ------------------------- | ---------- | -------- | -------- |
| idpId     | `id` of IdP to deactivate | URL        | String   | TRUE     |

##### Response parameters

Deactivated [Identity Provider](#identity-provider-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/idps/your-idps-id/lifecycle/deactivate"
```

##### Response example

```json
{
  "id": "0oa62bfdiumsUndnZ0h7",
  "type": "GOOGLE",
  "name": "Google",
  "status": "INACTIVE",
  "created": "2016-03-24T23:21:49.000Z",
  "lastUpdated": "2016-03-25T19:16:53.000Z",
  "protocol": {
    "type": "OIDC",
    "endpoints": {
      "authorization": {
        "url": "https://accounts.google.com/o/oauth2/auth",
        "binding": "HTTP-REDIRECT"
      },
      "token": {
        "url": "https://www.googleapis.com/oauth2/v3/token",
        "binding": "HTTP-POST"
      }
    },
    "scopes": [
      "profile",
      "email",
      "openid"
    ],
    "credentials": {
      "client": {
        "client_id": "your-client-id",
        "client_secret": "your-client-secret"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "AUTO",
      "profileMaster": true,
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
        "template": "idpuser.userPrincipalName"
      },
      "filter": null,
      "matchType": "USERNAME"
    },
    "maxClockSkew": 0
  },
  "_links": {
    "authorize": {
      "href": "https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oa62bfdiumsUndnZ0h7&
      client_id={clientId}&response_type={responseType}&response_mode={responseMode}&
      scope={scopes}&redirect_uri={redirectUri}&state={state}",
      "templated": true,
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "clientRedirectUri": {
      "href": "https://${yourOktaDomain}/oauth2/v1/authorize/callback",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

## Identity Provider Transaction operations

> **Note:** This is a <ApiLifecycle access="deprecated" /> feature.

Operations for Just-In-Time (JIT) provisioning or account linking with a `callout` action (webhook)

All Transaction operations require a Transaction ID that is obtained as part of the authentication call.

Use `callout` actions when you need to retrieve information from the profile of a user when you link or create them, or to perform other tasks that must be done before the link or create is completed.

Before you can use Transaction operations, set up the following:

1. Add or create an app in Okta with settings that support `callout`:

    * **Allowed grant types** must include one or more **Client acting on behalf of a user** options selected.

2. Configure a social IdP with settings that support `callout`:

    * Be sure to complete the setup instructions in the **View Setup Instructions** link.
    * Select appropriate scopes for the client that you configured in the previous step and for the IdP as described in the **View Setup Instructions**.
    * In the **Show Advanced Settings** link, be sure that you have either the **Account Link Policy** or the **Provisioning Policy** set to **Callout**.

After your IdP and app are set up, you can issue an authentication request and capture the Transaction ID to verify your setup. The following example shows a request for an ID token, which is typically a simple request:

```bash
  https://{myOktaDomain}.com/oauth2/v1/authorize?
  idp=0oae5emt1lCVpXD2b0h7&
  client_id=B6YnDUIpt6Oq354YYaNR&
  response_type=id_token&
  response_mode=fragment&
  scope=openid&
  redirect_uri=https://httpbin.org/get&state=state&nonce=nonce
```

The response contains a Transaction ID. You can then use the Transaction ID to exercise the endpoints in this section. Unfinished or uncanceled transactions end after about ten minutes.

If you aren't receiving a Transaction ID, check that:

* The user that you are adding with JIT or linking doesn't already exist in the app. If they do, deactivate and delete.
* You don't have any sessions open for the IdP or the Okta org for the app.

### Get Identity Provider Transaction

<ApiOperation method="get" url="/api/v1/idps/tx/${transactionId}" />

Fetches an IdP Transaction by `id`

You must use a `CALLOUT` action for [user provisioning](#user-provisioning-action-type) or [account linking](#account-link-action-type) to obtain an IdP Transaction `id`.

##### Request parameters

| Parameter     | Description                | Param Type | DataType | Required |
| ---------     | -------------------------- | ---------- | -------- | -------- |
| transactionId | `id` of an IdP Transaction | URL        | String   | TRUE     |

##### Response parameters

[Identity Provider Transaction](#identity-provider-transaction-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3"
```

##### Response example

```json
{
  "id": "satvklBYyJmwa6qOg0g3",
  "status": "ACCOUNT_JIT",
  "expiresAt": "2016-01-03T23:52:58.000Z",
  "created": "2016-01-03T23:44:38.000Z",
  "idp": {
    "id": "0oabmluDNh2JZi8lt0g4",
    "name": "Facebook",
    "type": "FACEBOOK"
  },
  "context": {
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko)
        Chrome/47.0.2526.106 Safari/537.36",
    "ipAddress": "127.0.0.1"
  },
  "_links": {
    "source": {
      "href": "https://${yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/source"
    },
    "target": {
      "href": "https://${yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/target"
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "provision": {
      "href": "https://${yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/lifecycle/provision",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Get source IdP User for IdP Transaction

<ApiOperation method="get" url="/api/v1/idps/tx/${transactionId}/source" />

Fetches the source [IdP User](#identity-provider-user-object) for a Transaction

##### Request parameters

| Parameter     | Description                | Param Type | DataType | Required |
| ---------     | -------------------------- | ---------- | -------- | -------- |
| transactionId | `id` of an IdP Transaction | URL        | String   | TRUE     |

##### Response parameters

[Identity Provider User](#identity-provider-user-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/source"
```

##### Response example

```json
{
  "externalId": "1437424479920471",
  "profile": {
    "middleName": null,
    "lastName": "Zuckersky",
    "email": "mark_drvbrjr_zuckersky@tfbnw.net",
    "displayName": "Mark Zuckersky",
    "firstName": "Mark",
    "profile": "https://www.facebook.com/app_scoped_user_id/1437424479920471/"
  },
  "_links": {
    "idp": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oabmluDNh2JZi8lt0g4"
    }
  }
}
```

### Get target User for IdP provision Transaction

<ApiOperation method="get" url="/api/v1/idps/tx/${transactionId}/target" />

Fetches the target transformed [Okta User Profile](/docs/reference/api/users/#profile-object) for a Just-In-Time (JIT) provisioning Transaction

##### Request parameters

| Parameter     | Description                | Param Type | DataType | Required |
| ---------     | -------------------------- | ---------- | -------- | -------- |
| transactionId | `id` of an IdP Transaction | URL        | String   | TRUE     |

##### Response parameters

[Trasformed Okta User Profile](/docs/reference/api/users/#profile-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/source"
```

##### Response example

```json
{
  "profile": {
    "middleName": null,
    "streetAddress": null,
    "lastName": "Zuckersky",
    "secondEmail": null,
    "postAddress": null,
    "state": null,
    "countryCode": null,
    "city": null,
    "profileUrl": "https://www.facebook.com/app_scoped_user_id/1437424479920471/",
    "primaryPhone": null,
    "mobilePhone": null,
    "email": "mark_drvbrjr_zuckersky@tfbnw.net",
    "zipCode": null,
    "login": "mark_drvbrjr_zuckersky@tfbnw.net",
    "displayName": "Mark Zuckersky",
    "firstName": "Mark",
    "typeId": null
  }
}
```

### List Users for IdP link Transaction

<ApiOperation method="get" url="/api/v1/idps/tx/${transactionId}/users" />

Enumerates the candidate [Okta Users](/docs/reference/api/users/#user-object) for an account link Transaction

Link candidates are determined by the IdP's [account link policy](#account-link-policy-object) and [subject policy](#subject-policy-object).

##### Request parameters


| Parameter     | Description                | Param Type | DataType | Required |
| ---------     | -------------------------- | ---------- | -------- | -------- |
| transactionId | `id` of an IdP Transaction | URL        | String   | TRUE     |

##### Response parameters

Array of [Okta User](/docs/reference/api/users/#user-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/users"
```

##### Response example

```json
[
  {
    "id": "00uc8wfZSNWKlFGZa0g4",
    "status": "ACTIVE",
    "created": "2016-01-03T23:55:34.000Z",
    "activated": "2016-01-03T23:55:38.000Z",
    "statusChanged": "2016-01-03T23:55:38.000Z",
    "lastLogin": null,
    "lastUpdated": "2016-01-03T23:55:38.000Z",
    "passwordChanged": null,
    "profile": {
      "login": "mark_drvbrjr_zuckersky@tfbnw.net",
      "mobilePhone": null,
      "email": "mark_drvbrjr_zuckersky@tfbnw.net",
      "secondEmail": null,
      "firstName": "Mark",
      "lastName": "Zuckersky",
      "profileUrl": "https://www.facebook.com/app_scoped_user_id/1437424479920471/",
      "displayName": "Mark Zuckersky"
    },
    "credentials": {
      "provider": {
        "type": "SOCIAL",
        "name": "SOCIAL"
      }
    },
    "_links": {
      "suspend": {
        "href": "https://${yourOktaDomain}/api/v1/users/00uc8wfZSNWKlFGZa0g4/lifecycle/suspend",
        "method": "POST"
      },
      "resetPassword": {
        "href": "https://${yourOktaDomain}/api/v1/users/00uc8wfZSNWKlFGZa0g4/lifecycle/reset_password",
        "method": "POST"
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/users/00uc8wfZSNWKlFGZa0g4"
      },
      "changeRecoveryQuestion": {
        "href": "https://${yourOktaDomain}/api/v1/users/00uc8wfZSNWKlFGZa0g4/credentials/change_recovery_question",
        "method": "POST"
      },
      "deactivate": {
        "href": "https://${yourOktaDomain}/api/v1/users/00uc8wfZSNWKlFGZa0g4/lifecycle/deactivate",
        "method": "POST"
      },
      "confirm": {
        "href": "https://${yourOktaDomain}/api/v1/idps/tx/satvkokI9JsOxqsjz0g3/lifecycle/confirm/00uc8wfZSNWKlFGZa0g4",
        "method": "POST"
      }
    }
  }
]
```

### Provision IdP User

<ApiOperation method="post" url="/api/v1/idps/tx/${transactionId}/lifecycle/provision" />

Provisions an IdP User as a new Okta User

##### Request parameters

| Parameter     | Description                                                          |Param Type  | DataType                          | Required | Default                 |
| ---------     | -------------------------------------------------------------------- | ---------- | --------------------------------- | -------- | ----------------------- |
| profile       | profile for the [Okta User](/docs/reference/api/users/#profile-object) | Body         | [Okta User Profile object](/docs/reference/api/users/#profile-object)  | FALSE    | UD transformed Okta user profile |
| transactionId | `id` of an IdP Transaction                                           | URL        | String                            | TRUE     |                         |

##### Response parameters

[Identity Provider Transaction](#identity-provider-transaction-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "userType": "Social"
  }
}' "https://${yourOktaDomain}/api/v1/idps/tx/satvkokI9JsOxqsjz0g3/lifecycle/provision"
```

##### Response example

```json
{
  "id": "satvkokI9JsOxqsjz0g3",
  "status": "SUCCESS",
  "sessionToken": "20111ItcRRtx_HOKguQRqx6YIeFL3L6cQhpqSCvLOD-fpj-3K53aqXN",
  "expiresAt": "2016-01-04T02:40:43.000Z",
  "created": "2016-01-04T02:32:23.000Z",
  "idp": {
    "id": "0oabmluDNh2JZi8lt0g4",
    "name": "Facebook",
    "type": "FACEBOOK"
  },
  "context": {
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko)
        Chrome/47.0.2526.106 Safari/537.36",
    "ipAddress": "127.0.0.1"
  },
  "_links": {
    "next": {
      "href": "https://${yourOktaDomain}/api/v1/idps/tx/satvkokI9JsOxqsjz0g3/finish",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/idps/tx/satvkokI9JsOxqsjz0g3/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Link IdP User

<ApiOperation method="post" url="/api/v1/idps/tx/${transactionId}/lifecycle/confirm/${userId}" />

Links an IdP User to an [existing Okta User](#list-users-for-idp-link-transaction)

##### Request parameters


| Parameter     | Description                                                                 | Param Type | DataType                                                             | Required |
| ---------     | --------------------------------------------------------------------------- | ---------- | -----------------------------------------------------                | -------- |
| profile       | profile for the [Okta User](/docs/reference/api/users/#profile-object)      | Body       | [Okta User Profile object](/docs/reference/api/users/#profile-object) | FALSE    |
| transactionId | `id` of an IdP Transaction                                                  | URL        | String                                                               | TRUE     |
| userId        | `id` of an Okta User [link candidate](#list-users-for-idp-link-transaction) | URL        | String                                                               | TRUE     |

##### Response parameters

[Identity Provider Transaction](#identity-provider-transaction-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "userType": "Social"
  }
}' "https://${yourOktaDomain}/api/v1/idps/tx/satvkokI9JsOxqsjz0g3/lifecycle/confirm/00uc8ydZUPiwS2Xud0g4"
```

##### Response example

```json
{
  "id": "satvkokI9JsOxqsjz0g3",
  "status": "SUCCESS",
  "sessionToken": "20111FLDl04JoQdl-NJOB9A6HosTSuHtQQUmCBhdEvnE4XEInod0Sg_",
  "expiresAt": "2016-01-04T02:53:13.000Z",
  "created": "2016-01-04T02:44:53.000Z",
  "idp": {
    "id": "0oabmluDNh2JZi8lt0g4",
    "name": "Facebook",
    "type": "FACEBOOK"
  },
  "context": {
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko)
        Chrome/47.0.2526.106 Safari/537.36",
    "ipAddress": "127.0.0.1"
  },
  "_links": {
    "next": {
      "href": "https://${yourOktaDomain}/api/v1/idps/tx/satvkokI9JsOxqsjz0g3/finish",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/idps/tx/satvkokI9JsOxqsjz0g3/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Finish Identity Provider Transaction

<ApiOperation method="POST" url=" /api/v1/idps/tx/${transactionId}/finish" />

Finishes an IdP Transaction

No actions are completed when using `callout` until the `/finish` request completes.

#### Request parameters

| Parameter      | Description                                                                | Datatype      | Required     |
| :------------- | :--------------                                                            | :------------ | :----------- |
| transactionId  | The Transaction ID referenced by all intermediate steps in the Transaction | String        | TRUE         |

#### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/idps/tx/sat4h4zexs17NrXWc0h6/finish"
```

#### Response example

```bash
HTTP/1.1 200 OK
```

### Cancel Identity Provider Transaction

<ApiOperation method="POST" url="/api/v1/idps/tx/${transactionId}/cancel" />

Cancels an IdP Transaction

No actions are completed when using `callout` if the Transaction is canceled.

#### Request parameters

| Parameter      | Description                                                                | Datatype      | Required     |
| :------------- | :--------------                                                            | :------------ | :----------- |
| transactionId  | The Transaction ID referenced by all intermediate steps in the Transaction | String        | TRUE         |

#### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/idps/tx/sat4jmxahzdtLDHOm0h6/cancel"
```

#### Response example

```bash
HTTP/1.1 200 OK
```

## Identity Provider key store operations

### Add X.509 Certificate public key

<ApiOperation method="post" url="/api/v1/idps/credentials/keys" />

Adds a new X.509 certificate credential to the IdP key store

> **Note:** RSA-based certificates are supported for all IdP types. Okta currently supports EC-based certificates only for the `X509` IdP type. For EC-based certificates we support only P-256, P-384, and P-521 curves.

##### Request parameters

| Parameter | Description                                              | Param Type | DataType        | Required |
| --------- | -------------------------------------------------------- | ---------- | --------------- | -------- |
| x5c       | Base64-encoded X.509 certificate chain with DER encoding | Body       | Array of String | TRUE     |

##### Response parameters


[Identity Provider Key Credential](#identity-provider-key-credential-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "x5c": [
    "MIIDnjCCAoagAwIBAgIGAVG3MN+PMA0GCSqGSIb3DQEBBQUAMIGPMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5p
     YTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxEDAOBgNVBAMM
     B2V4YW1wbGUxHDAaBgkqhkiG9w0BCQEWDWluZm9Ab2t0YS5jb20wHhcNMTUxMjE4MjIyMjMyWhcNMjUxMjE4MjIyMzMyWjCB
     jzELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTALBgNVBAoMBE9r
     dGExFDASBgNVBAsMC1NTT1Byb3ZpZGVyMRAwDgYDVQQDDAdleGFtcGxlMRwwGgYJKoZIhvcNAQkBFg1pbmZvQG9rdGEuY29t
     MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtcnyvuVCrsFEKCwHDenS3Ocjed8eWDv3zLtD2K/iZfE8BMj2wpTf
     n6Ry8zCYey3mWlKdxIybnV9amrujGRnE0ab6Q16v9D6RlFQLOG6dwqoRKuZy33Uyg8PGdEudZjGbWuKCqqXEp+UKALJHV+k4
     wWeVH8g5d1n3KyR2TVajVJpCrPhLFmq1Il4G/IUnPe4MvjXqB6CpKkog1+ThWsItPRJPAM+RweFHXq7KfChXsYE7Mmfuly8s
     DQlvBmQyxZnFHVuiPfCvGHJjpvHy11YlHdOjfgqHRvZbmo30+y0X/oY/yV4YEJ00LL6eJWU4wi7ViY3HP6/VCdRjHoRdr5L/
     DwIDAQABMA0GCSqGSIb3DQEBBQUAA4IBAQCzzhOFkvyYLNFj2WDcq1YqD4sBy1iCia9QpRH3rjQvMKDwQDYWbi6EdOX0TQ/I
     YR7UWGj+2pXd6v0t33lYtoKocp/4lUvT3tfBnWZ5KnObi+J2uY2teUqoYkASN7F+GRPVOuMVoVgm05ss8tuMb2dLc9vsx93s
     Dt+XlMTv/2qi5VPwaDtqduKkzwW9lUfn4xIMkTiVvCpe0X2HneD2Bpuao3/U8Rk0uiPfq6TooWaoW3kjsmErhEAs9bA7xuqo
     1KKY9CdHcFhkSsMhoeaZylZHtzbnoipUlQKSLMdJQiiYZQ0bYL83/Ta9fulr1EERICMFt3GUmtYaZZKHpWSfdJp9"
  ]
}' "https://${yourOktaDomain}/api/v1/idps/credentials/keys"
```

##### Response example

```JSON
HTTP/1.1 201 Created
Content-Type: application/json
Location: https://${yourOktaDomain}/api/v1/idps/credentials/keys/74bb2164-e0c8-4457-862b-7c29ba6cd2c9
{
  "kid": "your-key-id",
  "created": "2016-01-03T18:15:47.000Z",
  "lastUpdated": "2016-01-03T18:15:47.000Z",
  "e": "65537",
  "n": "101438407598598116085679865987760095721749307901605456708912786847324207000576780508113360584
        555007890315805735307890113536927352312915634368993759211767770602174860126854831344273970871
        509573365292777620005537635317282520456901584213746937262823585533063042033441296629204165064
        680610660631365266976782082747",
  "kty": "RSA",
  "use": "sig",
  "x5c": [
    "MIIDnjCCAoagAwIBAgIGAVG3MN+PMA0GCSqGSIb3DQEBBQUAMIGPMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pY
     TEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxEDAOBgNVBAMMB2
     V4YW1wbGUxHDAaBgkqhkiG9w0BCQEWDWluZm9Ab2t0YS5jb20wHhcNMTUxMjE4MjIyMjMyWhcNMjUxMjE4MjIyMzMyWjCBjzE
     LMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTALBgNVBAoMBE9rdGEx
     FDASBgNVBAsMC1NTT1Byb3ZpZGVyMRAwDgYDVQQDDAdleGFtcGxlMRwwGgYJKoZIhvcNAQkBFg1pbmZvQG9rdGEuY29tMIIBI
     jANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtcnyvuVCrsFEKCwHDenS3Ocjed8eWDv3zLtD2K/iZfE8BMj2wpTfn6Ry8z
     CYey3mWlKdxIybnV9amrujGRnE0ab6Q16v9D6RlFQLOG6dwqoRKuZy33Uyg8PGdEudZjGbWuKCqqXEp+UKALJHV+k4wWeVH8g
     5d1n3KyR2TVajVJpCrPhLFmq1Il4G/IUnPe4MvjXqB6CpKkog1+ThWsItPRJPAM+RweFHXq7KfChXsYE7Mmfuly8sDQlvBmQy
     xZnFHVuiPfCvGHJjpvHy11YlHdOjfgqHRvZbmo30+y0X/oY/yV4YEJ00LL6eJWU4wi7ViY3HP6/VCdRjHoRdr5L/DwIDAQABM
     A0GCSqGSIb3DQEBBQUAA4IBAQCzzhOFkvyYLNFj2WDcq1YqD4sBy1iCia9QpRH3rjQvMKDwQDYWbi6EdOX0TQ/IYR7UWGj+2p
     Xd6v0t33lYtoKocp/4lUvT3tfBnWZ5KnObi+J2uY2teUqoYkASN7F+GRPVOuMVoVgm05ss8tuMb2dLc9vsx93sDt+XlMTv/2q
     i5VPwaDtqduKkzwW9lUfn4xIMkTiVvCpe0X2HneD2Bpuao3/U8Rk0uiPfq6TooWaoW3kjsmErhEAs9bA7xuqo1KKY9CdHcFhk
     SsMhoeaZylZHtzbnoipUlQKSLMdJQiiYZQ0bYL83/Ta9fulr1EERICMFt3GUmtYaZZKHpWSfdJp9"
  ],
  "x5t#S256": "wzPVobIrveR1x-PCbjsFGNV-6zn7Rm9KuOWOG4Rk6jE"
}
```

### Get key

<ApiOperation method="get" url="/api/v1/idps/credentials/keys/${kid}" />

Gets a specific [IdP Key Credential](#identity-provider-key-credential-object) by `kid`

##### Request parameters

| Parameter     | Description                                                                 | Param Type | DataType | Required |
| ------------- | --------------------------------------------------------------------------- | ---------- | -------- | -------- |
| kid           | Unique key of the [IdP Key Credential](#identity-provider-key-credential-object) | URL        | String   | TRUE     |

##### Response parameters

[Identity Provider Key Credential](#identity-provider-key-credential-object)

##### Request example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/idps/credentials/keys/your-key-id"
```

##### Response example

```json
{
  "kid": "your-key-id",
  "created": "2016-01-03T18:15:47.000Z",
  "lastUpdated": "2016-01-03T18:15:47.000Z",
  "e": "65537",
  "n": "101438407598598116085679865987760095721749307901605456708912786847324207000576780508113360584
        555007890315805735307890113536927352312915634368993759211767770602174860126854831344273970871
        509573365292777620005537635317282520456901584213746937262823585533063042033441296629204165064
        680610660631365266976782082747",
  "kty": "RSA",
  "use": "sig",
  "x5c": [
    "MIIDnjCCAoagAwIBAgIGAVG3MN+PMA0GCSqGSIb3DQEBBQUAMIGPMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pY
     TEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxEDAOBgNVBAMMB2
     V4YW1wbGUxHDAaBgkqhkiG9w0BCQEWDWluZm9Ab2t0YS5jb20wHhcNMTUxMjE4MjIyMjMyWhcNMjUxMjE4MjIyMzMyWjCBjzE
     LMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTALBgNVBAoMBE9rdGEx
     FDASBgNVBAsMC1NTT1Byb3ZpZGVyMRAwDgYDVQQDDAdleGFtcGxlMRwwGgYJKoZIhvcNAQkBFg1pbmZvQG9rdGEuY29tMIIBI
     jANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtcnyvuVCrsFEKCwHDenS3Ocjed8eWDv3zLtD2K/iZfE8BMj2wpTfn6Ry8z
     CYey3mWlKdxIybnV9amrujGRnE0ab6Q16v9D6RlFQLOG6dwqoRKuZy33Uyg8PGdEudZjGbWuKCqqXEp+UKALJHV+k4wWeVH8g
     5d1n3KyR2TVajVJpCrPhLFmq1Il4G/IUnPe4MvjXqB6CpKkog1+ThWsItPRJPAM+RweFHXq7KfChXsYE7Mmfuly8sDQlvBmQy
     xZnFHVuiPfCvGHJjpvHy11YlHdOjfgqHRvZbmo30+y0X/oY/yV4YEJ00LL6eJWU4wi7ViY3HP6/VCdRjHoRdr5L/DwIDAQABM
     A0GCSqGSIb3DQEBBQUAA4IBAQCzzhOFkvyYLNFj2WDcq1YqD4sBy1iCia9QpRH3rjQvMKDwQDYWbi6EdOX0TQ/IYR7UWGj+2p
     Xd6v0t33lYtoKocp/4lUvT3tfBnWZ5KnObi+J2uY2teUqoYkASN7F+GRPVOuMVoVgm05ss8tuMb2dLc9vsx93sDt+XlMTv/2q
     i5VPwaDtqduKkzwW9lUfn4xIMkTiVvCpe0X2HneD2Bpuao3/U8Rk0uiPfq6TooWaoW3kjsmErhEAs9bA7xuqo1KKY9CdHcFhk
     SsMhoeaZylZHtzbnoipUlQKSLMdJQiiYZQ0bYL83/Ta9fulr1EERICMFt3GUmtYaZZKHpWSfdJp9"
  ],
  "x5t#S256": "wzPVobIrveR1x-PCbjsFGNV-6zn7Rm9KuOWOG4Rk6jE"
}
```

### List keys

<ApiOperation method="get" url="/api/v1/idps/credentials/keys" />

Enumerates IdP Key Credentials

##### Request parameters


| Parameter | Description                                               | Param Type | DataType | Required | Default |
| --------- | --------------------------------------------------------- | ---------- | -------- | -------- | ------- |
| limit     | Specifies the number of key results on a page             | Query      | Number   | FALSE    | 20      |
| after     | Specifies the pagination cursor for the next page of keys | Query      | String   | FALSE    |         |

##### Response parameters

Array of [Identity Provider Key Credential](#identity-provider-key-credential-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/idps/credentials/keys"
```

##### Response example

```json
[
  {
    "kid": "your-key-id",
    "created": "2016-01-03T18:15:47.000Z",
    "lastUpdated": "2016-01-03T18:15:47.000Z",
    "e": "65537",
    "n": "101438407598598116085679865987760095721749307901605456708912786847324207000576780508113360584
          555007890315805735307890113536927352312915634368993759211767770602174860126854831344273970871
          509573365292777620005537635317282520456901584213746937262823585533063042033441296629204165064
          680610660631365266976782082747",
    "kty": "RSA",
    "use": "sig",
    "x5c": [
      "MIIDnjCCAoagAwIBAgIGAVG3MN+PMA0GCSqGSIb3DQEBBQUAMIGPMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5p
       YTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxEDAOBgNVBAMM
       B2V4YW1wbGUxHDAaBgkqhkiG9w0BCQEWDWluZm9Ab2t0YS5jb20wHhcNMTUxMjE4MjIyMjMyWhcNMjUxMjE4MjIyMzMyWjCB
       jzELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTALBgNVBAoMBE9r
       dGExFDASBgNVBAsMC1NTT1Byb3ZpZGVyMRAwDgYDVQQDDAdleGFtcGxlMRwwGgYJKoZIhvcNAQkBFg1pbmZvQG9rdGEuY29t
       MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtcnyvuVCrsFEKCwHDenS3Ocjed8eWDv3zLtD2K/iZfE8BMj2wpTf
       n6Ry8zCYey3mWlKdxIybnV9amrujGRnE0ab6Q16v9D6RlFQLOG6dwqoRKuZy33Uyg8PGdEudZjGbWuKCqqXEp+UKALJHV+k4
       wWeVH8g5d1n3KyR2TVajVJpCrPhLFmq1Il4G/IUnPe4MvjXqB6CpKkog1+ThWsItPRJPAM+RweFHXq7KfChXsYE7Mmfuly8s
       DQlvBmQyxZnFHVuiPfCvGHJjpvHy11YlHdOjfgqHRvZbmo30+y0X/oY/yV4YEJ00LL6eJWU4wi7ViY3HP6/VCdRjHoRdr5L/
       DwIDAQABMA0GCSqGSIb3DQEBBQUAA4IBAQCzzhOFkvyYLNFj2WDcq1YqD4sBy1iCia9QpRH3rjQvMKDwQDYWbi6EdOX0TQ/I
       YR7UWGj+2pXd6v0t33lYtoKocp/4lUvT3tfBnWZ5KnObi+J2uY2teUqoYkASN7F+GRPVOuMVoVgm05ss8tuMb2dLc9vsx93s
       Dt+XlMTv/2qi5VPwaDtqduKkzwW9lUfn4xIMkTiVvCpe0X2HneD2Bpuao3/U8Rk0uiPfq6TooWaoW3kjsmErhEAs9bA7xuqo
       1KKY9CdHcFhkSsMhoeaZylZHtzbnoipUlQKSLMdJQiiYZQ0bYL83/Ta9fulr1EERICMFt3GUmtYaZZKHpWSfdJp9"
    ],
    "x5t#S256": "wzPVobIrveR1x-PCbjsFGNV-6zn7Rm9KuOWOG4Rk6jE"
  },
  {
    "kty": "EC",
    "created": "2020-04-24T20:51:20.000Z",
    "lastUpdated": "2020-04-24T20:51:20.000Z",
    "expiresAt": "2040-03-01T20:22:29.000Z",
    "alg": "EC",
    "x5c": [
        "MIICqDCCAgqgAwIBAgIJAOkmCa/S8dHiMAoGCCqGSM49BAMCMG0xCzAJBgNVBAYTAlVTMRMwEQYDVQQIDApDYWxpZm9ybmlhMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMRAwDgYDVQQKDAdKYW5reUNvMR8wHQYDVQQDDBZUZXN0IElkZW50aXR5IFByb3ZpZGVyMB4XDTIwMDMwNjIwMjIyOVoXDTQwMDMwMTIwMjIyOVowbTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xEDAOBgNVBAoMB0phbmt5Q28xHzAdBgNVBAMMFlRlc3QgSWRlbnRpdHkgUHJvdmlkZXIwgZswEAYHKoZIzj0CAQYFK4EEACMDgYYABABW/lGHl17mKDtCD4D7gcMYYOWgyWTGno8MTefDOABA8PddessTsbfrguF49Gli6lCzrZaAKhhvgINc3R6t/dYleAE3lY6LAocOoLe9xDkeggXNcSuP5fDc1x5R9GHTXl44vLoJOLSLsMbOXVMXIXoqbPDzTSYUy24aFdv4W4LZxW6ak6NQME4wHQYDVR0OBBYEFChTXNWvs4z1qjRVemPDD/hqlDQ4MB8GA1UdIwQYMBaAFChTXNWvs4z1qjRVemPDD/hqlDQ4MAwGA1UdEwQFMAMBAf8wCgYIKoZIzj0EAwIDgYsAMIGHAkIBuDhHMNLbBIsorbKtjxJzHJ2ItCSD2wAwqYv/6JBtA2ulKN5gRTSqdNCnqFsZ1/nYY7FFVXHEuQ2N3pPq7Ri8h84CQSgCq1UQyd0lFtb7+57JbiGb6LVaRqRm7vwx8zLRA+tVjIM1DlQ2Gbxkj3nlkzmM93j9wchiqGdQidyKnF6EBnfd"
    ],
    "x": "Vv5Rh5de5ig7Qg-A-4HDGGDloMlkxp6PDE3nwzgAQPD3XXrLE7G364LhePRpYupQs62WgCoYb4CDXN0erf3WJXg",
    "y": "ATeVjosChw6gt73EOR6CBc1xK4_l8NzXHlH0YdNeXji8ugk4tIuwxs5dUxcheips8PNNJhTLbhoV2_hbgtnFbpqT",
    "crv": "P-521",
    "kid": "your-kid",
    "use": "sig",
    "x5t#S256": "TUx-AIwypm2pZURHNqafk7ZDxqQP_ypzIyUwDDnPOlw"
  }
]
```

### Delete key

<ApiOperation method="delete" url="/api/v1/idps/credentials/keys/${kid}" />

Deletes a specific [IdP Key Credential](#identity-provider-key-credential-object) by `kid` if it isn't currently being used by an active or inactive IdP

##### Request parameters

| Parameter | Description                                                                 | Param Type | DataType | Required |
| --------- | --------------------------------------------------------------------------- | ---------- | -------- | -------- |
| kid       | Unique key of the [IdP Key Credential](#identity-provider-key-credential-object) | URL        | String   | TRUE     |

##### Response parameters

There are no response parameters.

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/idps/credentials/keys/74bb2164-e0c8-4457-862b-7c29ba6cd2c9"
```

##### Response example

```http
HTTP/1.1 204 No Content
```

## Identity Provider signing key store operations

> **Note:** EA feature constraint: Okta currently uses the same key for both request signing and decrypting SAML assertions that have been encrypted by the IdP. Changing your signing key also changes your decryption key.

### Generate new IdP signing Key Credential

<ApiOperation method="post" url="/api/v1/idps/${idpId}/credentials/keys/generate" />

Generates a new X.509 certificate for an IdP signing Key Credential to be used for signing assertions sent to the IdP

> **Note:** To update an IdP with the newly generated Key Credential, [update your IdP](#update-identity-provider) using the returned key's `kid` in the [signing credential](#saml-2-0-signing-credentials-object).

##### Request parameters

| Parameter     | Description                                                                 | Param Type | DataType                                      | Required |
| ------------- | --------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- |
| idpId         | `id` of the IdP                                                             | URL        | String                                        | TRUE     |
| validityYears | expiry of the [IdP Key Credential](#identity-provider-key-credential-object) | Query      | Number                                        | TRUE     |

##### Response parameters

Returns the generated [IdP Key Credential](#identity-provider-key-credential-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/keys/generate?validityYears=2"
```

##### Response example

```JSON
HTTP/1.1 201 Created
Content-Type: application/json
Location: https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/keys/akm5hvbbevE341ovl0h7
{
  "created": "2015-12-10T18:56:23.000Z",
  "expiresAt": "2017-12-10T18:56:22.000Z",
  "x5c": [
    "MIIDqDCCApCgAwIBAgIGAVGNQFX5MA0GCSqGSIb3DQEBBQUAMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGJhbGFjb21wdGVzdDEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTAeFw0xNTEyMTAxODU1MjJaFw0xNzEyMTAxODU2MjJaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGJhbGFjb21wdGVzdDEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJJjrcnI6cXBiXNq9YDgfYrQe2O5qEHG4MXP8Ue0sMeefFkFEHYHnHUeZCq6WTAGqR+1LFgOl+Eq9We5V+qNlGIfkFkQ3iHGBrIALKqLCd0Et76HicDiegz7j9DtN+lo0hG/gfcw5783L5g5xeQ7zVmCQMkFwoUA0uA3bsfUSrmfORHJL+EMNQT8XIXD8NkG4g6u7ylHVRTLgXbe+W/p04m3EP6l41xl+MhIpBaPxDsyUvcKCNwkZN3aZIin1O9Y4YJuDHxrM64/VtLLp0sC05iawAmfsLunF7rdJAkWUpPn+xkviyNQ3UpvwAYuDr+jKLUdh2reRnm1PezxMIXzBVMCAwEAATANBgkqhkiG9w0BAQUFAAOCAQEARnFIjyitrCGbleFr3KeAwdOyeHiRmgeKupX5ZopgXtcseJoToUIinX5DVw2fVZPahqs0Q7/a0wcVnTRpw6946qZCwKd/PvZ1feVuVEA5Ui3+XvHuSH5xLp7NvYG1snNEvlbN3+NDUMlWj2NEbihowUBt9+UxTpQO3+N08q3aZk3hOZ+tHt+1Te7KEEL/4CM28GZ9MY7fSrS7MAgp1+ZXtn+kRlMrXnQ49qBda37brwDRqmSY9PwNMbev3r+9ZHwxr9W5wXW4Ev4C4xngA7RkVoyDbItSUho0I0M0u/LHuppclnXrw97xyO5Z883eIBvPVjfRcxsJxXJ8jx70ATDskw=="
  ],
  "kid": "akm5hvbbevE341ovl0h7",
  "kty": "RSA",
  "use": "sig",
  "x5t#S256": "5GOpy9CQVtfvBmu2T8BHvpKE4OGtC3BuS046t7p9pps"
}
```

> **Note:** If `validityYears` is out of range (2 - 10 years), you receive an error response.

```JSON
HTTP/1.1 400 Bad Request
Content-Type: application/json
{
  "errorCode": "E0000001",
  "errorSummary": "Api validation failed: generateKey",
  "errorLink": "E0000001",
  "errorId": "oaeMHrsk2WLTACvPU5T7yQ4yw",
  "errorCauses": [
    {
      "errorSummary": "Validity years out of range. It should be 2 - 10 years"
    }
  ]
}
```

### List signing Key Credentials for IdP

<ApiOperation method="get" url="/api/v1/idps/${idpId}/credentials/keys" />

Enumerates signing Key Credentials for an IdP

##### Request parameters

| Parameter     | Description        | Param Type | DataType                                      | Required |
| ------------- | ------------------ | ---------- | --------------------------------------------- | -------- |
| idpId         | `id` of the IdP    | URL        | String                                        | TRUE     |

##### Response parameters

Array of the [IdP Key Credential](#identity-provider-key-credential-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/keys"
```

##### Response example

```json
[
  {
    "created": "2015-12-10T18:56:23.000Z",
    "expiresAt": "2017-12-10T18:56:22.000Z",
    "x5c": [
      "MIIDqDCCApCgAwIBAgIGAVGNQFX5MA0GCSqGSIb3DQEBBQUAMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGJhbGFjb21wdGVzdDEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTAeFw0xNTEyMTAxODU1MjJaFw0xNzEyMTAxODU2MjJaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGJhbGFjb21wdGVzdDEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJJjrcnI6cXBiXNq9YDgfYrQe2O5qEHG4MXP8Ue0sMeefFkFEHYHnHUeZCq6WTAGqR+1LFgOl+Eq9We5V+qNlGIfkFkQ3iHGBrIALKqLCd0Et76HicDiegz7j9DtN+lo0hG/gfcw5783L5g5xeQ7zVmCQMkFwoUA0uA3bsfUSrmfORHJL+EMNQT8XIXD8NkG4g6u7ylHVRTLgXbe+W/p04m3EP6l41xl+MhIpBaPxDsyUvcKCNwkZN3aZIin1O9Y4YJuDHxrM64/VtLLp0sC05iawAmfsLunF7rdJAkWUpPn+xkviyNQ3UpvwAYuDr+jKLUdh2reRnm1PezxMIXzBVMCAwEAATANBgkqhkiG9w0BAQUFAAOCAQEARnFIjyitrCGbleFr3KeAwdOyeHiRmgeKupX5ZopgXtcseJoToUIinX5DVw2fVZPahqs0Q7/a0wcVnTRpw6946qZCwKd/PvZ1feVuVEA5Ui3+XvHuSH5xLp7NvYG1snNEvlbN3+NDUMlWj2NEbihowUBt9+UxTpQO3+N08q3aZk3hOZ+tHt+1Te7KEEL/4CM28GZ9MY7fSrS7MAgp1+ZXtn+kRlMrXnQ49qBda37brwDRqmSY9PwNMbev3r+9ZHwxr9W5wXW4Ev4C4xngA7RkVoyDbItSUho0I0M0u/LHuppclnXrw97xyO5Z883eIBvPVjfRcxsJxXJ8jx70ATDskw=="
    ],
    "kid": "akm5hvbbevE341ovl0h7",
    "kty": "RSA",
    "use": "sig",
    "x5t#S256": "5GOpy9CQVtfvBmu2T8BHvpKE4OGtC3BuS046t7p9pps"
  },
  {
    "created": "2015-12-10T18:55:35.000Z",
    "expiresAt": "2045-01-23T02:15:23.000Z",
    "x5c": [
      "MIIDqDCCApCgAwIBAgIGAUsUkouzMA0GCSqGSIb3DQEBBQUAMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGJhbGFjb21wdGVzdDEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTAeFw0xNTAxMjMwMjE0MjNaFw00NTAxMjMwMjE1MjNaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGJhbGFjb21wdGVzdDEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKhmkmKsu3FYeBiJg44aN6Ah3g9gof1cytXJVMnblDUWpLfe/FMUQCssh8Y8NCYRri5jni4efBgk6B3SkC7ymqsOXILIEHSwUYWnAaqDOTxO101mHzryowu1+0PldRNoyTthahpprvAPYlTin9zrDTqFT+WY/zwoaN8H+CfixlW1nM85qF18zYYekkW50MSoHPcfJKe2ywIhPXTYTSBEPcHh8dQEjBrZn7A4qOoDnfOXll8OL7j2O6EVyTtHA0tLJHVLpwI4gSPsXFwEnHltjN57odwYe9yds0BbM/YG9i+am1+3cmZ6Uyd16mLGclrr05o9BHcEZ4ZctV2hr6whbRsCAwEAATANBgkqhkiG9w0BAQUFAAOCAQEAnNlF27gRmhGTQ+GRAvbvYToFRgsIbBAPvRqB2LmEIiQ6UJd602w6uP1sv/zEzBYg4SnMLuVyWgOJ6d71dCvXdIO9mgAq6BaEPjlo0WhGyt+zGrpkMnIX5EwRa64kHydcPRHNA607wVYA96sJdyNJEMzBvjY9fJnfevzzDCN3NWpMS2T6rk6HP5IziI1VuFWY2OUC1kbCqLj1dUgp8koe3ftLL55ZpkAocnVMnrzBveNjgAOAiKTMcyS0bhESph9aVWvuHVZSfTnUjnTPb/4jA2YlB3ED+qaU3aqHwft1KXwZskNXBKXy7lyC+CMoeB3/ncFhSg/UllBooPPS3wYlNA=="
    ],
    "kid": "akm5hvbn1vojA9Fsa0h7",
    "kty": "RSA",
    "use": "sig",
    "x5t#S256": "7CCyXWwKzH4P6PoBP91B1S_iIZVzuGffVnUXu-BTYQQ"
  }
]
```

### Get signing Key Credential for IdP

<ApiOperation method="get" url="/api/v1/idps/${idpId}/credentials/keys/${kid}" />

Gets a specific [IdP Key Credential](#identity-provider-key-credential-object) by `kid`

##### Request parameters

| Parameter     | Description                                                                     | Param Type | DataType                                      | Required |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- |
| idpId         | `id` of the IdP                                                                 | URL        | String                                        | TRUE     |
| kid           | unique key of the [IdP Key Credential](#identity-provider-key-credential-object)     | URL        | String                                        | TRUE     |

##### Response parameters

[IdP Key Credential](#identity-provider-key-credential-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/keys/akm5hvbbevE341ovl0h7"
```

##### Response example

```json
{
  "created": "2015-12-10T18:56:23.000Z",
  "expiresAt": "2017-12-10T18:56:22.000Z",
  "x5c": [
    "MIIDqDCCApCgAwIBAgIGAVGNQFX5MA0GCSqGSIb3DQEBBQUAMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGJhbGFjb21wdGVzdDEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTAeFw0xNTEyMTAxODU1MjJaFw0xNzEyMTAxODU2MjJaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGJhbGFjb21wdGVzdDEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJJjrcnI6cXBiXNq9YDgfYrQe2O5qEHG4MXP8Ue0sMeefFkFEHYHnHUeZCq6WTAGqR+1LFgOl+Eq9We5V+qNlGIfkFkQ3iHGBrIALKqLCd0Et76HicDiegz7j9DtN+lo0hG/gfcw5783L5g5xeQ7zVmCQMkFwoUA0uA3bsfUSrmfORHJL+EMNQT8XIXD8NkG4g6u7ylHVRTLgXbe+W/p04m3EP6l41xl+MhIpBaPxDsyUvcKCNwkZN3aZIin1O9Y4YJuDHxrM64/VtLLp0sC05iawAmfsLunF7rdJAkWUpPn+xkviyNQ3UpvwAYuDr+jKLUdh2reRnm1PezxMIXzBVMCAwEAATANBgkqhkiG9w0BAQUFAAOCAQEARnFIjyitrCGbleFr3KeAwdOyeHiRmgeKupX5ZopgXtcseJoToUIinX5DVw2fVZPahqs0Q7/a0wcVnTRpw6946qZCwKd/PvZ1feVuVEA5Ui3+XvHuSH5xLp7NvYG1snNEvlbN3+NDUMlWj2NEbihowUBt9+UxTpQO3+N08q3aZk3hOZ+tHt+1Te7KEEL/4CM28GZ9MY7fSrS7MAgp1+ZXtn+kRlMrXnQ49qBda37brwDRqmSY9PwNMbev3r+9ZHwxr9W5wXW4Ev4C4xngA7RkVoyDbItSUho0I0M0u/LHuppclnXrw97xyO5Z883eIBvPVjfRcxsJxXJ8jx70ATDskw=="
  ],
  "kid": "akm5hvbbevE341ovl0h7",
  "kty": "RSA",
  "use": "sig",
  "x5t#S256": "5GOpy9CQVtfvBmu2T8BHvpKE4OGtC3BuS046t7p9pps"
}
```

### Clone signing Key Credential for IdP

<ApiOperation method="post" url="/api/v1/idps/${idpId}/credentials/keys/${kid}/clone?targetIdpId=${targetIdpId}" />

Clones an X.509 certificate for an IdP signing Key Credential from a source IdP to target IdP

> **Caution:** Sharing certificates isn't a recommended security practice.

##### Request parameters


| Parameter     | Description                                                                     | Param Type | DataType                                      | Required |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- |
| idpId         | `id` of the source IdP                                                          | URL        | String                                        | TRUE     |
| kid           | Unique key of [IdP Key Credential](#identity-provider-key-credential-object)     | URL        | String                                        | TRUE     |
| targetIdPId   | `id` of the target IdP                                                          | Query      | String                                        | TRUE     |

##### Response parameters

Returns the cloned [IdP Key Credential](#identity-provider-key-credential-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/keys/SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4/clone?targetIdpId=0oal21k0DVN7DhS3R0g3"
```

##### Response example

```JSON
HTTP/1.1 201 Created
Content-Type: application/json
Location: https://${yourOktaDomain}/api/v1/idps/0oal21k0DVN7DhS3R0g3/credentials/keys/SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4
{
  "created": "2015-12-10T18:56:23.000Z",
  "expiresAt": "2017-12-10T18:56:22.000Z",
  "x5c": [
    "MIIDqDCCApCgAwIBAgIGAVGNQFX5MA0GCSqGSIb3DQEBBQUAMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGJhbGFjb21wdGVzdDEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTAeFw0xNTEyMTAxODU1MjJaFw0xNzEyMTAxODU2MjJaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGJhbGFjb21wdGVzdDEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJJjrcnI6cXBiXNq9YDgfYrQe2O5qEHG4MXP8Ue0sMeefFkFEHYHnHUeZCq6WTAGqR+1LFgOl+Eq9We5V+qNlGIfkFkQ3iHGBrIALKqLCd0Et76HicDiegz7j9DtN+lo0hG/gfcw5783L5g5xeQ7zVmCQMkFwoUA0uA3bsfUSrmfORHJL+EMNQT8XIXD8NkG4g6u7ylHVRTLgXbe+W/p04m3EP6l41xl+MhIpBaPxDsyUvcKCNwkZN3aZIin1O9Y4YJuDHxrM64/VtLLp0sC05iawAmfsLunF7rdJAkWUpPn+xkviyNQ3UpvwAYuDr+jKLUdh2reRnm1PezxMIXzBVMCAwEAATANBgkqhkiG9w0BAQUFAAOCAQEARnFIjyitrCGbleFr3KeAwdOyeHiRmgeKupX5ZopgXtcseJoToUIinX5DVw2fVZPahqs0Q7/a0wcVnTRpw6946qZCwKd/PvZ1feVuVEA5Ui3+XvHuSH5xLp7NvYG1snNEvlbN3+NDUMlWj2NEbihowUBt9+UxTpQO3+N08q3aZk3hOZ+tHt+1Te7KEEL/4CM28GZ9MY7fSrS7MAgp1+ZXtn+kRlMrXnQ49qBda37brwDRqmSY9PwNMbev3r+9ZHwxr9W5wXW4Ev4C4xngA7RkVoyDbItSUho0I0M0u/LHuppclnXrw97xyO5Z883eIBvPVjfRcxsJxXJ8jx70ATDskw=="
  ],
  "kid": "SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4",
  "kty": "RSA",
  "use": "sig",
  "x5t#S256": "5GOpy9CQVtfvBmu2T8BHvpKE4OGtC3BuS046t7p9pps"
}
```

> **Note:** If the key is already present in the list of Key Credentials for the target IdP, you receive a 400 error response.

```JSON
HTTP/1.1 400 Bad Request
Content-Type: application/json
{
  "errorCode": "E0000001",
  "errorSummary": "Api validation failed: cloneKey",
  "errorLink": "E0000001",
  "errorId": "oaeQACJOHl1TKSGj8jA3hEpAg",
  "errorCauses": [
    {
      "errorSummary": "Key already exists in the list of key credentials for the target app."
    }
  ]
}
```

### Generate signing CSR for IdP

<ApiOperation method="post" url="/api/v1/idps/${idpId}/credentials/csrs" />

Generates a new key pair and returns a Certificate Signing Request for it.

> **Note:** The private key isn't listed in the [Signing Key Credentials for IdP](#list-signing-key-credentials-for-idp) until it is published.

##### Request parameters

| Parameter     | Description                                               | Param Type | DataType                                                           | Required |
| ------------- | --------------------------------------------------------- | ---------- | ------------------------------------------------------------------ | -------- |
| idpId         | `id` of the IdP                                           | URL        | String                                                             | TRUE     |
| metadata      | Metadata for the CSR                                      | Body       | [CSR Metadata](/docs/reference/api/apps/#csr-metadata-object)      | TRUE     |

##### Response parameters

Return the CSR in PKCS#10 format if the ``Accept`` media type is [application/pkcs10](https://tools.ietf.org/html/rfc5967) or a [CSR object](#identity-provider-csr-object) if the ``Accept`` media type is ``application/json``.

##### Request example

Generate a new key pair and return the CSR in PKCS#10 format:

```bash
curl -v -X POST \
-H "Accept: application/pkcs10" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "subject": {
    "countryName": "US",
    "stateOrProvinceName": "California",
    "localityName": "San Francisco",
    "organizationName": "Okta, Inc.",
    "organizationalUnitName": "Dev",
    "commonName": "SP Issuer"
  },
  "subjectAltNames": {
    "dnsNames": ["dev.okta.com"]
  }
}' "https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/"
```

Generate a new key pair and return the CSR in JSON:

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "subject": {
    "countryName": "US",
    "stateOrProvinceName": "California",
    "localityName": "San Francisco",
    "organizationName": "Okta, Inc.",
    "organizationalUnitName": "Dev",
    "commonName": "SP Issuer"
  },
  "subjectAltNames": {
    "dnsNames": ["dev.okta.com"]
  }
}' "https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/"
```

##### Response example

Return the CSR in DER format:

```http
HTTP/1.1 201 Created
Location: https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50
Content-Type: application/pkcs10; filename=okta.p10
Content-Transfer-Encoding: base64

MIIC4DCCAcgCAQAwcTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xEzARBgNVBAoMCk9rdGEsIEluYy4xDDAKBgNVBAsMA0RldjESMBAGA1UEAwwJU1AgSXNzdWVyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6m8jHVCr9/tKvvbFN59T4raoCs/78KRm4fSefHQOv1TKLXo4wTLbsqYWRWc5u0sd5orUMQgPQOyj3i6qh13mALY4BzrT057EG1BUNjGg29QgYlnOk2iX890e5BIDMQQEIKFrvOi2V8cLUkLvE2ydRn0VO1Q1frbUkYeStJYC5Api2JQsYRwa+1ZeDH1ITnIzUaugWhW2WB2lSnwZkenne5KtffxMPYVu+IhNRHoKaRA6Z51YNhMJIx17JM2hs/H4Ka3drk6kzDf7ofk/yBpb9yBWyU7CTSQhdoHidxqFprMDaT66W928t3AeOENHBuwn8c2K9WeGG+bELNyQRJVmawIDAQABoCowKAYJKoZIhvcNAQkOMRswGTAXBgNVHREEEDAOggxkZXYub2t0YS5jb20wDQYJKoZIhvcNAQELBQADggEBAA2hsVJRVM+A83X9MekjTnIbt19UNT8wX7wlE9jUKirWsxceLiZBpVGn9qfKhhVIpvdaIRSeoFYS2Kg/m1G6bCvjmZLcrQ5FcEBjZH2NKfNppGVnfC2ugtUkBtCB+UUzOhKhRKJtGugenKbP33zRWWIqnd2waF6Cy8TIuqQVPbwEDN9bCbAs7ND6CFYNguY7KYjWzQOeAR716eqpEEXuPYAS4nx/ty4ylonR8cv+gpq51rvq80A4k/36aoeM0Y6I4w64vhTfuvWW2UYFUD+/+y2FA2CSP4JfctySrf1s525v6fzTFZ3qZbB5OZQtP2b8xYWktMzywsxGKDoVDB4wkH4=
```

Return a [CSR object](#identity-provider-csr-object):

```JSON
HTTP/1.1 201 Created
Location: https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50
Content-Type: application/json
{
  "id": "h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
  "created": "2017-03-28T01:11:10.000Z",
  "csr": "MIIC4DCCAcgCAQAwcTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xEzARBgNVBAoMCk9rdGEsIEluYy4xDDAKBgNVBAsMA0RldjESMBAGA1UEAwwJU1AgSXNzdWVyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6m8jHVCr9/tKvvbFN59T4raoCs/78KRm4fSefHQOv1TKLXo4wTLbsqYWRWc5u0sd5orUMQgPQOyj3i6qh13mALY4BzrT057EG1BUNjGg29QgYlnOk2iX890e5BIDMQQEIKFrvOi2V8cLUkLvE2ydRn0VO1Q1frbUkYeStJYC5Api2JQsYRwa+1ZeDH1ITnIzUaugWhW2WB2lSnwZkenne5KtffxMPYVu+IhNRHoKaRA6Z51YNhMJIx17JM2hs/H4Ka3drk6kzDf7ofk/yBpb9yBWyU7CTSQhdoHidxqFprMDaT66W928t3AeOENHBuwn8c2K9WeGG+bELNyQRJVmawIDAQABoCowKAYJKoZIhvcNAQkOMRswGTAXBgNVHREEEDAOggxkZXYub2t0YS5jb20wDQYJKoZIhvcNAQELBQADggEBAA2hsVJRVM+A83X9MekjTnIbt19UNT8wX7wlE9jUKirWsxceLiZBpVGn9qfKhhVIpvdaIRSeoFYS2Kg/m1G6bCvjmZLcrQ5FcEBjZH2NKfNppGVnfC2ugtUkBtCB+UUzOhKhRKJtGugenKbP33zRWWIqnd2waF6Cy8TIuqQVPbwEDN9bCbAs7ND6CFYNguY7KYjWzQOeAR716eqpEEXuPYAS4nx/ty4ylonR8cv+gpq51rvq80A4k/36aoeM0Y6I4w64vhTfuvWW2UYFUD+/+y2FA2CSP4JfctySrf1s525v6fzTFZ3qZbB5OZQtP2b8xYWktMzywsxGKDoVDB4wkH4=",
  "kty": "RSA",
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "publish": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Publish signing CSR for IdP

<ApiOperation method="post" url="/api/v1/idps/${idpId}/credentials/csrs/${csrModelId}/lifecycle/publish" />

Updates the CSR with a signed X.509 certificate and adds it into the signing Key Credentials for the IdP.

> **Note:** Publishing a certificate completes the lifecycle of the CSR, and it is no longer accessible.

##### Request parameters

| Parameter     | Description                                                                     | Param Type | DataType                                                 | Required |
| ------------- | ------------------------------------------------------------------------------- | ---------- | ---------------------------------------------            | -------- |
| certificate   | The signed X.509 certificate                                                    | Body       | X.509 certififcate in ``DER``, ``PEM`` or ``CER`` format | TRUE     |
| csrModelId    | `id` of the [CSR object](#identity-provider-csr-object)                               | URL        | String                                                   | TRUE     |
| idpId         | `id` of the IdP                                                                 | URL        | String                                                   | TRUE     |

For ``DER`` and ``CER`` formatted certificates, the client can either post in binary or base64 encoded. If the post is base64 encoded, set the ``Content-Transfer-Encoding`` header to ``base64``.

##### Response parameters

Returns the new [signing Key Credential](#identity-provider-key-credential-object).

##### Request example

Publish with X.509 certificate in base64-encoded ``DER``:

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/pkix-cert" \
-H "Authorization: SSWS ${api_token}" \
-H "Content-Transfer-Encoding: base64" \
-d "MIIFgjCCA2qgAwIBAgICEAcwDQYJKoZIhvcNAQELBQAwXjELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMQ0wCwYDVQQKDARPa3RhMQwwCgYDVQQLDANFbmcxDTALBgNVBAMMBFJvb3QwHhcNMTcwMzI3MjEyMDQ3WhcNMTgwNDA2MjEyMDQ3WjB4MQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzETMBEGA1UECgwKT2t0YSwgSW5jLjEQMA4GA1UECwwHSmFua3lDbzEVMBMGA1UEAwwMSWRQIElzc3VlciA3MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmkC6yAJVvFwUlmM9gKjb2d+YK5qHFt+mXSsbjWKKs4EfNm+BoQeeovBZtSACyaqLc8IYFTPEURFcbDQ9DkAL04uUIRD2gaHYY7uK0jsluEaXGq2RAIsmzAwNTzkiDw4q9pDL/q7n0f/SDt1TsMaMQayB6bU5jWsmqcWJ8MCRJ1aJMjZ16un5UVx51IIeCbe4QRDxEXGAvYNczsBoZxspDt28esSpq5W0dBFxcyGVudyl54Er3FzAguhgfMVjH+bUec9j2Tl40qDTktrYgYfxz9pfjm01Hl4WYP1YQxeETpSL7cQ5Ihz4jGDtHUEOcZ4GfJrPzrGpUrak8Qp5xcwCqQIDAQABo4IBLjCCASowCQYDVR0TBAIwADARBglghkgBhvhCAQEEBAMCBkAwMwYJYIZIAYb4QgENBCYWJE9wZW5TU0wgR2VuZXJhdGVkIFNlcnZlciBDZXJ0aWZpY2F0ZTAdBgNVHQ4EFgQUVqJukDmyENw/2pTApbxc/HRKbngwgZAGA1UdIwSBiDCBhYAUFx245ZZXqWTTbARfMlFWN77L9EahYqRgMF4xCzAJBgNVBAYTAlVTMQswCQYDVQQIDAJDQTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEMMAoGA1UECwwDRW5nMQ0wCwYDVQQDDARSb290ggkAlIfpwZjO5o8wDgYDVR0PAQH/BAQDAgWgMBMGA1UdJQQMMAoGCCsGAQUFBwMBMA0GCSqGSIb3DQEBCwUAA4ICAQCcoBSRtY+9cJY00hLvq6AloYZcdn/kUQupfmyz4n3lKE3wV2FB0swKnK0QDi8iNuQJFdag/19vDHC4/LhoSuv1Q+KXM61pPZVRXXPyC1+e7Y6hj93tEI5HcqLPcDRH1AIG2l8tE7LBn+MQB5Vh6oxjG2IdoWxg6abMfISU+MauPWql4vMDUWo9iNShAo44Z5fd+nuz+hlAinU9Xn9Jf2QsfKvcbMRq7iuqgkabgdmObmWb9KK0Vm7TDkxCH0pB0onPr6epVUP8Obg/pT1Oj/1hOLbfR8CHHWdAWzUBGGvp2TIy2A8LUaEoFnwkxZfdL7Bnd0RH/ClBtAjzLOxmUo7NbZmEnYCcD5pZz7BdZI0db/eBXFqfOlA88rEe+9Sv+NndIq0/WNIIsJi2RgjJnxsxvB5MjhhzmItpFIUl5yqoO3C9jcCp6HDBJxtCGbvAr5ALPn5RCJeBIr67WpAiTd7L3Ebu9SQZlXnoHX8kP04EA6ylR3W0EFbh7KUtq8M2H2vo0wjMj7ysl/3tT7cEZ97s1ygO5iJx3GfMDyrDhtLXSBJ20uSxTJeptRw8SDiwTqunIh1WyKlcQz1WGauSbW4eXdj/r9KYMJ3qMMkdP/9THQUtTcOYx51r8RV9pdzqF2HPnZZNziBa+wXJZHEWp70NyoakNthgYwtypqiDHs2f3Q==" \
"https://${yourOktaDomain}/api/v1/idps/0oa1ysid1U3iyFqLu0g4/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish"
```

Publish with X.509 certificate in ``PEM`` format:

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/x-pem-file" \
-H "Authorization: SSWS ${api_token}" \
--data-binary @certificate.pem \
"https://${yourOktaDomain}/api/v1/idps/0oa1ysid1U3iyFqLu0g4/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish"
```

Publish with X.509 certificate in binary ``CER`` format:

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/x-x509-ca-cert" \
-H "Authorization: SSWS ${api_token}" \
--data-binary @certificate.cer \
-d '{
}' "https://${yourOktaDomain}/api/v1/idps/0oa1ysid1U3iyFqLu0g4/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish"
```

##### Response example

```JSON
HTTP/1.1 201 Created
Content-Type: application/json
Location: https://${yourOktaDomain}/api/v1/idps/0oal21k0DVN7DhS3R0g3/credentials/keys/ZC5C-1gEUwVxiYI8xdmYYDI3Noc4zI24fLNxBpZVR04
{
    "created": "2017-03-27T21:19:57.000Z",
    "lastUpdated": "2017-03-27T21:19:57.000Z",
    "expiresAt": "2018-04-06T21:20:47.000Z",
    "x5c": [
      "MIIFgjCCA2qgAwIBAgICEAcwDQYJKoZIhvcNAQELBQAwXjELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMQ0wCwYDVQQKDARPa3RhMQwwCgYDVQQLDANFbmcxDTALBgNVBAMMBFJvb3QwHhcNMTcwMzI3MjEyMDQ3WhcNMTgwNDA2MjEyMDQ3WjB4MQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzETMBEGA1UECgwKT2t0YSwgSW5jLjEQMA4GA1UECwwHSmFua3lDbzEVMBMGA1UEAwwMSWRQIElzc3VlciA3MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmkC6yAJVvFwUlmM9gKjb2d+YK5qHFt+mXSsbjWKKs4EfNm+BoQeeovBZtSACyaqLc8IYFTPEURFcbDQ9DkAL04uUIRD2gaHYY7uK0jsluEaXGq2RAIsmzAwNTzkiDw4q9pDL/q7n0f/SDt1TsMaMQayB6bU5jWsmqcWJ8MCRJ1aJMjZ16un5UVx51IIeCbe4QRDxEXGAvYNczsBoZxspDt28esSpq5W0dBFxcyGVudyl54Er3FzAguhgfMVjH+bUec9j2Tl40qDTktrYgYfxz9pfjm01Hl4WYP1YQxeETpSL7cQ5Ihz4jGDtHUEOcZ4GfJrPzrGpUrak8Qp5xcwCqQIDAQABo4IBLjCCASowCQYDVR0TBAIwADARBglghkgBhvhCAQEEBAMCBkAwMwYJYIZIAYb4QgENBCYWJE9wZW5TU0wgR2VuZXJhdGVkIFNlcnZlciBDZXJ0aWZpY2F0ZTAdBgNVHQ4EFgQUVqJukDmyENw/2pTApbxc/HRKbngwgZAGA1UdIwSBiDCBhYAUFx245ZZXqWTTbARfMlFWN77L9EahYqRgMF4xCzAJBgNVBAYTAlVTMQswCQYDVQQIDAJDQTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEMMAoGA1UECwwDRW5nMQ0wCwYDVQQDDARSb290ggkAlIfpwZjO5o8wDgYDVR0PAQH/BAQDAgWgMBMGA1UdJQQMMAoGCCsGAQUFBwMBMA0GCSqGSIb3DQEBCwUAA4ICAQCcoBSRtY+9cJY00hLvq6AloYZcdn/kUQupfmyz4n3lKE3wV2FB0swKnK0QDi8iNuQJFdag/19vDHC4/LhoSuv1Q+KXM61pPZVRXXPyC1+e7Y6hj93tEI5HcqLPcDRH1AIG2l8tE7LBn+MQB5Vh6oxjG2IdoWxg6abMfISU+MauPWql4vMDUWo9iNShAo44Z5fd+nuz+hlAinU9Xn9Jf2QsfKvcbMRq7iuqgkabgdmObmWb9KK0Vm7TDkxCH0pB0onPr6epVUP8Obg/pT1Oj/1hOLbfR8CHHWdAWzUBGGvp2TIy2A8LUaEoFnwkxZfdL7Bnd0RH/ClBtAjzLOxmUo7NbZmEnYCcD5pZz7BdZI0db/eBXFqfOlA88rEe+9Sv+NndIq0/WNIIsJi2RgjJnxsxvB5MjhhzmItpFIUl5yqoO3C9jcCp6HDBJxtCGbvAr5ALPn5RCJeBIr67WpAiTd7L3Ebu9SQZlXnoHX8kP04EA6ylR3W0EFbh7KUtq8M2H2vo0wjMj7ysl/3tT7cEZ97s1ygO5iJx3GfMDyrDhtLXSBJ20uSxTJeptRw8SDiwTqunIh1WyKlcQz1WGauSbW4eXdj/r9KYMJ3qMMkdP/9THQUtTcOYx51r8RV9pdzqF2HPnZZNziBa+wXJZHEWp70NyoakNthgYwtypqiDHs2f3Q=="
    ],
    "e": "AQAB",
    "n": "mkC6yAJVvFwUlmM9gKjb2d-YK5qHFt-mXSsbjWKKs4EfNm-BoQeeovBZtSACyaqLc8IYFTPEURFcbDQ9DkAL04uUIRD2gaHYY7uK0jsluEaXGq2RAIsmzAwNTzkiDw4q9pDL_q7n0f_SDt1TsMaMQayB6bU5jWsmqcWJ8MCRJ1aJMjZ16un5UVx51IIeCbe4QRDxEXGAvYNczsBoZxspDt28esSpq5W0dBFxcyGVudyl54Er3FzAguhgfMVjH-bUec9j2Tl40qDTktrYgYfxz9pfjm01Hl4WYP1YQxeETpSL7cQ5Ihz4jGDtHUEOcZ4GfJrPzrGpUrak8Qp5xcwCqQ",
    "kid": "ZC5C-1gEUwVxiYI8xdmYYDI3Noc4zI24fLNxBpZVR04",
    "kty": "RSA",
    "use": "sig",
    "x5t#S256": "lt0HQ-Ty_f_5icHGjUTrrNSO6dofPTRoPzOZhNSg5Kc"
  }
```

> **Note:** If the validity period of the certificate is less than 90 days, a 400 error response is returned.

```JSON
HTTP/1.1 400 Bad Request
Content-Type: application/json
{
  "errorCode": "E0000001",
  "errorSummary": "Api validation failed: certificate",
  "errorLink": "E0000001",
  "errorId": "oaeu3Ej_tjlSXytiahRUasoSg",
  "errorCauses": [
    {
      "errorSummary": "The certificate does not match the CSR."
    }
  ]
}
```

### Revoke signing CSR from IdP

<ApiOperation method="delete" url="/api/v1/idps/${idpId}/credentials/csrs/${csrModelId}" />

Revokes a CSR and deletes the key pair from the IdP

##### Request parameters


| Parameter  | Description                                       | Param Type | DataType | Required |
| ---------  | -----------------------------------------------   | ---------- | -------- | -------- |
| csrModelId | `id` of [CSR object](#identity-provider-csr-object) | URL        | String   | TRUE     |
| idpId      | `id` of the IdP                                   | URL        | String   | TRUE     |

##### Response parameters

Empty response

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/-_-BFwAGoUYN-DDvsSKQFdx7OXaPZqrEPpFDO1hu-rg"
```

##### Response example

```http
HTTP/1.1 204 No Content
```

### List signing CSRs for IdP

<ApiOperation method="get" url="/api/v1/idps/${idpId}/credentials/csrs" />

Enumerates signing CSRs for an IdP

##### Request parameters

| Parameter     | Description                                     | Param Type | DataType                                      | Required |
| ------------- | ----------------------------------------------- | ---------- | --------------------------------------------- | -------- |
| idpId         | `id` of the IdP                                 | URL        | String                                        | TRUE     |

##### Response parameters

Array of [CSR objects](#identity-provider-csr-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs"
```

##### Response example

```json
[
  {
    "id": "h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
    "created": "2017-03-28T01:11:10.000Z",
    "csr": "MIIC4DCCAcgCAQAwcTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xEzARBgNVBAoMCk9rdGEsIEluYy4xDDAKBgNVBAsMA0RldjESMBAGA1UEAwwJU1AgSXNzdWVyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6m8jHVCr9/tKvvbFN59T4raoCs/78KRm4fSefHQOv1TKLXo4wTLbsqYWRWc5u0sd5orUMQgPQOyj3i6qh13mALY4BzrT057EG1BUNjGg29QgYlnOk2iX890e5BIDMQQEIKFrvOi2V8cLUkLvE2ydRn0VO1Q1frbUkYeStJYC5Api2JQsYRwa+1ZeDH1ITnIzUaugWhW2WB2lSnwZkenne5KtffxMPYVu+IhNRHoKaRA6Z51YNhMJIx17JM2hs/H4Ka3drk6kzDf7ofk/yBpb9yBWyU7CTSQhdoHidxqFprMDaT66W928t3AeOENHBuwn8c2K9WeGG+bELNyQRJVmawIDAQABoCowKAYJKoZIhvcNAQkOMRswGTAXBgNVHREEEDAOggxkZXYub2t0YS5jb20wDQYJKoZIhvcNAQELBQADggEBAA2hsVJRVM+A83X9MekjTnIbt19UNT8wX7wlE9jUKirWsxceLiZBpVGn9qfKhhVIpvdaIRSeoFYS2Kg/m1G6bCvjmZLcrQ5FcEBjZH2NKfNppGVnfC2ugtUkBtCB+UUzOhKhRKJtGugenKbP33zRWWIqnd2waF6Cy8TIuqQVPbwEDN9bCbAs7ND6CFYNguY7KYjWzQOeAR716eqpEEXuPYAS4nx/ty4ylonR8cv+gpq51rvq80A4k/36aoeM0Y6I4w64vhTfuvWW2UYFUD+/+y2FA2CSP4JfctySrf1s525v6fzTFZ3qZbB5OZQtP2b8xYWktMzywsxGKDoVDB4wkH4=",
    "kty": "RSA",
    "_links": {
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
        "hints": {
          "allow": [
            "GET",
            "DELETE"
          ]
        }
      },
      "publish": {
        "href": "https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  },
  {
    "id": "-_-BFwAGoUYN-DDvsSKQFdx7OXaPZqrEPpFDO1hu-rg",
    "created": "2017-03-28T01:21:10.000Z",
    "csr": "MIIC4DCCAcgCAQAwcTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xEzARBgNVBAoMCk9rdGEsIEluYy4xDDAKBgNVBAsMA0RldjESMBAGA1UEAwwJU1AgSXNzdWVyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6m8jHVCr9/tKvvbFN59T4raoCs/78KRm4fSefHQOv1TKLXo4wTLbsqYWRWc5u0sd5orUMQgPQOyj3i6qh13mALY4BzrT057EG1BUNjGg29QgYlnOk2iX890e5BIDMQQEIKFrvOi2V8cLUkLvE2ydRn0VO1Q1frbUkYeStJYC5Api2JQsYRwa+1ZeDH1ITnIzUaugWhW2WB2lSnwZkenne5KtffxMPYVu+IhNRHoKaRA6Z51YNhMJIx17JM2hs/H4Ka3drk6kzDf7ofk/yBpb9yBWyU7CTSQhdoHidxqFprMDaT66W928t3AeOENHBuwn8c2K9WeGG+bELNyQRJVmawIDAQABoCowKAYJKoZIhvcNAQkOMRswGTAXBgNVHREEEDAOggxkZXYub2t0YS5jb20wDQYJKoZIhvcNAQELBQADggEBAA2hsVJRVM+A83X9MekjTnIbt19UNT8wX7wlE9jUKirWsxceLiZBpVGn9qfKhhVIpvdaIRSeoFYS2Kg/m1G6bCvjmZLcrQ5FcEBjZH2NKfNppGVnfC2ugtUkBtCB+UUzOhKhRKJtGugenKbP33zRWWIqnd2waF6Cy8TIuqQVPbwEDN9bCbAs7ND6CFYNguY7KYjWzQOeAR716eqpEEXuPYAS4nx/ty4ylonR8cv+gpq51rvq80A4k/36aoeM0Y6I4w64vhTfuvWW2UYFUD+/+y2FA2CSP4JfctySrf1s525v6fzTFZ3qZbB5OZQtP2b8xYWktMzywsxGKDoVDB4wkH4=",
    "kty": "RSA",
    "_links": {
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/-_-BFwAGoUYN-DDvsSKQFdx7OXaPZqrEPpFDO1hu-rg",
        "hints": {
          "allow": [
            "GET",
            "DELETE"
          ]
        }
      },
      "publish": {
        "href": "https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/-_-BFwAGoUYN-DDvsSKQFdx7OXaPZqrEPpFDO1hu-rg/lifecycle/publish",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      }
    }
  }
]
```

### Get signing CSR for IdP

<ApiOperation method="get" url="/api/v1/idps/${idpId}/credentials/csrs/${csrModelId}" />

Gets a specific [CSR object](#identity-provider-csr-object) by `id`

##### Request parameters

| Parameter     | Description                                                                     | Param Type | DataType                                      | Required |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- |
| idpId         | `id` of the IdP                                                                 | URL        | String                                        | TRUE     |
| csrModelId    | `id` of [CSR object](#identity-provider-csr-object)                               | URL        | String                                        | TRUE     |

##### Response parameters

Returns base64-encoded CSR in DER format if the ``Accept`` media type is ``application/pkcs10`` or a CSR object if the ``Accept`` media type is ``application/json``

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50"
```

##### Response example

```json
{
  "id": "h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
  "created": "2017-03-28T01:11:10.000Z",
  "csr": "MIIC4DCCAcgCAQAwcTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xEzARBgNVBAoMCk9rdGEsIEluYy4xDDAKBgNVBAsMA0RldjESMBAGA1UEAwwJU1AgSXNzdWVyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6m8jHVCr9/tKvvbFN59T4raoCs/78KRm4fSefHQOv1TKLXo4wTLbsqYWRWc5u0sd5orUMQgPQOyj3i6qh13mALY4BzrT057EG1BUNjGg29QgYlnOk2iX890e5BIDMQQEIKFrvOi2V8cLUkLvE2ydRn0VO1Q1frbUkYeStJYC5Api2JQsYRwa+1ZeDH1ITnIzUaugWhW2WB2lSnwZkenne5KtffxMPYVu+IhNRHoKaRA6Z51YNhMJIx17JM2hs/H4Ka3drk6kzDf7ofk/yBpb9yBWyU7CTSQhdoHidxqFprMDaT66W928t3AeOENHBuwn8c2K9WeGG+bELNyQRJVmawIDAQABoCowKAYJKoZIhvcNAQkOMRswGTAXBgNVHREEEDAOggxkZXYub2t0YS5jb20wDQYJKoZIhvcNAQELBQADggEBAA2hsVJRVM+A83X9MekjTnIbt19UNT8wX7wlE9jUKirWsxceLiZBpVGn9qfKhhVIpvdaIRSeoFYS2Kg/m1G6bCvjmZLcrQ5FcEBjZH2NKfNppGVnfC2ugtUkBtCB+UUzOhKhRKJtGugenKbP33zRWWIqnd2waF6Cy8TIuqQVPbwEDN9bCbAs7ND6CFYNguY7KYjWzQOeAR716eqpEEXuPYAS4nx/ty4ylonR8cv+gpq51rvq80A4k/36aoeM0Y6I4w64vhTfuvWW2UYFUD+/+y2FA2CSP4JfctySrf1s525v6fzTFZ3qZbB5OZQtP2b8xYWktMzywsxGKDoVDB4wkH4=",
  "kty": "RSA",
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "publish": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

## Identity Provider User operations

### Find Users

<ApiOperation method="get" url="/api/v1/idps/${idpId}/users" />

Finds all the Users linked to an Identity Provider

##### Request parameters

| Parameter | Description             | Param Type | DataType | Required |
| --------- | ----------------------- | ---------- | -------- | -------- |
| idpId     | `id` of IdP to search   | URL        | String   | TRUE     |

##### Response parameters

List of Users that are linked to the specified Identity Provider

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/idps/0oa4lb6lbtmH355Hx0h7/users"
```

##### Response example

```json
[
  {
      "id": "00u5cl9lo7nMjHjPr0h7",
      "externalId": "109912936038778",
      "created": "2015-11-03T19:10:11.000Z",
      "lastUpdated": "2015-11-03T19:11:49.000Z",
      "profile": {
          "firstName": "Carol",
          "middleName": "Lee",
          "lastName": "Johnson",
          "email": "carol_johnson@tfbnw.net",
          "displayName": "Carol Johnson",
          "profile": "https://www.facebook.com/app_scoped_user_id/109912936038778/"
      },
      "_links": {
        "self": {
          "href": "https://${yourOktaDomain}/api/v1/idps/0oa4lb6lbtmH355Hx0h7/users/00u5cl9lo7nMjHjPr0h7",
          "hints": {
              "allow": [
                  "GET",
                  "DELETE"
                ]
          }
        },
        "idp": {
            "href": "https://${yourOktaDomain}/api/v1/idps/0oa4lb6lbtmH355Hx0h7"
        },
        "user": {
            "href": "https://${yourOktaDomain}/api/v1/users/00u5cl9lo7nMjHjPr0h7"
        }
     }
  }
]
```

### List IdPs associated with a User

<ApiOperation method="GET" url="/api/v1/users/${userId}/idps" />

Lists the IdPs associated with the User

##### Request parameters

| Parameter     | Description                                                                     | Param Type | DataType                                      | Required |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- |
| userId        | `id` of a User                                                                  | URL        | String                                        | TRUE     |

##### Response parameters

Return the associated [Identity Providers](#identity-provider-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/idps"
```

##### Response example

```json
[{
  "id": "0oa62b57p7c8PaGpU0h7",
  "type": "FACEBOOK",
  "name": "Facebook",
  "status": "ACTIVE",
  "created": "2016-03-24T23:18:27.000Z",
  "lastUpdated": "2016-03-24T23:18:27.000Z",
  "protocol": {
    "type": "OAUTH2",
    "endpoints": {
      "authorization": {
        "url": "https://www.facebook.com/dialog/oauth",
        "binding": "HTTP-REDIRECT"
      },
      "token": {
        "url": "https://graph.facebook.com/v2.5/oauth/access_token",
        "binding": "HTTP-POST"
      }
    },
    "scopes": [
      "public_profile",
      "email"
    ],
    "credentials": {
      "client": {
        "client_id": "your-client-id",
        "client_secret": "your-client-secret"
      }
    }
  },
  "policy": {
    "provisioning": {
      "action": "AUTO",
      "profileMaster": true,
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
        "template": "idpuser.userPrincipalName"
      },
      "filter": null,
      "matchType": "USERNAME"
    },
    "maxClockSkew": 0
  },
  "_links": {
    "authorize": {
      "href": "https://${yourOktaDomain}/oauth2/v1/authorize?idp=0oa62b57p7c8PaGpU0h7&
          client_id={clientId}&response_type={responseType}&response_mode={responseMode}&
          scope={scopes}&redirect_uri={redirectUri}&state={state}",
      "templated": true,
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "clientRedirectUri": {
      "href": "https://${yourOktaDomain}/oauth2/v1/authorize/callback",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "idpUser": {
        "href": "https://${yourOktaDomain}/idps/0oa62b57p7c8PaGpU0h7/users/00ub0oNGTSWTBKOLGLNR",
        "hints": {
          "allow": [
            "GET",
            "DELETE"
          ]
        }
      }
  }
}]
```

> **Note:** If the user doesn't exist, you receive an error response.

```JSON
HTTP/1.1 400 Bad Request
Content-Type: application/json
{
  "errorCode": "E0000007",
  "errorSummary": "Not found: Resource not found: 00ub0oNGTSWTBKOLGLNR (User)",
  "errorLink": "E0000007",
  "errorId": "oaeYW9k9yJuSSSkhaMQdA1-Zg",
  "errorCauses": []
}
```

### Get a linked Identity Provider User

<ApiOperation method="GET" url="/api/v1/idps/${idpId}/users/${userId}" />

Fetches a linked [IdP User](#identity-provider-user-object) by ID

##### Request parameters

| Parameter     | Description                                                                     | Param Type | DataType                                      | Required |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- |
| idpId         | ID of the [Identity Provider](#identity-provider-object)                         | URL        | String                                        | TRUE     |
| userId        | `id` of a User                                                                  | URL        | String                                        | TRUE     |

##### Response parameters

Return the associated [Identity Providers](#identity-provider-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/idps/0oa62bfdiumsUndnZ0h7/users/00u5t60iloOHN9pBi0h7"
```

##### Response example

```json
{
    "id": "00u5t60iloOHN9pBi0h7",
    "externalId": "externalId",
    "created": "2017-12-19T17:30:16.000Z",
    "lastUpdated": "2017-12-19T17:30:16.000Z",
    "profile": {
        "profileUrl": null,
        "firstName": null,
        "lastName": null,
        "honorificSuffix": null,
        "displayName": null,
        "honorificPrefix": null,
        "middleName": null,
        "email": null
    },
    "_links": {
        "idp": {
            "href": "https://${yourOktaDomain}/api/v1/idps/0oa62bfdiumsUndnZ0h7"
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/idps/0oa62bfdiumsUndnZ0h7/users/00u5t60iloOHN9pBi0h7",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "user": {
            "href": "https://${yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7"
        }
    }
}
```

> **Note:** If the IdP doesn't exist, you receive an error response.

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "errorCode": "E0000007",
  "errorSummary": Not found: Resource not found: 0oa62bfdiumsUndnZ0h8 (IdpAppInstance)",
  "errorLink": "E0000007",
  "errorId": "oaeYW9k9yJuSSSkhaMQdA1-Zg",
  "errorCauses": []
}
```

### Link a User to a social provider without a Transaction


<ApiOperation method="POST" url="/api/v1/idps/${idpId}/users/${userId}" />

Links an Okta User to an existing [social provider](#identity-provider-object). This endpoint doesn't support the SAML2 [Identity Provider type](#identity-provider-type).

##### Request parameters


| Parameter     | Description                                                                     | Param Type | DataType                                      | Required |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- |
| externalId    | unique IdP-specific identifier for a User                                         | Body       | String                                        | TRUE     |
| idpId         | `id` of the IdP                                                                 | URL        | String                                        | TRUE     |
| userId        | `id` of a User                                                                  | URL        | String                                        | TRUE     |

##### Response parameters

Return the associated [Identity Providers](#identity-provider-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "externalId": "121749775026145"
}' "https://${yourOktaDomain}/api/v1/idps/0oa62b57p7c8PaGpU0h7/users/00ub0oNGTSWTBKOLGLNR"
```

##### Response example

```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "externalId": "121749775026145",
  "created": "2017-03-30T02:19:51.000Z",
  "lastUpdated": "2017-03-30T02:19:51.000Z",
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oa62b57p7c8PaGpU0h7/users/00ub0oNGTSWTBKOLGLNR",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "idp": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oa62b57p7c8PaGpU0h7"
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
    }
  }
}
```

> **Note:** If either the User or the IdP doesn't exist, you receive an error response.

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "errorCode": "E0000007",
  "errorSummary": "Not found: Resource not found: 00ub0oNGTSWTBKOLGLNR (User)",
  "errorLink": "E0000007",
  "errorId": "oaeYW9k9yJuSSSkhaMQdA1-Zg",
  "errorCauses": []
}
```

### Unlink User from IdP

<ApiOperation method="delete" url="/api/v1/idps/${idpId}/users/${userId}" />

Removes the link between the Okta User and the IdP User. The next time the User federates into Okta through this IdP, they have to re-link their account according to the account link policy configured in Okta for this IdP.

##### Request parameters

| Parameter | Description             | Param Type | DataType | Required |
| --------- | ----------------------- | ---------- | -------- | -------- |
| idpId     | `id` of IdP to activate | URL        | String   | TRUE     |
| userId    | `id` of user to delete  | URL        | String   | TRUE     |

##### Response parameters


##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/idps/0oa4lb6lbtmH355Hx0h7/users/00u5cl9lo7nMjHjPr0h7"
```

##### Response example

```bash
204 - No Content
```

### Social authentication token operation

<ApiOperation method="GET" url="/api/v1/idps/${idpId}/users/${userId}/credentials/tokens" />

Okta doesn't import all the User information from a social provider. If the app needs information that isn't imported, it can get the User token from this endpoint, and then make an API call to the social provider with the token to request the additional information.

##### Request parameters

| Parameter     | Description                                                                     | Param Type | DataType                                      | Required |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- |
| idpId         | `id` of the IdP                                                                 | URL        | String                                        | TRUE     |
| userId        | `id` of a User                                                                  | URL        | String                                        | TRUE     |

##### Response parameters

Return a list of the associated [social authentication tokens](#identity-provider-social-authentication-token-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/idps/0oa62b57p7c8PaGpU0h7/users/00ub0oNGTSWTBKOLGLNR/credentials/tokens"
```

##### Response example

```json
[{
  "id": "dsasdfe",
  "token": "JBTWGV22G4ZGKV3N",
  "tokenType" : "urn:ietf:params:oauth:token-type:access_token",
  "tokenAuthScheme": "Bearer",
  "expiresAt" : "2014-08-06T16:56:31.000Z",
  "scopes"     : [ "openid", "foo" ]
}]
```

## Identity Provider object

### Example

```json
{
  "id": "0oa1k5d68qR2954hb0g4",
  "type": "SAML2",
  "issuerMode": "ORG_URL",
  "name": "Example SAML IdP",
  "status": "ACTIVE",
  "created": "2015-03-05T20:24:09.000Z",
  "lastUpdated": "2015-12-18T05:19:40.000Z",
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
          "algorithm": "SHA-1",
          "scope": "REQUEST"
        }
      },
      "response": {
        "signature": {
          "algorithm": "SHA-1",
          "scope": "ANY"
        }
      }
    },
    "credentials": {
      "trust": {
        "issuer": "urn:example:idp",
        "audience": "https://www.okta.com/saml2/service-provider/spgv32vOnpdyeGSaiUpL",
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
      "filter": null,
      "matchType": "USERNAME"
    },
    "maxClockSkew": 120000
  },
  "_links": {
    "metadata": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oa1k5d68qR2954hb0g4/metadata.xml",
      "type": "application/xml",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "acs": {
      "href": "https://${yourOktaDomain}/sso/saml2/0oa1k5d68qR2954hb0g4",
      "type": "application/xml",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "users": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oa1k5d68qR2954hb0g4/users",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "activate": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oa1k5d68qR2954hb0g4/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oa1k5d68qR2954hb0g4/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Identity Provider attributes

All Identity Providers have the following properties:

| Property      | Description                                                  | DataType                                                       | Nullable | Unique | Readonly | MinLength | MaxLength |
| ------------- | ------------------------------------------------------------ | -------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- |
| _embedded   | Embedded resources related to the IdP                      | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE  | FALSE | TRUE  |   |     |
| _links      | [Discoverable resources](#links-object) related to the IdP | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE  | FALSE | TRUE  |   |     |
| created     | Timestamp when the IdP was created                             | Date                                                           | FALSE | FALSE | TRUE  |   |     |
| id            | Unique key for the IdP                                       | String                                                         | FALSE    | TRUE   | TRUE     |           |           |
| issuerMode <ApiLifecycle access="ea" />  | Indicates whether Okta uses the original Okta org domain URL or a custom domain URL in the request to the social IdP  | `ORG_URL` or `CUSTOM_URL_DOMAIN` | FALSE | FALSE | FALSE |   |
| lastUpdated | Timestamp when the IdP was last updated                        | Date                                                           | FALSE | FALSE | TRUE  |   |     |
| name        | Unique name for the IdP                                    | String                                                         | FALSE | TRUE  | FALSE | 1 | 100 |
| policy      | Policy settings for IdP `type`                             | [Policy object](#policy-object)                       | FALSE | FALSE | FALSE |   |     |
| protocol    | Protocol settings for IdP `type`                           | [Protocol object](#protocol-object)                     | FALSE | FALSE | FALSE |   |     |
| status      | Status of the IdP                                          | `ACTIVE` or `INACTIVE`                                         | FALSE | FALSE | TRUE  |   |     |
| type          | Type of IdP                                                  | [Identity Provider Type](#identity-provider-type)              | FALSE    | FALSE  | FALSE    |           |           |

#### Property details

* The `id`, `created`, `lastUpdated`, and `_links` properties are available after an IdP is created.

* `issuerMode` is visible if you have the Custom URL Domain feature enabled. If the feature is enabled, you can set a custom domain URL and this property is returned in the appropriate responses. To enable the Custom URL Domain feature, contact [Support](https://support.okta.com/help/open_case).

    * If set to `ORG_URL`, then in the authorize request to the social IdP, Okta uses the Okta org's original domain URL (`https://${yourOktaDomain}`) as the domain in the `redirect_uri`. This is the default value for social IdPs created before the Custom URL Domain feature is enabled.

    * If set to `CUSTOM_URL_DOMAIN`, then in the authorize request to the social IdP, Okta uses the custom domain URL as the domain in the `redirect_uri`. This is the default value for social IdPs created after the Custom URL Domain feature is enabled.

  After you enable the Custom URL Domain feature, all new social IdPs use the `CUSTOM_URL_DOMAIN` by default. All existing social IdPs continue to use the `ORG_URL` so that existing integrations with the social IdP continue to work after the feature is enabled. You can change this value in any social IdP through the API or Admin Console.

### Identity Provider type

Okta supports the following enterprise and social providers:

| Type         | Description                                                                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `APPLE`      | [Apple Sign In](https://developer.apple.com/documentation/sign_in_with_apple)                                                                       |
| `FACEBOOK`   | [Facebook Sign In](https://developers.facebook.com/docs/facebook-login/overview/)                                                                       |
| `GOOGLE`     | [Google Sign In with OpenID Connect](https://developers.google.com/identity/protocols/OpenIDConnect)                                                  |
| `LINKEDIN`   | [Sign In with LinkedIn](https://developer.linkedin.com/docs/signin-with-linkedin)                                                                     |
| `MICROSOFT`  | [Microsoft Enterprise SSO](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/what-is-single-sign-on)                                |
| `OIDC`       | IdP provider that supports [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html)                                                    |
| `SAML2`      | Enterprise IdP provider that supports the [SAML 2.0 Web Browser SSO Profile](https://docs.oasis-open.org/security/saml/v2.0/saml-profiles-2.0-os.pdf) |
| `X509`       | [Smart Card IdP](https://tools.ietf.org/html/rfc5280)                                |

### Protocol object

The Protocol object contains IdP-specific protocol settings for endpoints, bindings, and algorithms used to connect with the IdP and validate messages.

| Provider     | Protocol                                   |
| ------------ | -----------------------------------------  |
| `APPLE`      | [OpenID Connect](#openid-connect-protocol) |
| `FACEBOOK`   | [OAuth 2.0](#oauth-2-0-protocol)            |
| `GOOGLE`     | [OpenID Connect](#openid-connect-protocol) |
| `LINKEDIN`   | [OAuth 2.0](#oauth-2-0-protocol)            |
| `MICROSOFT`  | [OpenID Connect](#openid-connect-protocol) |
| `OIDC`       | [OpenID Connect](#openid-connect-protocol) |
| `SAML2`      | [SAML 2.0](#saml-2-0-protocol)              |
| `MTLS`  | [Mutual TLS](#mtls-protocol) |

#### SAML 2.0 Protocol

Protocol settings for the [SAML 2.0 Authentication Request Protocol](http://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf):

| Property    | Description                                                        | DataType                                                          | Nullable | Readonly |
| ----------- | ------------------------------------------------------------------ | ----------------------------------------------------------------- | -------- | -------- |
| algorithms  | Settings for signing and verifying SAML messages                   | [SAML 2.0 Algorithms object](#saml-2-0-algorithms-object)          | FALSE    | FALSE    |
| credentials | Federation trust credentials for verifying assertions from the IdP | [SAML 2.0 Credentials object](#saml-2-0-credentials-object)        | FALSE    | FALSE    |
| endpoints   | SAML 2.0 HTTP binding settings for IdP and SP (Okta)               | [SAML 2.0 Endpoints object](#saml-2-0-endpoints-object)            | FALSE    | FALSE    |
| relayState  | Relay state settings for IdP                                       | [SAML 2.0 Relay State object](#saml-2-0-relay-state-object)        | TRUE     | FALSE    |
| settings    | Advanced settings for the SAML 2.0 protocol                        | [SAML 2.0 Settings object](#saml-2-0-settings-object)              | TRUE     | FALSE    |
| type        | SAML 2.0 protocol                                                  | `SAML2`                                                           | FALSE    | TRUE     |

```json
{
  "protocol": {
    "type": "SAML2",
    "endpoints": {
      "sso": {
        "url": "https://idp.example.com/saml2/sso",
        "binding": "HTTP-POST",
        "destination": "https://idp.example.com/saml2/sso"
      },
      "acs": {
        "binding": "HTTP-POST",
        "type": "INSTANCE"
      }
    },
    "relayState": {
      "format": "FROM_URL"
    },
    "algorithms": {
      "request": {
        "signature": {
          "algorithm": "SHA-1",
          "scope": "REQUEST"
        }
      },
      "response": {
        "signature": {
          "algorithm": "SHA-1",
          "scope": "ANY"
        }
      }
    },
    "credentials": {
      "trust": {
        "issuer": "urn:example:idp",
        "audience": "https://www.okta.com/saml2/service-provider/spgv32vOnpdyeGSaiUpL",
        "kid": "your-key-id"
      }
    },
    "settings": {
        "nameFormat": "urn:oasis:names:tc:SAML:2.0:nameid-format:transient"
    }
  }
}
```

##### SAML 2.0 endpoints object

The `SAML2` protocol supports the `sso` and `acs` endpoints.

| Property | Description                                                                           | DataType                                                                                            | Nullable | Readonly |
| -------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------- | -------- |
| acs      | Okta's `SPSSODescriptor` endpoint where the IdP sends a `<SAMLResponse>` message      | [Assertion Consumer Service (ACS) Endpoint object](#assertion-consumer-service-acs-endpoint-object) | FALSE    | FALSE    |
| sso      | IdP's `SingleSignOnService` endpoint where Okta sends an `<AuthnRequest>` message     | [Single Sign-On (SSO) Endpoint object](#single-sign-on-sso-endpoint-object)                         | FALSE    | FALSE    |

###### Single Sign-On (SSO) endpoint object

The Single Sign-On (SSO) endpoint is the IdP's `SingleSignOnService` endpoint where Okta sends a SAML 2.0 `<AuthnRequest>` message:

| Property    | Description                                                                        | DataType                         | Nullable | Readonly | MinLength | MaxLength | Validation                                      |
| ----------- | ---------------------------------------------------------------------------------- | -------------------------------- | -------- | -------- | --------- | --------- | ----------------------------------------------- |
| binding     | HTTP binding used to send an `<AuthnRequest>` message to the IdP                       | `HTTP-POST` or `HTTP-Redirect`   | FALSE    | FALSE    |           |           |                                                 |
| destination | URI reference that indicates the address to which the `<AuthnRequest>` message is sent | String                           | TRUE     | FALSE    | 1         | 512       |                                                 |
| url         | URL of the binding-specific endpoint to send an `<AuthnRequest>` message to the IdP        | String                           | FALSE    | FALSE    | 11        | 1014      | [RFC 3986](https://tools.ietf.org/html/rfc3986) |

**Property details**

* The `destination` property is required if request signatures are specified. See [SAML 2.0 Request Algorithm object](#saml-2-0-request-algorithm-object).
* The value of `url` is defaulted to the same value as the `sso` endpoint if omitted during creation of a new IdP instance.

```json
{
  "protocol": {
    "type": "SAML2",
    "endpoints": {
      "sso": {
        "url": "https://idp.example.com/saml2/sso",
        "binding": "HTTP-POST",
        "destination": "https://idp.example.com/saml2/sso"
      }
    }
  }
}
```

* The `url` should be the same value as the `Location` attribute for a published binding in the IdP's SAML Metadata `IDPSSODescriptor`.

```xml
<IDPSSODescriptor protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
  <SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://idp.example.com/saml2/sso"/>
  <SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://idp.example.com/saml2/sso"/>
</IDPSSODescriptor>
```

###### Assertion Consumer Service (ACS) endpoint object

The ACS endpoint is Okta's `SPSSODescriptor` endpoint where the IdP sends a SAML 2.0 `<SAMLResponse>` message.

| Property    | Description                                                                                                            | DataType              | Nullable | Readonly | Default     |
| ----------- | ---------------------------------------------------------------------------------------------------------------------  | --------------------- | -------- | -------- | ----------  |
| binding     | HTTP binding used to receive a `<SAMLResponse>` message from the IdP                                                   | `HTTP-POST`           | TRUE     | FALSE    | `HTTP-POST` |
| type        | Determines whether to publish an instance-specific (trust) or organization (shared) ACS endpoint in the SAML metadata  | `INSTANCE` or `ORG`   | TRUE     | FALSE    | `INSTANCE`  |

```json
{
  "protocol": {
    "type": "SAML2",
    "endpoints": {
      "acs": {
        "binding": "HTTP-POST",
        "type": "INSTANCE"
      }
    }
  }
}
```

**Trust-specific ACS endpoint example**

```xml
<md:EntityDescriptor entityID="https://sp.example.com/saml2/sso" xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata">
  <md:SPSSODescriptor AuthnRequestsSigned="true" WantAssertionsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
    <md:AssertionConsumerService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://${yourOktaDomain}/sso/saml2/0oamxfD9Jvaxvr0M00g3" index="0" isDefault="true"/>
  </md:SPSSODescriptor>
</md:EntityDescriptor>
```

> **Tip:** Note the unique IdP instance `id` in the ACS `Location`.

**Organization (shared) ACS endpoint example**

```xml
<md:EntityDescriptor entityID="https://sp.example.com/saml2/sso" xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata">
  <md:SPSSODescriptor AuthnRequestsSigned="true" WantAssertionsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
    <md:AssertionConsumerService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://${yourOktaDomain}/sso/saml2" index="0" isDefault="true"/>
  </md:SPSSODescriptor>
</md:EntityDescriptor>
```

> **Note:** An organization-specific ACS endpoint enables multiple trusts from an IdP to a single ACS URL that may be required by specific IdP vendors.

##### SAML 2.0 Relay State object

| Property   | Description           | DataType    | Nullable | Readonly |
| ---------- | --------------------- | ----------- | -------- | -------- |
| format     | The format used to generate the `relayState` in the SAML request. `FROM_URL` is used if this value is null.     | `OPAQUE` or `FROM_URL` | TRUE     | FALSE

```json
{
  "protocol": {
    "type": "SAML2",
    "relayState": {
      "format": "OPAQUE"
    }
  }
}
```

##### SAML 2.0 Algorithms object

The `SAML2` protocol supports `request` and `response` algorithm and verification settings.

| Property | Description                                                   | DataType                                                                 | Nullable | Readonly |
| -------- | ------------------------------------------------------------- | ------------------------------------------------------------------------ | -------- | ------   |
| request  | Algorithm settings used to secure an `<AuthnRequest>` message | [SAML 2.0 Request Algorithm object](#saml-2-0-request-algorithm-object)   | FALSE    | FALSE    |
| response | Algorithm settings used to verify a `<SAMLResponse>` message  | [SAML 2.0 Response Algorithm object](#saml-2-0-response-algorithm-object) | FALSE    | FALSE    |

```json
{
  "protocol": {
    "type": "SAML2",
    "algorithms": {
      "request": {
        "signature": {
          "algorithm": "SHA-1",
          "scope": "REQUEST"
        }
      },
      "response": {
        "signature": {
          "algorithm": "SHA-1",
          "scope": "ANY"
        }
      }
    }
  }
}
```

###### SAML 2.0 Request Algorithm object

Algorithm settings for securing `<AuthnRequest>` messages sent to the IdP:

| Property  | Description                                                 | DataType                                                                                   | Nullable | Readonly |
| --------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------- | -------- |
| signature | Algorithm settings used to sign an `<AuthnRequest>` message | [SAML 2.0 Request Signature Algorithm object](#saml-2-0-request-signature-algorithm-object) | FALSE    | FALSE    |

```json
{
  "protocol": {
    "type": "SAML2",
    "algorithms": {
      "request": {
        "signature": {
          "algorithm": "SHA-256",
          "scope": "REQUEST"
        }
      }
    }
  }
}
```

###### SAML 2.0 request Signature Algorithm object

XML digital Signature Algorithm settings for signing `<AuthnRequest>` messages sent to the IdP:

| Property    | Description                                                                        | DataType             | Nullable | Readonly |
| ----------- | ---------------------------------------------------------------------------------- | -------------------- | -------- | -------- |
| algorithm   | The XML digital Signature Algorithm used when signing an `<AuthnRequest>` message  | `SHA-1` or `SHA-256` | FALSE    | FALSE    |
| scope       | Specifies whether to digitally sign `<AuthnRequest>` messages to the IdP | `REQUEST` or `NONE`  | FALSE    | FALSE    |

> **Note:** The `algorithm` property is ignored when disabling request signatures (`scope` set as `NONE`).

###### SAML 2.0 response Algorithm object

Algorithm settings for verifying `<SAMLResponse>` messages and `<Assertion>` elements from the IdP:

| Property   | Description                                                                                        | DataType                                                                                     | Nullable   | Readonly      |
| ---------- | ----------------------------------------------------------------------------------                 | --------------------                                                                         | ---------- | ------------- |
| signature  | Algorithm settings for verifying `<SAMLResponse>` messages and `<Assertion>` elements from the IdP | [SAML 2.0 Response Signature Algorithm object](#saml-2-0-response-signature-algorithm-object) | FALSE      | FALSE         |

```json
{
  "protocol": {
    "type": "SAML2",
    "algorithms": {
      "response": {
        "signature": {
          "algorithm": "SHA-256",
          "scope": "ANY"
        }
      }
    }
  }
}
```

###### SAML 2.0 response Signature Algorithm object

XML digital Signature Algorithm settings for verifying `<SAMLResponse>` messages and `<Assertion>` elements from the IdP:

| Property   | Description                                                                                                            | DataType                       | Nullable | Readonly |
| ---------- | ----------------------------------------------------------------------------------                                     | --------------------           | -------- | -------- |
| algorithm  | The minimum XML digital Signature Algorithm allowed when verifying a `<SAMLResponse>` message or `<Assertion>` element | `SHA-1` or `SHA-256`           | FALSE    | FALSE    |
| scope      | Specifies whether to verify a `<SAMLResponse>` message or `<Assertion>` element XML digital signature                  | `RESPONSE`, `ASSERTION`, `ANY` | FALSE    | FALSE    |

###### SAML 2.0 Credentials object

Federation Trust Credentials for verifying assertions from the IdP and signing requests to the IdP:

| Property   | Description                                                                        | DataType                                                                   | Nullable | Readonly |
| ---------- | ---------------------------------------------------------------------------------- | --------------------                                                       | -------- | -------- |
| signing    | Key used for signing requests to the IdP                                           | [SAML 2.0 Signing Credentials object](#saml-2-0-signing-credentials-object) | TRUE     | FALSE    |
| trust      | Object that contains information for verifying assertions from the IdP                | [SAML 2.0 Trust Credentials object](#saml-2-0-trust-credentials-object)     | FALSE    | FALSE    |

###### SAML 2.0 Trust Credentials object

Federation Trust Credentials for verifying assertions from the IdP:

| Property | Description                                                                                            | DataType | Nullable | Readonly | MinLength | MaxLength | Validation                                 |
| -------- | -----------------------------------------------------------------------------------------------------  | -------- | -------- | -------- | --------- | --------- | ------------------------------------------ |
| audience | URI that identifies the target Okta IdP instance (SP) for an `<Assertion>`                             | String   | FALSE    | FALSE    | 1         | 1024      | [URI](https://tools.ietf.org/html/rfc3986) |
| issuer   | URI that identifies the issuer (IdP) of a SAML `<SAMLResponse>` message `<Assertion>` element          | String   | FALSE    | FALSE    | 1         | 1024      | [URI](https://tools.ietf.org/html/rfc3986) |
| kid      | [Key ID](#identity-provider-key-store-operations) reference to the IdP's X.509 signature certificate   | String   | FALSE    | FALSE    | 36        | 36        | Valid IdP Key ID reference                 |

```json
{
  "protocol": {
    "type": "SAML2",
    "credentials": {
      "trust": {
        "issuer": "urn:example:idp",
        "audience": "https://www.okta.com/saml2/service-provider/spgv32vOnpdyeGSaiUpL",
        "kid": "your-key-id"
      }
    }
  }
}
```

###### SAML 2.0 Signing Credentials object

Determines the [IdP Key Credential](#identity-provider-key-credential-object) used to sign requests sent to the IdP:

| Property | Description                                                                                                    | DataType | Nullable | Readonly  | Validation                                 |
| -------- | -------------------------------------------------------------------------------------------------------------  | -------- | -------- | --------  | ------------------------------------------ |
| kid      | [IdP Key Credential](#identity-provider-key-credential-object) reference to Okta's X.509 signature certificate  | String   | FALSE    | FALSE     | Valid Signing Key ID reference             |

```json
{
  "protocol": {
    "type": "SAML2",
    "credentials": {
      "signing": {
        "kid": "your-key-id"
      }
    }
  }
}
```

##### SAML 2.0 Settings object

| Property   | Description                       | DataType    | Nullable | Readonly | DataType                                                             | Default                                               |
| ---------- | ---------------------             | ----------- | -------- | -------- | -------------------------------------------------------------------- | ----------------------------------------------        |
| nameFormat | The name identifier format to use | String      | TRUE     | FALSE    | [SAML 2.0 Name Identifier Formats](#saml-2-0-name-identifier-formats) | urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified |

```json
{
  "protocol": {
    "type": "SAML2",
    "settings": {
      "nameFormat": "urn:oasis:names:tc:SAML:2.0:nameid-format:transient"
    }
  }
}
```

##### SAML 2.0 Name Identifier formats

| Options                                                |
| ------------------------------------------------------ |
| urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified  |
| urn:oasis:names:tc:SAML:2.0:nameid-format:transient    |
| urn:oasis:names:tc:SAML:2.0:nameid-format:persistent   |
| urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress |

#### OAuth 2.0 Protocol

Protocol settings for authentication using the [OAuth 2.0 Authorization Code Flow](https://tools.ietf.org/html/rfc6749#section-4.1):

| Property    | Description                                                                                                                     | DataType                                                                     | Nullable | Readonly | MinLength |
| ----------- | ---------------------                                                                                                           | ---------------------------------------------------------                    | -------- | -------- | --------- |
| credentials | Client authentication credentials for an [OAuth 2.0 Authorization Server (AS)](https://tools.ietf.org/html/rfc6749#section-2.3) | [Credentials object](#oauth-2-0-and-openid-connect-client-credentials-object) | FALSE    | FALSE    |           |
| endpoints   | Endpoint settings for the OAuth 2.0 Authorization Server (AS)                                                                       | [OAuth 2.0 Endpoints object](#oauth-2-0-and-openid-connect-endpoints-object)  | TRUE     | TRUE     |           |
| scopes      | IdP-defined permission bundles to request delegated access from the User                                                            | Array of String                                                              | FALSE    | FALSE    | 1         |
| type        | [OAuth 2.0 Authorization Code Flow](https://tools.ietf.org/html/rfc6749#section-4.1)                                            | `OAUTH2`                                                                     | FALSE    | TRUE     |           |

> **Note:** The [OAuth 2.0 Setup Guide](#setup-guides) lists the scopes that are supported [per-IdP provider](#identity-provider-type).

```json
{
  "protocol": {
    "type": "OAUTH2",
    "endpoints": {
      "authorization": {
        "url": "https://www.facebook.com/dialog/oauth",
        "binding": "HTTP-REDIRECT"
      },
      "token": {
        "url": "https://graph.facebook.com/v2.5/oauth/access_token",
        "binding": "HTTP-POST"
      }
    },
    "scopes": [
      "public_profile",
      "email"
    ],
    "credentials": {
      "client": {
        "client_id": "your-client-id",
        "client_secret": "your-client-secret"
      }
    }
  }
}
```

#### OpenID Connect Protocol

Protocol settings for authentication using the [OpenID Connect Protocol](http://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth):

| Property    | Description                                                      | DataType                                          | Nullable | Readonly | MinLength |
| ----------- | ---------------------------------------------------------------- | ------------------------------------------------- | -------- | -------- | --------- |
| credentials | Client authentication credentials for an [OAuth 2.0 Authorization Server (AS)](https://tools.ietf.org/html/rfc6749#section-2.3) | [Credentials object](#oauth-2-0-and-openid-connect-credentials-object) | FALSE | FALSE |   |
| endpoints   | Endpoint settings for the OAuth 2.0 Authorization Server (AS)                                                                       | [OAuth 2.0 Endpoints object](#oauth-2-0-and-openid-connect-endpoints-object)  | TRUE  | TRUE  |   |
| scopes      | OpenID Connect and IdP-defined permission bundles to request delegated access from the User                                         | Array of String                                                              | FALSE | FALSE | 1 |
| type        | [OpenID Connect Authorization Code Flow](http://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth)                     | `OIDC`                                                                       | FALSE | TRUE  |   |

> **Note:** The [IdP setup guides](#setup-guides) list the scopes that are supported [per-IdP provider](#identity-provider-type). The base `openid` scope is always required.

```json
{
  "protocol": {
    "type": "OIDC",
    "endpoints": {
      "authorization": {
        "url": "https://idp.example.com/authorize",
        "binding": "HTTP-REDIRECT"
      },
      "token": {
        "url": "https://idp.example.com/token",
        "binding": "HTTP-POST"
      },
      "userInfo": {
        "url": "https://idp.example.com/userinfo",
        "binding": "HTTP-REDIRECT"
      },
      "jwks": {
        "url": "https://idp.example.com/keys",
        "binding": "HTTP-REDIRECT"
      }
    },
    "scopes": [
      "profile",
      "email",
      "openid"
    ],
    "credentials": {
      "client": {
        "client_id": "your-client-id",
        "client_secret": "your-client-secret"
      }
    }
  }
}
```

##### OAuth 2.0 and OpenID Connect endpoints object

The `OAUTH2` and `OIDC` protocols support the `authorization` and `token` endpoints. Additionally, the `OIDC` protocol supports the `userInfo` and `jwks` endpoints.

The IdP Authorization Server (AS) endpoints are currently defined as part of the [IdP provider](#identity-provider-type) and are read-only.

| Property      | Description                                                                                                    | DataType                                                                                                                     | Nullable    | Readonly      |
| ------------- | -----------------------------------------------------------------------------------                            | -----------------------------------------                                                                                    | ----------- | ------------  |
| authorization | IdP Authorization Server (AS) endpoint to request consent from the User and obtain an authorization code grant | [OAuth 2.0 Authorization Server Authorization Endpoint object](#oauth-2-0-authorization-server-authorization-endpoint-object) | TRUE        | TRUE          |
| jwks          | Endpoint where the signer of the keys publishes its keys in a JWK Set                                          | [OpenID Connect JWKs Endpoint object](#openid-connect-jwks-endpoint-object)                                                  | TRUE        | TRUE          |
| token         | IdP Authorization Server (AS) endpoint to exchange the authorization code grant for an access token            | [OAuth 2.0 Authorization Server Token Endpoint object](#oauth-2-0-authorization-server-token-endpoint-object)                 | TRUE        | TRUE          |
| userInfo      | Protected resource endpoint that returns claims about the authenticated User                                   | [OpenID Connect Userinfo Endpoint object](#openid-connect-userinfo-endpoint-object)                                          | TRUE        | TRUE          |

```json
{
  "protocol": {
    "type": "OAUTH2",
    "endpoints": {
      "authorization": {
        "url": "https://www.facebook.com/dialog/oauth",
        "binding": "HTTP-REDIRECT"
      },
      "token": {
        "url": "https://graph.facebook.com/v2.5/oauth/access_token",
        "binding": "HTTP-POST"
      }
    }
  }
}
```

```json
{
  "protocol": {
    "type": "OIDC",
    "endpoints": {
      "authorization": {
        "url": "https://idp.example.com/authorize",
        "binding": "HTTP-REDIRECT"
      },
      "token": {
        "url": "https://idp.example.com/token",
        "binding": "HTTP-POST"
      },
      "userInfo": {
        "url": "https://idp.example.com/userinfo",
        "binding": "HTTP-REDIRECT"
      },
      "jwks": {
        "url": "https://idp.example.com/keys",
        "binding": "HTTP-REDIRECT"
      }
    }
  }
}
```

##### OAuth 2.0 and OpenID Connect Credentials object

Client authentication credentials for an [OAuth 2.0 Authorization Server (AS)](https://tools.ietf.org/html/rfc6749#section-2.3)

| Property      | Description                                                                                                 | DataType | Nullable | Readonly |
| ------------- | ----------------------------------------------------------------------------------------------------------- | -------- | -------- | -------- | --------- | --------- |
| client        | Client infomation                                                                                           | [OAuth 2.0 And OpenID Connect Client Object](#oauth-2-0-and-openid-connect-client-object)   | FALSE    | FALSE    |
| signing       | Information used to sign the request, currently only Apple IdP supports it                                  | [Apple Client Signing Object](#apple-client-signing-object)   | TRUE    | FALSE    |


##### OAuth 2.0 and OpenID Connect Client object
| Property      | Description                                                                                                 | DataType | Nullable | Readonly | MinLength | MaxLength |
| ------------- | ----------------------------------------------------------------------------------------------------------- | -------- | -------- | -------- | --------- | --------- |
| client_id     | [Unique identifier](https://tools.ietf.org/html/rfc6749#section-2.2) issued by the AS for the Okta IdP instance | String   | FALSE    | FALSE    | 1         | 1024      |
| client_secret | [Client secret issued](https://tools.ietf.org/html/rfc6749#section-2.3.1) by the AS for the Okta IdP instance   | String   | TRUE (Only Nullable for Apple IdP)     | FALSE    | 1         | 1024      |

> **Note:** You must complete client registration with the IdP Authorization Server for your Okta IdP instance to obtain client credentials.

```json
{
  "protocol": {
    "type": "OAUTH2",
    "credentials": {
      "client": {
        "client_id": "your-client-id",
        "client_secret": "your-client-secret"
      }
    }
  }
}
```

```json
{
  "protocol": {
    "type": "OIDC",
    "credentials": {
      "client": {
        "client_id": "your-client-id",
        "client_secret": "your-client-secret"
      }
    }
  }
}
```

##### Apple Client Signing object

The information is used to generate the secret JSON Web Token for the token requests to Apple IdP.

| Property      | Description                                                                                                 | DataType | Nullable | Readonly | MinLength | MaxLength |
| ------------- | ----------------------------------------------------------------------------------------------------------- | -------- | -------- | -------- | --------- | --------- |
| privateKey    | The  PKCS #8 encoded private key that you created for the client and downloaded from Apple                  | String   | TRUE     | FALSE    | 1         | 1024      |
| kid           | The Key ID that you obtained from Apple when you created the private key for the client                     | String   | FALSE    | FALSE    | 1         | 1024      |
| teamId        | The Team ID associated with your Apple developer account                                                    | String   | FALSE    | FALSE    | 1         | 1024      |

> **Note:** privateKey is required for a CREATE request. For an UPDATE request, it can be null and keeps the existing value if it is null. privateKey isn't returned for LIST and GET requests or UDPATE requests if it is null.

```json
{
  "protocol": {
    "type": "OIDC",
    "credentials": {
      "signing": {
        "privateKey": "MIGTAgEAMBM........Cb9PnybCnzDv+3cWSGWqpAIsQQZ",
        "kid": "test key id",
        "teamId": "test team id"
      }
    }
  }
}
```
> **Note:** The key is truncated for brevity.


#### MTLS Protocol

Protocol settings for the [MTLS Protocol](https://tools.ietf.org/html/rfc5246#section-7.4.4):

| Property    | Description                                                        | DataType                                                          | Nullable | Readonly |
| ----------- | ------------------------------------------------------------------ | ----------------------------------------------------------------- | -------- | -------- |
| credentials | Description of the issuing cert                                    | [MTLS Credentials Object](#mtls-credentials-object)               | FALSE    | FALSE    |
| endpoints   | Location of authentication endpoint                                | [MTLS Endpoints Object](#mtls-endpoints-object)                   | FALSE    | FALSE    |
| type        | The only supported value is `MTLS`                                 | String                                                            | FALSE    | TRUE     |

```json
{
  "type": "MTLS",
  "endpoints": {
    "sso": {
      "url": "https://${yourOktaDomain}.okta.com/login/cert"
    }
  },
  "credentials": {
    "trust": {
      "issuer": "CN=Test Smart Card, OU=Test OU, O=Test O, C=US",
      "audience": null,
      "kid":"45dec5ff-8cdc-48c0-85fe-a4869f1753dc",
      "revocation":"CRL",
      "revocationCacheLifetime":2880
    }
  }
}
```

##### MTLS Endpoints Object

| Property | Description                                                                           | DataType                                                                                            | Nullable | Readonly |
| -------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------- | -------- |
| sso      | IdP's `SingleSignOnService` endpoint                                                  | [MTLS SSO Endpoint Object](#mtls-single-sign-on-sso-endpoint-object)                                | FALSE    | TRUE     |

###### MTLS Single Sign-On (SSO) Endpoint Object

The Single Sign-On (SSO) endpoint is the IdP's `SingleSignOnService` endpoint:

| Property    | Description                                                                        | DataType                         | Nullable | Readonly | MinLength | MaxLength | Validation                                      |
| ----------- | ---------------------------------------------------------------------------------- | -------------------------------- | -------- | -------- | --------- | --------- | ----------------------------------------------- |
| url         | URL of binding-specific endpoint     | String                           | FALSE    | TRUE    | 11        | 1014      | [RFC 3986](https://tools.ietf.org/html/rfc3986) |

Property Details

```json
{
  "protocol": {
    "type": "MTLS",
    "endpoints": {
      "sso": {
        "url": "https://${yourOktaDomain}.okta.com/login/cert",
      }
    }
  }
}
```
###### MTLS Credentials Object

Certificate chain description for verifying assertions from the Smart Card.

| Property   | Description                                                                        | DataType                                                                   | Nullable | Readonly |
| ---------- | ---------------------------------------------------------------------------------- | --------------------                                                       | -------- | -------- |
| trust      | Object containing information for verifying assertions from the IdP                | [MTLS Trust Credentials Object](#mtls-trust-credentials-object)            | FALSE    | FALSE    |

###### MTLS Trust Credentials Object

Certificate chain description for verifying assertions from the Smart Card.

| Property                | Description                                                                                            | DataType | Nullable | Readonly | MinLength | MaxLength | Validation                                 |
| --------                | -----------------------------------------------------------------------------------------------------  | -------- | -------- | -------- | --------- | --------- | ------------------------------------------ |
| audience                | not used                                                                                               | String   | TRUE     | FALSE    | 1         | 1024      | [URI](https://tools.ietf.org/html/rfc3986) |
| issuer                  | Description of the certificate issuer                                                                  | String   | FALSE    | FALSE    | 1         | 1024      |                                            |
| kid                     | [Key ID](#identity-provider-key-store-operations) reference to the IdP's X.509 signature certificate   | String   | FALSE    | FALSE    | 36        | 36        | Valid IdP Key ID reference                 |
| revocation              | Mechanism to validate the certificate                                                                  | String   | FALSE    | FALSE    | 36        | 36        | CRL                                        |
| revocationCacheLifetime | Time in minutes to cache the certificate revocation information                                        | Number   | FALSE    | FALSE    | 1         | 4320      | from 1 minute to 72 hours                  |

```json
{
  "protocol": {
    "type": "MTLS",
    "credentials": {
      "trust": {
        "issuer": "CN=Test Smart Card, OU=Test OU, O=Test O, C=US",
        "audience": null,
        "kid":"45dec5ff-8cdc-48c0-85fe-a4869f1753dc",
        "revocation":"CRL",
        "revocationCacheLifetime":2880
      }
    }
  }
}
```

### Policy Object

| Property     | Description                                                                                    | DataType                                                  | Nullable | Readonly |
| ------------ | ---------------------------------------------------------------                                | -------------------------------------------               | -------- | -------- |
| accountLink  | Policy rules to link an IdP User to an existing Okta User                                      | [Account Link Policy object](#account-link-policy-object) | FALSE    | FALSE    |
| maxClockSkew | Maximum allowable clock skew when processing messages from the IdP                             | Number                                                    | FALSE    | FALSE    |
| provisioning | Policy rules to just-in-time (JIT) provision an IdP User as a new Okta User                    | [Provisioning Policy object](#provisioning-policy-object) | FALSE    | FALSE    |
| subject      | Policy rules to select the Okta sign-in identifier for the IdP User and determine matching rules | [Subject Policy object](#subject-policy-object)           | FALSE    | FALSE    |

```json
{
  "policy": {
    "provisioning": {
      "action": "AUTO",
      "profileMaster": true,
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
      "filter": null,
      "matchType": "USERNAME"
    },
    "maxClockSkew": 120000
  }
}
```

#### IdP type policy actions

| Type         | User Provisioning Actions     | Group Provisioning Actions            | Account Link Actions          | Account Link Filters  |
| ------------ | ----------------------------- | ------------------------------------- | ----------------------------- | --------------------  |
| `FACEBOOK`   | `AUTO`, `CALLOUT`, `DISABLED` | `NONE` or `ASSIGN`                    | `AUTO`, `CALLOUT`, `DISABLED` | `groups`              |
| `GOOGLE`     | `AUTO`, `CALLOUT`, `DISABLED` | `NONE` or `ASSIGN`                    | `AUTO`, `CALLOUT`, `DISABLED` | `groups`              |
| `LINKEDIN`   | `AUTO`, `CALLOUT`, `DISABLED` | `NONE` or `ASSIGN`                    | `AUTO`, `CALLOUT`, `DISABLED` | `groups`              |
| `SAML2`      | `AUTO` or `DISABLED`          | `NONE`, `ASSIGN`, `APPEND`, or `SYNC` | `AUTO`                        |                       |
| `X509`       | `DISABLED`                    | No support for JIT provisioning       |                               |                       |

> **Note:** `CALLOUT` is a <ApiLifecycle access="deprecated" /> User provisioning action and Account Link action. 

#### Provisioning Policy object

Specifies the behavior for just-in-time (JIT) provisioning of an IdP User as a new Okta User and their Group memberships.

| Property                                     | Description                                                                       | DataType                                                              | Nullable | Readonly |
| ------------------------------------         | -----------------------------------                                               | -----------------------                                               | -------- | -------- |
| action                                       | Provisioning action for an IdP User during authentication                         | [User Provisioning Action Type](#user-provisioning-action-type)       | FALSE    | FALSE    |
| callout <ApiLifecycle access="deprecated" /> | Webhook settings for the `CALLOUT` action                                         | [Callout object](#callout-object)                                     | TRUE     | FALSE    |
| conditions                                   | Conditional behaviors for an IdP User during authentication                       | [Provisioning Conditions object](#provisioning-conditions-object)     | FALSE    | FALSE    |
| groups                                       | Provisioning settings for a User's Group memberships                              | [Group Provisioning Policy object](#group-provisioning-policy-object) | FALSE    | FALSE    |
| profileMaster                                | Determines if the IdP should act as a source of truth for User profile attributes | Boolean                                                               | FALSE    | FALSE    |


```json
{
  "provisioning": {
    "action": "AUTO",
    "profileMaster": true,
    "groups": {
      "action": "SYNC",
      "sourceAttributeName": "Groups",
      "filter": [
        "00gak46y5hydV6NdM0g4"
      ]
    },
    "conditions": {
      "deprovisioned": {
        "action": "NONE"
      },
      "suspended": {
        "action": "NONE"
      }
    }
  }
}
```

##### IdP type Provisioning Policy actions

The follow provisioning actions are supported by each IdP provider:

| Type         | User Provisioning Actions     | Group Provisioning Actions            |
| ------------ | ----------------------------- | ------------------------------------- |
| `FACEBOOK`   | `AUTO`, `CALLOUT`, `DISABLED` | `NONE` or `ASSIGN`                    |
| `GOOGLE`     | `AUTO`, `CALLOUT`, `DISABLED` | `NONE` or `ASSIGN`                    |
| `LINKEDIN`   | `AUTO`, `CALLOUT`, `DISABLED` | `NONE` or `ASSIGN`                    |
| `SAML2`      | `AUTO` or `DISABLED`          | `NONE`, `ASSIGN`, `APPEND`, or `SYNC` |
| `X509`       | `DISABLED`                    | No support for JIT provisioning       |

> **Note:** `CALLOUT` is a <ApiLifecycle access="deprecated" /> User provisioning action.

##### User provisioning action type

Specifies the User provisioning action during authentication when an IdP User isn't linked to an existing Okta User.

| Action Type | Description                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| `AUTO`                                         | The IdP User profile is transformed through defined universal directory profile mappings to an Okta User profile and automatically provisioned as an Okta User.                                   |
| `CALLOUT` <ApiLifecycle access="deprecated" /> | Okta calls out to an external web service during authentication to validate the IdP User profile, determine whether to provision a new Okta User, and define the resulting Okta User profile. |
| `DISABLED`                                     | Okta rejects the authentication request and skips provisioning of a new Okta User if the IdP User isn't linked to an existing Okta User.                                                      |

**Property details**

* To successfully provision a new Okta User, just-in-time (JIT) provisioning must be enabled in your organization security settings for `AUTO` or `CALLOUT` actions.
* If the target username is not unique or the resulting Okta User profile is missing a required profile attribute, JIT provisioning may fail.
* New Okta Users are provisioned with either a `FEDERATION` or `SOCIAL` authentication provider depending on the IdP `type`.

##### Group Provisioning Policy object

| Property            | Description                                                                                                 | DataType                                                          | Nullable | Readonly | MinLength | MaxLength |
| ------------------  | ---------------------------------------------------                                                         | ------------------------------------                              | -------- | -------- | --------- | --------- |
| action              | Provisioning action for the IdP User's Group memberships                                                        | [Group Provisioning Action Type](#group-provisioning-action-type) | FALSE    | FALSE    |           |           |
| assignments         | List of `OKTA_GROUP` Group identifiers to add an IdP User as a member with the `ASSIGN` action              | Array of String (`OKTA_GROUP` IDs)                                | TRUE     | FALSE    |           |           |
| filter              | Whitelist of `OKTA_GROUP` Group identifiers that are allowed for the `APPEND` or `SYNC` provisioning action | Array of String (`OKTA_GROUP` IDs)                                | TRUE     | FALSE    |           |           |
| sourceAttributeName | IdP User profile attribute name (case-insensitive) for an array value that contains Group memberships       | String                                                            | TRUE     | FALSE    | 0         | 1024      |

```json
{
  "groups": {
    "action": "ASSIGN",
    "assignments": [
      "00gak46y5hydV6NdM0g4"
    ]
  }
}
```


```json
{
  "groups": {
    "action": "SYNC",
    "sourceAttributeName": "Groups",
    "filter": [
      "00gak46y5hydV6NdM0g4"
    ]
  }
}
```

###### Group provisioning action type

The Group provisioning action for an IdP User:

| Action      | Description                                                                                                                                                        | Existing OKTA_GROUP Memberships                                                               | Existing APP_GROUP Memberships                     | Existing BUILT_IN Memberships                |
| ----------- | ---------------------------------                                                                                                                                  | ------------------------------------------------------                                        | -------------------------------------------------- | -------------------------------------------- |
| `APPEND`    | Adds a User to any Group defined by the IdP as a value of the `sourceAttributeName` array that matches the name of the whitelisted Group defined in the `filter` | Unchanged                                                                                     | Unchanged                                          | Unchanged                                    |
| `ASSIGN`    | Assigns a User to Groups defined in the `assignments` array                                                                                                          | Unchanged                                                                                     | Unchanged                                          | Unchanged                                    |
| `NONE`      | Skips processing of Group memberships                                                                                                                              | Unchanged                                                                                     | Unchanged                                          | Unchanged                                    |
| `SYNC`      | Group memberships are mastered by the IdP as a value of the `sourceAttributeName` array that matches the name of the whitelisted Group defined in the `filter` | Removed if not defined by the IdP in `sourceAttributeName` and matching name of the Group in `filter` | Unchanged                                          | Unchanged                                    |

> **Note:** Group provisioning action is processed independently from profile mastering. You can sync Group memberships through SAML with profile mastering disabled.

###### Group provisioning action examples

**Organization Groups**

| ID                   | Name                    | Type         |
| -------------------- | ---------------------   | ------------ |
| 00g51vdPerxUiLarG0g4 | Domain Users            | `APP_GROUP`  |
| 00gak46y5hydV6NdM0g4 | Cloud Users             | `OKTA_GROUP` |
| 00ggniobeT51fBl0B0g3 | Everyone                | `BUILT_IN`   |
| 00gjg5lzfBpn62wuF0g3 | MFA Users               | `OKTA_GROUP` |
| 00glxpsrGUKMnSPss0g3 | Enterprise IdP Users    | `OKTA_GROUP` |

**Existing Group memberships for an IdP User**

| ID                   | Name           | Type         |
| -------------------- | ------------   | ------------ |
| 00g51vdPerxUiLarG0g4 | Domain Users   | `APP_GROUP`  |
| 00gak46y5hydV6NdM0g4 | Cloud Users    | `OKTA_GROUP` |
| 00ggniobeT51fBl0B0g3 | Everyone       | `BUILT_IN`   |

**IdP Assertion**

```xml
<saml:AttributeStatement
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <saml:Attribute Name="groups">
        <saml:AttributeValue xsi:type="xs:anyType">Enterprise IdP Users</saml:AttributeValue>
        <saml:AttributeValue xsi:type="xs:anyType">West Coast Users</saml:AttributeValue>
        <saml:AttributeValue xsi:type="xs:anyType">Cloud Users</saml:AttributeValue>
    </saml:Attribute>
</saml:AttributeStatement>
```

**Provisioning policy action results**

| Action   | Source Attribute Name   | Assignments            | Filter                 | Group Membership Results                                         |
| -------- | ---------------------   | --------------------   | --------------------   | ---------------------------------------------------------------  |
| `APPEND` | Groups                  |                        | 00glxpsrGUKMnSPss0g3   | **Enterprise IdP Users**, Cloud Users, Domain Users, & Everyone  |
| `ASSIGN` |                         | 00gjg5lzfBpn62wuF0g3   |                        | **MFA Users**, Cloud Users, Domain Users, & Everyone             |
| `NONE`   |                         |                        |                        | Cloud Users, Domain Users, & Everyone                            |
| `SYNC`   | Groups                  |                        | 00glxpsrGUKMnSPss0g3   | **Enterprise IdP Users**, Domain Users, & Everyone               |

###### Provisioning Conditions object

| Property           | Description                                                              | DataType                                                          | Nullable | Readonly |
| -------------      | ------------------------------------------------------------------------ | ----------------------------------------------------------------- | -------- | -------- |
| deprovisioned      | Behavior for a previously deprovisioned IdP User during authentication   | [Deprovisioned Condition object](#deprovisioned-condition-object) | FALSE    | FALSE    |
| suspended          | Behavior for a previously suspended IdP User during authentication       | [Suspended Condition object](#suspended-condition-object)         | FALSE    | FALSE    |

```json
{
  "deprovisioned": {
    "action": "NONE"
  },
  "suspended": {
    "action": "NONE"
  }
}
```

###### Deprovisioned Condition object

| Property    | Description                                                            | DataType                                                          | Nullable   | Readonly      |
| -------     | ---------------------------------------------------------------------- | ----------------------------------------------------------------- | --------   | ----------    |
| action      | Action for a previously deprovisioned IdP User during authentication   | [Deprovisioned Action Type](#deprovisioned-action-type)           | FALSE      | FALSE         |

```json
{
  "action": "NONE"
}
```

###### Deprovisioned action type

Specifies the action during authentication when an IdP User is linked to a previously deprovisioned Okta User.

| Action Type  | Description                                                                                                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NONE`       | Take no action. If an IdP User that matches a previously deprovisioned Okta User attempts to authenticate, authentication fails.      |
| `REACTIVATE` | If an IdP User that matches a previously deprovisioned Okta User attempts to authenticate, reactivate the matching User in Okta and allow the authentication attempt to proceed. |

###### Suspended Condition object

| Property | Description                                                            | DataType                                                          | Nullable | Readonly |
| -------  | ---------------------------------------------------------------------- | ----------------------------------------------------------------- | -------- | -------- |
| action   | Action for a previously suspended IdP User during authentication       | [Suspended Action Type](#suspended-action-type)                   | FALSE    | FALSE    |

```json
{
  "action": "NONE"
}
```

###### Suspended action type

Specifies the action during authentication when an IdP User is linked to a previously suspended Okta User.

| Action Type  | Description                                                                                                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NONE`       | Take no action. If an IdP User that matches a previously suspended Okta User attempts to authenticate, authentication fails.                          |
| `UNSUSPEND`  | If an IdP User that matches a previously suspended Okta User attempts to authenticate, unsuspend the matching User in Okta and allow the authentication attempt to proceed.     |

#### Account Link Policy object

Specifies the behavior for linking an IdP User to an existing Okta User.

| Property                                     | Description                                           | DataType                                                  | Nullable | Readonly |
| --------                                     | ----------------------------------------------------- | --------------------------------------------------------- | -------- | -------- |
| action                                       | Specifies the account linking action for an IdP User  | [Account Link Action Type](#account-link-action-type)     | FALSE    | FALSE    |
| callout <ApiLifecycle access="deprecated" /> | Webhook settings for the `CALLOUT` action             | [Callout object](#callout-object)                         | TRUE     | FALSE    |
| filter                                       | Whitelist for link candidates                         | [Account Link Filter object](#account-link-filter-object) | TRUE     | FALSE    |

```json
{
  "accountLink": {
    "filter": {
      "groups": {
        "include": [
          "00gjg5lzfBpn62wuF0g3"
        ]
      }
    },
    "action": "AUTO"
  }
}
```

##### IdP type Account Link Policy actions

The following Account Link actions are supported by each IdP provider:

| Type         | Account Link Actions          | Account Link Filters |
| ------------ | ----------------------------- | -------------------- |
| `FACEBOOK`   | `AUTO`, `CALLOUT`, `DISABLED` | `groups`             |
| `GOOGLE`     | `AUTO`, `CALLOUT`, `DISABLED` | `groups`             |
| `LINKEDIN`   | `AUTO`, `CALLOUT`, `DISABLED` | `groups`             |
| `OIDC`       | `AUTO`                        |                      |
| `SAML2`      | `AUTO`                        |                      |

> **Note:** `CALLOUT` is a <ApiLifecycle access="deprecated" /> account link action.

##### Account Link action type

The Account Link action for an IdP User during authentication:

| Action Type                                    | Description                                                                                                                                                                            |
| -----------                                    | ------------------------------------------------------------------------------------------------------------------------------------------------------------------                     |
| `AUTO`                                         | The IdP User is automatically linked to an Okta User when the transformed IdP User matches an existing Okta User according to [subject match rules](#subject-policy-object).           |
| `CALLOUT` <ApiLifecycle access="deprecated" /> | Okta calls out to an external web service during authentication to validate the IdP User profile and determine whether to link the IdP User to an Okta User candidate.                 |
| `DISABLED`                                     | Okta never attempts to link the IdP User to an existing Okta User, but may still attempt to provision a new Okta User (See [Provisioning Action Type](#user-provisioning-action-type). |


```json
{
  "accountLink": {
    "filter": {
      "groups": {
        "include": [
          "00gak46y5hydV6NdM0g4"
        ]
      }
    },
    "action": "AUTO"
  }
}
```

##### Account Link Filter object

Specifies Group memberships to restrict which Users are available for account linking by an IdP.

| Property | Description                                      | DataType                                                                | Nullable | Readonly
| -------- | ------------------------------------------------ | ----------------------------------------------------------------------- | -------- | -------- |
| groups   | Group memberships to determine link candidates   | [Groups Account Link Filter object](#groups-account-link-filter-object) | TRUE     | FALSE    |

```json
{
  "filter": {
    "groups": {
      "include": [
        "00gjg5lzfBpn62wuF0g3"
      ]
    }
  }
}
```

###### Groups Account Link Filter object

Defines a whitelist of Group membership to restrict which Users are available for account linking by an IdP.

| Property | Description                                                   | DataType                     | Nullable | Readonly |
| -------- | ------------------------------------------------------------- | ---------------------------- | -------- | -------- |
| include  | Specifies the whitelist of Group identifiers to match against | Array of String (Group IDs)  | TRUE     | FALSE    |

> **Note:** Group memberships are restricted to type `OKTA_GROUP`.

```json
{
  "groups": {
    "include": [
      "00gjg5lzfBpn62wuF0g3"
    ]
  }
}
```

#### Subject Policy object

Specifies the behavior for establishing, validating, and matching a username for an IdP User.

| Property         | Description                                                                                                                         | DataType                                               | Nullable | Readonly | MinLength | MaxLength | Validation                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | -------- | -------- | --------- | --------- | ------------------------------------------------------------------- |
| filter           | Optional [regular expression pattern](https://en.wikipedia.org/wiki/Regular_expression) used to filter untrusted IdP usernames      | String                                                 | TRUE     | FALSE    | 0         | 1024      |                                                                     |
| matchAttribute   | Okta User profile attribute for matching a transformed IdP username. Only for matchType `CUSTOM_ATTRIBUTE` | String      | TRUE    | FALSE    |           |           |  See `matchAttribute` Validation  |
| matchType        | Determines the Okta User profile attribute match conditions for account linking and authentication of the transformed IdP username  | `USERNAME`, `EMAIL`, `USERNAME_OR_EMAIL` or `CUSTOM_ATTRIBUTE`      | FALSE    | FALSE    |           |           |
| userNameTemplate | [Okta EL Expression](/docs/reference/okta-expression-language/) to generate or transform a unique username for the IdP User           | [UserName Template object](#username-template-object)  | FALSE    | FALSE    |           |           | [Okta EL Expression](/docs/reference/okta-expression-language/)       |

`matchAttribute` Validation

The `matchAttribute` must be a valid Okta User profile attribute of one of the following types:

* String (with no format or 'email' format only)
* Integer
* Number

**Property details**

* Defining a [regular expression pattern](https://en.wikipedia.org/wiki/Regular_expression) to filter untrusted IdP usernames for security purposes is **highly recommended**, especially if you have multiple IdPs connected to your organization. The filter prevents an IdP from issuing an assertion for any User including partners or directory Users in your Okta organization.

For example, the filter pattern `(\S+@example\.com)` allows only Users that have an `@example.com` username suffix and rejects assertions that have any other suffix such as `@corp.example.com` or `@partner.com`.

* Only `SAML2` IdP providers support the `filter` property.

```json
{
  "subject": {
    "userNameTemplate": {
      "template": "idpuser.subjectNameId"
    },
    "filter": null,
    "matchType": "USERNAME"
  }
}
```

##### UserName Template object

| Property | Description                                                                                                                | DataType | Nullable | Readonly | MinLength | MaxLength | Validation                                                    |
| -------  | ------------------------------------------------------------------------------                                             | -------- | -------- | -------- | --------- | --------- | ----------------------------------------------                |
| template | [Okta EL Expression](/docs/reference/okta-expression-language/) to generate or transform a unique username for the IdP User | String   | FALSE    | FALSE    | 9         | 1024      | [Okta EL Expression](/docs/reference/okta-expression-language/) |

**Property details**

* IdP User profile attributes can be referenced with the `idpuser` prefix such as `idpuser.subjectNameId`.

* You must define an IdP User profile attribute before it can be referenced in an Okta EL expression. To define an IdP User attribute policy, you may need to create a new IdP instance without a base profile property, edit the IdP User profile, and then update the IdP instance with an expression that references the IdP User profile attribute that you just created.

```json
{
  "userNameTemplate": {
    "template": "idpuser.subjectNameId"
  }
}
```

#### OAuth 2.0 Authorization Server Authorization endpoint object

Endpoint for an [OAuth 2.0 Authorization Server (AS)](https://tools.ietf.org/html/rfc6749#page-18).

The IdP Authorization Server (AS) endpoints are defined as part of the [IdP provider](#identity-provider-type) and are read-only.

| Property   | Description                                                                       | DataType                       | Nullable    | Readonly     | MinLength      | Validation                                      |
| ---------- | -------------------------------------------------                                 | -----------------------------  | ----------- | ------------ | -------------- | ----------------                                |
| binding    | HTTP binding used to send a request to the IdP Authorization Server (AS) endpoint | `HTTP-POST` or `HTTP-Redirect` | TRUE        | TRUE         |                |                                                 |
| url        | URL of the IdP Authorization Server (AS) authorization endpoint                   | String                         | TRUE        | TRUE         | 11             | [RFC 3986](https://tools.ietf.org/html/rfc3986) |

```json
{
  "authorization": {
    "url": "https://idp.example.com/authorize",
    "binding": "HTTP-REDIRECT"
  }
}
```

#### OAuth 2.0 Authorization Server Token endpoint object

Endpoint for an [OAuth 2.0 Authorization Server (AS)](https://tools.ietf.org/html/rfc6749#page-18)

The IdP Authorization Server (AS) endpoints are defined as part of the [IdP provider](#identity-provider-type) and are read-only.

| Property   | Description                                                                 | DataType                       | Nullable    | Readonly     | MinLength      | Validation                                      |
| ---------- | -------------------------------------------------                           | ----------------------------   | ----------- | ------------ | -------------- | ----------------                                |
| binding    | HTTP binding used to send a request to the IdP Authorization Server (AS) endpoint | `HTTP-POST` or `HTTP-Redirect` | TRUE        | TRUE         |                |                                                 |
| url        | URL of the IdP Authorization Server (AS) token endpoint                     | String                         | TRUE        | TRUE         | 11             | [RFC 3986](https://tools.ietf.org/html/rfc3986) |

```json
{
  "token": {
    "url": "https://idp.example.com/token",
    "binding": "HTTP-POST"
  }
}
```

#### OpenID Connect Userinfo endpoint object

Endpoint for getting identity information about the User. For more information on the `/userinfo` endpoint, see [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo).

The `OIDC` endpoints are defined as part of the [IdP provider](#identity-provider-type) and are read-only.

| Property   | Description                                                   | DataType                       | Nullable    | Readonly     | MinLength      | Validation                                      |
| ---------- | -------------------------------------------------             | ----------------------------   | ----------- | ------------ | -------------- | ----------------                                |
| binding    | HTTP binding used to send a request to the protected resource | `HTTP-POST` or `HTTP-Redirect` | TRUE        | TRUE         |                |                                                 |
| url        | URL of the resource server's `/userinfo` endpoint             | String                         | TRUE        | TRUE         | 11             | [RFC 3986](https://tools.ietf.org/html/rfc3986) |

```json
{
  "userInfo": {
    "url": "https://idp.example.com/userinfo",
    "binding": "HTTP-POST"
  }
}
```

#### OpenID Connect JWKs endpoint object

Endpoint for the JSON Web Key Set (JWKS) document. This document contains signing keys that are used to validate the signatures from the provider. For more information on JWKS, see [JSON Web Key](https://tools.ietf.org/html/rfc7517).

The `OIDC` endpoints are defined as part of the [IdP provider](#identity-provider-type) and are read-only.

| Property   | Description                                       | DataType                       | Nullable    | Readonly     | MinLength      | Validation                                      |
| ---------- | ------------------------------------------------- | ----------------------------   | ----------- | ------------ | -------------- | ----------------                                |
| binding    | HTTP binding used to send the request             | `HTTP-POST` or `HTTP-Redirect` | TRUE        | TRUE         |                |                                                 |
| url        | URL of the endpoint to the JWK Set                | String                         | TRUE        | TRUE         | 11             | [RFC 3986](https://tools.ietf.org/html/rfc3986) |

```json
{
  "jwks": {
    "url": "https://idp.example.com/keys",
    "binding": "HTTP-POST"
  }
}
```

#### Callout object

> **Note:** This is a <ApiLifecycle access="deprecated" /> feature.

Webhook settings for an IdP provisioning or account link Transaction:

| Property      | Description                                                                   | DataType                                                      | Nullable    | Readonly      | MinLength     | Validation                                      |
| ------------  | --------------------------------------------------------------                | --------------------------------------------------            | ----------- | ------------- | ------------- | ---------------                                 |
| authorization | HTTP authorization scheme and credentials to authenticate the webhook request | [Callout Authorization object](#callout-authorization-object) | TRUE        | FALSE         |               |                                                 |
| binding       | HTTP binding used to send the webhook                                         | `HTTP-POST` or `HTTP-Redirect`                                | FALSE       | FALSE         |               |                                                 |
| url           | URL of binding-specific endpoint to send the webhook                          | String                                                        | FALSE       | FALSE         | 11            | [RFC 3986](https://tools.ietf.org/html/rfc3986) |

```json
{
  "callout": {
    "url": "https://app.example.com",
    "binding": "HTTP-POST",
    "authorization": {
      "basic": {
        "username": "00ugr7Wf8PoSmPXbS0g3",
        "password": "00065EmIVWf7ln0HcVQNy9T_I7qS8rhjujc1hKHaoW"
      }
    }
  }
}
```

##### Callout Authorization object

Webhook authorization settings for an IdP provisioning or account link Transaction:

| Property   | Description                       | DataType                                                    | Nullable    | Readonly      |
| ---------- | --------------------------------- | ----------------------------------------------------------- | ----------- | ------------- |
| basic      | HTTP Basic Authorization Scheme   | [Basic Authorization Scheme](#basic-authorization-scheme)   | FALSE       | FALSE         |
| bearer     | HTTP Bearer Authorization Scheme  | [Bearer Authorization Scheme](#bearer-authorization-scheme) | FALSE       | FALSE         |
| custom     | Custom key/value HTTP headers     | Object                                                      | FALSE       | FALSE         |

**Property details**

* A null value specifies that no authorization scheme is used for a callout.
* Authorization schemes are mutually exclusive. Specify a single scheme per callout.

###### Basic Authorization scheme

| Property      | Description                              | DataType | Nullable | Readonly |
| ------------- | ---------------------------------------- | -------- | -------- | -------- |
| username      | unique identifier for the service account    | String   | FALSE    | FALSE    |
| password      | service account password                 | String   | FALSE    | FALSE    |

```json
{
  "authorization": {
    "basic": {
      "username": "00ugr7Wf8PoSmPXbS0g3",
      "password": "00065EmIVWf7ln0HcVQNy9T_I7qS8rhjujc1hKHaoW"
    }
  }
}
```

###### Bearer Authorization scheme

| Property      | Description          | DataType | Nullable | Readonly |
| ------------- | -------------------- | -------- | -------- | -------- |
| token         | bearer token value   | String   | FALSE    | FALSE    |

```json
{
  "authorization": {
    "bearer": {
      "token": "00065EmIVWf7ln0HcVQNy9T_I7qS8rhjujc1hKHaoW"
    }
  }
}
```

### Links object

Specifies link relationships. See [Web Linking](http://tools.ietf.org/html/rfc5988) available for the IdP using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification. This object is used for dynamic discovery of related resources and lifecycle operations and is read-only.

| Link Relation Type | Description                                                                                                                       |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| acs                | SAML 2.0 Assertion Consumer Service URL for the Okta SP                                                                               |
| authorize          | OAuth 2.0 authorization endpoint for the IdP [OAuth 2.0 Authorization Code Flow](https://tools.ietf.org/html/rfc6749#section-4.1) |
| clientRedirectUri  | Redirect URI for the [OAuth 2.0 Authorization Code Flow](https://tools.ietf.org/html/rfc6749#section-4.1)                             |
| metadata           | Federation metadata document for the IdP (for example: SAML 2.0 Metadata)                                                                      |
| self               | The primary URL for the IdP                                                                                                       |
| users              | IdP Users                                                                                                                         |

## Identity Provider Transaction object

> **Note:** This is a <ApiLifecycle access="deprecated" /> feature.

The Identity Provider Transaction object represents an account link or just-in-time (JIT) provisioning Transaction.

### Example

```json
{
  "id": "satvklBYyJmwa6qOg0g3",
  "status": "ACCOUNT_JIT",
  "expiresAt": "2016-01-03T23:52:58.000Z",
  "created": "2016-01-03T23:44:38.000Z",
  "idp": {
    "id": "0oabmluDNh2JZi8lt0g4",
    "name": "Facebook",
    "type": "FACEBOOK"
  },
  "context": {
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko)
        Chrome/47.0.2526.106 Safari/537.36",
    "ipAddress": "54.197.192.167"
  },
  "_links": {
    "source": {
      "href": "https://${yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/source"
    },
    "target": {
      "href": "https://${yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/target"
    },
    "cancel": {
      "href": "https://${yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "provision": {
      "href": "https://${yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/lifecycle/provision",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Identity Provider Transaction attributes

All IdP Transactions have the following properties:

| Property      | Description                                                                            | DataType                                                        | Nullable  | Unique   | Readonly |
| ------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------  | ------   | -------- |
| _embedded     | Embedded resources related to the Transaction                                          | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)  | TRUE      | FALSE    | TRUE     |
| _links        | [Discoverable resources](#links-object) related to the Transaction                     | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)  | TRUE      | FALSE    | TRUE     |
| context       | Optional authentication context for the Transaction                                        | [Context object](#identity-provider-transaction-context-object) | FALSE     | FALSE    | TRUE     |
| created       | Timestamp when the Transaction was created                                                 | Date                                                            | FALSE     | FALSE    | TRUE     |
| expiresAt     | Timestamp when the Transaction expires                                                     | Date                                                            | FALSE     | FALSE    | TRUE     |
| id            | Unique key for the Transaction                                                             | String                                                          | FALSE     | TRUE     | TRUE     |
| idp           | Identity Provider for an authenticated User                                               | [IdP Authority object](#identity-provider-authority-object)     | FALSE     | FALSE    | TRUE     |
| sessionToken  | Ephemeral [one-time token](/docs/reference/api/authn/#session-token) used to bootstrap an Okta session      | String                                                          | TRUE      | FALSE    | TRUE     |
| status        | Status of the Transaction                                                                  | `ACCOUNT_JIT`, `ACCOUNT_LINK` or `SUCCESS`                      | FALSE     | FALSE    | TRUE     |

> **Note:** The `sessionToken` is only available for completed transactions with the `SUCCESS` status.

#### Identity Provider Authority object

Metadata about the IdP that authenticated the User:

| Property | Description             | DataType                                          | Nullable  | Unique   | Readonly |
| -------- | ----------------------- | ------------------------------------------------- | --------  | ------   | -------- |
| id       | Unique key for the IdP  | String                                            | FALSE     | TRUE     | TRUE     |
| name     | Unique name for the IdP | String                                            | FALSE     | FALSE    | TRUE     |
| type     | Type of IdP             | [Identity Provider Type](#identity-provider-type) | FALSE     | FALSE    | TRUE     |

```json
{
  "idp": {
    "id": "0oabmluDNh2JZi8lt0g4",
    "name": "Facebook",
    "type": "FACEBOOK"
  }
}
```

#### Identity Provider Transaction Context object

Additional Context that describes the HTTP client for the Transaction:

| Property      | Description                            | DataType                   | Nullable  | Unique   | Readonly |
| ------------- | -------------------------------------- | -------------------------- | --------  | ------   | -------- |
| ipAddress     | Client IP Address for the Transaction      | String                     | FALSE     | FALSE    | TRUE     |
| userAgent     | HTTP User Agent string for the Transaction | String                     | FALSE     | FALSE    | TRUE     |

```json
{
  "context": {
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko)
        Chrome/47.0.2526.106 Safari/537.36",
    "ipAddress": "54.197.192.167"
  }
}
```

### Links object

Specifies link relationships. See [Web Linking](http://tools.ietf.org/html/rfc5988) available for the IdP Transaction using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification. This object is used for dynamic discovery of related resources and lifecycle operations and is read-only.

| Link Relation Type       | Description                                                                                                                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------                                                          |
| cancel                   | Cancels the Transaction        |
| next                     | Completes the Transaction       |
| provision                | Lifecycle operation to just-in-time provision a new [Okta User](/docs/reference/api/users/#user-object) for the IdP User                   |
| source                   | [IdP User](#identity-provider-user-object) for the Transaction                                             |
| target                   | Transformed [Okta User profile](/docs/reference/api/users/#profile-object) for the Transaction through UD Profile Mappings for the IdP     |
| users                    | [Okta User](/docs/reference/api/users/#user-object) candidates for the account link Transaction that match the IdP's [account link policy](#account-link-policy-object) and [subject policy](#subject-policy-object) |

## Identity Provider Key Credential object

The IdP Key Credential object defines a [JSON Web Key](https://tools.ietf.org/html/rfc7517) for a signature or encryption credential for an IdP.

### Example

```json
{
  "kid": "your-key-id",
  "created": "2016-01-03T18:15:47.000Z",
  "lastUpdated": "2016-01-03T18:15:47.000Z",
  "e": "65537",
  "n": "101438407598598116085679865987760095721749307901605456708912786847324207000576780508113360584
        555007890315805735307890113536927352312915634368993759211767770602174860126854831344273970871
        509573365292777620005537635317282520456901584213746937262823585533063042033441296629204165064
        680610660631365266976782082747",
  "kty": "RSA",
  "use": "sig",
  "x5c": [
    "MIIDnjCCAoagAwIBAgIGAVG3MN+PMA0GCSqGSIb3DQEBBQUAMIGPMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5p
     YTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxEDAOBgNVBAMM
     B2V4YW1wbGUxHDAaBgkqhkiG9w0BCQEWDWluZm9Ab2t0YS5jb20wHhcNMTUxMjE4MjIyMjMyWhcNMjUxMjE4MjIyMzMyWjCB
     jzELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTALBgNVBAoMBE9r
     dGExFDASBgNVBAsMC1NTT1Byb3ZpZGVyMRAwDgYDVQQDDAdleGFtcGxlMRwwGgYJKoZIhvcNAQkBFg1pbmZvQG9rdGEuY29t
     MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtcnyvuVCrsFEKCwHDenS3Ocjed8eWDv3zLtD2K/iZfE8BMj2wpTf
     n6Ry8zCYey3mWlKdxIybnV9amrujGRnE0ab6Q16v9D6RlFQLOG6dwqoRKuZy33Uyg8PGdEudZjGbWuKCqqXEp+UKALJHV+k4
     wWeVH8g5d1n3KyR2TVajVJpCrPhLFmq1Il4G/IUnPe4MvjXqB6CpKkog1+ThWsItPRJPAM+RweFHXq7KfChXsYE7Mmfuly8s
     DQlvBmQyxZnFHVuiPfCvGHJjpvHy11YlHdOjfgqHRvZbmo30+y0X/oY/yV4YEJ00LL6eJWU4wi7ViY3HP6/VCdRjHoRdr5L/
     DwIDAQABMA0GCSqGSIb3DQEBBQUAA4IBAQCzzhOFkvyYLNFj2WDcq1YqD4sBy1iCia9QpRH3rjQvMKDwQDYWbi6EdOX0TQ/I
     YR7UWGj+2pXd6v0t33lYtoKocp/4lUvT3tfBnWZ5KnObi+J2uY2teUqoYkASN7F+GRPVOuMVoVgm05ss8tuMb2dLc9vsx93s
     Dt+XlMTv/2qi5VPwaDtqduKkzwW9lUfn4xIMkTiVvCpe0X2HneD2Bpuao3/U8Rk0uiPfq6TooWaoW3kjsmErhEAs9bA7xuqo
     1KKY9CdHcFhkSsMhoeaZylZHtzbnoipUlQKSLMdJQiiYZQ0bYL83/Ta9fulr1EERICMFt3GUmtYaZZKHpWSfdJp9"
  ],
  "x5t#S256": "wzPVobIrveR1x-PCbjsFGNV-6zn7Rm9KuOWOG4Rk6jE"
}
```

### Identity Provider Key Credential properties

IdP credential keys have the following properties:

| Property    | Description                                                                              | DataType | Nullable | Unique | Readonly |
| ----------- | ---------------------------------------------------------------------------------------- | -------- | -------- | ------ | -------- |
| created     | Timestamp when the key was added to the key store                                            | Date     | FALSE    | FALSE  | TRUE     |
| e           | The exponent value for the RSA public key                                                | String   | FALSE    | TRUE   | TRUE     |
| kid         | Unique identifier for the key                                                            | String   | FALSE    | TRUE   | TRUE     |
| kty         | Identifies the cryptographic algorithm family used with the key (Supported value: `RSA`) | String   | FALSE    | FALSE  | TRUE     |
| lastUpdated | Timestamp when the key was last updated                                                      | Date     | FALSE    | FALSE  | TRUE     |
| n           | The modulus value for the RSA public key                                                 | String   | FALSE    | TRUE   | TRUE     |
| use         | Intended use of the public key (Supported value: `sig`)                                  | String   | FALSE    | FALSE  | TRUE     |
| x5c         | Base64-encoded X.509 certificate chain with DER encoding                                 | Array    | FALSE    | TRUE   | FALSE    |
| x5t#S256    | Base64url-encoded SHA-256 thumbprint of the DER encoding of an X.509 certificate         | String   | FALSE    | TRUE   | TRUE     |

> **Note:** IdP signing keys are read-only.

## Identity Provider User object

The Identity Provider User object represents a linked User and their IdP User profile.

### Example

```json
{
  "id": "00ulwodIu7wCfdiVR0g3",
  "externalId": "saml.jackson@example.com",
  "created": "2015-03-10T22:24:55.000Z",
  "lastUpdated": "2016-01-01T02:03:56.000Z",
  "profile": {
    "lastName": "Jackson",
    "subjectNameQualifier": "example.com",
    "subjectSpNameQualifier": "urn:federation:example",
    "authnContextClassRef": null,
    "subjectNameId": "saml.jackson@example.com",
    "subjectConfirmationAddress": null,
    "displayName": "Saml Jackson",
    "mobilePhone": "+1-415-555-5141",
    "email": "saml.jackson@example.com",
    "subjectNameFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
    "firstName": "Saml",
    "subjectSpProvidedId": null,
    "subjectConfirmationMethod": null
  },
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oa1k5d68qR2954hb0g4/users/00ulwodIu7wCfdiVR0g3",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "idp": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oa1k5d68qR2954hb0g4"
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ulwodIu7wCfdiVR0g3"
    }
  }
}
```

### Identity Provider User properties

All linked IdP Users have the following properties:

| Property         | Description                                               | DataType                                                                        | Nullable | Unique | Readonly | MaxLength |
| ---------------- | --------------------------------------------------------- | ----------------------------------------------------------------                | -------- | ------ | -------- | --------- |
| _embedded        | Embedded resources related to the IdP User                | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                  | TRUE     | FALSE  | TRUE     |           |
| _links           | Discoverable resources related to the IdP User            | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                  | TRUE     | FALSE  | TRUE     |           |
| created          | Timestamp when IdP User was created                       | Date                                                                            | FALSE    | FALSE  | TRUE     |           |
| externalId       | Unique IdP-specific identifier for the User                   | String                                                                          | FALSE    | TRUE   | TRUE     | 512       |
| id               | Unique key of the [User](/docs/reference/api/users/)           | String                                                                          | FALSE    | TRUE   | TRUE     |           |
| lastUpdated      | Timestamp when the IdP User was last updated                  | Date                                                                            | FALSE    | FALSE  | TRUE     |           |
| profile          | IdP-specific profile for the User                         | [Identity Provider User Profile object](#identity-provider-user-profile-object) | FALSE    | FALSE  | TRUE     |           |

### Identity Provider User Profile object

Identity Provider User profiles are IdP-specific but may be customized by the Profile Editor in the Admin Console.

![IdP Profile Editor UI](/img/okta-admin-ui-profile-editor-idp.png "IdP Profile Editor UI")

> **Note:** Okta variable names have reserved characters that may conflict with the name of an IdP assertion attribute. You can use the **External name** to define the attribute name as defined in an IdP assertion such as a SAML attribute name.

![IdP Profile Editor Attribute Modal UI](/img/okta-admin-ui-profile-editor-attribute-idp.png "IdP Profile Editor Attribute Modal UI")

#### Example Profile object

```json
{
  "profile": {
    "lastName": "Jackson",
    "subjectNameQualifier": "example.com",
    "subjectSpNameQualifier": "urn:federation:example",
    "authnContextClassRef": null,
    "subjectNameId": "saml.jackson@example.com",
    "subjectConfirmationAddress": null,
    "displayName": "Saml Jackson",
    "mobilePhone": "+1-415-555-5141",
    "email": "saml.jackson@example.com",
    "subjectNameFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
    "firstName": "Saml",
    "subjectSpProvidedId": null,
    "subjectConfirmationMethod": null
  }
}
```

### Links object

Specifies link relationships. See [Web Linking](http://tools.ietf.org/html/rfc5988) available for the IdP User using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification. This object is used for dynamic discovery of related resources and lifecycle operations and is read-only.

| Link Relation Type | Description                                       |
| ------------------ | ----------------------------------                |
| idp                | The IdP that issued the identity                  |
| self               | The primary URL for the IdP User                  |
| users              | The linked [Okta User](/docs/reference/api/users/) |

## Identity Provider CSR object

The CSR object for the IdP defines a CSR for a signature or decryption credential for an IdP.

### Example

```json
{
  "id": "h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
  "created": "2017-03-28T01:11:10.000Z",
  "csr": "MIIC4DCCAcgCAQAwcTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xEzARBgNVBAoMCk9rdGEsIEluYy4xDDAKBgNVBAsMA0RldjESMBAGA1UEAwwJU1AgSXNzdWVyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6m8jHVCr9/tKvvbFN59T4raoCs/78KRm4fSefHQOv1TKLXo4wTLbsqYWRWc5u0sd5orUMQgPQOyj3i6qh13mALY4BzrT057EG1BUNjGg29QgYlnOk2iX890e5BIDMQQEIKFrvOi2V8cLUkLvE2ydRn0VO1Q1frbUkYeStJYC5Api2JQsYRwa+1ZeDH1ITnIzUaugWhW2WB2lSnwZkenne5KtffxMPYVu+IhNRHoKaRA6Z51YNhMJIx17JM2hs/H4Ka3drk6kzDf7ofk/yBpb9yBWyU7CTSQhdoHidxqFprMDaT66W928t3AeOENHBuwn8c2K9WeGG+bELNyQRJVmawIDAQABoCowKAYJKoZIhvcNAQkOMRswGTAXBgNVHREEEDAOggxkZXYub2t0YS5jb20wDQYJKoZIhvcNAQELBQADggEBAA2hsVJRVM+A83X9MekjTnIbt19UNT8wX7wlE9jUKirWsxceLiZBpVGn9qfKhhVIpvdaIRSeoFYS2Kg/m1G6bCvjmZLcrQ5FcEBjZH2NKfNppGVnfC2ugtUkBtCB+UUzOhKhRKJtGugenKbP33zRWWIqnd2waF6Cy8TIuqQVPbwEDN9bCbAs7ND6CFYNguY7KYjWzQOeAR716eqpEEXuPYAS4nx/ty4ylonR8cv+gpq51rvq80A4k/36aoeM0Y6I4w64vhTfuvWW2UYFUD+/+y2FA2CSP4JfctySrf1s525v6fzTFZ3qZbB5OZQtP2b8xYWktMzywsxGKDoVDB4wkH4=",
  "kty": "RSA",
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "publish": {
      "href": "https://${yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Identity Provider CSR properties

| Property         | Description                                                  | DataType                                                                     | Nullable   | Unique     | Readonly  |
| ---------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------  | --------   | ------     | --------  |
| _links           | Discoverable resources related to the CSR                    | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-05)               | TRUE       | FALSE      | TRUE      |
| created          | Timestamp when the CSR was created                               | Date                                                                         | FALSE      | FALSE      | TRUE      |
| csr              | Base64-encoded CSR in DER format                             | String                                                                       | TRUE       | TRUE       | TRUE      |
| id               | Unique identifier for the CSR                                | String                                                                       | FALSE      | TRUE       | TRUE      |
| kty              | Cryptographic algorithm family for the CSR's keypair         | String                                                                       | FALSE      | FALSE      | TRUE      |

## Identity Provider Social Authentication Token object

The Social Authentication Token object provides the tokens and associated metadata provided by social providers during social authentication. However, Okta doesn't import all the User information from a social provider. If the app needs information that isn't imported, it can get a User token from this endpoint, and then make an API call to the social provider with the token to request the additional information.

### Example

```json
{
  "id": "<unique token identifier>",
  "token": "JBTWGV22G4ZGKV3N",
  "tokenType" : "urn:ietf:params:oauth:token-type:access_token",
  "tokenAuthScheme": "Bearer",
  "expiresAt" : "2014-08-06T16:56:31.000Z",
  "scopes"     : [ "openid", "foo" ]
}
```

### Identity Provider Social Authentication Token properties

| Property        | Description                                                                                                                             | DataType                                                  | Nullable    | Unique      | Readonly     |
| --------------- | -----------------------------------------------------------------------------                                                           | --------------------------------------------------------- | ----------- | ----------- | ------------ |
| expiresAt       | The date that the token expires                                                                                                         | Date                                                      | TRUE        | FALSE       | TRUE         |
| id              | Unique identifier for the token                                                                                                         | String                                                    | FALSE       | TRUE        | TRUE         |
| scopes          | The scopes that the token is good for                                                                                                  | Array of Strings                                          | FALSE       | FALSE       | TRUE         |
| token           | The raw token                                                                                                                         | String                                                    | FALSE       | TRUE        | TRUE         |
| tokenAuthScheme | The token authentication scheme as defined by the social provider                                                                     | String                                                    | FALSE       | FALSE       | TRUE         |
| tokenType       | The type of token defined by the [OAuth Token Exchange Spec](https://tools.ietf.org/html/draft-ietf-oauth-token-exchange-07#section-3) | String                                                    | TRUE        | TRUE        | TRUE         |
