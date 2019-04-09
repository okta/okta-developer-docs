The current value for the access token is returned by the `getAccessToken()` method on the `OktaAuthService`.
Use this value to add an `Authorization` header to the XHR request.

```javascript
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';

export class MyComponent implements OnInit {

  constructor(public oktaAuth: OktaAuthService, private http: HttpClient) {

  }

  async ngOnInit() {
    const accessToken = await this.oktaAuth.getAccessToken();
    this.http.get(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      }
    }).subscribe((data: any) => {

    }, (err) => {
      console.error(err);
    });
  }
}
```
