<template>
  <ul :class="['menu--items', 'menu--mobile', {'expanded': title_element && title_element.isOpened}]">
    <DocsMenuItem
      v-if="title_element" 
      :key="title_element.title"
      :link="title_element"
      :is-opened="title_element && title_element.isOpened"
    />

    <DocsMenuItem
      v-for="(link, index) in list"
      :key="index"
      :link="link"
    />
  </ul>
</template>

<script>

export default {
  components: {
    DocsMenuItem: () => import("../components/DocsMenuItem.vue"),
  },
  inject: ['appContext'],
  data() {
    return {
      'list': [],
      'title_element': null,
      'navigation': null,
      'link_id': 0,
      'parent': null,
    }
  },
  watch: {
    $route(to, from) {  
      if (from.path !== to.path) {
        this.navigateToSelected(to.path);
      }
    }
  },
  mounted() {
    if(!this.appContext.treeNavDocs) return;
    let navigation = this.$parent.getMenuItems();    
    navigation = navigation.concat(this.appContext.treeNavDocs);
    this.list = this.navigation = navigation.map(nav => {
      this.addIdToLink(nav, 0);
      return nav;
    });
    this.navigateToSelected(this.$page.regularPath);
  },
  methods: {
    navigateToSelected: function(path) {
        let item = this.getMenuItemByPath(path); 
        if (item) {
          item.isOpened = true;
        }
        this.handleChange(item);
    },

    // Menu item was clicked
    handleChange: function(item) {

      this.toggleLinkState(item);

      // default root states
      this.list = this.navigation;
      this.title_element = null;

      if (item && !item.isOpened) {
        // return to parent
        parent = this.getParent(item);
        
        if (parent) {
          parent.isOpened = true;
          this.list = parent.subLinks;
          this.title_element = parent;
        }
      }
      else if (item && item.subLinks) {
        // get children
        this.list = item.subLinks;
        this.title_element = item;
      }
    },

    toggleLinkState: function(item) {
      if (!item) { return; }
      item.isOpened = !item.isOpened;
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

    getMenuItemByPath: function(path, items = this.navigation ) {
      for (const link of items) {
        if (link.path && link.path === path) {
          return link;
        }

        if (link.subLinks) {
          let item = this.getMenuItemByPath(path, link.subLinks)
          if (item != null) {          
            return item;
          }
        }
      }

      return null;
    }
  }
};
</script>