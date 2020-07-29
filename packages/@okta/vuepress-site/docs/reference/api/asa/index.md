# Introduction to the Advanced Server Access (ASA) API

## Authentication

Most calls to the Advanced Server Access API require an HTTP `Authorization`
header with a value of the form `Bearer ${AUTH_TOKEN}`.

To retrieve an auth token, you'll need to [create a service user and API
key](https://help.okta.com/en/prod/Content/Topics/Adv_Server_Access/docs/service-users.htm),
then pass the API key information to the [Issue a Service User
Token](../service-users/#issue-a-service-user-token) endpoint.

Auth tokens may expire at any time, so code using them should be prepared to
handle a `401 Unauthorized` response code by creating a new one.

## Permissions

The permissions of an ASA User will be determined by their ASA Group
memberships.

Each ASA Group that an ASA User is a member of can imply permissions via Team-wide
Roles and Project membership.

## Team-wide Roles

Each ASA Group can have Team-wide Roles affiliated with it. For example, you might
create an `Administrators` Group that grants the `access_admin` Role to
individuals who can make configuration changes.

An ASA User's permissions will be equivalent to the most permissive Role that
they are granted.

### Available Team Roles

| Role | Description |
|------|-------------|
|`access_admin`|This Role grants all available CRUD permissions for a Team.|
|`access_user`|This Role grants all available read permissions, as well as limited CRUD for resources owned by the relevant ASA User, such as ASA Clients. |
|`reporting_user`|This Role grants read-only access on all endpoints for a Team.|
|`server_admin`|This Role grants the ability to delete ASA Servers, but no other administrative permissions. This Role is gated behind a feature flag.|

## Pagination

Requests which return lists of objects may support pagination. By default
pagination limits the number of returned objects in a given response to 100.

ASA provides information about pagination in `Link` headers:

* A Link header with `rel="next"` indicates that a subsequent page is available
  and contains the URL which should be used to fetch it.
* A Link header with `rel="prev"` indicates that a previous page is available
  and contains the URL which should be used to fetch it.

In order to fetch a full list of resources, clients should utilize the
following approach when retrieving lists:

1. Perform the desired list call without providing any pagination-related
   parameters
2. Process the response body by referencing objects in the body field called
   `list`
3. Check for a Link header value with `rel="next"` - if such a value exists,
   fetch it and repeat steps 2 and 3

Clients wishing to fetch pages of less than 100 items (for testing pagination,
for example) may pass a `count` parameter to the initial list call. This
parameter will be automatically propagated to each of the pagination Link
URLs contained in the response, such that it is only necessary to provide the
parameter to the initial call.

List responses which don't currently implement pagination limits may begin to
do so without warning in the future. As a result, it is recommended that
clients implement pagination when calling any list method, so that they
will automatically continue working at such time as pagination is
implemented.

An example of a paginated response body, containing a `list` field:

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

## Rate Limiting

Advanced Server Access rate limits access to APIs. By default users are limited
to 10,000 API requests per hour collectively across most endpoints. In the
future Team-wide rate limits may be implemented.

Every API response includes three headers related to rate-limiting:

* `X-RateLimit-Limit` - describes the total number of operations permitted per
  rate limit period (currently 1 hour on all endpoints)
* `X-RateLimit-Remaining` - describes the total number of remaining operations
  permitted during the current rate limit period
* `X-RateLimit-Reset` - contains the unix timestamp of the beginning of the
  next rate limit period

Requests which exceed a rate limit will receive an `HTTP 429 - Too Many Requests`
error response.

To request a rate limit increase [contact support](https://support.okta.com/help/s/opencase).

## Errors

The Advanced Server Access can provide the following HTTP error codes:
| Error | Code | Description | 
|-------|------|-------------|
|`invalid_request`| `400` | This error is usually returned on an improper or invalid request body. The request should be modified before being reattempted.|
|`authentication_error`| `401` | A correct API token was not provided. A new token should retrieved before reattempting. | 
|`authorization_error`| `401` | The current user does not have permissions to access the resource requested. Occasionally this is the result of permissions expiring and can be remedied by reauthenticating. |
|`server_authorization_revoked`| `401` | This error occurs when a previously deleted server attempts to reconnect with its old token. Please re-enroll the server to remedy this error.|
|`forbidden_error`| `403` | This error occurs when the user requests a resource that they do not have access to.
|`quota_exceeded`| `403` | This error occurs when a Team exceeds the allotted resource type. Please contact support to increase your quota. |
|`resource_does_not_exist`| `404`| The error occurs when a resource does not exist. Most likely the path parameters of the URL are incorrectly spelled or the specific resource has been deleted.|
|`resource_deprecated`| `404`| The error occurs when attempting to access a deprecated.|
|`resource_already_exists`| `409` | This error occurs when attempting to create a resource that already exists. Please change key elements of the request (e.g. name) before reattempting. |
|`unsupported_content_type`|`415`| This error occurs when the request body is not formatted as a JSON object. Please check your request body and `Content-Type` header before reattempting.|
|`too_many_requests`| `429`| This error occurs when too many API requests have been received. Please either wait or contact support to solved this issue. |
|`client_closed_connection`| `499` | This error occurs when the client terminates the connection before the server receives all the data. Please try again or provide a smaller request.|
|`disabled_team`| `403` | This error occurs when the ASA Team being accessed is disabled. Please contact support to solve this issue.|
|`service_offline`| `503` | This error occurs if the service is temporarily offline. Please try again later.|
|`gateway_timeout`| `504` | The gateway did respond within the timeout period.  Please try again later.|
|`unknown_error`| `500` | This error is for miscellaneous API errors. This error is usually temporary and can be retried. |
