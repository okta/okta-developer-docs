---
title: Prepare a customer-facing configuration guide
---

A configuration guide helps your customers understand how to configure your Okta integration to work with your cloud application.

You need to provide a configuration guide as part of the OIN submission process. Your guide is provided to administrators through the Okta Admin Console. Okta checks your document for general adherence to the configuration guide instructions. After your integration is published to the OIN, you can make the link public or customer‐accessible.

You can create the guide in whatever format works best for you: a Web page, a Google or Word doc, or a PDF are all acceptable.

## Examples

Some examples of detailed configuration guides:

SAML:

* [GitHub Enterprise](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-Github_Enterprise.html)
* [Runscope](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-Runscope.html)
* [Salesforce](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-in-Salesforce.html)
* [Zoom.us](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-Zoom.us.html)

SCIM:

* [Atlassian Cloud](https://confluence.atlassian.com/cloud/configure-user-provisioning-with-okta-957492956.html)
* [Fuze](http://images.em.fuze.com/Web/ThinkingPhones/%7Be980dc53-8c7e-4758-b5e5-3fa20845c561%7D_Fuze_Admin_Guide_-_Okta_Provisioning_(1).pdf) (PDF link)
* [Zscaler](https://help.zscaler.com/zia/saml-scim-configuration-guide-okta)

## Content

Your configuration guide should include the following sections:

### Prerequisites

In this section, specify any prerequisites required before your customer configures your integration in Okta. Examples may include enabling specific Okta features or SKUs, enabling API access to your SCIM server, or adding a particular version of an integration in Okta.

For example:

> When using SAML as the SSO mode with provisioning, a specific account plan needs to be enabled on the application side for silent activation.

### Supported Features

In this section of your guide, you want to outline what features your application supports. For example:

* IdP-initiated SSO
* SP-initiated SSO
* SLO (Single Log Out)
* Force Authentication
* Create Users
* Update User Attributes
* Deactivate Users
* Import Users
* Import Groups
* Sync Password
* Profile Sourcing (formerly called Profile Mastering)

Also include any restrictions. For example:

> Okta cannot update user attributes for Admin users. This is an API limitation.

### Procedure

This section constitutes the majority of your guide and explains all the configuration steps needed to get your customers set up with your integration. Detail all settings and include any screenshots that can assist the user.

Also include any best practices for your procedure, such as guidance on setting mappings for attributes, especially required attributes that don't have a default mapping. For example:

> The External ID is a required attribute, but it doesn't have a default mapping. This is because some customers prefer to set it to `EmployeeNumber`, and others like to set it to `emailAddress`. Assign the mapping to the correct value for your organization.

### Troubleshooting and Tips

You only need to include this section if there are known issues that apply to the entire configuration. In general, best practices should be included with the step-by-step procedure instructions.

You may also want to include information on how to contact your organization if the customer has any support queries.

<NextSectionLink/>
