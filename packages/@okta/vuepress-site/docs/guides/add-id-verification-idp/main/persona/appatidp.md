At [<StackSnippet snippet="idp" inline />](https://withpersona.com/), create the client app to use for verifying your users.

### Configure an IDV template

Create your <StackSnippet snippet="idp" inline /> app and IDV flows. See [Okta integration overview](https://help.withpersona.com/articles/4w8cDQLPuaPAadq4LzhO40/) to learn about the different IDV templates available and how to configure them.

### Configure the client ID, client secret, and redirect URI of the <StackSnippet snippet="idp" inline /> app

> **Note:** An API key is no longer required for the <StackSnippet snippet="idp" inline /> integration. Instead, generate a client ID and client secret in your <StackSnippet snippet="idp" inline /> app and use them to authenticate the request to Okta. See [How to set up Persona authentications for Okta Workforce Authentication](https://help.withpersona.com/articles/x7vPGY4te68wp1T0Ce5eFi/#how-to-set-up-persona-authentications-for-okta-workforce-authentication).

Set your org URL as the redirect URI in your <StackSnippet snippet="idp" inline /> app, and append `/idp/identity-verification/callback`. The redirect URI is the location where <StackSnippet snippet="idp" inline /> sends the verification response.

* For example, if your Okta subdomain is called `company`, then the URL would be: `https://company.okta.com/idp/identity-verification/callback`. If you’ve configured a custom domain in your Okta org, use that value to construct your redirect URI, such as `https://login.company.com/idp/identity-verification/callback`.
* Include all base domains (Okta domain and custom domain) that your users interact with in the allowed redirect URI list.

> **Note:** If you're migrating from the existing Persona IDV integration, see [Migrating to the new Persona IDV integration](https://help.withpersona.com/articles/58NE2qRFCBoh1ogfpB7Q1J/#migrating-to-the-new-persona-idv-integration).

### Other IDV vendor configuration

There are more settings for the <StackSnippet snippet="idp" inline /> app that you can configure. The steps in this guide address the quickest route to set up <StackSnippet snippet="idp" inline /> as an IDV vendor with Okta.

See the [<StackSnippet snippet="idp" inline /> documentation](https://docs.withpersona.com/docs/getting-started) for more information about other configuration settings.
