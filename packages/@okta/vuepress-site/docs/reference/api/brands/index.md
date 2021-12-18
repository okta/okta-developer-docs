---
title: Brands
category: management
---

# Brands API

The Okta Brands API allows you to customize the look and feel of pages and templates, such as the Okta-hosted sign-in Page, error pages, email templates, and the Okta End-User Dashboard.

Each org starts off with Okta's default branding. You can upload your own assets (colors, background image, logo, and favicon) to replace Okta's default brand assets. You can then publish these assets directly to your pages and templates.

## Get started

Explore the Brands API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1d58ab8a3909dd6a3cfb)

## Brand operations

The Brands API has the following CRUD operations:
* [Get Brands](#get-brands)
* [Get Brand](#get-brand)
* [Update Brand](#update-brand)

### Get Brands

<ApiOperation method="get" url="/api/v1/brands" />

List all the brands in your org

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
    "removePoweredByOkta": false,
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

<ApiOperation method="get" url="/api/v1/brands/${brandId}" />

Fetches a brand by `brandId`

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `brandId` | String (URL)| ID of a Brand |

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
  "removePoweredByOkta": false,
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

<ApiOperation method="put" url="/api/v1/brands/${brandId}" />

Updates a Brand by `brandId`

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `brandId` | String (URL)| ID of a Brand |

#### Request body

The [Brand](#brand-object)

#### Response body

Returns an updated [Brand Response](#brand-response-object)

Passing an invalid `brandId` returns a `404 Not Found` status code with error code `E0000007`.

Not providing `agreeToCustomPrivacyPolicy` with `customPrivacyPolicyUrl` returns a `400 Bad Request` status code with error code `E0000001`.

`removePoweredByOkta` is optional. Default value is `false`.

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
  "removePoweredByOkta": false,
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

The following example resets a privacy policy URL to use the Okta default privacy policy URL and removes "Powered by Okta" from the Okta-hosted sign-in page, and "© 2021 Okta, Inc." from the Okta End-User Dashboard.

##### Request

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "customPrivacyPolicyUrl": null,
  "removePoweredByOkta": true
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
  "removePoweredByOkta": true,
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

## Themes operations

The Themes API has the following CRUD operations:

* [Get Themes](#get-themes)
* [Get Theme](#get-theme)
* [Update Theme](#update-theme)
* [Upload Theme logo](#upload-theme-logo)
* [Delete Theme logo](#delete-theme-logo)
* [Upload Theme favicon](#upload-theme-favicon)
* [Delete Theme favicon](#delete-theme-favicon)
* [Upload Theme background image](#upload-theme-background-image)
* [Delete Theme background image](#delete-theme-background-image)

### Get Themes

<ApiOperation method="get" url="/api/v1/brands/${brandId}/themes" />

List all the themes in your brand

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `brandId` | String (URL)| ID of a Brand |

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

<ApiOperation method="get" url="/api/v1/brands/${brandId}/themes/${themeId}" />

Fetches a Theme for a Brand

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `brandId` | String (URL)| ID of a Brand |
| `themeId` | String (URL)| ID of a Theme |

#### Response body

The requested [Theme Response](#theme-response-object)

Passing an invalid `brandId` or an invalid `themeId` returns a `404 Not Found` status code with error code `E0000007`.


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

<ApiOperation method="put" url="/api/v1/brands/${brandId}/themes/${themeId}" />

Updates a Theme for a Brand

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `brandId` | String (URL)| ID of a Brand |
| `themeId` | String (URL)| ID of a Theme |

#### Request body

The [Theme](#theme-object)

#### Response body

Returns an updated [Theme Response](#theme-response-object)

Passing an invalid `brandId` or an invalid `themeId` returns a `404 Not Found` status code with error code `E0000007`.


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
```

```json
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
            "errorSummary": "endUserDashboardTouchPointVariant: 'OKTA_DEFAULT_RANDOM' is invalid. Valid values: [OKTA_DEFAULT, WHITE_LOGO_BACKGROUND, FULL_THEME, LOGO_ON_FULL_WHITE_BACKGROUND]."
        }
    ]
}
```

### Upload Theme Logo

<ApiOperation method="post" url="/api/v1/brands/${brandId}/themes/${themeId}/logo" />

Updates the logo for your Theme

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `brandId` | String (URL)| ID of a Brand |
| `themeId` | String (URL)| ID of a Theme |

#### Request body

| Property | Type | Description                                                                                                                                                                                               |
|----------|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `file`   | File | The file must be in PNG, JPG, or GIF format and less than 1 MB in size. For best results use landscape orientation, a transparent background, and a minimum size of 420px by 120px to prevent upscaling. |

#### Response body

Returns `201 Created` with [logo URL](#image-upload-response-object)

Passing an invalid `brandId` or an invalid `themeId` returns a `404 Not Found` status code with error code `E0000007`.

Passing an invalid `file` returns a `400 Bad Request` status code with error code `E0000001`.

#### Use examples

The following request updates the Theme logo with the uploaded file.

##### Request

```bash
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

The following request shows invalid logo validations.

##### Request

```bash
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

> **Note:** The [/api/v1/org/logo endpoint](/docs/reference/api/org/#org-logo-operations) still works, but pages use the logo from the Theme if the `THEME_BUILDER` feature is enabled.
>
> See [Logo scenarios](#logo-scenarios) for more information.

### Delete Theme logo

<ApiOperation method="delete" url="/api/v1/brands/${brandId}/themes/${themeId}/logo" />

Deletes a Theme logo. The org then uses the Okta default logo.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `brandId` | String (URL)| ID of a Brand |
| `themeId` | String (URL)| ID of a Theme |

##### Response body

None.

Passing an invalid `brandId` or an invalid `themeId` returns a `404 Not Found` status code with error code `E0000007`.


#### Use examples

The following request removes the uploaded Theme logo.

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

<ApiOperation method="post" url="/api/v1/brands/${brandId}/themes/${themeId}/favicon" />

Updates the favicon for your theme

#### Request body

| Property | Type | Description                                                                                                                                                                                               |
|----------|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `file`   | File | The file must be in PNG or ICO format and have a 1:1 ratio with a maximum dimension of 512 x 512. |

#### Response body

Returns `201 Created` with the [favicon URL](#image-upload-response-object)

Passing an invalid `brandId` or an invalid `themeId` returns a `404 Not Found` status code with error code `E0000007`.


Passing an invalid `file` returns a `400 Bad Request` status code with error code `E0000001`.

#### Use examples

The following request updates the Theme favicon with the uploaded file.

##### Request

```bash
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

The following request shows validations for invalid favicon dimensions.

##### Request

```bash
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
      "errorSummary": "Your selected image should be in a 1:1 ratio for width and height. Found 199 x 200. The image should be 199 x 199 or 200 x 200."
    }
  ]
}
```

### Delete Theme favicon

<ApiOperation method="delete" url="/api/v1/brands/${brandId}/themes/${themeId}/favicon" />

Deletes a Theme favicon. The org then uses the Okta default favicon.

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `brandId` | String (URL)| ID of a Brand |
| `themeId` | String (URL)| ID of a Theme |

#### Response body

None.

Passing an invalid `brandId` or an invalid `themeId` returns a `404 Not Found` status code with error code `E0000007`.


#### Use examples

The following request removes the uploaded Theme favicon.

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

### Upload Theme background image

<ApiOperation method="post" url="/api/v1/brands/${brandId}/themes/${themeId}/background-image" />

Updates the background image for your Theme

#### Request body

| Property | Type | Description                                                                                                                                                                                               |
|----------|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `file`   | File | The image must be a PNG, JPG, or GIF file and be less than 2MB in size. |

#### Response body

Returns `201 Created` with the [background image URL](#image-upload-response-object)

Passing an invalid `brandId` or an invalid `themeId` returns a `404 Not Found` status code with error code `E0000007`.


Passing an invalid `file` returns a `400 Bad Request` status code with error code `E0000001`.

#### Use examples

The following request updates the Theme background image with the uploaded file.

##### Request

```bash
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

```bash
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
      "errorSummary": "Your selected image is 11,136 pixels high, which exceeds the 8,000 pixel limit."
    }
  ]
}
```

### Delete Theme background image

<ApiOperation method="delete" url="/api/v1/brands/${brandId}/themes/${themeId}/background-image" />

Deletes a Theme background image

#### Request path parameters

| Parameter | Type        | Description   |
| --------- | ----------- | ------------- |
| `brandId` | String (URL)| ID of a Brand |
| `themeId` | String (URL)| ID of a Theme |

##### Response body

None.

Passing an invalid `brandId` or an invalid `themeId` returns a `404 Not Found` status code with error code `E0000007`.


#### Use examples

The following request removes the uploaded Theme background image.

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

### Brand object

The Brand request object defines the following properties:

| Property                      | Type                    | Description                                                                                         |
| ----------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------- |
| `agreeToCustomPrivacyPolicy`  | boolean                 | (Optional) Consent for updating the custom privacy policy URL. Not required when resetting the URL. |
| `customPrivacyPolicyUrl`      | String                  | Custom privacy policy URL. Default value: `null`.                                                   |
| `removePoweredByOkta`         | boolean                 | (Optional) Removes "Powered by Okta" from the Okta-hosted sign-in page, and "© 2021 Okta, Inc." from the Okta End-User Dashboard. Default value: `false`.       |
| `_links`                      | [Links](#links-object)  | Link relations for this object                                                                      |

#### Brand example

Updates a custom privacy policy URL for a brand
```json
{
  "agreeToCustomPrivacyPolicy": true,
  "customPrivacyPolicyUrl": "https://www.someHost.com/privacy-policy"
}
```

Resets a privacy policy URL
```json
{
  "customPrivacyPolicyUrl": null
}
```

Updates the setting to remove the "Powered by Okta" wording
```json
{
  "agreeToCustomPrivacyPolicy": true,
  "removePoweredByOkta": true,
  "customPrivacyPolicyUrl": "https://www.someHost.com/privacy-policy"
}
```

### Brand Response object

The Brand Response object defines the following properties:

| Property                  | Type                    | Description                                             |
| ------------------------- | ----------------------- | ------------------------------------------------------- |
| `customPrivacyPolicyUrl`  | String                  | Custom privacy policy URL                               |
| `removePoweredByOkta`     | boolean                 | Removes "Powered by Okta" from the Okta-hosted sign-in page and "© 2021 Okta, Inc." from the Okta End-User Dashboard. |
| `id`                      | String                  | Brand ID                                                |
| `_links`                  | [Links](#links-object)  | Link relations for this object                          |

#### Brand response example

```json
{
  "id": "bndul904tTZ6kWVhP0g3",
  "customPrivacyPolicyUrl": null,
  "removePoweredByOkta": false,
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

## Theme API objects

### Theme object

The Theme object defines the following properties:

| Property                              | Type     | Description                                                                                                                | Default Value     |
| ------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `primaryColorHex`                     | String   | Primary color hex code                                                                                                   | `#1662dd`         |
| `primaryColorContrastHex`             | String   | (Optional) Primary color contrast hex code. Accepted values: `#000000`, `#ffffff`.                                         | `#ffffff`         |
| `secondaryColorHex`                   | String   | Secondary color hex code                                                                                                 | `#ebebed`         |
| `secondaryColorContrastHex`           | String   | (Optional) Secondary color contrast hex code. Accepted values: `#000000`, `#ffffff`.                                       | `#000000`         |
| `signInPageTouchPointVariant`         | Enum     | Variant for sign-in page. Accepted values: `OKTA_DEFAULT`, `BACKGROUND_SECONDARY_COLOR`, `BACKGROUND_IMAGE`.               | `OKTA_DEFAULT`    |
| `endUserDashboardTouchPointVariant`   | Enum     | Variant for the Okta End-User Dashboard. Accepted values: `OKTA_DEFAULT`, `WHITE_LOGO_BACKGROUND`, `FULL_THEME`, `LOGO_ON_FULL_WHITE_BACKGROUND`.                    | `OKTA_DEFAULT`    |
| `errorPageTouchPointVariant`          | Enum     | Variant for the error page. Accepted values: `OKTA_DEFAULT`, `BACKGROUND_SECONDARY_COLOR`, `BACKGROUND_IMAGE`.                 | `OKTA_DEFAULT`    |
| `emailTemplateTouchPointVariant`      | Enum     | Variant for email templates. Accepted values: `OKTA_DEFAULT`, `FULL_THEME`.                                                | `OKTA_DEFAULT`    |

> **Note:** `primaryColorContrastHex` and `secondaryColorContrastHex` are automatically optimized for the highest possible contrast between the font color and the background or button color. To disable or override the contrast auto-detection, update either contrast value with an accepted contrast hex code. Any update disables future automatic optimizations for the contrast hex.

> **Note:** Contrast color is used by pages to optimize the opacity of text color when primary or secondary color is used as the background.

> **Note:** For existing orgs with customizations, refer to the following [table](#data-migration-from-existing-orgs) for different scenarios with initial variant values.

#### Variant Definition

You can publish a theme for a page or email template with different combinations of assets, and `variants` are preset combinations of those assets.

#### Variants for the Okta Sign-In Page:

> **Note:** For a non `OKTA_DEFAULT` variant, `primaryColorHex` is used for button background color and `primaryColorContrastHex` is used to optimize the opacity for button text.

| Enum Value                      | Description                                                                                          |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `OKTA_DEFAULT`                  | Use the Okta logo, Okta favicon with no background image, and the Okta colors on the Okta Sign-In Page.   |
| `BACKGROUND_SECONDARY_COLOR`    | Use the logo and favicon from Theme with the `secondaryColorHex` as the background color for the Okta Sign-In Page.  |
| `BACKGROUND_IMAGE`              | Use the logo, favicon, and background image from Theme.                                                            |

#### Variants for the Okta End-User Dashboard:

| Enum Value                      | Description                                                                                                             |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `OKTA_DEFAULT`                  | Use the Okta logo and Okta favicon with a white background color for the logo and the side navigation bar background color.                           |
| `WHITE_LOGO_BACKGROUND`         | Use the logo from Theme with a white background color for the logo, use favicon from Theme, and use `primaryColorHex` for the side navigation bar background color.   |
| `FULL_THEME`                    | Use the logo from Theme, `primaryColorHex` for the logo and the side navigation bar background color, and use favicon from Theme                                    |
| `LOGO_ON_FULL_WHITE_BACKGROUND` | Use the logo from Theme, white background color for the logo and the side navigation bar background color, and use favicon from Theme                                    |

#### Variants for Error Page:

> **Note:** For the non `OKTA_DEFAULT` variant, `primaryColorHex` is used for button background color and `primaryColorContrastHex` is used to optimize the opacity for button text.

| Enum Value                      | Description                                                                                          |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `OKTA_DEFAULT`                  | Use the Okta logo, Okta favicon, and the Okta background color.                                      |
| `BACKGROUND_SECONDARY_COLOR`    | Use the logo from Theme with `secondaryColorHex` as the background color for the error page and use favicon from Theme.                 |
| `BACKGROUND_IMAGE`              | Use the logo, favicon, and background image from Theme.                                                            |

#### Variants for Email Templates:

| Enum Value                      | Description                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------- |
| `OKTA_DEFAULT`                  | Use the Okta logo and the Okta colors in the email templates.    |
| `FULL_THEME`                    | Use the logo from Theme and `primaryColorHex` as the background color for buttons.      |


##### Theme example

```json
{
  "primaryColorHex": "#1662dd",
  "primaryColorContrastHex": "#ffffff",
  "secondaryColorHex": "#ebebed",
  "secondaryColorContrastHex": "#ffffff",
  "signInPageTouchPointVariant": "OKTA_DEFAULT",
  "endUserDashboardTouchPointVariant": "OKTA_DEFAULT",
  "errorPageTouchPointVariant": "OKTA_DEFAULT",
  "emailTemplateTouchPointVariant": "OKTA_DEFAULT"
}
```

### Theme Response object

#### Theme Response properties

The Theme Response object defines the following properties:

| Property                              | Type                    | Description                                 |
| ------------------------------------- | ----------------------- | ------------------------------------------- |
| `id`                                  | String                  | Theme ID                                    |
| `logo`                                | String                  | Logo URL                                    |
| `favicon`                             | String                  | Favicon URL                                 |
| `backgroundImage`                     | String                  | Background image URL                        |
| `primaryColorHex`                     | String                  | Primary color hex code                      |
| `primaryColorContrastHex`             | String                  | Primary color contrast hex code             |
| `secondaryColorHex`                   | String                  | Secondary color hex code                    |
| `secondaryColorContrastHex`           | String                  | Secondary color contrast hex code           |
| `signInPageTouchPointVariant`         | Enum                    | Variant for the Okta Sign-In Page                    |
| `endUserDashboardTouchPointVariant`   | Enum                    | Variant for the Okta End-User Dashboard              |
| `errorPageTouchPointVariant`          | Enum                    | Variant for the error page                      |
| `emailTemplateTouchPointVariant`      | Enum                    | Variant for email templates                 |
| `_links`                              | [Links](#links-object)  | Link relations for this object              |

##### Theme Response example

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

### Image Upload Response object

The Image Upload Response object defines the following properties:

| Property | Type   | Description           |
|----------|------- |---------------------- |
| `url`    | String | URL of uploaded image |

#### Image Upload Response example

```json
{
  "url": "https://${yourOktaDomain}/assets/img/logos/okta-logo.47066819ac7db5c13f4c431b2687cef6.png"
}
```

### Links object

Specifies link relations available for the current status of an application using the [JSON Hypertext Application Language](https://tools.ietf.org/html/draft-kelly-json-hal-06) specification. This object is used for dynamic discovery of related resources and lifecycle operations. The Links object is read-only. See [Web Linking](https://tools.ietf.org/html/rfc8288)) for more information on link relations.

## Existing org scenarios

### Data migration from existing orgs

Initial Theme variant values are different for existing orgs with customizations.

| Property                              | Org Logo Uploaded     | Background Image Uploaded  | Initial Value                   |
| ------------------------------------- | --------------------- | -------------------------- | ------------------------------- |
| `signInPageTouchPointVariant`         | no                    | no                         | `OKTA_DEFAULT`                  |
| `signInPageTouchPointVariant`         | yes                   | no                         | `BACKGROUND_SECONDARY_COLOR`    |
| `signInPageTouchPointVariant`         | yes                   | yes                        | `BACKGROUND_IMAGE`              |
| `errorPageTouchPointVariant`          | no                    | no                         | `OKTA_DEFAULT`                  |
| `errorPageTouchPointVariant`          | yes                   | no                         | `BACKGROUND_SECONDARY_COLOR`    |
| `errorPageTouchPointVariant`          | yes                   | yes                        | `BACKGROUND_IMAGE`              |
| `endUserDashboardTouchPointVariant`   | no                    | n/a                        | `OKTA_DEFAULT`                  |
| `endUserDashboardTouchPointVariant`   | yes                   | n/a                        | `LOGO_ON_FULL_WHITE_BACKGROUND` |

### Logo scenarios

The following scenarios explain which logo is used when based on the `THEME_BUILDER` flag.

| `THEME_BUILDER` feature status        | Can Upload Org Logo | Can Upload Theme Logo  | Logo Used On Pages   |
| ------------------------------------- | ------------------- | ---------------------- | -------------------- |
| Enabled                               | yes                 | yes                    | Theme logo           |
| Disabled                              | yes                 | no                     | Org logo             |

> **Notes:**
> Enabling the `THEME_BUILDER` feature automatically updates the Theme logo from Org. The Org logo is still stored.
> Disabling the `THEME_BUILDER` feature uses the logo configured for the Org.
> Pages use the logo from the source defined above based on feature status.
