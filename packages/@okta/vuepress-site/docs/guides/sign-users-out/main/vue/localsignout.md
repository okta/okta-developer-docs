Components that appear through the `router-view` can access properties of that parent component, including the 'authenticated' prop added earlier.

Here’s a `Home` component that checks this property and offers a link to sign out if the user is authenticated.

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

const PATH_TO_HOME_ROUTE = '/'

export default {
  name: 'home',
  methods: {
    async logout () {
      await this.$auth.logout()
      // Navigate back to home
      this.$router.push({ path: PATH_TO_HOME_ROUTE })
    },
  }
}
</script>
```
