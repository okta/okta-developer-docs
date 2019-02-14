---
title: Getting a Token
redirect_from: /docs/getting_started/getting_a_token.html
---

# Create an API Token

1.  Log in to your Okta organization as a user with [administrator privileges](https://help.okta.com/en/prod/Content/Topics/Security/Administrators.htm?cshid=Security_Administrators#Security_Administrators). API tokens have the same permissions as the user who creates them, and if the user permissions change, the API token permissions also change.

If you don't have an Okta organization, you can create a free Okta
    Developer Edition organization [at this link](https://developer.okta.com/signup/){:target="_blank"}.

2.  Access the API page:
    - If you use the Developer Console, select **Tokens** from the **API** menu.
    - If you use the administrator's UI (Classic UI), select **API** from the **Security** menu, and then select **Tokens**.

3.  Click **Create Token**.
	{%imgokta-create-api-token-button.pngalt:"CreateToken"%}![](/assets/img/ "")

4.  Name your token and click **Create Token**.

5.  Make note of your API token, as you only see it one time.

## Token Expiration

Okta uses a bearer token for API authentication with a sliding scale expiration. Tokens are valid for 30 days and automatically refresh with each API call. Tokens that aren't used for 30 days expire. The token lifetime is currently fixed and can't be changed for your organization.

## Token Deactivation

If a user account is deactivated in Okta, the API Token is deprovisioned at the same time.

## Token Best Practice: Service Account

API tokens inherit the API access of the user who creates them, so we recommend you create a "service account"
user with only the permission levels that you need for the token to perform the API tasks that you require.
