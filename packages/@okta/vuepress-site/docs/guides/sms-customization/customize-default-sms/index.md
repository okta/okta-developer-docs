---
title: Customize the Okta Default SMS message
---

This section walks you through customizing the Okta Default SMS message.

> **Note:**  If you don't want to customize the Default SMS message and just need to add translations for the languages that your org supports, skip to the <GuideLink link="../add-translation">Add a translation</GuideLink> section.

1. In the Developer Console, go to **Customizations**, and then **Emails & SMS**.

2. Select the **SMS** tab.

> **Note:** In the **Custom Language** section of the page, you can view Okta's Default SMS message by clicking the **Default** arrow to expand it.

3. Click the pencil icon under **Actions** to start creating a custom message from the Default. The changes that you make create a custom SMS message template, and you are no longer using the Default Okta SMS message.

For example: `${org.name}: your verification code is ${code}`

> **Tip:** To reset the message back to the original Default, click **Reset to Default**. This removes the custom SMS message template and all of the associated translations, and reverts back to the original Default SMS message template.

5. Click **Save**. If you don't support any other languages in your org, you are finished. If you support other languages in your org, you need to <GuideLink link="../add-translation">create a translation</GuideLink> for each language to match your new custom SMS message. You also need to provide the translated text for each message. Start at step 3 in the next section.

<NextSectionLink/>
