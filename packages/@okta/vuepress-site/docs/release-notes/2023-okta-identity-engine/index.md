---
title: Okta Identity Engine API Products release notes 2023
---

<ApiLifecycle access="ie" />

## March

### Weekly release 2023.03.2

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2023.03.2](#bugs-fixed-in-2023-03-2) | March 22, 2023 |

#### Bugs fixed in 2023.03.2

* In some cases, groups with a `status` of INACTIVE were synchronized with the reporting database as ACTIVE. (OKTA-589084)

* Requests to the Policies API (`PUT /policies/${defaultIdpPolicy}/rules/${IdpRule}`) with an empty `userIdentifier` parameter returned an HTTP 500 Internal Server error. (OKTA-565856)

* Admins were able to modify the `auth_time` claim for an access token using a token inline hook. (OKTA-503099)

### Weekly release 2023.03.1

| Change | Expected in Preview Orgs |
|------------------------------------------------------------------------------------------------------------------|---------------|
| [Demonstrating Proof-of-Possession is self-service EA in Preview](#demonstrating-proof-of-possession-is-self-service-ea-in-preview)                                                              |March 15, 2023 |
| [Bug fixed in 2023.03.1](#bug-fixed-in-2023-03-1)                                                              |March 15, 2023 |

#### Demonstrating Proof-of-Possession is self-service EA in Preview

OAuth 2.0 Demonstrating Proof-of-Possession (DPoP) is a security feature that adds an extra layer of protection to OAuth 2.0 access tokens. It enables the client to demonstrate that it possesses a particular key or secret associated with the access token. OAuth 2.0 DPoP can help prevent certain attacks, such as token theft or token replay attacks, where an attacker intercepts a legitimate access token and uses it to gain unauthorized access to a protected resource. See [Configure OAuth 2.0 Demonstrating Proof-of-Possession](/docs/guides/dpop/main/). <!--OKTA-585491-->

#### Bug fixed in 2023.03.1

Using the Policy API, admins were able to set the `MFA_ENROLL` policy factor settings to allow Okta Verify Push but not allow Okta Verify OTP at the same time. (OKTA-567906)

### Monthly release 2023.03.0

| Change | Expected in Preview Orgs |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| [Configurable rate limits for OAuth 2.0 apps is GA in Preview](#configurable-rate-limits-for-oauth-2-0-apps-is-ga-in-preview)                                 |March 08, 2023    |
| [Authenticator enrollment using the /authorize endpoint is GA in Production](#authenticator-enrollment-using-the-authorize-endpoint-is-ga-in-production)      |November 03, 2022 |
| [OIDC Identity Providers private/public key pair support is GA](#oidc-identity-providers-private-public-key-pair-support-is-ga)                               |June 08, 2022     |
| [API service integrations are GA in Preview](#api-service-integrations-are-ga-in-preview)                                                                     |November 03, 2022 |
| [Log Streaming is GA in Production](#log-streaming-is-ga-in-production)                                                                                       |March 30, 2022    |
| [Optional consent for OAuth 2.0 scopes is GA in Production](#optional-consent-for-oauth-2-0-scopes-is-ga-in-production)                                                   |January 11, 2023  |
| [OAuth 2.0 authentication for inline hooks is GA in Preview](#oauth-2-0-authentication-for-inline-hooks-is-ga-in-preview)                                     |October 05, 2023  |
| [Transactional verification with CIBA is GA in Preview](#transactional-verification-with-ciba-is-ga-in-preview)                                               |December 09, 2023 |
| [Improvements to self-service account activities for AD and LDAP users](#improvements-to-self-service-account-activities-for-ad-and-ldap-users)               |November 30, 2022 |
| [Honor force authentication support for SAML Apps API](#honor-force-authentication-support-for-saml-apps-api)                                                 |March 08, 2023    |
| [OIN Manager support for Workflow Connector submission is GA in Preview](#oin-manager-support-for-workflow-connector-submission-is-ga-in-preview)             |March 08, 2023    |
| [Rate limit increased for Event Hooks](#rate-limit-increased-for-event-hooks)                                                                                 |March 08, 2023    |
| [Bug fixed in 2023.03.0](#bug-fixed-in-2023-03-0)                                                                                                           |March 08, 2023    |

#### Configurable rate limits for OAuth 2.0 apps is GA in Preview

Rate limit violations mainly occur on authenticated endpoints. Currently, it isn't clear which OAuth 2.0 authenticated app consumes all the rate limits for an org. This increases the risk that one app consumes the entire rate limit bucket. To avoid this possibility, Okta admins can now configure how much rate limit capacity an individual OAuth 2.0 app can consume by editing the Application rate limits tab for each app. By setting a capacity on individual OAuth 2.0 apps, Okta admins have a new tool to monitor and investigate rate limit violations, and have the ability to view rate limit traffic generated by individual OAuth 2.0 apps. See [Rate limit dashboard bar graph](/docs/reference/rl-dashboard/#bar-graph). <!--OKTA-573387-->

#### Authenticator enrollment using the /authorize endpoint is GA in Production

Authenticator enrollment provides a standardized way for a user to enroll a new authenticator using the OAuth `/authorize` endpoint. This feature uses query parameters such as prompt and `enroll_amr_values` to specify which authenticator the user wants to enroll. It also automatically verifies at least two factors as long the user has already enrolled two or more factors. <!--OKTA-544671-->

#### OIDC Identity Providers private/public key pair support is GA

Previously, Okta only supported the use of client secret as the client authentication method with an OpenID Connect-based Identity Provider. Okta now supports the use of private/public key pairs (`private_key_jwt`) with OpenID Connect-based Identity Providers. Additionally, the Signed Request Object now also supports the use of private/public key pairs. See [Create an Identity Provider in Okta](/docs/guides/add-an-external-idp/openidconnect/main/#custom-okta-hosted-sign-in-page). <!--OKTA-573913-->

#### API service integrations are GA in Preview

A service-to-service app where a backend service or a daemon calls Okta management APIs for a tenant (Okta org) can be published in the Okta Integration Network (OIN) as an API service integration. This integration type allows your service app to access your customer Okta org through Okta management APIs using the OAuth 2.0 Client Credentials flow. API service integrations provide secure, reliable, and least-privilege scoped access to Okta APIs without being associated with a user, so service isn’t disrupted when the user is no longer involved with service integration activities. See [API service integrations in the OIN](/docs/guides/oin-api-service-overview/). OIN Manager has been updated to support testing and submitting API service integrations. After your service integration is published in the OIN, workforce customers can discover and configure your integration with ease. See [Build an API service integration](/docs/guides/build-api-integration/main/). <!--OKTA-577514-->

#### Log Streaming is GA in Production

Many organizations use third-party systems to monitor, aggregate, and act on the event data in Okta System Log events.

Log Streaming enables Okta admins to more easily and securely send System Log events to a specified systems, such as the Splunk Cloud or Amazon Eventbridge, in near real time with simple, pre-built connectors. Log streaming scales well even with high event volume, and unlike many existing System Log event collectors, it doesn't require a third-party system to store an Okta Admin API token. See [Log Streaming API](/docs/reference/api/log-streaming/). <!--OKTA-578532-->

#### Optional consent for OAuth 2.0 scopes is GA in Production

OAuth 2.0 Optional consent provides an optional property that enables a user to opt in or out of an app's requested OAuth scopes. When optional is set to true for a scope, the user can skip consent for that scope. See [Request user consent](/docs/guides/request-user-consent/main/). <!--OKTA-581292-->

#### OAuth 2.0 authentication for inline hooks is GA in Preview

Okta inline hook calls to third-party external web services previously provided only header-based authentication for security. Although sent with SSL, the header or custom header authentication didn’t meet more stringent security requirements for various clients and industries.

To improve the security of inline hooks, Okta now supports authentication with OAuth 2.0 access tokens. Tokens ensure secure calls to external web services.

When creating inline hooks in the Admin Console (or by API), administrators or developers can now select OAuth 2.0 authentication and choose between two methods of OAuth 2.0: Client Secret or Private Key. A new Key Management API and Admin Console page is also available to create public/private key pairs for use with OAuth 2.0 inline hooks. See [Key management](https://help.okta.com/okta_help.htm?type=oie&id=ext-key-management).

Using the OAuth 2.0 framework provides better security than Basic Authentication or custom headers, and is less work than setting up an IP allowlisting solution. Clients also have the ability to use access tokens minted by their own custom authorization servers to guarantee that Okta is calling their client web services and isn't triggered by any external actors. See [Add an inline hook](https://help.okta.com/okta_help.htm?type=oie&id=ext-add-inline-hook). <!--OKTA-581803-->

#### Transactional verification with CIBA is GA in Preview

Organizations are constantly looking for ways to offer a frictionless user experience without compromising security. It becomes even more challenging when the users try to perform sensitive transactions. Okta uses Client-Initiated Backchannel Authentication (CIBA) to provide customers with a simple and secure transaction verification solution.

CIBA extends OpenID Connect to define a decoupled flow where the authentication or transaction flow is initiated on one device and verified on another. The device in which the transaction is initiated by the OIDC application is called the consumption device and the device where the user verifies the transaction is called the authentication device. See [Transactional verification using CIBA](/docs/guides/configure-ciba/main/). <!--OKTA-584442-->

#### Improvements to self-service account activities for AD and LDAP users

Previously, the self-service unlock (SSU) and self-service password reset (SSPR) flows created unnecessary friction for AD and LDAP users. This feature enhancement introduces a seamless magic link experience in emails sent to unlock accounts and reset passwords. Users no longer need to provide consent when using the same browser. In addition, after successfully unlocking their account, clicking the email magic link counts towards the application's assurance policy. After the assurance requirements are met, the user is signed directly in to the application. These improvements are now GA in Preview. See [Customize email notifications](/docs/guides/custom-email/main/#use-vtl-variables). <!--OKTA-584526-->

#### Honor force authentication support for SAML Apps API

Previously, the **Honor Force Authentication** parameter (`honorForceAuthn`) could only be set from the [SAML 2.0 App Integration Wizard](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-aiw-saml). When this property is set to `true`, users are prompted for their credentials when a SAML request has the `ForceAuthn` attribute set to `true`. You can now set this property for your SAML app without using the app integration wizard. See the [SAML 2.0 settings parameters in the Apps API](/docs/reference/api/apps/#add-saml-2-0-authentication-application). <!--OKTA-550077-->

#### OIN Manager support for Workflow Connector submission is GA in Preview

Okta [Workflows](https://www.okta.com/platform/workflows/) is a no-code, if-this-then-that logic builder that Okta orgs can use to automate custom or complex employee onboarding and offboarding flows in your application. You can now publish Workflow connectors that you create with the [Workflows Connector Builder](https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder) in the Okta Integration Network (OIN) catalog. Publishing a Workflows connector with Okta allows your customers to deeply integrate your product with all other connectors in the catalog. Submit your Workflow connector by using the OIN Manager. See [Submit an integration](/docs/guides/submit-app/wfconnector/main/#submit-an-integration) for Workflows connectors. <!--OKTA-571943 & OKTA-573202-->

#### Rate limit increased for Event Hooks

The number of events that can be delivered to Event Hooks is now 400,000 events per org, per day. See [Rate limits](https://developer.okta.com/docs/concepts/event-hooks/#rate-limits). <!--OKTA-573847-->

#### Bug fixed in 2023.03.0

When an admin used a group limit in an expression that was greater than 100 (for example, `Groups.startsWith("active_directory","",500)` ), /userinfo endpoint requests failed. (OKTA-576414)

## February

### Weekly release 2023.02.2

| Change | Expected in Preview Orgs |
|------------------------------------------------------------------------------------------------------------------|---------------|
| [Bugs fixed in 2023.02.2](#bugs-fixed-in-2023-02-2)                                                              |March 02, 2023 |

#### Bugs fixed in 2023.02.2

* Some event hook requests failed to send in Preview orgs. (OKTA-578439)

* Events weren't logged in the System Log when the Users API (`DELETE /users/${userId}/clients/${clientId}/tokens/${tokenId}`) was used to revoke refresh tokens. (OKTA-574992)

* During an app request to the `/authorize` endpoint, users not assigned to the app could enroll an authenticator. (OKTA-575258)

* Pagination and search query matching didn't work as expected when a list request was made using the `/idps` API. (OKTA-577464)

* Some non-super admins could manage group memberships of admin groups with custom roles. (OKTA-577807)

### Weekly release 2023.02.1

| Change | Expected in Preview Orgs |
|------------------------------------------------------------------------------------------------------------------|-----------------|
| [Bugs fixed in 2023.02.1](#bugs-fixed-in-2023-02-1)                                                              |February 15, 2023 |

#### Bugs fixed in 2023.02.1

* A request to list all security questions (`/users/${userId}/factors/questions`) returned an unexpected question with an error in the response. (OKTA-525478)

* Case sensitivity caused usernames sent in SAML 2.0 IdP assertions not to match usernames in the destination org if a custom IdP factor was used and the name ID format was unspecified. (OKTA-565984)

* Some requests to the `/devices?expand=users&search=profile.platform` endpoint didn't include `expand=user` in the response. (OKTA-558994)

* Some users weren’t able to re-enroll an account in Okta Verify that was previously unenrolled with another mechanism that used the Factors API. (OKTA-573421)

* The YubiKey Report wasn’t generated when certain report filters were applied. (OKTA-561269)

### Monthly release 2023.02.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Allow list for FIDO2 (WebAuthn) authenticators is Self-Service EA in Preview](#allow-list-for-fido2-webauthn-authenticators-is-self-service-ea-in-preview) | January 19, 2023 |
| [Applications API support for SAML metadata attributes](#applications-api-support-for-saml-metadata-attributes) | February 8, 2023 |
| [Authenticator enrollment using the /authorize endpoint is GA in Preview](#authenticator-enrollment-using-the-authorize-endpoint-is-ga-in-preview) | November 3, 2022 |
| [Custom app login is GA in Production](#custom-app-login-is-ga-in-production) | January 11, 2023 |
| [Factors API support for Okta Verify authenticator enrollment flows is GA in Production](#factors-api-support-for-okta-verify-authenticator-enrollment-flows-is-ga-in-production) | October 5, 2022 |
| [Full-featured code editor is GA in Production](#full-featured-code-editor-is-ga-in-production) | February 8, 2023 |
| [Log Streaming is GA in Preview](#log-streaming-is-ga-in-preview) | March 30, 2022 |
| [Multibrand customizations are EA in Preview](#multibrand-customizations-are-ea-in-preview) | February 8, 2023 |
| [OAuth 2.0 On-Behalf-Of Token Exchange is EA in Preview](#oauth-2-0-on-behalf-of-token-exchange-is-ea-in-preview) | February 8, 2023 |
| [OIDC Identity Providers private/public key pair support is GA in Preview](#oidc-identity-providers-private-public-key-pair-support-is-ga-in-preview) | June 8, 2022 |
| [Optional consent for OAuth 2.0 scopes is GA in Preview](#optional-consent-for-oauth-2-0-scopes-is-ga-in-preview) | January 11, 2023 |
| [Smart Card authenticator is Self-Service EA in Preview](#smart-card-authenticator-is-self-service-ea-in-preview) | January 19, 2023 |
| [Splunk edition support for Log Streaming integrations is GA in Preview](#splunk-edition-support-for-log-streaming-integrations-is-ga-in-preview) | February 8, 2023 |
| [Updated AWS EventBridge supported regions for Log Stream integrations](#updated-aws-eventbridge-supported-regions-for-log-stream-integrations) | February 8, 2023 |
| [Developer documentation updates in 2023.02.0](#developer-documentation-updates-in-2023-02-0) | February 8, 2023 |
| [Bugs fixed in 2023.02.0](#bugs-fixed-in-2023-02-0) | February 8, 2023 |

#### Allow list for FIDO2 (WebAuthn) authenticators is Self-Service EA in Preview

Okta now enables you to mange which FIDO2 WebAuthn authenticators are allowed in your org for new enrollments. This feature allows you to create an allow list of specific FIDO2 WebAuthn authenticators (based on FIDO Metadata Service) that can be used in enrollment policies. This allows admins to have greater control over which authenticators may be used in their orgs and determine which users may access them in a granular way.  See `settings.authenticators.constraints` in the `MFA_ENROLL` [Policies API](/docs/reference/api/policy/#policy-authenticator-object). <!--OKTA-559662-->

#### Applications API support for SAML metadata attributes

The Applications API now supports metadata dynamic SAML attributes inherited from the SAML app. The SAML attributes are used to manage configured group attributes.The Admin Console displays the dynamic SAML attributes as **Configure SAML Attributes**, and the API returns these attributes as the `settings.signOn.configuredAttributeStatements` property in the [SAML application object](/docs/reference/api/apps/#add-saml-2-0-authentication-application). <!--OKTA-573057,OKTA-549695-->

#### Authenticator enrollment using the /authorize endpoint is GA in Preview

Authenticator enrollment provides a standardized way for a user to enroll a new authenticator using the OAuth `/authorize` endpoint. This feature uses query parameters such as prompt and `enroll_amr_values` to specify which authenticator the user wants to enroll. It also automatically verifies at least two factors as long the user has already enrolled two or more factors. <!--OKTA-572026-->

#### Custom app login is GA in Production

Custom app login is now available to limited customers in Identity Engine. Only orgs that actively used this feature in Classic Engine before they upgraded may continue to do so. Orgs that don't use custom app login should continue to use the [Okta-hosted sign-in experience](/docs/guides/redirect-authentication/) or [configure IdP routing rules](https://help.okta.com/okta_help.htm?type=oie&id=ext-cfg-routing-rules) that redirect users to the appropriate app to sign in. <!--OKTA-561569-->

#### Factors API support for Okta Verify authenticator enrollment flows is GA in Production

Identity Engine now supports Okta Verify enrollments with email or SMS links created from the Factors API. Previously, when a client generated an Okta Verify enrollment email or SMS link using the Factors API, the enrollment from the Okta Verify app failed with an `Invalid Token` error. To address this issue, Factors API updates include the following behaviors when the Okta Verify authenticator is used:

* When an Okta Verify enrollment request is made using the Factors API for a user not currently enrolled with an Okta Verify factor, then all three `signed_nonce`, `push`, and `totp` factors are enrolled.
* The GET factors operation lists all Okta Verify enrollment methods for a user.
* The DELETE `push` or `signed_nonce` factor operation deletes all three factor enrollments (`push`, `signed_nonce`, and `totp`).

See [Enroll Okta Verify Push](/docs/reference/api/factors/#enroll-okta-verify-push-factor) and [Reset Factor](/docs/reference/api/factors/#reset-factor) updates in the Factors API. <!--OKTA-568807-->

#### Full-featured code editor is GA in Production

The full-featured code editor makes editing code for the sign-in page, email templates, and error pages more efficient and less reliant on documentation. Developers can write, test, and publish code faster with syntax highlighting, autocomplete for variables, split versus unified diff views, and **Revert**, **Preview**, and **Publish** buttons. See [Use the code editor](/docs/guides/custom-widget/main/#use-the-code-editor). <!--OKTA-568606-->

#### Log Streaming is GA in Preview

Many organizations use third-party systems to monitor, aggregate, and act on the event data in Okta System Log events.

Log Streaming enables Okta admins to more easily and securely send System Log events to a specified systems, such as the Splunk Cloud or Amazon Eventbridge, in near real time with simple, pre-built connectors. Log streaming scales well even with high event volume, and unlike many existing System Log event collectors, it doesn't require a third-party system to store an Okta Admin API token. See [Log Streaming API](/docs/reference/api/log-streaming/). <!--OKTA-565478-->

#### Multibrand customizations are EA in Preview

Multibrand customizations allow customers to use one org to manage multiple brands and multiple custom domains. This drastically simplifies multi-tenant architectures where customers create multiple orgs to satisfy branding requirements. Multibrand customizations allow orgs to create up to three custom domains (more upon request), which can be mapped to multiple sign-in pages, multiple sets of emails, error pages, and multiple versions of the End-User Dashboard. See [Brands](/docs/concepts/brands/). <!--OKTA-568831, OKTA-568807-->

#### OAuth 2.0 On-Behalf-Of Token Exchange is EA in Preview

OAuth 2.0 On-Behalf-Of Token Exchange helps retain the user context in requests to downstream services. It provides a protocol approach to support scenarios where a client can exchange an access token received from an upstream client with a new token by interacting with the authorization server. See [Set up OAuth 2.0 On-Behalf-Of Token Exchange](/docs/guides/set-up-token-exchange/main/). <!--OKTA-572343-->

#### OIDC Identity Providers private/public key pair support is GA in Preview

Previously, Okta only supported the use of client secret as the client authentication method with an OpenID Connect-based Identity Provider. Okta now supports the use of private/public key pairs (`private_key_jwt`) with OpenID Connect-based Identity Providers. Additionally, the Signed Request Object now also supports the use of private/public key pairs. See [Create an Identity Provider in Okta](/docs/guides/add-an-external-idp/openidconnect/main/#create-an-identity-provider-in-okta). <!--OKTA-573913-->

#### Optional consent for OAuth 2.0 scopes is GA in Preview

OAuth 2.0 Optional Consent provides an optional property that enables a user to opt in or out of an app's requested OAuth scopes. When optional is set to true for a scope, the user can skip consent for that scope. See [Request user consent](/docs/guides/request-user-consent/). <!--OKTA-571987-->

#### Smart Card authenticator is Self-Service EA in Preview

You can add a new Smart Card authenticator that enables PIV to be used in authentication policies. You can also restrict the authentication policies to use only Smart Card authenticator as MFA. See `properties.additionalAmr` in the updated [Identity Provider attributes](/docs/reference/api/idps/#identity-provider-attributes) for `X509` Smart Card support. <!--OKTA-565169, OKTA-565875-->

#### Splunk edition support for Log Streaming integrations is GA in Preview

The Spunk Cloud Log Streaming integration now supports GCP and GovCloud customers. You can set the Splunk edition parameter (`settings.edition`) to AWS (`aws`), GCP (`gcp`), or AWS GovCloud (`aws_govcloud`) in your Log Streaming integration. See [Splunk Cloud Settings properties](/docs/reference/api/log-streaming/#splunk-cloud-settings-properties). <!--OKTA-544449-->

#### Updated AWS EventBridge supported regions for Log Stream integrations

The list of supported AWS EventBridge regions has been updated based on configurable event sources. See the [list of available AWS regions for Log Stream integrations](/docs/reference/api/log-streaming/#property-details-2). <!--OKTA-573094-->

#### Developer documentation updates in 2023.02.0

* The Okta Developer portal has a new look and feel. The [home page](https://developer.okta.com/) features a curated set of resources on developer use cases for Workforce Identity Cloud solutions. You can also access the featured blog posts to stay up to date with implementing Okta features.

* A new authorization guide is available to help admins and devs retain the user context in requests to downstream services. This document  provides guidance on how a client can exchange an access token received from an upstream client with a new token by interacting with the authorization server. See [Set up OAuth 2.0 On-Behalf-Of Token Exchange](/docs/guides/set-up-token-exchange/main/).

* A new requirements guide is available for integration submissions to the Okta Integration Network (OIN). This document provides guidance for the artifacts required during the submission process, such as the logo, the customer configuration document, and the test account. See [OIN submission requirements](/docs/guides/submit-app-prereq/).

#### Bugs fixed in 2023.02.0

* GET requests to the `/brands/{brandId}` endpoint didn't return the previously saved `agreeToCustomPrivacyPolicy`. (OKTA-568074)

* GET requests to the `/brands/{brandId}/pages/sign-in/customized` endpoint returned `null` for `widgetCustomizations`. As a result, the updates weren't applied to the Okta Admin Console sign-in page. (OKTA-563838)

* The Add Group API (`/api/v1/groups`) created multiple groups of the same name if called within a short period of time (milliseconds). (OKTA-561481)

* The response took longer than necessary when an admin sent a request to delete an OpenID Connect app. (OKTA-531089)

* The Roles API (`/iam/roles`) didn't support the self and next link relation types. (OKTA-512280)

## January

### Weekly release 2023.01.2

| Change | Expected in Preview Orgs |
|------------------------------------------------------------------------------------------------------------------|-----------------|
| [Clock skew for access and ID tokens](#clock-skew-for-access-and-id-tokens)                                      |February 1, 2023 |
| [Content Security Policy update](#content-security-policy-update)                                                |February 1, 2023 |
| [Interaction Code flow supports Native SSO](#interaction-code-flow-supports-native-sso)                          |February 1, 2023 |
| [Bugs fixed in 2023.01.2](#bugs-fixed-in-2023-01-2)                                                              |February 1, 2023 |

#### Clock skew for access and ID tokens

A 30-second clock skew is now allowed for access and ID tokens to validate that a token was created before the current time. <!--OKTA-538956 -->

#### Content Security Policy update

Over the next few months, we are gradually releasing enhancements to our [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) headers. During this time you may notice an increase in header sizes. <!--OKTA-567669-->

#### Interaction Code flow supports Native SSO

The Interaction Code flow now supports the `device_sso` scope, which you can use to perform Native SSO. This scope allows you to obtain an interaction code and exchange it for tokens and a device secret. See [Implement authorization by grant type](https://developer.okta.com/docs/guides/implement-grant-type/interactioncode/main/). <!--OKTA-551724 -->

#### Bugs fixed in 2023.01.2

* Requests made with an empty Origin header returned an error response. (OKTA-449621)

* Requests to assign a custom role to a user or group returned a generic Bad Request error when the required role or resource-set property was missing. (OKTA-538237)

* Some custom admins didn't see groups and users that they had access to when they made a `GET` request to the Users (`/users/{id}/groups`) and Groups (`/groups/{id}/users`) APIs. (OKTA-568838)

* Users created using Just-In-Time provisioning weren't assigned to a group when a group rule existed. (OKTA-532840)

* An unclear error message was returned when a group rules API call (`create`, `update`, or `activate`) was made to assign users to read-only groups (for example, `Everyone`). (OKTA-567972)

### Weekly release 2023.01.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2023.01.1](#bugs-fixed-in-2023-01-1)                      |January 19, 2023          |

#### Bugs fixed in 2023.01.1

* Requests failed when an admin used a group limit in an expression that was more than 100 (for example, `getFilteredGroups(groupallowlist, group_expression, 101)`). (OKTA-565041)

* Requests failed when an admin used a group limit in an expression that was less than the number of groups that satisfied the request (for example, `Groups.startsWith("active_directory","eai_",10)`). (OKTA-556056)

* The `idp` property was missing in token inline hook requests. (OKTA-553322)

* A list security questions request (`/users/${userId}/factors/questions`) resulted in an unexpected security question and answer included in the response. (OKTA-567970)

* Users could request that one-time passwords for SMS, Voice, and Email activation be resent more times than allowed by the rate limit. (OKTA-550739)

### Monthly release 2023.01.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Custom app login](#custom-app-login) | January 11, 2023 |
| [Full regional support for AWS EventBridge Log Stream integrations is EA in Preview](#full-regional-support-for-aws-eventbridge-log-stream-integrations-is-ea-in-preview) | January 11, 2023 |
| [Improvements to self-service account activities for AD and LDAP users](#improvements-to-self-service-account-activities-for-ad-and-ldap-users) | November 30, 2022 |
| [Improvements to the self-service registration experience](#improvements-to-the-self-service-registration-experience) | December 9, 2022 |
| [Optional consent for OAuth 2.0 scopes is EA in Preview](#optional-consent-for-oauth-2-0-scopes-is-ea-in-preview) | January 11, 2023 |
| [Revoke user sessions is GA in Production](#revoke-user-sessions-is-ga-in-production) | December 9, 2022 |
| [Unusual telephony requests blocked by machine-learning measures](#unusual-telephony-requests-blocked-by-machine-learning-measures) | January 11, 2023 |
| [Bugs fixed in 2023.01.0](#bugs-fixed-in-2023-01-0) | January 11, 2023 |

#### Custom app login

Custom app login is now available to limited customers in Identity Engine. Only orgs that actively used this feature in Classic Engine before they upgraded may continue to do so. Orgs that don't use custom app login should continue to use the [Okta-hosted sign-in experience](/docs/guides/redirect-authentication/) or [configure IdP routing rules](https://help.okta.com/okta_help.htm?type=oie&id=ext-cfg-routing-rules) that redirect users to the appropriate app to sign in. <!-- OKTA-564039-->

#### Full regional support for AWS EventBridge Log Stream integrations is EA in Preview

The Log Streaming API has expanded support for all commercial regions in the AWS EventBridge Log Stream integration. See [AWS EventBridge Setting property details](/docs/reference/api/log-streaming/#property-details-2). <!-- OKTA-540378-->

#### Improvements to self-service account activities for AD and LDAP users

Previously, the self-service unlock (SSU) and self-service password reset (SSPR) flows created unnecessary friction for AD and LDAP users. This feature enhancement introduces a seamless magic link experience in emails sent to unlock accounts and reset passwords. Users no longer need to provide consent when using the same browser. In addition, after successfully unlocking their account, clicking the email magic link counts towards the application's assurance policy. After the assurance requirements are met, the user is signed directly in to the application. These improvements are now GA in Preview. See [Customize email notifications](/docs/guides/custom-email/main/#use-vtl-variables). <!-- OKTA-561486-->

#### Improvements to the self-service registration experience

Earlier versions of the self-service registration (SSR) flow used a complicated array of templates to send activation emails to users. The simplified SSR flow reduces this to only two email templates with customized welcome messages. If your application requires immediate verification of the user’s email address, use the **Registration - Activation** template. This template includes a magic link for a smoother sign-in experience. If email verification is not immediately required to sign in to the application, use the **Registration - Email Verification** template. This template includes a link for users to complete email verification at any time after they successfully sign in to the application. See [Customize email notifications](/docs/guides/custom-email/main/) and the [Okta email (magic link/OTP) integration guide](/docs/guides/authenticators-okta-email/aspnet/main/). <!-- OKTA-497136 & 499523-->

#### Optional consent for OAuth 2.0 scopes is EA in Preview

OAuth 2.0 Optional Consent provides an optional property that enables a user to opt in or out of an app's requested OAuth scopes. When optional is set to true for a scope, the user can skip consent for that scope. See [Request user consent](/docs/guides/request-user-consent/). <!-- OKTA-563884-->

#### Revoke user sessions is GA in Production

You can end all Okta sessions for a user when resetting their password. All sessions of the specified user are revoked except for the current session. This option protects the user account from unauthorized access. See the `revokeSession` parameter in the [Users API](/docs/reference/api/users/#change-password). <!-- OKTA-542646-->

#### Unusual telephony requests blocked by machine-learning measures

SMS and voice requests are now blocked if an internal machine-learning-based toll fraud and abuse-detection model considers the requests unusual. Telephony requests that are blocked by the machine-learning model have a `DENY` status in the System Log. <!-- OKTA-562110-->

#### Bugs fixed in 2023.01.0

* The Log Streaming API returned the Splunk Cloud `token` property in the response body. (OKTA-437264)

* When an org had the Custom OTP, RSA SecurID, and YubiKey authenticators enabled and the `enroll_amr_values` parameter value was `otp`, users were prompted to enroll in all three authenticators rather than just Custom OTP. (OKTA-545674)

