The `authState$` subject in `OktaAuthStateService` contains an `idToken` that contains the user profile claims. You can access it to display a welcome message as shown in the `ProfileComponent`.

1. Create a new component called **profile** using the CLI command `ng generate component profile`.

2. Update `profile.component.ts` as follows:

```ts
import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { filter, map, Observable } from 'rxjs';
import { AuthState } from '@okta/okta-auth-js';

@Component({
  selector: 'app-profile',
  template: `
  <div class="profile-card">
    <div class="shield"></div>
    <p *ngIf="name$ | async as name">
        Hello {{name}}!
    </p>
  </div>
  `,
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  public name$!: Observable<string>;
  constructor(private _oktaAuthStateService: OktaAuthStateService) { }

  public ngOnInit(): void {
    this.name$ = this._oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.name ?? '')
    );

  }
}
```

3. Add an instance of the `<app-profile></app-profile>` component into `app.component.html`, again inside the toolbar. This displays a message with your name after you are signed in.
