---
title: Test your integration
---

This portion of the guide takes you through the steps required to test your integration.

### Assign users

First you must assign your integration to one or more test users in your org:

1. Click the **Assignments** tab.
1. Click **Assign** and then select either **Assign to People** or **Assign to Groups**.
1. Enter the appropriate people or groups that you want to have Single Sign-On into your application, and then click **Assign** for each.
1. For any people that you add, verify the user-specific attributes, and then select **Save and Go Back**.
1. Click **Done**.

### Test Single Sign-On

1. Sign out of your administrator account in your development org. Click **Sign out** in the top right corner of the Admin Console.
1. Sign in to the Okta End-User Dashboard as the regular user that was assigned the integration.
1. In your dashboard, click on the Okta tile for the integration and confirm that the user is signed in to your application.

<StackSelector snippet="test" />

<NextSectionLink/>
