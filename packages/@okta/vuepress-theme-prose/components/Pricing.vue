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
                <h3>Add Auth in minutes</h3>
                <h4>(with no credit card)</h4>
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
                <h5>Identity and access control for your app</h5>
                <ul>
                  <li>Authentication</li>
                  <li>Authorization</li>
                  <li>Basic multi-factor authentication</li>
                  <li>User management</li>
                  <li>Email support</li>
                  <li>Customizable sign-in and registration</li>
                </ul>
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
                  <h4 class="pricing-card-table-name">Editions</h4>
                </div>
                <div class="pricing-card-column">
                  <h5>{{$page.frontmatter.editions[0].name}}</h5>
                </div>
                <div class="pricing-card-column">
                  <h5>{{$page.frontmatter.editions[1].name}}</h5>
                </div>
                <div class="pricing-card-column">
                  <h5>{{$page.frontmatter.editions[2].name}}</h5>
                </div>
              </div>
              <div class="pricing-card-row pricing-card-header">
                <div class="pricing-card-column">
                  99.99% availability
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[0].hiAvailability}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[1].hiAvailability}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[2].hiAvailability}}
                </div>
              </div>
              <div class="pricing-card-row pricing-card-header">
                <div class="pricing-card-column">
                  Service level assurance
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[0].serviceAssurance}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[1].serviceAssurance}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[2].serviceAssurance}}
                </div>
              </div>
              <div class="pricing-card-row pricing-card-header">
                <div class="pricing-card-column">
                  User capacity
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[0].capacity}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[1].capacity}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[2].capacity}}
                </div>
              </div>
              <div class="pricing-card-row pricing-card-header">
                <div class="pricing-card-column">
                  Custom applications
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[0].customApps}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[1].customApps}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[2].customApps}}
                </div>
              </div>
              <div class="pricing-card-row pricing-card-header">
                <div class="pricing-card-column">
                  Support
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[0].support}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[1].support}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[2].support}}
                </div>
              </div>
              <div class="pricing-card-row pricing-card-header">
                <div class="pricing-card-column">
                  Authentication
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[0].authentication}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[1].authentication}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[2].authentication}}
                </div>
              </div>
              <div class="pricing-card-row pricing-card-header">
                <div class="pricing-card-column">
                  Authorization
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[0].authorization}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[1].authorization}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[2].authorization}}
                </div>
              </div>
              <div class="pricing-card-row pricing-card-header">
                <div class="pricing-card-column">
                  User management
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[0].userManagement}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[1].userManagement}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[2].userManagement}}
                </div>
              </div>
              <div class="pricing-card-row pricing-card-header">
                <div class="pricing-card-column">
                  Basic multi-factor authentication
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[0].mfa}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[1].mfa}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[2].mfa}}
                </div>
              </div>
              <div class="pricing-card-row pricing-card-header">
                <div class="pricing-card-column">
                  Customizable email templates and domains
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[0].customEmailTemplates.enabled}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[1].customEmailTemplates.enabled}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[2].customEmailTemplates.enabled}}
                </div>
              </div>
              <div class="pricing-card-row pricing-card-header">
                <div class="pricing-card-column">
                  Customizable sign-in and registration widget
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[0].customSignin}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[1].customSignin}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[2].customSignin}}
                </div>
              </div>
              <div class="pricing-card-row pricing-card-header">
                <div class="pricing-card-column">
                  Add-on products available
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[0].addons}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[1].addons}}
                </div>
                <div class="pricing-card-column">
                  {{$page.frontmatter.editions[2].addons}}
                </div>
              </div>
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
