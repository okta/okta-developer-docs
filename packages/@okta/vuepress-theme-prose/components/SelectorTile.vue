<template>
  <div class="selector-tile">
    <router-link
      :to="tileData.link"
      class="selector-tile--header"
    >
      <span>
        {{ tileData.name }}
      </span>
      <i class="fa fa-chevron-right" />
    </router-link>
    <div class="selector-tile--data">
      <SelectorTileItem
        v-for="item in tileData.items"
        :key="item.name"
        :tile-item="item"
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
