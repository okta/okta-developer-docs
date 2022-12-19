<template>
  <div class="archetecture-center__items">
    <div class="archetecture-center__item" v-for="link in links" :key="link.title">
      <div>
        <h2>{{link.title}}</h2>
        <div class="generated-content" v-if="link.description">
          <Content :pageKey="getPageKey(link.path)" slot-key="description"/>
        </div>
        <div class="generated-content" v-else>
          <Content :pageKey="getPageKey(link.path)" />
          <p>Index page for "{{link.title}}" articles.</p>
        </div>
      </div>
      <router-link
        :to="link.path"
        v-slot="{ navigate }"
      >
        <a 
          :href="link.path"
          @click="navigate"
        >
          <slot>Learn more</slot>
        </a>
      </router-link>
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