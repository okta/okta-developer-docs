<template>     
    <router-link :to='tileItem.link' class="selector-tile--data--item">
        <img :src="tileItem.image" />
        <span>
          {{tileItem.name}}
        </span>
        <i class="fa fa-chevron-right"></i>
    </router-link>
</template>

<script>
  export default {
    name: 'SelectorTileItem',
    props: ['tileItem'],
  }
</script>
