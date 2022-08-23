<template>
  <router-link
      v-if="entityType === types.link && link.path !== '/'"
      :to="link.path"
      v-slot="{ route, href, navigate }"
      class="tree-nav-link"
    >
      <a
        :title="link.title"
        :href="href"
        @click="navigate"
        :class="{
          'router-link-active': link.path == '/docs/guides/' && $route.path == '/okta-integration-network/' ? 'router-link-active' : isCurrentPage(route.path),
          'link': true,
        }"
        :aria-current="route.path === $route.path && 'page'"
        >
        <slot>
          <span class="text-holder">
            {{ link.title }}
          </span>
        </slot>
      </a>
  </router-link>
</template>

<script>
export default {
  name: "HeaderNavItem",
  props: ["link"],
  inject: ["appContext", "stackSelectorData"],
  components: {
    HeaderNavItem: () => import("../components/HeaderNavItem.vue"),
  },
  data() {
    return {
      types: {
        link: 'link',
      }
    };
  },

  computed:{
    entityType: function(){
      if (this.link.hasOwnProperty('path')) {
        if (this.link.path !== null) {
          return this.types.link
        }
      }
    },
  },
  methods: {
    isCurrentPage(route) {
      return window.location.pathname.startsWith(route);
    },
  }

  
};
</script>
