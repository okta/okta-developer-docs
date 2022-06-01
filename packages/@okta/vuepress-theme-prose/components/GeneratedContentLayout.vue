<template>
  <div>
    <Layout>
      <template v-slot:generatedContent>
        <h1>{{ title }}</h1>
        <div v-for="link in links" :key="link.title">
          <router-link
            :to="link.path"
          >
            <a :href="link.path">
              <slot>{{link.title}}</slot>
            </a>
          </router-link>
          <div class="generated-content">
            <Content :pageKey="getPageKey(link.path)" /> 
          </div>
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
  import SidebarItems from "../mixins/SidebarItems";
	export default {
    name: 'GeneratedContentLayout',
    mixins: [SidebarItems],
    components: {
      Layout: () => import("../layouts/Layout.vue"),
    },
    data() {
      return {
        title: '',
        links: [],
      }
    },
    mounted() {
      this.getContent(this.getNavigation());
    },
    methods: {
      getContent(navigation) {
        for (let el of navigation) {
          if (el.path) {
            if (el.path == window.location.pathname) {
              this.title = el.title;
              if (el.subLinks) {
                this.links = el.subLinks;
              }
              return false;
            }
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