### Specify SAML settings

* On the **General** tab, in the **Application** area, you can rename your integration and select visibility and launch options. You can also make any changes to the SAML settings if they changed from your original values.

* On the **Sign On** tab, you can download the Identity Provider metadata for your integration. This information is needed to configure the SAML connection settings inside your SAML SP application:
  1. In the **Sign on methods** section, locate the **Metadata URL** link right before the **Credential Details** section.
  1. Click **Copy** next to the metadata URL. The metadata contained at this link has the information required by your SAML SP application.

      Okta recommends copying the **Metadata URL** link to dynamically configure the metadata. If your SP doesn't support dynamic configuration, you can click the **More details** dropdown menu to view and copy the specific properties:
       * Sign-on URL
       * Sign-out URL
       * Issuer
       * Signing Certificate
  1. In your SAML SP application, you can paste the link or the metadata as required to configure the IdP metadata.
