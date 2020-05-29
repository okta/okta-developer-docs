---
title: Social Identity Provider Settings
---

# Social Identity Provider Settings

When you are setting up your social Identity Provider (IdP) in Okta, there are a number of settings that allow you to finely control the social sign-in behavior. While the provider-specific instructions show one possible configuration, this section explains each of these in more detail so that you can choose the right configuration for your use case.

## Authentication Settings

**IdP Username:** The expression (written in the Okta Expression Language) that is used to convert an IdP attribute to the Application User's `username`. This IdP username is used for matching an Application User to an Okta User through the `oidc_idp` profile.

You can enter an expression to reformat the value, if desired. For example, if the social username is `john.doe@mycompany.com`, you could specify the replacement of `mycompany` with `endpointA.mycompany` to make the transformed username `john.doe@endpointA.mycompany.com`. See [Okta Expression Language](/docs/reference/okta-expression-language/).

> **Note:** See [Account Linking](/docs/concepts/identity-providers/#account-linking) for more information on how account linking works.

**Match against &mdash;** The Okta user property against which the IdP username is compared to determine if an account link needs to be established. If an existing account link is found, no comparison is performed.

More user profile attributes are available for matching as an <ApiLifecycle access="ea" /> feature.

**Account Link Policy &mdash;** Determines whether your Application User should be linked to an Okta user.

* **Automatic &mdash;** Link user accounts automatically according to the **Auto-Link Restrictions** and **Match against** settings.
* **Disabled &mdash;** Don't link existing User accounts. Unless the User is already linked, user sign in fails.

**Auto-Link Restrictions &mdash;** Allows you to restrict auto-linking to members of specified groups.

**Provisioning Policy &mdash;** Determines whether just-in-time provisioning of users should be automatic or disabled.

## JIT Settings

**Profile Master &mdash;** If selected, the Social Identity Provider is the source of truth for a user's profile attributes. This means that next time the user signs in using the Social Identity Provider, Okta updates the user profile attributes for this user. If a user is assigned multiple applications with profile mastering enabled, a prioritization in **Directory > Profile Masters** decides whether this provider is the profile master for the user's attributes. See [Attribute Level Master](https://help.okta.com/en/prod/Content/Topics/Directory/Attribute_Level_Mastering.htm?Highlight=Attribute%20Level%20Mastering)

**Group Assignments &mdash;** Allows you to assign new users to one or more existing Groups. For example, new Facebook users could be added to a "Facebook" Group.

## Error Codes

See the [OpenID Connect and Okta Social Authentication](/docs/reference/error-codes/#openid-connect-and-okta-social-authentication) section of the [Error Codes](/docs/reference/error-codes/) API documentation.
