Get the access token using the `getAccessToken()` method on the `OktaAuthService`. Then, use this value to add an `Authorization` header to outgoing requests:

```javascript
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';

export class MyComponent implements OnInit {

  constructor(public oktaAuth: OktaAuthService, private http: HttpClient) {

  }

  async ngOnInit() {
    const accessToken = this.oktaAuth.getAccessToken();
    this.http.get(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      }
    }).subscribe((data: any) => {
      // Use the data returned by the API

    }, (err) => {
      console.error(err);
    });
  }
}
```
