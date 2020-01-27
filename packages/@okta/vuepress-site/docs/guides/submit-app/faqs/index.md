---
title: Frequently Asked Questions (Provisioning)
---

## OIN Publishing Questions

**I am an ISV and want to integrate with Okta for SAML and SCIM. Do I need to contact Okta first to start integrating my application?**

We work hard to make it easy for you to integrate with Okta. To that end, you don't have to contact Okta to integrate with Okta. Just start with the following SCIM or SAML documentation links, and you should be all set! Of course, if you do have questions, our developer support team <developers@okta.com> is here to help you.

For SAML, follow [our guide](/docs/guides/build-sso-integration/) to get started with the integration process using the [App Integration Wizard](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard).

For SCIM, follow [our guide](/docs/guides/build-provisioning-integration/) here to get started with the integration process using our SCIM templates.

After your application is ready for Okta to review, submit it to us through the [OIN Manager](https://oinmanager.okta.com), where you can also track review status. Get stuck or have questions? Email <developers@okta.com>.

**Where do I start?**

Sign up for an [OIN Developer account](https://developer.okta.com/signup/).

**Are there any costs associated with joining the Okta Integration Network (OIN)?**

No, integrating your application with the Okta Integration Network is completely free

Paid customers can also utilize all application integrations in the OIN free of charge.

**If I submit my app with a set of attributes, can I then add attributes during the testing phase of the app?**

Yes. You can add attributes to the app you are testing in your dev org. Email <developers@okta.com> with the changes.

**After my app has been published, and I add additional attributes, how do I republish my app? Can I republish frequently?**

Yes, you can republish your app, but we recommend you don't do it frequently. Your app goes through the Okta QA process every time you add additional attributes.

**I am an ISV whose app is already listed in the OIN. How do I request changes/updates to the existing integration?**

Submit your application with the changes as you would if your application were not listed in the OIN. After your submission goes under review by Okta, we compare your submission against the existing customer-facing integration, and update it accordingly. If there are special instructions you'd like to provide to us, add them in the Additional Instructions text box on the submission form. We will reach out to you directly with any questions.

**I am an ISV having issues integrating my app or have questions about single sign-on support in my app. How do I contact Okta?**

If you have any technical questions, you can submit them to <developers@okta.com> or post your questions on our [Developer Forum](https://devforum.okta.com/).

**By following the guidance here, am I building an integration that only works with Okta? What about other identity vendors?**

Absolutely not. Our goal is to help you identity-enable your application using industry standards. The guidance offered here for SAML and SCIM allows you to integrate with customers using other identity solutions.

**My customer is asking for AD (Active Directory) integration. If I integrate with Okta, can I connect to my customer's on-premise directory?**

Yes. One of the key benefits of developing a pre-built integration with Okta is that you can leverage our existing active directory support. By integrating with Okta (for single sign-on and provisioning), you effectively have the ability to integrate with your customer's on-premise AD or LDAP infrastructure for authentication (log into your cloud app with their corporate password), authorization (use details like AD groups to drive access rights), and provisioning policies.

**What is Secure Web Authentication (SWA)?**

SWA was developed by Okta to provide single sign-on for apps that do not support federated sign-on methods. Users can still sign in directly through the application and then enter their credentials for these apps on their Okta homepage. These credentials are stored so that users can access their apps with a single sign-on. When users first sign on to a SWA app from their homepage, they see a pop-up message asking if they were able to sign on successfully.

**What is the process after I have submitted my app using the OIN Manager?**

After you submit your app integration, it goes through a review by the Okta OIN Operations team, which reviews and tests your integration. We will reach out to you directly if your integration does not pass the review, if we need you to resubmit, or if we need additional information. Following the completed review, the integration is promoted to the OIN. Typical review time is two weeks, and you can track the progress of your submission in the [OIN Manager](https://oinmanager.okta.com).

Have you submitted an app but have not seen a change in review status in the OIN Manager? Email <developers@okta.com>.

**I'm an ISV setting up a SAML 2.0 app using the App Wizard and we have different domains for each customer. How do you manage these types of situations?**

Currently, the App Wizard does not support custom domains, but public-facing integrations can still have this functionality. Create an app integration as you normally would for a single domain using the App Wizard. After you get to the step of submitting your app integration through the [OIN Manager](https://oinmanager.okta.com), you will be asked to fill out a form with all the relevant information.

**My app currently supports WS-FED for single sign-on. Can I use the App Wizard?**

The Okta App Wizard only supports SAML 2.0 for federated single sign-on. If your app supports WS-Fed, create a [WS-Fed Template App](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_Configuring_WS_Federation). Afterwards, the template application you created can be used only within your account. In order to promote your template app to the Okta Integration Network, please email a screenshot with the details of the configured app to <developers@okta.com>, with your app name in the subject line.

**I am creating a SWA app using the App Wizard but my application has fields on the login page in addition to the standard username and password (for example: CustomerID, OrgID). Can an app with additional fields on the login be configured using the App Wizard?**

Currently, the App Wizard does not support extra login fields. Create an app using the Plug-in (SWA) Template Application. In order to promote your Template App to the Okta Integration Network, please email a screenshot with the details of the configured app to <developers@okta.com> with your app name in the subject line.

**Does Okta support single logout or single sign-out (SAML protocol)?**

Yes. For more information, see the Advanced Settings section of the [Using the App Integration Wizard: SAML App Wizard](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Apps_App_Integration_Wizard).

**Is the IDP session time out a setting that an Okta administrator can change? And if so, can it be changed on a per application basis, or is it a global setting for all of the user's applications?**

Yes, the session time out default is two hours, but the Okta administrator can customize the default. This session time out is an IdP setting and therefore it is global and applies to all applications in an Okta org. See the "Creating Sign-on Policies and Adding Rules" section in our [Security Policies](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Security_Policies) documentation.

**My app is now in the OIN, what is the user experience for a joint customer administrator that wants to set up single sign-on and provisioning for my app in the Okta interface?**

Okta creates unique SAML configuration documentation for each application in the OIN, so each will be different. For a sample configuration, see our instructions for [How to Configure SAML 2.0 for Salesforce](http://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-in-Salesforce.html). Also, you can search online for videos demonstrating a step-by-step walk through of all the steps an IT administrator would take to configure single sign-on and provisioning for an app.

**In general, how can I get familiar with the Okta product?**

To get started, check out the [Okta Help Center](https://help.okta.com/) or our [OktaInc](https://www.youtube.com/user/OktaInc) channel on YouTube. App Partners are eligible for live Okta 101 sessions as well. Please email <developers@okta.com> if you are interested.

## SCIM Technical Questions

**Our API is similar to SCIM, but is not 100% compliant. Can we still integrate with Okta?**

Unfortunately, your app's SCIM server API must be fully SCIM compliant in order to integrate with Okta.

Okta SCIM client endpoints are hard coded into a template which adheres directly to [the SCIM spec](http://www.simplecloud.info/).

**How should I be managing authentication to my SCIM API?**

Okta recommends using the [OAuth 2.0 Authorization Code grant flow](/docs/guides/implement-auth-code/). Okta doesn't support the Client Credentials or Resource Owner Password Credentials Authorization grant flows for SCIM. The Authorization Code grant flow is more common in SaaS and cloud integrations and is also more secure. In addition to OAuth, Okta also supports connections with basic auth and header token auth options.

**I have a multi-tenant app. How do I allow my customers to customize their specific tenant in Okta?**

Use the OAuth 2.0 Authorization Code grant flow, so that you know exactly which token the customer is using.

Another option is when the customer configures your app in Okta, Okta can prompt them to add their unique subdomain for your app.

Okta can use part of this URL in the SCIM endpoint for that customer, for example `http://www.company.com/tenantA/scim` or `http://www.company.com/tenantB/scim`. This subdomain field can be configured in consultation with Okta after you submit your app for Okta review.

![Example SCIM endpoint with subdomain](/img/oin/scim-scalar.png "Example SCIM endpoint with subdomain")

**Why do I need to implement the type attribute for attributes such as emails/phoneNumbers/addresses?**

The SCIM User Profile allows for an array of emails. The only way to differentiate between emails is to use the `type` sub-attribute.

* When returning multi-valued attributes, service providers should canonicalize the value returned (for example, by returning a value for the sub-attribute "type", such as "home" or "work") when appropriate (for example, for email addresses and URLs).
* Service providers may return element objects with the same "value" sub-attribute more than once with a different `type` sub-attribute (for example, the same email address may be used for work and home) but should not return the same (type, value) combination more than once per attribute, as this complicates processing by the client.
* When defining schema for multi-valued attributes, it is considered a good practice to provide a `type` attribute that may be used for the purpose of canonicalization of values. In the schema definition for an attribute, the service provider MAY define the recommended canonical values (see [RFC 7643 Section 7](https://tools.ietf.org/html/rfc7643#section-7)).

See [Section 2.4 of RFC 7643](https://tools.ietf.org/html/rfc7643#section-2.4) for more details.

**I only have one email/phone number/address in my user profile. Do I need to implement the array of emails/phone numbers/addresses?**

Yes, you must return these fields in an array, which is specified in the SCIM spec as a multi-valued attribute: [Section 2.4](https://tools.ietf.org/html/rfc7643#section-2.4).

**Why doesn't Okta support DELETE /Users?**

Okta users are never deleted for compliance and audit purposes. Okta user profiles are marked as "deactivated". Because of this, Okta never makes an HTTP DELETE request to a user resource on your SCIM API. Instead, Okta makes an HTTP PATCH request to set the `active` setting to `false`. You'll need to support the concept of an "active" and "inactive" user in your app.

**How does data validation work with SCIM provisioning? For example, if my app requires the phone number in a specific format, how do I ensure that Okta passes the attribute in that format? If a data validation error issue occurs how does error reporting work?**

The SCIM spec specifies valid data formats for a given user profile attribute, however Okta does not rigorously validate that the customer has inputted values meeting those requirements to preserve flexibility.

Therefore, data validation should be handled by your app's SCIM Server. In other words, when Okta provisions user profile to your app, it should check that the data is valid according to their special requirements. Error messages sent in the response from your app are surfaced to the Okta administrator through alerts and tasks in the Okta interface. You should also specify your data requirements in your config guide.

**How much filtering support is needed?**

The filtering capabilities in the SCIM protocol are pretty broad, but the common filtering use case with Okta is quite narrow. Okta determines if a newly created user already exists in your app based on a matching identifier. This means the `eq` (equals) operator is all you really need to support.

Note that Okta only supports filtering through the `eq` operator on the SCIM `userName` attribute on the SCIM server side. However, Okta can use any `AppUser` attribute on the Okta side for passing into the `eq` operator. Typically this is `appuser.userName`, but `appuser.email` or `appuser.randomAttribute` can also be used.
