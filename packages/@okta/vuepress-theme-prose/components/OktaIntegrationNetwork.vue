<template>
  <div class="page-content">
    <section class="oin">
      <div class="oin--container">
        <div class="oin--leader">
          <h1 class="oin--title">Integrate with Okta</h1>
          <p class="oin--subtitle">
            Publish your application to the <a class="magentaLink" href="https://www.okta.com/integrations">Okta Integration Network (OIN) catalog</a>, enabling millions of Okta users to discover your application and access it using single sign-on (SSO).
          </p>
          <p class="oin--subtitle">
            Are you ready to join the OIN catalog?
          </p>
          <p class="oin--subtitle">
            <a href="/signup" class="Button--red">Create Free Account</a>
          </p>
        </div>
      </div>
      <div class="oin--background-curve">
        <img src="/img/curve-doubleLeft.png" />
      </div>
      <div class="oin-alt-bg">
        <div class="oin--container">
          <div class="oin--integration">
            <div class="oin--integration-header">
              <h1>Integration Guides</h1>
              <p>Use our step-by-step guides to build your integration.</p>
            </div>
            <div class="oin--integration-content">
              <div v-for="guide in $page.frontmatter.guides" class="oin-guide">
                <img :src="guide.icon" />
                <h5>{{guide.name}}</h5>
                <p>{{guide.description}}</p>
                <p>
                  <template v-for="(link, index) in guide.links">
                    <span v-if="index > 0"> | </span>
                    <a class="magentaLink" :href="link.url">{{link.text}}</a>
                  </template>
                </p>
                <p>
                  <a :href="guide.docsUrl" class="Button--redOutline">View Docs</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="oin--background-curve">
        <img src="/img/curve-singleRightLight.png" />
      </div>
      <div class="oin--container">
        <div class="oin--develop">
          <h1>Are you ready to submit your integration for review?</h1>
          <p class="oin--subtitle">
            <a href="/docs/guides/submit-app/overview/" class="Button--red">Get Started</a>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
