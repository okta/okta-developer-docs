export default {
  mounted() {
    let iframeSrc = 'https://login.okta.com'

    if(window.location.hostname == 'localhost') {
      iframeSrc = 'https://login.okta.io:8081'
    }

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

      const fences = document.querySelectorAll("code")
      fences.forEach((fence, index) => {
        fences[index].innerHTML = fence.innerHTML.replace(/https:\/\/{yourOktaDomain}/gi, domain)
        fences[index].innerHTML = fence.innerHTML.replace(/http:\/\/{yourOktaDomain}/gi, domain)
      })
    }

  }
}
