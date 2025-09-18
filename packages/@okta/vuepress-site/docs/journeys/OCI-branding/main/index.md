---
title: Apply your brand to the Okta user experience
meta:
  - name: description
    content: Change the look and feel of the Okta default user experience to match your brand.
    date-updated: December 9, 2025
    target persona: Administrator, Designer
    level: Intermediate
sections:
- main
---


Introduction
You have a customer-facing app that uses the Okta-hosted Sign-In Widget and messaging services. Design and apply your own look and feel to these elements to keep your customers engaged with your brand. Deliver a seamless, branded experience that builds trust with your users.

Learn

Learn about Okta
There are three key elements to the theming of the Okta out-of-the-box user experience:

The Sign-In Widget is the default Okta UI for registration, enrollment, verification, and account recovery. You can customize it to match your brand. (info)
Okta Expression Language is used to customize our email and SMS messages (info)
Okta Brands allows you to manage multiple brands in one Okta org. (info)

See the repository of example stylesheets for the Sign-In Widget for examples of the types of updates that you can make.(info)

> Note: This document is only for Identity Engine. See Identify your Okta solution to determine your Okta version. (info)

Plan

Plan ahead
To get the most from Okta's branding options:

Purchase a custom domain for your org to associate with the brand.
Identify your brand-matching design for the Sign-in Widget. 
Identify how messages and error pages from Okta should be worded to reflect your brand.
Decide if you will use one domain for all brands or separate domains. (info)

Any user trying to make look and feel changes in the Admin Console must be a super admin or an org admin, or have a role with customization permissions. (info)

Build

Upgrade the sign-in widget
Consider using the latest third-generation Sign-in Widget for the best customization options.

Differences between the second and third generation widget (info)
How to upgrade to the third-generation widget (info) 
Register a vanity domain with your org
All customizations are tied to the custom domain which you must first attach to your org. 

Add a custom domain to your org (info)
Add a custom domain to your org (multibrand in a single org) 
Using a second brand for “User Acceptance Testing”
Apply your brand to the sign-in widget
Create a stylesheet and any required javascript for custom behaviors and attach it to your custom domain in the admin console.

Use our samples repo (info) to build the correct CSS to match your design.
For a second or third generation widget, add your stylesheets and scripts. (info)
For a third generation widget, you can also use design tokens. (info)
Apply your brand to Okta's default text elements
The text of every email, SMS, and error page delivered by Okta for a custom domain can be customized and localised to match your messaging.

Customise your email templates (info)
Application - Level Context Logic
Customise your SMS messages (info)
Customise your error pages (info)
Specific notes on localisation or accessibility requirements?
Test your customizations
The Okta default UI spans user registration, enrollment, verification and account recovery. 

Test that your new look and feel is consistent for your users across all four actions. 
Test that your error pages work as expected.
Test that your text works in different languages as expected.
Copy/Synchronize your settings from UAT to Production (using Admin UX or Terraform)

Related Topics

Congratulations - your app now wraps its Okta components in your brand's look and feel. Your design team and your customers are both happy.

Go deeper into the Okta APIs that allow you to manipulate your customizations in code:

Use the Brands API to manage Brands, and their metadata, in your orgs. (info)
Use the Custom Email Templates API to manage email customizations. (info)
Use the SMS Templates API to manage SMS customizations. (info)

This journey is part of the Secure your Portal pathway, which also contains:

Add a sign-in form to your SPA
Add a sign-in form to your mobile app
Migrate / import users into your org 
Work with multiple brands in one org
Upgrade your org to Okta Identity Engine
