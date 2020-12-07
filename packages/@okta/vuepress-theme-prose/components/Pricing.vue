<template>
  <div class="page-content">
    <section class="pricing">
      <div class="pricing--container">
        <div class="pricing--leader">
          <h1 class="pricing--title">{{$page.frontmatter.sections[0].title}}</h1>
          <p class="pricing--subtitle">{{$page.frontmatter.sections[0].description}}</p>
        </div>
      </div>
      <div class="pricing--background-curve">
        <img src="/img/curve-doubleLeft.png" />
      </div>
      <div class="pricing-alt--container">
        <div class="pricing-wrap">
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
          <div class="pricing-section">
            <div class="pricing-card pricing-card-table">
              <div class="pricing-card-header">
                <div class="pricing-card-column">
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
            <a class="pricing-addons-tile" target="_blank" rel="noopener noreferrer" href="https://www.okta.com/pricing/?&_ga=2.233629918.1380425866.1607359849-1244033381.1605546128#api-b2b-integration">
              <img src="/img/icons/icon--checkmark.svg" />
              <p>B2B Integration</p>
            </a>
            <a class="pricing-addons-tile" target="_blank" rel="noopener noreferrer" href="https://www.okta.com/pricing/?&_ga=2.267241422.1380425866.1607359849-1244033381.1605546128#api-access-management">
              <img src="/img/icons/icon--tool.svg" />
              <p>API Access Management</p>
            </a>
            <a class="pricing-addons-tile" target="_blank" rel="noopener noreferrer" href="https://www.okta.com/pricing/?&_ga=2.263728972.1380425866.1607359849-1244033381.1605546128#api-multi-factor-authentication">
              <img src="/img/icons/icon--multikey.svg" />
              <p>Complete MFA</p>
            </a>
            <a class="pricing-addons-tile" target="_blank" rel="noopener noreferrer" href="https://www.okta.com/pricing/?&_ga=2.263728972.1380425866.1607359849-1244033381.1605546128#api-sso-oin-apps">
              <img src="/img/icons/icon--lock.svg" />
              <p>Single Sign-On Integrations</p>
            </a>
            <a class="pricing-addons-tile" target="_blank" rel="noopener noreferrer" href="https://www.okta.com/pricing/?&_ga=2.263728972.1380425866.1607359849-1244033381.1605546128#api-lifecycle-management">
              <img src="/img/icons/icon--user-profiles.svg" />
              <p>Lifecycle Management</p>
            </a>
            <a class="pricing-addons-tile" target="_blank" rel="noopener noreferrer" href="https://www.okta.com/pricing?&_ga=2.263728972.1380425866.1607359849-1244033381.1605546128#api-dynamic-scale">
              <img src="/img/icons/icon--highcapacity.svg" />
              <p>DynamicScale</p>
            </a>
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
