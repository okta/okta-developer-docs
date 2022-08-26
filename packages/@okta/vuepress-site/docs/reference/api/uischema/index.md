---
title: UI Schema API
category: management
---

# UI Schema API

<ApiLifecycle access="ie" />

The Okta UI Schema API allows you to control how inputs appear on a form.

## Get started

This API is only for Okta Identity Engine. If you’re using Okta Classic Engine, see [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

Explore the UI Schema API: [![Run in Postman](https://run.pstmn.io/button.svg)](%linkhere%). <!-- How to generate this link: https://oktawiki.atlassian.net/wiki/spaces/DOC/pages/227648499/How+to+publish+Postman+collections -->

## UI Schema operations

The UI Schema API has the following CRUD operations:

- [Create a UI Schema](#create-a-ui-schema)
- [Get UI Schemas](#get-all-ui-schemas)
- [Get a UI Schema by ID](#get-a-ui-schema-by-id)
- [Update a UI Schema](#update-a-ui-schema)
- [Delete a UI Schema](#delete-a-ui-schema)

### Create a UI Schema

<ApiOperation method="post" url="/api/v1/meta/uischemas" />

#### Required scope

`okta.uischemas.manage`

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

A [UI Schema object](#ui-schema-object)

#### Response body

Returns the created [UI Schema Request object](#ui-schema-request-object)

#### Use example

This request creates a UI Schema Object:

##### Request

```bash
curl -v -X POST \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/meta/uischemas"
  --data-raw '{
  "uiSchema": {
    "type": "Group",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/firstName",
        "label": "First name",
        "options": {
          "format": "text"
        }
      },
      {
        "type": "Control",
        "scope": "#/properties/lastName",
        "label": "Last name",
        "options": {
          "format": "text"
        }
      },
      {
        "type": "Control",
        "scope": "#/properties/email",
        "label": "Primary email",
        "options": {
          "format": "text"
        }
      }
    ],
    "label": "Sign in",
    "buttonLabel": "Submit"
  }
}}'
```

##### Response

```json
{
  "id": "uis4abjqkkKXVPGAU0g7",
  "uiSchema": {
    "type": "Group",
    "label": "Sign in",
    "buttonLabel": "Submit",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/firstName",
        "label": "First name",
        "options": {
          "format": "text"
        }
      },
      {
        "type": "Control",
        "scope": "#/properties/lastName",
        "label": "Last name",
        "options": {
          "format": "text"
        }
      },
      {
        "type": "Control",
        "scope": "#/properties/email",
        "label": "Primary email",
        "options": {
          "format": "text"
        }
      }
    ]
  },
  "created": "2022-08-03T14:09:24.000Z",
  "lastUpdated": "2022-08-03T14:09:24.000Z",
  "_links": {
    "self": {
      "href": "https://dev-jake-2.trexcloud.com/api/v1/meta/uischemas/uis4abjqkkKXVPGAU0g7",
      "hints": {
        "allow": ["GET", "PUT", "DELETE"]
      }
    }
  }
}
```

### Get all UI Schemas

<ApiOperation method="get" url="/api/v1/meta/uischemas" />

Fetches all UI Schemas in your org.

#### Required scope and role

An Okta scope of `okta.uischemas.manage` or `okta.uischemas.read` is required to use this endpoint.

#### Request path parameters

N/A

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

A list of [UI Schema Response Objects](#ui-schema-response-object)

#### Use example

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/meta/uischemas"
```

##### Response

```json
[
  {
    "id": "uis4a7liocgcRgcxZ0g7",
    "uiSchema": {
      "type": "Group",
      "label": "Sign in",
      "buttonLabel": "Submit",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/firstName",
          "label": "First name",
          "options": {
            "format": "text"
          }
        },
        {
          "type": "Control",
          "scope": "#/properties/lastName",
          "label": "Last name",
          "options": {
            "format": "text"
          }
        },
        {
          "type": "Control",
          "scope": "#/properties/email",
          "label": "Email",
          "options": {
            "format": "text"
          }
        },
        {
          "type": "Control",
          "scope": "#/properties/countryCode",
          "label": "Country code",
          "options": {
            "format": "select"
          }
        },
        {
          "type": "Control",
          "scope": "#/properties/bool2",
          "label": "bool2",
          "options": {
            "format": "checkbox"
          }
        },
        {
          "type": "Control",
          "scope": "#/properties/date",
          "label": "date"
        },
        {
          "type": "Control",
          "scope": "#/properties/enum",
          "label": "enum",
          "options": {
            "format": "radio"
          }
        }
      ]
    },
    "created": "2022-07-25T12:56:31.000Z",
    "lastUpdated": "2022-07-26T11:53:59.000Z",
    "_links": {
      "self": {
        "href": "https://dev-jake-2.trexcloud.com/api/v1/meta/uischemas/uis4a7liocgcRgcxZ0g7",
        "hints": {
          "allow": ["GET", "PUT", "DELETE"]
        }
      }
    }
  },
  {
    "id": "uis4aagqfbqTyeMNB0g7",
    "uiSchema": {
      "type": "Group",
      "label": "Sign in",
      "buttonLabel": "Submit",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/firstName",
          "label": "First name",
          "options": {
            "format": "text"
          }
        },
        {
          "type": "Control",
          "scope": "#/properties/lastName",
          "label": "Last name",
          "options": {
            "format": "text"
          }
        },
        {
          "type": "Control",
          "scope": "#/properties/email",
          "label": "Primary email",
          "options": {
            "format": "text"
          }
        },
        {
          "type": "Control",
          "scope": "#/properties/bool2",
          "label": "bool2",
          "options": {
            "format": "radio_yes_no"
          }
        }
      ]
    },
    "created": "2022-08-01T19:15:47.000Z",
    "lastUpdated": "2022-08-01T19:15:58.000Z",
    "_links": {
      "self": {
        "href": "https://dev-jake-2.trexcloud.com/api/v1/meta/uischemas/uis4aagqfbqTyeMNB0g7",
        "hints": {
          "allow": ["GET", "PUT", "DELETE"]
        }
      }
    }
  },
  {
    "id": "uis4abjqkkKXVPGAU0g7",
    "uiSchema": {
      "type": "Group",
      "label": "Sign in2",
      "buttonLabel": "Submit",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/firstName",
          "label": "First name",
          "options": {
            "format": "text"
          }
        },
        {
          "type": "Control",
          "scope": "#/properties/lastName",
          "label": "Last name",
          "options": {
            "format": "text"
          }
        },
        {
          "type": "Control",
          "scope": "#/properties/email",
          "label": "Primary email",
          "options": {
            "format": "text"
          }
        }
      ]
    },
    "created": "2022-08-03T14:09:24.000Z",
    "lastUpdated": "2022-08-03T14:15:11.000Z",
    "_links": {
      "self": {
        "href": "https://dev-jake-2.trexcloud.com/api/v1/meta/uischemas/uis4abjqkkKXVPGAU0g7",
        "hints": {
          "allow": ["GET", "PUT", "DELETE"]
        }
      }
    }
  }
]
```

### Get a UI Schema by ID

<ApiOperation method="get" url="/api/v1/meta/uischemas/{id}" />

Fetches a UI Schema by its `id`

#### Required scope and role

An Okta scope of `okta.uischemas.manage` or `okta.uischemas.read` is required to use this endpoint.

#### Request path parameters

| Parameter | Type   | Description                                    |
| --------- | ------ | ---------------------------------------------- |
| `id`      | String | The unique ID of the UISchema being requested. |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

The requested [UI Schema Request Object](#ui-schema-request-object)

#### Use example

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/meta/uischemas/{id}"
```

##### Response

```json
{
    "type": "Group",
    "label": "Sign in",
    "buttonLabel": "Submit",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/firstName",
        "label": "First name",
        "options": {
          "format": "text"
        }
      },
      {
        "type": "Control",
        "scope": "#/properties/lastName",
        "label": "Last name",
        "options": {
          "format": "text"
        }
      },
      {
        "type": "Control",
        "scope": "#/properties/email",
        "label": "Primary email",
        "options": {
          "format": "text"
        }
      },
      {
        "type": "Control",
        "scope": "#/properties/bool2",
        "label": "bool2",
        "options": {
          "format": "radio_true_false"
        }
      },
      {
        "type": "Control",
        "scope": "#/properties/countryCode",
        "label": "Country code",
        "options": {
          "format": "select"
        }
      },
      {
        "type": "Control",
        "scope": "#/properties/enum",
        "label": "enum",
        "options": {
          "format": "radio"
        }
      }
    ]
  },
```

#### Error Responses

If an invalid phone UI Schema ID is passed to the request, the response returns a 404 NOT FOUND with error code E0000008.

### Update a UI Schema

<ApiOperation method="put" url="/api/v1/meta/uischemas/{id}" />

Updates a UI Schema

#### Required scope and role

An Okta scope of `okta.uischemas.manage` is required to use this endpoint.

#### Request path parameters

%List any path parameters here in alpha order%

| Parameter | Type   | Description                                  |
| --------- | ------ | -------------------------------------------- |
| `id`      | String | The unique ID of the UISchema being updated. |

#### Request query parameters

N/A

#### Request body

This API requiest a [UI Schema Request Object](#ui-schema-request-object) as its request body.

#### Response body

Returns a [UI Schema Response Object](#ui-schema-response-object)

#### Use example

##### Request

```bash
curl -v -X PUT \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/meta/uischemas/${id}"
--data-raw
'{
  "uiSchema": {
    "type": "Group",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/firstName",
        "label": "First name",
        "options": {
          "format": "text"
        }
      },
      {
        "type": "Control",
        "scope": "#/properties/lastName",
        "label": "Last name",
        "options": {
          "format": "text"
        }
      },
      {
        "type": "Control",
        "scope": "#/properties/email",
        "label": "Primary email",
        "options": {
          "format": "text"
        }
      }
    ],
    "label": "Sign in2",
    "buttonLabel": "Submit"
  },
  "id": "uis4abjqkkKXVPGAU0g7"
}'
```

##### Response

```json
{
  "id": "uis4abjqkkKXVPGAU0g7",
  "uiSchema": {
    "type": "Group",
    "label": "Sign in2",
    "buttonLabel": "Submit",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/firstName",
        "label": "First name",
        "options": {
          "format": "text"
        }
      },
      {
        "type": "Control",
        "scope": "#/properties/lastName",
        "label": "Last name",
        "options": {
          "format": "text"
        }
      },
      {
        "type": "Control",
        "scope": "#/properties/email",
        "label": "Primary email",
        "options": {
          "format": "text"
        }
      }
    ]
  },
  "created": "2022-08-03T14:09:24.000Z",
  "lastUpdated": "2022-08-03T14:15:11.000Z",
  "_links": {
    "self": {
      "href": "https://dev-jake-2.trexcloud.com/api/v1/meta/uischemas/uis4abjqkkKXVPGAU0g7",
      "hints": {
        "allow": ["GET", "PUT", "DELETE"]
      }
    }
  }
}
```

### Delete a UI Schema

<ApiOperation method="delete" url="/api/v1/meta/uischemas/{id}" />

Permanently deletes a UI Schema

#### Required scope and role

An Okta scope of `okta.uischemas.manage` is required to use this endpoint.

#### Request path parameters

%List any path parameters here in alpha order%

| Parameter | Type   | Description                                           |
| --------- | ------ | ----------------------------------------------------- |
| `id`      | String | The unique identifier of the UI Schema to be deleted. |

#### Request query parameters

N/A

#### Request body

N/A

#### Response body

N/A

#### Use example

The following request deletes a UI Schema with an `id` value of `uis4a97f4pmZsdxKu0g7`.

##### Request

```bash
curl -v -X DELETE \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/meta/uischemas/uis4a97f4pmZsdxKu0g7"
```

##### Response

Returns an empty HTTP 204 status code response.

#### Error Responses

If an invalid UI Schema ID is passed to the request, the response returns a 404 NOT FOUND with error code E0000008.

## UI Schema API objects

### UI Schema Request object

#### UI Schema Request properties

| Property   | Type                                  | Description                                                                                                       |
| ---------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `id`       | String                                | The unique ID of the ui schema you are performing this operation on.                                              |
| `uiSchema` | [UI Schema Object](#ui-schema-object) | A short description of this object. If the object can be returned standalone, it should be documented separately. |

#### UI Schema Request Example

### UI Schema Response object

#### UI Schema Response Object properties

| Property      | Type                                                                    | Description                                                                                                       |
| ------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `id`          | String                                                                  | The unique ID of the ui schema you are performing this operation on.                                              |
| `uiSchema`    | [UI Schema Object](#ui-schema-object)                                   | A short description of this object. If the object can be returned standalone, it should be documented separately. |
| `lastUpdated` | String (ISO-8601)                                                       | Timestamp when the UI Schema was last modified                                                                    |
| `_links`      | Object ([JSON HAL](http://tools.ietf.org/html/draft-kelly-json-hal-06)) | Discoverable resources related to the UISchema                                                                    |

#### UI Schema Response Object Example

```json
{
  "id": "uis4a97f4pmZsdxKu0g7",
  "uiSchema": {},
  "created": "2022-07-28T13:02:25.000Z",
  "lastUpdated": "2022-07-28T14:31:42.000Z",
  "_links": {
    "self": {
      "href": "https://dev-jake-2.trexcloud.com/api/v1/meta/uischemas/uis4a97f4pmZsdxKu0g7",
      "hints": {
        "allow": ["GET", "PUT", "DELETE"]
      }
    }
  }
}
```

### UI Schema Object

#### UI Schema properties

| Property      | Type   | Description                                                                                                       | Supported Values |
| ------------- | ------ | ----------------------------------------------------------------------------------------------------------------- | ---------------- |
| `buttonLabel` | String | Specifies the button label for the `submit` button at the bottom of the enrollment form. Defaults to `Submit`     |
| `elements`    | Array  | A short description of this object. If the object can be returned standalone, it should be documented separately. |
| `label`       | String | Specifies the label at the top of the enrollment form under the logo. Defaults to `Sign in`                       |
| `type`        | String | Type of layout                                                                                                    | `Group`          |

#### UI Schema example

```json
{
  "buttonLabel": "Submit",
  "elements": [],
  "label": "Sign in",
  "type": "Group
}
```

### UI Schema Element object

The UI Schema Element object specifies how one specific input field on a form should be configured.

#### UI Schema Element properties

| Property      | Type                                                            | Description                                                                                                                                                                                     | Supported Values |
| ------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `buttonLabel` | String                                                          | Specifies the button label for the `submit` button at the bottom of the enrollment form. Defaults to `Submit`                                                                                   |
| `options`     | [UI Schema Element Options ](#ui-schema-element-options-object) | A short description of this object. If the object can be returned standalone, it should be documented separately.                                                                               |
| `scope`       | String                                                          | Specifies which property this input field should be bound to. Must follow the format `#/properties/PROPERTY_NAME` where `PROPERTY_NAME` is a variable name for an attribute in `profile editor` | N/A              |
| `type`        | String                                                          | Specifies the relationship between this input element and `Scope`. The `Control` value specifies that this input controlls the value represented by `scope`                                     | `Control`        |

#### UI Schema Element example

```json
{
  "label": "Primary email",
  "options": {},
  "scope": "#/properties/email",
  "type": "Control"
}
```

### UI Schema Element Options object

The UI Schema Element Options object specifies how the input is displayed. The supported formats are as follows:

- `text`: Text input. This is the default for the majority of property types.
- `radio`: Radio button options. This option is only available for `string` data types with an `enum` or `one of` constraint.
- `select`: Display input as a dropdown. This option is only available for the `country-code` data type or a `string` data type with an `enum` or `one of` constraint.
- `checkbox`: Display input as a checkbox. This option is only available for `boolean` data types.
- `radio_yes_no`: Display input as 2 radio buttons, one with the option `yes` and the other `no`. This option is only available for `boolean` data types.
- `radio_true_false`: Display input as 2 radio buttons, one with the option `true` and the other `false`. This option is only available for `boolean` data types.

#### UI Schema Element Option properties

| Property | Type   | Description                                 | Supported Values                                                          |
| -------- | ------ | ------------------------------------------- | ------------------------------------------------------------------------- |
| `format` | String | Specifies how the input should be displayed | `text`, `radio`, `select`, `checkbox`, `radio_yes_no`, `radio_true_false` |

#### UI Schema Element Options example

```json
{
  "format": "select"
}
```
