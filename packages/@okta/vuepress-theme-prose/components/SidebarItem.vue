<template>
  <li :class="{
    'link-wrap': true, 
    'subnav-active': link.iHaveChildrenActive,
    hidden: hidden }">
    <router-link
          v-if="entityType === types.link"
          :to="link.path"
          custom
          v-slot="{ route, href, navigate }"
          class="tree-nav-link"
        >
          <a
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

    <div v-if="entityType === types.blankDivider">
        <div class="blank-divider">
          {{link.title}}
        </div>
    </div>

    <div
          v-if="entityType === types.parent"
          :class="{
            'tree-nav-link': true,
            'children-active': link.iHaveChildrenActive
          }"
          @click="toggleExpanded"
        >
          <i :class="{
            'parent': link.subLinks,
            'opened': link.subLinks && sublinksExpanded,
             }">
            <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.4714 3.5286C4.73175 3.78894 4.73175 4.21106 4.4714 4.4714L1.13807 7.80474C0.877722 8.06509 0.455612 8.06509 0.195263 7.80474C-0.0650871 7.54439 -0.0650871 7.12228 0.195262 6.86193L3 4L0.195262 1.13807C-0.0650874 0.877722 -0.0650874 0.455612 0.195262 0.195262C0.455611 -0.0650874 0.877722 -0.0650874 1.13807 0.195262L4.4714 3.5286Z" fill="#8C8C96"/>
            </svg>
          </i>
          <span class="text-holder link">
            {{ link.title }}
          </span>
    </div>

    <ul v-if="entityType === types.parent" class="sections" v-show="sublinksExpanded">
      <SidebarItem
        v-for="sublink in link.subLinks"
        :key="sublink.title"
        :link="sublink"
      />
    </ul>
  </li>

</template>

<script>
import { guideFromPath } from "../util/guides"

export default {
  name: "SidebarItem",
  props: ["link"],
  inject: ["appContext", "stackSelectorData"],
  components: {
    SidebarItem: () => import("../components/SidebarItem.vue"),
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
