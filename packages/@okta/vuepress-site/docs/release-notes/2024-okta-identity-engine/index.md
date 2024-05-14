---
title: Okta Identity Engine API release notes 2024
---

<ApiLifecycle access="ie" />
# Okta Identity Engine API release notes (2024)

## May

### Weekly release 2024.05.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Enhanced Dynamic Network Zones is self-service EA](#enhanced-dynamic-network-zones-is-self-service-ea) | May 15, 2024 |
| [Bugs fixed in 2024.05.1](#bugs-fixed-in-2024-05-1)  | May 15, 2024 |

#### Enhanced Dynamic Network Zones is self-service EA

Use Enhanced Dynamic Network Zones to define IP service categories (proxies, VPNs), locations, and Autonomous System Numbers (ASNs) that are allowed or blocked in a zone. See [Network Zones API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/NetworkZone/). <!--ENHANCED_DYNAMIC_NETWORK_ZONE OKTA-727934-->

#### Bugs fixed in 2024.05.1

* If an API request contained any malformed syntax within the query string, the request was still processed. (OKTA-728810)

* Sometimes the SAML assertion lifetime couldn't be unset when the SAML Assertion Lifetime API feature was enabled. (OKTA-728316)

### Monthly release 2024.05.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [SSF Transmitter API is self-service EA in Preview](#ssf-transmitter-api-is-self-service-ea-in-preview) | May 8, 2024 |
| [Seamless ISV experience with integrated testing is GA in Preview](#seamless-isv-experience-with-integrated-testing-is-ga-in-preview) | May 8, 2024 |
| [PUT requests for an API token network condition is self-service EA](#put-requests-for-an-api-token-network-condition-is-self-service-ea) | May 8, 2024 |
| [Permissions for custom admins to manage agents is GA in Production](#permissions-for-custom-admins-to-manage-agents-is-ga-in-production) | May 8, 2024 |
| [Username supported as optional request query parameter](#username-supported-as-optional-request-query-parameter) | May 8, 2024 |
| [Version pinning for Sign-In Widget (third generation) is GA in Production](#version-pinning-for-sign-in-widget-third-generation-is-ga-in-production) | May 8, 2024 |
| [New System Log API property for target object](#new-system-log-api-property-for-target-object) | May 8, 2024 |
| [Multiple Identifiers is EA in Preview](#multiple-identifiers-is-ea-in-preview) | April 10, 2024 |
| [Developer documentation update in 2024.05.0](#developer-documentation-update-in-2024-05-0) | May 8, 2024 |
| [Bugs fixed in 2024.05.0](#bugs-fixed-in-2024-05-0) | May 8, 2024 |

#### SSF Transmitter API is self-service EA in Preview

Okta uses [CAEP](https://openid.net/specs/openid-caep-specification-1_0.html) to send security-related events and other data-subject signals to Apple, known as the Shared Signal Framework (SSF) receiver. After an SSF stream is configured, Okta sends signals as [Security Event Tokens (SETs)](https://datatracker.ietf.org/doc/html/rfc8417) to Apple. Use the [SSF Transmitter API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFTransmitter/) to manage SSF stream configurations between the SSF receiver and Okta. <!-- OKTA-660502 -->

#### Seamless ISV experience with integrated testing is GA in Preview

Okta now provides a seamless ISV experience to optimize the [Okta Integration Network (OIN)](https://www.okta.com/integrations/) submission experience for SAML and OIDC integrations. This new experience enables independent software vendors (ISVs) to build and automatically test their integration metadata before submission. This reduces the time needed for the OIN team to review and validate that the integration functions as intended, which shortens the time to publish in the OIN. This experience also incorporates communication processes in Salesforce, enabling improved collaboration internally within Okta teams and externally with ISVs. See [Publish an OIN integration](/docs/guides/submit-app-overview/) overview and [Submit an SSO integration with the OIN Wizard](/docs/guides/submit-oin-app/openidconnect/main/) guide. <!-- OKTA-686228 -->

#### PUT requests for an API token network condition is self-service EA

You can now make PUT requests to the `/api-tokens/{apiTokenId}` endpoint to update the network condition of an API token. <!-- OKTA-704387 -->

#### Permissions for custom admins to manage agents is GA in Production

Custom admins can now view, register, and manage agents. See [Permission types](/docs/reference/api/roles/#permission-properties). <!-- OKTA-706310 -->

#### Username supported as optional request query parameter

SAML and WS-Fed template applications now support username as an optional request query parameter for supplying a login hint. <!-- OKTA-711401 -->

#### Version pinning for Sign-In Widget (third generation) is GA in Production

You can now pin the Sign-In Widget version (third generation) when updating a customized sign-in page (`PUT /brands/{brandId}/pages/sign-in/customized`) or a preview sign-in page (`PUT /brands/{brandId}/pages/sign-in/preview`). The value of `widgetVersion` must be `7.8` or later if `widgetCustomizations.widgetGeneration` is set to `G3`. A value of `7.7` or earlier results in an invalid request. See [Replace the Customized Error Page](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Customization/#tag/Customization/operation/replaceCustomizedErrorPage). <!-- OKTA-713942 -->

#### New System Log API property for target object

Certain system log events now contain a new property called `changeDetails` in the `target` object. When this property is populated, it reflects new, changed, or removed attributes of the target resource that has been modified. See [changeDetails property](/docs/reference/api/system-log/#changedetails-property). <!-- OKTA-724000 -->

#### Multiple Identifiers is EA in Preview

Today, end users must sign in to Okta with a username or email address only. With the Multiple Identifiers feature, admins can configure identifiers, or user attributes from Universal Directory, that an end user can enter to authenticate. Multiplier identifiers work in sign-in, recovery, self-service registration, and unlock flows. Admins can configure up to three identifiers, including email (which is still a required identifier). See [Profile enrollment policy](/docs/reference/api/policy/#profile-enrollment-policy). <!-- OKTA-687191 FF: MULTIPLE_IDENTIFIERS -->

#### Developer documentation update in 2024.05.0

The [Style the Sign-In Widget (third generation) guide](/docs/guides/custom-widget-gen3/main/#about-the-afterrender-function) has been updated to describe how the `afterRender` function works. <!-- OKTA-686866 -->

#### Bugs fixed in 2024.05.0

* When a large number of users were linked to an Identity Provider, requests to the `/idps/{IdP_ID}/users` endpoint timed out. (OKTA-710934)

* POST calls to `/idp/myaccount/emails` to capitalize a letter resulted in the end user unable to sign in to their account. (OKTA-712135)

* Users who entered an invalid username into a password-first sign-in flow saw a misleading error message. This behavior occurred only in orgs that enabled the Multiple Identifiers feature and disabled User Enumeration Prevention. (OKTA-713096)

* Super admins with roles assigned through group assignment couldn't enable Direct Authentication grant types in an OIDC app. (OKTA-719756)

* If a [login pattern](https://developer.okta.com/docs/reference/api/schemas/#login-pattern-validation) failed validation when making a request with the Schemas API, the call dropped the pattern and continued the request. (OKTA-723332)

* The Apps API accepted `0` as a value for the `samlAssertionLifetimeSeconds` parameter. (OKTA-723982)

## April

### Weekly release 2024.04.3

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bugs fixed in 2024.04.3](#bugs-fixed-in-202403)  | May 01, 2024 |

#### Bugs fixed in 2024.04.3

* GET policy rules (`/v1/policies/{policyId}/rules`) and GET a policy rule  (`/v1/policies/{policyId}/rules/{ruleId}`) requests returned a rule with a null value for the `created` property. (OKTA-542919)

* The Factors API didn't correctly return all `profile.keys` parameters for Okta Verify enrollments. (OKTA-694655)

* Apps API users were able to add duplicate SAML `attributeStatements` when they created or updated a custom SAML 2.0 app. (OKTA-706474)

* GET calls to `/iam/roles` sometimes didn't return link headers. (OKTA-712212)

* When the **First name** and **Last name** values in a user's profile contained dots, they were clickable in emails. (OKTA-712504)

* The `/introspect` endpoint response was incorrect for an access token returned by the On-Behalf-Of Token Exchange flow. (OKTA-712602)

* The `/authorize` endpoint didn't accept the `sessionToken` when **Stay signed in** was set to **Before and after users sign in** in the Admin Console. (OKTA-713055)

* The `aud` claim value must now be the org's URL in SSF messages. (OKTA-720203)

### Weekly release 2024.04.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2024.04.1](#bug-fixed-in-2024011)  | April 10, 2024 |

#### Bug fixed in 2024.04.1

Redirects to applications from the Sign-In Widget were blocked in Android browsers. (OKTA-702402)

### Monthly release 2024.04.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Permissions for custom admins to manage agents is GA in Preview](#permissions-for-custom-admins-to-manage-agents-is-ga-in-preview) | April 3, 2024 |
| [Okta now supports the NotonOrAfter property for SLO apps](#okta-now-supports-the-notonorafter-property-for-slo-apps)  | April 3, 2024 |
| [Identity Threat Protection with Okta AI is EA in Preview](#identity-threat-protection-with-okta-ai-is-ea-in-preview) | April 3, 2024 |
| [Enhanced app API contracts is GA in Production](#enhanced-app-api-contracts-is-ga-in-production) | April 3, 2024 |
| [Direct Authentication is GA in Production](#direct-authentication-is-ga-in-production) | March 7, 2024 |
| [Content Security Policy for custom domains is GA in Production](#content-security-policy-for-custom-domains-is-ga-in-production) | January 31, 2024 |
| [Developer documentation update in 2024.04.0](#developer-documentation-update-in-2024-04-0) | April 3, 2024 |
| [Bugs fixed in 2024.04.0](#bugs-fixed-in-2024-04-0) | April 3, 2024 |

#### Permissions for custom admins to manage agents is GA in Preview

Custom admins can now view, register, and manage agents. See [Permission types](/docs/reference/api/roles/#permission-properties). <!-- OKTA-706310 ALLOW_CUSTOM_ADMIN_TO_MANAGE_REGISTER_AGENTS -->

#### Okta now supports the NotonOrAfter property for SLO apps

Logout requests from Okta to participating SLO apps now support the NotonOrAfter property. This property sets a timeframe in which the logout request expires. If a recipient receives a logout request that's past the NotonOrAfter timeframe (five minutes), the user can ignore the logout request from Okta. <!-- OKTA-677756 -->

#### Identity Threat Protection with Okta AI is EA in Preview

Identity Threat Protection with Okta AI is a powerful risk assessment and response solution that provides post-authentication security to your org. By continuously analyzing risk signals that are native to Okta, risk signals from integrated security partner vendors, and your policy conditions, it safeguards orgs against identity attacks that occur during and outside of a user's session. When Identity Threat Protection discovers a risk, it can immediately end the user's sessions, prompt an MFA challenge, or invoke a workflow to restore your org's security posture. Using intuitive dashboard widgets and reports, you can easily monitor security threats as they happen. See [Identity Thread Protection with Okta AI](https://help.okta.com/okta_help.htm?type=oie&id=ext-itp-overview).

See the [Shared Signals Framework (SSF) Receiver](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFReceiver/) and [SSF SET](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/SSFSecurityEventToken/) APIs.

See also the [Entity risk policy](/docs/reference/api/policy/#entity-risk-policy) and [Continuous Access evaluation policy](/docs/reference/api/policy/#continuous-access-evaluation-policy) API updates. <!-- OKTA-683713 ENABLE_ITP_FEATURES_FOR_EA -->

#### Enhanced app API contracts is GA in Production

Okta has API documentation on creating instances of custom apps. Yet, it doesn't fully describe the app metadata required for features such as SSO and provisioning for apps installed from the Okta Integration Network (OIN). In an effort to improve the API for apps in the OIN, new app metadata contracts have been added to the Okta management API. Operators and developers can programmatically create instances of popular OIN apps in their ecosystem and set up the provisioning connection.

See [OIN app request payloads in the Applications API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/) and the [Set up an app provisioning connection](/docs/guides/app-provisioning-connection/main/) guide. <!-- OKTA-663482 PROVISIONING_API_EXTENSION -->

#### Direct Authentication is GA in Production

[Direct Authentication](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/token) offers a new set of OAuth 2.0 grants that give app developers greater control over the authentication process. When redirect authentication isn't an option, you can use direct authentication to allow client apps to authenticate users directly, without relying on HTTP redirection through a web browser. This is beneficial when there's a high degree of trust between the user and the app and when browser-based flows aren't feasible, like with mobile apps. See [Configure Direct Auth grant types](/docs/guides/configure-direct-auth-grants/aotp/main/). <!-- OKTA-585748 OKTA-663482 PROVISIONING_API_EXTENSION -->

#### Content Security Policy for custom domains is GA in Production

The Content Security Policy (CSP) feature lets admins control which URLs may be linked to from customized sign-in and error pages in orgs that use custom domains. Admins add trusted URLs to Okta that link to items such as images and add these links to the code in their sign-in and error pages. This feature enhances security by enabling admins to allow only approved content to appear and prevent the introduction of potentially malicious code to these pages. See [Content Security Policy (CSP) for your custom domain](/docs/guides/custom-widget/main/#content-security-policy-csp-for-your-custom-domain). <!-- OKTA-600774 FF CONTENT_SECURITY_POLICY_FOR_CUSTOMIZABLE_SIGN_IN_AND_ERROR_PAGES -->

#### Developer documentation update in 2024.04.0

The [OIN QA SCIM test plan](/docs/guides/scim-provisioning-integration-test/main/#run-through-oin-qa-tests) file was updated. The following test cases were modified: C9319, C9320, C9321, C9360, and C9361. <!-- OKTA-704429 --> <!-- OKTA-710941 -->

#### Bugs fixed in 2024.04.0

* The password reset prompt didn't appear for users with expired passwords. (OKTA-670058)

* Users were able to unselect a saved SSO protocol for an integration submission in the OIN Wizard. (OKTA-710638)

## March

### Weekly release 2024.03.2

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2024.03.2](#bugs-fixed-in-2024-03-2) | March 27, 2024 |

#### Bugs fixed in 2024.03.2

* An admin was able to make a GET Policy request (`/authorizationServers/${authorizationServerId}/policies/${policyId}`) to an authorization server with no policies, using a policy ID from another authorization server with policies, and get that policy information returned. (OKTA-684225)

* Okta sometimes incorrectly returned an Invalid Phone Number error during SMS factor enrollment. (OKTA-705078)

* After an admin deleted a user, an internal server error sometimes occurred when the admin then made a LIST IdP users request (`api/v1/idps/{idpId}/users`). (OKTA-708102)

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
| [Bug fixed in 2024.03.0](#bug-fixed-in-2024-03-0)                                                                                    | March 7, 2024 |

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

Realms allows you to unlock greater flexibility in managing and delegating management of your distinct user populations within a single Okta org. See the [Realms](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Realm) and [Realm Assignments](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RealmAssignment) APIs. <!-- OKTA-702163 -->

#### Enhanced app API contracts

Okta has API documentation on creating instances of custom apps. Yet, it doesn't fully describe the app metadata required for features such as SSO and provisioning for apps installed from the Okta Integration Network (OIN). In an effort to improve the API for apps in the OIN, new app metadata contracts have been added to the Okta management API. Operators and developers can programmatically create instances of popular OIN apps in their ecosystem and set up the provisioning connection. See [Set up an app provisioning connection](/docs/guides/app-provisioning-connection/main/). <!-- OKTA-703567 -->

#### Bug fixed in 2024.03.0

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
| [DPoP support for Okta management APIs is GA in Production](#dpop-support-for-okta-management-apis-is-ga-in-production) | December 13, 2023 |
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
