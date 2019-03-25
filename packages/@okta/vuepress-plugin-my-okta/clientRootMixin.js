export default {
  mounted() {
    let iframeSrc = 'https://login.okta.com'

    const iframe = document.createElement('iframe')
    iframe.id = 'myOktaIFrame'
    iframe.src = iframeSrc
    iframe.style = 'display:none'
    document.body.appendChild(iframe)


    window.addEventListener('load', () => {
      this.getMyOktaAccounts()
    })


    window.addEventListener('message', this.receiveMessage, false)
  },

  methods: {


    getMyOktaAccounts: () => {
      document.querySelector('#myOktaIFrame').contentWindow.postMessage({messageType: 'get_accounts_json'}, document.querySelector('#myOktaIFrame').getAttribute('src'))
    },

    receiveMessage: (event) => {
      if (event.origin !== document.querySelector('#myOktaIFrame').getAttribute('src') || !event.data) {
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
