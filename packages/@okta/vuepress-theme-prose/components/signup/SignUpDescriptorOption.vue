<template>
  <button
    type="button"
    class="signup-descriptor"
    :class="{ 'signup-descriptor--selected': isSelected }"
    @click="$emit('select', value)"
  >
    <span class="signup-descriptor__label">{{ label }}</span>
    <span
      class="signup-descriptor__info"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="8"
          cy="8"
          r="7"
          stroke="currentColor"
          stroke-width="1.2"
        />
        <path
          d="M7.36 6.64h1.28v4.48H7.36V6.64zM7.36 4.88h1.28v1.28H7.36V4.88z"
          fill="currentColor"
        />
      </svg>
      <span
        v-if="showTooltip && tooltip"
        class="signup-descriptor__tooltip"
      >{{ tooltip }}</span>
    </span>
  </button>
</template>

<script>
export default {
  name: "SignUpDescriptorOption",
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    tooltip: {
      type: String,
      default: "",
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showTooltip: false,
    };
  },
};
</script>
