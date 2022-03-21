Build a sign-in page that captures both the username and password. As an example, from the sample application, see the component files such as `menu.component.ts`:

```typescript
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { fromEvent, map, mergeWith, Subject, takeUntil } from 'rxjs';
import { FLOW_TYPE } from '../okta-auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit, OnDestroy {
  @Input() public isAuthenticated = false;
  @Output() public startFlow: EventEmitter<FLOW_TYPE> = new EventEmitter<FLOW_TYPE>();
  @Output() public logout: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('login') public loginButton!: ElementRef;
  @ViewChild('recover') public recoverPasswordButton!: ElementRef;
  @ViewChild('registration') public registrationButton!: ElementRef;
  @ViewChild('idp') public idpButton!: ElementRef;

  private destroySub$: Subject<void> = new Subject<void>();

  constructor() { }

  public ngAfterViewInit(): void {
    fromEvent(this.loginButton.nativeElement, 'click').pipe(
      map( _ => 'authenticate' as FLOW_TYPE),
      mergeWith(
        fromEvent(this.recoverPasswordButton.nativeElement, 'click').pipe(map( _ => 'recoverPassword' as FLOW_TYPE)),
        fromEvent(this.registrationButton.nativeElement, 'click').pipe(map( _ => 'register' as FLOW_TYPE)),
        fromEvent(this.idpButton.nativeElement, 'click').pipe(map( _ => 'idp' as FLOW_TYPE))
      )
    ).pipe(
      takeUntil(this.destroySub$)
    ).subscribe(flow => this.startFlow.emit(flow));
  }

  public ngOnDestroy(): void {
    this.destroySub$.next();
    this.destroySub$.complete();
  }

  public onLogout(): void {
    this.logout.emit();
  }
}
```

> **Note:** This guide only reviews the sign-in use case of the sample app.
