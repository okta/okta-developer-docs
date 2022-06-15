---
title: MyAccount migration
category: management
---

# MyAccount API migration guide

<ApiLifecycle access="ie" />

This guide describes how to migrate from the `v1` version to the `idp` version of the MyAccount API. See [MyAccount API](/docs/reference/api/myaccount/) for the reference documentation of the latest version.

## OIE migration

The `idp` version of the MyAccount API only works on Okta Identity Engine. See [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/main/) if you need to upgrade.

## Use the Postman collection

To run the Postman collection of the `idp` version of the API, you need an end-user access token. Use an [SDK](/docs/guides/auth-js/-/main/) to get the token.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/9cb68745dbf85ae3a871)

## Use the Auth.js SDK

For a limited time, customers that already use the deprecated API can call endpoints of both versions of the API.

You can access the `idp` version using the [Auth.js SDK](https://github.com/okta/okta-auth-js).

## Differences

### Endpoints

The enhanced MyAccount API is accessible at `/idp/myaccount`.

The `/api/v1/myaccount` endpoint is deprecated.

### API Versioning

The new version of the MyAccount API doesn't have the API version number in the request URL. To access the `Idp` version of the API, you need a valid API version in the `Accept` header. The current version is v1.0.0.

```json
Accept: application/json; okta-version=1.0.0
```

### Admin tokens

The MyAccount API now provides user-scoped endpoints that don’t require admin tokens. End users only need a bearer token to update their profile, or email and phone authenticators.

> **Note:** Admin users are unable to call the endpoints of the `idp` version of the MyAccount API.

### Authentication

If a user wants to change their profile, access tokens are only valid for 15 minutes.

### Profile endpoints

End users can't modify their email address or phone number in a profile update. They need to make a PUT request to one of the following endpoints:

* `/idp/myaccount/emails`
* `/idp/myaccount/phones`

Users can still modify their profile, but with a lower granularity. That is, they can only modify the profile itself:

* `/idp/myaccount/profile`

The [Me object](/docs/reference/api/archive-myaccount/#me-object) no longer exists. Also, the following endpoints are deprecated:

* `/api/v1/myaccount`
* `/api/v1/myaccount/profile/schema`
* `/api/v1/myaccount/directoryProfile`

### Email notification templates

A new default email notification is sent to users who try to verify an email address using the new MyAccount API. To confirm the change, users must enter the one-time password (OTP) included in the email.

Here are the details of the new template:

| UI name | Default subject line | API object reference</br>`${templateName}` | Required validation fields | Description |
|---------|---------|----------------------|----------|---------|
| Idp MyAccount Email Change Confirmation | Confirm email address change | `MyAccountChangeConfirmation` | N/A | Sent to users who try to verify an email address using MyAccount APIs. The users must enter the provided code to confirm the change. |

See [Edit a default email template](/docs/guides/custom-email/main/#edit-a-default-email-template).

### Scopes

The scopes for the enhanced MyAccount API offer greater breadth and higher granularity. You can read or update phone, email, and profile. The deprecated version of the API only provides scopes for profile modification.

> **Note:** If you have a custom Authorization Server, the MyAccount API-related scopes are granted by default. See [Create an Authorization Server](/docs/guides/customize-authz-server/-/main/).

See [Grant the required scopes](/docs/guides/configure-user-scoped-account-management/main/#grant-the-required-scopes).

### Error messages

The new version of the API comes with new error messages. Examples include:

* invalid profile attributes
* invalid email ID
* email operation not enabled in your org

See [Update My User Profile - Error responses](/docs/reference/api/myaccount/#error-responses-8).
