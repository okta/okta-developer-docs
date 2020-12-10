<template>
  <div class="selector-tile">
      <router-link :to='tileData.categoryLink' class="selector-tile--header">
        <span>
          {{tileData.name}}
        </span>
        <i class="fa fa-chevron-right"></i>
      </router-link>
   <div class="selector-tile--data">
      <SelectorTileItem v-for="item in tileData.items" :key="item.name" :tileItem="item" />
   </div>
  </div>
</template>

<script>
  export default {
    name: 'SelectorTile',
    props: ['tileData'],
    components: {
      SelectorTileItem: () => import('../components/SelectorTileItem.vue'),
    }
  }
</script>
