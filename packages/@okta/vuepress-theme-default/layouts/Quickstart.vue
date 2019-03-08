<template>
  <div class="Page okta-authentication-quickstart-guides">
    <TopNavigation />
    <section class="PageContent quickstart-page has-tableOfContents">
      <!-- START Page Content -->
      <div class="PageContent-main" id="quickstart-body">
        <h1>Okta Authentication Quickstart Guides</h1>

        These quick start instructions will help you integrate Okta into your existing front-end and/or backend application.
        Please use the menus to pick your client and server technology to see a custom-tailored quick start for your environment.

        <h2 id="account">Create an Okta Account</h2>
        <p>First things first &ndash; you need an <strong>Okta Developer Edition Account</strong>. Don't have one yet?</p>
        <a href="https://developer.okta.com/signup/" class="Button--red">Create Free Account</a>

        <h2 id="client_setup">Client Setup</h2>

        <p>Now, let's add authentication to your client. (Already done? <a onclick="scrollToServer()" style="cursor: pointer;">Skip to server setup</a>)</p>

        <div class="code-selector" id="client-selector">
          <h3>Client</h3>
          <ul>
            <li v-for="(client, index) in $themeConfig.quickstarts.clients" class="with-icon">
              <a :class="{active: activeClient==client.name}" @click="activeClient=client.name">
                <i :class="['with-icon','icon', 'code-'+(client.codeIconName || client.name)+'-32']"></i>{{ client.label }}
              </a>
            </li>
          </ul>
        </div>

        <Content :pageKey="activeClientComponent" id="client_content" class="example-content-well"></Content>

        <h2 id="server_setup">Server Setup</h2>

        <div class="code-selector" id="server-selector">
          <h3>Server</h3>
          <ul>
            <li v-for="(server, index) in $themeConfig.quickstarts.servers" class="with-icon">
              <a :class="{active: activeServer==server.name}" @click="activeServer=server.name">
                <i :class="['with-icon','icon', 'code-'+(server.codeIconName || server.name)+'-32']"></i>{{ server.label }}
              </a>
            </li>
          </ul>
        </div>

        <div class="code-selector" id="framework-selector">
          <h3>Framework</h3>
          <ul>
            <li v-for="(framework, index) in activeServerFrameworks">
              <a :class="{active: activeFramework==framework.name}" @click="activeFramework=framework.name">
                {{ framework.label }}
              </a>
            </li>
          </ul>
        </div>

        <Content :pageKey="activeServerComponent" id="server_content" class="example-content-well"></Content>
      </div>

      <div class="TableOfContents TableOfContentsPreload">
        <a class="TableOfContents-item is-level2" style="display: block;" @click="scrollToAccount()" id="account_link" :class="{'active': activeTab == 'account'}">Create an Okta Account</a>
        <a class="TableOfContents-item is-level2" style="display: block;" @click="scrollToClient()" id="client_setup_link":class="{'active': activeTab == 'client'}">Client Setup</a>
        <a class="TableOfContents-item is-level2" style="display: block;" @click="scrollToServer()" id="server_setup_link":class="{'active': activeTab == 'server'}">Server Setup</a>
      </div>
      <!-- END Page Content -->
    </section>
    <Footer/>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    components: {
      TopNavigation: () => import('../components/TopNavigation.vue'),
      Footer: () => import('../components/Footer.vue')
    },
    data() {
      return {
        activeClient: 'okta-sign-in-page',
        activeServer: 'nodejs',
        activeFramework: 'express',
        activeTab: null
      }
    },
    beforeMount: function () {
      let matches = window.location.hash.match('/([^\/]*)?\/?([^\/]*)?\/?([^\/]*)');
      this.activeClient = matches && matches[1];
      this.activeServer = matches && matches[2];
      this.activeFramework = matches && matches[3];

      if(this.activeClient == null) {
        let defaultClient = this.$themeConfig.quickstarts.clients.find((client) => {
          return client.default && client.default == true
        })
        this.activeClient = defaultClient.name
      }

      if(this.activeServer == null) {
        let defaultServer = this.$themeConfig.quickstarts.servers.find((server) => {
          return server.default && server.default == true
        })
        this.activeServer = defaultServer.name
      }

      if(this.activeFramework == null) {
        let defaultServerFramework = this.activeServerFrameworks.find((framework) => {
          return framework.default && framework.default == true
        })
        this.activeFramework = defaultServerFramework.name
      }

    },
    computed: {
      activeServerFrameworks: function () {
        if(this.activeServer == null) return []
        let activeServerFrameworks = this.$themeConfig.quickstarts.servers.find((server) => {
          return server.name == this.activeServer
        })
        return activeServerFrameworks.frameworks
      },

      activeClientComponent: function () {
        let component = this.$site.pages.find((page) => {
          return page.regularPath.startsWith('/quickstart-fragments/'+this.activeClient+'/default-example')
        })

        return component.key
      },

      activeServerComponent: function () {
        let client = this.$themeConfig.quickstarts.clients.filter((client) => {
          return client.name === this.activeClient
        })[0];
        let component = this.$site.pages.find((page) => {
          return page.regularPath.startsWith('/quickstart-fragments/' + this.activeServer + '/' + this.activeFramework + '-' + client.serverExampleType + '/')
        })

        return component.key
      }
    },
    watch: {
      activeClient: function () {
        window.location.hash = '/'+this.activeClient+'/'+this.activeServer+'/'+this.activeFramework
      },
      activeServer: function () {
        let frameworkToSet = null
        // is current Framework available for current Server
        this.$themeConfig.quickstarts.servers.find((server) => {
          if (server.name == this.activeServer) {

            return server.frameworks.find((framework) => {
              // console.log(framework.name, this.activeFramework)
              if (framework.name == this.activeFramework) {
                frameworkToSet = this.activeFramework
                return
              }
            })
          }
        })

        // get Default Framework for server if current one is not available
        if (frameworkToSet === null) {
          this.$themeConfig.quickstarts.servers.find((server) => {
            if (server.name == this.activeServer) {

              return server.frameworks.find((framework) => {
                // console.log(framework.name, this.activeFramework)
                if (framework.default && framework.default===true) {
                  frameworkToSet = framework.name
                  return
                }
              })
            }
          })
        }

        this.activeFramework = frameworkToSet

        window.location.hash = '/'+this.activeClient+'/'+this.activeServer+'/'+this.activeFramework
      },
      activeFramework: function () {
        window.location.hash = '/'+this.activeClient+'/'+this.activeServer+'/'+this.activeFramework
      }
    },
    methods: {
      scrollToAccount: function () {
        this.scrollTo('#account')
        this.activeTab = 'account'
      },
      scrollToServer: function () {
        this.scrollTo('#server_setup')
        this.activeTab = 'server'
      },
      scrollToClient: function () {
        this.scrollTo('#client_setup')
        this.activeTab = 'client'
      },
      scrollTo: function (element) {
        window.scrollTo(0, document.querySelectorAll(element)[0].offsetTop - 150)
      }
    }
  }

</script>

<style lang="scss">
  @import '../assets/css/okta';
  @import '~prismjs/themes/prism-solarizedlight.css';

  .header-anchor {
    display:none;
  }
</style>
