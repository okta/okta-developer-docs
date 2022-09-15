<template>
  <span class="tag dont-break-out">
    {{ text }}
  </span>
</template>

<script>
  export default {
    name: "Tag",
    props: {
      text: {
        type: String,
        required: true,
      },
    },
  }
</script>
