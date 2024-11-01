`$auth.tokenManager` contains an `idToken` that contains the user profile claims. You can access it to display a welcome message.

1. Create a new file `src/views/ProfileView.vue`.

2. Give it the following content:

   ```html
   <script setup>
     import Profile from '../components/Profile.vue'
   </script>

   <template>
     <main>
       <Profile />
     </main>
   </template>
   ```

3. Create a new file `src/components/Profile.vue`.

2. Give it the following content:

   ```ts
   <script>
   import { ref, onMounted } from 'vue'
   import { useAuth } from '@okta/okta-vue';

   const $auth = useAuth();
   let claims = ref([]);

   onMounted(async () => {
      const idToken = await $auth.tokenManager.get('idToken')
      claims.value = Object.entries(idToken.claims).map(entry => ({ claim: entry[0], value: entry[1] }))
   })
   </script>

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
   ```

3. Go back to `src/router/index.js` and import this new component:

   ```ts
   import ProfileView from '../views/ProfileView.vue'
   ```

4. Add a new route to the `index.js` `routes` array:

   ```ts
   {
     path: '/profile',
     component: ProfileView,
   }
   ```

This component is available at a `/profile` route and displays the user their profile info.
