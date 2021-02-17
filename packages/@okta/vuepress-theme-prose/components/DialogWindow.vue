<template>
  <portal to="dialog-wrapper">
    <div class="dialog-container">
      <div class="dialog">
        <div class="dailog--header">{{ title }}</div>
        <div class="dialog--body"><slot></slot></div>
        <div class="dialog--footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    }
  },
  created() {
    document.addEventListener("keyup", this.onClose);
  },
  destroyed() {
    document.removeEventListener("keyup", this.onClose);
  },
  methods: {
    onClose(e) {
      if (e.keyCode === 27) {
        this.handleClose();
      }
    },
    handleClose() {
      this.$emit("close");
    }
  }
};
</script>
