---
title: Identity Provider and Service Provider Configuration
---

This section discusses the steps required to add an external SAML Identity Provider in Okta, and then how to get the SAML metadata required for the Service Provider configuration.

## Configure a SAML Identity Provider

You can configure a SAML Identity Provider in Okta using either the [Admin Console](/docs/guides/add-an-external-idp/saml2/configure-idp-in-okta/) or the [Identity Providers API](/docs/reference/api/idps/#add-saml-2-0-identity-provider). These steps assume that you are using the Admin Console.

## Obtain SAML metadata for the Service Provider

After you complete the SAML Identity Provider configuration, if you haven't done it already, download the SAML metadata for use when you configure the Service Provider.

1. On the Identity Providers page in the Admin Console, locate the Identity Provider that you just added and click the arrow next to the name to expand.

2. Download the metadata by clicking **Download metadata**. The metadata URL is similar to this: `https://${yourOktaDomain}/api/v1/idps/{IdP_ID}/metadata.xml`.

If your Service Provider doesn't support uploading metadata, save the **Assertion Consumer Service URL** (ACS URL) and the **Audience URI** values to enter manually at the Service Provider.

> **Note:** If you used the [Identity Providers API](/docs/reference/api/idps/#add-saml-2-0-identity-provider) to create the Identity Provider in Okta, locate and copy the `audience` value within the `credentials` property of the `protocol` object. Then, locate and copy the `acs` link relation type value within the `links` object.

## Upload the metadata

Follow the Service Provider's instructions on how to upload the metadata. If your Service Provider doesn't support uploading metadata, enter the ACS URL and Audience URI values manually.

<NextSectionLink/>
