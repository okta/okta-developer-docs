---
title: Use Postman with the Okta REST APIs
language: rest
integration: back-end
icon: code-rest
meta:
  - name: description
    content: Get started with Okta REST APIs and learn how to import a collection and send requests in Postman.
---

A great way to learn an API is to issue requests and inspect the responses. You can easily use our Postman collections to do just that. To use these collections, you need to set up your local environment and import a collection. You can then send a test request and verify the results.

## Sign up for Okta

You need a free Okta developer edition org to get started. Don't have one? [Create an org for free](https://developer.okta.com/signup). When you create a new Okta org, the org is assigned a base URL such as `dev-1234.okta.com`. This is your unique subdomain in Okta.

## Set up your environment

1. [Create an API token](/docs/guides/create-an-api-token/) for your org.

  > **Note:** Alternatively, you can [create an OAuth 2.0 access token](/docs/guides/implement-oauth-for-okta/) for use with a number of Okta endpoints. This is a feature that allows you to interact with Okta APIs using scoped OAuth 2.0 access tokens. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by which scopes the access token contains.

2. [Install the Postman app](https://www.getpostman.com/apps).
3. Launch Postman and select **Import** from the **File** menu.
4. Click **Import From Link** and then paste this link into the box that appears: `https://developer.okta.com/docs/api/postman/example.oktapreview.com.environment`
5. Click **Import**.
6. After the import is complete, verify that the `{yourOktaDomain}` environment is selected in the upper-right corner of the page.

  ![Postman app with collections](/img/postman_example_start.png "Points to the box in the upper-right corner that contains environments for use with Postman")

7. Click the gear icon to the right of `{yourOktaDomain}` and select your org to replace or add these values:
    * Rename your environment to something that you recognize, for example: `My Org`.
    * `url`: Replace the example value with your org's full URL: For example, `https://mytestorg.oktapreview.com`. Make sure that you don't include `-admin` in the subdomain.
    * `apikey`: Enter the API token that you created earlier, for example: `00LzMWxMq_0sdErHy9Jf1sijEGexYZlsdGr9a4QjkS`.

8. Click **Update** to save your changes and then close the **Manage Environments** window.

<DomainAdminWarning />

## Import a collection

Use the **Run in Postman** button below to import the Users API collection:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1755573c5cf5fbf7968b)

You can then select the option to open the collection using the Postman app. Alternatively, you are also given the option to use the **Web View** link to download the collection as a JSON file and import it:

* Import that file into Postman by selecting **Import** from the **File** menu.
* In the **Import** window, leave **Import File** selected and click **Choose Files**.
* Browse to your download location, select the JSON file, and click **Open**.
* Click **Import**.

> **Note:** You can import and work with the rest of the Okta API using the link at the top of each API reference page,
or see [all Postman collections](/docs/reference/postman-collections/). This tutorial only requires the Users API collection.

## Send a request

After you've imported the Users API collection and added your Okta org information to your environment, you're ready to send a request.

To make sure everything works, send a request to list all of the users in your org:

1. Select the **Collections** tab in Postman and expand the **Users (Okta API)** collection.
1. Expand the **List Users** folder and select **List Users**. This loads the List Users request into Postman, ready to send.
1. Click **Send**. The result pane automatically displays the results of your request:

If you receive an error, it's likely that one of the values in the environment isn't set correctly. Check the values and try again.

After you have completed this simple request, you're ready to explore the Okta API.

## Tips

Now that you have a working collection, you can use the following tips to work more efficiently.

### Find IDs for Okta API requests

Your imported collections contain URLs and JSON request bodies that have sample data with variables such as `{userId}`. You can replace URL and body variables with the IDs of the resources that you want to specify.

1. To get a user's ID, for example, send a request to list the users in your org like you did in the previous section. Each user listed in the response has an ID:

  ![List Users Response](/img/postman_response2.png "Response example for a GET users request that highlights the ID in the response")

2. Copy the `id` of the resource, in this example the `id` for Tony Stark, for use in your next request.

### Retain headers when you click links

You can retain headers when when you click HAL links in the responses.

To retain the headers:

1. Click the wrench icon from the toolbar in the upper-right corner of the page.
1. Select **Settings**.
1. In the **HEADERS** column, enable **Retain headers when clicking on links**.

## Next steps

Now that you have imported a collection and successfully tested a request and received a response, you can use Postman to learn more about the Okta APIs.

Access an Okta API, download the collection for that API, and try the request examples that come with the collection to help you more fully understand how that API works.
