---
component: Documentation
title: Documentation | Okta Developer
meta:
 - name: description
   content: Secure, scalable, and highly available authentication and user management for any app.
languages:
 - name: android
   link: /code/android/
   icon: code-android-32
 - name: angular
   link: /code/angular/
   icon: code-angular-32
 - name: react
   link: /code/react/
   icon: code-react-32
 - name: ios
   link: /code/ios/
   icon: code-ios-32
 - name: javascript
   link: /code/javascript/
   icon: code-javascript-32
 - name: vue.js
   link: /code/vue/
   icon: code-vue-32
 - name: Go
   link: /code/go/
   icon: code-go-32
 - name: java
   link: /code/java/
   icon: code-java-32
 - name: .net
   link: /code/dotnet/aspnetcore/
   icon: code-dotnet-32
 - name: node.js
   link: /code/nodejs/
   icon: code-nodejs-32
 - name: php
   link: /code/php/
   icon: code-php-32
 - name: rest
   link: /code/rest/
   icon: code-rest-32

sections:
   - title: Use Cases
     links:
       - title: Inline Hooks
         description: Integrate custom functionality into Okta process flows.
         link: /use_cases/inline_hooks/
       - title: Authentication
         description: Overview of the ways Okta can be used to authenticate users depending on your needs.
         link: /use_cases/authentication/
       - title: Events API Migration
         description: How to migrate from the Events API to its System Log API replacement.
         link: /use_cases/events-api-migration/
       - title: Multi-Factor Authentication
         description: Using Okta's Multi-Factor Authentication API to add MFA to an existing application.
         link: /use_cases/mfa/
       - title: API Access Management
         description: Secure your APIs with Okta's implementation of the OAuth 2.0 standard.
         link: /use_cases/api_access_management/
       - title: Relationships with Linked Objects
         description: Create users with relationships.
         link: /use_cases/relationships/

   - title: API Reference
     links:
       - title: Sign in Your Users
         description: API endpoints to authenticate your users, challenge for factors, recover passwords, and more.
         link: /docs/api/resources/oidc/
       - title: WebFinger
         description: Determine the Identity Provider that a user should be routed to.
         link: /reference/webfinger/
       - title: SCIM Protocol
         description: Enable SCIM-based provisioning from Okta to your application.
         link: /reference/scim/
       - title: Manage Okta Resources
         description: REST endpoints to configure resources such as users, apps, sessions, and factors whenever you need.
         link: /docs/api/resources/roles/
       - title: API Concepts
         description: Learn the basics of the Okta API.
         link: /docs/api/getting_started/design_principles/
       - title: Error Codes
         description: Understand Okta API errors.
         link: /reference/error_codes/
       - title: Okta Expression Language
         description: Read and transform attributes in our APIs and admin UI.
         link: /reference/okta_expression_language/
       - title: Postman Collections
         description: Import Okta API collections in Postman for easy inspection.
         link: /reference/postman_collections/

   - title: Change Log
     links:
      - title: API Products Change Log
        description: See what's new in API Products releases.
        link: /docs/change-log/

   - title: How-To
     links:
       - title: Add User Consent to Your Authentication Flow
         description: Add a user consent to your authentication or authorization flow
         link: /docs/how-to/add-user-consent-to-flow/
       - title: Upload Your Own Certificates for Outbound SAML Apps
         description: How to use a custom SAML certificate for apps
         link: /docs/how-to/byo_saml/
       - title: Create an ID Token or Access Token Containing a Groups Claim
         description: Use the app profile to create an ID token or access token that contains a groups claim
         link: /docs/how-to/creating-token-with-groups-claim/
       - title: Share Application Key Credentials for IdPs Across Apps
         description: How to share application key credentials between apps
         link: /docs/how-to/sharing-cert/
       - title: Upgrade SAML Apps to SHA256
         description: Upgrade SAML Apps to SHA256
         link:  /docs/how-to/updating_saml_cert/

---
