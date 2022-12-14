<template>
  <StackSelector
    no-selector
    :snippet="snippet"
    :inline="inline"
  />
</template>

<script>
  export default {
    name: 'StackSnippet',
    props: {
      snippet: {
        type: String,
        required: true,
      },
      inline: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>
