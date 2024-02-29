Let's say that you have an API that provides messages for a user. You could create a component that gets the access token and uses it to make an authenticated request to your server.

Here is what the Vue component could look like for this hypothetical example using [Axios](https://github.com/axios/axios):

```js
<template>
  <ul v-if="posts && posts.length">
    <li v-for="post in posts" :key='post.title'>
      <p><strong>{{post.title}}</strong></p>
      <p>{{post.body}}</p>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      posts: []
    }
  },
  async created () {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.$auth.getAccessToken()}`
    try {
      const response = await axios.get(`http://localhost:{serverPort}/api/messages`)
      this.posts = response.data
    } catch (e) {
      console.error(`Errors! ${e}`)
    }
  }
}
</script>
```
