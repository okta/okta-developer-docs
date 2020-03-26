---
title: Get Started with the Okta REST APIs
language: rest
integration: back-end
icon: code-rest
meta:
  - name: description
    content: Get started with Okta REST APIs and learn how to import a collection and send requests in Postman.
---

A great way to learn an API is to issue requests and inspect the responses. You can easily use our Postman collections to do just that. To use these collections, you need to set up your local environment and import a collection. Then, you can send a test request and verify the results.

## Sign up for Okta

You need a free Okta developer edition org to get started. Don't have one? [Create an org for free](https://developer.okta.com/signup). When you create a new Okta org, the org is assigned a base URL such as `dev-12345.okta.com`. This is your unique subdomain in Okta.

## Set up your environment

1. [Create an API token](/docs/guides/create-an-api-token/) for your org.

> **Note:** Alternatively, you can [create an OAuth 2.0 access token](/docs/guides/implement-oauth-for-okta/) for use with a number of Okta endpoints. This is a feature that allows you to interact with Okta APIs using scoped OAuth 2.0 access tokens. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by which scopes the access token contains.

1. [Install the Postman app](https://www.getpostman.com/apps).
1. Launch Postman and select **Import** from the **File** menu.
1. Click **Import From Link** and then paste this link into the box that appears: `https://developer.okta.com/docs/api/postman/example.oktapreview.com.environment`
1. Click **Import**.
1. After you import the environment, make sure that the `example.oktapreview.com` environment is selected in the upper-right corner of the page.

![Postman app with collections](/img/postman_example_start.png "Points to the box in the upper-right corner that contains environments for use with Postman")

1. Click the gear icon to the right of `example.oktapreview.com` and select your org to replace or add these values:
    * Rename your environment to something you recognize, for example: `My Org`.
    * `url`: Replace the example value with your org's full URL: For example, `https://myorg.oktapreview.com`. Make sure that you don't include `-admin` in the subdomain.
    * `apikey`: Enter the API token that you created earlier, for example: `00LzMWxMq_0sdErHy9Jf1sijEGexYZlsdGr9a4QjkS`.

1. Click **Update** to save your changes and then close the **Manage Environments** window.

<DomainAdminWarning />

## Import a collection

Import the collection for the Users API:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1755573c5cf5fbf7968b)

If you have Postman installed, clicking the button above gives you the option of importing the collection into Postman.

You can also import the collection by following the Web View link and downloading the collection as a JSON file. Import that file into Postman by clicking the **Import** button and browsing to your download location.

> **Note:** You can import and work with the rest of the Okta API using the link at the top of each API reference page,
or see [all Postman collections](/docs/reference/postman-collections/). This tutorial only requires the Users API collection.

## Send a Request

Once you've imported the Users API collection, and added your Okta org information to your environment, you're ready to send a request.

To make sure everything works, send a request to list all the users in your org:

1. Select the **Collections** tab in Postman and open the **Users (Okta API)** collection. Open the **List Users** folder, and select **(GET) List Users**. This loads the List Users request into Postman, ready to send.
1. Click **Send**. The result pane automatically displays the results of your request:
![GET List Users](/img/postman_response.png "GET List Users")

If you receive an error, it's likely that one of the values in the environment isn't set correctly. Check the values and try again.

Once you have completed this simple request, you're ready to explore the Okta API!

## Tips

Now that you have a working collection, you can use the following tips to work more efficiently.

### Find IDs for Okta API Requests

Your imported collections contain URLs and JSON request bodies that have sample data with variables such as `{userId}`.
Replace URL and body variables with the IDs of the resources you wish to specify.

To find an ID:

1. List a resource collection with a search or filter. For example, list the users in your org, as you did in the previous section.
![List Users Response](/img/postman_response2.png "List Users Response")

1. Copy the `id` of the resource, in this example the `id` for Tony Stark, in your next request.

### Retain Headers When Clicking Links

Retaining the headers is helpful when you click HAL links in responses.

To retain the headers:

1. Launch Postman and click the wrench icon.
1. Select **Settings**.
1. In the **Headers** column, enable **Retain headers when clicking on links**.

## Next Steps

Now that you have imported a collection and successfully tested a request and received a response, you can use Postman to learn more about the Okta APIs.

Access an Okta API, download the collection for that API, and try the request examples that come with the collection to help you more fully understand how the API works.
