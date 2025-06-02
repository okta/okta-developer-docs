---
title: Get started with OCI development
meta:
  - name: description
    content: Find out how Okta technologies can help you build a proof of concept Okta Customer Identity org.
---

## Get started with OCI development

This journey discusses the steps that you take to build a proof of concept Okta Customer Identity (OCI) org. Through these steps, you learn how OCI can act as the gatekeeper to your customer's user accounts and information.

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

The sign-in page assumes that your app uses an IAM standard for authentication, such as SAML, OAuth 2.0, or OpenID Connect (OIDC). The default and most common IAM standard is to use the OIDC library of your choice to initiate the sign-in flow with Okta. When your user has signed in successfully, your app receives an ID token, which tells the app that they've signed in. The app also receives an access token for accessing other resources like APIs.

* [Learn about the Okta Sign-In Widget](new concept doc)
* [Sign users in to your portal by redirecting them to an Okta sign-in page](/docs/guides/auth-js-redirect/main/)

