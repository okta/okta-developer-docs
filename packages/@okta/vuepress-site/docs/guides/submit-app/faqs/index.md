---
title: Frequently Asked Questions (Provisioning)
---

## OIN General Questions

**Q: Where can I sign up to join the Okta Integration Network (OIN)?**

Sign up for an [OIN Developer account](https://developer.okta.com/signup/).

**Q: Is there a cost associated with joining the OIN?**

No, integrating your application with the Okta Integration Network is completely free. Also, Okta customers can use all application integrations in the OIN free of charge.

**Q: In general, how can I get familiar with the Okta product?**

To get started, check out the [Okta Help Center](https://help.okta.com/) or [OktaInc on YouTube](https://www.youtube.com/user/OktaInc). App Partners are eligible for live Okta 101 sessions as well. Email <developers@okta.com> if you are interested.

## OIN Promotion Questions

**Q: I am an ISV and want to integrate with Okta for SAML and SCIM. Do I need to contact Okta first to start integrating my application?**

We work hard to make it easy for you to integrate with Okta. To that end, you don't have to contact Okta to integrate with Okta. Just start with the following SCIM or SAML documentation links, and you're good to go! Of course, if you do have questions, our developer support team <developers@okta.com> is here to help you.

For SAML, follow [our guide](/docs/guides/build-sso-integration/) to get started with the integration process using the [App Integration Wizard](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard).

For SCIM, follow [our guide](/docs/guides/build-provisioning-integration/) to get started with the integration process using our SCIM templates.

After your application is ready for Okta to review, submit it to us through the [OIN Manager](https://oinmanager.okta.com), where you can also track review status. Get stuck or have questions? Email <developers@okta.com>.

**Q: What's the process after I have submitted my app using the OIN Manager?**

After you submit your app integration, the OIN Operations team reviews and tests your integration. We will reach out to you directly if your integration doesn't pass the review, requires a re-submission, or if we need additional information from you. As soon as the review is complete, the integration is promoted to the public Okta Integration Network app catalog. Typical review time is two weeks, and you can track the progress of your submissions in the OIN Manager.

Have you submitted an app but haven't seen a change in the review status in the [OIN Manager](https://oinmanager.okta.com)? Send an email to <developers@okta.com>.

**Q: I am an ISV having issues integrating my app or have questions about Single Sign-On support in my app. How do I contact Okta?**

If you have any technical questions, you can submit them to <developers@okta.com> or post your questions on our [Developer Forum](https://devforum.okta.com/).

**Q: I am an ISV whose app is already listed in the OIN. How do I request changes or updates to the existing integration?**

Submit your application with the changes as you would if your application wasn't listed in the OIN. When Okta reviews your submission, we compare your submission against the existing customer-facing version, and update it accordingly. If there are special instructions you'd like to provide to us, add them in the **Additional Instructions** text box on the submission form. We will reach out to you directly with any questions.

**Q: If I submit my app with a set of attributes, can I then add attributes during the testing phase of the app?**

Yes. You can add attributes to the app you are testing in your dev org. Email <developers@okta.com> with the changes.

**Q: After my app is published, and I add additional attributes, how do I republish my app? Can I republish frequently?**

Yes, you can republish your app, but we recommend you don't do it frequently. Your app goes through the Okta QA process every time you add additional attributes.

## OIN Technical Questions

**Q: By following the guidance here, am I building an integration that only works with Okta? What about other identity vendors?**

Absolutely not. Our goal is to help you identity-enable your application using industry standards. The guidance offered here for SAML and SCIM allows you to integrate with customers using other identity solutions.

**Q: My customer is asking for Active Directory (AD) integration. If I integrate with Okta, can I connect to my customer's on-premise directory?**

Yes. One of the key benefits of developing a pre-built integration with Okta is that you can leverage our existing Active Directory support. By integrating with Okta (for Single Sign-On or provisioning), you effectively have the ability to integrate with your customer's on-premise AD or LDAP infrastructure for authentication (sign in to your cloud app with their corporate password), authorization (use details like AD groups to drive access rights), and provisioning policies.

**Q: Is the IdP session time out a setting that an Okta administrator can change? And if so, can it be changed on a per application basis, or is it a global setting for all of the user's applications?**

Yes, the session time out default is two hours, but the Okta administrator can customize the default. This session time out is an IdP setting and therefore it is global and applies to all applications in an Okta org. See the "Creating Sign-on Policies and Adding Rules" section in our [Security Policies](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_Policies) documentation.

### SWA

**Q: What is Secure Web Authentication (SWA)?**

SWA was developed by Okta to provide Single Sign-On (SSO) for apps that don't support federated sign-in methods. Users can still sign in directly through the application and then enter their credentials for these apps on their Okta homepage. These credentials are stored so that users can access their apps with SSO. When users first sign in to a SWA app from their homepage, they see a pop-up message asking if they were able to sign in successfully.

**Q: I am creating a SWA app using the App Wizard but my application has fields on the sign-in page in addition to the standard username and password (for example: CustomerID, OrgID). Can an app with additional fields on the sign-in page be configured using the App Wizard?**

Currently, the App Wizard doesn't support extra sign-in fields. Create an app using the Plug-in (SWA) Template Application. To promote your Template App to the Okta Integration Network, email a screenshot with the details of the configured app to <developers@okta.com> with your app name in the subject line.

### SAML

**Q: Does Okta support Single Logout (SLO) for the SAML protocol?**

Yes. For more information, see the **Advanced Settings** section in [Using the App Integration Wizard: SAML App Wizard](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard).

**Q: I'm an ISV setting up a SAML 2.0 app using the App Wizard, and we have different domains for each customer. How do you manage these types of situations?**

Currently, the App Wizard doesn't support custom domains, but public-facing integrations can still have this functionality. Create an app integration as you normally would for a single domain using the App Wizard. When you get to the step of submitting your app integration through the [OIN Manager](https://oinmanager.okta.com), you are asked to fill out a form with all the relevant information.

**Q: My app is now in the OIN. What is the user experience for a customer or an administrator that wants to set up Single Sign-On for my app using the Okta interface?**

As the user experience is different for every app, Okta creates a unique SAML configuration document for each application in the OIN.

For a sample configuration, see our instructions on [How to Configure SAML 2.0 for Salesforce](http://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-in-Salesforce.html). Also, you can search online for videos demonstrating a step-by-step walk through of all the steps an IT administrator would take to configure Single Sign-On for an app.

### SCIM

SCIM FAQs are covered in the [SCIM - Frequently Asked Questions](/docs/concepts/scim/faqs/) document.

### WS-Fed

**Q: My app currently supports WS-FED for Single Sign-On. Can I use the App Wizard?**

The Okta App Wizard only supports SAML 2.0 for federated Single Sign-On. If your app supports WS-Fed, create a [WS-Fed Template App](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_Configuring_WS_Federation). You can only use this created template application within your own account. To promote your template app to the Okta Integration Network, email <developers@okta.com>. Put your app name in the subject line and include a screenshot of the details of the configured app.
