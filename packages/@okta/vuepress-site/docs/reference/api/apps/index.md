---
title: Apps
category: management
---

# Apps API

The Okta Application API provides operations to manage applications and/or assignments to users or groups for your organization.

## Get started

Explore the Apps API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/377eaf77fdbeaedced17)

## Application operations

### Add application

<ApiOperation method="post" url="/api/v1/apps" />

Adds a new application to your Okta organization

##### Request parameters


| Parameter | Description                                                                            | Param Type | DataType                          | Required | Default |
| --------- | -------------------------------------------------------------------------------------- | ---------- | --------------------------------- | -------- | ------- |
| activate  | Executes [activation lifecycle](#activate-application) operation when creating the app | Query      | Boolean                           | FALSE    | TRUE    |
| app       | App-specific name, signOnMode and settings                                             | Body       | [Application](#application-object) | TRUE     |         |

##### Response parameters


All responses return the created [Application](#application-object).

#### Add Bookmark application

Adds a new Bookmark application to your organization

##### Settings


| Parameter          | Description                                             | DataType | Nullable | Unique | Validation                                |
| ------------------ | ------------------------------------------------------- | -------- | -------- | ------ | ----------------------------------------  |
| requestIntegration | Would you like Okta to add an integration for this app? | Boolean  | FALSE    | FALSE  |                                           |
| url                | The URL of the launch page for this app                 | String   | FALSE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986) |

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "bookmark",
  "label": "Sample Bookmark App",
  "signOnMode": "BOOKMARK",
  "settings": {
    "app": {
      "requestIntegration": false,
      "url": "https://example.com/bookmark.htm"
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps"
```

##### Response example


```json
{
  "id": "0oafxqCAJWWGELFTYASJ",
  "name": "bookmark",
  "label": "Sample Bookmark App",
  "status": "ACTIVE",
  "lastUpdated": "2013-10-01T04:22:31.000Z",
  "created": "2013-10-01T04:22:27.000Z",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "login": true
    }
  },
  "features": [],
  "signOnMode": "BOOKMARK",
  "credentials": {
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "requestIntegration": false,
      "url": "https://example.com/bookmark.htm"
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oafxqCAJWWGELFTYASJ/users"
    },
    "groups": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oafxqCAJWWGELFTYASJ/groups"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oafxqCAJWWGELFTYASJ"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oafxqCAJWWGELFTYASJ/lifecycle/deactivate"
    }
  }
}
```

#### Add Basic Authentication application

Adds a new application that uses HTTP Basic Authentication Scheme and requires a browser plugin

##### Settings


| Parameter | Description                                     | DataType | Nullable | Unique | Validation                                |
| --------- | ----------------------------------------------- | -------- | -------- | ------ | ----------------------------------------  |
| authURL   | The URL of the authenticating site for this app | String   | FALSE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986) |
| url       | The URL of the sign-in page for this app          | String   | FALSE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986) |

##### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "template_basic_auth",
  "label": "Sample Basic Auth App",
  "signOnMode": "BASIC_AUTH",
  "settings": {
    "app": {
      "url": "https://example.com/login.html",
      "authURL": "https://example.com/auth.html"
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps"
```

##### Response example


```json
{
  "id": "0oafwvZDWJKVLDCUWUAC",
  "name": "template_basic_auth",
  "label": "Sample Basic Auth App",
  "status": "ACTIVE",
  "lastUpdated": "2013-09-30T00:56:52.365Z",
  "created": "2013-09-30T00:56:52.365Z",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "login": true
    }
  },
  "features": [],
  "signOnMode": "BASIC_AUTH",
  "credentials": {
    "scheme": "EDIT_USERNAME_AND_PASSWORD",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "url": "https://example.com/login.html",
      "authURL": "https://example.com/auth.html"
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oafwvZDWJKVLDCUWUAC/users"
    },
    "groups": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oafwvZDWJKVLDCUWUAC/groups"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oafwvZDWJKVLDCUWUAC"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oafwvZDWJKVLDCUWUAC/lifecycle/deactivate"
    }
  }
}
```

#### Add Okta Org2Org application

Adds a new Okta Org2Org application to your organization

##### Settings


| Parameter          | Description                                             | DataType | Nullable | Unique | Validation                                |
| ------------------ | ------------------------------------------------------- | -------- | -------- | ------ | ----------------------------------------  |
| acsUrl  | The Assertion Consumer Service (ACS) URL of the source org | String | TRUE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986) |
| audRestriction  | Audience URI | String | TRUE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986) |
| baseUrl | The login URL of the target Okta org | String  | TRUE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986) |

##### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "okta_org2org",
  "label": "Sample Okta Org2Org App",
  "signOnMode": "SAML_2_0",
  "settings": {
    "app": {
      "acsUrl": "https://example.okta.com/sso/saml2/exampleid",
      "audRestriction": "https://www.okta.com/saml2/service-provider/exampleid",
      "baseUrl": "https://example.okta.com"
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps"
```

##### Response example


```json
{
  "id":"0oawpacQMRQtvkxOf0g3",
  "name":"okta_org2org",
  "label":"Sample Okta Org2Org App",
  "status":"ACTIVE",
  "lastUpdated":"2020-10-29T17:31:38.000Z",
  "created":"2020-10-29T17:31:37.000Z",
  "accessibility":{
    "selfService":false,
    "errorRedirectUrl":null,
    "loginRedirectUrl":null
  },
  "visibility":{
    "autoSubmitToolbar":false,
    "hide":{
      "iOS":false,
      "web":false
    },
    "appLinks":{
      "login":true
    }
  },
  "features":[],
  "signOnMode":"SAML_2_0",
  "credentials":{
    "userNameTemplate":{
      "template":"${source.login}",
      "type":"BUILT_IN"
    },
    "signing":{
      "kid":"8UZti4303PKyV45L1KmnSuI8obmjYEsj_X5kPp_ES60"
    }
  },
  "settings":{
    "app":{
      "acsUrl":"https://example.okta.com/sso/saml2/exampleid",
      "audRestriction":"https://www.okta.com/saml2/service-provider/exampleid",
      "baseUrl":"https://example.okta.com"
    },
    "notifications":{
      "vpn":{
        "network":{
          "connection":"DISABLED"
        },
        "message":null,
        "helpUrl":null
      }
    },
    "signOn":{
      "defaultRelayState":null,
      "ssoAcsUrlOverride":null,
      "audienceOverride":null,
      "recipientOverride":null,
      "destinationOverride":null,
      "attributeStatements":[]
    }
  },
  "_links":{
    "help":{
      "href":"http://${yourOktaDomain}/app/okta_org2org/0oawpacQMRQtvkxOf0g3/setup/help/SAML_2_0/external-doc",
      "type":"text/html"
    },
    "metadata":{
      "href":"http://${yourOktaDomain}/api/v1/apps/0oawpacQMRQtvkxOf0g3/sso/saml/metadata",
      "type":"application/xml"
    },
    "appLinks":[
      {
        "name":"login",
        "href":"http://${yourOktaDomain}/home/okta_org2org/0oawpacQMRQtvkxOf0g3/1857",
        "type":"text/html"
      }
    ],
    "groups":{
      "href":"http://${yourOktaDomain}/api/v1/apps/0oawpacQMRQtvkxOf0g3/groups"
    },
    "logo":[
      {
        "name":"medium",
        "href":"http://${yourOktaDomain}/assets/img/logos/okta-logo-admin.f5cef92fdcff9fbc3b1835def5de1314.png",
        "type":"image/png"
      }
    ],
    "users":{
      "href":"http://${yourOktaDomain}/api/v1/apps/0oawpacQMRQtvkxOf0g3/users"
    },
    "deactivate":{
      "href":"http://${yourOktaDomain}/api/v1/apps/0oawpacQMRQtvkxOf0g3/lifecycle/deactivate"
    }
  }
}
```

#### Add SAML 2.0 Authentication application

Adds a SAML 2.0 application instance

##### Settings


| Parameter | Description                                     | DataType | Nullable | Unique | Validation                                |
| --------- | ----------------------------------------------- | -------- | -------- | ------ | ----------------------------------------  |
| attributeStatements   | Check [here](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0-cd-02.html) for details | [Attribute Statements](#attribute-statements-object) | TRUE     | FALSE  |  |
| destinationOverride   | Overrides the `destination` setting   | String  | FALSE     | FALSE  |                                           |
| url       | The URL of the sign-in page for this app          | String   | FALSE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986) |

##### Request example


```bash
curl -X POST \
  -H 'Accept: application/json' \
  -H 'Authorization: SSWS ${api_token}' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "cornerstone",
  "label": "Example SAML 2.0 App",
  "signOnMode": "SAML_2_0",
  "settings": {
    "app": {
      "orgName": "${yourOktaDomain}",
      "url": "https://example.com/login.html"
    },
     "signOn": {
     	    "destinationOverride": "http://www.yourDestinationOverride.com",
            "attributeStatements": [
                    {
                        "type": "EXPRESSION",
                        "name": "firstName",
                        "namespace": "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified",
                        "values": [
                            "ValueFromAPI"
                        ]
                    }
                ]
    }
  }
}' "http://${yourOktaDomain}/api/v1/apps"
```

##### Response example


```json
{
  "id": "0oaugbelRxD4cY31S0g3",
  "name": "cornerstone",
  "label": "Example SAML 2.0 App",
  "status": "ACTIVE",
  "lastUpdated": "2020-01-28T18:59:30.000Z",
  "created": "2020-01-28T18:59:30.000Z",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null,
    "loginRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
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
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    },
    "signing": {}
  },
  "settings": {
    "app": {
      "acsURL": null,
      "orgName": "${yourOktaDomain}"
    },
    "notifications": {
      "vpn": {
        "network": {
          "connection": "DISABLED"
        },
        "message": null,
        "helpUrl": null
      }
    },
    "signOn": {
      "defaultRelayState": null,
      "ssoAcsUrlOverride": null,
      "audienceOverride": null,
      "recipientOverride": null,
      "destinationOverride": "http://www.yourDestinationOverride.com",
      "attributeStatements": [
        {
          "type": "EXPRESSION",
          "name": "firstName",
          "namespace": "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified",
          "values": [
            "ValueFromAPI"
          ]
        }
      ]
    }
  },
  "_links": {
    "help": {
      "href": "http://${yourOktaDomain}/app/cornerstone/0oaugbelRxD4cY31S0g3/setup/help/SAML_2_0/external-doc",
      "type": "text/html"
    },
    "metadata": {
      "href": "http://${yourOktaDomain}/api/v1/apps/0oaugbelRxD4cY31S0g3/sso/saml/metadata",
      "type": "application/xml"
    },
    "appLinks": [
      {
        "name": "login",
        "href": "http://${yourOktaDomain}/home/cornerstone/0oaugbelRxD4cY31S0g3/165",
        "type": "text/html"
      }
    ],
    "groups": {
      "href": "http://${yourOktaDomain}/api/v1/apps/0oaugbelRxD4cY31S0g3/groups"
    },
    "logo": [
      {
        "name": "medium",
        "href": "http://${yourOktaDomain}/assets/img/logos/cornerstone.a63cddeecf3acc5aae6d4592dcfe8125.png",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "http://${yourOktaDomain}/api/v1/apps/0oaugbelRxD4cY31S0g3/users"
    },
    "deactivate": {
      "href": "http://${yourOktaDomain}/api/v1/apps/0oaugbelRxD4cY31S0g3/lifecycle/deactivate"
    }
  }
}
```


#### Add plugin SWA application

Adds a SWA application that requires a browser plugin

##### Settings


| Parameter     | Description                                                  | DataType | Nullable | Unique | Validation                                |
| ------------- | -----------------------------------------------------------  | -------- | -------- | ------ | ----------------------------------------  |
| buttonField   | CSS selector for the **Sign-In** button in the sign-in form                                   | String   | FALSE    | FALSE  |                                      |
| loginUrlRegex | A regular expression that further restricts `url` to the specified regular expression | String   | FALSE    | FALSE  |                                           |
| passwordField | CSS selector for the **Password** field in the sign-in form                                 | String   | FALSE    | FALSE  |                                       |
| url           | The URL of the sign-in page for this app                                                | String   | FALSE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986) |
| usernameField | CSS selector for the **Username** field in the sign-in form                                 | String   | FALSE    | FALSE  |                                       |

##### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "template_swa",
  "label": "Sample Plugin App",
  "signOnMode": "BROWSER_PLUGIN",
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html",
      "loginUrlRegex": "REGEX_EXPRESSION"
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps"
```

##### Response example


```json
{
  "id": "0oabkvBLDEKCNXBGYUAS",
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
  "lastUpdated": "2013-09-11T17:58:54.000Z",
  "created": "2013-09-11T17:46:08.000Z",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "login": true
    }
  },
  "features": [],
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "EDIT_USERNAME_AND_PASSWORD",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html",
      "loginUrlRegex": "REGEX_EXPRESSION"
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
    },
    "groups": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
    }
  }
}
```

#### Add plugin SWA (3 field) application

Adds a SWA application that requires a browser plugin and supports three CSS selectors for the sign-in form

##### Settings


| Parameter          | Description                                                                                 | DataType | Nullable | Unique | Validation                                |
| ------------------ | -----------------------------------------------------                                       | -------- | -------- | ------ | ----------------------------------------  |
| buttonSelector     | CSS selector for the **Sign-In** button in the sign-in form                                         | String   | FALSE    | FALSE  |                                           |
| extraFieldSelector | CSS selector for the extra field in the form                                                | String   | FALSE    | FALSE  |                                           |
| extraFieldValue    | Value for extra field form field                                                            | String   | FALSE    | FALSE  |                                           |
| loginUrlRegex      | A regular expression that further restricts `targetURL` to the specified regular expression | String   | FALSE    | FALSE  |                                           |
| passwordSelector   | CSS selector for the **Password** field in the sign-in form                                       | String   | FALSE    | FALSE  |                                           |
| targetURL          | The URL of the sign-in page for this app                                                      | String   | FALSE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986) |
| usernameSelector   | CSS selector for the **Username** field in the sign-in form                                       | String   | FALSE    | FALSE  |                                           |

##### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "template_swa3field",
  "label": "Sample Plugin App",
  "signOnMode": "BROWSER_PLUGIN",
  "settings": {
    "app": {
      "buttonSelector": "#btn-login",
      "passwordSelector": "#txtbox-password",
      "userNameSelector": "#txtbox-username",
      "targetURL": "https://example.com/login.html",
      "extraFieldSelector": ".login",
      "extraFieldValue": "SOMEVALUE",
      "loginUrlRegex": "REGEX_EXPRESSION"
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps"
```

##### Response example


```json
{
  "id": "0oabkvBLDEKCNXBGYUAS",
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
  "lastUpdated": "2013-09-11T17:58:54.000Z",
  "created": "2013-09-11T17:46:08.000Z",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "login": true
    }
  },
  "features": [],
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "EDIT_USERNAME_AND_PASSWORD",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "buttonField": "#btn-login",
      "passwordField": "#txtbox-password",
      "usernameField": "#txtbox-username",
      "url": "https://example.com/login.html",
      "extraFieldSelector": ".login",
      "extraFieldValue": "SOMEVALUE",
      "loginUrlRegex": "REGEX_EXPRESSION"
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
    },
    "groups": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
    }
  }
}
```

#### Add SWA application (no plugin)

Adds a SWA application that uses HTTP POST and doesn't require a browser plugin

##### Settings


| Parameter           | Description                                           | DataType  | Nullable | Unique | Validation                                |
| ------------------- | ----------------------------------------------------- | --------- | -------- | ------ | ----------------------------------------  |
| optionalField1      | Name of the optional parameter in the sign-in form      | String    | TRUE     | FALSE  |                                           |
| optionalField1Value | Name of the optional value in the sign-in form          | String    | TRUE     | FALSE  |                                           |
| optionalField2      | Name of the optional parameter in the sign-in form      | String    | TRUE     | FALSE  |                                           |
| optionalField2Value | Name of the optional value in the sign-in form          | String    | TRUE     | FALSE  |                                           |
| optionalField3      | Name of the optional parameter in the sign-in form      | String    | TRUE     | FALSE  |                                           |
| optionalField3Value | Name of the optional value in the sign-in form          | String    | TRUE     | FALSE  |                                           |
| passwordField       | CSS selector for the **Password** field in the sign-in form | String    | FALSE    | FALSE  |                                           |
| url                 | The URL of the sign-in page for this app                | String    | FALSE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986) |
| usernameField       | CSS selector for the **Username** field in the sign-in form | String    | FALSE    | FALSE  |                                           |

##### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "template_sps",
  "label": "Example SWA App",
  "signOnMode": "SECURE_PASSWORD_STORE",
  "settings": {
    "app": {
      "url": "https://example.com/login.html",
      "passwordField": "#txtbox-password",
      "usernameField": "#txtbox-username",
      "optionalField1": "param1",
      "optionalField1Value": "somevalue",
      "optionalField2": "param2",
      "optionalField2Value": "yetanothervalue",
      "optionalField3": "param3",
      "optionalField3Value": "finalvalue"
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps"
```

##### Response example


```json
{
  "id": "0oafywQDNMXLYDBIHQTT",
  "name": "template_sps",
  "label": "Example SWA App",
  "status": "ACTIVE",
  "lastUpdated": "2013-10-01T05:41:01.983Z",
  "created": "2013-10-01T05:41:01.983Z",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "login": true
    }
  },
  "features": [],
  "signOnMode": "SECURE_PASSWORD_STORE",
  "credentials": {
    "scheme": "EDIT_USERNAME_AND_PASSWORD",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "url": "https://example.com/login.html",
      "passwordField": "#txtbox-password",
      "usernameField": "#txtbox-username",
      "optionalField1": "param1",
      "optionalField1Value": "somevalue",
      "optionalField2": "param2",
      "optionalField2Value": "yetanothervalue",
      "optionalField3": "param3",
      "optionalField3Value": "finalvalue"
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oafywQDNMXLYDBIHQTT/users"
    },
    "groups": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oafywQDNMXLYDBIHQTT/groups"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oafywQDNMXLYDBIHQTT"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oafywQDNMXLYDBIHQTT/lifecycle/deactivate"
    }
  }
}
```

#### Add custom SWA application

Adds a SWA application. This application is only available to the org that creates it.

##### Settings


| Parameter           | Description                                           | DataType  | Nullable | Unique | Validation                                |
| ------------------- | ----------------------------------------------------- | --------- | -------- | ------ | ----------------------------------------  |
| loginUrl            | Primary URL of the sign-in page for this app            | String    | FALSE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986) |
| redirectUrl         | Secondary URL of the sign-in page for this app          | String    | TRUE     | FALSE  | [URL](http://tools.ietf.org/html/rfc3986) |

##### Request example

> **Note:** An [Application](#application-object)'s `signOnMode` must be set to `AUTO_LOGIN`, the `name` field must be left blank, and the `label` field must be defined.

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "label": "Example Custom SWA App",
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    }
  },
  "features": [],
  "signOnMode": "AUTO_LOGIN",
  "settings": {
    "signOn": {
      "redirectUrl": "http://swasecondaryredirecturl.okta.com",
      "loginUrl": "http://swaprimaryloginurl.okta.com"
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps"
```

##### Response example


```json
{
  "id": "0oaugjme6G6Aq6h7m0g3",
  "name": "testorgone_examplecustomswaapp_1",
  "label": "Example Custom SWA App",
  "status": "ACTIVE",
  "lastUpdated": "2016-06-29T17:11:24.000Z",
  "created": "2016-06-29T17:11:24.000Z",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null,
    "loginRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "testorgone_examplecustomswaapp_1_link": true
    }
  },
  "features": [],
  "signOnMode": "AUTO_LOGIN",
  "credentials": {
    "scheme": "EDIT_USERNAME_AND_PASSWORD",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    },
    "revealPassword": false,
    "signing": {}
  },
  "settings": {
    "app": {},
    "notifications": {
      "vpn": {
        "network": {
          "connection": "DISABLED"
        },
        "message": null,
        "helpUrl": null
      }
    },
    "signOn": {
      "redirectUrl": "http://swasecondaryredirecturl.okta.com",
      "loginUrl": "http://swaprimaryloginurl.okta.com"
    }
  },
  "_links": {
    "logo": [
      {
        "name": "medium",
        "href": "http://testorgone.okta.com:/assets/img/logos/default.6770228fb0dab49a1695ef440a5279bb.png",
        "type": "image/png"
      }
    ],
    "appLinks": [
      {
        "name": "testorgone_examplecustomswaapp_1_link",
        "href": "http://testorgone.okta.com/home/testorgone_examplecustomswaapp_1/0oaugjme6G6Aq6h7m0g3/alnuqqc3uS8X6L4Se0g3",
        "type": "text/html"
      }
    ],
    "users": {
      "href": "http://testorgone.okta.com/api/v1/apps/0oaugjme6G6Aq6h7m0g3/users"
    },
    "deactivate": {
      "href": "http://testorgone.okta.com/api/v1/apps/0oaugjme6G6Aq6h7m0g3/lifecycle/deactivate"
    },
    "groups": {
      "href": "http://testorgone.okta.com/api/v1/apps/0oaugjme6G6Aq6h7m0g3/groups"
    }
  }
}
```

#### Add custom SAML application

Adds a SAML 2.0 application. This application is only available to the org that creates it.

##### Settings

| Parameter             | Description                                     | DataType                             | Nullable | Unique | Validation                              |
| --------------------- | ----------------------------------------------- | ------------------------------------ | -------- | -----  | --------------------------------------  |
| allowMultipleAcsEndpoints       | Determines whether the app allows you to configure multiple ACS URIs                                    | Boolean                                              | FALSE    | FALSE  |                                           |
| acsEndpoints          | An array of ACS endpoints. You can configure a maximum of 100 endpoints.                                          | Array of [ACS Endpoints](#acs-endpoint-object)       | TRUE     | FALSE  |                                           |
| assertionSigned       | Determines whether the SAML assertion is digitally signed or not                                                  | Boolean                                              | FALSE    | FALSE  |                                           |
| attributeStatements   | Check the [SAML Technical Overview](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0-cd-02.html) for details | [Attribute Statements](#attribute-statements-object) | TRUE     | FALSE  |                                           |
| audience              | Audience URI (SP Entity ID)                                                                                       | String                                               | FALSE    | FALSE  |                                           |
| audienceOverride      | Overrides the `audience` setting                                                                                  | String                                               | TRUE     | FALSE  |                                           |
| authnContextClassRef  | Identifies the SAML authentication context class for the assertion's authentication statement                     | String                                               | FALSE    | FALSE  |                                           |
| defaultRelayState     | Identifies a specific application resource in an IDP-initiated SSO scenario                                      | String                                               | TRUE     | FALSE  |                                           |
| destination           | Identifies the location where the SAML response is intended to be sent inside of the SAML assertion               | String                                               | FALSE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986) |
| destinationOverride   | Overrides the `destination` setting                                                                               | String                                               | TRUE     | FALSE  |                                           |
| digestAlgorithm       | Determines the digest algorithm used to digitally sign the SAML assertion and response                            | String                                               | FALSE    | FALSE  |                                           |
| honorForceAuthn       | Prompt user to re-authenticate if SP asks for it                                                                  | Boolean                                              | FALSE    | FALSE  |                                           |
| idpIssuer             | SAML Issuer ID                                                                                                    | String                                               | FALSE    | FALSE  |                                           |
| recipient             | The location where the app may present the SAML assertion                                                         | String                                               | FALSE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986) |
| recipientOverride     | Overrides the `recipient` setting                                                                                 | String                                               | TRUE     | FALSE  | [URL](http://tools.ietf.org/html/rfc3986) |
| requestCompressed     | Determines whether the SAML request is expected to be compressed or not                                           | Boolean                                              | FALSE    | FALSE  |                                           |
| responseSigned        | Determines whether the SAML authentication response message is digitally signed by the IDP or not                 | Boolean                                              | FALSE    | FALSE  |                                           |
| signatureAlgorithm    | Determines the signing algorithm used to digitally sign the SAML assertion and response                           | String                                               | FALSE    | FALSE  |                                           |
| slo                   | Determines if the application supports Single Logout                                                              | [Single Logout](#single-logout-object)               | TRUE     | FALSE  |
| ssoAcsUrl             | Single Sign-On URL                                                                                                | String                                               | FALSE    | FALSE  | [URL](http://tools.ietf.org/html/rfc3986) |
| ssoAcsUrlOverride     | Overrides the `ssoAcsUrl` setting                                                                                 | String                                               | TRUE     | FALSE  | [URL](http://tools.ietf.org/html/rfc3986) |
| spCertificate         | The certificate that Okta uses to validate Single Logout (SLO) requests                                           | [SP Certificate](#service-provider-certificate)      | TRUE     | FALSE  |
| subjectNameIdFormat   | Identifies the SAML processing rules                                                                             | String                                               | FALSE    | FALSE  |                                           |
| subjectNameIdTemplate | Template for app user's username when a user is assigned to the app                                              | String                                               | FALSE    | FALSE  |                                           |

* You can't update the application's Assertion Encryption configuration through the API. Use the Admin Console.
* Either (or both) `responseSigned` or `assertionSigned` must be `TRUE`.
* The override settings `ssoAcsUrlOverride`, `recipientOverride`, `destinationOverride`, and `audienceOverride` provide an alternative way of persisting post back and similar other URLs.
    For example, you can use `ssoAcsUrlOverride` that supports the cloud access security broker (CASB) use case for Office365 app instances.

    * In SAML 1.1 (for example, Office365 apps), `destinationOverride` isn't available.
    * In SAML 2.0, like Box app, all four overrides are available.
    * In App Wizard SAML App, no override attributes are available.

* If Single Logout is supported by the application and the `slo` object is provided in the request, the `spCertificate` object must be present.
* When you update an application, if you don't specify `slo` or `spCertificate` the existing configuration persists.

##### Supported values for custom SAML app

The following values are support for creating custom SAML 2.0 Apps. Check [Attribute statements](#attribute-statements-object) to see its supported values.

###### Name ID format

| Label           | Value                                                     |
| --------------- | ------------                                              |
| Email Address   | urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress    |
| Persistent      | urn:oasis:names:tc:SAML:2.0:nameid-format:persistent      |
| Transient       | urn:oasis:names:tc:SAML:2.0:nameid-format:transient       |
| Unspecified     | urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified     |
| x509SubjectName | urn:oasis:names:tc:SAML:1.1:nameid-format:x509SubjectName |

###### Signature algorithm

| Label            | Value      |
| ---------------- | ---------  |
| RSA-SHA1         | RSA_SHA1   |
| RSA-SHA256       | RSA_SHA256 |

###### Digest algorithm

| Label            | Value     |
| ---------------- | --------- |
| SHA1             | SHA1      |
| SHA256           | SHA256    |

###### Authentication context class

| Label                              | Value                                                               |
| ---------------------------------- | ------------------------------------------------------------------- |
| Integrated Windows Authentication  | urn:federation:authentication:windows                               |
| Kerberos                           | oasis:names:tc:SAML:2.0:ac:classes:Kerberos                         |
| Password                           | urn:oasis:names:tc:SAML:2.0:ac:classes:Password                     |
| PasswordProtectedTransport         | urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport   |
| TLS Client                         | urn:oasis:names:tc:SAML:2.0:ac:classes:TLSClient                    |
| Unspecified                        | urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified                  |
| X509 Certificate                   | urn:oasis:names:tc:SAML:2.0:ac:classes:X509                         |

##### Request example

> **Note:** An [Application](#application-object)'s `signOnMode` must be set to `SAML_2_0`, the `name` field must be left blank, and the `label` field must be defined.

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "label": "Example Custom SAML 2.0 App",
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    }
  },
  "features": [],
  "signOnMode": "SAML_2_0",
  "settings": {
    "signOn": {
      "defaultRelayState": "",
      "ssoAcsUrl": "http://testorgone.okta",
      "idpIssuer": "http://www.okta.com/${org.externalKey}",
      "audience": "asdqwe123",
      "recipient": "http://testorgone.okta",
      "destination": "http://testorgone.okta",
      "subjectNameIdTemplate": "${user.userName}",
      "subjectNameIdFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
      "responseSigned": true,
      "assertionSigned": true,
      "signatureAlgorithm": "RSA_SHA256",
      "digestAlgorithm": "SHA256",
      "honorForceAuthn": true,
      "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport",
      "slo": {
        "enabled": true,
        "spIssuer": "https://testorgone.okta.com",
        "logoutUrl": "https://testorgone.okta.com/logout"
      },
      "spCertificate": {
        "x5c": [
	  "MIIFnDCCA4QCCQDBSLbiON2T1zANBgkqhkiG9w0BAQsFADCBjzELMAkGA1UEBhMCVVMxDjAMBgNV\r\nBAgMBU1haW5lMRAwDgYDVQQHDAdDYXJpYm91MRcwFQYDVQQKDA5Tbm93bWFrZXJzIEluYzEUMBIG\r\nA1UECwwLRW5naW5lZXJpbmcxDTALBgNVBAMMBFNub3cxIDAeBgkqhkiG9w0BCQEWEWVtYWlsQGV4\r\nYW1wbGUuY29tMB4XDTIwMTIwMzIyNDY0M1oXDTMwMTIwMTIyNDY0M1owgY8xCzAJBgNVBAYTAlVT\r\nMQ4wDAYDVQQIDAVNYWluZTEQMA4GA1UEBwwHQ2FyaWJvdTEXMBUGA1UECgwOU25vd21ha2VycyBJ\r\nbmMxFDASBgNVBAsMC0VuZ2luZWVyaW5nMQ0wCwYDVQQDDARTbm93MSAwHgYJKoZIhvcNAQkBFhFl\r\nbWFpbEBleGFtcGxlLmNvbTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBANMmWDjXPdoa\r\nPyzIENqeY9njLan2FqCbQPSestWUUcb6NhDsJVGSQ7XR+ozQA5TaJzbP7cAJUj8vCcbqMZsgOQAu\r\nO/pzYyQEKptLmrGvPn7xkJ1A1xLkp2NY18cpDTeUPueJUoidZ9EJwEuyUZIktzxNNU1pA1lGijiu\r\n2XNxs9d9JR/hm3tCu9Im8qLVB4JtX80YUa6QtlRjWR/H8a373AYCOASdoB3c57fIPD8ATDNy2w/c\r\nfCVGiyKDMFB+GA/WTsZpOP3iohRp8ltAncSuzypcztb2iE+jijtTsiC9kUA2abAJqqpoCJubNShi\r\nVff4822czpziS44MV2guC9wANi8u3Uyl5MKsU95j01jzadKRP5S+2f0K+n8n4UoV9fnqZFyuGAKd\r\nCJi9K6NlSAP+TgPe/JP9FOSuxQOHWJfmdLHdJD+evoKi9E55sr5lRFK0xU1Fj5Ld7zjC0pXPhtJf\r\nsgjEZzD433AsHnRzvRT1KSNCPkLYomznZo5n9rWYgCQ8HcytlQDTesmKE+s05E/VSWNtH84XdDrt\r\nieXwfwhHfaABSu+WjZYxi9CXdFCSvXhsgufUcK4FbYAHl/ga/cJxZc52yFC7Pcq0u9O2BSCjYPdQ\r\nDAHs9dhT1RhwVLM8RmoAzgxyyzau0gxnAlgSBD9FMW6dXqIHIp8yAAg9cRXhYRTNAgMBAAEwDQYJ\r\nKoZIhvcNAQELBQADggIBADofEC1SvG8qa7pmKCjB/E9Sxhk3mvUO9Gq43xzwVb721Ng3VYf4vGU3\r\nwLUwJeLt0wggnj26NJweN5T3q9T8UMxZhHSWvttEU3+S1nArRB0beti716HSlOCDx4wTmBu/D1MG\r\nt/kZYFJw+zuzvAcbYct2pK69AQhD8xAIbQvqADJI7cCK3yRry+aWtppc58P81KYabUlCfFXfhJ9E\r\nP72ffN4jVHpX3lxxYh7FKAdiKbY2FYzjsc7RdgKI1R3iAAZUCGBTvezNzaetGzTUjjl/g1tcVYij\r\nltH9ZOQBPlUMI88lxUxqgRTerpPmAJH00CACx4JFiZrweLM1trZyy06wNDQgLrqHr3EOagBF/O2h\r\nhfTehNdVr6iq3YhKWBo4/+RL0RCzHMh4u86VbDDnDn4Y6HzLuyIAtBFoikoKM6UHTOa0Pqv2bBr5\r\nwbkRkVUxl9yJJw/HmTCdfnsM9dTOJUKzEglnGF2184Gg+qJDZB6fSf0EAO1F6sTqiSswl+uHQZiy\r\nDaZzyU7Gg5seKOZ20zTRaX3Ihj9Zij/ORnrARE7eM/usKMECp+7syUwAUKxDCZkGiUdskmOhhBGL\r\nJtbyK3F2UvoJoLsm3pIcvMak9KwMjSTGJB47ABUP1+w+zGcNk0D5Co3IJ6QekiLfWJyQ+kKsWLKt\r\nzOYQQatrnBagM7MI2/T4\r\n"
        ]
      },
      "requestCompressed": false,
      "allowMultipleAcsEndpoints": true,
      "acsEndpoints": [
        {
          "url": "http://testorgone.okta",
          "index":0
        },
        {
          "url": "http://testorgone.okta/1",
          "index":1
        }
      ],
      "attributeStatements": [
        {
          "type": "EXPRESSION",
          "name": "Attribute",
          "namespace": "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified",
          "values": [
            "Value"
          ]
        }
      ]
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps"
```

##### Response example


```json
{
  "id": "0oav8uiWzPDrDMYxU0g3",
  "name": "testorgone_examplecustomsaml20app_1",
  "label": "Example Custom SAML 2.0 App",
  "status": "ACTIVE",
  "lastUpdated": "2016-06-29T19:57:33.000Z",
  "created": "2016-06-29T19:57:33.000Z",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null,
    "loginRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "testorgone_examplecustomsaml20app_6_link": true
    }
  },
  "features": [],
  "signOnMode": "SAML_2_0",
  "credentials": {
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    },
    "signing": {}
  },
  "settings": {
    "app": {},
    "notifications": {
      "vpn": {
        "network": {
          "connection": "DISABLED"
        },
        "message": null,
        "helpUrl": null
      }
    },
    "signOn": {
      "defaultRelayState": null,
      "ssoAcsUrl": "http://testorgone.okta",
      "idpIssuer": "http://www.okta.com/${org.externalKey}",
      "audience": "asdqwe123",
      "recipient": "http://testorgone.okta",
      "destination": "http://testorgone.okta",
      "subjectNameIdTemplate": "${user.userName}",
      "subjectNameIdFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
      "responseSigned": true,
      "assertionSigned": true,
      "signatureAlgorithm": "RSA_SHA256",
      "digestAlgorithm": "SHA256",
      "honorForceAuthn": true,
      "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport",
      "spIssuer": null,
      "slo": {
        "enabled": true,
        "spIssuer": "https://testorgone.okta.com",
        "logoutUrl": "https://testorgone.okta.com/logout"
      },
      "spCertificate": {
        "x5c": [
	  "MIIFnDCCA4QCCQDBSLbiON2T1zANBgkqhkiG9w0BAQsFADCBjzELMAkGA1UEBhMCVVMxDjAMBgNV\r\nBAgMBU1haW5lMRAwDgYDVQQHDAdDYXJpYm91MRcwFQYDVQQKDA5Tbm93bWFrZXJzIEluYzEUMBIG\r\nA1UECwwLRW5naW5lZXJpbmcxDTALBgNVBAMMBFNub3cxIDAeBgkqhkiG9w0BCQEWEWVtYWlsQGV4\r\nYW1wbGUuY29tMB4XDTIwMTIwMzIyNDY0M1oXDTMwMTIwMTIyNDY0M1owgY8xCzAJBgNVBAYTAlVT\r\nMQ4wDAYDVQQIDAVNYWluZTEQMA4GA1UEBwwHQ2FyaWJvdTEXMBUGA1UECgwOU25vd21ha2VycyBJ\r\nbmMxFDASBgNVBAsMC0VuZ2luZWVyaW5nMQ0wCwYDVQQDDARTbm93MSAwHgYJKoZIhvcNAQkBFhFl\r\nbWFpbEBleGFtcGxlLmNvbTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBANMmWDjXPdoa\r\nPyzIENqeY9njLan2FqCbQPSestWUUcb6NhDsJVGSQ7XR+ozQA5TaJzbP7cAJUj8vCcbqMZsgOQAu\r\nO/pzYyQEKptLmrGvPn7xkJ1A1xLkp2NY18cpDTeUPueJUoidZ9EJwEuyUZIktzxNNU1pA1lGijiu\r\n2XNxs9d9JR/hm3tCu9Im8qLVB4JtX80YUa6QtlRjWR/H8a373AYCOASdoB3c57fIPD8ATDNy2w/c\r\nfCVGiyKDMFB+GA/WTsZpOP3iohRp8ltAncSuzypcztb2iE+jijtTsiC9kUA2abAJqqpoCJubNShi\r\nVff4822czpziS44MV2guC9wANi8u3Uyl5MKsU95j01jzadKRP5S+2f0K+n8n4UoV9fnqZFyuGAKd\r\nCJi9K6NlSAP+TgPe/JP9FOSuxQOHWJfmdLHdJD+evoKi9E55sr5lRFK0xU1Fj5Ld7zjC0pXPhtJf\r\nsgjEZzD433AsHnRzvRT1KSNCPkLYomznZo5n9rWYgCQ8HcytlQDTesmKE+s05E/VSWNtH84XdDrt\r\nieXwfwhHfaABSu+WjZYxi9CXdFCSvXhsgufUcK4FbYAHl/ga/cJxZc52yFC7Pcq0u9O2BSCjYPdQ\r\nDAHs9dhT1RhwVLM8RmoAzgxyyzau0gxnAlgSBD9FMW6dXqIHIp8yAAg9cRXhYRTNAgMBAAEwDQYJ\r\nKoZIhvcNAQELBQADggIBADofEC1SvG8qa7pmKCjB/E9Sxhk3mvUO9Gq43xzwVb721Ng3VYf4vGU3\r\nwLUwJeLt0wggnj26NJweN5T3q9T8UMxZhHSWvttEU3+S1nArRB0beti716HSlOCDx4wTmBu/D1MG\r\nt/kZYFJw+zuzvAcbYct2pK69AQhD8xAIbQvqADJI7cCK3yRry+aWtppc58P81KYabUlCfFXfhJ9E\r\nP72ffN4jVHpX3lxxYh7FKAdiKbY2FYzjsc7RdgKI1R3iAAZUCGBTvezNzaetGzTUjjl/g1tcVYij\r\nltH9ZOQBPlUMI88lxUxqgRTerpPmAJH00CACx4JFiZrweLM1trZyy06wNDQgLrqHr3EOagBF/O2h\r\nhfTehNdVr6iq3YhKWBo4/+RL0RCzHMh4u86VbDDnDn4Y6HzLuyIAtBFoikoKM6UHTOa0Pqv2bBr5\r\nwbkRkVUxl9yJJw/HmTCdfnsM9dTOJUKzEglnGF2184Gg+qJDZB6fSf0EAO1F6sTqiSswl+uHQZiy\r\nDaZzyU7Gg5seKOZ20zTRaX3Ihj9Zij/ORnrARE7eM/usKMECp+7syUwAUKxDCZkGiUdskmOhhBGL\r\nJtbyK3F2UvoJoLsm3pIcvMak9KwMjSTGJB47ABUP1+w+zGcNk0D5Co3IJ6QekiLfWJyQ+kKsWLKt\r\nzOYQQatrnBagM7MI2/T4\r\n"
        ]
      },
      "requestCompressed": false,
      "allowMultipleAcsEndpoints": true,
      "acsEndpoints": [
        {
          "url": "http://testorgone.okta",
          "index":0
        },
        {
          "url": "http://testorgone.okta/1",
          "index":1
        }
      ],
      "attributeStatements": [
        {
          "type": "EXPRESSION",
          "name": "Attribute",
          "namespace": "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified",
          "values": [
            "Value"
          ]
        }
      ]
    }
  },
  "_links": {
    "logo": [
      {
        "name": "medium",
        "href": "http://testorgone.okta.com/assets/img/logos/default.6770228fb0dab49a1695ef440a5279bb.png",
        "type": "image/png"
      }
    ],
    "appLinks": [
      {
        "name": "testorgone_examplecustomsaml20app_6_link",
        "href": "http://testorgone.okta.com/home/testorgone_examplecustomsaml20app_6/0oav8uiWzPDrDMYxU0g3/alnvjz6hLyuTZadi80g3",
        "type": "text/html"
      }
    ],
    "help": {
      "href": "http://testorgone-admin.okta.com/app/testorgone_examplecustomsaml20app_6/0oav8uiWzPDrDMYxU0g3/setup/help/SAML_2_0/instructions",
      "type": "text/html"
    },
    "users": {
      "href": "http://testorgone.okta.com/api/v1/apps/0oav8uiWzPDrDMYxU0g3/users"
    },
    "deactivate": {
      "href": "http://testorgone.okta.com/api/v1/apps/0oav8uiWzPDrDMYxU0g3/lifecycle/deactivate"
    },
    "groups": {
      "href": "http://testorgone.okta.com/api/v1/apps/0oav8uiWzPDrDMYxU0g3/groups"
    },
    "metadata": {
      "href": "http://testorgone.okta.com:/api/v1/apps/0oav8uiWzPDrDMYxU0g3/sso/saml/metadata",
      "type": "application/xml"
    }
  }
}
```

#### Add WS-Federation application


Adds a WS-Federation Passive Requestor Profile application with a SAML 2.0 token

##### Request example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "template_wsfed",
  "label": "Sample WS-Fed App",
  "signOnMode": "WS_FEDERATION",
  "settings": {
    "app": {
      "audienceRestriction": "urn:example:app",
      "groupName": null,
      "groupValueFormat": "windowsDomainQualifiedName",
      "realm": "urn:example:app",
      "wReplyURL": "https://example.com/",
      "attributeStatements": null,
      "nameIDFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
      "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport",
      "siteURL": "https://example.com",
      "wReplyOverride": false,
      "groupFilter": null,
      "usernameAttribute": "username"
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps"
```

#### Add OAuth 2.0 client application

Adds an OAuth 2.0 client application. This application is only available to the org that creates it.

##### Credentials


| Parameter                    | Description                                  | DataType   | Default               |
| :--------------------------- | :------------------------------------------- | :--------- | :-------------------- |
| autoKeyRotation              | Requested key rotation mode                                                                                                                         | Boolean    | `true`                |
| client_id                    | Unique identifier for the client application. **Note:** When not specified, `client_id` and application `id` are the same. You can specify a `client_id`, if necessary. See the [OAuth Credential object](#oauth-credential-object) section for more details.   | String     |                       |
| client_secret                | OAuth 2.0 client secret string (used for confidential clients)                                                                                      | String     |                       |
| token_endpoint_auth_method   | Requested authentication method for the token endpoint. Valid values: `none`, `client_secret_post`, `client_secret_basic`, `client_secret_jwt`, or `private_key_jwt`   | String     | `client_secret_basic` |

##### Settings


| Parameter                                   | Description                                                                                                                                                                                                                | DataType                                                                                       | Nullable   | Unique   | Validation |
| :------------------------------------------ | :--------------------------------------------------------------------------------------------                                                                                                                              | :--------------------------------------------------------------------------------------------- | :--------- | :------- | :--------- |
| application_type                            | The type of client application                                                                                                                                                                                             | `web`, `native`, `browser`, or `service`                                                       | TRUE       | FALSE    | TRUE       |
| client_uri                                  | URL string of a web page providing information about the client                                                                                                                                                            | String                                                                                         | TRUE       | FALSE    | FALSE      |
| consent_method                              | Indicates whether user consent is required or implicit. Valid values: `REQUIRED`, `TRUSTED`. Default value is `TRUSTED`                                                                                                    | String                                                                                         | TRUE       | FALSE    | TRUE       |
| grant_types                                 | Array of OAuth 2.0 grant type strings                                                                                                                                                                                      | Array of `authorization_code`, `implicit`, `password`, `refresh_token`, `client_credentials`   | FALSE      | FALSE    | TRUE       |
| initiate_login_uri                          | URL string that a third party can use to initiate a sign in by the client                                                                                                                                                    | String                                                                                         | TRUE       | FALSE    | TRUE       |
| issuer_mode <ApiLifecycle access="ea" />    | Indicates whether the Okta Authorization Server uses the original Okta org domain URL or a custom domain URL as the issuer of ID token for this client. See [Details](#details). | `CUSTOM_URL` or `ORG_URL`                                                                      | TRUE       | FALSE    | TRUE       |
| idp_initiated_login                         | The type of Idp-Initiated login that the client supports, if any                                                                                                                 |  [Idp-Initiated Login](#idp-initiated-login-object)                                                                     | TRUE       | FALSE    | TRUE       |
| logo_uri                                    | URL string that references a logo for the client. This value is used with the client consent dialog box during the client consent flow. See [Details](#details).| URL                                                                                            | TRUE       | FALSE    | FALSE      |
| policy_uri                                  | URL string of a web page providing the client's policy document                                                                                                                                                            | URL                                                                                            | TRUE       | FALSE    | FALSE      |
| post_logout_redirect_uris                               | Array of redirection URI strings for relying party-initiated logouts                                                                                                                                                           | Array                                                                                          | TRUE       | FALSE    | FALSE       |
| redirect_uris                               | Array of redirection URI strings for use in redirect-based flows                                                                                                                                                           | Array                                                                                          | TRUE       | FALSE    | TRUE       |
| wildcard_redirect <ApiLifecycle access="ea" /> | Indicates if the client is allowed to use wildcard matching of `redirect_uris`. See [Details](#details) for matching rules.                                                                                                  | String                                                                                         | TRUE       | FALSE    | `DISABLED`, `SUBDOMAIN`. Default value is `DISABLED`.       |
| response_types                              | Array of OAuth 2.0 response type strings                                                                                                                                                                                   | Array of `code`, `token`, `id_token`                                                           | TRUE       | FALSE    | TRUE       |
| tos_uri                                     | URL string of a web page providing the client's terms of service document                                                                                                                                                  | URL                                                                                            | TRUE       | FALSE    | FALSE      |
| refresh_token <ApiLifecycle access="ea" />  | Refresh token configuration                                                                                                                                                                                                | [Refresh Token object](#refresh-token-object)                                                                                            | TRUE       | FALSE    | TRUE      |

###### Details

* `issuer_mode` <ApiLifecycle access="ea" /> is visible if the Custom URL Domain feature is enabled. If the feature is enabled, you can set a custom domain URL in the settings for an OpenID Connect token in an app, and this property is returned in the appropriate responses. After the feature is enabled, the default value for new apps is `CUSTOM_URL`. For existing apps, the default remains `ORG_URL`. You can change the value using the API or administrator user interface. To enable the Custom URL Domain feature, contact [Support](https://support.okta.com/help/open_case).

* At least one redirect URI and response type is required for all client types, with exceptions: if the client uses the [Resource Owner Password](https://tools.ietf.org/html/rfc6749#section-4.3) flow (if `grant_types` contains the value `password`) or [Client Credentials](https://tools.ietf.org/html/rfc6749#section-4.4) flow (if `grant_types` contains the value `client_credentials`) then no redirect URI or response type is necessary. In these cases you can pass either null or an empty array for these attributes.

* If `wildcard_redirect` is `DISABLED`, all redirect URIs must be absolute URIs and must not include a fragment component.

* If `wildcard_redirect` is `SUBDOMAIN`, then configured redirect URIs may contain a single `*` character in the lowest-level domain to act as a wildcard. The wildcard subdomain must have at least one subdomain between it and the top level domain.

* The wildcard can match any valid hostname characters and can't span more than one domain. As an example, if `https://redirect-*-domain.example.com/oidc/redirect` is configured as a redirect URI, then `https://redirect-1-domain.example.com/oidc/redirect` and `https://redirect-sub-domain.example.com/oidc/redirect` match, but `https://redirect-1.sub-domain.example.com/oidc/redirect` won't match.

* Only the `https` URI scheme can use wildcard redirect URIs.

> **Caution:** The use of wildcard subdomains is discouraged as an insecure practice, since it may allow malicious actors to have tokens or authorization codes sent to unexpected or attacker-controlled pages. Exercise great caution if you decide to include a wildcard redirect URI in your configuration.

* When you create an app using the App Wizard in the UI, and you specify an app logo for the **Application logo** property, that value is stored as the `logo_uri` value and used as the logo on the application's tile for the dashboard as well as the client consent dialog box during the client consent flow. If you add or modify a `logo_uri` value later, that value is used only on the client consent dialog box during the client consent flow.

* Different application types have different valid values for the corresponding grant type:

| Application Type  | Valid Grant Type                                              | Requirements                                                                      |
| ----------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `browser`         | `authorization_code`, `implicit`                              |                                                                                   |
| `native`          | `authorization_code`, `implicit`, `password`, `refresh_token` | Must have at least `authorization_code`                                           |
| `service`         | `client_credentials`                                          | Works with OAuth 2.0 flow (not OpenID Connect)                                    |
| `web`             | `authorization_code`, `implicit`, `refresh_token`             | Must have at least `authorization_code`                                           |

* The `grant_types` and `response_types` values described above are partially orthogonal, as they refer to arguments passed to different endpoints in the [OAuth 2.0 protocol](https://tools.ietf.org/html/rfc6749). However, they are related in that the `grant_types` available to a client influence the `response_types` that the client is allowed to use, and vice versa. For instance, a `grant_types` value that includes `authorization_code` implies a `response_types` value that includes `code`, as both values are defined as part of the OAuth 2.0 authorization code grant.

* A consent dialog appears depending on the values of three elements:
    * `prompt`: a query parameter used in requests to [`/oauth2/${authServerId}/v1/authorize`](/docs/reference/api/oidc/#authorize)(custom authorization server) or [`/oauth2/v1/authorize`](/docs/reference/api/oidc/#authorize) (Org authorization server)
    * `consent_method`: a property listed in the Settings table above
    * `consent`: a property on [scopes](/docs/reference/api/authorization-servers/#scope-properties)

| `prompt` Value      | `consent_method`                   | `consent`                     | Result       |
| :------------------ | :--------------------------------- | :---------------------------- | :----------- |
| `CONSENT`           | `TRUSTED` or `REQUIRED`            | `REQUIRED`                    | Prompted     |
| `CONSENT`           | `TRUSTED`                          | `IMPLICIT`                    | Not prompted |
| `CONSENT`           | `REQUIRED`                         | `IMPLICIT`                    | Not prompted |
| `NONE`              | `TRUSTED`                          | `REQUIRED` or `IMPLICIT`      | Not prompted |
| `NONE`              | `REQUIRED`                         | `IMPLICIT`                    | Not prompted |
<!-- If you change this section, change it in authorization-servers.md (/docs/reference/api/authorization-servers/#scope-properties) and oidc.md (/docs/reference/api/oidc/#scopes) as well. Add 'LOGIN' to the first three rows when supported -->

> **Note:** The `refresh_token` <ApiLifecycle access="ea" /> parameter is visible only if the client has `refresh_token` defined as one of its allowed `grant_types`. See [Refresh token object](#refresh-token-object).

**Notes:**

  * Apps created on `/api/v1/apps` default to `consent_method=TRUSTED`, while those created on `/api/v1/clients` default to `consent_method=REQUIRED`.
  * If you request a scope that requires consent while using the `client_credentials` flow, an error is returned. Because there is no user, no consent can be given.
  * If the `prompt` value is set to `NONE`, but the `consent_method` and the `consent` values are set to `REQUIRED`, then an error occurs.
  * The following properties can also be configured in the App Wizard and on the **General** tab in the Admin Console: `tos_uri`, `policy_uri`, and `logo_uri` and can be set using the [Dynamic Client Registration API](/docs/reference/api/oauth-clients/).
  * The `consent_method` property can be configured in the App Wizard and on the **General** tab in the Admin Console, but cannot be set using the Dynamic Client Registration API.



### Get application

<ApiOperation method="get" url="/api/v1/apps/${applicationId}" />

Fetches an application from your Okta organization by `id`

##### Request parameters

| Parameter     | Description    | Param Type | DataType | Required | Default |
| ---------     | -------------- | ---------- | -------- | -------- | ------- |
| applicationId | `id` of an app | URL        | String   | TRUE     |         |

##### Response parameters

Fetched [Application](#application-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oa1gjh63g214q0Hq0g4"
```

##### Response example

```json
{
  "id": "0oa1gjh63g214q0Hq0g4",
  "name": "testorgone_customsaml20app_1",
  "label": "Custom Saml 2.0 App",
  "status": "ACTIVE",
  "lastUpdated": "2016-08-09T20:12:19.000Z",
  "created": "2016-08-09T20:12:19.000Z",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null,
    "loginRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "testorgone_customsaml20app_1_link": true
    }
  },
  "features": [],
  "signOnMode": "SAML_2_0",
  "credentials": {
    "userNameTemplate": {
      "template": "${fn:substringBefore(source.login, \"@\")}",
      "type": "BUILT_IN"
    },
    "signing": {}
  },
  "settings": {
    "app": {},
    "notifications": {
      "vpn": {
        "network": {
          "connection": "DISABLED"
        },
        "message": null,
        "helpUrl": null
      }
    },
    "signOn": {
      "defaultRelayState": "",
      "ssoAcsUrl": "https://${yourOktaDomain}",
      "idpIssuer": "https://www.okta.com/${org.externalKey}",
      "audience": "https://example.com/tenant/123",
      "recipient": "https://recipient.okta.com",
      "destination": "https://destination.okta.com",
      "subjectNameIdTemplate": "${user.userName}",
      "subjectNameIdFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
      "responseSigned": true,
      "assertionSigned": true,
      "signatureAlgorithm": "RSA_SHA256",
      "digestAlgorithm": "SHA256",
      "honorForceAuthn": true,
      "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport",
      "slo": {
        "enabled": true,
        "spIssuer": "http://testorgone.okta.com",
        "logoutUrl": "http://testorgone.okta.com/logout"
      },
      "spCertificate": {
        "x5c": [
	  "MIIFnDCCA4QCCQDBSLbiON2T1zANBgkqhkiG9w0BAQsFADCBjzELMAkGA1UEBhMCVVMxDjAMBgNV\r\nBAgMBU1haW5lMRAwDgYDVQQHDAdDYXJpYm91MRcwFQYDVQQKDA5Tbm93bWFrZXJzIEluYzEUMBIG\r\nA1UECwwLRW5naW5lZXJpbmcxDTALBgNVBAMMBFNub3cxIDAeBgkqhkiG9w0BCQEWEWVtYWlsQGV4\r\nYW1wbGUuY29tMB4XDTIwMTIwMzIyNDY0M1oXDTMwMTIwMTIyNDY0M1owgY8xCzAJBgNVBAYTAlVT\r\nMQ4wDAYDVQQIDAVNYWluZTEQMA4GA1UEBwwHQ2FyaWJvdTEXMBUGA1UECgwOU25vd21ha2VycyBJ\r\nbmMxFDASBgNVBAsMC0VuZ2luZWVyaW5nMQ0wCwYDVQQDDARTbm93MSAwHgYJKoZIhvcNAQkBFhFl\r\nbWFpbEBleGFtcGxlLmNvbTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBANMmWDjXPdoa\r\nPyzIENqeY9njLan2FqCbQPSestWUUcb6NhDsJVGSQ7XR+ozQA5TaJzbP7cAJUj8vCcbqMZsgOQAu\r\nO/pzYyQEKptLmrGvPn7xkJ1A1xLkp2NY18cpDTeUPueJUoidZ9EJwEuyUZIktzxNNU1pA1lGijiu\r\n2XNxs9d9JR/hm3tCu9Im8qLVB4JtX80YUa6QtlRjWR/H8a373AYCOASdoB3c57fIPD8ATDNy2w/c\r\nfCVGiyKDMFB+GA/WTsZpOP3iohRp8ltAncSuzypcztb2iE+jijtTsiC9kUA2abAJqqpoCJubNShi\r\nVff4822czpziS44MV2guC9wANi8u3Uyl5MKsU95j01jzadKRP5S+2f0K+n8n4UoV9fnqZFyuGAKd\r\nCJi9K6NlSAP+TgPe/JP9FOSuxQOHWJfmdLHdJD+evoKi9E55sr5lRFK0xU1Fj5Ld7zjC0pXPhtJf\r\nsgjEZzD433AsHnRzvRT1KSNCPkLYomznZo5n9rWYgCQ8HcytlQDTesmKE+s05E/VSWNtH84XdDrt\r\nieXwfwhHfaABSu+WjZYxi9CXdFCSvXhsgufUcK4FbYAHl/ga/cJxZc52yFC7Pcq0u9O2BSCjYPdQ\r\nDAHs9dhT1RhwVLM8RmoAzgxyyzau0gxnAlgSBD9FMW6dXqIHIp8yAAg9cRXhYRTNAgMBAAEwDQYJ\r\nKoZIhvcNAQELBQADggIBADofEC1SvG8qa7pmKCjB/E9Sxhk3mvUO9Gq43xzwVb721Ng3VYf4vGU3\r\nwLUwJeLt0wggnj26NJweN5T3q9T8UMxZhHSWvttEU3+S1nArRB0beti716HSlOCDx4wTmBu/D1MG\r\nt/kZYFJw+zuzvAcbYct2pK69AQhD8xAIbQvqADJI7cCK3yRry+aWtppc58P81KYabUlCfFXfhJ9E\r\nP72ffN4jVHpX3lxxYh7FKAdiKbY2FYzjsc7RdgKI1R3iAAZUCGBTvezNzaetGzTUjjl/g1tcVYij\r\nltH9ZOQBPlUMI88lxUxqgRTerpPmAJH00CACx4JFiZrweLM1trZyy06wNDQgLrqHr3EOagBF/O2h\r\nhfTehNdVr6iq3YhKWBo4/+RL0RCzHMh4u86VbDDnDn4Y6HzLuyIAtBFoikoKM6UHTOa0Pqv2bBr5\r\nwbkRkVUxl9yJJw/HmTCdfnsM9dTOJUKzEglnGF2184Gg+qJDZB6fSf0EAO1F6sTqiSswl+uHQZiy\r\nDaZzyU7Gg5seKOZ20zTRaX3Ihj9Zij/ORnrARE7eM/usKMECp+7syUwAUKxDCZkGiUdskmOhhBGL\r\nJtbyK3F2UvoJoLsm3pIcvMak9KwMjSTGJB47ABUP1+w+zGcNk0D5Co3IJ6QekiLfWJyQ+kKsWLKt\r\nzOYQQatrnBagM7MI2/T4\r\n"
        ]
      },
      "requestCompressed": false,
      "allowMultipleAcsEndpoints": false,
      "acsEndpoints": [],
      "attributeStatements": []
    }
  },
  "_links": {
    "logo": [
      {
        "name": "medium",
        "href": "https://testorgone.okta.com/assets/img/logos/default.6770228fb0dab49a1695ef440a5279bb.png",
        "type": "image/png"
      }
    ],
    "appLinks": [
      {
        "name": "testorgone_customsaml20app_1_link",
        "href": "https://testorgone.okta.com/home/testorgone_customsaml20app_1/0oa1gjh63g214q0Hq0g4/aln1gofChJaerOVfY0g4",
        "type": "text/html"
      }
    ],
    "help": {
      "href": "https://testorgone-admin.okta.com/app/testorgone_customsaml20app_1/0oa1gjh63g214q0Hq0g4/setup/help/SAML_2_0/instructions",
      "type": "text/html"
    },
    "users": {
      "href": "https://testorgone.okta.com/api/v1/apps/0oa1gjh63g214q0Hq0g4/users"
    },
    "deactivate": {
      "href": "https://testorgone.okta.com/api/v1/apps/0oa1gjh63g214q0Hq0g4/lifecycle/deactivate"
    },
    "groups": {
      "href": "https://testorgone.okta.com/api/v1/apps/0oa1gjh63g214q0Hq0g4/groups"
    },
    "metadata": {
      "href": "https://testorgone.okta.com/api/v1/apps/0oa1gjh63g214q0Hq0g4/sso/saml/metadata",
      "type": "application/xml"
    }
  }
}
```

### List applications

<ApiOperation method="get" url="/api/v1/apps" />

Enumerates apps added to your organization with pagination. A subset of apps can be returned that match a supported filter expression or query.

- [List applications with defaults](#list-applications-with-defaults)
- [List applications assigned to a user](#list-applications-assigned-to-a-user)
- [List applications assigned to a group](#list-applications-assigned-to-a-group)
- [List applications using a key](#list-applications-using-a-key)

##### Request parameters

| Parameter | Description                                                                                                      | Param Type | DataType | Required | Default |
| --------- | ---------------------------------------------------------------------------------------------------------------- | ---------- | -------- | -------- | ------- |
| after     | Specifies the pagination cursor for the next page of apps                                                        | Query      | String   | FALSE    |         |
| expand    | Traverses the `users` link relationship and optionally embeds the [Application User](#application-user-object) resource   | Query      | String   | FALSE    |         |
| filter    | Filters apps by `status`, `user.id`, `group.id` or `credentials.signing.kid` expression                          | Query      | String   | FALSE    |         |
| limit     | Specifies the number of results per page (maximum 200)                                                           | Query      | Number   | FALSE    | 20      |
| q         | Searches the `name` or `label` property of applications                                                          | Query      | String   | FALSE    |         |

The results are [paginated](/docs/reference/api-overview/#pagination) according to the `limit` parameter.
If there are multiple pages of results, the Link header contains a `next` link that should be treated as an opaque value (follow it, don't parse it).

###### Filters

The following filters are supported with the filter query parameter:

| Filter                              | Description                                                                       |
| ----------------------              | ------------------------------------------------------                            |
| `credentials.signing.kid eq ":kid"` | Apps using a particular key such as `SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4` |
| `group.id eq ":gid"`                | Apps assigned to a specific group such as `00gckgEHZXOUDGDJLYLG`                  |
| `status eq "ACTIVE"`                | Apps that have a `status` of `ACTIVE`                                             |
| `status eq "INACTIVE"`              | Apps that have a `status` of `INACTIVE`                                           |
| `user.id eq ":uid"`                 | Apps assigned to a specific user such as `00ucw2RPGIUNTDQOYPOF`                   |

> **Note:** Only a single expression is supported as this time. The only supported filter type is `eq`.

###### Link expansions

The following link expansions are supported to embed additional resources into the response:

| Expansion    | Description                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| `user/:uid`  | Embeds the [Application User](#application-user-object) for an assigned user such as `user/00ucw2RPGIUNTDQOYPOF` |

> **Note:** The `user/:uid` expansion can currently only be used in conjunction with the `user.id eq ":uid"` filter. See [List applications assigned to a user](#list-applications-assigned-to-a-user).


##### Response parameters

Array of [Applications](#application-object)

#### List applications with defaults

Enumerates all apps added to your organization

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps"
```

##### Response example

```json
[
  {
    "id": "0oa1gjh63g214q0Hq0g4",
    "name": "testorgone_customsaml20app_1",
    "label": "Custom Saml 2.0 App",
    "status": "ACTIVE",
    "lastUpdated": "2016-08-09T20:12:19.000Z",
    "created": "2016-08-09T20:12:19.000Z",
    "accessibility": {
      "selfService": false,
      "errorRedirectUrl": null,
      "loginRedirectUrl": null
    },
    "visibility": {
      "autoSubmitToolbar": false,
      "hide": {
        "iOS": false,
        "web": false
      },
      "appLinks": {
        "testorgone_customsaml20app_1_link": true
      }
    },
    "features": [],
    "signOnMode": "SAML_2_0",
    "credentials": {
      "userNameTemplate": {
        "template": "${fn:substringBefore(source.login, \"@\")}",
        "type": "BUILT_IN"
      },
      "signing": {}
    },
    "settings": {
      "app": {},
      "notifications": {
        "vpn": {
          "network": {
            "connection": "DISABLED"
          },
          "message": null,
          "helpUrl": null
        }
      },
      "signOn": {
        "defaultRelayState": "",
        "ssoAcsUrl": "https://${yourOktaDomain}",
        "idpIssuer": "http://www.okta.com/${org.externalKey}",
        "audience": "https://example.com/tenant/123",
        "recipient": "http://recipient.okta.com",
        "destination": "http://destination.okta.com",
        "subjectNameIdTemplate": "${user.userName}",
        "subjectNameIdFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
        "responseSigned": true,
        "assertionSigned": true,
        "signatureAlgorithm": "RSA_SHA256",
        "digestAlgorithm": "SHA256",
        "honorForceAuthn": true,
        "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport",
        "slo": {
          "enabled": true,
          "spIssuer": "https://testorgone.okta.com",
          "logoutUrl": "https://testorgone.okta.com/logout"
        },
        "spCertificate": {
          "x5c": [
	    "MIIFnDCCA4QCCQDBSLbiON2T1zANBgkqhkiG9w0BAQsFADCBjzELMAkGA1UEBhMCVVMxDjAMBgNV\r\nBAgMBU1haW5lMRAwDgYDVQQHDAdDYXJpYm91MRcwFQYDVQQKDA5Tbm93bWFrZXJzIEluYzEUMBIG\r\nA1UECwwLRW5naW5lZXJpbmcxDTALBgNVBAMMBFNub3cxIDAeBgkqhkiG9w0BCQEWEWVtYWlsQGV4\r\nYW1wbGUuY29tMB4XDTIwMTIwMzIyNDY0M1oXDTMwMTIwMTIyNDY0M1owgY8xCzAJBgNVBAYTAlVT\r\nMQ4wDAYDVQQIDAVNYWluZTEQMA4GA1UEBwwHQ2FyaWJvdTEXMBUGA1UECgwOU25vd21ha2VycyBJ\r\nbmMxFDASBgNVBAsMC0VuZ2luZWVyaW5nMQ0wCwYDVQQDDARTbm93MSAwHgYJKoZIhvcNAQkBFhFl\r\nbWFpbEBleGFtcGxlLmNvbTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBANMmWDjXPdoa\r\nPyzIENqeY9njLan2FqCbQPSestWUUcb6NhDsJVGSQ7XR+ozQA5TaJzbP7cAJUj8vCcbqMZsgOQAu\r\nO/pzYyQEKptLmrGvPn7xkJ1A1xLkp2NY18cpDTeUPueJUoidZ9EJwEuyUZIktzxNNU1pA1lGijiu\r\n2XNxs9d9JR/hm3tCu9Im8qLVB4JtX80YUa6QtlRjWR/H8a373AYCOASdoB3c57fIPD8ATDNy2w/c\r\nfCVGiyKDMFB+GA/WTsZpOP3iohRp8ltAncSuzypcztb2iE+jijtTsiC9kUA2abAJqqpoCJubNShi\r\nVff4822czpziS44MV2guC9wANi8u3Uyl5MKsU95j01jzadKRP5S+2f0K+n8n4UoV9fnqZFyuGAKd\r\nCJi9K6NlSAP+TgPe/JP9FOSuxQOHWJfmdLHdJD+evoKi9E55sr5lRFK0xU1Fj5Ld7zjC0pXPhtJf\r\nsgjEZzD433AsHnRzvRT1KSNCPkLYomznZo5n9rWYgCQ8HcytlQDTesmKE+s05E/VSWNtH84XdDrt\r\nieXwfwhHfaABSu+WjZYxi9CXdFCSvXhsgufUcK4FbYAHl/ga/cJxZc52yFC7Pcq0u9O2BSCjYPdQ\r\nDAHs9dhT1RhwVLM8RmoAzgxyyzau0gxnAlgSBD9FMW6dXqIHIp8yAAg9cRXhYRTNAgMBAAEwDQYJ\r\nKoZIhvcNAQELBQADggIBADofEC1SvG8qa7pmKCjB/E9Sxhk3mvUO9Gq43xzwVb721Ng3VYf4vGU3\r\nwLUwJeLt0wggnj26NJweN5T3q9T8UMxZhHSWvttEU3+S1nArRB0beti716HSlOCDx4wTmBu/D1MG\r\nt/kZYFJw+zuzvAcbYct2pK69AQhD8xAIbQvqADJI7cCK3yRry+aWtppc58P81KYabUlCfFXfhJ9E\r\nP72ffN4jVHpX3lxxYh7FKAdiKbY2FYzjsc7RdgKI1R3iAAZUCGBTvezNzaetGzTUjjl/g1tcVYij\r\nltH9ZOQBPlUMI88lxUxqgRTerpPmAJH00CACx4JFiZrweLM1trZyy06wNDQgLrqHr3EOagBF/O2h\r\nhfTehNdVr6iq3YhKWBo4/+RL0RCzHMh4u86VbDDnDn4Y6HzLuyIAtBFoikoKM6UHTOa0Pqv2bBr5\r\nwbkRkVUxl9yJJw/HmTCdfnsM9dTOJUKzEglnGF2184Gg+qJDZB6fSf0EAO1F6sTqiSswl+uHQZiy\r\nDaZzyU7Gg5seKOZ20zTRaX3Ihj9Zij/ORnrARE7eM/usKMECp+7syUwAUKxDCZkGiUdskmOhhBGL\r\nJtbyK3F2UvoJoLsm3pIcvMak9KwMjSTGJB47ABUP1+w+zGcNk0D5Co3IJ6QekiLfWJyQ+kKsWLKt\r\nzOYQQatrnBagM7MI2/T4\r\n"
          ]
        },
	"requestCompressed": false,
        "allowMultipleAcsEndpoints": false,
        "acsEndpoints": [],
        "attributeStatements": []
      }
    },
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "http://testorgone.okta.com/assets/img/logos/default.6770228fb0dab49a1695ef440a5279bb.png",
          "type": "image/png"
        }
      ],
      "appLinks": [
        {
          "name": "testorgone_customsaml20app_1_link",
          "href": "http://testorgone.okta.com/home/testorgone_customsaml20app_1/0oa1gjh63g214q0Hq0g4/aln1gofChJaerOVfY0g4",
          "type": "text/html"
        }
      ],
      "help": {
        "href": "http://testorgone-admin.okta.com/app/testorgone_customsaml20app_1/0oa1gjh63g214q0Hq0g4/setup/help/SAML_2_0/instructions",
        "type": "text/html"
      },
      "users": {
        "href": "http://testorgone.okta.com/api/v1/apps/0oa1gjh63g214q0Hq0g4/users"
      },
      "deactivate": {
        "href": "http://testorgone.okta.com/api/v1/apps/0oa1gjh63g214q0Hq0g4/lifecycle/deactivate"
      },
      "groups": {
        "href": "http://testorgone.okta.com/api/v1/apps/0oa1gjh63g214q0Hq0g4/groups"
      },
      "metadata": {
        "href": "http://testorgone.okta.com:/api/v1/apps/0oa1gjh63g214q0Hq0g4/sso/saml/metadata",
        "type": "application/xml"
      }
    }
  },
  {
    "id": "0oabkvBLDEKCNXBGYUAS",
    "name": "template_swa",
    "label": "Sample Plugin App",
    "status": "ACTIVE",
    "lastUpdated": "2013-09-11T17:58:54.000Z",
    "created": "2013-09-11T17:46:08.000Z",
    "accessibility": {
      "selfService": false,
      "errorRedirectUrl": null
    },
    "visibility": {
      "autoSubmitToolbar": false,
      "hide": {
        "iOS": false,
        "web": false
      },
      "appLinks": {
        "login": true
      }
    },
    "features": [],
    "signOnMode": "BROWSER_PLUGIN",
    "credentials": {
      "scheme": "EDIT_USERNAME_AND_PASSWORD",
      "userNameTemplate": {
        "template": "${source.login}",
        "type": "BUILT_IN"
      }
    },
    "settings": {
      "app": {
        "buttonField": "btn-login",
        "passwordField": "txtbox-password",
        "usernameField": "txtbox-username",
        "url": "https://example.com/login.html"
      }
    },
    "_links": {
      "logo": [
        {
          "href": "https:/example.okta.com/img/logos/logo_1.png",
          "name": "medium",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
      },
      "groups": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups"
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
      },
      "deactivate": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
      }
    }
  }
]
```

#### List applications assigned to a user

Enumerates all applications assigned to a user and optionally embeds their [Application User](#application-user-object) in a single response

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps?filter=user.id+eq+\"00ucw2RPGIUNTDQOYPOF\"&expand=user/00ucw2RPGIUNTDQOYPOF"
```

> **Note:** The `expand=user/:uid` query parameter optionally returns the user's [Application User](#application-user-object) information in the response body's `_embedded` property.

##### Response example

```json
[
  {
    "id": "0oa1gjh63g214q0Hq0g4",
    "name": "testorgone_customsaml20app_1",
    "label": "Custom Saml 2.0 App",
    "status": "ACTIVE",
    "lastUpdated": "2016-08-09T20:12:19.000Z",
    "created": "2016-08-09T20:12:19.000Z",
    "accessibility": {
      "selfService": false,
      "errorRedirectUrl": null,
      "loginRedirectUrl": null
    },
    "visibility": {
      "autoSubmitToolbar": false,
      "hide": {
        "iOS": false,
        "web": false
      },
      "appLinks": {
        "testorgone_customsaml20app_1_link": true
      }
    },
    "features": [],
    "signOnMode": "SAML_2_0",
    "credentials": {
      "userNameTemplate": {
        "template": "${fn:substringBefore(source.login, \"@\")}",
        "type": "BUILT_IN"
      },
      "signing": {}
    },
    "settings": {
      "app": {},
      "notifications": {
        "vpn": {
          "network": {
            "connection": "DISABLED"
          },
          "message": null,
          "helpUrl": null
        }
      },
      "signOn": {
        "defaultRelayState": "",
        "ssoAcsUrl": "https://${yourOktaDomain}",
        "idpIssuer": "http://www.okta.com/${org.externalKey}",
        "audience": "https://example.com/tenant/123",
        "recipient": "http://recipient.okta.com",
        "destination": "http://destination.okta.com",
        "subjectNameIdTemplate": "${user.userName}",
        "subjectNameIdFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
        "responseSigned": true,
        "assertionSigned": true,
        "signatureAlgorithm": "RSA_SHA256",
        "digestAlgorithm": "SHA256",
        "honorForceAuthn": true,
        "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport",
        "slo": {
          "enabled": true,
          "spIssuer": "https://testorgone.okta.com",
          "logoutUrl": "https://testorgone.okta.com/logout"
        },
        "spCertificate": {
          "x5c": [
	    "MIIFnDCCA4QCCQDBSLbiON2T1zANBgkqhkiG9w0BAQsFADCBjzELMAkGA1UEBhMCVVMxDjAMBgNV\r\nBAgMBU1haW5lMRAwDgYDVQQHDAdDYXJpYm91MRcwFQYDVQQKDA5Tbm93bWFrZXJzIEluYzEUMBIG\r\nA1UECwwLRW5naW5lZXJpbmcxDTALBgNVBAMMBFNub3cxIDAeBgkqhkiG9w0BCQEWEWVtYWlsQGV4\r\nYW1wbGUuY29tMB4XDTIwMTIwMzIyNDY0M1oXDTMwMTIwMTIyNDY0M1owgY8xCzAJBgNVBAYTAlVT\r\nMQ4wDAYDVQQIDAVNYWluZTEQMA4GA1UEBwwHQ2FyaWJvdTEXMBUGA1UECgwOU25vd21ha2VycyBJ\r\nbmMxFDASBgNVBAsMC0VuZ2luZWVyaW5nMQ0wCwYDVQQDDARTbm93MSAwHgYJKoZIhvcNAQkBFhFl\r\nbWFpbEBleGFtcGxlLmNvbTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBANMmWDjXPdoa\r\nPyzIENqeY9njLan2FqCbQPSestWUUcb6NhDsJVGSQ7XR+ozQA5TaJzbP7cAJUj8vCcbqMZsgOQAu\r\nO/pzYyQEKptLmrGvPn7xkJ1A1xLkp2NY18cpDTeUPueJUoidZ9EJwEuyUZIktzxNNU1pA1lGijiu\r\n2XNxs9d9JR/hm3tCu9Im8qLVB4JtX80YUa6QtlRjWR/H8a373AYCOASdoB3c57fIPD8ATDNy2w/c\r\nfCVGiyKDMFB+GA/WTsZpOP3iohRp8ltAncSuzypcztb2iE+jijtTsiC9kUA2abAJqqpoCJubNShi\r\nVff4822czpziS44MV2guC9wANi8u3Uyl5MKsU95j01jzadKRP5S+2f0K+n8n4UoV9fnqZFyuGAKd\r\nCJi9K6NlSAP+TgPe/JP9FOSuxQOHWJfmdLHdJD+evoKi9E55sr5lRFK0xU1Fj5Ld7zjC0pXPhtJf\r\nsgjEZzD433AsHnRzvRT1KSNCPkLYomznZo5n9rWYgCQ8HcytlQDTesmKE+s05E/VSWNtH84XdDrt\r\nieXwfwhHfaABSu+WjZYxi9CXdFCSvXhsgufUcK4FbYAHl/ga/cJxZc52yFC7Pcq0u9O2BSCjYPdQ\r\nDAHs9dhT1RhwVLM8RmoAzgxyyzau0gxnAlgSBD9FMW6dXqIHIp8yAAg9cRXhYRTNAgMBAAEwDQYJ\r\nKoZIhvcNAQELBQADggIBADofEC1SvG8qa7pmKCjB/E9Sxhk3mvUO9Gq43xzwVb721Ng3VYf4vGU3\r\nwLUwJeLt0wggnj26NJweN5T3q9T8UMxZhHSWvttEU3+S1nArRB0beti716HSlOCDx4wTmBu/D1MG\r\nt/kZYFJw+zuzvAcbYct2pK69AQhD8xAIbQvqADJI7cCK3yRry+aWtppc58P81KYabUlCfFXfhJ9E\r\nP72ffN4jVHpX3lxxYh7FKAdiKbY2FYzjsc7RdgKI1R3iAAZUCGBTvezNzaetGzTUjjl/g1tcVYij\r\nltH9ZOQBPlUMI88lxUxqgRTerpPmAJH00CACx4JFiZrweLM1trZyy06wNDQgLrqHr3EOagBF/O2h\r\nhfTehNdVr6iq3YhKWBo4/+RL0RCzHMh4u86VbDDnDn4Y6HzLuyIAtBFoikoKM6UHTOa0Pqv2bBr5\r\nwbkRkVUxl9yJJw/HmTCdfnsM9dTOJUKzEglnGF2184Gg+qJDZB6fSf0EAO1F6sTqiSswl+uHQZiy\r\nDaZzyU7Gg5seKOZ20zTRaX3Ihj9Zij/ORnrARE7eM/usKMECp+7syUwAUKxDCZkGiUdskmOhhBGL\r\nJtbyK3F2UvoJoLsm3pIcvMak9KwMjSTGJB47ABUP1+w+zGcNk0D5Co3IJ6QekiLfWJyQ+kKsWLKt\r\nzOYQQatrnBagM7MI2/T4\r\n"
          ]
        },
	"requestCompressed": false,
        "allowMultipleAcsEndpoints": false,
        "acsEndpoints": [],
        "attributeStatements": []
      }
    },
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "http://testorgone.okta.com/assets/img/logos/default.6770228fb0dab49a1695ef440a5279bb.png",
          "type": "image/png"
        }
      ],
      "appLinks": [
        {
          "name": "testorgone_customsaml20app_1_link",
          "href": "http://testorgone.okta.com/home/testorgone_customsaml20app_1/0oa1gjh63g214q0Hq0g4/aln1gofChJaerOVfY0g4",
          "type": "text/html"
        }
      ],
      "help": {
        "href": "http://testorgone-admin.okta.com/app/testorgone_customsaml20app_1/0oa1gjh63g214q0Hq0g4/setup/help/SAML_2_0/instructions",
        "type": "text/html"
      },
      "users": {
        "href": "http://testorgone.okta.com/api/v1/apps/0oa1gjh63g214q0Hq0g4/users"
      },
      "deactivate": {
        "href": "http://testorgone.okta.com/api/v1/apps/0oa1gjh63g214q0Hq0g4/lifecycle/deactivate"
      },
      "groups": {
        "href": "http://testorgone.okta.com/api/v1/apps/0oa1gjh63g214q0Hq0g4/groups"
      },
      "metadata": {
        "href": "http://testorgone.okta.com/api/v1/apps/0oa1gjh63g214q0Hq0g4/sso/saml/metadata",
        "type": "application/xml"
      }
    },
    "_embedded": {
      "user": {
        "id": "00ucw2RPGIUNTDQOYPOF",
        "externalId": null,
        "created": "2014-03-21T23:31:35.000Z",
        "lastUpdated": "2014-03-21T23:31:35.000Z",
        "scope": "USER",
        "status": "ACTIVE",
        "statusChanged": "2014-03-21T23:31:35.000Z",
        "passwordChanged": null,
        "syncState": "DISABLED",
        "lastSync": null,
        "credentials": {
          "userName": "user@example.com"
        },
        "_links": {
          "app": {
            "href": "https://${yourOktaDomain}/api/v1/apps/0oabizCHPNYALCHDUIOD"
          },
          "user": {
            "href": "https://${yourOktaDomain}/api/v1/users/00ucw2RPGIUNTDQOYPOF"
          }
        }
      }
    }
  },
  {
    "id": "0oabkvBLDEKCNXBGYUAS",
    "name": "template_swa",
    "label": "Sample Plugin App",
    "status": "ACTIVE",
    "lastUpdated": "2013-09-11T17:58:54.000Z",
    "created": "2013-09-11T17:46:08.000Z",
    "accessibility": {
      "selfService": false,
      "errorRedirectUrl": null
    },
    "visibility": {
      "autoSubmitToolbar": false,
      "hide": {
        "iOS": false,
        "web": false
      },
      "appLinks": {
        "login": true
      }
    },
    "features": [],
    "signOnMode": "BROWSER_PLUGIN",
    "credentials": {
      "scheme": "EDIT_USERNAME_AND_PASSWORD",
      "userNameTemplate": {
        "template": "${source.login}",
        "type": "BUILT_IN"
      }
    },
    "settings": {
      "app": {
        "buttonField": "btn-login",
        "passwordField": "txtbox-password",
        "usernameField": "txtbox-username",
        "url": "https://example.com/login.html"
      }
    },
    "_links": {
      "logo": [
        {
          "href": "https:/example.okta.com/img/logos/logo_1.png",
          "name": "medium",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
      },
      "groups": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups"
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
      },
      "deactivate": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
      }
    },
    "_embedded": {
      "user": {
        "id": "00ucw2RPGIUNTDQOYPOF",
        "externalId": null,
        "created": "2014-06-10T15:16:01.000Z",
        "lastUpdated": "2014-06-10T15:17:38.000Z",
        "scope": "USER",
        "status": "ACTIVE",
        "statusChanged": "2014-06-10T15:16:01.000Z",
        "passwordChanged": "2014-06-10T15:17:38.000Z",
        "syncState": "DISABLED",
        "lastSync": null,
        "credentials": {
          "userName": "user@example.com",
          "password": {}
        },
        "_links": {
          "app": {
            "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
          },
          "user": {
            "href": "https://${yourOktaDomain}/api/v1/users/00ucw2RPGIUNTDQOYPOF"
          }
        }
      }
    }
  }
]
```

#### List applications assigned to a group

Enumerates all applications assigned to a group

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps?filter=group.id+eq+\"00gckgEHZXOUDGDJLYLG\""
```

##### Response example

```json
[
  {
    "id": "0oabkvBLDEKCNXBGYUAS",
    "name": "template_swa",
    "label": "Sample Plugin App",
    "status": "ACTIVE",
    "lastUpdated": "2013-09-11T17:58:54.000Z",
    "created": "2013-09-11T17:46:08.000Z",
    "accessibility": {
      "selfService": false,
      "errorRedirectUrl": null
    },
    "visibility": {
      "autoSubmitToolbar": false,
      "hide": {
        "iOS": false,
        "web": false
      },
      "appLinks": {
        "login": true
      }
    },
    "features": [],
    "signOnMode": "BROWSER_PLUGIN",
    "credentials": {
      "scheme": "EDIT_USERNAME_AND_PASSWORD",
      "userNameTemplate": {
        "template": "${source.login}",
        "type": "BUILT_IN"
      }
    },
    "settings": {
      "app": {
        "buttonField": "btn-login",
        "passwordField": "txtbox-password",
        "usernameField": "txtbox-username",
        "url": "https://example.com/login.html"
      }
    },
    "_links": {
      "logo": [
        {
          "href": "https:/example.okta.com/img/logos/logo_1.png",
          "name": "medium",
          "type": "image/png"
        }
      ],
      "users": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
      },
      "groups": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups"
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
      },
      "deactivate": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
      }
    }
  }
]
```

#### List applications using a key

Enumerates all applications using a key

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps?filter=credentials.signing.kid+eq+\"SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4\""
```

##### Response example

```json
[
  {
    "id": "0oa1gjh63g214q0Hq0g4",
    "name": "testorgone_customsaml20app_1",
    "label": "Custom Saml 2.0 App",
    "status": "ACTIVE",
    "lastUpdated": "2016-08-09T20:12:19.000Z",
    "created": "2016-08-09T20:12:19.000Z",
    "accessibility": {
      "selfService": false,
      "errorRedirectUrl": null,
      "loginRedirectUrl": null
    },
    "visibility": {
      "autoSubmitToolbar": false,
      "hide": {
        "iOS": false,
        "web": false
      },
      "appLinks": {
        "testorgone_customsaml20app_1_link": true
      }
    },
    "features": [],
    "signOnMode": "SAML_2_0",
    "credentials": {
      "userNameTemplate": {
        "template": "${fn:substringBefore(source.login, \"@\")}",
        "type": "BUILT_IN"
      },
      "signing": {
        "kid": "SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4"
      }
    },
    "settings": {
      "app": {},
      "notifications": {
        "vpn": {
          "network": {
            "connection": "DISABLED"
          },
          "message": null,
          "helpUrl": null
        }
      },
      "signOn": {
        "defaultRelayState": "",
        "ssoAcsUrl": "https://${yourOktaDomain}",
        "idpIssuer": "http://www.okta.com/${org.externalKey}",
        "audience": "https://example.com/tenant/123",
        "recipient": "http://recipient.okta.com",
        "destination": "http://destination.okta.com",
        "subjectNameIdTemplate": "${user.userName}",
        "subjectNameIdFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
        "responseSigned": true,
        "assertionSigned": true,
        "signatureAlgorithm": "RSA_SHA256",
        "digestAlgorithm": "SHA256",
        "honorForceAuthn": true,
        "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport",
        "slo": {
          "enabled": true,
          "spIssuer": "https://testorgone.okta.com",
          "logoutUrl": "https://testorgone.com/logout"
        },
        "spCertificate": {
          "x5c": [
	    "MIIFnDCCA4QCCQDBSLbiON2T1zANBgkqhkiG9w0BAQsFADCBjzELMAkGA1UEBhMCVVMxDjAMBgNV\r\nBAgMBU1haW5lMRAwDgYDVQQHDAdDYXJpYm91MRcwFQYDVQQKDA5Tbm93bWFrZXJzIEluYzEUMBIG\r\nA1UECwwLRW5naW5lZXJpbmcxDTALBgNVBAMMBFNub3cxIDAeBgkqhkiG9w0BCQEWEWVtYWlsQGV4\r\nYW1wbGUuY29tMB4XDTIwMTIwMzIyNDY0M1oXDTMwMTIwMTIyNDY0M1owgY8xCzAJBgNVBAYTAlVT\r\nMQ4wDAYDVQQIDAVNYWluZTEQMA4GA1UEBwwHQ2FyaWJvdTEXMBUGA1UECgwOU25vd21ha2VycyBJ\r\nbmMxFDASBgNVBAsMC0VuZ2luZWVyaW5nMQ0wCwYDVQQDDARTbm93MSAwHgYJKoZIhvcNAQkBFhFl\r\nbWFpbEBleGFtcGxlLmNvbTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBANMmWDjXPdoa\r\nPyzIENqeY9njLan2FqCbQPSestWUUcb6NhDsJVGSQ7XR+ozQA5TaJzbP7cAJUj8vCcbqMZsgOQAu\r\nO/pzYyQEKptLmrGvPn7xkJ1A1xLkp2NY18cpDTeUPueJUoidZ9EJwEuyUZIktzxNNU1pA1lGijiu\r\n2XNxs9d9JR/hm3tCu9Im8qLVB4JtX80YUa6QtlRjWR/H8a373AYCOASdoB3c57fIPD8ATDNy2w/c\r\nfCVGiyKDMFB+GA/WTsZpOP3iohRp8ltAncSuzypcztb2iE+jijtTsiC9kUA2abAJqqpoCJubNShi\r\nVff4822czpziS44MV2guC9wANi8u3Uyl5MKsU95j01jzadKRP5S+2f0K+n8n4UoV9fnqZFyuGAKd\r\nCJi9K6NlSAP+TgPe/JP9FOSuxQOHWJfmdLHdJD+evoKi9E55sr5lRFK0xU1Fj5Ld7zjC0pXPhtJf\r\nsgjEZzD433AsHnRzvRT1KSNCPkLYomznZo5n9rWYgCQ8HcytlQDTesmKE+s05E/VSWNtH84XdDrt\r\nieXwfwhHfaABSu+WjZYxi9CXdFCSvXhsgufUcK4FbYAHl/ga/cJxZc52yFC7Pcq0u9O2BSCjYPdQ\r\nDAHs9dhT1RhwVLM8RmoAzgxyyzau0gxnAlgSBD9FMW6dXqIHIp8yAAg9cRXhYRTNAgMBAAEwDQYJ\r\nKoZIhvcNAQELBQADggIBADofEC1SvG8qa7pmKCjB/E9Sxhk3mvUO9Gq43xzwVb721Ng3VYf4vGU3\r\nwLUwJeLt0wggnj26NJweN5T3q9T8UMxZhHSWvttEU3+S1nArRB0beti716HSlOCDx4wTmBu/D1MG\r\nt/kZYFJw+zuzvAcbYct2pK69AQhD8xAIbQvqADJI7cCK3yRry+aWtppc58P81KYabUlCfFXfhJ9E\r\nP72ffN4jVHpX3lxxYh7FKAdiKbY2FYzjsc7RdgKI1R3iAAZUCGBTvezNzaetGzTUjjl/g1tcVYij\r\nltH9ZOQBPlUMI88lxUxqgRTerpPmAJH00CACx4JFiZrweLM1trZyy06wNDQgLrqHr3EOagBF/O2h\r\nhfTehNdVr6iq3YhKWBo4/+RL0RCzHMh4u86VbDDnDn4Y6HzLuyIAtBFoikoKM6UHTOa0Pqv2bBr5\r\nwbkRkVUxl9yJJw/HmTCdfnsM9dTOJUKzEglnGF2184Gg+qJDZB6fSf0EAO1F6sTqiSswl+uHQZiy\r\nDaZzyU7Gg5seKOZ20zTRaX3Ihj9Zij/ORnrARE7eM/usKMECp+7syUwAUKxDCZkGiUdskmOhhBGL\r\nJtbyK3F2UvoJoLsm3pIcvMak9KwMjSTGJB47ABUP1+w+zGcNk0D5Co3IJ6QekiLfWJyQ+kKsWLKt\r\nzOYQQatrnBagM7MI2/T4\r\n"
          ]
        },
 	"requestCompressed": false,
        "allowMultipleAcsEndpoints": false,
        "acsEndpoints": [],
        "attributeStatements": []
      }
    },
    "_links": {
      "logo": [
        {
          "name": "medium",
          "href": "http://testorgone.okta.com/assets/img/logos/default.6770228fb0dab49a1695ef440a5279bb.png",
          "type": "image/png"
        }
      ],
      "appLinks": [
        {
          "name": "testorgone_customsaml20app_1_link",
          "href": "http://testorgone.okta.com/home/testorgone_customsaml20app_1/0oa1gjh63g214q0Hq0g4/aln1gofChJaerOVfY0g4",
          "type": "text/html"
        }
      ],
      "help": {
        "href": "http://testorgone-admin.okta.com/app/testorgone_customsaml20app_1/0oa1gjh63g214q0Hq0g4/setup/help/SAML_2_0/instructions",
        "type": "text/html"
      },
      "users": {
        "href": "http://testorgone.okta.com/api/v1/apps/0oa1gjh63g214q0Hq0g4/users"
      },
      "deactivate": {
        "href": "http://testorgone.okta.com/api/v1/apps/0oa1gjh63g214q0Hq0g4/lifecycle/deactivate"
      },
      "groups": {
        "href": "http://testorgone.okta.com/api/v1/apps/0oa1gjh63g214q0Hq0g4/groups"
      },
      "metadata": {
        "href": "http://testorgone.okta.com:/api/v1/apps/0oa1gjh63g214q0Hq0g4/sso/saml/metadata",
        "type": "application/xml"
      }
    }
  }
]
```

### Update application

<ApiOperation method="put" url="/api/v1/apps/${applicationId}" />

Updates an application in your organization

##### Request parameters

| Parameter     | Description              | Param Type |                           | Required | Default |
| ---------     | -------------------      | ---------- | --------------------------------- | -------- | ------- |
| app           | Updated app              | Body       | [Application](#application-object) | FALSE    |         |
| applicationId | `id` of an app to update | URL        | String                            | TRUE     |         |

> **Note:** All properties must be specified when updating an app. **Delta updates are not supported.**

##### Response parameters

Updated [Application](#application-object)

#### Set SWA user-editable username and password

Configures the `EDIT_USERNAME_AND_PASSWORD` scheme for a SWA application with a username template

##### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "login": true
    }
  },
  "features": [],
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "EDIT_USERNAME_AND_PASSWORD",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
```

##### Response example

```json
{
  "id": "0oabkvBLDEKCNXBGYUAS",
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
  "lastUpdated": "2013-10-01T06:28:03.486Z",
  "created": "2013-09-11T17:46:08.000Z",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "login": true
    }
  },
  "features": [],
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "EDIT_USERNAME_AND_PASSWORD",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
    },
    "groups": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
    }
  }
}
```

#### Set SWA administrator sets username and password

Configures the `ADMIN_SETS_CREDENTIALS` scheme for a SWA application with a username template

##### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "login": true
    }
  },
  "features": [],
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "ADMIN_SETS_CREDENTIALS",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
```

##### Response example

```json
{
  "id": "0oabkvBLDEKCNXBGYUAS",
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
  "lastUpdated": "2013-10-01T06:28:03.486Z",
  "created": "2013-09-11T17:46:08.000Z",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "login": true
    }
  },
  "features": [],
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "ADMIN_SETS_CREDENTIALS",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
    },
    "groups": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
    }
  }
}
```

#### Set SWA user-editable password

Configures the `EDIT_PASSWORD_ONLY` scheme for a SWA application with a username template

##### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "login": true
    }
  },
  "features": [],
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "EDIT_PASSWORD_ONLY",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
```

##### Response example

```json
{
  "id": "0oabkvBLDEKCNXBGYUAS",
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
  "lastUpdated": "2013-10-01T06:25:37.612Z",
  "created": "2013-09-11T17:46:08.000Z",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "login": true
    }
  },
  "features": [],
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "EDIT_PASSWORD_ONLY",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
    },
    "groups": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
    }
  }
}
```

#### Set SWA Okta password

Configures the `EXTERNAL_PASSWORD_SYNC` scheme for a SWA application with a username template

##### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "login": true
    }
  },
  "features": [],
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "EXTERNAL_PASSWORD_SYNC",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
```

##### Response example

```json
{
  "id": "0oabkvBLDEKCNXBGYUAS",
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
  "lastUpdated": "2013-10-01T06:30:17.151Z",
  "created": "2013-09-11T17:46:08.000Z",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "login": true
    }
  },
  "features": [],
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "EXTERNAL_PASSWORD_SYNC",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    }
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
    },
    "groups": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
    }
  }
}
```

#### Set SWA shared credentials

Configures the `SHARED_USERNAME_AND_PASSWORD` scheme for a SWA application with a username and password

##### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "login": true
    }
  },
  "features": [],
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "SHARED_USERNAME_AND_PASSWORD",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    },
    "userName": "sharedusername",
    "password": {
      "value": "sharedpassword"
    }
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
```

##### Response example

```json
{
  "id": "0oabkvBLDEKCNXBGYUAS",
  "name": "template_swa",
  "label": "Sample Plugin App",
  "status": "ACTIVE",
  "lastUpdated": "2013-10-01T06:20:18.436Z",
  "created": "2013-09-11T17:46:08.000Z",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "login": true
    }
  },
  "features": [],
  "signOnMode": "BROWSER_PLUGIN",
  "credentials": {
    "scheme": "SHARED_USERNAME_AND_PASSWORD",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    },
    "userName": "sharedusername",
    "password": {}
  },
  "settings": {
    "app": {
      "buttonField": "btn-login",
      "passwordField": "txtbox-password",
      "usernameField": "txtbox-username",
      "url": "https://example.com/login.html"
    }
  },
  "_links": {
    "logo": [
      {
        "href": "https:/example.okta.com/img/logos/logo_1.png",
        "name": "medium",
        "type": "image/png"
      }
    ],
    "users": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/users"
    },
    "groups": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/groups"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
    },
    "deactivate": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
    }
  }
}
```

#### Update key credential for application

Updates the [Application Key Credential](#application-key-credential-object) by `kid`

##### Request Parameters

| Parameter     | Description                                                             | Param Type | DataType                                      | Required | Default |
| ------------- | ----------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- | ------- |
| app           | app with new key credential kid                                         | Body       | [Application](#application-object)             | FALSE    |         |
| applicationId | `id` of an [app](#application-object)                                    | URL        | String                                        | TRUE     |         |

##### Response parameters

[Application](#application-object) with updated `kid`

##### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "zendesk",
  "label": "Zendesk",
  "signOnMode": "SAML_2_0",
  "credentials": {
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    },
    "signing": {
      "kid": "SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4"
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps/0oainmLkOL329Jcju0g3"
```

##### Response example

```json
{
  "id": "0oainmLkOL329Jcju0g3",
  "name": "zendesk",
  "label": "Zendesk",
  "status": "ACTIVE",
  "lastUpdated": "2015-12-16T00:00:44.000Z",
  "created": "2015-12-14T18:18:48.000Z",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null,
    "loginRedirectUrl": null
  },
  "licensing": {
    "seatCount": 0
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
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    },
    "signing": {
      "kid": "SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4"
    }
  },
  "settings": {
    "app": {
      "companySubDomain": "aaa",
      "authToken": null
    },
    "notifications": {
      "vpn": {
        "network": {
          "connection": "DISABLED"
        },
        "message": null,
        "helpUrl": null
      }
    },
    "signOn": {
      "defaultRelayState": null
    }
  },
  "_links": {
    "logo": [
      {
        "name": "medium",
        "href": "http://testorgone.okta.com/img/logos/zendesk.png",
        "type": "image/png"
      }
    ],
    "appLinks": [
      {
        "name": "login",
        "href": "http://testorgone.okta.com/home/zendesk/0oainmLkOL329Jcju0g3/120",
        "type": "text/html"
      }
    ],
    "help": {
      "href": "http://testorgone-admin.okta.com/app/zendesk/0oainmLkOL329Jcju0g3/setup/help/SAML_2_0/external-doc",
      "type": "text/html"
    },
    "users": {
      "href": "http://testorgone.okta.com/api/v1/apps/0oainmLkOL329Jcju0g3/users"
    },
    "deactivate": {
      "href": "http://testorgone.okta.com:/api/v1/apps/0oainmLkOL329Jcju0g3/lifecycle/deactivate"
    },
    "groups": {
      "href": "http://testorgone.okta.com/api/v1/apps/0oainmLkOL329Jcju0g3/groups"
    },
    "metadata": {
      "href": "http://testorgone.okta.com/api/v1/apps/0oainmLkOL329Jcju0g3/sso/saml/metadata",
      "type": "application/xml"
    }
  }
}
```

#### Set self-service application assignment

Enables or disables a self-service application assignment by modifying the `accessibility.selfService` property

##### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "testorgone_examplecustomsaml20app_1",
  "label": "Example Custom SAML 2.0 App",
  "signOnMode": "SAML_2_0",
  "accessibility": {
    "selfService": true,
    "errorRedirectUrl": null,
    "loginRedirectUrl": null
  }
}' "https://${yourOktaDomain}/api/v1/apps/0oainmLkOL329Jcju0g3"
```

##### Response example

[Application](#application-object) with updated [Accessibility object](#accessibility-object)

##### Response example (self-service application assignment not available)

If you encounter the following error when enabling self-service, you can read about [username overrides](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Profile_Editor) with profile mappings (Universal Directory). You can also read about how to update user permissions on properties in the user profile to secure your app before enabling self-service.

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "errorCode": "E0000044",
  "errorSummary": "Self service application assignment is not supported.",
  "errorLink": "E0000044",
  "errorCauses": [
      {
          "errorSummary": "Self service is not available because the instance : Example Custom SAML 2.0 App has username set to use read-write property and that would create a security risk."
      }
  ]
}
```

#### Update the client authentication method

Updates the `token_endpoint_auth_method` property for an OAuth 2.0 client application

##### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d {
    "id": "0oap6nz61rKdsoyOY0h7",
    "name": "oidc_client",
    "label": "SampleClient",
    "status": "ACTIVE",
    "accessibility": {
        "selfService": false,
        "errorRedirectUrl": null,
        "loginRedirectUrl": null
    },
    "visibility": {
        "autoSubmitToolbar": false,
        "hide": {
            "iOS": true,
            "web": true
        },
        "appLinks": {
            "oidc_client_link": true
        }
    },
    "signOnMode": "OPENID_CONNECT",
    "credentials": {
        "userNameTemplate": {
            "template": "${source.login}",
            "type": "BUILT_IN"
        },
        "signing": {
            "kid": "5gbe0HpzAYj2rsWSLxx1fYHdh-SzWqyKqwmfJ6qDk5g"
        },
        "oauthClient": {
            "autoKeyRotation": true,
            "client_id": "0oap6nz61rKdsoyOY0h7",
            "token_endpoint_auth_method": "client_secret_jwt"
        }
    },
    "settings": {
        "app": {},
        "notifications": {
            "vpn": {
                "network": {
                    "connection": "DISABLED"
                },
                "message": null,
                "helpUrl": null
            }
        },
        "oauthClient": {
            "client_uri": "http://localhost:8080",
            "logo_uri": "http://developer.okta.com/assets/images/logo-new.png",
            "redirect_uris": [
                "https://example.com/oauth2/callback",
                "myapp://callback"
            ],
            "wildcard_redirect": "DISABLED",
            "post_logout_redirect_uris": [
                "https://example.com/oauth2/postLogoutRedirectUri"
            ],
            "response_types": [
                "token",
                "id_token",
                "code"
            ],
            "grant_types": [
                "implicit",
                "authorization_code"
            ],
            "application_type": "native",
            "consent_method": "TRUSTED",
            "issuer_mode": "CUSTOM_URL"
        }
    }
}`
```

##### Response example

```json
{
    "id": "0oap6nz61rKdsoyOY0h7",
    "name": "oidc_client",
    "label": "SampleClient",
    "status": "ACTIVE",
    "lastUpdated": "2020-01-09T18:01:12.000Z",
    "created": "2020-01-09T16:59:15.000Z",
    "accessibility": {
        "selfService": false,
        "errorRedirectUrl": null,
        "loginRedirectUrl": null
    },
    "visibility": {
        "autoSubmitToolbar": false,
        "hide": {
            "iOS": true,
            "web": true
        },
        "appLinks": {
            "oidc_client_link": true
        }
    },
    "features": [],
    "signOnMode": "OPENID_CONNECT",
    "credentials": {
        "userNameTemplate": {
            "template": "${source.login}",
            "type": "BUILT_IN"
        },
        "signing": {
            "kid": "5gbe0HpzAYj2rsWSLxx1fYHdh-SzWqyKqwmfJ6qDk5g"
        },
        "oauthClient": {
            "autoKeyRotation": true,
            "client_id": "0oap6nz61rKdsoyOY0h7",
            "client_secret": "D0HxBn1FtTXeYC4cSBwWL_sPMztMT2t6Ei9n1QjO",
            "token_endpoint_auth_method": "client_secret_jwt"
        }
    },
    "settings": {
        "app": {},
        "notifications": {
            "vpn": {
                "network": {
                    "connection": "DISABLED"
                },
                "message": null,
                "helpUrl": null
            }
        },
        "oauthClient": {
            "client_uri": "http://localhost:8080",
            "logo_uri": "http://developer.okta.com/assets/images/logo-new.png",
            "redirect_uris": [
                "https://example.com/oauth2/callback",
                "myapp://callback"
            ],
            "wildcard_redirect": "DISABLED",
            "post_logout_redirect_uris": [
                "https://example.com/oauth2/postLogoutRedirectUri"
            ],
            "response_types": [
                "token",
                "id_token",
                "code"
            ],
            "grant_types": [
                "implicit",
                "authorization_code"
            ],
            "application_type": "native",
            "consent_method": "TRUSTED",
            "issuer_mode": "CUSTOM_URL",
            "idp_initiated_login": {
              "mode": "DISABLED"
            }
        }
    },
    "_links": {
        "appLinks": [
            {
                "name": "oidc_client_link",
                "href": "https://${yourOktaDomain}/home/oidc_client/0oap6nz61rKdsoyOY0h7/aln5z7uhkbM6y7bMy0g7",
                "type": "text/html"
            }
        ],
        "groups": {
            "href": "https://${yourOktaDomain}/api/v1/apps/0oap6nz61rKdsoyOY0h7/groups"
        },
        "logo": [
            {
                "name": "medium",
                "href": "https://example.com/assets/img/logos/default.6770228fb0dab49a1695ef440a5279bb.png",
                "type": "image/png"
            }
        ],
        "users": {
            "href": "https://${yourOktaDomain}/api/v1/apps/0oap6nz61rKdsoyOY0h7/users"
        },
        "deactivate": {
            "href": "https://${yourOktaDomain}/api/v1/apps/0oap6nz61rKdsoyOY0h7/lifecycle/deactivate"
        }
    }
}
```

### Delete application

<ApiOperation method="delete" url="/api/v1/apps/${applicationId}" />

Removes an inactive application

> **Note:** Applications must be deactivated before they can be deleted.

##### Request parameters

| Parameter     | Description              | Param Type | DataType | Required | Default |
| ---------     | -------------------      | ---------- | -------- | -------- | ------- |
| applicationId | `id` of an app to delete | URL        | String   | TRUE     |         |

##### Response parameters

An empty JSON object `{}`

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS"
```

##### Response example

```http
HTTP/1.1 204 No Content
```

If the application has an `ACTIVE` status, the response contains an error message.

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "errorCode": "E0000056",
  "errorSummary": "Delete application forbidden.",
  "errorLink": "E0000056",
  "errorId": "oaeHifznCllQ26xcRsO5vAk7A",
  "errorCauses": [
    {
      "errorSummary": "The application must be deactivated before deletion."
    }
  ]
}
```

## Application lifecycle operations

### Activate application

<ApiOperation method="post" url="/api/v1/apps/${applicationId}/lifecycle/activate" />

Activates an inactive application

##### Request parameters

| Parameter     | Description                | Param Type | DataType | Required | Default |
| ---------     | ---------------------      | ---------- | -------- | -------- | ------- |
| applicationId | `id` of an app to activate | URL        | String   | TRUE     |         |

##### Response parameters

An empty JSON object `{}`

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/activate"
```

##### Response example

```json
{}
```

### Deactivate application

<ApiOperation method="post" url="/api/v1/apps/${applicationId}/lifecycle/deactivate" />

Deactivates an active application

##### Request parameters


| Parameter     | Description                  | Param Type | DataType | Required | Default |
| ---------     | -------------------------    | ---------- | -------- | -------- | ------- |
| applicationId | `id` of an app to deactivate | URL        | String   | TRUE     |         |

##### Response parameters

An empty JSON object `{}`

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oabkvBLDEKCNXBGYUAS/lifecycle/deactivate"
```

##### Response example

```json
{}
```

## Application user operations

### Assign user to application for SSO

<ApiOperation method="post" url="/api/v1/apps/${applicationId}/users" />

Assigns a user without a [profile](#application-user-profile-object) to an application for SSO

##### Request parameters

| Parameter     | Description                                                            | Param Type | DataType                                    | Required | Default |
| ---------     | ---------------------------------------------------------------------- | ---------- | ------------------------------------------- | -------- | ------- |
| applicationId | `id` of an [app](#application-object)                                   | URL        | String                                      | TRUE     |         |
| appuser       | User's [credentials](#application-user-credentials-object) for the app | Body       | [Application User](#application-user-object) | TRUE     |         |

> **Note:** Only the user's ID is required for the request body of applications with [SignOn Modes](#sign-on-modes) or [Authentication Schemes](#authentication-schemes) that don't require or support credentials.

> **Note:** If your SSO application requires a profile but doesn't have provisioning enabled, you should add a profile to the request and use the [Assign user to application for SSO and provisioning](#assign-user-to-application-for-sso-and-provisioning) operation.

##### Response parameters

[Application User](#application-user-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "id": "00ud4tVDDXYVKPXKVLCO",
  "scope": "USER",
  "credentials": {
    "userName": "user@example.com",
    "password": {
      "value": "correcthorsebatterystaple"
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/users"
```

##### Response example

```json
{
  "id": "00u15s1KDETTQMQYABRL",
  "externalId": null,
  "created": "2014-08-11T02:24:31.000Z",
  "lastUpdated": "2014-08-11T05:38:01.000Z",
  "scope": "USER",
  "status": "ACTIVE",
  "statusChanged": "2014-08-11T02:24:32.000Z",
  "passwordChanged": null,
  "syncState": "DISABLED",
  "lastSync": null,
  "credentials": {
    "userName": "user@example.com"
  },
  "profile": {},
  "_links": {
    "app": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oaq2rRZUQAKJIZYFIGM"
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL"
    }
  }
}
```

### Assign user to application for SSO and provisioning

<ApiOperation method="post" url="/api/v1/apps/${applicationId}/users" />

Assigns a user to an application with [credentials](#application-user-credentials-object) and an app-specific [profile](#application-user-profile-object). Profile mappings defined for the application are first applied before applying any profile properties specified in the request.

##### Request parameters

| Parameter     | Description                                                                                                            | Param Type | DataType                                    | Required | Default |
| ---------     | ---------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------- | -------- | ------- |
| applicationId | `id` of an [app](#application-object)                                                                                   | URL        | String                                      | TRUE     |         |
| appuser       | user's [credentials](#application-user-credentials-object) and [profile](#application-user-profile-object) for the app | Body       | [Application User](#application-user-object) | FALSE    |         |

> **Note:** The [Application User](#application-user-object) must specify the user's `id` and should omit [credentials](#application-user-credentials-object) for applications with [SignOn Modes](#sign-on-modes) or [Authentication Schemes](#authentication-schemes) that don't require or support credentials.

> **Important:** You can only specify profile properties that aren't defined by profile mappings when Universal Directory is enabled.

##### Response parameters

[Application User](#application-user-object) with user profile mappings applied

Your request is rejected with a `403 Forbidden` status for applications with the `PUSH_NEW_USERS` or `PUSH_PROFILE_UPDATES` features enabled if the request specifies a value for an attribute that is defined by an application user profile mapping (Universal Directory) and the value for the attribute doesn't match the output of the mapping.

> **Important:** It is recommended that you omit mapped properties during assignment to minimize assignment errors.

```json
{
  "errorCode": "E0000075",
  "errorSummary": "Cannot modify the firstName attribute because it has a field mapping and profile push is enabled.",
  "errorLink": "E0000075",
  "errorId": "oaez9oW_WXiR_K-WwaTKhlgBQ",
  "errorCauses": []
}
```

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "id": "00u15s1KDETTQMQYABRL",
  "scope": "USER",
  "credentials": {
    "userName": "saml.jackson@example.com"
  },
  "profile": {
      "salesforceGroups": [
        "Employee"
      ],
      "role": "Developer",
      "profile": "Standard User"
  }
}' "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/users"
```

##### Response example

```json
{
  "id": "00u13okQOVWZJGDOAUVR",
  "externalId": "005o0000000ogQ9AAI",
  "created": "2014-07-03T20:37:14.000Z",
  "lastUpdated": "2014-07-10T13:25:04.000Z",
  "scope": "USER",
  "status": "PROVISIONED",
  "statusChanged": "2014-07-03T20:37:17.000Z",
  "passwordChanged": null,
  "syncState": "SYNCHRONIZED",
  "lastSync": "2014-07-10T13:25:04.000Z",
  "credentials": {
    "userName": "saml.jackson@example.com"
  },
  "profile": {
    "secondEmail": null,
    "lastName": "Jackson",
    "mobilePhone": null,
    "email": "saml.jackson@example.com",
    "salesforceGroups": [
      "Employee"
    ],
    "role": "Developer",
    "firstName": "Saml",
    "profile": "Standard User"
  },
  "_links": {
    "app": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oa164zIYRQREYAAGGQR"
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u13okQOVWZJGDOAUVR"
    }
  }
}
```

### Get assigned user for application

<ApiOperation method="get" url="/api/v1/apps/${applicationId}/users/${userId}" />

Fetches a specific user assignment for an application by `id`

##### Request parameters

| Parameter     | Description                                              | Param Type | DataType | Required | Default |
| ---------     | -----------------------------------------------          | ---------- | -------- | -------- | ------- |
| applicationId | `id` of an [app](#application-object)                     | URL        | String   | TRUE     |         |
| uid           | unique key of assigned [User](/docs/reference/api/users/) | URL        | String   | TRUE     |         |

##### Response parameters

[Application User](#application-user-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/users/00ud4tVDDXYVKPXKVLCO"
```

##### Response example

```json
{
  "id": "00u13okQOVWZJGDOAUVR",
  "externalId": "005o0000000ogQ9AAI",
  "created": "2014-07-03T20:37:14.000Z",
  "lastUpdated": "2014-07-10T13:25:04.000Z",
  "scope": "USER",
  "status": "PROVISIONED",
  "statusChanged": "2014-07-03T20:37:17.000Z",
  "passwordChanged": null,
  "syncState": "SYNCHRONIZED",
  "lastSync": "2014-07-10T13:25:04.000Z",
  "credentials": {
    "userName": "saml.jackson@example.com"
  },
  "profile": {
    "secondEmail": null,
    "lastName": "Jackson",
    "mobilePhone": null,
    "email": "saml.jackson@example.com",
    "salesforceGroups": [
      "Employee"
    ],
    "role": "Developer",
    "firstName": "Saml",
    "profile": "Standard User"
  },
  "_links": {
    "app": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oa164zIYRQREYAAGGQR"
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u13okQOVWZJGDOAUVR"
    }
  }
}
```

### List users assigned to application

<ApiOperation method="get" url="/api/v1/apps/${applicationId}/users" />

Enumerates all assigned [Application users](#application-user-object) for an application

##### Request parameters

| Parameter     | Description                                                                | Param Type | DataType | Required | Default |
| ---------     | ----------------------------------------------------------------           | ---------- | -------- | -------- | ------- |
| after         | Specifies the pagination cursor for the next page of assignments           | Query      | String   | FALSE    |         |
| applicationId | `id` of an [app](#application-object)                                        | URL        | String   | TRUE     |         |
| limit         | Specifies the number of results per page (maximum 500)                      | Query      | Number   | FALSE    | 50      |
| q             | Returns a filtered list of app users. The value of `q` is matched against an application user profile's `userName`, `firstName`, `lastName`, and `email`. **Note:** This operation only supports `startsWith` that matches what the string starts with to the query. | Query      | String   | FALSE    |         |

The results are [paginated](/docs/reference/api-overview/#pagination) according to the `limit` parameter.
If there are multiple pages of results, the Link header contains a `next` link that should be treated as an opaque value (follow it, don't parse it).

##### Response parameters

Array of [Application Users](#application-user-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/users"
```

##### Response example

```json
[
  {
    "id": "00ui2sVIFZNCNKFFNBPM",
    "externalId": "005o0000000umnEAAQ",
    "created": "2014-08-15T18:59:43.000Z",
    "lastUpdated": "2014-08-15T18:59:48.000Z",
    "scope": "USER",
    "status": "PROVISIONED",
    "statusChanged": "2014-08-15T18:59:48.000Z",
    "passwordChanged": null,
    "syncState": "SYNCHRONIZED",
    "lastSync": "2014-08-15T18:59:48.000Z",
    "credentials": {
      "userName": "user@example.com"
    },
    "profile": {
      "secondEmail": null,
      "lastName": "McJanky",
      "mobilePhone": "415-555-555",
      "email": "user@example.com",
      "salesforceGroups": [],
      "role": "CEO",
      "firstName": "Karl",
      "profile": "Standard Platform User"
    },
    "_links": {
      "app": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oajiqIRNXPPJBNZMGYL"
      },
      "user": {
        "href": "https://${yourOktaDomain}/api/v1/users/00ui2sVIFZNCNKFFNBPM"
      }
    }
  },
  {
    "id": "00ujsgVNDRESKKXERBUJ",
    "externalId": "005o0000000uqJaAAI",
    "created": "2014-08-16T02:35:14.000Z",
    "lastUpdated": "2014-08-16T02:56:49.000Z",
    "scope": "USER",
    "status": "PROVISIONED",
    "statusChanged": "2014-08-16T02:56:49.000Z",
    "passwordChanged": null,
    "syncState": "SYNCHRONIZED",
    "lastSync": "2014-08-16T02:56:49.000Z",
    "credentials": {
      "userName": "saml.jackson@example.com"
    },
    "profile": {
      "secondEmail": null,
      "lastName": "Jackson",
      "mobilePhone": null,
      "email": "saml.jackson@example.com",
      "salesforceGroups": [
        "Employee"
      ],
      "role": "Developer",
      "firstName": "Saml",
      "profile": "Standard User"
    },
    "_links": {
      "app": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oajiqIRNXPPJBNZMGYL"
      },
      "user": {
        "href": "https://${yourOktaDomain}/api/v1/users/00ujsgVNDRESKKXERBUJ"
      }
    }
  }
]
```

### Update application credentials for assigned user

<ApiOperation method="post" url="/api/v1/apps/${applicationId}/users/${userId}" />

Updates a user's [credentials](#application-user-credentials-object) for an assigned application

##### Request Parameters

| Parameter     | Description                                                        | Param Type | DataType                                    | Required | Default |
| ---------     | ------------------------------------------------------------------ | ---------- | ------------------------------------------- | -------- | ------- |
| applicationId | `id` of an [app](#application-object)                               | URL        | String                                      | TRUE     |         |
| appuser       | user's [credentials](#application-user-credentials-object) for app | Body       | [Application User](#application-user-object) | TRUE     |         |
| uid           | unique key of a valid [User](/docs/reference/api/users/)            | URL        | String                                      | TRUE     |         |

##### Response Parameters

[Application User](#application-user-object)

Your request is rejected with a `400 Bad Request` status if you attempt to assign a username or password to an application with an incompatible [Authentication scheme](#authentication-schemes).

```json
{
  "errorCode": "E0000041",
  "errorSummary": "Credentials should not be set on this resource based on the scheme.",
  "errorLink": "E0000041",
  "errorId": "oaeUM77NBynQQu4C_qT5ngjGQ",
  "errorCauses": [
    {
      "errorSummary": "User level credentials should not be provided for this scheme."
    }
  ]
}
```

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "credentials": {
    "userName": "user@example.com",
    "password": {
      "value": "updatedP@55word"
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/users/00ud4tVDDXYVKPXKVLCO"
```

##### Response example

```json
{
  "id": "00ud4tVDDXYVKPXKVLCO",
  "externalId": null,
  "created": "2014-07-03T17:24:36.000Z",
  "lastUpdated": "2014-07-03T17:26:05.000Z",
  "scope": "USER",
  "status": "ACTIVE",
  "statusChanged": "2014-07-03T17:24:36.000Z",
  "passwordChanged": "2014-07-03T17:26:05.000Z",
  "syncState": "DISABLED",
  "lastSync": null,
  "credentials": {
    "userName": "user@example.com",
    "password": {}
  },
  "profile": {},
  "_links": {
    "app": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC"
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ud4tVDDXYVKPXKVLCO"
    }
  }
}
```

### Update application profile for assigned user

<ApiOperation method="post" url="/api/v1/apps/${applicationId}/users/${userId}" />

Updates a user's profile for an application

##### Request parameters

| Parameter     | Description                                             | Param Type | DataType                                    | Required | Default |
| ---------     | -----------------------------------------------         | ---------- | ------------------------------------------- | -------- | ------- |
| applicationId | `id` of an [app](#application-object)                    | URL        | String                                      | TRUE     |         |
| uid           | unique key of a valid [User](/docs/reference/api/users/) | URL        | String                                      | TRUE     |         |
| appuser       | credentials for app                                     | Body       | [Application User](#application-user-object) | FALSE    |         |

##### Response parameters

[Application User](#application-user-object) with user profile mappings applied

Your request is rejected with a `403 Forbidden` status for applications with the `PUSH_NEW_USERS` or `PUSH_PROFILE_UPDATES` features enabled if the request specifies a value for an attribute that is defined by an application user profile mapping (Universal Directory) and the value for the attribute doesn't match the output of the mapping.

> **Note:** The Okta API currently doesn't support entity tags for conditional updates. It's only safe to fetch the most recent profile with [Get assigned user for application](#get-assigned-user-for-application), apply your profile update, and then `POST` back the updated profile as long as you are the **only** user updating a user's application profile.

```json
{
  "errorCode": "E0000075",
  "errorSummary": "Cannot modify the firstName attribute because it has a field mapping and profile push is enabled.",
  "errorLink": "E0000075",
  "errorId": "oaez9oW_WXiR_K-WwaTKhlgBQ",
  "errorCauses": []
}
```

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "profile": {
    "salesforceGroups": [
      "Partner"
    ],
    "role": "Developer",
    "profile": "Gold Partner User"
  }
}' "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/users/00ud4tVDDXYVKPXKVLCO"
```

##### Response example

```json
{
  "id": "00ujsgVNDRESKKXERBUJ",
  "externalId": "005o0000000uqJaAAI",
  "created": "2014-08-16T02:35:14.000Z",
  "lastUpdated": "2014-08-16T02:56:49.000Z",
  "scope": "USER",
  "status": "PROVISIONED",
  "statusChanged": "2014-08-16T02:56:49.000Z",
  "passwordChanged": null,
  "syncState": "SYNCHRONIZED",
  "lastSync": "2014-08-16T02:56:49.000Z",
  "credentials": {
    "userName": "saml.jackson@example.com"
  },
  "profile": {
    "secondEmail": null,
    "lastName": "Jackson",
    "mobilePhone": null,
    "email": "saml.jackson@example.com",
    "salesforceGroups": [
      "Partner"
    ],
    "role": "Developer",
    "firstName": "Saml",
    "profile": "Gold Partner User"
  },
  "_links": {
    "app": {
      "href": "https://example.com/api/v1/apps/0oad5lTSBOMUBOBVVQSC"
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ud4tVDDXYVKPXKVLCO"
    }
  }
}
```

### Remove user from application

<ApiOperation method="delete" url="/api/v1/apps/${applicationId}/users/${userId}" />

Removes an assignment for a user from an application

For directories like Active Directory and LDAP, they act as the owner of the user's credential with Okta delegating authentication (DelAuth) to that directory. If this request is made for a user when DelAuth is enabled, then the user will be in a state with no password. You can then [reset the user's password](/docs/reference/api/users/#reset-password).

> **Important:** This is a destructive operation. You can't recover the user's app profile. If the app is enabled for provisioning and configured to deactivate users, the user is also deactivated in the target application.

##### Request parameters

| Parameter     | Description                                                                           | Param Type | DataType | Required | Default |
| ------------- | ------------------------------------------------------------------------------------- | ---------- | -------- | -------- | ------- |
| applicationId | `id` of an [app](#application-object)                                                  | URL        | String   | TRUE     |         |
| sendEmail     | Sends a deactivation email to the administrator if `true`.  Default value is `false` | Query      | Boolean  | FALSE    | FALSE   |
| uid           | unique key of assigned [User](/docs/reference/api/users/)                              | URL        | String   | TRUE     |         |

##### Response parameters

An empty JSON object `{}`

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/users/00ud4tVDDXYVKPXKVLCO?sendEmail=true"
```

##### Response example

```json
{}
```

## Application group operations

### Assign group to application

<ApiOperation method="put" url="/api/v1/apps/${applicationId}/groups/${groupId}" />

Assigns a group to an application

##### Request parameters

| Parameter     | Description                                     | Param Type | DataType                                      | Required | Default |
| ---------     | ----------------------------------------------- | ---------- | --------------------------------------------- | -------- | ------- |
| appgroup      | App group                                       | Body       | [Application Group](#application-group-object) | FALSE    |         |
| applicationId | `id` of an [app](#application-object)            | URL        | String                                        | TRUE     |         |
| groupId       | unique key of a valid [Group](/docs/reference/api/groups/)           | URL        | String                | TRUE     |         |

##### Response parameters

All responses return the assigned [Application Group](#application-group-object).

##### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/groups/00gbkkGFFWZDLCNTAGQR"
```

##### Response example

```json
{
  "id": "00gbkkGFFWZDLCNTAGQR",
  "lastUpdated": "2013-10-02T07:38:20.000Z",
  "priority": 0
}
```

### Get assigned group for application

<ApiOperation method="get" url="/api/v1/apps/${applicationId}/groups/${groupId}" />

Fetches an application group assignment

##### Request parameters

| Parameter     | Description                                     | Param Type | DataType | Required | Default |
| ---------     | ----------------------------------------------- | ---------- | -------- | -------- | ------- |
| applicationId | `id` of an [app](#application-object)            | URL        | String   | TRUE     |         |
| groupId       | unique key of an assigned [Group](/docs/reference/api/groups/)       | URL        | String   | TRUE     |         |

##### Response parameters

Fetched [Application Group](#application-group-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/groups/00gbkkGFFWZDLCNTAGQR"
```

##### Response example

```json
{
  "id": "00gbkkGFFWZDLCNTAGQR",
  "lastUpdated": "2013-10-02T07:38:20.000Z",
  "priority": 0
}
```

### List groups assigned to application

<ApiOperation method="get" url="/api/v1/apps/${applicationId}/groups" />

Enumerates group assignments for an application

##### Request parameters


| Parameter     | Description                                                      | Param Type | DataType | Required | Default |
| ---------     | ---------------------------------------------------------------- | ---------- | -------- | -------- | ------- |
| after         | Specifies the pagination cursor for the next page of assignments | Query      | String   | FALSE    |         |
| applicationId | `id` of an [app](#application-object)                             | URL        | String   | TRUE     |         |
| limit         | Specifies the number of results per page (maximum 200)           | Query      | Number   | FALSE    | 20      |

The results are [paginated](/docs/reference/api-overview/#pagination) according to the `limit` parameter.
If there are multiple pages of results, the Link header contains a `next` link that should be treated as an opaque value (follow it, don't parse it).

##### Response parameters

Array of [Application Groups](#application-group-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/groups"
```

##### Response example

```json
[
  {
    "id": "00gbkkGFFWZDLCNTAGQR",
    "lastUpdated": "2013-10-02T07:38:20.000Z",
    "priority": 0
  },
  {
    "id": "00gg0xVALADWBPXOFZAS",
    "lastUpdated": "2013-10-02T14:40:29.000Z",
    "priority": 1
  }
]
```

### Remove group from application

<ApiOperation method="delete" url="/api/v1/apps/${applicationId}/groups/${groupId}" />

Removes a group assignment from an application

##### Request parameters

| Parameter     | Description                                     | Param Type | DataType | Required | Default |
| ---------     | ----------------------------------------------- | ---------- | -------- | -------- | ------- |
| applicationId | `id` of an [app](#application-object)            | URL        | String   | TRUE     |         |
| groupId       | unique key of an assigned [Group](/docs/reference/api/groups/)       | URL        | String   | TRUE     |         |

##### Response parameters

An empty JSON object `{}`

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/groups/00gbkkGFFWZDLCNTAGQR"
```

##### Response example

```json
{}
```

## Application key store operations

### Generate new application key credential

<ApiOperation method="post" url="/api/v1/apps/${applicationId}/credentials/keys/generate" />

Generates a new X.509 certificate for an application key credential

> **Note:** To update application with the newly generated key credential, see [Update Key Credential](#update-key-credential-for-application).

##### Request parameters

| Parameter     | Description                                                                     | Param Type | DataType                                      | Required | Default |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- | ------- |
| applicationId | unique key of an [Application](#application-object)                                 | URL        | String                                        | TRUE     |         |
| validityYears | expiry of the [Application Key Credential](#application-key-credential-object)   | Query      | Number                                        | TRUE     |         |

##### Response parameters

Returns the generated [Application Key Credential](#application-key-credential-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/keys/generate?validityYears=2"
```

##### Response example

```json
{
  "created": "2015-12-10T18:56:23.000Z",
  "expiresAt": "2017-12-10T18:56:22.000Z",
  "x5c": [
    "MIIDqDCCApCgAwIBAgIGAVGNQFX5MA0GCSqGSIb3DQEBBQUAMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGJhbGFjb21wdGVzdDEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTAeFw0xNTEyMTAxODU1MjJaFw0xNzEyMTAxODU2MjJaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGJhbGFjb21wdGVzdDEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJJjrcnI6cXBiXNq9YDgfYrQe2O5qEHG4MXP8Ue0sMeefFkFEHYHnHUeZCq6WTAGqR+1LFgOl+Eq9We5V+qNlGIfkFkQ3iHGBrIALKqLCd0Et76HicDiegz7j9DtN+lo0hG/gfcw5783L5g5xeQ7zVmCQMkFwoUA0uA3bsfUSrmfORHJL+EMNQT8XIXD8NkG4g6u7ylHVRTLgXbe+W/p04m3EP6l41xl+MhIpBaPxDsyUvcKCNwkZN3aZIin1O9Y4YJuDHxrM64/VtLLp0sC05iawAmfsLunF7rdJAkWUpPn+xkviyNQ3UpvwAYuDr+jKLUdh2reRnm1PezxMIXzBVMCAwEAATANBgkqhkiG9w0BAQUFAAOCAQEARnFIjyitrCGbleFr3KeAwdOyeHiRmgeKupX5ZopgXtcseJoToUIinX5DVw2fVZPahqs0Q7/a0wcVnTRpw6946qZCwKd/PvZ1feVuVEA5Ui3+XvHuSH5xLp7NvYG1snNEvlbN3+NDUMlWj2NEbihowUBt9+UxTpQO3+N08q3aZk3hOZ+tHt+1Te7KEEL/4CM28GZ9MY7fSrS7MAgp1+ZXtn+kRlMrXnQ49qBda37brwDRqmSY9PwNMbev3r+9ZHwxr9W5wXW4Ev4C4xngA7RkVoyDbItSUho0I0M0u/LHuppclnXrw97xyO5Z883eIBvPVjfRcxsJxXJ8jx70ATDskw=="
  ],
  "e": "AQAB",
  "n": "mkC6yAJVvFwUlmM9gKjb2d-YK5qHFt-mXSsbjWKKs4EfNm-BoQeeovBZtSACyaqLc8IYFTPEURFcbDQ9DkAL04uUIRD2gaHYY7uK0jsluEaXGq2RAIsmzAwNTzkiDw4q9pDL_q7n0f_SDt1TsMaMQayB6bU5jWsmqcWJ8MCRJ1aJMjZ16un5UVx51IIeCbe4QRDxEXGAvYNczsBoZxspDt28esSpq5W0dBFxcyGVudyl54Er3FzAguhgfMVjH-bUec9j2Tl40qDTktrYgYfxz9pfjm01Hl4WYP1YQxeETpSL7cQ5Ihz4jGDtHUEOcZ4GfJrPzrGpUrak8Qp5xcwCqQ",
  "kid": "SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4",
  "kty": "RSA",
  "use": "sig",
  "x5t#S256": "5GOpy9CQVtfvBmu2T8BHvpKE4OGtC3BuS046t7p9pps"
}
```

If `validityYears` is out of range (2 - 10 years), you receive an error response.

```json
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

### Clone application key credential

<ApiOperation method="post" url="/api/v1/apps/${sourceApplicationId}/credentials/keys/${kid}/clone?targetAid=${targetApplicationId}" />

Clones an X.509 certificate for an application key credential from a source application to a target application

> **Important:** Sharing certificates isn't a recommended security practice.

For step-by-step instructions to clone a credential, see [Share application key credentials between apps](/docs/guides/sharing-cert/).

##### Request parameters

| Parameter           | Description                                                                     | Param Type | DataType                                      | Required | Default |
| -------------       | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- | ------- |
| kid                 | Unique key of an [Application Key Credential](#application-key-credential-object)   | URL        | String                                        | TRUE     |         |
| sourceApplicationId | Unique key of the source [Application](#application-properties)                 | URL        | String                                        | TRUE     |         |
| targetAid           | Unique key of the target [Application](#application-properties)                 | Query      | String                                        | TRUE     |         |

##### Response parameters

Returns the cloned [Application Key Credential](#application-key-credential-object)

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
}' "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/keys/SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4/clone?targetAid=0oal21k0DVN7DhS3R0g3"
```

##### Response example

```json
{
  "created": "2015-12-10T18:56:23.000Z",
  "expiresAt": "2017-12-10T18:56:22.000Z",
  "x5c": [
    "MIIDqDCCApCgAwIBAgIGAVGNQFX5MA0GCSqGSIb3DQEBBQUAMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGJhbGFjb21wdGVzdDEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTAeFw0xNTEyMTAxODU1MjJaFw0xNzEyMTAxODU2MjJaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGJhbGFjb21wdGVzdDEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJJjrcnI6cXBiXNq9YDgfYrQe2O5qEHG4MXP8Ue0sMeefFkFEHYHnHUeZCq6WTAGqR+1LFgOl+Eq9We5V+qNlGIfkFkQ3iHGBrIALKqLCd0Et76HicDiegz7j9DtN+lo0hG/gfcw5783L5g5xeQ7zVmCQMkFwoUA0uA3bsfUSrmfORHJL+EMNQT8XIXD8NkG4g6u7ylHVRTLgXbe+W/p04m3EP6l41xl+MhIpBaPxDsyUvcKCNwkZN3aZIin1O9Y4YJuDHxrM64/VtLLp0sC05iawAmfsLunF7rdJAkWUpPn+xkviyNQ3UpvwAYuDr+jKLUdh2reRnm1PezxMIXzBVMCAwEAATANBgkqhkiG9w0BAQUFAAOCAQEARnFIjyitrCGbleFr3KeAwdOyeHiRmgeKupX5ZopgXtcseJoToUIinX5DVw2fVZPahqs0Q7/a0wcVnTRpw6946qZCwKd/PvZ1feVuVEA5Ui3+XvHuSH5xLp7NvYG1snNEvlbN3+NDUMlWj2NEbihowUBt9+UxTpQO3+N08q3aZk3hOZ+tHt+1Te7KEEL/4CM28GZ9MY7fSrS7MAgp1+ZXtn+kRlMrXnQ49qBda37brwDRqmSY9PwNMbev3r+9ZHwxr9W5wXW4Ev4C4xngA7RkVoyDbItSUho0I0M0u/LHuppclnXrw97xyO5Z883eIBvPVjfRcxsJxXJ8jx70ATDskw=="
  ],
  "e": "AQAB",
  "n": "mkC6yAJVvFwUlmM9gKjb2d-YK5qHFt-mXSsbjWKKs4EfNm-BoQeeovBZtSACyaqLc8IYFTPEURFcbDQ9DkAL04uUIRD2gaHYY7uK0jsluEaXGq2RAIsmzAwNTzkiDw4q9pDL_q7n0f_SDt1TsMaMQayB6bU5jWsmqcWJ8MCRJ1aJMjZ16un5UVx51IIeCbe4QRDxEXGAvYNczsBoZxspDt28esSpq5W0dBFxcyGVudyl54Er3FzAguhgfMVjH-bUec9j2Tl40qDTktrYgYfxz9pfjm01Hl4WYP1YQxeETpSL7cQ5Ihz4jGDtHUEOcZ4GfJrPzrGpUrak8Qp5xcwCqQ",
  "kid": "SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4",
  "kty": "RSA",
  "use": "sig",
  "x5t#S256": "5GOpy9CQVtfvBmu2T8BHvpKE4OGtC3BuS046t7p9pps"
}
```

If the key is already present in the list of key credentials for the target application, you receive a 400 error response.

```json
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

### List key credentials for application

<ApiOperation method="get" url="/api/v1/apps/${applicationId}/credentials/keys" />

Enumerates key credentials for an application

##### Request parameters

| Parameter     | Description                                     | Param Type | DataType                                      | Required | Default |
| ------------- | ----------------------------------------------- | ---------- | --------------------------------------------- | -------- | ------- |
| applicationId | unique key of an [Application](#application-object) | URL        | String                                        | TRUE     |         |

##### Response parameters

Array of [Application Key Credential](#application-key-credential-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/keys"
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
    "e": "AQAB",
    "n": "mkC6yAJVvFwUlmM9gKjb2d-YK5qHFt-mXSsbjWKKs4EfNm-BoQeeovBZtSACyaqLc8IYFTPEURFcbDQ9DkAL04uUIRD2gaHYY7uK0jsluEaXGq2RAIsmzAwNTzkiDw4q9pDL_q7n0f_SDt1TsMaMQayB6bU5jWsmqcWJ8MCRJ1aJMjZ16un5UVx51IIeCbe4QRDxEXGAvYNczsBoZxspDt28esSpq5W0dBFxcyGVudyl54Er3FzAguhgfMVjH-bUec9j2Tl40qDTktrYgYfxz9pfjm01Hl4WYP1YQxeETpSL7cQ5Ihz4jGDtHUEOcZ4GfJrPzrGpUrak8Qp5xcwCqQ",
    "kid": "SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4",
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
    "e": "AQAB",
    "n": "htbi5H5MN_oYaKcZ8vlWRZn2oTrPY0v8_2Br_VZPJgJ57dCgguq5dDk1Me_ax-B3kjBPdXcW8wEoUFaU30spyVeQjZrdqsSvF0nMW4OzrMOIqrGLwCrAoDBS8tutfk5Y7qc-5xABzxgu4BjgSK5nWXbCt_UR0DzVTknotmMGeT8tAej8F6GAphLa0YhIxWT7Jy-y_pdANsiUPRiZBoLueGI0rrCqgYHIQVjNoj4-si105KCXbQuyYM9_Cd-dyyu5KJ4Ic0cOW61gpx4pnecMgSy8OX57FEd06W2hExBd49ah6jra2KFMeOGe3rkIXirdkofl1mBgeQ77ruKO1wW9Qw",
    "kid": "mXtzOtml09Dg1ZCeKxTRBo3KrQuBWFkJ5oxhVagjTzo",
    "kty": "RSA",
    "use": "sig",
    "x5t#S256": "7CCyXWwKzH4P6PoBP91B1S_iIZVzuGffVnUXu-BTYQQ"
  }
]
```

### Get key credential for application

<ApiOperation method="get" url="/api/v1/apps/${applicationId}/credentials/keys/${kid}" />

Gets a specific [Application Key Credential](#application-key-credential-object) by `kid`

##### Request parameters

| Parameter     | Description                                                                     | Param Type | DataType                                      | Required | Default |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- | ------- |
| applicationId | unique key of an [Application](#application-object)                                 | URL        | String                                        | TRUE     |         |
| kid           | unique key of an [Application Key Credential](#application-key-credential-object)   | URL        | String                                        | TRUE     |         |

##### Response parameters

[Application Key Credential](#application-key-credential-object).

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/keys/mXtzOtml09Dg1ZCeKxTRBo3KrQuBWFkJ5oxhVagjTzo"
```

##### Response example

```json
{
  "created": "2015-12-10T18:56:23.000Z",
  "expiresAt": "2017-12-10T18:56:22.000Z",
  "x5c": [
    "MIIDqDCCApCgAwIBAgIGAVGNQFX5MA0GCSqGSIb3DQEBBQUAMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGJhbGFjb21wdGVzdDEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTAeFw0xNTEyMTAxODU1MjJaFw0xNzEyMTAxODU2MjJaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGJhbGFjb21wdGVzdDEcMBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJJjrcnI6cXBiXNq9YDgfYrQe2O5qEHG4MXP8Ue0sMeefFkFEHYHnHUeZCq6WTAGqR+1LFgOl+Eq9We5V+qNlGIfkFkQ3iHGBrIALKqLCd0Et76HicDiegz7j9DtN+lo0hG/gfcw5783L5g5xeQ7zVmCQMkFwoUA0uA3bsfUSrmfORHJL+EMNQT8XIXD8NkG4g6u7ylHVRTLgXbe+W/p04m3EP6l41xl+MhIpBaPxDsyUvcKCNwkZN3aZIin1O9Y4YJuDHxrM64/VtLLp0sC05iawAmfsLunF7rdJAkWUpPn+xkviyNQ3UpvwAYuDr+jKLUdh2reRnm1PezxMIXzBVMCAwEAATANBgkqhkiG9w0BAQUFAAOCAQEARnFIjyitrCGbleFr3KeAwdOyeHiRmgeKupX5ZopgXtcseJoToUIinX5DVw2fVZPahqs0Q7/a0wcVnTRpw6946qZCwKd/PvZ1feVuVEA5Ui3+XvHuSH5xLp7NvYG1snNEvlbN3+NDUMlWj2NEbihowUBt9+UxTpQO3+N08q3aZk3hOZ+tHt+1Te7KEEL/4CM28GZ9MY7fSrS7MAgp1+ZXtn+kRlMrXnQ49qBda37brwDRqmSY9PwNMbev3r+9ZHwxr9W5wXW4Ev4C4xngA7RkVoyDbItSUho0I0M0u/LHuppclnXrw97xyO5Z883eIBvPVjfRcxsJxXJ8jx70ATDskw=="
  ],
  "e": "AQAB",
  "n": "htbi5H5MN_oYaKcZ8vlWRZn2oTrPY0v8_2Br_VZPJgJ57dCgguq5dDk1Me_ax-B3kjBPdXcW8wEoUFaU30spyVeQjZrdqsSvF0nMW4OzrMOIqrGLwCrAoDBS8tutfk5Y7qc-5xABzxgu4BjgSK5nWXbCt_UR0DzVTknotmMGeT8tAej8F6GAphLa0YhIxWT7Jy-y_pdANsiUPRiZBoLueGI0rrCqgYHIQVjNoj4-si105KCXbQuyYM9_Cd-dyyu5KJ4Ic0cOW61gpx4pnecMgSy8OX57FEd06W2hExBd49ah6jra2KFMeOGe3rkIXirdkofl1mBgeQ77ruKO1wW9Qw",
  "kid": "mXtzOtml09Dg1ZCeKxTRBo3KrQuBWFkJ5oxhVagjTzo",
  "kty": "RSA",
  "use": "sig",
  "x5t#S256": "5GOpy9CQVtfvBmu2T8BHvpKE4OGtC3BuS046t7p9pps"
}
```

### Preview SAML metadata for application

<ApiOperation method="get" url="/api/v1/apps/${applicationId}/sso/saml/metadata" />

Previews SAML metadata based on a specific key credential for an application

##### Request parameters

| Parameter     | Description                                                                     | Param Type | DataType                                      | Required | Default |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- | ------- |
| applicationId | unique key of an [Application](#application-object)                                 | URL        | String                                        | TRUE     |         |
| kid           | unique key of an [Application Key Credential](#application-key-credential-object)   | Query      | String                                        | TRUE     |         |

##### Response parameters

SAML metadata in XML

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/xml" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oa39sivhvvtqqFbu0h7/sso/saml/metadata?kid=mXtzOtml09Dg1ZCeKxTRBo3KrQuBWFkJ5oxhVagjTzo"
```

##### Response example

```
<?xml version="1.0" encoding="UTF-8"?>
<md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" entityID="exk39sivhuytV2D8H0h7">
    <md:IDPSSODescriptor WantAuthnRequestsSigned="false" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
        <md:KeyDescriptor use="signing">
            <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                <ds:X509Data>
                    <ds:X509Certificate>MIIDqDCCApCgAwIBAgIGAVGNO4qeMA0GCSqGSIb3DQEBBQUAMIGUMQswCQYDVQQGEwJVUzETMBEG
A1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEU
MBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGJhbGFjb21wdGVzdDEcMBoGCSqGSIb3DQEJ
ARYNaW5mb0Bva3RhLmNvbTAeFw0xNTEyMTAxODUwMDhaFw0xNzEyMTAxODUxMDdaMIGUMQswCQYD
VQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsG
A1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGJhbGFjb21wdGVzdDEc
MBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
ggEBALAakG48bgcTWHdwmVLHig0mkiRejxIVm3wbzrNSJcBruTq2zCYZ1rGfVxTYON8kJqvkXPmv
kzWKhpEkvhubL+mx29XpXY0AsNIfgcm5xIV56yhXSvlMdqzGo3ciRwoACaF+ClNLxmXK9UTZD89B
bVVGCG5AEvja0eCQ0GYsO5i9aSI5aTroab8Aew31PuWl/RGQWmjVy8+7P4wwkKKJNKCpxMYDlhfa
WRp0zwUSbUCO0qEyeAYdZx6CLES4FGrDi/7D6G+ewWC+kbz1tL1XpF2Dcg3+IOlHrV6VWzz3rG39
v9zFIncjvoQJFDGWhpqGqcmXvgH0Ze3SVcVF01T+bK0CAwEAATANBgkqhkiG9w0BAQUFAAOCAQEA
AHmnSZ4imjNrIf9wxfQIcqHXEBoJ+oJtd59cw1Ur/YQY9pKXxoglqCQ54ZmlIf4GghlcZhslLO+m
NdkQVwSmWMh6KLxVM18/xAkq8zyKbMbvQnTjFB7x45bgokwbjhivWqrB5LYHHCVN7k/8mKlS4eCK
Ci6RGEmErjojr4QN2xV0qAqP6CcGANgpepsQJCzlWucMFKAh0x9Kl8fmiQodfyLXyrebYsVnLrMf
jxE1b6dg4jKvv975tf5wreQSYZ7m//g3/+NnuDKkN/03HqhV7hTNi1fyctXk8I5Nwgyr+pT5LT2k
YoEdncuy+GQGzE9yLOhC4HNfHQXpqp2tMPdRlw==</ds:X509Certificate>
                </ds:X509Data>
            </ds:KeyInfo>
        </md:KeyDescriptor>
        <md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</md:NameIDFormat>
        <md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified</md:NameIDFormat>
        <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://${yourOktaDomain}/app/sample-app/exk39sivhuytV2D8H0h7/sso/saml"/>
        <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="https://${yourOktaDomain}/app/sample-app/exk39sivhuytV2D8H0h7/sso/saml"/>
    </md:IDPSSODescriptor>
</md:EntityDescriptor>
```

### Generate CSR for application

<ApiOperation method="post" url="/api/v1/apps/${applicationId}/credentials/csrs" />

Generates a new key pair and returns the Certificate Signing Request (CSR). The information in a CSR is used by the Certificate Authority (CA) to verify and create your certificate. It also contains the public key that is included in your certificate.

> **Note:** The key pair isn't listed in the [key credentials for the application](#list-key-credentials-for-application) until it's published.

##### Request parameters

| Parameter     | Description                                                                     | Param Type | DataType                                      | Required | Default |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- | ------- |
| applicationId | unique key of an [Application](#application-object)                                 | URL        | String                                        | TRUE     |         |
| metadata      | Metadata for the CSR                                                            | Body       | [CSR Metadata](#csr-metadata-object)          | TRUE     |         |

##### Response parameters

Returns CSR in PKCS#10 format if the `Accept` media type is [application/pkcs10](https://tools.ietf.org/html/rfc5967) or a [CSR object](#application-csr-object) if the `Accept` media type is `application/json`

##### Request example

Generates a new key pair and returns the CSR in PKCS#10 format

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
}' "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/"
```

Generates a new key pair and returns the [CSR object](#application-csr-object)

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
}' "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/"
```

##### Response example

Returns CSR in PKCS#10 format

```http
HTTP/1.1 201 Created
Location: https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50
Content-Type: application/pkcs10; filename=okta.p10
Content-Transfer-Encoding: base64

MIIC4DCCAcgCAQAwcTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xEzARBgNVBAoMCk9rdGEsIEluYy4xDDAKBgNVBAsMA0RldjESMBAGA1UEAwwJU1AgSXNzdWVyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6m8jHVCr9/tKvvbFN59T4raoCs/78KRm4fSefHQOv1TKLXo4wTLbsqYWRWc5u0sd5orUMQgPQOyj3i6qh13mALY4BzrT057EG1BUNjGg29QgYlnOk2iX890e5BIDMQQEIKFrvOi2V8cLUkLvE2ydRn0VO1Q1frbUkYeStJYC5Api2JQsYRwa+1ZeDH1ITnIzUaugWhW2WB2lSnwZkenne5KtffxMPYVu+IhNRHoKaRA6Z51YNhMJIx17JM2hs/H4Ka3drk6kzDf7ofk/yBpb9yBWyU7CTSQhdoHidxqFprMDaT66W928t3AeOENHBuwn8c2K9WeGG+bELNyQRJVmawIDAQABoCowKAYJKoZIhvcNAQkOMRswGTAXBgNVHREEEDAOggxkZXYub2t0YS5jb20wDQYJKoZIhvcNAQELBQADggEBAA2hsVJRVM+A83X9MekjTnIbt19UNT8wX7wlE9jUKirWsxceLiZBpVGn9qfKhhVIpvdaIRSeoFYS2Kg/m1G6bCvjmZLcrQ5FcEBjZH2NKfNppGVnfC2ugtUkBtCB+UUzOhKhRKJtGugenKbP33zRWWIqnd2waF6Cy8TIuqQVPbwEDN9bCbAs7ND6CFYNguY7KYjWzQOeAR716eqpEEXuPYAS4nx/ty4ylonR8cv+gpq51rvq80A4k/36aoeM0Y6I4w64vhTfuvWW2UYFUD+/+y2FA2CSP4JfctySrf1s525v6fzTFZ3qZbB5OZQtP2b8xYWktMzywsxGKDoVDB4wkH4=
```

Returns a [CSR object](#application-csr-object)

```json
{
  "id": "h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
  "created": "2017-03-28T01:11:10.000Z",
  "csr": "MIIC4DCCAcgCAQAwcTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xEzARBgNVBAoMCk9rdGEsIEluYy4xDDAKBgNVBAsMA0RldjESMBAGA1UEAwwJU1AgSXNzdWVyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6m8jHVCr9/tKvvbFN59T4raoCs/78KRm4fSefHQOv1TKLXo4wTLbsqYWRWc5u0sd5orUMQgPQOyj3i6qh13mALY4BzrT057EG1BUNjGg29QgYlnOk2iX890e5BIDMQQEIKFrvOi2V8cLUkLvE2ydRn0VO1Q1frbUkYeStJYC5Api2JQsYRwa+1ZeDH1ITnIzUaugWhW2WB2lSnwZkenne5KtffxMPYVu+IhNRHoKaRA6Z51YNhMJIx17JM2hs/H4Ka3drk6kzDf7ofk/yBpb9yBWyU7CTSQhdoHidxqFprMDaT66W928t3AeOENHBuwn8c2K9WeGG+bELNyQRJVmawIDAQABoCowKAYJKoZIhvcNAQkOMRswGTAXBgNVHREEEDAOggxkZXYub2t0YS5jb20wDQYJKoZIhvcNAQELBQADggEBAA2hsVJRVM+A83X9MekjTnIbt19UNT8wX7wlE9jUKirWsxceLiZBpVGn9qfKhhVIpvdaIRSeoFYS2Kg/m1G6bCvjmZLcrQ5FcEBjZH2NKfNppGVnfC2ugtUkBtCB+UUzOhKhRKJtGugenKbP33zRWWIqnd2waF6Cy8TIuqQVPbwEDN9bCbAs7ND6CFYNguY7KYjWzQOeAR716eqpEEXuPYAS4nx/ty4ylonR8cv+gpq51rvq80A4k/36aoeM0Y6I4w64vhTfuvWW2UYFUD+/+y2FA2CSP4JfctySrf1s525v6fzTFZ3qZbB5OZQtP2b8xYWktMzywsxGKDoVDB4wkH4=",
  "kty": "RSA",
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "publish": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

### Publish CSR for application

<ApiOperation method="post" url="/api/v1/apps/${applicationId}/credentials/csrs/${csrId}/lifecycle/publish" />

Updates the CSR with a signed X.509 certificate and adds it into the application key credentials

> **Note:** Publishing a certificate completes the lifecycle of the CSR and it is no longer accessible.

##### Request parameters

| Parameter     | Description                                                                     | Param Type | DataType                                                 | Required | Default |
| ------------- | ------------------------------------------------------------------------------- | ---------- | ---------------------------------------------            | -------- | ------- |
| applicationId | Unique key of the [Application](#application-properties)                        | URL        | String                                                   | TRUE     |         |
| certificate   | The signed X.509 certificate                                                    | Body       | X.509 certififcate in `DER`, `PEM` or `CER` format | TRUE     |         |
| csrid         | Unique key of an [Application CSR](#application-csr-object)                         | URL        | String                                                   | TRUE     |         |

For `DER` and `CER` formated certificate, the client can either post in binary or in base64 encoded. If the post is base64 encoded, the `Content-Transfer-Encoding` header should be set to `base64`.

##### Response parameters

Returns the new [Application Key Credential](#application-key-credential-object)

##### Request example

Publishes with an X.509 certificate in base64 encoded `DER`

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/pkix-cert" \
-H "Authorization: SSWS ${api_token}" \
-H "Content-Transfer-Encoding: base64" \
-d "MIIFgjCCA2qgAwIBAgICEAcwDQYJKoZIhvcNAQELBQAwXjELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMQ0wCwYDVQQKDARPa3RhMQwwCgYDVQQLDANFbmcxDTALBgNVBAMMBFJvb3QwHhcNMTcwMzI3MjEyMDQ3WhcNMTgwNDA2MjEyMDQ3WjB4MQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzETMBEGA1UECgwKT2t0YSwgSW5jLjEQMA4GA1UECwwHSmFua3lDbzEVMBMGA1UEAwwMSWRQIElzc3VlciA3MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmkC6yAJVvFwUlmM9gKjb2d+YK5qHFt+mXSsbjWKKs4EfNm+BoQeeovBZtSACyaqLc8IYFTPEURFcbDQ9DkAL04uUIRD2gaHYY7uK0jsluEaXGq2RAIsmzAwNTzkiDw4q9pDL/q7n0f/SDt1TsMaMQayB6bU5jWsmqcWJ8MCRJ1aJMjZ16un5UVx51IIeCbe4QRDxEXGAvYNczsBoZxspDt28esSpq5W0dBFxcyGVudyl54Er3FzAguhgfMVjH+bUec9j2Tl40qDTktrYgYfxz9pfjm01Hl4WYP1YQxeETpSL7cQ5Ihz4jGDtHUEOcZ4GfJrPzrGpUrak8Qp5xcwCqQIDAQABo4IBLjCCASowCQYDVR0TBAIwADARBglghkgBhvhCAQEEBAMCBkAwMwYJYIZIAYb4QgENBCYWJE9wZW5TU0wgR2VuZXJhdGVkIFNlcnZlciBDZXJ0aWZpY2F0ZTAdBgNVHQ4EFgQUVqJukDmyENw/2pTApbxc/HRKbngwgZAGA1UdIwSBiDCBhYAUFx245ZZXqWTTbARfMlFWN77L9EahYqRgMF4xCzAJBgNVBAYTAlVTMQswCQYDVQQIDAJDQTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEMMAoGA1UECwwDRW5nMQ0wCwYDVQQDDARSb290ggkAlIfpwZjO5o8wDgYDVR0PAQH/BAQDAgWgMBMGA1UdJQQMMAoGCCsGAQUFBwMBMA0GCSqGSIb3DQEBCwUAA4ICAQCcoBSRtY+9cJY00hLvq6AloYZcdn/kUQupfmyz4n3lKE3wV2FB0swKnK0QDi8iNuQJFdag/19vDHC4/LhoSuv1Q+KXM61pPZVRXXPyC1+e7Y6hj93tEI5HcqLPcDRH1AIG2l8tE7LBn+MQB5Vh6oxjG2IdoWxg6abMfISU+MauPWql4vMDUWo9iNShAo44Z5fd+nuz+hlAinU9Xn9Jf2QsfKvcbMRq7iuqgkabgdmObmWb9KK0Vm7TDkxCH0pB0onPr6epVUP8Obg/pT1Oj/1hOLbfR8CHHWdAWzUBGGvp2TIy2A8LUaEoFnwkxZfdL7Bnd0RH/ClBtAjzLOxmUo7NbZmEnYCcD5pZz7BdZI0db/eBXFqfOlA88rEe+9Sv+NndIq0/WNIIsJi2RgjJnxsxvB5MjhhzmItpFIUl5yqoO3C9jcCp6HDBJxtCGbvAr5ALPn5RCJeBIr67WpAiTd7L3Ebu9SQZlXnoHX8kP04EA6ylR3W0EFbh7KUtq8M2H2vo0wjMj7ysl/3tT7cEZ97s1ygO5iJx3GfMDyrDhtLXSBJ20uSxTJeptRw8SDiwTqunIh1WyKlcQz1WGauSbW4eXdj/r9KYMJ3qMMkdP/9THQUtTcOYx51r8RV9pdzqF2HPnZZNziBa+wXJZHEWp70NyoakNthgYwtypqiDHs2f3Q==" \
"https://${yourOktaDomain}/api/v1/apps/0oa1ysid1U3iyFqLu0g4/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish"
```

Publishes with an X.509 certificate in `PEM` format

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/x-pem-file" \
-H "Authorization: SSWS ${api_token}" \
--data-binary @certificate.pem \
"https://${yourOktaDomain}/api/v1/apps/0oa1ysid1U3iyFqLu0g4/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish"
```

Publishes with an X.509 certificate in binary `CER` format

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/x-x509-ca-cert" \
-H "Authorization: SSWS ${api_token}" \
--data-binary @certificate.cer \
"https://${yourOktaDomain}/api/v1/apps/0oa1ysid1U3iyFqLu0g4/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish"
```

##### Response example

```json
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

If the certificate doesn't match the CSR or its validaty period is less than 90 days, you receive a 400 error response.

```json
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

### Revoke CSR from application

<ApiOperation method="delete" url="/api/v1/apps/${applicationId}/credentials/csrs/${csrId}" />

Revokes a CSR and deletes the key pair from the application

##### Request parameters

| Parameter     | Description                                       | Param Type | DataType | Required | Default |
| ---------     | -----------------------------------------------   | ---------- | -------- | -------- | ------- |
| applicationId | `id` of an [Application](#application-object)              | URL        | String   | TRUE     |         |
| csrId         | unique key of a [CSR object](#application-csr-object) | URL        | String   | TRUE     |         |

##### Response parameters

Empty response

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/-_-BFwAGoUYN-DDvsSKQFdx7OXaPZqrEPpFDO1hu-rg"
```

##### Response example

```http
HTTP/1.1 204 No Content
```

### List CSRs for application

<ApiOperation method="get" url="/api/v1/apps/${applicationId}/credentials/csrs" />

Enumerates CSRs for an application

##### Request parameters

| Parameter     | Description                                     | Param Type | DataType                                      | Required | Default |
| ------------- | ----------------------------------------------- | ---------- | --------------------------------------------- | -------- | ------- |
| applicationId | unique key of an [Application](#application-object) | URL        | String                                        | TRUE     |         |

##### Response parameters

Array of [CSR objects](#application-csr-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/csrs"
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
        "href": "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
        "hints": {
          "allow": [
            "GET",
            "DELETE"
          ]
        }
      },
      "publish": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish",
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
        "href": "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/-_-BFwAGoUYN-DDvsSKQFdx7OXaPZqrEPpFDO1hu-rg",
        "hints": {
          "allow": [
            "GET",
            "DELETE"
          ]
        }
      },
      "publish": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/-_-BFwAGoUYN-DDvsSKQFdx7OXaPZqrEPpFDO1hu-rg/lifecycle/publish",
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

### Get CSR for application

<ApiOperation method="get" url="/api/v1/apps/${applicationId}/credentials/csrs/${csrId}" />

Gets a specific [CSR object](#application-csr-object) by `csrid`

##### Request parameters

| Parameter     | Description                                                                     | Param Type | DataType                                      | Required | Default |
| ------------- | ------------------------------------------------------------------------------- | ---------- | --------------------------------------------- | -------- | ------- |
| applicationId | unique key of an [Application](#application-object)                                 | URL        | String                                        | TRUE     |         |
| csrId         | unique key of a [CSR object](#application-csr-object)                               | URL        | String                                        | TRUE     |         |

##### Response parameters

Returns a base64 encoded CSR in DER format if the `Accept` media type is `application/pkcs10` or a CSR object if the `Accept` media type is `application/json`

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50"
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
      "href": "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "publish": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

## Application OAuth 2.0 scope consent grant operations

<ApiLifecycle access="ea" />

A scope consent grant represents an application's permission to request to include a specific Okta scope in OAuth 2.0 Bearer tokens. If the application does not have this grant, token requests that contain this Okta scope are denied.

### Grant consent to scope for application

<ApiLifecycle access="ea" />

<ApiOperation method="post" url="/api/v1/apps/${applicationId}/grants" />

Grants consent for the application to request an OAuth 2.0 Okta scope

#### Request parameters

| Parameter       | Description                                                                                              | Param Type   | DataType   | Required   | Default |
| :-------------- | :------------------------------------------------------------------------------------------------------- | :----------- | :--------- | :--------- | :------ |
| applicationId   | ID of the application                                                                                    | URL          | String     | TRUE       |         |
| issuer          | The issuer of your Org Authorization Server, your Org URL                                                | Body         | String     | TRUE       |         |
| scopeId         | The [name of the Okta scope](/docs/guides/implement-oauth-for-okta/scopes/) for which consent is granted | Body         | String     | TRUE       |         |


#### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "issuer": "${yourOktaDomain}",
    "scopeId": "okta.users.manage"
}' "https://${yourOktaDomain}/api/v1/apps/${applicationId}/grants"
```

#### Response example

```json
{
   "id":"oaghm3sh9ukdkvDmO0h6",
   "status":"ACTIVE",
   "created":"2020-02-03T21:57:49.000Z",
   "createdBy":{
      "id":"00u6eltha0nrSc47i0h7",
      "type":"User"
    },
   "lastUpdated":"2020-02-03T21:57:49.000Z",
   "issuer":"${yourOktaDomain}",
   "clientId":"${clientId}",
   "scopeId":"okta.apps.manage",
   "source":"ADMIN",
   "_embedded":{
      "scope":{
         "id":"okta.apps.manage"
      }
   },
   "_links":{
      "app":{
         "href":"https://${yourOktaDomain}/api/v1/apps/${applicationId}",
         "title":"Application Name"
      },
      "self":{
         "href":"https://${yourOktaDomain}/api/v1/apps/${applicationId}/grants/oaghm3sh9ukdkvDmO0h6",
         "hints":{
            "allow":[
               "GET",
               "DELETE"
            ]
         }
      },
      "client":{
         "href":"https://${yourOktaDomain}/oauth2/v1/clients/${clientId}",
         "title":"Application Name"
      }
   }
}
```

### List scope consent grants for application

<ApiLifecycle access="ea" />

<ApiOperation method="get" url="/api/v1/apps/${applicationId}/grants" />

Lists all scope consent grants for the application

#### Request parameters

| Parameter       | Description                                                                                    | Param Type   | DataType   | Required   | Default |
| :-------------- | :--------------------------------------------------------------------------------------------- | :----------- | :--------- | :--------- | :------ |
| applicationId   | ID of the application                                                                          | URL          | String     | TRUE       |         |
| expand          | Valid value: `scope`. If specified, scope details are included in the `_embedded` attribute.   | Query        | String     | FALSE      |         |


#### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/${applicationId}/grants"
```

#### Response example

```json
[
   {
      "id":"oag91n9ruw3dsaXzP0h6",
      "status":"ACTIVE",
      "created":"2019-02-21T16:54:00.000Z",
      "createdBy":{
         "id":"00u6eltha0nrSc47i0h7",
         "type":"User"
      },
      "lastUpdated":"2019-02-21T16:54:00.000Z",
      "issuer":"${yourOktaDomain}",
      "clientId":"${clientId}",
      "scopeId":"okta.users.read",
      "source":"ADMIN",
      "_links":{
         "app":{
            "href":"${yourOktaDomain}/api/v1/apps/${applicationId}",
            "title":"Application Name"
         },
         "self":{
            "href":"${yourOktaDomain}/api/v1/apps/${applicationId}/grants/oag91n9ruw3dsaXzP0h6",
            "hints":{
               "allow":[
                  "GET",
                  "DELETE"
               ]
            }
         },
         "client":{
            "href":"${yourOktaDomain}/oauth2/v1/clients/${clientId}",
            "title":"Application Name"
         }
      }
   },
   {
      "id":"oaghm3sh9ukdkvDmO0h6",
      "status":"ACTIVE",
      "created":"2020-02-03T21:57:49.000Z",
      "createdBy":{
         "id":"00u6eltha0nrSc47i0h7",
         "type":"User"
      },
      "lastUpdated":"2020-02-03T21:57:49.000Z",
      "issuer":"${yourOktaDomain}",
      "clientId":"${clientId}",
      "scopeId":"okta.apps.manage",
      "source":"ADMIN",
      "_links":{
         "app":{
            "href":"${yourOktaDomain}/api/v1/apps/${applicationId}",
            "title":"Application Name"
         },
         "self":{
            "href":"${yourOktaDomain}/api/v1/apps/${applicationId}/grants/oaghm3sh9ukdkvDmO0h6",
            "hints":{
               "allow":[
                  "GET",
                  "DELETE"
               ]
            }
         },
         "client":{
            "href":"${yourOktaDomain}/oauth2/v1/clients/${clientId}",
            "title":"Application Name"
         }
      }
   }
]

```

### Get scope consent grant for application

<ApiLifecycle access="ea" />

<ApiOperation method="get" url="/api/v1/apps/${applicationId}/grants/${grantId}" />

Fetches a single scope consent grant for the application

#### Request parameters

| Parameter       | Description                                                                                    | Param Type   | DataType   | Required   | Default |
| :-------------- | :--------------------------------------------------------------------------------------------- | :----------- | :--------- | :--------- | :------ |
| applicationId   | ID of the application                                                                          | URL          | String     | TRUE       |         |
| expand          | Valid value: `scope`. If specified, scope details are included in the `_embedded` attribute.   | Query        | String     | FALSE      |         |
| grantId         | ID of the scope consent grant                                                                  | URL          | String     | TRUE       |         |


#### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/${applicationId}/grants/${grantId}"
```

#### Response example

```json
{
   "id":"oaghm3sh9ukdkvDmO0h6",
   "status":"ACTIVE",
   "created":"2020-02-03T21:57:49.000Z",
   "createdBy":{
      "id":"00u6eltha0nrSc47i0h7",
      "type":"User"
    },
   "lastUpdated":"2020-02-03T21:57:49.000Z",
   "issuer":"${yourOktaDomain}",
   "clientId":"${clientId}",
   "scopeId":"okta.apps.manage",
   "source":"ADMIN",
   "_embedded":{
      "scope":{
         "id":"okta.apps.manage"
      }
   },
   "_links":{
      "app":{
         "href":"https://${yourOktaDomain}/api/v1/apps/${applicationId}",
         "title":"Application Name"
      },
      "self":{
         "href":"https://${yourOktaDomain}/api/v1/apps/${applicationId}/grants/oaghm3sh9ukdkvDmO0h6",
         "hints":{
            "allow":[
               "GET",
               "DELETE"
            ]
         }
      },
      "client":{
         "href":"https://${yourOktaDomain}/oauth2/v1/clients/${clientId}",
         "title":"Application Name"
      }
   }
}

```

### Revoke scope consent grant for application

<ApiLifecycle access="ea" />

<ApiOperation method="delete" url="/api/v1/apps/${applicationId}/grants/${grantId}" />

Revokes permission for the application to request the given scope

#### Request parameters

| Parameter       | Description                                                                                    | Param Type   | DataType   | Required   | Default |
| :-------------- | :--------------------------------------------------------------------------------------------- | :----------- | :--------- | :--------- | :------ |
| applicationId   | ID of the application                                                                          | URL          | String     | TRUE       |         |
| grantId         | ID of the scope consent grant                                                                  | URL          | String     | TRUE       |         |


#### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/${applicationId}/grants/${grantId}"
```

#### Response example

```http
HTTP/1.1 204 No Content
```

## Application OAuth 2.0 token operations

<ApiLifecycle access="ea" />

### List OAuth 2.0 tokens for application

<ApiLifecycle access="ea" />

<ApiOperation method="get" url="/api/v1/apps/${applicationId}/tokens" />

Lists all tokens for the application

#### Request parameters

| Parameter       | Description                                                                                    | Param Type   | DataType   | Required   | Default |
| :-------------- | :--------------------------------------------------------------------------------------------- | :----------- | :--------- | :--------- | :------ |
| after           | Specifies the pagination cursor for the next page of tokens                                    | Query        | String     | FALSE      |         |
| applicationId   | ID of the application                                                                          | URL          | String     | TRUE       |         |
| expand          | Valid value: `scope`. If specified, scope details are included in the `_embedded` attribute.   | Query        | String     | FALSE      |         |
| limit           | Specifies the number of results per page (maximum 200)                                         | Query        | Number     | FALSE      | 20      |

The results are [paginated](/docs/reference/api-overview/#pagination) according to the `limit` parameter.
If there are multiple pages of results, the Link header contains a `next` link that should be treated as an opaque value (follow it, don't parse it).

#### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7/tokens"
```

#### Response example

```json
[
  {
    "id": "oar579Mcp7OUsNTlo0g3",
    "status": "ACTIVE",
    "created": "2018-03-09T03:18:06.000Z",
    "lastUpdated": "2018-03-09T03:18:06.000Z",
    "expiresAt": "2018-03-16T03:18:06.000Z",
    "issuer": "https://${yourOktaDomain}/oauth2/ausain6z9zIedDCxB0h7",
    "clientId": "0oabskvc6442nkvQO0h7",
    "userId": "00u5t60iloOHN9pBi0h7",
    "scopes": [
      "offline_access",
      "car:drive"
    ],
    "_links": {
      "app": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7",
        "title": "Native"
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3"
      },
      "revoke": {
        "href": "https://${yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3",
        "hints": {
          "allow": [
            "DELETE"
          ]
        }
      },
      "client": {
        "href": "https://${yourOktaDomain}/oauth2/v1/clients/0oabskvc6442nkvQO0h7",
        "title": "Example Client App"
      },
      "user": {
        "href": "https://${yourOktaDomain}/api/v1/users/00upcgi9dyWEOeCwM0g3",
        "title": "Saml Jackson"
      },
      "authorizationServer": {
        "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7",
        "title": "Example Authorization Server"
      }
    }
  }
]
```

### Get OAuth 2.0 token for application

<ApiLifecycle access="ea" />

<ApiOperation method="get" url="/api/v1/apps/${applicationId}/tokens/${tokenId}" />

Gets a token for the specified application

#### Request parameters

| Parameter       | Description                                                                                    | Param Type   | DataType   | Required   | Default |
| :-------------- | :--------------------------------------------------------------------------------------------- | :----------- | :--------- | :--------- | :------ |
| applicationId   | ID of the application                                                                          | URL          | String     | TRUE       |         |
| tokenId         | ID of the token                                                                                | URL          | String     | TRUE       |         |

#### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3?expand=scope"
```

#### Response example

```json
{
  "id": "oar579Mcp7OUsNTlo0g3",
  "status": "ACTIVE",
  "created": "2018-03-09T03:18:06.000Z",
  "lastUpdated": "2018-03-09T03:18:06.000Z",
  "expiresAt": "2018-03-16T03:18:06.000Z",
  "issuer": "https://${yourOktaDomain}/oauth2/ausain6z9zIedDCxB0h7",
  "clientId": "0oabskvc6442nkvQO0h7",
  "userId": "00u5t60iloOHN9pBi0h7",
  "scopes": [
    "offline_access",
    "car:drive"
  ],
  "_embedded": {
    "scopes": [
      {
        "id": "scppb56cIl4GvGxy70g3",
        "name": "offline_access",
        "description": "Requests a refresh token by default, used to obtain more access tokens without re-prompting the user for authentication.",
        "_links": {
          "scope": {
            "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/scopes/scppb56cIl4GvGxy70g3",
            "title": "offline_access"
          }
        }
      },
      {
        "id": "scp142iq2J8IGRUCS0g4",
        "name": "car:drive",
        "displayName": "Drive car",
        "description": "Allows the user to drive a car.",
        "_links": {
          "scope": {
            "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7/scopes/scp142iq2J8IGRUCS0g4",
            "title": "Drive car"
          }
        }
      }
    ]
  },
  "_links": {
    "app": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7",
      "title": "Native"
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3"
    },
    "revoke": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3",
      "hints": {
        "allow": [
          "DELETE"
        ]
      }
    },
    "client": {
      "href": "https://${yourOktaDomain}/oauth2/v1/clients/0oabskvc6442nkvQO0h7",
      "title": "Example Client App"
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00upcgi9dyWEOeCwM0g3",
      "title": "Saml Jackson"
    },
    "authorizationServer": {
      "href": "https://${yourOktaDomain}/api/v1/authorizationServers/ausain6z9zIedDCxB0h7",
      "title": "Example Authorization Server"
    }
  }
}
```

### Revoke OAuth 2.0 tokens for application

<ApiLifecycle access="ea" />

<ApiOperation method="delete" url="/api/v1/apps/${applicationId}/tokens" />

Revokes all tokens for the specified application

#### Request parameters

| Parameter       | Description                                | Parameter Type   | DataType   | Required |
| :-------------- | :----------------------------------------- | :--------------- | :--------- | :------- |
| applicationId   | ID of the application                      | URL              | String     | TRUE     |

#### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7/tokens"
```

#### Response example

```http
HTTP/1.1 204 No Content
```

### Revoke OAuth 2.0 token for applications

<ApiLifecycle access="ea" />

<ApiOperation method="delete" url="/api/v1/apps/${applicationId}/tokens/${tokenId}" />

Revokes the specified token for the specified application

#### Request parameters

| Parameter       | Description                                | Parameter Type   | DataType   | Required |
| :-------------- | :----------------------------------------- | :--------------- | :--------- | :------- |
| applicationId   | ID of the application                      | URL              | String     | TRUE     |
| tokenId         | ID of the token                            | URL              | String     | TRUE     |

#### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/0oabskvc6442nkvQO0h7/tokens/oar579Mcp7OUsNTlo0g3"
```

#### Response example

```http
HTTP/1.1 204 No Content
```

## Application logo operations

<ApiLifecycle access="ea" />

### Update logo for application

<ApiLifecycle access="ea" />

<ApiOperation method="post" url="/api/v1/apps/${applicationId}/logo" />

Update the logo for an application.

> **Note:** You must have a valid login appLinks object to update the logo of an application.

##### Request parameters

| Parameter       | Description                                | Parameter Type   | DataType   | Required |
| :-------------- | :----------------------------------------- | :--------------- | :--------- | :------- |
| applicationId   | `id` of an [app](#application-object)      | URL              | String     | TRUE     |
| file            | File containing logo                       | Body             | File       | TRUE     |

The file must be in PNG, JPG, or GIF format, and less than 1 MB in size. For best results use landscape orientation, a transparent background, and a minimum size of 420px by 120px to prevent upscaling.

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
-F 'file=@/path/to/file' \
"https://${yourOktaDomain}/api/v1/apps/${applicationId}/logo"
```

##### Response example

``` http
HTTP/1.1 201 Content Created
Location: https://${yourOktaDomain}/bc/image/fileStoreRecord?id=fs01hfslJH2m3qUOe0g4
```

## Application Provisioning Connection operations

<ApiLifecycle access="ea" />

> **Note:** The only currently supported application is Okta Org2Org.

### Get default Provisioning Connection for application

<ApiLifecycle access="ea" />

<ApiOperation method="get" url="/api/v1/apps/${applicationId}/connections/default" />

Fetches the default Provisioning Connection for an application.

##### Request parameters

| Parameter       | Description                                | Parameter Type   | DataType   | Required |
| :-------------- | :----------------------------------------- | :--------------- | :--------- | :------- |
| applicationId   | `id` of an [app](#application-object)      | URL              | String     | TRUE     |

##### Response parameters

The fetched [Provisioning Connection](#provisioning-connection-object).

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/${applicationId}/connections/default"
```

##### Response example

```json
{
    "authScheme": "TOKEN",
    "status": "ENABLED",
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/apps/${applicationId}/connections/default",
            "hints": {
                "allow": [
                    "POST",
                    "GET"
                ]
            }
        },
        "deactivate": {
            "href": "https://${yourOktaDomain}/api/v1/apps/${applicationId}/connections/default/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Set default Provisioning Connection for application

<ApiLifecycle access="ea" />

<ApiOperation method="post" url="/api/v1/apps/${applicationId}/connections/default" />

Sets the default Provisioning Connection for an application.

##### Request parameters

| Parameter       | Description                                | Parameter Type   | DataType   | Required | Default |
| :-------------- | :----------------------------------------- | :--------------- | :--------- | :------- | :-------|
| activate        | Activate the provisioning connection       | Query            | Boolean    | FALSE    | FALSE   |
| applicationId   | `id` of an [app](#application-object)      | URL              | String     | TRUE     |         |
| profile   | Provisioning profile     | Body              | [Provisioning Connection Profile](#provisioning-connection-profile-object)   | TRUE     |         |

##### Response parameters

The new default [Provisioning Connection](#provisioning-connection-object).

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "profile": {
        "authScheme": "TOKEN",
        "token": "TEST"
    }
}' "https://${yourOktaDomain}/api/v1/apps/${applicationId}/connections/default?activate=TRUE"
```

##### Response example

```json
{
    "authScheme": "TOKEN",
    "status": "ENABLED",
    "_links": {
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/apps/${applicationId}/connections/default",
            "hints": {
                "allow": [
                    "POST",
                    "GET"
                ]
            }
        },
        "deactivate": {
            "href": "https://${yourOktaDomain}/api/v1/apps/${applicationId}/connections/default/lifecycle/deactivate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Activate default Provisioning Connection for application

<ApiLifecycle access="ea" />

<ApiOperation method="post" url="/api/v1/apps/${applicationId}/connections/default/lifecycle/activate" />

Activates the default Provisioning Connection for an application.

##### Request parameters

| Parameter       | Description                                | Parameter Type   | DataType   | Required |
| :-------------- | :----------------------------------------- | :--------------- | :--------- | :------- |
| applicationId   | `id` of an [app](#application-object)      | URL              | String     | TRUE     |

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/${applicationId}/connections/default/lifecycle/activate"
```

##### Response example

``` http
HTTP/1.1 204 No Content
```

### Deactivate default Provisioning Connection for application

<ApiLifecycle access="ea" />

<ApiOperation method="post" url="/api/v1/apps/${applicationId}/connections/lifecycle/deactivate" />

Deactivates the default Provisioning Connection for an application.

##### Request parameters

| Parameter       | Description                                | Parameter Type   | DataType   | Required |
| :-------------- | :----------------------------------------- | :--------------- | :--------- | :------- |
| applicationId   | `id` of an [app](#application-object)      | URL              | String     | TRUE     |

##### Request example

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/${applicationId}/connections/default/lifecycle/deactivate"
```

##### Response example

``` http
HTTP/1.1 204 No Content
```

## Application Feature operations

<ApiLifecycle access="ea" />

> **Note:** The only currently supported application is Okta Org2Org.

### List Features for application

<ApiLifecycle access="ea" />

<ApiOperation method="get" url="/api/v1/apps/${applicationId}/features" />

Fetches the Feature objects for an application.

> **Note:** Provisioning must be enabled for the application. To activate provisioning, see [Provisioning Connections](#set-default-provisioning-connection-for-application). The only application Feature currently supported is `USER_PROVISIONING`.


##### Request parameters

| Parameter       | Description                                | Parameter Type   | DataType   | Required |
| :-------------- | :----------------------------------------- | :--------------- | :--------- | :------- |
| applicationId   | `id` of an [app](#application-object)      | URL              | String     | TRUE     |

##### Response parameters

An array of [Application Features](#application-feature-object).

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/${applicationId}/features"
```

##### Response example

```json
[
    {
        "name": "USER_PROVISIONING",
        "status": "ENABLED",
        "description": "User provisioning settings from Okta to a downstream application",
        "capabilities": {
            "create": {
                "lifecycleCreate": {
                    "status": "DISABLED"
                }
            },
            "update": {
                "profile": {
                    "status": "DISABLED"
                },
                "lifecycleDeactivate": {
                    "status": "DISABLED"
                },
                "password": {
                    "status": "DISABLED",
                    "seed": "RANDOM",
                    "change": "KEEP_EXISTING"
                }
            }
        },
        "_links": {
            "self": {
                "href": "http://${yourOktaDomain}/api/v1/apps/${applicationId}/features/USER_PROVISIONING",
                "hints": {
                    "allow": [
                        "GET",
                        "PUT"
                    ]
                }
            }
        }
    }
]
```

### Get Feature for application

<ApiLifecycle access="ea" />

<ApiOperation method="get" url="/api/v1/apps/${applicationId}/features/${name}" />

Fetches a Feature object for an application.

##### Request parameters

| Parameter       | Description                                | Parameter Type   | DataType   | Required |
| :-------------- | :----------------------------------------- | :--------------- | :--------- | :------- |
| applicationId   | `id` of an [app](#application-object)      | URL              | String     | TRUE     |

##### Response parameters

An [Application Feature](#application-feature).

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/apps/${applicationId}/features/${name}"
```

##### Response example

```json
{
    "name": "USER_PROVISIONING",
    "status": "ENABLED",
    "description": "User provisioning settings from Okta to a downstream application",
    "capabilities": {
        "create": {
            "lifecycleCreate": {
                "status": "DISABLED"
            }
        },
        "update": {
            "profile": {
                "status": "DISABLED"
            },
            "lifecycleDeactivate": {
                "status": "DISABLED"
            },
            "password": {
                "status": "DISABLED",
                "seed": "RANDOM",
                "change": "KEEP_EXISTING"
            }
        }
    },
    "_links": {
        "self": {
            "href": "http://${yourOktaDomain}/api/v1/apps/${applicationId}/features/USER_PROVISIONING",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        }
    }
}
```

### Update Feature for application

<ApiLifecycle access="ea" />

<ApiOperation method="put" url="/api/v1/apps/${applicationId}/features/${featureName}" />

Updates a Feature object for an application.

##### Request parameters

| Parameter       | Description                                | Parameter Type   | DataType   | Required |
| :-------------- | :----------------------------------------- | :--------------- | :--------- | :------- |
| applicationId   | `id` of an [app](#application-object)      | URL              | String     | TRUE     |
| capabilities   | Capabilites of the feature                  | Body              | [Capabilites Object](#capabilties-object) | TRUE     |
| name   | Name of the feature                      | URL              | String     | TRUE     |

##### Reponse Parameters

Updated [Application Feature](#application-feature-object).

##### Request Example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "create": {
        "lifecycleCreate": {
            "status": "ENABLED"
        }
    },
    "update": {
        "lifecycleDeactivate": {
            "status": "ENABLED"
        },
        "profile":{
            "status": "ENABLED"
        },
        "password":{
            "status": "ENABLED",
            "seed": "RANDOM",
            "change": "CYCLE"
        }
    }
}' "https://${yourOktaDomain}/api/v1/apps/${applicationId}/features/${name}"
```

This endpoint supports partial updates.

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "create": {
        "lifecycleCreate": {
            "status": "DISABLED"
        }
    }
}' "https://${yourOktaDomain}/api/v1/apps/${applicationId}/features/${name}"
```

##### Response example

```json
{
    "name": "USER_PROVISIONING",
    "status": "ENABLED",
    "description": "User provisioning settings from Okta to a downstream application",
    "capabilities": {
        "create": {
            "lifecycleCreate": {
                "status": "DISABLED"
            }
        },
        "update": {
            "profile": {
                "status": "DISABLED"
            },
            "lifecycleDeactivate": {
                "status": "DISABLED"
            },
            "password": {
                "status": "DISABLED",
                "seed": "RANDOM",
                "change": "KEEP_EXISTING"
            }
        }
    },
    "_links": {
        "self": {
            "href": "http://${yourOktaDomain}/api/v1/apps/${applicationId}/features/USER_PROVISIONING",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        }
    }
}
```

## Models

* [Idp-Initiated Login object](#idp-initiated-login-object)
* [Application object](#application-object)
* [Application User object](#application-user-object)
* [Appliction Group object](#application-group-object)

### Idp-Initiated Login object

The Idp-Initiated Login object is used to configure what, if any, Idp-Initiated Login flows that an OAuth Client supports.

| Property      | Description                                           | DataType                   | Nullable |
| ------------- | ----------------------------------------------------- | -------------------------- | -------- | 
| mode          | What mode to use for Idp-Initiated Login              | `DISABLED`, `SPEC`, `OKTA` | FALSE    |
| default_scope | What scopes to use for the request when mode = `OKTA` | List of String             | TRUE     |

* When `mode` is `DISABLED`, the client doesn't support Idp-Initiated Login
* When `mode` is `SPEC`, the client is redirected to the Relying Party's `initiate_login_uri` as defined in the [OpenID Connect spec](https://openid.net/specs/openid-connect-core-1_0.html#ThirdPartyInitiatedLogin).
* When `mode` is `OKTA`, the tokens are directly sent to the Relying Party. This corresponds the **Okta Simplified** option in the Admin Console.
* The client must have an `initiate_login_uri` registered to configure any `mode` besides `DISABLED`.

#### Request example

> **Note:** An [Application](#application-object)'s `signOnMode` must be set to `OPENID_CONNECT`, the `name` field must be `oidc_client`, and the `label` field must be defined.

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "name": "oidc_client",
    "label": "Sample Client",
    "signOnMode": "OPENID_CONNECT",
    "credentials": {
      "oauthClient": {
      	"autoKeyRotation": true,
        "token_endpoint_auth_method": "client_secret_post"
      }
    },
    "settings": {
      "oauthClient": {
        "client_uri": "http://localhost:8080",
        "logo_uri": "http://developer.okta.com/assets/images/logo-new.png",
        "redirect_uris": [
          "https://example.com/oauth2/callback",
          "myapp://callback"
        ],
        "wildcard_redirect": "DISABLED",
        "post_logout_redirect_uris": [
          "https://example.com/oauth2/postLogoutRedirectUri"
        ],
        "response_types": [
          "token",
          "id_token",
          "code"
        ],
        "grant_types": [
          "implicit",
          "authorization_code"
        ],
        "application_type": "native",
        "tos_uri":"https://example.com/client/tos",
        "policy_uri":"https://example.com/client/policy",
        "idp_initiated_login": {
          "mode": "DISABLED"
        }
    }
  }
}' "https://${yourOktaDomain}/api/v1/apps"
```

#### Response example

```json
{
    "id": "0oap6nz61rKdsoyOY0h7",
    "name": "oidc_client",
    "label": "Sample Client",
    "status": "ACTIVE",
    "lastUpdated": "2020-01-09T16:59:15.000Z",
    "created": "2020-01-09T16:59:15.000Z",
    "accessibility": {
        "selfService": false,
        "errorRedirectUrl": null,
        "loginRedirectUrl": null
    },
    "visibility": {
        "autoSubmitToolbar": false,
        "hide": {
            "iOS": true,
            "web": true
        },
        "appLinks": {
            "oidc_client_link": true
        }
    },
    "features": [],
    "signOnMode": "OPENID_CONNECT",
    "credentials": {
        "userNameTemplate": {
            "template": "${source.login}",
            "type": "BUILT_IN"
        },
        "signing": {
            "kid": "5gbe0HpzAYj2rsWSLxx1fYHdh-SzWqyKqwmfJ6qDk5g"
        },
        "oauthClient": {
            "autoKeyRotation": true,
            "client_id": "0oap6nz61rKdsoyOY0h7",
            "client_secret": "D0HxBn1FtTXeYC4cSBwWL_sPMztMT2t6Ei9n1QjO",
            "token_endpoint_auth_method": "client_secret_post"
        }
    },
    "settings": {
        "app": {},
        "notifications": {
            "vpn": {
                "network": {
                    "connection": "DISABLED"
                },
                "message": null,
                "helpUrl": null
            }
        },
        "oauthClient": {
            "client_uri": "http://localhost:8080",
            "logo_uri": "http://developer.okta.com/assets/images/logo-new.png",
            "redirect_uris": [
                "https://example.com/oauth2/callback",
                "myapp://callback"
            ],
            "wildcard_redirect": "DISABLED",	    
            "post_logout_redirect_uris": [
                "https://example.com/oauth2/postLogoutRedirectUri"
            ],
            "response_types": [
                "token",
                "id_token",
                "code"
            ],
            "grant_types": [
                "implicit",
                "authorization_code"
            ],
            "application_type": "native",
            "tos_uri": "https://example.com/client/tos",
            "policy_uri": "https://example.com/client/policy",
            "idp_initiated_login": {
              "mode": "DISABLED"
            },"
            "consent_method": "TRUSTED",
            "issuer_mode": "CUSTOM_URL"
        }
    },
    "_links": {
        "appLinks": [
            {
                "name": "oidc_client_link",
                "href": "https://${yourOktaDomain}/home/oidc_client/0oap6nz61rKdsoyOY0h7/aln5z7uhkbM6y7bMy0g7",
                "type": "text/html"
            }
        ],
        "groups": {
            "href": "https://${yourOktaDomain}/api/v1/apps/0oap6nz61rKdsoyOY0h7/groups"
        },
        "logo": [
            {
                "name": "medium",
                "href": "https://example.com/assets/img/logos/default.6770228fb0dab49a1695ef440a5279bb.png",
                "type": "image/png"
            }
        ],
        "users": {
            "href": "https://${yourOktaDomain}/api/v1/apps/0oap6nz61rKdsoyOY0h7/users"
        },
        "deactivate": {
            "href": "https://${yourOktaDomain}/api/v1/apps/0oap6nz61rKdsoyOY0h7/lifecycle/deactivate"
        }
    }
}
```

#### Request example

The following example shows how to create an OAuth 2.0 client application with `private_key_jwt` defined as the value for the `token_endpoint_auth_method` property.

```bash
curl -X POST \
  -H "Accept: application/json" \
  -H "Authorization: key" \
  -H "Content-Type: application/json" \
  -H "cache-control: no-cache" \
  -d '{
    "name": "oidc_client",
    "label": "A Sample Client",
    "signOnMode": "OPENID_CONNECT",
    "credentials": {
        "oauthClient": {
            "token_endpoint_auth_method": "private_key_jwt"
        }
    },
    "settings": {
        "oauthClient": {
            "redirect_uris": [
                "https://example.com"
            ],
            "wildcard_redirect": "DISABLED",
            "response_types": [
                "code"
            ],
            "grant_types": [
                "authorization_code"
            ],
            "application_type": "native",
            "jwks": {
                "keys": [
                    {
                        "kty": "RSA",
                        "kid": "SIGNING_KEY",
                        "e":"AQAB",
                        "n":"MIIBIzANBgkqhkiG9w0BAQEFAAOCARAAMIIBCwKCAQIAnFo/4e91na8x/BsPkNS5QkwankewxJ1uZU6p827W/gkRcNHtNi/cE644W5OVdB4UaXV6koT+TsC1prhUEhRR3g5ggE0B/lwYqBaLq/Ejy19Crc4XYU3Aah67Y6HiHWcHGZ+BbpebtTixJv/UYW/Gw+k8M+zj4O001mOeBPpwlEiZZLIo33m/Xkfn28jaCFqTQBJHr67IQh4zEUFs4e5D5D6UE8ee93yeSUJyhbifeIgYh3tS/+ZW4Uo1KLIc0rcLRrnEMsS3aOQbrv/SEKij+Syx4KXI0Gi2xMdXctnFOVT6NM6/EkLxFp2POEdv9SNBtTvXcxIGRwK51W4Jdgh/xZcCAwEAAQ=="
                    }
                ]
            }
        }
    }
}' "https://${yourOktaDomain}/api/v1/apps"
```

#### Response example

```json
{
    "id": "0oaktvoa8bGDHDmby0h7",
    "name": "oidc_client",
    "label": "A Sample Client",
    "status": "ACTIVE",
    "lastUpdated": "2019-05-13T22:16:50.000Z",
    "created": "2019-05-13T22:16:50.000Z",
    "accessibility": {
        "selfService": false,
        "errorRedirectUrl": null,
        "loginRedirectUrl": null
    },
    "visibility": {
        "autoSubmitToolbar": false,
        "hide": {
            "iOS": true,
            "web": true
        },
        "appLinks": {
            "oidc_client_link": true
        }
    },
    "features": [],
    "signOnMode": "OPENID_CONNECT",
    "credentials": {
        "userNameTemplate": {
            "template": "${source.login}",
            "type": "BUILT_IN"
        },
        "signing": {
            "kid": "5gbe0HpzAYj4rsWSLxx1fYHdh-SzWqyKqwmfJ6qDk5g"
        },
        "oauthClient": {
            "autoKeyRotation": true,
            "client_id": "0oaktvoa8bGDHEmby0h7",
            "token_endpoint_auth_method": "private_key_jwt"
        }
    },
    "settings": {
        "app": {},
        "notifications": {
            "vpn": {
                "network": {
                    "connection": "DISABLED"
                },
                "message": null,
                "helpUrl": null
            }
        },
        "oauthClient": {
            "jwks": {
                "keys": [
                    {
                        "kty": "RSA",
                        "kid": "SIGNING_KEY",
                        "use": null,
                        "e": "AQAB",
                        "n": "MIIBIzANBgkqhkiG9w0BAQEFAAOCARAAMIIBCwKCAQIAnFo/4e91na8x/BsPkNS5QkwankewxJ1uZU6p827W/gkRcNHtNi/cE644W5OVdB4UaXV6koT+TsC1prhUEhRR3g5ggE0B/lwYqBaLq/Ejy19Crc4XYU3Aah67Y6HiHWcHGZ+BbpebtTixJv/UYW/Gw+k8M+zj4O001mOeBPpwlEiZZLIo33m/Xkfn28jaCFqTQBJHr67IQh4zEUFs4e5D5D6UE8ee93yeSUJyhbifeIgYh3tS/+ZW4Uo1KLIc0rcLRrnEMsS3aOQbrv/SEKij+Syx4KXI0Gi2xMdXctnFOVT6NM6/EkLxFp2POEdv9SNBtTvXcxIGRwK51W4Jdgh/xZcCAwEAAQ=="
                    }
                ]
            },
            "client_uri": null,
            "logo_uri": null,
            "redirect_uris": [
                "https://example.com"
            ],
            "wildcard_redirect": "DISABLED",
            "response_types": [
                "code"
            ],
            "grant_types": [
                "authorization_code"
            ],
            "application_type": "native",
            "consent_method": "TRUSTED",
            "issuer_mode": "CUSTOM_URL",
	    "idp_initiated_login": {
              "mode": "DISABLED"
            }
        }
    },
    "_links": {
        "appLinks": [
            {
                "name": "oidc_client_link",
                "href": "https://${yourOktaDomain}/home/oidc_client/0oaktvoa8bGDHDmby0h7/aln5z7uhkbM6y7bMy0g7",
                "type": "text/html"
            }
        ],
        "groups": {
            "href": "https://${yourOktaDomain}/api/v1/apps/0oaktvoa8bGDHDmby0h7/groups"
        },
        "logo": [
            {
                "name": "medium",
                "href": "https://${yourOktaDomain}/assets/img/logos/default.6770228fb0dab49a1695ef440a5279bb.png",
                "type": "image/png"
            }
        ],
        "users": {
            "href": "https://${yourOktaDomain}/api/v1/apps/0oaktvoa8bGDHDmby0h7/users"
        },
        "deactivate": {
            "href": "https://${yourOktaDomain}/api/v1/apps/0oaktvoa8bGDHDmby0h7/lifecycle/deactivate"
        }
    }
}
```

### Application object

#### Example

```json
{
  "id": "0oaud6YvvS7AghVmH0g3",
  "name": "testorg_testsamlapp_1",
  "label": "Test SAML App",
  "status": "ACTIVE",
  "lastUpdated": "2016-06-29T16:13:47.000Z",
  "created": "2016-06-29T16:13:47.000Z",
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null,
    "loginRedirectUrl": null
  },
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "testorgone_testsamlapp_1_link": true
    }
  },
  "features": [],
  "request_object_signing_alg":"RS256",
  "signOnMode": "SAML_2_0",
  "credentials": {
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    },
    "signing": {}
  },
  "settings": {
    "app": {},
    "notifications": {
      "vpn": {
        "network": {
          "connection": "ANYWHERE"
        },
        "message": "Help message text.",
        "helpUrl": "http://www.help-site.example.com/"
      }
    },
    "signOn": {
      "defaultRelayState": "",
      "ssoAcsUrl": "https://www.example.com/sso/saml",
      "idpIssuer": "http://www.okta.com/${org.externalKey}",
      "audience": "https://www.example.com/",
      "recipient": "https://www.example.com/sso/saml",
      "destination": "https://www.example.com/sso/saml",
      "subjectNameIdTemplate": "${user.userName}",
      "subjectNameIdFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
      "responseSigned": true,
      "assertionSigned": true,
      "signatureAlgorithm": "RSA_SHA256",
      "digestAlgorithm": "SHA256",
      "honorForceAuthn": true,
      "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport",
      "spIssuer": null,
      "requestCompressed": false,
      "allowMultipleAcsEndpoints": false,
      "acsEndpoints": [],
      "attributeStatements": []
    }
  },
  "_links": {
    "logo": [
      {
        "name": "medium",
        "href": "http://testorgone.okta.com/assets/img/logos/default.6770228fb0dab49a1695ef440a5279bb.png",
        "type": "image/png"
      }
    ],
    "appLinks": [
      {
        "name": "testorgone_testsamlapp_1_link",
        "href": "http://testorgone.okta.com/home/testorgone_testsamlapp_1/0oaud6YvvS7AghVmH0g3/alnun3sSjdvR9IYuy0g3",
        "type": "text/html"
      }
    ],
    "help": {
      "href": "http://testorgone-admin.okta.com:/app/testorgone_testsamlapp_1/0oaud6YvvS7AghVmH0g3/setup/help/SAML_2_0/instructions",
      "type": "text/html"
    },
    "users": {
      "href": "http://testorgone.okta.com/api/v1/apps/0oaud6YvvS7AghVmH0g3/users"
    },
    "deactivate": {
      "href": "http://testorgone.okta.com:/api/v1/apps/0oaud6YvvS7AghVmH0g3/lifecycle/deactivate"
    },
    "groups": {
      "href": "http://testorgone.okta.com/api/v1/apps/0oaud6YvvS7AghVmH0g3/groups"
    },
    "metadata": {
      "href": "http://testorgone.okta.com/api/v1/apps/0oaud6YvvS7AghVmH0g3/sso/saml/metadata",
      "type": "application/xml"
    }
  }
}
```

#### Application properties

Applications have the following properties:

| Property           | Description                                    | DataType                                                             | Nullable     | Unique     | Readonly     | MinLength     | MaxLength   |
| :----------------- | :--------------------------------------------- | :------------------------------------------------------------------- | :----------- | :--------- | :----------- | :------------ | :---------- |
| _embedded          | Embedded resources related to the app          | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)       | TRUE         | FALSE      | TRUE         |               |             |
| _links             | Discoverable resources related to the app      | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)       | TRUE         | FALSE      | TRUE         |               |             |
| accessibility      | Access settings for app                        | [Accessibility object](#accessibility-object)                        | TRUE         | FALSE      | FALSE        |               |             |
| created            | Timestamp when app was created                 | Date                                                                 | FALSE        | FALSE      | TRUE         |               |             |
| credentials        | Credentials for the specified `signOnMode`     | [Application Credentials object](#application-credentials-object)    | TRUE         | FALSE      | FALSE        |               |             |
| features           | Enabled app features                           | [Features](#features)                                                | TRUE         | FALSE      | FALSE        |               |             |
| id                 | Unique key for app                             | String                                                               | FALSE        | TRUE       | TRUE         |               |             |
| label              | Unique user-defined display name for app       | String                                                               | FALSE        | TRUE       | FALSE        | 1             | 100         |
| lastUpdated        | Timestamp when app was last updated            | Date                                                                 | FALSE        | FALSE      | TRUE         |               |             |
| name               | Unique key for app definition                  | String ([App Names](#app-names))                | FALSE        | TRUE       | TRUE         | 1             | 255         |
| profile            | Valid JSON schema for specifying properties    | [JSON](#profile-object)                                              | TRUE         | FALSE      | FALSE        |               |             |
| request_object_signing_alg| The type of JSON Web Key Set (JWKS) algorithm that must be used for signing request objects | `HS256`, `HS384`, `HS512`, `RS256`, `RS384`, `RS512`, `ES256`, `ES384`, `ES512`  | TRUE      | FALSE     | FALSE      |
| settings           | Settings for app                               | Object ([App Settings](#app-settings))                | TRUE         | FALSE      | FALSE        |               |             |
| signOnMode         | Authentication mode of app                     | [SignOn Mode](#sign-on-modes)                                         | FALSE        | FALSE      | FALSE        |               |             |
| status             | Status of app                                  | `ACTIVE` or `INACTIVE`                                               | FALSE        | FALSE      | TRUE         |               |             |
| visibility         | Visibility settings for app                    | [Visibility object](#visibility-object)                              | TRUE         | FALSE      | FALSE        |               |             |

Property details

 * `id`, `created`, `lastUpdated`, `status`, `_links`, and `_embedded` are only available after an app is created.
 * `profile` is only available for OAuth 2.0 client apps. See [Profile object](#profile-object).
 * When you specify a value for the `request_object_signing_alg` property, all request objects from the client are rejected if not signed with the specified algorithm. The algorithm must be used when the request object is passed by value (using the request parameter). If a value for `request_object_signing_alg` isn't specified, the default is any algorithm that is supported by both the client and the server.

##### App names

The Okta Integration Network (OIN) is a catalog of applications that can be added to your Okta organization. Each application has a unique name (key) that you must specify.

The catalog is currently not exposed via an API. While additional apps may be added via the API, only the following template applications are documented:

| Name                | Example                                                                       |
| ------------------- | ----------------------------------------------------------------------------  |
| Custom SAML 2.0     | [Add custom SAML 2.0 application](#add-custom-saml-application)               |
| Custom SWA          | [Add custom SWA application](#add-custom-swa-application)                     |
| bookmark            | [Add Bookmark application](#add-bookmark-application)                         |
| oidc_client         | [Add OAuth 2.0 client application](#add-oauth-2-0-client-application)         |
| okta_org2org        | [Add Okta Org2Org application](#add-okta-org2org-application)                 |
| tempalte_sps        | [Add SWA application (no plugin)](#add-swa-application-no-plugin)             |
| template_basic_auth | [Add Basic Authentication application](#add-basic-authentication-application) |
| template_swa        | [Add plugin SWA application](#add-plugin-swa-application)                     |
| template_swa3field  | [Add plugin SWA (3 field) application](#add-plugin-swa-3-field-application)   |
| template_wsfed      | [Add WS-Federation application](#add-ws-federation-application)               |

The current workaround is to manually configure the desired application via the administrator UI in a preview (sandbox) organization and view the application via [Get Application](#get-application).

##### App settings

Each application has a schema that defines the required and optional settings for the application. When adding an application, you must specify the required settings.

Currently, the catalog isn't exposed via an API. The current solution is to manually configure the desired application using the Okta Admin Dashboard and a preview (sandbox) Okta org. You can then view the application details using the [Get Application](#get-application) API.

###### Notes object

<ApiLifecycle access="ea" />

An additional `notes` object can be passed within the `settings` object. The `notes` object contains the following:

| Property  | Description                                        | DataType | Nullable | Default | MinLength | MaxLength | Validation |
| --------- | -------------------------------------------------- | -------- | -------- | ------- | --------- | --------- | ---------- |
| admin       | Application notes for admins | String  | TRUE    | NULL   |           |           |            |
| enduser       | Application notes for end users                        | String  | TRUE    | NULL   |           |

> **Note:** You can't currently manage app provisioning settings via the API. Use the administrator UI.

##### Features

Applications may support optional provisioning features on a per-app basis.

> **Note:** You can't currently configure provisioning features via the API. Use the administrator UI.

The list of provisioning features an app may support are:

| App Feature            | Name in the Administrator UI | Description                                                                                                                                                                                                                                   |
| ---------------------- | ----------------------       | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GROUP_PUSH             | Group Push                   | Creates or links a group in the app when a mapping is defined for a group in Okta. Okta is the source for group memberships and all group members in Okta who are also assigned to the app are synced as group members to the app.       |
| IMPORT_NEW_USERS       | User Import                  | Creates or links a user in Okta to a user from the application                                                                                                                                                                              |
| IMPORT_PROFILE_UPDATES | User Import                  | Updates a linked user's app profile during manual or scheduled imports                                                                                                                                                                      |
| IMPORT_USER_SCHEMA     |                              | Discovers the profile schema for a user from the app automatically                                                                                                                                                                            |
| PROFILE_MASTERING      | Profile Master               | Designates the app as the identity lifecycle and profile attribute authority for linked users. The user's profile in Okta is *read-only*                                                                                                     |
| PUSH_NEW_USERS         | Create Users                 | Creates or links a user account in the application when assigning the app to a user in Okta                                                                                                                                                 |
| PUSH_PASSWORD_UPDATES  | Sync Okta Password           | Updates the user's app password when their password changes in Okta                                                                                                                                                                          |
| PUSH_PROFILE_UPDATES   | Update User Properties       | Updates a user's profile in the app when the user's profile changes in Okta (Profile Master)                                                                                                                                                |
| PUSH_USER_DEACTIVATION | Deactivate Users             | Deactivates a user's account in the app when unassigned from the app in Okta or deactivated                                                                                                                                                 |
| REACTIVATE_USERS       | Deactivate Users             | Reactivates an existing inactive user when provisioning a user to the app                                                                                                                                                                   |

##### Sign-on modes

Applications support a limited set of sign-on modes that specify how a user is authenticated to the app.

The list of possible modes an app may support are:

| Mode                  | Description                                                            |
| --------------------- | ---------------------------------------------------------------------- |
| AUTO_LOGIN            | Secure Web Authentication (SWA)                                        |
| BASIC_AUTH            | HTTP Basic Authentication with Okta Browser Plugin                     |
| BOOKMARK              | Just a bookmark (no-authentication)                                    |
| BROWSER_PLUGIN        | Secure Web Authentication (SWA) with Okta Browser Plugin               |
| Custom                | App-Specific SignOn Mode                                               |
| OPENID_CONNECT        | Federated Authentication with OpenID Connect                           |
| SAML_1_1              | Federated Authentication with SAML 1.1 WebSSO                          |
| SAML_2_0              | Federated Authentication with SAML 2.0 WebSSO                          |
| SECURE_PASSWORD_STORE | Secure Web Authentication (SWA) with POST (plugin not required)        |
| WS_FEDERATION         | Federated Authentication with WS-Federation Passive Requestor Profile  |

This setting modifies the same settings as the **Sign On** tab when editing an application in your Okta Administration app.

### Accessibility object

Specifies access settings for the application

| Property         | Description                                | DataType | Nullable | Default | MinLength | MaxLength | Validation |
| ---------------- | ------------------------------------------ | -------- | -------- | ------- | --------- | --------- | ---------- |
| errorRedirectUrl | Custom error page for this application     | String   | TRUE     | NULL    |           |           |            |
| loginRedirectUrl | Custom login page for this application     | String   | TRUE     | NULL    |           |           |            |
| selfService      | Enable self-service application assignment | Boolean  | TRUE     | FALSE   |           |           |            |

> **Note:** The `errorRedirectUrl` and `loginRedirectUrl` default to the organization default pages when empty.

```json
{
  "accessibility": {
    "selfService": false,
    "errorRedirectUrl": null
  }
}
```

### Visibility object

Specifies visibility settings for the application

| Property          | Description                                        | DataType                            | Nullable | Default | MinLength | MaxLength | Validation |
| ----------------- | -------------------------------------------------- | ----------------------------------- | -------- | ------- | --------- | --------- | ---------- |
| appLinks          | Displays specific appLinks for the app             | [AppLinks object](#applinks-object) | FALSE    |         |           |           |            |
| <ApiLifecycle access="ea" /> autoLaunch  |  Automatically signs in to the app when user signs into Okta.            | Boolean | FALSE   | FALSE    |           |           |            |
| autoSubmitToolbar | Automatically sign in when user lands on the sign-in page | Boolean                             | FALSE    | FALSE   |           |           |            |
| hide              | Hides this app for specific end-user apps          | [Hide object](#hide-object)         | FALSE    | FALSE   |           |           |            |

```json
{
  "visibility": {
    "autoSubmitToolbar": false,
    "hide": {
      "iOS": false,
      "web": false
    },
    "appLinks": {
      "login": true
    }
  }
}
```

#### Hide object

| Property  | Description                                        | DataType | Nullable | Default | MinLength | MaxLength | Validation |
| --------- | -------------------------------------------------- | -------- | -------- | ------- | --------- | --------- | ---------- |
| iOS       | Okta Mobile for iOS or Android (pre-dates Android) | Boolean  | FALSE    | FALSE   |           |           |            |
| web       | Okta Web Browser Home Page                         | Boolean  | FALSE    | FALSE   |           |           |            |

#### AppLinks object

Each application defines one or more appLinks that can be published. You can disable AppLinks by setting the link value to `false`.

### Application Credentials object

Specifies credentials and scheme for the application's `signOnMode`

> **Note:** To update the app, you can provide just the [Signing Credential object](#signing-credential-object) instead of the entire Application Credential object.

| Property         | Description                                                                                                    | DataType                                                  | Nullable | Default         | MinLength | MaxLength | Validation |
| ---------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | -------- | --------------- | --------- | --------- | ---------- |
| oauthClient      | Credential for OAuth 2.0 client                                                                                | [OAuth Credential object](#oauth-credential-object)       | FALSE    |                 |           |           |            |
| password         | Shared password for app                                                                                        | [Password object](#password-object)                       | TRUE     |                 |           |           |            |
| scheme           | Determines how credentials are managed for the `signOnMode`                                                    | [Authentication Scheme](#authentication-schemes)          | TRUE     |                 |           |           |            |
| signing          | Signing credential for the `signOnMode`                                                                        | [Signing Credential object](#signing-credential-object)   | FALSE    |                 |           |           |            |
| userName         | Shared username for app                                                                                        | String                                                    | TRUE     |                 | 1         | 100       |            |
| userNameTemplate | Template used to generate a user's username when the application is assigned via a group or directly to a user | [UserName Template object](#username-template-object)     | TRUE     | *Okta UserName* |           |           |            |

```json
{
  "credentials": {
    "scheme": "SHARED_USERNAME_AND_PASSWORD",
    "userNameTemplate": {
      "template": "${source.login}",
      "type": "BUILT_IN"
    },
    "signing": {
      "kid": "SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4"
    },
    "userName": "test",
    "password": {}
  }
}
```

#### Authentication schemes

Applications that are configured with `BASIC_AUTH`, `BROWSER_PLUGIN`, or `SECURE_PASSWORD_STORE` have credentials vaulted by Okta and can be configured with the following schemes:

| Scheme                       | Description                                                               | Shared UserName | Shared Password | App UserName     | App Password            |
| ---------------------------- | ------------------------------------------------------------------------- | --------------- | --------------- | ---------------- | ----------------------- |
| ADMIN_SETS_CREDENTIALS       | Administrator sets username and password                                  |                 |                 | Admin: `R/W`     | Admin: `W`              |
| EDIT_PASSWORD_ONLY           | Administrator sets username, user sets password                           |                 |                 | Admin:`R/W`      | Admin/User:`W`          |
| EDIT_USERNAME_AND_PASSWORD   | User sets username and password                                           |                 |                 | Admin/User:`R/W` | Admin/User:`W`          |
| EXTERNAL_PASSWORD_SYNC       | Administrator sets username, password is the same as user's Okta password |                 |                 | Admin:`R/W`      | *Current User Password* |
| SHARED_USERNAME_AND_PASSWORD | Users share a single username and password set by administrator           | Admin:`R/W`     | Admin:`W`       |                  |                         |

> **Note:** `BOOKMARK`, `SAML_2_0`, and `WS_FEDERATION` signOnModes don't support an authentication scheme as they use a federated SSO protocol. You should omit the `scheme` property for apps with these signOnModes.

#### Username Template object

Specifies the template used to generate a user's username when the application is assigned via a group or directly to a user

| Property   | Description                             | DataType                         | Nullable | Default           | MinLength | MaxLength  | Validation |
| ---------- | --------------------------------------- | -------------------------------- | -------- | ----------------- | --------- | ---------- | ---------- |
| template   | mapping expression for username         | String                           | TRUE     | `${source.login}` |           | 1024       |            |
| type       | type of mapping expression              | `NONE`,  `BUILT_IN`, or `CUSTOM` | FALSE    | BUILT_IN          |           |            |            |
| userSuffix | suffix for built-in mapping expressions | String                           | TRUE     | NULL              |           |            |            |

> **Note:** You must use the `CUSTOM` type when defining your own expression that is not built-in.

```json
{
  "userNameTemplate": {
    "template": "${source.login}",
    "type": "BUILT_IN"
  }
}
```

#### Signing Credential object

Determines the [key](#application-key-credential-object) used for signing assertions for the `signOnMode`

| Property   | Description                                                                                 | DataType | Nullable |
| ---------- | ------------------------------------------------------------------------------------------- | -------- | ---      |
| kid        | Reference for [key credential for the app](#application-key-store-operations)               | String   | FALSE    |

> **Note:** Only apps with `SAML_2_0`, `SAML_1_1`, `WS_FEDERATION` or `OPENID_CONNECT` `signOnMode` support the key rollover feature.

```json
{
  "signing": {
    "kid": "SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4"
  }
}
```

#### Refresh token object

Determines the refresh token rotation configuration for the OAuth 2.0 client.

| Property                   | Description                                                       | DataType | Nullable |
| -------------------------- | ----------------------------------------------------------------- | -------- | -------- |
| rotation_type              | The refresh token rotation mode for the OAuth 2.0 client          | `STATIC` or `ROTATE` | FALSE |
| leeway                     | The leeway allowed for the OAuth 2.0 client. After the refresh token is rotated, the previous token remains valid for the configured amount of time to allow clients to get the new token.                                           | Number               | TRUE |

* Refresh token rotation is an <ApiLifecycle access="ea" /> feature.

* When you create or update an OAuth 2.0 client, you can configure refresh token rotation by setting the `rotation_type` and `leeway` properties within the `refresh_token` object. If you don't set these properties, the default values are used when you create an app and your previously configured values are used when you update an app.

* The default `rotation_type` value is `ROTATE` for Single-Page Applications (SPAs). For all other clients, the default is `STATIC`.

* The `rotation_type` property is required if the request contains the `refresh_token` object.

* The `leeway` property value can be between 0 and 60. The default value is `30`.

```json
{
  "refresh_token": {
    "rotation_type": "ROTATE",
    "leeway": "20"
  }
}
```

#### OAuth Credential object

Determines how to authenticate the OAuth 2.0 client

| Property                   | Description                                                                      | DataType | Nullable |
| -------------------------- | -------------------------------------------------------------------------------- | -------- | -------- |
| autoKeyRotation            | Requested key rotation mode                                                      | Boolean  | TRUE     |
| client_id                  | Unique identifier for the OAuth 2.0 client application                           | String   | TRUE     |
| client_secret              | OAuth 2.0 client secret string                                                   | String   | TRUE     |
| token_endpoint_auth_method | Requested authentication method for the token endpoint                           | String   | FALSE    |

* When you create an OAuth 2.0 client application, you can specify the `client_id`, or Okta sets it as the same value as the application ID. Thereafter, the `client_id` is immutable.

* The `client_id` must consist of alphanumeric characters or the following special characters: `$-_.+!*'(),`. It must contain between six and 100 characters and must not be the reserved word: `ALL_CLIENTS`. The `client_secret` must consist of printable characters that are defined in the [OAuth 2.0 Spec](https://tools.ietf.org/html/rfc6749#appendix-A) and must contain between 14 and 100 characters.

 * If a `client_secret` isn't provided on creation, and the `token_endpoint_auth_method` requires one, Okta generates a random `client_secret` for the client application. The `client_secret` is only shown when an OAuth 2.0 client app is created or updated (and only if the `token_endpoint_auth_method` is one that requires a client secret).

* If `autoKeyRotation` isn't specified, the client automatically opts in for Okta's [key rotation](/docs/concepts/key-rotation/). You can update this property via the API or via the administrator UI.

```json
{
  "oauthClient": {
    "autoKeyRotation": false,
    "client_id": "0oa1hm4POxgJM6CPu0g4",
    "client_secret": "5jVbn2W72FOAWeQCg7-s_PA0aLqHWjHvUCt2xk-z",
    "token_endpoint_auth_method": "client_secret_post"
  }
}
```

##### Built-in expressions

The following expressions are built-in and may be used with the `BUILT_IN` template type:

| Name                            | Template Expression                            |
| ------------------------------- | ---------------------------------------------- |
| AD Employee ID                  | `${source.employeeID}`                         |
| AD SAM Account Name             | `${source.samAccountName}`                     |
| AD SAM Account Name (lowercase) | `${fn:toLowerCase(source.samAccountName)}`     |
| AD User Principal Name          | `${source.userName}`                           |
| AD User Principal Name prefix   | `${fn:substringBefore(source.userName, "@")}`  |
| Email                           | `${source.email}`                              |
| Email (lowercase)               | `${fn:toLowerCase(source.email)}`              |
| Email prefix                    | `${fn:substringBefore(source.email, "@")}`     |
| LDAP UID + custom suffix        | `${source.userName}${instance.userSuffix}`     |
| Okta username                   | `${source.login}`                              |
| Okta username prefix            | `${fn:substringBefore(source.login, "@")}`     |

### Password object

Specifies a password for a user. A password value is a **write-only** property.  When a user has a valid password and a response object contains a password credential, then the Password object is a bare object without the `value`  property defined (for example: `password: {}`) to indicate that a password value exists.

| Property  | Description | DataType | Nullable | Default | MinLength | MaxLength | Validation |
| --------- | ----------- | -------- | -------- | ------- | --------- | --------- | ---------- |
| value     |             | String   | TRUE     |         |           |           |            |

### Application Links object

Specifies link relations (See [Web Linking](http://tools.ietf.org/html/rfc5988)) available for the current status of an application using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification. This object is used for dynamic discovery of related resources and lifecycle operations.  The Links object is **read-only**.

| Link Relation Type | Description                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------ |
| activate           | [Lifecycle action](#activate-application) to transition application to `ACTIVE` status     |
| deactivate         | [Lifecycle action](#deactivate-application) to transition application to `INACTIVE` status |
| groups             | [Group](#application-group-operations) assignments for application                         |
| logo               | Application logo image                                                                     |
| metadata           | Protocol-specific metadata document for the configured `SignOnMode`                        |
| self               | The actual application                                                                     |
| users              | [User](#application-user-operations) assignments for application                           |

### Notifications object

Specifies notifications settings for the application. The VPN notification feature allows admins to communicate a requirement for signing into VPN-required apps.

| Property          | Description                                        | DataType                                             | Nullable | Default | MinLength | MaxLength | Validation |
| ----------------- | -------------------------------------------------- | ---------------------------------------------------- | -------- | ------- | --------- | --------- | ---------- |
| vpn               | VPN notification settings                          | [VPN Notification object](#vpn-notification-object)  | FALSE    |         |           |           |            |

```json
{
  "notifications": {
    "vpn": {
      "network": {
        "connection": "ANYWHERE"
      },
      "message": "Help message text.",
      "helpUrl": "http:/www.help-site.example.com"
     }
   }
 }
```

#### VPN Notification object

Specifies properties for a VPN notification

| Property  | Description                                                                                | DataType                          | Nullable | Default | MinLength | MaxLength  | Validation |
| --------- | ------------------------------------------------------------------------------------------ | --------------------------------  | -------- | ------- | --------- | ---------- | ---------- |
| helpurl   | An optional URL to help page URL to assist your end users in signing into your company VPN | String                            | TRUE     |         |           |            |            |
| message   | An optional message to your end users                                                     | String                            | TRUE     |         |           |            |            |
| network   | The network connections for the VPN                                                       | [Network object](#network-object) | FALSE    |         |           |            |            |

#### Network object

| Property   | Description                                           | DataType                                               | Nullable | Default     | MinLength | MaxLength  | Validation |
| ---------- | ----------------------------------------------------- | ------------------------------------------------------ | -------- | ----------- | --------- | ---------- | ---------- |
| connection | The VPN settings on the app. Choices are shown below. | `DISABLED`, `ANYWHERE`, `ON_NETWORK`, or `OFF_NETWORK` | FALSE    | `DISABLED`  |           |            |            |

There are four choices for the `connection` property.

 - `DISABLED` - The default state. Retain this setting for apps that don't require a VPN connection.
 - `ANYWHERE` - Displays VPN connection information regardless of the browser's client IP. The notification appears before the end user can access the app.
 - `ON_NETWORK` - Displays VPN connection information only when a browser's client IP matches the configured Public Gateway IPs. The notification appears before the end user can access the app.
 - `OFF_NETWORK` - Displays VPN connection information only when the browser's client IP doesn't match the configured Public Gateway IPs. The notification appears before the end user can access the app.

### Attribute Statements object

Specifies (optional) attribute statements for a SAML application

| Property   | Description                                                                                  | DataType     | Nullable |
| ---------- | -------------------------------------------------------------------------------------------- | ------------ | -------- |
| name       | The reference name of the attribute statement                                                | String       | FALSE    |
| namespace  | The name format of the attribute                                                             | String       | FALSE    |
| type       | The type of attribute statements object                                                      | `EXPRESSION` | FALSE    |
| values     | The values of the attribute; Supports [Okta EL](/docs/reference/okta-expression-language/)   | Array        | FALSE    |

### Single Logout object

Specifies the Single Logout (SLO) behavior for a Custom SAML application

| Property  | Description                                                                  | Datatype | Nullable | 
| --------- | ---------------------------------------------------------------------------- | -------- | -------- | 
| enabled   | Whether the application supports SLO                                         | Boolean  | FALSE    | 
| issuer    | The issuer of the Service Provider that generates the Single Logout request  | String   | TRUE     | 
| logoutUrl | The location where the logout response is sent                               | String   | TRUE     |

```json
{
  "slo": {
    "enabled": true,
    "issuer": "https://testorgone.okta.com",
    "logoutUrl": "https://testorgone.okta.com/logout"
  }
}
```

### Service Provider certificate

The certificate that the Service Provider uses to sign Single Logout requests

| Property | Description                                               | Datatype       | Nullable |
| -------- | --------------------------------------------------------- | -------------- | -------- |
| x5c      | A list that contains exactly one x509 encoded certificate | List of String | FALSE    |

```json
{
  "spCertificate": {
    "x5c": [
        "MIIFnDCCA4QCCQDBSLbiON2T1zANBgkqhkiG9w0BAQsFADCBjzELMAkGA1UEBhMCVVMxDjAMBgNV\r\nBAgMBU1haW5lMRAwDgYDVQQHDAdDYXJpYm91MRcwFQYDVQQKDA5Tbm93bWFrZXJzIEluYzEUMBIG\r\nA1UECwwLRW5naW5lZXJpbmcxDTALBgNVBAMMBFNub3cxIDAeBgkqhkiG9w0BCQEWEWVtYWlsQGV4\r\nYW1wbGUuY29tMB4XDTIwMTIwMzIyNDY0M1oXDTMwMTIwMTIyNDY0M1owgY8xCzAJBgNVBAYTAlVT\r\nMQ4wDAYDVQQIDAVNYWluZTEQMA4GA1UEBwwHQ2FyaWJvdTEXMBUGA1UECgwOU25vd21ha2VycyBJ\r\nbmMxFDASBgNVBAsMC0VuZ2luZWVyaW5nMQ0wCwYDVQQDDARTbm93MSAwHgYJKoZIhvcNAQkBFhFl\r\nbWFpbEBleGFtcGxlLmNvbTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBANMmWDjXPdoa\r\nPyzIENqeY9njLan2FqCbQPSestWUUcb6NhDsJVGSQ7XR+ozQA5TaJzbP7cAJUj8vCcbqMZsgOQAu\r\nO/pzYyQEKptLmrGvPn7xkJ1A1xLkp2NY18cpDTeUPueJUoidZ9EJwEuyUZIktzxNNU1pA1lGijiu\r\n2XNxs9d9JR/hm3tCu9Im8qLVB4JtX80YUa6QtlRjWR/H8a373AYCOASdoB3c57fIPD8ATDNy2w/c\r\nfCVGiyKDMFB+GA/WTsZpOP3iohRp8ltAncSuzypcztb2iE+jijtTsiC9kUA2abAJqqpoCJubNShi\r\nVff4822czpziS44MV2guC9wANi8u3Uyl5MKsU95j01jzadKRP5S+2f0K+n8n4UoV9fnqZFyuGAKd\r\nCJi9K6NlSAP+TgPe/JP9FOSuxQOHWJfmdLHdJD+evoKi9E55sr5lRFK0xU1Fj5Ld7zjC0pXPhtJf\r\nsgjEZzD433AsHnRzvRT1KSNCPkLYomznZo5n9rWYgCQ8HcytlQDTesmKE+s05E/VSWNtH84XdDrt\r\nieXwfwhHfaABSu+WjZYxi9CXdFCSvXhsgufUcK4FbYAHl/ga/cJxZc52yFC7Pcq0u9O2BSCjYPdQ\r\nDAHs9dhT1RhwVLM8RmoAzgxyyzau0gxnAlgSBD9FMW6dXqIHIp8yAAg9cRXhYRTNAgMBAAEwDQYJ\r\nKoZIhvcNAQELBQADggIBADofEC1SvG8qa7pmKCjB/E9Sxhk3mvUO9Gq43xzwVb721Ng3VYf4vGU3\r\nwLUwJeLt0wggnj26NJweN5T3q9T8UMxZhHSWvttEU3+S1nArRB0beti716HSlOCDx4wTmBu/D1MG\r\nt/kZYFJw+zuzvAcbYct2pK69AQhD8xAIbQvqADJI7cCK3yRry+aWtppc58P81KYabUlCfFXfhJ9E\r\nP72ffN4jVHpX3lxxYh7FKAdiKbY2FYzjsc7RdgKI1R3iAAZUCGBTvezNzaetGzTUjjl/g1tcVYij\r\nltH9ZOQBPlUMI88lxUxqgRTerpPmAJH00CACx4JFiZrweLM1trZyy06wNDQgLrqHr3EOagBF/O2h\r\nhfTehNdVr6iq3YhKWBo4/+RL0RCzHMh4u86VbDDnDn4Y6HzLuyIAtBFoikoKM6UHTOa0Pqv2bBr5\r\nwbkRkVUxl9yJJw/HmTCdfnsM9dTOJUKzEglnGF2184Gg+qJDZB6fSf0EAO1F6sTqiSswl+uHQZiy\r\nDaZzyU7Gg5seKOZ20zTRaX3Ihj9Zij/ORnrARE7eM/usKMECp+7syUwAUKxDCZkGiUdskmOhhBGL\r\nJtbyK3F2UvoJoLsm3pIcvMak9KwMjSTGJB47ABUP1+w+zGcNk0D5Co3IJ6QekiLfWJyQ+kKsWLKt\r\nzOYQQatrnBagM7MI2/T4\r\n"
    ]
  }
}
```

#### Group Attribute Statements object

Group Attribute Statements can be used in place of Attribute Statements if your Org supports a large number of groups and you want to filter them into a single SAML assertion.

| Property    | Description                                   | DataType                                        | Nullable |
| ----------- | --------------------------------------------- | ----------------------------------------------- | -------- |
| filterType  | How to use `filterValue` for filtering        | `STARTS_WITH`, `EQUALS`, `CONTAINS`, or `REGEX` | FALSE    |
| filterValue | What to filter on                             | String                                          | FALSE    |
| name        | The reference name of the attribute statement | String                                          | FALSE    |
| namespace   | The name format of the attribute              | String                                          | FALSE    |
| type        | The type of attribute statements object       | `GROUP`                                         | FALSE    |

#### Supported namespaces

| Label            | Value                                                   |
| ---------------- | ------------------------------------------------------- |
| Basic            | urn:oasis:names:tc:SAML:2.0:attrname-format:basic       |
| URI Reference    | urn:oasis:names:tc:SAML:2.0:attrname-format:uri         |
| Unspecified      | urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified |

> **Note:** This example is abbreviated.

```json
{
  "settings": {
    "signOn": {
        "attributeStatements": [
        {
          "type": "EXPRESSION",
          "name": "Attribute One",
          "namespace": "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified",
          "values": [
            "Value One"
          ]
        },
        {
          "type": "EXPRESSION",
          "name": "Attribute Two",
          "namespace": "urn:oasis:names:tc:SAML:2.0:attrname-format:basic",
          "values": [
            "Value Two"
          ]
        },
        {
          "type": "GROUP",
          "name": "Attribute Three",
          "namespace": "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified",
          "filterType": "STARTS_WITH",
          "filterValue": "starting"
        }
      ]
    }
  }
}
```

### Profile object

Profile object is a container for any valid JSON schema that can be referenced from a request. For example, add an app manager contact email address or define an allow list of groups that you can then reference using the [Okta Expression `getFilteredGroups`](/docs/reference/okta-expression-language/#group-functions).

Profile Requirements

* The `profile` property isn't encrypted, so don't store sensitive data in it.
* The `profile` property doesn't limit the level of nesting in the JSON schema you created, but there is a practical size limit. We recommend a JSON schema size of 1 MB or less for best performance.

> **Note:** Profile object is only available to OAuth 2.0 client applications.

### Application User object

The Application User object defines a user's app-specific profile and credentials for an application.

#### Example

```json
{
  "id": "00u11z6WHMYCGPCHCRFK",
  "externalId": "70c14cc17d3745e8a9f98d599a68329c",
  "created": "2014-06-24T15:27:59.000Z",
  "lastUpdated": "2014-06-24T15:28:14.000Z",
  "scope": "USER",
  "status": "ACTIVE",
  "statusChanged": "2014-06-24T15:28:14.000Z",
  "passwordChanged": "2014-06-24T15:27:59.000Z",
  "syncState": "SYNCHRONIZED",
  "lastSync": "2014-06-24T15:27:59.000Z",
  "credentials": {
    "userName": "saml.jackson@example.com",
    "password": {}
  },
  "profile": {
    "secondEmail": null,
    "lastName": "Jackson",
    "mobilePhone": null,
    "email": "saml.jackson@example.com",
    "salesforceGroups": [
      "Employee"
    ],
    "role": "CEO",
    "firstName": "Saml",
    "profile": "Standard User"
  },
  "_links": {
    "app": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oabhnUQFYHMBNVSVXMV"
    },
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00u11z6WHMYCGPCHCRFK"
    }
  }
}
```

#### Application User properties

All application user assignments have the following properties:

| Property         | Description                                                  | DataType                                                                    | Nullable | Unique | Readonly | MinLength | MaxLength | Validation |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- | ---------- |
| _embedded        | embedded resources related to the app user                   | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)              | TRUE     | FALSE  | TRUE     |           |           |            |
| _links           | discoverable resources related to the app user               | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)              | TRUE     | FALSE  | TRUE     |           |           |            |
| created          | timestamp when app user was created                          | Date                                                                        | FALSE    | FALSE  | TRUE     |           |           |            |
| credentials      | credentials for assigned app                                 | [Application User Credentials object](#application-user-credentials-object) | TRUE     | FALSE  | FALSE    |           |           |            |
| externalId       | id of user in target app *(must be imported or provisioned)* | String                                                                      | TRUE     | TRUE   | TRUE     |           | 512       |            |
| id               | unique key of a [User](/docs/reference/api/users/)              | String                                                                      | FALSE    | TRUE   | TRUE     |           |           |            |
| lastSync         | timestamp when last sync operation was executed              | Date                                                                        | TRUE     | FALSE  | TRUE     |           |           |            |
| lastUpdated      | timestamp when app user was last updated                     | Date                                                                        | FALSE    | FALSE  | TRUE     |           |           |            |
| passwordChanged  | timestamp when app password last changed                     | Date                                                                        | TRUE     | FALSE  | TRUE     |           |           |            |
| profile          | app-specific profile for the user                            | [Application User Profile object](#application-user-profile-object)         | FALSE    | FALSE  | TRUE     |           |           |            |
| scope            | toggles the assignment between user or group scope           | `USER` or `GROUP`                                                           | FALSE    | FALSE  | FALSE    |           |           |            |
| status           | status of app user                                           | `STAGED`, `PROVISIONED`, `ACTIVE`, `INACTIVE`, or `DEPROVISIONED`           | FALSE    | FALSE  | TRUE     |           |           |            |
| statusChanged    | timestamp when status was last changed                       | Date                                                                        | TRUE     | FALSE  | TRUE     |           |           |            |
| syncState        | synchronization state for app user                           | `DISABLED`, `OUT_OF_SYNC`, `SYNCING`, `SYNCHRONIZED`, `ERROR`               | FALSE    | FALSE  | TRUE     |           |           |            |

> **Note:** `lastSync` is only updated for applications with the `IMPORT_PROFILE_UPDATES` or `PUSH PROFILE_UPDATES` feature.

##### External ID

Users in Okta are linked to a user in a target application via an `externalId`. Okta anchors a user with his or her `externalId` during an import or provisioning synchronization event. Okta uses the native app-specific identifier or primary key for the user as the `externalId`. The `externalId` is selected during import when the user is confirmed (reconciled) or during provisioning when the user has been successfully created in the target application.

> **Note:** SSO Application Assignments (for example, SAML or SWA) don't have an `externalId` as they aren't synchronized with the application.

##### Application User status

###### Single Sign-On

Users assigned to an application for SSO without provisioning features enabled have an `ACTIVE` status with `syncState` as `DISABLED`.

###### User import

Users imported and confirmed by an application with the `IMPORT_PROFILE_UPDATES` feature have an `ACTIVE` status. The application user's `syncState` depends on whether the `PROFILE_MASTERING` feature is enabled for the application. When `PROFILE_MASTERING` is enabled, the `syncState` transitions to `SYNCHRONIZED` otherwise the `syncState` is `DISABLED`.

###### User provisioning

User provisioning in Okta is an asynchronous background job that is triggered during assignment of the user (or indirectly via a group assignment).

1. User is assigned to an application that has `PUSH_NEW_USERS` feature enabled.
    * Application user has a `STAGED` status with no `externalId` while the background provisioning job is queued.
2. When the background provisioning job completes successfully, the application user transitions to the `PROVISIONED` status.
    * Application user is assigned an `externalId` when successfully provisioned in the target application. The `externalId` should be immutable for the life of the assignment.
3. If the background provisioning job completes with an error, the application user remains with the `STAGED` status, but has `syncState` as `ERROR`. A provisioning task is created in the administrator UI that must be resolved to retry the job.

When the `PUSH_PROFILE_UPDATES` feature is enabled, updates to an upstream profile are pushed downstream to the application according to profile mastering priority.  The app user's `syncState` has the following values:

| syncState    | Description                                                                                                                                                                               |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------     |
| ERROR        | Background provisioning job failed to update the user's profile in the target application. A provisioning task is created in the administrator UI that must be resolved to retry the job. |
| OUT_OF_SYNC  | Application user has changes that haven't been pushed to the target application.                                                                                                        |
| SYNCHRONIZED | All changes to the app user profile have successfully been synchronized with the target application.                                                                                       |
| SYNCING      | Background provisioning job is running to update the user's profile in the target application.                                                                                             |

> **Note:** User provisioning currently must be configured via the administrator UI and is only available with specific editions.

#### Application User Credentials object

Specifies a user's credentials for the application. The [Authentication Scheme](#authentication-schemes) of the application determines whether a username or password can be assigned to a user.

| Property  | Description      | DataType                            | Nullable | Default | MinLength | MaxLength | Validation |
| --------- | ---------------- | ----------------------------------- | -------- | ------- | --------- | --------- | ---------- |
| password  | password for app | [Password object](#password-object) | TRUE     |         |           |           |            |
| userName  | username for app | String                              | TRUE     |         | 1         | 100       |            |

```json
{
  "credentials": {
    "userName": "test",
    "password": {}
  }
}
```

> **Note:** The application's [Username Template](#username-template-object) defines the default username generated when a user is assigned to an application.

If you attempt to assign a username or password to an application with an incompatible [Authentication Scheme](#authentication-schemes), you receive the following error:

```json
{
  "errorCode": "E0000041",
  "errorSummary": "Credentials should not be set on this resource based on the scheme.",
  "errorLink": "E0000041",
  "errorId": "oaeUM77NBynQQu4C_qT5ngjGQ",
  "errorCauses": [
    {
      "errorSummary": "User level credentials should not be provided for this scheme."
    }
  ]
}
```

#### Application User Profile object

Application User profiles are app-specific, but may be customized by the Profile Editor in the administrator UI. SSO apps typically don't support a user profile while apps with [user provisioning features](#features) have app-specific profiles with optional and/or required properties. Any profile properties visible in the administrator UI for an application assignment can also be assigned via the API. Some properties are reference properties and imported from the target application and only allow specific values to be configured.

##### Profile Editor

![Profile Editor UI](/img/okta-admin-ui-profile-editor.png "Profile Editor UI")

> **Note:** Managing profiles for applications is restricted to specific editions and requires access to the Universal Directory <ApiLifecycle access="ea" /> feature.

##### Example application assignment

![App Assignment UI](/img/okta-admin-ui-app-assignment.png "App Assignment UI")

##### Example Profile object

```json
{
  "profile": {
    "secondEmail": null,
    "lastName": "Jackson",
    "mobilePhone": null,
    "email": "saml.jackson@example.com",
    "salesforceGroups": [
      "Employee"
    ],
    "role": "CEO",
    "firstName": "Saml",
    "profile": "Standard User"
  }
}
```

### Application Group object

#### Example

```json
{
  "id": "00gbkkGFFWZDLCNTAGQR",
  "lastUpdated": "2013-09-11T15:56:58.000Z",
  "priority": 0,
  "_links": {
    "user": {
      "href": "https://${yourOktaDomain}/api/v1/users/00ubgfEUVRPSHGWHAZRI"
    }
  }
}
```

#### Application Group properties

All application groups have the following properties:

| Property     | Description                                     | DataType                                                       | Nullable | Unique | Readonly | MinLength | MaxLength | Validation |
| ------------ | ----------------------------------------------- | -------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- | ---------- |
| _embedded    | embedded resources related to the app group     | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | TRUE     | FALSE  | TRUE     |           |           |            |
| _links       | discoverable resources related to the app group | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-05) | TRUE     | FALSE  | TRUE     |           |           |            |
| id           | unique key of group                             | String                                                         | FALSE    | TRUE   | TRUE     |           |           |            |
| lastUpdated  | timestamp when app group was last updated       | Date                                                           | FALSE    | FALSE  | TRUE     |           |           |            |
| priority     | priority of group assignment                    | Number                                                         | TRUE     | FALSE  | FALSE    | 0         | 100       |            |
| profile      | Valid JSON schema for specifying properties     | [JSON](#profile-object)                                        | TRUE     | FALSE  | FALSE    |           |           |            |

### Application Key Credential object

The application key credential object defines a [JSON Web Key](https://tools.ietf.org/html/rfc7517) for a signature or encryption credential for an application.

> **Note:** Currently only the X.509 JWK format is supported for applications with the `SAML_2_0` sign-on mode.

#### Example

```json
{
  "created": "2015-11-20T21:09:30.000Z",
  "expiresAt": "2017-11-20T21:09:29.000Z",
  "x5c": [
    "MIIDmDCCAoCgAwIBAgIGAVEmuwhKMA0GCSqGSIb3DQEBBQUAMIGMMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxDTALBgNVBAMMBHJhaW4xHDAaBgkqhkiG9w0BCQEWDWluZm9Ab2t0YS5jb20wHhcNMTUxMTIwMjEwODMwWhcNMTcxMTIwMjEwOTI5WjCBjDELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTALBgNVBAoMBE9rdGExFDASBgNVBAsMC1NTT1Byb3ZpZGVyMQ0wCwYDVQQDDARyYWluMRwwGgYJKoZIhvcNAQkBFg1pbmZvQG9rdGEuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1ml7//IDMpngTKGJJ5qhodUaOY2Yx7k6mCYyETA8wjVfJjWFYVDwfTJ5kB7zbuPBNVDFuLIxMqGyJk3i2/nSBKe1eAC2lv+WK2R5xqSgXNNLlnhR3xMp8ed7TCmrHFRoS46uIBpMfvROij4cmOjVtX1ZGTjdqC8Z8bPg+JiZW9BkBo9sdEIjWjZTzMpmuHJ26EcJkuODFp5jr3/SKv3LvFAjbF5slEXrZLyUFrmSL0AXU6fWszN1llUoPBjS9uSTelOsS4PvBUy/oH1e7vbo8jag68ym2+wbbTw9toOjGcdOcwsT7Phwh0ixjt1/oKnjNvMKHapSr2GoiY8cltkQ2wIDAQABMA0GCSqGSIb3DQEBBQUAA4IBAQBkYvW3dtPU5spAvUUNHZmk76C0GC0Dg+XD15menebia931qeO6o21SJLbcRr+0Doy8p59r8ZmqIj/jJOhCrA0jqiKT+wch/494K6OYz8k3jJ3OtrBQ3OtYJ7gpAq0QuWf/G3tFpH23tW/8VfBtalwPMxiffG9rkFzPYAoNgYHXAGLO5yRz3TC0Z8nkcY5xPO/NAN1gsWvlvTBxf3B06giug7g+szRaReAjpM3WUFz9XG4Hs/EtaqiBFeArWRqWxxO7igmSQEEmlAHYCCoTZ/Atvwa96CqCTlM2Dr45aT1h8tkaVFXl8HGdt1/m8mnw53PbgxvYW2AvN5JBwp9S8c6w"
  ],
  "e": "AQAB",
  "n": "mkC6yAJVvFwUlmM9gKjb2d-YK5qHFt-mXSsbjWKKs4EfNm-BoQeeovBZtSACyaqLc8IYFTPEURFcbDQ9DkAL04uUIRD2gaHYY7uK0jsluEaXGq2RAIsmzAwNTzkiDw4q9pDL_q7n0f_SDt1TsMaMQayB6bU5jWsmqcWJ8MCRJ1aJMjZ16un5UVx51IIeCbe4QRDxEXGAvYNczsBoZxspDt28esSpq5W0dBFxcyGVudyl54Er3FzAguhgfMVjH-bUec9j2Tl40qDTktrYgYfxz9pfjm01Hl4WYP1YQxeETpSL7cQ5Ihz4jGDtHUEOcZ4GfJrPzrGpUrak8Qp5xcwCqQ",
  "x5t#S256": "CyhOiLD8_9hCFT02nUbkvmlNncBsb31xY_SUbF6fHPA",
  "kid": "SIMcCQNY3uwXoW3y0vf6VxiBb5n9pf8L2fK8d-FIbm4",
  "kty": "RSA",
  "use": "sig"
}
```

#### Application Key Credential (certificate) properties

| Property         | Description                                                  | DataType                                                                    | Nullable | Unique | Readonly | MinLength | MaxLength | Validation |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- | ---------- |
| created          | timestamp when certificate was created                       | Date                                                                        | FALSE    | FALSE  | TRUE     |           |           |            |
| e                | RSA key value (exponent) for key blinding                    | String                                                                      | FALSE    | FALSE  | TRUE     |           |           |            |
| expiresAt        | timestamp when certificate expires                           | Date                                                                        | FALSE    | FALSE  | TRUE     |           |           |            |
| kid              | unique identifier for the certificate                        | String                                                                      | FALSE    | TRUE   | TRUE     |           |           |            |
| kty              | cryptographic algorithm family for the certificate's keypair | String                                                                      | FALSE    | FALSE  | TRUE     |           |           |            |
| n                | RSA key value (modulus) for key blinding                     | String                                                                      | FALSE    | FALSE  | TRUE     |           |           |            |
| use              | acceptable usage of the certificate                          | String                                                                      | TRUE     | FALSE  | TRUE     |           |           |            |
| x5c              | X.509 certificate chain                                      | Array                                                                       | TRUE     | TRUE   | TRUE     |           |           |            |
| x5t#S256         | X.509 certificate SHA-256 thumbprint                         | String                                                                      | TRUE     | TRUE   | TRUE     |           |           |            |

### CSR Metadata object

The metadata for a CSR

#### Example

```json
{
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
}
```

#### CSR Metadata properties

| Property         | Description                                                  | DataType                                                                    | Nullable | Unique | Readonly | MinLength | MaxLength | Validation |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- | ---------- |
| subject          | Subject of the CSR                                           | [Subject object](#subject-object)                                           | FALSE    | FALSE  | FALSE    |           |           |            |
| subjectAltNames  | Subject Alternative Name of the CSR                          | [Subject Alternative Name object](#subject-alternative-name-object)         | TRUE     | FALSE  | FALSE    |           |           |            |

##### Subject object

| Property               | Description                                                  | DataType                                                                    | Nullable | Unique | Readonly | MinLength | MaxLength | Validation |
| ----------------       | ------------------------------------------------------------ | --------------------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- | ---------- |
| commonName             | Common name of the subject                                   | String                                                                      | TRUE     | FALSE  | FALSE    |           |           |            |
| countryName            | country name or code                                         | String                                                                      | TRUE     | FALSE  | FALSE    |           |           |            |
| localityName           | locality (city) name                                         | String                                                                      | TRUE     | FALSE  | FALSE    |           |           |            |
| organizationName       | large organization name                                      | String                                                                      | TRUE     | FALSE  | FALSE    |           |           |            |
| organizationalUnitName | small organization (e.g, department or division) name        | String                                                                      | TRUE     | FALSE  | FALSE    |           |           |            |
| stateOrProvinceName    | state or province name                                       | String                                                                      | TRUE     | FALSE  | FALSE    |           |           |            |

##### Subject Alternative Name object

| Property         | Description                           | DataType                                            | Nullable | Unique | Readonly | MinLength | MaxLength | Validation |
| ---------------- | ------------------------------------- | --------------------------------------------------- | -------- | ------ | -------- | --------- | --------- | ---------- |
| dnsNames         | DNS names of the subject              | Array                                               | TRUE     | FALSE  | FALSE    |           |           |            |


### Application CSR object

The application CSR object defines a certificate signing request for a signature or encryption credential for an application.

#### Example

```json
{
  "id": "h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
  "created": "2017-03-28T01:11:10.000Z",
  "csr": "MIIC4DCCAcgCAQAwcTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xEzARBgNVBAoMCk9rdGEsIEluYy4xDDAKBgNVBAsMA0RldjESMBAGA1UEAwwJU1AgSXNzdWVyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6m8jHVCr9/tKvvbFN59T4raoCs/78KRm4fSefHQOv1TKLXo4wTLbsqYWRWc5u0sd5orUMQgPQOyj3i6qh13mALY4BzrT057EG1BUNjGg29QgYlnOk2iX890e5BIDMQQEIKFrvOi2V8cLUkLvE2ydRn0VO1Q1frbUkYeStJYC5Api2JQsYRwa+1ZeDH1ITnIzUaugWhW2WB2lSnwZkenne5KtffxMPYVu+IhNRHoKaRA6Z51YNhMJIx17JM2hs/H4Ka3drk6kzDf7ofk/yBpb9yBWyU7CTSQhdoHidxqFprMDaT66W928t3AeOENHBuwn8c2K9WeGG+bELNyQRJVmawIDAQABoCowKAYJKoZIhvcNAQkOMRswGTAXBgNVHREEEDAOggxkZXYub2t0YS5jb20wDQYJKoZIhvcNAQELBQADggEBAA2hsVJRVM+A83X9MekjTnIbt19UNT8wX7wlE9jUKirWsxceLiZBpVGn9qfKhhVIpvdaIRSeoFYS2Kg/m1G6bCvjmZLcrQ5FcEBjZH2NKfNppGVnfC2ugtUkBtCB+UUzOhKhRKJtGugenKbP33zRWWIqnd2waF6Cy8TIuqQVPbwEDN9bCbAs7ND6CFYNguY7KYjWzQOeAR716eqpEEXuPYAS4nx/ty4ylonR8cv+gpq51rvq80A4k/36aoeM0Y6I4w64vhTfuvWW2UYFUD+/+y2FA2CSP4JfctySrf1s525v6fzTFZ3qZbB5OZQtP2b8xYWktMzywsxGKDoVDB4wkH4=",
  "kty": "RSA",
  "_links": {
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50",
      "hints": {
        "allow": [
          "GET",
          "DELETE"
        ]
      }
    },
    "publish": {
      "href": "https://${yourOktaDomain}/api/v1/apps/0oad5lTSBOMUBOBVVQSC/credentials/csrs/h9zkutaSe7fZX0SwN1GqDApofgD1OW8g2B5l2azha50/lifecycle/publish",
      "hints": {
        "allow": [
          "POST"
        ]
      }
    }
  }
}
```

#### Application CSR properties

| Property         | Description                                                  | DataType                                                                    | Nullable | Unique | Readonly | MinLength | MaxLength | Validation |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- | ---------- |
| _links           | discoverable resources related to the CSR                    | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-05)              | TRUE     | FALSE  | TRUE     |           |           |            |
| created          | timestamp when CSR was created                               | Date                                                                        | FALSE    | FALSE  | TRUE     |           |           |            |
| csr              | Base64 encoded CSR in DER format                             | String                                                                      | TRUE     | TRUE   | TRUE     |           |           |            |
| id               | unique identifier for the CSR                                | String                                                                      | FALSE    | TRUE   | TRUE     |           |           |            |
| kty              | cryptographic algorithm family for the CSR's keypair         | String                                                                      | FALSE    | FALSE  | TRUE     |           |           |            |

### ACS Endpoint Object

The ACS endpoint that contains the ACS URI and the index of the URI.

```json
{
  "url": "https://www.example.com/sso/saml",
  "index": 0
}
```

#### ACS Endpoint properties

| Property         | Description                                                  | DataType                                                                    | Nullable | Unique | Readonly | MinLength | MaxLength | Validation |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- | ---------- |
| url              | URL of the ACS                                               | String                                                                      | FALSE    | FALSE  | FALSE    |           | 1024      | [URL](http://tools.ietf.org/html/rfc3986)           |
| index            | index of the URL in the array of ACS endpoints               | Number                                                                      | FALSE    | TRUE   | FALSE    |           |           |            |

Property details

 * `url` can't have query or fragment parameters.
 * `index` has to be a non-negative number and cannot be duplicated in a set of ACS endpoints configured for an app.

### Provisioning Connection object

The provisioning connection object is a read only object that displays the method of authentication used for provisioning.

#### Example
```json
{
    "authScheme": "TOKEN",
    "status": "DISABLED",
    "_links": {
        "activate": {
            "href": "https://${yourOktaDomain}/api/v1/apps/${applicationId}/connections/default/lifecycle/activate",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/apps/${applicationId}/connections/default",
            "hints": {
                "allow": [
                    "POST",
                    "GET"
                ]
            }
        }
    }
}
```

#### Provisioning Connection properties

| Property         | Description                                                  | DataType                                                                    | Nullable | Unique | Readonly | Default |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------- | -------- | ------ | -------- | --------- |
| authScheme              | Defines the method of authentication    | `TOKEN`, `UNKNOWN`                                                           | FALSE    | FALSE  | TRUE    |           |
| _links            | Discoverable resources related to the connection            | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)              | TRUE    | FALSE   | TRUE    |           |
| status            | Status of the connection      | `ENABLED`, `DISABLED`, `UNKNOWN`  | FALSE    | FALSE   | TRUE    | `DISABLED` |

If the authScheme is `UNKNOWN`, then either the authentication scheme used by the application isn't supported or the the application doesn't support provisioning. An object with an `UNKNOWN` `authScheme` results in an `UNKNOWN` `status`.

### Provisioning Connection Profile object

The application provisioning connection profile is used to configure the method of authentication and the credentials. Currently, only token based authentication is supported.

#### Token based Provisioning Connection Profile example
```json
{
    "profile": {
        "authScheme": "TOKEN",
        "token": "TEST"
    }
}
```

#### Token based Provisioning Connection Profile properties

| Property         | Description                                                  | DataType                                                                    | Nullable | Unique | Readonly |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- | ---------- |
| authScheme              | Defines the method of authentication     | `TOKEN` | FALSE    | FALSE  | FALSE    |
| token            | Token used to authenticate with application      | String | FALSE    | FALSE   | FALSE    |

### Application Feature object

The Feature object is used to configure settings of the application. For example, the `USER_PROVISIONING` Feature object is used to configure the ability to create, read, update users in Okta accounts, deprovision accounts for deactivated users, and synchronize user attributes.

#### Application Feature example
```json
{
    "name": "USER_PROVISIONING",
    "status": "ENABLED",
    "description": "User provisioning settings from Okta to a downstream application",
    "capabilities": {
        "create": {
            "lifecycleCreate": {
                "status": "DISABLED"
            }
        },
        "update": {
            "profile": {
                "status": "DISABLED"
            },
            "lifecycleDeactivate": {
                "status": "DISABLED"
            },
            "password": {
                "status": "DISABLED",
                "seed": "RANDOM",
                "change": "KEEP_EXISTING"
            }
        }
    },
    "_links": {
        "self": {
            "href": "http://${yourOktaDomain}/api/v1/apps/${applicationId}/features/USER_PROVISIONING",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        }
    }
}
```

#### Application Feature properties

| Property         | Description                                                  | DataType                                                                    | Nullable | Unique | Readonly | Default |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------- | -------- | ------ | -------- | --------- |
| capabilities            | Defines the configuration of specific settings related to an application feature    | [Capabilities Object](#capabilties-object)                                                                  | FALSE    | FALSE   | TRUE    |           |
| description            | Description of the feature      | String  | FALSE    | FALSE   | TRUE    |           |
| _links           | Discoverable resources related to the application feature     | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)     | TRUE    | FALSE   | TRUE    |           |
| name              | Identifiying name     | `USER_PROVISIONING`  | FALSE    | FALSE  | TRUE    |           |       |      |
| status            | Status of the feature   | `ENABLED`, `DISABLED`    | FALSE    | FALSE   | TRUE    |      `DISABLED`  |

##### Capabilties object

The Capabilities object is used to configure settings specific to an app feature.

| Property         | Description                                                  | DataType                                                                    | Nullable | Unique | Readonly |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- | ---------- |
| create            | Determines whether Okta assigns a new application account to each user managed by Okta | [Create Object](#create-object)  | TRUE    | FALSE   | FALSE    |
| update            | Determines whether updates to a user's profile are pushed to the application | [Update Object](#update-object)  | TRUE    | FALSE   | FALSE    |

###### Create object

The Create object is a single setting to specify whether Okta assigns a new application account to each user managed by Okta. Okta doesn't create a new account if it detects that the username specified in Okta already exists in the application. The user's Okta username is assigned by default.

| Property         | Description                                                  | DataType                                                                    | Nullable | Unique | Readonly |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------- | -------- | ------ | -------- |
| lifecycleCreate  | Setting that determines whether the updates to a user in Okta will be update a user in the application   | [Lifecycle Create Setting Object](##lifecycle-create-setting-object)      | TRUE    | FALSE   | FALSE    |           |

```json
{
  "lifecycleCreate": {
    "status": "DISABLED"
  }
}
```

###### Update object

There are multiple settings in the Create object that determine if an Okta user profile change, user deactivation, or a password change will update a user in the application.

| Property         | Description                                                  | DataType                                                                    | Nullable | Unique | Readonly |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------- | -------- | ------ | -------- |
| lifecycleDeactivate           | Setting that determines whether deprovisioning will occur when app is unassigned  | [Lifecycle Deactivate Setting Object](#lifecycle-deactivate-setting-object)   | TRUE    | FALSE   | FALSE    |
| password           | Setting that determines whether Okta creates and pushes a password in the application for each assigned user | [Password Setting Object](#password-setting-object)    | TRUE    | FALSE   | FALSE    |
| profile           | Setting that determines whether the updates to a user in Okta will be update a user in the application.     | [Profile Setting Object](#profile-setting-object)     | TRUE    | FALSE   | FALSE    |

```json
{
  "profile": {
      "status": "DISABLED"
  },
  "lifecycleDeactivate": {
      "status": "DISABLED"
  },
  "password": {
      "status": "DISABLED",
      "seed": "RANDOM",
      "change": "KEEP_EXISTING"
  }
}
```

###### Lifecycle Create Setting object

Assigns a new application account to each user managed by Okta. Okta doesn't create a new account if it detects that the username specified in Okta already exists in the application. The user's Okta username is assigned by default.

| Property         | Description                                                  | DataType                                                                    | Nullable | Unique | Readonly | Default |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------- | -------- | ------ | -------- | --------- |
| status   | Status of the setting     | `ENABLED`, `DISABLED` | FALSE    | FALSE   | FALSE    | `DISABLED` |

###### Lifecycle Deactivate Setting object

Deactivates a user's application account when it is unassigned in Okta or if their Okta account is deactivated. Accounts can be reactivated if the app is reassigned to a user in Okta.

| Property         | Description                                                  | DataType                                                                    | Nullable | Unique | Readonly | Default |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------- | -------- | ------ | -------- | --------- |
| status   | Status of the setting     | `ENABLED`, `DISABLED` | FALSE    | FALSE   | FALSE    | `DISABLED` |

###### Password Setting object

Ensures users' app passwords are always the same as their Okta passwords or allows Okta to generate a unique password for the user.

| Property         | Description                                                  | DataType                                                                    | Nullable | Unique | Readonly | Default |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------- | -------- | ------ | -------- | --------- | --------- | ---------- |
| change | Determines whether a change in a users password will also update the password in the application.   | `KEEP_EXISTING`, `CHANGE` | TRUE  | FALSE   | FALSE    | `KEEP_EXISTING` |
| seed | Determines whether the generated password is the users Okta password or a randomly generated password.   | `OKTA`, `RANDOM`  | TRUE  | FALSE | FALSE  |  `RANDOM`  |
| status | Status of the setting     | `ENABLED`, `DISABLED` | FALSE    | FALSE  | FALSE  |  `DISABLED` |

```json
{
  "password": {
    "status": "ENABLED",
    "seed": "OKTA",
    "change": "CHANGE"
  }
}
```

###### Profile Update Setting object

Okta updates a user's attributes in the application when the application is assigned. Future changes made to the Okta user's profile automatically overwrite the corresponding attribute value in the application.

| Property         | Description                                                  | DataType                                                                    | Nullable | Unique | Readonly | Default |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------- | -------- | ------ | -------- | --------- |
| status   | Status of the setting     | `ENABLED`, `DISABLED` | FALSE    | FALSE   | FALSE    | `DISABLED`  |
