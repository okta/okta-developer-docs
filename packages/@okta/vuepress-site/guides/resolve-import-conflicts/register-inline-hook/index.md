---
title: Register the Inline Hook
---

Before you can use your external service, you need to provide its URL, and some other necessary information to Okta. You do this in Admin Console.

First, confirm that the Inline Hooks feature is enabled for your org:

1. Go to **Settings > Features**.

1. Check that **Inline Hooks** is selected. If not, select it.

Now, register your new inline hook:

1. Go to **Workflow > Inline Hooks**.

1. Click **Add Inline Hook**.

1. Select **Import Inline Hook**. This is the type of inline hook you are adding.

1. Enter the following information:
	- **Name**: A human-readable name for this inline hook
	- **URL**: The URL of your external service endpoint
	- **Authentication field**: The name of the HTTP header that Okta should send the authentication secret in. Typically, you would use "Authorization" as the name for this header.
	- **Authentication secret**: The secret itself, a string you decide on. Your external service needs to check that the correct secret is provided in requests it receives.

1. In addition, if the network setup of the platform you host the external service on requires the presence of additional header fields in incoming requests, you can define their names and values in **Customer header fields**. Okta then sends the headers as defined in every request to your external service.

1. Click **Save**.

