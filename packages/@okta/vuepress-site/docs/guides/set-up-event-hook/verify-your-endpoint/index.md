---
title: Verify Your Endpoint
---

After registering the event hook, you need to trigger a one-time verification process, by clicking the **Verify** button displayed in Admin Console after you register your Event Hook.

You can also trigger verification later, by going to **Workflow > Event Hooks**, selecting the particular Event Hook you registered, and selecting **Verify** from the **Actions** menu.

When you trigger verification, Okta calls out to your external service, making a one-time verification request to it. You need to have implemented functionality in your service to handle the expected request and response. The purpose of this step is to prove that you control the endpoint. 

If verification is successful, Admin Console displays a message confirming that the endpoint has been verified.

<NextSectionLink/>

