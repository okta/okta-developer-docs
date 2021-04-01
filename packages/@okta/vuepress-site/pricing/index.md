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

tableHeadings:
  pricing:
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
        subName: SSO/<wbr>LCM
      inboundFederation:
        name: Inbound Federation
        subName: SAML/<wbr>OIDC
  features:
    name: Feature
    headings:
      authn:
        name: Authentication
      socialAuthn:
        name: Social Authentication
        subName: "Facebook/<wbr>Google/<wbr>Apple"
      mfa:
        name: MFA Factors
        subName: "Email, Okta OTP, WebAuthn, Yubikey, etc."
      smsVoiceMfa:
        name: SMS/<wbr>Voice MFA
      adaptiveMfa:
        name: Adaptive MFA Policies
      userMgmt:
        name: User Management
      customDomain:
        name: Custom Domain
      customEmail:
        name: Custom Email
      customWidget:
        name: Custom Widget
      threatInsight:
        name: ThreatInsight
        subName: "*Contact support@okta.com to turn on malicious IP logging"
      apiMgmt:
        name: API Access Management
      o2oIntegration:
        name: Org to Org Integration
      dirIntegration:
        name: Directory Integration
        subName: AD/<wbr>LDAP
      lcmEngine:
        name: Lifecycle Management (LCM) Engine
      uptime:
        name: 99.99% Uptime
  addons:
    name: Add ons
    headings:
      orgCreateApi:
        name: Org Creation API
      oag:
        name: Okta Access Gateway (OAG)
      custIdentWorkflows:
        name: Workflows for Customer Identity
      dynamicScale:
        name: DynamicScale
      oktaAsa:
        name: Okta Advanced Server Access
      oktaWorkforceIdent:
        name: Okta Workforce Identity Products
      volumeDiscounts:
        name: Volume Discounts
      sandbox:
        name: Sandbox
      regulatoryCellHipaaFedRamp:
        name: Regulatory Cell (HIPAA/<wbr>FEDRAMP)
      regulatoryCellGovCloud:
        name: Regulatory Cell (GovCloud)
      apacEmeaCell:
        name: APAC/<wbr>EMEA Cell
      csPackages:
        name: Customer Success Packages

tableData:
  starter:
    pricing:
      price: $0
    usage:
      mauLimit: 15,000
      cumulRateLimit: 1,600
      support: Community
      oidcApps: Up to 5
      samlApps: Up to 3
      m2mTokens: Up to 1k/month
      oinIntegrations: Up to 3
      inboundFederation: Up to 3
    features:
      authn: True
      socialAuthn: True
      mfa: True
      smsVoiceMfa: False
      adaptiveMfa: True
      userMgmt: True
      customDomain: True
      customEmail: False
      customWidget: True
      threatInsight: True
      apiMgmt: True
      o2oIntegration: False
      dirIntegration: True
      lcmEngine: True
      uptime: True
    addons:
      orgCreateApi: False
      oag: False
      custIdentWorkflows: False
      dynamicScale: False
      oktaAsa: False
      oktaWorkforceIdent: False
      volumeDiscounts: False
      sandbox: False
      regulatoryCellHipaaFedRamp: False
      regulatoryCellGovCloud: False
      apacEmeaCell: False
      csPackages: False
  advanced:
    pricing:
      price: $400/mo or $1000/mo
    usage:
      mauLimit: 20,000 or 50,000
      cumulRateLimit: 8,400
      support: Community + Email
      oidcApps: Unlimited
      samlApps: Up to 5
      m2mTokens: Up to 5k/month
      oinIntegrations: Up to 5
      inboundFederation: Up to 5
    features:
      authn: True
      socialAuthn: True
      mfa: True
      smsVoiceMfa: False
      adaptiveMfa: True
      userMgmt: True
      customDomain: True
      customEmail: True
      customWidget: True
      threatInsight: True
      apiMgmt: True
      o2oIntegration: False
      dirIntegration: True
      lcmEngine: True
      uptime: True
    addons:
      orgCreateApi: False
      oag: False
      custIdentWorkflows: False
      dynamicScale: False
      oktaAsa: False
      oktaWorkforceIdent: False
      volumeDiscounts: False
      sandbox: False
      regulatoryCellHipaaFedRamp: False
      regulatoryCellGovCloud: False
      apacEmeaCell: False
      csPackages: False
  enterprise:
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
    features:
      authn: True
      socialAuthn: True
      mfa: True
      smsVoiceMfa: True
      adaptiveMfa: True
      userMgmt: True
      customDomain: True
      customEmail: True
      customWidget: True
      threatInsight: True
      apiMgmt: True
      o2oIntegration: True
      dirIntegration: True
      lcmEngine: True
      uptime: True
    addons:
      orgCreateApi: True
      oag: True
      custIdentWorkflows: True
      dynamicScale: True
      oktaAsa: True
      oktaWorkforceIdent: True
      volumeDiscounts: True
      sandbox: True
      regulatoryCellHipaaFedRamp: True
      regulatoryCellGovCloud: True
      apacEmeaCell: True
      csPackages: True

faqs:
  - title: Why should I trust Okta with my users and data?
    content: "Security is our utmost priority. We understand that identity is mission critical. Thousands of our customers depend on Okta to manage and protect access to applications and data. That trust requires our service to be highly available and secure. You can read more about what Okta does to meet your application's security and availability requirements here: <strong><a href='https://www.okta.com/security/'>https://www.okta.com/security/</a></strong>"
  - title: What is a monthly active user?
    content: A monthly active user is an end-user that authenticates to an application in a given month. A user that authenticates multiple times to one or more applications within a given month is counted once.
  - title: "What are the rate limits for Okta's APIs?"
    content: "The number of API requests for an organization is limited for all APIs in order to protect the service for all users. <a href='/docs/reference/rate-limits/'>Get more details</a>."

---
