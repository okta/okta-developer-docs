<template>
  <li
    :class="{
      'link-wrap': true,
      'subnav-active': link.iHaveChildrenActive,
      hidden: hidden }"
  >
    <router-link
      v-if="entityType === types.link && link.path && !link.path.toLowerCase().startsWith('http') && !link.path.toLowerCase().startsWith('www.')"
      v-slot="{ route, href, navigate }"
      :to="link.path"
      custom
      class="tree-nav-link"
    >
      <a
        :href="href"
        :class="{
          'router-link-active': route.path === $route.path,
          'link': true,
        }"
        :aria-current="route.path === $route.path && 'page'"
        :title="link.title"
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
      v-if="link.path && (link.path.toLowerCase().startsWith('http') || link.path.toLowerCase().startsWith('www.'))"
      :item="{ link: link.path, target: link.target ? link.target : '_blank' }"
      classes="tree-nav-link"
    >
      <span class="text-holder">
        {{ link.title }}

        <svg
          v-if="!link.target || link.target === '_blank'"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          width="15"
          height="15"
          class="icon outbound">
          <path 
            fill="var(--c-sidebar-external-link)"
            d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z">
          </path>
          <polygon
            fill="var(--c-sidebar-external-link)"
            points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9">
          </polygon>
        </svg>
      </span>
    </SmartLink>

    <div v-if="entityType === types.blankDivider">
      <div class="blank-divider">
        {{ link.title }}
      </div>
    </div>

    <div
      v-if="entityType === types.parent"
      :class="{
        'tree-nav-link tree-nav-link-parent': true,
        'children-active': link.iHaveChildrenActive || isCurrentPage(link.path)
      }"
      @click="toggleExpanded"
    >
      <i
        :class="{
          'parent': link.subLinks,
          'opened': link.subLinks && sublinksExpanded || isCurrentPage(link.path),
        }"
      >
        <svg
          width="5"
          height="8"
          viewBox="0 0 5 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.4714 3.5286C4.73175 3.78894 4.73175 4.21106 4.4714 4.4714L1.13807 7.80474C0.877722 8.06509 0.455612 8.06509 0.195263 7.80474C-0.0650871 7.54439 -0.0650871 7.12228 0.195262 6.86193L3 4L0.195262 1.13807C-0.0650874 0.877722 -0.0650874 0.455612 0.195262 0.195262C0.455611 -0.0650874 0.877722 -0.0650874 1.13807 0.195262L4.4714 3.5286Z"
            fill="#ADBBD7"
          />
        </svg>
      </i>
      <router-link
        v-slot="{ href, navigate }"
        :to="link.path"
      >
        <a
          :href="href"
          :class="{
            'link': true,
          }"
          :title="link.title"
          @click="navigate"
        >
          <slot>
            <span
              class="text-holder"
            >
              {{ link.title }}
            </span>
          </slot>
        </a>
      </router-link>
    </div>
    <transition name="slide-fade">
      <ul
        v-if="entityType === types.parent"
        v-show="sublinksExpanded || isCurrentPage(link.path)"
        class="sections"
      >
        <SidebarItem
          v-for="sublink in link.subLinks"
          :key="sublink.title"
          :link="sublink"
        />
      </ul>
    </transition>
  </li>
</template>

<script>
import { guideFromPath } from "../util/guides";
import _ from 'lodash';

export default {
  name: "SidebarItem",
  components: {
    SidebarItem: () => import("../components/SidebarItem.vue"),
    SmartLink: () => import("../components/SmartLink.vue"),
  },
  inject: ["appContext", "stackSelectorData"],
  props: ["link"],
  data() {
    return {
      sublinksExpanded: false,
      hidden: !!this.link.hidden,
      types: {
        link: 'link',
        parent: 'parent',
        blankDivider: 'blankDivider'
      }
    };
  },
  computed:{
    entityType: function(){
      if (this.link.hasOwnProperty('path')) {
        if (this.link.path == 'empty') {
          return this.types.blankDivider
        }
        if (this.link.path !== null) {
          if (this.link.hasOwnProperty('subLinks') && this.link.subLinks.length > 0) {
            return this.types.parent
          }
          return this.types.link
        }
      }
    },
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
  mounted() {
    this.setData();
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
      let borderedSections = document.querySelectorAll('.tree-nav .sections.bordered');
      borderedSections.forEach(el => {
        el.classList.remove('bordered');
      });
      let lastExpandedSection = document.querySelectorAll('.tree-nav li.subnav-active > .sections');
      if (lastExpandedSection.length) {
        _.forEach(lastExpandedSection, (sec) => {
          sec.classList.add('bordered');
        });
      }
    },
    isCurrentPage(link) {
      return link == window.location.pathname;
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

<style>
  .slide-fade-enter-active {
    transition: all 0.8s ease;
  }

  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    opacity: 0;
  }
</style>
