<template>
<div>
                     <div class="table-auto">
          <table class="table overflow-y-auto" style="align-items: center;">
            <thead class="bg-gray-100">
              <tr>
                <th>رقم المعاملة</th>
                <th>تاريخ المعاملة</th>
                <th>الجهة</th>
                <th>الموضوع</th>
                <th>آخر إحالة</th>
                <th>درجة السرية</th>
                <th>الأسبقية</th>
                <th>الإرتباط</th>
                <th>اسم المدخل</th>
                <th>حالة المعاملة</th>
                <th>تاريخ الإدخال</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="letter in paginatedData" v-bind:key="letter.index" @click="toView(letter)" :class="letter.status == 'cancel' ? 'cancelLetter' : ''">
                <td>{{ letter.letterNo }}</td>
                <td>{{ letter.letterDate }}</td>
                <th>{{ letter.from }}</th>
                <td>{{ letter.subject }}</td>
                <td v-if="letter.task">{{ letter.assigneesName }} - {{ letter.assigneesStatus }}</td>
                <td v-else>غير محالة</td>
                <td>{{ letter.level }}</td>
                <td>{{ letter.priority }}</td>
                <td>{{ letter.related }}</td>
                <td>{{ letter.entry }}</td>
                <td v-if="letter.status == 'still'" class="bg-teal-100 text-teal-600 font-semibold">متاحة</td>
                <td v-else-if="letter.status == 'cancel'">ملغية</td>
                <td v-else class="bg-gray-100 text-gray-600 font-semibold">مقفلة</td>
                <td>{{ formateDate(letter.createdAt) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

          <div class="flex justify-center bg-gray-100" style="padding-bottom: 0 !important; margin-bottom: -7px !important;">
  <div class="text-gray-700 text-center px-4 pt-2 flex">
                    <button v-if="pageNumber >= pageCount -1" 
                  class="bg-gray-300 text-gray-800 rounded opacity-50 cursor-not-allowed py-2 px-4 mb-4 mr-4 rounded inline-flex items-center">
                    <svg class="stroke-current text-gray-700 inline-block h-5 w-5 mb-1 ml-2 pt-1"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            <span>التالي</span>
          </button>
                    <button v-else
                  @click="nextPage" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 mb-4 mr-4 rounded inline-flex items-center">
                                      <svg class="stroke-current text-gray-700 inline-block h-5 w-5 mb-1 ml-2 pt-1"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            <span>التالي</span>
          </button>
  </div>

 <div class="text-gray-700 text-center px-4 mt-2 flex" v-if="listData.length !== 0" style="direction: ltr;">
  <button v-for="page in pageCount" :key="page.index" class="rounded-full mx-2 h-10 w-10 flex items-center justify-center" :class="page == (pageNumber+1) ? ' bg-gray-300 opacity-50 cursor-not-allowed' : ' bg-gray-300' " @click="pageNumber = page-1"> {{ page }} </button>
  </div>

    <div class="text-gray-700 text-center px-4 pt-2 flex">
                                        <button v-if="pageNumber === 0"
                class="bg-gray-300 text-gray-800 rounded opacity-50 cursor-not-allowed py-2 px-4 mb-4 ml-4 rounded inline-flex items-center">

            <span>السابق</span>
                                                <svg class="stroke-current text-gray-700 inline-block h-5 w-5 mb-1 mr-2 pt-1"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
          <button v-else 
                  @click="prevPage" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 mb-4 ml-4 rounded inline-flex items-center">

            <span>السابق</span>
                                                                  <svg class="stroke-current text-gray-700 inline-block h-5 w-5 mb-1 mr-2 pt-1"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>

  </div>
          </div>
          <p class=" bg-gray-100 text-gray-700 pr-4 pb-3"> إجمالي المعاملات الحالية<b class="text-gray-700"> ( {{ listData.length }}  )</b></p>
          </div>
</template>

<script>
var moment = require('moment-hijri')
export default {
      data(){
    return {
      //pageNumber: 0
    }
  },
  props:{
    listData:{
      type:Array,
      required:true
    },
    size:{
      type:String,
      required:false,
      default: 10
    },
    pageNumber:{
      type:Number
    }
  },
  methods:{
      nextPage(){
         this.pageNumber++;
      },
      prevPage(){
        this.pageNumber--;
      },
      toView(letter) {
        this.$store.dispatch("setLetterData", letter)
        this.$router.push({ name: 'letterview-page'})
      },
    formateDate(date) {
      return moment(date, 'YYYY-M-D HH:mm:ss').format('iYYYY/iM/iD')
    }
  },
  computed:{
    pageCount(){
      let l = this.listData.length,
          s = this.size;
      //return Math.floor(l/s);
      return Math.ceil(l/s);
    },
    paginatedData(){
      const start = this.pageNumber * this.size,
            end = start + this.size;
      return this.listData
               .slice(start, end);
    }//moment('2014-11-28 16:40:00', 'YYYY-M-D HH:mm:ss').endOf('iMonth').format('iYYYY/iM/iD HH:mm:ss');
}
}
</script>

<style>
</style>
