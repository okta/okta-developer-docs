---
title: Identity Providers
category: management
redirect_from: docs/api/rest/idps.html
---

# Identity Providers API

The Okta Identity Providers API provides operations to manage federations with external Identity Providers (IDP).
For example, your app can support logging in with credentials from Facebook, Google, LinkedIn, Microsoft, an enterprise IdP using SAML 2.0, or an IdP using the OpenID Connect (`OIDC`) protocol.

## Getting Started

Explore the Identity Providers API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c778cb5f0792b0682a79)

## Setup Guides

Each identity provider (IdP) requires some setup. Use the Okta setup guide for your IdP:

* [Facebook](/authentication-guide/social-login/facebook)
* [Google](/authentication-guide/social-login/google)
* [LinkedIn](/authentication-guide/social-login/linkedin)
* [Microsoft](/authentication-guide/social-login/microsoft)
* [Generic OIDC Identity Providers](/authentication-guide/generic-oidc/#set-up-a-generic-openid-connect-identity-provider)


## Identity Provider Operations

### Add Identity Provider


<ApiOperation method="post" url="/api/v1/idps" />

Adds a new IdP to your organization

- [Add Generic OIDC Identity Provider](#add-generic-openid-connect-identity-provider)
- [Add SAML 2.0 Identity Provider](#add-saml-20-identity-provider)
- [Add Facebook Identity Provider](#add-facebook-identity-provider)
- [Add Google Identity Provider](#add-google-identity-provider)
- [Add LinkedIn Identity Provider](#add-linkedin-identity-provider)
- [Add Microsoft Identity Provider](#add-microsoft-identity-provider)

##### Request Parameters


| Parameter | Description       | Param Type | DataType                                      | Required |
| --------- | ----------------- | ---------- | --------------------------------------------- | -------- |
| idp       | IdP settings      | Body       | [Identity Provider](#identity-provider-model) | TRUE     |

##### Response Parameters


The created [Identity Provider](#identity-provider-model)

#### Add Generic OpenID Connect Identity Provider


Adds a new `OIDC` type IdP to your organization

##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/idps"
```

##### Response Example


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
            "href": "https://{yourOktaDomain}/oauth2/v1/authorize?idp=0oaulob4BFVa4zQvt0g3&client_id={clientId}&response_type={responseType}&response_mode={responseMode}&scope={scopes}&redirect_uri={redirectUri}&state={state}&nonce={nonce}",
            "templated": true,
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "clientRedirectUri": {
            "href": "https://{yourOktaDomain}/oauth2/v1/authorize/callback",
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

Notes:

* You must first add the IdP's signature certificate to the IdP key store before you can add a SAML 2.0 IdP with a `kid` credential reference.
* Don't use `fromURI` to automatically redirect a user to a particular app after successfully authenticating with a third-party IdP. Instead, use [SAML Deep Links](#redirecting-with-saml-deep-links). Using `fromURI` is not tested and not supported. For more information about using deep links for SP-initiated sign on, see [Understanding SP-Initiated Login Flow](https://www.okta.com/integrate/documentation/saml/#understanding-sp-initiated-login-flow).

##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/idps"
```

##### Response Example


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
      "href": "https://{yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/metadata.xml",
      "type": "application/xml",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "acs": {
      "href": "https://{yourOktaDomain}/sso/saml2/0oa62bc8wppPw0UGr0h7",
      "type": "application/xml",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "users": {
      "href": "https://{yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/users",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "deactivate": {
      "href": "https://{yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```
##### Redirecting with SAML Deep Links

Use SAML deep links to automatically redirect the user to an app after successfully authenticating with a third-party IdP. To use deep links, assemble these three parts into a URL:

1. SP ACS URL, for example: `https://{myOktaDomain}.com/sso/saml2/:idpId`
2. The app to which the user is automatically redirected after successfully authenticated with the IdP, for example: `/app/:app-location/:appId/sso/saml`
3. Optionally, If the app is an outbound SAML app, you can specify the relayState passed to it, for example: `?RelayState=:anyUrlEncodedValue`

The deep link for steps 1-3 is: `https://{myOktaDomain}.com/sso/saml2/:idpId/app/:app-location/:appId/sso/saml?RelayState=:anyUrlEncodedValue`

#### Add Facebook Identity Provider


Adds a new `FACEBOOK` type IdP to your organization

##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/idps"
```

##### Response Example


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
      "href": "https://{yourOktaDomain}/oauth2/v1/authorize?idp=0oa62b57p7c8PaGpU0h7&
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
      "href": "https://{yourOktaDomain}/oauth2/v1/authorize/callback",
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

##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/idps"
```

##### Response Example


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
      "href": "https://{yourOktaDomain}/oauth2/v1/authorize?idp=0oa62bfdiumsUndnZ0h7&
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
      "href": "https://{yourOktaDomain}/oauth2/v1/authorize/callback",
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

##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/idps"
```

##### Response Example


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
      "href": "https://{yourOktaDomain}/oauth2/v1/authorize?idp=0oa62bfdjnK55Z5x80h7&
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
      "href": "https://{yourOktaDomain}/oauth2/v1/authorize/callback",
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

##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/idps"
```

##### Response Example


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
      "href": "https://{yourOktaDomain}/oauth2/v1/authorize?idp=0oajmvdFawBih4gey0g3&
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
      "href": "https://{yourOktaDomain}/oauth2/v1/authorize/callback",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```


### Get Identity Provider


<ApiOperation method="get" url="/api/v1/idps/${idpId}" />

Fetches an IdP by `id`

##### Request Parameters


Parameter | Description     | Param Type | DataType | Required |
--------- | --------------- | ---------- | -------- | -------- |
idpId       | `id` of an IdP  | URL        | String   | TRUE     |

##### Response Parameters


[Identity Provider](#identity-provider-model)

##### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/idps/0oa62bfdjnK55Z5x80h7"
```

##### Response Example


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
      "href": "https://{yourOktaDomain}/oauth2/v1/authorize?idp=0oa62bfdjnK55Z5x80h7&
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
      "href": "https://{yourOktaDomain}/oauth2/v1/authorize/callback",
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

- [List Identity Providers with Defaults](#list-identity-providers-with-defaults)
- [List Identity Providers with Name](#find-identity-providers-by-name)
- [List Identity Providers with Type](#find-identity-providers-by-type)

##### Request Parameters


Parameter | Description                                                                                | Param Type | DataType | Required | Default
--------- | ------------------------------------------------------------------------------------------ | ---------- | -------- | -------- | -------
q         | Searches the `name` property of IdPs for matching value                                    | Query      | String   | FALSE    |
type      | Filters IdPs by `type`                                                                     | Query      | String   | FALSE    |
limit     | Specifies the number of IdP results in a page                                              | Query      | Number   | FALSE    | 20
after     | Specifies the pagination cursor for the next page of IdPs                                  | Query      | String   | FALSE    |

Parameter Details

* The `after` cursor should treated as an opaque value and obtained through the next link relationship. See [Pagination](/docs/api/getting_started/design_principles#pagination).
* Search currently performs a startsWith match but it should be considered an implementation detail and may change without notice in the future.

##### Response Parameters


Array of [Identity Provider](#identity-provider-model)

#### List Identity Providers with Defaults


Enumerates all IdPs in your organization

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/idps?limit=20"
```

##### Response Example


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
        "href": "https://{yourOktaDomain}/oauth2/v1/authorize?idp=0oa62b57p7c8PaGpU0h7&
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
        "href": "https://{yourOktaDomain}/oauth2/v1/authorize/callback",
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
        "href": "https://{yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/metadata.xml",
        "type": "application/xml",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "acs": {
        "href": "https://{yourOktaDomain}/sso/saml2/0oa62bc8wppPw0UGr0h7",
        "type": "application/xml",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "users": {
        "href": "https://{yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/users",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "deactivate": {
        "href": "https://{yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/lifecycle/deactivate",
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
        "href": "https://{yourOktaDomain}/oauth2/v1/authorize?idp=0oa62bfdiumsUndnZ0h7&
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
        "href": "https://{yourOktaDomain}/oauth2/v1/authorize/callback",
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
        "href": "https://{yourOktaDomain}/oauth2/v1/authorize?idp=0oa62bfdjnK55Z5x80h7&
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
        "href": "https://{yourOktaDomain}/oauth2/v1/authorize/callback",
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
        "href": "https://{yourOktaDomain}/oauth2/v1/authorize?idp=0oajmvdFawBih4gey0g3&
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
        "href": "https://{yourOktaDomain}/oauth2/v1/authorize/callback",
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
              "href": "https://{yourOktaDomain}/oauth2/v1/authorize?idp=0oaulob4BFVa4zQvt0g3&client_id={clientId}&response_type={responseType}&response_mode={responseMode}&scope={scopes}&redirect_uri={redirectUri}&state={state}&nonce={nonce}",
              "templated": true,
              "hints": {
                  "allow": [
                      "GET"
                  ]
              }
          },
          "clientRedirectUri": {
              "href": "https://{yourOktaDomain}/oauth2/v1/authorize/callback",
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

#### Find Identity Providers by Name


Searches for IdPs by `name` in your organization

Search currently performs a startsWith match but it should be considered an implementation detail and may change without notice in the future.
Exact matches are returned before partial matches.

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/idps?q=Example SAML&limit=10"
```

##### Response Example


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
        "href": "https://{yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/metadata.xml",
        "type": "application/xml",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "acs": {
        "href": "https://{yourOktaDomain}/sso/saml2/0oa62bc8wppPw0UGr0h7",
        "type": "application/xml",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "users": {
        "href": "https://{yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/users",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "deactivate": {
        "href": "https://{yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/lifecycle/deactivate",
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

#### Find Identity Providers by Type


Finds all IdPs with a [specific type](#identity-provider-type)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/idps?type=SAML2"
```

##### Response Example


```http
HTTP/1.1 200 OK
Content-Type: application/json
Link: <https://{yourOktaDomain}/api/v1/idps?limit=20>; rel="self"
Link: <https://{yourOktaDomain}/api/v1/idps?after=0oaxdqpA88PtFNmhu0g3&limit=20>; rel="next"

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
        "href": "https://{yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/metadata.xml",
        "type": "application/xml",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "acs": {
        "href": "https://{yourOktaDomain}/sso/saml2/0oa62bc8wppPw0UGr0h7",
        "type": "application/xml",
        "hints": {
          "allow": [
            "POST"
          ]
        }
      },
      "users": {
        "href": "https://{yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/users",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "deactivate": {
        "href": "https://{yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/lifecycle/deactivate",
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

##### Request Parameters


| Parameter | Description                       | Param Type | DataType                                      | Required |
| --------- | --------------------------------- | ---------- | --------------------------------------------- | -------- |
| id        | id of the IdP to update           | URL        | String                                        | TRUE     |
| idp       | Updated configuration for the IdP | Body       | [Identity Provider](#identity-provider-model) | TRUE     |

All properties must be specified when updating IdP configuration. Partial updates are not supported.

##### Response Parameters


Updated [Identity Provider](#identity-provider-model)

##### Request Example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://{yourOktaDomain}/api/v1/idps/your-idps-id"
```

##### Response Example


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
      "href": "https://{yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/metadata.xml",
      "type": "application/xml",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "acs": {
      "href": "https://{yourOktaDomain}/sso/saml2/0oa62bc8wppPw0UGr0h7",
      "type": "application/xml",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "users": {
      "href": "https://{yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/users",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "activate": {
      "href": "https://{yourOktaDomain}/api/v1/idps/0oa62bc8wppPw0UGr0h7/lifecycle/activate",
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

Removes an IdP from your organization.

* All existing IdP users are unlinked with the highest-order profile master taking precedence for each IdP user.
* Unlinked users keep their existing authentication provider such as `FEDERATION` or `SOCIAL`.

##### Request Parameters


| Parameter | Description                 | Param Type | Data Type | Required |
| --------- | --------------------------- | ---------- | --------- | -------- |
| idpId     | `id` of the IdP to delete   | URL        | String    | TRUE     |

##### Response Parameters


There are no response parameters.

##### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://{yourOktaDomain}/api/v1/idps/0oa1k5d68qR2954hb0g4"
```


##### Response Example


```http
HTTP/1.1 204 No Content
```

## Identity Provider Lifecycle Operations

### Activate Identity Provider


<ApiOperation method="post" url="/api/v1/idps/${idpId}/lifecycle/activate" />

Activates an inactive IdP

##### Request Parameters


| Parameter | Description             | Param Type | DataType | Required |
| --------- | ----------------------- | ---------- | -------- | -------- |
| idpId     | `id` of IdP to activate | URL        | String   | TRUE     |

##### Response Parameters


Activated [Identity Provider](#identity-provider-model)

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://{yourOktaDomain}/api/v1/idps/0oa62bfdiumsUndnZ0h7/lifecycle/activate"
```

##### Response Example


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
      "href": "https://{yourOktaDomain}/oauth2/v1/authorize?idp=0oa62bfdiumsUndnZ0h7&
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
      "href": "https://{yourOktaDomain}/oauth2/v1/authorize/callback",
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

##### Request Parameters


| Parameter | Description               | Param Type | DataType | Required |
| --------- | ------------------------- | ---------- | -------- | -------- |
| idpId     | `id` of IdP to deactivate | URL        | String   | TRUE     |

##### Response Parameters


Deactivated [Identity Provider](#identity-provider-model)

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://{yourOktaDomain}/api/v1/idps/0oa62bfdiumsUndnZ0h7/lifecycle/deactivate"
```

##### Response Example


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
      "href": "https://{yourOktaDomain}/oauth2/v1/authorize?idp=0oa62bfdiumsUndnZ0h7&
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
      "href": "https://{yourOktaDomain}/oauth2/v1/authorize/callback",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

## Identity Provider Transaction Operations

> This is a <ApiLifecycle access="deprecated" /> feature.

Operations for just-in-time provisioning or account linking with a `callout` action (webhook)

All transaction operations require a transaction ID which is obtained as part of the authentication call.

Use `callout` actions when you need to retrieve information from the profile of a user when you link or create them, or to perform other tasks that must be done before the link or create is completed.

Before you can use transaction operations, set up the following:

1. Add or create an app in Okta with settings that support `callout`:
  * **Allowed grant types** must include one or more **Client acting on behalf of a user** options selected.
2. Configure a social IdP with settings that support `callout`:
  * Be sure to complete the setup instructions in the **View Setup Instructions** link
  * Select appropriate scopes for the client you configured in the previous step, and for the IdP as described in the **View Setup Instructions**.
  * In the **Show Advanced Settings** link, be sure that you have either **Account Link Policy** or **Provisioning Policy** set to **Callout**.

Once your IdP and app are set up, you can issue an authentication request and capture the transaction ID to verify your setup. The following example shows a request for an ID token, which is typically a simple request:

```bash
https://{myOktaDomain}.com/oauth2/v1/authorize?
  idp=0oae5emt1lCVpXD2b0h7&
  client_id=B6YnDUIpt6Oq354YYaNR&
  response_type=id_token&
  response_mode=fragment&
  scope=openid&
  redirect_uri=https://httpbin.org/get&state=state&nonce=nonce
```

The response will contain a transaction ID. You can then use the transaction ID to exercise the endpoints in this section. Unfinished or uncanceled transactions end after about ten minutes.

If you aren't receiving a transaction ID, check that:

* The user that you are adding with JIT or linking doesn't already exist in the app. If they do, deactivate and delete.
* You don't have any sessions open for the IdP or the Okta org for the app.

### Get Identity Provider Transaction


<ApiOperation method="get" url="/api/v1/idps/tx/${transactionId}" />

Fetches an IdP transaction by `id`

You must use a `CALLOUT` action for [user provisioning](#user-provisioning-action-type) or [account linking](#account-link-action-type)
to obtain an IdP transaction `id`.

##### Request Parameters


| Parameter     | Description                | Param Type | DataType | Required |
| ---------     | -------------------------- | ---------- | -------- | -------- |
| transactionId | `id` of an IdP transaction | URL        | String   | TRUE     |

##### Response Parameters


[Identity Provider Transaction](#identity-provider-transaction-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3"
```

##### Response Example


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
      "href": "https://{yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/source"
    },
    "target": {
      "href": "https://{yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/target"
    },
    "cancel": {
      "href": "https://{yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "provision": {
      "href": "https://{yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/lifecycle/provision",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Get Source IdP User for IdP Transaction


<ApiOperation method="get" url="/api/v1/idps/tx/${transactionId}/source" />

Fetches the source [IdP user](#identity-provider-user-model) for a transaction

##### Request Parameters


| Parameter     | Description                | Param Type | DataType | Required |
| ---------     | -------------------------- | ---------- | -------- | -------- |
| transactionId | `id` of an IdP transaction | URL        | String   | TRUE     |

##### Response Parameters


[Identity Provider User](#identity-provider-user-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/source"
```

##### Response Example


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
      "href": "https://{yourOktaDomain}/api/v1/idps/0oabmluDNh2JZi8lt0g4"
    }
  }
}
```

### Get Target User for IdP Provision Transaction


<ApiOperation method="get" url="/api/v1/idps/tx/${transactionId}/target" />

Fetches the target transformed [Okta user profile](/docs/api/resources/users/#profile-object) for a just-in-time provisioning transaction

##### Request Parameters


| Parameter     | Description                | Param Type | DataType | Required |
| ---------     | -------------------------- | ---------- | -------- | -------- |
| transactionId | `id` of an IdP transaction | URL        | String   | TRUE     |

##### Response Parameters


[Trasformed Okta User Profile](/docs/api/resources/users/#profile-object)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/source"
```

##### Response Example


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

### List Users for IdP Link Transaction


<ApiOperation method="get" url="/api/v1/idps/tx/${transactionId}/users" />

Enumerates the candidate [Okta users](/docs/api/resources/users/#user-model) for an account link transaction

Link candidates are determined by the IdP's [account link policy](#account-link-policy-object) and [subject policy](#subject-policy-object).

##### Request Parameters


| Parameter     | Description                | Param Type | DataType | Required |
| ---------     | -------------------------- | ---------- | -------- | -------- |
| transactionId | `id` of an IdP transaction | URL        | String   | TRUE     |

##### Response Parameters


Array of [Okta User](/docs/api/resources/users/#user-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/users"
```

##### Response Example


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
        "href": "https://{yourOktaDomain}/api/v1/users/00uc8wfZSNWKlFGZa0g4/lifecycle/suspend",
        "method": "POST"
      },
      "resetPassword": {
        "href": "https://{yourOktaDomain}/api/v1/users/00uc8wfZSNWKlFGZa0g4/lifecycle/reset_password",
        "method": "POST"
      },
      "self": {
        "href": "https://{yourOktaDomain}/api/v1/users/00uc8wfZSNWKlFGZa0g4"
      },
      "changeRecoveryQuestion": {
        "href": "https://{yourOktaDomain}/api/v1/users/00uc8wfZSNWKlFGZa0g4/credentials/change_recovery_question",
        "method": "POST"
      },
      "deactivate": {
        "href": "https://{yourOktaDomain}/api/v1/users/00uc8wfZSNWKlFGZa0g4/lifecycle/deactivate",
        "method": "POST"
      },
      "confirm": {
        "href": "https://{yourOktaDomain}/api/v1/idps/tx/satvkokI9JsOxqsjz0g3/lifecycle/confirm/00uc8wfZSNWKlFGZa0g4",
        "method": "POST"
      }
    }
  }
]
```

### Provision IdP User


<ApiOperation method="post" url="/api/v1/idps/tx/${transactionId}/lifecycle/provision" />

Provisions an IdP user as a new Okta user.

##### Request Parameters


| Parameter     | Description                                                       | Param Type | DataType                                                             | Required | Default                          |
| ---------     | --------------------------------------------------                | ---------- | -----------------------------------------------------                | -------- | -------------------------------- |
| transactionId | `id` of an IdP transaction                                        | URL        | String                                                               | TRUE     |                                  |
| profile       | profile for [Okta user](/docs/api/resources/users/#profile-object) | Body       | [Okta User Profile Object](/docs/api/resources/users/#profile-object) | FALSE    | UD transformed Okta user profile |

##### Response Parameters


[Identity Provider Transaction](#identity-provider-transaction-model)

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "userType": "Social"
  }
}' "https://{yourOktaDomain}/api/v1/idps/tx/satvkokI9JsOxqsjz0g3/lifecycle/provision"
```

##### Response Example


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
      "href": "https://{yourOktaDomain}/api/v1/idps/tx/satvkokI9JsOxqsjz0g3/finish",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://{yourOktaDomain}/api/v1/idps/tx/satvkokI9JsOxqsjz0g3/cancel",
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

Links an IdP user to an [existing Okta user](#list-users-for-idp-link-transaction)

##### Request Parameters


| Parameter     | Description                                                                 | Param Type | DataType                                                             | Required |
| ---------     | --------------------------------------------------------------------------- | ---------- | -----------------------------------------------------                | -------- |
| transactionId | `id` of an IdP transaction                                                  | URL        | String                                                               | TRUE     |
| userId        | `id` of an Okta user [link candidate](#list-users-for-idp-link-transaction) | URL        | String                                                               | TRUE     |
| profile       | profile for [Okta user](/docs/api/resources/users/#profile-object)           | Body       | [Okta User Profile Object](/docs/api/resources/users/#profile-object) | FALSE    |

##### Response Parameters


[Identity Provider Transaction](#identity-provider-transaction-model)

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "userType": "Social"
  }
}' "https://{yourOktaDomain}/api/v1/idps/tx/satvkokI9JsOxqsjz0g3/lifecycle/confirm/00uc8ydZUPiwS2Xud0g4"
```

##### Response Example


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
      "href": "https://{yourOktaDomain}/api/v1/idps/tx/satvkokI9JsOxqsjz0g3/finish",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "cancel": {
      "href": "https://{yourOktaDomain}/api/v1/idps/tx/satvkokI9JsOxqsjz0g3/cancel",
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

Finishes an IdP transaction

No actions are completed when using `callout` until the `/finish` request completes.

#### Request Parameters


| Parameter      | Description                                                                | Datatype      | Required     |
| :------------- | :--------------                                                            | :------------ | :----------- |
| transactionId  | The transaction ID referenced by all intermediate steps in the transaction | String        | TRUE         |

#### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://{yourOktaDomain}/api/v1/idps/tx/sat4h4zexs17NrXWc0h6/finish"
```

#### Response Example

```bash
HTTP/1.1 200 OK
```

### Cancel Identity Provider Transaction


<ApiOperation method="POST" url="/api/v1/idps/tx/${transactionId}/cancel" />

Cancels an IdP transaction

No actions are completed when using `callout` if the transaction is canceled.

#### Request Parameters


| Parameter      | Description                                                                | Datatype      | Required     |
| :------------- | :--------------                                                            | :------------ | :----------- |
| transactionId  | The transaction ID referenced by all intermediate steps in the transaction | String        | TRUE         |

#### Request Example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://{yourOktaDomain}/api/v1/idps/tx/sat4jmxahzdtLDHOm0h6/cancel"
```

#### Response Example

```bash
HTTP/1.1 200 OK
```

## Identity Provider Key Store Operations

### Add X.509 Certificate Public Key


<ApiOperation method="post" url="/api/v1/idps/credentials/keys" />

Adds a new X.509 certificate credential to the IdP key store

##### Request Parameters


| Parameter | Description                                              | Param Type | DataType        | Required |
| --------- | -------------------------------------------------------- | ---------- | --------------- | -------- |
| x5c       | base64-encoded X.509 certificate chain with DER encoding | Body       | Array of String | TRUE     |

##### Response Parameters


[Identity Provider Key Credential](#identity-provider-key-credential-model)

##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/idps/credentials/keys"
```

##### Response Example


```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: https://{yourOktaDomain}/api/v1/idps/credentials/keys/74bb2164-e0c8-4457-862b-7c29ba6cd2c9

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

### Get Key


<ApiOperation method="get" url="/api/v1/idps/credentials/keys/${kid}" />

Gets a specific [IdP Key Credential](#identity-provider-key-credential-model) by `kid`

##### Request Parameters


| Parameter     | Description                                                                 | Param Type | DataType | Required |
| ------------- | --------------------------------------------------------------------------- | ---------- | -------- | -------- |
| kid           | unique key of [IdP Key Credential](#identity-provider-key-credential-model) | URL        | String   | TRUE     |

##### Response Parameters


[Identity Provider Key Credential](#identity-provider-key-credential-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/idps/credentials/keys/your-key-id"
```

##### Response Example


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

### List Keys


<ApiOperation method="get" url="/api/v1/idps/credentials/keys" />

Enumerates IdP key credentials

##### Request Parameters


| Parameter | Description                                               | Param Type | DataType | Required | Default |
| --------- | --------------------------------------------------------- | ---------- | -------- | -------- | ------- |
| limit     | Specifies the number of key results in a page             | Query      | Number   | FALSE    | 20      |
| after     | Specifies the pagination cursor for the next page of keys | Query      | String   | FALSE    |         |

##### Response Parameters


Array of [Identity Provider Key Credential](#identity-provider-key-credential-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/idps/credentials/keys"
```

##### Response Example


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
  }
]
```

### Delete Key


<ApiOperation method="delete" url="/api/v1/idps/credentials/keys/${kid}" />

Deletes a specific [IdP Key Credential](#identity-provider-key-credential-model) by `kid` if it is not currently being used by an Active or Inactive IdP

##### Request Parameters


| Parameter | Description                                                                 | Param Type | DataType | Required |
| --------- | --------------------------------------------------------------------------- | ---------- | -------- | -------- |
| kid       | unique key of [IdP Key Credential](#identity-provider-key-credential-model) | URL        | String   | TRUE     |

##### Response Parameters


There are no response parameters.

##### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://{yourOktaDomain}/api/v1/idps/credentials/keys/74bb2164-e0c8-4457-862b-7c29ba6cd2c9"
```

##### Response Example


```http
HTTP/1.1 204 No Content
```

## Identity Provider Signing Key Store Operations

> EA feature constraint: Okta currently uses the same key for both request signing and decrypting SAML Assertions that have been encrypted by the IdP. Changing your signing key also changes your decryption key.

### Generate New IdP Signing Key Credential


<ApiOperation method="post" url="/api/v1/idps/${idpId}/credentials/keys/generate" />

Generates a new X.509 certificate for an IdP signing key credential to be used for signing assertions sent to the IdP

> To update an IdP with the newly generated key credential, [update your IdP](#update-identity-provider) using the returned key's `kid` in the [signing credential](#saml-20-signing-credentials-object).

##### Request Parameters


| Parameter     | Description                                                                 | Param Type | DataType                                      | Required |
| ------------- | --------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- |
| idpId         | `id` of the IdP                                                             | URL        | String                                        | TRUE     |
| validityYears | expiry of the [IdP Key Credential](#identity-provider-key-credential-model) | Query      | Number                                        | TRUE     |

##### Response Parameters


Return the generated [IdP Key Credential](#identity-provider-key-credential-model)

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/keys/generate?validityYears=2"
```

##### Response Example


```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/keys/akm5hvbbevE341ovl0h7

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

If validityYears is out of range (2 - 10 years), you receive an error response.

```http
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

### List Signing Key Credentials for IdP


<ApiOperation method="get" url="/api/v1/idps/${idpId}/credentials/keys" />

Enumerates signing key credentials for an IdP

##### Request Parameters


| Parameter     | Description        | Param Type | DataType                                      | Required |
| ------------- | ------------------ | ---------- | --------------------------------------------- | -------- |
| idpId         | `id` of the IdP    | URL        | String                                        | TRUE     |

##### Response Parameters


Array of [IdP Key Credential](#identity-provider-key-credential-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/keys"
```

##### Response Example


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


### Get Signing Key Credential for IdP


<ApiOperation method="get" url="/api/v1/idps/${idpId}/credentials/keys/${kid}" />

Gets a specific [IdP Key Credential](#identity-provider-key-credential-model) by `kid`

##### Request Parameters


| Parameter     | Description                                                                     | Param Type | DataType                                      | Required |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- |
| idpId         | `id` of the IdP                                                                 | URL        | String                                        | TRUE     |
| kid           | unique key of [IdP Key Credential](#identity-provider-key-credential-model)     | URL        | String                                        | TRUE     |

##### Response Parameters


[IdP Key Credential](#identity-provider-key-credential-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/keys/akm5hvbbevE341ovl0h7"
```

##### Response Example


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

### Clone Signing Key Credential for IdP


<ApiOperation method="post" url="/api/v1/idps/${idpId}/credentials/keys/${kid}/clone?targetIdpId=${targetIdpId}" />

Clones a X.509 certificate for an IdP signing key credential from a source IdP to target IdP

> Important: Sharing certificates is not a recommended security practice.

##### Request Parameters


| Parameter     | Description                                                                     | Param Type | DataType                                      | Required |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- |
| idpId         | `id` of the source IdP                                                          | URL        | String                                        | TRUE     |
| kid           | Unique key of [IdP Key Credential](#identity-provider-key-credential-model)     | URL        | String                                        | TRUE     |
| targetIdPId   | `id` of the target IdP                                                          | Query      | String                                        | TRUE     |

##### Response Parameters


Returns the cloned [IdP Key Credential](#identity-provider-key-credential-model)

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/keys/SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4/clone?targetIdpId=0oal21k0DVN7DhS3R0g3"
```

##### Response Example


```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: https://{yourOktaDomain}/api/v1/idps/0oal21k0DVN7DhS3R0g3/credentials/keys/SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4

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

If key is already present in the list of key credentials for the target IdP, you receive a 400 error response.

```http
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

### Generate Signing CSR for IdP


<ApiOperation method="post" url="/api/v1/idps/${idpId}/credentials/csrs" />

Generates a new key pair and returns a Certificate Signing Request for it.

> The private key will not be listed in the [Signing Key Credentials for IdP](#list-signing-key-credentials-for-idp) until it is published.

##### Request Parameters


| Parameter     | Description                                                                     | Param Type | DataType                                      | Required |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- |
| idpId         | `id` of the IdP                                                                 | URL        | String                                        | TRUE     |
| metadata      | Metadata for the CSR                                                            | Body       | [CSR Metadata](/docs/api/resources/apps/#csr-metadata-object)      | TRUE     |

##### Response Parameters


Return CSR in PKCS#10 format if the ``Accept`` media type is [application/pkcs10](https://tools.ietf.org/html/rfc5967); or a [CSR model](#identity-provider-csr-model) if the ``Accept`` media type is ``application/json``.

##### Request Example


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
}' "https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/"
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
}' "https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/"
```
##### Response Example


Return CSR in DER format:
```http
HTTP/1.1 201 Created
Location: https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50
Content-Type: application/pkcs10; filename=okta.p10
Content-Transfer-Encoding: base64

MIIC4DCCAcgCAQAwcTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xEzARBgNVBAoMCk9rdGEsIEluYy4xDDAKBgNVBAsMA0RldjESMBAGA1UEAwwJU1AgSXNzdWVyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6m8jHVCr9/tKvvbFN59T4raoCs/78KRm4fSefHQOv1TKLXo4wTLbsqYWRWc5u0sd5orUMQgPQOyj3i6qh13mALY4BzrT057EG1BUNjGg29QgYlnOk2iX890e5BIDMQQEIKFrvOi2V8cLUkLvE2ydRn0VO1Q1frbUkYeStJYC5Api2JQsYRwa+1ZeDH1ITnIzUaugWhW2WB2lSnwZkenne5KtffxMPYVu+IhNRHoKaRA6Z51YNhMJIx17JM2hs/H4Ka3drk6kzDf7ofk/yBpb9yBWyU7CTSQhdoHidxqFprMDaT66W928t3AeOENHBuwn8c2K9WeGG+bELNyQRJVmawIDAQABoCowKAYJKoZIhvcNAQkOMRswGTAXBgNVHREEEDAOggxkZXYub2t0YS5jb20wDQYJKoZIhvcNAQELBQADggEBAA2hsVJRVM+A83X9MekjTnIbt19UNT8wX7wlE9jUKirWsxceLiZBpVGn9qfKhhVIpvdaIRSeoFYS2Kg/m1G6bCvjmZLcrQ5FcEBjZH2NKfNppGVnfC2ugtUkBtCB+UUzOhKhRKJtGugenKbP33zRWWIqnd2waF6Cy8TIuqQVPbwEDN9bCbAs7ND6CFYNguY7KYjWzQOeAR716eqpEEXuPYAS4nx/ty4ylonR8cv+gpq51rvq80A4k/36aoeM0Y6I4w64vhTfuvWW2UYFUD+/+y2FA2CSP4JfctySrf1s525v6fzTFZ3qZbB5OZQtP2b8xYWktMzywsxGKDoVDB4wkH4=
```

Return a [CSR model](#identity-provider-csr-model):

```http
HTTP/1.1 201 Created
Location: https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50
Content-Type: application/json

{
  "id": "h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
  "created": "2017-03-28T01:11:10.000Z",
  "csr": "MIIC4DCCAcgCAQAwcTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xEzARBgNVBAoMCk9rdGEsIEluYy4xDDAKBgNVBAsMA0RldjESMBAGA1UEAwwJU1AgSXNzdWVyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6m8jHVCr9/tKvvbFN59T4raoCs/78KRm4fSefHQOv1TKLXo4wTLbsqYWRWc5u0sd5orUMQgPQOyj3i6qh13mALY4BzrT057EG1BUNjGg29QgYlnOk2iX890e5BIDMQQEIKFrvOi2V8cLUkLvE2ydRn0VO1Q1frbUkYeStJYC5Api2JQsYRwa+1ZeDH1ITnIzUaugWhW2WB2lSnwZkenne5KtffxMPYVu+IhNRHoKaRA6Z51YNhMJIx17JM2hs/H4Ka3drk6kzDf7ofk/yBpb9yBWyU7CTSQhdoHidxqFprMDaT66W928t3AeOENHBuwn8c2K9WeGG+bELNyQRJVmawIDAQABoCowKAYJKoZIhvcNAQkOMRswGTAXBgNVHREEEDAOggxkZXYub2t0YS5jb20wDQYJKoZIhvcNAQELBQADggEBAA2hsVJRVM+A83X9MekjTnIbt19UNT8wX7wlE9jUKirWsxceLiZBpVGn9qfKhhVIpvdaIRSeoFYS2Kg/m1G6bCvjmZLcrQ5FcEBjZH2NKfNppGVnfC2ugtUkBtCB+UUzOhKhRKJtGugenKbP33zRWWIqnd2waF6Cy8TIuqQVPbwEDN9bCbAs7ND6CFYNguY7KYjWzQOeAR716eqpEEXuPYAS4nx/ty4ylonR8cv+gpq51rvq80A4k/36aoeM0Y6I4w64vhTfuvWW2UYFUD+/+y2FA2CSP4JfctySrf1s525v6fzTFZ3qZbB5OZQtP2b8xYWktMzywsxGKDoVDB4wkH4=",
  "kty": "RSA",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "publish": {
      "href": "https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Publish Signing CSR for IdP


<ApiOperation method="post" url="/api/v1/idps/${idpId}/credentials/csrs/${csrModelId}/lifecycle/publish" />

Update the CSR with a signed X.509 certificate and add it into the signing key credentials for the IdP.

> Publishing a certificate will complete the lifecycle of the CSR and it will no longer be acessible.

##### Request Parameters


| Parameter     | Description                                                                     | Param Type | DataType                                                 | Required |
| ------------- | ------------------------------------------------------------------------------- | ---------- | ---------------------------------------------            | -------- |
| idpId         | `id` of the IdP                                                                 | URL        | String                                                   | TRUE     |
| csrModelId    | `id` of [CSR model](#identity-provider-csr-model)                               | URL        | String                                                   | TRUE     |
| certificate   | The signed X.509 certificate                                                    | Body       | X.509 certififcate in ``DER``, ``PEM`` or ``CER`` format | TRUE     |

For ``DER`` and ``CER`` formated certificate, the client can either post in binary or in base64 encoded. If the post is base64 encoded, the ``Content-Transfer-Encoding`` header should be set to ``base64``.

##### Response Parameters


Returns the new [Signing Key Credential](#identity-provider-key-credential-model).

##### Request Example


Publish with X.509 certificate in base64 encoded ``DER``:

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/pkix-cert" \
-H "Authorization: SSWS ${api_token}" \
-H "Content-Transfer-Encoding: base64" \
-d "MIIFgjCCA2qgAwIBAgICEAcwDQYJKoZIhvcNAQELBQAwXjELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMQ0wCwYDVQQKDARPa3RhMQwwCgYDVQQLDANFbmcxDTALBgNVBAMMBFJvb3QwHhcNMTcwMzI3MjEyMDQ3WhcNMTgwNDA2MjEyMDQ3WjB4MQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzETMBEGA1UECgwKT2t0YSwgSW5jLjEQMA4GA1UECwwHSmFua3lDbzEVMBMGA1UEAwwMSWRQIElzc3VlciA3MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmkC6yAJVvFwUlmM9gKjb2d+YK5qHFt+mXSsbjWKKs4EfNm+BoQeeovBZtSACyaqLc8IYFTPEURFcbDQ9DkAL04uUIRD2gaHYY7uK0jsluEaXGq2RAIsmzAwNTzkiDw4q9pDL/q7n0f/SDt1TsMaMQayB6bU5jWsmqcWJ8MCRJ1aJMjZ16un5UVx51IIeCbe4QRDxEXGAvYNczsBoZxspDt28esSpq5W0dBFxcyGVudyl54Er3FzAguhgfMVjH+bUec9j2Tl40qDTktrYgYfxz9pfjm01Hl4WYP1YQxeETpSL7cQ5Ihz4jGDtHUEOcZ4GfJrPzrGpUrak8Qp5xcwCqQIDAQABo4IBLjCCASowCQYDVR0TBAIwADARBglghkgBhvhCAQEEBAMCBkAwMwYJYIZIAYb4QgENBCYWJE9wZW5TU0wgR2VuZXJhdGVkIFNlcnZlciBDZXJ0aWZpY2F0ZTAdBgNVHQ4EFgQUVqJukDmyENw/2pTApbxc/HRKbngwgZAGA1UdIwSBiDCBhYAUFx245ZZXqWTTbARfMlFWN77L9EahYqRgMF4xCzAJBgNVBAYTAlVTMQswCQYDVQQIDAJDQTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEMMAoGA1UECwwDRW5nMQ0wCwYDVQQDDARSb290ggkAlIfpwZjO5o8wDgYDVR0PAQH/BAQDAgWgMBMGA1UdJQQMMAoGCCsGAQUFBwMBMA0GCSqGSIb3DQEBCwUAA4ICAQCcoBSRtY+9cJY00hLvq6AloYZcdn/kUQupfmyz4n3lKE3wV2FB0swKnK0QDi8iNuQJFdag/19vDHC4/LhoSuv1Q+KXM61pPZVRXXPyC1+e7Y6hj93tEI5HcqLPcDRH1AIG2l8tE7LBn+MQB5Vh6oxjG2IdoWxg6abMfISU+MauPWql4vMDUWo9iNShAo44Z5fd+nuz+hlAinU9Xn9Jf2QsfKvcbMRq7iuqgkabgdmObmWb9KK0Vm7TDkxCH0pB0onPr6epVUP8Obg/pT1Oj/1hOLbfR8CHHWdAWzUBGGvp2TIy2A8LUaEoFnwkxZfdL7Bnd0RH/ClBtAjzLOxmUo7NbZmEnYCcD5pZz7BdZI0db/eBXFqfOlA88rEe+9Sv+NndIq0/WNIIsJi2RgjJnxsxvB5MjhhzmItpFIUl5yqoO3C9jcCp6HDBJxtCGbvAr5ALPn5RCJeBIr67WpAiTd7L3Ebu9SQZlXnoHX8kP04EA6ylR3W0EFbh7KUtq8M2H2vo0wjMj7ysl/3tT7cEZ97s1ygO5iJx3GfMDyrDhtLXSBJ20uSxTJeptRw8SDiwTqunIh1WyKlcQz1WGauSbW4eXdj/r9KYMJ3qMMkdP/9THQUtTcOYx51r8RV9pdzqF2HPnZZNziBa+wXJZHEWp70NyoakNthgYwtypqiDHs2f3Q==" \
"https://{yourOktaDomain}/api/v1/idps/0oa1ysid1U3iyFqLu0g4/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish"
```

Publish with X.509 certificate in ``PEM`` format:

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/x-pem-file" \
-H "Authorization: SSWS ${api_token}" \
--data-binary @certificate.pem \
"https://{yourOktaDomain}/api/v1/idps/0oa1ysid1U3iyFqLu0g4/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish"
```

Publish with X.509 certificate in binary ``CER`` format:

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/x-x509-ca-cert" \
-H "Authorization: SSWS ${api_token}" \
--data-binary @certificate.cer \
-d '{
}' "https://{yourOktaDomain}/api/v1/idps/0oa1ysid1U3iyFqLu0g4/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish"
```

##### Response Example


```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: https://{yourOktaDomain}/api/v1/idps/0oal21k0DVN7DhS3R0g3/credentials/keys/ZC5C-1gEUwVxiYI8xdmYYDI3Noc4zI24fLNxBpZVR04

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

If the validity period of the certificate is less than 90 days, a 400 error response is returned.

```http
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

### Revoke Signing CSR from IdP


<ApiOperation method="delete" url="/api/v1/idps/${idpId}/credentials/csrs/${csrModelId}" />

Revoke a CSR and delete the key pair from the IdP

##### Request Parameters


| Parameter  | Description                                       | Param Type | DataType | Required |
| ---------  | -----------------------------------------------   | ---------- | -------- | -------- |
| idpId      | `id` of the IdP                                   | URL        | String   | TRUE     |
| csrModelId | `id` of [CSR model](#identity-provider-csr-model) | URL        | String   | TRUE     |

##### Response Parameters


Empty response.

##### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/-_-BFwAGoUYN-DDvsSKQFdx7OXaPZqrEPpFDO1hu-rg"
```

##### Response Example


```http
HTTP/1.1 204 No Content
```

### List Signing CSRs for IdP


<ApiOperation method="get" url="/api/v1/idps/${idpId}/credentials/csrs" />

Enumerates signing CSRs for an IdP

##### Request Parameters


| Parameter     | Description                                     | Param Type | DataType                                      | Required |
| ------------- | ----------------------------------------------- | ---------- | --------------------------------------------- | -------- |
| idpId         | `id` of the IdP                                 | URL        | String                                        | TRUE     |

##### Response Parameters


Array of [CSR models](#identity-provider-csr-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs"
```

##### Response Example


```json
[
  {
    "id": "h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
    "created": "2017-03-28T01:11:10.000Z",
    "csr": "MIIC4DCCAcgCAQAwcTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xEzARBgNVBAoMCk9rdGEsIEluYy4xDDAKBgNVBAsMA0RldjESMBAGA1UEAwwJU1AgSXNzdWVyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6m8jHVCr9/tKvvbFN59T4raoCs/78KRm4fSefHQOv1TKLXo4wTLbsqYWRWc5u0sd5orUMQgPQOyj3i6qh13mALY4BzrT057EG1BUNjGg29QgYlnOk2iX890e5BIDMQQEIKFrvOi2V8cLUkLvE2ydRn0VO1Q1frbUkYeStJYC5Api2JQsYRwa+1ZeDH1ITnIzUaugWhW2WB2lSnwZkenne5KtffxMPYVu+IhNRHoKaRA6Z51YNhMJIx17JM2hs/H4Ka3drk6kzDf7ofk/yBpb9yBWyU7CTSQhdoHidxqFprMDaT66W928t3AeOENHBuwn8c2K9WeGG+bELNyQRJVmawIDAQABoCowKAYJKoZIhvcNAQkOMRswGTAXBgNVHREEEDAOggxkZXYub2t0YS5jb20wDQYJKoZIhvcNAQELBQADggEBAA2hsVJRVM+A83X9MekjTnIbt19UNT8wX7wlE9jUKirWsxceLiZBpVGn9qfKhhVIpvdaIRSeoFYS2Kg/m1G6bCvjmZLcrQ5FcEBjZH2NKfNppGVnfC2ugtUkBtCB+UUzOhKhRKJtGugenKbP33zRWWIqnd2waF6Cy8TIuqQVPbwEDN9bCbAs7ND6CFYNguY7KYjWzQOeAR716eqpEEXuPYAS4nx/ty4ylonR8cv+gpq51rvq80A4k/36aoeM0Y6I4w64vhTfuvWW2UYFUD+/+y2FA2CSP4JfctySrf1s525v6fzTFZ3qZbB5OZQtP2b8xYWktMzywsxGKDoVDB4wkH4=",
    "kty": "RSA",
    "_links": {
      "self": {
        "href": "https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
        "hints": {
          "allow": [
            "GET",
            "DELETE"
          ]
        }
      },
      "publish": {
        "href": "https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish",
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
        "href": "https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/-_-BFwAGoUYN-DDvsSKQFdx7OXaPZqrEPpFDO1hu-rg",
        "hints": {
          "allow": [
            "GET",
            "DELETE"
          ]
        }
      },
      "publish": {
        "href": "https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/-_-BFwAGoUYN-DDvsSKQFdx7OXaPZqrEPpFDO1hu-rg/lifecycle/publish",
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

### Get Signing CSR for IdP


<ApiOperation method="get" url="/api/v1/idps/${idpId}/credentials/csrs/${csrModelId}" />

Gets a specific [CSR model](#identity-provider-csr-model) by `id`

##### Request Parameters


| Parameter     | Description                                                                     | Param Type | DataType                                      | Required |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- |
| idpId         | `id` of the IdP                                                                 | URL        | String                                        | TRUE     |
| csrModelId    | `id` of [CSR model](#identity-provider-csr-model)                               | URL        | String                                        | TRUE     |

##### Response Parameters


Return base64 encoded CSR in DER format if the ``Accept`` media type is ``application/pkcs10``; or a CSR model if the ``Accept`` media type is ``application/json``.

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50"
```

##### Response Example


```json
{
  "id": "h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
  "created": "2017-03-28T01:11:10.000Z",
  "csr": "MIIC4DCCAcgCAQAwcTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xEzARBgNVBAoMCk9rdGEsIEluYy4xDDAKBgNVBAsMA0RldjESMBAGA1UEAwwJU1AgSXNzdWVyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6m8jHVCr9/tKvvbFN59T4raoCs/78KRm4fSefHQOv1TKLXo4wTLbsqYWRWc5u0sd5orUMQgPQOyj3i6qh13mALY4BzrT057EG1BUNjGg29QgYlnOk2iX890e5BIDMQQEIKFrvOi2V8cLUkLvE2ydRn0VO1Q1frbUkYeStJYC5Api2JQsYRwa+1ZeDH1ITnIzUaugWhW2WB2lSnwZkenne5KtffxMPYVu+IhNRHoKaRA6Z51YNhMJIx17JM2hs/H4Ka3drk6kzDf7ofk/yBpb9yBWyU7CTSQhdoHidxqFprMDaT66W928t3AeOENHBuwn8c2K9WeGG+bELNyQRJVmawIDAQABoCowKAYJKoZIhvcNAQkOMRswGTAXBgNVHREEEDAOggxkZXYub2t0YS5jb20wDQYJKoZIhvcNAQELBQADggEBAA2hsVJRVM+A83X9MekjTnIbt19UNT8wX7wlE9jUKirWsxceLiZBpVGn9qfKhhVIpvdaIRSeoFYS2Kg/m1G6bCvjmZLcrQ5FcEBjZH2NKfNppGVnfC2ugtUkBtCB+UUzOhKhRKJtGugenKbP33zRWWIqnd2waF6Cy8TIuqQVPbwEDN9bCbAs7ND6CFYNguY7KYjWzQOeAR716eqpEEXuPYAS4nx/ty4ylonR8cv+gpq51rvq80A4k/36aoeM0Y6I4w64vhTfuvWW2UYFUD+/+y2FA2CSP4JfctySrf1s525v6fzTFZ3qZbB5OZQtP2b8xYWktMzywsxGKDoVDB4wkH4=",
  "kty": "RSA",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "publish": {
      "href": "https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

## Identity Provider User Operations

### Find Users


<ApiOperation method="get" url="/api/v1/idps/${idpId}/users" />

Find all the users linked to an identity provider

##### Request Parameters


| Parameter | Description             | Param Type | DataType | Required |
| --------- | ----------------------- | ---------- | -------- | -------- |
| idpId     | `id` of IdP to search   | URL        | String   | TRUE     |

##### Response Parameters


List of the users that are linked to the specified identity provider

##### Request Example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/idps/0oa4lb6lbtmH355Hx0h7/users"
```

##### Response Example

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
          "href": "https://{yourOktaDomain}/api/v1/idps/0oa4lb6lbtmH355Hx0h7/users/00u5cl9lo7nMjHjPr0h7",
          "hints": {
              "allow": [
                  "GET",
                  "DELETE"
                ]
          }
        },
        "idp": {
            "href": "https://{yourOktaDomain}/api/v1/idps/0oa4lb6lbtmH355Hx0h7"
        },
        "user": {
            "href": "https://{yourOktaDomain}/api/v1/users/00u5cl9lo7nMjHjPr0h7"
        }
     }
  }
]
```

### List IdPs Associated with a User


<ApiOperation method="GET" url="/api/v1/users/${userId}/idps" />

Lists the IdPs associated with the user.

##### Request Parameters


| Parameter     | Description                                                                     | Param Type | DataType                                      | Required |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- |
| userId        | `id` of a user                                                                  | URL        | String                                        | TRUE     |

##### Response Parameters


Return the associated [Identity Providers](#identity-provider-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR/idps"
```

##### Response Example


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
      "href": "https://{yourOktaDomain}/oauth2/v1/authorize?idp=0oa62b57p7c8PaGpU0h7&
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
      "href": "https://{yourOktaDomain}/oauth2/v1/authorize/callback",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "idpUser": {
        "href": "https://{yourOktaDomain}/idps/0oa62b57p7c8PaGpU0h7/users/00ub0oNGTSWTBKOLGLNR",
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

If the user doesn't exist, you receive an error response.

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

### Get a Linked Identity Provider User


<ApiOperation method="GET" url="/api/v1/idps/${idpId}/users/${userId}" />

Fetches a linked [IdP user](#identity-provider-user-model) by ID.

##### Request Parameters


| Parameter     | Description                                                                     | Param Type | DataType                                      | Required |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- |
| idpId         | ID of the [Identity Provider](#identity-provider-model)                         | URL        | String                                        | TRUE     |
| userId        | `id` of a user                                                                  | URL        | String                                        | TRUE     |

##### Response Parameters


Return the associated [Identity Providers](#identity-provider-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/idps/0oa62bfdiumsUndnZ0h7/users/00u5t60iloOHN9pBi0h7"
```

##### Response Example


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
            "href": "https://{yourOktaDomain}/api/v1/idps/0oa62bfdiumsUndnZ0h7"
        },
        "self": {
            "href": "https://{yourOktaDomain}/api/v1/idps/0oa62bfdiumsUndnZ0h7/users/00u5t60iloOHN9pBi0h7",
            "hints": {
                "allow": [
                    "GET",
                    "DELETE"
                ]
            }
        },
        "user": {
            "href": "https://{yourOktaDomain}/api/v1/users/00u5t60iloOHN9pBi0h7"
        }
    }
}
```

If the IdP doesn't exist, you receive an error response.

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

### Link a User to a Social Provider without a Transaction


<ApiOperation method="POST" url="/api/v1/idps/${idpId}/users/${userId}" />

Links an Okta user to an existing [social provider](#identity-provider-model). This endpoint doesn't support the SAML2 [Identity Provider Type](#identity-provider-type).

##### Request Parameters


| Parameter     | Description                                                                     | Param Type | DataType                                      | Required |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- |
| idpId         | `id` of the IdP                                                                 | URL        | String                                        | TRUE     |
| userId        | `id` of a user                                                                  | URL        | String                                        | TRUE     |
| externalId    | unique IdP-specific identifier for user                                         | Body       | String                                        | TRUE     |

##### Response Parameters


Return the associated [Identity Providers](#identity-provider-model)

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "externalId": "121749775026145"
}' "https://{yourOktaDomain}/api/v1/idps/0oa62b57p7c8PaGpU0h7/users/00ub0oNGTSWTBKOLGLNR"
```

##### Response Example


```json
{
  "id": "00ub0oNGTSWTBKOLGLNR",
  "externalId": "121749775026145",
  "created": "2017-03-30T02:19:51.000Z",
  "lastUpdated": "2017-03-30T02:19:51.000Z",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/idps/0oa62b57p7c8PaGpU0h7/users/00ub0oNGTSWTBKOLGLNR",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "idp": {
      "href": "https://{yourOktaDomain}/api/v1/idps/0oa62b57p7c8PaGpU0h7"
    },
    "user": {
      "href": "https://{yourOktaDomain}/api/v1/users/00ub0oNGTSWTBKOLGLNR"
    }
  }
}
```

If either the user or the IdP doesn't exist, you receive an error response.

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

Removes the link between the Okta user and the IdP user.
The next time the user federates into Okta via this IdP, they have to re-link their account according to the account link policy configured in Okta for this IdP.

##### Request Parameters


| Parameter | Description             | Param Type | DataType | Required |
| --------- | ----------------------- | ---------- | -------- | -------- |
| idpId     | `id` of IdP to activate | URL        | String   | TRUE     |
| userId    | `id` of user to delete  | URL        | String   | TRUE     |

##### Response Parameters



##### Request Example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://{yourOktaDomain}/api/v1/idps/0oa4lb6lbtmH355Hx0h7/users/00u5cl9lo7nMjHjPr0h7"
```

##### Response Example

```bash
204 - No Content
```


### Social Authentication Token Operation


<ApiOperation method="GET" url="/api/v1/idps/${idpId}/users/${userId}/credentials/tokens" />

Okta doesn't import all the user information from a social provider. If the app needs information which isn't imported, it can get the user token from this endpoint, then make an API call to the social provider with the token to request the additional information.

##### Request Parameters


| Parameter     | Description                                                                     | Param Type | DataType                                      | Required |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- |
| idpId         | `id` of the IdP                                                                 | URL        | String                                        | TRUE     |
| userId        | `id` of a user                                                                  | URL        | String                                        | TRUE     |

##### Response Parameters


Return a list of the the associated [social authentication tokens](#identity-provider-social-authentication-token-model)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://{yourOktaDomain}/api/v1/idps/0oa62b57p7c8PaGpU0h7/users/00ub0oNGTSWTBKOLGLNR/credentials/tokens"
```

##### Response Example


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

## Identity Provider Model

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
      "href": "https://{yourOktaDomain}/api/v1/idps/0oa1k5d68qR2954hb0g4/metadata.xml",
      "type": "application/xml",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "acs": {
      "href": "https://{yourOktaDomain}/sso/saml2/0oa1k5d68qR2954hb0g4",
      "type": "application/xml",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "users": {
      "href": "https://{yourOktaDomain}/api/v1/idps/0oa1k5d68qR2954hb0g4/users",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "activate": {
      "href": "https://{yourOktaDomain}/api/v1/idps/0oa1k5d68qR2954hb0g4/lifecycle/activate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "deactivate": {
      "href": "https://{yourOktaDomain}/api/v1/idps/0oa1k5d68qR2954hb0g4/lifecycle/deactivate",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Identity Provider Attributes

All Identity Providers have the following properties:

| Property      | Description                                                  | DataType                                                       | Nullable | Unique | Readonly | MinLength | MaxLength |
| ------------- | ------------------------------------------------------------ | -------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- |
| id            | Unique key for the IdP                                       | String                                                         | FALSE    | TRUE   | TRUE     |           |           |
| type          | Type of IdP                                                  | [Identity Provider Type](#identity-provider-type)              | FALSE    | FALSE  | FALSE    |           |           |
| issuerMode <ApiLifecycle access="ea" />  | Indicates whether Okta uses the original Okta org domain URL, or a custom domain URL in the request to the social IdP.  | `ORG_URL` or `CUSTOM_URL_DOMAIN` | FALSE | FALSE | FALSE |   |
| name        | Unique name for the IdP                                    | String                                                         | FALSE | TRUE  | FALSE | 1 | 100 |
| status      | Status of the IdP                                          | `ACTIVE` or `INACTIVE`                                         | FALSE | FALSE | TRUE  |   |     |
| created     | Timestamp when IdP was created                             | Date                                                           | FALSE | FALSE | TRUE  |   |     |
| lastUpdated | Timestamp when IdP was last updated                        | Date                                                           | FALSE | FALSE | TRUE  |   |     |
| protocol    | Protocol settings for IdP `type`                           | [Protocol Object](#identity-provider-type)                     | FALSE | FALSE | FALSE |   |     |
| policy      | Policy settings for IdP `type`                             | [Policy Object](#identity-provider-type)                       | FALSE | FALSE | FALSE |   |     |
| _links      | [Discoverable resources](#links-object) related to the IdP | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE  | FALSE | TRUE  |   |     |
| _embedded   | Embedded resources related to the IdP                      | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE  | FALSE | TRUE  |   |     |

#### Property Details

* The properties `id`, `created`, `lastUpdated`, and `_links` are available after an IdP is created.

* `issuerMode` is visible if you have the Custom URL Domain feature enabled. If the feature is enabled, you can set a custom domain URL in custom an identity provider setting, and this property is returned in the appropriate responses. To enable the Custom URL Domain feature, contact [Support](https://support.okta.com/help/open_case).

    * If set to `ORG_URL`, then in the authorize request to the social IdP, Okta uses the Okta org's original domain URL, `https://{yourOktaDomain}`, as the domain in the `redirect_uri`. This is the default value for social IdPs created before the Custom URL Domain feature is enabled.

    * If set to `CUSTOM_URL_DOMAIN`, then in the authorize request to the social IdP, Okta uses the custom domain URL as the domain in `redirect_uri`. This is the default value for social IdPs created after the Custom URL Domain feature is enabled.

  After you enable the Custom URL Domain feature, all new social IdPs use `CUSTOM_URL_DOMAIN` by default. All existing social IdPs continue to use `ORG_URL`, so that existing integrations with the social IdP continue to work after the feature is enabled. You can change this value in any social IdP via the API or administrator UI.

### Identity Provider Type

Okta supports the following enterprise and social providers:

| Type         | Description                                                                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OIDC`       | IdP provider that supports [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html)                                                    |
| `SAML2`      | Enterprise IdP provider that supports the [SAML 2.0 Web Browser SSO Profile](https://docs.oasis-open.org/security/saml/v2.0/saml-profiles-2.0-os.pdf) |
| `FACEBOOK`   | [Facebook Login](https://developers.facebook.com/docs/facebook-login/overview/)                                                                       |
| `GOOGLE`     | [Google Sign-In with OpenID Connect](https://developers.google.com/identity/protocols/OpenIDConnect)                                                  |
| `LINKEDIN`   | [Sign In with LinkedIn](https://developer.linkedin.com/docs/signin-with-linkedin)                                                                     |
| `MICROSOFT`  | [Microsoft Enterprise SSO](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/what-is-single-sign-on)                                                                         |

### Protocol Object

The Protocol object contains IdP-specific protocol settings for endpoints, bindings, and algorithms used to connect with the IdP and validate messages.

| Provider     | Protocol                                   |
| ------------ | -----------------------------------------  |
| `OIDC`       | [OpenID Connect](#openid-connect-protocol) |
| `SAML2`      | [SAML 2.0](#saml-20-protocol)              |
| `FACEBOOK`   | [OAuth 2.0](#oauth-20-protocol)            |
| `GOOGLE`     | [OpenID Connect](#openid-connect-protocol) |
| `LINKEDIN`   | [OAuth 2.0](#oauth-20-protocol)            |
| `MICROSOFT`  | [OpenID Connect](#openid-connect-protocol) |

#### SAML 2.0 Protocol

Protocol settings for the [SAML 2.0 Authentication Request Protocol](http://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf):

| Property    | Description                                                        | DataType                                                          | Nullable | Readonly |
| ----------- | ------------------------------------------------------------------ | ----------------------------------------------------------------- | -------- | -------- |
| type        | SAML 2.0 protocol                                                  | `SAML2`                                                           | FALSE    | TRUE     |
| endpoints   | SAML 2.0 HTTP binding settings for IdP and SP (Okta)               | [SAML 2.0 Endpoints Object](#saml-20-endpoints-object)            | FALSE    | FALSE    |
| relayState  | Relay state settings for IdP                                       | [SAML 2.0 Relay State Object](#saml-20-relay-state-object)        | TRUE     | FALSE    |
| algorithms  | Settings for signing and verifying SAML messages                   | [SAML 2.0 Algorithms Object](#saml-20-algorithms-object)          | FALSE    | FALSE    |
| credentials | Federation trust credentials for verifying assertions from the IdP | [SAML 2.0 Credentials Object](#saml-20-credentials-object)        | FALSE    | FALSE    |
| settings    | Advanced settings for the SAML 2.0 protocol                        | [SAML 2.0 Settings Object](#saml-20-settings-object)              | TRUE     | FALSE    |

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

##### SAML 2.0 Endpoints Object

The `SAML2` protocol supports the `sso` and `acs` endpoints.

| Property | Description                                                                           | DataType                                                                                            | Nullable | Readonly |
| -------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------- | -------- |
| sso      | IdP's `SingleSignOnService` endpoint where Okta sends an `<AuthnRequest>` message     | [Single Sign-On (SSO) Endpoint Object](#single-sign-on-sso-endpoint-object)                         | FALSE    | FALSE    |
| acs      | Okta's `SPSSODescriptor` endpoint where the IdP sends a `<SAMLResponse>` message      | [Assertion Consumer Service (ACS) Endpoint Object](#assertion-consumer-service-acs-endpoint-object) | FALSE    | FALSE    |

###### Single Sign-On (SSO) Endpoint Object

The Single Sign-On (SSO) endpoint is the IdP's `SingleSignOnService` endpoint where Okta sends a SAML 2.0 `<AuthnRequest>` message:

| Property    | Description                                                                        | DataType                         | Nullable | Readonly | MinLength | MaxLength | Validation                                      |
| ----------- | ---------------------------------------------------------------------------------- | -------------------------------- | -------- | -------- | --------- | --------- | ----------------------------------------------- |
| url         | URL of binding-specific endpoint to send an `<AuthnRequest>` message to IdP        | String                           | FALSE    | FALSE    | 11        | 1014      | [RFC 3986](https://tools.ietf.org/html/rfc3986) |
| binding     | HTTP binding used to send an `<AuthnRequest>` message to IdP                       | `HTTP-POST` or `HTTP-Redirect`   | FALSE    | FALSE    |           |           |                                                 |
| destination | URI reference indicating the address to which the `<AuthnRequest>` message is sent | String                           | TRUE     | FALSE    | 1         | 512       |                                                 |

Property Details

* The `destination` property is required if request signatures are specified (See [SAML 2.0 Request Algorithm Object](#saml-20-request-algorithm-object)).
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

###### Assertion Consumer Service (ACS) Endpoint Object

The Assertion Consumer Service (ACS) endpoint is Okta's `SPSSODescriptor` endpoint where the IdP sends a SAML 2.0 `<SAMLResponse>` message.

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

**Trust-specific ACS Endpoint Example**

```xml
<md:EntityDescriptor entityID="https://sp.example.com/saml2/sso" xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata">
  <md:SPSSODescriptor AuthnRequestsSigned="true" WantAssertionsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
    <md:AssertionConsumerService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://{yourOktaDomain}/sso/saml2/0oamxfD9Jvaxvr0M00g3" index="0" isDefault="true"/>
  </md:SPSSODescriptor>
</md:EntityDescriptor>
```

> Note the unique IdP instance `id` in the ACS `Location`.

**Organization (shared) ACS Endpoint Example**

```xml
<md:EntityDescriptor entityID="https://sp.example.com/saml2/sso" xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata">
  <md:SPSSODescriptor AuthnRequestsSigned="true" WantAssertionsSigned="true" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
    <md:AssertionConsumerService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://{yourOktaDomain}/sso/saml2" index="0" isDefault="true"/>
  </md:SPSSODescriptor>
</md:EntityDescriptor>
```

> An organization-specific ACS endpoint enables multiple trusts from an IdP to a single ACS URL which may be required by specific IdP vendors.

##### SAML 2.0 Relay State Object

| Property   | Description           | DataType    | Nullable | Readonly |
| ---------- | --------------------- | ----------- | -------- | -------- |
| format     | The format used to generate the RelayState in SAML request. `FROM_URL` will be used if this value is null.     | `OPAQUE` or `FROM_URL` | TRUE     | FALSE

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

##### SAML 2.0 Algorithms Object

The `SAML2` protocol supports `request` and `response` algorithm and verification settings.

| Property | Description                                                   | DataType                                                                 | Nullable | Readonly |
| -------- | ------------------------------------------------------------- | ------------------------------------------------------------------------ | -------- | ------   |
| request  | Algorithm settings used to secure an `<AuthnRequest>` message | [SAML 2.0 Request Algorithm Object](#saml-20-request-algorithm-object)   | FALSE    | FALSE    |
| response | Algorithm settings used to verify a `<SAMLResponse>` message  | [SAML 2.0 Response Algorithm Object](#saml-20-response-algorithm-object) | FALSE    | FALSE    |

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

###### SAML 2.0 Request Algorithm Object

Algorithm settings for securing `<AuthnRequest>` messages sent to the IdP:

| Property  | Description                                                 | DataType                                                                                   | Nullable | Readonly |
| --------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------- | -------- |
| signature | Algorithm settings used to sign an `<AuthnRequest>` message | [SAML 2.0 Request Signature Algorithm Object](#saml-20-request-signature-algorithm-object) | FALSE    | FALSE    |

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

###### SAML 2.0 Request Signature Algorithm Object

XML digital signature algorithm settings for signing `<AuthnRequest>` messages sent to the IdP:

| Property    | Description                                                                        | DataType             | Nullable | Readonly |
| ----------- | ---------------------------------------------------------------------------------- | -------------------- | -------- | -------- |
| algorithm   | The XML digital signature algorithm used when signing an `<AuthnRequest>` message  | `SHA-1` or `SHA-256` | FALSE    | FALSE    |
| scope       | Specifies whether or not to digitally sign an `<AuthnRequest>` messages to the IdP | `REQUEST` or `NONE`  | FALSE    | FALSE    |

> The `algorithm` property is ignored when disabling request signatures (`scope` set as `NONE`).

###### SAML 2.0 Response Algorithm Object

Algorithm settings for verifying `<SAMLResponse>` messages and `<Assertion>` elements from the IdP:

| Property   | Description                                                                                        | DataType                                                                                     | Nullable   | Readonly      |
| ---------- | ----------------------------------------------------------------------------------                 | --------------------                                                                         | ---------- | ------------- |
| signature  | Algorithm settings for verifying `<SAMLResponse>` messages and `<Assertion>` elements from the IdP | [SAML 2.0 Response Signature Algorithm Object](#saml-20-response-signature-algorithm-object) | FALSE      | FALSE         |

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

###### SAML 2.0 Response Signature Algorithm Object

XML digital signature algorithm settings for verifying `<SAMLResponse>` messages and `<Assertion>` elements from the IdP:

| Property   | Description                                                                                                            | DataType                       | Nullable | Readonly |
| ---------- | ----------------------------------------------------------------------------------                                     | --------------------           | -------- | -------- |
| algorithm  | The minimum XML digital signature algorithm allowed when verifying a `<SAMLResponse>` message or `<Assertion>` element | `SHA-1` or `SHA-256`           | FALSE    | FALSE    |
| scope      | Specifies whether to verify a `<SAMLResponse>` message or `<Assertion>` element XML digital signature                  | `RESPONSE`, `ASSERTION`, `ANY` | FALSE    | FALSE    |

###### SAML 2.0 Credentials Object

Federation trust credentials for verifying assertions from the IdP and signing requests to the IdP

| Property   | Description                                                                        | DataType                                                                   | Nullable | Readonly |
| ---------- | ---------------------------------------------------------------------------------- | --------------------                                                       | -------- | -------- |
| trust      | Object containing information for verifying assertions from the IdP                | [SAML 2.0 Trust Credentials Object](#saml-20-trust-credentials-object)     | FALSE    | FALSE    |
| signing    | Key used for signing requests to the IdP                                           | [SAML 2.0 Signing Credentials Object](#saml-20-signing-credentials-object) | TRUE     | FALSE    |

###### SAML 2.0 Trust Credentials Object

Federation trust credentials for verifying assertions from the IdP:

| Property | Description                                                                                            | DataType | Nullable | Readonly | MinLength | MaxLength | Validation                                 |
| -------- | -----------------------------------------------------------------------------------------------------  | -------- | -------- | -------- | --------- | --------- | ------------------------------------------ |
| issuer   | URI that identifies the issuer (IdP) of a SAML `<SAMLResponse>` message `<Assertion>` element          | String   | FALSE    | FALSE    | 1         | 1024      | [URI](https://tools.ietf.org/html/rfc3986) |
| audience | URI that identifies the target Okta IdP instance (SP) for an `<Assertion>`                             | String   | FALSE    | FALSE    | 1         | 1024      | [URI](https://tools.ietf.org/html/rfc3986) |
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

###### SAML 2.0 Signing Credentials Object

Determines the [IdP Key Credential](#identity-provider-key-credential-model) used to sign requests sent to the IdP

| Property | Description                                                                                                    | DataType | Nullable | Readonly  | Validation                                 |
| -------- | -------------------------------------------------------------------------------------------------------------  | -------- | -------- | --------  | ------------------------------------------ |
| kid      | [IdP Key Credential](#identity-provider-key-credential-model) reference to Okta's X.509 signature certificate  | String   | FALSE    | FALSE     | Valid Signing Key ID reference             |

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

##### SAML 2.0 Settings Object

| Property   | Description                       | DataType    | Nullable | Readonly | DataType                                                             | Default                                               |
| ---------- | ---------------------             | ----------- | -------- | -------- | -------------------------------------------------------------------- | ----------------------------------------------        |
| nameFormat | The name identifier format to use | String      | TRUE     | FALSE    | [SAML 2.0 Name Identifier Formats](#saml-20-name-identifier-formats) | urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified |

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

##### SAML 2.0 Name Identifier Formats

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
| type        | [OAuth 2.0 Authorization Code Flow](https://tools.ietf.org/html/rfc6749#section-4.1)                                            | `OAUTH2`                                                                     | FALSE    | TRUE     |           |
| endpoints   | Endpoint settings for OAuth 2.0 Authorization Server (AS)                                                                       | [OAuth 2.0 Endpoints Object](#oauth-20-and-openid-connect-endpoints-object)  | TRUE     | TRUE     |           |
| scopes      | IdP-defined permission bundles to request delegated access from user                                                            | Array of String                                                              | FALSE    | FALSE    | 1         |
| credentials | Client authentication credentials for an [OAuth 2.0 Authorization Server (AS)](https://tools.ietf.org/html/rfc6749#section-2.3) | [Credentials Object](#oauth-20-and-openid-connect-client-credentials-object) | FALSE    | FALSE    |           |

The [OAuth 2.0 Setup Guide](#setup-guides) lists the scopes that are supported [per-IdP provider](#identity-provider-type).

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
| type        | [OpenID Connect Authorization Code Flow](http://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth)                     | `OIDC`                                                                       | FALSE | TRUE  |   |
| endpoints   | Endpoint settings for OAuth 2.0 Authorization Server (AS)                                                                       | [OAuth 2.0 Endpoints Object](#oauth-20-and-openid-connect-endpoints-object)  | TRUE  | TRUE  |   |
| scopes      | OpenID Connect and IdP-defined permission bundles to request delegated access from user                                         | Array of String                                                              | FALSE | FALSE | 1 |
| credentials | Client authentication credentials for an [OAuth 2.0 Authorization Server (AS)](https://tools.ietf.org/html/rfc6749#section-2.3) | [Credentials Object](#oauth-20-and-openid-connect-client-credentials-object) | FALSE | FALSE |   |

The [IdP setup guides](#setup-guides) list the scopes that are supported [per-IdP provider](#identity-provider-type).  The base `openid` scope is always required.

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

##### OAuth 2.0 and OpenID Connect Endpoints Object

The `OAUTH2` and `OIDC` protocols support the `authorization` and `token` endpoints. Additionally, the `OIDC` protocol supports the `userInfo` and `jwks` endpoints.

The IdP Authorization Server (AS) endpoints are currently defined as part of the [IdP provider](#identity-provider-type) and are read only.

| Property      | Description                                                                                                    | DataType                                                                                                                     | Nullable    | Readonly      |
| ------------- | -----------------------------------------------------------------------------------                            | -----------------------------------------                                                                                    | ----------- | ------------  |
| authorization | IdP Authorization Server (AS) endpoint to request consent from the user and obtain an authorization code grant | [OAuth 2.0 Authorization Server Authorization Endpoint Object](#oauth-20-authorization-server-authorization-endpoint-object) | TRUE        | TRUE          |
| token         | IdP Authorization Server (AS) endpoint to exchange the authorization code grant for an access token            | [OAuth 2.0 Authorization Server Token Endpoint Object](#oauth-20-authorization-server-token-endpoint-object)                 | TRUE        | TRUE          |
| userInfo      | Protected resource endpoint that returns claims about the authenticated user                                   | [OpenID Connect Userinfo Endpoint Object](#openid-connect-userinfo-endpoint-object)                                          | TRUE        | TRUE          |
| jwks          | Endpoint where the signer of the keys publishes its keys in a JWK Set                                          | [OpenID Connect JWKs Endpoint Object](#openid-connect-jwks-endpoint-object)                                                  | TRUE        | TRUE          |

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

##### OAuth 2.0 and OpenID Connect Client Credentials Object

Client authentication credentials for an [OAuth 2.0 Authorization Server (AS)](https://tools.ietf.org/html/rfc6749#section-2.3).

| Property      | Description                                                                                                 | DataType | Nullable | Readonly | MinLength | MaxLength |
| ------------- | ----------------------------------------------------------------------------------------------------------- | -------- | -------- | -------- | --------- | --------- |
| client_id     | [Unique identifier](https://tools.ietf.org/html/rfc6749#section-2.2) issued by AS for the Okta IdP instance | String   | FALSE    | FALSE    | 1         | 1024      |
| client_secret | [Client secret issued](https://tools.ietf.org/html/rfc6749#section-2.3.1) by AS for the Okta IdP instance   | String   | FALSE    | FALSE    | 1         | 1024      |

> You must complete client registration with the IdP Authorization Server for your Okta IdP instance to obtain client credentials.

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

### Policy Object

| Property     | Description                                                                                    | DataType                                                  | Nullable | Readonly |
| ------------ | ---------------------------------------------------------------                                | -------------------------------------------               | -------- | -------- |
| provisioning | Policy rules to just-in-time (JIT) provision an IdP user as a new Okta user                    | [Provisioning Policy Object](#provisioning-policy-object) | FALSE    | FALSE    |
| accountLink  | Policy rules to link an IdP user to an existing Okta user                                      | [Account Link Policy Object](#account-link-policy-object) | FALSE    | FALSE    |
| subject      | Policy rules to select the Okta login identifier for the IdP user and determine matching rules | [Subject Policy Object](#subject-policy-object)           | FALSE    | FALSE    |
| maxClockSkew | Maximum allowable clock-skew when processing messages from the IdP                             | Number                                                    | FALSE    | FALSE    |

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

#### IdP Type Policy Actions

| Type         | User Provisioning Actions     | Group Provisioning Actions            | Account Link Actions          | Account Link Filters  |
| ------------ | ----------------------------- | ------------------------------------- | ----------------------------- | --------------------  |
| `SAML2`      | `AUTO` or `DISABLED`          | `NONE`, `ASSIGN`, `APPEND`, or `SYNC` | `AUTO`                        |                       |
| `FACEBOOK`   | `AUTO`, `CALLOUT`, `DISABLED` | `NONE` or `ASSIGN`                    | `AUTO`, `CALLOUT`, `DISABLED` | `groups`              |
| `GOOGLE`     | `AUTO`, `CALLOUT`, `DISABLED` | `NONE` or `ASSIGN`                    | `AUTO`, `CALLOUT`, `DISABLED` | `groups`              |
| `LINKEDIN`   | `AUTO`, `CALLOUT`, `DISABLED` | `NONE` or `ASSIGN`                    | `AUTO`, `CALLOUT`, `DISABLED` | `groups`              |

> `CALLOUT` is a <ApiLifecycle access="deprecated" /> User Provisioning Action and Account Link Action.

#### Provisioning Policy Object

Specifies the behavior for just-in-time (JIT) provisioning of an IdP user as a new Okta user and their group memberships.

| Property                                     | Description                                                                       | DataType                                                              | Nullable | Readonly |
| ------------------------------------         | -----------------------------------                                               | -----------------------                                               | -------- | -------- |
| action                                       | Provisioning action for an IdP user during authentication                         | [User Provisioning Action Type](#user-provisioning-action-type)       | FALSE    | FALSE    |
| profileMaster                                | Determines if the IdP should act as a source of truth for user profile attributes | Boolean                                                               | FALSE    | FALSE    |
| callout <ApiLifecycle access="deprecated" /> | Webhook settings for the `CALLOUT` action                                         | [Callout Object](#callout-object)                                     | TRUE     | FALSE    |
| groups                                       | Provisioning settings for a user's group memberships                              | [Group Provisioning Policy Object](#group-provisioning-policy-object) | FALSE    | FALSE    |
| conditions                                   | Conditional behaviors for an IdP user during authentication                       | [Provisioning Conditions Object](#provisioning-conditions-object)     | FALSE    | FALSE    |


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

##### IdP Type Provisioning Policy Actions

The follow provisioning actions are support by each IdP provider:

| Type         | User Provisioning Actions     | Group Provisioning Actions            |
| ------------ | ----------------------------- | ------------------------------------- |
| `SAML2`      | `AUTO` or `DISABLED`          | `NONE`, `ASSIGN`, `APPEND`, or `SYNC` |
| `FACEBOOK`   | `AUTO`, `CALLOUT`, `DISABLED` | `NONE` or `ASSIGN`                    |
| `GOOGLE`     | `AUTO`, `CALLOUT`, `DISABLED` | `NONE` or `ASSIGN`                    |
| `LINKEDIN`   | `AUTO`, `CALLOUT`, `DISABLED` | `NONE` or `ASSIGN`                    |

> `CALLOUT` is a <ApiLifecycle access="deprecated" /> User Provisioning Action.


##### User Provisioning Action Type

Specifies the user provisioning action during authentication when an IdP user is not linked to an existing Okta user.

| Action Type | Description                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| `AUTO`                                         | The IdP user profile is transformed via defined universal directory profile mappings to an Okta user profile and automatically provisioned as an Okta user.                                   |
| `CALLOUT` <ApiLifecycle access="deprecated" /> | Okta calls out to an external web service during authentication to validate the IdP user profile, determine whether to provision a new Okta user, and define the resulting Okta user profile. |
| `DISABLED`                                     | Okta rejects the authentication request and skip provisioning of a new Okta user if the IdP user is not linked to an existing Okta User.                                                      |


Property Details

* To successfully provision a new Okta user, JIT provisioning must be enabled in your organization security settings for `AUTO` or `CALLOUT` actions.
* If the target username is not unique or the resulting Okta user profile is missing a required profile attribute, JIT provisioning may fail.
* New Okta users are provisioned with either a `FEDERATION` or `SOCIAL` authentication provider depending on the IdP `type`.

##### Group Provisioning Policy Object

| Property            | Description                                                                                                 | DataType                                                          | Nullable | Readonly | MinLength | MaxLength |
| ------------------  | ---------------------------------------------------                                                         | ------------------------------------                              | -------- | -------- | --------- | --------- |
| action              | Provisioning action for IdP user's group memberships                                                        | [Group Provisioning Action Type](#group-provisioning-action-type) | FALSE    | FALSE    |           |           |
| sourceAttributeName | IdP user profile attribute name (case-insensitive) for an array value that contains group memberships       | String                                                            | TRUE     | FALSE    | 0         | 1024      |
| filter              | Whitelist of `OKTA_GROUP` group identifiers that are allowed for the `APPEND` or `SYNC` provisioning action | Array of String (`OKTA_GROUP` IDs)                                | TRUE     | FALSE    |           |           |
| assignments         | List of `OKTA_GROUP` group identifiers to add an IdP user as a member with the `ASSIGN` action              | Array of String (`OKTA_GROUP` IDs)                                | TRUE     | FALSE    |           |           |

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

###### Group Provisioning Action Type

The group provisioning action for an IdP user:

| Action      | Description                                                                                                                                                        | Existing OKTA_GROUP Memberships                                                               | Existing APP_GROUP Memberships                     | Existing BUILT_IN Memberships                |
| ----------- | ---------------------------------                                                                                                                                  | ------------------------------------------------------                                        | -------------------------------------------------- | -------------------------------------------- |
| `NONE`      | Skips processing of group memberships                                                                                                                              | Unchanged                                                                                     | Unchanged                                          | Unchanged                                    |
| `ASSIGN`    | Assigns user to groups defined in the `assignments` array                                                                                                          | Unchanged                                                                                     | Unchanged                                          | Unchanged                                    |
| `APPEND`    | Adds user to any group defined by the IdP as a value of the `sourceAttributeName` array that matches the **name** of **whitelisted group** defined in the `filter` | Unchanged                                                                                     | Unchanged                                          | Unchanged                                    |
| `SYNC`      | Group memberships are mastered by the IdP as a value of the `sourceAttributeName` array that matches the **name** of **whitelisted group** defined in the `filter` | Removed if not defined by IdP in `sourceAttributeName` and matching name of group in `filter` | Unchanged                                          | Unchanged                                    |

> Group provisioning action is processed independently from profile mastering.  You can sync group memberships via SAML with profile mastering disabled.

###### Group Provisioning Action Examples

**Organization Groups**

| ID                   | Name                    | Type         |
| -------------------- | ---------------------   | ------------ |
| 00gjg5lzfBpn62wuF0g3 | MFA Users               | `OKTA_GROUP` |
| 00glxpsrGUKMnSPss0g3 | Enterprise IdP Users    | `OKTA_GROUP` |
| 00gak46y5hydV6NdM0g4 | Cloud Users             | `OKTA_GROUP` |
| 00ggniobeT51fBl0B0g3 | Everyone                | `BUILT_IN`   |
| 00g51vdPerxUiLarG0g4 | Domain Users            | `APP_GROUP`  |

**Existing Group Memberships for IdP User**

| ID                   | Name           | Type         |
| -------------------- | ------------   | ------------ |
| 00gak46y5hydV6NdM0g4 | Cloud Users    | `OKTA_GROUP` |
| 00ggniobeT51fBl0B0g3 | Everyone       | `BUILT_IN`   |
| 00g51vdPerxUiLarG0g4 | Domain Users   | `APP_GROUP`  |

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

**Provisioning Policy Action Results**

| Action   | Source Attribute Name   | Assignments            | Filter                 | Group Membership Results                                         |
| -------- | ---------------------   | --------------------   | --------------------   | ---------------------------------------------------------------  |
| `NONE`   |                         |                        |                        | Cloud Users, Domain Users, & Everyone                            |
| `ASSIGN` |                         | 00gjg5lzfBpn62wuF0g3   |                        | **MFA Users**, Cloud Users, Domain Users, & Everyone             |
| `APPEND` | Groups                  |                        | 00glxpsrGUKMnSPss0g3   | **Enterprise IdP Users**, Cloud Users, Domain Users, & Everyone  |
| `SYNC`   | Groups                  |                        | 00glxpsrGUKMnSPss0g3   | **Enterprise IdP Users**, Domain Users, & Everyone               |


###### Provisioning Conditions Object

| Property           | Description                                                              | DataType                                                          | Nullable | Readonly |
| -------------      | ------------------------------------------------------------------------ | ----------------------------------------------------------------- | -------- | -------- |
| deprovisioned      | Behavior for a previously deprovisioned IdP user during authentication   | [Deprovisioned Condition Object](#deprovisioned-condition-object) | FALSE    | FALSE    |
| suspended          | Behavior for a previously suspended IdP user during authentication       | [Suspended Condition Object](#suspended-condition-object)         | FALSE    | FALSE    |

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

###### Deprovisioned Condition Object

| Property    | Description                                                            | DataType                                                          | Nullable   | Readonly      |
| -------     | ---------------------------------------------------------------------- | ----------------------------------------------------------------- | --------   | ----------    |
| action      | Action for a previously deprovisioned IdP user during authentication   | [Deprovisioned Action Type](#deprovisioned-action-type)           | FALSE      | FALSE         |

```json
{
  "action": "NONE"
}
```

###### Deprovisioned Action Type

Specifies the action during authentication when an IdP user is linked to a previously deprovisioned Okta user.

| Action Type  | Description                                                                                                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NONE`       | Take no action. If an IdP user matching a previously deprovisioned Okta user attempts to authenticate, authentication will fail.                                             |
| `REACTIVATE` | If an IdP user matching a previously deprovisioned Okta user attempts to authenticate, reactivate the matching user in Okta and allow the authentication attempt to proceed. |

###### Suspended Condition Object

| Property | Description                                                            | DataType                                                          | Nullable | Readonly |
| -------  | ---------------------------------------------------------------------- | ----------------------------------------------------------------- | -------- | -------- |
| action   | Action for a previously suspended IdP user during authentication       | [Suspended Action Type](#suspended-action-type)                   | FALSE    | FALSE    |

```json
{
  "action": "NONE"
}
```

###### Suspended Action Type

Specifies the action during authentication when an IdP user is linked to a previously suspended Okta user.

| Action Type  | Description                                                                                                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NONE`       | Take no action. If an IdP user matching a previously suspended Okta user attempts to authenticate, authentication will fail.                                                 |
| `UNSUSPEND`  | If an IdP user matching a previously suspended Okta user attempts to authenticate, unsuspened the matching user in Okta and allow the authentication attempt to proceed.     |

#### Account Link Policy Object

Specifies the behavior for linking an IdP user to an existing Okta user.

| Property                                     | Description                                           | DataType                                                  | Nullable | Readonly |
| --------                                     | ----------------------------------------------------- | --------------------------------------------------------- | -------- | -------- |
| action                                       | Specifies the account linking action for an IdP user  | [Account Link Action Type](#account-link-action-type)     | FALSE    | FALSE    |
| filter                                       | Whitelist for link candidates                         | [Account Link Filter Object](#account-link-filter-object) | TRUE     | FALSE    |
| callout <ApiLifecycle access="deprecated" /> | Webhook settings for the `CALLOUT` action             | [Callout Object](#callout-object)                         | TRUE     | FALSE    |

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

##### IdP Type Account Link Policy Actions

The follow-account link actions are supported by each IdP provider:

| Type         | Account Link Actions          | Account Link Filters |
| ------------ | ----------------------------- | -------------------- |
| `OIDC`       | `AUTO`                        |                      |
| `SAML2`      | `AUTO`                        |                      |
| `FACEBOOK`   | `AUTO`, `CALLOUT`, `DISABLED` | `groups`             |
| `GOOGLE`     | `AUTO`, `CALLOUT`, `DISABLED` | `groups`             |
| `LINKEDIN`   | `AUTO`, `CALLOUT`, `DISABLED` | `groups`             |

> `CALLOUT` is a <ApiLifecycle access="deprecated" /> Account Link Action.

##### Account Link Action Type

The account link action for an IdP user during authentication:

| Action Type                                    | Description                                                                                                                                                                            |
| -----------                                    | ------------------------------------------------------------------------------------------------------------------------------------------------------------------                     |
| `AUTO`                                         | The IdP user is automatically linked to an Okta user when the transformed IdP user matches an existing Okta user according to [subject match rules](#subject-policy-object).           |
| `CALLOUT` <ApiLifecycle access="deprecated" /> | Okta calls out to an external web service during authentication to validate the IdP user profile and determine whether to link the IdP user to an Okta user candidate.                 |
| `DISABLED`                                     | Okta never attempts to link the IdP user to an existing Okta user, but may still attempt to provision a new Okta user (See [Provisioning Action Type](#user-provisioning-action-type). |


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

##### Account Link Filter Object

Specifies group memberships to restrict which users are available for account linking by an IdP.

| Property | Description                                      | DataType                                                                | Nullable | Readonly
| -------- | ------------------------------------------------ | ----------------------------------------------------------------------- | -------- | -------- |
| groups   | Group memberships to determine link candidates   | [Groups Account Link Filter Object](#groups-account-link-filter-object) | TRUE     | FALSE    |

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

###### Groups Account Link Filter Object

Defines a whitelist of group membership to restrict which users are available for account linking by an IdP.

| Property | Description                                                   | DataType                     | Nullable | Readonly |
| -------- | ------------------------------------------------------------- | ---------------------------- | -------- | -------- |
| include  | Specifies the whitelist of group identifiers to match against | Array of String (Group IDs)  | TRUE     | FALSE    |

> Group memberships are restricted to type `OKTA_GROUP`.

```json
{
  "groups": {
    "include": [
      "00gjg5lzfBpn62wuF0g3"
    ]
  }
}
```

#### Subject Policy Object

Specifies the behavior for establishing, validating, and matching a username for an IdP user.

| Property         | Description                                                                                                                         | DataType                                               | Nullable | Readonly | MinLength | MaxLength | Validation                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | -------- | -------- | --------- | --------- | ------------------------------------------------------------------- |
| userNameTemplate | [Okta EL Expression](/reference/okta_expression_language/) to generate or transform a unique username for the IdP user           | [UserName Template Object](#username-template-object)  | FALSE    | FALSE    |           |           | [Okta EL Expression](/reference/okta_expression_language/)       |
| filter           | Optional [regular expression pattern](https://en.wikipedia.org/wiki/Regular_expression) used to filter untrusted IdP usernames      | String                                                 | TRUE     | FALSE    | 0         | 1024      |                                                                     |
| matchType        | Determines the Okta user profile attribute match conditions for account linking and authentication of the transformed IdP username  | `USERNAME`, `EMAIL`, `USERNAME_OR_EMAIL` or `CUSTOM_ATTRIBUTE`      | FALSE    | FALSE    |           |           |
| matchAttribute   | Okta user profile attribute for matching transformed IdP username. Only for matchType `CUSTOM_ATTRIBUTE` | String      | TRUE    | FALSE    |           |           |  See `matchAttribute` Validation  |

 matchAttribute Validation

The matchAttribute must be a valid Okta user profile attribute of one of the following types:

* String (with no format or 'email' format only)
* Integer
* Number

Property Details

* Defining a [regular expression pattern](https://en.wikipedia.org/wiki/Regular_expression) to filter untrusted IdP usernames for security purposes is **highly recommended**, especially if you have multiple IdPs connected to your organization.  The filter prevents and IdP from issuing an assertion for **ANY** user including partners or directory users in your Okta organization.
   For example, the filter pattern `(\S+@example\.com)` allows only users that have an `@example.com` username suffix and rejects assertions that have any other suffix such as `@corp.example.com` or `@partner.com`.

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

##### UserName Template Object

| Property | Description                                                                                                                | DataType | Nullable | Readonly | MinLength | MaxLength | Validation                                                    |
| -------  | ------------------------------------------------------------------------------                                             | -------- | -------- | -------- | --------- | --------- | ----------------------------------------------                |
| template | [Okta EL Expression](/reference/okta_expression_language/) to generate or transform an unique username for the IdP user | String   | FALSE    | FALSE    | 9         | 1024      | [Okta EL Expression](/reference/okta_expression_language/) |

Property Details

* IdP user profile attributes can be referenced with the `idpuser` prefix such as `idpuser.subjectNameId`.

* You must define a IdP user profile attribute before it can be referenced in an Okta EL expression. To define an IdP user attribute policy, you may need to create a new IdP instance without a base profile property, edit the IdP user profile,
   then update the IdP instance with an expression that references the IdP user profile attribute you just created.

```json
{
  "userNameTemplate": {
    "template": "idpuser.subjectNameId"
  }
}
```

#### OAuth 2.0 Authorization Server Authorization Endpoint Object

Endpoint for an [OAuth 2.0 Authorization Server (AS)](https://tools.ietf.org/html/rfc6749#page-18).

The IdP Authorization Server (AS) endpoints are defined as part of the [IdP provider](#identity-provider-type) and are read only.

| Property   | Description                                                                       | DataType                       | Nullable    | Readonly     | MinLength      | Validation                                      |
| ---------- | -------------------------------------------------                                 | -----------------------------  | ----------- | ------------ | -------------- | ----------------                                |
| url        | URL of the IdP Authorization Server (AS) authorization endpoint                   | String                         | TRUE        | TRUE         | 11             | [RFC 3986](https://tools.ietf.org/html/rfc3986) |
| binding    | HTTP binding used to send a request to the IdP Authorization Server (AS) endpoint | `HTTP-POST` or `HTTP-Redirect` | TRUE        | TRUE         |                |                                                 |

```json
{
  "authorization": {
    "url": "https://idp.example.com/authorize",
    "binding": "HTTP-REDIRECT"
  }
}
```

#### OAuth 2.0 Authorization Server Token Endpoint Object

Endpoint for an [OAuth 2.0 Authorization Server (AS)](https://tools.ietf.org/html/rfc6749#page-18).

The IdP Authorization Server (AS) endpoints are defined as part of the [IdP provider](#identity-provider-type) and are read-only.

| Property   | Description                                                                 | DataType                       | Nullable    | Readonly     | MinLength      | Validation                                      |
| ---------- | -------------------------------------------------                           | ----------------------------   | ----------- | ------------ | -------------- | ----------------                                |
| url        | URL of the IdP Authorization Server (AS) token endpoint                     | String                         | TRUE        | TRUE         | 11             | [RFC 3986](https://tools.ietf.org/html/rfc3986) |
| binding    | HTTP binding used to send request to IdP Authorization Server (AS) endpoint | `HTTP-POST` or `HTTP-Redirect` | TRUE        | TRUE         |                |                                                 |

```json
{
  "token": {
    "url": "https://idp.example.com/token",
    "binding": "HTTP-POST"
  }
}
```

#### OpenID Connect Userinfo Endpoint Object

Endpoint for getting identity information about the user. For more information on the `/userinfo` endpoint, see [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo).

The `OIDC` endpoints are defined as part of the [IdP provider](#identity-provider-type) and are read-only.

| Property   | Description                                                   | DataType                       | Nullable    | Readonly     | MinLength      | Validation                                      |
| ---------- | -------------------------------------------------             | ----------------------------   | ----------- | ------------ | -------------- | ----------------                                |
| url        | URL of the resource server's `/userinfo` endpoint             | String                         | TRUE        | TRUE         | 11             | [RFC 3986](https://tools.ietf.org/html/rfc3986) |
| binding    | HTTP binding used to send a request to the protected resource | `HTTP-POST` or `HTTP-Redirect` | TRUE        | TRUE         |                |                                                 |

```json
{
  "userInfo": {
    "url": "https://idp.example.com/userinfo",
    "binding": "HTTP-POST"
  }
}
```

#### OpenID Connect JWKs Endpoint Object

Endpoint for the JSON Web Key Set (JWKS) document. This document contains signing keys that are used to validate the signatures from the provider. For more information on JWKS, see [JSON Web Key](https://tools.ietf.org/html/rfc7517).

The `OIDC` endpoints are defined as part of the [IdP provider](#identity-provider-type) and are read-only.

| Property   | Description                                       | DataType                       | Nullable    | Readonly     | MinLength      | Validation                                      |
| ---------- | ------------------------------------------------- | ----------------------------   | ----------- | ------------ | -------------- | ----------------                                |
| url        | URL of the endpoint to the JWK Set                | String                         | TRUE        | TRUE         | 11             | [RFC 3986](https://tools.ietf.org/html/rfc3986) |
| binding    | HTTP binding used to send the request             | `HTTP-POST` or `HTTP-Redirect` | TRUE        | TRUE         |                |                                                 |

```json
{
  "jwks": {
    "url": "https://idp.example.com/keys",
    "binding": "HTTP-POST"
  }
}
```

#### Callout Object

> This is a <ApiLifecycle access="deprecated" /> feature.

Webhook settings for an IdP provisioning or account link transaction:

| Property      | Description                                                                   | DataType                                                      | Nullable    | Readonly      | MinLength     | Validation                                      |
| ------------  | --------------------------------------------------------------                | --------------------------------------------------            | ----------- | ------------- | ------------- | ---------------                                 |
| url           | URL of binding-specific endpoint to send the webhook                          | String                                                        | FALSE       | FALSE         | 11            | [RFC 3986](https://tools.ietf.org/html/rfc3986) |
| binding       | HTTP binding used to send the webhook                                         | `HTTP-POST` or `HTTP-Redirect`                                | FALSE       | FALSE         |               |                                                 |
| authorization | HTTP authorization scheme and credentials to authenticate the webhook request | [Callout Authorization Object](#callout-authorization-object) | TRUE        | FALSE         |               |                                                 |

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

##### Callout Authorization Object

Webhook authorization settings for an IdP provisioning or account link transaction:

| Property   | Description                       | DataType                                                    | Nullable    | Readonly      |
| ---------- | --------------------------------- | ----------------------------------------------------------- | ----------- | ------------- |
| basic      | HTTP Basic Authorization Scheme   | [Basic Authorization Scheme](#basic-authorization-scheme)   | FALSE       | FALSE         |
| bearer     | HTTP Bearer Authorization Scheme  | [Bearer Authorization Scheme](#bearer-authorization-scheme) | FALSE       | FALSE         |
| custom     | Custom key/value HTTP headers     | Object                                                      | FALSE       | FALSE         |

Property Details

* A null value specifies that no authorization scheme is used for a callout.
* Authorization schemes are mutually exclusive. Specify a single scheme per callout.

###### Basic Authorization Scheme

| Property      | Description                              | DataType | Nullable | Readonly |
| ------------- | ---------------------------------------- | -------- | -------- | -------- |
| username      | unique identifier for service account    | String   | FALSE    | FALSE    |
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

###### Bearer Authorization Scheme

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

### Links Object

Specifies link relationships (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the IdP
using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification.
This object is used for dynamic discovery of related resources and lifecycle operations, and is read only.

| Link Relation Type | Description                                                                                                                       |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| self               | The primary URL for the IdP                                                                                                       |
| authorize          | OAuth 2.0 authorization endpoint for the IdP [OAuth 2.0 Authorization Code Flow](https://tools.ietf.org/html/rfc6749#section-4.1) |
| clientRedirectUri  | Redirect URI for [OAuth 2.0 Authorization Code Flow](https://tools.ietf.org/html/rfc6749#section-4.1)                             |
| metadata           | Federation metadata document for IdP (e.g SAML 2.0 Metadata)                                                                      |
| acs                | SAML 2.0 Assertion Consumer Service URL for Okta SP                                                                               |
| users              | IdP Users                                                                                                                         |

## Identity Provider Transaction Model

> This is a <ApiLifecycle access="deprecated" /> feature.

The Identity Provider Transaction Model represents an account link or just-in-time (JIT) provisioning transaction.

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
      "href": "https://{yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/source"
    },
    "target": {
      "href": "https://{yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/target"
    },
    "cancel": {
      "href": "https://{yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/cancel",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    },
    "provision": {
      "href": "https://{yourOktaDomain}/api/v1/idps/tx/satvklBYyJmwa6qOg0g3/lifecycle/provision",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Identity Provider Transaction Attributes

All IdP transactions have the following properties:

| Property      | Description                                                                            | DataType                                                        | Nullable  | Unique   | Readonly |
| ------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------  | ------   | -------- |
| id            | unique key for transaction                                                             | String                                                          | FALSE     | TRUE     | TRUE     |
| status        | status of transaction                                                                  | `ACCOUNT_JIT`, `ACCOUNT_LINK` or `SUCCESS`                      | FALSE     | FALSE    | TRUE     |
| created       | timestamp when transaction was created                                                 | Date                                                            | FALSE     | FALSE    | TRUE     |
| expiresAt     | timestamp when transaction expires                                                     | Date                                                            | FALSE     | FALSE    | TRUE     |
| sessionToken  | ephemeral [one-time token](/docs/api/resources/authn/#session-token) used to bootstrap an Okta session      | String                                                          | TRUE      | FALSE    | TRUE     |
| idp           | identity provider for authenticated user                                               | [IdP Authority Object](#identity-provider-authority-object)     | FALSE     | FALSE    | TRUE     |
| context       | optional authentication context for transaction                                        | [Context Object](#identity-provider-transaction-context-object) | FALSE     | FALSE    | TRUE     |
| _links        | [discoverable resources](#links-object) related to the transaction                     | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)  | TRUE      | FALSE    | TRUE     |
| _embedded     | embedded resources related to the transaction                                          | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)  | TRUE      | FALSE    | TRUE     |

> The `sessionToken` is only available for completed transactions with the `SUCCESS` status.

#### Identity Provider Authority Object

Metadata about the IdP that authenticated the user:

| Property | Description             | DataType                                          | Nullable  | Unique   | Readonly |
| -------- | ----------------------- | ------------------------------------------------- | --------  | ------   | -------- |
| id       | unique key for the IdP  | String                                            | FALSE     | TRUE     | TRUE     |
| name     | unique name for the IdP | String                                            | FALSE     | FALSE    | TRUE     |
| type     | type of IdP             | [Identity Provider Type](#identity-provider-type) | FALSE     | FALSE    | TRUE     |

```json
{
  "idp": {
    "id": "0oabmluDNh2JZi8lt0g4",
    "name": "Facebook",
    "type": "FACEBOOK"
  }
}
```

#### Identity Provider Transaction Context Object

Additional context that describes the HTTP client for the transaction:

| Property      | Description                            | DataType                   | Nullable  | Unique   | Readonly |
| ------------- | -------------------------------------- | -------------------------- | --------  | ------   | -------- |
| userAgent     | HTTP User Agent string for transaction | String                     | FALSE     | FALSE    | TRUE     |
| ipAddress     | Client IP Address for transaction      | String                     | FALSE     | FALSE    | TRUE     |

```json
{
  "context": {
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko)
        Chrome/47.0.2526.106 Safari/537.36",
    "ipAddress": "54.197.192.167"
  }
}
```

### Links Object

Specifies link relationships (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the IdP transaction using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification.
This object is used for dynamic discovery of related resources and lifecycle operations, and is read only.

| Link Relation Type       | Description                                                                                                                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------                                                          |
| source                   | [IdP user](#identity-provider-user-model) for the transaction                                                                                                                                                      |
| target                   | Transformed [Okta user profile](/docs/api/resources/users/#profile-object) for the transaction via UD Profile Mappings for the IdP                                                                                  |
| users                    | [Okta user](/docs/api/resources/users/#user-model) candidates for the account link transaction that match the IdP's [account link policy](#account-link-policy-object) and [subject policy](#subject-policy-object) |
| provision                | Lifecycle operation to just-in-time provision a new [Okta user](/docs/api/resources/users/#user-model) for the IdP user                                                                                             |
| next                     | Completes the transaction                                                                                                                                                                                          |
| cancel                   | Cancels the transaction                                                                                                                                                                                            |

## Identity Provider Key Credential Model

The IdP key credential model defines a [JSON Web Key](https://tools.ietf.org/html/rfc7517) for a signature or encryption credential for an IdP.

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

### Identity Provider Key Credential Properties

IdP credential keys have the following properties:

| Property        | Description                                                                      | DataType                                                          | Nullable     | Unique      | Readonly      |
| --------------- | -------------------------------------------------------------------------        | ----------------------------------------------------------------- | ------------ | ----------- | ------------- |
| kid             | unique identifier for the key                                                    | String                                                            | FALSE        | TRUE        | TRUE          |
| created         | timestamp when key was added to the key store                                    | Date                                                              | FALSE        | FALSE       | TRUE          |
| lastUpdated     | timestamp when key was last updated                                              | Date                                                              | FALSE        | FALSE       | TRUE          |
| x5c             | base64-encoded X.509 certificate chain with DER encoding                         | Array                                                             | FALSE        | TRUE        | FALSE         |
| x5t#S256        | base64url-encoded SHA-256 thumbprint of the DER encoding of an X.509 certificate | String                                                            | FALSE        | TRUE        | TRUE          |
| kty             | identifies the cryptographic algorithm family used with the key                  | `RSA`                                                             | FALSE        | FALSE       | TRUE          |
| use             | intended use of the public key                                                   | `sig`                                                             | FALSE        | FALSE       | TRUE          |
| e               | the exponent value for the RSA public key                                        | String                                                            | FALSE        | TRUE        | TRUE          |
| n               | the modulus value for the RSA public key                                         | String                                                            | FALSE        | TRUE        | TRUE          |

> Note that IdP signing keys are read-only

## Identity Provider User Model

The Identity Provider User Model represents a linked user and their IdP user profile.

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
      "href": "https://{yourOktaDomain}/api/v1/idps/0oa1k5d68qR2954hb0g4/users/00ulwodIu7wCfdiVR0g3",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "idp": {
      "href": "https://{yourOktaDomain}/api/v1/idps/0oa1k5d68qR2954hb0g4"
    },
    "user": {
      "href": "https://{yourOktaDomain}/api/v1/users/00ulwodIu7wCfdiVR0g3"
    }
  }
}
```

### Identity Provider User Properties

All linked IdP users have the following properties:

| Property         | Description                                               | DataType                                                                        | Nullable | Unique | Readonly | MaxLength |
| ---------------- | --------------------------------------------------------- | ----------------------------------------------------------------                | -------- | ------ | -------- | --------- |
| id               | unique key of [User](/docs/api/resources/users)           | String                                                                          | FALSE    | TRUE   | TRUE     |           |
| externalId       | unique IdP-specific identifier for user                   | String                                                                          | FALSE    | TRUE   | TRUE     | 512       |
| created          | timestamp when IdP user was created                       | Date                                                                            | FALSE    | FALSE  | TRUE     |           |
| lastUpdated      | timestamp when IdP user was last updated                  | Date                                                                            | FALSE    | FALSE  | TRUE     |           |
| profile          | IdP-specific profile for the user                         | [Identity Provider User Profile Object](#identity-provider-user-profile-object) | FALSE    | FALSE  | TRUE     |           |
| _embedded        | embedded resources related to the IdP user                | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                  | TRUE     | FALSE  | TRUE     |           |
| _links           | discoverable resources related to the IdP user            | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)                  | TRUE     | FALSE  | TRUE     |           |

### Identity Provider User Profile Object

Identity Provider user profiles are IdP-specific but may be customized by the Profile Editor in the administrator UI.

![IdP Profile Editor UI](/img/okta-admin-ui-profile-editor-idp.png "IdP Profile Editor UI")

> Okta variable names have reserved characters that may conflict with the name of an IdP assertion attribute.  You can use the **External name** to define the attribute name as defined in an IdP assertion such as a SAML attribute name.

![IdP Profile Editor Attribute Modal UI](/img/okta-admin-ui-profile-editor-attribute-idp.png "IdP Profile Editor Attribute Modal UI")

#### Example Profile Object

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

### Links Object

Specifies link relationships (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the IdP user using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification.
This object is used for dynamic discovery of related resources and lifecycle operations, and is read only.

| Link Relation Type | Description                                       |
| ------------------ | ----------------------------------                |
| self               | The primary URL for the IdP user                  |
| idp                | The IdP that issued the identity                  |
| users              | The linked [Okta user](/docs/api/resources/users) |

## Identity Provider CSR Model

The CSR model for IdP defines a certificate signing request for a signature or decryption credential for an IdP.

### Example

```json
{
  "id": "h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
  "created": "2017-03-28T01:11:10.000Z",
  "csr": "MIIC4DCCAcgCAQAwcTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xEzARBgNVBAoMCk9rdGEsIEluYy4xDDAKBgNVBAsMA0RldjESMBAGA1UEAwwJU1AgSXNzdWVyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6m8jHVCr9/tKvvbFN59T4raoCs/78KRm4fSefHQOv1TKLXo4wTLbsqYWRWc5u0sd5orUMQgPQOyj3i6qh13mALY4BzrT057EG1BUNjGg29QgYlnOk2iX890e5BIDMQQEIKFrvOi2V8cLUkLvE2ydRn0VO1Q1frbUkYeStJYC5Api2JQsYRwa+1ZeDH1ITnIzUaugWhW2WB2lSnwZkenne5KtffxMPYVu+IhNRHoKaRA6Z51YNhMJIx17JM2hs/H4Ka3drk6kzDf7ofk/yBpb9yBWyU7CTSQhdoHidxqFprMDaT66W928t3AeOENHBuwn8c2K9WeGG+bELNyQRJVmawIDAQABoCowKAYJKoZIhvcNAQkOMRswGTAXBgNVHREEEDAOggxkZXYub2t0YS5jb20wDQYJKoZIhvcNAQELBQADggEBAA2hsVJRVM+A83X9MekjTnIbt19UNT8wX7wlE9jUKirWsxceLiZBpVGn9qfKhhVIpvdaIRSeoFYS2Kg/m1G6bCvjmZLcrQ5FcEBjZH2NKfNppGVnfC2ugtUkBtCB+UUzOhKhRKJtGugenKbP33zRWWIqnd2waF6Cy8TIuqQVPbwEDN9bCbAs7ND6CFYNguY7KYjWzQOeAR716eqpEEXuPYAS4nx/ty4ylonR8cv+gpq51rvq80A4k/36aoeM0Y6I4w64vhTfuvWW2UYFUD+/+y2FA2CSP4JfctySrf1s525v6fzTFZ3qZbB5OZQtP2b8xYWktMzywsxGKDoVDB4wkH4=",
  "kty": "RSA",
  "_links": {
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "publish": {
      "href": "https://{yourOktaDomain}/api/v1/idps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Identity Provider CSR Properties

| Property         | Description                                                  | DataType                                                                     | Nullable   | Unique     | Readonly  |
| ---------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------  | --------   | ------     | --------  |
| id               | unique identifier for the CSR                                | String                                                                       | FALSE      | TRUE       | TRUE      |
| created          | timestamp when CSR was created                               | Date                                                                         | FALSE      | FALSE      | TRUE      |
| csr              | Base64 encoded CSR in DER format                             | String                                                                       | TRUE       | TRUE       | TRUE      |
| kty              | cryptographic algorithm family for the CSR's keypair         | String                                                                       | FALSE      | FALSE      | TRUE      |
| _links           | discoverable resources related to the CSR                    | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-05)               | TRUE       | FALSE      | TRUE      |


## Identity Provider Social Authentication Token Model

The Social Authentication Token Model provides the tokens and associated metadata provided by social providers during social authentication. However, Okta doesn't import all the user information from a social provider. If the app needs information which isn't imported, it can get athe user token from this endpoint, then make an API call to the social provider with the token to request the additional information.

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

### Identity Provider Social Authentication Token Properties

| Property        | Description                                                                                                                             | DataType                                                  | Nullable    | Unique      | Readonly     |
| --------------- | -----------------------------------------------------------------------------                                                           | --------------------------------------------------------- | ----------- | ----------- | ------------ |
| id              | Unique identifier for the token                                                                                                         | String                                                    | FALSE       | TRUE        | TRUE         |
| token           | The raw token.                                                                                                                          | String                                                    | FALSE       | TRUE        | TRUE         |
| tokenType       | The type of token, defined by the [OAuth Token Exchange Spec](https://tools.ietf.org/html/draft-ietf-oauth-token-exchange-07#section-3) | String                                                    | TRUE        | TRUE        | TRUE         |
| tokenAuthScheme | The token authentication scheme as defined by the social provider.                                                                      | String                                                    | FALSE       | FALSE       | TRUE         |
| expiresAt       | The date that the token expires                                                                                                         | Date                                                      | TRUE        | FALSE       | TRUE         |
| scopes          | The scopes which the token is good for                                                                                                  | Array of Strings                                          | FALSE       | FALSE       | TRUE         |
