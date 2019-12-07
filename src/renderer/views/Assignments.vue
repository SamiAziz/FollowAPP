<template>
  <div class="px-8 pb-3">


  <div class="flex justify-between">
  <div class="text-gray-700 text-center px-4 py-2 m-2 flex justify-between">
    <a href="#" class="block pl-3 py-1 text-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-900 border-b-2 border-gray-900 xl:hover:gray-400 ml-4">الكل</a>
    <a href="#" class="block px-3 py-1 rounded text-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-600 xl:hover:gray-400 ml-4">الوارد</a>
    <a href="#" class="block px-3 py-1 rounded text-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-600 xl:hover:gray-400 ml-4">الصادر</a>
  </div>

  <div class="text-gray-700 text-center px-4 py-2 m-2 flex justify-between">

        <a href="#" class="block pt-2 rounded shadow bg-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-600 xl:hover:bg-white ml-3">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="storke-current w-5 h-5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </a>
        <a href="#" class="block pt-2 rounded shadow bg-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-600 xl:hover:bg-white ml-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="storke-current w-5 h-5"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
        </a>
        <a href="#" class="block pt-2 rounded shadow bg-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-600 xl:hover:bg-white ml-3">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="storke-current w-5 h-5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>        </a>
  </div>
</div>

    <div class="flex mb-5 border-b border-gray-300"></div>
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 mb-4 mr-6 rounded inline-flex items-center">
  <svg           class="stroke-current text-gray-700 inline-block h-5 w-5 mb-1 ml-2 pt-1"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  <span>إضافة إحالة جديد</span>
</button>
    <div class="rounded overflow-hidden rounded-lg shadow-xl bg-white mx-6 pt-1">
  <div class="pl-2">

  <taskModal v-if="taskModalStatus" @close="taskModalStatus = false" />
  </div>
        <Pagination :list-data="getTasks"/>
    </div>
<!--
  <div class="flex justify-between mt-8">
  <div class="text-gray-700 text-center px-4 py-2 m-2 flex justify-between">
    <a href="#" class="block pl-3 py-1 text-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-900 border-b-2 border-gray-900 xl:hover:gray-400 ml-4">الكل</a>
    <a href="#" class="block px-3 py-1 rounded text-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-600 xl:hover:gray-400 ml-4">لجان الوزير</a>
    <a href="#" class="block px-3 py-1 rounded text-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-600 xl:hover:gray-400 ml-4">اللجان الأخرى</a>
  </div>

  <div class="text-gray-700 text-center px-4 py-2 m-2 flex justify-between">

        <a href="#" class="block pt-2 rounded shadow bg-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-600 xl:hover:bg-white ml-3">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="storke-current w-5 h-5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </a>
        <a href="#" class="block pt-2 rounded shadow bg-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-600 xl:hover:bg-white ml-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="storke-current w-5 h-5"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
        </a>
        <a @click="gothere" href="#" class="block pt-2 rounded shadow bg-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-600 xl:hover:bg-white ml-3">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="storke-current w-5 h-5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>        </a>
  </div>
</div>

    <div class="flex mb-5 border-b border-gray-300"></div>

                 <div class="rounded overflow-hidden rounded-lg shadow-xl bg-white mx-6 pt-1">
                     <div class="table-auto">
          <table class="table" style="align-items: center;">
            <thead class="bg-gray-100">
              <tr>
                <th>رقمها</th>
                <th>تاريخ اقرارها</th>
                <th>تصنيف اللجنة</th>
                <th>الموضوع</th>
                <th>درجة السرية</th>
                <th>درجة الأسبقية</th>
                <th>حالة اللجنة</th>
                <th>المدة الزمنية</th>
                <th>تفاصيل اللجنة</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>١</td>
                <td>١٤٤٠/٠٧/٠١</td>
                <th>لجنة دائمة - مكتب الوزير</th>
                <td>تطوير مرافق الاسكان</td>
                <td>-</td>
                <td>-</td>
                <td style="color: #48BB78 !important;">قائمة</td>
                <td>منذ ٤ أشهر</td>
                <td class="underline">التفاصيل</td>
              </tr>
              <tr>
                <td>١٠٠٢</td>
                <td>١٤٤٠/١٠/٠٦</td>
                <th>لجنة مهام - هيئة الإمداد والتموين</th>
                <td>توفير ذخيرة لإعادة تزويد القطاعات</td>
                <td>سري للغاية</td>
                <td><span class="rounded rounded-lg py-1 px-2 text-sm bg-red-100 text-red font-semibold" style="color: red !important;">عاجل جدا</span></td>
                <td style="color: #48BB78 !important;">قائمة</td>
                <td>منذ شهر</td>
                <td class="underline">التفاصيل</td>
              </tr>
              <tr>
                <td>٩١٠٠٢</td>
                <td>١٤٣٩/١٠/٠٦</td>
                <th>لجنة تمهيدية - الشؤون الصحية</th>
                <td>استقطاب كوادر طبية</td>
                <td>-</td>
                <td>-</td>
                <td style="color: #A0AEC0 !important;">انتهت</td>
                <td>خلال ٩ أشهر</td>
                <td class="underline">التفاصيل</td>
              </tr>
            </tbody>
          </table>
        </div>
                 </div>
                 -->

  </div>
</template>

<script>
import { mapState } from "vuex"
import Pagination from '@/components/AssignmentsPagination'
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
  name: "assignments-page",
  data() {
      return {
          taskModalStatus: false,
          currentTask: '',
          letterCount: 0,
          currentTaskLetter: '',
          currentColor: '',
      }
  },
  components: {
      taskModal,
      Pagination
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
      //pollInterval: 300
    }
  },
  methods: {
      openTaskModal(letter) {
        this.$store.dispatch("setLetter", letter)
        this.taskModalStatus = true
        console.log('ok all')
      },
      gothere() {
        this.$router.push('/view')
      }
  },
  computed: {
      
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
</style>
