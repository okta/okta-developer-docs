<template>
  <ul class="menu--items">
    <MenuItem
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      :index="index"
      :itemCss="itemCss"
      :subItemCss="subItemCss"
      ></MenuItem>
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
      }
    },
  }
</script>

