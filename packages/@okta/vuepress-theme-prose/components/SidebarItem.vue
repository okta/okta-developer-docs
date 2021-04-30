<template>
  <li :class="{ subnav: link.subLinks, hidden: hidden }">
    <div class="link-wrap">
        <router-link
          v-if="link.path"
          :to="link.path"
          v-slot="{ route, href, navigate }"
          class="tree-nav-link"
        >
          <a
            :href="href"
            @click="navigate"
            :class="route.path === $route.path ? 'router-link-active' : ''"
            :aria-current="route.path === $route.path && 'page'"
            ><slot>{{ link.title }}</slot></a
          >
        </router-link>

        <div
          v-else
          :class="{
            'is-link': true,
            'item-collapsable': true,
            'children-active': link.iHaveChildrenActive
          }"
          @click="toggleExpanded"
        >
          <i :class="{
            'fa': true,
            'fa-chevron-right': link.subLinks && !sublinksExpanded,
            'fa-chevron-down': link.subLinks && sublinksExpanded,
             }"></i>
          {{ link.title }}
        </div>
      </div>

    <ul v-if="link.subLinks" class="sections" v-show="sublinksExpanded">
      <SidebarItem
        v-for="sublink in link.subLinks"
        :key="sublink.title"
        :link="sublink"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: "SidebarItem",
  props: ["link"],
  inject: ["appContext"],
  components: {
    SidebarItem: () => import("../components/SidebarItem.vue")
  },
  data() {
    return {
      sublinksExpanded: false,
      hidden: !!this.link.hidden
    };
  },
  mounted() {
    this.setData();
  },

  watch: {
    link() {
      this.setData();
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
    toggleExpanded() {
      this.sublinksExpanded = !this.sublinksExpanded;
    },
    setData: function() {
      this.sublinksExpanded = Boolean(this.link.iHaveChildrenActive);
    }
  }
};
</script>
