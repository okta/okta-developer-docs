---
title: Finding Your Application Credentials
---

# Finding Your Application Credentials

If you're building an application using one of our SDKs or client libraries, you may run into the following message:

> Your client ID is missing. Replace `{clientId}` with the client ID of your Application. You can copy it from the Okta Developer Console in the details for the Application you created.

Or this one:

> Your client secret is missing. Replace `{clientSecret}` with the client secret of your Application. You can copy it from the Okta Developer Console in the details for the Application you created.

The first step in building an application with Okta is creating an Okta Application resource that represents your project. Okta generates credentials for you (called a client ID and client secret) that you copy into your code to associate your project with the Okta Application.

To find your Application's credentials, use the following steps:

1. Sign in to your Okta organization with your administrator account.
2. Click on **Applications**.
3. If you haven't created an Okta Application to represent your project, click **Add Application** and follow the instructions. Otherwise, pick your Application in the list.
4. On the General tab, scroll down to the Client Credentials section.
5. Copy the client ID and/or client secret using the **Copy to Clipboard** buttons to the right of each text field.

![Application Client Credentials section with Client ID and Client Secret fields](/assets/img/app-client-credentials-section.png "Application Client Credentials section with Client ID and Client Secret fields")

If you're stuck and need help, post a question on our [Developer Forum](https://devforum.okta.com).
