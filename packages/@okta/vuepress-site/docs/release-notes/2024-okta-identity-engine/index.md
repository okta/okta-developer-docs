---
title: Okta Identity Engine API Products release notes 2024
---

<ApiLifecycle access="ie" />

> Help us improve our release notes by filling out this short [survey](https://surveys.okta.com/jfe/form/SV_4VEZcIGOX0TBgkC).

## March

### Monthly release 2024.03.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Direct Authentication is GA in Preview](#direct-authentication-is-ga-in-preview)                                                     | March 7, 2024 |
| [Permission conditions for profile attributes is GA in Production](#permission-conditions-for-profile-attributes-is-ga-in-production) | March 7, 2024 |
| [Content Security Policy for custom domains is GA in Preview](#content-security-policy-for-custom-domains-is-ga-in-preview)           | March 7, 2024 |
| [New mappings property for Policy API is EA in Preview](#new-mappings-property-for-policy-api-is-ea-in-preview)                       | March 7, 2024 |
| [My Account Authenticators API is GA in Production](#my-account-authenticators-api-is-ga-in-production)                               | March 7, 2024 |
| [AAL values for Login.gov IdP](#aal-values-for-logingov-idp)                                                                          | March 7, 2024 |
| [Granular API policy authenticator controls is GA in Preview](#granular-api-policy-authenticator-controls-is-ga-in-preview)           | March 7, 2024 |
| [Externally signed org AS access tokens](#externally-signed-org-as-access-tokens)                                                     | March 7, 2024 |
| [Support case management for admins is GA in Preview](#support-case-management-for-admins-is-ga-in-preview)                           | March 7, 2023 |
| [Realms for Workforce](#realms-for-workforce)                                                                                         | March 7, 2023 |
| [Enhanced app API contracts](#enhanced-app-api-contracts)                                                                             | March 7, 2024 |
| [Bug fixed in 2024.03.0](#bugs-fixed-in-2024-03-0)                                                                                    | March 7, 2024 |

#### Direct Authentication is GA in Preview

[Direct Authentication](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token) offers a new set of OAuth 2.0 grants that give app developers greater control over the authentication process. When redirect authentication isn't an option, you can use direct authentication to allow client apps to authenticate users directly, without relying on HTTP redirection through a web browser. This is beneficial when there's a high degree of trust between the user and the app and when browser-based flows aren't feasible, like with mobile apps. See [Configure Direct Auth grant types](/docs/guides/configure-direct-auth-grants/aotp/main/). <!-- OKTA-585748 -->

#### Permission conditions for profile attributes is GA in Production

You can now apply conditions to the **View users and their details** and **Edit users' profile attributes** custom admin role permissions. Permission conditions help you limit the scope of a role by including or excluding admins' access to individual profile attributes. This gives you more granular control over your custom admin roles and helps meet your org's unique security needs. See [Permission conditions](https://help.okta.com/okta_help.htm?type=oie&id=ext-permission-conditions). <!-- OKTA-586185 -->

#### Content Security Policy for custom domains is GA in Preview

The Content Security Policy (CSP) feature lets admins control which URLs may be linked to from customized sign-in and error pages in orgs that use custom domains. Admins add trusted URLs to Okta that link to items such as images and add these links to the code in their sign-in and error pages. This feature enhances security by enabling admins to allow only approved content to appear and prevent the introduction of potentially malicious code to these pages. See [Content Security Policy (CSP) for your custom domain](/docs/guides/custom-widget/main/#content-security-policy-csp-for-your-custom-domain). <!-- OKTA-600774 FF CONTENT_SECURITY_POLICY_FOR_CUSTOMIZABLE_SIGN_IN_AND_ERROR_PAGES -->

#### New mappings property for Policy API is EA in Preview

A new `mappings` property is available for the `links` object in  `GET /api/v1/policies/${policyId}` and `GET /api/v1/policies?type=${type}` responses. This property displays links to policy mappings. See [Policy API](/docs/reference/api/policy/#links-object). <!-- OKTA-637310 -->

#### My Account Authenticators API is GA in Production

The MyAccounts Authenticators API (`/idp/myaccount/authenticators/`) enables you to list enrolled and un-enrolled authenticator information. You can also access details of specific authenticators and enrollments. <!-- OKTA-670703 -->

#### AAL values for Login.gov IdP

The [Login.gov IdP configuration](/docs/guides/add-logingov-idp/main/#create-an-identity-provider-in-okta) has been updated to include all allowed AAL values. <!-- OKTA-673125 -->

#### Granular API policy authenticator controls is GA in Preview

The Authentication Policy API now includes three new `constraints` object parameters that provide precise control over what specific authenticators and methods are displayed to end users. Previously, some authenticators were mapped to the same authenticator `types` and `methods`. The parameters `authenticationMethods` and `excludeAuthenticationMethods` now identify (or exclude) the exact authenticator for both `knowledge` and `possession` constraints. The `required` parameter indicates whether the `knowledge` or `possession` constraints are required by the assurance. See the [Policy API](/docs/reference/api/policy/#constraints). <!--OKTA-676880 ASSURANCE_GRANULAR_AUTHENTICATOR_CONSTRAINTS -->

#### Externally signed org AS access tokens

Access tokens returned from the org authorization server are now signed using the externally published signing key. These access tokens must still be treated as opaque strings and not be validated or consumed by any application other than Okta. <!-- OKTA-694170 -->

#### Support case management for admins is GA in Preview

Super admins can now assign the **View, create, and manage Okta support cases** permission and Support Cases resource to a custom admin role. This allows delegated admins to manage the support cases that they've opened. See [About role permissions](https://help.okta.com/okta_help.htm?type=oie&id=csh-about-role-permissions). <!-- OKTA-700229 -->

#### Realms for Workforce

Realms allows you to unlock greater flexibility in managing and delegating management of your distinct user populations within a single Okta org. See the [Realms](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Realm) and [Realm Assignments](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RealmAssignments) APIs. <!-- OKTA-702163 -->

#### Enhanced app API contracts

Okta has API documentation on creating instances of custom apps. Yet, it doesn't fully describe the app metadata required for features such as SSO and provisioning for apps installed from the Okta Integration Network (OIN). In an effort to improve the API for apps in the OIN, new app metadata contracts have been added to the Okta management API. Operators and developers can programmatically create instances of popular OIN apps in their ecosystem and set up the provisioning connection. See [Set up an app provisioning connection](/docs/guides/app-provisioning-connection/main/). <!-- OKTA-703567 -->

#### Bug fixed in 2024.03.1

Some group claims failed if Okta Expression Language was used. (OKTA-660870)

## February

### Weekly release 2024.02.2

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2024.02.2](#bugs-fixed-in-2024-02-2) | February 22, 2024 |

#### Bugs fixed in 2024.02.2

<!-- * The number of unsuccessful calls to the `/api/v1/authn` endpoint sometimes exceeded the threshold set in the password policy settings. (OKTA-698017) Removed for 2024.02.2 as per doc action-->

* Okta sometimes incorrectly returned an Invalid Phone Number error during SMS factor enrollment. (OKTA-683026)

* Sometimes, an OAuth 2.0-secured inline hook that contained a custom domain authorization server in the token URL returned a null pointer exception error, instead of an appropriate error. (OKTA-656265)

* User passwords could be updated to match the answer to the recovery question. (OKTA-654993)

### Weekly release 2024.02.1

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [HTTP header filter](#http-header-filter) | February 22, 2024 |

#### HTTP header filter

To improve the security of your org, Okta now filters and encodes any illegal unicode characters for outgoing HTTP headers. <!-- OKTA-694896 -->

### Monthly release 2024.02.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Assign admin roles to an app](#assign-admin-roles-to-an-app)| June 14, 2023 |
| [DPoP support for Okta management APIs is GA in Production](#dpop-support-for-okta-management-apis-is-ga-in-production) | December 13, 2024 |
| [Dynamic OS version compliance for device assurance](#dynamic-os-version-compliance-for-device-assurance) | June 14, 2023 |
| [New attribute to manage SAML app session lifetimes is EA in Preview](#new-attribute-to-manage-saml-app-session-lifetimes-is-ea-in-preview) | February 7, 2024 |
| [New email domain for free trial orgs](#new-email-domain-for-free-trial-orgs) | February 7, 2024 |
| [New function for email templates is EA in Preview](#new-function-for-email-templates-is-ea-in-preview) | February 7, 2024 |
| [POST requests now allowed to the logout endpoint](#post-requests-now-allowed-to-the-logout-endpoint) | February 7, 2024 |
| [Seamless ISV experience is GA in Production](#seamless-isv-experience-is-ga-in-production) | January 10, 2024 |
| [Super admin role now required to update direct authentication grants](#super-admin-role-now-required-to-update-direct-authentication-grants) | February 7, 2024 |
| [Developer documentation update in 2024.02.0](#developer-documentation-update-in-2024-02-0) | February 7, 2024 |
| [Bug fixed in 2024.02.0](#bug-fixed-in-2024-02-0) | February 7, 2024 |

#### Assign admin roles to an app

Orgs can now assign admin roles to their custom API Service Integrations. Apps with assigned admin roles are constrained to the permissions and resources that are included in the role assignment. This helps ensure that apps only have access to the resources that are needed to perform their tasks and improves orgs' overall security. See [Work with the admin component](https://help.okta.com/okta_help.htm?type=oie&id=ext-work-with-admin). <!-- OKTA-659638 CLIENT_AS_PRINCIPAL -->

#### DPoP support for Okta management APIs is GA in Production

You can now use OAuth 2.0 Demonstrating Proof-of-Possession (DPoP) access tokens to access Okta management APIs. See [Configure OAuth 2.0 Demonstrating Proof-of-Possession](/docs/guides/dpop/oktaresourceserver/main/). <!-- OKTA-673922 OKTA_RESOURCE_SERVER_DPOP_SUPPORT-->

#### Dynamic OS version compliance for device assurance

You can configure OS version compliance by using device assurance. However, you have to manually update the policies every time a new OS version or patch is released. With *Dynamic OS version compliance*, Okta updates device assurance policies with the latest OS versions and patches, eliminating the need for manual updates. With this feature you can ensure OS version compliance in your org without tracking OS releases. See [Dynamic OS version compliance](https://help.okta.com/okta_help.htm?type=oie&id=csh-device-assurance-add) and [Device Assurance Policies API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DeviceAssurance/#tag/DeviceAssurance/operation/createDeviceAssurancePolicy!path=1/osVersion&t=request). <!-- OKTA-651282 DEVICE_ASSURANCE_DYNAMIC_OS_SUPPORT -->

#### New attribute to manage SAML app session lifetimes is EA in Preview

The `samlAssertionLifetimeSeconds` parameter is an optional SAML parameter that allows the IdP to control the session at the SP. This parameter allows users to add `samlAssertionLifetimeSeconds` as an attribute in the SAML assertion to control the session lifetimes of SP apps using the Okta IdP. See the [Settings table](/docs/reference/api/apps/#settings-9) in the **Add custom SAML application** section. <!-- OKTA-690479 SAML_ASSERTION_LIFETIME_SECONDS_ON_APPS_API -->

#### New email domain for free trial orgs

When a user requests access to a free trial org, the welcome email now comes from `noreply@test-account.dev`. <!-- OKTA-673739 ENABLE_FREE_TRIAL_EMAIL_DOMAIN -->

#### New function for email templates is EA in Preview

You can now use the `getTimeDiffHoursNow` function in each of the available email notification templates. If you want to add more locales when customizing email templates, you need to use this function instead of the `formatTimeDiffHoursNowInUserLocale` function. The new function returns only the time value in the specified unit. See [Enable additional locales](/docs/guides/custom-email/main/#enable-additional-locales). <!-- OKTA-683897 -->

#### POST requests now allowed to the logout endpoint

You can now access the `/oauth2/{id}/v1/logout` and `/oauth2/v1/logout` endpoints with a POST request. See [POST logout](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/logoutWithPost). <!-- OKTA-649530 -->

#### Seamless ISV experience is GA in Production

Okta now provides a seamless ISV experience to optimize the [Okta Integration Network (OIN)](https://www.okta.com/integrations/) submission experience for SAML and OIDC integrations. This new experience enables independent software vendors (ISVs) to build and manually test their integration metadata before submission. This reduces the time needed for the OIN team to review and validate that the integration functions as intended, which shortens the time to publish in the OIN. This experience also incorporates communication processes in Salesforce, enabling improved collaboration internally within Okta teams and externally with ISVs. See [Publish an OIN integration](https://developer.okta.com/docs/guides/submit-app-overview/) overview and [Submit an SSO integration with the OIN Wizard](https://developer.okta.com/docs/guides/submit-oin-app/) guide. <!-- OKTA-663167 APP_MANIFESTS -->

#### Super admin role now required to update direct authentication grants

Super admin permissions are now required to enable or change direct authentication grants for clients. <!-- OKTA-677469 -->

#### Developer documentation update in 2024.02.0

* Instructions for [testing Okta REST APIs with Postman](/docs/reference/rest/) have been updated to provide OAuth 2.0 authentication set up and use. OAuth 2.0 is recommended to access Okta management APIs instead of the proprietary SSWS API token to ensure enhanced security.

  These instructions are now under **References** > **Test APIs with Postman**.

* The [Self-service registration](/docs/guides/oie-embedded-sdk-use-case-self-reg/) guide is now easier to read and quicker to complete. All flow diagrams have been updated so they are easier to follow, and configuration instructions now match the current Admin Console.

#### Bug fixed in 2024.02.0

When users signed in with an external Identity Provider and the multiple matching users error occurred, they were redirected to the sign-in page instead of the error page. (OKTA-658717)

## January

### Weekly release 2024.01.2

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Content Security Policy for custom domains is EA in Preview](#content-security-policy-for-custom-domains-is-ea-in-preview)| January 31, 2024 |
| [Granular API policy authenticator controls is self-service EA in Preview](#granular-api-policy-authenticator-controls-is-self-service-ea-in-preview)| January 31, 2024 |
| [IP restrictions on tokens](#ip-restrictions-on-tokens)| January 31, 2024 |
| [Bugs fixed in 2024.01.2](#bugs-fixed-in-2024-01-2) | January 31, 2024 |

#### Content Security Policy for custom domains is EA in Preview

The Content Security Policy (CSP) feature lets admins control which URLs may be linked to from customized sign-in and error pages in orgs that use custom domains. Admins add trusted URLs to Okta that link to items such as images and add these links to the code in their sign-in and error pages. This feature enhances security by enabling admins to allow only approved content to appear and prevent the introduction of potentially malicious code to these pages. See [Content Security Policy (CSP) for your custom domain](/docs/guides/custom-widget/main/#content-security-policy-csp-for-your-custom-domain). <!-- OKTA-600774 FF CONTENT_SECURITY_POLICY_FOR_CUSTOMIZABLE_SIGN_IN_AND_ERROR_PAGES -->

#### Granular API policy authenticator controls is self-service EA in Preview

The Authentication Policy API now includes three new `constraints` object parameters that provide precise control over what specific authenticators and methods are displayed to end users. Previously, some authenticators were mapped to the same authenticator `types` and `methods`. The parameters `authenticationMethods` and `excludeAuthenticationMethods` now identify (or exclude) the exact authenticator for both `knowledge` and `possession` constraints. The `required` parameter indicates whether the `knowledge` or `possession` constraints are required by the assurance. See the [Policy API](/docs/reference/api/policy/#constraints). <!--OKTA-676888 ASSURANCE_GRANULAR_AUTHENTICATOR_CONSTRAINTS -->

#### IP restrictions on tokens

Admins can specify allowlisted and blocklisted network zones for static, Single Sign-On Web System (SSWS) API tokens. This strengthens org security by letting them control where calls to Okta APIs can originate from. It also restricts attackers and malware from stealing SSWS tokens or replaying them outside of their IP range to gain unauthorized access. <!-- OKTA-689850 -->

#### Bugs fixed in 2024.01.2

* Some text strings in the Authentication policies page weren't translated. (OKTA-583880)

* POST requests to the `/sessions/me/lifecycle/refresh` endpoint didn't return an updated session cookie. (OKTA-665452)

* System Log events for the access token, ID token, and user SSO grants didn't include `externalSessionId`. (OKTA-664370)

* System Log events for access token and ID token grants didn't include user attributes. (OKTA-674218)

### Weekly release 2024.01.1

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bug fixed in 2024.01.1](#bug-fixed-in-2024-01-1) | January 18, 2024 |

#### Bug fixed in 2024.01.1

Users could activate their Okta accounts from expired activation email links using the SDKs. (OKTA-666148)

### Monthly release 2024.01.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [DPoP support for Okta management APIs is GA in Preview](#dpop-support-for-okta-management-apis-is-ga-in-preview) | December 13, 2023 |
| [Email or password no longer required in authenticator enrollment policy is GA in Preview](#email-or-password-no-longer-required-in-authenticator-enrollment-policy-is-ga-in-preview) | January 10, 2024 |
| [More properties returned for Devices API user summaries](#more-properties-returned-for-devices-api-user-summaries) | January 10, 2024 |
| [New possession constraint property available for Policy API is GA in Production](#new-possession-constraint-property-available-for-policy-api-is-ga-in-production) | December 6, 2023 |
| [Read-only permission for admin role assignments is GA in Production](#read-only-permission-for-admin-role-assignments-is-ga-in-production) | November 8, 2023 |
| [Seamless ISV experience is GA in Preview](#seamless-isv-experience-is-ga-in-preview) | January 10, 2024 |
| [Stay signed in is EA in Preview](#stay-signed-in-is-ea-in-preview) | January 10, 2024 |
| [System Log events for IdP keystore operations](#system-log-events-for-idp-keystore-operations) | January 10, 2024 |
| [Updated RADIUS authentication prompts](#updated-radius-authentication-prompts) | January 10, 2024 |
| [Use your own email provider is GA in Production](#use-your-own-email-provider-is-ga-in-production) | December 6, 2023 |

#### DPoP support for Okta management APIs is GA in Preview

You can now use OAuth 2.0 Demonstrating Proof-of-Possession (DPoP) access tokens to access Okta management APIs.
See [Configure OAuth 2.0 Demonstrating Proof-of-Possession](/docs/guides/dpop/oktaresourceserver/main/). <!-- OKTA-673922 OKTA_RESOURCE_SERVER_DPOP_SUPPORT-->

#### Email or password no longer required in authenticator enrollment policy is GA in Preview

Previously, authenticator enrollment policies required either an email or a password even if other authenticators were enabled. Now, you can set email or password authentication to `optional` or `disabled`, and require another authenticator instead. This change allows orgs to better secure accounts with stronger authenticators such as Okta Verify, Okta FastPass, or FIDO2 (WebAuthn). See [Create an authenticator enrollment policy](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-mfa-policy). <!-- OKTA-681443 ENABLE_BOOTSTRAP_WITH_ANY_AUTHENTICATOR-->

#### More properties returned for Devices API user summaries

The [List all Devices](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Device/#tag/Device/operation/listDevices) API operation has been updated to return more user summary properties in the `_embedded` payload. When the `expand=userSummary` [query parameter](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Device/#tag/Device/operation/listDevices!in=query&path=expand&t=request) is included in the List all Devices request (for example, `GET /api/v1/devices?expand=userSummary`), the `managementStatus` and `screenLockType` properties are returned for each user summary. <!-- OKTA-669910 -->

#### New possession constraint property available for Policy API is GA in Production

A new `userVerification` property is available for the `constraints` object of the [Policy API](/docs/reference/api/policy/#constraints). This setting can ensure the verification of a possession factor through a PIN or biometrics. <!-- OKTA-669846 ASSURANCE_USER_VERIFICATION_POSSESSION_CONSTRAINT -->

#### Read-only permission for admin role assignments is GA in Production

Super admins can now assign the **View roles, resources, and admin assignments** permission to their delegated admins. This permission gives admins a read-only view of the admin roles, resource sets, and admin assignments in the org. See [About role permission](https://help.okta.com/okta_help.htm?type=oie&id=csh-about-role-permissions). <!-- OKTA-640563 IAM_READ_RESOURCES -->

#### Seamless ISV experience is GA in Preview

Okta now provides a seamless ISV experience to optimize the [Okta Integration Network (OIN)](https://www.okta.com/integrations/) submission experience for SAML and OIDC integrations. This new experience enables independent software vendors (ISVs) to build and manually test their integration metadata before submission. This reduces the time needed for the OIN team to review and validate that the integration functions as intended, which shortens the time to publish in the OIN.

This experience also incorporates communication processes in Salesforce, enabling improved collaboration internally within Okta teams and externally with ISVs. See [Publish an OIN integration](/docs/guides/submit-app-overview/) overview and [Submit an SSO integration with the OIN Wizard](/docs/guides/submit-oin-app/) guide. <!-- OKTA-663167  APP_MANIFESTS -->

#### Stay signed in is EA in Preview

Today, **Keep me signed in** allows the user to select whether their multifactor authenticators from previous sessions should be remembered. However, the option to select **Keep me signed in** was only available on the sign-in page.

To enable **Stay signed in** for integrated authentication flows, admins can now configure their sign-in experience such that the option to **Stay signed in** is provided either before the user signs in to Okta or before and after the user completes multifactor authentication. If a user selects **Stay signed in**, they won't be challenged for MFA the next time they sign in. In addition, users will now be able to sign out of all active Okta sessions from the Okta End-User Dashboard. See [Organization Security](https://help.okta.com/okta_help.htm?type=oie&id=csh-stay-signed-in). <!-- OKTA-652650, POST_AUTH_KEEP_ME_SIGNED_IN -->

#### System Log events for IdP keystore operations

New System Log events are generated for IdP keystore operations:

```bash
system.idp.key.create
system.idp.key.update
system.idp.key.delete
```
<!-- OKTA-680513 -->

#### Updated RADIUS authentication prompts

RADIUS authentication prompts are updated to be clearer.
<!-- OKTA-678869 -->

#### Use your own email provider is GA in Production

The Email Servers API allows you to configure a custom external email provider to send email notifications. By default, notifications such as the welcome email or an account recovery email are sent through an Okta-managed SMTP server. Adding a custom email provider gives you more control over your email delivery. See [Email Servers API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/EmailServer/). <!-- OKTA-654556 CUSTOM_EMAIL_SMTP_SERVER -->
