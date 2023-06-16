---
title: Identity Engine upgrade overview
meta:
  - name: description
    content: Okta Identity Engine offers customizable building blocks that can support dynamic, app-based user journeys. Learn about the Identity Engine upgrade and what your org upgrade process may look like.
---
<ApiLifecycle access="ie" />

To leverage the power of [Okta Identity Engine](/docs/concepts/oie-intro/) and to easily adopt new features, migrate your existing orgs and apps from Okta Classic Engine onto Identity Engine. Upgrading to Identity Engine allows you to implement many new capabilities in Okta's access management products and provides more flexibility to manage your user authentication. This document provides an overview of the upgrade process for Customer Identity & developer use cases.

## Plan your upgrade

* **IMPORTANT**: Talk to your Okta account team and get their support and input. Okta assistance is currently a requirement for carrying out the [Okta org](/docs/concepts/okta-organizations/) upgrade process.
* Review the [Identity Engine feature changes](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-features) guide to get an idea of what features you are using, if any, that require remediations (meaning they need adjustment before we can proceed with an upgrade). For example, some Classic Engine features may not be supported in Identity Engine in their current form.

## Org upgrade process

Your account team will help you to assess your org and schedule the upgrade. If there are any significant remediations required (for example converting and migrating objects such as policies, orgs, and users), they will let you know what services are needed. If there are no remediations required, then the upgrade is simple.

> **Note**: For more detailed org upgrade instructions, see [Upgrade from Classic Engine](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-upgrade-eligibility).

Bear in mind that:

* After upgrading to Okta Identity Engine, your auth experience may continue to mimic Classic Engine, but your admin experience changes and all of the Okta objects from Classic Engine are now compatible with Identity Engine.
* The existing Okta-hosted Sign-In Widget works as-is after you upgrade your org.

> **Note:** See [Upgrade from Classic Engine](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-upgrade-eligibility) for feature comparison and considerations before and after you upgrade.

The rest of the upgrade process is defined in the next section. Which steps that you take are related to your deployment model. We have carefully considered how you can break up the upgrade steps to ensure that you maintain the best user experience across your applications. We don’t recommend doing this upgrade all at once, but rather in sections with breaks for testing. This process is designed to be non-disruptive and iterative over a period of time. Make the upgrade steps part of your normal product development process.

## Post-org upgrade steps

After you complete the prerequisites, your data migration is finished, and you have access to your Identity Engine org, the following content outlines the next steps that you may take as you upgrade your apps.

For a more detailed look at the upgrade steps, see the [Plan embedded auth application upgrades](/docs/guides/oie-upgrade-plan-embedded-upgrades) guide. This guide also contains useful [troubleshooting](/docs/guides/oie-upgrade-plan-embedded-upgrades/main/#troubleshooting) information, including common issues and errors you may encounter during your upgrade and likely causes.

1. Test your new environment to make sure that your experience and functionality are preserved.
2. What’s your Deployment Model?

    **Are you redirecting to the Okta-hosted Sign-In Widget?**

    * Test your app to make sure the widget works OK.

    * Make any necessary [updates to the Sign-In Widget styling](/docs/guides/oie-upgrade-sign-in-widget-styling/) and [i18n properties](/docs/guides/oie-upgrade-sign-in-widget-i18n/).

    * Check your `config.idps` [settings](https://github.com/okta/okta-signin-widget#openid-connect) for customizations that may not be compatible with Identity Engine.

    **Are you embedding our Sign-In Widget?**

    * [Upgrade your Okta Sign-In Widget](/docs/guides/oie-upgrade-sign-in-widget/) to the latest version.

    * Test your app to make sure the widget works OK.

    * Make any necessary [updates to the Sign-In Widget styling](/docs/guides/oie-upgrade-sign-in-widget-styling/) and [i18n properties](/docs/guides/oie-upgrade-sign-in-widget-i18n/).

    **Are you embedding your authentication with our SDKs?**

    * Add the appropriate Identity Engine SDK to your application code or update to the latest version of the Identity Engine SDK. See [Add the latest Auth SDKs to your applications](/docs/guides/oie-upgrade-add-sdk-to-your-app/nodejs/main/) for detailed steps by language. <!-- (/docs/guides/oie-upgrade-add-sdk-to-your-app/-/main/) -->

    **Are you moving to an architecture that leverages an Okta SDK?** More detailed information coming soon. <!-- See [Move away from using Classic Authentication APIs to using the appropriate SDK](/docs/guides/) for details on this task. -->

3. Test your user experience.

    * **Authentication:** Make sure that your users can sign in and sign out for the workflows that you support.

    * **Self-Service Password Recovery:** Make sure that users can recover their factors with no blockers.

    * **Self-Service Registration:** Make sure that users can sign up (including Factor enrollment if you support that) and that there are no interruptions during that process.

  See [Upgrade your application to use the Identity Engine SDK](/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/nodejs/main/) for detailed steps by language. <!-- (/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/-/main/) -->
