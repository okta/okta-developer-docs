To use this SDK, you will need to include the following dependencies:

For Apache Maven:

``` xml
<dependency>
    <groupId>com.okta.idx.sdk</groupId>
    <artifactId>okta-idx-java-api</artifactId>
    <version>${okta.sdk.version}</version>
</dependency>
<dependency>
    <groupId>com.okta.idx.sdk</groupId>
    <artifactId>okta-idx-java-impl</artifactId>
    <version>${okta.sdk.version}</version>
    <scope>runtime</scope>
</dependency>
```

For Gradle:

```groovy
compile "com.okta.idx.sdk:okta-idx-java-api:${okta.sdk.version}"
runtime "com.okta.idx.sdk:okta-idx-java-impl:${okta.sdk.version}"
```

where `okta.sdk.version` is the latest stable release version listed [on the idx repository](https://github.com/okta/okta-idx-java/#release-status).
