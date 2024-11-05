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

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import { useAuth } from '@okta/okta-vue';

const $auth = useAuth();
let posts = ref([]);

onMounted(async () => {
  try {
    const accessToken = $auth.getAccessToken()
      const response = await axios.get(`http://localhost:${serverPort}/api/messages`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

    const response = await axios.get(`http://localhost:{serverPort}/api/messages`)
    posts.value = response.data
  } catch (e) {
    console.error(`Errors! ${e}`)
  }
})
</script>
```
