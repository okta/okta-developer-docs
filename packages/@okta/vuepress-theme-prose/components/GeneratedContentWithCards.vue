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
          <slot>Learn more<svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.3536 4.35355C10.5488 4.15829 10.5488 3.84171 10.3536 3.64645L7.17157 0.464466C6.97631 0.269204 6.65973 0.269204 6.46447 0.464466C6.2692 0.659728 6.2692 0.976311 6.46447 1.17157L9.29289 4L6.46447 6.82843C6.2692 7.02369 6.2692 7.34027 6.46447 7.53553C6.65973 7.7308 6.97631 7.7308 7.17157 7.53553L10.3536 4.35355ZM0 4.5H10V3.5H0V4.5Z" fill="#1662DD"/></svg></slot>
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