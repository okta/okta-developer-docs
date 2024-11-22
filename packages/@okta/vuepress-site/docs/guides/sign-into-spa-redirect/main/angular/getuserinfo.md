The `authState$` subject in `OktaAuthStateService` contains an `idToken` that contains the user profile claims. You can access it to display a welcome message as shown in the `ProfileComponent`.

1. Create a component called **profile** using the CLI command `ng generate component profile`.

2. Update `profile.component.ts` as follows:

   ```ts
   import { Component, inject } from '@angular/core';
   import { OktaAuthStateService } from '@okta/okta-angular';
   import { filter, map } from 'rxjs';
   import { AuthState } from '@okta/okta-auth-js';
   import { AsyncPipe } from '@angular/common';

   @Component({
     selector: 'app-profile',
     imports: [AsyncPipe],
     template: `
        <div class="profile-card">
           <div class="shield"></div>
           <p>You're logged in!
           @if(name$ | async; as name) {
              <span>Welcome, {{name}} </span>
           }
          </p>
       </div>
     `,
     styleUrls: ['./profile.component.css']
   })
   export class ProfileComponent {
     private oktaAuthStateService = inject(OktaAuthStateService);

     public name$ = this.oktaAuthStateService.authState$.pipe(
       filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
       map((authState: AuthState) => authState.idToken?.claims.name ?? '')
     );
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

5. Add an instance of `<a routerLink="/profile">Profile</a>` into the `app.component.html`, again inside the main node. This displays the text, `Profile`, after you're signed in. Clicking the text displays your name in the view.
