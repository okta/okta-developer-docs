#### Setup instructions

* **Is your Service Provider configured as a “Big Bang”?** &mdash; If yes, what is the backdoor URL for admins to sign in if SAML is misconfigured? If the SP is a "Big Bang", Okta suggests that you have a backdoor URL or some other recovery mechanism available.

* **Is SAML support available in the SP for all tenants by default or is it available only for specific SKUs?** &mdash; If you select only certain SKUs, provide details on which products provide SAML support.

* **Is the single sign on URL the same for all tenants and environments?** &mdash; If **No**, enter which part of the single sign on URL is customizable. For example, the `subdomain` in `https://subdomain.example.com/saml2/`

* **Is the audience URI the same for all tenants and environments?** &mdash; If **No**, enter which part of the audience URI is customizable. For example, the `subdomain` in `https://subdomain.example.com/saml2/`

* **What signature algorithm is supported?** &mdash; An app in the OIN should support only the SHA256 algorithm.

* **Link to configuration guide** &mdash; Your configuration guide (in either HTML or PDF format) should have step by step instructions on how to set up SSO between Okta and your systems. See [Prepare a customer-facing configuration guide](/docs/guides/submit-app/create-guide).

#### Supported Features

* **Do you support SAML just-in-time provisioning?** &mdash; With Just-in-Time provisioning, you can use a SAML assertion to create regular and portal users on the fly the first time they try to log in. This eliminates the need to create user accounts in advance.

* **Do you support receiving SAML user/group attribute statements?** &mdash; If **Yes**, the `key:value` pairs for the attribute statements should be specified in the test app.

* **What type(s) of sign-in flows do you support?** &mdash; Choose from IdP or SP initiated, or both.

* **Force authentication?** &mdash; Select **Yes** if your app forces users to authenticate again, even if they have an existing session. If you select **Yes**, include how customers configure force authentication on your end? Provide the steps for Okta to test this forced authentication.

* **Do you support SP-initiated Single-Logout?** &mdash; If **Yes**, are you going to use the same single-logout certificate for all tenants? Single Logout URL and SP Issuer should be specified in the test app. Note that Okta only supports signed logout requests.
  
  * You will need to provide the certificate to the Okta App Analyst.

* **Optional: Default Relay State** &mdash; The default relay state is the page your users will land on after they successfully sign on. If you have this configured, enter a specific application resource for an IDP initiated Single Sign-On scenario.

#### Review info

* **How far along is your SAML integration?** &mdash; If your app is still **In development**, the Okta app analysts will need to know the estimated public availability for your app.

* **Optional: link to demo video** &mdash; If you have prepared a video that explains how to configure access to your SAML app, enter the URL here. A short demo video showing your working test app helps expedite the review process. Please show the IdP and SP-initiated sign-in flows and sign-out (if applicable).

* **Optional: link to the test results of a SAML validation tool** &mdash; Use the tool at <http://saml.oktadev.com> to validate your SAML Service Provider implementation. The results help expedite the review process.
