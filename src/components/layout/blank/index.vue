<template>
  <div id="blank">
    <Header />
    <slot />
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/layout/blank/Header.vue'
import Footer from '@/components/layout/blank/Footer.vue'
import { isMobile } from 'mobile-device-detect';

export default {
  name: "blank",
  components: {
    Header,
    Footer,
    isMobile
  }
};
</script>