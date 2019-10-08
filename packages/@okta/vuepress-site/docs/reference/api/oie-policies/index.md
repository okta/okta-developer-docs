---
title: Okta Identity Engine Policy API
---

# Okta Identity Engine Policy API

<ApiLifecycle access="ea" />

Okta Identity Engine adds new Policy objects to the Okta `/policies` API, to control and configure the behavior of the steps of the Okta Identity Engine Pipeline.

During the Limited EA phase, Okta Identity Engine is enabled or disabled for an org as a whole. If Okta Identity Engine is enabled for an org, these new Policies control the pipeline that end users progress through when accessing OpenID Connect apps defined in the org. You cannot mix old Policy and Rule objects with the new Okta Identity Engine objects; old objects will not affect the steps in the new pipeline.

API endpoints for getting or updating Policy and Rules objects function the same way in Okta Identity Engine as they do in the existing Okta `/policies` API. Only the objects used are different, with Okta Identity Engine introducing a set of new Policy and Rule objects to configure the steps that make up the Okta Identity Engine Pipeline. See the [Okta Identity Engine Policy Objects](#okta-identity-enging-policy-objects) section of this document for descriptions of the objects.

## Policies API Operations

The API endpoints support the following operations:

 * [Get Policy](#get-policy)
 * [List Policies](#list-policies)
 * [Get Rule](#get-rule)
 * [List Rules](#list-rules)
 * [Create Policy](#create-policy)
 * [Create Rule](#create-rule)
 * [Update Policy](#update-policy)
 * [Update Rule](#update-rule)
 * [Delete Policy](#delete-policy)
 * [Delete Rule](#delete-rule)
 
### Get Policy

<ApiOperation method="get" url="/policies/${PolicyID}" />

Given a `PolicyID` identifier, returns a [Policy Object](#policy-object).

#### Request Body

| Property   | Type   | Description                          |
|------------|--------|--------------------------------------|
| `PolicyID` | String | The unique identifier of the Policy. |

#### Request Query Parameters

None

#### Response Body

A [Policy Object](#policy-object).

#### Usage Example

##### Request

```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token}" \
"https://${yourOktaDomain}/api/v1/policies/${policyId}"
}'
```
##### Response

```json
{
    "id": "rs10xzYOyK9ux6v70g4",
    "name": "Default Policy",
    "type": "Okta:IdpRouting",
    "status": "ACTIVE",
    "default": true,
    "_links": {
        "self": {
            "href": "https://idx.okta1.com/api/v1/policies/rst10xzYOyK9ux6v70g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        },
        "rules": {
            "href": "https://idx.okta1.com/api/v1/policies/rst10xzYOyK9ux6v70g4/rules",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```



## Okta Identity Engine Policy Objects

This API uses the following objects:

* [IdP Routing Policy Object](#idp-routing-policy-object)
* [IdP Routing Rule Object](#idp-routing-rule-object)



### IdP Routing Policy Object

Intro.

| Property | Type | Description |
|----------|------|-------------|
|          |      |             |

### IdP Routing Object Example

```json
{
    "id": "rs10xzYOyK9ux6v70g4",
    "name": "Default Policy",
    "type": "Okta:IdpRouting",
    "status": "ACTIVE",
    "default": true,
    "_links": {
        "self": {
            "href": "https://idx.okta1.com/api/v1/policies/rst10xzYOyK9ux6v70g4",
            "hints": {
                "allow": [
                    "GET",
                    "PUT"
                ]
            }
        },
        "rules": {
            "href": "https://idx.okta1.com/api/v1/policies/rst10xzYOyK9ux6v70g4/rules",
            "hints": {
                "allow": [
                    "GET"
                ]
            }
        }
    }
}
```

### IdP Routing Rule Object

Intro

| Property | Type | Description |
|----------|------|-------------|
|          |      |             |
|          |      |             |
|          |      |             |
 
### IdP Routing Rule Object

```json
{  

}
```
