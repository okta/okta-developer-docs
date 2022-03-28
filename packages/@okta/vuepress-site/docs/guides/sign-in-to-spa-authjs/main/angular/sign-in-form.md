Build a sign-in page that captures both the username and password. As an example, from the sample application, see the component files such as `app.component.html` and `app.component.ts`:

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


> **Note:** This guide only reviews the sign-in use case of the sample app.
