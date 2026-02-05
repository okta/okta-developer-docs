<template>
  <div>
    <p>
      To make secure Okta API requests to configure your Okta orgs, obtain OAuth 2.0 access tokens for the <code>Authorization</code> header in requests. The Okta setup to obtain access tokens depends on whether you want the token to have a user-based or a service-based context:
    </p>

    <ul>
      <li>
        User-based access: The access token is tied to a specific admin user. For this access, you need to provide an Okta admin username and credentials. See <a href="/docs/guides/set-up-oauth-api/main/#user-based-api-access-setup">User-based API access setup</a>.  Grant the appropriate scopes for your endpoint and use case. Use this access type for simple testing of the APIs.
      </li>
      <li>
        Service-based access: If you have a service app or script that makes API requests to Okta without user context, see <a href="/docs/guides/set-up-oauth-api/main/#service-based-api-access-setup">Service-based API access setup</a>. Grant the appropriate scopes for your endpoint and use case.
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CreateOAuth2Token"
};
</script>
