* Save the value at the end of the **Assertion Consumer Service URL** (ACS URL). The string after the last slash is the Identity Provider's `id` value. For example, if your ACS URL is `https://${yourOktaDomain}/sso/saml2/0adb8rlfooi5Atqv60h7`, then your Okta Identity Provider's `id` is `0adb8rlfooi5Atqv60h7`.

* Save the **Audience URI** value.

* Download the metadata by clicking **Download metadata**. The metadata URL is similar to this: `https://${yourOktaDomain}/api/v1/idps/{IdP_ID}/metadata.xml`.

## Upload the metadata

Follow the SAML IdP instructions on how to upload the metadata. If your IdP doesn't support uploading metadata, enter the ACS URL and Audience URI values at the IdP manually.
