The `OktaAuthStateService` and `OktaAuth` services are used together to support sign-in and sign-out actions. The `OktaAuthStateService` contains `authState$`, an [RxJS Observable](https://rxjs.dev/guide/observable) that you can use to get the current authenticated state.

The `OktaAuth` service has methods for sign-in and sign-out actions.

1. Add buttons, to support sign-in and sign-out actions, to the component template (`app.component.html`), just inside the `<main class="main"></main>` so that they’re visible. Display either the sign-in or sign-out button based on the current authenticated state.

   ```html
   @if (isAuthenticated$ | async) {
     <button (click)="signOut()">Sign out</button>
   } @else {
     <button (click)="signIn()"> Sign in </button>
   }
   ```

2. Update the component TypeScript file (`app.component.ts`) with the following imports and updated component definition to get authenticated state and support sign-in and sign-out actions.

   ```ts
   import { AsyncPipe } from '@angular/common';
   import { Component, inject } from '@angular/core';
   import { RouterLink, RouterOutlet } from '@angular/router';
   import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
   import { AuthState } from '@okta/okta-auth-js';
   import { filter, map } from 'rxjs';

   @Component({
      selector: 'app-root',
      imports: [RouterOutlet, AsyncPipe, RouterLink],
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
   })
   export class AppComponent {
     private oktaStateService = inject(OktaAuthStateService);
     private oktaAuth = inject(OKTA_AUTH);

     title = 'okta-angular-quickstart';
     public isAuthenticated$ = this.oktaStateService.authState$.pipe(
        filter((s: AuthState) => !!s),
        map((s: AuthState) => s.isAuthenticated ?? false)
     );

     public async signIn() : Promise<void> {
       await this.oktaAuth.signInWithRedirect();
     }

     public async signOut(): Promise<void> {
       await this.oktaAuth.signOut();
     }
   }
   ```
