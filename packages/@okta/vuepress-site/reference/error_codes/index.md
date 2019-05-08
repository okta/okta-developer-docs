---
title: Error Codes
excerpt: Understand Okta API errors.
redirect_from:
  - /docs/getting_started/error_codes
  - /reference/error_codes/
---

# Overview

This document provides further information about the errors that the Okta API returns. The first table is listed by error code, and the second table is listed by HTTP return code.

## Okta Error Codes Listed by Error Code

| Error Code                      | Description                                                                                                                                                                           | HTTP Return Code |
| ------------                    | -------------                                                                                                                                                                         | ------------     |
| <a name="E0000001"></a>E0000001 | API validation failed.                                                                                                                                                                | 400              |
| <a name="E0000002"></a>E0000002 | The request was not valid.                                                                                                                                                            | 400              |
| <a name="E0000003"></a>E0000003 | The request body was not well-formed.                                                                                                                                                 | 400              |
| <a name="E0000004"></a>E0000004 | Authentication failed.                                                                                                                                                                | 401              |
| <a name="E0000005"></a>E0000005 | Invalid session.                                                                                                                                                                      | 403              |
| <a name="E0000006"></a>E0000006 | You do not have permission to perform the requested action.                                                                                                                           | 403              |
| <a name="E0000007"></a>E0000007 | Not found.                                                                                                                                                                            | 404              |
| <a name="E0000008"></a>E0000008 | The requested path was not found.                                                                                                                                                     | 404              |
| <a name="E0000009"></a>E0000009 | Internal Server Error.                                                                                                                                                                | 500              |
| <a name="E0000010"></a>E0000010 | Service is in read-only mode.                                                                                                                                                         | 503              |
| <a name="E0000011"></a>E0000011 | Invalid token provided.                                                                                                                                                               | 401              |
| <a name="E0000012"></a>E0000012 | Unsupported media type.                                                                                                                                                               | 404              |
| <a name="E0000013"></a>E0000013 | Invalid client app ID.                                                                                                                                                                | 403              |
| <a name="E0000014"></a>E0000014 | Update of credentials failed.                                                                                                                                                         | 403              |
| <a name="E0000015"></a>E0000015 | You do not have permission to access the feature you are requesting.                                                                                                                  | 401              |
| <a name="E0000016"></a>E0000016 | Activation failed because the user is already active.                                                                                                                                 | 403              |
| <a name="E0000017"></a>E0000017 | Password reset failed.                                                                                                                                                                | 403              |
| <a name="E0000018"></a>E0000018 | Bad request. Accept and/or Content-Type headers are likely not set.                                                                                                                   | 400              |
| <a name="E0000019"></a>E0000019 | Bad request. Accept and/or Content-Type headers likely do not match supported values.                                                                                                 | 400              |
| <a name="E0000020"></a>E0000020 | Bad request.                                                                                                                                                                          | 400              |
| <a name="E0000021"></a>E0000021 | Bad request. Accept and/or Content-Type headers likely do not match supported values.                                                                                                 | 400              |
| <a name="E0000022"></a>E0000022 | The endpoint does not support the provided HTTP method.                                                                                                                               | 404              |
| <a name="E0000023"></a>E0000023 | Operation failed because user profile is mastered under another system.                                                                                                               | 403              |
| <a name="E0000024"></a>E0000024 | Bad request. This operation on app metadata is not yet supported.                                                                                                                     | 400              |
| <a name="E0000025"></a>E0000025 | App version assignment failed.                                                                                                                                                        | 400              |
| <a name="E0000026"></a>E0000026 | This endpoint has been deprecated.                                                                                                                                                    | 404              |
| <a name="E0000027"></a>E0000027 | Bad group push request.                                                                                                                                                               | 400              |
| <a name="E0000028"></a>E0000028 | The request is missing a required parameter.                                                                                                                                          | 400              |
| <a name="E0000029"></a>E0000029 | Invalid paging request. Ensure the pagination cursor has not been altered                                                                                                             | 400              |
| <a name="E0000030"></a>E0000030 | Bad request. Invalid date. Dates must be of the form yyyy-MM-dd''T''HH:mm:ss.SSSZZ, e.g. 2013-01-01T12:00:00.000-07:00.                                                               | 400              |
| <a name="E0000031"></a>E0000031 | Bad request. Invalid filter parameter.                                                                                                                                                | 400              |
| <a name="E0000032"></a>E0000032 | Unlock is not allowed for this user.                                                                                                                                                  | 403              |
| <a name="E0000033"></a>E0000033 | Bad request. Can't specify a search query and filter in the same request.                                                                                                             | 400              |
| <a name="E0000034"></a>E0000034 | Forgot password not allowed on specified user.                                                                                                                                        | 403              |
| <a name="E0000035"></a>E0000035 | Change password not allowed on specified user.                                                                                                                                        | 403              |
| <a name="E0000036"></a>E0000036 | Change recovery question not allowed on specified user.                                                                                                                               | 403              |
| <a name="E0000037"></a>E0000037 | Type mismatch exception.                                                                                                                                                              | 400              |
| <a name="E0000038"></a>E0000038 | This operation is not allowed in the user's current status.                                                                                                                           | 403              |
| <a name="E0000039"></a>E0000039 | Operation on application settings failed.                                                                                                                                             | 403              |
| <a name="E0000040"></a>E0000040 | Application label must not be the same as an existing application label.                                                                                                              | 400              |
| <a name="E0000041"></a>E0000041 | Credentials should not be set on this resource based on the scheme.                                                                                                                   | 400              |
| <a name="E0000042"></a>E0000042 | Setting the error page redirect URL failed.                                                                                                                                           | 403              |
| <a name="E0000043"></a>E0000043 | Self-service application assignment is not enabled.                                                                                                                                   | 403              |
| <a name="E0000044"></a>E0000044 | Self-service application assignment is not supported.                                                                                                                                 | 403              |
| <a name="E0000045"></a>E0000045 | Field mapping bad request.                                                                                                                                                            | 400              |
| <a name="E0000046"></a>E0000046 | Deactivate application for user forbidden.                                                                                                                                            | 403              |
| <a name="E0000047"></a>E0000047 | API call exceeded rate limit due to too many requests.                                                                                                                                | 429              |
| <a name="E0000048"></a>E0000048 | Entity not found exception.                                                                                                                                                           | 404              |
| <a name="E0000049"></a>E0000049 | Invalid SCIM data from SCIM implementation.                                                                                                                                           | 500              |
| <a name="E0000050"></a>E0000050 | Invalid SCIM data from client.                                                                                                                                                        | 400              |
| <a name="E0000051"></a>E0000051 | No response from SCIM implementation.                                                                                                                                                 | 500              |
| <a name="E0000052"></a>E0000052 | Endpoint not implemented.                                                                                                                                                             | 501              |
| <a name="E0000053"></a>E0000053 | Invalid SCIM filter.                                                                                                                                                                  | 400              |
| <a name="E0000054"></a>E0000054 | Invalid pagination properties.                                                                                                                                                        | 400              |
| <a name="E0000055"></a>E0000055 | Duplicate group.                                                                                                                                                                      | 409              |
| <a name="E0000056"></a>E0000056 | Delete application forbidden.                                                                                                                                                         | 403              |
| <a name="E0000057"></a>E0000057 | Access to this application is denied due to a policy.                                                                                                                                 | 403              |
| <a name="E0000058"></a>E0000058 | Access to this application requires MFA.                                                                                                                                              | 403              |
| <a name="E0000059"></a>E0000059 | The connector configuration could not be tested. Make sure that the URL and Authentication Parameters are correct, and that there is an implementation available at the URL provided. | 500              |
| <a name="E0000060"></a>E0000060 | Unsupported operation.                                                                                                                                                                | 404              |
| <a name="E0000061"></a>E0000061 | Tab error.                                                                                                                                                                            | 403              |
| <a name="E0000063"></a>E0000063 | Invalid combination of parameters specified.                                                                                                                                          | 400              |
| <a name="E0000064"></a>E0000064 | Password is expired and must be changed.                                                                                                                                              | 401              |
| <a name="E0000068"></a>E0000068 | Invalid Passcode/Answer.                                                                                                                                                               | 401              |
| <a name="E0000069"></a>E0000069 | User Locked.                                                                                                                                                                          | 403              |
| <a name="E0000081"></a>E0000081 | Cannot modify the test attribute because it is a reserved attribute for this application.                                                                                             | 400              |
| <a name="E0000109"></a>E0000109 | An SMS message was recently sent. Please wait 30 seconds before trying again.                                                                                                         | 429              |
| <a name="E0000112"></a>E0000112 | Cannot update this user because they are still being activated. Please try again in a few minutes.                                                                                    | 409              |
| <a name="E0000113"></a>E0000113 | A phone call was recently made. Please wait 30 seconds before trying again.                                                                                                           | 429              |


## Okta Error Codes Listed by HTTP Return Code

<table>
<tr><th><strong>HTTP Return Code</strong></th><th><strong>Error Code</strong></th><th><strong>Description</strong></th></tr>
<tr><td rowspan="24" bgcolor="#FFFFFF"><strong>400</strong></td><td>E0000001</td><td>API validation failed.</td></tr>
<tr><td>E0000002</td><td>The request was not valid.</td></tr>
<tr><td>E0000003</td><td>The request body was not well-formed.</td></tr>
<tr><td>E0000018</td><td>Bad request. Accept and/or Content-Type headers are likely not set.</td></tr>
<tr><td>E0000019</td><td>Bad request. Accept and/or Content-Type headers likely do not match supported values.</td></tr>
<tr><td>E0000020</td><td>Bad request.</td></tr>
<tr><td>E0000021</td><td>Bad request. Accept and/or Content-Type headers likely do not match supported values.</td></tr>
<tr><td>E0000024</td><td>Bad request. This operation on app metadata is not yet supported.</td></tr>
<tr><td>E0000025</td><td>App version assignment failed.</td></tr>
<tr><td>E0000027</td><td>Bad group push request.</td></tr>
<tr><td>E0000028</td><td>The request is missing a required parameter.</td></tr>
<tr><td>E0000029</td><td>Invalid paging request.</td></tr>
<tr><td>E0000030</td><td>Bad request. Invalid date. Dates must be of the form yyyy-MM-dd''T''HH:mm:ss.SSSZZ, e.g. 2013-01-01T12:00:00.000-07:00.</td></tr>
<tr><td>E0000031</td><td>Bad request. Invalid filter parameter.</td></tr>
<tr><td>E0000033</td><td>Bad request. Can't specify a search query and filter in the same request.</td></tr>
<tr><td>E0000037</td><td>Type mismatch exception.</td></tr>
<tr><td>E0000040</td><td>Application label must not be the same as an existing application label.</td></tr>
<tr><td>E0000041</td><td>Credentials should not be set on this resource based on the scheme.</td></tr>
<tr><td>E0000045</td><td>Field mapping bad request.</td></tr>
<tr><td>E0000050</td><td>Invalid SCIM data from client.</td></tr>
<tr><td>E0000053</td><td>Invalid SCIM filter.</td></tr>
<tr><td>E0000054</td><td>Invalid pagination properties.</td></tr>
<tr><td>E0000063</td><td>Invalid combination of parameters specified.</td></tr>
<tr><td>E0000081</td><td>Cannot modify the test attribute because it is a reserved attribute for this application.</td></tr>
<tr><td rowspan="5" bgcolor="#FFFFFF"><strong>401</strong></td><td>E0000004</td><td>Authentication failed.</td></tr>
<tr><td>E0000011</td><td>Invalid token provided.</td></tr>
<tr><td>E0000015</td><td>You do not have permission to access the feature you are requesting.</td></tr>
<tr><td>E0000064</td><td>Password is expired and must be changed.</td></tr>
<tr><td>E0000068</td><td>Invalid Passcode/Answer.</td></tr>
<tr><td rowspan="22" bgcolor="#FFFFFF"><strong>403</strong></td><td>E0000005</td><td>Invalid session.</td></tr>
<tr><td>E0000006</td><td>You do not have permission to perform the requested action.</td></tr>
<tr><td>E0000013</td><td>Invalid client app ID.</td></tr>
<tr><td>E0000014</td><td>Update of credentials failed.</td></tr>
<tr><td>E0000016</td><td>Activation failed because the user is already active.</td></tr>
<tr><td>E0000017</td><td>Password reset failed.</td></tr>
<tr><td>E0000023</td><td>Operation failed because user profile is mastered under another system.</td></tr>
<tr><td>E0000032</td><td>Unlock is not allowed for this user.</td></tr>
<tr><td>E0000034</td><td>Forgot password not allowed on specified user.</td></tr>
<tr><td>E0000035</td><td>Change password not allowed on specified user.</td></tr>
<tr><td>E0000036</td><td>Change recovery question not allowed on specified user.</td></tr>
<tr><td>E0000038</td><td>This operation is not allowed in the user's current status.</td></tr>
<tr><td>E0000039</td><td>Operation on application settings failed.</td></tr>
<tr><td>E0000042</td><td>Setting the error page redirect URL failed.</td></tr>
<tr><td>E0000043</td><td>Self-service application assignment is not enabled.</td></tr>
<tr><td>E0000044</td><td>Self-service application assignment is not supported.</td></tr>
<tr><td>E0000046</td><td>Deactivate application for user forbidden.</td></tr>
<tr><td>E0000056</td><td>Delete application forbidden.</td></tr>
<tr><td>E0000057</td><td>Access to this application is denied due to a policy.</td></tr>
<tr><td>E0000058</td><td>Access to this application requires MFA.</td></tr>
<tr><td>E0000061</td><td>Tab error.</td></tr>
<tr><td>E0000069</td><td>User Locked.</td></tr>
<tr><td rowspan="7" bgcolor="#FFFFFF"><strong>404</strong></td><td>E0000007</td><td>Not found.</td></tr>
<tr><td>E0000008</td><td>The requested path was not found.</td></tr>
<tr><td>E0000012</td><td>Unsupported media type.</td></tr>
<tr><td>E0000022</td><td>The endpoint does not support the provided HTTP method.</td></tr>
<tr><td>E0000026</td><td>This endpoint has been deprecated.</td></tr>
<tr><td>E0000048</td><td>Entity not found exception.</td></tr>
<tr><td>E0000060</td><td>Unsupported operation.</td></tr>
<tr><td rowspan="2" bgcolor="#FFFFFF"><strong>409</strong></td><td>E0000055</td><td>Duplicate group.</td></tr>
<tr><td>E0000112</td><td>Cannot update this user because they are still being activated. Please try again in a few minutes.</td></tr>
<tr><td rowspan="3" bgcolor="#FFFFFF"><strong>429</strong></td><td>E0000047</td><td>API call exceeded rate limit due to too many requests.</td></tr>
<tr><td>E0000109</td><td>An SMS message was recently sent. Please wait 30 seconds before trying again.</td></tr>
<tr><td>E0000113</td><td>A phone call was recently made. Please wait 30 seconds before trying again.</td></tr>
<tr><td rowspan="4" bgcolor="#FFFFFF"><strong>500</strong></td><td>E0000009</td><td>Internal Server Error.</td></tr>
<tr><td>E0000049</td><td>Invalid SCIM data from SCIM implementation.</td></tr>
<tr><td>E0000051</td><td>No response from SCIM implementation.</td></tr>
<tr><td>E0000059</td><td>The connector configuration could not be tested. Make sure that the URL and Authentication Parameters are correct, and that there is an implementation available at the URL provided.</td></tr>
<tr><td rowspan="1" bgcolor="#FFFFFF"><strong>501</strong></td><td>E0000052</td><td>Endpoint not implemented.</td></tr>
<tr><td rowspan="1" bgcolor="#FFFFFF"><strong>503</strong></td><td>E0000010</td><td>Service is in read-only mode.</td></tr>
</table>


## OpenID Connect and Okta Social Authentication

In stituations where Okta needs to pass an error to a downstream application via a `redirect_uri`, the error code and description will be encoded as the query parameters `error` and `error_description`.

> For example, if the **redirect_uri** is **https://example.com**, then the **ACCESS_DENIED** error would be passed as follows:
>
> ```
> https://example.com?error=access_denied&error_description=The%20resource%20owner%20or%20authorization%20server%20denied%20the%20request.
> ```


<table>
<thead>
<tr>
<th scope="col" class="left">error</th>
<th scope="col" class="left">error_description</th>
</tr>
</thead>

<tbody>

<tr>
<td class="left">unauthorized_client</td>
<td class="left">The client is not authorized to request an authorization code using this method.</td>
</tr>

<tr>
<td class="left">access_denied</td>
<td class="left">The resource owner or authorization server denied the request.</td>
</tr>

<tr>
<td class="left">unsupported_response_type</td>
<td class="left">The authorization server does not support obtaining an authorization code using this method.</td>
</tr>

<tr>
<td class="left">unsupported_response_mode</td>
<td class="left">The authorization server does not support the requested response mode.</td>
</tr>

<tr>
<td class="left">invalid_scope</td>
<td class="left">The requested scope is invalid, unknown, or malformed.</td>
</tr>

<tr>
<td class="left">server_error</td>
<td class="left">The authorization server encountered an unexpected condition that prevented it from fulfilling the request.</td>
</tr>

<tr>
<td class="left">temporarily_unavailable</td>
<td class="left">The authorization server is currently unable to handle the request due to a temporary overloading or maintenance of the server.</td>
</tr>

<tr>
<td class="left">invalid_client</td>
<td class="left">The specified client is not valid.</td>
</tr>

<tr>
<td class="left">login_required</td>
<td class="left">The client specified not to prompt, but the user is not logged in.</td>
</tr>

<tr>
<td class="left">invalid_request</td>
<td class="left">The request parameters are not valid.</td>
</tr>


<tr>
<td class="left">user_canceled_request</td>
<td class="left">User canceled the social login request.</td>
</tr>


</tbody>
</table>
