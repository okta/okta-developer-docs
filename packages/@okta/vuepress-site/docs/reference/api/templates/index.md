---
title: Templates
category: management
---

# Custom Templates API

The Okta Templates API provides operations to manage custom templates.

> Currently, only SMS custom templates are available via the API.

SMS templates customize the SMS message sent to users. One default SMS template is provided. All custom templates must have the variable `${code}` as part of the text. The `${code}` variable is replaced with the actual SMS code when the message is sent. Optionally, you can also use the variable `${org.name}`. If a template contains `${org.name}`, it is replaced with organization name before the SMS message is sent.

## Get started with Custom Templates

Explore the Custom Templates API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/6806eb23befaf5bb3b6c)

## Template Operations

### Add SMS Template


<ApiOperation method="post" url="/api/v1/templates/sms" />

Adds a new custom SMS template to your organization.

##### Request Parameters


| Parameter                                 | Description                               | ParamType                           | DataType                          | Required |
| ---------                                 | ----------------------------------------- | ---------                           | --------------------------------- | -------- |
| Definition of the new custom SMS template | Body                                      | [SMS Template](#sms-template-object) | TRUE                              |          |

##### Response Parameters


The created [SMS Template](#sms-template-object).

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "Custom",
  "type": "SMS_VERIFY_CODE",
  "template": "${org.name}: your verification code is ${code}",
  "translations": {
    "es" : "${org.name}: el código de verificación es ${code}",
    "fr" : "${org.name}: votre code de vérification est ${code}",
    "it" : "${org.name}: il codice di verifica è ${code}"
  }
}' "https://${yourOktaDomain}/api/v1/templates/sms"
```

##### Response Example


```json
{
    "id": "cstkd89Qu2ypkxNQv0g3",
    "name": "Custom",
    "type": "SMS_VERIFY_CODE",
    "template": "${org.name}: your verification code is ${code}",
    "created": "2016-06-23T17:20:22.000Z",
    "lastUpdated": "2016-06-23T17:20:22.000Z",
    "translations": {
      "it": "${org.name}: il codice di verifica è ${code}",
      "fr": "${org.name}: votre code de vérification est ${code}",
      "es": "${org.name}: el código de verificación es ${code}"
    }
  }
```


### Get SMS Template


<ApiOperation method="get" url="/api/v1/templates/sms/${smsTemplateId}" />

Fetches a specific template by `id`

##### Request Parameters


| Parameter     | Description        | ParamType | DataType | Required |
| ---------     | ------------------ | --------- | -------- | -------- |
| smsTemplateId | `id` of a template | URL       | String   | TRUE     |

##### Response Parameters


Fetched [SMS Template](#sms-template-object)

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/templates/sms/${templateId}"
```

##### Response Example


```json
{
    "id": "cstkd89Qu2ypkxNQv0g3",
    "name": "Custom",
    "type": "SMS_VERIFY_CODE",
    "template": "${org.name}: your verification code is ${code}",
    "created": "2016-06-23T17:20:22.000Z",
    "lastUpdated": "2016-06-23T17:20:22.000Z",
    "translations": {
      "it": "${org.name}: il codice di verifica è ${code}",
      "fr": "${org.name}: votre code de vérification est ${code}",
      "es": "${org.name}: el código de verificación es ${code}"
    }
  }
```

### List SMS Templates


<ApiOperation method="get" url="/api/v1/templates/sms" />

Enumerates custom SMS templates in your organization. Optionally, a subset of templates can be returned that match a template type.

##### Request Parameters


| Parameter      | Description                                                                                | ParamType | DataType | Required | Default |
| -------------- | ------------------------------------------------------------------------------------------ | --------- | -------- | -------- | ------- |
| templateType   | The type of template that you are searching for. Valid value: `SMS_VERIFY_CODE`            | Query     | String   | FALSE    | N/A     |

> Search currently performs an exact match of the type but this is an implementation detail and may change without notice in the future.

##### Response Parameters


Array of [SMS Templates](#sms-template-object) of matching type.

##### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/templates/sms"
```

##### Response Example


```json
[
  {
    "id": "cstkdgSQOUacCuF750g3",
    "name": "Custom",
    "type": "SMS_VERIFY_CODE",
    "template": "${org.name}: your enrollment code is ${code}",
    "created": "2016-06-23T17:41:07.000Z",
    "lastUpdated": "2016-06-23T17:41:07.000Z",
    "translations": {
      "it": "${org.name}: il codice di iscrizione è ${code}",
      "fr": "${org.name}: votre code d'inscription est ${code}",
      "es": "${org.name}: su código de inscripción es ${code}"
    }
  }
]
```

### Update SMS Template


<ApiOperation method="put" url="/api/v1/templates/sms/${smsTemplateId}" />

Updates the SMS template.

> **Note:** The default SMS template can't be updated.

##### Request Parameters


| Parameter                                   | Description                                 | ParamType                           | DataType                            | Required |
| ---------                                   | ------------------------------------------- | ---------                           | ----------------------------------- | -------- |
| smsTemplateId                               | `id` of the SMS template to update          | URL                                 | String                              | TRUE     |
| Full description of the custom SMS template | Body                                        | [SMS Template](#sms-template-object) | TRUE                                |          |

> All profile properties must be specified when updating an SMS custom template. Partial updates are described [here](#partial-sms-template-update).

##### Response Parameters


Updated [SMS Template](#sms-template-object)

##### Request Example


```bash
curl -v -X PUT \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "name": "Custom",
  "type": "SMS_ENROLLMENT_CODE",
  "template": "${org.name}: your enrollment code is ${code}",
  "translations": {
    "it": "${org.name}: il codice di iscrizione è ${code}",
    "es": "${org.name}: su código de inscripción es ${code}",
    "de": "${org.name}: ihre anmeldung code ist ${code}"
  }
}' "https://${yourOktaDomain}/api/v1/templates/sms/${templateId}"
```

##### Response Example


```json
{
  "id": "cstkdgSQOUacCuF750g3",
  "name": "Custom",
  "type": "SMS_ENROLLMENT_CODE",
  "template": "${org.name}: your enrollment code is ${code}",
  "created": "2016-06-23T17:41:07.000Z",
  "lastUpdated": "2016-06-23T17:47:06.000Z"
}
```

### Partial SMS Template Update


<ApiOperation method="post" url="/api/v1/templates/sms/${smsTemplateId}" />

Updates only some of the SMS template properties:

* All properties with the custom SMS template with values are updated.
* Any translation that doesn't exist is added.
* Any translation with a null or empty value is removed.
* Any translation with non-empty/null value is updated.

> The default SMS template can't be updated.

##### Request Parameters


| Parameter                         | Description                                 | ParamType                           | DataType                            | Required |
| ---------                         | ------------------------------------------- | ---------                           | ----------------------------------- | -------- |
| smsTemplateId                     | `id` of the SMS template to update          | URL                                 | String                              | TRUE     |
| Attributes that we want to change | Body                                        | [SMS Template](#sms-template-object) | TRUE                                |          |

> Full SMS template update is described [here](#update-sms-template).

##### Response Parameters


Updated [SMS Template](#sms-template-object)

##### Request Example


```bash
curl -v -X POST \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
-d '{
  "translations": {
    "de" : "${org.name}: ihre bestätigungscode ist ${code}."
  }
}' "https://${yourOktaDomain}/api/v1/templates/sms/${templateId}"
```

##### Response Example


```json
{
  "id": "cstkd89Qu2ypkxNQv0g3",
  "name": "Custom",
  "type": "SMS_VERIFY_CODE",
  "template": "${org.name}: your verification code is ${code}",
  "created": "2016-06-23T17:20:22.000Z",
  "lastUpdated": "2016-06-23T17:58:10.000Z",
  "translations": {
    "de": "${org.name}: ihre bestätigungscode ist ${code}.",
    "it": "${org.name}: il codice di verifica è ${code}",
    "fr": "${org.name}: votre code de vérification est ${code}",
    "es": "${org.name}: el código de verificación es ${code}"
  }
}
```

### Remove SMS Template


<ApiOperation method="delete" url="/api/v1/templates/sms/${smsTemplateId}" />

Removes an SMS template.

> The default SMS template can't be removed.

##### Request Parameters


| Parameter     | Description                        | ParamType | DataType | Required |
| ---------     | ---------------------------------- | --------- | -------- | -------- |
| smsTemplateId | `id` of the SMS template to delete | URL       | String   | TRUE     |

##### Response Parameters


There is no content in the response.

##### Request Example


```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/templates/sms/${templateId}"
```


##### Response Example


```http
HTTP/1.1 204 No Content
```

## SMS Template object

### Example
```json
{
  "id": "cstk2flOtuCMDJK4b0g3",
  "name": "Custom",
  "type": "SMS_VERIFY_CODE",
  "template": "Your ${org.name} code is: ${code}",
  "created": "2016-06-21T20:49:52.000Z",
  "lastUpdated": "2016-06-21T20:49:52.000Z",
  "translations": {
    "it": "Il codice ${org.name} è: ${code}.",
    "fr": "Votre code ${org.name}: ${code}.",
    "es": "Tu código de ${org.name} es: ${code}."
  }
}
```

### SMS Template Attributes

All templates have the following properties:

| Property               | Description                                                         | DataType                                                       | Readonly | MinLength | MaxLength |
| ---------------------- | ------------------------------------------------------------        | -------------------------------------------------------------- | -------- | --------- | --------- |
| id                     | Unique key for template                                             | String                                                         | TRUE     | 20        | 20        |
| name                   | Human-readable name of the template                                 | String                                                         | FALSE    | 1         | 50        |
| type                   | Type of the template                                                | String                                                         | FALSE    | 1         | 50        |
| template               | Text of the template, including any [macros](#sms-template-macros). | String (See note below)                                        | FALSE    | 1         | 161       |
| created                | Timestamp when template was created                                 | String (ISO-8601)                                              | TRUE     | N/A       | N/A       |
| lastUpdated            | Timestamp when template was last updated                            | String (ISO-8601)                                              | TRUE     | N/A       | N/A       |
| translations           | A key-value map of [translations](#translation-attributes)                    | Translations Object                                                          | N/A      | N/A       | N/A       |

> **Note:** The final length of your SMS message cannot exceed 160 characters. If the verification code portion of the message falls outside of the 160-character limit, your message will not be sent.

#### Translation Attributes

Template translations are optionally provided when you want to localize the SMS messages. Translations are provided as an object containing `key:value` pairs: the language and translated template text.

```json
"translations": {
    "it": "Il codice ${org.name} è: ${code}.",
    "fr": "Votre code ${org.name}: ${code}.",
    "es": "Tu código de ${org.name} es: ${code}."
  }
```

The key portion is a two-letter country code conforming to [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes), and the value is the translated SMS template.

> **Note:** Just like with regular SMS templates, the final processed SMS message cannot exceed 160 characters.

### SMS Template Types

| Type              | Description                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| `SMS_VERIFY_CODE` | This template is used when the SMS for code verification is sent.                                |

### SMS Template Macros

Currently only two macros are supported for SMS templates.

| Type              | Description                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| `${code}`         | The one-time verification code that is required for login.                                       |
| `${org.name}`     | The name of the Okta organization that the user is trying to authenticate into.                  |
