<template>     
    <div class="assurance-item">
        <div class="assurance-item--rounded"> 
            <img :src="item.image"/>
        </div>
        <div class="assurance-item--content">
            <div class="assurance-item--content--title">
              {{item.title}}
            </div>
            <div class="assurance-item--content--description">
              {{item.description}}
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'AssuranceItem',
    props: ['item'],
  }
</script>


