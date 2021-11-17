The [OktaAuthStateService](https://github.com/okta/okta-angular#oktaauthstateservice) and [OktaAuth](https://github.com/okta/okta-auth-js#okta-auth-javascript-sdk) service are injected in your component's constructor by Angular's dependency injection system. You can subscribe to the [authStateService.authState$](https://github.com/okta/okta-auth-js#authstatemanager) to show/hide the correct button.

```javascript
import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  template: `
    <button *ngIf="!(authStateService.authState$ | async)?.isAuthenticated" (click)="login()"> Login </button>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {

  constructor(public authStateService: OktaAuthStateService, public oktaAuth: OktaAuth) { }

  async login() {
    await this.oktaAuth.signInWithRedirect({
      originalUri: '/configured-redirect-path'
    });    
  }
}
```

The `signInWithRedirect()` method lets you specify the path you'd like the user to be navigated to after authenticating through the `originalUri` field.
