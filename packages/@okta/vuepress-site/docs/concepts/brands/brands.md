---
title: Brands
meta:
  - name: description
    content: Okta brands allow you to customize the look and feel of pages and templates, such as the Okta-hosted sign-in page, error pages, email templates, and the Okta End-User Dashboard.
---

#Brands

## What are Okta brands?

Okta brands allow you to customize the look and feel of pages and templates, such as the Okta-hosted sign-in page, error pages, email templates, and the Okta End-User Dashboard.

Each org starts off with Okta's default branding. You can upload your own assets (colors, background image, logo, and favicon) to replace Okta's default brand assets. You can then publish these assets directly to your pages and templates.

## What is multibrand customization?

> **Note:** Multi-brand customization is available on both Okta Identity Engine and Okta Classic Engine.

Each org can feature multiple brands with multiple sets of Okta-hosted touchpoints, e.g. email notifications, sign-in page. Rather than create a separate org for each brand, a single org can contain all of the brands that a customer wants to manage.

You can use both the Admin Console and the Okta API to create multiples of the following resources:

- brands (multiple sign-in pages, error pages, sets of emails, and brand-specific views of the Okta End-User Dashboard)
- custom domains
- custom email domains

Before authentication, users see the correct brand’s sign-in page by visiting the custom domain associated with the brand. When a user resets a password from the sign-in page, or requests a magic link to activate themselves, their emails are branded based on the custom domain they initiated the flow from. 

In addition, multibrand allow customers to customize a number of other settings per brand:

- Okta loading page
- Sign-in widget version
- Sign-in page labels
- Default app for SIW
- Display language
- Sign-out page custom URL

### Multibrand customizations and custom domains

You can create up to three custom domains with `Multibrand Customizations` and up to 200 custom domains by contacting support to increase your limit. 

You can only visit a branded touchpoint (such as a logo, color, favicon, or an image applied to a page or email) once you map to a custom domain. After you create a brand, map it to a custom domain. Then you can make further customizations, preview them, and publish them. See Custom domains.

### About subdomain brands and custom brands

Multibrand orgs have a non-deletable default brand, called the subdomain brand, but you can create a number of custom brands. The subdomain brand is always shown at the Okta subdomain URL and can’t have a custom domain. You can swap out the logo, background image, favicon, colors, and edit emails, but you can’t edit custom code for the sign-in page or error pages. Custom domain and custom code for sign-in page and error-pages may only be used on custom brands.

### Use the Brands API

There are public APIs and updates to existing APIs for multi-brand customization:

- domains
- email domains
- brands
- loading page
- sign-in page code editor and custom labels
- error pages
- SIW version
- default app for SIW
- sign-out page
- display language

For more details, see Customizations.

### Authorization servers and multibrand customizations

Multibrand orgs use dynamic issuer mode for IdP. As a result, Okta uses the domain from the authorized request as the domain for the redirect URI when returning the authentication response. The Admin Console UI displays the org’s Okta subdomain when the org has multiple custom domains configured.

## FAQs

### How many custom domains are supported?

All paid orgs get a maximum of three custom domains. You can request up to 200 custom domains at no cost.

### Can all custom domains make use of Okta-managed certificates?

Yes. We recommend this approach so customers never have to maintain any certificates.

### Any limitations/assumptions to be aware of?

#### Email domains

Keep in mind the following when setting up domains for an org with branded emails:

- If you don’t have any domains configured, or have multiple configured, the emails use your org’s default brand. See About subdomain brands versus custom domains.
- If there is only one domain configured, the emails use the brand associated with that domain.

#### Email senders

Okta’s main email provider allows each unique email sender (root domain, no-reply@company.com) to be used only once in each cell. To bypass this limitation, use a subdomain to keep email senders unique (for example, no-reply@brandA.company.com and no-reply@brandB.company.com).

#### Data migrations

- **Flag ON behavior:** Okta migrates any customizations (code, logos, labels) to a newly-created brand. This is a one-time migration for only the 1st time an org turns on multibrand.

- **Flag ON/OFF/ON behavior:** We don’t re-migrate existing customizations made to the default brand so that we don’t overwrite customizations to the previously customized brand.

Okta Verify and the Okta Plugin are updated to support multibrand, but customers need to use the following minimum versions for compatibility:

- Android:AOV 7.10.0
- iOS: iOV 7.12.0
- macOS: MOV 3.10
- Windows: WOV 3.10
- Okta Plugin: 6.16.0

### How are apps assigned to brands?

Users are routed to the desired app using the `client_id` in the custom domain as a URL parameter.

For example, a specific OAuth/OIDC app with `client_id=foo`:

- `subdomain.okta.com/oauth2/v1/authorize?client_id=foo` shows the default brand
- `custom.domain.one/oauth2/v1/authorize?client_id=foo` shows the brand associated with `custom.domain.one`
- `another.domain.two/oauth2/v1/authorize?client_id=foo` shows the brand associated with `another.domain.two`

In all 3 cases the user signs into the same OIDC app, but sees 3 different brands. If you want each brand to send users to their own app, the `client_id` just needs to correspond to the desired app.

Access management to apps is controlled through app assignments, so any user can still access any app. Any brand can be applied to any app.

If a custom domain doesn’t contain a `client _id`, Okta routes the user to the default app.



