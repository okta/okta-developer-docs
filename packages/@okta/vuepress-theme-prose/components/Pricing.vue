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
      <div class="pricing--background-curve">
        <img src="/img/curve-doubleLeft.png" />
      </div>
      <div class="pricing-alt-bg">
        <div class="pricing--container">
          <div class="pricing--costs">
            <div class="pricing-section pricing-card-intro">
              <div class="pricing-card">
                <div class="pricing-card-column">
                  <h3>Add Auth in minutes (with no credit card)</h3>
                  <div class="pricing-card-price">
                    <p class="pricing-card-amount">
                      $0
                    </p>
                    <p class="pricing-card-detail">
                      per month
                    </p>
                  </div>
                  <p class="pricing-card-subtitle">
                    Up to 1,000 monthly active users
                  </p>
                  <SmartLink
                    :item="{ link: $page.frontmatter.links.signup }"
                    classes="Button--red"
                  >
                    Get Started Free
                  </SmartLink>
                </div>
                <div class="pricing-card-column">
                  <h4>Identity and access control for your app</h4>
                  <div class="pricing-card-lists">
                    <ul class="pricing--icon-list">
                      <li>Authentication</li>
                      <li>Authorization</li>
                      <li>Basic multi-factor authentication</li>
                    </ul>
                    <ul class="pricing--icon-list">
                      <li>User management</li>
                      <li>Email support</li>
                      <li>Customizable sign-in and registration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pricing--container">
          <div class="pricing--editions">
            <div class="pricing-section">
              <div class="pricing-card pricing-card-table">
                 <div class="okta-workshop-banner">
                    Join us at Oktane21 for our Developer Talks April 6 through 8 and Developer Labs on April 9!
                    <SmartLink classes="agenda-link" :item="{ link: 'https://www.okta.com/oktane21/agenda?filters=developer' }">
                      Check out the developer agenda
                    </SmartLink>
                  </div>
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
                        <template v-if="index === 0">
                          <p>Priced at</p>
                          <p class="pricing-card-price">{{ mauPrice }}</p>
                          <p>per month for up to</p>
                          <select v-model="mauPrice">
                            <option
                              v-for="(price, index) in $page.frontmatter
                                .pricing"
                              :value="price.price"
                              :key="index"
                            >
                              {{ price.maus }}
                            </option>
                          </select>
                          <SmartLink
                            :item="{ link: $page.frontmatter.links.signup }"
                            classes="Button--red"
                          >
                            Start Free
                          </SmartLink>
                        </template>
                        <template v-else>
                          <p>{{ edition.subheading }}</p>
                          <SmartLink
                            :item="{
                              link: $page.frontmatter.links.contactSales,
                            }"
                            classes="Button--whiteOutline"
                          >
                            Contact Us
                          </SmartLink>
                        </template>
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
          <div class="pricing--addons">
            <div class="pricing-addons-header">
              <h1>Add-Ons</h1>
              <h4>
                Learn more about add-on products at
                <SmartLink :item="{ link: $page.frontmatter.links.pricing }">
                  okta.com/pricing
                </SmartLink>
              </h4>
            </div>
            <div class="pricing-addons-tiles">
              <template v-for="(addon, index) in $page.frontmatter.addons">
                <SmartLink
                  v-bind:key="index"
                  :item="{
                    link: addon.link,
                  }"
                  classes="pricing-addons-tile"
                >
                  <img :src="addon.icon" />
                  <p>{{ addon.title }}</p>
                </SmartLink>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="pricing--background-curve">
        <img src="/img/curve-singleRightLight.png" />
      </div>
      <div class="pricing--container">
        <div class="pricing--faq">
          <h1>Frequently asked questions</h1>
          <template v-for="(item, index) in $page.frontmatter.faqs">
            <div
              class="pricing-faq-item"
              v-bind:class="{ 'is-active': faqShownStates[index] }"
              v-bind:key="index"
            >
              <button
                class="pricing-faq-item-title"
                v-on:click="toggleFaqShown(index)"
              >
                {{ item.title }}
              </button>
              <div class="pricing-faq-item-content" v-html="item.content"></div>
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
        <img src="/img/curve-doubleLeft.png" />
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
    faqShownStates: [false, false, false],
    mauPrice: "$0",
  }),
  methods: {
    toggleFaqShown(faqIndex) {
      this.$set(this.faqShownStates, faqIndex, !this.faqShownStates[faqIndex]);
    },
  },
};
</script>
