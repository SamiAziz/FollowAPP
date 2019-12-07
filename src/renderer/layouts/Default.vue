<template>
<div class="min-h-screen bg-gray-200 antialiased xl:flex xl:flex-col xl:h-screen">
    <Navbar class="xl:flex-shrink-0 shadow-lg" style="z-index: 999;"/>
    <div class="xl:flex-1 xl:flex xl:overflow-y-hidden">
      <Sidebar class="shadow h-full"/>
      <main class="py-6 xl:flex-1 xl:overflow-x-hidden">
        <transition name="component-fade" mode="out-in">
          <slot/>
        </transition>
      </main>
    </div>
</div>
</template>

<script>
import Navbar from "@/components/Navbar"; // Top nav
import Sidebar from "@/components/Sidebar";

export default {
      components: {
    Navbar,
    Sidebar
  }
}
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
