> **Note:** Before implementing your embedded app with the Identity Engine Java SDK, ensure that your app and custom authorization server are configured for Identity Engine. See [Set up your authorization server](/docs/guides/implement-grant-type/interactioncode/main/#set-up-your-authorization-server).

If you are using Apache Maven for your project, include the following dependency:

```xml
<dependency>
    <groupId>com.okta.idx.sdk</groupId>
    <artifactId>okta-idx-java-api</artifactId>
    <version>${okta.idx.sdk.version}</version>
</dependency>
```

If you are using Gradle for your project, include the following:

```shell
compile "com.okta.idx.sdk:okta-idx-java-api:${okta.idx.sdk.version}"
```

See [Release Status](https://github.com/okta/okta-idx-java#release-status) for the latest Identity Engine Java SDK version (`${okta.idx.sdk.version}`).

> **Note:** The order of dependencies doesn't matter. You can add the Identity Engine Java SDK dependency before or after your previous Okta Java Management or Okta Java Authentication SDK dependencies.

Download the [Okta Java Identity Engine SDK](https://github.com/okta/okta-idx-java) repository to your local directory.

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

See import statements from the [sample apps](https://github.com/okta/okta-idx-java/tree/master/samples) for more examples.
