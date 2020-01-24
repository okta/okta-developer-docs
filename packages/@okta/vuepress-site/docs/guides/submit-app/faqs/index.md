---
title: Frequently Asked Questions (Provisioning)
---

## OIN Technical Questions

**Q: My customer is asking for AD (Active Directory) integration. If I integrate with Okta, can I connect to my customer's on-premise directory?**

Yes. One of the key benefits of developing a pre-built integration with Okta is that you can leverage our existing active directory support. By integrating with Okta (for single sign-on and provisioning), you effectively have the ability to integrate with your customer’s on-premise AD or LDAP infrastructure for authentication (log into your cloud app with their corporate password), authorization (use details like AD groups to drive access rights), and provisioning policies.

**Q: Is the IDP session time out a setting that an Okta administrator can change? And if so, can it be changed on a per application basis, or is it a global setting for all of the user's applications?**

Yes, the session time out default is two hours, but the Okta administrator can customize the default. This session time out is an IdP setting and therefore it is global and applies to all applications in an Okta org. See the "Creating Sign-on Policies and Adding Rules" section in our [Security Policies](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_Policies) documentation.

### SAML

**Q: Does Okta support single logout or single sign-out using the SAML protocol?**

Yes, Okta supports Service Provider-initiated Single Log Out (SLO), enabling users to log out of both a configured app integration and Okta with a single click. For more information, see the Advanced Settings section of the [Using the App Integration Wizard: SAML App Wizard](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard).

**Q: I’m an ISV setting up a SAML 2.0 app using the App Wizard and we have different domains for each customer. How do you manage these types of situations?**

Currently, the App Wizard does not support custom domains, but public-facing integrations can still have this functionality. Create an app integration as you normally would for a single domain using the App Wizard. After you get to the step of submitting your app integration through the [OIN Manager](https://oinmanager.okta.com/), you will be asked to fill out a form with all the relevant information.

**Q: My app is now in the OIN, what is the user experience for a joint customer administrator that wants to set up single sign-on and provisioning for my app in the Okta interface?**

Okta creates a unique SAML configuration documentation for each application in the OIN, so each one is different. For a sample configuration, see our instructions for [How to Configure SAML 2.0 for Salesforce](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-in-Salesforce.html). Also, you can search online for videos demonstrating a step-by-step walk through of all the steps an IT administrator would take to configure single sign-on and provisioning for an app.

**Q: My app currently supports WS-FED for single sign-on. Can I use it instead of SAML?**

The Okta App Wizard only supports SAML 2.0 for federated single sign-on. If your app supports WS-Fed, create a [WS-Fed Template App](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_Configuring_WS_Federation). Afterwards, the template application you created can be used only within your account. In order to promote your template app to the Okta Integration Network, please email a screenshot with the details of the configured app to <developers@okta.com>, with your app name in the subject line.

**Q: What is Secure Web Authentication (SWA)? Is it different than using SAML?**

SWA was developed by Okta to provide single sign-on for apps that do not support federated sign-on methods. Users can still sign in directly through the application and then enter their credentials for these apps on their Okta homepage. These credentials are stored so that users can access their apps with a single sign-on. When users first sign on to a SWA app from their homepage, they see a pop-up message asking if they were able to sign on successfully.

**Q: I am creating a SWA app using the App Wizard but my application has fields on the login page in addition to the standard username and password (for example: CustomerID, OrgID). Can an app with additional fields on the login be configured using the App Wizard?**

Currently, the App Wizard does not support extra login fields. Create an app using the Plug-in (SWA) Template Application. In order to promote your Template App to the Okta Integration Network, please email a screenshot with the details of the configured app to <developers@okta.com> with your app name in the subject line.

### SCIM

SCIM FAQs are covered in the [SCIM - Frequently Asked Questions](/docs/concepts/scim/faqs/) document.
