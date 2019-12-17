---
title: WebFinger
meta:
  - name: description
    content: The Webfinger protocol helps to determine the Identity Provider where a given username should be routed. This guide explains the process of finding the Identity Provider for a user.
---

# WebFinger

The purpose of the WebFinger interface is to allow a client application to determine the Identity Provider that a given username (or identifier) should be routed to based on your organization's Identity Provider Routing Rules (IdP Discovery Policy). For an introduction to the topic, see [IdP IdP Discovery](/docs/concepts/identity-providers/#idp-discovery).

The endpoint is: `https://${yourOktaDomain}/.well-known/webfinger`

This is a public, unprotected interface that can be queried without supplying an SSWS token.

## Finding a User's IdP 

<ApiOperation method="get" url="/.well-known/webfinger" />

Fetch the IdP to be used for a particular user. You must supply a `resource` query parameter.

### Request Parameters


The table below summarizes the supported query parameters:

| Parameter      | Description                                                             | Param Type | DataType | Required |
| :------------- | :---------------------------------------------------------------------- | :--------- | :------- | :------- |
| resource       | User's login value prefixed with `okta:acct:`                           | URL        | String   | TRUE     |
| rel            | Allows you to limit the result to certain IdPs                          | URL        | Array    | FALSE    |

>Note: Valid values for `rel` are `http://openid.net/specs/connect/1.0/issuer` and `okta:idp`, the first value being an Okta org, and the second being any configurable IdP.

#### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
"https://${yourOktaDomain}/.well-known/webfinger?resource=okta:acct:joe.stormtrooper%40example.com"
```

#### Response Example


In this example, there is a rule configured that has a user identifier condition which says that users with the domain `example.com` should be routed to a configured SAML IdP:

```json
{
    "subject": "okta:acct:joe.stormtrooper@example.com",
    "links": [
        {
            "rel": "okta:idp",
            "href": "https://${yourOktaDomain}/sso/idps/0oas562BigqDJl70T0g3",
            "titles": {
                "und": "MySamlIdp"
            },
            "properties": {
                "okta:idp:metadata": "https://${yourOktaDomain}/api/v1/idps/0oas562BigqDJl70T0g3/metadata.xml",
                "okta:idp:type": "SAML2",
                "okta:idp:id": "0oas562BigqDJl70T0g3"
            }
        }
    ]
}
```

#### Request Example


```bash
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
"https://${yourOktaDomain}/.well-known/webfinger?resource=okta:acct:joe.stormtrooper%example.com&rel=http%3A%2F%2Fopenid.net%2Fspecs%2Fconnect%2F1.0%2Fissuer"
```

>Note: This request looks similar to the previous one, but it includes a `rel` parameter that limits the results to a particular set of IdPs.

#### Response Example


In this example, there is already a rule configured that has a user identifier condition which says that users with the domain `example.com` should be routed to a configured SAML IdP. However, we supplied a `rel` parameter of `http://openid.net/specs/connect/1.0/issuer` that limited the result to Okta:

```json
{
    "subject": "okta:acct:joe.stormtrooper@example.com",
    "links": [
        {
            "rel": "https://openid.net/specs/connect/1.0/issuer",
            "href": "https://${yourOktaDomain}/sso/idps/OKTA",
            "titles": {
                "und": "{subdomain}"
            },
            "properties": {
                "okta:idp:type": "OKTA"
            }
        }
    ]
}
```

