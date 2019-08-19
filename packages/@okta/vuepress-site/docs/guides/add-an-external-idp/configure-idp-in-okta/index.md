---
title: Create an Identity Provider in Okta
---
To connect your org to the Identity Provider, add and configure that Identity Provider in Okta.

1. From the developer console, hover over **Users** and then select **Social & Identity Providers** from the menu that appears. If you are using the admin console (**Classic UI**), hover over **Security** and then select **Identity Providers**.

2. Select **Add Identity Provider** and then select the appropriate Identity Provider.

3. In the **Add an Identity Provider** dialog box, define the following:

    <StackSelector snippet="appidpinokta" />

4. Click **Add Identity Provider**. The Identity Providers page appears.

5. Locate the Identity Provider that you just added and expand the information.

    <StackSelector snippet="afterappidpinokta" />

### Attribute Mapping
When a user first signs in to Okta using an OpenID Connect Identity Provider, their Identity Provider user profile is mapped to an Okta Universal Directory profile using Just in Time provisioning. This user account creation and linking includes default mappings that are based on standard claims defined by the OpenID Connect specification.

To view and modify the mappings, access the Identity Provider that you created by selecting **Social & Identity Providers** from the **Users** menu. Click **Configure** for the Identity Provider and select **Edit Mappings**.

If there are attributes that don't exist in your org's Universal Directory, but are a part of the user's Identity Provider profile, add the attributes by editing the Identity Provider user profile in your org.

See [Manage User Profiles](https://help.okta.com/en/prod/Content/Topics/Directory/eu-profile-editor.htm?cshid=ext_Directory_Profile_Editor) for more information on custom attributes.

<NextSectionLink/>