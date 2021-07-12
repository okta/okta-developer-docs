
| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Support for Push Status using the Apps API is GA in Preview](#support-for-push-status-using-the-apps-api-is-ga-in-preview) | August 2, 2021 |
| [Bugs fixed in 2021.08.0](#bugs-fixed-in-2021-08-0) | August 2, 2021 |

#### Support for Push Status using the Apps API is GA in Preview

Developers can use the `pushStatus` parameter to handle a username update to an app integration. Previously, this option wasn't available through the [Apps API](/docs/reference/api/apps), which caused inconsistent behavior between app integrations configured using the Okta Admin Console and those configured through the API.
<!--OKTA-405533-->

### Bugs fixed in 2021.08.0

- The IdP claim wasn't available in the `id_token` or included with the Token Inline Hook request. (OKTA-407459)

- When the Users lifecycle API `users/{{userId}}/lifecycle/reset_factors` was called to reset user factors, a status 403 error was received, even with a valid bearer token and scope (`okta.users.manage`). (OKTA-404613)
