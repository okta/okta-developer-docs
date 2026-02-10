---
title: Test the Okta REST APIs with Postman
language: rest
integration: back-end
icon: code-rest
meta:
  - name: description
    content: Get started with Okta REST APIs and learn how to import a collection and send requests in Postman.
---

A great way to learn an Application Programming Interface (API) is to issue requests and inspect the responses. You can use Okta Postman Collections to learn how to incorporate Okta APIs into your workflow. To use these collections, complete the following steps:

1. [Sign up for Okta](#sign-up-for-okta) if you don't have an existing Okta org.
1. [Set up your Postman environment](#set-up-your-postman-environment).
1. [Import the Okta collection](#import-a-collection) that you want to test.
1. [Set up Okta for API access](#set-up-okta-for-api-access).

You can then [send test requests](/docs/guides/set-up-oauth-api/#send-a-request) to your Okta org and verify the results.

## Sign up for Okta

You need an Okta Integrator Free Plan org to get started. Don't have one? [Create an org for free](https://developer.okta.com/signup). The Integrator Free Plan org is assigned a base URL such as `integrator-1234567.okta.com`. This is your unique subdomain in Okta.

> **Note:** Use this unique subdomain whenever you see the `{yourOktaDomain}` variable in this document.

## Set up your Postman environment

1. [Install the Postman app](https://www.getpostman.com/apps).
1. Start Postman if it's not open already.
1. In the upper-left corner, click the hamburger menu > **File** > **Import** if you're on Windows. Click **Import** if you're on MacOS.
1. In the **Import** dialog, paste the following link into the **Paste cURL, Raw text or URL...** textbox: `https://developer.okta.com/docs/api/postman/example.oktapreview.com.environment`.
   > **Note:** You can also download this environment locally and import it as a file.
1. In the upper-right corner, click the box that lists the environments, and then select **`{yourOktaDomain}`** from the list. The initial value is `No Environment` if you just installed Postman.

    <div class="three-quarter">

    ![Postman environment list: Displays an arrow pointing to the box in the upper-right corner of the window that contains environments for use with Postman](/img/postman/postman_environment_list.png)

    <!--
    Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3236%3A30994  postman_environment_list
      -->

    </div>

1. In the upper-right corner, next to `{yourOktaDomain}`, click **Environment quick look** ![Postman environment quick look button](/img/postman/postman_eye_icon_button.jpg  "Displays the quick look eye icon button").
1. In the upper-right corner of the `{yourOktaDomain}` dialog, click **Edit**.

    <!--
    ![Postman environment quick look edit link: Displays an arrow pointing to the edit link in the upper-right corner of the {yourOktaDomain} dialog](/img/postman/postman_environment_quick_look_edit.png)
    Source image: https://www.figma.com/file/YH5Zhzp66kGCglrXQUag2E/%F0%9F%93%8A-Updated-Diagrams-for-Dev-Docs?node-id=3236%3A31016  postman_environment_quick_look_edit
    -->

1. In the environment tab, do the following:
    1. Click the environment name, delete the placeholder text, and name your environment. For example: `integrator-1234567 Okta Org`
    [[style="list-style-type:lower-alpha"]]
    1. For the `url` variable, in the **Initial Value** and **Current Value** columns, replace the placeholder text with your org's full URL. For example: `https://integrator-1234567.okta.com`. Remember to remove the `-admin` part of your subdomain.

1. Click **Save** near the top of the tab.
1. To close the environment tab, hover over the tab and click the **x**.

## Import a collection

Go to the Okta [Postman Collections](https://www.postman.com/okta-eng/okta-public-api-collections/overview) reference to fork the collection that you want to test.

To fork a collection from the Okta [Postman Collections](https://www.postman.com/okta-eng/okta-public-api-collections/overview) reference page, complete the following steps:

1. Click the **Collections** icon from the **Okta Public API Collections** left-hand navigation panel.

1. Click on the collection you want to fork, click the menu icon, and then select **Fork**.

1. Specify a name and workspace for your forked collection.

## Set up Okta for API access

To access Okta APIs from Postman, you need to authenticate with the Okta API resource server. Okta APIs support the OAuth 2.0 authentication scheme that uses access tokens. Access tokens enable the bearer to perform specific actions on specific Okta endpoints, defined by the scopes in the token.

See [Set up Okta for API access](/docs/guides/set-up-oauth-api/) for step-by-step instructions on how to set up Okta to obtain user-based or service-based access tokens.

> **Note:** Okta doesn't recommend using the Okta-propriety `SSWS` API token authentication scheme.
> This API token scheme allows you to access a broad range of APIs because there's no scope associated with the token. Access to the APIs depends on the privileges of the user that [created the API token](/docs/guides/create-an-api-token/main/). The API token also has a fixed expiry date.

## Tips

Use the following tips to work more efficiently with your collection.

### Find IDs for Okta API requests

Your imported collections contain URLs and JSON request bodies that have sample data with variables such as `{userId}`. You can replace the variables in the URL and body with the IDs of the resources that you want to specify.

1. To get a user's ID, send a request to list the users in your org like you did in the previous section. Each user listed in the response has an ID:

  <div class="three-quarter border">

  ![Response example for a request that highlights the ID in the response](/img/postman/postman_response2.png)

  </div>

1. Copy the `id` of the resource for use in your next request. In this example, use the `id` for Tony Stark. You can add the `id` value in your Postman environment and use the corresponding variable in your request URL or body.

### Retain the headers when you click links

You can retain headers when you click HAL links in the responses.

To retain the headers:

1. Click the gear icon from the toolbar in the upper-right corner of the page.
1. Select **Settings**.
1. In the **Headers** section, enable **Retain headers when clicking on links**.

## Next steps

Use Postman to learn more about the Okta APIs:

* Review the [Okta API reference](https://developer.okta.com/docs/api/).
* Import more API Postman Collections.
* Try request examples in the collections to help you understand how the APIs behave.
