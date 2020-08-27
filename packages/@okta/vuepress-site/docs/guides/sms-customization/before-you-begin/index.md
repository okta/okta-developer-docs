---
title: Before you begin
---

You can customize the text of the SMS messages that Okta sends to an end user for multifactor authentication verification. SMS messages are sent to a user's mobile device along with a verification code when the user is signing in to their org. The user enters that code to authenticate and finish the sign-in process.

Okta provides one default SMS message template that is automatically sent to your users. You can't change this default message, but you can add translations for it, and you can use it to create a custom SMS message template.

Although Okta supports many variables for use in email templates, only two are supported for [SMS message templates](/docs/reference/api/templates/) and only one is required. When you add a translation or create a custom SMS message template, the message text must include the variable `${code}`. This variable represents the one-time verification code that is required when a user signs in. You can also use the variable `${org.name}`. This variable represents the Okta organization that the user is trying to authenticate with.

When crafting a translation or creating a custom SMS message, keep the following in mind:

* The maximum length of the message is 159 characters.
* The variable `${code}` is required. The variable `${org.name}` is optional.
* The variables are included in the message length count.
* The message can include only alphanumeric and punctuation characters. Avoid using special characters.

<NextSectionLink/>
