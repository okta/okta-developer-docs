<template>
<ul class="menu--items menu--submenu-selected" v-if="item">
  <DocsMenuItem
    v-for="link in [item]"
    :key="link.title"
    :link="link"
  />
</ul>
</template>

<script>
  export default {
    name: "SelectedSubMenu",
    components: {
      DocsMenuItem: () => import("../components/DocsMenuItem.vue"),
    },
    data() {
      return {
        item: null,
        item_parent: null
      };
    },
    methods: {
      toggleMenu: function(element) {
        //this.$parent.$emit('toggle-tree-nav', {treeNavOpen: !this.appContext.isTreeNavMobileOpen});

        items = element.subLinks;

        // if (this.isHeaderMenu()) {
          items = element.subLinks;
          
          // let headerLinks = document.querySelector('.header--links');

          
          // if (isActivated) {

            //[...headerLinks.querySelectorAll('li.open')].map(li => {console.log(this.$el); console.log(li, 'li'); li != this.$el ? li.classList.remove('open') : false;});
            //headerLinks.classList.add('menu--subsection-opened');
          // } else if (!this.$parent.sublinksExpanded) {
          //   headerLinks.classList.remove('menu--subsection-opened');
          // }
        // }
      },
    }
  }
</script>
