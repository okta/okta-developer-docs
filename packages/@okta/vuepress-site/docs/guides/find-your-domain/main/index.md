---
title: Find your Okta domain
excerpt: How to find your Okta URL
layout: Guides
---

This guide explains how you can find your Okta org domain.

<!-- I don't think this article needs nutrition facts; it is too short and simple -->

## Are you an end user?

If you require assistance to sign in or access your organization's Okta org, see the [Okta end-user documentation](https://help.okta.com/okta_help.htm?type=eu&id=csh-user-home). For Okta Verify information, see [Okta verify documentation](https://help.okta.com/okta_help.htm?type=eu&id=ext_ov_endusers). In general, find your organization's Okta domain URL from your IT administrators.

## Are you a developer?

If you're building an application by using one of our SDKs or client libraries, you may run into the following message:

> **Note:** Your Okta URL is missing. Replace `{yourOktaDomain}` with your Okta domain. You can copy your domain from the Admin Console.

Orgs host pages on subdomains and each org is assigned a URL. The typical org URL is the tenant name (the subdomain), and then the domain name.

### Find your Okta domain

To find your Okta URL (also called an Okta domain):

1. Sign in to your Okta organization with your administrator account.

2. Locate the Okta domain by clicking your username in the upper-right corner of the Admin Console. The domain appears in the dropdown menu.

Your Okta domain looks like:

* `example.oktapreview.com`
* `example.okta.com`
* `example.okta-emea.com`

See [Okta Organizations](/docs/concepts/okta-organizations/) for more information on the types of Okta orgs.

> **Note:** Alternatively, find the welcome email in your inbox that you received when you signed up. The email contains your Okta URL.
