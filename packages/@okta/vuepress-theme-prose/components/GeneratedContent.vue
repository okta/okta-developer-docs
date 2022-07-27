<template>
  <div>
    <div v-for="link in links" :key="link.title">
      <router-link
        :to="link.path"
      >
        <a :href="link.path">
          <slot>{{link.title}}</slot>
        </a>
      </router-link>
      <div class="generated-content">
        <Content :pageKey="getPageKey(link.path)" slot-key="description" />
        <p>{{getDescription(link.title)}}</p>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
    name: 'GeneratedContent',
    inject: ["appContext"],
    data() {
      return {
        title: '',
        links: [],
      }
    },
    mounted() {
      this.getContent(this.appContext.treeNavDocs);
    },
    watch: {
      $route(to, from) {
        if (from.path !== to.path) {
          this.getContent(this.appContext.treeNavDocs);
        }
      },
    },
    methods: {
      getDescription(title) {
        const arr = [
          "New to Okta? Our resources walk you through about ---",
          "Want to know more? The article about --- will give you all the information about it.",
          "Need details about ---? Follow the link above.",
          "This is the landing page about --- with more details.",
          "Here you can find out about --- and get detailed information."
        ]
        return arr[Math.floor(Math.random() * arr.length)].replace('---', title)
      },
      getContent(navigation) {
        for (let el of navigation) {
          if (!!window && el.path && el.path == window.location.pathname) {
            document.title = el.title + ' | ' + this.$site.title;
            this.title = el.title;
            if (el.subLinks) {
              this.links = el.subLinks;
            }
            break;
          }
          if (el.subLinks && el.subLinks.length > 0) {
            this.getContent(el.subLinks);
          }
        }
      },
      getPageKey(path) {
        let set = new Set(this.$router.options.routes);
        for (let route of set) {
          if (path == route.path) {
            return route.name;
          }
        }
        return '';
      }
    }
  }
</script>