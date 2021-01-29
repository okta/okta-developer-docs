
---
title: Org
category: management
---

# Org API

<ApiLifecycle access="ea" />

The Okta Org API provides operations to manage your org account settings such as contact information, granting Okta Support access, and more.

## Org Operations

The Org Setting API has the following CRUD operations:

* [Get Org Setting](#get-org-setting)
* [Update Org Setting](#update-org-setting)

### Get Org settings

<ApiOperation method="get" url="/api/v1/org" />

Gets your Org's settings.

#### Request path parameters
N/A

#### Request query parameters
N/A

#### Request body 
N/A

#### Response body

The [Org Setting](#org-setting-object)

#### Usage Examples

The following request would return the [Org Setting Object](#org-setting-object)

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
### Update Org Setting

> **Note:** Use the `POST` method to make a partial update and the `PUT` method to make a full update.

<ApiOperation method="put" url="/api/v1/org" />

<ApiOperation method="post" url="/api/v1/org" />

Updates your Organization's current settings

All org setting properties must be specified when updating an Org's profile with a `PUT` method. Any property not specified in the request is deleted.

>**Note:**: Don't use `PUT` method for partial updates.

#### Request path parameters
N/A

#### Request query parameters
N/A

#### Request body 
The desired [Org Setting](#org-setting-object)

#### Response body

The applied [Org Setting](#org-setting-object)

#### Usage Examples

The following request would update the Org with these desired settings.

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
## Org Contact Operations

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

#### Usage Examples

The following request would retrieve the supported Org Contact Types.

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

Retrieves the URL of the User associated with the specified Contact Type.

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

#### Usage Examples

The following request would retrieve the User associated with the given `${contactType}`.

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

Updates the User associated with the the specified Contact Type.

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

#### Usage Examples

The following request would update the User associated with the given `${contactType}`.

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

## Org Logo Operations

The Org Logo API has the following CRUD operations:

* [Upload Logo for Org](#upload-logo-for-org)

### Upload Logo for Org

<ApiOperation method="post" url="/api/v1/org/logo" />

Update the logo for your org.

#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

| Property | Type | Description                                                                                                                                                                                               |
|----------|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `file`   | File | The file must be in PNG, JPG, or GIF format, and less than 1 MB in size. For best results use landscape orientation, a transparent background, and a minimum size of 420px by 120px to prevent upscaling. |

#### Response body

Returns `201 Created`

#### Usage Examples

The following request would update the Org Logo with the uploaded file. 

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

## Okta Support Operations

The Org Support API has the following CRUD operations:

* [Get Okta Support Settings](#get-okta-support-settings)
* [Grant Okta Support](#grant-okta-support)
* [Extend Okta Support](#extend-okta-support)
* [Revoke Okta Support Settings](#revoke-okta-support)

### Get Okta Support Settings

<ApiOperation method="get" url="/api/v1/org/privacy/oktaSupport" />

Gets your Org's Okta Support settings.

#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Fetched [Okta Support Setting](#okta-support-setting-object)

#### Usage Examples

The following request would retrieve the Org's Support Setting.

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

Enables the option to temporarily allow Okta Support to access your org as an administrator for 8 hours.

#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Fetched [Okta Support Setting](#okta-support-setting-object)

#### Usage Examples

The following request would grant Okta Support to the Org.

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

Extend the length of time Okta Support can access to your org by 24 hours. This means 24 hours are added to the remaining access time. 

#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Fetched [Okta Support Setting](#okta-support-setting-object)

#### Example Usages

The following request would extend Okta Support to the org for 24 hours.

##### Request Example

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

Revoke Okta Support access to your org.


#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Fetched [Okta Support Setting](#okta-support-setting-object)

#### Usage Examples

The following request would revoke Okta Support to the Org.

##### Request Example

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

## Okta Communication Operations

The Org Communication API has the following CRUD operations:

* [Get Okta Communication Settings](#get-okta-communication-settings)
* [Opt Out of Okta Communications](#opt-out-of-okta-communications)
* [Opt In to Okta Communications](#opt-in-to-okta-communications)

### Get Okta Communication Settings

<ApiOperation method="get" url="/api/v1/org/privacy/oktaCommunication" />

Gets your Organization's Okta Communication settings.

#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Fetched [Okta Communication Setting](#okta-communication-setting-object)

#### Usage Examples

The following request would retrieve the Org's Okta Communication Setting. 

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

### Opt Out of Okta Communications

<ApiOperation method="post" url="/api/v1/org/privacy/oktaCommunication/optOut" />

Opts out all users of this org from Okta Communication Emails.

#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Fetched [Okta Communication Setting](#okta-communication-setting-object)

#### Usage Examples

The following request would opt the org's users out of Okta Communication Emails.  

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

### Opt In to Okta Communications

<ApiOperation method="post" url="/api/v1/org/privacy/oktaCommunication/optIn" />

Opts in all of this org's users to Okta Communication Emails.

#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Fetched [Okta Communication Setting](#okta-communication-setting-object)

#### Usage Examples

The following request would opt in all of the Org's Users to Okta Communication Emails.

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
## Org Preference Operations

The Org Communication API has the following CRUD operations:

* [Get Org Preferences](#get-org-preferences)
* [Show End User Page Footer](#show-end-user-page-footer)
* [Hide End User Page Footer](#hide-end-user-page-footer)

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

#### Usage Examples

The following request would retrieve the Org's Preferences. 

##### Request Example

```
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/preferences"
```

##### Response Example

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

### Show End User Page Footer
<ApiOperation method="post" url="/api/v1/org/preferences/showEndUserFooter" />

Makes the Okta UI footer visible for all of your org's end users.

#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Fetched [Org Preferences](#org-preferences-object)

#### Usage Examples

The following request would show the footer for the end user page. 

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

### Hide End User Page Footer
<ApiOperation method="post" url="/api/v1/org/preferences/hideEndUserFooter" />

Hides the Okta UI footer for all of your org's end users.

#### Request path parameters

N/A
      
#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Fetched [Org Preferences](#org-preferences-object)

#### Usage Examples

The following request would hide the footer for the end user page. 

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

## Org API Objects

### Org Setting object

#### Org Setting properties

The Org Setting object defines several properties:

| Property                | Type                                                           | Description                                                         |
|-------------------------|----------------------------------------------------------------|---------------------------------------------------------------------|
| `_links`                | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object                                      |
| `address1`              | String                                                         | Primary Address Information of Org                                  |
| `address2`              | String                                                         | Secondary Address Information of Org                                |
| `city`                  | String                                                         | City of Org                                                         |
| `country`               | String                                                         | County of Org                                                       |
| `created`               | String (ISO-8601)                                              | When Org was Created (Read-only)                                    |
| `endUserSupportHelpURL` | String                                                         | Support Link for Org                                                |
| `expiresAt`             | String (ISO-8601)                                              | Expiration of Org (Read-only)                                       |
| `id`                    | String                                                         | Id of Org (Read-only)                                               |
| `lastUpdated`           | String (ISO-8601)                                              | When Org was last Updated (Read-only)                               |
| `name`                  | String                                                         | Name of Org                                                         |
| `phoneNumber`           | String                                                         | Org Phone Number                                                    |
| `postalCode`            | String                                                         | Postal code of Org                                                  |
| `state`                 | String                                                         | State of Org                                                        |
| `status`                | String                                                         | Status of Org.  Accepted values: `ACTIVE`, `INACTIVE` (Read-only)   |
| `subdomain`             | String                                                         | Subdomain of Org (Read-only)                                        |
| `supportPhoneNumber`    | String                                                         | Support Help Phone for Org                                          |
| `website`               | String                                                         | The Org website                                                     |



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
### Contact User Object

The Contact User Object defines several properties: 

#### Contact User Properties

| Property                | Type                                                           | Description                           |
|-------------------------|----------------------------------------------------------------|---------------------------------------|
| `_links`                | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object        |
| `userId`                | String                                                         | Id of associated User                 |  

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

#### Okta Support Setting Properties

| Property                | Type                                                           | Description                                                           |
|-------------------------|----------------------------------------------------------------|-----------------------------------------------------------------------|
| `_links`                | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object                                        |
| `expiration`            | String (ISO-8601)                                              | Expiration of Okta Support (Nullable)                                 |
| support                 | String                                                         | Status of Okta Support Setting. Accepted values: `ENABLED`, `DISABLED`|


#### Okta Support Setting Example 
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

#### Okta Communication Setting Properties

| Property                | Type                                                           | Description                                                     |
|-------------------------|----------------------------------------------------------------|---------------------------------------------------------------- |
| `_links`                | [JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06) | Link relations for this object                                  |
| `optOutEmailUsers`      | Boolean                                                        | Indicates whether org's users receive Okta Communication Emails |

#### Okta Communication Setting Example

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
| `showEndUserFooter`     | Boolean                                                        | Show Footer on End User page           |

#### Org Preferences Example

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