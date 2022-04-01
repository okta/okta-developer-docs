---
title: Planning embedded auth app upgrades
---

<ApiLifecycle access="ie" />

We understand that upgrades can be stressful. We have carefully considered how you can break up the upgrade steps to ensure that you maintain the best user experience across your applications. We don’t recommend doing this upgrade all at once, but rather in sections with breaks for testing. This process is designed to be non-disruptive and iterative over a period of time. Make the upgrade steps part of your normal product development process.

After the [initial upgrade process](/docs/guides/oie-upgrade-overview/#upgrade-process) is complete for your orgs, there are additional steps that you should walk through to finish the upgrade. Which steps that you take are related to your deployment model and should be carefully planned.

## Prioritize and plan your upgrade

Prioritize and roadmap the changes to your applications. Then, take breaks to test so that you can achieve the other business objectives that you have. Also, create continuous pieces of work that your team must do to fully upgrade to Identity Engine. For example, complete steps one and two, and then test and take a break from upgrade tasks for a month or two. Complete step three and take a break prior to completing steps four and five, and so on.

## What’s your scenario?

While it isn’t possible to exactly document every upgrade scenario, the following main stages cover the most common scenarios. These steps are not all-inclusive. See the associated documentation in each stage for more detailed steps that you can use to plan and prioritize your process.

* [Redirecting to the Okta-hosted Sign-In Widget](#update-the-okta-hosted-sign-in-widget)
* [Embedding our Sign-In Widget](#update-the-embedded-sign-in-widget)
* [Embedding your authentication with our SDKs](#upgrade-sdks-to-the-latest-version-in-your-apps)
* [Using the Okta APIs](#upgrade-from-using-the-okta-authentication-apis)

See [Roll the upgrade out to your users](#roll-the-upgrade-out-to-your-users) for suggestions on roadmapping your upgrade roll out.

## Update the Okta-hosted Sign-In Widget

When you are redirecting to the Okta-hosted Sign-In Widget, make sure that your user experience is preserved both [visually](/docs/guides/oie-upgrade-sign-in-widget-styling/) and [functionally](/docs/guides/oie-upgrade-sign-in-widget-i18n/). Be sure to check your `config.idps` [settings](https://github.com/okta/okta-signin-widget#openid-connect) for customizations that may not be compatible with Identity Engine.

> **Note:** See the **Remember me** section of the [Compare Identity Engine and Classic Engine](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-whats-new) for more information on functionality changes in the Admin Console.

## Update the Embedded Sign-In Widget

When you are embedding the Okta Sign-In Widget, consider and plan for the following steps, depending on your needs:

* [Update your Sign-In Widget](/docs/guides/oie-upgrade-sign-in-widget) to the latest version.
* [Add support for the Interaction Code](/docs/guides/implement-grant-type/interactioncode/main/#set-up-your-authorization-server) in your Custom Authorization Servers and embedded auth applications.
* [Change your embedded Sign-In Widget’s configuration](/docs/guides/oie-embedded-common-download-setup-app/java/main/#initialize-the-sign-in-widget) to support the Interaction Code grant type in your project.
* [Upgrade your application to the Okta Identity Engine SDK](/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/nodejs/main/#map-basic-sign-in-code-to-the-okta-identity-engine-sdk) to update your app if you are using `setCookieAndRedirect` to get tokens. <!-- (/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/-/main/) -->
* Test and verify your user experience both [visually](/docs/guides/oie-upgrade-sign-in-widget-styling/) and [functionally](/docs/guides/oie-upgrade-sign-in-widget-i18n/).

## Upgrade SDKs to the latest version in your apps

When you are embedding your authentication with our SDKs, consider the steps that you need to take and then make a plan for upgrading your code to the latest version of the SDK. Additionally, plan to replace all Classic Engine Authn calls with Identity Engine calls. The following steps outline what your upgrade journey might look like.

1. [Update your Custom Authorization Servers](/docs/guides/implement-grant-type/interactioncode/main/#set-up-your-authorization-server) to include the Interaction Code grant type.

2. [Update the application settings](/docs/guides/implement-grant-type/interactioncode/main/#enable-the-interaction-code-grant-on-an-application) of your embedded authentication applications to include the Interaction Code grant type.

> **Note:** Performing steps one and two doesn’t change the way your auth server or application behaves, but supports the new Identity Engine model. Turning the Interaction Code grant type on in your Custom Authorization Server simply enables the server to accept a request of that type. The application behavior doesn’t change until you [enable the Interaction Code in the embedded Sign-In Widget](/docs/guides/oie-embedded-common-download-setup-app/java/main/#initialize-the-sign-in-widget) and move away from using Authn APIs to using the appropriate SDK.

<!-- [move away from using Authn APIs to using the appropriate SDK](/docs/guides/). -->

3. Test your applications to verify that your user flows across sign in, sign up, and password recovery still work the same as what was configured in Classic Engine.

4. Update your SDK.

    * For previous SDK Libraries that have Identity Engine baked into the newer version ([okta-auth-js](https://github.com/okta/okta-auth-js/blob/master/docs/migrate-from-authn-to-idx.md)), update your dependencies in your build scripts to collect the latest version of the SDK.

    * For libraries that are completely separate from their class forms, add newer SDK libraries to your dependencies in your build scripts and import them into your existing classes and relevant project files.

    See [Add the Identity Engine SDK to your app](/docs/guides/oie-upgrade-add-sdk-to-your-app/nodejs/main/) for detailed steps by language. <!-- (/docs/guides/oie-upgrade-add-sdk-to-your-app/-/main/) -->

5. Test your user flows with the new SDKs included in your build without any code changes to make sure that your users can still access your application seamlessly.

6. Replace Classic Engine code with Identity Engine code.

    Prioritize the least risky workflows to incrementally replace existing Classic Engine workflows with Identity Engine workflows. Each upgrade path is different. You might choose to upgrade your password recovery first because it is typically used less than your authentication workflow, and it is far less risky than making changes to your registration workflow.

    We recommend the following order, but prioritize the order of your upgrade workflows to suit your needs.

    * **Self-Service Password Recovery:** Replace with the remediation form of the password reset flow. This may also mean removing features like security questions and some other configurations from the Password Authenticator's settings. See [Upgrade your application to the Okta Identity Engine SDK](/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/nodejs/main/) for detailed steps by language. <!-- (/docs/guides/oie-upgrade-api-sdk-to-oie-sdk/-/main/) -->

    * **Self-Service Registration:** The Identity Engine SDK provides full support for user sign up. See the [Self-service registration integration guide](/docs/guides/oie-embedded-sdk-use-case-self-reg/-/main/) for more information on how to integrate the sign up use case into your application using the Identity Engine SDK

    * **Authentication**

        * **Sign In:** In your new Identity Engine org, the Organization Sign-On Policy and App Sign-On Rules are mapped to a Global Session Policy and [corresponding Application Sign-On Policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop) respectively. Test and make sure that your user experience still works the same as what was configured in Classic Engine. If you have applications that employ Multi Factor Authentication, make sure they still authenticate in the same way. Applications should still work after the policies are upgraded.

        > **Note:** Changing the Org Sign-On Policy affects all apps in an org.

        * **Sign Out:** Use the `revoke()` method in the SDKs rather than make calls to the Sessions API to manage Okta sessions. See [Revoke the access token](/docs/guides/oie-embedded-sdk-use-case-basic-sign-out/-/main/#_2-revoke-the-access-token).

        Additionally, if you are tightly coupling your application sessions with the Okta Sessions, there may be more work to be done to separate the Okta sessions from the Application sessions. See [Understand how sessions work after the upgrade to Okta Identity Engine](/docs/guides/oie-upgrade-sessions-api/).

## Upgrade from using the Okta Authentication APIs

With some solutions, there are more architectural evaluations from Architects/Engineering Leadership/Product teams that need to be made, planned, and executed to address technical debt or, in the case of API-based implementations, move away from a less supported implementation. More detailed information is coming soon on moving away from using Authn APIs to using the appropriate SDK.

<!-- [move away from using Authn APIs to using the appropriate SDK](/docs/guides/). -->

## Roll the upgrade out to your users

When planning how to roll the upgrade out to your users, take the following suggestions into consideration:

1. No need to roll out the upgrade to all users, all at once.
1. Depending on your deployment process, you can:
    * Have logic in your code to send some users into the Classic Engine workflow and some to Identity Engine.
    * Load balance network traffic to different application instances, containers, or web servers to send some to a Classic  Engine version of your app or to an Identity Engine version.
    * Increase this over time, as you see fit.
    * Remove code or shutdown alternate versions when everything is working.
