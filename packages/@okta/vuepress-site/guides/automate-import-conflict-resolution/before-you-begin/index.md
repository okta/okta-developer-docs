---
title: Before You Begin
---

### Why Use an Import Inline Hook?

During batch imports of user profiles to Okta from applications, potential conflicts between imported users and already-existing users can require intervention to resolve. The Import Inline Hook enables you to implement programmatic solutions to handle conflicts on the basis of your own custom business logic, keeping automated batch processing running in an automated way.

### About this Guide

This guide is aimed at showing you how to implement one possible proces flow for the Import Inline Hook. In this example, the source that users are imported from is the [CSV Directory Integration](https://help.okta.com/en/prod/Content/Topics/Directory/directory-integrations-csv.htm) agent. That agent consumes a CSV file containing user identities, and sends them to Okta, for Okta user profiles to be created or updated. The Import Inline Hook will be enabled for the CSV Directory Integration agent.

When the Import Inline Hook is enabled for an app such as the CSV Directory Integration agent, the hook fires every time a user is brought in from that app, calling an external service that you specify. In the call, the hook passes to the service the user profile information of the user being imported, which the service can respond to with commands that affect ther user import process.

This guide walks you through the setup involved in enabling the hook for the CSV Directory Integration agent, and shows you the coding of some sample software to run on the external service, to handle the calls from Okta that occur when the hook fires. The aim of sample software is to resolve conflicts between users with matching values for the `login` user profile attribute, so that, instead of being queued for manual review by an Admin, the conflicts are resolved programmatically.

<StackSelector snippet="platformdescription"/>

<NextSectionLink/>

