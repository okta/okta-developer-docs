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

### Attribute Mapping

When a user first signs in to Okta using an OpenID Connect Identity Provider, their Identity Provider user profile is mapped to an Okta Universal Directory profile using Just-in-Time provisioning. This user account creation and linking includes default mappings that are based on standard claims defined by the OpenID Connect specification.

To view and modify the mappings, access the Identity Provider that you created by selecting **Security** and then **Identity Providers**. Click **Configure** for the Identity Provider and select **Edit Profile and Mappings**.

If there are attributes that don't exist in your org's Universal Directory, but are a part of the user's Identity Provider profile, add the attributes by editing the Identity Provider user profile in your org.

See [Manage User Profiles](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Directory_Profile_Editor) for more information on custom attributes.

<NextSectionLink/>
