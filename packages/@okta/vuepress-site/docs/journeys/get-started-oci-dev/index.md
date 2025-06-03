---
title: Get started with OCI development
meta:
  - name: description
    content: Find out how Okta technologies can help you build a proof of concept Okta Customer Identity org.
---

## Get started with OCI development

This journey discusses the steps that you take to build a proof of concept Okta Customer Identity (OCI) app. Through these steps, you learn how OCI can act as the gatekeeper to your customer's user accounts and information.

### Start your journey

Journeys are simple and easy-to-navigate collections of the documentation and resources you need to start adding Okta technologies to your apps.

## Get to a Proof of Concept

The following sections discuss the steps that you take to create your OCI proof of concept.

### Learn about Okta

To start using Okta, you need [an Okta account](new doc on getting an Okta account), and then [an Okta org](/docs/concepts/okta-organizations/). An org is the central point for all of your Okta development. It contains all the users, groups, policies, and other Okta objects that your apps interact with.

After you have an account and then an Okta org, [set up your org for basic testing](new doc on setting up your org for basic testing) by adding some users and a user group. You can then start testing your apps.

#### Use a custom domain URL with your Okta org

By default, all orgs have an `okta.com` or `oktapreview.com` URL. When you create a **production** org, you register a custom domain. A custom domain unlocks all the options to apply your brand elements to Okta's default UI components and messaging. It also makes it easier to maintain and monitor [your users' sessions (see tip 8)]() and sets you up later for cross-application features like [Single Logout (see tip 9)]().

Register a custom domain with your org immediately to avoid the technical debt that you incur if you add it later.

> **Note:** The Okta Integrator Free Plan org, which is for development and testing by developers interested in implmenting an Okta solution, doesn't support creating a custom domain.

### Connect your app to Okta

An app integration is a connection between your app and Okta. When you create an app integration in the Okta Admin Console, you need the following information about your app:

* App Name
* Sign-in Redirect URL
* Sign-out Redirect URL
* Required Scopes
* Access policy and assignments (Know which users or groups should be granted access to the app)

In return, you receive a unique client ID so that your app can identify itself to Okta.

### Use our preset authentication policies to start

Your Okta org comes with three [preset authentication policies](https://help.okta.com/oie/en-us/content/topics/identity-engine/policies/about-preset-auth-policies.htm)(???Need alias for this):

* Password only
* Any one factor
* Any two factors

You org also comes with four basic authentication factors enabled:

* Password
* Email
* SMS
* Voice

Assign one of these to your app integration to get started.

When you need to [add a new authentication factor](https://help.okta.com/oie/en-us/content/topics/identity-engine/authenticators/about-authenticators.htm)(???need the alias for this) (for example: passkeys or Okta Verify) or start building your own custom authentication policy, you do that all in the Okta Admin Console. No coding is necessary.

If you're using an Okta-hosted sign-in page, it will instantly update its behavior to any change that you make to your authentication policy. If you're building your own sign-in form, ensure that you keep it in sync with the policy changes that you're making. Users can't enter a one-time password from their phone if you've forgotten to add support for phone-based authentication to your app.

### Use the Okta hosted sign-in page

Use an Okta-hosted sign-in page to sign your users in to your web apps. The Okta-hosted page supports every Okta authentication factor out of the box and automatically reflects any change in authentication policy that you make in the Admin Console. It also supports self-service user registration, account recovery, password resets, and passwordless authentication. You can design this policy to adjust based on the context of the device, user, and app.

> **Note**: For more information on building a mobile app, see [Use our Okta Mobile SDKs for your native mobile apps]().

The sign-in page assumes that your app uses an IAM standard for authentication, such as SAML, OAuth 2.0, or OpenID Connect (OIDC). The default and most common IAM standard is to use the OIDC library of your choice to initiate the sign-in flow with Okta. When your user has signed in successfully, your app receives an ID token, which tells the app that they've signed in. The app also receives an access token for accessing other resources like APIs.

* [Learn about the Okta Sign-In Widget](new concept doc)
* [Sign users in to your portal by redirecting them to an Okta sign-in page](/docs/guides/auth-js-redirect/main/)

### Customize the sign-in page with your brand

The Okta-hosted sign-in page UI is entirely customizable. After you have [set up a custom URL for your production org](#use-a-custom-domain-url-with-your-okta-org), you can upload graphics and stylesheets to match your brand in the Admin Console.

> **Note:** The Okta Integrator Free Plan org, which is for development and testing by developers interested in implmenting an Okta solution, doesn't support creating a custom domain.

* [Style your Okta org with your brand](/docs/concepts/brands/)
* [Style the sign-in page](/docs/guides/custom-widget-gen3/main/)

???Screenshots of some rebranded Okta-hosted sign-in pages.

### Use our Okta Mobile SDKs for native mobile apps

The Okta Mobile SDKs for Swift and Kotlin native apps support sign-in with either an Okta-hosted or a self-hosted sign-in form in just a few lines of code. The SDKs also handle all your tokens, scopes, and requests to the server in the background, leaving you to focus on what the app does, not how the user signs in.

* Okta Mobile SDK for [Swift](https://github.com/okta/okta-mobile-swift) and for [Kotlin](https://github.com/okta/okta-mobile-kotlin)
* [Sign users into your native app by redirecting them to an Okta-hosted sign-in page](/docs/guides/sign-into-mobile-app-redirect/android/main/)
* [Sign users into your native app using a self-hosted sign-in page](new doc)

### Understand tokens and scopes

At a high level, when your app validates the ID token from Okta, it means that the user has been authenticated, and that you now have some basic information about the user in that token. If you get an access token, you can use that to access some further resources on behalf of that user.

However, it's essential to understand how tokens work at a deeper level. Any access token only contains the claims you request during the sign-in process, but what claims can you request, and what form do they take? When your app needs to access a resource that you control (for example, an API), how do you check that the token is genuine? All tokens expire after a determined time, so what happens when they do expire, and you need to access a resource?

Read these guides to find out:

* Understand the token lifecycle (exchange, refresh, revoke)
* Use the Okta JWT verifier libraries to verify ID tokens and [access tokens](/docs/guides/validate-access-tokens/dotnet/main/)
* [Use refresh tokens to renew your access tokens](/docs/guides/refresh-tokens/main/)

### Manage user sessions with Okta

Okta plays a central role in authenticating your users and managing their sessions. When a user signs in through the Okta-hosted sign-in page, Okta establishes an active session for their browser. For apps that host their own sign-in experience, you can use the Sessions API to obtain a session token.

You should design your apps to leverage these Okta-managed sessions and tokens for your app's own user sessions. Because Okta centrally manages these, you gain powerful features:

**Single Logout (SLO)**: Users can sign out of all their apps from a single point, streamlining the sign-out process.
**Universal Logout (ULO)**: Administrators can end all of a user's active sessions across all apps if needed, enhancing security and control.

Sessions API
Learn about Single Logout
Learn about Universal Logout

Use Direct Authentication for your own sign-in forms
Should you need to roll your own sign-in page instead of using the Okta-hosted one, try using Direct Authentication to implement the sign-in flow between your app and Okta. It currently supports only password, email, and phone factors (with more to come), but this oAuth flow uses the fewest request \ response steps between the user and Okta. It is particularly suited for apps with a high volume of customers.

Learn about Direct Authentication
Use Direct Authentication in your forms

Plan your user onboarding campaign
There are many ways a user may get an account for your app. A user can create an account directly in the app, but more often, they have been given an account for some reason and must finish creating it themselves. As you plan your onboarding campaign, ask yourself three questions:

What causes the initial creation of the user account? Is it a beta program? A new company signing up all its employees? A migration from one IdP to another?
What kicks off the user's authentication process? Are they told via email, SMSSlack, or Admin inviteWindows notification?
What is the user experience for the rest of the authentication process? How are they onboarded? How many authentication factors do they need to set up initially? Are you using the Okta-hosted sign-in page or rolling your own? Where does the user go immediately after they've completed the onboarding process?

Make sure your app supports each applicable use case.
Use the right APIs for scalability
All Okta APIs are subject to rate limits to protect the service for all customers. These limits mitigate denial-of-service attacks and other abusive actions that might degrade the service. Use the Rate Limits documentation and the Rate Limits dashboard in your Admin Console to make sure the endpoints you want to use will scale up to the volume of traffic you expect to make. 

For example, 

Dan Marma

Learn about Okta API Rate Limits
Learn about the API Rate Limit Dashboard
