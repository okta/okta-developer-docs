The [OktaAuthService](https://github.com/okta/okta-angular#oktaauthservice) is injected in your component's constructor by Angular's dependency injection system. You can use the [oktaAuth.isAuthenticated()](https://github.com/okta/okta-angular#oktaauthisauthenticated) method to show/hide the correct button.

```javascript
import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  template: `
    <button *ngIf="!isAuthenticated" (click)="login()"> Login </button>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  isAuthenticated: boolean;

  constructor(public oktaAuth: OktaAuthService) {
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  login() {
    this.oktaAuth.loginRedirect('/profile');
  }
}
```

The `loginRedirect()` method lets you specify the path you'd like the user to be navigated to after authenticating.
