Follow the SAML IdP instructions on how to upload the metadata that you downloaded in the <GuideLink link="../configure-idp-in-okta">last step</GuideLink>.

If you want to test your SAML flow without uploading the metadata to the SAML IdP, you can use the **Assertion Consumer Service URL** (ACS URL) and the **Audience URI** in the call to the SAML IdP:

```bash
saml-idp --acsUrl {URL} --audience {URI}
```

> Note: Get your **ACS URL** and **Audience URI** by locating the IdP that you added in the <GuideLink link="../configure-idp-in-okta">last step</GuideLink> and expand the IdP information.