---
title: External Identity Providers
---
# External Identity Providers
As a developer building a custom application, you want to give your users the freedom to choose which Identity Provider (IdP) that they use to sign in to your application. But first you should understand how various IdPs connect to Okta. 

What is an Identity Provider? A service that creates, maintains, and manages identity information and then provides authentication services to your applications. For example, the user data that Google stores includes credentials that users can use when they sign in to your application. Your application then checks with Google (the IdP) to verify that the user can access your application and what information the user can access. 

Okta supports social providers, such as Facebook and Microsoft, OpenID Connect (OIDC) providers such as Amazon and Salesforce, and services that support the SAML protocol.

## The big picture
Okta manages connections to other IdPs for your application and sits between your application and the IdP that authenticates your users.

When you use Okta as the [user store] for your applications, users can sign in with their email and password by default. See our guides for how to sign in users to your [web](/docs/guides/sign-into-web-app/before-you-begin/), [mobile](/docs/guides/sign-into-mobile-app/before-you-begin/), and [single-page](/docs/guides/sign-into-spa/before-you-begin/) apps.

You can add connections to social IdPs like Google and Facebook. This is called social login or social authentication. It allows your users to sign in to your app using credentials from social IdPs. After the user authenticates, they are returned to your application and their social profile information is pulled into your Okta Universal Directory.

You can add connections to any external IdPs that support OpenID Connect (such as Twitch or Paypal). This is often referred to as a generic OpenID Connect IdP. OpenID Connect allows users to sign in to an Okta org using their credentials from their existing account. You sync their accounts into your Okta Universal Directory while continuing to use that IdP for user authentication, which eliminates the need to store an additional username and password for that user. You can also configure federation between Okta orgs using OpenID Connect as a replacement for SAML. 

> Note: Social and OpenID Connect IdPs store access tokens that allow subsequent calls to IdPs after the user is authorized.

You can add connections to any IdPs that support SAML protocols, also referred to as inbound federation or inbound SAML. The SAML flow is initiated with the service provider (in this case, Okta) that redirects the user to the IdP for authentication. After authentication, a user is created inside Okta, and the user is redirected back to your application along with an ID token. This allows you to use Okta to proxy between SAML-only identity providers and OpenID Connect-only applications that normally are incompatible.

> Note: Okta supports group sync between Okta and enterprise SAML IdPs.

Adding any of these IdPs allows users to sign in to your application using their credentials from a specific IdP.

## Benefits of using Okta to manage Identity Providers
You could connect your application directly to an IdP (for example, using an SDK to add a button). However, using Okta as the user store for your application and letting Okta manage the IdP connections has some benefits:

* The connection is managed by Okta. Your application only needs to talk to Okta, and Okta does the rest. You don't have to write any custom code, either.

* There's one protocol. Your application uses OpenID Connect to talk to Okta. Okta handles whatever protocols the other IdPs use, and this is transparent to your application.

* All users are stored in Okta (a single user store). You can capture the profile attributes from an IdP user and store those attributes in Okta's Universal Directory.

* If a user updates their profile at the IdP, those changes can be reflected inside Okta the next time that they use the provider to sign in (profile sync). 

* Users can use multiple IdPs to sign in, and Okta links those profiles to a single Okta user (account linking).

## How Okta connects to external Identity Providers
Okta sits between your application and the external provider. Your application only needs to talk to Okta, and Okta does the rest.

### Sign-in process
The sign in process starts at the `/authorize` endpoint, and then goes out to the provider and back:

1. In your application, the user clicks a button similar to: **Sign in with (IdP)**. Your application redirects the browser to Okta.
2. Okta redirects the browser to the IdP.
3. The user is prompted to sign in at the IdP (if they aren't already) and to accept the permissions required by your app.
4. The browser is redirected back to Okta.
5. Okta processes the sign-in request and adds the user to your Okta organization's Universal Directory.
6. Okta redirects the browser back to your application, just like any other sign-in request.

![Social Login Flow width:](/img/social_login_flow.png "Social Login Flow width:")

## Account Linking and Just-in-Time Provisioning
When you allow your users to sign in to your app using their choice of IdPs, you can use Account Linking to help create a unified view of your users within your org. Additionally, you can use Just in Time (JIT) provisioning to create a seamless experience for users that sign-in to your application for the first time using their credentials from another IdP.

Users can use multiple external IdPs to sign in, and Okta can link all of those profiles to a single Okta user. This is called Account Linking. If, for example, a user signs in to your app using a different IdP than they used for registration, Account Linking can establish that the user owns both identities, allowing the user to sign in from either account.

If a user signs in to your application for the first time using another IdP, you can implement Just in Time (JIT) provisioning to automatically create an Okta account for them. JIT account creation and activation only works for end users who aren't already Okta users. (JIT does update the accounts of existing users during full imports.)

Additionally, you can apply granular control over Account Linking and JIT by defining a policy and then rules for the policy. You can base a policy on a variety of factors, such as location, group definitions, and authentication type. A specific policy rule can then be created for groups that have been assigned to your application. You can create multiple policies with more or less restrictive rules and apply them to different groups.

## See also
See the following guides for information on how to set up various IdPs:

- [Facebook](/docs/guides/sign-in-with-facebook/)
- [Google](/docs/guides/sign-in-with-google/)
- [LinkedIn](/docs/guides/sign-in-with-linkedin/)
- [Microsoft](/docs/guides/sign-in-with-microsoft/)
- [Generic OIDC Identity Provider](/docs/guides/federate-with-oidc/overview/)
