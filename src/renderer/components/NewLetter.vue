<template>
  <div class="px-8 pb-3 items-center">
      <transition name="slide-fade">
<div v-if="msg.alertShow" :class="msg.alertType == 'success' ? 'z-20 absolute bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded w-auto left-0 ml-3 -mt-10 shadow-lg': 'z-20 absolute bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-auto left-0 ml-3 -mt-10 shadow-lg'" role="alert">
    <strong class="font-bold pr-6">{{ msg.alertTitle }}</strong>
    <span class="absolute top-0 bottom-0 right-0 px-4 py-4">
        <svg v-if="msg.alertType == 'success'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-green-500 h-5 w-5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>  
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-red-500 h-5 w-5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>  
    </span>
</div>
      </transition>
      <div class="rounded overflow-hidden rounded-lg mx-16 mt-8 pt-8 pr-8 shadow-xl bg-white">

    <div class="flex mb-3 font-semibold text-xl text-gray-700 tracking-tight mr-2">
      <h2>إضافة معاملة جديدة</h2>
      <div class="inline-flex mr-3 mb-1">
  <button @click="form.letterType = 'in'" :class="form.letterType == 'in' ? 'cursor-default bg-teal-100 shadow-inner text-sm text-teal-700 py-2 px-4 rounded-r' : 'bg-gray-300 text-sm hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r' ">
    وارد
  </button>
  <button @click="form.letterType = 'out'" :class="form.letterType == 'out' ? 'cursor-default bg-teal-100 shadow-inner text-sm text-teal-700 py-2 px-4 rounded-l' : 'bg-gray-300 text-sm hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l' ">
    صادر
  </button>
</div>
    </div>

              <form class="w-full items-center max-w-auto pl-8 mb-3">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase text-gray-700 text-md mb-2" for="barcode">
        رقم الباركود
      </label>
      <input v-model="form.barcode" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="barcode" name="barcode" ref="barcode" type="number" placeholder="رقم الباركود">
      <span v-if="this.checkBarcode" class="text-xs text-red-600 bg-red-100 rounded-xl">توجد معاملة بنفس رقم الباركود</span>
    </div>
            <div class="w-1/3 px-3">
      <label class="block uppercase text-gray-700 text-md mb-2" for="letter-no">
        رقم المعاملة
      </label>
      <input v-model="form.letterNo" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="letter-no" name="letter-no" ref="letter-no" type="text" placeholder="رقم المعاملة">
            <span v-if="this.checkLetterNo" class="text-xs text-red-600 bg-red-100 rounded-xl">توجد معاملة بنفس الرقم</span>
    </div>
    <div class="w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase text-gray-700 text-md mb-2" for="letter-date">
        تاريخ المعاملة
      </label>
      <input v-model="form.letterDate" data-inputmask="'mask': '9999 9999 9999 9999'" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="letter-date" name="letter-date" type="date" ref="letter-date" placeholder="تاريخ المعاملة">
    </div>
  </div>

    <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase text-gray-700 text-md  mb-2" for="from">
        الجهة
      </label>
      <div class="relative">
        <div v-if="this.afterChooseFrom !== ''">
        <input v-model="this.afterChooseFrom" disabled type="text" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        <button class="w-1/1 text-red-600" @click="clearAfterChoose">حذف الجهة</button>
        </div>
        <div v-else>
  <input v-model="form.from" type="text" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" list="from" name="fromName">
   <!-- DON'T FORGET CONTAINER HERE -->
   <div v-show="this.autoCompleteFrom && this.autoCompleteFrom.length != 0" style="z-index: 999; position: absolute; max-height: 90px; height: auto; overflow-y: auto; width: 100%; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08); border-radius: 0 0 10px 10px;">
    <option @click="chooseFrom(From.from)" class="cursor-pointer hover:bg-gray-200 bg-white" style="display: block; width: 100%; padding: 0.375rem 0.75rem; font-size: 1rem; line-height: 1.5; color: #495057; border-bottom: 1px solid #F7FAFC; transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
     box-sizing: border-box;" :value="From.from" v-for="From in autoCompleteFrom" :key="From.index">{{ From.from }}</option>
    </div>
        </div>
      </div>
    </div>
        <div class="w-1/3 px-3">
      <label class="block uppercase  text-gray-700 text-md  mb-2" for="level">
        درجة السريّة
      </label>
      <div class="relative">
        <select v-model="form.level" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="level" name="level" ref="level">
          <option></option>
          <option>سري</option>
          <option>سري للغاية</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    <div class="w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase  text-gray-700 text-md  mb-2" for="priority">
        درجة الأسبقية
      </label>
      <div class="relative">
        <select v-model="form.priority" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="priority" name="priority" ref="priority">
          <option></option>
          <option>عادي</option>
          <option>عاجل</option>
          <option>عاجل جداً</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-wrap -mx-3 mb-2">

  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase  text-gray-700 text-md  mb-2" for="subject">
        الموضوع
      </label>
      <input v-model="form.subject" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="subject" name="subject" ref="subject" type="text" placeholder="موضوع المعاملة">
    </div>
  </div>
  
        <div class="flex flex-wrap -mr-3 mb-6 md:mb-0">
                      <div class="w-1/3 flex px-3 mb-8 md:mb-0">
      <label class="block uppercase  text-gray-700 text-md  mb-2" for="related">
        الإرتباط
      </label>
    <div class="w-1/3 mt-6">
                  <label class="mt-3 sm:w-1/4 sm:px-2 flex items-center lg:w-full lg:px-0">
              <input class="form-radio bg-gray-900 focus:bg-gray-700" type="radio" name="related-no" :value="false" v-model="relatedAv">
              <span class="mr-2 text-gray">لا يوجد</span>
            </label>
    </div>
        <div class="w-1/3 mt-6">
                  <label class="mt-3 sm:w-1/4 sm:px-2 flex items-center lg:w-full lg:px-0">
              <input disabled class="form-radio bg-gray-900 focus:bg-gray-700" type="radio" name="related-yes" :value="true" v-model="relatedAv">
              <span class="mr-2 text-gray">يوجد</span>
            </label>
        </div>
    </div>
    <div class="w-2/3 mt-6">
      <input v-model="form.related" :disabled="!relatedAv" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="related" name="status" ref="status" placeholder="رقم الارتباط - باركود/رقم معاملة" type="text">
    </div>
    </div>

    <div class="flex flex-wrap -mx-3 mt-5 mb-2">
          <div class="w-1/3 flex px-3 mb-8 md:mb-0">
      <label class="block uppercase  text-gray-700 text-md  mb-2" for="grid-first-name">
        الإحالة
      </label>
    <div class="w-1/3 mt-6">
                  <label class="mt-3 sm:w-1/4 sm:px-2 flex items-center lg:w-full lg:px-0">
              <input class="form-radio bg-gray-900 focus:bg-gray-700" type="radio" name="assign" :value="false" v-model="assignAv">
              <span class="mr-2 text-gray">لا توجد</span>
            </label>
    </div>
        <div class="w-1/3 mt-6">
                  <label class="mt-3 sm:w-1/4 sm:px-2 flex items-center lg:w-full lg:px-0">
              <input class="form-radio bg-gray-900 focus:bg-gray-700" type="radio" name="assign" :value="true" v-model="assignAv">
              <span class="mr-2 text-gray">توجد</span>
            </label>
        </div>
    </div>
        <div class="w-1/3 mb-6 pl-3">
        <label>
        نوع الإحالة
      </label>
      <div class="relative mt-2">
        <select v-model="form.assigneesStatus" :disabled="!assignAv" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="from" ref="from">
          <option :value="taskType.taskType" v-for="taskType in getTaskTypes" :key="taskType.index">{{ taskType.taskType }}</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
      <div class="w-1/3">
      <label style="display: flex;">
        الموظف
                    <div v-if="Object.entries(this.usersDetailsList).length !== 0">
      <button v-show="!this.userDetails" @click="showDetails" class="w-1/1 text-orange-500 text-xs mr-2" style="display: flex;"> <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><polyline points="6 9 12 15 18 9"></polyline></svg>عرض التفاصيل</button>
      <button v-show="this.userDetails" @click="hideDetails" class="w-1/1 text-orange-500 text-xs mr-2" style="display: flex;"> <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><polyline points="18 15 12 9 6 15"></polyline></svg>إخفاء التفاصيل</button>
         <ul v-show="this.userDetails" style="text-align: right; decoration: none; z-index: 999; position: absolute; max-height: 90px; height: auto; overflow-y: auto; width: auto; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08); border-radius: 0 0 10px 10px;">
    <li v-for="(value, name, index) in usersDetailsList" :key="index" class="cursor-default hover:bg-gray-200 bg-white" style="display: block; width: 100%; padding: 0.375rem 0.75rem; font-size: 1rem; line-height: 1.5; color: #495057; border-bottom: 1px solid #F7FAFC; transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
     box-sizing: border-box;">
     <span class="text-gray-900 font-semibold text-sm">{{ name }}: </span>  <span class="text-green-700 text-sm">{{ value }}</span>
     </li>
    </ul>
    </div>
      </label>
      <div class="relative mt-2">
        <select :disabled="!assignAv" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="from" ref="from" v-model="form.assigneesName">
          <option v-for="user in getUsers" :key="user.id" :value="user">{{ user.name }}</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  </div>
      <div class="flex flex-wrap -mx-3 mb-2">
    <div class="w-1/3">
    </div>

    <div class="w-2/3">
<label>ملاحظات الإحالة</label>
<div class="relative mt-2">
  <input :disabled="!assignAv" v-model="form.note" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="note" name="note" ref="note" type="textarea">
</div>
    </div>
     </div>

<div class="flex mb-4 border-b border-gray-300 items-center"></div>
      <div class="w-full flex px-3 mt-2 mb-6 md:mb-0">
        <div class="mx-1 mb-6">
      <button :disabled="this.checkBarcode || this.checkLetterNo" @click="addNewLetter(true)" class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded" type="button">
          إضافة
      </button>
    </div>
            <div class="mx-1 mb-6 items-right">
      <button :disabled="this.checkBarcode || this.checkLetterNo" @click="addNewLetter(false)" class="hover:bg-teal-100 text-teal-500 font-bold py-2 px-4 rounded" type="button">
        إضافة متعددة
      </button>
    </div>

    <div class="mx-1 mb-6 w-1/2">
    </div>

            <div class="mr-56 mb-6">
      <button @click="cancel" class="hover:bg-red-100 rounded text-red-500 font-bold py-2 px-4 rounded" type="button">
        إلغاء
      </button>
    </div>
    </div>
</form>

    </div>
    <Loading v-if="showLoading" />
  </div>
</template>

<script>
import moment from 'moment'
var momentAr = require('moment-hijri')

import { mapState } from "vuex"
import {
  GetTask,
  GetTasks,
  GetTaskTypes,
  GetUsers,
  GetLetters,
  CreateUser,
  DeleteUser,
  UpdateUser,
  CreateLetter,
  CreateTask,
  UpdateLetter,
  CreateFrom,
  GetFrom
} from "../constants/query.gql"
import Loading from '@/components/Loading.vue'

export default {
  name: "newletter-page",
  components: {
      Loading
  },
  data() {
      return {
        relatedAv: false,
        assignAv: false,
        afterChooseFrom: '',
        userDetails: false,
        form: {
            barcode: '',
            letterNo: '',
            letterDate: '',
            letterType: 'in',
            from: '',
            subject: '',
            status: 'still',
            related: '',
            task: '', //After create the task, take data 
            assigneesName: '',
            assigneesStatus: '',
            level: '',
            priority: '',
            entry: '',
            note: ''
        }
      }
  },  
  apollo: {
    getTaskTypes: {
      query: GetTaskTypes,
      variables: {},
      pollInterval: 300
    },
    getUsers: {
      query: GetUsers,
      variables: {},
      pollInterval: 300
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
    getFrom: {
      query: GetFrom,
      pollInterval: 300
    }
  },
  computed: {
      msg() {
          return this.$store.state.alert
      },
      showLoading() {
          return this.$store.state.showLoading
      },
      autoCompleteFrom() {
        const fromList = this.getFrom
              if (this.form.from != ""){
      const s = this.form.from.toLowerCase()
              return fromList.filter(o => 
         (o.from.toLowerCase().includes(s)))
         console.log(o)
      }
      },
      usersDetailsList() {
        var res = {}
        const tsks = this.getTasks
        tsks.forEach(function(v) {
          if(v.status == 'still' && v.assigneesUsername == 'مدخل بيانات') {
            res[v.assigneesName] = (res[v.assigneesName] || 0) + 1
            res[v.assigneesName + '(آخر تاريخ)'] = momentAr(v.createdAt, 'YYYY-M-D HH:mm:ss').format('(HH:mm) iYYYY/iM/iD')
          }
        })
        console.log(res)
       return res
      },
      checkBarcode() {
        var result = []
        if (this.form.barcode != ""){
        const bc = this.form.barcode.toLowerCase()
        const list = this.getLetters
        result = list.filter(lbc => 
        (lbc.barcode.toLowerCase() == bc ))
        }
        console.log(result)
        if (result.length != 0) {
          return true
        } else { return false }
    },
      checkLetterNo() {
        var checkResult = []
        if (this.form.letterNo != ""){
        const ln = this.form.letterNo.toLowerCase()
        const list = this.getLetters
        checkResult = list.filter(lln => 
        (lln.letterNo.toLowerCase() == ln ))
        }
        console.log(checkResult)
        if (checkResult.length != 0) {
          return true
        } else { return false }
    }
  },
  methods: {
    clearFeilds() {
          this.form = {
            barcode: '',
            letterNo: '',
            letterDate: '',
            letterType: 'in',
            from: '',
            subject: '',
            status: 'still',
            related: '',
            task: '', //After create the task, take data 
            assigneesName: '',
            assigneesStatus: '',
            level: '',
            priority: '',
            entry: '',
            note: ''
        }
    },
    cancel() {
        this.$router.push("Income")
    },
    addNewLetter(exit) {
      var fromValue = ''
        this.$store.state.showLoading = true
        if(this.form.barcode == '' || this.form.letterNo == '' || (this.form.from == '' && this.afterChooseFrom == '')) {
            this.$store.state.showLoading = false
            this.$store.dispatch('setAlert', {type:'error', title:'الرجاد التأكد من ادخال البيانات', show: true})
            return
        }
        if (this.form.from != '' && this.afterChooseFrom == '') {
          this.$apollo.mutate({
            mutation: CreateFrom,
            variables: {
              from: this.form.from
            }
          })
          fromValue = this.form.from
        } else { fromValue = this.afterChooseFrom }
        if (exit) {
        setTimeout(() => {
        this.$apollo
        .mutate({
          mutation: CreateLetter,
          variables: {
            barcode: this.form.barcode,
            letterNo: this.form.letterNo,
            letterDate: this.form.letterDate,
            letterType: this.form.letterType,
            from: fromValue,
            subject: this.form.subject,
            status: this.form.status,
            related: this.form.related,
            task: this.form.task,
            assigneesName: this.form.assigneesName.name,
            assigneesStatus: this.form.assigneesStatus,
            level: this.form.level,
            priority: this.form.priority,
            entry: localStorage.getItem('user') ////// CHANGE IT LATER //////
          }
        }).then((res) => {
          console.log(res.data.createLetter)
          if (res.data.assigneesStatus !== '' && this.form.assigneesName !== '') {
            this.$apollo
        .mutate({
          mutation: CreateTask,
          variables: {
            letter: res.data.createLetter.id,
            letterBarcode: res.data.createLetter.barcode,
            assigneesName: this.form.assigneesName.name,
            assigneesUsername: this.form.assigneesName.role,
        creator: localStorage.getItem('user-id'),
        creatorName: localStorage.getItem('user'),
        creatorUserName: localStorage.getItem('userName'),
        note: this.form.note,
        taskType: res.data.createLetter.assigneesStatus,
        status: 'still',
          }
      }).then((response) => {
                this.$apollo.mutate({
          mutation: UpdateLetter,
          variables: {
            id: response.data.createTask.letter, input: {task: response.data.createTask.id}
          }
        })
      })
          }
        })
        this.$store.state.showLoading = false
        this.$router.push("Income")     
            this.$router.push("Income")
            setTimeout(() => this.$store.dispatch('setAlert', {type:'success', title:'تمت إضافة المعاملة بنجاح', show: true}), 500)
            return
         })   
         return
        }
                setTimeout(() => {
        this.$apollo
        .mutate({
          mutation: CreateLetter,
          variables: {
            barcode: this.form.barcode,
            letterNo: this.form.letterNo,
            letterDate: this.form.letterDate,
            letterType: this.form.letterType,
            from: fromValue,
            subject: this.form.subject,
            status: this.form.status,
            related: this.form.related,
            task: this.form.task,
            assigneesName: this.form.assigneesName.name,
            assigneesStatus: this.form.assigneesStatus,
            level: this.form.level,
            priority: this.form.priority,
            entry: localStorage.getItem('user') ////// CHANGE IT LATER //////
          }
        }).then((res) => {
          console.log(res.data.createLetter)
          if (res.data.assigneesStatus !== '' && this.form.assigneesName !== '') {
            this.$apollo
        .mutate({
          mutation: CreateTask,
          variables: {
            letter: res.data.createLetter.id,
            letterBarcode: res.data.createLetter.barcode,
            assigneesName: this.form.assigneesName.name,
            assigneesUsername: this.form.assigneesName.role,
        creator: localStorage.getItem('user-id'),
        creatorName: localStorage.getItem('user'),
        creatorUserName: localStorage.getItem('userName'),
        note: this.form.note,
        taskType: res.data.createLetter.assigneesStatus,
        status: 'still',
          }
      }).then((response) => {
                this.$apollo.mutate({
          mutation: UpdateLetter,
          variables: {
            id: response.data.createTask.letter, input: {task: response.data.createTask.id}
          }
        })
      })
          }
        })
        this.$store.state.showLoading = false
        this.$store.dispatch('setAlert', {type:'success', title:'تمت إضافة المعاملة بنجاح', show: true})
        // clear data to start again
        
                })
    },
    chooseFrom(val) {
      this.form.from = ''
      this.afterChooseFrom = val
    },
    clearAfterChoose() {
      this.afterChooseFrom = ''
    },
    showDetails() {
      this.userDetails = true
    },
    hideDetails() {
      this.userDetails = false
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
}

/*
::-webkit-datetime-edit-text { color: red; padding: 0 0.3em; }
::-webkit-datetime-edit-month-field { color: blue; }
::-webkit-datetime-edit-day-field { color: green; }
::-webkit-datetime-edit-year-field { color: purple; }
*/
::-webkit-inner-spin-button { display: none; }
::-webkit-calendar-picker-indicator { display: none; }
</style>
