---
title: Get started with Okta Customer Identity
meta:
  - name: description
    content: Find out how Okta technologies can help you build a proof of concept Okta Customer Identity app.
---

# Get started with Okta Customer Identity

Build and extend a proof of concept app using Okta Customer Identity (OCI) to sign users in.

OCI provides an out-of-the-box, low-code, highly secure solution that's easy to deploy and keeps your customers safe. Follow these steps to create a prototype app using our built-in authentication policies and sign-in form, and fit it to your brand. This article also covers basic issues around user onboarding campaigns and building your apps to scale well.

## Develop your OCI POC

This section focuses on getting set up with Okta, and then connecting your app to Okta using built-in authentication policies and using the Okta hosted sign-in page.

### Set up your Okta environment

Your Okta journey starts with creating [an Okta account](/docs/guides/newdochere), followed by the creation of [an Okta org](/docs/concepts/okta-organizations/). The org serves as your central Okta development hub, encapsulating all users, groups, policies, and other objects your app uses.

After your account and org are provisioned, [set up your org for basic testing](/docs/guides/newguidehere). This involves populating it with sample users and a user group.

### Connect your app to Okta

An app integration is a connection between your app and Okta. When you [create an app integration](new-doc-here), you need the following app information:

* **App Name:** A descriptive name for your app within Okta
* **Sign-in Redirect URL:** The URL Okta redirects to after a successful sign-in flow
* **Sign-out Redirect URL:** The URL Okta redirects to after a successful sign-out flow
* **Required Scopes:** The permissions your app requires from Okta
* **Access Policy and Assignments:** The users and groups authorized to access your app

In return, you receive a unique client ID so that your app can securely identify itself to Okta.

### Use our preset authentication policies for rapid deployment

Your Okta org comes with three [preset authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-preset-auth-policies):

* Password only
* Any one factor
* Any two factors

Assign one of these to your app integration to get started.

Your org also comes with four authentication factors enabled by default:

* Password
* Email
* SMS
* Voice

When you need to [add an authentication factor](https://help.okta.com/okta_help.htm?type=oie&id=csh-about-authenticators) (for example: passkeys or Okta Verify), you can do that in the Admin Console. Need to build your own custom authentication policy? You can do that in the Admin Console, also. No coding is necessary.

> **Note**: If you're using an Okta-hosted sign-in page, any change to your authentication policy is instantly reflected. For self-hosted sign-in forms, ensure that you keep them in sync with policy changes to prevent user experience issues. Users can't enter a one-time passcode from their phone if you've forgotten to add support for phone-based authentication to your app.

### Use the Okta hosted sign-in page

Use an Okta-hosted sign-in page to sign your users into your web apps. The Okta-hosted sign-in page supports all Okta authentication factors and adapts to any authentication policy modifications that you make in the Admin Console. It also supports self-service user registration, account recovery, password resets, and passwordless authentication. You can adjust behavior based on device, user, and app context.

The Okta hosted sign-in page operates on standard IAM protocols such as SAML, OAuth 2.0, or OpenID Connect (OIDC). The default and most common approach is to use your preferred OIDC library to initiate the sign-in flow with Okta. Upon successful user authentication, your app receives an ID token (confirming user identity) and an access token (for accessing protected resources like APIs).

See the following guides for more information:

* [Learn about the Okta Sign-In Widget](new concept doc)
* [Sign users in to your portal by redirecting them to an Okta sign-in page](/docs/guides/auth-js-redirect/main/)

> **Note**: For more information on building a mobile app, see [Use our Okta Mobile SDKs for your native mobile apps](#use-our-okta-mobile-sdks-for-native-mobile-apps).

## Build your customer experience POC

This section focuses on branding and advanced user authentication options to refine your app's customer experience.

### Use a custom domain for brand alignment

By default, all orgs have an `okta.com` or `oktapreview.com` URL, for example. When you create a **production** org, you can [register a custom domain](/docs/guides/custom-url-domain/main/). A custom domain isn't just for branding. It also unlocks a full spectrum of customization options for the Okta default UI components and messaging, which ensures your app's brand consistency. It also makes it easier to maintain and monitor [user sessions](#manage-user-sessions-with-okta) and lays the groundwork for advanced cross-app features like [Single Logout](#manage-user-sessions-with-okta).

Register a custom domain with your org immediately to avoid the technical debt that you incur if you add it later.

> **Note:** The Okta Integrator Free Plan org, designed for development and testing by developers interested in implementing an Okta solution, doesn't support custom domains.

### Customize the sign-in page with your brand

The Okta-hosted sign-in page UI is entirely customizable. After your **production** org [has a custom URL](#use-a-custom-domain-url-with-your-okta-org), upload graphics and style sheets in the Admin Console to match your brand.

> **Note:** The Okta Integrator Free Plan org, designed for development and testing by developers interested in implementing an Okta solution, doesn't support custom domains.

* [Style your Okta org with your brand](/docs/concepts/brands/)
* [Style the sign-in page](/docs/guides/custom-widget-gen3/main/)

<!-- Brent's screenshots of some rebranded Okta-hosted sign-in pages here -->

### Use our Okta Mobile SDKs for native mobile apps

For native mobile apps (Swift and Kotlin), Okta Mobile SDKs simplify the sign-in process, supporting both Okta-hosted and self-hosted sign-in forms with minimal code. These SDKs handle tokens, scopes, and requests to the server in the background, so you can concentrate on your app's core functionality.

* Okta Mobile SDK for [Swift](https://github.com/okta/okta-mobile-swift) and [Kotlin](https://github.com/okta/okta-mobile-kotlin)
* [Sign users in to your native app by redirecting them to an Okta-hosted sign-in page](/docs/guides/sign-into-mobile-app-redirect/android/main/)
* [Sign users in to your native app using a self-hosted sign-in page](new doc)

### Understand tokens and scopes

At a fundamental level, a valid ID token from Okta signifies successful user authentication and provides basic user information. An access token, on the other hand, grants your app permission to access specific resources on behalf of that user.

For a comprehensive POC, a deeper understanding of tokens is essential:

* **Claims:** What information (claims) can you request during the sign-in process and in what format is it delivered?
* **Token Verification:** When your app accesses a controlled resource (for example, an API), how do you verify the authenticity of the token?
* **Token Lifecycle:** How are tokens exchanged, refreshed, and revoked? What happens when an access token expires, and you still need to access a resource?

Consult these guides for detailed insights:

* [Understand the token lifecycle (exchange, refresh, revoke)](new-doc)
* Use the Okta JWT verifier libraries to verify ID tokens and [access tokens](/docs/guides/validate-access-tokens/dotnet/main/)
* [Use refresh tokens to renew your access tokens](/docs/guides/refresh-tokens/main/)

## Go further

Beyond authentication, an identity solution requires that you carefully consider session management, flexible sign-in options, efficient user onboarding, and scalable API interactions.

### Manage user sessions with Okta for enhanced security

Okta plays a pivotal role in authenticating your users and managing their sessions. When a user signs in through the Okta-hosted sign-in page, Okta establishes an active browser session. For apps that host their own sign-in experiences, you can use the Sessions API to obtain a session token.

By using Okta-managed sessions and tokens for your app's user sessions, you gain access to more advanced features:

* **Single Logout (SLO):** Users can sign out of all their apps from a single point, streamlining the sign-out process and enhancing convenience.
* **Universal Logout (ULO):** Administrators can centrally terminate all of a user's active sessions across all apps if needed, enhancing security and control.

* [Sessions API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Session/)
* [Learn about Single Logout](/docs/guides/single-logout/openidconnect/main/)
* [Learn about Universal Logout](/docs/guides/oin-universal-logout-overview/)

### Use Direct Authentication for your own sign-in forms

If you prefer your own sign-in page, consider using Direct Authentication to implement the sign-in flow between your app and Okta. This OAuth 2.0 flow currently supports password, email, and phone factors and features the fewest request and response steps between the user and Okta. This makes it suitable for apps with high customer volumes.

* [Learn about Direct Authentication](new concept)
* [Use Direct Authentication in your forms](/docs/guides/configure-direct-auth-grants/aotp/main/)

### Plan your user onboarding campaign

A well-defined user onboarding strategy is crucial for your POC's success. Consider the various ways that a user might obtain an account for your app. Users can create accounts in the app, but often, they're given accounts and must complete the setup themselves. Ask yourself these three questions and ensure that your app supports each applicable use case:

1. **Initial account creation:** What triggers the initial creation of the user account? Is it a beta program, a new company onboarding its employees, or a migration from another identity provider?
2. **Authentication initiation:** How is the user's authentication process initiated? Through email, SMS, or an admin invite notification?
3. **Onboarding experience:** What's the complete user experience for the authentication process? How are they onboarded? How many authentication factors do they need to set up initially? Are you using the Okta-hosted sign-in page or developing your own? Where is the user directed immediately after completing the onboarding process?

### Use the right APIs for scalability

Okta APIs have rate limits to protect the service for all customers, preventing potential denial-of-service attacks and abusive actions. The following resources can help verify that your API endpoints scale effectively for anticipated traffic volume.

* [Learn about Okta API Rate Limits](/docs/reference/rate-limits/)
* [Learn about the API Rate Limit Dashboard](/docs/reference/rl-dashboard/)
