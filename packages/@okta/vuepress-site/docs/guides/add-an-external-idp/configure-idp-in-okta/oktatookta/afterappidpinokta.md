### Attribute Mapping
When a user first signs in to Okta using an OpenID Connect Identity Provider, their Identity Provider user profile is mapped to an Okta Universal Directory profile using Just in Time provisioning. This user account creation and linking includes default mappings that are based on standard claims defined by the OpenID Connect specification.

To view and modify the mappings, access the Identity Provider that you created by selecting **Social & Identity Providers** from the **Users** menu. Click **Configure** for the Identity Provider and select **Edit Mappings**.

If there are attributes that don't exist in your org's Universal Directory, but are a part of the user's Identity Provider profile, add the attributes by editing the Identity Provider user profile in your org.

See [Manage User Profiles](https://help.okta.com/en/prod/Content/Topics/Directory/eu-profile-editor.htm?cshid=ext_Directory_Profile_Editor) for more information on custom attributes.