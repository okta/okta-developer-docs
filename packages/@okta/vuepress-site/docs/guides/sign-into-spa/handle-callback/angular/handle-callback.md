The `OktaCallbackComponent` in the Angular SDK contains logic to parse the response Okta sends back to your application. All you need to do is wire it up to the route you defined:

```javascript
import { OktaCallbackComponent } from '@okta/okta-angular';

const CALLBACK_PATH = 'login/callback';

const appRoutes: Routes = [
  {
    path: CALLBACK_PATH,
    component: OktaCallbackComponent,
  },
  // Other routes...
];
```
