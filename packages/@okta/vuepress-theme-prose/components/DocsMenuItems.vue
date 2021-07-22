<template>
<ul class="menu--items menu--from-sidebar">
  
  <DocsMenuItem
    v-for="link in navigation"
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
};
</script>