<template>
  <router-link
      v-if="entityType === types.link"
      :to="link.path"
      v-slot="{ route, href, navigate }"
      class="tree-nav-link"
    >
      <a
        :title="link.title"
        :href="href"
        @click="navigate"
        :class="{
          'router-link-active': route.path === $route.path,
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
import { guideFromPath } from "../util/guides"

export default {
  name: "HeaderNavItem",
  props: ["link"],
  inject: ["appContext", "stackSelectorData"],
  components: {
    HeaderNavItem: () => import("../components/HeaderNavItem.vue"),
  },
  data() {
    return {
      sublinksExpanded: false,
      hidden: !!this.link.hidden,
      types: {
        link: 'link',
        blankDivider: 'blankDivider',
        parent: 'parent'
      }
    };
  },

  computed:{
    entityType: function(){
      if(this.link.hasOwnProperty('path') && this.link.path !== null ){
        return this.types.link
      }
      if(!this.link.hasOwnProperty('path') && this.link.hasOwnProperty('subLinks')){
        return this.types.parent
      }
      if(this.link.hasOwnProperty('path') && this.link.path === null){
        return this.types.blankDivider
      }
    },
  },
  mounted() {
    this.setData();
  },
  watch: {
    link() {
      this.setData();
    },

    // Will triggers when StackSelector component will change it value.
    "stackSelectorData.to"() {
      // After StackSelector value has changed, route link will be modified.
      // This condition will be true only for SidebarItems that contains links on pages with StackSelector.
      const newFramework = guideFromPath(this.stackSelectorData.to).framework;
      if (this.link?.frameworks?.includes(newFramework)) {
        // All links on pages with StackSelector that contains same frameworks list will be modifiend
        // and will include new framework value.
        // Such approach will make it possible to activate the same value in all StackSelector
        // components that has similar frameworks set.
        this.link.path = this.getNewLinkPath(this.link.path, newFramework);
      }
    },

    sublinksExpanded(isActivated, _) {
      if (isActivated) {
        // element.scrollIntoViewIfNeeded is not supported by Firefox
        if (this.$el.scrollIntoViewIfNeeded) {
          this.$el.scrollIntoViewIfNeeded();
        } else {
          this.$el.scrollIntoView({ block: "nearest" });
        }
      }
    },
    "appContext.isTreeNavMobileOpen"(isOpen, _) {
      if (isOpen && this.link.iHaveChildrenActive && this.link.path) {
        this.$el.scrollIntoView({ block: "center" });
      }
    }
  },

  methods: {
    getNewLinkPath(path, newFramework) {
      const framework = guideFromPath(path).framework;
      return path.replace(framework, newFramework);
    },
    toggleExpanded() {
      this.sublinksExpanded = !this.sublinksExpanded;
    },
    setData: function() {
      this.sublinksExpanded = Boolean(this.link.iHaveChildrenActive);
    },
    isHeaderMenu: function() {
      return (function loop(parent) {
        if (parent.$parent == undefined) { return false; }
        if (parent.$el.classList.contains('page-header')) { return true; }
        return loop(parent.$parent);
      }
      )(this)
    }

  }
};
</script>
