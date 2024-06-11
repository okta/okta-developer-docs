---
title: Find your application credentials
excerpt: Find your Okta app's client ID and secret
layout: Guides
---

This guide explains how you can find your app integration credentials.

<!-- I don't think this article needs nutrition facts; it is too short and simple -->

If you're building an app integration by using one of our software development kits or client libraries, you may run into the following message:

> **Note:** Your client ID is missing. Replace `{clientId}` with the client ID of your Application. You can copy it from the Okta Admin Console in the details for the Application that you created.

Or this one:

> **Note:** Your client secret is missing. Replace `{clientSecret}` with the client secret of your Application. You can copy it from the Okta Admin Console in the details for the Application that you created.

The first step in building an app integration with Okta is creating an Okta app resource that represents your project. Okta generates credentials for you (called a client ID and client secret) that you copy into your code to associate your project with the Okta app integration.

## Find your app integration credentials

To find the credentials for your app integration:

1. Sign in to your Okta organization with your administrator account.
1. In the Admin Console, go to **Applications** > **Applications**.
1. If you already have the app integration in your org, you can search for it here. Click the app integration to open the settings page.
1. If you need to create a new Okta app integration to represent your project, click **Create App Integration** and follow the [instructions](https://help.okta.com/okta_help.htm?id=ext_Apps_App_Integration_Wizard) to create a new app integration. Alternatively, you can search for a pre-existing app integration in the Okta catalog and add it to your org by clicking **Browse App Catalog**.
1. On the **General** tab, the **Client Credentials** section shows the client ID and client secret values for your app integration.
1. You can copy the **Client ID** and **Client secret** values using the **Copy to Clipboard** button beside each text field.