<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <div class="flex mb-3 font-semibold text-xl text-gray-700 tracking-tight mr-2">
              <h2>عناصر فرز المعاملات</h2>
            </div>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="px-4 py-4 lg:w-1/3 xl:w-full">
                <div class="sm:flex sm:-mx-2 sm:flex-wrap">
                  <label v-for="(filter, index) in this.filterOptions" :key="filter.index" class="mt-3 flex items-center sm:w-1/4 sm:px-2 lg:w-1/2 xl:w-full">
                    <input
                      type="checkbox"
                      :name="filter.ID"
                       class="form-checkbox bg-gray-900 focus:bg-gray-700"
                       @click="checkOfCkeck(index)"
                    >
                    <span class="mr-3 ml-2 text-gray-600">{{ filter.Name }}</span>
                    <select v-model="filterData[index].filter" v-bind:disabled="!filterData[index].checked" class="mt-1 form-select block w-full text-gray-600 shadow focus:bg-gray-200 bg-gray-200"> <!-- value="" :true-value="yes" false-value="no" v-on:input="pushToOptions($event.target.value)"> -->
                      <option v-for="option in filter.options" :key="option.index" :value="filter.dataNameAf != '' ? option[filter.dataName] : option">
                        <span v-if="filter.dataNameAf != ''">{{ option[filter.dataName] }}</span>
                        <span v-else>{{ option }}</span>
                      </option>
                    </select>
                  </label>
                </div>
              </div>
            </slot>
          </div>
          <div class="flex mb-5 border-b border-gray-300"></div>
          <div class="modal-footer">
            <slot name="footer">
              <button
                class="hover:bg-green-100 text-green-500 font-bold py-2 px-4 rounded inline-flex items-center"
                @click="sendFilter"
              >
                <span>إضافة</span>
              </button>
              <button style="float: left !important;" class="hover:bg-red-100 text-red-500 font-bold py-2 px-4 rounded inline-flex items-center" @click="$emit('close')">إلغاء</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
import {
  CreateLetter,
  GetUsers,
  CreateTask,
  GetTaskTypes,
  UpdateLetter,
  GetLetters,
  GetFrom,
} from "../constants/query.gql";
export default {
  data() {
    return {
      form: {
        letter: "",
        letterBarcode: "",
        assignees: "",
        assigneesName: "",
        assigneesFirstname: "",
        creator: "",
        creatorName: "",
        creatorFirstname: "",
        note: "",
        assignDate: "",
        status: ""
      },
      filterData: [],

    };
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
      variables: {},
      pollInterval: 300
    },
    getUsers: {
      query: GetUsers,
      variables: {}
    },
      getLetters: {
      query: GetLetters,
      variables: {},
      pollInterval: 300
    },
    getFrom: {
      query: GetFrom,
      pollInterval: 300
    }
  },
  computed: {
    currentLetter() {
      return this.$store.state.currentLetter;
    },
    filterOptions() {
      
      // FROM //
      const from = this.getFrom
      const users = this.getUsers
      const taskTypes = this.getTaskTypes
      const letters = this.getLetters
      
      var res = []
        letters.forEach(function(v) {
            res.push(v.entry)
        })
       const creator = [...new Set(res)]

      var res2 = []
        letters.forEach(function(v) {
            res2.push(v.assigneesName)
        })
       const assignees = [...new Set(res2)]

      var res3 = []
        letters.forEach(function(v) {
            res3.push(v.assigneesStatus)
        })
       const assigneesStatus = [...new Set(res3)]

  console.log(this.getFrom)
      return  [
        { ID: 1, dataName: 'from',dataNameAf: 'from', Name: 'الجهة', options: from, isAcitve: false, Selected: false },
        //{ ID: 2, dataName: 'status', Name: 'الحالة', options: ['متاح', 'منجز'], isAcitve: false, Selected: false },
        { ID: 2, dataName: 'assigneesName',dataNameAf: '', Name: 'الموظف', options: assignees, isAcitve: false, Selected: false },
        { ID: 3, dataName: 'assigneesStatus',dataNameAf: '', Name: 'نوع الإحالة', options: assigneesStatus, isAcitve: false, Selected: false },
        //{ ID: 5, dataName: 'related', Name: 'الارتباط', options: ['مرتبطة', 'غير مرتبطة'], isAcitve: false, Selected: false },
        { ID: 4, dataName: 'level',dataNameAf: '', Name: 'درجة السرية', options: ['سري للغاية', 'سري'], isAcitve: false, Selected: false },
        { ID: 5, dataName: 'priority',dataNameAf: '', Name: 'الأسبقية', options: ['عاجل جدا', 'عاجل'], isAcitve: false, Selected: false },
        { ID: 6, dataName: 'entry',dataNameAf: '', Name: 'اسم المُذخل', options: creator, isAcitve: false, Selected: false },
        //{ ID: 9, dataName: 'assigneesName', Name: 'الإحالة', options: ['محالة', 'غير محالة'], isAcitve: false, Selected: false },
      ]
    }
  },
  methods: {
    createTask(e) {
      this.$apollo
        .mutate({
          mutation: CreateTask,
          variables: {
            letter: this.currentLetter.id,
            letterBarcode: this.currentLetter.barcode,
            assignees: this.form.assignees,
            assigneesName: "hassan",
            assigneesFirstname: "hassan",
            creator: this.form.creator,
            creatorName: this.form.creator,
            creatorFirstname: this.form.creator,
            note: this.form.note,
            assignDate: this.form.assignDate,
            taskType: this.form.status,
            status: this.form.status
          }
        })
        .then(response => {
          //console.log(response.data.createTask.id)
          const task = response.data.createTask.id;
          const assigneesName = response.data.createTask.assigneesName;
          const assigneesStatus = response.data.createTask.status;
          this.$apollo.mutate({
            mutation: UpdateLetter,
            variables: {
              id: this.currentLetter.id,
              input: { task, assigneesName, assigneesStatus }
            }
          });
        })
        .then(() => {
          this.cancel(e);
        })
        .catch(error => {
          console.log(error);
        });
    },
      pushToFilterData(targett) {
      this.filterData.push(targett)
    },
    checkOfCkeck(index) {
      if(this.filterData[index].checked == true) {
        this.filterData[index].checked = false
        this.filterData[index].filter = ''
        return
      }
      this.filterData[index].checked = true
    },
    sendFilter() {
      this.$store.dispatch("setFilter", this.filterData)
      this.$emit('close')
      //$emit('close')
    }
  },
  created: function () {
        this.filterData = this.filterOptions.map(el => {
             return {
                dataName: el.dataName,
                field: '',
                filter: el.options,
                checked: false
              }               
        });
    }
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
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


/*Checkboxes styles */
[type=checkbox],
[type=radio] {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0
}

.form-checkbox {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: inline-block;
    height: 1.3em;
    width: 1.3em;
    vertical-align: middle;
    border-color: transparent;
    border-width: 1px;
    border-radius: 3px;
    background-color: #EDF2F7 !important;
    border-color: #E2E8F0 !important;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
}

* {
    outline: 0;
}

.form-checkbox:checked {
    background-color: #48BB78 !important;
    border-color: #48BB78 !important;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 16 16' fill='%23fff' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3E%3C/svg%3E");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat
}

.form-checkbox::-ms-check {
    color: transparent;
    background: inherit;
    border-color: inherit;
    border-radius: inherit;
    border-width: 1px
}

.form-radio:focus:not(:checked) {
    border-color: transparent
}

.form-radio:checked {
    background-color: #667eea;
    border-color: #667eea;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 16 16' fill='%23fff' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='3'/%3E%3C/svg%3E");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat
}
</style>
