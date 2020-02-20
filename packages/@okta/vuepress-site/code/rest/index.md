---
title: Get Started with the Okta REST APIs
language: rest
integration: back-end
icon: code-rest
meta:
  - name: description
    content: Find documentation to get started with Okta REST APIs and learn how to import a collection and send requests in Postman.
---

A great way to learn an API is to issue requests and inspect the responses. You can easily use our Postman collections to do just that.

![Postman and an Okta Collection](/img/okta_postman_logo.png "Postman and an Okta Collection")

To use these collections, you'll need to set up your local environment and import the collections. Then, you can send a test request and verify the results.

## Sign Up for Okta

You'll need a free Okta developer organization to get started. If you don't have one already, [sign up](https://developer.okta.com/signup/) to create one. When you create a new Okta organization, it will be assigned a base URL like `dev-12345.okta.com`. This is your unique subdomain in Okta.

## Set Up Your Environment

1. [Create an API token](/docs/guides/create-an-api-token/) for your org.

  > **Note:** Alternatively, you can [create an OAuth 2.0 access token](/docs/guides/implement-oauth-for-okta/) for use with a number of Okta endpoints. This is an EA feature that allows you to interact with Okta APIs using scoped OAuth 2.0 access tokens. Each access token enables the bearer to perform specific actions on specific Okta endpoints, with that ability controlled by which scopes the access token contains.

1. [Install the Postman app](https://www.getpostman.com/apps).
1. Launch Postman and click the **Import** button. Select **Import From Link**, and paste this link into the textbox: `https://developer.okta.com/docs/api/postman/example.oktapreview.com.environment`
![Importing the Okta Example Environment](/img/import_enviro.png "Importing the Okta Example Environment")

1. Once it's imported, make sure the `example.oktapreview.com` environment is selected.
![Postman app with collections](/img/postman_example_start.png "Postman app with collections")

1. Click the eye icon next to `example.oktapreview.com` and select **Edit** to replace or add these values:
    * Rename your environment to something you'll recognize. For example, `My Org`.
    * `url`: Replace the example value with your org's full URL: . For example, `https://${yourOktaDomain}`. (Make sure you don't include `-admin` in the subdomain!)
    * `apikey`: Enter the API token you created earlier, for example `00LzMWxMq_0sdErHy9Jf1sijEGexYZlsdGr9a4QjkS`.

1. Click **Update** to save your changes.

<DomainAdminWarning />

## Import a Collection

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
