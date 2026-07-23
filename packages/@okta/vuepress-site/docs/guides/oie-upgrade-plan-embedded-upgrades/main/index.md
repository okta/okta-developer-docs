---
title: Plan embedded auth app upgrades
---

<ApiLifecycle access="ie" />

This guide is the most detailed checklist for upgrading an embedded authentication app from Classic Engine to Identity Engine. Use it during the Build step of the Modernize your sign-in and SSO flow with Okta Identity Engine journey, after you've chosen a deployment model.
<!-- TODO(OKTA-1216410 follow-up): link "Modernize your sign-in and SSO flow with Okta Identity Engine" to /docs/journeys/modernize-sso-flow-with-oie/main/ when that journey publishes (target: September monthly release). -->

> **Note:** If you haven't yet chosen a deployment model, start with Choose your OIE authentication modernization approach.
<!-- TODO(OKTA-1216410 follow-up): link "Choose your OIE authentication modernization approach" to /docs/guides/choose-oie-authentication-approach/main/ when that guide publishes (target: September monthly release). -->

## When to use this guide

Use this guide if your app:

* Embeds the Okta Sign-In Widget (Gen2). Okta delivers the Gen3 widget only as the Okta-hosted sign-in experience, which you can't self-host.
* Uses an Okta language SDK (Auth.js, Java, .NET, Node, Python, Go, or a mobile SDK) to authenticate users.
* Calls Classic Engine APIs (`/api/v1/authn`, Factors API, Sessions API) directly and is moving to a supported Identity Engine flow.

This guide isn't the right starting point if your app uses redirect authentication only. For redirect, see [Sign users in to your web app using the redirect model](/docs/guides/sign-into-web-app-redirect/main/) and the related platform-specific redirect guides.

Okta understands that upgrades can be stressful. Breaking the upgrade into steps helps you maintain the best user experience across your apps.

Okta doesn't recommend doing this upgrade all at once, but rather in sections with breaks for testing. This process is non-disruptive and iterative over time. Make the upgrade steps part of your normal product development process.

After you complete the [initial upgrade process](/docs/guides/oie-upgrade-overview/#upgrade-process) for your orgs, walk through more steps to finish the upgrade. The steps you take depend on your deployment model, so plan them carefully.

## Prioritize and plan your upgrade

Prioritize and roadmap the changes to your apps. Then, take breaks to test so that you can achieve the other business objectives that you have.

Also, create continuous pieces of work that your team must do to fully upgrade to Okta Identity Engine. For example, complete steps one and two, and then test and take a break from upgrade tasks for a month or two. Complete step three and take a break before completing steps four and five, and so on.

## What's your scenario?

While it isn't possible to fully document every upgrade scenario, the following stages cover the most common scenarios. These steps aren't all-inclusive. See the associated documentation in each stage for more detailed steps that you can use to plan and prioritize your process.

* [Redirecting to the Okta-hosted Sign-In Widget](#update-the-okta-hosted-sign-in-widget)
* [Embedding our Sign-In Widget](#update-the-embedded-sign-in-widget-gen2)
* [Embedding your authentication with our SDKs](#upgrade-sdks-to-the-latest-version-in-your-apps)
* [Using the Okta APIs](#upgrade-from-using-the-okta-authentication-apis)

See [Roll the upgrade out to your users](#roll-the-upgrade-out-to-your-users) for suggestions on creating a roadmap for your upgrade rollout.

## Update the Okta-hosted Sign-In Widget

When you're redirecting to the Okta-hosted widget, preserve your user experience both [visually](/docs/guides/oie-upgrade-sign-in-widget-styling/) and [functionally](/docs/guides/oie-upgrade-sign-in-widget-i18n/). Check your `config.idps` [settings](https://github.com/okta/okta-signin-widget#openid-connect) for customizations that may not be compatible with Identity Engine.

## Update the Embedded Sign-In Widget (Gen2)

When you're embedding the widget, consider and plan for the following steps depending on your needs. Okta delivers the Gen3 widget only as the Okta-hosted sign-in experience. You can't self-host it. Embed the Gen2 widget to keep the sign-in form inside your own app.

* [Update your widget](/docs/guides/oie-upgrade-sign-in-widget) to the latest Gen2 version.
* [Add support for the Interaction Code](/docs/guides/implement-grant-type/interactioncode/main/#set-up-your-authorization-server) in your custom authorization servers and embedded auth apps.
* [Use CORS to locate potential integrations](/docs/guides/enable-cors/main/). You can use the CORS URL to isolate where an SDK is initialized.
* [Change your embedded Sign-In Widget's configuration](/docs/guides/oie-embedded-common-download-setup-app/java/main/#initialize-the-sign-in-widget) to support the Interaction Code grant type in your project.
* [Upgrade your app to the Identity Engine SDK](/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/main/#map-basic-sign-in-code-to-the-identity-engine-sdk) to update your app if you're using `setCookieAndRedirect` to get tokens. <!-- (/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/-/main/) -->
* Test and verify your user experience both [visually](/docs/guides/oie-upgrade-sign-in-widget-styling/) and [functionally](/docs/guides/oie-upgrade-sign-in-widget-i18n/).

## Upgrade SDKs to the latest version in your apps

When you're embedding authentication with our SDKs, review all the steps before you plan the upgrade to the latest SDK version. Also, plan to replace all Classic Engine authentication calls with Identity Engine calls. The following steps outline what your upgrade journey might look like.

1. [Update your custom authorization servers](/docs/guides/implement-grant-type/interactioncode/main/#set-up-your-authorization-server) to include the Interaction Code grant type.

2. [Update the app settings](/docs/guides/implement-grant-type/interactioncode/main/#enable-the-interaction-code-grant-on-an-application) of your embedded authentication apps to include the Interaction Code grant type.

   > **Note:** Performing these steps doesn't change the way your authorization server or app behaves, but instead adds support for the new Identity Engine model. Enabling the Interaction Code grant type in your custom authorization server simply allows the server to accept a request of that type. The app behavior doesn't change until you [enable the Interaction Code in the embedded Sign-In Widget](/docs/guides/oie-embedded-common-download-setup-app/java/main/#initialize-the-sign-in-widget). At that point, replace your Classic Engine authentication API calls with the appropriate SDK.

   <!-- [move away from using Classic Authentication APIs to using the appropriate SDK](/docs/guides/). -->

3. Test your apps to verify that sign-in, sign-up, and password recovery still work as they did in Classic Engine.

4. Update your SDK.

    * Some SDK libraries have Identity Engine built into their newer version, such as the [Okta Auth JavaScript SDK](https://github.com/okta/okta-auth-js/blob/master/docs/migrate-from-authn-to-idx.md). For these, update your build script dependencies to collect the latest version.

    * Other libraries stay separate from their class forms. For these, add the newer SDK libraries to your build script dependencies. Then import them into your existing classes and project files.

    See [Add the Identity Engine SDK to your app](/docs/guides/oie-upgrade-add-sdk-to-your-app/main/) for detailed steps by language. <!-- (/docs/guides/oie-upgrade-add-sdk-to-your-app/-/main/) -->

5. Test your user flows with the new SDKs in your build, without any code changes. This confirms that your users can still access your app seamlessly.

6. Replace Classic Engine code with Identity Engine code.

    Prioritize the least risky workflows to incrementally replace existing Classic Engine workflows with Identity Engine workflows. Each upgrade path is different. You might choose to upgrade your password recovery first because it's typically used less than your authentication workflow. It's also far less risky than changing your registration workflow.

    Okta recommends the following order, but prioritize the order of your upgrade workflows to suit your needs.

    * **Self-Service Password Recovery:** Replace with the remediation form of the password reset flow. This may also mean removing features like security questions and some other configurations from the Password Authenticator's settings. See [Upgrade your app to the Identity Engine SDK](/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/main/) for detailed steps by language. <!-- (/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/-/main/) -->

    * **Self-Service Registration:** The Identity Engine SDK provides full support for user sign-up flows. See the [Self-service registration integration guide](/docs/guides/oie-embedded-sdk-use-case-self-reg/-/main/) for more information on how to integrate the sign-up use case into your app using the Identity Engine SDK.

    * **Authentication**

        * **Sign In:** In your new Identity Engine org, Okta maps the Organization Sign-On Policy to a global session policy. It maps app sign-on rules to the [corresponding app sign-in policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop). Test that your user experience still works as it did in Classic Engine. If you have apps that use multifactor authentication, make sure that they still authenticate the same way. Apps should still work after you upgrade the policies.

        > **Note:** Changing the global session policy affects all apps in an org.

        * **Sign Out:** Use the `revoke()` method in the SDKs rather than make calls to the Sessions API to manage Okta sessions. See [Revoke the access token](/docs/guides/oie-embedded-sdk-use-case-basic-sign-out/-/main/#_2-revoke-the-access-token).

        If you tightly couple your app sessions with Okta sessions, you may need more work to separate them. See [Understand how sessions work after the upgrade](/docs/guides/oie-upgrade-sessions-api/).

## Upgrade from using the Okta Authentication APIs

With some solutions, architects, engineering leadership, and product teams must make more architectural evaluations. They plan and execute these changes to address technical debt, or to move API-based implementations away from a less supported implementation. For most teams, the recommended path is to adopt the appropriate Identity Engine SDK. See [Upgrade SDKs to the latest version in your apps](#upgrade-sdks-to-the-latest-version-in-your-apps) above. If your app must call the Identity Engine APIs directly, see [Upgrade your app to the Identity Engine SDK](/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/main/) for language-specific steps.

## Roll the upgrade out to your users

When planning how to roll the upgrade out to your users, take the following suggestions into consideration:

1. No need to roll out the upgrade to all users, all at once.
1. Depending on your deployment process, you can:
    * Have logic in your code to send some users into the Classic Engine workflow and some to Identity Engine.
    * Load balance network traffic across different app instances, containers, or web servers. Route some users to a Classic Engine version of your app and some to an Identity Engine version.
    * Increase this over time, as you see fit.
    * Remove code or shutdown alternate versions when everything is functional.

## Troubleshoot

This section details common issues and errors that you may encounter during your upgrade, and likely causes.

| Issue / error | Cause |
| ------ | -------------------------- |
| Error message: "The requested feature isn't available in this environment" | This error appears when your [Okta org](/docs/concepts/okta-organizations/) isn't upgraded to Identity Engine, but you enable [interaction code](/docs/concepts/interaction-code/) in the embedded SDK or Sign-In Widget. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version. |
| &nbsp; | This error also appears when you've upgraded your org and enabled interaction code in the embedded SDK, but not in your app or authorization server. |
| Various SDK errors | If your org isn't upgraded to Identity Engine, you see errors when you replace Classic Engine API or SDK calls with Identity Engine calls. |
| Your org and SDK are upgraded to Identity Engine, but your app still behaves like Classic Engine | [Interaction code](/docs/guides/implement-grant-type/interactioncode/main/) is off in the SDK. You must turn it on to upgrade the [Embedded Sign-In Widget](/docs/guides/oie-upgrade-sign-in-widget/) and [Embedded SDK](/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/)-based apps. |
