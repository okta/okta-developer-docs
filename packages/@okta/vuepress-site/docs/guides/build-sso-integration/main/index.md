---
title: Build a Single Sign-On (SSO) integration
excerpt: Create an app integration using Security Assertion Markup Language (SAML) or OpenID Connect (OIDC).
meta:
  - name: description
    content: Use this guide to learn how to build federated Single Sign-On into your Okta integration.
layout: Guides
---

This guide teaches you how to build federated Single Sign-On with Okta for your application. This guide assumes that you intend to make this app integration public by publishing it in the Okta Integration Network (OIN).

---

**Learning outcomes**

* Create an app integration inside your Okta org to use Okta as the Identity Provider for your app.
* Test your app integration.

**What you need**

* [Okta Developer Edition organization](https://developer.okta.com/signup/)
* An app to integrate with Okta

---

## Overview

As an application developer, you want to give your users the ability to sign in directly to your application using Okta for identity management. To do so, your application needs to support federated Single Sign-On (SSO). In this scenario, your application relies on Okta to serve as an external Identity Provider (IdP).

Okta supports OpenID Connect (OIDC) and Security Assertion Markup Language (SAML) 2.0 protocols to implement SSO for your app integration.

## Organizations

In a typical scenario, your application relies on Okta to act as a multi-tenant Identity Provider (IdP) for your customers' Okta organizations.

An [Okta org](/docs/concepts/okta-organizations/) acts as a container that sets hard boundaries for all users, applications, and other entities associated with a single customer, providing tenant-based isolation.

In developing your SSO app integration, the customer’s Okta org serves as the authorization server (OIDC) or as the IdP (SAML).

## Prepare your integration

After you've decided which protocol is right for your needs, you need to gather some information for your integration.

<StackSnippet snippet="prep" />

### Rate limit considerations

When constructing your SSO application, you want to be aware of the limits on requests to Okta APIs. For reference on the categories and cumulative rate limits, see [Rate limits overview](/docs/reference/rate-limits/). Okta provides three headers in each response to report on both concurrent and org-wide rate limits.

For org-wide rate limits, the following three headers are provided:

* `X-Rate-Limit-Limit`: The rate limit ceiling that applies to the current request
* `X-Rate-Limit-Remaining`: The amount of requests left for the current rate-limit window
* `X-Rate-Limit-Reset`: The time when the rate limit resets, specified in UTC epoch time

To monitor org-wide rate limits, include code in your application to check the relevant headers in the response.

For concurrent rate limits, the three headers behave a little differently:

* When the number of unfinished requests is below the concurrent rate limit, request headers only report org-wide rate limits.
* After you exceed a concurrent rate limit, the headers report that the limit has been exceeded.
* When you drop back down below the concurrent rate limit, the headers switch back to reporting the time-based rate limits.
* The first two header values are always `0` for concurrent rate limit errors. The third header reports an estimated time interval when the concurrent rate limit may be resolved.
* The `X-Rate-Limit-Reset` time for concurrent rate limits is only a suggested value. There's no guarantee that enough requests can complete for the requests to go below the concurrent rate limit at the time indicated.

The error condition resolves itself when there's another concurrent thread available. Normally no intervention is required. You may be exceeding the concurrent rate limit if you notice frequent bursts of HTTP 429 errors. Examine the activities in the log before the burst of HTTP 429 errors appeared. If you can't identify what is causing you to exceed the limit, contact [Okta Support](mailto:support@okta.com).

You can request a temporary rate limit increase if you anticipate a large number of requests over a specified time period. Contact [Okta Support](mailto:support@okta.com) to open a ticket to permit the exception.

> **Note:** The following public metadata endpoints aren't subjected to rate limiting.
> * `/oauth2/v1/keys`
> * `/.well-known/openid-configuration`
> * `/.well-known/oauth-authorization-server`

## Create your integration

Create an SSO integration inside the Okta org associated with your developer account. Use the Application Integration Wizard (AIW) in the Admin Console to create your integration.

>**Note:** Creating your SSO app integration doesn't automatically make it available in the [OIN](https://www.okta.com/integrations/). After you've created and tested it, you need to [submit your app integration](/docs/guides/submit-app/) to the OIN.

1. Sign in to your [developer-edition Okta org](/login/) as a user with administrative privileges.
1. In the Admin Console, go to  **Applications** > **Applications**.
1. Click **Create App Integration**.

<StackSnippet snippet="create" />

## Specify your integration settings

This portion of the guide takes you through the steps for configuring your specific SSO integration using the Okta Admin Console.

After you create your integration in the [Create your integration](#create-your-integration) step, the main settings page appears for your new integration in the Admin Console. Specify **General Settings** and **Sign On** options, and assign the integration to users in your org. Click **Edit** if you need to change any of the options, and **Save** when you've made your changes.

<StackSnippet snippet="settings" />

## Test your integration

This portion of the guide takes you through the steps required to test your integration.

### Assign users

First, you must assign your integration to one or more test users in your org:

1. Click the **Assignments** tab.
1. Click **Assign** and then select either **Assign to People** or **Assign to Groups**.
1. Enter the appropriate people or groups that you want to have Single Sign-On into your application, and then click **Assign** for each.
1. Verify the user-specific attributes for any people that you add, and then select **Save and Go Back**.
1. Click **Done**.

### Test Single Sign-On

1. Sign out of your Okta org. Click **Sign out** in the upper-right corner of the Admin Console.
1. Sign in to the Okta End-User Dashboard as the regular user that was assigned the integration.
1. Click the Okta tile for the integration and confirm that the user is signed in to your application.

<StackSnippet snippet="test" />

## Next steps

After you complete testing your integration, you can start the submission process to have your integration included in the [Okta Integration Network](https://www.okta.com/okta-integration-network/) catalog:
* Review the [OIN submission requirements](/docs/guides/submit-app-prereq/) before starting the submission process.
* Follow the [Publish an OIN integration](/docs/guides/submit-app) guide to submit your SSO integration through the OIN Manager.

## See also

* [Okta SAML FAQs](/docs/concepts/saml/faqs/)
* [Okta Developer Forum: OIDC](https://devforum.okta.com/search?q=oidc)
* [Stack Overflow: Okta OIDC](https://stackoverflow.com/search?q=oidc+okta)
* [Okta Developer Forum: SAML](https://devforum.okta.com/search?q=saml)
* [Stack Overflow: Okta SAML](https://stackoverflow.com/search?q=saml+okta)