---
title: Set up your Okta org for MFA
---

Before you can start writing code, you need to make sure to enable support for MFA and create an API token in the Admin Console of your Okta org.

## Enable MFA in your Okta org

You need to enable MFA from the Admin Console of your Okta org before you can use it with the Okta API.

1. From the Admin Console, select **Security** and then **Multifactor**.
6. Click **Edit** in the "Factor Types" section.
7. Check the check boxes next to "Google Authenticator" and "SMS
    Authentication".
8. Click the green "Save" button.

For more information about MFA and the Okta org, see [MFA](https://help.okta.com/en/prod/Content/Topics/Security/MFA.htm) and [Security Policies](https://help.okta.com/en/prod/Content/Topics/Security/Security_Policies.htm).

### Create an API token for your Okta org

Requests made to the Okta API are authenticated via an API token. [Here is how to create an API token for your Okta
org](/docs/guides/create-an-api-token/). [Create an API token](/docs/guides/create-an-api-token/).

<NextSectionLink/>
