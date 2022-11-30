<template>
  <ul class="menu--items menu--desktop">
    <MenuItem
      :item="item"
      :index="index"
      :itemCss="itemCss"
      :subItemCss="subItemCss"
      v-for="(item, index) in items"
      :key="index"
    />
  </ul>
</template>

<script>
  export default {
    components: {
      MenuItem: () => import('./MenuItem.vue')
    },
    props: {
      items: {
        type: Array,
        default: () => []
      },
      itemCss: {
        type: String,
        default: ''
      },
      subItemCss: {
        type: String,
        default: ''
      },
    },
  }
</script>

