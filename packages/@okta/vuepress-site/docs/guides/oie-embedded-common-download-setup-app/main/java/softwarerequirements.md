* [JDK 8](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html) or later
* [Apache Maven](https://maven.apache.org/download.cgi) 3.6.x or later

To use the Java SDK, include the following dependency for Apache Maven:

``` xml
<dependency>
    <groupId>com.okta.idx.sdk</groupId>
    <artifactId>okta-idx-java-api</artifactId>
    <version>${okta.sdk.version}</version>
</dependency>
```

where `${okta.sdk.version}` is the latest release version listed [here](https://github.com/okta/okta-idx-java#release-status).
