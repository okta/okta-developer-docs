---
title: Identity Engine upgrade overview
meta:
  - name: description
    content: Okta Identity Engine offers customizable building blocks that can support dynamic, app-based user journeys. Learn about the Identity Engine upgrade and what your org upgrade process may look like.
---
<ApiLifecycle access="ie" />

To leverage the power of [Okta Identity Engine](/docs/guides/oie-intro/) and to easily adopt new features, migrate your existing orgs and apps from Okta Classic Engine onto Identity Engine. Upgrading to Identity Engine allows you to implement many new capabilities in Okta's access management products and provides more flexibility to manage your user authentication. This document provides an overview of the upgrade process for customer identity & developer use cases.

Are you an admin? See the [Identity Engine Upgrade Overview](https://help.okta.com/en/programs/oie/Content/Topics/identity-engine-upgrade/home.htm) for admins.

## Before attempting to upgrade

* **IMPORTANT**: Talk to your Okta rep/Customer Success Manager and get their support and input. Okta assistance is currently a requirement for carrying out the [Okta org](/docs/concepts/okta-organizations/) upgrade process outlined below (automated upgrades will be available for simple upgrades at a later date).
* Review the [Identity Engine limitations](/docs/guides/ie-limitations/) guide to get an idea of what features you are using, if any, that require remediations (meaning they need adjustment before we can proceed with an upgrade). For example, some Classic Engine features may not be supported in Identity Engine in their current form.
* [Upgrade your Okta Sign-In Widget](/docs/guides/oie-upgrade-sign-in-widget/) to the latest version before continuing further. This includes both Okta-hosted widgets and widgets embedded inside your apps.

## Upgrade process

The initial upgrade path consists of the following steps:

* Assess your org and app and create a report that outlines the level of effort to perform the upgrade.
  * As mentioned above, your set up may require remediations.
  * If there are no remediations required, then the upgrade is simple, and the subsequent steps are seamless.
* Complete data migration.
* Convert and migrate objects such as policies, orgs, and users.
* Turn on Identity Engine for the entire org.

Bear in mind that:

* At the end of the data migration, your auth experience may continue to mimic Classic Engine, but your admin experience changes and all of the Okta objects from Classic Engine are now compatible with Identity Engine.
* The existing Okta-hosted Sign-In Widget works as-is after you upgrade your org.
* You should upgrade your embedded Sign-In Widget as you would normally do with other updates.

> **Note:** For an overview of the changes in the Admin Console, see [Compare Identity Engine and Classic Engine](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-whats-new).

The rest of the upgrade process is defined in the next section. Which steps that you take are related to your deployment model. We have carefully considered how you can break up the upgrade steps to ensure that you maintain the best user experience across your applications. We don’t recommend doing this upgrade all at once, but rather in sections with breaks for testing. This process is designed to be non-disruptive and iterative over a period of time. Make the upgrade steps part of your normal product development process.

## Upgrade steps

After you complete the prerequisites, your data migration is finished, and you have access to your Identity Engine org, the following content outlines the next steps that you may take as you navigate through the rest of your upgrade process.

For a more detailed look at the upgrade steps, see the [Plan embedded auth application upgrades](/docs/guides/oie-upgrade-plan-embedded-upgrades) guide. This guide also contains useful [troubleshooting](/docs/guides/oie-upgrade-plan-embedded-upgrades/main/#troubleshooting) information, including common issues and errors you may encounter during your upgrade and likely causes.

1. Test your new environment to make sure that your experience and functionality are preserved.
2. What’s your Deployment Model?

    **Are you redirecting to the Okta-hosted Sign-In Widget?**

    * Test your user experience.

    * Make any necessary [updates to the Sign-In Widget styling](/docs/guides/oie-upgrade-sign-in-widget-styling/) and [i18n properties](/docs/guides/oie-upgrade-sign-in-widget-i18n/).

    * Check your `config.idps` [settings](https://github.com/okta/okta-signin-widget#openid-connect) for customizations that may not be compatible with Identity Engine.

    > **Note:** See the **Remember me** section of the [Compare Identity Engine and Classic Engine](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-whats-new) for more information on functionality changes in the Admin Console.

    **Are you embedding our Sign-In Widget?**

    * Test your user experience.

    * Make any necessary [updates to the Sign-In Widget styling](/docs/guides/oie-upgrade-sign-in-widget-styling/) and [i18n properties](/docs/guides/oie-upgrade-sign-in-widget-i18n/).

    **Are you embedding your authentication with our SDKs?**

    * Add the appropriate Identity Engine SDK to your application code or update to the latest version of the Identity Engine SDK. See [Add the latest Auth SDKs to your applications](/docs/guides/oie-upgrade-add-sdk-to-your-app/nodejs/main/) for detailed steps by language. <!-- (/docs/guides/oie-upgrade-add-sdk-to-your-app/-/main/) -->

    **Are you moving to an architecture that leverages an Okta SDK?** More detailed information coming soon. <!-- See [Move away from using Authn APIs to using the appropriate SDK](/docs/guides/) for details on this task. -->

3. Test your user experience.

    * **Authentication:** Make sure that your users can sign in and sign out for the workflows that you support.

    * **Self-Service Password Recovery:** Make sure that users can recover their factors with no blockers.

    * **Self-Service Registration:** Make sure that users can sign up (including Factor enrollment if you support that) and that there are no interruptions during that process.

  See [Upgrade your application to use the Identity Engine SDK](/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/nodejs/main/) for detailed steps by language. <!-- (/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/-/main/) -->

## Upgrade documentation

The Identity Engine upgrade documentation below discusses the various upgrade tasks. Which tasks you need to complete depends on your deployment model.

* [Upgrade your widget](/docs/guides/oie-upgrade-sign-in-widget/): Learn how to upgrade the Okta Sign-In Widget from older versions of 2.x, 3.x, 4.x, and 5.x.

  * [Deprecated JavaScript methods in the widget](/docs/guides/oie-upgrade-sign-in-widget-deprecated-methods/): Learn how changes to the authentication pipelines impact applications that call widget JavaScript methods, such as `setCookieAndRedirect()`. Also included are best practices on how you can reimplement existing flows in Identity Engine.
  * [Update the widget styling](/docs/guides/oie-upgrade-sign-in-widget-styling/): Learn about the latest widget style updates.
  * [Update the widget i18n properties](/docs/guides/oie-upgrade-sign-in-widget-i18n/): Learn about the latest widget i18n property updates.

* [Plan embedded auth app upgrades](/docs/guides/oie-upgrade-plan-embedded-upgrades/): Learn about how to embark on the upgrade process, the steps required, and how you can stage your upgrade. Also discussed are suggestions on when to test and how to roll out the application upgrades to your users.

* [Upgrade authentication services and applications to use the Interaction Code grant type](/docs/guides/implement-grant-type/interactioncode/main/#set-up-your-authorization-server): Learn how to configure your embedded applications and the corresponding authorization servers to use the Interaction Code grant type.

* [Add the Identity Engine SDK to your app](/docs/guides/oie-upgrade-add-sdk-to-your-app/nodejs/main/): Learn about how your applications work with the latest version of the SDK. This content discusses how to update your applications to use the latest version of the SDK without making any code changes and how to break up the changes to your applications. <!-- (/docs/guides/oie-upgrade-add-sdk-to-your-app/-/main/) -->

* [Upgrade your application to the Identity Engine SDK](/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/nodejs/main/): Learn about the changes to authentication pipelines that impact embedded applications using AuthN and Management APIs. Also included are best practices on how you can reimplement existing flows in Identity Engine. <!-- (/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/-/main/) -->

* [Understand how sessions work after the upgrade](/docs/guides/oie-upgrade-sessions-api/): Learn how changes to the authentication pipelines impact applications that use the Sessions APIs. Also included are best practices on how you can reimplement existing flows in Identity Engine.

* [Understand MFA enrollment policy API changes after the upgrade](/docs/guides/oie-upgrade-mfa-enroll-policy/): Learn how changes to the MFA enrollment policy impact applications that use the Policy API directly.

* [Identity Engine limitations](/docs/guides/ie-limitations/): Current limitations with the Identity Engine to be aware of.
