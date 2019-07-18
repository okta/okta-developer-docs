const UNREPLACED_DOMAIN_MSG = `Replace this with your Okta domain. If you sign in to Okta, we’ll try to show your domain here automatically.`;
const REPLACED_DOMAIN_MSG = `Your Okta domain is shown here because you recently signed in. Each customer sees their own domain.`;
const DISPLAY_DOMAIN = 'https://{yourOktaDomain}';

const counter = (() => { 
  let count = 0;
  return () => count++;
})();

export default {
  mounted() {
    let iframeSrc = 'https://login.okta.com';

    if(window.location.hostname == 'localhost') {
      iframeSrc = 'https://login.okta.io:8081';
    }

    const iframe = document.createElement('iframe');
    iframe.id = 'myOktaIFrame';
    iframe.src = iframeSrc;
    iframe.style = 'display:none';
    document.body.appendChild(iframe);

    window.addEventListener('load', this.getMyOktaAccounts.bind(this));
    window.addEventListener('message', this.receiveMessage.bind(this));
  },

  methods: {

    getMyOktaAccounts: function() {
      document.querySelector('#myOktaIFrame').contentWindow.postMessage({messageType: 'get_accounts_json'}, document.querySelector('#myOktaIFrame').getAttribute('src'));
    },

    wrapDomain: function({ domain, message }) { 
      const fences = document.querySelectorAll('code:not(.wrapped-okta-domain)');

      fences.forEach( fence => {
        const id = `domain-tooltip-${counter()}`;
        const replacement = `<abbr class="okta-domain" title="${message}">${domain}</abbr>`
        fence.innerHTML = fence.innerHTML.replace(/https?:\/\/{yourOktaDomain}/gi, replacement);
        fence.classList.add('wrapped-okta-domain'); // only add html to a given code block once
      });
    },

    replaceDomain: function ({ domain, message }) { 
      // If the domain loads after the content, we need to update
      const fences = document.querySelectorAll('code.wrapped-okta-domain');
      fences.forEach( fence => {
        fence.querySelectorAll('.okta-domain').forEach( abbr => {
          abbr.innerText = domain;
          abbr.title = message;
        });
      });
    },

    receiveMessage: function (event) {
      const fromMyOkta = event.origin === document.querySelector('#myOktaIFrame').getAttribute('src');
      const hasData = !!event.data;
      const accountsExist = hasData && event.data.length;
      const hasDomain = fromMyOkta && hasData && accountsExist;

      const message = hasDomain ? REPLACED_DOMAIN_MSG : UNREPLACED_DOMAIN_MSG;
      const domain = hasDomain ? event.data[0].origin : DISPLAY_DOMAIN;

      const myOktaAccountFound = new CustomEvent('myOktaAccountFound', {
        detail: {
          domain: domain
        }
      });

      const reactOnceContentExists = ({ domain, message }) => { 
        setTimeout( () => { 
          const contentExists = document.querySelector('code');
          if(contentExists) { 
            this.replaceDomain({ domain, message }); // replace wrapped first to avoid double hit on first pass
            this.wrapDomain({ domain, message });
          } else {
            reactOnceContentExists({ domain, message});
          }
        }, 100);
      };
      window.dispatchEvent(myOktaAccountFound)

      reactOnceContentExists({ domain, message});
    }
  }
}
