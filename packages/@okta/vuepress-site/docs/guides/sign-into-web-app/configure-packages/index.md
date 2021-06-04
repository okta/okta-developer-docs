---
title: Add and configure packages
---
Next you need to add an Okta SDK to your application.

<StackSelector snippet="addconfigpkg"/>

### Configure the package

You need the following values from the Okta Application and the Admin Console that you worked with in <GuideLink link="../create-okta-application">Create an Okta application</GuideLink>:

* **Client ID** &mdash; find it in the applications list or on the application's **General** tab.
* **Client Secret** &mdash; find it on the application's **General** tab.
* **Okta Domain** &mdash; you can find the Okta Domain in the Admin Console's global header in the upper-right corner of the page. Click the section that displays your email and company name.  A drop-down box appears and displays general org information including the full Okta domain (for example, subdomain.okta.com).

You can use the [default Custom Authorization Server](/docs/concepts/auth-servers/#default-custom-authorization-server) that's provided in your [Okta Developer Edition](https://developer.okta.com/signup/) org. If you want to use another [Custom Authorization Server](/docs/concepts/auth-servers/#custom-authorization-server), then you need the following value from the Admin Console:

* **Authorization Server ID** &mdash; find it on the **Security** > **API** > your custom Authorization Server name > **Settings** tab. The Authorization Server ID is the last generated ID string from the **Issuer** property. For example, if the issuer is `https://dev-000000.okta.com/oauth2/auss5kkzkkzYune155e6`, then your Authorization Server ID is `auss5kkzkkzYune155e6`.

> **Note:** The [API Access Management](https://help.okta.com/en/prod/Content/Topics/Security/API_Access.htm) feature must be enabled in your Okta org for you to use a [Custom Authorization Server](/docs/concepts/auth-servers/#custom-authorization-server).

You can configure the properties of your application with configuration files, environment variables, or other framework specific techniques.

<StackSelector snippet="configmid"/>

<NextSectionLink/>
