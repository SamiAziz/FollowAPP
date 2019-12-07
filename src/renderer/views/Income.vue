<template>
  <div class="px-8 pb-3">
      <transition name="slide-fade">
<div v-if="msg.alertShow" :class="msg.alertType == 'success' ? 'z-20 absolute bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded w-auto ml-3 -mt-5 mr-56 shadow-lg': 'z-20 absolute bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-auto ml-3 -mt-5 shadow-lg'" role="alert">
    <strong class="font-bold pr-6">{{ msg.alertTitle }}</strong>
    <span class="absolute top-0 bottom-0 right-0 px-4 py-4">
        <svg v-if="msg.alertType == 'success'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-green-500 h-5 w-5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>  
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-red-500 h-5 w-5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>  
    </span>
</div>
      </transition>
  <div class="flex justify-between">
  <div class="text-gray-700 text-center px-4 py-2 m-2 flex justify-between">
    <a href="#" @click="changeView('all') " class="block pl-3 py-1 sm:text-base sm:px-2 ml-4" :class="this.currentView == 'all' ? 'xl:text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 xl:hover:gray-400 hover:bg-gray-300' ">الكل</a>
    <a href="#" @click="changeView('in') " class="block pl-3 py-1 sm:text-base sm:px-2 ml-4" :class="this.currentView == 'in' ? 'xl:text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 xl:hover:gray-400 hover:bg-gray-300' ">الوارد</a>
    <a href="#" @click="changeView('out') " class="block pl-3 py-1 sm:text-base sm:px-2 ml-4" :class="this.currentView == 'out' ? 'xl:text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 xl:hover:gray-400 hover:bg-gray-300' ">الصادر</a>
  </div>

<div v-if="this.showSearchBar" class="text-gray-700 text-center px-4 py-2 m-2 flex justify-between w-full">
      <div class="hidden xl:block xl:relative xl:max-w-xs xl:w-full">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg class="h-6 w-6 fill-current text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.32 14.9l1.1 1.1c.4-.02.83.13 1.14.44l3 3a1.5 1.5 0 0 1-2.12 2.12l-3-3a1.5 1.5 0 0 1-.44-1.14l-1.1-1.1a8 8 0 1 1 1.41-1.41l.01-.01zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
        </div>
        <input type="text" v-model="searchInput" class="block w-full border border-gray-300 bg-white focus:outline-none focus:bg-white focus:border-gray-300 text-gray-900 rounded-lg pl-3 pr-4 py-1" placeholder="بالباركود أو رقم المعاملة أو موضوعها">
      </div>
      </div>

  <div class="text-gray-700 text-center px-4 py-2 m-2 flex justify-between">
            <a v-if="this.showSearchBar" @click="hideSearch" href="#" class="tooltip block pt-2 rounded shadow bg-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-600 xl:hover:bg-white ml-3">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="storke-current w-5 h-5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
<span class="tooltiptext">إغلاق البحث</span>
        </a>
        <a v-else @click="showSearch" href="#" class="tooltip block pt-2 rounded shadow bg-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-600 xl:hover:bg-white ml-3">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="storke-current w-5 h-5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
       <span class="tooltiptext">البحث</span>
        </a>

        <a @click="handlePrint" href="#" class="tooltip block pt-2 rounded shadow bg-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-600 xl:hover:bg-white ml-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="storke-current w-5 h-5"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
        <span class="tooltiptext">الطباعة</span>
        </a>

        <a @click="openFiltersModal" href="#" class="tooltip block pt-2 rounded shadow bg-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-600 xl:hover:bg-white ml-3">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="storke-current w-5 h-5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>        
<span class="tooltiptext">الفرز</span>
</a>
  </div>
</div>

    <div class="flex mb-5 border-b border-gray-300"></div>

    <div class="flex justify-between bg-gray-200">
  <div>
          <button @click="test()" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 mb-4 mr-6 rounded inline-flex items-center">
  <svg class="stroke-current text-gray-800 inline-block h-5 w-5 mb-1 ml-2 pt-1"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  <span>إضافة معاملة</span>
</button>
  </div>

  <div>
    <div v-if="this.filters.length > 0" class="text-right lg:px-4 inline-flex">
  <div class="p-2 bg-teal-800 items-center text-teal-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
    <a @click="clearFilters()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current opacity-75 h-5 w-5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></a>
    <span class="font-semibold text-sm mr-2 text-left flex-auto">عناصر الفرز:  </span>
    <div v-for="arg in this.filters" :key="arg.index">
    <span v-if="arg.checked == true" class="flex rounded-full bg-teal-500 uppercase px-2 py-1 text-xs font-bold mr-3">{{ arg.filter }}</span>
  </div>
  </div>
</div>
  </div>
  <div class="flex ml-6 text-center">
    <div class="flex-2 pt-2">
      <label for="grid-state">
      عدد المعاملات لكل صفحة
      </label>
          </div>
      <div class="flex-1 text-center">
        <select class="bg-gray-300 h-10 text-gray-800 mr-6 rounded inline-flex items-center text-center" id="grid-state" @input="cheangeViewSize">
          <option value=5>5</option>
          <option value=10>10</option>
          <option value=50>50</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
  </div>
</div>



    <div class="rounded overflow-hidden rounded-lg shadow-xl bg-white mx-6">

          <div class="flex justify-between content-center">
  <div class="pl-2">

  <modal v-if="showModal" @close="showModal = false" />
  <taskModal v-if="taskModalStatus" @close="taskModalStatus = false" />
  <FiltersModal v-if="filtersModalStatus" @close="filtersModalStatus = false" />
  </div>
</div>
        
  <Pagination v-if="getLetters && afterFilters.length == 0 && !search && afterChangeView.length == 0" :list-data="getLetters"  :pageNumber="0" :size="pageSize"/>
  <Pagination v-else-if="search" :list-data="search" :pageNumber="0"/>
  <Pagination v-else-if="afterChangeView && afterFilters.length == 0" :list-data="afterChangeView" :pageNumber="0" :size="pageSize"/>
  <Pagination v-else-if="afterFilters || (afterFilters && afterChangeView !== 'all')" :list-data="afterFilters" :pageNumber="0" :size="pageSize"/>

    </div>
  </div>
</template>

<script>
const { remote } = require('electron');
const { BrowserWindow, dialog, shell, app } = remote;
import { mapState } from "vuex"
import modal from '@/components/Modal'
import FiltersModal from '@/components/FiltersModal'
import Pagination from '@/components/LettersPagination'
import taskModal from '@/components/taskModal'
import {
  GetTask,
  GetTasks,
  GetUsers,
  GetLetters,
  CreateUser,
  DeleteUser,
  UpdateUser,
  CreateLetter,
  UpdateLetter
} from "../constants/query.gql";

export default {
  name: "home-page",
  data() {
      return {
          showModal: false,
          taskModalStatus: false,
          filtersModalStatus: false,
          showSearchBar: false,
          currentTask: '',
          searchInput: '',
          pageNumber: 0,
          filterArgs: [],
          currentView: 'all',
      }
  },
  computed: {
    filters() {
      return this.$store.state.filterSet
    },
    afterFilters() {

    if (this.currentView !== 'all') {
          var out = []
    const filters = this.$store.state.filterSet
     const letters = this.afterChangeView
         for (var j = 0, jlen = filters.length; j < jlen; j++) {
      //console.log(filters[j].dataName)
      if (filters[j].checked == true) {
          for (var i = 0, len = letters.length; i < len; i++) {
            var par = filters[j].dataName
            
            var rap = letters[i]
            for (let [key, value] of Object.entries(rap)) {
  //console.log(`${key}: ${value}`);

            console.log('COMPARE: '+JSON.stringify(rap)+'  WITH  '+filters[j].filter+' is it clear  '+par)
            if (key == par && value == filters[j].filter ) out.push(letters[i]);
          }
          }
      }
    }
    }
    else  {
          var out = []
    const filters = this.$store.state.filterSet
      const letters = this.getLetters
    for (var j = 0, jlen = filters.length; j < jlen; j++) {
      //console.log(filters[j].dataName)
      if (filters[j].checked == true) {
          for (var i = 0, len = letters.length; i < len; i++) {
            var par = filters[j].dataName
            
            var rap = letters[i]
            for (let [key, value] of Object.entries(rap)) {
  //console.log(`${key}: ${value}`);

            //console.log('COMPARE: '+JSON.stringify(rap)+'  WITH  '+filters[j].filter+' is it clear  '+par)
            if (key == par && value == filters[j].filter ) out.push(letters[i]);
          }
          }
      }
    }
    }

    console.log(out+'  HERE is OUT')
      const results = out
      return results
    },
    afterChangeView() {
      return this.$store.state.viewData
    },
    search() {
      console.log('hellllo')
      if (this.searchInput != ""){
      const s = this.searchInput.toLowerCase()
      if(this.afterFilters.length != 0) {
              return this.afterFilters.filter(o => 
         (o.barcode.toLowerCase().includes(s) || o.letterNo.toLowerCase().includes(s) || o.letterDate.toLowerCase().includes(s) || o.subject.toLowerCase().includes(s)))
         console.log(o)
      }
      else if (this.currentView !== 'all') {
       return this.afterChangeView.filter(o => 
         (o.barcode.toLowerCase().includes(s) || o.letterNo.toLowerCase().includes(s) || o.letterDate.toLowerCase().includes(s) || o.subject.toLowerCase().includes(s)))
         console.log(o)
      }
      return this.getLetters.filter(o => 
        (o.barcode.toLowerCase().includes(s) || o.letterNo.toLowerCase().includes(s) || o.letterDate.toLowerCase().includes(s) || o.subject.toLowerCase().includes(s)))
        console.log(o)
    }
    },
    pageSize() {
      return this.$store.state.viewSize
    },
    msg() {
          return this.$store.state.alert
      }

  },
  components: {
      modal,
      taskModal,
      Pagination,
      FiltersModal
  },  
  apollo: {
    /*
    getUser: {
      query: GetUser,
      variables: {}
    },
    */
    getUsers: {
      query: GetUsers,
      variables: {}
    },
      getLetters: {
      query: GetLetters,
      variables: {},
      pollInterval: 300
    },
    getTasks: {
      query: GetTasks,
      pollInterval: 300 
    }
  },
  methods: {
      test() {
          //this.showModal = true
          this.$router.push("NewLetter")
      },
      openTaskModal(letter) {
        this.$store.dispatch("setLetter", letter)
        this.taskModalStatus = true
        console.log('ok all')
      },
      checkTasks(par) {
        // Consider will be alot of tasks in future
      if ( this.getTasks.find(o => o.letter === par)  ) {
        return
      }
      },
      openFiltersModal() {
        this.$store.state.filterSet = []
        this.filtersModalStatus = true
      },
      addToFilters() {
        this.filterArgs.push({name: 'sami'})
      },
      clearFilters() {
        this.$store.state.filterSet = []
      },
      showSearch() {
        this.showSearchBar = true
      },
      hideSearch() {
        this.searchInput = ''
        this.showSearchBar = false
      },
      changeView(view) {
        if (view == 'all') {
        this.hideSearch
        this.$store.state.filterSet = []
        this.currentView = view
        this.$store.state.viewData = []
        return
        }
        this.hideSearch
        this.$store.state.filterSet = []
        const oo = this.getLetters
        this.currentView = view
        var ooo = oo.filter(o => 
        (o.letterType == view))
        this.$store.dispatch("setViewData", ooo)
        console.log(ooo)
    },
      handlePrint() {
        // THIS FUNC IS BETTER WITH SETTINGS
        let printWindow = new BrowserWindow({ 'auto-hide-menu-bar': true,show:false });
        printWindow.loadURL("www.google.com");
        let list = printWindow.webContents.getPrinters();
        console.log("All printer available are ",list);
        /*
       let win = null;

app.on('ready', () => {
  // Create window
  win = new BrowserWindow({width: 800, height: 600, show: false });
  // Could be redundant, try if you need this.
  win.once('ready-to-show', () => win.hide())
  // load PDF.
  win.loadURL(`file://Users/samialzhrani/Downloads/books-library.online_noo908083eb5216e765368db0-756.pdf`);
 // if pdf is loaded start printing.
  win.webContents.on('did-finish-load', () => {
    win.webContents.print({silent: false});
    // close window after print order.
    win = null;
  });
})
*/
    },
    cheangeViewSize(e) {
      this.$store.dispatch("setViewSize", e.target.value)
    }
  },
  created() {
    if (!localStorage.getItem('user')) {
      return this.$router.push('/Login')
    }
  }
}
</script>

<style>
.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
}

.table {
  width: 100%;
  background-color: transparent;
  border-collapse: collapse;
  border-top: 1px solid #eff2f7;
}

.table thead th {
  padding: 0.5rem;
  color: #2D3748;
  font-weight: lighter;
}

.table tbody td,
.table tbody th {
  vertical-align: middle;
  font-size: 0.8125rem;
  white-space: nowrap;
  text-align: center;
  font-weight: normal;
  font-size: 1rem;
}

.table tbody tr td,
.table tbody tr th {
  padding: 1.3rem;
  border-top: 1px solid #eff2f7;
  border-bottom: 1px solid #eff2f7;
}

.table tbody tr:hover{
    background-color: #EDF2F7;
    cursor: pointer;
}

.table tbody tr:active{
    background-color: #EDF2F7;
}

.cancelLetter td,
.cancelLetter th {
  padding: 1.3rem !important;
    line-height: 0 !important;
}

.cancelLetter td:after,
.cancelLetter th:after {
    content: "" !important;
    display: block !important;
    width: 100% !important;
    height: 1px !important;
    background-color: red !important;
    position: relative !important;
}

.cancelLetter tr:hover{
  background: transparent !important;
  cursor: default !important;
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

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
    width: auto;
  top: 100%;
  left: 50%; 
  margin-top: 10px;
   opacity: 1;
  margin-left: -20px; /* Use half of the width (120/2 = 60), to center the tooltip */
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

.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-20%);
  opacity: 0;
}
</style>
