---
title: CAPTCHAs
category: management
---

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" />

> **Note:** This feature is only available as a part of Okta Identity Engine. [Contact support](mailto:dev-inquiries@okta.com) for further information.

As an option to increase org security, Okta supports CAPTCHA services to prevent automated sign-in attempts. You can integrate one of two providers: [hCaptcha](https://www.hcaptcha.com/) or [reCAPTCHA v2](https://developers.google.com/recaptcha/docs/invisible).

The vendor implementations supported by Okta are both invisible. They each run risk-analysis software in the background during user sign in to determine the likelihood that the user is a bot. This risk analysis is based on the settings that you configure with the provider that you choose.

The Okta CAPTCHAs API provides operations to manage CAPTCHAs and Org-wide CAPTCHA Settings.

* [CAPTCHAs](#captcha-operations)
* [Org-wide CAPTCHA Settings](#org-wide-captcha-settings-operations)

## Get started

Before you configure your org to use CAPTCHA, sign in to the vendor of your choice or sign up for an account. For more details, refer to [CAPTCHA integration](https://help.okta.com/okta_help.htm?type=oie&id=csh-captcha).

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

> **Note:** One organization can have only one CAPTCHA provider configured at a time.

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

The following request returns an error when the org already has a CAPTCHA.

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

Fetches a CAPTCHA by `id`

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `id `       | String (URL)        | ID of a CAPTCHA |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

The requested [CAPTCHA Response](#captcha-response-object)

#### Use example

The following example returns a CAPTCHA object by ID:

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

List all CAPTCHAs for the org

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Array of the [CAPTCHA Response](#captcha-response-object)

#### Use example

The following example returns all CAPTCHAs in the org.

> **Note:** Currently, only one CAPTCHA per org is supported.

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

Updates a CAPTCHA by `id`

> **Note:** Use the `POST` method for partial updates.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `id `       | String (URL)       | ID of a CAPTCHA  |

#### Request query parameters

N/A

#### Request body

The [CAPTCHA](#captcha-object)

#### Response body

Returns an updated [CAPTCHA Response](#captcha-response-object)

#### Use example

The following example fully updates a CAPTCHA with the `PUT` method.

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

The following example partially updates a CAPTCHA with the `POST` method.

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

Permanently deletes a CAPTCHA

> **Note:** If the CAPTCHA is associated with Org-wide CAPTCHA Settings, you can't remove it before it's unassociated with the [Org-wide CAPTCHA Settings](#org-wide-captcha-settings-object).

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `id `       | String (URL)        | ID of a CAPTCHA |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

N/A

#### Usage example

The following request deletes a CAPTCHA with the specified `id`.

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

The following request returns an error because the CAPTCHA is associated with [Org-wide CAPTCHA Settings](#org-wide-captcha-settings-object).

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
| `name`             | String                         | Name of CAPTCHA |
| `siteKey`          | String                         | Site key issued from the CAPTCHA vendor to render a CAPTCHA on a page|
| `secretKey`        | String                         | Secret key issued from the CAPTCHA vendor to perform server-side validation for a CAPTCHA token|
| `type`             | String                         | Type of CAPTCHA. Supported values: `HCAPTCHA` and `RECAPTCHA_V2`|

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
| `id`               | String                         | Unique key for the CAPTCHA|
| `name`             | String                         | Name of the CAPTCHA |
| `siteKey`          | String                         | Site key issued from the CAPTCHA vendor to render a CAPTCHA on a page|
| `type`             | `HCAPTCHA`, `RECAPTCHA_V2`     | Type of CAPTCHA|
| `_links`           | [Links](#captcha-links-object) | Link relations for this object|

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

## Org-wide CAPTCHA Settings operations

The Org-wide CAPTCHA Settings are used to configure which parts of the authentication flow requires users to pass the CAPTCHA logic.

The Org-wide CAPTCHA Settings API has the following operations:

* [Get Org-wide CAPTCHA Settings](#get-org-wide-captcha-settings)
* [Update Org-wide CAPTCHA Settings](#update-org-wide-captcha-settings)
* [Delete Org-wide CAPTCHA Settings](#delete-org-wide-captcha-settings)

### Get Org-wide CAPTCHA Settings

<ApiOperation method="get" url="/api/v1/org/captcha" />

Fetch Org-wide CAPTCHA Settings

> **Note:**  If there's no Org-wide CAPTCHA Settings in the current org, empty Org-wide CAPTCHA Settings are returned.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

The requested [Org-wide CAPTCHA Settings response](#org-wide-captcha-settings-response-object)

#### Use example

The following example returns Org-wide CAPTCHA Settings.

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

The following example returns empty Org-wide CAPTCHA Settings.

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

### Update Org-wide CAPTCHA Settings

<ApiOperation method="put" url="/api/v1/org/captcha" />

Updates Org-wide CAPTCHA Settings

> **Note:** `captchaId` can't be null if `enabledPages` is null or empty.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

The [Org-wide CAPTCHA Settings](#org-wide-captcha-settings-object) to update

#### Response body

The updated [Org-wide CAPTCHA Settings response](#org-wide-captcha-settings-response-object)

#### Use example

The following example enables CAPTCHA on self-service password recovery and sign-in pages by setting `enabledPages` with `SSPR` and `SIGN_IN`.

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

The following example disables CAPTCHA org-wide by setting `captchaId` and `enabledPages` to `null`.

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

The following request returns an error when the updated `captchaId` is null but `enabledPages` isn't empty.

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

### Delete Org-wide CAPTCHA Settings

<ApiOperation method="delete" url="/api/v1/org/captcha" />

Permanently deletes the Org-wide CAPTCHA Settings object

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

N/A

#### Use example

The following request deletes Org-wide CAPTCHA Settings.

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

## Org-wide CAPTCHA Settings API objects

### Org-wide CAPTCHA Settings object

#### Org-wide CAPTCHA Settings properties

| Property           | Type                           | Description                                                                                                       |
| ------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `captchaId`        | String                         | Unique key of the assigned CAPTCHA|
| `enabledPages`     | `SSR`, `SSPR`,`SIGN_IN`        | Array of pages that have CAPTCHA enabled|

Available values for `enabledPages`:

| CAPTCHA-enabled Page | Description |
| -------------------- | ----------- |
| `SSR` | Self-service Registration |
| `SSPR`| Self-service Password Recovery |
| `SIGN_IN`| User sign-in page |

#### Org-wide CAPTCHA Settings example

```json
{
  "captchaId": "cap18c2Ey3iR9BLDb0g4",
  "enabledPages": ["SSPR", "SIGN_IN", "SSR"]
}
```

### Org-wide CAPTCHA Settings Response object

#### Org-wide CAPTCHA Settings Response properties

Property           | Type                             | Description                                                                                                       |
| ------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `captchaId`        | String                         | Unique key of assigned CAPTCHA|
| `enabledPages`     | `SSR`, `SSPR`,`SIGN_IN`        | Array of pages that have CAPTCHA enabled|
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
