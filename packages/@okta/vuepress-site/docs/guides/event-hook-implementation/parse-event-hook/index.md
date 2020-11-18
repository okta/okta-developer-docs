---
title: Parse the Event Hook request
---
When a user is deactivated in the Okta org, your external service receives the Event Hook request from Okta, and must parse the Event Object to determine the user name or other data required by your external service.

In this example, after parsing the Event Hook request, the code simply displays the deactivated user to the console, and then replys to Okta with an empty, successful response (200).

<StackSelector snippet="parse-request"/>

<NextSectionLink/>