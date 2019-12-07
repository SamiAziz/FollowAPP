<template>
  <div class="flex px-8 pb-8 content-center flex-wrap">
                     <transition name="slide-fade">
<div v-if="msg.alertShow" :class="msg.alertType == 'success' ? 'z-20 absolute bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded w-auto ml-3 shadow-lg': 'z-20 absolute bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-auto ml-3 shadow-lg'" role="alert">
    <strong class="font-bold pr-6">{{ msg.alertTitle }}</strong>
    <span class="absolute top-0 bottom-0 right-0 px-4 py-4">
        <svg v-if="msg.alertType == 'success'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-green-500 h-5 w-5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>  
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-red-500 h-5 w-5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>  
    </span>
</div>
      </transition>
<div class="z-20 bg-gray-200 sticky top-0 w-full">
  <div class="flex justify-between">
  <div class="text-gray-700 text-center px-4 py-2 m-2 flex w-full">
              <a href="#" @click="back" class="flex pt-2 rounded shadow bg-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-600 xl:hover:bg-white ml-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="storke-current w-5 h-5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
    <a v-if="this.letterData.status !== 'done'" href="#" @click="newTask" class="flex pt-1 rounded shadow bg-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-600 xl:hover:bg-white ml-3">
        إضافة إحالة
    </a>
        <a v-if="this.letterData.status !== 'done'" href="#" @click="doneLetter" class="flex pt-1 rounded shadow bg-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-red-600 xl:hover:bg-white ml-3">
        إغلاق المعاملة
    </a>
    <span v-if="this.letterData.status == 'done'" class="mt-1 px-1 opacity-1 border-lg bg-green-100  text-lg text-green-700">المعاملة تم تسديدها</span>
  </div>

<div class="text-gray-700 text-center px-4 py-2 m-2 flex justify-between w-full">
<p class="text-gray-500 pt-2 text-lg">{{ this.letterData.subject }}</p>
      </div>

  <div class="text-gray-700 text-center px-4 py-2 m-2 flex justify-between">
        <a href="#" class="block pt-2 rounded shadow bg-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-600 xl:hover:bg-white ml-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="storke-current w-5 h-5"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
        </a>

 </div>
</div>
<div class="flex mb-4 border-b border-gray-300"></div>
</div>

<div class="sticky top-0 w-1/4 h-full ml-24 rounded overflow-hidden rounded-lg">
               <div class="px-4 py-4 xl:px-8 border-l-2 border-gray-300">
<div class="block">
            <div class=" px-6 py-4">
    <div class="ml-2 text-sm text-gray-600 uppercase tracking-wide">
          رقم المعاملة
        </div>
        <span class="text-lg text-gray-900">{{ this.letterData.letterNo }}</span>
  </div>
            <div class=" px-6 py-4">
    <div class="ml-2 text-sm text-gray-600 uppercase tracking-wide">
          تاريخ المعاملة
        </div>
        <span class="text-lg text-gray-900 align-center">{{ formateDate(this.letterData.createdAt) }}هـ</span>
  </div>
        <div class=" px-6 py-4">
    <div class="ml-2 text-sm text-gray-600 uppercase tracking-wide">
          الجهة
        </div>
        <span class="text-lg text-gray-900">{{ this.letterData.from }}</span>
  </div>
          <div class=" px-6 py-4">
    <div class="ml-2 text-sm text-gray-600 uppercase tracking-wide">
          المدة الزمنية
        </div>
        <span v-if="this.letterData.status !== 'done'" class="text-lg text-gray-900">{{ longFormateDate(this.letterData.createdAt) }}</span>
        <span v-else class="text-lg text-gray-900">{{ longToNowFormateDate(this.letterData.createdAt, this.letterData.updatedAt) }}</span>
  </div>
          <div class=" px-6 py-4">
    <div class="ml-2 text-sm text-gray-600 uppercase tracking-wide">
          الارتباط
        </div>
        <span class="text-lg text-gray-900">{{ this.letterData.related }}</span>
  </div>
            <div class=" px-6 py-4">
    <div class="ml-2 text-sm text-gray-600 uppercase tracking-wide">
          المُدخل
        </div>
        <span class="text-xl text-gray-900">{{ this.letterData.entry }}</span>
  </div>
               </div>
<!--
               <div class="flex">
            <div class="flex-1 px-6 py-4">
    <div class="ml-2 text-xs text-gray-600 font-semibold uppercase tracking-wide">
          درجة السريّة
        </div>
        <span class="text-lg text-gray-900 font-semibold">{{ this.letterData.level }}</span>
  </div>
        <div class="flex-1 px-6 py-4">
    <div class="ml-2 text-xs text-gray-600 font-semibold uppercase tracking-wide">
          درجة الأسبقية
        </div>
        <span class="text-lg text-gray-900 font-semibold">{{ this.letterData.priority }}</span>
  </div>
          <div class="flex-1 px-6 py-4">
    <div class="ml-2 text-xs text-gray-600 font-semibold uppercase tracking-wide">
          حالة المعاملة
        </div>
        <span class="inline-block px-2 py-1 leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">متاحة</span>
        
  </div>
          <div class="flex-1 px-6 py-4">
    <div class="ml-2 text-xs text-gray-600 font-semibold uppercase tracking-wide">
          المدخل
        </div>
        <span class="text-lg text-gray-900 font-semibold">{{ this.letterData.entry }}</span>
  </div>
               </div>
-->

   
    </div>
  </div>
    <div class="w-3/2 z-0 justify-center overflow-y-scroll rounded rounded-lg bg-gray-300 shadow-inner pr-5" style="max-height: 690px;">
 <!-- v-for="task in getTask" :key="task.id" -->
<ul class="timeline">
  <!-- Item 1 -->
  <p class="flag" style="text-align: center;">{{ formateDate(this.letterData.createdAt) }}هـ</p>
  <li v-for="(task, index) in getTask" :key="task.id">
    <div :class=" (index%2  === 0) ?  'direction-r' : 'direction-l'" >
      <div class="flag-wrapper">
        <span class="hexa" v-if="task.status == 'end'"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-green-500 h-5 w-5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></span>
        <span class="hexa" v-else><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-orange-500 h-5 w-5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span>
        <span class="flag">{{ task.assigneesName }} - <b>{{ task.taskType }}</b></span>
        <span class="time-wrapper" v-if="task.status == 'end'"><span class="time bg-green-300 text-green-700">{{ formateDate(task.createdAt) }}هـ</span></span>
        <span class="time-wrapper" v-else><span class="time bg-orange-300 text-orange-600">{{ formateDate(task.createdAt) }}هـ</span></span>
      </div>
      <br/><span v-if="task.status !== 'end'" class="mt-2 p-2 text-gray-600 text-sm">{{ longFormateDate(task.createdAt) }}</span> <span v-else-if="task.status == 'end'" class="text-gray-600 text-sm">{{ updatedDate(task.updatedAt) }}هـ</span>
      <div class="border-x border-indigo-100" style="width: auto;" v-if="task.note != ''"><span class="bg-indigo-100 border-r border-l border-indigo-400 text-indigo-400 ">{{ task.note }}</span></div>
    </div>
  </li>
   <p class="flag" v-if="this.letterData.status == 'done'" style="text-align: center;">{{ formateDate(this.letterData.updatedAt) }}هـ</p>
</ul>
</div>
<!--
    <div class="flex mb-5 border-b border-gray-300"></div>

    <div class="rounded overflow-hidden rounded-lg shadow-xl bg-white">
      <div class="pt-4">



          <div class="flex justify-between content-center">
      <div class="font-bold mr-6 pt-1 text-xl">قائمةالإحالات</div>
  <div class="text-center px-4 py-2 m-2">2</div>
  <div class="pl-2">
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded inline-flex items-center">
  <svg           class="stroke-current text-gray-700 inline-block h-5 w-5 mb-1 ml-2 pt-1"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  <span>إضافة إحالة جديد</span>
</button>

  </div>
</div>
        <div class="table-responsive">
          <table class="table" style="align-items: center;">
            <thead>
              <tr>
                <th>رقم المعاملة</th>
                <th>الموظف</th>
                <th>منشيء الإحالة</th>
                <th>نوع الإحالة</th>
                <th>حالة الإحالة</th>
                <th>الملاحظات</th>
                <th>تاريخ الإحالة</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in getTasks" v-bind:key="task.index" @click="openTaskModal(letter)">
                <th>{{ task.letter }}</th>
                <td>{{ task.assigneesName }}</td>
                <td>{{ task.creatorName }}</td>
                <th>{{ task.taskType }}</th>
                <td>{{ task.status }}</td>
                <td>{{ task.note }}</td>
                <td>{{ task.assignDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        

      </div>
    </div>
    -->
    <taskModal v-if="taskModalStatus" @close="taskModalStatus = false" />
  </div>
</template>

<script>
import moment from 'moment'
var momentAr = require('moment-hijri')
import { mapState } from "vuex"
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
  UpdateLetter, 
  UpdateTask
} from "../constants/query.gql";

export default {
  name: "letterview-page",
  data() {
      return {
          taskModalStatus: false,
          currentTask: '',
          letterCount: 0,
          currentTaskLetter: '',
          currentColor: '',
			interval: null
      }
  },
  components: {
      taskModal
  },
  //props: ['letterData'],
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
    },
    getTask: {
      query: GetTask,
      variables(){ 
      return{ letter: this.$store.state.letterData.id }
      },
      pollInterval: 300
        }
  },
  methods: {
    back() {
        this.$router.push("Income")
    },
    newTask() {
        this.$store.dispatch("setLetter", this.$store.state.letterData)
       this.taskModalStatus = true
    },
    formateDate(date) {
        //moment([2007, 0, 29]).fromNow()
      return momentAr(date, 'YYYY-M-D HH:mm:ss').format('iYYYY/iM/iD')
    },
    updatedDate(date) {
        //moment([2007, 0, 29]).fromNow()
      return momentAr(date, 'YYYY-M-D HH:mm:ss').format('(HH:mm) iYYYY/iM/iD')
    },
    longFormateDate(date) {
        //moment([2007, 0, 29]).fromNow()
      var changeFormat = moment(date).format('YYYY.MM.DD HH:mm:ss')
      //var range = moment([moment(date).format('YYYY'), moment(date).format('DD'), moment(date).format('MMM')]).fromNow()
      return moment(changeFormat).fromNow() //range
    },
    longToNowFormateDate(date, todate) {
        //moment([2007, 0, 29]).fromNow()
      var changeFormat = moment(date).format('YYYY.MM.DD HH:mm:ss')
      var changeToFormat = moment(todate).format('YYYY.MM.DD HH:mm:ss')
      //var range = moment([moment(date).format('YYYY'), moment(date).format('DD'), moment(date).format('MMM')]).fromNow()
      return moment(changeFormat).to(changeToFormat) //range
    },
    LastCount() {
        if(this.getTasks.length !== 0) {
          return console.log(this.getTasks[this.getTasks.length - 1].id)
        }
        //return this.getTasks[this.lineData.length - 1].id
  },
  doneLetter() {
        if(this.letterData.task != ''){
        const ID = this.letterData.task
        
          this.$apollo.mutate({
          mutation: UpdateTask,
          variables: {
            id: ID, input: {status: 'end'}
          }
        })
        
      }
        this.$apollo.mutate({
          mutation: UpdateLetter,
          variables: {
            id: this.letterData.id, input: {status: 'done'}
          }
        })
        this.$router.push("/")
  }
  },
  computed: {
    msg() {
        return this.$store.state.currentAlert
      },
    letterData() {
        return this.$store.state.letterData
    }
  },
  	created() {
    this.interval = setInterval(() => this.$forceUpdate(), 1000);
    console.log(this.getTasks)
        // Trigger an update at least each second
        // You should probably raise this duration as refreshing so often
        // may be not useful 
 		},
	beforeDestroy() {
		clearInterval(this.interval);
	}
};
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
  color: #8492a6;
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
    background-color: #F7FAFC;
    cursor: pointer;
}

.table tbody tr:active{
    background-color: #F0FFF4;
}

.table tr:last-child td,
.table tr:last-child th {
  border-bottom: 0;
}


.hexa{
  border: 1px;
  float: left;
  text-align: center;
  height: 60px;
  width: 60px;
  font-size: 22px;
  background: #f0f0f0;
  color: #3c3c3c;
  position: relative;
  margin-top: 13px;
  border-radius: 60px;
}

.timeline {
  position: relative;
  padding: 0;
  width: 100%;
  margin-top: 20px;
  list-style-type: none;
}

.timeline:before {
  position: absolute;
  left: 50%;
  top: 0;
  content: ' ';
  display: block;
  width: 2px;
  height: 100%;
  margin-left: -1px;
  background: rgb(213,213,213);
  background: -moz-linear-gradient(top, rgba(213,213,213,0) 0%, rgb(213,213,213) 8%, rgb(213,213,213) 92%, rgba(213,213,213,0) 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(30,87,153,1)), color-stop(100%,rgba(125,185,232,1)));
  background: -webkit-linear-gradient(top, rgba(213,213,213,0) 0%, rgb(213,213,213) 8%, rgb(213,213,213) 92%, rgba(213,213,213,0) 100%);
  background: -o-linear-gradient(top, rgba(213,213,213,0) 0%, rgb(213,213,213) 8%, rgb(213,213,213) 92%, rgba(213,213,213,0) 100%);
  background: -ms-linear-gradient(top, rgba(213,213,213,0) 0%, rgb(213,213,213) 8%, rgb(213,213,213) 92%, rgba(213,213,213,0) 100%);
  background: linear-gradient(to bottom, rgba(213,213,213,0) 0%, rgb(213,213,213) 8%, rgb(213,213,213) 92%, rgba(213,213,213,0) 100%);
  z-index: 5;
}

.timeline li {
  padding: 2em 0;
}

.timeline .hexa{
  width: 20px;
  height: 20px;
  position: absolute;
  background: #ffffff;
  z-index: 5;
  left: 0;
  right: 0;
  margin-left:auto;
  margin-right:auto;
  top: -30px;
  margin-top: 0;
  border-radius: 20px;
}

.direction-l,
.direction-r {
  float: none;
  width: 100%;
  text-align: center;
}

.flag-wrapper {
  text-align: center;
  position: relative;
}

.flag {
  position: relative;
  display: inline;
  background: rgb(255,255,255);
  font-weight: 600;
  z-index: 15;
  padding: 6px 10px;
  text-align: left;
  border-radius: 5px;
}

.direction-l .flag:after,
.direction-r .flag:after {
  content: "";
  position: absolute;
  left: 50%;
  top: -15px;
  height: 0;
  width: 0;
  margin-left: -8px;
  border: solid transparent;
  border-bottom-color: rgb(255,255,255);
  border-width: 8px;
  pointer-events: none;
}

.direction-l .flag {
  -webkit-box-shadow: -1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  -moz-box-shadow: -1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  box-shadow: -1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
}

.direction-r .flag {
  -webkit-box-shadow: 1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  -moz-box-shadow: 1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  box-shadow: 1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
}

.time-wrapper {
  display: block;
  position: relative;
  margin: 6px 0 0 0;
  z-index: 14;
  line-height: 1em;
  vertical-align: middle;
  color: #fff;
  font-size: 13px;
}

.direction-l .time-wrapper {
  float: none;
}

.direction-r .time-wrapper {
  float: none;
}

.time {
  background: #00c4f3;
  display: inline-block;
  padding: 8px;
}

.desc {
  position: relative;
  padding: 1em;
  z-index: 15;
}

.direction-l .desc,
.direction-r .desc {
  position: relative;
  padding: 1em;
  z-index: 15;
}

@media(min-width: 768px){
  .timeline {
    width: 660px;
    margin: 0 auto;
    margin-top: 20px;
  }

  .timeline li:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  
  .timeline .hexa {
    left: -28px;
    right: auto;
    top: 4px;
  }

  .timeline .direction-l .hexa {
    left: auto;
    right: -28px;
  }

  .direction-l {
    position: relative;
    width: 310px;
    float: left;
    text-align: right;
  }

  .direction-r {
    position: relative;
    width: 310px;
    float: right;
    text-align: left;
  }

  .flag-wrapper {
    display: inline-block;
  }
  
  .flag {
    font-size: 14px;
    font-weight: normal;
  }

  .direction-l .flag:after {
    left: auto;
    right: -16px;
    top: 50%;
    margin-top: -8px;
    border: solid transparent;
    border-left-color: rgb(254,254,254);
    border-width: 8px;
  }

  .direction-r .flag:after {
    top: 50%;
    margin-top: -8px;
    border: solid transparent;
    border-right-color: rgb(254,254,254);
    border-width: 8px;
    left: -8px;
  }

  .time-wrapper {
    display: inline;
    vertical-align: middle;
    margin: 0;
  }

  .direction-l .time-wrapper {
    float: left;
  }

  .direction-r .time-wrapper {
    float: right;
  }

  .time {
    padding: 5px 10px;
    margin-top: 3px;
  }

  .direction-r .desc {
    margin: 1em 0 0 0.75em;
  }
}

@media(min-width: 992px){
  .timeline {
    width: 800px;
    margin: 0 auto;
    margin-top: 20px;
  }

  .direction-l {
    position: relative;
    width: 380px;
    float: left;
    text-align: right;
  }

  .direction-r {
    position: relative;
    width: 380px;
    float: right;
    text-align: left;
  }
}
</style>
