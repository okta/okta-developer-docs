
3. Click the app instance that you used earlier for Express Configuration SSO testing.
4. Go to the **Provisioning** tab and click **Express Configure SCIM**. You’re redirected to sign in to the app and prompted to consent to data sharing.

<div class="wireframe-border" style="width: 60%;">

![Configure SSO with OIDC](/img/oin/ec_configure_SCIM.png "ExpressConfigure SCIM")

</div>

5. Ensure that SCIM provisioning is set up successfully.
4. Test user provisioning by [assigning users to the app instance](https://help.okta.com/okta_help.htm?type=oie&id=ext_Apps_Apps_Page-assign).
5. Check that users are provisioned to your app.
6. Confirm that user attribute updates in Okta are reflected in your app. To configure attribute updates, see [Configure attribute mappings](https://developer.okta.com/docs/guides/submit-oin-app/scim/main/#configure-attribute-mappings).
7. Ensure that you can deprovision users from your app.
