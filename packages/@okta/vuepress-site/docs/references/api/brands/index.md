---
title: Brands
category: management
---

# Brands API

The Okta Brands API allows you to customize the look and feel of pages and templates, such as the Okta-hosted sign-in Page, error pages, email templates, and the Okta End-User Dashboard.

Each org starts off with Okta's default branding. You can upload your own assets (colors, background image, logo, and favicon) to replace Okta's default brand assets. You can then publish these assets directly to your pages and templates.

> **Important:** Despite being called the Brands API (due to conventions around REST API naming), each org can currently contain only one brand and one theme. We will likely allow multiple brands and themes per org at some point in the future, so stay tuned!

## Get started

Explore the Brands API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8cc47beb2a20dfe078eb)

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

> **Important**: Currently only one Brand per org is supported, therefore this contains a single object only.

#### Use examples

The following example returns all Brands in the org.

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
        "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes",
        "hints": {
          "allow": [
            "GET"
          ]
        }
      },
      "self": {
        "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3",
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
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3",
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
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3",
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
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3",
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

> **Important**: Currently only one Theme per org is supported, therefore this contains a single object only.

Passing an invalid `brandId` returns a `404 Not Found` status code with error code `E0000007`.

> **Note:** The `loadingPageTouchPointVariant` property is returned in the response body only if the **Loading Page Animation** feature is enabled. <ApiLifecycle access="ea" />

#### Use examples

The following example returns all Themes in the Brand.

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
    "logo": "https://{yourOktaDomain}/assets/img/logos/okta-logo.47066819ac7db5c13f4c431b2687cef6.png",
    "favicon": "https://{yourOktaDomain}/favicon.ico",
    "backgroundImage": null,
    "primaryColorHex": "#1662dd",
    "primaryColorContrastHex": "#000000",
    "secondaryColorHex": "#ebebed",
    "secondaryColorContrastHex": "#000000",
    "signInPageTouchPointVariant": "OKTA_DEFAULT",
    "endUserDashboardTouchPointVariant": "OKTA_DEFAULT",
    "errorPageTouchPointVariant": "OKTA_DEFAULT",
    "emailTemplateTouchPointVariant": "OKTA_DEFAULT",
    "loadingPageTouchPointVariant": "OKTA_DEFAULT",
    "_links": {
      "favicon": {
        "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/favicon",
        "hints": {
          "allow": [
            "POST",
            "DELETE"
          ]
        }
      },
      "self": {
        "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3",
        "hints": {
          "allow": [
            "GET",
            "PUT"
          ]
        }
      },
      "logo": {
        "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/logo",
        "hints": {
          "allow": [
            "POST",
            "DELETE"
          ]
        }
      },
      "background-image": {
        "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/background-image",
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

> **Note:** The response body includes the `loadingPageTouchPointVariant` property only if the the **Loading Page Animation** feature is enabled. <ApiLifecycle access="ea" />

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
  "logo": "https://{yourOktaDomain}/assets/img/logos/okta-logo.47066819ac7db5c13f4c431b2687cef6.png",
  "favicon": "https://{yourOktaDomain}/favicon.ico",
  "backgroundImage": null,
  "primaryColorHex": "#1662dd",
  "primaryColorContrastHex": "#000000",
  "secondaryColorHex": "#ebebed",
  "secondaryColorContrastHex": "#000000",
  "signInPageTouchPointVariant": "OKTA_DEFAULT",
  "endUserDashboardTouchPointVariant": "OKTA_DEFAULT",
  "errorPageTouchPointVariant": "OKTA_DEFAULT",
  "emailTemplateTouchPointVariant": "OKTA_DEFAULT",
  "loadingPageTouchPointVariant": "OKTA_DEFAULT",
  "_links": {
    "favicon": {
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/favicon",
      "hints": {
        "allow": [
          "POST",
          "DELETE"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3",
      "hints": {
        "allow": [
          "GET",
          "PUT"
        ]
      }
    },
    "logo": {
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/logo",
      "hints": {
        "allow": [
          "POST",
          "DELETE"
        ]
      }
    },
    "background-image": {
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/background-image",
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

* Passing an invalid `brandId` or an invalid `themeId` returns a `404 Not Found` status code with error code `E0000007`.


* Passing invalid body parameters returns a `400 Bad Request` status code with error code `E0000001`.


* Passing the optional `loadingPageTouchPointVariant` body parameter without having the the **Loading Page Animation** feature enabled returns a `401 Unauthorized` with error code `E0000015`. <ApiLifecycle access="ea" />

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
    "emailTemplateTouchPointVariant": "OKTA_DEFAULT",
    "loadingPageTouchPointVariant": "OKTA_DEFAULT"
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
  "logo": "https://{yourOktaDomain}/assets/img/logos/okta-logo.47066819ac7db5c13f4c431b2687cef6.png",
  "favicon": "https://{yourOktaDomain}/favicon.ico",
  "backgroundImage": null,
  "primaryColorHex": "#1662dd",
  "primaryColorContrastHex": "#000000",
  "secondaryColorHex": "#ebebed",
  "secondaryColorContrastHex": "#000000",
  "signInPageTouchPointVariant": "OKTA_DEFAULT",
  "endUserDashboardTouchPointVariant": "OKTA_DEFAULT",
  "errorPageTouchPointVariant": "OKTA_DEFAULT",
  "emailTemplateTouchPointVariant": "OKTA_DEFAULT",
  "loadingPageTouchPointVariant": "OKTA_DEFAULT",
  "_links": {
    "favicon": {
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/favicon",
      "hints": {
        "allow": [
          "POST",
          "DELETE"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3",
      "hints": {
        "allow": [
          "GET",
          "PUT"
        ]
      }
    },
    "logo": {
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/logo",
      "hints": {
        "allow": [
          "POST",
          "DELETE"
        ]
      }
    },
    "background-image": {
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/background-image",
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
    "emailTemplateTouchPointVariant": "OKTA_DEFAULT_RANDOM",
    "loadingPageTouchPointVariant": "OKTA_DEFAULT_RANDOM"
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
        },
        {
            "errorSummary": "loadingPageTouchPointVariant: 'OKTA_DEFAULT_RANDOM' is invalid. Valid values: [OKTA_DEFAULT, NONE]."
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
  "url": "https://{yourOktaDomain}/bc/image/fileStoreRecord?id=fs09yfpj6PnWzgzIQ0g4"
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

> **Note:** The [/api/v1/org/logo endpoint](/docs/references/api/org/#org-logo-operations) still works, but pages use the logo from the Theme if the `THEME_BUILDER` feature is enabled.
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
  "url": "https://{yourOktaDomain}/bc/image/fileStoreRecord?id=fs09yfpj6PnWzgzIQ0g4"
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
  "url": "https://{yourOktaDomain}/bc/image/fileStoreRecord?id=fs09yfpj6PnWzgzIQ0g4"
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

## Email template operations

The Email Templates API allows you to programatically manage email customizations.

### Email Templates

Okta provides many customizable **email templates**. For example, the `UserActivation` email template allows users to activate their account. Each template has **default content** that is translated to any one of the [supported languages](#supported-languages).

### Email Customizations

**Email customizations** allow you to override an email template's default content.

The following constraints apply to email customizations:
- If an email template has any customizations at all, exactly one of them must be the default (where `isDefault` is `true`). The default customization is used when no other customization applies to the user's language settings.
- Each email template can have only one customization for each [supported language](#supported-languages).

### Supported Languages

Email customizations can be created for the following languages. Language values must be in [BCP 47 language tag](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) format.

| Language               | BCP 47 Language Tag |
| ---------------------- | ------------------- |
| Czech                  | `cs`                |
| Danish                 | `da`                |
| German                 | `de`                |
| Greek                  | `el`                |
| English                | `en`                |
| Spanish                | `es`                |
| Finnish                | `fi`                |
| French                 | `fr`                |
| Hungarian              | `hu`                |
| Indonesian             | `id`                |
| Italian                | `it`                |
| Japanese               | `ja`                |
| Korean                 | `ko`                |
| Malaysian              | `ms`                |
| Norwegian              | `nb`                |
| Dutch                  | `nl-NL`             |
| Polish                 | `pl`                |
| Portuguese             | `pt-BR`             |
| Romanian               | `ro`                |
| Russian                | `ru`                |
| Swedish                | `sv`                |
| Thai                   | `th`                |
| Turkish                | `tr`                |
| Ukrainian              | `uk`                |
| Vietnamese             | `vi`                |
| Chinese (Simplified)   | `zh-CN`             |
| Chinese (Traditional)  | `zh-TW`             |

* [List email templates](#list-email-templates)
* [Get email template](#get-email-template)
* [Get email template default content](#get-email-template-default-content)
* [Preview email template default content](#preview-email-template-default-content)
* [Send test email](#send-test-email)
* [List email customizations](#list-email-customizations)
* [Create email customization](#create-email-customization)
* [Delete all email customizations](#delete-all-email-customizations)
* [Get email customization](#get-email-customization)
* [Update email customization](#update-email-customization)
* [Delete email customization](#delete-email-customization)
* [Preview email customization](#preview-email-customization)

### List email templates

<ApiOperation method="get" url="/api/v1/brands/${brandId}/templates/email" />

Lists all supported email templates

#### Request path parameters

| Parameter      | Type        | Description            |
| -------------- | ----------- | ---------------------- |
| `brandId`      | String      | ID of a Brand          |

#### Response body

A [paginated](/docs/references/core-okta-api/#pagination) list of [Email Template](#email-template) resources

Passing an invalid `brandId` returns a `404 Not Found` with error code `E0000007`.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
'https://${yourOktaDomain}/api/v1/brands/${brandId}/templates/email'
```

##### Response

```http
HTTP/1.1 200 OK
Link: <http://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email?limit=10>; rel="self",
  <http://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email?after=ADUserActivation&limit=10>; rel="next"
```

```json
[
    {
        "name": "UserActivation",
        "_links": {
            "customizations": {
                "hints": {
                    "allow": [
                        "GET",
                        "POST",
                        "DELETE"
                    ]
                },
                "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations"
            },
            "defaultContent": {
                "hints": {
                    "allow": [
                        "GET"
                    ]
                },
                "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/default-content"
            },
            "self": {
                "hints": {
                    "allow": [
                        "GET"
                    ]
                },
                "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation"
            },
            "test": {
                "hints": {
                    "allow": [
                        "POST"
                    ]
                },
                "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/test"
            }
        }
    },
    ...
    {
        "name": "ADUserActivation",
        "_links": {
          ...
        }
    }
]
```

### Get email template

<ApiOperation method="get" url="/api/v1/brands/${brandId}/templates/email/${templateName}" />

Fetches the email template named `templateName`

#### Request path parameters

| Parameter      | Type        | Description               |
| -------------- | ----------- | ------------------------- |
| `brandId`      | String      | ID of a Brand             |
| `templateName` | String      | Name of an Email Template |

#### Response body

The requested [Email Template](#email-template) resource.

Passing an invalid `brandId` or `templateName` returns a `404 Not Found` with error code `E0000007`.

#### Use examples

The following example returns the `UserActivation` email template.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
'https://${yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation'
```

##### Response

```http
HTTP/1.1 200 OK
```

```json
{
    "name": "UserActivation",
    "_links": {
        "customizations": {
            "hints": {
                "allow": [
                    "GET",
                    "POST",
                    "DELETE"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations"
        },
        "defaultContent": {
            "hints": {
                "allow": [
                    "GET"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/default-content"
        },
        "self": {
            "hints": {
                "allow": [
                    "GET"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation"
        },
        "test": {
            "hints": {
                "allow": [
                    "POST"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/test"
        }
    }
}
```

### Get email template default content

<ApiOperation method="get" url="/api/v1/brands/${brandId}/templates/email/${templateName}/default-content" />

Fetches an email template's default content

#### Request path parameters

| Parameter      | Type        | Description               |
| -------------- | ----------- | ------------------------- |
| `brandId`      | String      | ID of a Brand             |
| `templateName` | String      | Name of an Email Template |

#### Request query parameters

| Parameter      | Type        | Description                                                        |
| -------------- | ----------- | ------------------------------------------------------------------ |
| `language`     | String      | One of the [supported BCP 47 language codes](#supported-languages) |

#### Response body

The requested email template's default [Email Content](#email-content) resource.

Passing an invalid `brandId` or `templateName` returns a `404 Not Found` with error code `E0000007`.

If `language` isn't specified or is invalid, it defaults to the current user's language.

#### Use examples

The following example returns the `UserActivation` email template's default content.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
'https://${yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/default-content'
```

##### Response

```http
HTTP/1.1 200 OK
```

```json
{
    "body": "<!DOCTYPE html><html>...</html>",
    "subject": "Welcome to Okta!",
    "_links": {
        "preview": {
            "hints": {
                "allow": [
                    "GET"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/default-content/preview"
        },
        "self": {
            "hints": {
                "allow": [
                    "GET"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/default-content"
        },
        "template": {
            "hints": {
                "allow": [
                    "GET"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation"
        }
    }
}
```

### Preview email template default content

<ApiOperation method="get" url="/api/v1/brands/${brandId}/templates/email/${templateName}/default-content/preview" />

Fetches a preview of an email template's default content

#### Request path parameters

| Parameter      | Type        | Description               |
| -------------- | ----------- | ------------------------- |
| `brandId`      | String      | ID of a Brand             |
| `templateName` | String      | Name of an Email Template |

#### Request query parameters

| Parameter      | Type        | Description                                                        |
| -------------- | ----------- | ------------------------------------------------------------------ |
| `language`     | String      | One of the [supported BCP 47 language codes](#supported-languages) |

#### Response body

The requested email template's default [Email Content](#email-content) resource, with variables populated using the current user's context.

Passing an invalid `brandId` or `templateName` returns a `404 Not Found` with error code `E0000007`.

If `language` isn't specified or is invalid, it defaults to the current user's language.

#### Use examples

The following example returns a preview of the `UserActivation` email template's default content.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
'https://${yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/default-content/preview'
```

##### Response

```http
HTTP/1.1 200 OK
```

```json
{
    "body": "<!DOCTYPE html><html>...</html>",
    "subject": "Welcome to Okta!",
    "_links": {
        "defaultContent": {
            "hints": {
                "allow": [
                    "GET"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/default-content"
        },
        "self": {
            "hints": {
                "allow": [
                    "GET"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/default-content/preview"
        },
        "template": {
            "hints": {
                "allow": [
                    "GET"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation"
        }
    }
}
```

### Send test email

<ApiOperation method="post" url="/api/v1/brands/${brandId}/templates/email/${templateName}/test" />

Sends a test email

The following set of priorities determines the content of the email:
1. The email customization for the language specified in the `language` query parameter.
1. The email template's default customization.
1. The email template’s default content, translated to the current user's language.

#### Request path parameters

| Parameter      | Type        | Description               |
| -------------- | ----------- | ------------------------- |
| `brandId`      | String      | ID of a Brand             |
| `templateName` | String      | Name of an Email Template |

#### Request query parameters

| Parameter      | Type        | Description                                                        |
| -------------- | ----------- | ------------------------------------------------------------------ |
| `language`     | String      | One of the [supported BCP 47 language codes](#supported-languages) |

#### Response body

Returns a `204 No Content` on success.

Passing an invalid `brandId` or `templateName` returns a `404 Not Found` with error code `E0000007`.

If `language` isn't specified or is invalid, it defaults to the current user's language.

#### Use examples

The following example sends a test `UserActivation` email in French (`fr`).

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
'https://${yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/test?language=fr'
```

##### Response

```http
HTTP/1.1 204 No Content
```

### List email customizations

<ApiOperation method="get" url="/api/v1/brands/${brandId}/templates/email/${templateName}/customizations" />

Lists all customizations for an email template

#### Request path parameters

| Parameter      | Type        | Description               |
| -------------- | ----------- | ------------------------- |
| `brandId`      | String      | ID of a Brand             |
| `templateName` | String      | Name of an Email Template |

#### Response body

A [paginated](/docs/references/core-okta-api/#pagination) list of [Email Customization](#email-customization) resources

Passing an invalid `brandId` or `templateName` returns a `404 Not Found` with error code `E0000007`.

#### Use examples

The following example returns the list of all customizations for the `UserActivation` email template.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
'https://${yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations'
```

##### Response

```http
HTTP/1.1 200 OK
Link: <https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations?limit=10>; rel="self",
  <https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations?after=oel2hr0orNF3xGHpS0g4&limit=10>; rel="next"
```

```json
[
    {
        "body": "<!DOCTYPE html><html>...</html>",
        "created": "2022-01-24T23:22:36.000Z",
        "id": "oel2hr0orNF3xGHpS0g4",
        "isDefault": true,
        "language": "en",
        "lastUpdated": "2022-01-25T03:22:52.000Z",
        "subject": "Welcome to Okta!"
        "_links": {
            "preview": {
                "hints": {
                    "allow": [
                        "GET"
                    ]
                },
                "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations/oel2hr0orNF3xGHpS0g4/preview"
            },
            "self": {
                "hints": {
                    "allow": [
                        "GET",
                        "PUT",
                        "DELETE"
                    ]
                },
                "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations/oel2hr0orNF3xGHpS0g4"
            },
            "template": {
                "hints": {
                    "allow": [
                        "GET"
                    ]
                },
                "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation"
            },
            "test": {
                "hints": {
                    "allow": [
                        "POST"
                    ]
                },
                "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/test"
            }
        },
    },
    ...
]
```

### Create email customization

<ApiOperation method="post" url="/api/v1/brands/${brandId}/templates/email/${templateName}/customizations" />

Creates a new email customization

#### Request path parameters

| Parameter      | Type        | Description               |
| -------------- | ----------- | ------------------------- |
| `brandId`      | String      | ID of a Brand             |
| `templateName` | String      | Name of an Email Template |

#### Request body

The [Email Customization](#email-customization) resource to create.

#### Response body

The [Email Customization](#email-customization) resource that was created.

If this is the first customization being created for the email template, `isDefault` is set to `true`.

Returns a `400 Bad Request` if:
- `language` is not one of the [supported languages](#supported-languages).
- `body` does not contain a required variable references.

Returns a `409 Conflict` with error code `E0000182` If `isDefault` is `true` and a default customization already exists.

Passing an invalid `brandId` or `templateName` returns a `404 Not Found` with error code `E0000007`.

> **Note:** See [Email Customizations](#email-customizations) for details about email customization constraints.

#### Use examples

The following example creates an English customization for the `UserActivation` email template.

##### Request

```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "language": "en",
  "subject": "Welcome to Okta!",
  "body": "<!DOCTYPE html><html>...${activationLink}...</html>",
  "isDefault": true
}' \
'https://${yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations'
```

##### Response

```http
HTTP/1.1 201 Created
```

```json
{
    "body": "<!DOCTYPE html><html>...${activationLink}...</html>",
    "created": "2022-01-27T05:42:07.000Z",
    "id": "oel2kk2VDW0K4AOZp0g4",
    "isDefault": false,
    "language": "en",
    "lastUpdated": "2022-01-27T05:42:07.000Z",
    "subject": "Welcome to Okta!",
    "_links": {
        "preview": {
            "hints": {
                "allow": [
                    "GET"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations/oel2kk2VDW0K4AOZp0g4/preview"
        },
        "self": {
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations/oel2kk2VDW0K4AOZp0g4"
        },
        "template": {
            "hints": {
                "allow": [
                    "GET"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation"
        },
        "test": {
            "hints": {
                "allow": [
                    "POST"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/test"
        }
    }
}
```

### Delete all email customizations

<ApiOperation method="delete" url="/api/v1/brands/${brandId}/templates/email/${templateName}/customizations" />

Deletes an email customization

#### Request path parameters

| Parameter      | Type        | Description               |
| -------------- | ----------- | ------------------------- |
| `brandId`      | String      | ID of a Brand             |
| `templateName` | String      | Name of an Email Template |

#### Response body

Returns a `204 No Content` on success.

Passing an invalid `brandId` or `templateName` returns a `404 Not Found` with error code `E0000007`.

#### Use examples

The following example deletes all customizations of the `UserActivation` email template.

##### Request

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
'https://${yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations'
```

##### Response

```http
HTTP/1.1 204 No Content
```

### Get email customization

<ApiOperation method="get" url="/api/v1/brands/${brandId}/templates/email/${templateName}/customizations/${customizationId}" />

Fetches an email customization

#### Request path parameters

| Parameter         | Type        | Description                  |
| ----------------- | ----------- | ---------------------------- |
| `brandId`         | String      | ID of a Brand                |
| `templateName`    | String      | Name of an Email Template    |
| `customizationId` | String      | ID of an Email Customization |

#### Response body

The requested [Email Customization](#email-customization) resource.

Passing an invalid `brandId`, `templateName`, or `customizationId` returns a `404 Not Found` with error code `E0000007`.

#### Use examples

The following example returns a specific customization of the `UserActivation` email template.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
'https://${yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations/${customizationId}'
```

##### Response

```http
HTTP/1.1 200 OK
```

```json
{
    "body": "<!DOCTYPE html><html>...</html>",
    "created": "2022-01-27T05:42:07.000Z",
    "id": "oel2kk2VDW0K4AOZp0g4",
    "isDefault": true,
    "language": "en",
    "lastUpdated": "2022-01-27T05:42:07.000Z",
    "subject": "Welcome to Okta!",
    "_links": {
        "preview": {
            "hints": {
                "allow": [
                    "GET"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations/oel2kk2VDW0K4AOZp0g4/preview"
        },
        "self": {
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations/oel2kk2VDW0K4AOZp0g4"
        },
        "template": {
            "hints": {
                "allow": [
                    "GET"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation"
        },
        "test": {
            "hints": {
                "allow": [
                    "POST"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/test"
        }
    }
}
```

### Update email customization

<ApiOperation method="put" url="/api/v1/brands/${brandId}/templates/email/${templateName}/customizations/${customizationId}" />

Updates an email customization

#### Request path parameters

| Parameter         | Type        | Description                  |
| ----------------- | ----------- | ---------------------------- |
| `brandId`         | String      | ID of a Brand                |
| `templateName`    | String      | Name of an Email Template    |
| `customizationId` | String      | ID of an Email Customization |

#### Request body

The [Email Customization](#email-customization) resource to update.

#### Response body

The [Email Customization](#email-customization) resource that was updated.

If `isDefault` is `true`, the previous default email customization will have its `isDefault` set to `false`.

Returns a `409 Conflict` if:
- there is already another email customization for the specified `language`.
- `isDefault` is `false` and the email customization being updated is the default.

Returns a `400 Bad Request` if:
- `language` is not one of the [supported locales](#supported-locales).
- `body` does not contain a required variable references.

Passing an invalid `brandId`, `templateName`, or `customizationId` returns a `404 Not Found` with error code `E0000007`.

> **Note:** See [Email Customizations](#email-customizations) for details about email customization constraints.

#### Use examples

The following example updates a customization for the `UserActivation` email template.

##### Request

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "language": "en",
  "subject": "Hello from Okta!",
  "body": "<!DOCTYPE html><html>...${activationLink}...</html>",
  "isDefault": true
}' \
'https://${yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations/${customizationId}'
```

##### Response

```http
HTTP/1.1 200 OK
```

```json
{
    "body": "<!DOCTYPE html><html>...${activationLink}...</html>",
    "created": "2022-01-27T00:23:48.000Z",
    "id": "oel2kk1zYJBJbeaGo0g4",
    "isDefault": true,
    "language": "en",
    "lastUpdated": "2022-01-27T00:23:48.000Z",
    "subject": "Hello from Okta!",
    "_links": {
        "preview": {
            "hints": {
                "allow": [
                    "GET"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations/oel2kk1zYJBJbeaGo0g4/preview"
        },
        "self": {
            "hints": {
                "allow": [
                    "GET",
                    "PUT",
                    "DELETE"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations/oel2kk1zYJBJbeaGo0g4"
        },
        "template": {
            "hints": {
                "allow": [
                    "GET"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation"
        },
        "test": {
            "hints": {
                "allow": [
                    "POST"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/test"
        }
    }
}
```

### Delete email customization

<ApiOperation method="delete" url="/api/v1/brands/${brandId}/templates/email/${templateName}/customizations/${customizationId}" />

Deletes an email customization

#### Request path parameters

| Parameter         | Type        | Description                  |
| ----------------- | ----------- | ---------------------------- |
| `brandId`         | String      | ID of a Brand                |
| `templateName`    | String      | Name of an Email Template    |
| `customizationId` | String      | ID of an Email Customization |

#### Response body

Returns a `204 No Content` on success.

Returns a `409 Conflict` if the email customization to be deleted is the default.

Passing an invalid `brandId`, `templateName`, or `customizationId` returns a `404 Not Found` with error code `E0000007`.

> **Note:** See [Email Customizations](#email-customizations) for details about email customization constraints.

#### Use examples

The following example deletes a specific customization of the `UserActivation` email template.

##### Request

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
'https://${yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations/${customizationId}'
```

##### Response

```http
HTTP/1.1 204 No Content
```

### Preview email customization

<ApiOperation method="get" url="/api/v1/brands/${brandId}/templates/email/${templateName}/customizations/${customizationId}/preview" />

Fetches a preview of an email customization

#### Request path parameters

| Parameter         | Type        | Description                  |
| ----------------- | ----------- | ---------------------------- |
| `brandId`         | String      | ID of a Brand                |
| `templateName`    | String      | Name of an Email Template    |
| `customizationId` | String      | ID of an Email Customization |

#### Response body

The requested email customization's [Email Content](#email-content) resource, with variables populated using the current user's context.

Passing an invalid `brandId`, `templateName`, or `customizationId` returns a `404 Not Found` with error code `E0000007`.

#### Use examples

The following example returns a preview of a customization of the `UserActivation` email template.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
'https://${yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations/${customizationId}/preview'
```

##### Response

```http
HTTP/1.1 200 OK
```

```json
{
    "body": "<!DOCTYPE html><html>...</html>",
    "subject": "Welcome to Okta!",
    "_links": {
        "self": {
            "hints": {
                "allow": [
                    "GET"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/customizations/oel2kk1zYJBJbeaGo0g4/preview"
        },
        "template": {
            "hints": {
                "allow": [
                    "GET"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation"
        },
        "test": {
            "hints": {
                "allow": [
                    "POST"
                ]
            },
            "href": "https://{yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/test"
        }
    }
}
```

### Email Template Settings

<ApiLifecycle access="ea" />

This API lets you manage the settings of each customizable email template.

### Get Email Template Settings

> **Note:** Email Template Settings are gated behind the **API For Supressing Email Notifications** Early Access feature and must be enabled. See [Feature Lifecycle Management](/docs/concepts/feature-lifecycle-management/) and [Manage Early Access and Beta features](https://help.okta.com/okta_help.htm?id=ext_Manage_Early_Access_features).


<ApiOperation method="get" url="/api/v1/brands/${brandId}/templates/email/${templateName}/settings" />

Fetches the settings associated with the template

#### Request path parameters

| Parameter         | Type        | Description                  |
| ----------------- | ----------- | ---------------------------- |
| `brandId`         | String      | ID of a Brand                |
| `templateName`    | String      | Name of an Email Template    |

#### Response body

The requested [Email Template Settings](#email-template-settings-object) resource, with variables populated using the current user's context

Passing an invalid `brandId` or `templateName` returns a `404 Not Found` with error code `E0000007`.

#### Use examples

The following example returns the settings for the email template `UserActivation`.

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
'https://${yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/settings'
```

##### Response

```http
HTTP/1.1 200 OK
```

```json
{
    "recipients": "ALL_USERS",
    "_links": {
      "template": {
            "href": "https://${yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/settings",
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

### Update Email Template Settings

<ApiOperation method="put" url="/api/v1/brands/${brandId}/templates/email/${templateName}/settings" />

Updates the settings associated with the template

#### Request path parameters

| Parameter         | Type        | Description                  |
| ----------------- | ----------- | ---------------------------- |
| `brandId`         | String      | ID of a Brand                |
| `templateName`    | String      | Name of an Email Template    |

#### Request body

The [Email Template Settings Object](#email-template-settings-object) resource to update

#### Response body

The [Email Template Settings Object](#email-template-settings-object) resource that was updated

Returns a `422 Unprocessable Entity` if the template doesn't support the recipient's value.

> **Note**: The templates that don't support all recipient values are New Sign-On Notification, Authenticator Enrolled, Authenticator Reset, Password Changed, and Change Email Confirmation.

Passing an invalid `brandId` or `templateName` returns a `404 Not Found` with error code `E0000007`.

#### Use examples

The following example disables the `UserActivation` email from being sent.

##### Request

```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "recipients": "NO_USERS"
}' \
'https://${yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/settings'
```

##### Response

```http
HTTP/1.1 200 OK
```

```json
{
    "recipients": "NO_USERS",
    "_links": {
        "template": {
            "href": "https://${yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        },
        "self": {
            "href": "https://${yourOktaDomain}/api/v1/brands/${brandId}/templates/email/UserActivation/settings",
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
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes",
      "hints": {
        "allow": [
          "GET"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3",
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
| `loadingPageTouchPointVariant` <ApiLifecycle access="ea" />       | Enum     | (Optional) Variant for the Okta loading page. Applicable only if the **Loading Page Animation** feature is enabled. Accepted values: `OKTA_DEFAULT`, `NONE`.                                 | `OKTA_DEFAULT`    |

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



#### Variants for the Okta loading page:

<ApiLifecycle access="ea" />

> **Note:** Okta loading page variants are only available if the **Loading Page Animation** Early Access feature is enabled. See [Feature Lifecycle Management](/docs/concepts/feature-lifecycle-management/) and [Manage Early Access and Beta features](https://help.okta.com/okta_help.htm?id=ext_Manage_Early_Access_features).

| Enum Value                      | Description                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------- |
| `OKTA_DEFAULT`                  | Use the default Okta loading page animation during the redirect.    |
| `NONE`                          | Use no loading page animation during the redirect.      |


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
  "emailTemplateTouchPointVariant": "OKTA_DEFAULT",
  "loadingPageTouchPointVariant": "OKTA_DEFAULT"
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
| `signInPageTouchPointVariant`         | Enum                    | Variant for the Okta Sign-In Page           |
| `endUserDashboardTouchPointVariant`   | Enum                    | Variant for the Okta End-User Dashboard     |
| `errorPageTouchPointVariant`          | Enum                    | Variant for the error page                  |
| `emailTemplateTouchPointVariant`      | Enum                    | Variant for email templates                 |
| `loadingPageTouchPointVariant` <ApiLifecycle access="ea" />       | Enum                    | Variant for the Okta loading page           |
| `_links`                              | [Links](#links-object)  | Link relations for this object              |

##### Theme Response example

```json
{
  "id": "thdul904tTZ6kWVhP0g3",
  "logo": "https://{yourOktaDomain}/assets/img/logos/okta-logo.47066819ac7db5c13f4c431b2687cef6.png",
  "favicon": "https://{yourOktaDomain}/favicon.ico",
  "backgroundImage": null,
  "primaryColorHex": "#1662dd",
  "primaryColorContrastHex": "#000000",
  "secondaryColorHex": "#ebebed",
  "secondaryColorContrastHex": "#000000",
  "signInPageTouchPointVariant": "OKTA_DEFAULT",
  "endUserDashboardTouchPointVariant": "OKTA_DEFAULT",
  "errorPageTouchPointVariant": "OKTA_DEFAULT",
  "emailTemplateTouchPointVariant": "OKTA_DEFAULT",
  "loadingPageTouchPointVariant": "OKTA_DEFAULT",
  "_links": {
    "favicon": {
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/favicon",
      "hints": {
        "allow": [
          "POST",
          "DELETE"
        ]
      }
    },
    "self": {
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3",
      "hints": {
        "allow": [
          "GET",
          "PUT"
        ]
      }
    },
    "logo": {
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/logo",
      "hints": {
        "allow": [
          "POST",
          "DELETE"
        ]
      }
    },
    "background-image": {
      "href": "https://{yourOktaDomain}/api/v1/brands/bndul904tTZ6kWVhP0g3/themes/thdul904tTZ6kWVhP0g3/background-image",
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
  "url": "https://{yourOktaDomain}/assets/img/logos/okta-logo.47066819ac7db5c13f4c431b2687cef6.png"
}
```

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
| `loadingPageTouchPointVariant` <ApiLifecycle access="ea" />       | n/a                   | n/a                        | `OKTA_DEFAULT` or `NONE` |

> **Note:**
> For existing orgs, the `loadingPageTouchPointVariant` property is initialized to `OKTA_DEFAULT` if the **Okta Interstitial
> Page** setting under **Customizations** > **Other** is enabled in the Admin Console. Otherwise, this property is initialized to `NONE`. <ApiLifecycle access="ea" />
>
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

## Email Template Resources

### Email Template

The Email Template resource defines the following properties:

| Property       | Type                    | Description                    |
| ---------------| ----------------------- | ------------------------------ |
| `name`         | String                  | The name of the email template |
| `_links`       | [Links](#links-object)  | Link relations for this object |

### Email Content

The Email Content resource defines the following properties:

| Property       | Type                    | Description                    |
| ---------------| ----------------------- | ------------------------------ |
| `subject`      | String                  | The subject of the email       |
| `body`         | String                  | The body of the email          |
| `_links`       | [Links](#links-object)  | Link relations for this object |

### Email Customization

The Email Customization resource defines the following properties:

| Property       | Type                    | Description                                 |
| ---------------| ----------------------- | ------------------------------------------- |
| `id`           | String                  | The ID of the customization                 |
| `language`     | String                  | The language supported by the customization |
| `isDefault`    | boolean                 | Whether the customization is the default    |
| `subject`      | String                  | The subject of the customization            |
| `body`         | String                  | The body of the customization               |
| `_links`       | [Links](#links-object)  | Link relations for this object              |

<ApiLifecycle access="ea" />

> **Note:** Email Template Settings are gated behind the **API For Supressing Email Notifications** Early Access feature and must be enabled. See [Feature Lifecycle Management](/docs/concepts/feature-lifecycle-management/) and [Manage Early Access and Beta features](https://help.okta.com/okta_help.htm?id=ext_Manage_Early_Access_features).

### Email Template Settings Object

The Email Template Settings Object resource defines the following properties:

| Property       | Type                    | Description                                                                                   |
| ---------------| ----------------------- | --------------------------------------------------------------------------------------------- |
| `recipients`   | enum                    | The [eligible user type](#recipients-enum) that can receive emails generated from the template |
| `_links`       | [Links](#links-object)  | Link relations for this object                                                                |

### Recipients Enum

| Enum Value                      | Description                                                                                          |
| ------------------------------- | ----------------------------------------------- |
| `ALL_USERS`                     | Send emails to all users (default)              |
| `ADMINS_ONLY`                   | Send emails to administrators only              |
| `NO_USERS`                      | Do not send emails to any user                  |


> **Note:** The following is a list of the email templates with certain Enum values:
> * `NO_USERS, ALL_USERS`: `NewSignOnNotification`, `PasswordChanged`, `AuthenticatorEnrolled`, and `AuthenticatorReset`
> * `ALL_USERS, ADMINS_ONLY`: `ChangeEmailConfirmation`

## Links object

Specifies link relations available for the current status of an application using the [JSON Hypertext Application Language](https://tools.ietf.org/html/draft-kelly-json-hal-06) specification. This object is used for dynamic discovery of related resources and lifecycle operations. The Links object is read-only. See [Web Linking](https://tools.ietf.org/html/rfc8288)) for more information on link relations.
