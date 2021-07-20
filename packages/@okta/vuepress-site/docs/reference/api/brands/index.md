---
title: Brands
category: management
---

# Brands API

The Okta Brands API provides operations to manage branding for your organization.

## Getting Started

Explore the Brands API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1d58ab8a3909dd6a3cfb)

## Brand Operations

The Brands API has the following CRUD operations:
* [Get Brands](#get-brands)
* [Get Brand](#get-brand)
* [Update Brand](#update-brand)

### Get Brands

<ApiOperation method="get" url="/api/v1/brands" />

List all the brands in your org

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Array of the [Brand Response](#brand-response-object)

#### Use examples

The following example returns all Brands in the org.

> **Note:** Currently, only one Brand per org is supported.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/brands"
```

##### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
[
  {
    "id": "bndul904tTZ6kWVhP0g3",
    "customPrivacyPolicyUrl": null,
    "_links": {
      "themes": {
        "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3",
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

### Get Brand

<ApiOperation method="get" url="/api/v1/brands/{brandId}" />

Fetches a brand by `brandId`

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `brandId` | String (URL)| ID of a Brand |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

The requested [Brand Response](#brand-response-object)

Passing an invalid `brandId` returns a `404 Not Found` status code with error code `E0000007`.

#### Use examples

The following example returns a Brand object by ID:

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/brands/{brandId}"
```

##### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "id": "bndul904tTZ6kWVhP0g3",
  "customPrivacyPolicyUrl": null,
  "_links": {
    "themes": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3",
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

### Update Brand

<ApiOperation method="put" url="/api/v1/brands/{brandId}" />

Updates a Brand by `brandId`

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `brandId` | String (URL)| ID of a Brand |

#### Request query parameters

N/A

#### Request body

The [Brand](#brand-object)

#### Response body

Returns an updated [Brand Response](#brand-response-object)

Passing an invalid `brandId` returns a `404 Not Found` status code with error code `E0000007`.

Not providing `agreeToCustomPrivacyPolicy` with `customPrivacyPolicyUrl` returns a `400 Bad Request` status code with error code `E0000001`.

#### Use examples

The following example updates a custom privacy policy URL.

##### Request

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "agreeToCustomPrivacyPolicy": true,
  "customPrivacyPolicyUrl": "https://www.someHost.com/privacy-policy"
}' "https://${yourOktaDomain}/api/v1/brands/{brandId}"
```

##### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "id": "bndul904tTZ6kWVhP0g3",
  "customPrivacyPolicyUrl": "https://www.someHost.com/privacy-policy",
  "_links": {
    "themes": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3",
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

The following example resets privacy policy URL to use to Okta default privacy policy URL.

##### Request

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "customPrivacyPolicyUrl": null
}' "https://${yourOktaDomain}/api/v1/brands/{brandId}"
```

##### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "id": "bndul904tTZ6kWVhP0g3",
  "customPrivacyPolicyUrl": null,
  "_links": {
    "themes": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3",
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

The following example shows invalid URL validation.

##### Request

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "customPrivacyPolicyUrl": "randomValue"
}' "https://${yourOktaDomain}/api/v1/brands/{brandId}"
```

##### Response

```http
HTTP/1.1 400 BAD REQUEST
Content-Type: application/json
```

```json
{
  "errorCode": "E0000001",
  "errorSummary": "Api validation failed: customPrivacyPolicyUrl",
  "errorLink": "E0000001",
  "errorId": "oaeqEUQ0u06QrO-0rDPpz3j6w",
  "errorCauses": [
    {
      "errorSummary": "customPrivacyPolicyUrl: Is not a valid URL. Valid example: http://www.okta.com"
    }
  ]
}
```

The following example shows consent required validation.

##### Request

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "customPrivacyPolicyUrl": "https://www.someHost.com/privacy-policy"
}' "https://${yourOktaDomain}/api/v1/brands/{brandId}"
```

##### Response

```http
HTTP/1.1 400 BAD REQUEST
Content-Type: application/json
```

```json
{
  "errorCode": "E0000001",
  "errorSummary": "Api validation failed: agreeToCustomPrivacyPolicy",
  "errorLink": "E0000001",
  "errorId": "oae3uLW0D8wTwmiVdZokrnpAA",
  "errorCauses": [
    {
      "errorSummary": "agreeToCustomPrivacyPolicy: Please provide your consent for updating the custom privacy policy URL."
    }
  ]
}
```

## Theme Operations

The Themes API has the following CRUD operations:

* [Get Themes](#get-themes)
* [Get Theme](#get-theme)
* [Update Theme](#update-theme)
* [Upload Theme Logo](#upload-theme-logo)
* [Delete Theme Logo](#delete-theme-logo)
* [Upload Theme Favicon](#upload-theme-favicon)
* [Delete Theme Favicon](#delete-theme-favicon)
* [Upload Theme Background Image](#upload-theme-background-image)
* [Delete Theme Background Image](#delete-theme-background-image)

### Get Themes

<ApiOperation method="get" url="/api/v1/brands/{brandId}/themes" />

List all the themes in your brand

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `brandId` | String (URL)| ID of a Brand |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

Array of the [Theme Response](#theme-response-object)

Passing an invalid `brandId` returns a `404 Not Found` status code with error code `E0000007`.

#### Use examples

The following example returns all Themes in the Brand.

> **Note:** Currently, only one Theme per Brand is supported.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/brands/{brandId}/themes"
```

##### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
[
  {
    "id": "thdul904tTZ6kWVhP0g3",
    "logo": "https://${yourOktaDomain}/assets/img/logos/okta-logo.47066819ac7db5c13f4c431b2687cef6.png",
    "favicon": "https://${yourOktaDomain}/favicon.ico",
    "backgroundImage": null,
    "primaryColorHex": "#1662dd",
    "primaryColorContrastHex": "#000000",
    "secondaryColorHex": "#ebebed",
    "secondaryColorContrastHex": "#000000",
    "signInPageTouchPointVariant": "OKTA_DEFAULT",
    "endUserDashboardTouchPointVariant": "OKTA_DEFAULT",
    "errorPageTouchPointVariant": "OKTA_DEFAULT",
    "emailTemplateTouchPointVariant": "OKTA_DEFAULT",
    "_links": {
      "favicon": {
        "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/favicon",
        "hints": {
          "allow": [
            "POST",
            "DELETE"
          ]
        }
      },
      "self": {
        "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3",
        "hints": {
          "allow": [
            "GET",
            "PUT"
          ]
        }
      },
      "logo": {
        "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/logo",
        "hints": {
          "allow": [
            "POST",
            "DELETE"
          ]
        }
      },
      "background-image": {
        "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/background-image",
        "hints": {
          "allow": [
            "POST",
            "DELETE"
          ]
        }
      }
    }
  }
]
```

### Get Theme

<ApiOperation method="get" url="/api/v1/brands/{brandId}/themes/{themeId}" />

Fetches a Theme for a Brand

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `brandId` | String (URL)| ID of a Brand |
| `themeId` | String (URL)| ID of a Theme |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

The requested [Theme Response](#theme-response-object)

Passing an invalid `brandId` returns a `404 Not Found` status code with error code `E0000007`.

Passing an invalid `themeId` returns a `404 Not Found` status code with error code `E0000007`.

#### Use examples

The following example returns a Theme object:

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/brands/{brandId}/themes/{themeId}"
```

##### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "id": "thdul904tTZ6kWVhP0g3",
  "logo": "https://${yourOktaDomain}/assets/img/logos/okta-logo.47066819ac7db5c13f4c431b2687cef6.png",
  "favicon": "https://${yourOktaDomain}/favicon.ico",
  "backgroundImage": null,
  "primaryColorHex": "#1662dd",
  "primaryColorContrastHex": "#000000",
  "secondaryColorHex": "#ebebed",
  "secondaryColorContrastHex": "#000000",
  "signInPageTouchPointVariant": "OKTA_DEFAULT",
  "endUserDashboardTouchPointVariant": "OKTA_DEFAULT",
  "errorPageTouchPointVariant": "OKTA_DEFAULT",
  "emailTemplateTouchPointVariant": "OKTA_DEFAULT",
  "_links": {
    "favicon": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/favicon",
      "hints": {
        "allow": [
          "POST",
          "DELETE"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3",
      "hints": {
        "allow": [
          "GET",
          "PUT"
        ]
      }
    },
    "logo": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/logo",
      "hints": {
        "allow": [
          "POST",
          "DELETE"
        ]
      }
    },
    "background-image": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/background-image",
      "hints": {
        "allow": [
          "POST",
          "DELETE"
        ]
      }
    }
  }
}
```

### Update Theme

<ApiOperation method="put" url="/api/v1/brands/{brandId}/themes/{themeId}" />

Updates a Theme for a Brand

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `brandId` | String (URL)| ID of a Brand |
| `themeId` | String (URL)| ID of a Theme |

#### Request query parameters

N/A

#### Request body

The [Theme](#theme-object)

#### Response body

Returns an updated [Theme Response](#theme-response-object)

Passing an invalid `brandId` returns a `404 Not Found` status code with error code `E0000007`.

Passing an invalid `themeId` returns a `404 Not Found` status code with error code `E0000007`.

Passing invalid body parameters returns a `400 Bad Request` status code with error code `E0000001`.

#### Use examples

The following example updates Theme properties.

##### Request

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "primaryColorHex": "#1662dd",
    "secondaryColorHex": "#ebebed",
    "signInPageTouchPointVariant": "OKTA_DEFAULT",
    "endUserDashboardTouchPointVariant": "OKTA_DEFAULT",
    "errorPageTouchPointVariant": "OKTA_DEFAULT",
    "emailTemplateTouchPointVariant": "OKTA_DEFAULT"
}' "https://${yourOktaDomain}/api/v1/brands/{brandId}/themes/{themeId}"
```

##### Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "id": "thdul904tTZ6kWVhP0g3",
  "logo": "https://${yourOktaDomain}/assets/img/logos/okta-logo.47066819ac7db5c13f4c431b2687cef6.png",
  "favicon": "https://${yourOktaDomain}/favicon.ico",
  "backgroundImage": null,
  "primaryColorHex": "#1662dd",
  "primaryColorContrastHex": "#000000",
  "secondaryColorHex": "#ebebed",
  "secondaryColorContrastHex": "#000000",
  "signInPageTouchPointVariant": "OKTA_DEFAULT",
  "endUserDashboardTouchPointVariant": "OKTA_DEFAULT",
  "errorPageTouchPointVariant": "OKTA_DEFAULT",
  "emailTemplateTouchPointVariant": "OKTA_DEFAULT",
  "_links": {
    "favicon": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/favicon",
      "hints": {
        "allow": [
          "POST",
          "DELETE"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3",
      "hints": {
        "allow": [
          "GET",
          "PUT"
        ]
      }
    },
    "logo": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/logo",
      "hints": {
        "allow": [
          "POST",
          "DELETE"
        ]
      }
    },
    "background-image": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/background-image",
      "hints": {
        "allow": [
          "POST",
          "DELETE"
        ]
      }
    }
  }
}
```

The following example shows validation errors.

##### Request

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
    "primaryColorHex": "#16",
    "secondaryColorHex": "#eb",
    "signInPageTouchPointVariant": "OKTA_DEFAULT_RANDOM",
    "endUserDashboardTouchPointVariant": "OKTA_DEFAULT_RANDOM",
    "errorPageTouchPointVariant": "OKTA_DEFAULT_RANDOM",
    "emailTemplateTouchPointVariant": "OKTA_DEFAULT_RANDOM"
}' "https://${yourOktaDomain}/api/v1/brands/{brandId}/themes/{themeId}"
```

##### Response

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed: primaryColorHex",
    "errorLink": "E0000001",
    "errorId": "oaezPopg5T7SbSuITpM1yz7Vg",
    "errorCauses": [
        {
            "errorSummary": "primaryColorHex: Invalid color hex: #16."
        },
        {
            "errorSummary": "secondaryColorHex: Invalid color hex: #eb."
        },
        {
            "errorSummary": "signInPageTouchPointVariant: 'OKTA_DEFAULT_RANDOM' is invalid. Valid values: [OKTA_DEFAULT, BACKGROUND_SECONDARY_COLOR, BACKGROUND_IMAGE]."
        },
        {
            "errorSummary": "errorPageTouchPointVariant: 'OKTA_DEFAULT_RANDOM' is invalid. Valid values: [OKTA_DEFAULT, BACKGROUND_SECONDARY_COLOR, BACKGROUND_IMAGE]."
        },
        {
            "errorSummary": "emailTemplateTouchPointVariant: 'OKTA_DEFAULT_RANDOM' is invalid. Valid values: [OKTA_DEFAULT, FULL_THEME]."
        },
        {
            "errorSummary": "endUserDashboardTouchPointVariant: 'OKTA_DEFAULT_RANDOM' is invalid. Valid values: [OKTA_DEFAULT, WHITE_LOGO_BACKGROUND, FULL_THEME]."
        }
    ]
}
```

### Upload Theme Logo

<ApiOperation method="post" url="/api/v1/brands/{brandId}/themes/{themeId}/logo" />

Updates the Logo for your Theme

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `brandId` | String (URL)| ID of a Brand |
| `themeId` | String (URL)| ID of a Theme |

#### Request query parameters

N/A

#### Request body

| Property | Type | Description                                                                                                                                                                                               |
|----------|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `file`   | File | The file must be in PNG, JPG, or GIF format and less than 1 MB in size. For best results use landscape orientation, a transparent background, and a minimum size of 420px by 120px to prevent upscaling. |

#### Response body

Returns `201 Created` with [Logo URL](#image-upload-response-object)

Passing an invalid `brandId` returns a `404 Not Found` status code with error code `E0000007`.

Passing an invalid `themeId` returns a `404 Not Found` status code with error code `E0000007`.

Passing an invalid `file` returns a `400 Bad Request` status code with error code `E0000001`.

#### Use examples

The following request updates the Theme Logo with the uploaded file.

##### Request

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
-F 'file=@/path/to/file' \
"https://${yourOktaDomain}/api/v1/brands/{brandId}/themes/{themeId}/logo"
```

#### Response

```http
HTTP/1.1 201 Content Created
Content-Type: application/json
```

```json
{
  "url": "https://${yourOktaDomain}/bc/image/fileStoreRecord?id=fs09yfpj6PnWzgzIQ0g4"
}
```

The following request shows invalid Logo validations.

##### Request

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
-F 'file=@/path/to/invalid-file' \
"https://${yourOktaDomain}/api/v1/brands/{brandId}/themes/{themeId}/logo"
```

#### Response

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
```

```json
{
  "errorCode": "E0000001",
  "errorSummary": "Api validation failed: file",
  "errorLink": "E0000001",
  "errorId": "oaeuDAe4dpETauG5euWTEqxLQ",
  "errorCauses": [
    {
      "errorSummary": "Your selected image is 4,158kB, which exceeds the 1,024kB limit"
    },
    {
      "errorSummary": "Your selected image is 5,568 pixels wide, which exceeds the 3,840 pixel limit"
    },
    {
      "errorSummary": "Your selected image is 11,136 pixels high, which exceeds the 2,160 pixel limit"
    }
  ]
}
```

### Delete Theme Logo

<ApiOperation method="delete" url="/api/v1/brands/{brandId}/themes/{themeId}/logo" />

Deletes a Theme Logo and org will use Okta default Logo.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `brandId` | String (URL)| ID of a Brand |
| `themeId` | String (URL)| ID of a Theme |

##### Response body

None.

Passing an invalid `brandId` returns a `404 Not Found` status code with error code `E0000007`.

Passing an invalid `themeId` returns a `404 Not Found` status code with error code `E0000007`.

#### Use examples

The following request removes the uploaded Theme Logo.

##### Request

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/brands/{brandId}/themes/{themeId}/logo"
```

##### Response

```http
HTTP/1.1 204 No Content
```

### Upload Theme Favicon

<ApiOperation method="post" url="/api/v1/brands/{brandId}/themes/{themeId}/favicon" />

Updates the favicon for your theme

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

| Property | Type | Description                                                                                                                                                                                               |
|----------|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `file`   | File | The file must be in PNG, or ICO format and must be in 1:1 ratio with maximum 512 x 512 dimensions |

#### Response body

Returns `201 Created` with [Favicon URL](#image-upload-response-object)

Passing an invalid `brandId` returns a `404 Not Found` status code with error code `E0000007`.

Passing an invalid `themeId` returns a `404 Not Found` status code with error code `E0000007`.

Passing an invalid `file` returns a `400 Bad Request` status code with error code `E0000001`.

#### Use examples

The following request updates the Theme Favicon with the uploaded file.

##### Request

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
-F 'file=@/path/to/file' \
"https://${yourOktaDomain}/api/v1/brands/{brandId}/themes/{themeId}/favicon"
```

#### Response

```http
HTTP/1.1 201 Content Created
Content-Type: application/json
```

```json
{
  "url": "https://${yourOktaDomain}/bc/image/fileStoreRecord?id=fs09yfpj6PnWzgzIQ0g4"
}
```

The following request shows invalid Favicon dimensions validations.

##### Request

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
-F 'file=@/path/to/invalid-file' \
"https://${yourOktaDomain}/api/v1/brands/{brandId}/themes/{themeId}/favicon"
```

#### Response

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
```

```json
{
  "errorCode": "E0000001",
  "errorSummary": "Api validation failed: file",
  "errorLink": "E0000001",
  "errorId": "oae-71S2vP_TWWqdCVEndqHCw",
  "errorCauses": [
    {
      "errorSummary": "Your selected image should be in 1:1 ratio for width and height. found 199 x 200, it should be 199 x 199 or 200 x 200"
    }
  ]
}
```

### Delete Theme Favicon

<ApiOperation method="delete" url="/api/v1/brands/{brandId}/themes/{themeId}/favicon" />

Deletes a Theme Favicon and org will use Okta default Favicon.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `brandId` | String (URL)| ID of a Brand |
| `themeId` | String (URL)| ID of a Theme |

#### Response body

None.

Passing an invalid `brandId` returns a `404 Not Found` status code with error code `E0000007`.

Passing an invalid `themeId` returns a `404 Not Found` status code with error code `E0000007`.

#### Use examples

The following request removes the uploaded Theme Favicon.

##### Request

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/brands/{brandId}/themes/{themeId}/favicon"
```

##### Response

```http
HTTP/1.1 204 No Content
```

### Upload Theme Background Image

<ApiOperation method="post" url="/api/v1/brands/{brandId}/themes/{themeId}/background-image" />

Updates the Background Image for your theme

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

| Property | Type | Description                                                                                                                                                                                               |
|----------|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `file`   | File | The image must be a png, jpg, or gif file, and be less than 2MB in size. |

#### Response body

Returns `201 Created` with [Background Image URL](#image-upload-response-object)

Passing an invalid `brandId` returns a `404 Not Found` status code with error code `E0000007`.

Passing an invalid `themeId` returns a `404 Not Found` status code with error code `E0000007`.

Passing an invalid `file` returns a `400 Bad Request` status code with error code `E0000001`.

#### Use examples

The following request updates the Theme Background Image with the uploaded file.

##### Request

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
-F 'file=@/path/to/file' \
"https://${yourOktaDomain}/api/v1/brands/{brandId}/themes/{themeId}/background-image"
```

#### Response

```http
HTTP/1.1 201 Content Created
Content-Type: application/json
```

```json
{
  "url": "https://${yourOktaDomain}/bc/image/fileStoreRecord?id=fs09yfpj6PnWzgzIQ0g4"
}
```

The following request shows background image validations.

##### Request

```
curl -v -X POST \
-H "Accept: application/json" \
-H "Authorization: SSWS ${api_token}" \
-F 'file=@/path/to/invalid-file' \
"https://${yourOktaDomain}/api/v1/brands/{brandId}/themes/{themeId}/background-image"
```

#### Response

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
```

```json
{
  "errorCode": "E0000001",
  "errorSummary": "Api validation failed: file",
  "errorLink": "E0000001",
  "errorId": "oae_eZ88QUzReSZcxI_e1H9Aw",
  "errorCauses": [
    {
      "errorSummary": "Your selected image is 11,136 pixels high, which exceeds the 8,000 pixel limit"
    }
  ]
}
```

### Delete Theme Background Image

<ApiOperation method="delete" url="/api/v1/brands/{brandId}/themes/{themeId}/background-image" />

Deletes a Theme Background Image.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `brandId` | String (URL)| ID of a Brand |
| `themeId` | String (URL)| ID of a Theme |

##### Response body

None.

Passing an invalid `brandId` returns a `404 Not Found` status code with error code `E0000007`.

Passing an invalid `themeId` returns a `404 Not Found` status code with error code `E0000007`.

#### Use examples

The following request removes the uploaded Theme Background Image.

##### Request

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/brands/{brandId}/themes/{themeId}/background-image"
```

##### Response

```http
HTTP/1.1 204 No Content
```

## Brand API Objects

### Brand Object

The Brand request object defines the following properties:

| Property                      | Type                    | Description                                                                                         |
| ----------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------- |
| `agreeToCustomPrivacyPolicy`  | boolean                 | (Optional) Consent for updating the custom privacy policy URL. Not required when resetting the URL. |
| `customPrivacyPolicyUrl`      | String                  | Custom privacy Policy URL. Default value: `null`                                                    |
| `_links`                      | [Links](#links-object)  | Link relations for this object                                                                      |

#### Brand example

Updating custom privacy policy URL for a brand.
```json
{
  "agreeToCustomPrivacyPolicy": true,
  "customPrivacyPolicyUrl": "https://www.someHost.com/privacy-policy"
}
```

Reset privacy policy URL.
```json
{
  "customPrivacyPolicyUrl": null
}
```

### Brand Response Object

The Brand Response object defines the following properties:

| Property                  | Type                    | Description                     |
| ------------------------- | ----------------------- | ------------------------------- |
| `customPrivacyPolicyUrl`  | String                  | Custom privacy Policy URL       |
| `id`                      | String                  | Brand ID                        |
| `_links`                  | [Links](#links-object)  | Link relations for this object  |

#### Brand Response example

```json
{
  "id": "bndul904tTZ6kWVhP0g3",
  "customPrivacyPolicyUrl": null,
  "_links": {
    "themes": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3",
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

## Theme API Objects

### Theme Object

The Theme object defines the following properties:

| Property                              | Type     | Description                                                                                                                | Default Value     |
| ------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `primaryColorHex`                     | String   | Primary color hex code.                                                                                                    | `#1662dd`         |
| `primaryColorContrastHex`             | String   | (Optional) Primary color contrast hex code. Accepted values: `#000000`, `#ffffff`.                                         | `#000000`         |
| `secondaryColorHex`                   | String   | Secondary color hex code.                                                                                                  | `#ebebed`         |
| `secondaryColorContrastHex`           | String   | (Optional) Secondary color contrast hex code. Accepted values: `#000000`, `#ffffff`.                                       | `#000000`         |
| `signInPageTouchPointVariant`         | Enum     | Variant for Sign In page touch point. Accepted values: `OKTA_DEFAULT`, `BACKGROUND_SECONDARY_COLOR`, `BACKGROUND_IMAGE`.   | `OKTA_DEFAULT`    |
| `endUserDashboardTouchPointVariant`   | Enum     | Variant for End user dashboard touch point. Accepted values: `OKTA_DEFAULT`, `WHITE_LOGO_BACKGROUND`, `FULL_THEME`.        | `OKTA_DEFAULT`    |
| `errorPageTouchPointVariant`          | Enum     | Variant for Error page touch point. Accepted values: `OKTA_DEFAULT`, `BACKGROUND_SECONDARY_COLOR`, `BACKGROUND_IMAGE`.     | `OKTA_DEFAULT`    |
| `emailTemplateTouchPointVariant`      | Enum     | Variant for Email templates touch point. Accepted values: `OKTA_DEFAULT`, `FULL_THEME`.                                    | `OKTA_DEFAULT`    |

#### Theme Touch Point Variant Definitions

##### Sign In Page Touch Point Variant:

> **Note:** For non `OKTA_DEFAULT` variant, `primaryColorHex` will be used for buttons background color and `primaryColorContrastHex` will be used to identify shade for button text

| Enum Value                      | Description                                                                                          |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `OKTA_DEFAULT`                  | Use Okta default Logo with no background image along with Okta default colors in the sign in page.   |
| `BACKGROUND_SECONDARY_COLOR`    | Use Logo from Theme with `secondaryColorHex` as background color for the sign in page.               |
| `BACKGROUND_IMAGE`              | Use Logo and background image from Theme.                                                            |

##### End User Dashboard Touch Point Variant:

| Enum Value                      | Description                                                                                                             |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `OKTA_DEFAULT`                  | Use Okta default Logo with white background color for logo and side nav bar background color.                           |
| `WHITE_LOGO_BACKGROUND`         | Use Logo from Theme with white background color for logo and use `primaryColorHex` for side nav bar background color.   |
| `FULL_THEME`                    | Use Logo from Theme and `primaryColorHex` for logo and side nav bar background color                                    |

##### Error Page Touch Point Variant:

> **Note:** For non `OKTA_DEFAULT` variant, `primaryColorHex` will be used for buttons background color and `primaryColorContrastHex` will be used to identify shade for button text

| Enum Value                      | Description                                                                                          |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `OKTA_DEFAULT`                  | Use Okta default Logo with no background image along with Okta default colors in the error page.     |
| `BACKGROUND_SECONDARY_COLOR`    | Use Logo from Theme with `secondaryColorHex` as background color for the error page.                 |
| `BACKGROUND_IMAGE`              | Use Logo and background image from Theme.                                                            |

##### Email Templates Touch Point Variant:

| Enum Value                      | Description                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------- |
| `OKTA_DEFAULT`                  | Use Okta default Logo along with Okta default colors in the email templates.    |
| `FULL_THEME`                    | Use Logo from Theme and `primaryColorHex` as background color for buttons.      |


##### Theme Example

```json
{
  "primaryColorHex": "#1662dd",
  "primaryColorContrastHex": "#ffffff",
  "secondaryColorHex": "#ebebed",
  "signInPageTouchPointVariant": "OKTA_DEFAULT",
  "endUserDashboardTouchPointVariant": "OKTA_DEFAULT",
  "errorPageTouchPointVariant": "OKTA_DEFAULT",
  "emailTemplateTouchPointVariant": "OKTA_DEFAULT"
}
```

### Theme Response Object

#### Theme Response Properties

The Theme Response object defines the following properties:

| Property                              | Type                    | Description                                 |
| ------------------------------------- | ----------------------- | ------------------------------------------- |
| `id`                                  | String                  | Theme ID                                    |
| `logo`                                | String                  | Logo URL                                    |
| `favicon`                             | String                  | Favicon URL                                 |
| `backgroundImage`                     | String                  | Background Image URL                        |
| `primaryColorHex`                     | String                  | Primary color hex code                      |
| `primaryColorContrastHex`             | String                  | Primary color contrast hex code             |
| `secondaryColorHex`                   | String                  | Secondary color hex code                    |
| `secondaryColorContrastHex`           | String                  | Secondary color contrast hex code           |
| `signInPageTouchPointVariant`         | Enum                    | Variant for Sign In page touch point        |
| `endUserDashboardTouchPointVariant`   | Enum                    | Variant for End user dashboard touch point  |
| `errorPageTouchPointVariant`          | Enum                    | Variant for Error page touch point          |
| `emailTemplateTouchPointVariant`      | Enum                    | Variant for Email templates touch point     |
| `_links`                              | [Links](#links-object)  | Link relations for this object              |

##### Theme Response Example

```json
{
  "id": "thdul904tTZ6kWVhP0g3",
  "logo": "https://${yourOktaDomain}/assets/img/logos/okta-logo.47066819ac7db5c13f4c431b2687cef6.png",
  "favicon": "https://${yourOktaDomain}/favicon.ico",
  "backgroundImage": null,
  "primaryColorHex": "#1662dd",
  "primaryColorContrastHex": "#000000",
  "secondaryColorHex": "#ebebed",
  "secondaryColorContrastHex": "#000000",
  "signInPageTouchPointVariant": "OKTA_DEFAULT",
  "endUserDashboardTouchPointVariant": "OKTA_DEFAULT",
  "errorPageTouchPointVariant": "OKTA_DEFAULT",
  "emailTemplateTouchPointVariant": "OKTA_DEFAULT",
  "_links": {
    "favicon": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/favicon",
      "hints": {
        "allow": [
          "POST",
          "DELETE"
        ]
      }
    },
    "self": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3",
      "hints": {
        "allow": [
          "GET",
          "PUT"
        ]
      }
    },
    "logo": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/logo",
      "hints": {
        "allow": [
          "POST",
          "DELETE"
        ]
      }
    },
    "background-image": {
      "href": "https://${yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/background-image",
      "hints": {
        "allow": [
          "POST",
          "DELETE"
        ]
      }
    }
  }
}
```

### Image Upload Response Object

The Image Upload Response object defines the following properties:

| Property | Type   | Description           |
|----------|------- |---------------------- |
| `url`    | String | URL of uploaded image |

#### Image Upload Response Example

```json
{
  "url": "https://${yourOktaDomain}/assets/img/logos/okta-logo.47066819ac7db5c13f4c431b2687cef6.png"
}
```

### Links object

Specifies link relations (see [Web Linking](https://tools.ietf.org/html/rfc8288)) available for the current status of an application using the [JSON Hypertext Application Language](https://tools.ietf.org/html/draft-kelly-json-hal-06) specification. This object is used for dynamic discovery of related resources and lifecycle operations. The Links object is read-only.
