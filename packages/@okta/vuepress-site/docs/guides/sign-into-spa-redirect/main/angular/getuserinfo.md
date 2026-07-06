The `authState$` subject in `OktaAuthStateService` contains an `idToken` that contains the user profile claims. You can access it to display a welcome message as shown in the `ProfileComponent`.

1. Create a component called **profile** using the CLI command `ng generate component profile`.

2. Update `profile.component.ts` as follows:

   ```ts
   import { Component, inject } from '@angular/core';
   import { OKTA_AUTH } from '@okta/okta-auth-js';

   @Component({
     selector: 'app-profile',
     imports: [],
     template: `
        <table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            @for (claim of claims; track claim.name) {
              <tr>
                <td>{{ claim.name }}</td>
                <td>{{ claim.value }}</td>
              </tr>
            }
          </tbody>
        </table>
     `
   })
   export class ProfileComponent {
     private oktaAuth = inject(OKTA_AUTH);

     get claims() {
       const idToken = this.oktaAuth.authStateManager.getAuthState()?.idToken;
       return Object.entries(idToken?.claims ?? {}).map(([name, value]) => ({ name, value }));
     }
   }
   ```

3. Import the `ProfileComponent` component into `app.routes.ts`:

    ```typescript
    import { ProfileComponent } from './profile/profile.component';
    ```

4. Add the following to the `routes` array:

    ```typescript
    { path: 'profile', component: ProfileComponent }
    ```

5. Add an instance of `<a routerLink="/profile">Profile</a>` into the `app.component.html`, inside the `@if (isAuthenticated$ | async){}`. This displays the text, `Profile`, after you're signed in. Clicking the text displays your name in the view.
