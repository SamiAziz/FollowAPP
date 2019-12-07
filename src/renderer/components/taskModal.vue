<template>
      <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div v-if="currentMSG.alertShow" class="bg-red-100 border-t border-b border-red-500 text-red-700 px-2 py-2 mb-2 w-full" role="alert">
  <p class="font-bold">حدثت مشكلة</p>
  <p class="text-sm">{{ currentMSG.alertTitle }}</p>
</div>
          <div class="modal-header">
    <div class="flex mb-4 font-semibold text-xl text-gray-700 tracking-tight mr-2">
      <h2>إضافة إحالة جديدة</h2>
    </div>
          </div>

          <div class="modal-body">
            <slot name="body">
              <form class="w-full max-w-lg">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 mb-2" for="grid-first-name">
        رقم الباركود
      </label>
      <input disabled class="opacity-50 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" name="barcode" ref="barcode" :value="this.currentLetter.barcode" type="text">
    </div>
    <div class="w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 mb-2" for="grid-last-name">
        رقم المعاملة
      </label>
      <input disabled class="opacity-50 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" name="letterNo" ref="letterNo"  :value="this.currentLetter.letterNo" type="text">
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 mb-2" for="grid-state">
        نوع الإحالة
      </label>
      <div class="relative">
        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="from" ref="from" v-model="form.taskType">
          <option v-for="taskType in getTaskTypes" :key="taskType.index">{{ taskType.taskType }}</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>

      <div class="w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 mb-2" for="grid-state">
        الموظف
      </label>
      <div class="relative">
        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="from" ref="from" v-model="form.assigneesName">
          <option v-for="user in getUsers" :key="user.id" :value="user">{{ user.name }}</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 mb-2" for="grid-state">
        ملاحظات الإحالة
      </label>
      <div class="relative">
<input v-model="form.note" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="note" name="note" ref="note" type="textarea">
      </div>
    </div>
  </div>

</form>
            </slot>
          </div>
<div class="flex mb-5 border-b border-gray-300"></div>
          <div class="modal-footer">
            <slot name="footer">

<div class="flex items-center">
  <div class="flex-1 text-gray-700 text-center">
          <button @click="createTask" class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded" type="button">
          إضافة
      </button>
  </div>
  <div class="flex-1 text-gray-700 text-center"></div>
  <div class="flex-1 text-gray-700 text-center self-end">
                  <button class="hover:bg-red-100 rounded text-red-500 font-bold py-2 px-4 rounded" @click="closeModal">
                إلغاء
              </button>
  </div>
</div>
            </slot>
          </div>
        </div>
      </div>
      <Loading v-if="showLoading" />
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex"
import Loading from '@/components/Loading.vue'
import { CreateLetter, GetUsers, CreateTask, UpdateLetter, UpdateTask, GetLetter ,GetTaskTypes } from "../constants/query.gql"

export default {
  data () {
    return {
      form: {
        letter: '',
        letterBarcode: '',
        assigneesName: '',
        assigneesUsername: '',
        creator: '',
        creatorName: '',
        creatorUsername: '',
        note: '',
        taskType: '',
        status: ''
      },
      showLoading: false,
      currentTaskForUpdate: ''
    }
  },
  components: {
    Loading
  },
  computed: {
    currentLetter() {
      return this.$store.state.currentLetter
    },
    currentMSG() {
        return this.$store.state.currentAlert
      }
  },
    apollo: {
getTaskTypes: {
      query: GetTaskTypes,
      variables: {},
      pollInterval: 300
    },
       getLetter: {
      query: GetLetter,
      variables(){ 
      return{ id: this.$store.state.currentLetter.id }
      },
      pollInterval: 300
        },
    getUsers: {
      query: GetUsers,
      variables: {}
    }
},
    methods: {
    createTask() {
      this.showLoading = true
      if(this.form.assigneesName == '' || this.form.taskType == '') {
        this.showLoading = false
        this.$store.dispatch('setCurrentAlert', {type:'error', title:'الرجاد التأكد من ادخال البيانات', show: true, time: ''})
        return
      }
      if(this.getLetter.task != ''){
        const ID = this.getLetter.task
        console.log('LetterTask = '+ID)
        
          this.$apollo.mutate({
          mutation: UpdateTask,
          variables: {
            id: ID, input: {status: 'end'}
          }
        })
        
      }
      this.$apollo
        .mutate({
          mutation: CreateTask,
          variables: {
            letter: this.currentLetter.id,
            letterBarcode: this.currentLetter.barcode,
            assigneesName: this.form.assigneesName.name,
            assigneesUsername: this.form.assigneesName.role,
        creator: localStorage.getItem('user-id'),
        creatorName: localStorage.getItem('user'),
        creatorUserName: localStorage.getItem('userName'),
        note: this.form.note,
        taskType: this.form.taskType,
        status: 'still',
          }
      }).then((response) => {
        //console.log(response.data.createTask.id)
        //this.$store.state.currentLetter.task = response.data.createTask.id
        const task = response.data.createTask.id
        const assigneesName = response.data.createTask.assigneesName
        const assigneesStatus = response.data.createTask.taskType
        this.$apollo.mutate({
          mutation: UpdateLetter,
          variables: {
            id: this.currentLetter.id, input: {task, assigneesName, assigneesStatus}
          }
        })
      }).catch((error) => {
        console.log(error)
        this.showLoading = false
        this.$store.state.currentAlert.alertShow = false
        return
      })
      this.showLoading = false
      this.$store.state.currentAlert.alertShow = false
      this.$emit('close') 
      this.$store.dispatch('setAlert', {type:'success', title:'تم إضافة الإحالة بنجاح', show: true}
        , 300)
    },
    closeModal() {
      this.$store.state.currentAlert.alertShow = false
      this.$emit('close')
    }
    }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: left;
  color: red;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
