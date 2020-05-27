---
title: SAML - frequently asked questions
meta:
  - name: description
    content: Answers to your questions about how SAML works with Okta.
---

# SAML technical questions

**Q: Does Okta support Single Logout (SLO) for the SAML protocol?**

Yes, Okta supports Service Provider-initiated SLO. This feature enables users to sign out of both a configured integration and Okta with a single click. For more information, see the **Advanced Settings** section in [Create a SAML integration using AIW](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard-saml).

**Q: I'm an ISV setting up a SAML 2.0 integration using the App Integration Wizard, and we have different domains for each customer. How do you manage these types of situations?**

Currently, the App Integration Wizard doesn't support custom domains, but public-facing integrations can still have this functionality. Create an integration as you normally would for a single domain using the App Integration Wizard. When you get to the step of submitting your integration through the [OIN Manager](https://oinmanager.okta.com/), you are asked to fill out a form with all the relevant information.

**Q: My integration is now in the OIN. What is the user experience for a customer or an administrator that wants to set up Single Sign-On to my application using the Okta interface?**

As the user experience is different for every application, Okta requires a unique SAML configuration document for each SAML application with an associated integration in the OIN.

For a sample configuration, see our instructions on [How to Configure SAML 2.0 for Salesforce](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-in-Salesforce.html). Also, you can search online for videos demonstrating a step-by-step walk through of all the steps an IT administrator would take to configure Single Sign-On with an integration.

**Q: My application currently supports WS-FED for Single Sign-On. Can I use it instead of SAML?**

The Okta App Integration Wizard only supports SAML 2.0 for federated Single Sign-On. If your application supports WS-Fed, create a [WS-Fed Template App](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_Configuring_WS_Federation). You can only use this created template integration within your own account. To promote your template integration to the Okta Integration Network, email <developers@okta.com>. Put the name of your integration in the subject line and include a screenshot of the details of the configured integration.

**Q: What is Secure Web Authentication (SWA)? Is it different than using SAML?**

SWA was developed by Okta to provide Single Sign-On for applications that don't support federated sign-in methods. Users can still sign in directly through the application and then enter their credentials for these applications on their Okta homepage. These credentials are stored so that users can access their applications with SSO. When users first sign in to a SWA application from their homepage, they see a pop-up message asking if they were able to sign in successfully.
