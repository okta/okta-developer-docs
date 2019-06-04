---
title: Before You Begin
---

### Use the Import Inline Hook to Resolve Conflicts

During batch imports of user profiles from applications, imported user profiles can conflict with already-existing user profiles, requiring manual intervention by admins. The Import Inline Hook enables you to implement programmatic solutions to potential conflicts, on the basis of your own custom business logic, to enable batch imports to run in a fully-automated way.

#### Background Information

- For a general introduction to Okta inline hooks, see [Inline Hooks](/use_cases/inline_hooks/).
- For reference documentaton for the Import Inline Hook, see [Import Inline Hook](/use_cases/inline_hooks/import_hook/import_hook/).


### About This Guide

This guide demonstrates one possible scenario for using the Import Inline Hook. In this scenario, the app that users are imported from is the [Okta On-Premises Provisioning agent](https://help.okta.com/en/prod/Content/Topics/Directory/directory-integrations-csv.htm). It is possible to enable the Import Inline Hook for the On-Premises Provisioning agent, enabling automated handling of conflicts.

The Import Inline Hook fires every time a user is brought in from an app, making a REST call to the external service that you specify. It passes to the external service the user profile attributes of the user being imported, and the external service can respond with commands that affect the course of the user import.

This guide walks through the setup of the Import Inline Hook for the CSV Directory Integration agent, and demonstrates the coding of some sample software to implement the external service and handle the hook calls from Okta. The aim of the software will be to resolve conflicts between user profiles that have the same value for the `login` profile attribute, so that, instead of being queued for manual review by an Admin, the conflicts are resolved programmatically.

### What You Need

For end-to-end implementation of the solution demonstrated in this guide, you need:

- An Okta Developer Edition organization. (Don't have one? [Create one for free](https://developer.okta.com/signup).)
- An[Okta On-Premises Provisioning agent](https://help.okta.com/en/prod/Content/Topics/Directory/directory-integrations-csv.htm), running on a Linux or Windows server.
- A CSV file containing user identities, for the CSV Directory Integration agent to consume.
- A platform to host an HTTPS server with an Internet-accessible endpoint. To run the sample code in this guide, the platform needs to support execution of Node.js code. 


<NextSectionLink/>

