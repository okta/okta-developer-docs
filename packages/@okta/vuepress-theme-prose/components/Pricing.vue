<template>
  <div class="page-content">
    <section class="pricing">
      <div class="pricing--container">
        <div class="pricing--leader">
          <h1 class="pricing--title">Developer Friendly Pricing</h1>
          <p class="pricing--subtitle">Whether you're building a new application or scaling to millions of users, our plans have you covered.</p>
        </div>
      </div>
      <div class="pricing--background-curve">
        <img src="/img/curve-doubleLeft.png" />
      </div>
      <div class="pricing-alt--container">
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
                <a href="/signup/" class="Button--red">
                  Get Started Free
                </a>
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
      <div class="pricing-alt--container">
        <div class="pricing--editions">
          <div class="pricing-section">
            <div class="pricing-card pricing-card-table">
              <div class="pricing-card-row pricing-card-header">
                <div class="pricing-card-column">
                  <h3 class="pricing-card-table-name">Editions</h3>
                </div>
                <div class="pricing-card-column">
                  <h4>{{$page.frontmatter.editions[0].name}}</h4>
                  <p>Priced at</p>
                  <p>$400</p>
                  <p>per month for up to</p>
                  <a href="/signup/" class="Button--red">Start Free</a>
                </div>
                <div class="pricing-card-column">
                  <h4>{{$page.frontmatter.editions[1].name}}</h4>
                  <p>{{$page.frontmatter.editions[1].subheading}}</p>
                  <a href="/contact-sales-enterprise/" class="Button--whiteOutline">Contact Us</a>
                </div>
                <div class="pricing-card-column">
                  <h4>{{$page.frontmatter.editions[2].name}}</h4>
                  <p>{{$page.frontmatter.editions[2].subheading}}</p>
                  <a href="/contact-sales-enterprise/" class="Button--whiteOutline">Contact Us</a>
                </div>
              </div>
              <template v-for="(details, feature) in $page.frontmatter.features">
                <div class="pricing-card-row">
                  <div class="pricing-card-column">
                    {{details.name}}
                    <ul v-if="details.bullets">
                      <li v-for="bullet in details.bullets">
                        {{bullet}}
                      </li>
                    </ul>
                  </div>
                  <template v-for="edition in $page.frontmatter.editions">
                    <div class="pricing-card-column" v-if="typeof edition[feature] === 'object'">
                      <div>
                        <img src="/img/icons/icon--check.svg" v-if="edition[feature].enabled" />
                        {{edition[feature].additionalNote}}
                      </div>
                    </div>
                    <div class="pricing-card-column" v-else>
                      <img src="/img/icons/icon--check.svg" v-if="edition[feature]" />
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="pricing-alt--container">
        <div class="pricing--addons">
          <h1>Add-Ons</h1>
          <p>
            Learn more about add-on products at <a href="https://okta.com/pricing">okta.com/pricing</a>
          </p>
          <div>
            <template v-for="addon in $page.frontmatter.addons">
              <a class="pricing-addons-tile" target="_blank" rel="noopener noreferrer" :href="addon.link">
                <img :src="addon.icon" />
                <p>{{addon.title}}</p>
              </a>
            </template>
          </div>
        </div>
      </div>
      <div class="pricing--background-curve">
        <img src="/img/curve-singleRightLight.png" />
      </div>
      <div class="pricing--container">
        <div class="pricing--faq">
          <h1>Frequently asked questions</h1>
        </div>
      </div>
      <div class="pricing--container">
        <div class="pricing--questions">
          <h4>More questions?</h4>
          <p>
            We'd love to hear them. A real, technical human will get back to you shortly.
          </p>
          <a href="mailto:developers@okta.com" class="Button--red">
            Email Support
          </a>
        </div>
      </div>
      <div class="pricing--background-curve">
        <img src="/img/curve-doubleLeft.png" />
      </div>
      <div class="pricing--footer">
        <h1>Trusted by developers</h1>
        <div class="pricing--footer--logos">
          <img src="/img/logos/logo--adobe.png" />
          <img src="/img/logos/logo--pitney.png" />
          <img src="/img/logos/logo--experian.png" />
          <img src="/img/logos/logo--advent.png" />
        </div>
      </div>
    </section>
  </div>
</template>
