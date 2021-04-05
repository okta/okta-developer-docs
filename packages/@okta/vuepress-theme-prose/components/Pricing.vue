<template>
  <div class="page-content">
    <section class="pricing">
      <div class="pricing--container">
        <div class="pricing--leader">
          <h1 class="pricing--title">Options That Scale With Your Business</h1>
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
                  <li>B2B Integration</li>
                  <li>99.99% availability</li>
                  <li>Community support</li>
                </ul>
              </div>
            </div>
            <div class="pricing-card">
              <div class="pricing-card-top">
                <h3>Advanced</h3>
                <p class="pricing-card-amount">
                  $4000 /mo
                </p>
                <p class="pricing-card-subtitle">
                  A complete set of customer identity features with more support
                </p>
                <SmartLink
                  :item="{ link: $page.frontmatter.links.signup }"
                  classes="Button--redOutline"
                >
                  Try For Free
                </SmartLink>
              </div>
              <div class="pricing-card-bottom">
                <p>
                  All starter plan, plus
                </p>
                <ul>
                  <li>Higher rate limits</li>
                  <li>Email support</li>
                  <li>Custom email templates</li>
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
                  :item="{ link: $page.frontmatter.links.emailSupport }"
                  classes="Button--redOutline"
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
                  <li>Enterprise plan only add-ons</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pricing--container">
        <div class="pricing--plans">

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
              <div class="pricing-card-row showInMobile no-border">
                <div class="selector-lozenge large multiple">
                  <button
                    class="lozenge"
                    :class="{ active: selectedPlan === PLANS.STARTER }"
                    @click="selectPlan(PLANS.STARTER)"
                  >
                    Starter
                  </button>
                  <button
                    class="lozenge"
                    :class="{ active: selectedPlan === PLANS.ADVANCED }"
                    @click="selectPlan(PLANS.ADVANCED)"
                  >
                    Advanced
                  </button>
                  <button
                    class="lozenge"
                    :class="{ active: selectedPlan === PLANS.ENTERPRISE }"
                    @click="selectPlan(PLANS.ENTERPRISE)"
                  >
                    Enterprise
                  </button>
                </div>

              </div>
              <div class="pricing-card-row hideInMobile no-border">
                <div class="pricing-card-column pricing-card-row-header">
                </div>
                <div class="pricing-card-column pricing-card-column-header">
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
                  <div
                    class="pricing-card-column"
                    :class="{ hideInMobile: selectedPlan !== PLANS.STARTER }"
                  >
                  </div>
                  <div
                    class="pricing-card-column"
                    :class="{ hideInMobile: selectedPlan !== PLANS.ADVANCED }"
                  >
                  </div>
                  <div
                    class="pricing-card-column"
                    :class="{ hideInMobile: selectedPlan !== PLANS.ENTERPRISE }"
                  >
                  </div>
                </div>
                <template v-for="(heading, headingKey) in section.headings">
                  <div class="pricing-card-row">
                    <div class="pricing-card-column pricing-card-row-header">
                      <span v-html="heading.name"></span>
                      <small v-if="heading.subName" v-html="heading.subName"></small>
                    </div>
                    <div
                      v-for="(plan, planKey) in $page.frontmatter.tableData"
                      class="pricing-card-column"
                      :class="{ hideInMobile: selectedPlan !== planKey }"
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
      <div class="pricing--footer">
        <CompanyLogos withHeading />
      </div>
    </section>
  </div>
</template>

<script>
const PLANS = {
  STARTER: 'starter',
  ADVANCED: 'advanced',
  ENTERPRISE: 'enterprise',
};

export default {
  components: {
    CompanyLogos: () => import("../components/CompanyLogos"),
    SmartLink: () => import("../components/SmartLink"),
  },
  data: () => ({
    selectedPlan: PLANS.STARTER,
    collapsibleShownStates: {
      compareTable: false,
      faq0: false,
      faq1: false,
      faq2: false,
    },
  }),
  methods: {
    selectPlan(name) {
      this.selectedPlan = name;
    },
    toggleCollapsibleShown(itemName) {
      this.$set(this.collapsibleShownStates, itemName, !this.collapsibleShownStates[itemName]);
    },
  },
  created() {
    this.PLANS = PLANS;
  },
};
</script>
