<template>
  <router-link
    :to="link.path"
    class="tree-nav-link"
    v-if="entityType === types.link && link.path !== '/'"
    v-slot="{ route, href, navigate }"
  >
    <a
      :title="link.title"
      :href="href"
      :class="{
        'router-link-active': isCurrentPage(route.path),
        'link': true,
      }"
      :aria-current="route.path === $route.path && 'page'"
      @click="navigate"
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
  inject: ["appContext", "stackSelectorData"],
  props: ["link"],
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
