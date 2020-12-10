<template>
  <div :class="{'dropdown-button': true, 'dropdown-button-expanded': isExpanded}" @click="isExpanded = !isExpanded">
    <div class='Button--blueDarkOutline' data-proofer-ignore>
      <span>
        {{caption}}
      </span>
      <span class="caret">◥◤</span>
    </div>
    <div class="dropdown-button-options">
      <slot>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DropdownButton',
  props: {
      caption: {
        type: String,
        required: true
      }
  },
  data() {
    return {
      isExpanded: false,
    }
  }
}
</script>
