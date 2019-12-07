<template>

<div class="w-screen h-screen login bg-gray-800"> <!-- Greate for center V/H -->
<div class="absolute w-1/3 -mt-64 bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-1 py-1 shadow-md" role="alert">
  <div class="flex">
    <div>
      <p class="font-bold">توجد مشكلة في الاتصال مع السيرفر</p>
    </div>
      <a href="#" @click="showServerConfig" class="no-underline hover:underline absolute top-0 bottom-0 left-0 pl-3 pt-1">
    اصلاح
  </a>
  </div>
</div>
  <div class="absolute -mt-48">
    <h1 class="mt-1 text-white font-bold text-4xl text-lg">برنامج متابعة المعاملات</h1>
  </div>
      <div v-if="!showConfig" class="w-1/3 h-auto bg-white rounded-lg px-4 py-4 shadow-lg">
      <p v-if="this.error" class="font-bold bg-red-100 text-red-500 text-center rounded-lg py-1 mb-2">{{ this.error }}</p>
        <h4 class="mt-1 text-gray-900 font-semibold text-xl mr-12">تسجيل الدخول</h4>
        <form class="w-full mt-4">
  <div class="flex items-center mb-6">
    <div class="w-1/4 mx-8">
      <label class="text-gray-500 text-right mb-1 mb-0 pr-4" for="user-name">
        اسم المستخدم
      </label>
    </div>
    <div class="w-1/2">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500" id="user-name" v-model="form.userName" type="text" placeholder="اسم المستخدم">
    </div>
  </div>
  <div class="flex items-center mb-6">
    <div class="w-1/4 mx-8">
      <label class="text-gray-500 text-right mb-1 mb-0 pr-4" for="password">
        كلمة المرور
      </label>
    </div>
    <div class="w-1/2">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500" id="password" v-model="form.password" type="password" placeholder="******************">
    </div>
  </div>
<div class="flex mb-4 border-b border-gray-300"></div>

  <div class="flex items-center">
    <div class="w-1/3"></div>
    <div class="w-1/2 mr-8">
      <button @click="login" class="shadow bg-teal-500 hover:bg-teal-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
        تسجيل الدخول
      </button>
    </div>
  </div>
</form>
      </div>
            <div v-else class="w-1/3 h-auto bg-white rounded-lg px-4 py-4 shadow-lg">
        <h4 class="mt-1 text-gray-900 font-semibold text-xl mr-12">إعدادات السيرفر</h4>
        <form class="w-full mt-4">
  <div class="flex items-center mb-6">
    <div class="w-1/4 mx-8">
      <label class="text-gray-500 text-right mb-1 mb-0 pr-4" for="user-name">
        قاعدة البيانات
      </label>
      <span>
        {{ this.$store.state.serverIp }}
      </span>
    </div>
    <div class="w-1/2">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500" id="user-name" v-model="currentIp" type="text" placeholder="">
    </div>
  </div>
<div class="flex mb-4 border-b border-gray-300"></div>

  <div class="flex items-center">
    <div class="w-1/3"></div>
    <div class="w-1/2 mr-8">
      <button @click="saveEdit" class="shadow bg-teal-500 hover:bg-teal-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
        حفظ التعديلات
      </button>
      <button @click="showConfig = !showConfig" class="shadow bg-red-500 hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
        إلغاء
      </button>
    </div>
  </div>
</form>
      </div>
      <div class="bg-gray-800 px-4 py-4 sm:text-right" style="bottom: 0 !important; position: fixed; width: inherit;">
          <p class="text-center text-gray-500 text-xs">
    FllowApp - V 1.0.0
  </p>
      </div>
  </div>

</template>

<script>
import { Login, GetUser } from '../constants/query.gql'
const Storage = require('electron-store');
const storage = new Storage();

export default {
  name: 'login-page',
  data(){
    return {
      error: false,
      serverError: false,
      showConfig: false,
      currentIp: '',
      form: {
        userName: '',
        password: '',
      }
    }
  },
  methods: {
    logout() {
      this.$router.push('/Income')
    },
    login() {
      // const validated = await this.$validator.validate()
      const { userName, password } = this.form
      if (userName !== '' && password !== '') {
        this.$apollo.mutate({
          mutation: Login,
          variables: { userName, password }
        }).then(async (data) => {
          const login = data.data.login
          const id = login.user.id
          const user = data.data.login.user.name
          const userName = data.data.login.user.userName
          const userRole = data.data.login.user.role
          const token = login.token
          this.saveUserData(id, user, userName, userRole, token)
          console.log(data.data.login.user)
          this.$router.push('/Income')
          //console.log(id)
        }).catch((error) => {
          this.error = 'اسم المستخدم او كلمة المرور خاطئة'
          console.log(error)
        })
        return
      }
      this.error = 'الرجاء ادخال اسم المستخدم وكلمة المرور'
    },
    saveUserData (id, user, userName, userRole, token) {
      //storage.set('unicorn', '🦄');
      console.log(storage.get('serverIp'));
      localStorage.setItem('user-id', id)
      localStorage.setItem('user', user)
      localStorage.setItem('userName', userName)
      localStorage.setItem('userRole', userRole)
      localStorage.setItem('user-token', token)
      this.$root.$data.userId = localStorage.getItem('user-id')
    },
    showServerConfig() {
      this.showConfig = true
    },
    saveEdit() {
      if(this.currentIp == '') {
        console.log('Please fill the input')
        return
      }
      storage.set('serverIp', this.currentIp);
      this.$store.state.serverIp = storage.get('serverIp')
      this.currentIp = ''
      this.showConfig = false
    }
  }
}
</script>

<style scoped>
.login {
      display: -webkit-flexbox;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    justify-content: center;
}
</style>
