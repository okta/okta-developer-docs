---
title: Before You Begin
---

### Why Use an Import Inline Hook?

During batch imports of user profiles into Okta from applications, potential conflicts between imported users and already-existing users can require intervention to resolve. The Import Inline Hook enables you to implement programmatic solutions to handle conflicts according to your business logic, keeping automated batch processing running in an automated way.

### About this Guide

This guide is aimed at showing you how to implement one possible proces flow for the Import Inline Hook. In this implementation, the app that users are imported from is the Okta [CSV Directory Integration](https://help.okta.com/en/prod/Content/Topics/Directory/directory-integrations-csv.htm) agent. That agent consumes a CSV file containing user identities, and sends them to Okta, so that Okta user profiles can be created or updated based on them.

When you enable an Import Inline Hook for an app, the Import Inline Hook fires every time a user is brought in from that app. When the hook fires, it calls an external service that you provide, passing the user profile information to the service, and allowing the service to respond with commands to affect ther user import process.

This guide will walk you through the setup involved in enabling the inline hook and the coding of some sample software running on an external service to handle the calls from Okta. The aim of the sample software will be to resolve conflicts between users with matching `userID` values, so that, instead of being queued for manual review by an Admin, the conflicts will be resolved programmatically.

<StackSelector snippet="platformdescription"/>

<NextSectionLink/>

