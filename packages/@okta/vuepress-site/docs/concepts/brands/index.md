---
title: Brands
meta:
  - name: description
    content: Okta brands allow you to customize the look and feel of pages and templates, such as the Okta-hosted sign-in page, error pages, email templates, and the Okta End-User Dashboard.
---

# Brands

## What are Okta brands?

Okta brands allow you to customize the look and feel of pages and templates. You can customize the Okta-hosted sign-in page, error pages, email templates, and the Okta End-User Dashboard.

Each org starts off with Okta default branding. You can upload your own assets (colors, background image, logo, and favicon) to replace Okta default brand assets. You can then publish these assets directly to your pages and templates.

## What is multibrand customization?

> **Note:** Multi-brand customization is available on both Okta Identity Engine and Okta Classic Engine.

Multibrand customizations allow customers to use one org to manage multiple brands and multiple custom domains. This drastically simplifies multi-tenant architectures, where customers used to have to create multiple orgs to satisfy branding requirements. Multibrand customizations allow orgs to create up to three custom domains (more upon request), which can be mapped to multiple sign-in pages, multiple sets of emails, error pages, and multiple versions of the Okta End User Dashboard.

In addition, multibrand allows you to customize many other settings per brand:

- Okta loading page
- Sign-In Widget version
- Sign-in page labels
- Default app for the Sign-In Widget
- Display language
- Sign-out page custom URL

Okta Verify and the Okta plugin support multibrand. Use the following minimum versions for compatibility:

- Plugins: v6.16.0
- Okta Verify for Android: AOV 7.10.0
- Okta Verify for iOS: iOV 7.12.0
- Okta Verify for macOS: MOV 3.10
- Okta Verify for Windows: v3.10

### Multibrand customizations and custom domains

You can create up to three custom domains with multibrand customizations. Increase your limit to 200 custom domains by contacting support.

You can only visit a branded touchpoint (such as a logo, color, favicon, or an image applied to a page or email) once you map to a custom domain. After you create a brand, map it to a custom domain. Then you can make further customizations, preview them, and publish them. See [Custom domains](/docs/guides/custom-url-domain/main/#about-okta-domain-customization).

### About subdomain brands and custom brands

Multibrand orgs have a non-deletable default brand, called the subdomain brand. However, you can create several custom brands. The subdomain brand is always shown at the Okta subdomain URL and can’t have a custom domain. You can swap out the logo, background image, favicon, colors, and edit emails, but you can’t edit custom code for the sign-in page or error pages. Custom domain and custom code for sign-in page and error-pages may only be used on custom brands.

### Authentication flow

Before authentication, users see the correct brand’s sign-in page by visiting the custom domain associated with the brand. When a user resets a password from the sign-in page, or requests a magic link to activate themselves, their emails are branded based on the custom domain they initiated the flow from.

### Use the Admin Console

To use multibrand customization in the Admin Console, see [Branding](https://help.okta.com/okta_help.htm?type=oie&id=csh-branding).

### Use the Brands API

There are public APIs and updates to existing APIs for multi-brand customization:

- Domains
- Email domains
- Brands
- Loading page
- Sign-in page code editor and custom labels
- Error pages
- Sign-In Widget version
- Default app for the Sign-In Widget
- Sign-out page
- Display language

For more details, see [Customizations](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Customization/).

### Authorization servers and multibrand customizations

Multibrand orgs use dynamic issuer mode for IdP. As a result, Okta uses the domain from the authorized request as the domain for the redirect URI when returning the authentication response. The Admin Console UI displays the org’s Okta subdomain when the org has multiple custom domains configured.

## FAQs

### How many custom domains are supported?

All paid orgs get a maximum of three custom domains. You can request up to 200 custom domains at no cost.

### Can all custom domains use Okta-managed certificates?

Yes. Okta recommends this approach so customers never have to maintain any certificates.

### Any limitations/assumptions to be aware of?

#### Email domains

Keep in mind the following when setting up domains for an org with branded emails:

- If you don’t have any domains configured, or you have multiple domains configured, the emails use your org’s default brand. See [About subdomain brands versus custom domains](#about-subdomain-brands-and-custom-brands).
- If there's only one domain configured, the emails use the brand associated with that domain.

#### Email senders

Okta’s main email provider allows each unique email sender (root domain, no-reply@company.com) to be used only once in each cell. To bypass this limitation, use a subdomain to keep email senders unique (for example, no-reply@brandA.company.com and no-reply@brandB.company.com).

#### Data migrations

- **Flag ON behavior:** Okta migrates any customizations (code, logos, labels) to a newly created brand. This is a one-time migration for only the first time that an org turns on multibrand.

- **Flag ON/OFF/ON behavior:** Okta doesn't remigrate existing customizations made to the default brand so that customizations don’t overwrite the previously customized brand.

### How are apps assigned to brands?

Users are routed to the desired app using the `client_id` in the custom domain as a URL parameter.

For example, a specific OAuth/OIDC app with `client_id=foo`:

- `subdomain.okta.com/oauth2/v1/authorize?client_id=foo`: Shows the default brand
- `custom.domain.one/oauth2/v1/authorize?client_id=foo`: Shows the brand associated with `custom.domain.one`
- `another.domain.two/oauth2/v1/authorize?client_id=foo`: Shows the brand associated with `another.domain.two`

In all three cases the user signs into the same OIDC app, but sees three different brands. If you want each brand to send users to their own app, the `client_id` just needs to correspond to the desired app.

Access management to apps is controlled through app assignments, so any user can still access any app. Any brand can be applied to any app.

If a custom domain doesn’t contain a `client _id`, Okta routes the user to the default app.



