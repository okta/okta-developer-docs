---
title: Create an Identity Provider in Okta
---
To connect your org to the Identity Provider, add and configure that Identity Provider in Okta.

1. In the Admin Console, go to **Security** > **Identity Providers**.

> **Note:** See the [Identity Providers API](/docs/reference/api/idps/#add-identity-provider) for request and response examples of creating an Identity Provider in Okta using the API.

1. Select **Add Identity Provider** and then select the appropriate Identity Provider.

1. In the **Add an Identity Provider** dialog box, define the following:

    <StackSelector snippet="appidpinokta" />

1. Click **Add Identity Provider**. The Identity Providers page appears.

1. Locate the Identity Provider that you just added and click the arrow next to the Identity Provider name to expand.

    <StackSelector snippet="afterappidpinokta" />

## Social Identity Provider settings

When you are setting up your social Identity Provider (IdP) in Okta, there are a number of settings that allow you to finely control the social sign-in behavior. While the provider-specific instructions show one possible configuration, this section explains each of these in more detail so that you can choose the right configuration for your use case.

### Authentication settings

**IdP Username:** The expression (written in the Okta Expression Language) that is used to convert an IdP attribute to the Application User's `username`. This IdP username is used for matching an Application User to an Okta User through the `oidc_idp` profile.

You can enter an expression to reformat the value, if you want. For example, if the social username is `john.doe@mycompany.com`, you could specify the replacement of `mycompany` with `endpointA.mycompany` to make the transformed username `john.doe@endpointA.mycompany.com`. See [Okta Expression Language](/docs/reference/okta-expression-language/).

**Match against &mdash;** The Okta user property against which the IdP username is compared to determine if an account link needs to be established. If an existing account link is found, no comparison is performed.

> **Note:** See [Account Linking](/docs/concepts/identity-providers/#account-linking) for more information on how account linking works.

**Account Link Policy &mdash;** Determines whether your Application User should be linked to an Okta user.

* **Automatic &mdash;** Link user accounts automatically according to the **Auto-Link Restrictions** and **Match against** settings.
* **Disabled &mdash;** Don't link existing User accounts. Unless the User is already linked, when the user signs in, the sign-in request fails.

**Auto-Link Restrictions &mdash;** Allows you to restrict auto-linking to members of specified groups.

**Provisioning Policy &mdash;** Determines whether just-in-time provisioning of users should be automatic or disabled.

### JIT settings

**Profile Master &mdash;** If selected, the social Identity Provider is the source of truth for a user's profile attributes. This means that the next time the user signs in using the social Identity Provider, Okta updates the user profile attributes for this user. If a user is assigned multiple applications with profile mastering enabled, a prioritization in **Directory > Profile Masters** decides whether this provider is the profile master for the user's attributes. See [Attribute-level mastering](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Attribute_Level_Mastering).

**Group Assignments &mdash;** Allows you to assign new users to one or more existing Groups. For example, new Facebook users could be added to a "Facebook" Group.

### Error codes

See the [OpenID Connect and Okta Social Authentication](/docs/reference/error-codes/#openid-connect-and-okta-social-authentication) section of the [Error codes](/docs/reference/error-codes/) API documentation.

## Attribute Mapping

When a user first signs in to Okta using an OpenID Connect Identity Provider, their Identity Provider user profile is mapped to an Okta Universal Directory profile using Just-in-Time provisioning. This user account creation and linking includes default mappings that are based on standard claims defined by the OpenID Connect specification.

To view and modify the mappings, access the Identity Provider that you created by selecting **Security** and then **Identity Providers**. Click **Configure** for the Identity Provider and select **Edit Profile and Mappings**.

If there are attributes that don't exist in your org's Universal Directory, but are a part of the user's Identity Provider profile, add the attributes by editing the Identity Provider user profile in your org.

See [Manage User Profiles](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Profile_Editor) for more information on custom attributes.

<NextSectionLink/>
