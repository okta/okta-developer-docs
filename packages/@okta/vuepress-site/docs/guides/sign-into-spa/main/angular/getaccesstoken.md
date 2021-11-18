Get the access token using the `getAccessToken()` method on the `OktaAuth` class. Then, use this value to add an `Authorization` header to outgoing requests:

```javascript
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';

export class MyComponent implements OnInit {

  constructor(public oktaAuth: OktaAuth, private http: HttpClient) {

  }

  ngOnInit() {
    const accessToken = this.oktaAuth.getAccessToken();
    this.http.get(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      }
    }).subscribe({
      next: (data: any) => {
      // Use the data returned by the API
      }, 
      error: (err) => console.error(err)
    });
  }
}
```
