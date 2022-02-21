The `authState$` subject in `OktaAuthStateService` contains an `idToken` which contains the user profile claims. You can access it to display a welcome message as shown in the `ProfileComponent`.

```ts
import { OktaAuthStateService } from '@okta/okta-angular';

@Component({
  selector: 'app-profile',
  template: `
    <p *ngIf="name$ | async as name">
      Welcome, {{name}}
    </p>
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

To get user information beyond the default profile claims, you can call the userinfo endpoint or call the `getUser()` method in `OktaAuth`.