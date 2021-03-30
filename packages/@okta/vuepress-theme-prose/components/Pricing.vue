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
          <div class="pricing-section">
            <div class="pricing-card">
              <div class="pricing-card-top">
                <h3>Starter</h3>
                <div class="pricing-card-mau-lozenge single">
                  <button class="lozenge active">
                    15k MAU
                  </button>
                </div>
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
                  <li>Customizable sign-in widget and domain</li>
                  <li>Adaptive MFA</li>
                  <li>Threat detection with ThreatInsight</li>
                  <li>B2B integration </li>
                  <li>99.99% availability</li>
                  <li>Community support</li>
                </ul>
              </div>
            </div>
            <div class="pricing-card">
              <div class="pricing-card-top">
                <h3>Advanced</h3>
                <div class="pricing-card-mau-lozenge multiple">
                  <button
                    class="lozenge"
                    :class="{ active: selectedLozengeIndex === 0 }"
                    @click="selectLozenge(0)"
                  >
                    20k MAU
                  </button>
                  <button
                    class="lozenge"
                    :class="{ active: selectedLozengeIndex === 1 }"
                    @click="selectLozenge(1)"
                  >
                    50k MAU
                  </button>
                </div>
                <p class="pricing-card-amount">
                  <template v-if="selectedLozengeIndex === 0">
                    $400 /mo
                  </template>
                  <template v-else>
                    $1000 /mo
                  </template>
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
                <template v-if="selectedLozengeIndex === 0">
                  <p>
                    All starter plan, plus
                  </p>
                  <ul>
                    <li>Up to 20,000 monthly active users</li>
                    <li>Higher rate limits</li>
                    <li>Unlimited OIDC applications</li>
                    <li>Up to 5 SAML applications</li>
                    <li>Email support</li>
                  </ul>
                </template>
                <template v-else>
                  <p>
                    All starter plan, plus
                  </p>
                  <ul>
                    <li>Up to 50,000 monthly active users</li>
                    <li>Higher rate limits</li>
                    <li>Unlimited OIDC applications</li>
                    <li>Up to 5 SAML applications</li>
                    <li>Email support</li>
                  </ul>
                </template>
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
                  <li>Unlimited monthly active users</li>
                  <li>Unlimited custom apps</li>
                  <li>Service level assurance credits</li>
                  <li>24/7 support</li>
                  <li>Customer success options</li>
                  <li>Enterprise plan only add ons</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pricing--container">
        <div class="pricing--editions">

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

              <template v-for="(section, sectionKey) in $page.frontmatter.tableHeadings">
                <div class="pricing-card-row pricing-card-section-header" v-if="section.name">
                  <div class="pricing-card-column pricing-card-row-header">
                    {{ section.name }}
                  </div>
                  <div class="pricing-card-column alt">
                  </div>
                  <div class="pricing-card-column">
                  </div>
                  <div class="pricing-card-column">
                  </div>
                </div>
                <template v-for="(heading, headingKey) in section.headings">
                  <div class="pricing-card-row">
                    <div class="pricing-card-column pricing-card-row-header">
                      {{ heading.name }}
                      <small v-if="heading.subName">
                        {{ heading.subName }}
                      </small>
                    </div>
                    <div
                      v-for="(plan, planKey) in $page.frontmatter.tableData"
                      class="pricing-card-column"
                      :class="{ alt: planKey === 'starter' }"
                    >
                      <span v-if="typeof plan[sectionKey][headingKey] === 'boolean'">
                        <img
                          src="/img/icons/icon--check.svg"
                          class="pricing-card-check"
                          v-if="plan[sectionKey][headingKey]"
                        />
                      </span>
                      <span v-else>
                        {{ plan[sectionKey][headingKey] }}
                      </span>
                    </div>
                  </div>
                </template>
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
    selectedLozengeIndex: 1,
    collapsibleShownStates: {
      compareTable: false,
      faq0: false,
      faq1: false,
      faq2: false,
    },
  }),
  methods: {
    selectLozenge(index) {
      this.selectedLozengeIndex = index;
    },
    toggleCollapsibleShown(itemName) {
      this.$set(this.collapsibleShownStates, itemName, !this.collapsibleShownStates[itemName]);
    },
  },
};
</script>
