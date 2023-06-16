The `OktaAuthStateService` and `OktaAuth` services are used together to support sign-in and sign-out actions. The `OktaAuthStateService` contains `authState$`, an [RxJS Observable](https://rxjs.dev/guide/observable) that you can use to get the current authenticated state.

The `OktaAuth` service has methods for sign-in and sign-outactions.

1. Add buttons, to support sign-in and sign-out actions, to the component template (`app.component.html`), just inside the top of `<div class="toolbar" role="banner"></div>` so that they are visible. Display either the sign-in or sign-out button based on the current authenticated state.

   ```html
   <ng-container *ngIf="(isAuthenticated$ | async) === false; else signout">
     <button (click)="signIn()"> Sign in </button>
   </ng-container>

   <ng-template #signout>
     <button (click)="signOut()">Sign out</button>
   </ng-template>
   ```

2. Update the component TypeScript file (`app.component.ts`) with the following imports and updated export to get authenticated state and support sign-in and sign-out actions.

   ```ts
   import { Component, Inject, OnInit } from '@angular/core';
   import { Router } from '@angular/router';
   import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
   import { AuthState, OktaAuth } from '@okta/okta-auth-js';
   import { filter, map, Observable } from 'rxjs';

   export class AppComponent implements OnInit {
     title = 'okta-angular-quickstart';
     public isAuthenticated$!: Observable<boolean>;

     constructor(private _router: Router, private _oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }

     public ngOnInit(): void {
       this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
         filter((s: AuthState) => !!s),
         map((s: AuthState) => s.isAuthenticated ?? false)
       );
     }

     public async signIn() : Promise<void> {
       await this._oktaAuth.signInWithRedirect();
     }

     public async signOut(): Promise<void> {
       await this._oktaAuth.signOut();
     }
   }
   ```
