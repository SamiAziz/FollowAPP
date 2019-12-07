<template>
  <div class="px-8 pb-3">


  <div class="flex justify-between">
  <div class="text-gray-700 text-center px-4 py-2 m-2 flex justify-between w-full">
    <p class="text-gray-500 pt-2 text-lg">إحصائيات عامة</p>
  </div>

<div class="text-gray-700 text-center px-4 py-2 m-2 flex justify-between w-full">

      </div>

  <div class="text-gray-700 text-center px-4 py-2 m-2 flex justify-between">
        <a href="#" class="block pt-2 rounded shadow bg-white hover:bg-gray-400 sm:text-base sm:px-2 xl:text-gray-600 xl:hover:bg-white ml-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="storke-current w-5 h-5"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
        </a>

 </div>
</div>

<div class="flex mb-4 border-b border-gray-300"></div>

<div class="flex items-center  mx-2 pt-1">
  <div class="flex-1 text-gray-700 text-center py-2">
    <div class="rounded overflow-hidden rounded-lg mx-4 px-1 py-1 shadow-md bg-white">
      <h1 class="pt-3 text-lg text-gray-600">المعاملات</h1>
      <div class="pl-3 pt-3"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="storke-current text-gray-600 text-center inline-flex" style="padding: 0 !important; margin: 0 !important; font-weight: 0 !important;"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg></div>
      <div class="text-4xl font-semibold" style="padding-top: -10px !important; margin-top: -10px !important;">{{ getLetters.length }}</div>
    </div>
  </div>

  <div class="flex-1 text-gray-700 text-center py-2">
    <div class="rounded overflow-hidden rounded-lg mx-4 px-1 py-1 shadow-md bg-white">
      <h1 class="pt-3 text-lg text-gray-600">الإحالات</h1>
      <div class="pl-3 pt-3"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="storke-current text-gray-600 text-center inline-flex" style="padding: 0 !important; margin: 0 !important; font-weight: 0 !important;"><polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path></svg></div>
      <div class="text-4xl font-semibold" style="padding-top: -10px !important; margin-top: -10px !important;">{{ getTasks.length }}</div>
    </div>
  </div>

  <div class="flex-1 text-gray-700 text-center py-2">
    <div class="rounded overflow-hidden rounded-lg mx-4 px-1 py-1 shadow-md bg-white">
      <h1 class="pt-3 text-lg text-gray-600">المستخدمين</h1>
      <div class="pl-3 pt-3"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="storke-current text-gray-600 text-center inline-flex" style="padding: 0 !important; margin: 0 !important; font-weight: 0 !important;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
      <div class="text-4xl font-semibold" style="padding-top: -10px !important; margin-top: -10px !important;">{{ getUsers.length }}</div>
    </div>
  </div>
</div>

    <div class="flex mb-5 mt-4 border-b border-gray-300"></div>

      <div class="rounded overflow-hidden rounded-lg mx-6 pt-1 shadow-xl bg-white">
        <div class="px-6 py-4">
          <div class="pb-3 text-xl">المعاملات</div>
          <div class="flex rounded overflow-hidden bg-white">
            <div class="flex-1 px-6 py-4 w-48">
                <canvas id="income-chart"></canvas>
            </div>
            <div class="flex-1 px-6 py-4 w-48">
              <canvas id="status-chart"></canvas>
            </div>
          </div>
          <div class="flex justify-center px-6 py-4 w-2/3 pr-8 mr-48">
            <canvas id="from-chart"></canvas>
          </div>
        </div>

      </div>
      </div>
</template>

<script>
import Chart from 'chart.js'
import 'chartjs-plugin-labels';
import planetChartData from '../chart-data'
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
    name: "home-page",
data() {
  return {
    currentView: 'all',
    planetChartData: planetChartData
  }
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
      pollInterval: 300
    }
  },
  computed:{
    lettersArr() {
      var out = []
      var completed = 0
      var still = 0
      var outgoing = 0
      var income = 0
    
this.getLetters.forEach(function(element) {
  if (element.status === 'done') {
    completed++
  } else { still++ }


  if (element.letterType === 'out') {
    outgoing++
  } else { income++ }
  

})
    out.push({
    completed: completed,
    still: still,
    outgoing: outgoing,
    income: income
  })
  
      return out
    },
    lettersData() {
 var res = {};
this.getLetters.forEach(function(v) {
  res[v.from] = (res[v.from] || 0) + 1;
})
console.log(res)
console.log(Object.keys(res))
console.log(Object.values(res))
return res
    }
  },
methods: {
  createChart(chartId, chartData, lbs, chartType) {
    const ctx = document.getElementById(chartId);
    const myChart = new Chart(ctx, {
type: chartType,
    data: {
      labels: lbs,
      datasets: [
        { // one line graph
          label: '',
          data: chartData,
          backgroundColor: [
            '#CBD5E0', 
            '#718096'
          ],
        }
      ]
    },
    options: {
      scales: {
        xAxes: [{
            barPercentage: 1,
            barThickness: 16,
            maxBarThickness: 18,
            minBarLength: 12,
            gridLines: {
                offsetGridLines: true
            }
        }],
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    },
      responsive: true,
      lineTension: 1,
plugins: {
      labels: {
        // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
        render: 'value',

        // precision for percentage, default is 0
        precision: 0,

        // identifies whether or not labels of value 0 are displayed, default is false
        showZero: true,

        // font size, default is defaultFontSize
        fontSize: 16,

        // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
        fontColor: '#fff',

        // font style, default is defaultFontStyle
        fontStyle: 'bold',

        // font family, default is defaultFontFamily
        fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
}
}
    }
    });
  }
},
mounted() {
  this.createChart('status-chart', [this.lettersArr[0].outgoing, this.lettersArr[0].income], ['الصادر', 'الوارد'], 'pie')
  this.createChart('income-chart', [this.lettersArr[0].completed, this.lettersArr[0].still], ['معاملات منجزة', 'معاملات غير منجزة'], 'pie')

  this.createChart('from-chart', Object.values(this.lettersData), Object.keys(this.lettersData), 'bar')
}
}
</script>
