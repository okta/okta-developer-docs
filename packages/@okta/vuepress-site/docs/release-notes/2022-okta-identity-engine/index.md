---
title: Okta Identity Engine API Products release notes 2022
---

<ApiLifecycle access="ie" />

## December

### Weekly release 2022.12.3

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2022.12.3](#bug-fixed-in-2022-12-3)                       |January 5, 2023           |

#### Bug fixed in 2022.12.3

An error occurred if a request was made to the `/authorize` endpoint of a custom authorization server and the `prompt` parameter value was set to `enroll_authenticator`. (OKTA-552063)

### Weekly release 2022.12.2

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.12.2](#bugs-fixed-in-2022-12-2)                      |December 21, 2022            |

#### Bugs fixed in 2022.12.2

* Attempts to save sign-in page edits sometimes failed when using the full-feature code editor. (OKTA-551632)

* If an admin added a redirect URI that reached the character limit, then they couldn't edit the redirect URI list using the Apps API.  (OKTA-476668)

* When an admin viewed a user's profile, an error sometimes occurred. (OKTA-558220)

### Weekly release 2022.12.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.12.1](#bugs-fixed-in-2022-12-1)                      |December 14, 2022            |

#### Bugs fixed in 2022.12.1

* A List Users API call made with a search parameter didn’t return deactivated users with a `login` property that started with the Okta User `id`. (OKTA-537805)

* When a custom app used the `/sso/idps/{idpId}` endpoint for IdP routing with a `login_hint` parameter, the `login_hint` was ignored. (OKTA-549212)

### Monthly release 2022.12.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Preview the token inline hook](#preview-the-token-inline-hook)                       | December 9, 2022         |
| [Revoke user sessions is GA in Preview](#revoke-user-sessions-is-ga-in-preview)                       | December 9, 2022         |
| [Step-up authentication using ACR values is GA in Prod](#step-up-authentication-using-acr-values-is-ga-in-prod)                       | August 31, 2022         |
| [Redirect added to end of sign-in flow](#redirect-added-to-end-of-sign-in-flow)                       | December 9, 2022         |
| [Loading Page Animation feature for the Brands API is GA in Production](#loading-page-animation-feature-for-the-brands-api-is-ga-in-production)                       | July 7, 2022         |
| [Rate limit parameter matching](#rate-limit-parameter-matching)                       | December 9, 2022         |
| [Improvements to the sign-in experience](#improvements-to-the-sign-in-experience)                       | November 3, 2022         |
| [Improvements to the self-service registration experience](#improvements-to-the-self-service-registration-experience)                       | July 7, 2022         |
| [Manage embedded widget sign-in support is GA in Prod](#manage-embedded-widget-sign-in-support-is-ga-in-prod)                       | October 5, 2022         |
| [Bugs fixed in 2022.12.0](#bugs-fixed-in-2022-12-0)                       | December 9, 2022         |

#### Preview the token inline hook

Before implementing a token inline hook, you can now preview the hook request and the external-service response in the Admin Console. This feature aids in the development and testing of inline hooks before releasing to a production environment. In the Admin Console, click **Preview** from the **Actions** menu or the **Preview** tab for the individual hook to preview the token inline hook call. See [Preview an inline hook](https://help.okta.com/okta_help.htm?type=oie&id=ext-preview-inline-hooks) and [Preview and test the token inline hook](/docs/guides/token-inline-hook/nodejs/main/#preview-and-test-the-token-inline-hook). <!-- OKTA-546727-->

#### Revoke user sessions is GA in Preview

You can end all Okta sessions for a user when resetting their password. All sessions of the specified user are revoked except for the current session. This option protects the user account from unauthorized access. See the `revokeSession` parameter in the [Users API](/docs/reference/api/users/#change-password). <!-- OKTA-542645-->

#### Step-up authentication using ACR values is GA in Prod

Users want seamless access to certain resources, but organizations want to increase the users' level of assurance before they access anything sensitive. It’s difficult to strike a balance between implementing stronger security controls and offering a frictionless experience for your users to easily interact with an application. Okta now supports the acr_values parameter, which refers to Authentication Context Class Reference. Each value defines a specific set of assurance level requirements that the protected resource requires from the authentication event associated with the access and ID tokens. See [Step-up authentication](/docs/guides/step-up-authentication/main/) using ACR values. <!-- OKTA-552809-->

#### Redirect added to end of sign-in flow

When an authentication flow begins at an org's Okta or custom domain and then finishes with a callback from an external Identity Provider to a custom or Okta domain, another redirect is now performed to get the browser to the original domain where the flow began. This enables the browser to then send the same device token in the callback that was used in the first request. <!-- OKTA-553160-->

#### Loading Page Animation feature for the Brands API is GA in Production

When redirecting applications, you can use the loading page variant property (`loadingPageTouchPointVariant`) of the [Brands API](/docs/reference/api/brands/#theme-object) to display a blank page instead of the default Okta loading page animation. As a result, Okta's branding doesn't appear anywhere in the redirect user journey. <!-- OKTA-552673-->

#### Rate limit parameter matching

The Rate Limit dashboard in the Admin Console now supports parameter matching for API endpoints. This update provides more granular rate limit information for endpoints that include a query of the form `?{parameter}=*`. See [Rate limit dashboard](/docs/reference/rl-dashboard/#apis-table). <!-- OKTA-559269-->

#### Improvements to the sign-in experience

When users create an account using the "Sign Up" link in the Sign-In Widget, they enter their first and family names along with their email address on the first page. The next step of the Sign-In Widget displays the authenticators page, where users enter a password and configure any other mandatory authenticators. To streamline the sign-up process, the Self-Service Registration with Password feature allows you to configure the enrollment form to show the password entry on the first page instead. See [Collect profile information and register users](https://help.okta.com/okta_help.htm?type=oie&id=csh-email-verification). <!-- OKTA-551456-->

#### Improvements to the self-service registration experience

Earlier versions of the self-service registration (SSR) flow used a complicated array of templates to send activation emails to users. The simplified SSR flow reduces this to only two email templates with customized welcome messages. If your application requires immediate verification of the user’s email address, use the **Registration - Activation** template. This template includes a magic link for a smoother sign-in experience. If email verification is not immediately required to sign in to the application, use the **Registration - Email Verification** template. This template includes a link for users to complete email verification at any time after they successfully sign in to the application. See [Customize email notifications](/docs/guides/custom-email/main/) and the [Okta email (magic link/OTP) integration guide](/docs/guides/authenticators-okta-email/aspnet/main/). <!-- OKTA-552780-->

#### Manage embedded widget sign-in support is GA in Prod

Okta provides the Okta Sign-In Widget out of the box so that customers can authenticate users by simply redirecting them to the widget. For customers who need a customized sign-in experience, Okta also provides a widget SDK that developers can embed within their applications. This embedded widget uses a custom authorization mode called the Interaction Code grant type to authenticate users. The **Embedded widget sign-in support** toggle allows super admins to disable the embedded sign-in option across all applications and authorization servers. This helps to create consistency and improve the security posture of your applications. See [Verify that the Interaction Code grant type is enabled](/docs/guides/implement-grant-type/interactioncode/main/#verify-that-the-interaction-code-grant-type-is-enabled).

#### Bugs fixed in 2022.12.0

* An admin role couldn’t be assigned to a user or group if the role was constrained to a group with group membership rules or to a group with more than 5000 members. (OKTA-546310)

* When a DELETE request to the `/api/v1/authorizationServers/<authServerID>/clients/<clientID>/tokens` endpoint was called for large scale operations, an HTTP 500 Internal Server Error was returned. (OKTA-536037)

* When an admin deleted groups in quick succession using the Groups API, the groups weren't always removed from the Identity Provider that they were associated with. (OKTA-540853)

* When the full-featured code editor was enabled, updates to email customizations, custom error pages, and the sign-in page didn't trigger system log events. (OKTA-553284)

* When mapping for sign-in fields was enabled, POST update email address requests to `/idp/myaccount/emails` returned an HTTP 500 Internal Server error when the primary email was in use by another user in the same org. (OKTA-543301)

* The Service Provider-initiated Org2Org flow failed when one of the orgs had the Enroll Authenticator feature enabled. (OKTA-549385)

* The Email Authenticator challenge lifetime was sometimes set to five minutes regardless of its value in the authenticator settings. (OKTA-551130)

* An error occurred when a user authenticated using an external Identity Provider during the device authorization grant flow. (OKTA-549581)

* Errors during federation sometimes didn't display the cause of the error. (OKTA-541442)

* Users were sometimes signed out of Okta right after signing in if the tokens returned were too large. (OKTA-552637)

## November

### Weekly release 2022.11.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Improvements to self-service account activities for AD and LDAP users are EA in Preview](#improvements-to-self-service-account-activities-for-ad-and-ldap-users-are-ea-in-preview)            |November 30, 2022            |
| [Bugs fixed in 2022.11.1](#bugs-fixed-in-2022-11-1)                      | November 30, 2022            |

#### Improvements to self-service account activities for AD and LDAP users are EA in Preview

Previously, the self-service unlock (SSU) and self-service password reset (SSPR) flows created unnecessary friction for AD and LDAP users. This feature enhancement introduces a seamless magic link experience in emails sent to unlock accounts and reset passwords. Users no longer need to provide consent when using the same browser. In addition, after successfully unlocking their account, clicking the email magic link counts towards the application's assurance policy. After the assurance requirements are met, the user is signed directly in to the application. See [Customize email notifications](/docs/guides/custom-email/main/#use-vtl-variables). <!--OKTA-546374-->

#### Bugs fixed in 2022.11.1

* Some orgs that performed multifactor authentication with the Custom OTP, Okta On-Prem MFA agent, or YubiKey OTP authenticators experienced internal server errors during outbound SAML and OAuth 2.0 authorization flows. (OKTA-489101)

* The wrong response code (500) was sent when an admin attempted to use the app target or group target operations of the Administrator Role API with a custom role binding identifier. (OKTA-529688)

* Inline hook requests configured to use OAuth 2.0 authentication sent expired access tokens in the authorization header. (OKTA-551186)

### Monthly release 2022.11.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Improvements to the self-service password reset experience are GA in Production](#self-service-password-reset-improvements-are-ga-in-production) | July 7, 2022 |
| [Improvements to the self-service unlock process are GA in Production](#self-service-unlock-improvements-are-ga-in-production) | August 10, 2022 |
| [Improvements to the sign-in experience are GA in Preview](#sign-in-experience-improvements-are-ga-in-preview) | November 3, 2022 |
| [Manage embedded widget sign-in support is GA in Preview](#manage-embedded-widget-sign-in-support-is-ga-in-preview) | October 5, 2022 |
| [Step-up authentication using ACR values is GA in Preview](#step-up-authentication-using-acr-values-is-ga-in-preview) | August 31, 2022 |
| [Authenticator enrollment using the /authorize endpoint is EA in Preview](#authenticator-enrollment-using-the-authorize-endpoint-is-ea-in-preview) | November 3, 2022 |
| [Loading page animation feature for the Brands API is in GA](#loading-page-animation-feature-for-the-brands-api-is-in-ga) | October 5, 2022 |
| [API service integrations is Self-Service EA in Preview](#api-service-integrations-is-self-service-ea-in-preview) | November 3, 2022 |
| [New rate limits dashboard filter](#new-rate-limits-dashboard-filter) | November 3, 2022 |
| [Improved ThreatInsight coverage](#improved-threatinsight-coverage) | November 3, 2022 |
| [Developer documentation updates in 2022.11.0](#developer-documentation-updates-in-2022-11-0) | November 3, 2022 |
| [Bugs fixed in 2022.011.0](#bugs-fixed-in-2022-11-0) | November 3, 2022|

#### Self-service password reset improvements are GA in Production

Previously, the self-service password reset (SSPR) flow created unnecessary friction in the user experience. The newly enhanced SSPR feature introduces a seamless magic link experience for password reset emails. Users no longer need to provide consent when using the same browser. After a successful password reset, where the password meets the application’s assurance policy, the user is signed directly in to the app. See [Configure the Email authenticator](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-email). This feature is currently available for new orgs only. <!--OKTA-499517-->

#### Self-service unlock improvements are GA in Production

Previously, the self-service unlock (SSU) flow created unnecessary friction in the end-user experience. The newly enhanced SSU feature introduces a seamless magic link experience in emails sent to unlock accounts. Users no longer need to provide consent when using the same browser. In addition, after successfully unlocking their account, clicking the email magic link counts towards the application's assurance policy. After the assurance requirements are met, the user is signed directly in to the app. See the `${oneTimePassword}` and `${unlockAccountLink}` [VTL variables](/docs/guides/custom-email/main/#use-vtl-variables) used in the [Email Magic link](/docs/guides/email-magic-links-overview/) [custom email template](/docs/guides/email-magic-links-overview/aspnet/main/#use-custom-email-templates). This feature is currently available for new orgs only. <!--OKTA-499520-->

#### Sign-in experience improvements are GA in Preview

When users create an account using the Sign Up link in the Okta Sign-In Widget, they enter their first and family names along with their email address on the first page. The Sign-In Widget then displays the authenticators page, where users enter a password and configure any other mandatory authenticators. To streamline the sign-up process, the Self-Service Registration with Password feature allows you to show the password entry on the first page of the enrollment form instead. See [Collect profile information and register users](https://help.okta.com/okta_help.htm?type=oie&id=csh-email-verification). <!--OKTA-543643-->

#### Manage embedded widget sign-in support is GA in Preview

Okta provides the Okta Sign-In Widget out of the box so that customers can authenticate users by simply redirecting them to the widget. For customers who need a customized sign-in experience, Okta also provides a widget SDK that developers can embed within their applications. This embedded widget uses a custom authorization mode called the Interaction Code grant type to authenticate users. The Embedded widget sign-in support toggle allows super admins to disable the embedded sign-in option across all applications and authorization servers. This helps to create consistency and improves the security posture of your applications. See [Verify that the Interaction Code grant type is enabled](/docs/guides/implement-grant-type/interactioncode/main/#verify-that-the-interaction-code-grant-type-is-enabled). <!--OKTA-543996-->

#### Step-up authentication using ACR values is GA in Preview

Users want seamless access to certain resources, but organizations want to increase the users' level of assurance before they access anything sensitive. It’s difficult to strike a balance between implementing stronger security controls and offering a frictionless experience for your users to easily interact with an application. Okta now supports the `acr_values` parameter, which refers to Authentication Context Class Reference. Each value defines a specific set of assurance level requirements that the protected resource requires from the authentication event associated with the access and ID tokens. See [Step-up authentication using ACR values](/docs/guides/step-up-authentication/main/). <!--OKTA-544153-->

#### Authenticator enrollment using the /authorize endpoint is EA in Preview

Authenticator enrollment provides a standardized way for a user to enroll a new authenticator using the OAuth `/authorize` endpoint. This feature uses query parameters such as `prompt` and `enroll_amr_values` to specify which authenticator the user wants to enroll. It also automatically verifies at least two factors as long the user has already enrolled two or more factors. <!--OKTA-544671-->

#### Loading page animation feature for the Brands API is in GA

When redirecting applications, you can use the [loading page variant property](/docs/reference/api/brands/#theme-object) (`loadingPageTouchPointVariant`) of the Brands API to display a blank page instead of the default Okta loading page animation. As a result, Okta's branding doesn't appear anywhere in the redirect user journey. <!--OKTA-544951-->

#### API service integrations is Self-Service EA in Preview

A service-to-service app where a backend service or a daemon calls Okta management APIs for a tenant (Okta org) can be published in the Okta Integration Network (OIN) as an API service integration. This integration type allows your service app to access your customer Okta org through Okta management APIs using the OAuth 2.0 Client Credentials flow. API service integrations provide secure, reliable, and least-privilege scoped access to Okta APIs without being associated with a user, so service isn’t disrupted when the user is no longer involved with service integration activities. See [API service integrations in the OIN](/docs/guides/oin-api-service-overview/). OIN Manager has been updated to support testing and submitting API service integrations. After your service integration is published in the OIN, workforce customers can discover and configure your integration with ease. See [Build an API service integration](/docs/guides/build-api-integration/). <!--OKTA-532102-->

#### New rate limits dashboard filter

You can now filter the APIs listed on the rate limits dashboard by their rate limit multiplier eligibility status. See [Rate limit monitoring](/docs/reference/rl-dashboard). <!--OKTA-524847-->

#### Improved ThreatInsight coverage

ThreatInsight has increased coverage for enabled orgs. More malicious requests are now flagged for orgs with ThreatInsight configured. <!--OKTA-536921-->

#### Developer documentation updates in 2022.11.0

* We’ve got a [new API reference in the works](https://developer.okta.com/docs/api/). With a fresh look and feel, our new API content will be easier to navigate and features a wider variety of code examples. Content is continuously being added &mdash; please try it out and help us improve the site by providing feedback.

* A new set of guides to support the creation of a password-optional or passwordless sign-in experience for your apps is now online. [Find them all here](/docs/guides/pwd-optional-overview/aspnet/main/).

#### Bugs fixed in 2022.11.0

* Requests to the `/api/v1/brands/*/templates/email/` endpoint returned an HTTP 404 error. (OKTA-545178)

* PATCH requests to the `/iam/resource-sets/${resourceSetIdOrLabel}/resources` endpoint with duplicate resources returned duplicate resources. (OKTA-476449)

* Users were sometimes signed out of Okta right after signing in if the tokens returned were too large. (OKTA-476449)

* Some orgs experienced internal server errors during outbound SAML federation. (OKTA-544628)

* A long text string was displayed outside of the General Settings page in OIN Manager. (OKTA-532898)

* The **Enter your Post Logout Redirect URI** field for OIDC settings in OIN Manager didn’t accept all valid URLs.

## October

### Weekly release 2022.10.2

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Invalid phone numbers rejected](#invalid-phone-numbers-rejected)                | October 26, 2022         |
| [Bugs fixed in 2022.10.2](#bugs-fixed-in-2022-10-2)                      | October 26, 2022         |

#### Invalid phone numbers rejected

Okta now rejects attempts to enroll a toll-free, premium, fixed-line (SMS), or any other invalid or unrecognized phone number. This ensures that only valid phone numbers are used for multifactor authentication or device enrollment. See [Configure and use telephony](https://help.okta.com/okta_help.htm?type=oie&id=ext-telephony-how-to) or the [Enroll Factor API](/docs/reference/api/authn/#enroll-factor). <!--OKTA-437305-->

#### Bugs fixed in 2022.10.2

* A `/token` request that used the authorization code flow failed when the **Groups claim type** in the app was set to **Expression** and the group number exceeded 100. (OKTA-518536)

* A `/token` request that used the `refresh_token` grant type failed when the **Groups claim type** in the app was set to either **Expression** or **Filter** and the group number exceeded 100. (OKTA-531605)

* When a user entered their credentials in the widget (version 6.6.1) during self-service registration, their information was cleared if the username didn't exist in the org. (OKTA-532293)

* The MyAccount API didn't send a notice of pending email address change for Add Email calls with a false `sendEmail` parameter. (OKTA-539268)

* An opened session in Classic Engine couldn't be closed for a user (`DELETE /session/me`) after upgrading to Identity Engine. (OKTA-517093)

* Custom app integrations didn't include the `mfa` and `pwd` factors in `session.amr` claims during federated sessions. (OKTA-541859)

* Admins were able to set the `loginRedirectUrl` using the Apps API. (OKTA-540515)

### Weekly release 2022.10.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.10.1](#bugs-fixed-in-2022-10-1)                      | October 12, 2022            |

#### Bugs fixed in 2022.10.1

* POST update email address requests to `/idp/myaccount/emails` returned an HTTP 409 Conflict error when the primary email wasn't verified during registration. (OKTA-534398)

* During the user activation flow, a user was still prompted to sign in when the `prompt` property was set to `none` and the user had a valid session token. (OKTA-514346)

### Monthly release 2022.10.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Access Denied error message customization is GA in Production](#access-denied-error-message-customization-is-ga-in-production) | August 31, 2022 |
| [Additional measures for suspicious SMS and Voice requests](#additional-measures-for-suspicious-sms-and-voice-requests) | October 5, 2022 |
| [Clone authentication policies are GA in Production](#clone-authentication-policies-are-ga-in-production) | August 31, 2022 |
| [Default authenticator enrollment policy settings format is GA in Production](#default-authenticator-enrollment-policy-settings-format-is-ga-in-production) | August 31, 2022 |
| [Dynamic IdP routing is GA in Production](#dynamic-idp-routing-is-ga-in-production) | June 8, 2022 |
| [Factors API support for Okta Verify authenticator enrollment flows is GA in Preview](#factors-api-support-for-okta-verify-authenticator-enrollment-flows-is-ga-in-preview) | October 5, 2022 |
| [Improved ThreatInsight coverage](#improved-threatinsight-coverage) | October 5, 2022 |
| [Improved User API sort](#improved-user-api-sort) | October 5, 2022 |
| [Manage embedded widget sign-in support is EA in Preview](#manage-embedded-widget-sign-in-support-is-ea-in-preview) | October 5, 2022 |
| [Non-deletable default authorization server is GA in Production](#non-deletable-default-authorization-server-is-ga-in-production) | August 31, 2022 |
| [OAuth 2.0 authentication for inline hooks is Self-Service EA in Preview](#oauth-2-0-authentication-for-inline-hooks-is-self-service-ea-in-preview) | October 5, 2022 |
| [Developer documentation updates in 2022.10.0](#developer-documentation-updates-in-2022-10-0) | October 5, 2022 |
| [Bugs fixed in 2022.010.0](#bugs-fixed-in-2022-10-0) | October 5, 2022|

#### Access Denied error message customization is GA in Production

Admins can now customize the error message that users receive when their access is denied. This allows admins to provide remediation steps and/or point users to documentation that helps resolve their access issues. <!--OKTA-512725-->

#### Additional measures for suspicious SMS and Voice requests

Additional measures are now applied to block suspicious SMS and Voice traffic from countries that are typically at risk of toll fraud attacks. Blocked transactions display a deny status in the System Log.
<!--OKTA-532681-->

#### Clone authentication policies are GA in Production

Creating an authentication policy from scratch is a manual, error-prone task because you need to visually copy existing rules into the new policy. Okta now offers the ability to clone a policy. You can use either the Admin Console or the new Clone a Policy operation on the Policy API. See [Clone a Policy](/docs/reference/api/policy/#clone-a-policy). <!--OKTA-525110-->

#### Default authenticator enrollment policy settings format is GA in Production

For orgs that recently enabled the Authenticator Enrollment Policy feature, the new default [authenticator enrollment policy](/docs/reference/api/policy/#authenticator-enrollment-policy) is created with settings in the authenticator format instead of the factor format. For existing orgs that have the Authenticator Enrollment Policy feature enabled, the settings of the default authenticator enrollment policy continues to be in the factor format. <!--OKTA-535005-->

#### Dynamic IdP routing is GA in Production

Org admins can now consolidate multiple IdP routing rules into a single dynamic routing rule. Dynamic routing rules use expression language to match users to any IdP, based on attributes of their login object. This reduces the volume and complexity of routing rules and the manual effort of managing them. See [Policy Action with Dynamic IdP routing](/docs/reference/api/policy/#policy-action-with-dynamic-idp-routing). <!--OKTA-520972-->

#### Factors API support for Okta Verify authenticator enrollment flows is GA in Preview

Identity Engine now supports Okta Verify enrollments with email or SMS links created from the Factors API. Previously, when a client generated an Okta Verify enrollment email or SMS link using the Factors API, the enrollment from the Okta Verify app failed with an `Invalid Token` error. To address this issue, Factors API updates include the following behaviors when the Okta Verify authenticator is used:

* When an Okta Verify enrollment request is made using the Factors API for a user not currently enrolled with an Okta Verify factor, then all three `signed_nonce`, `push`, and `totp` factors are enrolled.
* The GET factors operation lists all Okta Verify enrollment methods for a user.
* The DELETE `push` or `signed_nonce` factor operation deletes all three factor enrollments (`push`, `signed_nonce`, and `totp`).

See [Enroll Okta Verify Push](/docs/reference/api/factors/#enroll-okta-verify-push-factor) and [Reset Factor](/docs/reference/api/factors/#reset-factor) updates in the Factors API.
<!--OKTA-536937-->

#### Improved ThreatInsight coverage

ThreatInsight has increased coverage for enabled orgs. More malicious requests are now flagged for orgs with ThreatInsight configured. <!--OKTA-531586-->

#### Improved User API sort

The Users API now supports sorting results by the top-level User object properties `status`, `lastUpdated`, and `type.id`. <!--OKTA-513502-->

#### Manage embedded widget sign-in support is EA in Preview

Okta provides the Okta Sign-In Widget out of the box so that customers can authenticate users by simply redirecting them to the widget. For customers who need a customized sign-in experience, Okta also provides a widget SDK that developers can embed within their applications. This embedded widget uses a custom authorization mode called the Interaction Code grant type to authenticate users. The Embedded widget sign-in support toggle allows super admins to disable the embedded sign-in option across all applications and authorization servers. This helps to create consistency and improves the security posture of your applications. See [Verify that the Interaction Code grant type is enabled](/docs/guides/implement-grant-type/interactioncode/main/#verify-that-the-interaction-code-grant-type-is-enabled). <!--OKTA-517774-->

#### Non-deletable default authorization server is GA in Production

Okta provides a default authorization server so that customers can quickly get started. If a customer deletes the default authorization server, it can't be restored, causing confusion and disruption. This enhancement prevents you from deleting the default authorization server, although you can disable it if it isn't required. To aid in identification, Okta adds a Default label in the Admin Console. <!--OKTA-536276-->

#### OAuth 2.0 authentication for inline hooks is Self-Service EA in Preview

Okta inline hook calls to third-party external web services previously provided only header-based authentication for security. Although sent with SSL, the header or custom header authentication didn’t meet more stringent security requirements for various clients and industries.

To improve the security of inline hooks, Okta now supports authentication with OAuth 2.0 access tokens. Tokens ensure secure calls to external web services.

When creating inline hooks in the Admin Console (or by API), administrators or developers can now select OAuth 2.0 authentication and choose between two methods of OAuth 2.0: Client Secret or Private Key. A new [Key Management API](/docs/reference/api/hook-keys/) and Admin Console page is also available to create public/private key pairs for use with OAuth 2.0 inline hooks. See [Key management](https://help.okta.com/okta_help.htm?type=oie&id=ext-key-management).

Using the OAuth 2.0 framework provides better security than Basic Authentication or custom headers, and is less work than setting up an IP allowlisting solution. Clients also have the ability to use access tokens minted by their own custom authorization servers to guarantee that Okta is calling their client web services and isn't triggered by any external actors. See [Add an inline hook](https://help.okta.com/okta_help.htm?type=oie&id=ext-add-inline-hook). <!--OKTA-537306-->

#### Developer documentation updates in 2022.10.0

* A new [Key Management API](/docs/reference/api/hook-keys/) is available under the Core Okta APIs. This reference manages JWKs used with OAuth 2.0 authentication for inline hooks.

* A new [SAML assertion inline hook](/docs/guides/saml-inline-hook/main/) guide is available at **Guides > Hooks**. Use this guide to implement a working example of a SAML assertion inline hook.

* The OIN Manager has a new Get Support section that provides common developer.okta.com guides relating to OIN integrations and the submission process.

#### Bugs fixed in 2022.10.0

* Users were able to make more than five attempts to activate their one-time passcode (OTP) based factors. (OKTA-429940)

* Searching for users with the Users API returned a 503 Service Unavailable error if the call included an empty `sortBy` parameter with the `after` parameter. (OKTA-503711)

* Searching for users with the Users API returned a 503 Service Unavailable error if the call included a `sortBy` parameter with an invalid `after` parameter. (OKTA-504265)

* When an OIN client was set to invisible, the client was still incorrectly returned if a GET request was made using the Dynamic Client Registration API (`/oauth2/v1/clients`). (OKTA-515362)

* When the Factors API verify endpoint (`/users/${userId}/factors/${factorId}/verify`) was called on behalf of a user, an HTTP 403 Forbidden error was returned. (OKTA-523738)

* A user was able to verify more than 10 phone numbers with the verify my phone (`/idp/myaccount/phones/${id}/verify`) endpoint in the MyAccount API. (OKTA-531097)

* An error message didn’t appear when a deleted app instance was assigned to a role. (OKTA-531308)

* When a `session.amr` expression was used for SAML attribute statements, the attribute statement wasn't correctly populated. (OKTA-532316)

* A `GET /api/v1/groups` request with an invalid search operator returned a 504 Timeout error instead of a 400 Bad Request error with an appropriate message. (OKTA-535035)

## September

### Weekly release 2022.09.3

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.09.3](#bugs-fixed-in-2022-09-3)                      | September 28, 2022            |

#### Bugs fixed in 2022.09.3

* Existing provisioning settings for an app were reset to `None` when an app was updated using `PUT /apps/${applicationId}`. (OKTA-520647)

* Read-only admins weren’t able to see the signing keys that were used for SAML applications. (OKTA-522887)

* When an access token was used to create an email template customization, the POST request failed. (OKTA-526881)

### Weekly release 2022.09.2

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.09.2](#bugs-fixed-in-2022-09-2)                      | September 21, 2022            |

#### Bugs fixed in 2022.09.2

* A descriptive error message wasn't returned when OAuth management endpoints were used with non-OAuth clients. (OKTA-458109)

* Identity Provider information was missing from the `GET /sessions/me` API response. (OKTA-484077)

* During the MFA Attestation flow, when a request was sent to the `/interact` endpoint, an access token was erroneously returned and an Okta session was created. (OKTA-522155)

* A two-minute clock skew was allowed during access and ID token validation. (OKTA-528530)

### Weekly release 2022.09.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.09.1](#bugs-fixed-in-2022-09-1)                      | September 14, 2022            |

#### Bugs fixed in 2022.09.1

* The Subscription Role API didn’t support the API Access Management role. (OKTA-431895)
* The origin header validation on the `/token` endpoint for cross-origin requests was case-sensitive, which returned an error for redirect URIs using uppercase. (OKTA-516740)
* The Interaction Code flow didn’t pass the `nonce` parameter from the authorization request into the ID token. (OKTA-521597)

### Monthly release 2022.09.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Non-deletable default authorization server is EA in Preview](#non-deletable-default-authorization-server-is-ea-in-preview) | August 31, 2022 |
| [PKCE validation for OIDC app integrations is GA in Production](#pkce-validation-for-oidc-app-integrations-is-ga-in-production) | July 7, 2022 |
| [Signed request support for generic SAML IdP is GA in Production](#signed-request-support-for-generic-saml-idp-is-ga-in-production) | July 7, 2022 |
| [Step-up authentication using ACR values is EA in Preview](#step-up-authentication-using-acr-values-is-ea-in-preview) | August 31, 2022 |
| [API for suppressing email notifications is GA](#api-for-suppressing-email-notifications-is-in-general-availability) | May 11, 2022 |
| [Access Denied error message customization is GA in Preview](#access-denied-error-message-customization-is-ga-in-preview) | August 31, 2022 |
| [Dynamic IdP routing is GA in Preview](#dynamic-idp-routing-is-ga-in-preview) | June 8, 2022 |
| [The update logo for application operation is updated](#the-update-logo-for-application-operation-is-updated) | August 31, 2022 |
| [Clone authentication policies are GA in Preview](#clone-authentication-policies-are-ga-in-preview) | August 31, 2022 |
| [Improvements to the self-service password reset experience are GA in Preview](#improvements-to-the-self-service-password-reset-experience-are-ga-in-preview) | July 7, 2022 |
| [Password restriction for shared SWA app accounts is GA in Production](#password-restriction-for-shared-swa-app-accounts-is-ga-in-production) | July 7, 2022 |
| [Default authenticator enrollment policy settings format is GA in Preview](#default-authenticator-enrollment-policy-settings-format-is-ga-in-preview) | August 31, 2022 |
| [Developer documentation updates in 2022.09.0](#developer-documentation-updates-in-2022-09-0) | August 31, 2022 |
| [Bugs fixed in 2022.09.0](#bugs-fixed-in-2022-09-0) | August 31, 2022|

#### Non-deletable default authorization server is EA in Preview

The default authorization server is a custom authorization server provided by Okta so that customers can quickly get started working with Okta. However, if a customer deletes the default authorization server, it can't be restored, causing confusion and disruption. This enhancement prevents you from deleting the default authorization server, although you can disable it if it isn't required. To aid in identification, Okta adds a Default label for the default authorization server in the Admin Console.<!--OKTA-521652--><!--OKTA-525780-->

#### PKCE validation for OIDC app integrations is GA in Production

You can now require Proof Key for Code Exchange (PKCE) as an additional verification for any OpenID Connect app integration except service apps. This more closely aligns with the OAuth Security Best Current Practice recommendation to use PKCE with the authorization code flow regardless of the client type. Use the `pkce_required` [property](/docs/reference/api/apps/#oauth-credential-object) with the Apps API to require PKCE for your app.<!--OKTA-523773-->

#### Signed request support for generic SAML IdP is GA in Production

Using signed SAML requests ensures that incoming requests are from genuine applications. When this is configured, Okta only accepts SAML requests signed using the certificate associated with the app integration. Having signed SAML requests also resolves scenarios where the Assertion Consumer Service (ACS) URL requested after authentication can be one of several domains or URLs. When a Service Provider sends a signed authentication request, Okta can accept dynamic ACS values as part of the SAML request and posts the SAML assertion response to the ACS value specified in the request. See the Advanced Settings section of [Create SAML app integrations using AIW](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-aiw-saml).<!--OKTA-525803-->

#### Step-up authentication using ACR values is EA in Preview

Users want seamless access to certain resources, but organizations want to increase the users' level of assurance before they access anything sensitive. It’s difficult to strike a balance between implementing stronger security controls and offering a frictionless experience for your users to easily interact with an application. Okta now supports the `acr_values` parameter, which refers to Authentication Context Class Reference. Each value defines a specific set of assurance level requirements that the protected resource requires from the authentication event associated with the access and ID tokens. See [Step-up authentication using ACR values](/docs/guides/step-up-authentication/main/).<!--OKTA-525790-->

#### API for suppressing email notifications is in General Availability

This API allows you to change who receives email notifications for each individual email template. You can suppress them completely or send them to admins only. This unlocks testing scenarios that warrant using production user directories and prevents end users from getting test emails. It also allows extensibility for customers who would like to use a third party email sender through Hooks or Workflows. See [Email template settings](/docs/reference/api/brands/#email-template-settings).<!--OKTA-526580-->

#### Access Denied error message customization is GA in Preview

Admins can now customize the error message that users receive when their access is denied. This allows admins to provide remediation steps and/or point users to documentation that helps resolve their access issues.<!--OKTA-512724-->

#### Dynamic IdP routing is GA in Preview

Org admins can now consolidate multiple IdP routing rules into a single dynamic routing rule. Dynamic routing rules use expression language to match users to any IdP, based on attributes of their login object. This reduces the volume and complexity of routing rules and the manual effort of managing them. See [Policy Action with Dynamic IdP routing](/docs/reference/api/policy/#policy-action-with-dynamic-idp-routing).<!--OKTA-520971-->

#### The update logo for application operation is updated

The [update logo for application](/docs/reference/api/apps/#application-logo-operations) API operation has been updated to support logo images in SVG format. In addition, the updated logo guidelines require a square image dimension of 200px by 200px to avoid distortion.<!--OKTA-511103-->

#### Clone authentication policies are GA in Preview

Creating an authentication policy from scratch is a manual, error-prone task because you need to visually copy existing rules into the new policy. Okta now offers the ability to clone a policy. You can use either the Admin Console or the new Clone a Policy operation on the Policy API. See [Clone a Policy](/docs/reference/api/policy/#clone-a-policy).<!--OKTA-515109-->

#### Improvements to the self-service password reset experience are GA in Preview

Previously, the self-service password reset (SSPR) flow created unnecessary friction in the user experience. The newly enhanced SSPR feature introduces a seamless magic link experience for password reset emails. Users no longer need to provide consent when using the same browser. After a successful password reset where the password meets the application’s assurance policy, the user is signed directly to the app. See [Configure the Email authenticator](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-email).<!--OKTA-499514-->

#### Password restriction for shared SWA app accounts is GA in Production

For SWA apps with an account sign-in option set to **Users share a single username and password set by administrator**, only super admins or app admins with permissions for that app can view the password.<!--OKTA-513421-->

#### Default authenticator enrollment policy settings format is GA in Preview

For orgs that recently enabled the Authenticator Enrollment Policy feature, the new default [authenticator enrollment policy](/docs/reference/api/policy/#authenticator-enrollment-policy ) is created with settings in the authenticator format instead of the factor format. Any existing orgs that have the Authenticator Enrollment Policy feature enabled, the settings of the default authenticator enrollment policy continues to be in the factor format.<!--OKTA-527304-->

#### Developer documentation updates in 2022.09.0

* `developer.okta.com` has a new main navigation menu, which makes navigating around the content easier and more intuitive. Instead of showing the entire sitemap in the menu at all times, each major area is now accessed through a submenu that shows only the relevant menu sections at one time. In addition, clicking each menu node shows a contextual landing page (either a defined custom page or an auto-generated one if none exists), and you can now toggle the menu between hidden and visible states, if desired.

* Updates to the [Customize the Okta-hosted error pages](/docs/guides/custom-error-pages/main/#edit-the-error-page) and [Customize email notifications](/docs/guides/custom-email/main/#edit-a-default-email-template) guides describe the new full-featured code editor. The editor integrates the Monaco code editing library into the Admin Console to make editing code for error pages and email notifications more efficient. Developers can write, test, and publish code faster.

#### Bugs fixed in 2022.09.0

* The `sub` claim value in on-behalf token exchange flows was using the customized authorization server claim value when the token exchange feature was enabled. (OKTA-517125)

* The Apps API returned only the first error from the VPN settings (`settings.notifiations.vpn`) of an add app request. (OKTA-517563)

* The `fromURI` parameter in the Activation Email template linked users to the Okta Dashboard instead of the specified URL. (OKTA-505979)

* When the `MyAccountChangeConfirmation` or `PendingEmailChange` email templates were customized without an `AuthStateToken`, the `app.id`, `app.name`, and `app.label` variables didn't work. (OKTA-515159)

* When customers used a customized Okta-hosted Sign-In Widget, authorization requests failed after Identity Engine upgrade because the Authentication object was missing from the Identity Engine response. (OKTA-376674)

## August

### Weekly release 2022.08.3

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.08.3](#bugs-fixed-in-2022-08-3)                      | August 24, 2022            |

#### Bugs fixed in 2022.08.3

* The Apps API returned two validation errors rather than one when the value for the `url` parameter wasn't a URL. (OKTA-521199)

* Imported passwords with a malformed bcrypt hash format caused an error during the password reset flow. (OKTA-502227)

* Sometimes when an admin deleted an Identity Provider and a Group concurrently, the Identity Provider wasn't deleted. (OKTA-511062)

* If the Self Service Registration feature wasn't enabled, operations on the `/brands/` endpoint to list or update `RegistrationActivation` or `RegistrationEmailVerification` email templates received exception errors. (OKTA-524327)

* Despite having insufficient permissions, a Report Admin was able to use the Mappings API to edit the UD mappings for an Identity Provider configured in Okta. (OKTA-499602)

### Weekly release 2022.08.2

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2022.08.2](#bug-fixed-in-2022-08-2)                      | August 17, 2022            |

#### Bug fixed in 2022.08.2

The "Authenticator enrollment policy" was incorrectly named "Multifactor (MFA) Enrollment Policy". (OKTA-497457)

### Weekly release 2022.08.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Improvements to the self-service unlock process is EA in Preview](#improvements-to-the-self-service-unlock-process-is-ea-in-preview)        | August 10, 2022            |
| [Bugs fixed in 2022.08.1](#bugs-fixed-in-2022-08-1)                      | August 10, 2022            |

#### Improvements to the self-service unlock process is EA in Preview

Previously, the self-service unlock (SSU) flow created unnecessary friction in the end-user experience. The newly enhanced SSU feature introduces a seamless magic link experience in emails sent to unlock accounts. Users no longer need to provide consent when using the same browser. In addition, after successfully unlocking their account, clicking the email magic link counts towards the application's assurance policy. After the assurance requirements are met, the user is signed directly in to the application. See the `${oneTimePassword}` and `${unlockAccountLink}` [VTL variables](/docs/guides/custom-email/main/#use-vtl-variables) used in the [Email Magic link](/docs/guides/email-magic-links-overview/) [custom email template](/docs/guides/email-magic-links-overview/aspnet/main/#use-custom-email-templates). <!--OKTA-499510-->

#### Bugs fixed in 2022.08.1

* When client assertions for `private_key_jwt` client authentication method operations contained the `aud` claim in an array instead of a string, an error was returned. (OKTA-478067)

* When an app initiated the Service Provider flow and the SAML authorization request didn't contain the SAML Subject (`nameId`), a 500 HTTP error was returned. (OKTA-511120)

* Clients using Native SSO token exchange ignored assurance challenges. (OKTA-520634)

### Monthly release 2022.08.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [PKCE validation for OIDC app integrations is GA in Preview](#pkce-validation-for-oidc-app-integrations-is-ga-in-preview) | July 7, 2022|
| [Configurable API token rate limits is GA in Production](#configurable-api-token-rate-limits-is-ga-in-production) | July 7, 2022|
| [Rate Limits dashboard includes API Token data](#rate-limits-dashboard-includes-api-token-data) | August 3, 2022|
| [Telephony inline hook is LGA in Production](#telephony-inline-hook-is-lga-in-production) | March 30, 2022|
| [System Log updates for telephony operations](#system-log-updates-for-telephony-operations) | August 3, 2022|
| [Trusted Origins for iFrame embedding is GA in Production](#trusted-origins-for-iframe-embedding-is-ga-in-production) | May 4, 2022|
| [Updates to default global session policy](#updates-to-default-global-session-policy) | August 3, 2022|
| [Improved error messages for MyAccount API](#improved-error-messages-for-myaccount-api) | August 3, 2022|
| [Developer documentation updates in 2022.08.0](#developer-documentation-updates-in-2022-08-0) | August 3, 2022|
| [Bug fixed in 2022.08.0](#bug-fixed-in-2022-08-0) | August 3, 2022|

#### PKCE validation for OIDC app integrations is GA in Preview

You can now require Proof Key for Code Exchange (PKCE) as an additional verification for any OpenID Connect app integration except service apps. This more closely aligns with the OAuth Security Best Current Practice recommendation to use PKCE with the authorization code flow regardless of the client type. Use the `pkce_required` [property](/docs/reference/api/apps/#oauth-credential-object) with the Apps API to require PKCE for your app. <!-- OKTA-518333 -->

#### Configurable API token rate limits is GA in Production

Admins can now configure a percentage rate limit capacity for individual API tokens. Previously, when a token rate limit violation occurred, it wasn’t clear which token consumed the limit. Setting a maximum capacity for each token solves this problem and gives admins a new tool to investigate rate limit violations and plan for future deployments. See [API token management](https://help.okta.com/okta_help.htm?id=csh-api). <!-- OKTA-517890 -->

#### Rate Limits dashboard includes API Token data

The Rate Limits dashboard now includes API Token data on the Rate limit usage over time graph. You can view bar graph data from API tokens or by IP address to review any spike in traffic. See [bar graph](/docs/reference/rl-dashboard/#bar-graph) and [API rate limits by token](/docs/reference/rate-limits/#api-rate-limits-by-token). <!-- OKTA-498252 -->

#### Telephony inline hook is LGA in Production

While Okta provides out-of-the-box telephony functionality, many customers need the ability to integrate their existing telecommunications provider with Okta to deliver SMS and Voice messages. The telephony inline hook allows customers to generate One-Time Passcodes within Okta, and then use their existing telecommunications provider to deliver the messages for MFA enrollment/verification, password reset, and account unlock. This allows customers to use their existing telephony solution within Okta, due to the time they've already invested in their existing telephony solution, the need to use a specific regional provider, or simply the desire to maintain flexibility. See [Telephony inline hook with Twilio](/docs/guides/telephony-inline-hook/nodejs/main/). <!-- OKTA-518233 -->

#### System Log updates for telephony operations

The `system.operation.rate_limit.violation` event is no longer triggered when SMS or Voice messages are blocked due to telephony operational rate limit violations. Instead, telephony `system.sms.send.*` and `system.voice.send.*` events are issued as a `DENY` System Log message. <!-- OKTA-517838 -->

#### Trusted Origins for iFrame embedding is GA in Production

You can now choose which origins can embed Okta sign-in pages and the Okta End-User Dashboard using Trusted Origins for iFrame embedding. This feature offers a granular control over iFrame embedding compared to the existing embedding option in Customization, which doesn't let you distinguish between secure and non-secure origins. Trusted Origins (**Security** > **API**) allows you to selectively configure the origins that you trust. It also provides enhanced security as it uses a more secure `frame-ancestors` directive in Content Security Policy that protects your data from web attacks such as clickjacking. You can also migrate your existing iFrames to Trusted Origins. See [Trusted Origins API](/docs/reference/api/trusted-origins/). <!-- OKTA-514609 -->

#### Updates to default global session policy

You can now edit the secondary factor in the default rule of the global session policy default policy. <!-- OKTA-510082-->

#### Improved error messages for MyAccount API

The [MyAccount API](/docs/reference/api/myaccount/) includes improved error messages for end users to identify why email and phone operations couldn’t be completed or accessed. <!-- OKTA-484080 -->

#### Developer documentation updates in 2022.08.0

A new [overview of the Email Magic Links (EML)](/docs/guides/email-magic-links-overview/aspnet/main/ ) feature in Identity Engine has been added. This covers the differences between using EML and one-time passcodes, and how to integrate EML into applications using the embedded Sign-In Widget or a supported embedded SDK. <!-- OKTA-507346 -->

#### Bug fixed in 2022.08.0

When a client used either the `private_key_jwt` or `client_secret_jwt` client authentication methods, an error occurred if the `client_id` was included in the body of the token request. (OKTA-478059)

## July

### Weekly release 2022.07.2

| Change | Expected in Preview Orgs |
|---------------------------------|--------------------------|
| [Bug fixed in 2022.07.2](#bug-fixed-in-2022-07-2) | July 27, 2022 |

#### Bug fixed in 2022.07.2

Operations that assigned custom roles to a user or group and included a nonexistent resource returned an HTTP 500 Internal Server Error. (OKTA-472638)

### Weekly release 2022.07.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Dynamic issuer mode for Identity Providers](#dynamic-issuer-mode-for-identity-providers)                    | July 13, 2022            |
| [Bugs fixed in 2022.07.1](#bugs-fixed-in-2022-07-1)                        | July 13, 2022            |

#### Dynamic issuer mode for Identity Providers

You can configure the dynamic issuer mode for an Identity Provider using the Identity Provider API. When you set the`issuerMode` parameter to `DYNAMIC`, Okta uses the domain from the Authorize URL as the domain for the redirect URI when returning the authentication response. <!--OKTA-506807-->

#### Bugs fixed in 2022.07.1

- When the `/api/v1/users/${userId}/roles` or
`/api/v1/groups/${groupId}/roles` endpoints were called to assign a custom role and resource set to a user or group, and those assignments already existed, the calls didn’t receive an HTTP 409 Conflict error. (OKTA-507683)
- Sometimes Identity Engine users couldn't sign in using the Classic Engine `/authn` API. (OKTA-500649)

### Monthly release 2022.07.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Configurable API token rate limits is GA in Preview](#configurable-api-token-rate-limits-is-ga-in-preview) | July 7, 2022|
| [Improvements to the self-service password reset experience](#improvements-to-the-self-service-password-reset-experience)| July 7, 2022 |
| [Improvements to the self-service registration experience](#improvements-to-the-self-service-registration-experience)| July 7, 2022|
| [Loading Page Animation feature for the Brands API is EA in Preview](#loading-page-animation-feature-for-the-brands-api-is-ea-in-preview) | July 7, 2022|
| [Progressive enrollment is GA in Production](#progressive-enrollment-is-ga-in-production)| June 8, 2022 |
| [PKCE validation for OIDC app integrations is Self-Service EA in Preview](#pkce-validation-for-oidc-app-integrations-is-self-service-ea-in-preview) | July 7, 2022|
| [Signed request support for generic SAML IdP is GA in Preview](#signed-request-support-for-generic-saml-idp-is-ga-in-production) | July 7, 2022 |
| [Support for Okta Resource Name is GA in Preview](#support-for-okta-resource-name-is-ga-in-preview) | July 7, 2022|
| [Trusted Origins for iFrame embedding is GA in Production](#trusted-origins-for-iframe-embedding-is-ga-in-production) | May 4, 2022|
| [User-scoped MyAccount API is GA in Production](#user-scoped-myaccount-api-is-ga-in-production)| June 8, 2022 |
| [Developer documentation updates in 2022.07.0](#developer-documentation-updates-in-2022-07-0) | July 7, 2022 |
| [Bugs fixed in 2022.07.0](#bugs-fixed-in-2022-07-0) | July 7, 2022 |

#### Configurable API token rate limits is GA in Preview

Admins can now configure a percentage rate limit capacity for individual API tokens. Previously, when a token rate limit violation occurred, it wasn’t clear which token consumed the limit. Setting a maximum capacity for each token solves this problem and gives admins a new tool to investigate rate limit violations and plan for future deployments. See [API token management](https://help.okta.com/okta_help.htm?type=oie&id=csh-api). <!-- OKTA-506379 -->

#### Improvements to the self-service password reset experience

Previously, the self-service password reset (SSPR) flow created unnecessary friction in the end user experience. The newly enhanced SSPR feature introduces a seamless magic link experience for password reset emails. Users no longer need to provide consent when using the same browser. After a successful password reset where the password meets the application's assurance policy, the user is sent directly to the app. See [Configure the Email authenticator](https://help.okta.com/okta_help.htm?type=oie&id=csh-configure-email) <!-- OKTA-499509 -->

#### Improvements to the self-service registration experience

Earlier versions of the self-service registration (SSR) flow used a complicated array of templates to send activation emails to end users. The simplified SSR flow reduces this to only two email templates with customized welcome messages. If your application requires immediate verification of the end user’s email address, Okta uses the Registration - Activation template. This template includes a magic link for a smoother sign-in experience.  If email verification isn't immediately required to sign in to the application, use the Registration - Email Verification template. This template includes a link for end users to complete email verification at any time after they successfully sign in to the application. See [Customize email notifications](/docs/guides/custom-email/main/) and the [Okta email (magic link/OTP) integration guide](/docs/guides/authenticators-okta-email/aspnet/main/#understand-the-magic-link-flow). <!-- OKTA-497102 and OKTA-488966 -->

#### Loading Page Animation feature for the Brands API is EA in Preview

When redirecting applications, you can use the [loading page variant property](/docs/reference/api/brands/#theme-object) (`loadingPageTouchPointVariant`) of the Brands API to display a blank page instead of the default Okta loading page animation. As a result, Okta's branding doesn't appear anywhere in the redirect user journey. <!-- OKTA-509771 -->

#### Progressive enrollment is GA in Production

Typically, collecting end-user data during the initial sign-up process creates friction and abandonment. The addition of the Progressive Enrollment feature helps you to capture the minimum user information required to create a profile and then continually build out those user profiles during subsequent sign-in operations. Admins can control what information is collected, validate those input values, and trigger inline hooks during the self-service registration and progressive enrollment flows. See [Registration of end users](https://help.okta.com/okta_help.htm?type=oie&id=ext-pe-policies) and [Registration inline hook](/docs/guides/registration-inline-hook/nodejs/main/). <!-- OKTA-508479 -->

#### PKCE validation for OIDC app integrations is Self-Service EA in Preview

You can now require Proof Key for Code Exchange (PKCE) as an additional verification for any OpenID Connect app integration except service apps. This more closely aligns with the OAuth Security Best Current Practice recommendation to use PKCE with the authorization code flow regardless of the client type. Use the `pkce_required` [property](/docs/reference/api/apps/#oauth-credential-object) with the Apps API to require PKCE for your app. <!-- OKTA-506682 -->

#### Signed request support for generic SAML IdP is GA in Preview

Using signed SAML requests ensures that incoming requests are from genuine applications. When this is configured, Okta only accepts SAML requests signed using the certificate associated with the app integration. Having signed SAML requests also resolves scenarios where the Assertion Consumer Service (ACS) URL requested after authentication can be one of several domains or URLs. When a Service Provider sends a signed authentication request, Okta can accept dynamic ACS values as part of the SAML request and posts the SAML assertion response to the ACS value specified in the request. See the Advanced Settings section of [Create SAML app integrations using AIW](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-aiw-saml). <!-- OKTA-508480 -->

#### Support for Okta Resource Name is GA in Preview

The [Okta Resource Name](/docs/concepts/role-assignment/#okta-resource-name-orn) (ORN) uniquely identifies an Okta [resource set](/docs/reference/api/roles/#resource-set-object) that is associated with a custom admin role assignment. <!-- OKTA-503417 -->

#### Trusted Origins for iFrame embedding is GA in Production

You can now choose which origins can embed Okta sign-in pages and the Okta End-User Dashboard using Trusted Origins for iFrame embedding. This feature offers a granular control over iFrame embedding compared to the existing embedding option in Customization, which doesn't let you distinguish between secure and non-secure origins. Trusted Origins (**Security** > **API**) allows you to selectively configure the origins that you trust. It also provides enhanced security as it uses a more secure `frame-ancestors` directive in Content Security Policy that protects your data from web attacks such as clickjacking. You can also migrate your existing iFrames to Trusted Origins. See [Trusted Origins API](/docs/reference/api/trusted-origins/). <!-- OKTA-510180 -->

#### User-scoped MyAccount API is GA in Production

The MyAccount API now provides user-scoped endpoints that don’t require admin tokens. The new endpoint is `/idp/myaccount`. End users only need a bearer token to update their email and phone authenticators. Additionally, app developers can call the MyAccount API for active users outside of the authentication context. For example, after a user enrolls in the mandatory email factor and completes authentication, app developers can call the API to enroll the active user with the optional phone authenticator. See [MyAccount API](/docs/reference/api/myaccount/). <!-- OKTA-508478 -->

#### Developer documentation updates in 2022.07.0

* A new [Custom Password Recovery guide](/docs/guides/oie-embedded-sdk-use-case-custom-pwd-recovery-mfa/java/main/) is now available for those wanting to link Email Magic Links directly to their applications with the Java IDX SDK.

* A new [User query options guide](/docs/reference/user-query/) is now available, with best practices for retrieving users from your org by using the `search` instead of `filter` or `q` query parameters in the Users API.

* New guides are now available for integrating [Google Authenticator](/docs/guides/authenticators-google-authenticator/java/main/), [Okta Email](/docs/guides/authenticators-okta-email/java/main/), and [WebAuthn authenticators](/docs/guides/authenticators-web-authn/java/main/) into an application with the Java IDX SDK.

* The [Customize email notifications guide](/docs/guides/custom-email/main/) now includes a list of allowed HTML tags and elements.

#### Bugs fixed in 2022.07.0

* A `Number` type schema property could erroneously be made unique. This resulted in inconsistent behavior and is no longer supported. Use `Integer` or `String` properties instead. (OKTA-506002)

* Sometimes an error occurred when an admin attempted to edit a resource set that included a deleted app. (OKTA-510483)

* Making a POST reset factors request to `/api/v1/users/${userId}/lifecycle/reset_factors` didn't reset the enrolled phone authenticator. (OKTA-463900)

## June

### Weekly release 2022.06.3

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2022.06.3](#bug-fixed-in-2022-06-3)                      | June 29, 2022            |

#### Bug fixed in 2022.06.3

The mandatory `profileAttributes` parameter wasn't validated and the primary `email` attribute was deleted from a Profile Enrollment policy when an update request was made to the Policy API. (OKTA-473642)

### Weekly release 2022.06.2

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.06.2](#bugs-fixed-in-2022-06-2)                      | June 23, 2022            |

#### Bugs fixed in 2022.06.2

* When an OAuth 2.0 client was created with a missing JWKS RSA modulus value (`n` parameter), the JWKS validation failed. (OKTA-424664)

* A POST reset factors request to `/api/v1/users/${userId}/lifecycle/reset_factors` didn't reset the enrolled phone authenticator. (OKTA-463900)

* When the `maxSessionLifetimeMinutes` property of the Policy API Signon Session object was set, the value wasn't enforced. (OKTA-480442)

* When the JSON Web Key API or the Client Credentials API was used to manage client credentials, the event wasn't triggered in the System Log. (OKTA-494619)

* When the Progressive Profiling feature was enabled, a request to the `/introspect` endpoint changed the state handle incorrectly. (OKTA-502233)

* The List custom roles API response returned wrong field values for the `description` and `lastUpdated` properties and didn't include the `_links` property. (OKTA-506993)

### Weekly release 2022.06.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.06.1](#bugs-fixed-in-2022-06-1) | June 15, 2022 |

#### Bugs fixed in 2022.06.1

* Resource Set operations performed with Okta Resource Names (ORNs) that used capital letters returned an HTTP 500 Internal Server Error. (OKTA-501910)

* When the `factorType` parameter was set to `token:software:totp`, the `amr` claim was missing MFA factors (Okta Verify/Challenge or Google Authenticator). (OKTA-499718)

* The Max Okta session lifetime setting for global session policy was ignored. (OKTA-480442)

* When token inline hooks were used in embedded flows, the hook request URL didn’t contain the complete path. When token inline hooks were used in redirect flows, the hook request didn't always contain the user object. (OKTA-499597)

* End user input values weren’t properly escaped in some fields of the self-service registration form. (OKTA-398717)

* Characters in the OAuth 2.0 consent logo URI (`logo_uri`) weren't encoded to prevent interference with HTTP Content Security Policy (CSP) directives. (OKTA-505553)

### Monthly release 2022.06.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Admin Roles with Delegated Flows Resource Set support is EA in Preview](#admin-roles-with-delegated-flows-resource-set-support-is-ea-in-preview) | May 25, 2022|
| [Dynamic IdP routing is EA in Preview](#dynamic-idp-routing-is-ea-in-preview) | June 8, 2022|
| [Email Address Bounces API is GA in Production](#email-address-bounces-api-is-ga-in-production) | March 2, 2022 |
| [Generic OIDC IdP nonce validation enforced](#generic-oidc-idp-nonce-validation-enforced) | June 8, 2022|
| [Group limit removed for Authorization Code grant type flows](#group-limit-removed-for-authorization-code-grant-type-flows) | June 8, 2022|
| [JWT claim enhancement](#jwt-claim-enhancement) | June 8, 2022|
| [Okta Verify rate limit updates](#okta-verify-rate-limit-updates) | June 8, 2022|
| [OIDC Identity Providers private/public key pair support is EA in Preview](#oidc-identity-providers-private-public-key-pair-support-is-ea-in-preview) | June 8, 2022|
| [Password as an optional authenticator is GA in Production](#password-as-an-optional-authenticator-is-ga-in-production) | March 30, 2022|
| [Regular expression support for matching users with a generic inbound OIDC IdP](#regular-expression-support-for-matching-users-with-a-generic-inbound-oidc-idp) | June 8, 2022|
| [Signed request support for generic SAML IdP is EA in Preview](#signed-request-support-for-generic-saml-idp-is-ea-in-preview) | June 8, 2022|
| [System Log events for telephony rate limit violations](#system-log-events-for-telephony-rate-limit-violations) | June 8, 2022|
| [Telephony inline hook is GA in Preview](#telephony-inline-hook-is-ga-in-preview) | March 30, 2022|
| [User-scoped MyAccount API is GA in Preview](#user-scoped-myaccount-api-is-ga-in-preview) | May 11, 2022|
| [Bugs fixed in 2022.06.0](#bugs-fixed-in-2022-06-0) | June 8, 2022 |

#### Admin Roles with Delegated Flows Resource Set support is EA in Preview

With delegated flows, admins can be assigned the ability to run Okta Workflows through the Administrator Roles API. Flows that are delegated to an admin appear in the **Delegated Flows** page where admins can invoke them without signing in to the Workflows Console. This gives super admins more granular control over their admin assignments. See [Resource Sets](/docs/concepts/role-assignment/#resource-sets) in the Custom Role assignment concept and [Supported resources](/docs/reference/api/roles/#supported-resources) in the Administrator Roles API. <!-- OKTA-450117 -->

#### Dynamic IdP routing is EA in Preview

Org admins can now consolidate multiple IdP routing rules into a single dynamic routing rule. Dynamic routing rules use expression language to match users to any IdP, based on attributes of their login object. This reduces the volume and complexity of routing rules and the manual effort of managing them. See [Policy Action with Dynamic IdP routing](/docs/reference/api/policy/#policy-action-with-dynamic-idp-routing). <!-- OKTA-501508 -->

#### Email Address Bounces API is GA in Production

Okta admins can now control the bounced email address list through the [Email Address Bounces API](/docs/reference/api/org/#email-address-bounces-operations). When Okta-sent email addresses are blocked from an email service (the bounced email list), admins can use this API to create a list of blocked email addresses to be removed from the email service. Note: This API is not available in Free Trial and Developer orgs. <!-- OKTA-482000 -->

#### Generic OIDC IdP nonce validation enforced

For generic OIDC IdPs, Okta fails the authentication if the returned ID token doesn’t contain the `nonce` that was sent with the initial authorize request. <!-- OKTA-486805 -->

#### Group limit removed for Authorization Code grant type flows

The 100-group limit for the `/token` endpoint is removed for the Authorization Code and Authorization Code with PKCE grant type flows when the Groups Claim Type is **Filter**. <!-- OKTA-497701 -->

#### JWT claim enhancement

Okta accepts claim names in URI format (with colon and slash characters) for custom claims in the JSON Web Token (JWT) payload. For example, `http://example.com/is_root` is a supported claim name. <!-- OKTA-496380 -->

#### OIDC Identity Providers private/public key pair support is EA in Preview

Previously, Okta only supported the use of client secret as the client authentication method with an OpenID Connect-based Identity Provider. Okta now supports the use of private/public key pairs (`private_key_jwt`) with OpenID Connect-based Identity Providers. Additionally, the Signed Request Object now also supports the use of private/public key pairs. See [Create an Identity Provider in Okta](/docs/guides/add-an-external-idp/openidconnect/main/#create-an-identity-provider-in-okta). <!-- OKTA-502636 -->

#### Okta Verify rate limit updates

Users who attempt to enroll in Okta Verify using SMS can now be rate limited. These rate limit events are now logged in the [System Log](/docs/reference/rl-system-log-events/). <!-- OKTA-502577 -->

#### Password as an optional authenticator is GA in Production

Passwords are weak authenticators and prone to security issues. Currently all users are required to enroll a password. This also causes friction during the self-service registration process. You can now create a password-optional or passwordless sign-in experience for your end users. It makes the registration process quicker by removing the need to set up a password. It also provides a safer and more secure sign-in experience as users can instead use stronger authenticators such as possession-based authenticators or biometrics. Okta gives you the flexibility to target specific groups of users in your organization with passwordless flows, allowing you to gradually roll out the experience across your entire user base. See [Create User with Optional Password enabled](/docs/reference/api/users/#create-user-with-optional-password-enabled). <!-- OKTA-497367 -->

#### Regular expression support for matching users with a generic inbound OIDC IdP

Admins can configure the Okta OIDC Identity Provider to only authenticate users from an inbound OIDC IdP if their usernames match a predefined regular expression pattern. See the `filter` property from the [Subject Policy object](/docs/reference/api/idps/#subject-policy-object) in the IdPs API and the Authentication Settings section in the [OIDC IdP](/docs/guides/add-an-external-idp/openidconnect/main/#create-an-identity-provider-in-okta) configuration. <!-- OKTA-500903 -->

#### Signed request support for generic SAML IdP is EA in Preview

Using signed SAML requests ensures that incoming requests are from genuine applications. When a signed SAML request is configured, Okta only accepts SAML requests signed using the certificate associated with the app integration. Having signed SAML requests also resolves scenarios where the Assertion Consumer Service (ACS) URL requested after authentication can be one of several domains or URLs. When a Service Provider sends a signed authentication request, Okta can accept dynamic ACS values as part of the SAML request and posts the SAML assertion response to the ACS value specified in the request. See the Advanced Settings section of [Create SAML app integrations using AIW](https://help.okta.com/okta_help.htm?type=oie&id=csh-apps-aiw-saml). <!-- OKTA-493043 -->

#### System Log events for telephony rate limit violations

Telephony `system.sms.send.*` and `system.voice.send.*` events are now issued as a `DENY` System Log message when SMS or Voice messages are blocked due to telephony operational rate limit violations. The `system.operation.rate_limit.violation` event is still fired, but will be deprecated in the 2022.08.0 release. See the [System Log API](/docs/reference/api/system-log/). <!-- OKTA-498664 -->

#### Telephony inline hook is GA in Preview

While Okta provides out-of-the-box telephony functionality, many customers need the ability to integrate their existing telecommunications provider with Okta to deliver SMS and Voice messages. The telephony inline hook allows customers to generate One-Time Passcodes within Okta, and then use their existing telecommunications provider to deliver the messages for MFA enrollment/verification, password reset, and account unlock. This allows customers to use their existing telephony solution within Okta, due to the time they've already invested in their existing telephony solution, the need to use a specific regional provider, or simply the desire to maintain flexibility. See [Telephony inline hook with Twilio](/docs/guides/telephony-inline-hook/nodejs/main/). <!-- OKTA-491573 -->

#### User-scoped MyAccount API is GA in Preview

The MyAccount API now provides user-scoped endpoints that don’t require admin tokens. The new endpoint is `/idp/myaccount`. End users only need a bearer token to update their email and phone authenticators. In addition, app developers can call the MyAccount API for active users outside of the authentication context. For example, after a user enrolls in the mandatory email factor and completes authentication, app developers can call the API to enroll the active user with the optional phone authenticator. See [MyAccount API](/docs/reference/api/myaccount/). <!-- OKTA-496877 -->

#### Bugs fixed in 2022.06.0

* The User Consent URIs (`logo_uri`, `policy_uri`, and `tos_uri`) configured in an app's [settings](/docs/reference/api/apps/#settings-10) weren't validated for HTTP or HTTPS URI schemes. (OKTA-395220)

* Primary and secondary email addresses weren't verified when the email addresses were added or modified through the `/users/me` [API endpoint](/docs/reference/api/users/#update-current-user-s-profile). This issue was fixed in 2022.05.0. (OKTA-444089)

* No System Log error event was triggered when a request to the [Forgot password API endpoint](/docs/reference/api/users/#forgot-password) (`/users/{userId}/credentials/forgot_password`) was made for a user with a `LOCKED_OUT` status. (OKTA-485242)

* No error messages were returned when an API request was made to [create](/docs/reference/api/roles/#create-resource-set) or [update](/docs/reference/api/roles/#add-more-resources) a resource set with invalid ORNs. This occurred if the request was made to an org with the **Okta Resource Name (ORN) in API for Administrator Roles** feature enabled. (OKTA-499775)

## May

### Weekly release 2022.05.3

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.05.3](#bugs-fixed-in-2022-05-3) | May 25, 2022 |

#### Bugs fixed in 2022.05.3

* Post calls to the Org API endpoint that creates an email bounces remove list (`/org/email/bounces/remove-list`) sometimes returned an HTTP 500 Internal Server Error. (OKTA-497859)

* The response returned from the `/introspect` endpoint during the unlock-account user flow wasn't the same response that was sent initially. (OKTA-452191)

* The wrong response code was returned when an [access policy rule](/docs/guides/customize-authz-server/main/#create-rules-for-each-access-policy) didn't have the Interaction Code grant type enabled. (OKTA-463497)

* Using the [API](/docs/reference/api/authorization-servers/#claim-operations) to create a claim with a reserved name resulted in an unclear error message. (OKTA-477575)

### Weekly release 2022.05.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [User-scoped MyAccount API is EA in Preview](#user-scoped-myaccount-api-is-ea-in-preview) | May 11, 2022 |
| [Progressive Enrollment is EA in Preview](#progressive-enrollment-is-ea-in-preview) | May 11, 2022 |
| [The API for suppressing email notifications is EA in Preview](#the-api-for-suppressing-email-notifications-is-ea-in-preview) | May 11, 2022 |
| [Bug fixed in 2022.05.1](#bug-fixed-in-2022-05-1) | May 11, 2022 |

#### User-scoped MyAccount API is EA in Preview

The MyAccount API now provides user-scoped endpoints that don’t require admin tokens. The new endpoint is `/idp/myaccount`. End users only need a bearer token to update their email and phone authenticators. In addition, app developers can call the MyAccount API for active users outside of the authentication context. For example, after a user enrolls in the mandatory email factor and completes authentication, app developers can call the API to enroll the active user with the optional phone authenticator. See [MyAccount API](/docs/reference/api/myaccount/).

#### Progressive Enrollment is EA in Preview

Typically, collecting end-user data during the initial sign-up process creates friction and abandonment. The addition of the Progressive Enrollment feature helps you to capture the minimum user information required to create a profile and then continually build out those user profiles during subsequent sign-in operations. Admins can control what information is collected, validate those input values, and trigger inline hooks during the self-service registration and progressive enrollment flows. See [Registration of end users](https://help.okta.com/okta_help.htm?type=oie&id=ext-pe-policies) and [Registration inline hook](/docs/guides/registration-inline-hook/nodejs/main/).

#### The API for suppressing email notifications is EA in Preview

This API allows you to change who receives email notifications for each individual email template. You can suppress them completely, or send them to admins only. This unlocks testing scenarios that warrant using production user directories, and prevents end users from getting test emails. It also allows extensibility for customers who would like to use a third party email sender through Hooks or Workflows. See [Email template settings](/docs/reference/api/brands/#email-template-settings).

#### Bug fixed in 2022.05.1

When [role target operations](/docs/reference/api/roles/#role-target-operations) included an invalid `roleId`, an incorrect 500 system error was returned. (OKTA-487507)

### Monthly release 2022.05.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Email Address Bounces API is GA in Preview](#email-address-bounces-api-is-ga-in-preview) | March 2, 2022 |
| [Trusted Origins for iFrame embedding is EA in Preview](#trusted-origins-for-iframe-embedding-is-ea-in-preview) | May 4, 2022|
| [Authorize requests to generic OIDC IdPs now include nonce parameter](#authorize-requests-to-generic-oidc-idps-now-include-nonce-parameter) | May 4, 2022 |
| [Signed request support for generic OIDC IdP is GA in Production](#signed-request-support-for-generic-oidc-idp-is-ga-in-production) | March 2, 2022 |
| [Client secret rotation and key management is GA in Production](#client-secret-rotation-and-key-management-is-ga-in-production) | February 3, 2022 |
| [Okta API access with OAuth 2.0 for Org2Org is GA in Production](#okta-api-access-with-oauth-2-0-for-org2org-is-ga-in-production) | February 16, 2022 |
| [New permissions for custom admin roles](#new-permissions-for-custom-admin-roles) | May 4, 2022 |
| [Password as an optional authenticator is GA in Preview](#password-as-an-optional-authenticator-is-ga-in-preview) | March 30, 2022 |
| [Bugs fixed in 2022.05.0](#bugs-fixed-in-2022-05-0) | May 4, 2022 |

#### Email Address Bounces API is GA in Preview

Okta admins can now control the bounced email address list through the Email Address Bounces API. When Okta-sent email addresses are blocked from an email service (the bounced email list), admins can use this API to create a list of blocked email addresses to be removed from the email service. Note: This API is not available in Free Trial and Developer orgs. <!-- OKTA-481959 -->

#### Trusted Origins for iFrame embedding is EA in Preview

You can now choose what origins can embed Okta sign-in pages and Okta End-User Dashboard using Trusted Origins for iFrame embedding. This feature offers a granular control over iFrame embedding compared to the existing embedding option in Customization, which doesn't let you distinguish between secure and non-secure origins. Trusted Origins allow you to selectively configure the origins you trust. It also provides enhanced security as it uses a more secure `frame-ancestors` directive in Content Security Policy that protects your data from web attacks such as clickjacking. See [Trusted Origins API](/docs/reference/api/trusted-origins/). <!-- OKTA-494132 -->

#### Authorize requests to generic OIDC IdPs now include nonce parameter

For generic OIDC IdPs, a  randomized `nonce` parameter is now included in all authorize requests. The `nonce` value is sent to the IdP and can be verified in the returned ID Token. See [Identity Providers API](/docs/reference/api/idps/#oauth-2-0-authorization-server-authorization-endpoint-object). <!-- OKTA-199689 -->

#### Signed request support for generic OIDC IdP is GA in Production

When customers integrate Okta with an OIDC-based IdP, Okta asks the IdP to authenticate the user with request elements that are passed as query parameters in the URL. The new Signed Request Object allows customers to send these parameters encoded in a JWT instead, improving security on the authorization request sent to the OIDC provider or authorization server. <!-- OKTA-489014 -->

#### Client secret rotation and key management is GA in Production

Rotating client secrets without service or application downtime is a challenge. Additionally, JSON Web Key management can be cumbersome. To make [client secret rotation](/docs/guides/client-secret-rotation-key/main/) a seamless process and improve JWK management, you can now create overlapping client secrets and manage JWK key pairs in the Admin Console. You can also create JWK key pairs from the Admin Console without having to use an external tool. <!-- OKTA-489016 -->

#### Okta API access with OAuth 2.0 for Org2Org is GA in Production

The Okta Org2Org integration enables you to push and match both users and groups from one Okta org to another. Previously, this integration only supported token-based access to the Okta API. You can now [configure the Org2Org integration](/docs/guides/secure-oauth-between-orgs/) to access the Okta API as an [OAuth 2.0 client](/docs/reference/api/apps/#token-based-provisioning-connection-profile-properties). This increases security by limiting the scope of access and providing a better mechanism to rotate credentials. <!-- OKTA-493694 -->

#### New permissions for custom admin roles

Super admins can now assign these new permissions to their custom admin roles:

* Manage authorization server
* View authorization server
* Manage customizations
* View customizations

The authorization server permissions can be scoped to a subset of the org’s authorization servers. With these new permissions, super admins can now create custom admin roles with more granular permissions for managing their org’s customizations and authorization servers. See [ORN Resource Sets in the Role assignment](/docs/concepts/role-assignment/#okta-resource-name-orn) concept and the [Resource Set object in the Administrator Roles API](/docs/reference/api/roles/#resource-set-object). <!--  OKTA-487349 -->

#### Password as an optional authenticator is GA in Preview

Passwords are weak authenticators and prone to security issues. Currently all users are required to enroll a password. This also causes friction during the self-service registration process. You can now create a password-optional or passwordless sign-in experience for your end users. It makes the registration process quicker by removing the need to set up a password. It also provides a safer and more secure sign-in experience as users can instead use stronger authenticators such as possession-based authenticators or biometrics. Okta gives you the flexibility to target specific groups of users in your organization with passwordless flows, allowing you to gradually roll out the experience across your entire user base. See [Create User with Optional Password enabled](/docs/reference/api/users/#create-user-with-optional-password-enabled). <!-- OKTA-492427 -->

#### Bugs fixed in 2022.05.0

* Web and SPA app integrations using the [OIDC API](/docs/reference/api/oidc/) with the `Login Initiated By` feature incorrectly returned an error if they were created using an `authorization_code` or `interaction_code` grant type. (OKTA-435855)

* If the Administrator Roles API ([users](/docs/reference/api/roles/#remove-a-group-target-from-a-group-administrator-role-given-to-a-user) and [groups](/docs/reference/api/roles/#remove-a-group-target-from-a-group-administrator-role-given-to-a-group)) endpoints contained an invalid role type, an HTTP 500 Internal Server Error was returned. (OKTA-393032)

* Custom email address attribute mapping for the GitHub IdP failed due to a conflict in the `id` external attribute. (OKTA-460058)

## April

### Weekly release 2022.04.3

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2022.04.3](#bug-fixed-in-2022-04-3) | April 20, 2022 |

#### Bug fixed in 2022.04.3

* When an unsupported [constraint](/docs/reference/api/policy/#constraints) was added to the authentication policy verification method, an error wasn't returned from the Policy API.  (OKTA-434893)

### Weekly release 2022.04.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.04.1](#bugs-fixed-in-2022-04-1) | April 6, 2022 |

#### Bugs fixed in 2022.04.1

* An HTTP 500 internal server error sometimes occurred after saving an app instance. (OKTA-483001)

* Active Directory email activation templates that were translated for the Japanese, Korean, and Chinese languages didn’t render correctly. (OKTA-469764)

* An OIDC app couldn’t be updated for an IdP-initiated login with Okta flow when the **Initiate login URI** field in the Admin Console was empty. (OKTA-447112)

### Monthly release 2022.04.0

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Improved email magic link authentication experience is EA in Preview](#improved-email-magic-link-authentication-experience-is-ea-in-preview) | March 30, 2022 |
| [Password as an optional authenticator is EA in Preview](#password-as-an-optional-authenticator-is-ea-in-preview) | March 30, 2022 |
| [Native SSO support is EA in Preview](#native-sso-support-is-ea-in-preview) | March 30, 2022 |
| [Telephony inline hook is EA in Preview](#telephony-inline-hook-is-ea-in-preview) | March 30, 2022 |
| [Splunk available for Log Streaming is EA in Preview](#splunk-available-for-log-streaming-is-ea-in-preview) | March 30, 2022 |
| [Burst rate limits available on Rate Limit Dashboard](#burst-rate-limits-available-on-rate-limit-dashboard) | March 30, 2022 |
| [OAuth 2.0 Push Authorization Requests](#oauth-2-0-push-authorization-requests) | March 30, 2022 |
| [Signed request support for generic OIDC IdP is GA in Preview](#signed-request-support-for-generic-oidc-idp-is-ga-in-preview) | March 02, 2022 |
| [Okta Org2Org integration supporting Okta API access using an OAuth 2.0 client is GA in Preview](#okta-org2org-integration-supporting-okta-api-access-using-an-oauth-2-0-client-is-ga-in-preview) | February 16, 2022 |
| [Client secret rotation and key management is GA in Preview](#client-secret-rotation-and-key-management-is-ga-in-preview) | February 03, 2022 |
| [Bug fixed in 2022.04.0](#bug-fixed-in-2022-04-0) | March 30, 2022 |

#### Improved email magic link authentication experience is EA in Preview

Email magic links are enhanced to allow end users to authenticate in two different contexts. The end user can authenticate using the same location where they click the link and quickly return to the application context. Or, if the end user clicks the link in a different browser, they can enter a one-time passcode to proceed with authentication. See [Okta email (magic link/OTP) integration guide](/docs/guides/authenticators-okta-email/aspnet/main/) and [Use redirect auth with the Identity Engine sample apps](/docs/guides/sampleapp-oie-redirectauth/).

#### Password as an optional authenticator is EA in Preview

Passwords are weak authenticators and prone to security issues. Currently all users are required to enroll a password. This also causes friction during the self-service registration process. You can now create a password-optional or passwordless sign-in experience for your end users. It makes the registration process quicker by removing the need to set up a password. It also provides a safer and more secure sign-in experience as users can instead use stronger authenticators such as possession-based authenticators or biometrics. Okta gives you the flexibility to target specific groups of users in your organization with passwordless flows, allowing you to gradually roll out the experience across your entire user base. See [Create User with Optional Password enabled](/docs/reference/api/users/#create-user-with-optional-password-enabled).

#### Native SSO support is EA in Preview

Single Sign-On (SSO) between browser-based web apps is achieved by leveraging shared cookies. Unlike web applications, native applications can't use web cookies. With Native SSO, Okta offers a token-based approach to achieve SSO between native applications.

Native SSO allows you to protect native OpenID Connect applications, such as desktop apps and mobile apps, and achieve SSO and Single Logout (SLO) between these applications. See [Configure SSO for native apps](/docs/guides/configure-native-sso/main/).

#### Telephony inline hook is EA in Preview

While Okta provides out-of-the-box telephony functionality, many customers need the ability to integrate their existing telecommunications provider with Okta to deliver SMS and Voice messages. The telephony inline hook allows customers to generate One-Time Passcodes within Okta, and then use their existing telecommunications provider to deliver the messages for MFA enrollment/verification, password reset, and account unlock. This allows customers to use their existing telephony solution within Okta, due to the time they've already invested in their existing telephony solution, the need to use a specific regional provider, or simply the desire to maintain flexibility. See [Telephony inline hook with Twilio](/docs/guides/telephony-inline-hook/nodejs/main/).

#### Splunk available for Log Streaming is EA in Preview

Many organizations use third-party systems to monitor, aggregate, and act on the event data in Okta System Log events.

Log Streaming enables Okta admins to more easily and securely send System Log events to a specified system such as the Splunk Cloud in near real time with simple, pre-built connectors. Log streaming scales well even with high event volume, and unlike many existing System Log event collectors, it does not require a third-party system to store an Okta Admin API token. See [Splunk Cloud in the Log Streaming API](/docs/reference/api/log-streaming/#splunk-cloud-settings-object).

#### Burst rate limits available on Rate Limit Dashboard

The Rate Limit Dashboard, available from the Admin Console, now includes data on burst limits in your Okta org, in addition to rate limit warnings and violations. The Violations dashboard was renamed Events to acknowledge the increase of scope, and includes the ability to filter on timeline as well as the type of event (warning, burst, and violation). Hovering over the burst rates in the graphs provides more detail and links to the system log for individual endpoint calls. The individual Usage graphs provide details on bursts for the individual API. See [Rate limit dashboard](/docs/reference/rl-dashboard/) and [Burst rate limits](/docs/reference/rate-limits/#burst-rate-limits).

#### OAuth 2.0 Push Authorization Requests

Okta authorization servers now support push authorization requests in the `/par` endpoint to enhance OAuth security. This feature allows clients to push the payload of an OAuth 2.0 authorization request to the authorization server through a direct `/par` request and, in return, a request URI that is used to reference the payload data is provided by the authorization server. The request URI is then used in a subsequent `/authorize` request to reference the initial authorization payload. See the [/par](/docs/reference/api/oidc/#par) OAuth 2.0 API endpoint.

#### Signed request support for generic OIDC IdP is GA in Preview

When customers [integrate Okta with an OpenID Connect-based Identity Provider](/docs/guides/add-an-external-idp/openidconnect/main/#create-an-identity-provider-in-okta), Okta asks the IdP to authenticate the user with request elements that are passed as query parameters in the URL. The new [Signed Request Object](/docs/reference/api/idps/#oidc-algorithms-object) allows customers to send these parameters encoded in a JWT instead, improving security on the authorization request sent to the OpenID Connect provider or authorization server.

#### Client secret rotation and key management is GA in Preview

Rotating client secrets without service or application downtime is a challenge. Additionally, JSON Web Key management can be cumbersome. To make [client secret rotation](/docs/guides/client-secret-rotation-key/) a seamless process and improve JWK management, you can now create overlapping client secrets and manage JWK key pairs in the Admin Console. You can also create JWK key pairs from the Admin Console without having to use an external tool.

#### Okta Org2Org integration supporting Okta API access using an OAuth 2.0 client is GA in Preview

The Okta Org2Org integration enables you to push and match both users and groups from one Okta org to another. Previously, this integration only supported token-based access to the Okta API. You can now [configure the Org2Org integration](/docs/guides/secure-oauth-between-orgs/) to access the Okta API as an [OAuth 2.0 client](/docs/reference/api/apps/#token-based-provisioning-connection-profile-properties). This increases security by limiting the scope of access and providing a better mechanism to rotate credentials.

#### Bug fixed in 2022.04.0

Performing a POST request on the `/apps/{applicationId}` [endpoint](/docs/reference/api/apps/#update-application) didn't update the secret if the org had the [Client Credentials Management](/docs/guides/implement-grant-type/clientcreds/main/#client-credentials-flow) feature enabled. (OKTA-482341)

## March

### Weekly release 2022.03.3

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bug fixed in 2022.03.3](#bugs-fixed-in-2022-03-3) | March 23, 2022 |

#### Bug fixed in 2022.03.3

The `auth_time` [claim](/docs/reference/api/oidc/#reserved-claims-in-the-header-section) wasn't defined as a reserved system claim. (OKTA-478924)

### Weekly release 2022.03.2

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.03.2](#bugs-fixed-in-2022-03-2) | March 16, 2022 |

#### Bugs fixed in 2022.03.2

* An error was returned when a valid [update request](/docs/reference/api/authorization-servers/#update-a-scope) was made for the `device_sso` or `online_access` system scopes. (OKTA-417477)

* Sending an [error object](/docs/reference/registration-hook/#error) in the response message of an Inline Registration Hook resulted in an error message that included domain details and didn’t target attributes. (OKTA-473152)

### Weekly release 2022.03.1

| Change | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.03.1](#bugs-fixed-in-2022-03-1) | March 09, 2022 |

#### Bugs fixed in 2022.03.1

* Performing a GET request on the `/policies/` [endpoint](/docs/reference/api/policy/) sometimes returned a page with the wrong number of items. (OKTA-455164)
* When the [List email templates](/docs/reference/api/brands/#list-email-templates) or the [List email customizations](/docs/reference/api/brands/#list-email-customizations) operations were performed on the `/brands/` endpoint, the base address in the link response header contained the `-admin` string instead of the requested base address. (OKTA-465356)
* When modifying the [custom email activation template](/docs/guides/custom-email/main/#use-customizable-email-templates), an admin could save the template without either of the required `verificationLink` or `verificationToken` elements. (OKTA-472895)
* When modifying the [custom email challenge template](/docs/guides/custom-email/main/#use-customizable-email-templates), an admin could save the template without either of the required `emailAuthenticationLink` or `verificationToken` elements. (OKTA-472928)

### Monthly release 2022.03.0

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Authentication timestamp is added as an access token claim](#authentication-timestamp-is-added-as-an-access-token-claim) | March 2, 2022 |
| [Custom Administrator Roles is GA in Production](#custom-administrator-roles-is-ga-in-production) | February 3, 2022 |
| [Email Address Bounces API is EA in Preview](#email-address-bounces-api-is-ea-in-preview) | March 2, 2022 |
| [Shareable Authentication Policies](#shareable-authentication-policies) | March 2, 2022 |
| [Signed request support for generic OIDC IdP is EA in Preview](#signed-request-support-for-generic-oidc-idp-is-ea-in-preview) | March 2, 2022 |
| [Bugs fixed in 2022.03.0](#bugs-fixed-in-2022-03-0)         | March 2, 2022           |

#### Authentication timestamp is added as an access token claim

The user-authenticated epoch timestamp is provided as the `auth_time` [claim in the access token](/docs/reference/api/oidc/#reserved-claims-in-the-payload-section).

#### Custom Administrator Roles is GA in Production

The Okta [Custom Administrator Roles](/docs/reference/api/roles/) API provides operations that you can use to create customized roles and assign them to a user or a group.

#### Email Address Bounces API is EA in Preview

Okta admins can now control the bounced email address list through the [Email Address Bounces API](/docs/reference/api/org/#email-address-bounces-operations). When Okta-sent email addresses are blocked from an email service (the bounced email list), admins can use this API to create a list of blocked email addresses to be removed from the email service.

#### Shareable Authentication Policies

Admins can now manage authentication policies using a centralized view. While authentication policies allowed admins the ability to make application access decisions using user, device, and other contextual information, managing these policies across hundreds of applications became challenging and error-prone.

On the new Authentication Policies page, admins can create new policies, apply those policies to multiple applications, and assess what application access decisions are impacted by each policy.

Two policy name changes are included in this release: app sign-on policy is renamed authentication policy, and Okta sign-on policy is renamed global session policy. See [Configure a global session policy and authentication policies](/docs/guides/configure-signon-policy/) and [Authentication policies](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-asop).

#### Signed request support for generic OIDC IdP is EA in Preview

When customers [integrate Okta with an OpenID Connect-based Identity Provider](/docs/guides/add-an-external-idp/openidconnect/main/#create-an-identity-provider-in-okta), Okta asks the IdP to authenticate the user with request elements that are passed as query parameters in the URL. The new [signed request object](/docs/reference/api/idps/#oidc-algorithms-object) allows customers to send these parameters encoded in a JWT instead, improving security on the authorization request sent to the OpenID Connect provider or authorization server.

#### Bugs fixed in 2022.03.0

* When ThreatInsight evaluated sign-in attempts for unknown users, the threat level was incorrectly displayed as `threatLevel=UNKNOWN` in the System Log. (OKTA-471299)

* The OAuth 2.0 [`/token`](/docs/reference/api/oidc/#token) and [`/authorize`](/docs/reference/api/oidc/#authorize) endpoints accepted requests that included the `resource` parameter. (OKTA-476549)

## February

### Weekly release 2022.02.2

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Okta Org2Org integration now supports Okta API access using an OAuth 2.0 client](#okta-org2org-integration-now-supports-okta-api-access-using-an-OAuth-2-0-client)                        | February 16, 2022         |

#### Okta Org2Org integration now supports Okta API access using an OAuth 2.0 client

The Okta Org2Org integration enables you to push and match both users and groups from one Okta org to another. Previously, this integration only supported token-based access to the Okta API. You can now [configure the Org2Org integration](/docs/guides/secure-oauth-between-orgs/) to access the Okta API as an [OAuth 2.0 client](/docs/reference/api/apps/#token-based-provisioning-connection-profile-properties). This increases security by limiting the scope of access and providing a better mechanism to rotate credentials. <!-- OKTA-468121 -->

### Weekly release 2022.02.1

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [API token ID added to System Log event types](#api-token-id-added-to-system-log-event-types)                        | February 9, 2022         |
| [Bug fixed in 2022.02.1](#bug-fixed-in-2022-02-1)                        | February 9, 2022         |

#### API token ID added to System Log event types

API requests that include an API token and return a System Log event now include the API token in the event payload. The token identifier appears in the System Log API `transaction.details.requestApiTokenId` field and in the `Event > System > Transaction > Detail > RequestApiTokenId` node in the Admin Console System Log.

To view an example of this new event detail, [create a user by API](/docs/guides/quickstart/main/#create-a-user-by-api) and view the associated event (`user.lifecycle.create`).

#### Bug fixed in 2022.02.1

The [OAuth token endpoint](/docs/reference/api/oidc/#response-example-error-2) didn’t reject requests that included a `code_verifier` parameter if the [authorization call](/docs/reference/api/oidc/#authorize) was issued without the PKCE `code_challenge` parameter. (OKTA-461970)

### Monthly release 2022.02.0

| Change                                                                   | Expected in Preview Orgs |
|--------------------------------------------------------------------------|--------------------------|
| [Custom Administrator Roles is GA in Preview](#custom-administrator-roles-is-ga-in-preview) | February 3, 2022 |
| [Client secret rotation and key management is EA](#client-secret-rotation-and-key-management-is-ea) | February 3, 2022 |
| [Group role assignment improvement](#group-role-assignment-improvement) | February 3, 2022 |
| [Custom Domains with Okta-Managed Certificates is GA in Production](#custom-domains-with-okta-managed-certificates-is-ga-in-production) | February 3, 2022 |
| [Bug fixed in 2022.02.0](#bug-fixed-in-2022-02-0)         | February 3, 2022           |

#### Custom Administrator Roles is GA in Preview

The Okta [Custom Administrator Roles](/docs/reference/api/roles/) API provides operations that you can use to create customized roles and assign them to a user or a group. <!--OKTA-457514-->

#### Client secret rotation and key management is EA

Rotating client secrets without service or application downtime is a challenge. Additionally, JSON Web Key management can be cumbersome. To make [client secret rotation](/docs/guides/client-secret-rotation-key/) a seamless process and improve JWK management, you can now create overlapping client secrets and manage JWK key pairs in the Admin Console. You can also create JWK key pairs from the Admin Console without having to use an external tool. <!--OKTA-460699-->

#### Group role assignment improvement

[Assigning a role to a group](/docs/reference/api/roles/#assign-a-role-to-a-group) through the Administrator Roles API has been enhanced by retaining the existing role assignment ID where possible. <!--OKTA-457506-->

#### Custom Domains with Okta-Managed Certificates is GA in Production

When you customize an Okta URL domain, your Okta-hosted pages are branded with your own URL. [Okta-managed Certificates](/docs/guides/custom-url-domain/main/#configure-a-custom-domain-through-okta-managed-certificates) auto renew through a Let's Encrypt integration, a free certificate authority. Since Okta handles certificate renewals, this reduces customer developer maintenance costs and the high risk of a site outage when certificates expire.  <!--OKTA-459338-->

#### Bug fixed in 2022.02.0

In the [Custom Administrator Roles](/docs/reference/api/roles/) API, some public DELETE requests returned a different response code than their contract. (OKTA-456896)

## January

### Weekly release 2022.01.2

| Change                                                                                              | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------|--------------------------|
| [Device information in the OAuth 2.0 Interaction Code flow](#device-information-in-the-oauth-2-0-interaction-code-flow) | January 26, 2022 |
| [Fewer digits revealed for shorter phone numbers](#fewer-digits-revealed-for-shorter-phone-numbers) | January 26, 2022 |
| [Bugs fixed in 2022.01.2](#bugs-fixed-in-2022-01-2)         | January 26, 2022           |

#### Device information in the OAuth 2.0 Interaction Code flow

Confidential clients can now specify device information using the `X-Device-Token` header during the OAuth 2.0 [Interaction Code flow](/docs/guides/implement-grant-type/interactioncode/main/). <!--OKTA-455553-->

#### Fewer digits revealed for shorter phone numbers

The masking algorithm now reveals fewer digits in API responses for shorter profile phone numbers. <!--OKTA-455393-->

#### Bugs fixed in 2022.01.2

* Administrators were able to access and modify internal policies. (OKTA-455506)

* When an invalid client assertion type was provided during a [Client Credentials grant type flow](/docs/guides/implement-grant-type/clientcreds/main/), the error response code was 401 instead of 400. (OKTA-456503)

* When the [Create a new Binding](/docs/reference/api/roles/#create-a-new-binding) or the [Add more Members to a Binding](/docs/reference/api/roles/#add-more-members-to-a-binding) operation was performed on the `/iam/resource-sets` endpoint, and included all users or all groups in the request, the request didn't fail as expected. (OKTA-459994)

* When the [Get all policies](/docs/reference/api/policy/#get-all-policies-by-type) operation was performed on the `/policies` endpoint, unused Radius policies were returned. (OKTA-460965)

### Weekly release 2022.01.1

| Change                                                                                              | Expected in Preview Orgs |
|-----------------------------------------------------------------------------------------------------|--------------------------|
| [Bugs fixed in 2022.01.1](#bugs-fixed-in-2022-01-1)         | January 13, 2022           |

#### Bugs fixed in 2022.01.1

* If the [Create a Scope](/docs/reference/api/authorization-servers/#create-a-scope) endpoint received multiple requests at or near the same time, duplicate Scopes could be created. (OKTA-442533)

* When the [Update resource set](/docs/reference/api/roles/#update-resource-set) endpoint was called, the `resourceSetId` parameter was required in the body of the request. (OKTA-445144)

* When the [Upload Theme background image](/docs/reference/api/brands/#upload-theme-background-image) endpoint was called, the image was converted to PNG format. (OKTA-458260)

* When the [List events](/docs/reference/api/system-log/#list-events) operation was performed on the `/logs` endpoint, some system logs showed the incorrect status for debug behaviors if there was missing data that prevented behavior evaluation. (OKTA-455372)

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
