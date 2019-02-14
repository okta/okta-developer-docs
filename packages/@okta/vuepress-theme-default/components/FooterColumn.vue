<template>

  <div class="Column--3 Column--medium-12 Column--xSmall-12">

    <h4
      v-if="heading"
      v-html="heading"></h4>

    <ul class="Footer-links">

      <MenuItem
        v-for="(item, index) in menu"
        :key="index"
        :item="item"
        :index="index"
        :last="menu.length"></MenuItem>

    </ul>

  </div>

</template>

<style lang="scss">

</style>

<script>

  export default {

    components: {
      MenuItem: () => import('./MenuItem.vue')
    },

    props: {

      heading: {
        type: String,
        default: ''
      },

      menu: {
        type: Array,
        default: () => []
      },

    },

    data() {

      return {
        menu_items: null
      }

    },

  }

</script>

