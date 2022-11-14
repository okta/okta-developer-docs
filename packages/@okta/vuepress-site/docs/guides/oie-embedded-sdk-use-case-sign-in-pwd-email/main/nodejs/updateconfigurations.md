Before you build a sign-in flow with password and email factors, you need to configure the Okta org to accept both factors in your app. See [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case) to configure your app and Okta org for this use case.

### Set email as optional for authentication enrollment

 The instructions in [Set up your Okta org for a multifactor use case](/docs/guides/oie-embedded-common-org-setup/-/main/#set-up-your-okta-org-for-a-multifactor-use-case) enable both email and phone factors as optional for enrollment. For this use case, you need to enable the email factor as optional and disable the phone factor.

1. In the Admin Console, go to **Security > Authenticators**.
1. On the **Authenticators** page, select the **Enrollment** tab.
1. In the **Default Policy** section, click **Edit**.
1. On the **Edit Policy** dialog box, under **Effective Factors**:
   * Set **Email Authentication** to **Optional**.
   * Set **Phone Authentication** to **Disabled**.
1. Click **Update Policy**.
