<template>
  <div 
    v-if="!isDismissed" 
    ref="headerBanner"
    class="header-banner"
  >
    <div class="header-banner-content">
      <slot />
    </div>
    <button 
      v-if="dismissible" 
      class="dismiss-btn" 
      @click="dismissBanner"
    >
      <img
        src="/img/icons/icon--x.svg" 
        alt="close" 
      >
    </button>
  </div>
</template>

<script>
import storage from "../util/localStorage";

export default {
  name: "HeaderBanner",
  props: {
    dismissible: {
      type: Boolean,
      default: false,
    },
    bannerId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isDismissed: false,
      darkMode: false,
    };
  },
  mounted() {
    this.checkDismissal();

    this.$nextTick(() => {
      setTimeout(() => {
        this.$emit("updateHeight")
      }, 400)
    })
  },
  methods: {
    dismissBanner() {
      this.isDismissed = true;
      storage.setItem(`banner_dismissed_${this.bannerId}`, "true");
      this.$emit("updateHeight")
    },
    checkDismissal() {
      if (this.dismissible) {
        this.isDismissed =
          storage.getItem(`banner_dismissed_${this.bannerId}`) === "true";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.header-banner {
  position: relative;
  
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 12px;

  padding: 10px 50px;
  
  background: linear-gradient(90deg, #1a31a9 -26.4%,#3f66e4 58.74%,#b6caff 143.88%);

  color: #ffffff;
  
  transition: background-color 0.3s;

  @media screen and (max-width: 1440px) {
    padding: 10px 35px;
  }

  @media screen and (max-width: 1024px) {
    padding: 10px 20px;
  }
}

body.dark-theme .header-banner {
  background: linear-gradient(90deg, #202725 0%, #4cb7a3 98.5%);
}

.header-banner-content {
  flex-grow: 1;

  font-weight: 400;
  font-size: 14px;

  p {
    font-size: 14px;
  }

  a {
    font-weight: 500;
    text-decoration: underline;
    text-wrap: nowrap;
    color: #ffffff;
  }
}

.dismiss-btn {
  flex-shrink: 0;
  padding: 0;

  border: none;
  background: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
}
</style>
