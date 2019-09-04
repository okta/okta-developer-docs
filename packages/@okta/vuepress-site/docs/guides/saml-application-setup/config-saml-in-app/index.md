---
title: Configure SAML in your app
---
You are now ready to configure SAML in your SAML Service Provider (SP) application. To do that, you need to obtain the Identity Provider metadata from the app that you just created.

1. Select the **Sign On** tab.

2. In the **SIGN ON METHODS** section, locate the **Identity Provider metadata** link in the note above the **CREDENTIALS DETAILS** section.

3. Right-click the **Identity Provider metadata** link and select **Copy Link Address**. This metadata link contains the information that you need to configure SAML in your SAML SP application.

4. Follow the SAML SP app instructions on how to configure the Identity Provider metadata. We recommend using the Identity Provider metadata link to dynamically configure the metadata. If your SP doesn't support dynamic configuration, click **View Setup Instructions**. A new browser tab launches with the information that you need:

    * Identity Provider Single Sign-On URL
    * Identity Provider Issuer
    * X.509 Certificate

    Copy this information and use it to configure the Identity Provider metadata in your SAML SP app.
    
<NextSectionLink>Next steps</NextSectionLink>