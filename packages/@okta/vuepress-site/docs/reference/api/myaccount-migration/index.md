---
title: MyAccount migration
category: management
---

# MyAccount API migration guide

<ApiLifecycle access="ie" />

This guide describes how to migrate from the `v1` version to the `idp` version of the MyAccount API.

See reference docs


## OIE migration

Classic Engine (AuthN)

new version is Identity Engine or Idp

See [Identity Engine upgrade overview](/docs/guides/oie-upgrade-overview/main/) for complete details.

## Use the Postman collection

It is up to you how you set up users to call the MyAccount API to manage their account. In this guide, we provide sample API calls using a Postman collection to demonstrate them in a language/platform neutral way.

> **Note:** To run the Postman collection, you need an end-user access token. Use an [SDK](/docs/guides/auth-js/-/main/) to get the token.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/9cb68745dbf85ae3a871)

## Libraries

As a user of the AuthN version of the API, you can access the new API for a limited time.


AuthN Management SDKs


Idp version is Auth.js SDK https://github.com/okta/okta-auth-js

## Path

/api/v1/myaccount - management APIs

/idp/myaccount - 

## API Versioning

### AuthN

In path /api/v1/myaccount

### Idp

To access the Idp version of the API, you need a valid API version in the `Accept` header. Current version: V1.0.0

```json
Accept: application/json; okta-version=1.0.0
```

## Profile endpoints

Profile endpoints are different: 
/api/v1/myaccount/profile/schema
/api/v1/myaccount/directoryProfile

/me doesn’t exist


## Email templates

### AuthN

Change email confirmation – link to settings app

### Idp

Idp MyAccount/ (newly added) – just an OTP

See 

## Scopes

AuthN myaccount/profile - lower granularity. can only modify profile.

Idp - greater breadth and higher granularity. Can read or update phone, email, and profile.

See [Grant the required scopes](/docs/guides/configure-user-scoped-account-management/main/#grant-the-required-scopes).

## Error messages

New messages for new APIs. for example: error codes e.g., changing email through profile update, etc. (an operation that is no longer viable)

See [Update My User Profile - Error responses](/docs/reference/api/myaccount/#error-responses-8).