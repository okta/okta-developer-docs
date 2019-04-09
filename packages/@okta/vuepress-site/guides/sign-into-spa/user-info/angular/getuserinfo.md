User info ("claims") is available using the `getUser` method on the `OktaAuthService`.

```javascript
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

class MyComponent implements OnInit {

  constructor(public oktaAuth: OktaAuthService) {

  }

  async ngOnInit() {
    // returns an array
    const userClaims = await this.oktaAuth.getUser();

  }
}
```