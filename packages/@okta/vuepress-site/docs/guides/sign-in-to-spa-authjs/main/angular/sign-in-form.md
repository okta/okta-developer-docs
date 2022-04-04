Build a sign-in page that captures both the username and password. As an example, see the app component files such as `app.component.html` and `app.component.ts` that generate a dynamic form in the sample application.

From the `app.component.html` file:

```HTML
<header>
  <h1>Angular OIE Example App</h1>
</header>

<main>
  <app-menu [isAuthenticated]="(isAuthenticated$ | async) ?? false" (startFlow)="onFlow($event)" (logout)="onLogout()"></app-menu>
  <ng-container *ngIf="idxMessages$ | async as messages">
    <div>
      <p *ngFor="let message of messages">{{message.message}}</p>
    </div>
  </ng-container>
  <ng-container *ngIf="nextStep$ | async as nextStep">
    <app-okta-dynamic-form *ngIf="!(isAuthenticated$ | async)" [nextStep]="nextStep" (userInput)="onInput($event)"></app-okta-dynamic-form>
  </ng-container>
  <ng-container *ngIf="isAuthenticated$ | async">
    <div>
      <h3>ID Token</h3>
      <pre>{{idToken$ | async | json}}</pre>
    </div>
  </ng-container>
</main>
```

From the `app.component.ts` file:

```TypeScript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FormTransformerService]
})
export class AppComponent implements OnInit {

  public nextStep$!: Observable<NextStep|undefined>;
  public authState$ = this.oktaAuthService.authState$.pipe(shareReplay());
  public isAuthenticated$ = this.authState$.pipe(map(authState => authState?.isAuthenticated));
  public idToken$ = this.authState$.pipe(
    filter(authState => !!authState.idToken),
    map(authState => authState?.idToken)
  );

  public idxMessages$: Observable<IdxMessage[]> = this.oktaAuthService.idxTransactionMessages$;
  private flowSub$: Subject<FLOW_TYPE> = new Subject<FLOW_TYPE>();
  private inputSub$: Subject<UserAction> = new Subject<UserAction>();

  constructor(private oktaAuthService: OktaAuthService) { }

  public ngOnInit(): void {
    this.nextStep$ = merge(
      this.oktaAuthService.handleRedirects(),
      this.flowSub$.pipe(
        mergeMap((flow: FLOW_TYPE) => this.oktaAuthService.startIdxFlow(flow))
      ),
      this.inputSub$.pipe(
        mergeMap(input => iif(
              () => input.action === 'cancel',
              this.oktaAuthService.cancelIdxFlow(),
              this.oktaAuthService.proceedIdxFlow(input.values as {})
            )
        ),
      )
    ).pipe(
      catchError( error => {console.log(error); return of(undefined)}),
    );
  }
```

The dynamic form works with the [Interaction code](/docs/concepts/interaction-code/) flow to convert the `NextStep` response into appropriate form fields. Review the and the `dynamic-form.component` and `form-transformer.service.ts` files for code details. Se also [NextStep](https://github.com/okta/okta-auth-js/blob/master/docs/idx.md#nextstep).

> **Note:** This guide only reviews the sign-in use case of the sample app.
