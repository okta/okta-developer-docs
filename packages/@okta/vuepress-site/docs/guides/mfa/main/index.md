---
title: Add multifactor authentication
meta:
  - name: description
    content: Use this guide to learn how to add multifactor authentication to your apps and how to deploy our built-in factors or integrate with existing tokens.
layout: Guides
---

This guide explains how to implement multifactor authentication (MFA) and provides an example of how to use the Okta Factors API to add an additional factor for a user.

---

**Learning outcomes**

* Set up your Okta org to use MFA.
* Enroll, activate, and test a factor. The examples shown are Google Authenticator and SMS.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup)
* [Postman configured](/code/rest/) to make API requests to your Developer Edition org
* The Users API and Factors API [Postman collections](/docs/reference/postman-collections/)
* [An API token](/docs/guides/create-an-api-token/) (created in your Okta org)

---

## About MFA

MFA is quickly becoming the standard for app developers and organizations to add an extra layer of security to their apps. Okta gives you the flexibility to deploy our built-in factors or integrate with existing tokens. Native factors include SMS and the Okta Verify app for iOS and Android. Integrations include Google Authenticator, RSA SecurID, Symantec VIP, and Duo Security.

> **Note:** How you actually make the HTTPS calls depends on the programming language and web framework that your app uses. [Okta has helper libraries](/code/) that make it easy to add support for Okta to your app in an idiomatic way.

## Set up your Okta org for MFA

First of all, you'll enable support for MFA in the Admin Console of your Okta org.

## Enable MFA in your Okta org

You need to enable MFA from the Admin Console of your Okta org before you can use it with the Okta API.

<StackSnippet snippet="enablemfa" />

See [MFA](https://help.okta.com/okta_help.htm?id=ext_MFA) and [Sign-on Policies](https://help.okta.com/okta_help.htm?id=Security_Policies) for more information.

## Test the Postman setup

Next, make sure that your Postman setup is configured correctly:

1. In Postman, select the **Collections** tab on the left.
2. Select the **Users (Okta API)** collection and then the **List Users** folder.
3. Scroll to the **List Users** folder and select the **List Users** request template. The request appears on the right.
4. Click **Send**. A successful request results in an HTTP status code of `200` and a JSON payload response with the Users associated with your org.

> **Note:** If you don't already have Postman set up, follow these instructions to [set up Postman](/code/rest/) to work with Okta. There is also a dedicated page with all of our [Postman collections](/docs/reference/postman-collections/).

## Create a test user

Create a new user in Okta to test your MFA setup:

1. Open the **Users (Okta API)** collection in Postman and then the **Create User** folder.
1. Select the **Create User without Credentials** request template. The request template appears on the right.
1. Select the **Body** tab and enter the first name, last name, and email address for your new user. Use the email for the `login` property.
1. Click **Send**. A successful request results in an HTTP status code of `200` and a JSON payload response.
1. Save the value of the User `id` that is returned in the response.

## Enroll a factor

You are now ready to enroll an additional factor for the user that you created.

<StackSnippet snippet="enrollfactor" />

## Activate the factor

After enrolling a factor for the Okta user, the next step is for the user to activate their factor.

<StackSnippet snippet="activatefactor" />

## Verify the factor

Now that the factor has been enrolled and activated, you can verify that the factor works as intended.

<StackSnippet snippet="verifyfactor" />

## Next steps

At this point, you should understand how to use the Okta API to add MFA to an existing app. You can learn more about using the Okta MFA API using the following resources:

* The [design principles for the Okta API](/docs/reference/core-okta-api/#design-principles)
* The API documentation for the [Okta Factors API](/docs/reference/api/factors/)
* The API documentation for the [Okta Authentication API](/docs/reference/api/authn/)
