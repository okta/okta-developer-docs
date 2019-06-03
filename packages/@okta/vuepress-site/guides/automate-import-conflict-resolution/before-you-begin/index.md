---
title: Before You Begin
---

### Why Use an Import Inline Hook?

During batch imports of user profiles to Okta from applications, conflicts between imported users and already-existing users require manual intervention to resolve. The Import Inline Hook enables you to implement programmatic solutions to potential conflicts on the basis of your own custom business logic, in order to enable batch imports to run in a fully-automated way.

### About This Guide

This guide aims to demonstrate one possible proces flow for using the Import Inline Hook. In this example, the app that users are imported from is the [CSV Directory Integration](https://help.okta.com/en/prod/Content/Topics/Directory/directory-integrations-csv.htm) agent. That agent consumes a CSV file containing user identities, and sends them to Okta, so that Okta user profiles can be created or updated based on them. The Import Inline Hook will be enabled for the CSV Directory Integration agent.

When the Import Inline Hook is enabled for an app such as the CSV Directory Integration agent, the hook fires every time a user is brought in from that app, calling an external service that you specify. The hook passes to the service the user profile information of the user being imported, which the service can respond to with commands to affect the course of the user import.

This guide walks through the setup of the Import Inline Hook for the CSV Directory Integration agent, and demonstrates the coding of some sample software to run on the external service to handle the calls from Okta. The aim of the sample software is to resolve conflicts between users with matching values for the `login` user profile attribute, so that, instead of being queued for manual review by an Admin, the conflicts are resolved programmatically.

### What You Need

For end-to-end implementation of the solution demonstrated in this guide, you need:

- An Okta Developer Edition organization. (Don't have one? [Create one for free](https://developer.okta.com/signup).)
- A [CSV Directory Integration](https://help.okta.com/en/prod/Content/Topics/Directory/directory-integrations-csv.htm) agent running on a Linux or Windows server.
- A CSV file containing user identities, for the CSV Directory Integration agent to consume.
- A platform to host an HTTPS server with an Internet-accessible endpoint. The platform needs to support execution of Node.js code, to use the sample code in this guide. 

### Background Information on Okta Inline Hooks

For a general introduction to Okta inline hooks, see [Inline Hooks](/use_cases/inline_hooks/).

<NextSectionLink/>

