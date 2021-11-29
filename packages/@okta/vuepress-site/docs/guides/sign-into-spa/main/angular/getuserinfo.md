Your code can get the user's profile using the [getUser](https://github.com/okta/okta-auth-js#getuser) method on the [OktaAuth](https://github.com/okta/okta-auth-js#okta-auth-javascript-sdk) class.

```javascript
import { Component, OnInit } from '@angular/core';
import { OktaAuth } from '@okta/okta-angular';

@Component({
  template: 'Welcome back, {{ userName }}'
})
export class ProfileComponent implements OnInit {
  userName: string | undefined;

  constructor(public oktaAuth: OktaAuth) {

  }

  async ngOnInit() {
    // returns an object with user's claims
    const userClaims = await this.oktaAuth.getUser();

    // user name is exposed directly as property
    this.userName = userClaims.name;

  }
}
```
