---
title: SAML - frequently asked questions
meta:
  - name: description
    content: Answers to your questions about how SAML works with Okta.
---

# SAML technical questions

**Q: Does Okta support Single Logout (SLO) for the SAML protocol?**

Yes, Okta supports Service Provider-initiated SLO. This enables users to sign out of both a configured app integration and Okta with a single click. For more information, see the **Advanced Settings** section in [Using the App Integration Wizard: SAML App Wizard](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard).

**Q: I'm an ISV setting up a SAML 2.0 app using the App Wizard, and we have different domains for each customer. How do you manage these types of situations?**

Currently, the App Wizard doesn't support custom domains, but public-facing integrations can still have this functionality. Create an app integration as you normally would for a single domain using the App Wizard. When you get to the step of submitting your app integration through the [OIN Manager](https://oinmanager.okta.com/), you are asked to fill out a form with all the relevant information.

**Q: My app is now in the OIN. What is the user experience for a customer or an administrator that wants to set up Single Sign-On for my app using the Okta interface?**

As the user experience is different for every app, Okta creates a unique SAML configuration document for each application in the OIN.

For a sample configuration, see our instructions on [How to Configure SAML 2.0 for Salesforce](https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-in-Salesforce.html). Also, you can search online for videos demonstrating a step-by-step walk through of all the steps an IT administrator would take to configure Single Sign-On for an app.

**Q: My app currently supports WS-FED for Single Sign-On. Can I use it instead of SAML?**

The Okta App Wizard only supports SAML 2.0 for federated Single Sign-On. If your app supports WS-Fed, create a [WS-Fed Template App](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_Configuring_WS_Federation). You can only use this created template application within your own account. To promote your template app to the Okta Integration Network, email <developers@okta.com>. Put your app name in the subject line and include a screenshot of the details of the configured app.

**Q: What is Secure Web Authentication (SWA)? Is it different than using SAML?**

SWA was developed by Okta to provide Single Sign-On for apps that don't support federated sign-in methods. Users can still sign in directly through the application and then enter their credentials for these apps on their Okta homepage. These credentials are stored so that users can access their apps with SSO. When users first sign in to a SWA app from their homepage, they see a pop-up message asking if they were able to sign in successfully.
