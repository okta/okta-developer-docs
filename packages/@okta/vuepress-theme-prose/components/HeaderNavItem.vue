<template>
  <router-link
    v-if="entityType === types.link && link.path !== '/' && !link.isExternal"
    v-slot="{ route, href, navigate }"
    :to="link.path"
    class="tree-nav-link"
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

  <SmartLink
    v-else-if="entityType === types.link && link.path !== '/' && link.isExternal"
    :item="{ link: link.path, target: link.target ? link.target : '_blank' }"
    classes="tree-nav-link"
  >
    <a class="link">
      {{ link.title }}
    </a>
  </SmartLink>
</template>

<script>
export default {
  name: "HeaderNavItem",
  components: {
    HeaderNavItem: () => import("../components/HeaderNavItem.vue"),
    SmartLink: () => import("./SmartLink.vue"),
  },
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
