<template>
      <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
                <transition name="slide-fade">
<div v-if="msg.alertShow" :class="msg.alertType == 'success' ? 'z-20 absolute bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded w-auto ml-3 shadow-lg': 'z-20 absolute bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-auto ml-3 shadow-lg'" role="alert">
    <strong class="font-bold pr-6">{{ msg.alertTitle }}</strong>
    <span class="absolute top-0 bottom-0 right-0 px-4 py-4">
        <svg v-if="msg.alertType == 'success'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-green-500 h-5 w-5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>  
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-red-500 h-5 w-5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>  
    </span>
</div>
      </transition>

          <div class="modal-header">
    <div v-if="this.userDataComputed != ''" class="flex mb-3 font-semibold text-xl text-gray-700 tracking-tight mr-2">
      <h2> تعديل بيانات <span class="text-blue-700 font-lg">( {{ this.userDataComputed.name }} )</span></h2>
    </div>

        <div v-else class="flex mb-3 font-semibold text-xl text-gray-700 tracking-tight mr-2">
      <h2>إضافة مستخدم جديد</h2>
    </div>
          </div>

          <div class="modal-body">
            <slot name="body">
              <form v-if="this.userDataComputed.length != 0" class="w-full items-center max-w-auto pl-8 mb-3">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3 mb-6 md:mb-0">
      <label class="block uppercase text-gray-700 text-md mb-2" for="barcode">
        الاسم
      </label>
      <input :value="this.userDataComputed.name" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name" name="name" ref="name" type="text" placeholder="اسم الموظف">
    </div>
  </div>

    <div class="flex flex-wrap -mx-3 mb-2">
    <div class="w-full px-3">
      <label class="block uppercase  text-gray-700 text-md  mb-2" for="userName">
        اسم المستخدم
      </label>
      <input :value="this.userDataComputed.userName" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="user-name" name="userName" ref="userName" type="text" placeholder="اسم المستخدم">
    </div>
  </div>

    <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase  text-gray-700 text-md  mb-2" for="subject">
        كلمة المرور
      </label>
      <input :value="this.userDataComputed.password" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password" name="password" ref="password" type="text" placeholder="كلمة المرور">
    </div>
  </div>

  <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full px-3">
      <label class="block uppercase  text-gray-700 text-md  mb-2" for="role">
        نوع المستخدم
      </label>
      <div class="relative">
        <select :value="this.userDataComputed.role" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="role" name="role" ref="role">
          <option>مذخل بيانات</option>
          <option>موظف</option>
          <option>مشرف</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  </div>

<div class="flex mb-4 border-b border-gray-300 items-center"></div>
      <div class="w-full flex justify-between px-3 mt-2 md:mb-0">
        <div class="mx-1">
            <button @click="saveEditUser()" class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded" type="button">
          حفظ التعديل
      </button>
    </div>
            <div class="mx-1 items-right m-auto">
    </div>

            <div class="mr-56">
      <button @click="$emit('close')" class="hover:bg-red-100 rounded text-red-500 font-bold py-2 px-4 rounded" type="button">
        إلغاء
      </button>
    </div>
    </div>
</form>

              <form v-else class="w-full items-center max-w-auto pl-8 mb-3">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3 mb-6 md:mb-0">
      <label class="block uppercase text-gray-700 text-md mb-2" for="name">
        الاسم
      </label>
      <input v-model="form.name" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name" name="name" ref="name" type="text" placeholder="اسم الموظف">
    </div>
  </div>

    <div class="flex flex-wrap -mx-3 mb-2">
    <div class="w-full px-3">
      <label class="block uppercase  text-gray-700 text-md  mb-2" for="userName">
        اسم المستخدم
      </label>
      <input v-model="form.userName" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="userName" name="userName" ref="userName" type="text" placeholder="اسم المستخدم">
    </div>
  </div>

    <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase  text-gray-700 text-md  mb-2" for="password">
        كلمة المرور
      </label>
      <input v-model="form.password" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password" name="password" ref="password" type="text" placeholder="كلمة المرور">
    </div>
  </div>

  <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full px-3">
      <label class="block uppercase  text-gray-700 text-md  mb-2" for="role">
        نوع المستخدم
      </label>
      <div class="relative">
        <select v-model="form.role" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="role" name="role" ref="role">
          <option>مدخل بيانات</option>
          <option>موظف</option>
          <option>مشرف</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  </div>

<div class="flex mb-4 border-b border-gray-300 items-center"></div>
      <div class="w-full flex justify-between px-3 mt-2 md:mb-0">
        <div class="mx-1">
      <button @click="addNewUser(true)" class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded" type="button">
          إضافة
      </button>

    </div>
            <div class="mx-1 items-right m-full">
      <button @click="addNewUser(false)" class="hover:bg-teal-100 text-teal-500 font-bold py-2 px-1 rounded" value="ffddd" type="button">
        إضافة متعددة
      </button>
    </div>

            <div class="mr-56">
      <button @click="$emit('close')" class="hover:bg-red-100 rounded text-red-500 font-bold py-2 px-4 rounded" type="button">
        إلغاء
      </button>
    </div>
    </div>
</form>
            </slot>
          </div>
        </div>
      </div>
      <Loading v-if="showLoading" />
    </div>
  </transition>
</template>

<script>
import { CreateUser, UpdateUser } from "../constants/query.gql"
import Loading from '@/components/Loading.vue'
export default {
  name: "user-modal",
  data () {
    return {
      form: {
        name: '',
        userName: '',
        password: '',
        role: ''
      }
    }
  },
  components: {
    Loading
  },
    methods: {
    createLetter() {
      //console.log(this.form)
      //const {barcode, letterNo, letterDate, from, subject, status, related, timeline, level, priority, entry} = this.from
      //console.log(barcode)
      this.$apollo
        .mutate({
          mutation: CreateLetter,
          variables: {
            barcode: this.form.barcode,
            letterNo: this.form.letterNo,
        letterDate: this.form.letterDate,
        from: this.form.from,
        subject: this.form.subject,
        status: this.form.status,
        related: this.form.related,
        timeline: this.form.timeline,
        level: this.form.level,
        priority: this.form.priority,
        entry: this.form.entry
          }/*,
        update: (store, { data: { createLetter } }) => {
          try {
            const data = store.readQuery({query: GetLetters})
            data.getLetters.push(createLetter)
            store.writeQuery({
              query: GetLetters,
              data
            })
          } catch(err) {
            console.log(err)
          }
        }
      }).then(() => {
        this.$emit('close')
      }).catch((error) => {
        console.log(error)
      })
      */
    })
    },
    addNewUser(exit) {
      this.showLoading = true
      if(this.form.name == '' || this.form.userName == '' || this.form.password == '' || this.form.role == '') {
           //return this.alertSatuation('error', 'الرجاء التأكد من ادخال البيانات', true)
        this.showLoading = false
        this.$store.dispatch('setAlert', {type:'error', title:'الرجاد التأكد من ادخال البيانات', show: true})
        return
        }
        const {name, userName, password, role} = this.form
        if (exit) {  
        setTimeout(() => 
        {
        this.$apollo.mutate({
          mutation: CreateUser,
          variables: { name, userName, password, role }
        }).catch((error) => {
          console.log(error)
          this.showLoading = false
          return
        })
        this.showLoading = false
        this.$emit('close')
        this.$router.push("Settings")
        this.$store.dispatch('setAlert', {type:'success', title:'تم إضافة المستخدم بنجاح', show: true})}
        , 300)      
        return    
        }
        setTimeout(() => 
        {
        this.$apollo.mutate({
          mutation: CreateUser,
          variables: { name, userName, password, role }
        }).catch((error) => {
          console.log(error)
          this.showLoading = false
          return
        })
        this.showLoading = false
              form= {
        name: '',
        userName: '',
        password: '',
        role: ''
      }
        this.$store.dispatch('setAlert', {type:'success', title:'تم إضافة المستخدم بنجاح', show: true})}
        , 300)
        
        // clear data to start again
    },
    saveEditUser() {
      this.$store.state.showLoading = true
      console.log(this.$refs.userName.value)
      if(this.$refs.name.value == '' || this.$refs.userName.value == '' || this.$refs.password.value == '' || this.$refs.role.value == '') {
           //return this.alertSatuation('error', 'الرجاء التأكد من ادخال البيانات', true)
           this.$store.state.showLoading = false
           this.$store.dispatch('setAlert', {type:'error', title:'الرجاد التأكد من ادخال البيانات', show: true})
            return
        }
        const name = this.$refs.name.value
        const userName = this.$refs.userName.value
        const password = this.$refs.password.value
        const role = this.$refs.role.value
      setTimeout(() => 
        {
        this.$apollo.mutate({
        mutation: UpdateUser,
        variables: {
          id: this.$store.state.editUser.id, 
          input: {
            name,
            userName,
            password,
            role
          }
        },
      }).catch((error) => {
        console.log(error)
          this.$store.state.showLoading = false
          return
        })
        this.$store.state.showLoading = false
        this.$emit('close')
        this.$store.dispatch('setAlert', {type:'success', title:'تم تعديل المستخدم بنجاح', show: true})}
        , 300)

        // this.$store.dispatch('setAlert', {type:'success', title:'تم تعديل المعاملة بنجاح', show: true})
        // clear data to start again
    }
    },
    computed: {
      userDataComputed() {
        return this.$store.state.editUser
      },
    msg() {
        return this.$store.state.alert
      },
      showLoading() {
        return this.$store.state.showLoading
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
