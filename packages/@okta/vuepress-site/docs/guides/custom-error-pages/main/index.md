---
title: Customize the Okta-hosted error pages
excerpt: Learn how to customize the Okta-hosted error pages to fit your brand.
layout: Guides
---

This guide teaches you how to customize error pages that can appear as part of a custom domain Okta-hosted sign-in flow.

---

**Learning outcomes**

* 
* 

**What you need**

* 
* 
* 
* 

**Sample code**

n/a

---

## Overview

When using an Okta-hosted flow, you can create a unique sign-in experience by providing a customized [Okta URL domain](/docs/guides/custom-url-domain/) and creating an [Style the Widget](/docs/guides/style-the-widget/style-okta-hosted/) that matches your application's look and feel.

However, if an error occurs during sign-in, Okta may need to display an error page to the user. To provide a seamless user experience, you can also customize the error page by using the embedded HTML editor provided on the **Custom Error Pages** tab of the **Customization** page.

### Common questions

**In what situations does Okta serve error pages to the user?**

The error page appears when a critical error occurs or an application is misconfigured. See [Okta-hosted flows](/docs/concepts/okta-hosted-flows/) for more information on Okta-hosted functionality.

**What can I customize on the error page?**

You can add any HTML, CSS, or JavaScript you want to the page.

### Use the Brands API

The [Brands API](/docs/reference/api/brands/) is a feature (currently in Early Access) that allows you to set icons, images, and colors across your Okta-hosted Sign-In Widget, error pages, email templates, and Okta End-User Dashboard all at once. You don't need to set a customized Okta URL domain. To find out more about this feature and how to use it, see [Customize your Okta experience with the Brands API](/docs/guides/customize-themes).

### Before you begin

Before you can customize error pages, you must have already [customized your Okta URL domain](/docs/guides/custom-url-domain/), unless you are using the Brands API as mentioned above.

A custom error page appears only when an application connects to Okta using your custom domain. Otherwise, the default Okta error page appears.

## Edit the error page

The HTML editor provided on the **Custom Error Pages** tab of the **Customization** page allows you to modify any HTML, CSS, and JavaScript on the error page.

1. In the Admin Console, select **Settings** and then **Customizations**.
1. Click the **Custom Error Pages** tab.
1. Make changes directly in the embedded **Custom Error Pages** editor.
1. Click **Preview** to preview your changes before you publish.
1. Click **Reset to Default** if you need to remove all of your customizations and restore the default HTML/CSS and JavaScript code.
1. Click **Save and Publish** to commit your changes.

> **Note:** See [Customization examples](#customization-examples).

