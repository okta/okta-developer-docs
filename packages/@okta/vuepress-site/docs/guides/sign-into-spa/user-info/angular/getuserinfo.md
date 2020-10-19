Your code can get the user's profile using the [getUser](https://github.com/okta/okta-angular#oktaauthgetuser) method on the [OktaAuthService](https://github.com/okta/okta-angular#oktaauthservice).

```javascript
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  template: 'Welcome back, {{ userName }}'
})
export class ProfileComponent implements OnInit {
  userName: string;

  constructor(public oktaAuth: OktaAuthService) {

  }

  async ngOnInit() {
    // returns an array of claims
    const userClaims = await this.oktaAuth.getUser();

    // user name is exposed directly as property
    this.userName = userClaims.name;

  }
}
```
