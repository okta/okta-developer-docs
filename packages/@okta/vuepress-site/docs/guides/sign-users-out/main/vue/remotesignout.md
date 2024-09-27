Send the user's browser to the [OIDC logout page](https://developer.okta.com/docs/api/openapi/okta-oauth/oauth/tag/CustomAS/#tag/CustomAS/operation/logoutCustomASWithPost) after you [sign the user out](/docs/guides/sign-users-out/vue/sign-out-of-your-app/). This page clears the user's Okta session and then redirects back to the `post_logout_redirect_uri` that is provided. This URI must be one of those listed in the **Sign-out redirect URIs** section of your application's settings. See [Define the sign-out callback](#define-the-sign-out-callback) for more information on defining this URI in your application settings.

```javascript
<template>
  <div id="home">
    <div v-if="this.$parent.authenticated">
      <button v-on:click="logout()">
      Logout
      </button>
    </div>
  </div>
</template>

<script>

const POST_LOGOUT_REDIRECT_URI = '/'
const ISSUER = 'https://${yourOktaDomain}/oauth2/default'

export default {
  name: 'home',
  methods: {
    async logout () {
      // Read idToken before local session is cleared
      const idToken = await this.$auth.getIdToken()
      // Clear local session
      await this.$auth.logout()
      // Clear remote session
      window.location.href = `${ISSUER}/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${POST_LOGOUT_REDIRECT_URI}`
    },
  }
}
</script>
```
