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

features:
  hiAvailability:
    name: 99.99% availability
  serviceAssurance:
    name: Service level assurance
  capacity:
    name: User capacity
  customApps:
    name: Custom applications
  support:
    name: Support
  authentication:
    name: Authentication
    bullets:
      - Outbound federation to custom applications
      - Social authentication
      - Group-level password policies
      - Group and application-level sign-in policies
  authorization:
    name: Authorization
    bullets:
      - 1 authorization server with 1 customizable access policy
      - OAuth 2.0 support
      - Customizable scopes and claims
      - Token revocation
  userManagement:
    name: User management
    bullets:
      - Secure user store with customizable user attributes
      - User lifecycle states (e.g. activated, suspended, deactivated)
      - Attribute mapping and transformation
      - Registration as a service
  mfa:
    name: Basic multi-factor authentication
    bullets:
      - Okta Verify
  customEmailTemplates:
    name: Customizable email templates and domains
  customSignin:
    name: Customizable sign-in and registration widget
  addons:
    name: Add-on products available
  threatInsight:
    name: Okta ThreatInsight

pricing:
  - maus: 1,000 MAUs
    price: $0
  - maus: 2,500 MAUs
    price: $50
  - maus: 5,000 MAUs
    price: $100
  - maus: 10,000 MAUs
    price: $200
  - maus: 20,000 MAUs
    price: $400
  - maus: 50,000 MAUs
    price: $1000

editions:
  - name: Developer
    hiAvailability: True
    serviceAssurance: False
    capacity: Up to 50K MAUs
    customApps: 5 OIDC Clients
    support: Email only
    authentication: True
    authorization: True
    userManagement: True
    mfa: True
    customEmailTemplates:
      enabled: True
      additionalNote: (paid accounts only)
    customSignin: True
    addons: False
    threatInsight: True
  - name: One App
    subheading: High availability, premiere support and additional MAUs for scaling your application.
    hiAvailability: True
    serviceAssurance: True
    capacity: Unlimited
    customApps: 5 OIDC Clients
    support: True
    authentication: True
    authorization: True
    userManagement: True
    mfa: True
    customEmailTemplates:
      enabled: True
    customSignin: True
    addons: True
    threatInsight: True
  - name: Enterprise
    subheading: Reliable authentication and authorization for complex environments with multiple applications.
    hiAvailability: True
    serviceAssurance: True
    capacity: Unlimited
    customApps: Unlimited OIDC and SAML applications
    support: True
    authentication: True
    authorization: True
    userManagement: True
    mfa: True
    customEmailTemplates:
      enabled: True
    customSignin: True
    addons: True
    threatInsight: True

faqs:
  - title: Why should I trust Okta with my users and data?
    content: "Security is our utmost priority. We understand that identity is mission critical. Thousands of our customers depend on Okta to manage and protect access to applications and data. That trust requires our service to be highly available and secure. You can read more about what Okta does to meet your application's security and availability requirements here: <strong><a href='https://www.okta.com/security/'>https://www.okta.com/security/</a></strong>"
  - title: What is a monthly active user?
    content: A monthly active user is an end-user that authenticates to an application in a given month. A user that authenticates multiple times to one or more applications within a given month is counted once.
  - title: "What are the rate limits for Okta's APIs?"
    content: "The number of API requests for an organization is limited for all APIs in order to protect the service for all users. <a href='/docs/reference/rate-limits/'>Get more details</a>."

---
