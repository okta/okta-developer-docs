The [OktaAuthService](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-angular#oktaauthservice) is injected in your component's constructor by Angular's dependency injection system. You can use the [oktaAuth.isAuthenticated()](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-angular#oktaauthisauthenticated) method to show/hide the correct button.

```javascript
import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  template: `
    <button *ngIf="!isAuthenticated" (click)="login()"> Login </button>
    <button *ngIf="isAuthenticated" (click)="logout()"> Logout </button>
    <router-outlet></router-outlet>
  `,
})s
export class AppComponent {
  isAuthenticated: boolean;

  constructor(public oktaAuth: OktaAuthService) {
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  login() {
    this.oktaAuth.loginRedirect('/profile');
  }

  logout() {
    this.oktaAuth.logout('/');
  }
}
```
