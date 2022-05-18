After you verify and upgrade your application, the next step is to add the Identity Engine IDX SDK to your application.

If you are using Gradle for your project, include the following:

```shell
implementation "com.okta.idx.sdk:okta-idx-java-api:${okta.idx.sdk.version}"
```

See [Release Status](https://github.com/okta/okta-idx-java#release-status) for the latest Identity Engine Java SDK version (`${okta.idx.sdk.version}`).

> **Note:** The order of dependencies doesn’t matter. You can add the Identity Engine Java SDK dependency before or after your previous Okta Java Authentication SDK dependencies.

Additionally, import any Identity Engine client, utility, and helper classes that you may need in your source code. For example:

```java
import com.okta.commons.lang.Strings;
import com.okta.idx.sdk.api.client.Authenticator;
import com.okta.idx.sdk.api.client.IDXAuthenticationWrapper;
import com.okta.idx.sdk.api.client.ProceedContext;
import com.okta.idx.sdk.api.model.FormValue;
import com.okta.idx.sdk.api.response.AuthenticationResponse;
import com.okta.idx.sdk.api.response.TokenResponse;
```

See the [Identity Engine Android SDK guide](https://github.com/okta/okta-idx-android#usage-guide).
