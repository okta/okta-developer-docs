<template>
  <div class="header-nav">
    <HeaderNavItem
      :link="link"
      v-for="link in appContext.treeNavDocs"
      :key="link.title"
    />
  </div>
</template>

<script>

export default {
  name: "HeaderNav",
  components: {
    HeaderNavItem: () => import("../components/HeaderNavItem.vue")
  },
  inject: ["appContext"]
}
</script>
