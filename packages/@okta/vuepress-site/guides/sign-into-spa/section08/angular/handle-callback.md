The Angular SDK contains a component that can handle the callback route automatically. The `OktaCallbackComponent` contains logic to parse the response Okta sends back to your application.

```javascript
import { OktaCallbackComponent } from '@okta/okta-angular';

const CALLBACK_PATH = '/implicit/callback';

const appRoutes: Routes = [
  {
    path: CALLBACK_PATH,
    component: OktaCallbackComponent,
  },
  // Other routes...
];
```

