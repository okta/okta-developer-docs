`$auth.tokenManager` contains an `idToken` that contains the user profile claims. You can access it to display a welcome message.

1. Create a new file `src/components/Profile.vue`.

2. Give it the following content:

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

3. Go back to `src/router/index.js` and import this new component:

   ```ts
   import ProfileComponent from '@/components/Profile'
   ```

4. Add a new route to the `index.js` `routes` array:

   ```ts
   {
     path: '/profile',
     component: ProfileComponent,
   }
   ```

This component is available at a `/profile` route and displays the user their profile info.
