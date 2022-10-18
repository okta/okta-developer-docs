<template>
  <div class="guides--features">
    <FeaturedGuideItem 
      :guideName="guideName"
      v-for="guideName in featured" 
      :key="guideName" 
    />
  </div>
</template>

<script>
import FeaturedGuideItem from '../components/FeaturedGuideItem'
export default {
    name: 'FeaturedGuides',
    components: { 
        FeaturedGuideItem : FeaturedGuideItem 
    },
    props: [ 'featured' ],
}
</script>

<style>

</style>