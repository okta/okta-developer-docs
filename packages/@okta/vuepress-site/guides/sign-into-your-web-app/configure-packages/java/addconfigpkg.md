You can create a new Spring Boot project by visiting the [Spring Initializr](https://start.spring.io) and selecting the dependencies **Web**, **Security**, and **Okta**, then clicking the **Generate Project** button to download a zip file.

You can also use the command line:

```bash

curl https://start.spring.io/starter.tgz  \
  -d groupId=com.example \
  -d artifactId=demo \
  -d dependencies=web,security,okta \
  -d language=java \
  -d type=maven-project \
  -d baseDir=demo \
| tar -xzvf -
```
