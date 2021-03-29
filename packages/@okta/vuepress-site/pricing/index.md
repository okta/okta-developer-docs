---
# This file controls the links and content shown on the /pricing landing page.

component: Pricing
title: Pricing

showBreadcrumb: False

links:
  signup: /signup/
  contactSales: https://www.okta.com/contact-sales/
  pricing: https://www.okta.com/pricing
  emailSupport: mailto:developers@okta.com

planHeadings:
  price:
    name: Price
    headings:
      price:
        name: Price
  usage:
    name: Usage
    headings:
      mauLimit:
        name: Montly Active User Limit
      cumulRateLimit:
        name: Cumulative Rate Limit Per Minute
      support:
        name: Support
      oidcApps:
        name: OIDC Applications
      samlApps:
        name: SAML Applications
      m2mTokens:
        name: M2M Tokens
      oinIntegrations:
        name: OIN Integrations
        subName: SSO/LCM
      inboundFederation:
        name: Inbound Federation
        subName: SAML/OIDC

plans:
  starter:
    name: Starter
    pricing:
      price: $0
    usage:
      mauLimit: 15k
      cumulRateLimit: 1,600
      support: Community
      oidcApps: Up to 5
      samlApps: Up to 3
      m2mTokens: Up to 1k/month
      oinIntegrations: Up to 3
      inboundFederation: Up to 3
  advanced:
    name: Advanced
    pricing:
      price: $400/mo or $1000/mo
    usage:
      mauLimit: 20k or 50k
      cumulRateLimit: 8,400
      support: Community + Email
      oidcApps: Unlimited
      samlApps: Up to 5
      m2mTokens: Up to 5k/month
      oinIntegrations: Up to 5
      inboundFederation: Up to 5
  enterprise:
    name: Enterprise
    pricing:
      price: Custom
    usage:
      mauLimit: Unlimited
      cumulRateLimit: Custom
      support: 24/7 Support
      oidcApps: Unlimited
      samlApps: Unlimited
      m2mTokens: Custom
      oinIntegrations: Custom
      inboundFederation: Custom

faqs:
  - title: Why should I trust Okta with my users and data?
    content: "Security is our utmost priority. We understand that identity is mission critical. Thousands of our customers depend on Okta to manage and protect access to applications and data. That trust requires our service to be highly available and secure. You can read more about what Okta does to meet your application's security and availability requirements here: <strong><a href='https://www.okta.com/security/'>https://www.okta.com/security/</a></strong>"
  - title: What is a monthly active user?
    content: A monthly active user is an end-user that authenticates to an application in a given month. A user that authenticates multiple times to one or more applications within a given month is counted once.
  - title: "What are the rate limits for Okta's APIs?"
    content: "The number of API requests for an organization is limited for all APIs in order to protect the service for all users. <a href='/docs/reference/rate-limits/'>Get more details</a>."

---
