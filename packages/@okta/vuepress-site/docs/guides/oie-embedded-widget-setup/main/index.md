---
title: Widget setup
excerpt: Widget setup
layout: Guides
---

<div class="oie-embedded-sdk">

<ApiLifecycle access="ie" /><br>

### Overview

This document describes how to integrate user sign using Okta’s embedded widget.
All the code samples come from the SDK’s sample application that is provided with the SDK.

### Before you begin

Before you can start integrating the widget into your application,
you need to do the following:

1. [Create your Okta Account](/docs/guides/oie-embedded-sdk-setup/oie-embedded-sdk-org-setup/#createaccount)
1. Setup your Okta org. For the use cases in this guide,
   you will need to perform the following:

   1. [Set up your Okta org (for password factor only use cases)](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-org-setup/#setup-org-password-only).
   (Link points to the SDK Guide)
1. [Download and setup the SDK and sample app](/docs/guides/oie-embedded-sdk-setup/aspnet/oie-embedded-sdk-sample-app-setup/)
   (Link points to the SDK Guide)
1. [Add a trusted origins and enable CORS](#enablecors)

### Add a trusted origin and enable CORS {#enablecors}

1. In the Admin console (for the Okta org you set up in the previous step),
   select **Security > API** from the left navigation menu.
1. In the **API** page click on the **Trusted Origins** tab:
1. Under the Trusted Origins tab click on **Add Origin**.
   1. In the Add Origin dialog do the following:
      1. Set a origin name (e.g. MyOrigin)
      1. Add the url to your application. If you are using the
         sample application, use `https://localhost:44314/`
      1. Under Type, check the **CORS** and **Redirect** checkboxes.
      1. Click **Save**.

</div>
