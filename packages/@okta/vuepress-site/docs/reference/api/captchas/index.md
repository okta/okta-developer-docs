---
title: CAPTCHAs
category: management
---

<ApiLifecycle access="ie" /><br>

> **Limited GA:** Okta Identity Engine is under Limited General Availability (LGA) and currently available only to a selected audience.

> **Note:** This feature is only available as a part of the Okta Identity Engine. Please [contact support](mailto:dev-inquiries@okta.com) for further information.

# CAPTCHAs API

As an option to increase org security, Okta supports CAPTCHA services to prevent automated sign-in attempts. You can integrate either of two providers: [hCaptcha](https://www.hcaptcha.com/) or [reCAPTCHA v2](https://developers.google.com/recaptcha/docs/invisible).

The vendor implementations supported by Okta are both invisible; they each run risk-analysis software in the background during sign in to determine the likelihood that the user is a bot. This risk-analysis is based on the settings that you configure with the provider you choose.

The Okta CAPTCHAs API provides operations to manage CAPTCHAs and org-wide CAPTCHA settings.
* [CAPTCHAs](#captcha-operations)
* [Org-wide CAPTCHA settings](#org-wide-captcha-settings-operations)

## Get started
Before you configure your org to use CAPTCHA, sign in to the vendor of your choice or sign up for an account. For more details, please refer to [CAPTCHA integration]( https://help.okta.com/okta_help.htm?type=oie&id=csh-captcha)

Explore the CAPTCHAs API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c51413d80cc8e88fd101?action=collection%2Fimport)

## CAPTCHA operations

The CAPTCHAs API has the following CRUD operations:

* [Create CAPTCHA](#create-captcha)
* [Get CAPTCHA](#get-captcha)
* [Get all CAPTCHAs](#get-all-captchas)
* [Update CAPTCHA](#update-captcha)
* [Delete CAPTCHA](#delete-captcha)

### Create CAPTCHA

<ApiOperation method="post" url="/api/v1/captchas" />

Creates a CAPTCHA object

> **Note:** One organization can only have one CAPTCHA provider configured at a time.

#### Request path parameters
N/A

#### Request query parameters
N/A

#### Request body

The [CAPTCHA](#captcha-object)

#### Response body

Returns a [CAPTCHA Response](#captcharesponse-object).

#### Use example

This request creates a CAPTCHA object:

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "myReCaptcha",
  "siteKey": "copy_your_site_key",
  "secretKey": "copy_your_secret_key",
  "type": "RECAPTCHA_V2"
}' "https://${yourOktaDomain}/api/v1/captchas"
```

##### Response

```http
HTTP/1.1 201 Created
Content-Type: application/json
```

```json
{
  "id": "cap18c2Ey3iR9BLDb0g4",
  "name": "myReCaptcha",
  "siteKey": "6LeVzVIaAAAAAHCbhZ-uxTihGl7iuufxEF_dMH-x",
  "type": "RECAPTCHA_V2",
  "_links": {
    "self": {
      "href": "http://${yourOktaDomain}/api/v1/captchas/cap18c2Ey3iR9BLDb0g4",
      "hints": {
        "allow": [
          "GET",
          "POST",
          "PUT",
          "DELETE"
        ]
      }
    }
  }
}
```

#### Error example
The following request would return an error when the org already has a CAPTCHA.

##### Request
```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "myReCaptcha2",
  "siteKey": "copy_your_site_key",
  "secretKey": "copy_your_secret_key",
  "type": "RECAPTCHA_V2"
}' "https://${yourOktaDomain}/api/v1/captchas"
```

##### Response
```http
HTTP/1.1 403 Forbidden
Content-Type: application/json
```

```json
{
  "errorCode": "E0000166",
  "errorSummary": "CAPTCHA count limit reached. At most one CAPTCHA instance is allowed per Org. Please remove existing CAPTCHA to create a new one.",
  "errorLink": "E0000166",
  "errorId": "oaeujx4SxU6S-Gc6HvPnpG2MQ",
  "errorCauses": [
    {
      "errorSummary": "CAPTCHA count limit reached. At most one CAPTCHA instance is allowed per Org. Please remove existing CAPTCHA to create a new one.",
      "reason": "EXCEEDS_MAX_VALUE",
      "locationType": "url",
      "domain": "captcha"
    }
  ]
}
```

### Get CAPTCHA

<ApiOperation method="get" url="/api/v1/captchas/{id}" />

Fetches a CAPTCHA by `id`.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `id `       | String (URL)        | Required. ID of a CAPTCHA. |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

The requested [CAPTCHA Response](#captcha-response-object)

#### Use example

This example returns a CAPTCHA object by id:

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/captchas/{id}"
```

##### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "id": "cap18c2Ey3iR9BLDb0g4",
  "name": "myReCaptcha",
  "siteKey": "6LeVzVIaAAAAAHCbhZ-uxTihGl7iuufxEF_dMH-x",
  "type": "RECAPTCHA_V2",
  "_links": {
    "self": {
      "href": "http://${yourOktaDomain}/api/v1/captchas/cap18c2Ey3iR9BLDb0g4",
      "hints": {
        "allow": [
          "GET",
          "POST",
          "PUT",
          "DELETE"
        ]
      }
    }
  }
}
```

### Get all CAPTCHAs

<ApiOperation method="get" url="/api/v1/captchas" />

List all CAPTCHAs for the org.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Array of [CAPTCHA Response](#captcha-response-object)

#### Use example

This example returns all CAPTCHAs in the org:

> **Note:** Currently, there's only one CAPTCHA per org.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/captchas"
```

##### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
[
  {
    "id": "cap18c2Ey3iR9BLDb0g4",
    "name": "myReCaptcha",
    "siteKey": "6LeVzVIaAAAAAHCbhZ-uxTihGl7iuufxEF_dMH-x",
    "type": "RECAPTCHA_V2",
    "_links": {
      "self": {
        "href": "http://${yourOktaDomain}/api/v1/captchas/cap18c2Ey3iR9BLDb0g4",
        "hints": {
          "allow": [
            "GET",
            "POST",
            "PUT",
            "DELETE"
          ]
        }
      }
    }
  }
]
```

### Update CAPTCHA

<ApiOperation method="put" url="/api/v1/captchas/{id}" />
<ApiOperation method="post" url="/api/v1/captchas/{id}" />

Update a CAPTCHA by `id`.

> **Note:** Use the `POST` method for partial updates.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `id `       | String (URL)       | Required. ID of a CAPTCHA.  |

#### Request query parameters

N/A

#### Request body

The [CAPTCHA](#captcha-object)

#### Response body

Returns updated [CAPTCHA Response](#captcha-response-object).

#### Use example

This example fully updates a CAPTCHA with the `PUT` method:

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "myReCaptcha",
  "siteKey": "copy_your_site_key",
  "secretKey": "copy_your_secret_key",
  "type": "RECAPTCHA_V2"
}' "https://${yourOktaDomain}/api/v1/captchas/{id}"
```

##### Response
```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "id": "cap18c2Ey3iR9BLDb0g4",
  "name": "myReCaptcha",
  "siteKey": "6LeVzVIaAAAAAHCbhZ-uxTihGl7iuufxEF_dMH-x",
  "type": "RECAPTCHA_V2",
  "_links": {
    "self": {
      "href": "http://${yourOktaDomain}/api/v1/captchas/cap18c2Ey3iR9BLDb0g4",
      "hints": {
        "allow": [
          "GET",
          "POST",
          "PUT",
          "DELETE"
        ]
      }
    }
  }
}
```

This example partially updates a CAPTCHA with the `POST` method:

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "siteKey": "new_site_key",
  "secretKey": "new_secret_key"
}' "https://${yourOktaDomain}/api/v1/captchas/{id}"
```

##### Response
```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "id": "cap18c2Ey3iR9BLDb0g4",
  "name": "myReCaptcha",
  "siteKey": "new_site_key",
  "type": "RECAPTCHA_V2",
  "_links": {
    "self": {
      "href": "http://${yourOktaDomain}/api/v1/captchas/cap18c2Ey3iR9BLDb0g4",
      "hints": {
        "allow": [
          "GET",
          "POST",
          "PUT",
          "DELETE"
        ]
      }
    }
  }
}
```

### Delete CAPTCHA

<ApiOperation method="delete" url="/api/v1/captchas/{id}" />

Permanently deletes a CAPTCHA.

> **Note:** If the CAPTCHA is associated with org-wide CAPTCHA settings, it cannot be removed before it is unassociated with the [org-wide CAPTCHA settings](#org-wide-captcha-settings-object).

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `id `       | String (URL)        | Required. ID of a CAPTCHA. |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

N/A

#### Usage example

The following request would delete a CAPTCHA with the specified `id`:

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/captcha/{id}"
```

##### Response

```http
HTTP/1.1 204 No Content
Content-Type: application/json
```
#### Error example
The following request would return an error because the CAPTCHA is associated with [org-wide CAPTCHA settings](#org-wide-captcha-settings-object).

##### Request
```bash
curl -v -X DELETE \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/captcha/{id}"
```

##### Response
```http
HTTP/1.1 403 Forbidden
Content-Type: application/json
```

```json
{
    "errorCode": "E0000168",
    "errorSummary": "CAPTCHA cannot be removed. This CAPTCHA is associated with org-wide CAPTCHA settings, please disassociate it before removing it.",
    "errorLink": "E0000168",
    "errorId": "oaeFlwI593rRXmCrGdppDyyJg",
    "errorCauses": [
        {
            "errorSummary": "CAPTCHA cannot be removed. This CAPTCHA is associated with org-wide CAPTCHA settings, please disassociate it before removing it.",
            "reason": "PROHIBITED",
            "locationType": "url",
            "domain": "captcha"
        }
    ]
}
```

## CAPTCHA API objects

### CAPTCHA object

#### CAPTCHA properties

The CAPTCHA object defines the following properties:

| Property           | Type                           | Description                                                                                                       |
| ------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `name`             | String                         | Required. Name of CAPTCHA |
| `siteKey`          | String                         | Required. Site key issued from CAPTCHA Vendor to render CAPTCHA in a page.|
| `secretKey`        | String                         | Required. Secret key issued from CAPTCHA Vendor to perform server-side validation for CAPTCHA token.|
| `type`             | String                         | Required. Type of CAPTCHA. Available Values are `HCAPTCHA` and `RECAPTCHA_V2`.|

#### CAPTCHA example

```json
{
  "name": "myHCaptcha",
  "siteKey": "copy_your_site_key",
  "secretKey": "copy_your_secret_key",
  "type": "HCAPTCHA"
}
```

### CAPTCHA Response object

#### CAPTCHA Response properties

The CAPTCHA object defines the following properties:

| Property           | Type                           | Description                                                                                                       |
| ------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `id`               | String                         | Required. Unique key for the CAPTCHA|
| `name`             | String                         | Required. Name of the CAPTCHA |
| `siteKey`          | String                         | Required. Site key issued from CAPTCHA Vendor to render CAPTCHA in a page.|
| `type`             | `HCAPTCHA`, `RECAPTCHA_V2`     | Required. Type of CAPTCHA.|
| `_links`           | [Links](#captcha-links-object)         | Link relations for this object|
#### CAPTCHA example

```json
{
  "id": "cap18c2Ey3iR9BLDb0g4",
  "name": "myReCaptcha",
  "siteKey": "your_site_key",
  "type": "RECAPTCHA_V2",
  "_links": {
    "self": {
      "href": "http://${yourOktaDomain}/api/v1/captchas/cap18c2Ey3iR9BLDb0g4",
      "hints": {
        "allow": [
          "GET",
          "POST",
          "PUT",
          "DELETE"
        ]
      }
    }
  }
}
```

### CAPTCHA Links object

Specifies link relations (see [Web Linking](http://tools.ietf.org/html/rfc8288)) available for the current status of an application using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification. This object is used for dynamic discovery of related resources and lifecycle operations. The Links object is read-only.

## Org-wide CAPTCHA settings operations

The org-wide CAPTCHA settings are used to configure which parts of the authentication flow will require users to pass the CAPTCHA logic.

The org-wide CAPTCHA settings API has the following operations:

* [Get org-wide CAPTCHA settings](#get-org-wide-captcha-settings)
* [Update org-wide CAPTCHA settings](#update-org-wide-captcha-settings)
* [Delete org-wide CAPTCHA settings](#delete-org-wide-captcha-settings)

### Get org-wide CAPTCHA settings

<ApiOperation method="get" url="/api/v1/org/captcha" />

Fetch org-wide CAPTCHA settings.

> **Note:**  If there's no org-wide CAPTCHA settings in current org, it will return an empty org-wide CAPTCHA settings.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

The requested [Org-wide CAPTCHA Setting response](#org-wide-captcha-settings-response-object)

#### Use example

This example returns org-wide CAPTCHA settings:

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/captcha"
```

##### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "enabledPages": [
    "SSR",
    "SSPR",
    "SIGN_IN"
  ],
  "captchaId": "cap18c2Ey3iR9BLDb0g4",
  "_links": {
    "captcha": {
      "href": "http://${yourOktaDomain}/api/v1/captchas/cap18c2Ey3iR9BLDb0g4",
      "hints": {
        "allow": [
          "GET",
          "POST",
          "PUT",
          "DELETE"
        ]
      }
    },
    "self": {
      "href": "http://${yourOktaDomain}/api/v1/org/captcha",
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

This example returns an empty org-wide CAPTCHA settings:

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/captcha"
```

##### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "enabledPages": [],
  "captchaId": null,
  "_links": {
    "self": {
      "href": "http://${yourOktaDomain}/api/v1/org/captcha",
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

### Update org-wide CAPTCHA settings

<ApiOperation method="put" url="/api/v1/org/captcha" />

Update org-wide CAPTCHA settings.

> **Note:**  `captchaId` cannot be null if `enabledPages` is null or empty.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

The [Org-wide CAPTCHA Settings](#org-wide-captcha-settings-object) to update.

#### Response body

The updated [Org-wide CAPTCHA Settings response](#org-wide-captcha-settings-response-object)

#### Use example

This example enables CAPTCHA on self-service password recovery and sign-in pages by setting `enabledPages` with `SSPR` and `SIGN_IN`:

##### Request

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "captchaId": "cap18c2Ey3iR9BLDb0g4",
    "enabledPages": ["SSPR", "SIGN_IN"]
}' "https://${yourOktaDomain}/api/v1/org/captcha"
```

##### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "enabledPages": [
    "SSPR",
    "SIGN_IN"
  ],
  "captchaId": "cap18c2Ey3iR9BLDb0g4",
  "_links": {
    "captcha": {
      "href": "http://${yourOktaDomain}/api/v1/captchas/cap18c2Ey3iR9BLDb0g4",
      "hints": {
        "allow": [
          "GET",
          "POST",
          "PUT",
          "DELETE"
        ]
      }
    },
    "self": {
      "href": "http://${yourOktaDomain}/api/v1/org/captcha",
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

This example disables CAPTCHA org-wide by setting `captchaId` and `enabledPages` as `null`:

##### Request

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "captchaId": null,
    "enabledPages": null
}' "https://${yourOktaDomain}/api/v1/org/captcha"
```

##### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "enabledPages": [],
  "captchaId": null,
  "_links": {
    "self": {
      "href": "http://${yourOktaDomain}/api/v1/org/captcha",
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

#### Error example
The following request would return error when updated `captchaId` is null but `enabledPages` is not empty.

##### Request
```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "captchaId": null,
    "enabledPages": ["SSR"]
}' "https://${yourOktaDomain}/api/v1/org/captcha"
```

##### Response
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
```

```json
{
  "errorCode": "E0000001",
  "errorSummary": "Api validation failed: captchaId",
  "errorLink": "E0000001",
  "errorId": "oae-hk3rssXQmOWDRsaFfxe8A",
  "errorCauses": [
    {
      "errorSummary": "captchaId: Invalid CAPTCHA ID. The value of captchaId cannot be blank when enabledPages is not empty. Please resubmit with an existing CAPTCHA ID or disable CAPTCHA support on all supported pages."
    }
  ]
}
```

### Delete Org-wide CAPTCHA settings

<ApiOperation method="delete" url="/api/v1/org/captcha" />

Permanently delete the Org-wide CAPTCHA settings object.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

N/A

#### Usage example

The following request would delete Org-wide CAPTCHA Settings:

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/org/captcha"
```

##### Response

```http
HTTP/1.1 204 No Content
Content-Type: application/json
```

## Org-wide CAPTCHA settings API objects

### Org-wide CAPTCHA settings object

#### Org-wide CAPTCHA settings properties

| Property           | Type                           | Description                                                                                                       |
| ------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `captchaId`        | String                         | Required. Unique key of assigned CAPTCHA|
| `enabledPages`     | `SSR`, `SSPR`,`SIGN_IN`        | Required. Array of pages that have CAPTCHA enabled.|

Available values for `enabledPages`:

| CAPTCHA-enabled Page | Description |
| -------------------- | ----------- |
| `SSR` | Self-service Registration |
| `SSPR`| Self-service Password Recovery |
| `SIGN_IN`| User login page |

#### Org-wide CAPTCHA settings example

```json
{
  "captchaId": "cap18c2Ey3iR9BLDb0g4",
  "enabledPages": ["SSPR", "SIGN_IN", "SSR"]
}
```

### Org-wide CAPTCHA settings Response object

#### Org-wide CAPTCHA settings Response properties
Property           | Type                             | Description                                                                                                       |
| ------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `captchaId`        | String                         | Required. Unique key of assigned CAPTCHA|
| `enabledPages`     | `SSR`, `SSPR`,`SIGN_IN`        | Required. Array of pages that have CAPTCHA enabled.|
| `_links`           | [Links](#org-wide-captcha-links-object) | Link relations for this object|

#### CAPTCHA example
```json
{
    "enabledPages": [
        "SSPR"
    ],
    "captchaId": "cap18c2Ey3iR9BLDb0g4",
    "_links": {
        "captcha": {
            "href": "http://${yourOktaDomain}/api/v1/captchas/cap18c2Ey3iR9BLDb0g4",
            "hints": {
                "allow": [
                    "GET",
                    "POST",
                    "PUT",
                    "DELETE"
                ]
            }
        },
        "self": {
            "href": "http://${yourOktaDomain}/api/v1/org/captcha",
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

### Org-wide CAPTCHA Links object

Specifies link relations (see [Web Linking](http://tools.ietf.org/html/rfc8288)) available for the current status of an application using the [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification. This object is used for dynamic discovery of related resources and lifecycle operations. The Links object is read-only.
