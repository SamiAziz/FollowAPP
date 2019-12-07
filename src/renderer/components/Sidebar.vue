<template>
  <section class="bg-gray-800 xl:w-72" style="width: 217px;">
<div v-for="item in menuItems"  :key="item.title" :class="currentPageName === item.desc ? 'sidenavactive' : 'sidenav'">
  <div v-if="userRole == 'مشرف'">
  <a @click="toPage(item.link, item.desc)">
<svg v-if="item.title == 'Home'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: auto;" class="stroke-current text-teal-500 block h-8 w-8 pb-10"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
<svg v-else-if="item.title == 'Statistics'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: auto;" class="stroke-current text-teal-500 block h-8 w-8 pb-10"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
<svg v-else-if="item.title == 'Sittengs'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: auto;" class="stroke-current text-teal-500 block h-8 w-8 pb-10"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        {{ item.text }}
  </a>
  </div>
    <div v-else>
  <div v-if="item.title == 'Sittengs'">

  </div>
    <a v-else @click="toPage(item.link, item.desc)">
<svg v-if="item.title == 'Home'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: auto;" class="stroke-current text-teal-500 block h-8 w-8 pb-10"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
<svg v-else-if="item.title == 'Statistics'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: auto;" class="stroke-current text-teal-500 block h-8 w-8 pb-10"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
<svg v-else-if="item.title == 'Sittengs'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: auto;" class="stroke-current text-teal-500 block h-8 w-8 pb-10"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        {{ item.text }}
  </a>
  </div>
</div>
      <div class="text-gray-300 px-3 py-4 text-right" style="bottom: 60px !important; position: fixed; width: inherit;">
          <a class="inline-flex px-3 py-1 mb-2 rounded text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-gray-300 mt-1 ml-2 h-4 w-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
           <span class="pl-3">الوقت:</span>
            {{ currentTime }}
          </a>
          <a class="inline-flex px-3 py-1 rounded text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-gray-300 mt-1 ml-2 h-4 w-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span class="pl-3">التاريخ:</span>
           {{ currentDate }}   هـ
          </a>
      </div>
      <div class="bg-gray-900 px-4 py-4 sm:text-right" style="bottom: 0 !important; position: fixed; width: inherit;">
          <p class="text-center text-gray-500 text-xs">
    FllowApp - V 1.0.0
  </p>
      </div>
  </section>
</template>

<script>
var moment = require('moment-hijri');
import { METHODS } from "http";
export default {
  data() {
    return {
      currentPage: "Home",
      currentTime: null,
      currentDate: null,
      menuItems: [
        {
          icon: "supervisor_account",
          title: "Home",
          text: "الرئيسية",
          name: "home-page",
          desc: "متابعة المعاملات",
          link: "/Income",
          svg:
            '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path> <polyline points="9 22 9 12 15 12 15 22"></polyline>'
        },
        {
          icon: "person",
          title: "Outgoing",
          text: "الإحالات",
          name: "outgoing-page",
          desc: "متابعة إحالات المعاملات",
          link: "/Assignments",
          svg:
            '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path> <polyline points="17 8 12 3 7 8"></polyline> <line x1="12" y1="3" x2="12" y2="15"></line>'
        },
        {
          icon: "lock_open",
          title: "Statistics",
          text: "الإحصائيات",
          name: "statistics-page",
          desc: "الإحصائيات",
          link: "/Statistics",
          svg:
            '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path> <path d="M22 12A10 10 0 0 0 12 2v10z"></path>'
        },
        {
          title: "Sittengs",
          text: "الإعدادات",
          name: "settings-page",
          desc: "الإعدادات",
          link: "/Settings",
          svg:
            '<circle cx="12" cy="12" r="3"></circle> <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>'
        }
      ]
    };
  },
  computed: { // Router PROPS
    currentPageName() {
      return this.$store.state.currentPage
    },    
    pageTitle() {
      return this.$store.state.pageTitle
    },
    userRole() {
      return localStorage.getItem('userRole')
    }
  },
  methods: {
    toPage(pageName, title) {
      this.$router.push(pageName)
      this.currentPage = title
      this.$store.dispatch("setPageTitle", title)
      console.log(this.$store.state.currentPage)
    },
    updateCurrentTime() {
      this.currentTime = moment().format('LT'+'  A   ');
    },
    updateCurrentDate() {
      this.currentDate = moment().format('iYYYY/iM/iD');
    }
  },
  created() {
    this.currentTime = moment().format('LT'+'  A   ');
    this.currentDate = moment().format('iYYYY/iM/iD');
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
    setInterval(() => this.updateCurrentDate(), 1 * 50000);
  }
}
</script>

<style>
ul {
  padding: 0;
  margin: 0;
  text-align: center;
  vertical-align: middle;
}

li {
  padding: 24px 6px;
  cursor: pointer;
}


.sidenav a {
  padding: 20px;
  text-decoration: none;
  text-align: center;
  font-size: 18px;
  color: #FFFFFF;
  display: block;
  transition: 0.3s;
  cursor: pointer;
}

.sidenav a:hover {
  color: #f1f1f1;
  background-color: #1A202C;
  transition: 0.3s;
}

.sidenavactive a {
    padding: 20px;
  text-decoration: none;
  text-align: center;
  font-size: 18px;
  display: block;
  transition: 0.3s;
  color: #f1f1f1;
  background-color: #1A202C;
  border-right: 1px solid #553C9A; 
  cursor: default;
}
</style>
