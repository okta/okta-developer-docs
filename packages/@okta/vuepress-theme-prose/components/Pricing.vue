<template>
  <div class="page-content">
    <section class="pricing">
      <div class="pricing--container">
        <div class="pricing--leader">
          <h1 class="pricing--title">Developer Friendly Pricing</h1>
          <p class="pricing--subtitle">
            Whether you're building a new application or scaling to millions of
            users, our plans have you covered.
          </p>
        </div>
      </div>
      <div class="pricing--container">
        <div class="pricing--costs">
          <div class="pricing-section pricing-card-intro">
            <div class="pricing-card">
              <div class="pricing-card-top">
                <h3>Starter</h3>
                <p class="pricing-card-amount">
                  $0
                </p>
                <p class="pricing-card-subtitle">
                  Get up and running fast, no credit card required
                </p>
                <SmartLink
                  :item="{ link: $page.frontmatter.links.signup }"
                  classes="Button--red"
                >
                  Sign Up Free
                </SmartLink>
              </div>
              <div class="pricing-card-bottom">
                <ul>
                  <li>Up to 15,000 monthly active users</li>
                  <li>Authentication, authorization, user management</li>
                </ul>
              </div>
            </div>
            <div class="pricing-card">
              <div class="pricing-card-top">
                <h3>Advanced</h3>
                <p class="pricing-card-amount">
                  $1000 /mo
                </p>
                <p class="pricing-card-subtitle">
                  Flexible plan that grows with you. More monthly active users, better support and higher rate limits
                </p>
                <SmartLink
                  :item="{ link: $page.frontmatter.links.signup }"
                  classes="Button--red"
                >
                  Try For Free
                </SmartLink>
              </div>
              <div class="pricing-card-bottom">
                <p>
                  All starter plan, plus
                </p>
                <ul>
                  <li>Up to 15,000 monthly active users</li>
                  <li>Authentication, authorization, user management</li>
                </ul>
              </div>
            </div>
            <div class="pricing-card">
              <div class="pricing-card-top">
                <h3>Enterprise</h3>
                <p class="pricing-card-amount">
                  Custom
                </p>
                <p class="pricing-card-subtitle">
                  Okta's most advanced offering for production deployments
                </p>
                <SmartLink
                  :item="{ link: $page.frontmatter.links.signup }"
                  classes="Button--red"
                >
                  Contact Us
                </SmartLink>
              </div>
              <div class="pricing-card-bottom">
                <p>
                  All advanced plan, plus
                </p>
                <ul>
                  <li>Up to 15,000 monthly active users</li>
                  <li>Authentication, authorization, user management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pricing--container">
        <div class="pricing--editions">
          <div class="pricing-section">
            <div
              class="pricing-collapsible-item"
              v-bind:class="{ 'is-active': collapsibleShownStates.compareTable }"
            >
              <button
                class="pricing-collapsible-item-title"
                v-on:click="toggleCollapsibleShown('compareTable')"
              >
                Compare plans
              </button>
              <div class="pricing-collapsible-item-content pricing-card-table">
                <div class="pricing-card-row">
                  <div class="pricing-card-column">
                  </div>
                  <div class="pricing-card-column pricing-card-column-header alt">
                    Starter
                  </div>
                  <div class="pricing-card-column pricing-card-column-header">
                    Advanced
                  </div>
                  <div class="pricing-card-column pricing-card-column-header">
                    Enterprise
                  </div>
                </div>
                <div class="pricing-card-row">
                  <div class="pricing-card-column pricing-card-row-header">
                    Price
                  </div>
                  <div class="pricing-card-column alt">
                    $0
                  </div>
                  <div class="pricing-card-column">
                    $400/mo or $1000/mo
                  </div>
                  <div class="pricing-card-column">
                    Custom
                  </div>
                </div>
                <div class="pricing-card-row pricing-card-section-header">
                  <div class="pricing-card-column pricing-card-row-header">
                    Usage
                  </div>
                  <div class="pricing-card-column alt">
                  </div>
                  <div class="pricing-card-column">
                  </div>
                  <div class="pricing-card-column">
                  </div>
                </div>
                <div class="pricing-card-row">
                  <div class="pricing-card-column pricing-card-row-header">
                    OIN Integrations
                    <small>SSO/LCM</small>
                  </div>
                  <div class="pricing-card-column alt">
                    15k
                  </div>
                  <div class="pricing-card-column">
                    20k or 50k
                  </div>
                  <div class="pricing-card-column">
                    Unlimited
                  </div>
                </div>
                <div class="pricing-card-row pricing-card-section-header">
                  <div class="pricing-card-column pricing-card-row-header">
                    Feature
                  </div>
                  <div class="pricing-card-column alt">
                  </div>
                  <div class="pricing-card-column">
                  </div>
                  <div class="pricing-card-column">
                  </div>
                </div>
                <div class="pricing-card-row">
                  <div class="pricing-card-column pricing-card-row-header">
                    Authentication
                  </div>
                  <div class="pricing-card-column alt">
                    <img
                      src="/img/icons/icon--check.svg"
                      class="pricing-card-check"
                    />
                  </div>
                  <div class="pricing-card-column">
                    <img
                      src="/img/icons/icon--check.svg"
                      class="pricing-card-check"
                    />
                  </div>
                  <div class="pricing-card-column">
                    <img
                      src="/img/icons/icon--check.svg"
                      class="pricing-card-check"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- todo: delete //-->
            <div class="pricing-card pricing-card-table" style="display:none">
              <div class="pricing-card-row pricing-card-header">
                <div class="pricing-card-column desktop">
                  <h3 class="pricing-card-table-name">Editions</h3>
                </div>
                <template
                  v-for="(edition, index) in $page.frontmatter.editions"
                >
                  <div class="pricing-card-column" v-bind:key="edition.name">
                    <div class="pricing-card-column-header">
                      <h4>{{ edition.name }}</h4>
                        <p>{{ edition.subheading }}</p>
                        <SmartLink
                          :item="{
                            link: $page.frontmatter.links.contactSales,
                          }"
                          classes="Button--whiteOutline"
                        >
                          Contact Us
                        </SmartLink>
                    </div>
                    <template
                      v-for="(details, feature) in $page.frontmatter.features"
                    >
                      <div
                        class="pricing-card-row mobile"
                        v-bind:key="details.name"
                      >
                        <div class="pricing-card-column">
                          {{ details.name }}
                          {{ edition[feature].additionalNote }}
                          <ul v-if="details.bullets">
                            <li
                              v-for="(bullet, bulletIndex) in details.bullets"
                              v-bind:key="bulletIndex"
                            >
                              {{ bullet }}
                            </li>
                          </ul>
                        </div>
                        <div
                          class="pricing-card-column"
                          v-if="typeof edition[feature] === 'object'"
                        >
                          <img
                            src="/img/icons/icon--check.svg"
                            v-if="edition[feature].enabled"
                            class="pricing-card-check"
                          />
                        </div>
                        <div class="pricing-card-column" v-else>
                          <img
                            src="/img/icons/icon--check.svg"
                            v-if="edition[feature]"
                            class="pricing-card-check"
                          />
                        </div>
                      </div>
                    </template>
                  </div>
                </template>
              </div>
              <template
                v-for="(details, feature) in $page.frontmatter.features"
              >
                <div
                  class="pricing-card-row desktop"
                  v-bind:key="details.name"
                >
                  <div class="pricing-card-column">
                    {{ details.name }}
                    <ul v-if="details.bullets">
                      <li
                        v-for="(bullet, bulletIndex) in details.bullets"
                        v-bind:key="bulletIndex"
                      >
                        {{ bullet }}
                      </li>
                    </ul>
                  </div>
                  <template v-for="edition in $page.frontmatter.editions">
                    <div
                      class="pricing-card-column"
                      v-if="typeof edition[feature] === 'object'"
                      v-bind:key="edition.name"
                    >
                      <div>
                        <img
                          class="check-icon"
                          src="/img/icons/icon--check.svg"
                          v-if="edition[feature].enabled"
                        />
                        <span class="additional-note">{{
                          edition[feature].additionalNote
                        }}</span>
                      </div>
                    </div>
                    <div
                      class="pricing-card-column"
                      v-else
                      v-bind:key="edition.name"
                    >
                      <img
                        src="/img/icons/icon--check.svg"
                        v-if="edition[feature]"
                      />
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="pricing--container">
        <div class="pricing--faq">
          <h2>FAQ</h2>
          <template v-for="(item, index) in $page.frontmatter.faqs">
            <div
              class="pricing-collapsible-item"
              v-bind:class="{ 'is-active': collapsibleShownStates['faq' + index] }"
              v-bind:key="index"
            >
              <button
                class="pricing-collapsible-item-title"
                v-on:click="toggleCollapsibleShown('faq' + index)"
              >
                {{ item.title }}
              </button>
              <div class="pricing-collapsible-item-content">
                <div class="pricing-faq-content" v-html="item.content"></div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="pricing--container">
        <div class="pricing--questions">
          <h2>More questions?</h2>
          <p>
            We'd love to hear them. A real, technical human will get back to you
            shortly.
          </p>
          <SmartLink
            :item="{ link: $page.frontmatter.links.emailSupport }"
            classes="Button--red"
          >
            Email Support
          </SmartLink>
        </div>
      </div>
      <div class="pricing--background-curve">
        <!-- new image / svg to come //-->
      </div>
      <div class="pricing--footer">
        <CompanyLogos withHeading />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {
    CompanyLogos: () => import("../components/CompanyLogos"),
    SmartLink: () => import("../components/SmartLink"),
  },
  data: () => ({
    collapsibleShownStates: {
      compareTable: false,
      faq0: false,
      faq1: false,
      faq2: false,
    },
    mauPrice: "$0",
  }),
  methods: {
    toggleCollapsibleShown(itemName) {
      this.$set(this.collapsibleShownStates, itemName, !this.collapsibleShownStates[itemName]);
    },
  },
};
</script>
