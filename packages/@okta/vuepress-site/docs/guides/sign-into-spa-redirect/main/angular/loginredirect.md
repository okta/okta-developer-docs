The `OktaAuthStateService` and `OktaAuth` services are used together to support sign-in and sign-out. The `OktaAuthStateService` contains `authState$`, an [RxJS Observable](https://rxjs.dev/guide/observable) that you can use to get the current authenticated state.

The `OktaAuth` service has methods for sign-in and sign-out.

Add buttons to support sign-in and sign-out to the component template. Display either the sign-in or sign-out button based on the current authenticated state.

```html
<ng-container *ngIf="(isAuthenticated$ | async) === false; else signout">
  <button (click)="signIn()"> Sign in </button>
</ng-container>

<ng-template #signout>
  <button (click)="signOut()">Sign out</button>
</ng-template>
```

Update the component TypeScript file to get authenticated state and support sign-in and sign-out.

```ts
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';

export class class AppComponent implements OnInit {
  public isAuthenticated$!: Observable<boolean>;

  constructor(private _oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) { }

    public ngOnInit(): void {
      this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
        filter((s: AuthState) => !!s),
        map((s: AuthState) => s.isAuthenticated ?? false)
      );
    }

    public async login() : Promise<void> {
      await this._oktaAuth.signInWithRedirect();
    }

  public async logout(): Promise<void> {
    await this._oktaAuth.signOut();
  }
}
```