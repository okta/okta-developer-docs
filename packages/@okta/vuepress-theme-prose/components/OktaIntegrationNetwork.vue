<template>
  <div class="page-content">
    <section class="oin">
      <div class="oin--container">
        <div class="oin--leader">
          <h1 class="oin--title">Integrate with Okta</h1>
          <p class="oin--subtitle">
            Publish your application to the
            <SmartLink
              :item="{ link: 'https://www.okta.com/integrations' }"
              classes="magentaLink"
            >
              Okta Integration Network (OIN) catalog</SmartLink
            >, enabling millions of Okta users to discover your application and
            access it using single sign-on (SSO).
          </p>
          <p class="oin--subtitle">
            Are you ready to join the OIN catalog?
          </p>
          <p class="oin--subtitle">
            <SmartLink :item="{ link: '/signup/' }" classes="Button--red">
              Create Free Account
            </SmartLink>
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
              <div
                v-for="(guide, index) in $page.frontmatter.guides"
                v-bind:key="index"
                class="oin-guide"
              >
                <img :src="guide.icon" />
                <h5>{{ guide.name }}</h5>
                <p>{{ guide.description }}</p>
                <p>
                  <template v-for="(link, index) in guide.links">
                    <span v-if="index > 0" v-bind:key="'a' + index"> | </span>
                    <SmartLink
                      v-bind:key="'b' + index"
                      :item="{
                        link: link.url,
                        text: link.text,
                      }"
                      classes="magentaLink"
                    />
                  </template>
                </p>
                <p>
                  <SmartLink
                    :item="{ link: guide.docsUrl }"
                    classes="Button--redOutline"
                  >
                    View Docs
                  </SmartLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="oin--background-curve">
        <img src="/img/curve-singleRightDark.png" />
      </div>
      <div class="oin--container">
        <div class="oin--develop">
          <div class="oin--develop-header">
            <h1>Are you ready to submit your integration for review?</h1>
            <p class="oin--subtitle">
              <SmartLink
                :item="{ link: '/docs/guides/submit-app/overview/' }"
                classes="Button--red"
              >
                Get Started
              </SmartLink>
            </p>
          </div>
          <div class="oin--develop-content">
            <h2>Develop your app for the Okta Integration Network</h2>
            <div class="oin--develop-tiles">
              <div
                v-for="(step, index) in $page.frontmatter.developSteps"
                v-bind:key="index"
                class="tile"
              >
                <img :src="step.icon" />
                <h3>{{ step.name }}</h3>
                <p>{{ step.description }}</p>
              </div>
              <div class="tile empty"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {
    SmartLink: () => import("../components/SmartLink"),
  },
};
</script>
