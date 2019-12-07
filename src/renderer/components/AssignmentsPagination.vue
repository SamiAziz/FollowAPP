<template>
<div>
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
              <tr v-for="task in paginatedData" v-bind:key="task.index">
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

          <div class="flex justify-center" style="padding-bottom: 0 !important; margin-bottom: -7px !important;">
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
          </div>
</template>

<script>
export default {
      data(){
    return {
      pageNumber: 0
    }
  },
  props:{
    listData:{
      type:Array,
      required:true
    },
    size:{
      type:Number,
      required:false,
      default: 4
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
        //this.$store.dispatch("setLetter", letter)
        this.$router.push({ name: 'letterview-page', params: {letterData: letter }})
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
    }
}
}
</script>

<style>
</style>
