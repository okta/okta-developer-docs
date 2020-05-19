---
title: Okta API Error Codes
meta:
  - name: description
    content: Here you can find further information about the errors that the Okta API returns, sorted by error code and HTTP return code.
showToc: false
---

# Okta Error Codes and Descriptions

This document contains a complete list of all errors that the Okta API returns.

All errors contain the follow fields:

| Property       | Description                                                                                                                             |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `errorCode`    | An Okta code for this type of error.                                                                                                    |
| `errorSummary` | A short description of what caused this error. Sometimes this will contain dynamically-generated information about your specific error. |
| `errorLink`    | An Okta code for this type of error.                                                                                                    |
| `errorId`      | A unique identifier for this error. This can be used by Okta Support to help with troubleshooting.                                      |
| `errorCauses`  | (Optional) Further information about what caused this error.                                                                            |

<ErrorCodes />


## Example Errors for OpenID Connect and Social Login

In situations where Okta needs to pass an error to a downstream application via a `redirect_uri`, the error code and description will be encoded as the query parameters `error` and `error_description`.

> For example, if the **redirect_uri** is **https://example.com**, then the **ACCESS_DENIED** error would be passed as follows:
>
> ```
> https://example.com?error=access_denied&error_description=The%20resource%20owner%20or%20authorization%20server%20denied%20the%20request.
> ```

| Property                    | Description                                                                                                                     |
|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `unauthorized_client`       | The client is not authorized to request an authorization code using this method.                                                |
| `access_denied`             | The resource owner or authorization server denied the request.                                                                  |
| `unsupported_response_type` | The authorization server does not support obtaining an authorization code using this method.                                    |
| `unsupported_response_mode` | The authorization server does not support the requested response mode.                                                          |
| `invalid_scope`             | The requested scope is invalid, unknown, or malformed.                                                                          |
| `server_error`              | The authorization server encountered an unexpected condition that prevented it from fulfilling the request.                     |
| `temporarily_unavailable`   | The authorization server is currently unable to handle the request due to a temporary overloading or maintenance of the server. |
| `invalid_client`            | The specified client is not valid.                                                                                              |
| `login_required`            | The client specified not to prompt, but the user is not logged in.                                                              |
| `invalid_request`           | The request parameters are not valid.                                                                                           |
| `user_canceled_request`     | User canceled the social login request.                                                                                         |


