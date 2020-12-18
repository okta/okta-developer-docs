Call the [tokenManager.clear](https://github.com/okta/okta-auth-js#tokenmanagerclear) method on [OktaAuthService](https://github.com/okta/okta-angular#oktaauthservice).

```javascript

import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component()
export class LogoutComponent {
  constructor(public oktaAuth: OktaAuthService) {

  }
  logout() {
    this.oktaAuth.tokenManager.clear();
  }
}

```
