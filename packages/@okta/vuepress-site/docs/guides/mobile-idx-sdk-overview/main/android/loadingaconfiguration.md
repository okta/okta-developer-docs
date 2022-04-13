<!-- code from IdxClientConfigurationProvider.kt in dynamic-app sample -->

```
package com.okta.idx.android.dynamic.auth

import com.okta.idx.android.dynamic.BuildConfig
import com.okta.idx.kotlin.client.IdxClientConfiguration
import okhttp3.HttpUrl.Companion.toHttpUrl

internal object IdxClientConfigurationProvider {
    fun get(): IdxClientConfiguration {
        return IdxClientConfiguration(
            issuer = BuildConfig.ISSUER.toHttpUrl(),
            clientId = BuildConfig.CLIENT_ID,
            scopes = setOf("openid", "email", "profile", "offline_access"),
            redirectUri = BuildConfig.REDIRECT_URI,
        )
    }
}
```
