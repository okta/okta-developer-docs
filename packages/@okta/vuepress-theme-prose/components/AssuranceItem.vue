<template>     
    <div class="assurance-item">
        <div class="assurance-item--rounded"> 
            <span v-bind:style="{ 'background': 'url(' + item.image + ') 50% 50% no-repeat' }"></span>
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


