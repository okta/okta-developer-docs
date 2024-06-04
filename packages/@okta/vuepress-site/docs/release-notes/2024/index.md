---
title: Okta Classic Engine API release notes 2024
---

# Okta Classic Engine API release notes (2024)

## June

### Monthly release 2024.06.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Active Directory Bidirectional Group Management API is GA in Preview](#active-directory-bidirectional-group-management-api-is-ga-in-preview) | June 5, 2024 |
| [Seamless ISV experience with integrated testing is GA in Production](#seamless-isv-experience-with-integrated-testing-is-ga-in-production) | June 5, 2024 |
| [Your OIN Integrations instruction updates](#your-oin-integrations-instruction-updates) | June 5, 2024 |
| [SCIM 2.0 endpoint call update for user ResourceType requirements](#scim-2-0-endpoint-call-update-for-user-resourcetype-requirements) | June 5, 2024 |
| [Increase to Inline Hooks](#increase-to-inline-hooks) | June 5, 2024 |
| [New attribute to manage SAML app session lifetimes is GA in Preview](#new-attribute-to-manage-saml-app-session-lifetimes-is-ga-in-preview) | June 5, 2024 |
| [Protected actions in the Admin Console is GA in Preview](#protected-actions-in-the-admin-console-is-ga-in-preview) | June 5, 2024 |
| [Session cookie overrides are GA in Production](#session-cookie-overrides-are-ga-in-production) | June 5, 2024 |
| [Developer documentation update in 2024.06.0](#developer-documentation-update-in-2024-06-0) | June 5, 2024 |
| [Bug fixed in 2024.06.0](#bug-fixed-in-2024-06-0) | June 5, 2024 |

#### Active Directory Bidirectional Group Management API is GA in Preview

The Bidirectional Group Management for Active Directory (AD) API<!--Don't forget to format this correctly! (https://developer.okta.com/docs/api/openapi/okta-management/management/tag/DirectoriesIntegration)--> allows you to manage AD groups from within Okta. You can add or remove users from groups based on their identity and access requirements. This ensures that changes made to user access in Okta are reflected in AD. When you use Okta Access Certifications to revoke a user's membership to an AD group, the removal is reflected in AD.

Okta can only manage group memberships for users and groups imported into Okta using the AD integration. It isn't possible to manage users and groups that weren't imported through AD integration or are outside the organizational unit's scope for the integration using this feature. <!--AD_BIDIRECTIONAL_GROUP_MANAGEMENT OKTA-734564-->

#### Seamless ISV experience with integrated testing is GA in Production

Okta now provides a seamless ISV experience to optimize the [Okta Integration Network (OIN)](https://www.okta.com/integrations/) submission experience for SAML and OIDC integrations. This new experience enables independent software vendors (ISVs) to build and automatically test their integration metadata before submission. This reduces the time needed for the OIN team to review and validate that the integration functions as intended, which shortens the time to publish in the OIN. This experience also incorporates communication processes in Salesforce, enabling improved collaboration internally within Okta teams and externally with ISVs. See [Publish an OIN integration](/docs/guides/submit-app-overview/) overview and [Submit an SSO integration with the OIN Wizard](/docs/guides/submit-oin-app/openidconnect/main/) guide. <!--OKTA_OIN_SUBMISSION_TESTER OKTA-686228 -->

#### Your OIN Integrations instruction updates

TThe instructions on how to submit your OIN integration have been updated on the **Your OIN Integrations** page of the Admin Console in Developer Edition orgs. <!--OKTA-734095-->

#### SCIM 2.0 endpoint call update for user ResourceType requirements

When using [SCIM 2.0 with Entitlements](/docs/guides/scim-with-entitlements/main/), Okta no longer requires a user `ResourceType` value when no custom `schemaExtensions` are used. This applies only to SCIM 2.0 apps enabled for governance with Okta Identity Governance leveraging the `/ResourceTypes` endpoint. <!--OKTA-729238-->

#### Increase to Inline Hooks

The maximum number of inline hooks an org can create is now 100. The previous maximum was 50. See [Inline hook setup](/docs/concepts/inline-hooks/#inline-hook-setup). <!-- OKTA-732758 -->

#### New attribute to manage SAML app session lifetimes is GA in Preview

The `SessionNotOnOrAfter` parameter is an optional SAML parameter that enables the IdP to control the session at the SP. Add `SessionNotOnOrAfter` as an attribute in the SAML assertion to control the session lifetimes of SP apps using the Okta IdP. <!--OKTA-690479-->

#### Protected actions in the Admin Console is GA in Preview

The protected actions feature provides an additional layer of security to your org. It prompts admins for authentication when they perform critical tasks in the Admin Console and helps ensure that only authorized admins can perform these tasks. Super admins can configure the authentication interval for their org. See [Protected actions in the Admin Console](https://help.okta.com/okta_help.htm?type=oie&id=ext-protected-actions). <!-- PRIVILEGED_ACTIONS OKTA-683167 -->

#### Session cookie overrides are GA in Production

Okta ignores the session cookie if the request includes a session token parameter.

#### Developer documentation update in 2024.06.0

* The [Customize domain and email address guide](/docs/guides/custom-url-domain/main/#caveats) now says that network zones are incompatible with Okta-managed TLS certificates. (OKTA-730633)

#### Bug fixed in 2024.06.0

* The `forceAuthn` parameter was ignored for org2org apps using the SAML sign-in mode and AMR claims mapping. (OKTA-711957)

## May

### Weekly release 2024.05.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Enhanced Dynamic Network Zones is self-service EA](#enhanced-dynamic-network-zones-is-self-service-ea) | May 15, 2024 |
| [Bug fixed in 2024.05.1](#bug-fixed-in-2024-05-1)  | May 15, 2024 |

#### Enhanced Dynamic Network Zones is self-service EA

Use Enhanced Dynamic Network Zones to define IP service categories (proxies, VPNs), locations, and Autonomous System Numbers (ASNs) that are allowed or blocked in a zone. See [Network Zones API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/NetworkZone/). <!--ENHANCED_DYNAMIC_NETWORK_ZONE OKTA-727934-->

#### Bug fixed in 2024.05.1

<!---Removing as part of OKTA-734890: * If an API request contained any malformed syntax within the query string, the request was still processed. (OKTA-728810) --->

* Sometimes the SAML assertion lifetime couldn't be unset when the SAML Assertion Lifetime API feature was enabled. (OKTA-728316)

### Monthly release 2024.05.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Seamless ISV experience with integrated testing is GA in Preview](#seamless-isv-experience-with-integrated-testing-is-ga-in-preview) | May 8, 2024 |
| [PUT requests for an API token network condition is self-service EA](#put-requests-for-an-api-token-network-condition-is-self-service-ea) | May 8, 2024 |
| [Permissions for custom admins to manage agents is GA in Production](#permissions-for-custom-admins-to-manage-agents-is-ga-in-production) | May 8, 2024 |
| [New System Log API property for target object](#new-system-log-api-property-for-target-object) | May 8, 2024 |
| [Bugs fixed in 2024.05.0](#bugs-fixed-in-2024-05-0) | May 8, 2024 |

#### Seamless ISV experience with integrated testing is GA in Preview

Okta now provides a seamless ISV experience to optimize the [Okta Integration Network (OIN)](https://www.okta.com/integrations/) submission experience for SAML and OIDC integrations. This new experience enables independent software vendors (ISVs) to build and automatically test their integration metadata before submission. This reduces the time needed for the OIN team to review and validate that the integration functions as intended, which shortens the time to publish in the OIN. This experience also incorporates communication processes in Salesforce, enabling improved collaboration internally within Okta teams and externally with ISVs. See [Publish an OIN integration](/docs/guides/submit-app-overview/) overview and [Submit an SSO integration with the OIN Wizard](/docs/guides/submit-oin-app/openidconnect/main/) guide. <!-- OKTA-686228 -->

#### PUT requests for an API token network condition is self-service EA

You can now make PUT requests to the `/api-tokens/{apiTokenId}` endpoint to update the network condition of an API token. <!-- OKTA-704387 -->

#### Permissions for custom admins to manage agents is GA in Production

Custom admins can now view, register, and manage agents. See [Permission types](/docs/reference/api/roles/#permission-properties). <!-- OKTA-706310 -->

#### New System Log API property for target object

Certain system log events now contain a new property called `changeDetails` in the `target` object. When this property is populated, it reflects new, changed, or removed attributes of the target resource that has been modified. See [changeDetails property](/docs/reference/api/system-log/#changedetails-property). <!-- OKTA-724000 -->

#### Bugs fixed in 2024.05.0

* When a large number of users were linked to an Identity Provider, requests to the `/idps/{IdP_ID}/users` endpoint timed out. (OKTA-710934)

* POST requests to the `/sessions/me/lifecycle/refresh` endpoint didn't return a `sid` cookie. (OKTA-716839)

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

### Monthly release 2024.04.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Customize Okta to use the telecommunications provider of your choice is GA in Production](#customize-okta-to-use-the-telecommunications-provider-of-your-choice-is-ga-in-production) | March 7, 2024 |
| [Permissions for custom admins to manage agents is GA in Preview](#permissions-for-custom-admins-to-manage-agents-is-ga-in-preview)  | April 3, 2024 |
| [Enhanced app API contracts is GA in Production](#enhanced-app-api-contracts-is-ga-in-production) | April 3, 2024 |
| [Content Security Policy for custom domains is GA in Production](#content-security-policy-for-custom-domains-is-ga-in-production) | January 31, 2024 |
| [Developer documentation update in 2024.04.0](#developer-documentation-update-in-2024-04-0) | April 3, 2024 |
| [Bug fixed in 2024.04.0](#bug-fixed-in-2024-04-0) | April 3, 2024 |

#### Customize Okta to use the telecommunications provider of your choice is GA in Production

While Okta provides out of the box telephony functionality, many customers need the ability to integrate their existing telecommunications provider with Okta to deliver SMS and Voice messages.

The Telephony Inline Hook allows customers to generate one-time passcodes within Okta and then use their existing telecommunications provider to deliver the messages for MFA enrollment/verification, password reset, and account unlock using SMS or Voice. This allows customers to use their existing telephony solution within Okta, due to the time they've already invested in their existing telephony solution, the need to use a specific regional provider, or simply the desire to maintain flexibility. See [Connect to an external telephony service provider](https://help.okta.com/okta_help.htm?id=ext-telephony-inline-hook). <!-- OKTA-700233 INLINE_HOOKS_ASYNC_TELEPHONY_PROVIDER -->

#### Permissions for custom admins to manage agents is GA in Preview

Custom admins can now view, register, and manage agents. See [Permission types](/docs/reference/api/roles/#permission-properties). <!-- OKTA-706310 ALLOW_CUSTOM_ADMIN_TO_MANAGE_REGISTER_AGENTS -->

#### Enhanced app API contracts is GA in Production

Okta has API documentation on creating instances of custom apps. Yet, it doesn't fully describe the app metadata required for features such as SSO and provisioning for apps installed from the Okta Integration Network (OIN). In an effort to improve the API for apps in the OIN, new app metadata contracts have been added to the Okta management API. Operators and developers can programmatically create instances of popular OIN apps in their ecosystem and set up the provisioning connection.

See [OIN app request payloads in the Applications API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Application/) and the [Set up an app provisioning connection](/docs/guides/app-provisioning-connection/main/) guide. <!-- OKTA-663482 PROVISIONING_API_EXTENSION -->

#### Content Security Policy for custom domains is GA in Production

The Content Security Policy (CSP) feature lets admins control which URLs may be linked to from customized sign-in and error pages in orgs that use custom domains. Admins add trusted URLs to Okta that link to items such as images and add these links to the code in their sign-in and error pages. This feature enhances security by enabling admins to allow only approved content to appear and prevent the introduction of potentially malicious code to these pages. See [Content Security Policy (CSP) for your custom domain](/docs/guides/custom-widget/main/#content-security-policy-csp-for-your-custom-domain). <!-- OKTA-600774 FF CONTENT_SECURITY_POLICY_FOR_CUSTOMIZABLE_SIGN_IN_AND_ERROR_PAGES -->

#### Developer documentation update in 2024.04.0

The [OIN QA SCIM test plan](/docs/guides/scim-provisioning-integration-test/main/#run-through-oin-qa-tests) file was updated. The following test cases were modified: C9319, C9320, C9321, C9360, and C9361. <!-- OKTA-704429 --> <!-- OKTA-710941 -->

#### Bug fixed in 2024.04.0

Users were able to unselect a saved SSO protocol for an integration submission in the OIN Wizard. (OKTA-710638)

## March

### Weekly release 2024.03.2

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2024.03.2](#bugs-fixed-in-2024-03-2) | March 27, 2024 |

#### Bugs fixed in 2024.03.2

* An admin was able to make a GET Policy request (`/authorizationServers/${authorizationServerId}/policies/${policyId}`) to an authorization server with no policies, using a policy ID from another authorization server with policies, and get that policy information returned. (OKTA-684225)

* Client rate limiting configurations for the `/login/login.htm` endpoint were displayed incorrectly in the Rate Limit dashboard and were in an inconsistent state for some orgs. (OKTA-699914)

* Okta sometimes incorrectly returned an Invalid Phone Number error during SMS factor enrollment. (OKTA-705078)

* After an admin deleted a user, an internal server error sometimes occurred when the admin then made a LIST IdP users request (`api/v1/idps/{idpId}/users`). (OKTA-708102)

### Weekly release 2024.03.1

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Bug fixed in 2024.03.1](#bug-fixed-in-2024-03-1) | March 13, 2024 |

#### Bug fixed in 2024.03.1

One-time passcodes (OTPs) that were sent using a telephony inline hook weren't subject to rate limits. (OKTA-704319)

### Monthly release 2024.03.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Permission conditions for profile attributes is GA in Production](#permission-conditions-for-profile-attributes-is-ga-in-production) | March 7, 2024 |
| [Content Security Policy for custom domains is GA in Preview](#content-security-policy-for-custom-domains-is-ga-in-preview)           | March 7, 2024 |
| [New mappings property for Policy API is EA in Preview](#new-mappings-property-for-policy-api-is-ea-in-preview)                       | March 7, 2024 |
| [AAL values for Login.gov IdP](#aal-values-for-logingov-idp)                                                                          | March 7, 2024 |
| [Externally signed org AS access tokens](#externally-signed-org-as-access-tokens)                                                     | March 7, 2024 |
| [Support case management for admins is GA in Preview](#support-case-management-for-admins-is-ga-in-preview)                           | March 7, 2024 |
| [Realms for Workforce](#realms-for-workforce)                                                                                         | March 7, 2024 |
| [Enhanced app API contracts](#enhanced-app-api-contracts)                                                                             | March 7, 2024 |
| [Bugs fixed in 2024.03.0](#bugs-fixed-in-2024-03-0) | March 6, 2024 |

#### Permission conditions for profile attributes is GA in Production

You can now apply conditions to the **View users and their details** and **Edit users' profile attributes** custom admin role permissions. Permission conditions help you limit the scope of a role by including or excluding admins' access to individual profile attributes. This gives you more granular control over your custom admin roles and helps meet your org's unique security needs. See [Permission conditions](https://help.okta.com/okta_help.htm?type=oie&id=ext-permission-conditions). <!-- OKTA-586185 -->

#### Content Security Policy for custom domains is GA in Preview

The Content Security Policy (CSP) feature lets admins control which URLs may be linked to from customized sign-in and error pages in orgs that use custom domains. Admins add trusted URLs to Okta that link to items such as images and add these links to the code in their sign-in and error pages. This feature enhances security by enabling admins to allow only approved content to appear and prevent the introduction of potentially malicious code to these pages. See [Content Security Policy (CSP) for your custom domain](/docs/guides/custom-widget/main/#content-security-policy-csp-for-your-custom-domain). <!-- OKTA-600774 FF CONTENT_SECURITY_POLICY_FOR_CUSTOMIZABLE_SIGN_IN_AND_ERROR_PAGES -->

#### New mappings property for Policy API is EA in Preview

A new `mappings` property is available for the `links` object in  `GET /api/v1/policies/${policyId}` and `GET /api/v1/policies?type=${type}` responses. This property displays links to policy mappings. See [Policy API](/docs/reference/api/policy/#links-object). <!-- OKTA-637310 -->

#### AAL values for Login.gov IdP

The [Login.gov IdP configuration](/docs/guides/add-logingov-idp/main/#create-an-identity-provider-in-okta) has been updated to include all allowed AAL values. <!-- OKTA-673125 -->

#### Externally signed org AS access tokens

Access tokens returned from the org authorization server are now signed using the externally published signing key. These access tokens must still be treated as opaque strings and not be validated or consumed by any application other than Okta. <!-- OKTA-694170 -->

#### Support case management for admins is GA in Preview

Super admins can now assign the **View, create, and manage Okta support cases** permission and Support Cases resource to a custom admin role. This allows delegated admins to manage the support cases that they've opened. See [About role permissions](https://help.okta.com/okta_help.htm?type=oie&id=csh-about-role-permissions). <!-- OKTA-700229 -->

#### Realms for Workforce

Realms allows you to unlock greater flexibility in managing and delegating management of your distinct user populations within a single Okta org. See the [Realms](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Realm) and [Realm Assignments](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/RealmAssignment) APIs. <!-- OKTA-702163 -->

#### Enhanced app API contracts

Okta has API documentation on creating instances of custom apps. Yet, it doesn't fully describe the app metadata required for features such as SSO and provisioning for apps installed from the Okta Integration Network (OIN). In an effort to improve the API for apps in the OIN, new app metadata contracts have been added to the Okta management API. Operators and developers can programmatically create instances of popular OIN apps in their ecosystem and set up the provisioning connection. See [Set up an app provisioning connection](/docs/guides/app-provisioning-connection/main/). <!-- OKTA-703567 -->


#### Bugs fixed in 2024.03.0

* Okta required a `sharedSecret` length of 16 characters when enrolling a Google Authenticator using the Factors API. Okta now accepts `sharedSecret` lengths between 16 and 32 characters. (OKTA-654920)

* Some group claims failed if Okta Expression Language was used. (OKTA-660870)

* An inline hook secured by an OAuth 2.0 token that had no expiry value returned an HTTP 400 Bad Request error. (OKTA-702184)

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
| [Bug fixed in 2024.02.1](#bug-fixed-in-2024-02-1) | February 14, 2024 |

#### HTTP header filter

To improve the security of your org, Okta now filters and encodes any illegal unicode characters for outgoing HTTP headers. <!-- OKTA-694896 -->

#### Bug fixed in 2024.02.1

The List all enrolled Factors endpoint (`GET /api/v1/users/{userId}/factors`) returned an incorrectly prefixed ID for SMS factors with a PENDING ACTIVATION status. (OKTA-690496)

### Monthly release 2024.02.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Assign admin roles to an app](#assign-admin-roles-to-an-app)| June 14, 2023 |
| [DPoP support for Okta management APIs is GA in Production](#dpop-support-for-okta-management-apis-is-ga-in-production) | December 13, 2023 |
| [New attribute to manage SAML app session lifetimes is EA in Preview](#new-attribute-to-manage-saml-app-session-lifetimes-is-ea-in-preview) | February 7, 2024 |
| [New function for email templates is EA in Preview](#new-function-for-email-templates-is-ea-in-preview) | February 7, 2024 |
| [POST requests now allowed to the logout endpoint](#post-requests-now-allowed-to-the-logout-endpoint) | February 7, 2024 |
| [Seamless ISV experience is GA in Production](#seamless-isv-experience-is-ga-in-production) | January 10, 2024 |
| [Developer documentation update in 2024.02.0](#developer-documentation-update-in-2024-02-0) | February 7, 2024 |
| [Bugs fixed in 2024.02.0](#bugs-fixed-in-2024-02-0) | February 7, 2024 |

#### Assign admin roles to an app

Orgs can now assign admin roles to their custom API Service Integrations. Apps with assigned admin roles are constrained to the permissions and resources that are included in the role assignment. This helps ensure that apps only have access to the resources that are needed to perform their tasks and improves orgs' overall security. See [Work with the admin component](https://help.okta.com/okta_help.htm?type=oie&id=ext-work-with-admin). <!-- OKTA-659638 CLIENT_AS_PRINCIPAL -->

#### DPoP support for Okta management APIs is GA in Production

You can now use OAuth 2.0 Demonstrating Proof-of-Possession (DPoP) access tokens to access Okta management APIs. See [Configure OAuth 2.0 Demonstrating Proof-of-Possession](/docs/guides/dpop/oktaresourceserver/main/). <!-- OKTA-673922 OKTA_RESOURCE_SERVER_DPOP_SUPPORT-->

#### New attribute to manage SAML app session lifetimes is EA in Preview

The `samlAssertionLifetimeSeconds` parameter is an optional SAML parameter that allows the IdP to control the session at the SP. This parameter allows users to add `samlAssertionLifetimeSeconds` as an attribute in the SAML assertion to control the session lifetimes of SP apps using the Okta IdP. See the [Settings table](/docs/reference/api/apps/#settings-9) in the **Add custom SAML application** section. <!-- OKTA-690479 SAML_ASSERTION_LIFETIME_SECONDS_ON_APPS_API -->

#### New function for email templates is EA in Preview

You can now use the `getTimeDiffHoursNow` function in each of the available email notification templates. If you want to add more locales when customizing email templates, you need to use this function instead of the `formatTimeDiffHoursNowInUserLocale` function. The new function returns only the time value in the specified unit. See [Enable additional locales](/docs/guides/custom-email/main/#enable-additional-locales). <!-- OKTA-683897 -->

#### POST requests now allowed to the logout endpoint

You can now access the `/oauth2/{id}/v1/logout` and `/oauth2/v1/logout` endpoints with a POST request. See [POST logout](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/OrgAS/#tag/OrgAS/operation/logoutWithPost). <!-- OKTA-649530 -->

#### Seamless ISV experience is GA in Production

Okta now provides a seamless ISV experience to optimize the [Okta Integration Network (OIN)](https://www.okta.com/integrations/) submission experience for SAML and OIDC integrations. This new experience enables independent software vendors (ISVs) to build and manually test their integration metadata before submission. This reduces the time needed for the OIN team to review and validate that the integration functions as intended, which shortens the time to publish in the OIN. This experience also incorporates communication processes in Salesforce, enabling improved collaboration internally within Okta teams and externally with ISVs. See [Publish an OIN integration](https://developer.okta.com/docs/guides/submit-app-overview/) overview and [Submit an SSO integration with the OIN Wizard](https://developer.okta.com/docs/guides/submit-oin-app/) guide. <!-- OKTA-663167 APP_MANIFESTS -->

#### Developer documentation update in 2024.02.0

* Instructions for [testing Okta REST APIs with Postman](/docs/reference/rest/) have been updated to provide OAuth 2.0 authentication set up and use. OAuth 2.0 is recommended to access Okta management APIs instead of the proprietary SSWS API token to ensure enhanced security.

  These instructions are now under **References** > **Test APIs with Postman**.

* The [Self-service registration](/docs/guides/oie-embedded-sdk-use-case-self-reg/) guide is now easier to read and quicker to complete. All flow diagrams have been updated so they are easier to follow, and configuration instructions now match the current Admin Console.

#### Bugs fixed in 2024.02.0

* Some `call` Factor enrollments were left in a pending activation state after enrollment or reset. (OKTA-649508)

* When users signed in with an external Identity Provider and the multiple matching users error occurred, they were redirected to the sign-in page instead of the error page. (OKTA-658717)

## January

### Weekly release 2024.01.2

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Content Security Policy for custom domains is EA in Preview](#content-security-policy-for-custom-domains-is-ea-in-preview)| January 31, 2024 |
| [IP restrictions on tokens](#ip-restrictions-on-tokens)| January 31, 2024 |
| [Bugs fixed in 2024.01.2](#bugs-fixed-in-2024-01-2) | January 31, 2024 |

#### Content Security Policy for custom domains is EA in Preview

The Content Security Policy (CSP) feature lets admins control which URLs may be linked to from customized sign-in and error pages in orgs that use custom domains. Admins add trusted URLs to Okta that link to items such as images and add these links to the code in their sign-in and error pages. This feature enhances security by enabling admins to allow only approved content to appear and prevent the introduction of potentially malicious code to these pages. See [Content Security Policy (CSP) for your custom domain](/docs/guides/custom-widget/main/#content-security-policy-csp-for-your-custom-domain). <!-- OKTA-600774 FF CONTENT_SECURITY_POLICY_FOR_CUSTOMIZABLE_SIGN_IN_AND_ERROR_PAGES -->

#### IP restrictions on tokens

Admins can specify allowlisted and blocklisted network zones for static, Single Sign-On Web System (SSWS) API tokens. This strengthens org security by letting them control where calls to Okta APIs can originate from. It also restricts attackers and malware from stealing SSWS tokens or replaying them outside of their IP range to gain unauthorized access. <!-- OKTA-689850 -->

#### Bugs fixed in 2024.01.2

* POST requests to the `/sessions/me/lifecycle/refresh` endpoint didn't return an updated session cookie. (OKTA-665452)

* System Log events for the access token, ID token, and user SSO grants didn't include `externalSessionId`. (OKTA-664370)

* System Log events for access token and ID token grants didn't include user attributes. (OKTA-674218)

### Monthly release 2024.01.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [DPoP support for Okta management APIs is GA in Preview](#dpop-support-for-okta-management-apis-is-ga-in-preview) | December 13, 2023 |
| [Read-only permission for admin role assignments is GA in Production](#read-only-permission-for-admin-role-assignments-is-ga-in-production) | November 8, 2023 |
| [Seamless ISV experience is GA in Preview](#seamless-isv-experience-is-ga-in-preview) | January 10, 2024 |
| [System Log events for IdP keystore operations](#system-log-events-for-idp-keystore-operations) | January 10, 2024 |
| [Updated RADIUS authentication prompts](#updated-radius-authentication-prompts) | January 10, 2024 |

#### DPoP support for Okta management APIs is GA in Preview

You can now use OAuth 2.0 Demonstrating Proof-of-Possession (DPoP) access tokens to access Okta management APIs.
See [Configure OAuth 2.0 Demonstrating Proof-of-Possession](/docs/guides/dpop/oktaresourceserver/main/). <!-- OKTA-673922 OKTA_RESOURCE_SERVER_DPOP_SUPPORT-->

#### Read-only permission for admin role assignments is GA in Production

Super admins can now assign the **View roles, resources, and admin assignments** permission to their delegated admins. This permission gives admins a read-only view of the admin roles, resource sets, and admin assignments in the org. See [About role permission](https://help.okta.com/okta_help.htm?type=oie&id=csh-about-role-permissions). <!-- OKTA-640563 IAM_READ_RESOURCES -->

#### Seamless ISV experience is GA in Preview

Okta now provides a seamless ISV experience to optimize the [Okta Integration Network (OIN)](https://www.okta.com/integrations/) submission experience for SAML and OIDC integrations. This new experience enables independent software vendors (ISVs) to build and manually test their integration metadata before submission. This reduces the time needed for the OIN team to review and validate that the integration functions as intended, which shortens the time to publish in the OIN.

This experience also incorporates communication processes in Salesforce, enabling improved collaboration internally within Okta teams and externally with ISVs. See [Publish an OIN integration](/docs/guides/submit-app-overview/) overview and [Submit an SSO integration with the OIN Wizard](/docs/guides/submit-oin-app/) guide. <!-- OKTA-663167  APP_MANIFESTS -->

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
