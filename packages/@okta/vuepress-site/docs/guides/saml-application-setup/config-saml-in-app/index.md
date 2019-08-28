---
title: Configure SAML in your app
---
You are now ready to configure SAML in your SAML SP application.

1. Select the **Sign On** tab.

2. In the **SIGN ON METHODS** section, locate the **Identity Provider metadata** link.

    ![Sign on methods](/img/okta-admin-ui-identity-provider-metadata-link.png "An arrow points to the Identity Provider metadata link in the Sign On Methods section of the page.")

3. Right-click the **Identity Provider metadata** link and select **Copy Link Address**. This metadata link contains the information that you need to configure SAML in your SAML SP application.

4. Follow the SAML SP instructions on how to configure the Identity Provider metadata. If your SP doesn't support dynamic configuration of metadata (using the **Identity Provider metadata** link address), click **View Setup Instructions**. A new tab launches with the information that you need:

    * Identity Provider Single Sign-On URL
    * Identity Provider Issuer
    * X.509 Certificate

    Copy this information and use it to configure the Identity Provider metadata in your app.
    
<NextSectionLink/>