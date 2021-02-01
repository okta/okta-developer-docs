
---
title: Org
category: management
---

# Org API

<ApiLifecycle access="ea" />

The Okta Org API provides operations to manage your org account settings such as contact information, granting Okta Support access, and more.

## Org Operations

The Org Setting API has the following CRUD operations:

* [Get Org Settings](#get-org-settings)
* [Update Org Settings](#update-org-settings)

### Get Org Settings

<ApiOperation method="get" url="/api/v1/org" />

Gets your Org's Settings

#### Request path parameters
N/A

#### Request query parameters
N/A

#### Request body 
N/A

#### Response body

The [Org Setting](#org-setting-object)

#### Usage examples

The following request returns the [Org Setting object](#org-setting-object).

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org"
```

##### Response

```json
{
    "id": "00ou8s5wploBwX4710g3",
    "subdomain": "okta",
    "companyName": "Okta",
    "status": "ACTIVE",
    "expiresAt": null,
    "created": "2020-10-26T15:03:08.000Z",
    "lastUpdated": "2021-01-20T21:02:28.000Z",
    "website": "https://okta.com",
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
            "href": "https://${yourOktaDomain}.com/api/v1/org/preferences"
        },
        "uploadLogo": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/logo",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "oktaCommunication": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/privacy/oktaCommunication"
        },
        "logo": {
            "href": "https://${yourOktaDomain}.com/bc/image/fileStoreRecord?id=fs02ju1ejvy2Cv2Yx0g4"
        },
        "oktaSupport": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/privacy/oktaSupport"
        },
        "contacts": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/contacts"
        }
    }
}
```
### Update Org Settings

> **Note:** Use the `POST` method to make a partial update and the `PUT` method to make a full update.

<ApiOperation method="put" url="/api/v1/org" />

<ApiOperation method="post" url="/api/v1/org" />

Updates your organization's current settings

You must specify all Org Setting properties when you update an org's profile with a `PUT` method. Any property not specified in the request is deleted.

> **Note:**: Don't use the `PUT` method for partial updates.

#### Request path parameters
N/A

#### Request query parameters
N/A

#### Request body 
The desired [Org Setting](#org-setting-object)

#### Response body

The applied [Org Setting](#org-setting-object)

#### Usage examples

The following request updates the org with the requested settings.

##### Request

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "companyName": "Okta",
    "website": "https://okta.com",
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
#### Response 

```json
{
    "id": "00ou8s5wploBwX4710g3",
    "subdomain": "okta",
    "companyName": "Okta",
    "status": "ACTIVE",
    "expiresAt": null,
    "created": "2020-10-26T15:03:08.000Z",
    "lastUpdated": "2021-01-20T21:02:28.000Z",
    "website": "https://okta.com",
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
            "href": "https://${yourOktaDomain}.com/api/v1/org/preferences"
        },
        "uploadLogo": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/logo",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "oktaCommunication": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/privacy/oktaCommunication"
        },
        "logo": {
            "href": "https://${yourOktaDomain}.com/bc/image/fileStoreRecord?id=fs02ju1ejvy2Cv2Yx0g4"
        },
        "oktaSupport": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/privacy/oktaSupport"
        },
        "contacts": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/contacts"
        }
    }
}
```
## Org Contact operations

The Org Contact API has the following CRUD operations:

* [Get Contact Types](#get-contact-types)
* [Get User of Contact Type](#get-user-of-contact-type)
* [Update User of Contact Type](#update-user-of-contact-type)


### Get Contact Types

<ApiOperation method="get" url="/api/v1/org/contacts" />

Gets your Org's Contact Types

#### Request path parameters
N/A

#### Request query parameters
N/A

#### Request body 
N/A

#### Response body

The [Contact Type](#contact-type-object)

#### Usage examples

The following request retrieves the supported Org Contact Types.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/contacts"
```

##### Response

```json
[
    {
        "contactType": "BILLING",
        "_links": {
            "billing": {
                "href": "https://${yourOktaDomain}.com/api/v1/org/contacts/billing"
            }
        }
    },
    {
        "contactType": "TECHNICAL",
        "_links": {
            "technical": {
                "href": "https://${yourOktaDomain}.com/api/v1/org/contacts/technical"
            }
        }
    }
]
```

### Get User of Contact Type

<ApiOperation method="get" url="/api/v1/org/contacts/${contactType}" />

Retrieves the URL of the User associated with the specified Contact Type

#### Request path parameters

| Parameter        | Type                           | Description                                              |  
| :--------------- | :----------------------------- | :------------------------------------------------------- | 
| `contactType`    | String                         | Type of Contact. Accepted values: `BILLING`, `TECHNICAL` |   
      
#### Request query parameters

N/A

#### Request body 

N/A

#### Response body

The [Contact User](#contact-user-object)

#### Usage examples

The following request retrieves the User associated with the given `${contactType}`.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/contacts/${contactType}"
```

##### Response 

```json
{
    "userId": "00uuibMot2FBByTbs0g3",
    "_links": {
        "user": {
            "href": "https://${yourOktaDomain}.com/api/v1/users/00uuibMot2FBByTbs0g3"
        }
    }
}
```

### Update User of Contact Type

<ApiOperation method="put" url="/api/v1/org/contacts/${contactType}" />

Updates the User associated with the the specified Contact Type

#### Request path parameters

| Parameter        | Type                           | Description                                              |  
| :--------------- | :----------------------------- | :------------------------------------------------------- | 
| `contactType`    | String                         | Type of Contact. Accepted values: `BILLING`, `TECHNICAL` |   
      
#### Request query parameters

N/A

#### Request body 

| Property         | Type     | Description     |  
| :--------------- | :------- | :-------------- | 
| `userId`         | String   | A User's ID     |   

#### Response body

The [Contact Type](#contact-type-object)

An invalid `userId` returns a `404 Not Found` status code.

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

#### Usage examples

The following request updates the User associated with the given `${contactType}`.

##### Request 

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "userId": "00uuibMot2FBByTbs0g3
}' "https://${yourOktaDomain}/api/v1/org/contacts/${contactType}"
```

##### Response 

```json
{
    "userId": "00uuibMot2FBByTbs0g3",
    "_links": {
        "user": {
            "href": "https://${yourOktaDomain}.com/api/v1/users/00uuibMot2FBByTbs0g3"
        }
    }
}
```

## Org Logo operations

The Org Logo API has the following CRUD operations:

* [Upload Logo for org](#upload-logo-for-org)

### Upload Logo for Org

<ApiOperation method="post" url="/api/v1/org/logo" />

Updates the logo for your org

#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

| Property | Type | Description                                                                                                                                                                                               |
|----------|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `file`   | File | The file must be in PNG, JPG, or GIF format and less than 1 MB in size. For best results use landscape orientation, a transparent background, and a minimum size of 420px by 120px to prevent upscaling. |

#### Response body

Returns `201 Created`

#### Usage examples

The following request updates the Org Logo with the uploaded file. 

##### Request 

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
-F 'file=@/path/to/file' \
"https://${yourOktaDomain}/api/v1/org/logo"
```

#### Response 

```
HTTP/1.1 201 Content Created
Location: https://${yourOktaDomain}/bc/image/fileStoreRecord?id=fs01hfslJH2m3qUOe0g4
```

## Okta Support operations

The Org Support API has the following CRUD operations:

* [Get Okta Support settings](#get-okta-support-settings)
* [Grant Okta Support](#grant-okta-support)
* [Extend Okta Support](#extend-okta-support)
* [Revoke Okta Support Settings](#revoke-okta-support)

### Get Okta Support Settings

<ApiOperation method="get" url="/api/v1/org/privacy/oktaSupport" />

Gets your org's Okta Support Settings

#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Fetched [Okta Support Setting](#okta-support-setting-object)

#### Usage examples

The following request retrieves the org's Support Setting.

##### Request 

```
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/privacy/oktaSupport"
```

##### Response 
```json
{
    "support": "ENABLED",
    "expiration": "2021-01-24T11:13:14.000Z",
    "_links": {
        "extend": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/privacy/oktaSupport/extend",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "revoke": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/privacy/oktaSupport/revoke",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Grant Okta Support 

<ApiOperation method="post" url="/api/v1/org/privacy/oktaSupport/grant" />

Enables the option to temporarily allow Okta Support to access your org as an administrator for eight hours

#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Fetched [Okta Support Setting](#okta-support-setting-object)

#### Usage examples

The following request grants Okta Support to the org.

##### Request

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/privacy/oktaSupport/grant"
```

##### Response

```json
{
    "support": "ENABLED",
    "expiration": "2021-01-24T11:13:14.000Z",
    "_links": {
        "extend": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/privacy/oktaSupport/extend",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "revoke": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/privacy/oktaSupport/revoke",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Extend Okta Support 

<ApiOperation method="post" url="/api/v1/org/privacy/oktaSupport/extend" />

Extends the length of time that Okta Support can access your org by 24 hours. This means that 24 hours are added to the remaining access time. 

#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Fetched [Okta Support Setting](#okta-support-setting-object)

#### Usage examples

The following request extends Okta Support to the org for 24 hours.

##### Request example

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/privacy/oktaSupport/extend"
```

##### Response Example

```json
{
    "support": "ENABLED",
    "expiration": "2021-01-25T11:13:14.000Z",
    "_links": {
        "extend": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/privacy/oktaSupport/extend",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "revoke": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/privacy/oktaSupport/revoke",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Revoke Okta Support 

<ApiOperation method="post" url="/api/v1/org/privacy/oktaSupport/revoke" />

Revokes Okta Support access to your org


#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Fetched [Okta Support Setting](#okta-support-setting-object)

#### Usage examples

The following request revokes Okta Support to the org.

##### Request example

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/privacy/oktaSupport/revoke"
```

##### Response Example

```json
{
    "support": "DISABLED",
    "expiration": null,
    "_links": {
        "grant": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/privacy/oktaSupport/grant",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

## Okta Communication operations

The Org Communication API has the following CRUD operations:

* [Get Okta Communication Settings](#get-okta-communication-settings)
* [Opt out of Okta Communications](#opt-out-of-okta-communications)
* [Opt in to Okta Communications](#opt-in-to-okta-communications)

### Get Okta Communication Settings

<ApiOperation method="get" url="/api/v1/org/privacy/oktaCommunication" />

Gets your organization's Okta Communication Settings.

#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Fetched [Okta Communication Setting](#okta-communication-setting-object)

#### Usage examples

The following request retrieves the org's Okta Communication Setting. 

##### Request

```
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/privacy/oktaCommunication"
```

##### Response

```json
{
    "optOutEmailUsers": true,
    "_links": {
        "optIn": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/privacy/oktaCommunication/optIn",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Opt out of Okta Communications

<ApiOperation method="post" url="/api/v1/org/privacy/oktaCommunication/optOut" />

Opts out all users of this org from Okta Communication emails

#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Fetched [Okta Communication Setting](#okta-communication-setting-object)

#### Usage examples

The following request opts the org's users out of Okta Communication emails.  

##### Request 

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/privacy/oktaCommunication/optOut"
```

##### Response

```json
{
    "optOutEmailUsers": true,
    "_links": {
        "optIn": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/privacy/oktaCommunication/optIn",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Opt in to Okta Communications

<ApiOperation method="post" url="/api/v1/org/privacy/oktaCommunication/optIn" />

Opts in all of this org's users to Okta Communication emails.

#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Fetched [Okta Communication Setting](#okta-communication-setting-object)

#### Usage examples

The following request opts in all of the org's users to Okta Communication emails.

##### Request

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/privacy/oktaCommunication/optIn"
```

##### Response

```json
{
    "optOutEmailUsers": false,
    "_links": {
        "optOut": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/privacy/oktaCommunication/optOut",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```
## Org Preference operations

The Org Preference API has the following CRUD operations:

* [Get Org Preferences](#get-org-preferences)
* [Show end-user page footer](#show-end-user-page-footer)
* [Hide end-user page footer](#hide-end-user-page-footer)

### Get Org Preferences
<ApiOperation method="get" url="/api/v1/org/preferences" />

Gets your Organization's Preferences. 

#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Fetched [Org Preferences](#org-preferences-object)

#### Usage examples

The following request retrieves the Org Preferences. 

##### Request

```
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/preferences"
```

##### Response

```json
{
    "showEndUserFooter": true,
    "_links": {
        "hideEndUserFooter": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/preferences/hideEndUserFooter",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Show end-user page footer
<ApiOperation method="post" url="/api/v1/org/preferences/showEndUserFooter" />

Makes the Okta UI footer visible for all of your org's end users

#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Fetched [Org Preferences](#org-preferences-object)

#### Usage examples

The following request shows the footer for the end-user page. 

##### Request 
```
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/preferences/showEndUserFooter"
```

##### Response 

```json
{
    "showEndUserFooter": true,
    "_links": {
        "hideEndUserFooter": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/preferences/hideEndUserFooter",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Hide end-user page footer
<ApiOperation method="post" url="/api/v1/org/preferences/hideEndUserFooter" />

Hides the Okta UI footer for all of your org's end-users

#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Fetched [Org Preferences](#org-preferences-object)

#### Usage examples

The following request hides the footer for the end-user page. 

#### Request 

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/preferences/hideEndUserFooter"
```

#### Response

```json
{
    "showEndUserFooter": false,
    "_links": {
        "hideEndUserFooter": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/preferences/showEndUserFooter",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

## Org API objects

### Org Setting object

#### Org Setting properties

The Org Setting object defines several properties:

| Property                | Type                                                           | Description                                                         |
|-------------------------|----------------------------------------------------------------|---------------------------------------------------------------------|
| `_links`                | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object                                      |
| `address1`              | String                                                         | Primary address of org                                  |
| `address2`              | String                                                         | Secondary address of org                                |
| `city`                  | String                                                         | City of org                                                         |
| `country`               | String                                                         | County of org                                                       |
| `created`               | String (ISO-8601)                                              | When org was created (read-only)                                    |
| `endUserSupportHelpURL` | String                                                         | Support link of org                                                 |
| `expiresAt`             | String (ISO-8601)                                              | Expiration of org (read-only)                                       |
| `id`                    | String                                                         | Id of org (read-only)                                               |
| `lastUpdated`           | String (ISO-8601)                                              | When org was last updated (read-only)                               |
| `name`                  | String                                                         | Name of org                                                         |
| `phoneNumber`           | String                                                         | Phone number of org                                                 |
| `postalCode`            | String                                                         | Postal code of org                                                  |
| `state`                 | String                                                         | State of org                                                        |
| `status`                | String                                                         | Status of org.  Accepted values: `ACTIVE`, `INACTIVE` (read-only)   |
| `subdomain`             | String                                                         | Subdomain of org (read-only)                                        |
| `supportPhoneNumber`    | String                                                         | Support help phone of org                                           |
| `website`               | String                                                         | The org's website                                                   |



#### Org Setting example
```json
{
    "id": "00ou8s5wploBwX4710g3",
    "subdomain": "okta",
    "companyName": "Okta",
    "status": "ACTIVE",
    "expiresAt": null,
    "created": "2020-10-26T15:03:08.000Z",
    "lastUpdated": "2021-01-20T21:02:28.000Z",
    "website": "https://okta.com",
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
            "href": "https://${yourOktaDomain}.com/api/v1/org/preferences"
        },
        "uploadLogo": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/logo",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "oktaCommunication": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/privacy/oktaCommunication"
        },
        "logo": {
            "href": "https://${yourOktaDomain}.com/bc/image/fileStoreRecord?id=fs02ju1ejvy2Cv2Yx0g4"
        },
        "oktaSupport": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/privacy/oktaSupport"
        },
        "contacts": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/contacts"
        }
    }
}
```
### Contact Type object

#### Contact Type properties

The Contact Type object defines several properties:

| Property                | Type                                                           | Description                                             |
|-------------------------|----------------------------------------------------------------|---------------------------------------------------------|
| `_links`                | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object                          |
| contactType             | String                                                         | Type of contact. Accepted values: `BILLING`, `TECHNICAL`|

#### Contact Type example
```json
{
        "contactType": "TECHNICAL",
        "_links": {
            "technical": {
                "href": "https://${yourOktaDomain}.com/api/v1/org/contacts/technical"
            }
        }
    } 

```
### Contact User object

The Contact User object defines several properties: 

#### Contact User properties

| Property                | Type                                                           | Description                           |
|-------------------------|----------------------------------------------------------------|---------------------------------------|
| `_links`                | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object        |
| `userId`                | String                                                         | ID of associated User                 |  

#### Contact Type example
```json
{
        "userId": "TECHNICAL",
        "_links": {
            "technical": {
                "href": "https://${yourOktaDomain}.com/api/v1/org/contacts/technical"
            }
        }
    } 

```

### Okta Support Setting object

The Okta Support Setting object defines several properties:

#### Okta Support Setting properties

| Property                | Type                                                           | Description                                                           |
|-------------------------|----------------------------------------------------------------|-----------------------------------------------------------------------|
| `_links`                | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object                                        |
| `expiration`            | String (ISO-8601)                                              | Expiration of Okta Support (nullable)                                 |
| support                 | String                                                         | Status of Okta Support Setting. Accepted values: `ENABLED`, `DISABLED`|


#### Okta Support Setting example 
```json
{
    "support": "ENABLED",
    "expiration": "2021-01-24T11:13:14.000Z",
    "_links": {
        "extend": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/privacy/oktaSupport/extend",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        },
        "revoke": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/privacy/oktaSupport/revoke",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Okta Communication Setting object

The Okta Communication Setting object defines several properties:

#### Okta Communication Setting properties

| Property                | Type                                                           | Description                                                         |
|-------------------------|----------------------------------------------------------------|-------------------------------------------------------------------- |
| `_links`                | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object                                      |
| `optOutEmailUsers`      | Boolean                                                        | Indicates whether the org's users receive Okta Communication emails |

#### Okta Communication Setting example

```json
{
    "optOutEmailUsers": true,
    "_links": {
        "optIn": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/privacy/oktaCommunication/optIn",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```

### Org Preferences object

The Org Preferences object defines several properties:

#### Org Preferences Properties

| Property                | Type                                                           | Description                            |
|-------------------------|----------------------------------------------------------------|--------------------------------------- |
| `_links`                | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object         |
| `showEndUserFooter`     | Boolean                                                        | Show footer on end-user page           |

#### Org Preferences example

```json
{
    "showEndUserFooter": true,
    "_links": {
        "hideEndUserFooter": {
            "href": "https://${yourOktaDomain}.com/api/v1/org/preferences/hideEndUserFooter",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}
```