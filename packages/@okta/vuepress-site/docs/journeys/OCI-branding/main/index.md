---
title: Apply your brand to the Okta user experience
meta:
  - name: description
    content: Change the look and feel of the Okta default user experience to match your brand.
    date-updated: December 9, 2025
    target persona: Administrator, Designer
    level: Intermediate
sections:
- main
---

# Apply your brand to the Okta user experience

Design and apply a custom look and feel that matches your brand to the Okta-hosted Sign-In Widget.

## Introduction

You have a customer-facing app that uses the Okta-hosted Sign-In Widget and messaging services. Design and apply your own look and feel to these elements, which keeps your customers engaged. And, when you deliver a seamless, branded experience, you build trust with your users.

## Learn

There are three key elements to the theming of the Okta out-of-the-box user experience:

* The [Sign-In Widget](/docs/concepts/sign-in-widget/) is the default Okta UI for registration, enrollment, verification, and account recovery. You can customize it to match your brand.
* The [Okta Expression Language](/docs/reference/okta-expression-language/) is used to customize our email and SMS messages.
* Okta [Brands](https://developer.okta.com/docs/concepts/brands/) allows you to manage multiple brands in one Okta org.

<!-- See the [repository of example style sheets for the Sign-In Widget](https://github.com/oktadev/okta-js-siw-customzation-example) for examples of the types of updates that you can make.-->
> **Note**: This document is only for Identity Engine. See [Identify your Okta solution](https://help.okta.com/okta_help.htm?type=oie&id=ext-oie-version) to determine your Okta version.

## Plan

To get the most from the Okta branding options:

* Purchase a custom domain for your org to associate with the brand.
* Identify your brand-matching design for the Sign-In Widget.
* Identify how messages and error pages from Okta should be worded to reflect your brand.
* Decide if you want to use [one domain for all brands or separate domains](LINK_HERE).

Users that make branding changes in the Admin Console must have a super admin or org admin role, or have [a role with customization permissions](https://help.okta.com/okta_help.htm?type=oie&id=csh-create-role).

## Build

To apply your brand to the Okta-hosted Sign-In Widget, consider an upgrade to the third-generation Sign-In Widget, and then register a vanity domain.

### Upgrade the Sign-In Widget

Consider using the third generation Sign-In Widget for the best customization options:

* [Understand the differences between the second and third-generation widget](https://help.okta.com/oie/en-us/content/topics/reference/siw-compare-generations.htm?cshid=ext-compare-siw).
* [Learn how to upgrade to the third-generation widget](/docs/guides/custom-widget-migration-gen3/main/).

### Register a vanity domain with your org

All customizations are tied to the custom domain that you must first attach to your org. See [Add a custom domain to your org](/docs/guides/custom-url-domain/main/).

### Apply your brand to the Sign-In Widget

Create a stylesheet and any required JavaScript for custom behaviors and attach it to your custom domain in the Admin Console:

<!-- * Use [our samples repo](https://github.com/oktadev/okta-js-siw-customzation-example) to build the correct CSS to match your design. -->
* Add your style sheets and scripts. You can do this using either the [second](/docs/guides/custom-widget/main/#style-for-redirect-authentication) or [third-generation](/docs/guides/custom-widget-gen3/main/) widget.
* [Use design tokens](/docs/guides/custom-widget-gen3/main/). You can do this using the third-generation widget.

### Apply your brand to Okta default text elements

Customize the text of emails, SMS messages, and error pages delivered by Okta for a custom domain and also localize it to match your messaging:

* [Customize your email templates](/docs/guides/custom-email/main/)
  * [Add app-level context logic](/docs/guides/custom-email/main/#app-name)
* [Customize your SMS messages](/docs/guides/custom-sms-messaging/main/)
* [Customize your error pages](/docs/guides/custom-error-pages/main/)

## Test your customizations

The Okta default UI spans user registration, enrollment, verification, and account recovery:

* Test that your new branding is consistent for your users across all four actions.
* Test that your error pages work as expected.
* Test that your text works in different languages as expected.
* [Copy/Synchronize your settings from UAT to Production (using the Admin Console or Terraform)](/docs/guides/migrate-customizations/).

## Related topics

Congratulations, your app now wraps its Okta components in your brand's look and feel. Your design team and your customers are both happy.

Go deeper into the Okta APIs that allow you to manipulate your customizations in code:

* Use the [Brands API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Brands/) to manage brands, and their metadata, in your orgs.
* Use the [Custom Email Templates API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/CustomTemplates/) to manage email customizations.
* Use the [SMS Templates API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Template/) to manage SMS customizations.

This journey is part of the Secure your portal pathway, which also contains:

* [Secure your first web app](/docs/journeys/OCI-secure-your-first-web-app/main/)
* [Sign users in through your web app](/docs/journeys/OCI-web-sign-in/main/)
