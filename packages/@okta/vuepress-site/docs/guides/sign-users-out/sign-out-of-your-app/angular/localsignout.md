Call the `logout` method on [OktaAuthService](https://github.com/okta/okta-angular#oktaauthlogouturi).

```javascript

import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component()
export class LogoutComponent {
  constructor(public oktaAuth: OktaAuthService) {

  }
  logout() {
    this.oktaAuth.logout('/');
  }
}

```
