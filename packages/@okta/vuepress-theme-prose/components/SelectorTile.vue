<template>
  <div class="selector-tile">
    <router-link
      :to="tileData.link"
      class="selector-tile--header"
    >
      <span>
        {{ tileData.name }}
      </span>
      <i class="fa fa-chevron-right"></i>
    </router-link>
    <div class="selector-tile--data">
      <SelectorTileItem
        :tileItem="item"
        v-for="item in tileData.items"
        :key="item.name"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SelectorTile',
    components: {
      SelectorTileItem: () => import('../components/SelectorTileItem.vue'),
    },
    props: ['tileData']
  }
</script>
