---
title: Prepare a customer-facing configuration guide
---

A configuration guide helps your customers understand the steps needed to configure your app in Okta so that it can handle their provisioning needs.

This guide is a requirement for the OIN submission process. The guide is provided to administrators through the Okta Admin Console.

## Instructions

1. Suggested formats:
    * Web page
    * Google doc
    * Downloadable PDF
1. Provide Okta a link to the configuration guide as part of the submission to the OIN. Okta checks your document for general adherence to the configuration guide instructions.
1. Until approved by Okta, your guide should include the following disclaimer:
  `This integration with Okta is currently under development and is not available to customers yet. Contact us at <email> to learn more.`
1. After your app is published as Okta-Verified, you can make the link public or customer‐accessible, and no disclaimers are required.

For an example of a detailed configuration guide, see the [G Suite Provisioning](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_google-provisioning) guide.

All configuration guides must include the following sections:

* [Prerequisites](#prerequisites)
* [Features](#features)
* [Procedures](#procedures)
* [Schema Discovery](#schema-discovery)
* [Troubleshooting and Tips](#troubleshooting-and-tips)

### Prerequisites

In this section, specify any prerequisites required before the customer configures your provisioning integration in Okta. Examples may include enabling specific Okta features, enabling API access to your SCIM server, or adding a particular version of the app in Okta.

For example:

* `A specific account plan needs to be enabled on the application side for silent activation when using SAML as the SSO mode with provisioning.`

You may also want to include information on how to contact your organization if the customer has any support queries.

### Features

In this section of your guide, you want to outline what provisioning features the app supports. For example:

* Create Users
* Update User Attributes
* Deactivate Users
* Import Users
* Import Groups
* Sync Password

Also include any restrictions. For example:

* `Okta cannot update user attributes for Admin users. This is an API limitation.`

### Procedures

This section should cover all the configuration steps needed to get your customers up and running with your SCIM provisioning app. Add text to explain a certain setting in detail if that setting is something specific to your application. Include any screenshots from your app that can assist the user during the setup process.

Include any best practices for your procedure here, such as guidance on setting mappings for attributes, especially required attributes that do not have a default mapping. For example:

`The External ID is a required attribute, but it does not have a default mapping. This is because some customers prefer to set it to EmployeeNumber, and others like to set it to emailAddress. Assign the mapping to the correct value for your organization.`

Note: The configuration guide is opened from the **Provisioning** tab. The **General** settings and **Sign On** settings have been already configured.

### Schema Discovery

This section of the guide is optional.

You can use schema discovery to add extra attributes to Okta user profiles. Explain what extra attributes are available and how to configure them with your application mappings.

### Troubleshooting and Tips

This section is also optional.

You only need to include this section if there are known issues or best practices that apply to the entire configuration. In general, best practices should be included with the step-by-step procedure instructions.

## Create a demo video

This is an optional suggestion. A video can help visually oriented customers to learn about your application, or can help guide them if you have a complex set of procedures required to set up your configuration.

You can either host the video on your website, or create a public YouTube video. Remember to include in the video any disclaimers about the availability of your app.

<NextSectionLink/>
