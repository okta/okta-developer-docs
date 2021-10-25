Components displayed via the `router-view` can access properties of that parent component, including the 'authenticated' prop added.

Here is a `Home` component that checks this property and offers a link to a perform a sign-in if the user isn't already authenticated to this app.

```vue
<template>
  <div id="home">
    <div v-if="!this.$parent.authenticated">
      <button
        v-on:click="login()"
      >
      Login
      </button>
    </div>
  </div>
</template>

<script>

const PATH_TO_PROTECTED_ROUTE = '/private'

export default {
  name: 'home',
  methods: {
    login () {
      this.$auth.signInWithRedirect({ originalUri: PATH_TO_PROTECTED_ROUTE })
    },
  }
}
</script>
```

The `signInWithRedirect()` method lets you specify the path to send the user to after the authentication callback.
