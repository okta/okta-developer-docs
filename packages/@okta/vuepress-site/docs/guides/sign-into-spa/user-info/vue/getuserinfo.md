Your code can get the user's profile using the [getUser()](https://github.com/okta/okta-vue#authgetuser) method on the [Auth](https://github.com/okta/okta-vue#auth) object. This object is made available in your components as `this.$auth` after you've called `Vue.use(Auth, ...)` in your application setup.

```vue
<template>
  <div id="home">
    <div v-if="this.$parent.authenticated">
      <p>Welcome back, {{claims.name}}!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data: function () {
    return {
      claims: '',
    }
  },
  created () { this.setup() },
  methods: {
    async setup () {
      this.claims = await this.$auth.getUser()
    },
    async isAuthenticated () {
      this.authenticated = await this.$auth.isAuthenticated()
    },
  }
}
</script>
```

