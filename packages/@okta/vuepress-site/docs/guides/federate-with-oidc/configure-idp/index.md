---
title: Configure the IdP in Okta
---

To connect your org to the IdP, add the IdP that you just created.

1. In your Okta org, select **Social & Identity Providers** from the **Users** menu.
2. Click **Add Identity Provider** and select **Add OpenID Connect IdP**.
3. Name the IdP. 
4. Paste the **Client ID** and **Client Secret** that you copied when you created the IdP app in the last section.
5. In the **Scopes** box, leave the default of `openid`, `email` and `profile` scopes. These scopes are included when Okta makes an OIDC request to the IdP.

> Note: By default, Okta requires the email attribute for a user. The `email` scope is required to create and link the user to Okta's Universal Directory. If your IdP doesn't support this attribute, you can make it optional. See [Manage User Profiles](https://help.okta.com/en/prod/Content/Topics/Directory/eu-profile-editor.htm).

6. Add the following endpoint URIs for the generic OIDC IdP that you are configuring. You can find the endpoints in the well-known configuration document for the IdP, for example: `https://theIdPorg.com/.well-known/openid-configuration`. For a list of fully-tested IdPs that are supported, see [Set Up Supported Identity Providers](#set-up-supported-identity-providers).

**Issuer** - The identifier of the OIDC provider. For example, the Okta org where you created the IdP app: `https://theIdPorg.com`

**Authorization endpoint** - The URL of the IdP's OAuth 2.0 Authorization endpoint. For example: `https://theIdPorg.com/oauth2/v1/authorize`

**Token endpoint** - The URL of the IdP's token endpoint for obtaining access and ID tokens. For example: `https://theIdPorg.com/oauth2/v1/token`

**JWKS endpoint** - The URL of the IdP's JSON Web Key Set document. This document contains signing keys that are used to validate the signatures from the provider. For example: `https://theIdPorg.com/oauth2/v1/keys`

**Userinfo endpoint** - The endpoint for getting identity information about the user. For example: `https://theIdPorg.com/oauth2/v1/userinfo`

7. Click **Add Identity Provider**. The main Identity Providers page appears.

8. Expand the IdP that you just configured and copy the **Authorize URL** and the **Redirect URI**. Paste in to a text editor for use in upcoming steps.

#### Attribute Mapping

When a user first signs in to Okta using a generic OIDC IdP, their IdP user profile is mapped to an Okta Universal Directory profile using Just in Time provisioning. This user account creation and linking includes default mappings that are based on standard claims defined by the OIDC specification.

To view and modify the mappings, access the IdP that you created by selecting **Social & Identity Providers** from the **Users** menu. Click **Configure** for the IdP and select **Edit Mappings**.

If there are attributes that don't exist in your org's Universal Directory, but are a part of the user's IdP profile, add the attributes by editing the IdP user profile in your org. 

See [Manage User Profiles](https://help.okta.com/en/prod/Content/Topics/Directory/eu-profile-editor.htm?cshid=ext_Directory_Profile_Editor) for more information on custom attributes.

<NextSectionLink/>
