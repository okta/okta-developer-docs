---
title: Before You Begin
---

### Why Use an Import Inline Hook?

During batch imports of user profiles into Okta from applications, potential conflicts between imported users and already-existing users can require intervention to resolve. The Import Inline Hook enables you to implement programmatic solutions to handle conflicts according to your business logic, keeping automated batch processing running in an automated way.

### About this Guide

This guide is aimed at showing you how to implement one possible proces flow for the Import Inline Hook. In this example, the app that users are imported from is the Okta [CSV Directory Integration](https://help.okta.com/en/prod/Content/Topics/Directory/directory-integrations-csv.htm) agent. That agent consumes a CSV file containing user identities, and sends them to Okta, for Okta user profiles to be created or updated.

When enabled for an app, the Import Inline Hook fires every time a user is brought in from the app. When the hook fires, it calls an external service that you specify, passing to the service the user profile information of the user being imported, and allowing the service to respond with commands to affect ther user import process.

This guide walks you through the setup involved in enabling the inline hook for the CSV Directory Integration agent, as well as showing you the coding of some sample software to run on and external service, to handle the calls from Okta that occur when the hook fires. The aim of the functionality of the sample software is to resolve conflicts between users with matching values for the `login` attribute of their user profiles, so that, instead of being queued for manual review by an Admin, the conflicts are resolved programmatically.

<StackSelector snippet="platformdescription"/>

<NextSectionLink/>

