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
      <h2>إضافة نوع إحالة</h2>
    </div>
          </div>

          <div class="modal-body">
            <slot name="body">
              <form class="w-full max-w-lg">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 mb-2" for="task-type-name">
       الإحالة
      </label>
      <input class="opacity-50 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="task-type-name" name="taskType" ref="taskType" v-model="form.taskType" type="text">
    </div>
    <div class="w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 mb-2" for="task-desc">
        وصف الإحالة
      </label>
      <input class="opacity-50 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="task-desc" name="taskDesc" ref="taskDesc"  v-model="form.taskDesc" type="text">
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
          <button @click="createAssignees" class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded" type="button">
          إضافة
      </button>
  </div>
  <div class="flex-1 text-gray-700 text-center"></div>
  <div class="flex-1 text-gray-700 text-center self-end">
                  <button class="align-left hover:bg-red-100 text-red-500 font-bold py-2 px-4 rounded" @click="closeModal">
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
import { CreateTaskType, GetTaskTypes } from "../constants/query.gql"

export default {
  data () {
    return {
      form: {
        taskType: '',
        taskDesc: ''
      },
      showLoading: false
    }
  },
  components: {
    Loading
  },
  computed: {
    currentMSG() {
        return this.$store.state.currentAlert
      }
  },
    apollo: {
    /*
    getUser: {
      query: GetUser,
      variables: {}
    },
    */ 

    getTaskTypes: {
      query: GetTaskTypes,
      variables: {}
    }
},
    methods: {
    createAssignees() {
      this.showLoading = true
      if(this.form.taskType == '') {
        this.showLoading = false
        this.$store.dispatch('setCurrentAlert', {type:'error', title:'الرجاء التأكد من ادخال الإحالة', show: true, time: ''})
        return
      }
      // Check if there is like //
      this.$apollo
        .mutate({
          mutation: CreateTaskType,
          variables: {
            taskType: this.form.taskType,
            taskDesc: this.form.taskDesc,
          }
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
