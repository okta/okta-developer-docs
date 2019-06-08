---
title: Set-up your Okta org for MFA
---

Before you can start writing code, you'll need to make do a few
things in the administrator UI to your Okta org.

1.  Enable support for MFA.
2.  [Create an API token](/docs/guides/create-an-api-token/).

#### Enable MFA in your Okta org

You must enable MFA from the Admin
interface of your Okta org before you can use it from the
Okta API. Here is how to enable MFA for
your Okta org:

1.  Log in to your Okta org as a user with administration.
2.  Click the "Admin" button to get into the administrator interface.
3.  Open the "Security" menu.
4.  Select "Authentication" from the menu.
5.  Click on "Multifactor".
6.  Click the "Edit" button in the "Factor Types" section.
7.  Check the check boxes next to "Google Authenticator" and "SMS
    Authentication".
8.  Click the green "Save" button.

For more information about MFA and the Okta org, see the [MFA](https://help.okta.com/en/prod/Content/Topics/Security/MFA.htm) and [Security Policies](https://help.okta.com/en/prod/Content/Topics/Security/Security_Policies.htm) help topics.

### Create an API token for your Okta org

Requests made to the Okta API are authenticated via an API
token. [Here is how to create an API token for your Okta
org](/docs/guides/create-an-api-token/).

<NextSectionLink/>
