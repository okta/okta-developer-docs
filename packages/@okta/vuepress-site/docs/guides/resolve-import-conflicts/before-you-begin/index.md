---
title: Before You Begin
---

### Use the Import Inline Hook to Resolve Conflicts

During batch imports of user profiles, imported profiles can conflict with other profiles, which requires admins to step in and manually resolve the import conflicts. The Import Inline Hook enables you to implement software solutions to resolve conflicts on the basis of your own custom business logic. That way, instead of being queued for manual review by an Admin, conflicts are resolved programmatically.

#### Background Information

- For a general introduction to Okta inline hooks, see [Inline Hooks](/docs/concepts/inline-hooks/).
- For reference documentaton for the Import Inline Hook, see [Import Inline Hook](/docs/reference/import-hook/).

### About This Guide

This guide demonstrates one possible scenario for using the Import Inline Hook to resolve conflicts between user profiles that are being imported. In this scenario, users are imported from the [Okta On-Premises Provisioning agent](https://help.okta.com/en/prod/Content/Topics/Directory/directory-integrations-csv.htm). Similar process flows work for any app that supports provisioning of users to Okta.

When enabled, the Import Inline Hook fires every time a user is brought in from the app. When it fires, the hook makes a REST call to an external service, passing it, in the payload of the call, the user profile attributes of the user being imported. The external service can then respond with commands that affect the course of the user import.

This guide walks through the configuration of the hook and the coding of some sample software to implement the external service. The aim of the sample software implementation will be to resolve conflicts between user profiles that have the same value for the `login` profile attribute.

### What You Need

For end-to-end implementation of the solution demonstrated in this guide, you need:

- An Okta Developer Edition organization. (Don't have one? [Create one for free](https://developer.okta.com/signup).)
- An [Okta On-Premises Provisioning agent](https://help.okta.com/en/prod/Content/Topics/Directory/directory-integrations-csv.htm), running on a Linux or Windows server. (You must have CSV Directory Integration enabled for your org in order to use the feature).
- A CSV file, containing user identities, for the CSV Directory Integration agent to consume.
- An application platform to host your external service. It must support HTTPS and be able to expose an Internet-accessible endpoint.  

<StackSelector snippet="platform"/>

<NextSectionLink/>

