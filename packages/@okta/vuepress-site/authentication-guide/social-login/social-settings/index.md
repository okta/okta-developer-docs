---
title: Social IdP Settings
---

# Social Identity Provider Settings

When you are setting up your social Identity Provider (IdP) in Okta, there are a number of settings that allow you to finely control the social login behavior. While the provider-specific instructions show one possible configuration, this section explains each of these in more detail so that you can choose the right configuration for your use case.

### Authentication Settings

**IdP username:** This is the expression (written in the Okta Expression Language) that will be used to convert an IdP attribute to the Application User's `username`. This IdP username will be used for matching an Application User to an Okta User.

For example, the value `idpuser.email` means that it takes the `email` attribute passed by the social IdP and maps it to the Okta Application User's `username` property.

You can enter an expression to reformat the value, if desired. For example, if the social username is `john.doe@mycompany.com`, you could specify the replacement of `mycompany` with `endpointA.mycompany` to make the transformed username `john.doe@endpointA.mycompany.com`. See here for more information about the [Okta Expression Language](/reference/okta_expression_language/).

**Match against:** The Okta user property against which the IdP username is compared.

More user profile attributes are available for matching as an <ApiLifecycle access="ea" /> feature.

**Account Link Policy:** Determines whether your Application User should be linked to an Okta user.

* Automatic: Link user accounts automatically according to the "Auto-Link Restrictions" and "Match against" settings.
* Disabled: Do not link existing User accounts. Unless User is already linked, login will fail.

**Auto-Link Restrictions:** Allows you to restrict auto-linking to members of specified groups.

**Provisioning Policy:** Determines whether just-in-time provisioning of users should be automatic or disabled.

### JIT Settings

**Profile Master:** If selected, the Social Identity Provider will be the source of truth for a user's profile attributes. This means that next time the user signs in using the Social Identity Provider, Okta will update the user profile attributes for this user. If a user is assigned multiple applications with profile mastering enabled, a prioritization in Directory -> Profile Masters will decide whether this provider will be mastering the user's attributes. For more information about this, see [Attribute Level Master](https://help.okta.com/en/prod/Content/Topics/Directory/Attribute_Level_Mastering.htm?Highlight=Attribute%20Level%20Mastering)

**Group Assignments:** Allows you to assign new users to one or more existing Groups. For example, new Facebook users could be added to a "Facebook" Group.

## Error Codes

See the [OpenID Connect and Okta Social Authentication](/reference/error_codes/#openid-connect-and-okta-social-authentication) section of the [Error Codes](/reference/error_codes/) API documentation.
