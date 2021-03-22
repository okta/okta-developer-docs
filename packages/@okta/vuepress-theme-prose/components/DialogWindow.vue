<template>
  <portal to="dialog-wrapper">
    <div class="dialog-backdrop">
      <div class="dialog-container">
        <div class="dialog">
          <div class="dialog--header">{{ title }}</div>
          <div class="dialog--body"><slot></slot></div>
          <div class="dialog--footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
const ESC = 27;

export default {
  props: {
    title: {
      required: true,
      type: String
    }
  },
  created() {
    document.addEventListener("keyup", this.onKeyUpHandler);
  },
  destroyed() {
    document.removeEventListener("keyup", this.onKeyUpHandler);
  },
  methods: {
    onKeyUpHandler(e) {
      if (e.keyCode === ESC) {
        this.handleClose();
      }
    },
    handleClose() {
      this.$emit("close");
    }
  }
};
</script>
