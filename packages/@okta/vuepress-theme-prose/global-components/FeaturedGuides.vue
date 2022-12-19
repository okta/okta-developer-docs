<template>
  <div class="guides--features">
    <FeaturedGuideItem
      v-for="guideName in featured"
      :key="guideName"
      :guide-name="guideName"
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