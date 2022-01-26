After successfully authenticating with Okta, the app obtains the user's `id_token`, which contains basic claims for the user's identity.

In this `Profile` component example, basic information from the ID token can be retrieved by using the [`$auth`](https://github.com/okta/okta-vue#auth) instance from the Okta Auth SDK and calling the [`$auth.getUser()`](https://github.com/okta/okta-auth-js#getuser) function.

```html
<template>
  <div class="profile">
    <h1 class="ui header">
      <i aria-hidden="true" class="drivers license outline icon">
      </i>
      My User Profile (ID Token Claims)
    </h1>
    <p>
      This route is protected with the <code>onAuthRequired</code>, navigation guard which will ensure that this page cannot be accessed until you have authenticated.
    </p>
    <table class="ui table">
      <thead>
        <tr>
          <th>Claim</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(claim, index) in claims" :key="index">
          <td>{{claim.claim}}</td>
          <td :id="'claim-' + claim.claim">{{claim.value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      claims: []
    }
  },
  async created () {
    this.claims = await Object.entries(await this.$auth.getUser()).map(entry => ({ claim: entry[0], value: entry[1] }))
  }
}
</script>
```

You can extend the set of claims by modifying the Sign-In Widget [scopes](/docs/reference/api/oidc/#scopes) settings to retrieve custom information about the user. This includes `locale`, `address`, `groups`, and [more](/docs/reference/api/oidc/#scope-values).
