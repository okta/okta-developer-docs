---
title: Okta Identity Engine API Products release notes 2024
---

<ApiLifecycle access="ie" />

> Help us improve our release notes by filling out this short [survey](https://surveys.okta.com/jfe/form/SV_4VEZcIGOX0TBgkC).

## January

### Weekly release 2024.01.2

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Identity Threat Protection with Okta AI](#identity-threat-protection-with-okta-ai)| January 31, 2024 |
| [Content Security Policy for custom domains is EA in Preview](#content-security-policy-for-custom-domains-is-ea-in-preview)| January 31, 2024 |
| [Granular API policy authenticator controls is self-service EA in Preview](#granular-api-policy-authenticator-controls-is-self-service-ea-in-preview)| January 31, 2024 |
| [Bugs fixed in 2024.01.2](#bugs-fixed-in-2024-01-2) | January 31, 2024 |

#### Identity Threat Protection with Okta AI

Identity Threat Protection with Okta AI is a powerful risk assessment and response solution that provides post-authentication security to your org. By continuously analyzing risk signals that are native to Okta, risk signals from integrated security partner vendors, and your policy conditions, it safeguards orgs against identity attacks that occur during and outside of a user's session. When Identity Threat Protection discovers a risk, it can immediately end the user's sessions, prompt an MFA challenge, or invoke a workflow to restore your org's security posture. Using intuitive dashboard widgets and reports, you can easily monitor security threats as they happen. See <link>.

#### Content Security Policy for custom domains is EA in Preview

The Content Security Policy (CSP) feature lets admins control which URLs may be linked to from customized sign-in and error pages in orgs that use custom domains. Admins add trusted URLs to Okta that link to items such as images and add these links to the code in their sign-in and error pages. This feature enhances security by enabling admins to allow only approved content to appear and prevent the introduction of potentially malicious code to these pages. See [Content Security Policy (CSP) for your custom domain](/docs/guides/custom-widget/main/#content-security-policy-csp-for-your-custom-domain). <!-- OKTA-600774 FF CONTENT_SECURITY_POLICY_FOR_CUSTOMIZABLE_SIGN_IN_AND_ERROR_PAGES -->

#### Granular API policy authenticator controls is self-service EA in Preview

The Authentication Policy API now includes three new `constraints` object parameters that provide precise control over what specific authenticators and methods are displayed to end users. Previously, some authenticators were mapped to the same authenticator `types` and `methods`. The parameters `authenticationMethods` and `excludeAuthenticationMethods` now identify (or exclude) the exact authenticator for both `knowledge` and `possession` constraints. The `required` parameter indicates whether the `knowledge` or `possession` constraints are required by the assurance. See the [Policy API](/docs/reference/api/policy/#constraints). <!--OKTA-676888 ASSURANCE_GRANULAR_AUTHENTICATOR_CONSTRAINTS -->

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
