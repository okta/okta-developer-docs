---
title: Design Principles
redirect_from:
  - /docs/getting_started/design_principles.html
  - docs/api/index.html
  - docs/api/
---

# Versioning

The Okta API is a versioned API.  Okta reserves the right to add new parameters, properties, or resources to the API without advance notice.
These updates are considered **non-breaking** and the compatibility rules below should be followed to ensure your application does not break.
Breaking changes such as removing or renaming an attribute will be released as a new version of the API.  Okta will provide a migration path for new versions of APIs and will communicate timelines for end-of-life when deprecating APIs.

Do not consume any Okta API unless it is documented on this site. All undocumented endpoints should be considered private, subject to change without notice, and not covered by any agreements.

### Compatibility rules for input parameters

- Requests are compatible irrespective of the order in which the query parameters appear.
- Requests are compatible irrespective of the order in which the properties of the JSON parameters appear
- New query parameters may be added to future versions of requests.
- Existing query parameters cannot be removed from future versions of requests.
- Existing properties cannot be removed from the JSON parameters in future versions of requests.

### Compatibility rules for JSON responses

- Responses are compatible irrespective of the order in which the properties appear.
- New properties may be added to future versions of the response.
- Existing properties cannot be removed from future versions of the response.
- Properties with null values may be omitted by responses

## URL Namespace

All URLs listed in the documentation should be preceded with your organization's subdomain (tenant) https://*{yourOktaDomain}*.com/api/*{apiversion}* and API version.

The `apiversion` is currently v1.

> All API requests must use HTTPS scheme

## Media Types

> JSON responses, including errors, may contain user input. To help prevent potential cross-site scripting attacks, make sure to properly escape all values before use in a browser or any HTML context.

The API currently only supports JSON as an exchange format.  Be sure to set both the Content-Type and Accept headers for every request as `application/json`.

All Date objects are returned in [ISO 8601 format](https://tools.ietf.org/html/rfc3339):

    YYYY-MM-DDTHH:mm:ss.SSSZ

## Character Sets
Okta supports a subset of the `UTF-8` specification. Specifically, any character that can be encoded in three bytes or less is supported. BMP characters and supplementary characters that *must* be encoded using four bytes are not supported at this time.

## HTTP Verbs

Where possible, the Okta API strives to use appropriate HTTP verbs for each
action.

#### GET

Used for retrieving resources.

#### POST

Used for creating resources, or performing custom actions (such as
user lifecycle operations).  For POST requests
with no `body` param, be sure to set the `Content-Length` header to zero.

#### PUT

Used for replacing resources or collections. For PUT requests
with no `body` param, be sure to set the `Content-Length` header to zero.

#### DELETE

Used for deleting resources.

> Any PUT or POST request with no Content-Length header nor a body will return a 411 error.  To get around this, include a `Content-Length: 0` header

## Client Request Context

Okta will derive client request context directly from the HTTP request headers and client TCP socket.  Request context is used to evaluate policies such as **Okta Sign-On Policy** and provide client information for [troubleshooting and auditing](/docs/api/resources/events/#client-objecttype) purposes.

### User Agent

Okta supports the standard `User-Agent` HTTP header to identify the user's browser or application. Always send a `User-Agent` string to uniquely identify your client application and version such as `Oktaprise/1.1`.

> If your application is acting as a gateway or proxy, you should forward the `User-Agent` of the originating client with your API requests.

### IP Address

The **public IP address** of your application will be automatically used as the client IP address for your request. Okta supports the standard `X-Forwarded-For` HTTP header to forward the originating client's IP address if your application is behind a proxy server or acting as a login portal or gateway.

> The **public IP address** of your trusted web application must be whitelisted in your [org's network security settings](https://help.okta.com/en/prod/Content/Topics/Security/Security_Network.htm) as a trusted gateway in order to forward the user agent's original IP address with the `X-Forwarded-For` HTTP header.

### Accept Language

The `Accept-Language` HTTP header advertises which languages the client is able to understand, for example `Accept-Language: en-US`. Include it if it is available.

### Device Fingerprint

The `X-Device-Fingerprint` HTTP header supplies the device fingerprint used in an authentication request.

## Errors

> JSON responses, including errors, may contain user input. To help prevent potential cross-site scripting attacks, make sure to properly escape all values before use in a browser or any HTML context.

All requests on success will return a 200 status if there is content to return or a 204 status if there is no content to return.

All requests that result in an error will return the appropriate 4xx or 5xx error code with a custom JSON error object:

- `errorCode`: A code that is associated with this error type
- `errorLink`: A link to documentation with a more detailed explanation of the error (note: this has yet to be implemented and for the time being is the same value as the errorCode)
- `errorSummary`: A natural language explanation of the error
- `errorId`: An id that identifies this request.  These ids are mapped to the internal error on the server side in order to assist in troubleshooting.

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

See [Error Codes](/reference/error_codes/) for a list of API error codes.

> Only the `errorCode` property is supported for runtime error flow control.  The `errorSummary` property is only intended for troubleshooting and may change over time.

## Authentication

The Okta API currently requires the custom HTTP authentication scheme `SSWS` for authentication. All requests must have a valid API key specified in the HTTP `Authorization` header with the `SSWS` scheme.

    Authorization: SSWS 00QCjAl4MlV-WPXM...0HmjFx-vbGua

> See [Obtaining a token](/docs/api/getting_started/getting_a_token/) for instructions on how to get an API key for your organization.

The API key (API token) isn't interchangeable with an Okta [session token](/docs/api/resources/authn/#session-token), access tokens or ID tokens used with [OAuth 2.0 and OpenID Connect](/docs/api/resources/oidc/).

## Pagination

Requests that return a list of resources may support paging.  Pagination is based on a cursor and not on page number. The cursor is opaque to the client and specified in either the `before` or `after` query parameter.  For some resources, you can also set a custom page size with the `limit` parameter.

Note that for technical reasons not all APIs respect pagination or the `before` and `limit` parameters, see the [Events API](/docs/api/resources/events) for example.

| Param    | Description                                                                             |
| -------- | ------------                                                                            |
| `before` | This is the cursor that points to the start of the page of data that has been returned. |
| `after`  | This is the cursor that points to the end of the page of data that has been returned.   |
| `limit`  | This is the number of individual objects that are returned in each page.                |

### Link Header

Pagination links are included in the [Link header](http://tools.ietf.org/html/rfc5988) of responses. It is **important** to follow these Link header values instead of constructing your own URLs as query parameters or  cursor formats may change without notice.

``` http
HTTP/1.1 200 OK
Link: <https://{yourOktaDomain}/api/v1/users?after=00ubfjQEMYBLRUWIEDKK>; rel="next",
  <https://{yourOktaDomain}/api/v1/users?after=00ub4tTFYKXCCZJSGFKM>; rel="self"
```

The possible `rel` values are:

| Link Relation Type | Description                                              |
| ------------------ | ------------                                             |
| `self`             | Specifies the URL of the current page of results         |
| `next`             | Specifies the URL of the immediate next page of results. |

When you first make an API call and get a cursor-paged list of objects, the end of the list will be the point at which you do not receive another `next` link value with the response. This holds true for all but two cases:

1. [Events API](/docs/api/resources/events): The `next` link always exists, since the [Events API](/docs/api/resources/events) is like a stream of data with a cursor.

2. [System Log API](/docs/api/resources/system_log): The `next` link will always exist in polling queries in the [System Log API](/docs/api/resources/system_log). A polling query is defined as an `ASCENDING` query with an empty or absent `until` parameter. Like in the [Events API](/docs/api/resources/events), the polling query is a stream of data.

## Filtering

Filtering allows a requestor to specify a subset of resources to return and is often needed for large collection resources such as Users.  While filtering semantics are standardized in the Okta API, not all resources in the Okta API support filtering. When filtering is supported for a resource, the `filter` URL query parameter contains a filter expression.

The expression language that is used in the filter and search parameters supports references to JSON attributes and literals. The literal values can be strings enclosed in double quotes, numbers, date times enclosed in double quotes, and Boolean values; i.e., true or false. String literals must be valid JSON strings.

The attribute names are case-sensitive while attribute operators are case-insensitive. For example, the following two expressions evaluate to the same logical value:

    filter=firstName Eq "john"

    filter=firstName eq "john"

The filter and search parameters **must** contain at least one valid Boolean expression. Each expression **must** contain an attribute name followed by an attribute operator and optional value. Multiple expressions **may** be combined using the two logical operators. Furthermore expressions can be grouped together using "()".

> Each resource in the Okta API defines what attributes and operators are supported for expression.  *Please refer to resource-specific documentation for details.*

### Operators

Most of the operators listed in the [SCIM Protocol Specification](https://tools.ietf.org/html/rfc7644#section-3.4.2.2) are supported:

| Operator | Description           | Behavior                                                                                                                                                                                                                                                                      |
| -------- | -----------           | --------                                                                                                                                                                                                                                                                      |
| eq       | equal                 | The attribute and operator values must be identical for a match.                                                                                                                                                                                                              |
| sw       | starts with           | The entire operator value must be a substring of the attribute value, starting at the beginning of the attribute value. This criterion is satisfied if the two strings are identical.                                                                                         |
| pr       | present (has value)   | If the attribute has a non-empty value, or if it contains a non-empty node for complex attributes there is a match.                                                                                                                                                           |
| gt       | greater than          | If the attribute value is greater than operator value, there is a match. The actual comparison is dependent on the attribute type. For `String` attribute types, this is a lexicographical comparison and for `Date` types, it is a chronological comparison.                 |
| ge       | greater than or equal | If the attribute value is greater than or equal to the operator value, there is a match. The actual comparison is dependent on the attribute type. For `String` attribute types, this is a lexicographical comparison and for `Date` types, it is a chronological comparison. |
| lt       | less than             | If the attribute value is less than operator value, there is a match. The actual comparison is dependent on the attribute type. For `String` attribute types, this is a lexicographical comparison and for `Date` types, it is a chronological comparison.                    |
| le       | less than or equal    | If the attribute value is less than or equal to the operator value, there is a match. The actual comparison is dependent on the attribute type. For `String` attribute types, this is a lexicographical comparison and for `Date` types, it is a chronological comparison.    |

Note: Some resources don't support all the listed operators.

> All `Date` values use the ISO 8601 format `YYYY-MM-DDTHH:mm:ss.SSSZ`

### Attribute Operators

| Operator | Description | Behavior                                                         |
| -------- | ----------- | --------                                                         |
| and      | Logical AND | The filter is only a match if both expressions evaluate to true. |
| or       | Logical OR  | The filter is a match if either expression evaluates to true.    |

### Logical Operators

| Operator | Description         | Behavior                                                                                                                                                           |
| -------- | -----------         | --------                                                                                                                                                           |
| ()       | Precedence grouping | Boolean expressions may be grouped using parentheses to change the standard order of operations; i.e., evaluate OR logical operators before logical AND operators. |

Filters must be evaluated using standard order of operations. Attribute operators have the highest precedence, followed by the grouping operator (i.e, parentheses), followed by the logical `AND` operator, followed by the logical `OR` operator.

## Hypermedia

Resources in the Okta API use hypermedia for "discoverability".  Hypermedia enables API clients to navigate  resources by following links like a web browser instead of hard-coding URLs in your application.  Links are identified by link relations which are named keys. Link relations describe what resources are available and how they can be interacted with.  Each resource may publish a set of link relationships based on the state of the resource.  For example, the status of a user in the [User API](/docs/api/resources/users/#links-object) will govern which lifecycle operations are permitted.  Only the permitted operations will be published as lifecycle operations.

The Okta API had incorporated [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) or HAL format as the foundation for hypermedia "discoverability".  HAL provides a set of conventions for expressing hyperlinks in JSON responses representing two simple concepts: Resources and Links.

> The HAL-specific media type `application/hal+json` is currently not supported as a formal media type for content negotiation at this time.  Use the standard `application/json` media type.  As we get more experience with the media format we may add support for the media type.

### Resources

A Resource Object represents a resource.

- `"_links"` contains links to other resources.

- `"_embedded"` contains embedded resources.

All other properties represent the current state of the resource.

### Links

Object whose property names are link relation types (as defined by [RFC5988](http://tools.ietf.org/html/rfc5988)) and values are either a Link Object or an array of Link Objects.

- A target URI
- The name of the link relation (`rel`)
- Other optional properties to help with deprecation, object state or lifecycle management, content negotiation, etc.
- Links are implicitly of media type `application/json`.  Other media types are only returned in cases where the link is not an API endpoint.

> A resource may have multiple links that share the same link relation, as shown below for the "logo" link.

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

### Links in Collections

Note that HAL links returned in a collection of resources may not reflect the total set of operations that are possible on that resource.  For example, in a user collection links indicating that a given user can be "unlocked" may not be returned and, if returned, may not reflect the correct user state.

Search and list operations are intended to find matching resources and their identifiers. If you intend to search for a resource and then modify its state or make a lifecycle change, the correct pattern is to first retrieve the resource by 'id' using the "self" link provided for that resource in the collection. This will provide the full set of lifecycle links for that resource based on its most up-to-date state.

## Request Debugging

The request ID will always be present in every API response and can be used for debugging. This value can be used to correlate events from the [Events API](/docs/api/resources/events) as well as the System Log events.

The following header is set in each response:

`X-Okta-Request-Id` - The unique identifier for the API request

``` http
HTTP/1.1 200 OK
X-Okta-Request-Id: reqVy8wsvmBQN27h4soUE3ZEnA
```


## Cross-Origin Resource Sharing (CORS)

[Cross-Origin Resource Sharing (CORS)](http://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing) is a mechanism that allows a web page to make an AJAX call using [XMLHttpRequest (XHR)](http://en.wikipedia.org/wiki/XMLHttpRequest) to a domain that is  different from the one from where the script was loaded.  Such "cross-domain" requests would otherwise be forbidden by web browsers, per the [same origin security policy](http://en.wikipedia.org/wiki/Same_origin_policy).  CORS defines a [standardized](http://www.w3.org/TR/cors/) way in which the browser and the server can interact to determine whether or not to allow the cross-origin request.

In Okta, CORS allows JavaScript hosted on your websites to make an XHR to the Okta API with the Okta session cookie. Every website origin must be explicitly permitted via the administrator UI for CORS.  See [Enabling CORS](/docs/api/getting_started/enabling_cors/) for details on how to allow your website to make cross-origin requests.

> **Caution:** Only grant access to specific origins (websites) that you control and trust to access the Okta API.

### API Support

The Okta API supports CORS on an API by API basis. If you're building an application that needs CORS, please check that the specific operation supports CORS for your use case. APIs that support CORS are marked with the following icon: <SupportsCors />.

## Additional Help

In addition to all the information in this portal, you can view developer videos in our [YouTube channel](https://www.youtube.com/channel/UC5AMiWqFVFxF1q9Ya1FuZ_Q).
