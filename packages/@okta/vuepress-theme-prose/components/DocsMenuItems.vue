<template>
<ul :class="['menu--items', 'menu--from-sidebar', {'expanded': title_element && title_element.isOpened}]">
  
  <DocsMenuItem
    v-if="title_element" 
    :link="title_element"
    :key="title_element.title"
    :isOpened="title_element.isOpened"
  />

  <DocsMenuItem
    v-for="link in list"
    :key="link.title"
    :link="link"
  />
</ul>
</template>

<script>
import SidebarItems from "../mixins/SidebarItems";

export default {
  mixins: [SidebarItems],
  components: {
    DocsMenuItem: () => import("../components/DocsMenuItem.vue"),
  },
  data() {
    return {
      'list': [],
      'title_element': null,
      'navigation': null,
      'link_id': 0,
      'parent': null,
    }
  },
  mounted() {
    this.list = this.navigation = this.getNavigation().map(nav => {
      if (nav.path === "/") {
        return false;
      }
      this.addIdToLink(nav, 0);
      return nav;
    });
  },
  methods: {
    handleChange: function(item) {

      this.toggleLinkState(item);

      // default root states
      this.list = this.navigation;
      this.title_element = null;

      if (!item.isOpened) {
        // return to parent
        parent = this.getParent(item);
        
        if (parent) {
          this.list = parent.subLinks;
          this.title_element = parent;
        }
      }
      else if (item.subLinks) {
        // get children
        this.list = item.subLinks;
        this.title_element = item;
      }
    },
    toggleLinkState: function(item) {
      item.isOpened = !Boolean(item.isOpened);
    },
    addIdToLink(link, parent_id = 0) {
      this.link_id ++;
      link.id = this.link_id;
      link.parent_id = parent_id;

      if (link.subLinks) {
        for (const subLink of link.subLinks) {
          this.addIdToLink(subLink, link.id);
        }
      }
    },
    getParent: function(item) {
      this.parent = null;
      for (const link of this.navigation) {
        if (!this.parent) {
          this.checkIfParent(link, item);
        }
      }

      return this.parent;
    },
    checkIfParent: function(el, child) {
      if (this.parent || child.parent_id == 0) { 
        return false;
      }

      if (el.id === child.parent_id) {
        this.parent = el;
        return false;
      }

      if (el.subLinks) {
        for (const sublink of el.subLinks) {
          this.checkIfParent(sublink, child);
        }
      }
    },
  }
};
</script>