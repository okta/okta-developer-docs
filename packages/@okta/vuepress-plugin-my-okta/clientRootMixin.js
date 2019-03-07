export default {
  mounted() {
    const iframe = document.createElement('iframe')
    iframe.id = 'myOktaIFrame'
    iframe.src = 'https://login.okta.com'
    iframe.style = 'display:none'
    document.body.appendChild(iframe)

    window.addEventListener('message', this.receiveMessage, false)
    document.addEventListener('visibilitychange', this.checkSuccess, false)

    window.addEventListener('load', () => {
      document.querySelector('.content').innerHTML = document.querySelector('.content').innerHTML.replace(/https:\/\/{yourOktaDomain}/gi, '<span class="okta-preview-domain">https://{yourOktaDomain}</span>')
      this.getMyOktaAccounts()
    })
  },

  methods: {
    checkSuccess: () => {
      if (typeof document.hidden !== 'undefined') {
        if (!document.hidden) {
          if ( document.querySelector('.okta-preview-domain').innerHTML == 'https://{yourOktaDomain}' ) {
            // We haven't replaced yet: try again.
            this.getMyOktaAccounts()
          } else {
            // We've succeeded: don't try again in the future.
            document.removeEventListener('visibilitychange', this.checkSuccess, false)
          }
        }
      }
    },

    getMyOktaAccounts: () => {
      document.querySelector('#myOktaIFrame').contentWindow.postMessage({messageType: 'get_accounts_json'}, 'https://login.okta.com')
    },

    receiveMessage: () => {
      if (event.origin !== 'https://login.okta.com' || !event.data) {
        return
      }

      const accountsExist = event.data.length
      if (!accountsExist) {
        return;
      }

      const domain = event.data[0].origin
      const myOktaAccountFound = new CustomEvent('myOktaAccountFound', {
        detail: {
          domain: domain
        }
      });
      window.dispatchEvent(myOktaAccountFound)

      document.querySelector('.content').innerHTML = document.querySelector('.content').innerHTML.replace(/https:\/\/{yourOktaDomain}/gi, domain)
    }

  }
}
