---
title: Frequently Asked Questions
---

## OIN Technical Questions

**Q: My customer is asking for Active Directory (AD) integration. If I integrate with Okta, can I connect to my customer's on-premise directory?**

Yes. One of the key benefits of developing a pre-built integration with Okta is that you can leverage our existing Active Directory support. By integrating with Okta (for Single Sign-On (SSO) or provisioning), you effectively have the ability to work with your customer's on-premise AD or LDAP infrastructure for authentication. Your end users can sign in to your cloud application using their corporate password. You also be able to do things like use AD groups to drive access rights for authentication and provisioning policies.

**Q: Is the IdP session time out a setting that an Okta administrator can change? And if so, can it be changed for each integration, or is it a global setting for all of the user's integrations?**

Yes, the session time out default is two hours, but the Okta administrator can customize the default. This session time out is an IdP setting and therefore it is global and applies to all integrations in an Okta org. See the "Creating Sign-on Policies and Adding Rules" section in our [Security Policies](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_Policies) documentation.

### SAML

SAML FAQs are covered in the [SAML - Frequently Asked Questions](/docs/concepts/saml/faqs/) document.

### SCIM

SCIM FAQs are covered in the [SCIM - Frequently Asked Questions](/docs/concepts/scim/faqs/) document.
