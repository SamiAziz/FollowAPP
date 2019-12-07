<template>
    <div>
        <main class="h-screen xl:flex-1 xl:overflow-x-hidden">
          <transition name="component-fade">
          <slot/>
          </transition>
      </main>
    </div>
</template>

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
