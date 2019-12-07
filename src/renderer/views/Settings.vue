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
  <div class="text-gray-700 text-center px-4 py-2 m-2 flex justify-between w-full">
    <p class="text-gray-500 pt-2 text-lg">المستخدمين</p>
  </div>

<div class="text-gray-700 text-center px-4 py-2 m-2 flex justify-between w-full">

      </div>

  <div class="text-gray-700 text-center px-4 py-2 m-2 flex justify-between">

 </div>
</div>
    <div class="rounded overflow-hidden rounded-lg mx-6 pt-1">
                        <button @click="openUserModal('')" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 mt-2 mr-5 rounded inline-flex items-center">
  <svg class="stroke-current text-gray-800 inline-block h-5 w-5 mb-1 ml-2 pt-1"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  <span>إضافة مستخدم</span>
</button>

          <div class="flex justify-center overflow-y-scroll mt-1 mx-8 rounded rounded-lg bg-gray-300 shadow-inner" style="max-height: 490px;">
              <div class="px-2">
  <div class="flex justify-start mx-2 text-center items-center" v-for="i in Math.ceil(getUsers.length / 4)" :key="i.index">
    <div v-for="user in getUsers.slice((i - 1) * 4, i * 4)" :key="user.id" class="px-8 py-8">
      <div class="bg-white rounded-lg p-6 pt-5 pb-3 shadow-xl">
      <div class="pl-3 pt-3"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="storke-current text-gray-600 text-center inline-flex" style="padding: 0 !important; margin: 0 !important; font-weight: 0 !important;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
<div class="text-center">
<h2 class="text-lg text-gray-800 font-semibold my-1">{{ user.name }}</h2>
<div :class="user.role == 'مشرف' ? 'bg-red-100 rounded rounded-lg text-red-500 mt-2' : 'text-teal-500'">{{ user.role }}</div>
<div class="text-gray-600">{{ user.userName }}</div>
<div flex>
    <button v-if="userInfo !== user.name" @click="openUserModal(user)" class="px-2 py-1 mt-3 ml-4 rounded-lg hover:bg-blue-100 text-blue-700 text-sm ">
  تعديل
</button>
    <button v-if="userInfo !== user.name" @click="deleteUser(user.id)" class="px-2 py-1 mt-3 mr-4 rounded-lg hover:bg-red-100 text-red-700 text-sm ">
  حذف
</button>
</div>
</div>
</div>
    </div>
  </div>
</div>
</div>

    </div>

<div class="flex my-5 border-b border-gray-300"></div>
  <div class="flex justify-between">
  <div class="text-gray-700 text-center px-4 py-2 m-2 mr-4 flex justify-between w-full">
    <p class="text-gray-500 pt-2 text-lg">قاعدة البيانات</p>
  </div>

<div class="text-gray-700 text-center px-4 py-2 m-2 flex justify-between w-full">

      </div>

  <div class="text-gray-700 text-center px-4 py-2 m-2 flex justify-between">

 </div>
</div>
      <div class="rounded overflow-hidden rounded-lg mx-16 mt-4 pt-8 pr-32 shadow-xl bg-white">

<form class="flex-inline w-full mr-64">
    <div class="flex items-center mb-6">
    <div class="w-1/6">
      <label class="block text-gray-700 mb-1 text-md pr-4" for="db-ip">
        عنوان قاعدة البيانات
      </label>
    </div>
    <div class="w-1/1">
    <div class="bg-red-100 border-r border-red-400 text-red-700 px-4 py-3 text-sm relative w-1/1 mb-3" role="alert">
  <strong class="font-bold">تحذير:  </strong>
  <span class="block sm:inline">الرجاء الأخذ في الإعتبار، أي تغيير سوف يؤثر على عمل البرنامج مباشرةً!</span>
</div> 
      <input v-if="editIp == false" disabled class="opacity-50 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500" type="text" :value="serverIp">
      <input v-else class="opacity-50 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500" type="text" v-model="currentIp">
    </div>
  </div>

  <div class="flex items-center">
    <div class="w-1/3"></div>
    <div class="w-2/3 mb-6">
      <div v-if="!editIp">
      <button class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded" type="button" @click="editIp = true">
        تعديل
      </button>
      </div>

      <div v-else-if="editIp">
      <button  class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" type="button" @click="setIp">
        حفظ
      </button>
      <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" type="button" @click="editIp = false">
        إلغاء
      </button>
      </div>

    </div>
  </div>
</form>

    </div>

<div class="flex my-5 mt-12 border-b border-gray-300"></div>
  <div class="flex justify-between">
  <div class="text-gray-700 text-center px-4 py-2 m-2 mr-4 flex justify-between w-full">
    <p class="text-gray-500 pt-2 text-lg">الإحالات</p>
  </div>

<div class="text-gray-700 text-center px-4 py-2 m-2 flex justify-between w-full">

      </div>

  <div class="text-gray-700 text-center px-4 py-2 m-2 flex justify-between">

 </div>
</div>
      <div class="rounded overflow-hidden rounded-lg mx-16 mt-4 mb-8 pt-8 pr-32 shadow-xl bg-white">
<form class="flex-inline w-full mr-64">
  <div class="flex items-center mb-6">
    <div class="w-1/6">
      <label class="block text-gray-700 mb-1 text-md pr-4" for="db-name">
        أنواع الإحالات
      </label>
    </div>
    <div class="w-1/3">
      <table class="custom table-responsive">
          <thead>
            <tr class="custom">
              <th>الإحالة</th>
              <th>وصف الإحالة</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="taskType in getTaskTypes" :key="taskType.id">
                  <td>{{ taskType.taskType }}</td>
                  <td>{{ taskType.taskDesc }}</td>
                  <td></td>
                  <td class="px-3 pr-8 align-left">
                      <a href="#" @click="deleteTaskType(taskType)" class="text-sm text-red-800 hover:bg-red-100 rounded-lg px-2">حذف</a>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
  </div>
    <div class="flex items-center">
    <div class="w-1/3"></div>
    <div class="w-2/3 mb-6">
      <button @click="newTypeModal = true" class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded" type="button">
        إضافة إحالة
      </button>
    </div>
  </div>
</form>
<NewUser v-if="newUserModal" @close="newUserModal = false" :userData="userDataIF" />
<NewTaskType v-if="newTypeModal" @close="newTypeModal = false" />
<Confirm v-if="this.$store.state.confirmModal.show" @close="this.$store.state.confirmModal.show = false" />
      </div>

  </div>
</template>

<script>
import { mapState } from "vuex"
import NewUser from '@/components/NewUserModal.vue'
import Confirm from '@/components/ConfirmModal.vue'
import NewTaskType from '@/components/NewAssignees.vue'
const Storage = require('electron-store');
const storage = new Storage();

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
  GetTaskTypes
} from "../constants/query.gql";

export default {
  name: "settings-page",
  data() {
      return {
          currentView: 'users',
          newUserModal: false,
          userDataIF: '',
          newTypeModal: false,
          editIp: false,
          currentIp: ''
      }
  },
  components: {
      NewUser,
      NewTaskType,
      Confirm
  },
  computed: {
    msg() {
          return this.$store.state.alert
      },
    userInfo() {
      return localStorage.getItem('user')
    },
    serverIp() {
      return this.$store.state.serverIp
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
    }
  },
  methods: {
    changeView(view) {
        this.currentView = view
    },
    openUserModal(user) {
        this.$store.state.editUser = user
        this.newUserModal = true
    },
    deleteUser(par) {
      const id = par;
      this.$apollo.mutate({
        mutation: DeleteUser,
        variables: { id }
      })
    },
    deleteTaskType(task){
        this.$store.state.confirmModal.data = task
        this.$store.state.confirmModal.title = 'هل تريد حذف الإحالة؟'
        this.$store.state.confirmModal.show = true
    },
    setIp() {
      if(this.currentIp == '') {
        console.log('Please fill the input')
        return
      }
      storage.set('serverIp', this.currentIp);
      this.$store.state.serverIp = storage.get('serverIp')
      this.currentIp = ''
      this.editIp = false
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

.custom {
  width: 100%;
  background-color: transparent;
  border-collapse: collapse;
  border-top: 1px solid #eff2f7;
}

.custom thead th {
  padding: 0.5rem;
  color: #2D3748;
  font-weight: lighter;
}

.custom tbody td,
.custom tbody th {
  vertical-align: middle;
  font-size: 0.8125rem;
  white-space: nowrap;
  text-align: center;
  font-weight: normal;
  font-size: 1rem;
}

.custom tbody tr td,
.custom tbody tr th {
  padding: 1.3rem;
  border-top: 1px solid #eff2f7;
  border-bottom: 1px solid #eff2f7;
}

.custom tbody tr:hover{
    cursor: default;
}

</style>
