---
title: Templates
category: management
---

# Custom Templates API

The Okta Templates API provides operations to manage custom Templates.

> **Note:** Only SMS custom Templates are available through the API.

SMS Templates customize the SMS message that is sent to users. One default SMS Template is provided. All custom Templates must have the variable `${code}` as part of the text. The `${code}` variable is replaced with the actual SMS code when the message is sent. Optionally, you can also use the variable `${org.name}`. If a Template contains `${org.name}`, it is replaced with the organization name before the SMS message is sent.

## Get started with custom Templates

Explore the custom Templates API: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3f7e83cebd2d31f7d1a7)

## Template operations

### Add SMS Template

<ApiOperation method="post" url="/api/v1/templates/sms" />

Adds a new custom SMS Template to your organization

##### Request parameters

| Parameter                                 | Description                               | ParamType                           | DataType                          | Required |
| ---------                                 | ----------------------------------------- | ---------                           | --------------------------------- | -------- |
| Definition of the new custom SMS Template | Body                                      | [SMS Template](#sms-template-object) | TRUE                              |          |

##### Response parameters

The created [SMS Template](#sms-template-object)

##### Request example

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

##### Response example

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

Fetches a specific Template by `id`

##### Request parameters


| Parameter     | Description        | ParamType | DataType | Required |
| ---------     | ------------------ | --------- | -------- | -------- |
| smsTemplateId | `id` of a Template | URL       | String   | TRUE     |

##### Response parameters

Fetched [SMS Template](#sms-template-object)

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/templates/sms/${templateId}"
```

##### Response example

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

Enumerates custom SMS Templates in your organization. Optionally, a subset of Templates can be returned that match a Template type.

##### Request parameters

| Parameter      | Description                                                                                | ParamType | DataType | Required | Default |
| -------------- | ------------------------------------------------------------------------------------------ | --------- | -------- | -------- | ------- |
| templateType   | The type of Template that you are searching for. Valid value: `SMS_VERIFY_CODE`            | Query     | String   | FALSE    | N/A     |

> **Note:** Search performs an exact match of the type, but this is an implementation detail and may change without notice.

##### Response parameters

Array of [SMS Templates](#sms-template-object) of matching type

##### Request example

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/templates/sms"
```

##### Response example

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

Updates the SMS Template

> **Note:** The default SMS Template can't be updated.

##### Request parameters


| Parameter                                   | Description                                 | ParamType                           | DataType                            | Required |
| ---------                                   | ------------------------------------------- | ---------                           | ----------------------------------- | -------- |
| smsTemplateId                               | `id` of the SMS Template to update          | URL                                 | String                              | TRUE     |
| Full description of the custom SMS Template | Body                                        | [SMS Template](#sms-template-object) | TRUE                                |          |

> **Note:** All profile properties must be specified when you update an SMS custom Template. Partial updates are described in the [Partial SMS Template update](#partial-sms-template-update) section.

##### Response parameters

Updated [SMS Template](#sms-template-object)

##### Request example

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

##### Response example

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

### Partial SMS Template update

<ApiOperation method="post" url="/api/v1/templates/sms/${smsTemplateId}" />

Updates only some of the SMS Template properties:

* All properties within the custom SMS Template that have values are updated.
* Any translation that doesn't exist is added.
* Any translation with a null or empty value is removed.
* Any translation with non-empty/null value is updated.

> **Note:** The default SMS Template can't be updated.

##### Request parameters


| Parameter                         | Description                                 | ParamType                           | DataType                            | Required |
| ---------                         | ------------------------------------------- | ---------                           | ----------------------------------- | -------- |
| smsTemplateId                     | `id` of the SMS Template to update          | URL                                 | String                              | TRUE     |
| Attributes that we want to change | Body                                        | [SMS Template](#sms-template-object) | TRUE                                |          |

> **Note:** A full SMS Template update is described in the [Update SMS Template](#update-sms-template) section.

##### Response parameters

Updated [SMS Template](#sms-template-object)

##### Request example

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

##### Response example

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

Removes an SMS Template

> **Note:** The default SMS Template can't be removed.

##### Request parameters


| Parameter     | Description                        | ParamType | DataType | Required |
| ---------     | ---------------------------------- | --------- | -------- | -------- |
| smsTemplateId | `id` of the SMS Template to delete | URL       | String   | TRUE     |

##### Response parameters

There is no content in the response.

##### Request example

```bash
curl -v -X DELETE \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/templates/sms/${templateId}"
```

##### Response example

```http
HTTP/1.1 204 No Content
```

## SMS Template object

#### Example

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

### SMS Template attributes

All Templates have the following properties:

| Property               | Description                                                         | DataType                                                       | Readonly | MinLength | MaxLength |
| ---------------------- | ------------------------------------------------------------        | -------------------------------------------------------------- | -------- | --------- | --------- |
| id                     | Unique key for the Template                                         | String                                                         | TRUE     | 20        | 20        |
| name                   | Human-readable name of the Template                                 | String                                                         | FALSE    | 1         | 50        |
| type                   | Type of the Template                                                | String                                                         | FALSE    | 1         | 50        |
| template               | Text of the Template, including any [macros](#sms-template-macros). | String (See note below)                                        | FALSE    | 1         | 161       |
| created                | Timestamp when the Template was created                             | String (ISO-8601)                                              | TRUE     | N/A       | N/A       |
| lastUpdated            | Timestamp when the Template was last updated                        | String (ISO-8601)                                              | TRUE     | N/A       | N/A       |
| translations           | A key/value map of [translations](#translation-attributes)          | Translations object                                                          | N/A      | N/A       | N/A       |

> **Note:** The length of your SMS message can't exceed 160 characters. If the verification code portion of the message falls outside of the 160-character limit, your message isn't sent.

#### Translation attributes

Template translations are optionally provided when you want to localize the SMS messages. Translations are provided as an object that contains `key:value` pairs: the language and the translated Template text.

```json
"translations": {
    "it": "Il codice ${org.name} è: ${code}.",
    "fr": "Votre code ${org.name}: ${code}.",
    "es": "Tu código de ${org.name} es: ${code}."
  }
```

The key portion is a two-letter country code that conforms to [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes), and the value is the translated SMS Template.

> **Note:** Just like with regular SMS Templates, the length of the SMS message can't exceed 160 characters.

### SMS Template types

| Type              | Description                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| `SMS_VERIFY_CODE` | This Template is used when the SMS for code verification is sent.                                |

### SMS Template macros

Only two macros are supported for SMS Templates:

| Type              | Description                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| `${code}`         | The one-time verification code that is required for sign in.                                       |
| `${org.name}`     | The name of the Okta organization that the user is trying to authenticate into.                  |
