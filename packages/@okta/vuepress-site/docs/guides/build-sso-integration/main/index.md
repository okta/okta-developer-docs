---
title: Build a Single Sign-On (SSO) integration
excerpt: Create an app integration using SAML or OIDC.
meta:
  - name: description
    content: Use this guide to learn how to build federated Single Sign-On into your Okta integration.
layout: Guides
---

This guide teaches you how to build federated Single Sign-On with Okta for your application.

---

**Learning outcomes**

* Create an app integration inside your Okta org to use Okta as the Identity Provider for your app.
* Test your app integration.

**What you need**

* An Okta developer account. Sign up for one at <https://developer.okta.com/signup/>.
* An app to integrate with Okta

---

## Overview

As an application developer, you want to give your users the ability to sign in directly to your application using Okta for identity management. To do so, your application needs to support federated Single Sign-On (SSO). In this scenario, your application relies on Okta to serve as an external Identity Provider (IdP).

Okta supports OIDC and SAML 2.0 protocols to implement SSO for your app integration.

## Organizations

In a typical scenario, your application relies on Okta to act as a multi-tenant Identity Provider (IdP) for your customers' Okta organizations.

An [Okta org](/docs/concepts/okta-organizations/) acts as a container that sets hard boundaries for all users, applications, and other entities associated with a single customer, providing tenant-based isolation.

In developing your SSO app integration, the customer’s Okta org serves as the authorization server (OIDC) or as the IdP (SAML).

## Publishing

This guide assumes that you intend to develop an app integration and make it public by publishing it in the Okta Integration Network (OIN). If you want to develop a custom app integration that is intended for private deployment within your own company, use the Okta [App Integration Wizard (AIW)](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard) to create your app integration.

## Prepare your integration

After you have decided which protocol is right for your needs, you need to gather some information for your integration.

<StackSnippet snippet="prep" />

### Rate limit considerations

When constructing your OIDC application, you want to be aware of the limits on calls to the Okta API. For reference on the categories and cumulative rate limits, see [Rate limits overview](/docs/reference/rate-limits/). In order to monitor your calls to the API, Okta provides three headers in each response to report on both concurrent and org-wide rate limits.

For org-wide rate limits, the three headers show the limit that is being enforced, when it resets, and how close you are to hitting the limit:

* `X-Rate-Limit-Limit` &mdash; the rate limit ceiling that applies to the current request
* `X-Rate-Limit-Remaining` &mdash; the number of requests left for the current rate-limit window
* `X-Rate-Limit-Reset` &mdash; the time when the rate limit resets, specified in UTC epoch time

To be sure about org-wide rate limits, include code in your application to check the relevant headers in the response.

For concurrent rate limits, the three headers behave a little differently: when the number of unfinished requests is below the concurrent rate limit, request headers only report org-wide rate limits. After you exceed a concurrent rate limit, the headers report that the limit has been exceeded. When you drop back down below the concurrent rate limit, the headers switch back to reporting the time-based rate limits. The first two header values are always `0` for concurrent rate limit errors. The third header reports an estimated time interval when the concurrent rate limit may be resolved. The `X-Rate-Limit-Reset` time for concurrent rate limits is only a suggested value. There's no guarantee that enough requests will complete for the requests to go below the concurrent rate limit at the time indicated.

The error condition resolves itself as soon as there is another concurrent thread available. Normally no intervention is required. However, if you notice frequent bursts of HTTP 429 errors, or if the concurrent rate limit doesn't resolve quickly, then you may be exceeding the concurrent rate limit. Examine activity in the log before the burst of HTTP 429 errors appeared. If you can't identify what is causing you to exceed the limit, contact [Okta Support](mailto:support@okta.com).

You can request a temporary rate limit increase if you anticipate a large number of requests over a specified time period. Contact [Okta Support](mailto:support@okta.com) to open a ticket to permit the exception.

> **Note:** The following public metadata endpoints aren't subjected to rate limiting.
> * `/oauth2/v1/keys`
> * `/.well-known/openid-configuration`
> * `/.well-known/oauth-authorization-server`

## Create your integration

After you have your background information, you can use the Okta Admin Console and the Application Integration Wizard (AIW) to create your SSO integration inside the Okta org associated with your developer account.

>**Note:** Creating your SSO app integration doesn't automatically make it available in the [OIN](https://www.okta.com/integrations/). After you have created and tested it, you need to [submit your app integration](/docs/guides/submit-app/) to the OIN.

1. Sign in to your Okta developer account as a user with administrative privileges.
1. In the Admin Console, go to  **Applications** > **Applications**.
1. Click **Create App Integration**.

<StackSnippet snippet="create" />

## Specify your integration settings

This portion of the guide takes you through the steps for configuring your specific SSO integration using the Okta Admin Console.

After you create your integration in the [Create your integration](#create-your-integration) step, the Admin Console opens the main settings page for your new integration. In here, you can specify **General Settings** and **Sign On** options, as well as assign the integration to users in your org. Click **Edit** if you need to change any of the options, and **Save** when you have made your changes.

<StackSnippet snippet="settings" />

## Test your integration

This portion of the guide takes you through the steps required to test your integration.

### Assign users

First you must assign your integration to one or more test users in your org:

1. Click the **Assignments** tab.
1. Click **Assign** and then select either **Assign to People** or **Assign to Groups**.
1. Enter the appropriate people or groups that you want to have Single Sign-On into your application, and then click **Assign** for each.
1. For any people that you add, verify the user-specific attributes, and then select **Save and Go Back**.
1. Click **Done**.

### Test Single Sign-On

1. Sign out of your administrator account in your development org. Click **Sign out** in the upper-right corner of the Admin Console.
1. Sign in to the Okta End-User Dashboard as the regular user that was assigned the integration.
1. In your dashboard, click the Okta tile for the integration and confirm that the user is signed in to your application.

<StackSnippet snippet="test" />

## Next steps

* After you complete your testing and your integration is working as expected, you can start the submission process to have your integration included in the [Okta Integration Network](https://www.okta.com/okta-integration-network/) catalog.
* Our [Submit an app integration](/docs/guides/submit-app) guide takes you through the steps required to submit your SSO integration through the OIN Manager.

## See also 

* [Okta SAML FAQs](/docs/concepts/saml/faqs/)
* [Okta Developer Forum &mdash; OIDC](https://devforum.okta.com/search?q=oidc)
* [Stack Overflow &mdash; Okta OIDC](https://stackoverflow.com/search?q=oidc+okta)
* [Okta Developer Forum &mdash; SAML](https://devforum.okta.com/search?q=saml)
* [Stack Overflow &mdash; Okta SAML](https://stackoverflow.com/search?q=saml+okta)