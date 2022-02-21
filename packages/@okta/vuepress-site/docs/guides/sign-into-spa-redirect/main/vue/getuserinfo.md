`$auth.tokenManager` contains an `idToken`, which contains the user profile claims. You can access it to display a welcome message as shown in the `Profile.vue`:

```ts
<template>
  <table>
    <thead>
      <tr>
        <th>Claim</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(claim, index) in claims"
        :key="index"
      >
        <td>{{claim.claim}}</td>
        <td :id="'claim-' + claim.claim">{{claim.value}}</td>
      </tr>
    </tbody>
  </table>
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
    const idToken = await this.$auth.tokenManager.get('idToken')
    this.claims = await Object.entries(idToken.claims).map(entry => ({ claim: entry[0], value: entry[1] }))
  }
}
</script>
```

To get user information beyond the default profile claims, you can call the `userinfo` endpoint or call the `getUser()` method in `OktaAuth`.