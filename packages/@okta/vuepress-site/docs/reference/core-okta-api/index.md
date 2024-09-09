---
title: Core Okta API
meta:
  - name: description
    content: Learn how the Okta API works and learn about the compatibility rules and design principles.
---

# Core Okta API

The Core Okta API is the primary way that apps and services interact with Okta. You can use it to implement basic auth functions such as signing in your users and programmatically managing your Okta objects.

## Sign in your users

API endpoints to authenticate your users, challenge for factors, recover passwords, and more. For example:

- The [Authentication API](/docs/reference/api/authn) controls user access to Okta.
- The [OpenID Connect & OAuth 2.0 API](/docs/concepts/oauth-openid) controls users access to your applications.

## Manage Okta objects

REST endpoints to configure objects whenever you need. For example:

- The [Apps API](/docs/reference/api/apps/) is used to manage Apps and their association with Users and Groups.
- The [Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/) is used for CRUD operations on Users.
- The [Sessions API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Session/) creates and manages user's authentication sessions.
- The [Policy API](/docs/reference/api/policy/) creates and manages settings such as a user's session lifetime.
- The [User Factors API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserFactor/) is used to enroll, manage, and verify factors for Multifactor Authentication (MFA).
- The [Devices API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Device/) is used to manage device identity and lifecycle.

## Design principles

### URL namespace

All URLs listed in the documentation should be preceded with your organization's subdomain (tenant) or configured custom domain.

> **Note:** All API requests must use the HTTPS scheme.

### Versioning

The Okta API is a versioned API. Okta reserves the right to add new parameters, properties, or objects to the API without advance notice. These updates are considered non-breaking and the compatibility rules below should be followed to ensure your application does not break. Breaking changes such as removing or renaming a property will be released as a new version of the API. Okta will provide a migration path for new versions of APIs and will communicate timelines for end-of-life when deprecating APIs.

The API version is included in the path. For example, the Users API is currently at version `v1`:

```http
https://${yourOktaDomain}/api/v1/users
```

Do not consume any Okta API unless it is documented on this site. All undocumented endpoints should be considered private, subject to change without notice, and not covered by any agreements.

### Compatibility rules for input parameters

- Requests are compatible irrespective of the order in which the query parameters appear.
- Requests are compatible irrespective of the order in which the properties of the JSON parameters appear.
- New query parameters may be added to future versions of requests.
- Existing query parameters cannot be removed from future versions of requests.
- Existing properties cannot be removed from the JSON parameters in future versions of requests.

### Compatibility rules for JSON responses

- Responses are compatible irrespective of the order in which the properties appear.
- New properties may be added to future versions of the response.
- Existing properties cannot be removed from future versions of the response.
- Properties with null values may be omitted by responses.

### Media types

> **Note:** JSON responses, including errors, may contain user input. To help prevent potential cross-site scripting attacks, make sure to properly escape all values before use in a browser or any HTML context.

The API currently supports only JSON as an exchange format. Be sure to set both the `Content-Type` and `Accept` headers for every request as `application/json`.

All Date objects are returned in [ISO 8601 format](https://tools.ietf.org/html/rfc3339):

    YYYY-MM-DDTHH:mm:ss.SSSZ

### Character sets

Okta supports a subset of the `UTF-8` specification. Specifically, any character that can be encoded in three bytes or less is supported. BMP characters and supplementary characters that must be encoded using four bytes aren't supported at this time.

### HTTP verbs

Where possible, the Okta API strives to use appropriate HTTP verbs for each action.

#### GET

Used for retrieving objects

#### PATCH

Used for partially updating objects. For supported endpoints, Okta implements one or both of [JSON Patch](https://www.rfc-editor.org/rfc/rfc6902) and [JSON Merge Patch](https://www.rfc-editor.org/rfc/rfc7386).

> **Note:** Not all APIs implement PATCH for updates.

#### POST

Used for creating objects or performing custom actions (such as
user lifecycle operations). For POST requests with no `body` param, set the `Content-Length` header to zero.

#### PUT

Used for replacing objects or collections. For PUT requests with no `body` param, set the `Content-Length` header to zero.

#### DELETE

Used for deleting objects

> **Note:** Any PUT or POST request without a `Content-Length` header or a body returns a 411 error. To get around this, include a `Content-Length: 0` header.

### Client request context

Okta derives the client request context directly from the HTTP request headers and client TCP socket. The request context is used to evaluate policies such as global session policy and to provide client information for [troubleshooting and auditing](/docs/reference/api/system-log/#client-object) purposes.

### User Agent

Okta supports the standard `User-Agent` HTTP header to identify the user's browser or application. Always send a `User-Agent` string to uniquely identify your client application and version, for example: `Oktaprise/1.1`.

> **Note:** If your application is acting as a gateway or proxy, you should forward the `User-Agent` of the originating client with your API requests.

#### Format a User-Agent string

Ensure that the `User-Agent` string that your app constructs is in the correct format so that Okta can parse the `OS` and `Browser` fields. Okta can correctly parse `User-Agent` strings that contain browser and system information, platform details, and any extensions.

##### Use a template to format the string

We recommend that you use a template like the following to format the `User-Agent` string:

`User-Agent: Mozilla/5.0 (<system-information>) <platform> (<platform-details>) <extensions>`

Okta recommends making test [authentication requests](/docs/reference/api/authn/#primary-authentication) and then checking for the related entries in the [System Log](/docs/reference/api/system-log/#useragent-object). Testing helps you ensure that Okta can parse both the `OS` and `Browser` fields from the `User-Agent` header that is passed by your application.

If the `OS` and/or `Browser` fields come back as `Unknown` in the System Log, ensure that certain string values (see below) are present in the `User-Agent` string so that the OS and browser are detected.

###### Pass a hint about the browser

Add browser information such as `chrome` or `safari` to the `User-Agent` string.

###### Pass operating system information

- iOS: Include the words `apple` or `ios` and at least one of these values: `iphone`, `ipad`, `ipod`, `ipad`.

- Android: Include the word `android`, which infers that Android is the operating system.

### IP address

The public IP address of your application is automatically used as the client IP address for your request. Okta supports the standard `X-Forwarded-For` HTTP header to forward the originating client's IP address if your application is behind a proxy server or acting as a sign-in portal or gateway.

> **Note:** The public IP address of your trusted web application must be a part of the allowlist in your [org's network security settings](https://help.okta.com/okta_help.htm?id=ext_Security_Network) as a trusted proxy to forward the user agent's original IP address with the `X-Forwarded-For` HTTP header.

### Accept Language

The `Accept-Language` HTTP header advertises which languages the client is able to understand, for example `Accept-Language: en-US`. Include the header if it is available.

### Device Fingerprint

The `X-Device-Fingerprint` HTTP header supplies the device fingerprint used in an authentication request.

### Errors

> **Note:** JSON responses, including errors, may contain user input. To help prevent potential cross-site scripting attacks, ensure to properly escape all values before use in a browser or any HTML context.

All successful requests return a 200 status if there is content to return or a 204 status if there is no content to return.

All requests that result in an error return the appropriate 4xx or 5xx error code with a custom JSON error object:

- `errorCode`: A code that is associated with this error type
- `errorLink`: A link to documentation with a more detailed explanation of the error (not yet implemented and is currently the same value as the `errorCode`)
- `errorSummary`: A natural language explanation of the error
- `errorId`: An ID that identifies this request. These IDs are mapped to the internal error on the server side to assist in troubleshooting.

``` json
{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed",
    "errorLink": "E0000001",
    "errorId": "oaeHfmOAx1iRLa0H10DeMz5fQ",
    "errorCauses": [
        {
            "errorSummary": "login: An object with this field already exists in the current organization"
        }
    ]
}
```

See [Error Codes](/docs/reference/error-codes/) for a list of API error codes.

> **Note:** Only the `errorCode` property is supported for runtime error flow control. The `errorSummary` property is only intended for troubleshooting and may change over time.

### Authentication

Okta APIs support two authentication options:

* [OAuth 2.0 and OpenID Connect](#oauth-2-0-and-openid-connect-authentication)
* [API token](#api-token-authentication)

#### OAuth 2.0 and OpenID Connect authentication

You can interact with Okta APIs that use scoped OAuth 2.0 access tokens for a number of Okta endpoints. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by the scopes that the access token contains. See [OpenID Connect and OAuth 2.0 API > Client authentication methods](/docs/reference/api/oidc/#client-authentication-methods).

Refer to the following guides for OAuth 2.0 and OpenID Connect authentication implementations:
* For user access token requests, see [Implement OAuth for Okta](/docs/guides/implement-oauth-for-okta/).
* For service access token requests, see [Implement OAuth for Okta with service app](/docs/guides/implement-oauth-for-okta-serviceapp/).
* For partner service apps in the Okta Integration Network (OIN), see [Build an API service integration](/docs/guides/build-api-integration/main/).

To set up OAuth 2.0 and OpenID Connect authentication for testing purposes, see [Test the Okta REST APIs with Postman](/docs/reference/rest/).

#### API token authentication

The Okta API requires the custom HTTP authentication scheme `SSWS` for API token (API key) authentication. Requests must have a valid API token specified in the HTTP `Authorization` header with the `SSWS` scheme.

For example:

```json
   Authorization: SSWS 00QCjAl4MlV-WPXM...0HmjFx-vbGua
```

> **Note:** See [Create an API token](/docs/guides/create-an-api-token/) for instructions on how to get an API token for your organization.

The API token isn't interchangeable with an Okta [session token](/docs/reference/api/authn/#session-token), access tokens, or ID tokens used with [OAuth 2.0 and OpenID Connect](/docs/reference/api/oidc/).

### Pagination

Requests that return a list of objects may support pagination. Pagination is based on a cursor and not on page number. The cursor is opaque to the client and specified in either the `before` or `after` query parameter. For some objects, you can also set a custom page size with the `limit` parameter.

> **Note:** For technical reasons, not all APIs respect pagination or the `before` and `limit` parameters.

| Param    | Description                                                                             |
| -------- | ------------                                                                            |
| `before` | The cursor that points to the start of the page of data that has been returned. |
| `after`  | The cursor that points to the end of the page of data that has been returned.   |
| `limit`  | The number of individual objects that are returned in each page.                |

### Link header

Pagination links are included in the [Link header](https://www.rfc-editor.org/rfc/rfc8288) of responses. It is important to follow these Link header values instead of constructing your own URLs as query parameters or cursor formats may change without notice.

``` http
HTTP/1.1 200 OK
link: <https://{yourOktaDomain}/api/v1/logs?limit=20>; rel="self"
link: <https://{yourOktaDomain}/api/v1/logs?limit=20&after=1627500044869_1>; rel="next"
```

The possible `rel` values are:

| Link relation type | Description                                              |
| ------------------ | ------------                                             |
| `self`             | Specifies the URL of the current page of results         |
| `next`             | Specifies the URL of the immediate next page of results |

When you first make an API call and get a cursor-paged list of objects, the end of the list is the point where you don't receive another `next` link value with the response. This holds true for all cases, except for the [System Log API](/docs/reference/api/system-log/) where the `next` link always exists in [System Log](/docs/reference/api/system-log/#list-events) polling queries. A polling query is defined as an `ASCENDING` query with an empty or absent `until` parameter, providing a stream of data.

### Filter

Filtering allows a requestor to specify a subset of objects to return and is often needed for large collection objects such as `Users`. While filtering semantics are standardized in the Okta API, not all objects in the Okta API support filtering. When filtering is supported for an object, the `filter` URL query parameter contains a filter expression.

The expression language that is used in the filter and search parameters supports references to JSON attributes and literals. The literal values can be strings enclosed in double quotes, numbers, date times enclosed in double quotes, and Boolean values (for example, true or false). String literals must be valid JSON strings.

The attribute names are case-sensitive while attribute operators are case-insensitive. For example, the following two expressions evaluate to the same logical value:

    filter=profile.firstName Eq "john"

    filter=profile.firstName eq "john"

The filter and search parameters must contain at least one valid Boolean expression. Each expression must contain an attribute name followed by an attribute operator and optional value. Multiple expressions can be combined using two logical operators. Furthermore, you can group expressions together using `()`.

> **Note:** Each object in the Okta API defines what attributes and operators are supported for the expression. See object-specific documentation for more information.

### Operators

Most of the operators listed in the [SCIM Protocol Specification](https://www.rfc-editor.org/rfc/rfc7644#section-3.4.2.2) are supported:

| Operator | Description           | Behavior                                                                                                                                                                                                                                                                      |
| -------- | -----------           | --------                                                                                                                                                                                                                                                                      |
| `eq`       | equal                 | Matches if the attribute and operand values are identical |
| `ge`       | greater than or equal | Matches if the attribute value is greater than or equal to the operand value. The actual comparison depends on the attribute type. `String` attribute types are a lexicographical comparison and `Date` types are a chronological comparison. |
| `gt`       | greater than          | Matches if the attribute value is greater than the operand value. The actual comparison depends on the attribute type. `String` attribute types are a lexicographical comparison and `Date` types are a chronological comparison.                 |
| `le`       | less than or equal    | Matches if the attribute value is less than or equal to the operand value. The actual comparison depends on the attribute type. `String` attribute types are a lexicographical comparison and `Date` types are a chronological comparison.   |
| `lt`       | less than             | Matches if the attribute value is less than the operand value. The actual comparison depends on the attribute type. `String` attribute types are a lexicographical comparison and `Date` types are a chronological comparison.                    |
| `ne`       | not equal             | Matches if the attribute value doesn't match the operand value |
| `pr`       | present (has value)   | Matches if the attribute has a non-empty value or if it contains a non-empty node for complex attributes.  |
| `sw`       | starts with           | The entire operand value must be a substring of the attribute value that starts at the beginning of the attribute value. This criterion is satisfied if the two strings are identical.                                                                                         |
| `ew`       | ends with             | The entire operand value must be a substring of the attribute value that starts at the end of the attribute value. This criterion is satisfied if the two strings are identical. This operator is only usable with the System Log API.                          |

> **Notes:**
> * Some objects don't support all the listed operators.
> * The `ne` (not equal) operator isn't supported for some objects, but you can obtain the same result by using `lt ... or ... gt`. For example, to see all user agents except for "iOS", use `(client.userAgent.os lt "iOS" or client.userAgent.os gt "iOS")`.
> * All `Date` values use the ISO 8601 format `YYYY-MM-DDTHH:mm:ss.SSSZ`.
> * The [System Log API](/docs/reference/api/system-log/#filtering-results) supports the contains (`co`) and ends with (`ew`) operators.

#### Attribute operators

| Operator | Description | Behavior                                                         |
| -------- | ----------- | --------                                                         |
| `and`      | Logical AND | The filter is only a match if both expressions evaluate to true. |
| `not` | Logical NOT | The filter is a match if the expression evaluates to false. |
| `or`       | Logical OR  | The filter is a match if either expression evaluates to true.    |

#### Logical operators

| Operator | Description         | Behavior                                |
| -------- | -----------         | --------                                                                                   |
| `()`       | Precedence grouping | Boolean expressions may be grouped by using parentheses to change the standard order of operations, for example, evaluate OR logical operators before logical AND operators. |

Filters must be evaluated using the standard order of operations. Attribute operators have the highest precedence, followed by the grouping operator (for example, parentheses), followed by the logical `AND` operator, followed by the logical `OR` operator.

### Hypermedia

Objects in the Okta API use hypermedia for discoverability. Hypermedia enables API clients to navigate objects by following links like a web browser instead of hard-coding URLs in your app. Links are identified by link relations that are named keys. Link relations describe what objects are available and how API clients can interact with them. Each object may publish a set of link relationships based on the state of the object. For example, the status of a user in the [User API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/) governs which lifecycle operations are permitted. Only the permitted operations are published as lifecycle operations.

The Okta API incorporates [JSON Hypertext Application Language](https://datatracker.ietf.org/doc/html/draft-kelly-json-hal-06) or HAL format as the foundation for hypermedia discoverability. HAL provides a set of conventions for expressing hyperlinks in JSON responses that represent two simple concepts: Resources and Links.

> **Note:** The HAL-specific media type `application/hal+json` isn't currently supported as a formal media type for content negotiation. Use the standard `application/json` media type. As we get more experience with the media format, we may add support for the media type.

### Links

Objects with property names that are link relation types (as defined by [RFC8288](https://www.rfc-editor.org/rfc/rfc8288)) have values that are either a Link object or an array of Link objects. Link objects contain the following:

- A target URI
- The name of the link relation (`rel`)
- Other optional properties to help with deprecation, object state or lifecycle management, content negotiation, and so on.
- Links are implicitly of media type `application/json`. Other media types are only returned in cases where the link isn't an API endpoint.

> **Note:** An object may have multiple links that share the same link relation as shown below for the `"logo"` link.

``` json
{
    "_links": {
        "logo": [
            {
              "name": "medium",
              "href": "https://{yourOktaDomain}/assets/img/logos/groups/active_directory-medium.b3959116154f9d44bd4d0f6b2ae31ea6.png",
              "type": "image/png"
            },
            {
              "name": "large",
              "href": "https://{yourOktaDomain}/assets/img/logos/groups/active_directory-large.0e7a58559ac90c4bbc7b33fa14018c50.png",
              "type": "image/png"
            }
         ],
        "self": { "href": "/example_resource" },
        "next": { "href": "/page=2" }
    }
}
```

### Links in collections

HAL links that are returned in a collection of resources may not reflect the total set of operations that are possible on that resource. For example, in a user collection, links to indicate that a given user can be unlocked may not be returned and, if returned, may not reflect the correct user state.

Search and list operations are intended to find matching resources and their identifiers. If you intend to search for a resource and then modify its state or make a lifecycle change, the correct pattern is to first retrieve the resource by `id` using the `self` link provided for that resource in the collection. This provides the full set of lifecycle links for that resource based on its most up-to-date state.

### Request debugging

The request ID is always present in every API response and can be used for debugging. You can use this value to correlate events from the [System Log](/docs/reference/api/system-log/) events.

The following header is set in each response:

`X-Okta-Request-Id` - The unique identifier for the API request

``` http
HTTP/1.1 200 OK
X-Okta-Request-Id: reqVy8wsvmBQN27h4soUE3ZEnA
```

### Cross-Origin Resource Sharing (CORS)

[Cross-Origin Resource Sharing (CORS)](https://fetch.spec.whatwg.org/#cors-protocol) is a mechanism that allows a web page to make an AJAX call. The AJAX call uses [XMLHttpRequest (XHR)](https://xhr.spec.whatwg.org/) to a domain that's different from the one where the script was loaded. Such cross-domain requests would otherwise be forbidden by web browsers, in accordance with the [same origin security policy](https://www.w3.org/Security/wiki/Same_Origin_Policy). CORS defines a [standardized](http://www.w3.org/TR/cors/) way in which the browser and the server can interact to determine whether to allow the cross-origin request.

In Okta, CORS allows JavaScript, which is hosted on your websites, to make an XHR to the Okta API with a token. See [OpenID Connect & OAuth 2.0](https://developer.okta.com/docs/api/openapi/okta-oauth/guides/overview/).

Every website origin must be explicitly permitted through the Admin Console for CORS. See [Enabling CORS](https://developer.okta.com/docs/guides/enable-cors/main/) for more information on how to allow your website to make cross-origin requests.

> **Caution:** Only grant access to specific origins (websites) that you control and trust to access the Okta API.

### API support

The Okta API supports CORS on an API by API basis. If you're building an application that needs CORS, check that the specific operation supports CORS for your use case. APIs that support CORS are marked with the following icon: <SupportsCors />.

### Additional help

In addition to all the information in this portal, you can view developer videos on our [YouTube channel](https://www.youtube.com/channel/UC5AMiWqFVFxF1q9Ya1FuZ_Q).
