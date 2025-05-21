---
title: Customize SMS messages
excerpt: Learn how to customize the SMS messages sent to your users.
layout: Guides
---

This guide explains how to customize the text of the SMS messages that Okta sends to an end user for multifactor authentication verification.

---

#### Learning outcomes

* Create a custom SMS template.
* Create a translation for each language to match your custom SMS message.

#### What you need

[Okta Integrator Free Plan org](https://developer.okta.com/signup)

---

## About SMS customization

You can customize the text of the SMS messages that Okta sends to an end user for multifactor authentication verification. SMS messages are sent to a user's mobile device along with a verification code when the user is signing in to their org. The user enters that code to authenticate and finish the sign-in process.

Okta provides one default SMS message template that is automatically sent to your users. You can't change this default message, but you can add translations for it, and you can use it to create a custom SMS message template.

Okta supports two variables for [SMS message templates](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Template/):

* `{code}`: Required. When you add a translation or create a custom SMS message template, the message text must include the variable `{code}`. This variable represents the one-time verification code that is required when a user signs in.
* `{org.name}`: Optional. This variable represents the Okta organization that the user is trying to authenticate with.

When crafting a translation or creating a custom SMS message, keep the following in mind:

* The maximum length of the message is 159 characters.
* The variable `{code}` is required. The variable `{org.name}` is optional.
* The variables are included in the message length count.
* The message can include only alphanumeric and punctuation characters. Avoid using special characters.

## Customize the Okta default SMS message

> **Note:**  If you don't want to customize the default SMS message and only want to add translations for the languages that your org supports, see [Add a translation](#add-a-translation).

1. In the Admin Console, go to **Settings**, and then **Emails & SMS**.

2. Select the **SMS** tab.

> **Note**: In Okta Identity Engine, select **Customizations** and then **SMS** to find the SMS editor.

> **Note:** In the **Custom Language** section of the page, you can view Okta's default SMS message by clicking the **Default** arrow to expand it.

3. Click the pencil icon under **Actions** to start creating a custom message from the default. The changes that you make create a custom SMS message template, and you’re no longer using the default Okta SMS message.

For example: `{org.name}: your verification code is {code}`

> **Tip:** To reset the message back to the original default, click **Reset to Default**. This removes the custom SMS message template and all of the associated translations, and reverts to the original default SMS message template.

4. Click **Save**.

* If you don't support any other languages in your org, you're finished.
* If you support other languages in your org, you need to create a translation for each language to match your new custom SMS message. You also need to provide the translated text for each message. Go to step 3 in [Add a translation](#add-a-translation).

## Add a translation

If you support other languages in your org, you need to create a translation for each language to match your [new custom SMS message](#overview). You also need to provide the translated text for each message.

1. In the Admin Console, go to **Settings**, and then **Emails & SMS**.

2. Select the **SMS** tab.

3. Click **Add Translation**.

4. In the **Add Translation** dialog box, select the language from the **Language** dropdown box.

5. Enter the message, in the translated language, into the box.

For example: `it": "{org.name}: il codice di verifica è {code}`

6. Click **Add Translation**.

> **Note:** If you’re adding a translation for the Okta default SMS message, after you add that translation, you’re no longer using the default message. The new language translation appears under what is now your custom SMS message.

7. Repeat steps 3 through 6 for each language that your org supports.

> **Note:** Alternatively, you can use the [Okta SMS Templates API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/Template/) to manage custom SMS message templates.

## Next steps

Next, look at [customizing and styling the default email notifications](/docs/guides/custom-email/) that Okta sends to end users.