<template>
  <div class="header--links">
    
    <MenuItems
      :items="$themeConfig.primary_left_nav"
      :itemCss="'link link--small link--semi-bold'"
      :subItemCss="'link link--small link--semi-bold link--black'"
    />
    <MenuItems
      :items="$themeConfig.primary_right_nav"
      :itemCss="'link link--small link--semi-bold'"
      :subItemCss="'link link--small link--semi-bold link--black'"
    />

    <DocsMenuItems />
  </div>
</template>

<script>
  
  export default {
    name: "HeaderMenu",
    components: {
      MenuItems: () => import("../components/MenuItems.vue"),
      MenuItem: () => import("../components/MenuItem.vue"),
      DocsMenuItems: () => import("../components/DocsMenuItems.vue"),
    },
    data() {
      return {
        'menu': []
      }
    },
    methods: {
      getMenuItems: function() {
        this.menu = [];
        this.menu = this.menu.concat(
          this.$themeConfig.primary_left_nav,
          this.$themeConfig.primary_right_nav
        );
     
        this.menu = this.updateMenuProps(this.menu);
        
        return this.menu;
      },
      updateMenuProps: function(menu) {
        menu.map(function update(el) {

          if (Array.isArray(el)) {
            el.map(update);
            return;
          }

          if (el.text) {
            el.title = el.text;
            el.path = el.link;        
          }

          if (el.children) {
            el.subLinks = el.children;
            el.subLinks.map(update);
          }

          return el;     
        });
        return menu;
      },
    }
  }
</script>
