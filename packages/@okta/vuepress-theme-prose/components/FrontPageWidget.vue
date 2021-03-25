<template>
  <div class="main-page-widget-wrapper" id="okta-sign-in"></div>
</template>

<script>
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

export default {
  name: 'FrontPageWidget',
  mounted: function() {
    import('@okta/okta-signin-widget').then(
      (module) => {
        this.OktaSignIn = module.default
        this.renderWidget()
      }
    )
  },
  destroyed () {
    this.widget ? this.widget.remove() : null;
  },
  methods: {
    renderWidget(){
    this.widget = new this.OktaSignIn({
      baseUrl: 'https://{yourOktaDomain}',
      logo: '/img/homepage/alliance.png',
      username: 'leia@rebelalliance.io',
      processCreds: (creds, callback) => {
        if (creds.username === 'leia@rebelalliance.io' && creds.password === 'secret') {
          this.$emit('authLeia');
        } else {
          callback();
        }
      }, 
      helpLinks: {
        help: 'https://developer.okta.com/code/javascript/okta_sign-in_widget',
      },
      i18n: {
        en: {
          "primaryauth.title": "Alliance Authentication",
          "primaryauth.submit": "Sign In"
        },
      },
    });
    this.widget.on('afterRender', () => {
      if (this.rendered) {
        // Last focused element to return to
        const elementToFocus = (document.activeElement);
        setTimeout(() => {
          const activeElement = (document.activeElement);

          if (activeElement.id === 'okta-signin-password') {
            activeElement.blur();
            elementToFocus.focus();
          }
        }, 0);
      } else {
        this.widget.hide();

        // Prefill password input
        const password = document.getElementById('okta-signin-password');
        if (password) {
          password.setAttribute('value', 'secret');
          password.dispatchEvent(new Event('input', { 'bubbles': true } ));
        }

        setTimeout(() => {
          this.widget.show();
          this.rendered = true;
        }, 100);
      }
    });
    this.widget.renderEl({ el: '#okta-sign-in' });
    }
  }
};
</script>
