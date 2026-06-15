---
title: Prepare to upgrade to Okta Identity Engine
meta:
 - name: Add a sign-in form to your mobile app
   content: Plan, update, test, and validate your setup so that you can confidently complete a smooth production upgrade.
   date-updated: July 3, 2026
   target persona: Enterprise Developer, IT, Security, Product Owners
---

## Introduction

Your organization is preparing to upgrade from Okta Classic Engine to Okta Identity Engine (OIE) to gain enhanced security, policy control, and modern authentication capabilities. This journey guides you through understanding feature changes, such as sign-in flows, policies, MFA, APIs, and legacy functionality. Then you plan and validate your upgrade through a checklist-driven approach. As you go through each section, document your current setup, complete action items in the Upgrade Hub, test in a preview environment, and use those results to confidently schedule and execute your upgrade.

You can go directly to the Okta Upgrade Hub in the Admin Console to review your open action items and schedule your upgrade. [Learn more about the OIE Upgrade Hub](new doc).

You can also review the [Identity Engine upgrade FAQ](https://help.okta.com/okta_help.htm?type=oie&id=ext-upgrade-faq) to get answers to common questions before you begin.

## Learn

Review how OIE affects your apps, configurations, and user experiences. Examine differences in sign-in flows, policies, MFA, APIs, and deprecated features to identify what may break, require updates, or continue to work as expected. This enables you to plan your changes.

### Overview videos

Before diving in, watch our how-to videos to learn about the OIE upgrade and how to identify Okta integration points in your org:

<iframe width="560" height="315" src="https://www.youtube.com/embed/N_FsbMFeyoM" title="OIE Upgrade Overview" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/gUqZUSeL_oM" title="Identifying Okta Integration Points" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### User experience changes

* [How the sign in flows work in OIE](https://help.okta.com).
* [How app intent links work](https://help.okta.com).
* [Learn how the sign*in flow changes for inbound federation or Okta-to-Okta SSO](https://help.okta.com).

### Policy changes

* [How app sign*on policies change](https://help.okta.com).
* [How Okta sign*on policies change](https://help.okta.com).
* [How sign-on policy tasks differ](https://help.okta.com).
* [Learn how the MFA enrollment policy changes](https://help.okta.com).

### Multifactor Authentication (MFA) changes

* [How multifactor authentication (MFA) changes](https://help.okta.com).
* [How Okta Verify changes](https://help.okta.com).
* [How email as an optional authenticator works](https://help.okta.com).
* [How the phone authenticator works](https://help.okta.com).
* [Learn how the changes to enabling a secondary email address](https://help.okta.com).
* [How security questions change](https://help.okta.com).

### Other product and feature changes

* [How the Sign-In Widget changes](https://help.okta.com).
* [How email templates change](https://help.okta.com).
* [How the End-User Settings changes](https://help.okta.com).
* [How global redirect changes](https://help.okta.com).
* [How the password reset feature changes](https://help.okta.com).
* [How registration inline hooks change](https://help.okta.com).
* [How the self-service registration process changes](https://help.okta.com).
* [How suspicious activity reporting changes](https://help.okta.com).
* [How sessions change](https://developer.okta.com).

### Okta API changes

* [What's changed with the Okta APIs](https://developer.okta.com).
* [How the authenticator enrollment policy API has changed](https://developer.okta.com).

### Legacy features with limited support

[Custom app login only available to classic orgs that used it](https://help.okta.com).

### Discontinued features

Some features are end of life and will no longer work after the upgrade. These are identified in the Upgrade Hub if your org is impacted.

## Plan

Prepare your upgrade strategy by identifying integration points and defining your rollout approach:

### Identify integration points and customizations

[Identify your Okta authentication integration points and customizations](https://developer.okta.com).

### Handle unsupported features

* [Prepare to remove Okta Mobile](https://help.okta.com).
* [Update your policies for Office 365 MFA pass claim](https://help.okta.com).
* [Prepare the replacement for your Device Trust setup](https://help.okta.com).

### Define your rollout approach

[Plan your upgrade rollout](https://help.okta.com).

### PRollback strategy

* [Learn when you should rollback](https://help.okta.com).
* [Initiate a rollback request](https://help.okta.com).

## Build

Update your environment and code, then test everything in your preview environment:

### Record your classic setup and ready your test environment

* [Record your classic's settings and user experience](https://help.okta.com).
* [Set up your test environment](https://help.okta.com).

### Complete action items in your classic org's OIE Upgrade Hub

* [Complete action items in the OIE Upgrade Hub](https://help.okta.com).

### Update your org settings and environment

* [Turn off Device Trust before upgrading to Okta Identity Engine](https://help.okta.com).
* [Remove support for Integrated Windows Authentication (IWA)](https://help.okta.com).
* [Rename Duo Security custom IdP](https://help.okta.com).

### Update your Sign-in Widget

* [Upgrade Okta's Sign-in Widget version](https://help.okta.com).
* [Deprecated JavaScript methods in the widget](https://developer.okta.com).

### Update your custom code

* [Update your event hooks for OIE](https://developer.okta.com).
* [Update your inline hooks for OIE](https://developer.okta.com).
* [Upgrade the Terraform provider](https://help.okta.com).

### Test your changes in your test environment

* [Test user flows, custom code and third-party tools](https://help.okta.com).
* [Run through your post upgrade checklist](https://help.okta.com).
* [Test your widget's existing customizations a test environment](https://developer.okta.com).

### You are now ready to upgrade

Confirm that all required changes are complete and your testing validates readiness. Schedule and execute your production upgrade with confidence. Transition knowing your environment is prepared for a smooth, low-risk upgrade.

## Related topics

* [Find troubleshooting docs at Okta's knowledge base center](https://help.okta.com).
* [Check out the video resources on Okta's support center's OIE upgrade page](https://support.okta.com).
* [Get an overview of the OIE upgrade process](https://help.okta.com).
