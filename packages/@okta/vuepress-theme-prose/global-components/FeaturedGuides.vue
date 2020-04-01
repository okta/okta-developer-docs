<template>
  <div class="guides--features">
    <FeaturedGuideItem :key="guideName" v-for="guideName in featured" :guideName="guideName"/>
  </div>
</template>

<script>
import FeaturedGuideItem from '../components/FeaturedGuideItem'
export default {
    name: 'FeaturedGuides',
    props: [ 'featured' ],
    components: { 
        FeaturedGuideItem : FeaturedGuideItem 
    },
}
</script>

<style>

</style>