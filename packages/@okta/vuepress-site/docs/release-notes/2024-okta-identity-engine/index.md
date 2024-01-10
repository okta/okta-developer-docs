---
title: Okta Identity Engine API Products release notes 2024
---

<ApiLifecycle access="ie" />

> Help us improve our release notes by filling out this short [survey](https://surveys.okta.com/jfe/form/SV_4VEZcIGOX0TBgkC).

## January

### Monthly release 2024.01.0

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [DPoP support for Okta management APIs is GA in Preview](#dpop-support-for-okta-management-apis-is-ga-in-preview) | December 13, 2023 |
| [Email or password no longer required in authenticator enrollment policy is GA in Preview](#email-or-password-no-longer-required-in-authenticator-enrollment-policy-is-ga-in-preview) | January 10, 2024 |
| [More properties returned for Devices API user summaries](#more-properties-returned-for-devices-api-user-summaries) | January 10, 2024 |
| [New possession constraint available for Policy API is GA in Production](#new-possession-constraint-available-for-policy-api-is-ga-in-production) | December 6, 2023 |
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

#### New possession constraint available for Policy API is GA in Production

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
