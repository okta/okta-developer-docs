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
3. Start Postman if it's not open already.
4. In the upper-left corner, click **Import**.
5. In the **Import** dialog box, click **Link** and then paste the following link into the **Enter a URL** box: `https://developer.okta.com/docs/api/postman/example.oktapreview.com.environment`.
6. Click **Continue** and then **Import** to confirm your environment import.
6. Under **Confirm your import**, click **Import**. ![Postman Import dialog for confirming import](/img/postman_import_dialog_confirm.png "Displays an arrow pointing to the Import button in the lower-right corner of the Import dialog box")
A notification confirms that the import is complete.
7. At the upper-right corner, click the box that lists the environments, and then select `{yourOktaDomain}` from the list. (The initial value is **No Environment** if you just installed Postman.) ![Postman environment list box](/img/postman_environment_list.png "Displays an arrow pointing to the box in the upper-right corner of the window that contains environments for use with Postman")
8. At the upper-right corner, next to `{yourOktaDomain}`, click the **eye** symbol (Environment quick look). ![Postman environment quick look button](/img/postman_environment_quick_look.png "Displays an arrow pointing to the eye button in the upper-right corner of the Postman window")
9. In the upper-right corner of the {yourOktaDomain} dialog box, click **Edit**. 
![Postman environment quick look edit link](/img/postman_environment_quick_look_edit.png "Displays an arrow pointing to the edit link in the top-right corner of the {yourOktaDomain} dialog box")
10. In the **MANAGE ENVIRONMENTS** dialog box, do the following:
    * In the **Environment Name** box, delete the placeholder text and name your environment to something you recognize, for example: `John's Okta Org`.
    * In the table row for the **VARIABLE** `url`, on the **INITIAL VALUE** and **CURRENT VALUE** columns, replace the placeholder text with your org's full URL. For example, `https://dev-1234567.okta.com`. Remember to _remove_ the `-admin` part in the subdomain.
    * In the table row for the **VARIABLE** `apikey`, on the **INITIAL VALUE** and **CURRENT VALUE** columns, enter your API token that you created earlier. For example, `00LzMWxMq_0sdErHy9Jf1sijEGexYZlsdGr9a4QjkS`.

    ![Postman MANAGE ENVIRONMENTS dialog box](/img/postman_manage_environments_dialog.png "Displays arrows that points to the Environment Name box and the url and apikey variables in the MANAGE ENVIRONMENTS dialog box")
11. To save the changes you made, scroll down all the way and click **Update**.
12. To close the **MANAGE ENVIRONMENTS** dialog box, click X in the upper-right corner.
![Postman MANAGE ENVIRONMENTS dialog box with additional options](/img/postman_closing_manage_environments_dialog.png "Displays an arrow pointing to the close button in the upper-right corner of the MANAGE ENVIRONMENTS dialog box")

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
