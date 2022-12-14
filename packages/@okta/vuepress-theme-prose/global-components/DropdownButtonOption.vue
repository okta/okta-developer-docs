<template>
  <div class="dropdown-button-option-value">
    <a :href="href">
      <slot />
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
