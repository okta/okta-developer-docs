<template>
  <li :class="{'link-wrap': true, 'subnav-active': link.iHaveChildrenActive, hidden: hidden }">
    <router-link
          v-if="entityType === types.link"
          :to="link.path"
          v-slot="{ route, href, navigate }"
          class="tree-nav-link"
        >
          <a
            :href="href"
            @click="navigate"
            :class="route.path === $route.path ? 'router-link-active' : ''"
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
            'fa': true,
            'fa-chevron-right': link.subLinks && !sublinksExpanded,
            'fa-chevron-down': link.subLinks && sublinksExpanded,
             }"></i>
          <span class="text-holder">
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