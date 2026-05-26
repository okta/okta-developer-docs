---
title: Create an app integration
excerpt: How to create an app integration in the Okta Admin Console
layout: Guides
---

This guide explains what an app integration is, why you need one, and how to create one.

---

#### Learning outcomes

* Learn about app integrations in Okta.
* Learn how to create the app integration.
* Learn how to test your SSO integration in your Okta org.

#### What you need

* An [Okta Integrator Free Plan org](https://developer.okta.com/signup/).
* An admin user in the Integrator Free Plan org with either the super admin or the app and org admin roles.
* A functional SSO integration created in accordance with the [Build a Single Sign-On integration](/docs/guides/build-sso-integration/openidconnect/main/) guide.

---

## About app integration

App integrations in Okta connect your Okta org to external apps and services. These integrations support several protocols that allow you to manage user access, authentication, and provisioning from a single or centralized platform.

With app integrations, you can:

* Provide users with secure, seamless [Single Sign-On (SSO)](https://help.okta.com/okta_help.htm?type=oie&id=ext-apps-about-sso) access to their apps.
* Automate user provisioning and deprovisioning using protocols like [System for Cross-domain Identity Management (SCIM)](https://developer.okta.com/docs/concepts/scim/).
* Centralize access management and enforce security policies across all connected apps.
* Monitor and report on app usage and user activity.

App integrations can be:

* Prebuilt: These are existing integrations available in the [Okta Integration Network (OIN)](https://www.okta.com/integrations/), these integrations are tested and validated by Okta.
* Custom: Created by admins or developers for internal or specialized use cases. Custom integrations can be built using the App Integration Wizard (AIW), templates, or bookmarks.
* [API Service](https://help.okta.com/okta_help.htm?type=oie&id=ext-api-service-integrations): These integrations allow third-party apps to access the [Core Okta API](https://developer.okta.com/docs/reference/core-okta-api/) using OAuth 2.0.

The following table summarizes the key differences:

| Feature | Prebuilt/existing integration | Custom integration | API Service integration |
| --- | --- | --- | --- |
| Definition | Integrations that are listed in the [OIN app catalog](https://www.okta.com/integrations/) | Integrations that are created within the Okta org for internal use | Integrations that have access to the Core Okta API using OAuth 2.0. |
| Benefit | Provides broad visibility and seamless onboarding | Ideal for prototyping or niche use cases | Secure access to Okta APIs without user interaction |
| Protocols supported | OIDC, SAML, SWA, WS-Fed, SCIM | OIDC, SAML, SWA, SCIM | OAuth 2.0 |
| Security validation | Reviewed and tested by Okta | No external validation. Handled by the org admin or the developer. | OAuth-based flow with limited scopes and tokens |
| Discoverability | Listed in the public OIN app catalog | Only visible in the org | Not visible to end users |
| Use case | Public SaaS apps | Internal apps | User sync, backend microservices |

### Supported protocols

Okta app integrations support standard protocols for both [SSO](https://developer.okta.com/docs/guides/oin-sso-overview/) and automated user provisioning:

* [OpenID Connect (OIDC)](https://developer.okta.com/docs/concepts/oauth-openid/): Authentication protocol based on OAuth 2.0, which enables secure SSO and supports advanced security features.
* [Security Assertion Markup Language (SAML)](https://developer.okta.com/docs/concepts/saml/): An XML-based protocol for exchanging authentication and authorization data between Okta and external apps.
* [Secure Web Authentication (SWA)](https://help.okta.com/okta_help.htm?id=ext-apps-about-swa): A form-based authentication method that allows Okta to securely store and submit user credentials for apps that don’t support federated SSO.
* [Web Services Federation (WS-Fed)](https://help.okta.com/okta_help.htm?id=ext-apps-about-wsfed): A protocol primarily used by Microsoft apps for federated identity and SSO.
* [SCIM](https://help.okta.com/okta_help.htm?id=ext-apps-about-scim): A standard protocol for automating the exchange of user identity information, enabling automated user provisioning and deprovisioning between Okta and external apps.

These protocols allow you to provide secure, seamless access and automated user management for a wide range of apps and services.

## How to create an app integration

You can add either a prebuilt app integration from the OIN or create a custom app integration based on your org’s needs.

### Add a prebuilt/existing app integration

1. Sign in to the Admin Console.
    1. [Sign in to your Okta org](https://developer.okta.com/login).
    1. Click **Admin** in the upper-right corner of the page.
2. Go to **Applications** > **Applications**.
3. Click **Browse App Catalog**.
4. Search for the app integration you require. To search, perform one of these two options:
    * Type the app integration name in the **Search** bar. Select it from the dropdown or click **See All Results** to have everything displayed as tiles in the main panel. Click the tile to view its details.
    * Choose a **Use Case** and optional filters such as **Functionality** or **Industry** to filter the results. When you find the app integration you want, click it to view more details on the details page.
5. Determine if this is the correct app integration for your needs. The details page provides a detailed description of the app integration, its use case, and supported functionality.
6. Select the app from the catalog and click **Add Integration**.
7. Enter the required information under **General Settings**, and then click **Next**.
8. Select one of the sign-on methods on the **Sign-On Options** page. The sign-on options available depend on the access protocols supported by the app integration. See [Configure SSO options](https://help.okta.com/okta_help.htm?type=oie&id=ext_Apps_Overview_of_Managing_Apps_and_SSO).
    > **Note**: For SWA app integrations, you can't configure the sign-on options when **Sync Password** is configured as a provisioning option.
9. Select a username format in the **Application username format** dropdown. This format is the default username value when assigning the app integration to users.
    > **Note**: If you select None and the app integration has password or profile push provisioning features, then Okta prompts you to enter the username manually when you assign the app integration.
10. Select a setting from the **Update application username on** dropdown list. This setting controls how you want the app integration to handle any updates to the user's Okta username.
11. Select **Password reveal** if you want your end users to see the password used to connect to the external app. See [Reveal the password of an app integration](https://help.okta.com/okta_help.htm?type=oie&id=ext_Apps_Revealing_the_Password).
12. Click **Done**.

Okta adds an instance of the app integration to your org, and you can now assign it to your end users. See [Assign app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext_Apps_Apps_Page-assign). If you need to update the settings for your app integration, including changing sign-in options, see [Configure settings for app integrations](https://help.okta.com/okta_help.htm?type=oie&id=ext-apps-configure-settings).

### Create a custom app integration

You can add an app integration that doesn't exist in the OIN, using the App Integration Wizard (AIW). The wizard allows you to create a private app integration for your app and connect Okta with your SAML, OIDC, SWA, or SCIM app. You can also add SCIM provisioning to a custom app integration.

>**Note**: As a best practice, create two or three extra admin users in your Okta org to manage the integration. This ensures that your team can access the integration for updates in the future.

1. Open the Admin Console for your org.
1. Go to **Applications > Applications**.
1. Click **Create App Integration**.
1. Select **OpenID Connect** in the **Sign in Method** section.
1. Choose either **Web Application** or **Single-Page Application** as the **Application type** for your integration and click **Next**.
1. Configure the following integration settings on the **General Settings** tab:

    <StackSnippet snippet="protocol-config" />

1. Click **Save**.

    >**Note:** This private integration is only visible within your Okta org. To modify settings after creation, click **Edit** on the main app page. If you need to generate a new client secret under **Client Credentials**, remember to update your app with the new credentials to prevent downtime. To make your app publicly available later, see [Publish an OIN integration](https://developer.okta.com/docs/guides/submit-app-overview/).

1. To build and finalize your implementation settings details, see <StackSnippet snippet="integration" />

### Create an API Service Integration

You can also add any API service integration listed in the OIN catalog with their Okta tenant org. See [API Service Integrations](https://developer.okta.com/docs/guides/oin-api-service-overview/).

To build, test, and submit your API service integration to the OIN catalog. See [Build an API service integration](https://developer.okta.com/docs/guides/build-api-integration/main/).

## Test Your Integrations

Once your app is set up:

1. Assign users:

    a. Click the **Assignments** tab.

    b. Click **Assign** and then select either **Assign to People** or **Assign to Groups**.

    c. Enter the appropriate people or groups that you want to have Single Sign-On into your app, click **Assign** for each, verify user attributes, and select **Save and Go Back**.

    d. Click **Done**.

1. Test SSO: Sign in to the Okta End-User Dashboard as a test user and click the app tile.

1. Verify redirection: Ensure the app-initiated flow correctly redirects back from the Okta sign-in page to your app.

1. Troubleshoot: If issues occur, navigate to **Reports** > **System Log** to examine failure messages or *4XX* status codes. You can also post your questions on the [Okta Developer Forum](https://devforum.okta.com/search?q=oidc).

## See also
<StackSnippet snippet="see-also" />