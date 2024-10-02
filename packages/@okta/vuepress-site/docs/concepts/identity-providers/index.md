---
title: External Identity Providers
---

# External Identity Providers

As a developer building a custom app, you can give users the freedom to choose which Identity Provider (IdP) they use to sign in to your app. But first you should understand how IdPs connect to Okta.

What's an IdP? It's a service that creates and maintains identity information and then provides authentication services to your apps. IdPs can significantly reduce sign-in and registration friction. This allows your users to easily access apps without needing to create passwords or remember usernames.

<a href='/docs/guides/identity-providers/' class='Button--blueDarkOutline card' data-proofer-ignore>
   <span>Add an IdP integration</span>
</a>

## The big picture

Okta manages connections to other IdPs for your app and sits between your app and the IdP that authenticates your users.

* You can use Okta as the [user store](/docs/concepts/user-profiles/) for your apps. Then, users can sign in with their email and password by default. See our guides for how to sign in users to your [web](/docs/guides/sign-into-web-app-redirect/), [mobile](/docs/guides/sign-into-mobile-app-redirect/), and [single-page](/docs/guides/sign-into-spa-redirect/) apps.

* You can add connections to social IdPs like Apple or Facebook. This is called social login or social login. It allows your users to sign in to your app using credentials from their existing social IdPs. After users authenticate, you sync their existing IdP credentials into your Okta Universal Directory while continuing to use that IdP for user authentication. This eliminates the need to store an additional username and password for that user.

* You can add connections to IdPs that you build in-house that support OpenID Connect (OIDC) or SAML protocols. This is also referred to as Inbound Federation or inbound SAML. The SAML flow is initiated with the Service Provider (SP) (in this case, Okta) that redirects the user to the IdP for authentication. After authentication, a user is created inside Okta, and the user is redirected back to your app along with an ID token. This allows you to use Okta to proxy between SAML-only IdPs and OIDC-only apps that are normally incompatible.

  > **Note:** Social and OIDC IdPs store access tokens that allow subsequent calls to IdPs after the user is authorized. For example, the token may contain the permission to add events to a user's Google calendar. After authentication, your app can use the token on more calls to add events to the user's Google calendar on the user's behalf.

* You can also configure federation [between Okta orgs](/docs/guides/add-an-external-idp/oktatookta/main/) using OIDC or SAML.

Adding any of these IdPs allows users to sign in to your app using their credentials from a specific IdP.

## Benefits of using Okta to manage IdPs

You could connect your app directly to an IdP (for example, using an SDK to add a button for **Sign in with Google**). However, using Okta as the user store for your app and letting Okta manage the IdP connections has some benefits:

* **No custom code:** Your app only needs to talk to Okta, and Okta does the rest.

* **One protocol:** Your app uses OIDC to talk to Okta. Okta handles whatever protocols the other IdPs use, and this is transparent to your app.

* **Single user store:** All users are stored in Okta. You can capture the profile attributes from an IdP user and store those attributes in the Okta Universal Directory.

* **Profile sync:** If a user updates their profile at the IdP, those changes appear in Okta the next time they use the provider to sign in.

* **Account linking:** Users can use multiple IdPs to sign in, and Okta links those profiles to a single Okta user.

* **Group sync:** Okta supports group sync between Okta and enterprise SAML IdPs. This allows you to specify the groups that users should be added to.

* **OAuth 2.0 Scope Configuration:** Specify [OAuth 2.0 scopes](/docs/guides/implement-oauth-for-okta/main/#scopes-and-supported-endpoints) to fully control which social profile attributes are linked to Okta.

## How Okta connects to external IdPs

Okta sits between your app and the external provider. Your app only needs to talk to Okta, and Okta does the rest.

### Sign-in process

The sign-in process starts at the `/authorize` endpoint, and then goes out to the provider and back:

1. In your app, the user clicks a button similar to: **Sign in with (Identity Provider)**.
2. Your app redirects the browser to Okta.
3. Okta redirects the browser to the IdP.
4. The user is prompted to sign in at the IdP and to accept the permissions that are required by your app.
5. The IdP redirects the browser back to Okta.
6. Okta processes the sign-in request and adds the user to your Okta organization's Universal Directory.
7. Okta redirects the browser back to your app, just like any other sign-in request.

<div class="three-quarter">

![A flow diagram showing the interactions in a sign-in flow between a user, Okta, and a third party social IdP](/img/auth/social_login_flow.png)

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

Use account linking to help create a unified view of your users within your org. You can also use Just-In-Time (JIT) provisioning to create a seamless experience for users. User can sign in to your app for the first time using their credentials from another IdP.

### Account Linking

Users can use multiple IdPs to sign in, and Okta can link all of those profiles to a single Okta user. This is called account linking. For example, a user signs in to your app using a different IdP than they used for registration. Account linking can then establish that the user owns both identities. This allows the user to sign in from either account.

Account linking is configured at the IdP level. When you create an IdP, these values are set by default:

* **Account Link Policy**: Disabled
* **Match Against**: Okta Username
* **IdP Username**: idpuser.email

To enable account linking, select `Automatic` from the **Account Link Policy** dropdown list, and then leave the other two defaults. With these settings, when a user signs in with an external IdP, Okta searches the Universal Directory for a user's profile to link. The user profile is found when the **IdP username** value (email) passed by the IdP matches the **Match against** value (username).

> **Note:** See [Add an Identity Provider](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/IdentityProvider/) for API examples of creating an IdP and the `policy.accountLink` parameter values needed to configure account linking.

### JIT provisioning

If a user signs in to your app for the first time using another IdP, you can implement [JIT provisioning](https://help.okta.com/okta_help.htm?id=ext_Identity_Providers). JIT provisioning creates an Okta account automatically for them. JIT account creation and activation only work for end users who aren't already Okta users.

You can apply granular control over account linking and JIT by defining a policy and then rules for the policy. You can base a policy on various factors, such as location, group definitions, and authentication type. A specific policy rule can then be created for the groups that have been assigned to your app. You can create multiple policies with more or less restrictive rules and apply them to different groups.

You can also set up group sync to specify the groups that users should be added to. Group sync enables profile sourcing so that a user's profile gets updated each time that the user signs in. This allows you to always have the most recent data about your users.

## IdP Discovery

You can define logic to determine which IdP individual end users are routed to when they authenticate. You can define that logic only if you have more than one IdP configured in your org. For example, if you have just one external IdP, in addition to Okta itself also serving as an IdP. This functionality is called IdP Discovery, or IdP routing rules. You can configure it by using the [IdP Discovery policy](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Policy/#tag/Policy/operation/createPolicy).

The Okta Sign-In Widget (version 2.5.0 or above) interacts with the IdP Discovery policy to redirect end users to the IdP determined by the policy.

> **Note:** v1 of the Okta API supports IdP Discovery with the Okta-hosted Sign-In Widget only.

If you don't use the Okta Sign-In Widget, you can implement a sign-in flow that uses the [Okta Authentication API](/docs/reference/api/authn/) and Okta [WebFinger](/docs/reference/api/webfinger/) endpoint. Use the Okta authentication API to implement sign-in yourself and integrate IdP Discovery by using the WebFinger endpoint. The WebFinger endpoint returns the name of the IdP that should be used for a given end user. Your org's defined IdP discovery policy determines the IdP that's returned.

<a href='/docs/guides/identity-providers/' class='Button--blueDarkOutline card' data-proofer-ignore>
	<span>Add an IdP integration</span>
</a>
