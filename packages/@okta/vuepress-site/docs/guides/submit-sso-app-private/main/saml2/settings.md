### Specify SAML settings

* On the **General** tab, in the **Application** area, you can rename your integration and select visibility and launch options. You can also make any changes to the SAML settings if they changed from your original values.

* On the **Sign On** tab, you can download the Identity Provider metadata for your integration. This information is needed to configure the SAML connection settings inside your SAML SP application:
  1. In the **SIGN ON METHODS** section, locate the **Identity Provider metadata** link right above the **CREDENTIALS DETAILS** section.
  1. Right-click the **Identity Provider metadata** link and select **Copy Link Address**. The metadata contained at this link has the information required by your SAML SP application.

      We recommend copying the **Identity Provider metadata** link to dynamically configure the metadata. If your SP doesn't support dynamic configuration, you can click the **Identity Provider metadata** link instead, and a new browser tab launches with the information that you need:
       * Identity Provider Issuer
       * X.509 Certificate
       * Identity Provider Single Sign-On URL
  1. In your SAML SP application, you can paste the link or the metadata as required to configure the IdP metadata.
