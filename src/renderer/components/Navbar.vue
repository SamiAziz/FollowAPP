<template>
<header class="bg-gray-900 sm:flex sm:items-center sm:justify-between xl:bg-white">
    <div style="width: 13.58rem;" class="flex justify-between px-4 py-3 xl:bg-gray-900 xl:justify-center xl:py-5">
      <div>
        <h1 class="text-2xl text-gray-500">برنامج المتابعة</h1>
</div>
    </div>
    <nav class="sm:flex sm:items-center sm:px-4 xl:flex-1 xl:justify-between block">
      <transition name="component-fade" mode="out-in">
      <div class="hidden xl:block xl:relative xl:max-w-xs xl:w-full">
         
        <div class="absolute inset-y-0 right-0 flex items-center pl-3">
         
<h1 class="text-gray-900 text-3xl font-semibold">{{ this.pageTitle }}</h1>
         
        </div>
         
      </div>
      </transition>
      <div class="sm:flex sm:items-center">
        <div class="px-2 pt-2 pb-5 border-b border-gray-800 sm:flex sm:border-b-0 sm:py-0 sm:px-0">
          <a href="#" @click="goA4" class="tooltip block px-3 py-1 rounded text-white sm:mt-0 sm:text-base sm:px-2 sm:ml-2 xl:text-gray-900">
            <span class="badge"></span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-gray-500 h-6 w-6"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span class="tooltiptext-p2">الإشعارات</span>
          </a>
          <a href="#" class="tooltip mt-1 block px-3 py-1 rounded text-white sm:mt-0 sm:text-base sm:px-2 sm:ml-2 xl:text-gray-900">
            <span class="badge"></span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-gray-500 h-6 w-6"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12" y2="17"></line></svg>
            <span class="tooltiptext">المشاكل</span>
          </a>
        </div>
        <div class="sm:py-0 sm:px-0">
          <div class="flex items-center rounded-full w-full py-2 px-1">
            <span class="ml-1 text-xs w-full font-semibold text-teal-500 rounded-full py-2 px-4 bg-gray-200">{{ this.user }}</span>
          </div>
        </div>
         <div class="sm:flex sm:items-center ml-8">
                     <a href="#" @click="logout" class="tooltip mt-1 block px-3 py-1 rounded text-white sm:mt-0 sm:text-base sm:px-2 sm:ml-2 xl:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-red-500 h-6 w-6"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
            <span class="tooltiptext">تسجيل الخروج</span>
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return{

    }
  },
  computed: {
    pageTitle() {
      return this.$store.state.pageTitle
    },
    user() {
      return localStorage.getItem('user')
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user-id')
      localStorage.removeItem('user')
      localStorage.removeItem('userName')
      localStorage.removeItem('userRole')
      localStorage.removeItem('user-token')
      this.$router.push('/Login')
    },
    goA4() {
      this.$router.push('/a4')
    }
  }
}
</script>


<style scoped>
  .badge {
    background-color:#F6AD55;
    color: #FFFFFF;
    border: 1px solid#F6AD55;
    border-radius: 8px;
    position: absolute;
    width: 8px;
    height: 8px;
    top: 0px;
  }

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.tooltip {
  position: relative;
  display: inline-block;
   /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: auto;
  background-color: #2D3748;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  font-size: 12px;
    opacity: 0;
    padding: 5px;
  transition: opacity 1s;
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Tooltip text */
.tooltip .tooltiptext-p2 {
  visibility: hidden;
  width: auto;
  background-color: #2D3748;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  font-size: 12px;
    opacity: 0;
    padding: 5px;
  transition: opacity 1s;
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
    width: auto;
  top: 100%;
  left: 50%; 
  margin-top: 10px;
   opacity: 1;
  margin-left: -25px; /* Use half of the width (120/2 = 60), to center the tooltip */
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext-p2 {
  visibility: visible;
    width: auto;
  top: 100%;
  left: 50%; 
  margin-top: 10px;
   opacity: 1;
  margin-left: -30px; /* Use half of the width (120/2 = 60), to center the tooltip */
}

.tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  bottom: 100%;  /* At the top of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #2D3748 transparent;
}

.tooltip .tooltiptext-p2::after {
  content: " ";
  position: absolute;
  bottom: 100%;  /* At the top of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #2D3748 transparent;
}
</style>
