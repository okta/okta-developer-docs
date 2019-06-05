---
title: Before You Begin
---

### Use the Import Inline Hook to Resolve Conflicts

During batch imports of user profiles from applications, imported user profiles can conflict with already-existing user profiles, or with other profile in the batch, requiring manual intervention by admins to resolve the conflicts. The Import Inline Hook enables you to implement programmatic solutions to potential conflicts, according to your own custom business logic, enabling batch imports to run in a more automated way.

#### Background Information

- For a general introduction to Okta inline hooks, see [Inline Hooks](/use_cases/inline_hooks/).
- For reference documentaton for the Import Inline Hook, see [Import Inline Hook](/use_cases/inline_hooks/import_hook/import_hook/).


### About This Guide

This guide demonstrates one possible scenario for using the Import Inline Hook. In this scenario, the app that users are imported from is the [Okta On-Premises Provisioning agent](https://help.okta.com/en/prod/Content/Topics/Directory/directory-integrations-csv.htm). The Import Inline Hook can be enabled for an instance of the On-Premises Provisioning agent.

When enabled, the hook fires every time a user is brought in from the app, making a REST call to the external service that you specify and passing, in the payload of the call, the user profile attributes of the user being imported. The external service can respond with commands that affect the course of the user import.

This guide walks demonstrates the coding of sample software to implement an external service to handle the hook calls from Okta. The aim of the software will be to resolve conflicts between user profiles that have the same value for the `login` profile attribute, so that, instead of being queued for manual review by an Admin, conflicts are resolved programmatically.

### What You Need

For end-to-end implementation of the solution demonstrated in this guide, you need:

- An Okta Developer Edition organization. (Don't have one? [Create one for free](https://developer.okta.com/signup).)
- An [Okta On-Premises Provisioning agent](https://help.okta.com/en/prod/Content/Topics/Directory/directory-integrations-csv.htm), running on a Linux or Windows server.
- A CSV file containing user identities, for the CSV Directory Integration agent to consume.
- An application platform to host an HTTPS server with an Internet-accessible endpoint.  

<StackSelector snippet="platform"/>

<NextSectionLink/>

