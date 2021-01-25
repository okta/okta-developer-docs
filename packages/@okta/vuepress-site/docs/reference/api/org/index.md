
---
title: Org
category: management
---

# Org API

<ApiLifecycle access="ea" />

The Okta Org API provides operations to manage your org account settings such as contact information, granting Okta Support access, and more.

## Get Org Settings

<ApiOperation method="get" url="/api/v1/org" />

Gets your Organization's current settings.

### Response parameters

The [Org Object](#org-object)

### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org"
```

### Response example

```json
{
    "id": "00ou8s5wploBwX4710g3",
    "subdomain": "okta",
    "name": "Okta",
    "status": "ACTIVE",
    "expiresAt": null,
    "created": "2020-10-26T15:03:08.000Z",
    "lastUpdated": "2021-01-20T21:02:28.000Z",
    "website": "http://okta.com",
    "phoneNumber": "+1-555-415-1337",
    "endUserSupportHelpURL": "https://support.okta.com",
    "supportPhoneNumber": "+1-555-514-1337",
    "address1": "301 Brannan St.",
    "address2": "Unit 100",
    "city": "San Francisco",
    "state": "California",
    "country": "United States of America",
    "postalCode": "94107",
    "_links": {
        "preferences": {
            "href": "http://okta.okta.com/api/v1/org/preferences"
        },
        "uploadLogo": {
            "href": "http://okta.okta.com/api/v1/org/logo",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "oktaCommunication": {
            "href": "http://okta.okta.com/api/v1/org/privacy/oktaCommunication"
        },
        "logo": {
            "href": "http://okta.okta.com/bc/image/fileStoreRecord?id=fs02ju1ejvy2Cv2Yx0g4"
        },
        "oktaSupport": {
            "href": "http://okta.okta.com/api/v1/org/privacy/oktaSupport"
        },
        "contacts": {
            "href": "http://okta.okta.com/api/v1/org/contacts"
        }
    }
}
```
## Update Org Settings

> **Note:** Use the `POST` method to make a partial update and the `PUT` method to delete unspecified properties.

<ApiOperation method="put" url="/api/v1/org" />

Updates your Organization's current settings

All org properties must be specified when updating an org's profile with a `PUT` method. Any property not specified in the request is deleted.

>Important: Don't use `PUT` method for partial updates.

### Request parameters

The [Org](#org-object) Object

### Response parameters

The [Org](#org-object) Object

### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "companyName": "Okta",
    "website": "http://okta.com",
    "phoneNumber": "+1-555-415-1337",
    "endUserSupportHelpURL": "https://support.okta.com",
    "supportPhoneNumber": "+1-555-514-1337",
    "address1": "301 Brannan St.",
    "address2": "Unit 100",
    "city": "San Francisco",
    "state": "California",
    "country": "United States of America",
    "postalCode": "94107"
}' "https://${yourOktaDomain}/api/v1/org"
```
### Response Example 
```json
{
    "id": "00ou8s5wploBwX4710g3",
    "subdomain": "okta",
    "name": "Okta",
    "status": "ACTIVE",
    "expiresAt": null,
    "created": "2020-10-26T15:03:08.000Z",
    "lastUpdated": "2021-01-20T21:02:28.000Z",
    "website": "http://okta.com",
    "phoneNumber": "+1-555-415-1337",
    "endUserSupportHelpURL": "https://support.okta.com",
    "supportPhoneNumber": "+1-555-514-1337",
    "address1": "301 Brannan St.",
    "address2": "Unit 100",
    "city": "San Francisco",
    "state": "California",
    "country": "United States of America",
    "postalCode": "94107",
    "_links": {
        "preferences": {
            "href": "http://okta.okta.com/api/v1/org/preferences"
        },
        "uploadLogo": {
            "href": "http://okta.okta.com/api/v1/org/logo",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "oktaCommunication": {
            "href": "http://okta.okta.com/api/v1/org/privacy/oktaCommunication"
        },
        "logo": {
            "href": "http://okta.okta.com/bc/image/fileStoreRecord?id=fs02ju1ejvy2Cv2Yx0g4"
        },
        "oktaSupport": {
            "href": "http://okta.okta.com/api/v1/org/privacy/oktaSupport"
        },
        "contacts": {
            "href": "http://okta.okta.com/api/v1/org/contacts"
        }
    }
}
```
## Get Contact Types

<ApiOperation method="get" url="/api/v1/org/contacts" />

Gets your Organization's contact Types

### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/contacts"
```

### Response example

```json
[
    {
        "contactType": "BILLING",
        "_links": {
            "billing": {
                "href": "http://okta.okta.com/api/v1/org/contacts/billing"
            }
        }
    },
    {
        "contactType": "TECHNICAL",
        "_links": {
            "technical": {
                "href": "http://okta.okta.com/api/v1/org/contacts/technical"
            }
        }
    }
]
```

## Get User of a Contact Type

<ApiOperation method="get" url="/api/v1/org/contacts/${contactType}" />

Get specific user of a Contact Type.

### Request parameters
| Parameter        | Description                                            | Param Type  | DataType                                 | Required  |
| :--------------- | :----------------------------------------------------- | :---------- | :--------------------------------------- | :-------- |
| contactType      | `type` of a Contact                                    | URL         | [Contact Type](#contact-types)           | TRUE      |

### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/contacts/${contactType}"
```

### Response example

```json
{
    "userId": "00uuibMot2FBByTbs0g3",
    "_links": {
        "user": {
            "href": "http://okta.okta.com/api/v1/users/00uuibMot2FBByTbs0g3"
        }
    }
}
```

## Update Contact of a Type

<ApiOperation method="put" url="/api/v1/org/contacts/${contactType}" />

Updates the user to your Organization's contact of a specific type

### Request parameters
| Parameter        | Description                                            | Param Type  | DataType                                 | Required  |
| :--------------- | :----------------------------------------------------- | :---------- | :--------------------------------------- | :-------- |
| contactType      | `type` of Contact                                    | URL         | [Contact Type](#contact-types)           | TRUE      |
| userId           | `id` of the User                                    | Body        | String                                   | TRUE      |

### Response Parameters

Fetched [Contact User Object](#contact-user-object)

An invalid `id` returns a `404 Not Found` status code.

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
    "errorCode": "E0000007",
    "errorSummary": "Not found: Resource not found: 00uuibMot2FBByTbs0g4 (User)",
    "errorLink": "E0000007",
    "errorId": "oaehhZVvfglR-GnSbcOQDCm6g",
    "errorCauses": []
}
```

### Request example

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "userId": "00uuibMot2FBByTbs0g3
}' "https://${yourOktaDomain}/api/v1/org/contacts/${contactType}"
```

### Response example

```json
{
    "userId": "00uuibMot2FBByTbs0g3",
    "_links": {
        "user": {
            "href": "http://okta.okta.com/api/v1/users/00uuibMot2FBByTbs0g3"
        }
    }
}
```

## Upload Logo for Org

<ApiOperation method="post" url="/api/v1/org/logo" />

Update the logo for your org.

### Request Parameters

| Parameter        | Description                                            | Param Type  | DataType          | Required  |
| :--------------- | :----------------------------------------------------- | :---------- | :---------------- | :-------- |
| file             | File containing logo                                   | Body        | File              | TRUE      |

The file must be in PNG, JPG, or GIF format, and less than 1 MB in size. For best results use landscape orientation, a transparent background, and a minimum size of 420px by 120px to prevent upscaling.

### Request Example

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
-F 'file=@/path/to/file' \
"https://${yourOktaDomain}/api/v1/org/logo"
```
### Response Example

```
HTTP/1.1 201 Content Created
Location: https://${yourOktaDomain}/bc/image/fileStoreRecord?id=fs01hfslJH2m3qUOe0g4
```

## Get Okta Support Settings

<ApiOperation method="get" url="/api/v1/org/privacy/oktaSupport" />

Gets your Organization's Okta Support settings.

### Response Parameters

Fetched [Okta Support Setting Object](#okta-support-setting-object)

### Request Example

```
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/privacy/oktaSupport"
```

### Response Example

```json
{
    "support": "ENABLED",
    "expiration": "2021-01-24T11:13:14.000Z",
    "_links": {
        "extend": {
            "href": "http://okta.okta.com/api/v1/org/privacy/oktaSupport/extend",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "revoke": {
            "href": "http://okta.okta.com/api/v1/org/privacy/oktaSupport/revoke",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

## Grant Okta Support 

<ApiOperation method="post" url="/api/v1/org/privacy/oktaSupport/grant" />

Grant Okta Support for your organization.

### Response Parameters

Fetched [Okta Support Setting Object](#okta-support-setting-object)

### Request Example

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/privacy/oktaSupport/grant"
```

### Response Example

```json
{
    "support": "ENABLED",
    "expiration": "2021-01-24T11:13:14.000Z",
    "_links": {
        "extend": {
            "href": "http://okta.okta.com/api/v1/org/privacy/oktaSupport/extend",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "revoke": {
            "href": "http://okta.okta.com/api/v1/org/privacy/oktaSupport/revoke",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

## Extend Okta Support 

<ApiOperation method="post" url="/api/v1/org/privacy/oktaSupport/extend" />

Extend Okta Support for your organization, extends expiration by 24 hours. 

### Response Parameters

Fetched [Okta Support Setting Object](#okta-support-setting-object)

### Request Example

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/privacy/oktaSupport/extend"
```

### Response Example

```json
{
    "support": "ENABLED",
    "expiration": "2021-01-25T11:13:14.000Z",
    "_links": {
        "extend": {
            "href": "http://okta.okta.com/api/v1/org/privacy/oktaSupport/extend",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "revoke": {
            "href": "http://okta.okta.com/api/v1/org/privacy/oktaSupport/revoke",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

## Revoke Okta Support 

<ApiOperation method="post" url="/api/v1/org/privacy/oktaSupport/revoke" />

Revoke Okta Support for your organization.

### Response Parameters

Fetched [Okta Support Setting Object](#okta-support-setting-object)

### Request Example

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/privacy/oktaSupport/revoke"
```

### Response Example

```json
{
    "support": "DISABLED",
    "expiration": null,
    "_links": {
        "grant": {
            "href": "http://okta.okta.com/api/v1/org/privacy/oktaSupport/grant",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

## Get Okta Communication Settings

<ApiOperation method="get" url="/api/v1/org/privacy/oktaCommunication" />

Gets your Organization's Okta Communication settings.

### Response Parameters

Fetched [Okta Communication Setting Object](#okta-communication-setting-object)

### Request Example

```
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/privacy/oktaCommunication"
```

### Response Example

```json
{
    "optOutEmailUsers": true,
    "_links": {
        "optIn": {
            "href": "http://okta.okta.com/api/v1/org/privacy/oktaCommunication/optIn",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

## Opt Out of Okta Communication Settings

<ApiOperation method="post" url="/api/v1/org/privacy/oktaCommunication/optOut" />

Opts out end users from Okta Communication Emails

### Response Parameters

Fetched [Okta Support Setting Object](#okta-support-setting-object)

### Request Example

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/privacy/oktaCommunication/optOut"
```

### Response Example

```json
{
    "optOutEmailUsers": true,
    "_links": {
        "optIn": {
            "href": "http://okta.okta.com/api/v1/org/privacy/oktaCommunication/optIn",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

## Opt In of Okta Communication Settings

<ApiOperation method="post" url="/api/v1/org/privacy/oktaCommunication/optIn" />

Opts in end users to Okta Communication Emails

### Response Parameters

Fetched [Okta Support Setting Object](#okta-support-setting-object)

### Request Example

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/privacy/oktaCommunication/optIn"
```

### Response Example

```json
{
    "optOutEmailUsers": false,
    "_links": {
        "optOut": {
            "href": "http://okta.okta.com/api/v1/org/privacy/oktaCommunication/optOut",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

## Get Org Preferences
<ApiOperation method="get" url="/api/v1/org/preferences" />

Gets your Organization's Preferences. 

### Response Parameters

Fetched [Okta Preference Object](#okta-preference-object)

### Request Example

```
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/preferences"
```

### Response Example

```json
{
    "showEndUserFooter": true,
    "_links": {
        "hideEndUserFooter": {
            "href": "http://okta.okta.com/api/v1/org/preferences/hideEndUserFooter",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

## Show End User Page Footer
<ApiOperation method="post" url="/api/v1/org/preferences/showEndUserFooter" />

Show end user footer for End User Page

### Response Parameters

Fetched [Okta Preference Object](#okta-preference-object)

### Request Example

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/preferences/showEndUserFooter"
```

### Response Example

```json
{
    "showEndUserFooter": true,
    "_links": {
        "hideEndUserFooter": {
            "href": "http://okta.okta.com/api/v1/org/preferences/hideEndUserFooter",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```


## Hide End User Page Footer
<ApiOperation method="post" url="/api/v1/org/preferences/hideEndUserFooter" />

Hide end user footer for End User Page

### Response Parameters

Fetched [Okta Preference Object](#okta-preference-object)

### Request Example

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/preferences/hideEndUserFooter"
```

### Response Example

```json
{
    "showEndUserFooter": false,
    "_links": {
        "hideEndUserFooter": {
            "href": "http://okta.okta.com/api/v1/org/preferences/showEndUserFooter",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

## Org object

### Examples

#### Sample Org

```json
{
    "id": "00ou8s5wploBwX4710g3",
    "subdomain": "okta",
    "companyName": "Okta",
    "status": "ACTIVE",
    "expiresAt": null,
    "created": "2020-10-26T15:03:08.000Z",
    "lastUpdated": "2021-01-20T21:02:28.000Z",
    "website": "http://okta.com",
    "phoneNumber": "+1-555-415-1337",
    "endUserSupportHelpURL": "https://support.okta.com",
    "supportPhoneNumber": "+1-555-514-1337",
    "address1": "301 Brannan St.",
    "address2": "Unit 100",
    "city": "San Francisco",
    "state": "California",
    "country": "United States of America",
    "postalCode": "94107",
    "_links": {
        "preferences": {
            "href": "http://okta.okta.com/api/v1/org/preferences"
        },
        "uploadLogo": {
            "href": "http://okta.okta.com/api/v1/org/logo",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "oktaCommunication": {
            "href": "http://okta.okta.com/api/v1/org/privacy/oktaCommunication"
        },
        "logo": {
            "href": "http://okta.okta.com/bc/image/fileStoreRecord?id=fs02ju1ejvy2Cv2Yx0g4"
        },
        "oktaSupport": {
            "href": "http://okta.okta.com/api/v1/org/privacy/oktaSupport"
        },
        "contacts": {
            "href": "http://okta.okta.com/api/v1/org/contacts"
        }
    }
}
```
### Org properties

The Org object defines several properties:

| Property              | Description                               | DataType                                                       | Nullable | Unique | Read Only |
|-----------------------|-------------------------------------------|----------------------------------------------------------------|----------|--------|-----------|
| address1              | address1 of Org                           | String                                                         | TRUE     | FALSE  | FALSE     |
| address2              | address2 of Org                           | String                                                         | TRUE     | FALSE  | FALSE     |
| city                  | city of Org                               | String                                                         | TRUE     | FALSE  | FALSE     |
| companyName           | name of Org                               | String                                                         | FALSE    | TRUE   | FALSE     |
| country               | county of Org                             | String                                                         | TRUE     | FALSE  | FALSE     |
| created               | When Org was Created                      | Date                                                           | FALSE    | FALSE  | TRUE      |
| endUserSupportHelpURL | support Link for Org                      | String                                                         | TRUE     | FALSE  | FALSE     |
| expiresAt             | Expiration of Org                         | Date                                                           | TRUE     | FALSE  | TRUE      |
| id                    | Id of Org                                 | String                                                         | FALSE    | TRUE   | TRUE      |
| lastUpdated           | When Org was last Updated                 | Date                                                           | FALSE    | FALSE  | TRUE      |
| phoneNumber           | org Phone Number                          | String                                                         | TRUE     | FALSE  | FALSE     |
| postalCode            | postal code of Org                        | String                                                         | TRUE     | FALSE  | FALSE     |
| state                 | state of Org                              | String                                                         | TRUE     | FALSE  | FALSE     |
| status                | status of Org                             | String                                                         | FALSE    | FALSE  | FALSE     |
| subdomain             | subdomain of Org                          | String                                                         | TRUE     | TRUE   | FALSE     |
| supportPhoneNumber    | Support Help Phone for Org                | String                                                         | TRUE     | FALSE  | FALSE     |
| website               | the org wbsite                            | String                                                         | TRUE     | FALSE  | FALSE     |
| _links                | Discoverable resources related to the Org | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | FALSE    | FALSE  | TRUE      |

## Contact Types

Currently we support two contact types `BILLING` and `Technical`

| Contact type                  | Label                               |
| :---------------------------- | :---------------------------------- |
| `BILLING`                     | The billing contact of your Org     |
| `TECHNICAL`                   | The technical contact of your Org   |

## Contact User Object

The Contact User Object defines several properties: 

### Contact Properties

| Property  | Description                                  | DataType                                                       | Nullable | Unique | Read Only |
|-----------|----------------------------------------------|----------------------------------------------------------------|----------|--------|-----------|
| userId    | id of User                                   | String                                                         | FALSE    | TRUE   | FALSE     |
| _links    | Discoverable resources related to the Object | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | FALSE    | FALSE  | TRUE      |

## Okta Support Setting Object

The Okta Support Setting Object defines several properties:

| Property    | Description                                  | DataType                                                       | Nullable | Unique | Read Only |
|-------------|----------------------------------------------|----------------------------------------------------------------|----------|--------|-----------|
| support     | status of Okta Support Setting               | `DISABLED`, `ENABLED`	                                      | FALSE    | FALSE  | TRUE      |
| expiration  | expiration of Okta Support Setting           | Date        	                                                  | TRUE     | FALSE  | TRUE      |
| _links      | Discoverable resources related to the Object | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | FALSE    | FALSE  | TRUE      |

## Okta Communication Setting Object

The Okta Communication Setting Object defines several properties:

| Property         | Description                                  | DataType                                                       | Nullable | Unique | Read Only |
|------------------|----------------------------------------------|----------------------------------------------------------------|----------|--------|-----------|
| optOutEmailUsers | End User do not receive Okta Emails          | Boolean                                                        | FALSE    | FALSE  | TRUE      |
| _links           | Discoverable resources related to the Object | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | FALSE    | FALSE  | TRUE      |

## Okta Preferences Object

The Okta Preferences Object defines several properties:

| Property          | Description                                  | DataType                                                       | Nullable | Unique | Read Only |
|-------------------|----------------------------------------------|----------------------------------------------------------------|----------|--------|-----------|
| showEndUserFooter | Show Footer on End User page                 | Boolean                                                        | FALSE    | FALSE  | TRUE      |
| _links            | Discoverable resources related to the Object | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | FALSE    | FALSE  | TRUE      |
