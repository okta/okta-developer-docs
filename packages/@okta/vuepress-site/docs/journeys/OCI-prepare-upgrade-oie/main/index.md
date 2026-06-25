---
title: Prepare to upgrade to Okta Identity Engine
meta:
 - name: Prepare to upgrade to Okta Identity Engine
   content: Plan, update, test, and validate your setup so that you can confidently complete a smooth production upgrade.
   date-updated: July 3, 2026
   target persona: Enterprise Developer, IT, Security, Product Owners
---

## Introduction

Your organization is preparing to upgrade from Okta Classic Engine to Okta Identity Engine for enhanced security, policy control, and modern authentication. This journey guides you through understanding feature changes, such as sign-in flows, policies, MFA, APIs, and legacy functionality. Then, you plan and validate your upgrade through a checklist-driven approach.

As you work through each section, complete the following tasks:

* Document your current setup.
* Complete action items in the Upgrade Hub.
* Test in a Preview environment.
* Use the results to schedule and execute your production upgrade.

You can go directly to the Okta Upgrade Hub in the Admin Console to review your open action items and schedule your upgrade. [Learn more about the Identity Engine Upgrade Hub](https://help.okta.com/okta_help.htm?type=oie&id=csh-complete-action-items).

You can also review the [Identity Engine upgrade FAQ](https://help.okta.com/okta_help.htm?type=oie&id=ext-upgrade-faq) to get answers to common questions before you begin.

## Learn

Review how Identity Engine affects your apps, configurations, and user experiences. Examine differences in sign-in flows, policies, MFA, APIs, and deprecated features to identify what may break, require updates, or continue to work as expected. This enables you to plan your changes.

### Overview videos

Before you begin, watch these videos to understand the Identity Engine upgrade and how to identify Okta integration points in your org:

<iframe width="560" height="315" src="https://www.youtube.com/embed/N_FsbMFeyoM" title="Identity Engine Upgrade Overview" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br>
<iframe width="560" height="315" src="https://www.youtube.com/embed/gUqZUSeL_oM" title="Identifying Okta Integration Points" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### User experience changes

* [Identity Engine sign-in flow behavior](https://help.okta.com/okta_help.htm?type=oie&id=sign-in-flows).
* [App intent links in Identity Engine](https://help.okta.com/okta_help.htm?type=oie&id=csh-identity-engine-upgrade-app-intent-link).
* [Sign-in flow changes with federation and SSO](https://help.okta.com/okta_help.htm?type=oie&id=inbound-sign-in-flow)

### Policy changes

* [App sign-on policy](https://help.okta.com/okta_help.htm?type=oie&id=app-sign-on-policy-changes).
* [Okta sign-on policies](https://help.okta.com/okta_help.htm?type=oie&id=okta-sign-on-policy-changes).
* [Sign-on policy task differences](https://help.okta.com/okta_help.htm?type=oie&id=compare-app-sign-on-policies).
* [Multifactor authentication (MFA) enrollment policy](https://help.okta.com/okta_help.htm?type=oie&id=mfa-enrollment-policy-changes).

### Multifactor Authentication (MFA) changes

* [MFA](https://help.okta.com/okta_help.htm?type=oie&id=csh-identity-engine-upgrade-mfa-enhancements).
* [Okta Verify](https://help.okta.com/okta_help.htm?type=oie&id=ov-with-fp).
* [Email as an optional authenticator](https://help.okta.com/okta_help.htm?type=oie&id=csh-email-optional).
* [Phone authenticator capabilities](https://help.okta.com/okta_help.htm?type=oie&id=phone-auth).
* [Secondary email address setup](https://help.okta.com/okta_help.htm?type=oie&id=secondary-email-user-account).
* [Security Question](https://help.okta.com/okta_help.htm?type=oie&id=security-questions-and-answers).

### Other product and feature changes

* [Sign-In Widget](https://help.okta.com/okta_help.htm?type=oie&id=csh-siw-changes).
* [Email templates](https://help.okta.com/okta_help.htm?type=oie&id=email-enhancements).
* [End-User Settings](https://help.okta.com/okta_help.htm?type=oie&id=eus-changes).
* [Global redirect](https://help.okta.com/okta_help.htm?type=oie&id=global-redirect).
* [Password reset feature](https://help.okta.com/okta_help.htm?type=oie&id=password-reset-account-recovery).
* [Registration inline hooks](https://help.okta.com/okta_help.htm?type=oie&id=registration-hooks).
* [Self-service registration process](https://help.okta.com/okta_help.htm?type=oie&id=csh-identity-engine-upgrade-feature-change-ssr).
* [Suspicious activity reporting](https://help.okta.com/okta_help.htm?type=oie&id=suspicious-activity).
* [Sessions](/docs/guides/oie-upgrade-sessions-api/main/).

### Okta API changes

* [Okta APIs](https://developer.okta.com).??
* [Authenticator enrollment policy API](/docs/guides/oie-upgrade-mfa-enroll-policy/main/).

### Legacy features with limited support

[Custom app login](https://help.okta.com/okta_help.htm?type=oie&id=csh-custom-app-login-change) is available only to Classic orgs that used it prior to upgrading.

### Discontinued features

Some features are end of life and won't work after the upgrade. These are identified in the Upgrade Hub if your org is impacted.

## Plan

Prepare your upgrade strategy by identifying integration points and defining your rollout approach:

### Identify integration points and customizations

[Identify all of your Okta integration points](https://developer.okta.com) including apps, SDKs, API tokens, and hooks so that your team can triage what to test, update, replace, or retire before upgrading.??

### Handle unsupported features

* [Prepare to remove Okta Mobile](https://help.okta.com/okta_help.htm?type=oie&id=identity-engine-upgrade-prepare-om-users-for-upgrade).
* [Update your policies for Office 365 MFA pass claim](https://help.okta.com/okta_help.htm?type=oie&id=o365-pass-claim).
* [Prepare to replace your Device Trust setup](https://help.okta.com/okta_help.htm?type=oie&id=csh-dt-replace-plan).

### Define your rollout approach

[Plan](https://help.okta.com/okta_help.htm?type=oie&id=csh-plan-upgrade-rollout) how you want to sequence changes across orgs, roll out to user segments, and replace unsupported or deprecated features. Okta recommends a gradual, iterative approach over a single cutover.

### Plan your rollback strategy

* [When you should rollback](https://help.okta.com/okta_help.htm?type=oie&id=identity-engine-upgrade-rollback).
* [Initiate a rollback request](https://help.okta.com/okta_help.htm?type=oie&id=identity-engine-upgrade-rollback-steps).

## Build

Update your environment and code, then test everything in your preview environment:

### Record your classic setup and ready your test environment

* [Record your Classic Engine experience](https://help.okta.com/okta_help.htm?type=oie&id=csh-identity-engine-upgrade-self-service-validation-tests).
* [Set up your test environment](https://help.okta.com/okta_help.htm?type=oie&id=csh-set-up-test-environment).

### Complete Identity Engine Upgrade Hub action items

Before you can schedule your upgrade from Classic Engine to Identity Engine, [complete all action items listed in the Identity Engine Upgrade Hub](https://help.okta.com/okta_help.htm?type=oie&id=csh-complete-action-items).

### Update your org settings and environment

* [Turn off Device Trust before upgrading to Okta Identity Engine](https://help.okta.com/okta_help.htm?type=oie&id=csh-dt-turn-off).
* [Remove support for Integrated Windows Authentication (IWA)](https://help.okta.com/okta_help.htm?type=oie&id=csh-dt-remove-iwa-routing-rules).
* [Rename Duo Security custom IdP](https://help.okta.com/okta_help.htm?type=oie&id=rename-duo-security).

### Update your Sign-in Widget

* [Upgrade Okta's Sign-in Widget version](/docs/guides/oie-upgrade-sign-in-widget/main/).
* [Deprecated JavaScript methods in the widget](/docs/guides/oie-upgrade-sign-in-widget-deprecated-methods/main/).

### Update your custom code

packages/@okta/vuepress-site/docs/guides/oie-upgrade-event-hooks/main/index.md

* [Update your event hooks for Identity Engine](/docs/guides/oie-upgrade-event-hooks/main/).
* [Update your inline hooks for Identity Engine](/docs/guides/oie-upgrade-registration-inline-hook/main/).
* [Upgrade the Terraform provider](https://help.okta.com/okta_help.htm?type=oie&id=identity-engine-upgrade-prepare-terraform).

### Test your changes in your test environment

* [Test user flows, custom code and third-party tools](https://help.okta.com/okta_help.htm?type=oie&id=ext-test-upgrade).
* [Run through your post upgrade checklist](https://help.okta.com/okta_help.htm?type=oie&id=identity-engine-upgrade-post-upgrade-checklist).
* [Test your widget's existing customizations in a test environment](https://developer.okta.com).??

### Validate readiness and schedule your upgrade

* Confirm that all required changes are complete and your testing validates readiness.
* Schedule and execute your production upgrade.

## Related topics

* [Find troubleshooting docs at Okta's knowledge base center](https://support.okta.com/help/s/knowledge?selectedTopics&sortValue=Most%20Popular&searchTerm).
* [Check out the video resources on Okta's support center's Identity Engine upgrade page](https://support.okta.com/help/s/product-hub/oie/upgrading-to-okta-identity-engine?language=en_US).
* [Get an overview of the Identity Engine upgrade process](/docs/guides/oie-upgrade-overview/main/).
