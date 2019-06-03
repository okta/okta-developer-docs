---
title: Before You Begin
---
During large scale batch imports of user profiles from your applications to Okta, potential conflicts between imported users and already-existing users can require intervention to resolve. The Import Inline Hook enables you to implement programmatic solutions to handle these conflicts according to your own business logic, and thereby keep automated batch processing running in a fully automated way.

This guide is aimed at showing an example of one possible proces flow, which uses the Okta [CSV Directory Integration](https://help.okta.com/en/prod/Content/Topics/Directory/directory-integrations-csv.htm) agent as the import method. That agent consumes a CSV file containing user identities, which Okta creates Okta profiles based on. In cases where Okta recognizes an incoming user profile as potentially being in conflict with an already-existing Okta user profile, the Import Inline Hook will fire, calling an external service to resolve the conflict.

This guide will walk you through the setup of the inline hook and the coding of the external service to handle calls from Okta and resolve the conflicts.

<StackSelector snippet="platformdescription"/>

<NextSectionLink/>

