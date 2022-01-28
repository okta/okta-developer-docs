---
title: Auth JS fundamentals
---

<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

This guide explains authentication fundamentals using Auth JS, formally known as the Okta Auth JavaScript SDK, and provides a simple SPA application to demonstrate a sign-in use case.

---

**Learning outcomes**

* Understand how to implement basic sign-in using the Okta Auth JavaScript SDK.
* Understand basic installation and code configurations using the Okta Auth JavaScript SDK.
* Implement the sample SPA use case and sign a user in to the application.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* Basic knowledge of building front-end JavaScript applications

**Sample code**

* [static-spa sample](https://github.com/okta/okta-auth-js/tree/master/samples/generated/static-spa)

---

## About the Okta Auth JavaScript SDK

## Installation

## Add code to reference the SDK

### Initialize the SDK

    var authClient = new OktaAuth({})

### Create a sign-in page

### Authenticate user credentials

    idx.authenticate

### Handle responses

    Idx.Status.SUCCESS

    and other cases

### Get the user profile information

    authClient.token.getUserInfo(accessToken, idToken)

## Run the sample application

### Create an app integration

### Download and install the sample app

### Run the sample app

## Next steps

## See also

