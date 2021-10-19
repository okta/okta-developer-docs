---
title: External Identity Provider overview
meta:
  - name: description
    content: You can use external social Identity Providers for your Okta apps. Learn more about the accepted features and the social sign-in process.
---

Okta allows your users to sign in to your app using credentials from external social Identity Providers. After the user has successfully authenticated, they are returned to your app, and their social profile information is pulled into your Okta directory.

Currently Okta supports the following social Identity Providers:

- [Amazon](/docs/guides/add-a-social-idp/amazon/main/)
- [Apple](/docs/guides/add-an-external-idp/apple/main/)
- [Azure](/docs/guides/add-an-external-idp/azure/main/)
- [Facebook](/docs/guides/add-an-external-idp/facebook/main/)
- [GitHub](/docs/guides/add-a-social-idp/github/main/)
- [Google](/docs/guides/add-an-external-idp/google/main/)
- [LinkedIn](/docs/guides/add-an-external-idp/linkedin/main/)
- [Microsoft](/docs/guides/add-an-external-idp/microsoft/main/)

Additionally, Okta supports the following Identity Providers:

- [Okta to Okta](/docs/guides/add-an-external-idp/oktatookta/main/)
- [OpenID Connect](/docs/guides/add-an-external-idp/openidconnect/main/)
- [SAML 2.0](/docs/guides/add-an-external-idp/saml2/main/)

### Features

Configuring social login with Okta allows you to use the following features:

* **User Registration:** Capture the Profile attributes from a social Identity Provider user and store those attributes in Okta's Universal Directory.

* **User Authentication:** After a user is registered, continue to use that social Identity Provider for user authentication, thus eliminating the need to store an additional username and password for that user.

* **Social Profile Sync:** If a user updates their social profile, those changes can be reflected inside Okta the next time that they use social login.

* **Support for Multiple Social Profiles** Multiple social profiles can all be linked to one Okta user.

* **OAuth 2.0 Scope Configuration:** Specify OAuth 2.0 scopes to fully control which social profile attributes are linked to Okta.

### The social login process

The social login process starts at the [authentication endpoint](/docs/reference/api/oidc/#authorize), then goes out to the provider and back:

1. The user who wants to authenticate clicks a **Sign in with x** link.
2. The user authenticates and is asked by the provider to accept the permissions required by your app.
3. After the user accepts the permissions, Okta handles the authentication and redirects the user back to your specified redirect URI.

![Social Login flow width:](/img/social_login_flow.png "Social Login flow")

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

Social authentication requests are canceled if not completed within 15 minutes.

### The set-up process

To set up social login, configure the following:

1. An OAuth 2.0 client in your social provider
2. An Identity Provider in Okta
3. An OpenID Connect Application in Okta

### Social Identity Provider settings

Every Identity Provider in Okta is linked to an Application, and every time a user signs in with a social Identity Provider for the first time, an Application User is created for them. The Application User represents the external user at the social Identity Provider and can be used to map attributes to the Okta User. When you are setting up your social Identity Provider (IdP) in Okta, there are a number of settings that allow you to finely control the social sign-in behavior.

#### Authentication settings

**IdP Username:** The expression (written in the Okta Expression Language) that is used to convert an IdP attribute to the Application User's `username`. This IdP username is used for matching an Application User to an Okta User through the `oidc_idp` profile.

You can enter an expression to reformat the value, if you want. For example, if the social username is `john.doe@mycompany.com`, you could specify the replacement of `mycompany` with `endpointA.mycompany` to make the transformed username `john.doe@endpointA.mycompany.com`. See [Okta Expression Language](/docs/reference/okta-expression-language/).

**Match against &mdash;** The Okta user property that the IdP username is compared against in order to determine if an account link needs to be established. If an existing account link is found, no comparison is performed.

> **Note:** See [Account Linking](/docs/concepts/identity-providers/#account-linking) for more information on how account linking works.

**Account Link Policy &mdash;** Determines whether your Application User should be linked to an Okta user.

* **Automatic &mdash;** Link user accounts automatically according to the **Auto-Link Restrictions** and **Match against** settings.
* **Disabled &mdash;** Don't link existing User accounts. Unless the User is already linked, when the user signs in, the sign-in request fails.

**Auto-Link Restrictions &mdash;** Allows you to restrict auto-linking to members of specified groups.

**Provisioning Policy &mdash;** Determines whether just-in-time provisioning of users should be automatic or disabled.

#### JIT settings

**Profile Master &mdash;** If selected, the social Identity Provider is the source of truth for a user's profile attributes. This means that the next time the user signs in using the social Identity Provider, Okta updates the user profile attributes for this user. If a user is assigned multiple applications with profile mastering enabled, a prioritization in **Directory > Profile Masters** decides whether this provider is the profile master for the user's attributes. See [Attribute-level mastering](https://help.okta.com/okta_help.htm?id=ext_Attribute_Level_Mastering).

**Group Assignments &mdash;** Allows you to assign new users to one or more existing Groups. For example, new Facebook users could be added to a "Facebook" Group.

### Error codes

See the [OpenID Connect and Okta Social Authentication](/docs/reference/error-codes/#openid-connect-and-okta-social-authentication) section of the [Error codes](/docs/reference/error-codes/) API documentation.

### Attribute Mapping

When a user first signs in to Okta using an OpenID Connect Identity Provider, their Identity Provider user profile is mapped to an Okta Universal Directory profile using Just-in-Time provisioning. This user account creation and linking includes default mappings that are based on standard claims defined by the OpenID Connect specification.

To view and modify the mappings, access the Identity Provider that you created by selecting **Security** and then **Identity Providers**. Click **Configure** for the Identity Provider and select **Edit Profile and Mappings**.

If there are attributes that don't exist in your org's Universal Directory, but are a part of the user's Identity Provider profile, add the attributes by editing the Identity Provider user profile in your org.

See [Manage User Profiles](https://help.okta.com/okta_help.htm?id=ext_Directory_Profile_Editor) for more information on custom attributes.
