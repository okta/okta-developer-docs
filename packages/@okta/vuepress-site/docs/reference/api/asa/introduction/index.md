# Introduction to the Advanced Server Access API

## Authentication

Most calls to the Advanced Server Access (ASA) API require an HTTP `Authorization`
header with a value of `Bearer ${AUTH_TOKEN}`.

To retrieve an auth token, you need to [create a Service User and API
key](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_asa_service_users),
then pass the API key information to the [Issue a Service User
token](../service-users/#issue-a-service-user-token) endpoint.

Auth tokens may expire at any time, so code that uses them should be prepared
to handle a `401 Unauthorized` response code by creating a new auth token.

## Permissions

The permissions of an ASA User are determined by their ASA Group
memberships.

Each ASA Group that an ASA User is a member of can imply permissions through
Team-wide Roles and Project membership.

## Team-wide Roles

Each ASA Group can have Team-wide Roles affiliated with it. For example, you
might create an `Administrators` Group that grants the `access_admin` Role to
individuals who can make configuration changes.

An ASA User's permissions are equivalent to the most permissive Role that they
are granted.

### Available Team Roles

| Role           | Description |
|----------------|-------------|
|`access_admin`  |This Role grants all available CRUD permissions for a Team.|
|`access_user`   |This Role grants all available read permissions, as well as limited CRUD for resources owned by the relevant ASA User, such as ASA Clients. |
|`reporting_user`|This Role grants read-only access on all endpoints for a Team.|
|`server_admin`  |This Role grants the ability to delete ASA Servers, but no other administrative permissions. This Role is gated behind a feature flag.|

## Pagination

Requests that return lists of objects may support pagination. By default
pagination limits the number of returned objects in a given response to 100.

ASA provides information about pagination in `Link` headers:

* A Link header that contains `rel="next"` indicates that a subsequent page is
  available and contains the URL that should be used to fetch it.
* A Link header that contains `rel="prev"` indicates that a previous page is
  available and contains the URL that should be used to fetch it.

To fetch a full list of resources, Clients should use the following approach
when retrieving lists:

1. Perform the desired list call without providing any pagination-related
   parameters.
2. Process the response body by referencing objects in the body field called
   `list`.
3. Check for a Link header value with `rel="next"`. If such a value exists,
   fetch it and repeat steps two and three.

Clients that want to fetch pages of less than 100 items (for testing
pagination, for example) may pass a `count` parameter to the initial list call.
This parameter is automatically propagated to each of the pagination Link URLs
that are contained in the response, so that it is only necessary to provide the
parameter to the initial call.

List responses that don't currently implement pagination limits may begin to
do so without warning in the future. As a result, it is recommended that
Clients implement pagination when calling any list method, so that they
automatically continue working if pagination is implemented.

An example of a paginated response body that contains a `list` field:

```json
{
  "list": [
    {
      "id": "5dfc51da-3991-4330-88bf-ef710a7d53e5",
      "name": "everyone",
      "roles": [
        "access_admin",
        "access_user"
      ],
      "federated_from_team": null,
      "federation_approved_at": null,
      "deleted_at": null
    },
    {
      "id": "ad2ff761-83da-4769-b86c-85042eefc1d7",
      "name": "owners",
      "roles": [
        "access_admin",
        "access_user"
      ],
      "federated_from_team": null,
      "federation_approved_at": null,
      "deleted_at": null
    }
  ]
}
```

## Rate limiting

Rate limits for Advanced Server Access limit access to APIs. By default users
are limited to 10,000 API requests per hour collectively across most endpoints.
In the future, Team-wide rate limits may be implemented.

Every API response includes three headers related to rate limiting:

* `X-RateLimit-Limit` - describes the total number of operations permitted per
  rate limit period (currently one hour on all endpoints)
* `X-RateLimit-Remaining` - describes the total number of remaining operations
  permitted during the current rate limit period
* `X-RateLimit-Reset` - contains the unix timestamp for the beginning of the
  next rate limit period

Requests that exceed a rate limit receive an `HTTP 429 - Too Many Requests`
error response.

To request a rate limit increase [contact support](https://support.okta.com/help/s/opencase).

## Errors

Advanced Server Access can return the following HTTP errors:
| Error                        | Code  | Description | 
|------------------------------|-------|-------------|
|`invalid_request`             | `400` | This error is usually returned on an improper or invalid request body. The request should be modified before being reattempted.|
|`authentication_error`        | `401` | A correct API token wasn't provided. A new token should be retrieved before reattempting. | 
|`authorization_error`         | `401` | The current User doesn't have permissions to access the resource requested. Occasionally this is the result of permissions expiring and can be remedied by reauthenticating. |
|`server_authorization_revoked`| `401` | A previously deleted Server attempted to reconnect with its old token. Re-enroll the Server to remedy this error.|
|`forbidden_error`             | `403` | A User requests a resource that they don't have access to.
|`quota_exceeded`              | `403` | A Team exceeded the allotted resource type. Contact support to increase your quota. |
|`resource_does_not_exist`     | `404` | A resource doesn't exist. Most likely the path parameters of the URL are incorrectly spelled or the specific resource was deleted.|
|`resource_deprecated`         | `404` | An attempt was made to access a deprecated resource.|
|`resource_already_exists`     | `409` | An attempt was made to create a resource that already exists. Change key elements of the request (for example, the name) before reattempting. |
|`unsupported_content_type`    | `415` | The request body isn't formatted as a JSON object. Check your request body and `Content-Type` header before reattempting.|
|`too_many_requests`           | `429` | Too many API requests were received. Either wait and try again or contact support to solve this issue. |
|`client_closed_connection`    | `499` | The client terminated the connection before the server received all of the data. Try again or provide a smaller request.|
|`disabled_team`               | `403` | The ASA Team that is being accessed is disabled. Contact support to solve this issue.|
|`service_offline`             | `503` | The service is temporarily offline. Try again later.|
|`gateway_timeout`             | `504` | The Gateway responded within the timeout period. Try again later. |
|`unknown_error`               | `500` | This error is for miscellaneous API errors. This error is usually temporary and can be retried. |
