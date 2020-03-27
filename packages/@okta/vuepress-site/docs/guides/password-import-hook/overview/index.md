---
title: Overview
---

This guide is about coding an external service to interact with Okta's Password Import Inline Hook. An external is the customer-provided piece of software that Okta calls when the Inline Hook fires. In the case of the Password Import Inline Hook, the payload of the call from Okta contains login credentials supplied by end users trying to sign in to Okta, whose Okta user profiles specify that their password should be imported by means of the Inline Hook.

The sample code in the following sections of this guide is meant as a demonstration of parsing the request from Okta, looking up the end user's credentials in an existing external user store, and responding to Okta with a command to indicate whether the credentials supplied were valid or not.

<NextSectionLink/>


