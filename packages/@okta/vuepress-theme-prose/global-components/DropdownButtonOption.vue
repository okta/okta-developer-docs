<template>
  <div class='dropdown-button-option-value'>
  <a href="/">
    <slot></slot>
  </a>
  </div>
</template>
<script>
export default {
  name: 'DropdownButtonOption',
  props: {
    href: {
      type: String,
      required: true
    }
  }
}
</script>