---
title: Okta API Products Release Notes
---

## 2018.19

| Change | Expected in Preview Orgs | Rollout to Production Orgs Expected to Start |
| :---------- | :--------------------------------- | :----------------------------------------------------------- |
| [ID Tokens Can Be Refreshed](#id-tokens-can-be-refreshed)| May 9, 2018 | May 14, 2018 |
| [Custom URL Domains are in Early Access](#custom-url-domains-are-in-early-access)| May 9, 2018 | May 14, 2018 |
| [Custom Okta-hosted Sign-In Page is in Early Access](#custom-okta-hosted-sign-in-page-is-in-early-access)| May 9, 2018 | May 14, 2018 |
| [Custom Error Page is in Early Access](#custom-error-page-is-in-early-access)| May 9, 2018 | May 14, 2018 |
| [Bugs Fixed in 2018.19](#bugs-fixed-in-2018-19) | May 9, 2018 | May 14, 2018 |
| [Previously Released Early Access Features 2018.19 Update](#previously-released-early-access-features-2018-19-update) | Available now | Available now |

### ID Tokens Can Be Refreshed

OpenID Connect ID tokens can now be retrieved using a refresh token. For more information, see our [Open ID Connect Reference](/docs/reference/api/oidc/).

### Custom URL Domains are in Early Access

You can customize your Okta org by replacing the Okta domain name with a custom URL domain name that you specify. For example, if the URL of your Okta org is `https://${yourOktaDomain}`, you can configure a custom URL for the org such as `https://id.example.com`. For details, see the [Configure a custom URL domain](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_custom_url_domain).

### Custom Okta-hosted Sign-In Page is in Early Access

You can customize the text and the look and feel of the Okta-hosted sign-in page using form controls and an embedded HTML editor. When used together with [custom URL domain](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_custom_url_domain) (required) and [custom Okta-hosted error page](/docs/guides/custom-error-pages/overview/), this feature offers a fully customized end-user sign-in experience hosted by Okta. For details, see [Configure a custom Okta-hosted sign-in page](/docs/guides/custom-hosted-signin/overview/).

### Custom Error Page is in Early Access

You can customize the text and the look and feel of error pages using an embedded HTML editor. When used together with [custom URL domain](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_custom_url_domain) (required) and [custom Okta-hosted sign-in page](/docs/guides/custom-hosted-signin/overview/), this feature offers a fully customized error page. For details, see [Configure a custom error page](/docs/guides/custom-error-pages/overview/).

### Bugs Fixed in 2018.19

* Delays were experienced when deleting users. As a result of the fix, one will notice a period of time between when the deletion was initiated and when it completes.  During the period, the user will still be visible, but the deletion cannot be reversed. (OKTA-157884)

* OAuth 2.0 and OIDC requests made with redirect URLs that contained underscores in the domain name would result in an error. (OKTA-167483)

### Previously Released Early Access Features 2018.19 Update

The following features have already been released as Early Access. To enable them, contact [Support](https://support.okta.com/help/open_case).

| Early Access Features Available Now
| :------------------------------------------------- |
| [Linked Objects API Is in Early Access (EA)](#linked-objects-api-in-early-access-ea) |
| [Token Management API Is in Early Access (EA)](#token-management-api-is-in-early-access-ea) |
| [System Log API Is in Early Access (EA)](#system-log-api-is-in-early-access-ea) |
| [User Consent for OAuth 2.0 and OpenID Connect Flows Is in Early Access (EA)](#user-consent-for-oauth-20-and-openid-connect-flows-in-early-availability-ea) |
