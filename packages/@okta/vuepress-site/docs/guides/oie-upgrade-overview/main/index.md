---
title: Identity Engine upgrade overview
meta:
  - name: description
    content: Okta Identity Engine offers customizable building blocks that can support dynamic, app-based user journeys. Learn about the Identity Engine upgrade and what your org upgrade process may look like.
---

<ApiLifecycle access="ie" />

To apply the power of [Okta Identity Engine](/docs/concepts/oie-intro/) and to easily adopt new features, update your apps from Okta Classic Engine to Identity Engine. Upgrading to Identity Engine allows you to implement many new capabilities in Okta access management products. Upgrading also provides more flexibility to manage your user authentication. This document provides an overview of the upgrade process for customer identity & developer use cases.

> **Note:** If your app integration with Okta is standards-based redirection (SAML/OIDC) to the default Okta domain, then no development changes are needed during your upgrade.

## Plan your upgrade

IAM administrators can generate a list of action items. These action items are acknowledgments or configurations that you must complete before you can schedule your upgrade to Identity Engine. To view action items for your org, go to the **OIE Upgrade Hub** in the Admin Console or click **Upgrade to OIE** on your Admin Dashboard. The **OIE Upgrade Hub** lists the items that you need to address. It also identifies any customizations and testing that you need to do before your upgrade.

As the developer, identify the integrations that have been applied to the following use cases. Make sure that you test the end-to-end flow before and after the upgrade.

* Account creation & activation (including self-service registration)
* User authentication and user sign-in flows
* Password recovery
* Session management
  > **Caution:** Custom integrations using the Sessions API use `v1/sessions/{sessionid}` for back-channel session management.

### Helpful upgrade links

* [Prepare your customizations for upgrade](https://help.okta.com/okta_help.htm?type=oie&id=ext-custom-sign-in-page).
* [Identify how Okta is implemented](https://www.youtube.com/watch?v=gUqZUSeL_oM&list=PLIid085fSVduvUaN-gBdN1cudndqR9IH8&index=3).
* [Review the comprehensive list of Identity Engine feature changes](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-features) to identify any potential impact to your upgrade process.

## Org upgrade process

Access the **OIE Upgrade Hub** in the Admin Console and review any outstanding tasks. If there are any remediation tasks required, those remediation guides appear in the **OIE Upgrade Hub**. If there are no remediations required, then your upgrade is more simple.

For detailed org upgrade instructions, see the [Self-service upgrade process](https://help.okta.com/okta_help.htm?type=oie&id=ext-post-upgrade-validation-tests)

Keep in mind the following considerations:

* After upgrading to Okta Identity Engine, your auth experience may continue to mimic Classic Engine. However, your admin experience changes and all Okta objects from Classic Engine are now compatible with Identity Engine.
* After you upgrade, the existing Okta-hosted Sign-In Widget works as-is.

The rest of the upgrade process is defined in the next section. Which steps that you take are related to your deployment model. Okta has carefully considered how you can break up the upgrade steps to ensure that you maintain the best user experience across your applications.

Okta doesn't recommend doing this upgrade all at once, but rather in sections with breaks for testing. This process is designed to be non-disruptive and iterative over time. Make the upgrade steps part of your normal product development process.

## Post-org upgrade steps

After you complete the prerequisites, your data migration is finished, and you have access to your Identity Engine org, the following content outlines the next steps that you may take as you upgrade your apps.

For a more detailed look at the upgrade steps, see the [Plan embedded auth application upgrades](/docs/guides/oie-upgrade-plan-embedded-upgrades) guide. This guide also contains useful [troubleshooting](/docs/guides/oie-upgrade-plan-embedded-upgrades/main/#troubleshooting) information, including common issues and errors you may encounter during your upgrade and likely causes.

1. Test your new environment to make sure that your experience and functionality are preserved.
2. What’s your Deployment Model?

    **Are you redirecting to the Okta-hosted Sign-In Widget?**

    > **Note:** See [Deployment Model - Customized Okta Hosted SIW](https://support.okta.com/help/s/article/Deployment-Model-Customized-Okta-Hosted-SIW) if you have a custom domain and are redirecting to the Okta-hosted Sign-In Widget.

    * Test your app to make sure the widget works.

    * Make any necessary [updates to the Sign-In Widget styling](/docs/guides/oie-upgrade-sign-in-widget-styling/) and [i18n properties](/docs/guides/oie-upgrade-sign-in-widget-i18n/).

    * Check for [deprecated functions or customizations](/docs/guides/oie-upgrade-sign-in-widget/main/#changes-to-widget-configuration-for-identity-engine) that may not be compatible with Identity Engine.

    **Are you embedding the Okta Sign-In Widget?**

    * [Upgrade your Okta Sign-In Widget](/docs/guides/oie-upgrade-sign-in-widget/) to the latest version.

    * Test your app to make sure the widget works.

    * Make any necessary [updates to the Sign-In Widget styling](/docs/guides/oie-upgrade-sign-in-widget-styling/) and [i18n properties](/docs/guides/oie-upgrade-sign-in-widget-i18n/).

    * Check for [deprecated functions or customizations](/docs/guides/oie-upgrade-sign-in-widget/main/#changes-to-widget-configuration-for-identity-engine) that may not be compatible with Identity Engine.

    **Are you embedding your authentication with an Okta SDK?**

    * Upgrade to the latest version of the Identity Engine SDK. See [Upgrade your app to the Identity Engine SDK](/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/nodejs/main/) for detailed steps by language.

    * Add the appropriate Identity Engine SDK to your application code. See [Add the latest Auth SDKs to your applications](/docs/guides/oie-upgrade-add-sdk-to-your-app/nodejs/main/) for detailed steps by language.

3. Test all of your user experiences.

    * **Authentication:** Make sure that your users can sign in and sign out for the workflows that you support.

    * **Self-service & Admin-initiated Password Recovery:** Make sure that users can recover their factors with no impact to the user experience.

    * **New Account Activation:** Make sure that the account onboarding experience works as expected end-to-end to ensure that users have a smooth start.

    * **Self-service registration:** Make sure that users can sign up (including Factor enrollment if you support that) and that there are no interruptions during that process.

    * **Session Management:** If you’re using the Sessions API, some [methods for the Sessions API aren't supported in Identity Engine](https://support.okta.com/help/s/article/v1sessionssessionid-API?language=en_US).

## More Resources

* [Identity Engine on Okta TV](https://www.youtube.com/playlist?list=PLIid085fSVduvUaN-gBdN1cudndqR9IH8)
* [Test plan template](https://help.okta.com/okta_help.htm?type=oie&id=ext-test-upgrade)
* [Upgrade FAQs](https://help.okta.com/okta_help.htm?type=oie&id=ext-upgrade-faq)
