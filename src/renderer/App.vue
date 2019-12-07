<!--
<template>
  <div id="app" class="min-h-screen bg-gray-200 antialiased xl:flex xl:flex-col xl:h-screen" style="direction: rtl;">
    <Navbar class="xl:flex-shrink-0 shadow-lg" style="z-index: 999;"/>
    <div class="xl:flex-1 xl:flex xl:overflow-y-hidden">
      <Sidebar class="shadow"/>
      <main class="py-6 xl:flex-1 xl:overflow-x-hidden">
        <transition name="slide-fade"  mode="out-in">
          <router-view/>
        </transition>
      </main>
    </div>
  </div>
</template>
-->

<template>
  <div id="app" class="min-h-screen bg-gray-200 antialiased xl:flex xl:flex-col xl:h-screen" style="direction: rtl;">
    <component :is="layout">
      <transition name="slide-fade"  mode="out-in">
      <router-view/>
      </transition>
    </component>
  </div>
</template>

<script>

const default_layout = "default";

export default {
  name: "fllowup1",
    computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  },
  created() {
    // nothing defined here (when this.$route.path is other than "/")
    console.log(this.$route, this.$route.meta.layout);
  },
  updated() {
    // something defined here whatever the this.$route.path
    console.log(this.$route, this.$route.meta.layout);
  }
};
</script>

<style>
/* CSS */
html {
  background: #f7fafc;
}

button:focus {outline:0;}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>