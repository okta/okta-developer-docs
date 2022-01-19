---
title: Okta Identity Engine API Products release notes 2022
---
<ApiLifecycle access="ie" /><br>
<ApiLifecycle access="Limited GA" /><br>

## January

### Weekly release 2022.01.1

| Change                                                                                              | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.01.1](#bugs-fixed-in-2022-01-1)         | January 13, 2022           |

#### Bugs fixed in 2022.01.1

* If the [Create a Scope](/docs/reference/api/authorization-servers/#create-a-scope) endpoint received multiple requests at or near the same time, duplicate Scopes could be created. (OKTA-442533)

* When the [Update resource set](/docs/reference/api/roles/#update-resource-set) endpoint was called, the `resourceSetId` parameter was required in the body of the request. (OKTA-445144)

* When the [Upload Theme background image](/docs/reference/api/brands/#upload-theme-background-image) endpoint was called, the image was converted to PNG format. (OKTA-458260)

### Monthly release 2022.01.0

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Dynamic Issuer Mode is GA in Production](#dynamic-issuer-mode-is-ga-in-production) | December 8, 2021 |
| [Custom domains with Okta-managed certificates is GA in Production](#custom-domains-with-okta-managed-certificates-is-ga-in-production) | December 8, 2021 |
| [New permissions for custom admin roles](#new-permissions-for-custom-admin-roles) | January 6, 2022|
| [Self-service password reset with User API](#self-service-password-reset-with-user-api) | January 6, 2022 |

#### Dynamic Issuer Mode is GA in Production

An authorization server's issuer URL can be used to validate whether tokens are issued by the correct authorization server. You can configure the issuer URL to be either the Okta subdomain (such as `company.okta.com`) or a custom domain (such as `sso.company.com`). See [Property details](/docs/reference/api/authorization-servers/#authorization-server-properties).

When there are applications that use Okta's subdomain and other applications that use the custom domain, the issuer validation breaks because the value is hard-coded to one domain or the other.

With Dynamic Issuer Mode, the issuer value in minted tokens is dynamically updated based on the URL that is used to initiate the original authorize request. See [Client application settings](/docs/reference/api/apps/#settings-10). <!--OKTA-452668-->

#### Custom domains with Okta-managed certificates is GA in Production

When you customize an Okta URL domain, your Okta-hosted pages are branded with your own URL. [Okta-managed certificates](/docs/guides/custom-url-domain/main/#configure-a-custom-domain-through-okta-managed-certificates) automatically renew through a Let’s Encrypt integration, a free certificate authority. Okta-managed certificate renewals lower customer developer maintenance costs and reduce the high risk of a site outage when certificates expire. <!--OKTA-437290-->

#### New permissions for custom admin roles

The Administrator Roles API includes new app [permissions](/docs/reference/api/roles/#permission-properties) for custom admin roles to run end-to-end imports. See [About role permissions](https://help.okta.com/okta_help.htm?id=csh-cstm-admin-role-app-permissions).<!--OKTA-433371-->

#### Self-service password reset with User API

Client applications that use the Users API `/users/{$userId}/credentials/forgot_password` to implement the [self-service account recovery](https://help.okta.com/okta_help.htm?type=oie&id=ext-config-sspr) flow can now use this API call with password policies configured with the **Any enrolled authenticator used for MFA/SSO** additional verification option. <!--OKTA-452933-->
