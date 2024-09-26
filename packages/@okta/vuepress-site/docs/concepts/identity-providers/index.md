---
title: External Identity Providers
---

# External Identity Providers

As a developer building a custom application, you want to give users the freedom to choose which Identity Provider they use to sign in to your application. But first you should understand how Identity Providers connect to Okta.

What is an Identity Provider? It's a service that creates and maintains identity information and then provides authentication services to your applications. Identity Providers can significantly reduce sign-in and registration friction. This allows your users to easily access applications without needing to create passwords or remember usernames.

<a href='/docs/guides/identity-providers/' class='Button--blueDarkOutline card' data-proofer-ignore>
   <span>Add an Identity Provider integration</span>
</a>

## The big picture

Okta manages connections to other Identity Providers for your application and sits between your application and the Identity Provider that authenticates your users.

* You can use Okta as the [user store](/docs/concepts/user-profiles/) for your applications. Then, users can sign in with their email and password by default. See our guides for how to sign in users to your [web](/docs/guides/sign-into-web-app-redirect/), [mobile](/docs/guides/sign-into-mobile-app-redirect/), and [single-page](/docs/guides/sign-into-spa-redirect/) apps.

* You can add connections to social Identity Providers like Apple or Facebook. This is called social login or social authentication. It allows your users to sign in to your app using credentials from their existing social Identity Providers. After users authenticate, you sync their existing Identity Provider credentials into your Okta Universal Directory while continuing to use that Identity Provider for user authentication. This eliminates the need to store an additional username and password for that user.

* You can add connections to Identity Providers that you build in-house that support OpenID Connect or SAML protocols. This is also referred to as Inbound Federation or inbound SAML. The SAML flow is initiated with the Service Provider (in this case, Okta) that redirects the user to the Identity Provider for authentication. After authentication, a user is created inside Okta, and the user is redirected back to your application along with an ID token. This allows you to use Okta to proxy between SAML-only Identity Providers and OpenID Connect-only applications that are normally incompatible.

  > **Note:** Social and OpenID Connect Identity Providers store access tokens that allow subsequent calls to Identity Providers after the user is authorized. For example, the token may contain the permission to add events to a user's Google calendar. After authentication, your app can use the token on more calls to add events to the user's Google calendar on the user's behalf.

* You can also configure federation [between Okta orgs](/docs/guides/add-an-external-idp/oktatookta/main/) using OpenID Connect or SAML.

Adding any of these Identity Providers allows users to sign in to your application using their credentials from a specific Identity Provider.

## Benefits of using Okta to manage Identity Providers

You could connect your application directly to an Identity Provider (for example, using an SDK to add a button for **Sign in with Google**). However, using Okta as the user store for your application and letting Okta manage the Identity Provider connections has some benefits:

* **No custom code:** Your application only needs to talk to Okta, and Okta does the rest.

* **One protocol:** Your application uses OpenID Connect to talk to Okta. Okta handles whatever protocols the other Identity Providers use, and this is transparent to your application.

* **Single user store:** All users are stored in Okta. You can capture the profile attributes from an Identity Provider user and store those attributes in the Okta Universal Directory.

* **Profile sync:** If a user updates their profile at the Identity Provider, those changes appear in Okta the next time they use the provider to sign in.

* **Account linking:** Users can use multiple Identity Providers to sign in, and Okta links those profiles to a single Okta user.

* **Group sync:** Okta supports group sync between Okta and enterprise SAML Identity Providers. This allows you to specify the groups that users should be added to.

* **OAuth 2.0 Scope Configuration:** Specify [OAuth 2.0 scopes](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints) to fully control which social profile attributes are linked to Okta.

## How Okta connects to external Identity Providers

Okta sits between your application and the external provider. Your application only needs to talk to Okta, and Okta does the rest.

### Sign-in process

The sign-in process starts at the `/authorize` endpoint, and then goes out to the provider and back:

1. In your application, the user clicks a button similar to: **Sign in with (Identity Provider)**.
2. Your application redirects the browser to Okta.
3. Okta redirects the browser to the Identity Provider.
4. The user is prompted to sign in at the Identity Provider (if they aren't already) and to accept the permissions required by your app.
5. The Identity Provider redirects the browser back to Okta.
6. Okta processes the sign-in request and adds the user to your Okta organization's Universal Directory.
7. Okta redirects the browser back to your application, just like any other sign-in request.

<div class="three-quarter">

![A flow diagram showing the interactions in a sign-in flow between a user, Okta, and a third party social identity provider](/img/auth/social_login_flow.png)

<!-- Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?type=design&node-id=4336%3A21837&mode=design&t=Zl0pQHW1kqZli8ZO-1  social_login_flow -->

</div>

<!-- Source for image. Generated using http://www.plantuml.com/plantuml/uml/

@startuml
skinparam monochrome true

participant "Okta" as ok
participant "User Agent" as ua
participant "Social Identity Provider" as idp

ua -> ok: Get /oauth2/v1/authorize
ok -> ua: 302 to IdP's Authorize Endpoint + state
ua -> idp: GET IdP's Authorize Endpoint + state
ua <-> idp: User authenticates
idp -> ua: 302 to /oauth2/v1/authorize/callback + state  + code
ua -> ok: GET /oauth2/v1/authorize/callback + state  + code
ok -> ua: 302 to redirect_uri
@enduml
-->

## Account Linking and Just-In-Time provisioning

Use account linking to help create a unified view of your users within your org. Also, you can use Just-In-Time (JIT) provisioning to create a seamless experience for users that sign in to your application for the first time using their credentials from another Identity Provider.

### Account Linking

Users can use multiple Identity Providers to sign in, and Okta can link all of those profiles to a single Okta user. This is called account linking. For example, a user signs in to your app using a different Identity Provider than they used for registration. Account linking can then establish that the user owns both identities. This allows the user to sign in from either account.

Account linking is configured at the Identity Provider level. When you create an Identity Provider, these values are set by default:

* **Account Link Policy**: Disabled
* **Match Against**: Okta Username
* **IdP Username**: idpuser.email

To enable account linking, select `Automatic` from the **Account Link Policy** dropdown list, and then leave the other two defaults. With these settings, when a user signs in with an external IdP, Okta searches the Universal Directory for a user's profile to link. The user profile is found when the **IdP username** value (email) passed by the IdP matches the **Match against** value (username).

> **Note:** See [Create an Identity Provider](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/#tag/IdentityProvider/operation/createIdentityProvider) for API examples of creating an Identity Provider and the `policy.accountLink` parameter values needed to configure account linking.

### JIT provisioning

If a user signs in to your application for the first time using another Identity Provider, you can implement [JIT provisioning](https://help.okta.com/okta_help.htm?id=ext_Identity_Providers) to create an Okta account automatically for them. JIT account creation and activation only work for end users who aren't already Okta users.

Also, you can apply granular control over account linking and JIT by defining a policy and then rules for the policy. You can base a policy on various factors, such as location, group definitions, and authentication type. A specific policy rule can then be created for groups that have been assigned to your application. You can create multiple policies with more or less restrictive rules and apply them to different groups.

You can also set up group sync to specify the groups that users should be added to and enable profile sourcing so that a user's profile gets updated each time that the user signs in. This allows you to always have the most recent data about your users.

## IdP Discovery

If you have more than one Identity Provider configured in your org (which can mean just one external Identity Provider, in addition to Okta itself also serving as an Identity Provider), you can define logic to determine which Identity Provider individual end users are routed to when they authenticate. This functionality is called IdP Discovery, or IdP Routing Rules, and is configured by the [IdP Discovery Policy](/docs/reference/api/policy/#idp-discovery-policy).

The Okta Sign-In Widget (version 2.5.0 or above) interacts with the IdP Discovery policy to redirect end users as needed to the IdP determined by the policy.

> **Note:** v1 of the Okta API supports IdP Discovery with the Okta-hosted Widget only.

If you don't use the Okta Sign-In Widget, instead interacting directly with the [Okta Authentication API](/docs/reference/api/authn/) to implement sign-in yourself, you can integrate IdP Discovery into your flow by including a call to the Okta [WebFinger](/docs/reference/api/webfinger/) endpoint. That endpoint returns the name of the IdP that should be used for a given end user, as determined by the org's defined IdP Discovery Policy.

<a href='/docs/guides/identity-providers/' class='Button--blueDarkOutline card' data-proofer-ignore>
	<span>Add an Identity Provider integration</span>
</a>
