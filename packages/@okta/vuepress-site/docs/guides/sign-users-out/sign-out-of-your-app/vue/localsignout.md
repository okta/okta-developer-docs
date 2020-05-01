Components that appear through the `router-view` can access properties of that parent component, including the 'authenticated' prop that we added.

Here is a `Home` component that checks this property and offers a link to logout if the user is currently authenticated.

```
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
