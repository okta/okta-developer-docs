---
title: Create and configure the SAML IdP in Okta
---

The configuration information for an external IdP is stored in Okta. Create the external IdP and configure it from the Developer Console:

1. Hover over **Users** in the top navigation bar, and select **Social & Identity Providers**.
2. Select **Add Identity Provider** > **Add SAML 2.0 IdP**.
3. Fill in your SAML Identity Provider's settings. [Help](https://support.okta.com/help/Documentation/Knowledge_Article/40561903-Configuring-Inbound-SAML#Part1).

    > Hint: If you need a quick and easy SAML Identity Provider to use for testing purposes, you can try using <https://github.com/mcguinness/saml-idp>.
4. Save the IdP in Okta and note of the value at the end of the **Assertion Consumer Service URL** (ACS URL). The string after the last slash is the IdP's `id` value. For example: If your ACS URL is `https://{yourOktaDomain}/sso/saml2/0oab8rlfooi5Atqv60h7`, then your Okta IdP's `id` is `0oab8rlfooi5Atqv60h7`.

<NextSectionLink/>
