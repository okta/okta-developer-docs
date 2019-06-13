---
title: Add the Okta Redirect URI to Your IdP
---

The redirect URI sent in the authorize request from the client needs to match the redirect URI in the IdP. This is the URL where the IdP returns the authentication response (the access token and the ID token). It needs to be a secure domain that you own.

> Note: These steps cover the Okta org to Okta org scenario. When configuring another generic OIDC IdP, go to the IdP and add the Okta redirect URI there.

1. In the IdP Okta org, from the Developer's Console select **Applications**, and then select the IdP application.
2. Click **General**.
3. In the **General Settings** section, click **Edit**.
4. In the **Login Redirect URIs** box, paste the redirect URI that you copied in the last section.
5. Click **Save**.

<NextSectionLink/>
