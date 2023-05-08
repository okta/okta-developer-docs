---
title: Plan embedded auth app upgrades
---

<ApiLifecycle access="ie" />

We understand that upgrades can be stressful. We've carefully considered how you can break up the upgrade steps to ensure that you maintain the best user experience across your applications.

We don’t recommend doing this upgrade all at once, but rather in sections with breaks for testing. This process is designed to be non-disruptive and iterative over time. Make the upgrade steps part of your normal product development process.

After the [initial upgrade process](/docs/guides/oie-upgrade-overview/#upgrade-process) is complete for your orgs, there are more steps that you should walk through to finish the upgrade. Which steps that you take are related to your deployment model and should be carefully planned.

## Prioritize and plan your upgrade

Prioritize and roadmap the changes to your applications. Then, take breaks to test so that you can achieve the other business objectives that you have.

Also, create continuous pieces of work that your team must do to fully upgrade to Okta Identity Engine. For example, complete steps one and two, and then test and take a break from upgrade tasks for a month or two. Complete step three and take a break before completing steps four and five, and so on.

## What’s your scenario?

While it isn’t possible to fully document every upgrade scenario, the following stages cover the most common scenarios. These steps are't all-inclusive. See the associated documentation in each stage for more detailed steps that you can use to plan and prioritize your process.

* [Redirecting to the Okta-hosted Sign-In Widget](#update-the-okta-hosted-sign-in-widget)
* [Embedding our Sign-In Widget](#update-the-embedded-sign-in-widget)
* [Embedding your authentication with our SDKs](#upgrade-sdks-to-the-latest-version-in-your-apps)
* [Using the Okta APIs](#upgrade-from-using-the-okta-authentication-apis)

See [Roll the upgrade out to your users](#roll-the-upgrade-out-to-your-users) for suggestions on roadmapping your upgrade rollout.

## Update the Okta-hosted Sign-In Widget

When you're redirecting to the Okta-hosted widget, make sure that your user experience is preserved both [visually](/docs/guides/oie-upgrade-sign-in-widget-styling/) and [functionally](/docs/guides/oie-upgrade-sign-in-widget-i18n/). Be sure to check your `config.idps` [settings](https://github.com/okta/okta-signin-widget#openid-connect) for customizations that may not be compatible with Identity Engine.

## Update the Embedded Sign-In Widget

When you're embedding the widget, consider and plan for the following steps depending on your needs:

* [Update your widget](/docs/guides/oie-upgrade-sign-in-widget) to the latest version.
* [Add support for the Interaction Code](/docs/guides/implement-grant-type/interactioncode/main/#set-up-your-authorization-server) in your custom authorization servers and embedded auth applications.
* [Use CORS to locate potential integrations](/docs/guides/enable-cors/main/). You can use the CORS URL to isolate where an SDK is initialized.
* [Change your embedded Sign-In Widget’s configuration](/docs/guides/oie-embedded-common-download-setup-app/java/main/#initialize-the-sign-in-widget) to support the Interaction Code grant type in your project.
* [Upgrade your application to the Identity Engine SDK](/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/nodejs/main/#map-basic-sign-in-code-to-the-identity-engine-sdk) to update your app if you're using `setCookieAndRedirect` to get tokens. <!-- (/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/-/main/) -->
* Test and verify your user experience both [visually](/docs/guides/oie-upgrade-sign-in-widget-styling/) and [functionally](/docs/guides/oie-upgrade-sign-in-widget-i18n/).

## Upgrade SDKs to the latest version in your apps

When you're embedding your authentication with our SDKs, consider all the steps and then make a plan for upgrading your code to the latest SDK version. Also, plan to replace all Okta Classic Engine authentication calls with Identity Engine calls. The following steps outline what your upgrade journey might look like.

1. [Update your custom authorization servers](/docs/guides/implement-grant-type/interactioncode/main/#set-up-your-authorization-server) to include the Interaction Code grant type.

2. [Update the application settings](/docs/guides/implement-grant-type/interactioncode/main/#enable-the-interaction-code-grant-on-an-application) of your embedded authentication applications to include the Interaction Code grant type.

   > **Note:** Performing these steps doesn’t change the way your authorization server or application behaves, but instead adds support for the new Identity Engine model. Enabling the Interaction Code grant type in your custom authorization server simply allows the server to accept a request of that type. The application behavior doesn’t change until you [enable the Interaction Code in the embedded Sign-In Widget](/docs/guides/oie-embedded-common-download-setup-app/java/main/#initialize-the-sign-in-widget) and move away from using Classic Engine authentication APIs to using the appropriate SDK.

   <!-- [move away from using Classic Authentication APIs to using the appropriate SDK](/docs/guides/). -->

3. Test your applications to verify that your user flows across sign in, sign up, and password recovery still work like what was configured in Classic Engine.

4. Update your SDK.

    * For previous SDK libraries that have Identity Engine baked into the newer version ([okta-auth-js](https://github.com/okta/okta-auth-js/blob/master/docs/migrate-from-authn-to-idx.md)), update your dependencies in your build scripts to collect the latest version of the SDK.

    * For libraries that are separate from their class forms, add newer SDK libraries to your dependencies in your build scripts and import them into your existing classes and relevant project files.

    See [Add the Identity Engine SDK to your app](/docs/guides/oie-upgrade-add-sdk-to-your-app/nodejs/main/) for detailed steps by language. <!-- (/docs/guides/oie-upgrade-add-sdk-to-your-app/-/main/) -->

5. Test your user flows with the new SDKs included in your build without any code changes to ensure that your users can still access your application seamlessly.

6. Replace Classic Engine code with Identity Engine code.

    Prioritize the least risky workflows to incrementally replace existing Classic Engine workflows with Identity Engine workflows. Each upgrade path is different. You might choose to upgrade your password recovery first because it's typically used less than your authentication workflow. It's also far less risky than changing your registration workflow.

    We recommend the following order, but prioritize the order of your upgrade workflows to suit your needs.

    * **Self-Service Password Recovery:** Replace with the remediation form of the password reset flow. This may also mean removing features like security questions and some other configurations from the Password Authenticator's settings. See [Upgrade your application to the Identity Engine SDK](/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/nodejs/main/) for detailed steps by language. <!-- (/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/-/main/) -->

    * **Self-Service Registration:** The Identity Engine SDK provides full support for user sign-up flows. See the [Self-service registration integration guide](/docs/guides/oie-embedded-sdk-use-case-self-reg/-/main/) for more information on how to integrate the sign-up use case into your application using the Identity Engine SDK.

    * **Authentication**

        * **Sign In:** In your new Identity Engine org, the Organization Sign-On Policy and app sign-on rules are mapped to a global session policy and [corresponding authentication policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop) respectively. Test and make sure that your user experience still works the same as what was configured in Classic Engine. If you have applications that employ multifactor authentication, make sure that they still authenticate in the same way. Applications should still work after the policies are upgraded.

        > **Note:** Changing the global session policy affects all apps in an org.

        * **Sign Out:** Use the `revoke()` method in the SDKs rather than make calls to the Sessions API to manage Okta sessions. See [Revoke the access token](/docs/guides/oie-embedded-sdk-use-case-basic-sign-out/-/main/#_2-revoke-the-access-token).

        Also, if you're tightly coupling your application sessions with the Okta Sessions, there may be more work to be done to separate the Okta sessions from the Application sessions. See [Understand how sessions work after the upgrade](/docs/guides/oie-upgrade-sessions-api/).

## Upgrade from using the Okta Authentication APIs

With some solutions, there are more architectural evaluations from Architects/Engineering Leadership/Product teams that need to be made, planned, and executed to address technical debt or, in the case of API-based implementations, move away from a less supported implementation. More detailed information is coming soon on moving away from using Classic Authentication APIs to using the appropriate SDK.

<!-- [move away from using Classic Authentication APIs to using the appropriate SDK](/docs/guides/). -->

## Roll the upgrade out to your users

When planning how to roll the upgrade out to your users, take the following suggestions into consideration:

1. No need to roll out the upgrade to all users, all at once.
1. Depending on your deployment process, you can:
    * Have logic in your code to send some users into the Classic Engine workflow and some to Identity Engine.
    * Load balance network traffic to different application instances, containers, or web servers to send some to a Classic Engine version of your app or to an Identity Engine version.
    * Increase this over time, as you see fit.
    * Remove code or shutdown alternate versions when everything is functional.

## Troubleshoot

This section details common issues and errors that you may encounter during your upgrade, and likely causes.

| Issue / error | Cause |
| ------ | -------------------------- |
| Error message: "The requested feature isn't available in this environment" | This is reported when your [Okta org](/docs/concepts/okta-organizations/) hasn't been upgraded to Identity Engine and you try to turn on [interaction code](/docs/concepts/interaction-code/) in the embedded SDK/Sign-In Widget. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version. |
| &nbsp; | This is also reported when you've upgraded your org to Identity Engine and enabled interaction code in the embedded SDK, but it isn't enabled in your app or authorization server. |
| Various SDK errors | If your Okta org hasn't been upgraded to Identity Engine and you start trying to replace Classic Engine API/SDK calls with Identity Engine SDK calls, you see errors in your apps. |
| Your org and SDK are upgraded to Identity Engine, but your app still behaves like Classic Engine | [Interaction code](/docs/guides/implement-grant-type/interactioncode/main/) is turned off in the SDK. This is required for upgrading [Embedded Sign-In Widget](/docs/guides/oie-upgrade-sign-in-widget/) and [Embedded SDK](/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/)-based apps.  |
