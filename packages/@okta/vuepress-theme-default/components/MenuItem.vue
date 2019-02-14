<template>

  <li
    :class="{
      'first': (index == 0),
      'leaf': (index == last),
      'expanded': (item.children && item.children.length)
    }">

    <a
      :href="item.link"
      :class="('label ' + item.css)"
      :target="item.target"
      v-html="item.text"></a>

    <ul
      class="menu"
      v-if="item.children && item.children.length">

      <MenuItem
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        :index="index"
        :last="item.children.length"></MenuItem>

    </ul>

  </li>

</template>

<script>


export default {

  components: {
    MenuItem: () => import('./MenuItem.vue')
  },

  props: {

    index: {
      type: Number,
      default: 0
    },

    last: {
      type: Number,
      default: 0,
    },

    item: {
      type: Object,
      default: () => {}
    },

    css: {
      type: String,
      default: ''
    }

  },

}

</script>

