<template>
      <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
    <div class="flex mb-3 font-semibold text-xl text-gray-700 tracking-tight mr-2">
      <h2>إضافة معاملة جديدة</h2>
      <div class="inline-flex">
  <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
    وارد
  </button>
  <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
    صادر
  </button>
</div>
    </div>
          </div>

          <div class="modal-body">
            <slot name="body">
              <form class="w-full max-w-lg">
                    <div class="flex flex-wrap items-center mb-6">
    <div class="w-full">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        رقم الباركود
      </label>
    </div>
    <div class="w-1/12">
                  <label class="mt-3 sm:w-1/4 sm:px-2 flex items-center lg:w-full lg:px-0">
              <input class="form-radio bg-gray-900 focus:bg-gray-700" type="radio" name="propertyType" value="house">
              <span class="mr-2 text-gray">اوتوماتيك</span>
            </label>
    </div>
    <div class="w-1/12">
                                <label class="mt-3 sm:w-1/4 sm:px-2 flex items-center lg:w-full lg:px-0">
              <input class="form-radio bg-gray-900 focus:bg-gray-700" type="radio" name="propertyType" value="house">
              <span class="mr-2 text-gray">يدوي</span>
            </label>
    </div>
  </div>
    <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        درجة السريّة
      </label>
      <div class="relative">
        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="from" ref="from" v-model="form.from">
          <option></option>
          <option>سري</option>
          <option>سري للغاية</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
        درجة الأسبقية
      </label>
      <div class="relative">
        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="from" ref="from" v-model="form.from">
          <option>عادي</option>
          <option>عاجل</option>
          <option>عاجل جداً</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        رقم الباركود
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" name="barcode" ref="barcode" v-model="form.barcode" type="text">
      <p class="text-red-500 text-xs italic">Please fill out this field.</p>
    </div>
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
        الجهة
      </label>
      <div class="relative">
        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="from" ref="from" v-model="form.from">
          <option>شؤون الموظفين</option>
          <option>المالية</option>
          <option>الإشراف</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        رقم المعاملة
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" name="letterNo" ref="letterNo" v-model="form.letterNo" type="text">
    </div>
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
        تاريخها
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" name="letterDate" type="text" ref="letterDate" v-model="form.letterDate" placeholder="تاريخها">
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        الموضوع
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" name="subject" ref="subject" v-model="form.subject" type="text">
      <p class="text-gray-600 text-xs italic">الرجاء كتابة الموضوع كما هو موضح في المعاملة</p>
    </div>
  </div>
        <div class="w-full flex-wrap mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
        الإرتباط
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" name="status" ref="status" placeholder="رقم المعاملة أو الباركود" v-model="form.status" type="text">
    </div>
                        <div class="flex flex-wrap items-center mb-6">
    <div class="w-full flex-wrap">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        الإحالة
      </label>
    </div>
    <div class="w-1/2">
                  <label class="mt-3 sm:w-1/4 sm:px-2 flex items-center lg:w-full lg:px-0">
              <input class="form-radio bg-gray-900 focus:bg-gray-700" type="radio" name="propertyType" value="house">
              <span class="mr-2 text-gray">لا توجد</span>
            </label>
    </div>
        <div class="w-1/2">
                  <label class="mt-3 sm:w-1/4 sm:px-2 flex items-center lg:w-full lg:px-0">
              <input class="form-radio bg-gray-900 focus:bg-gray-700" type="radio" name="propertyType" value="house">
              <span class="mr-2 text-gray">توجد</span>
            </label>
    </div>
                        </div>
                            <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        نوع الإحالة
      </label>
      <div class="relative">
        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="from" ref="from" v-model="form.from">
          <option>متابعة</option>
          <option>دراسة</option>
          <option>إفادة</option>
          <option>شنطة</option>
          <option>عرض</option>
          <option>حفظ</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
        الموظف
      </label>
      <div class="relative">
        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name="from" ref="from" v-model="form.from">
          <option>عادي</option>
          <option>عاجل</option>
          <option>عاجل جداً</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
        الحالة
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" name="status" ref="status" v-model="form.status" type="text">
    </div>
</form>
            </slot>
          </div>
<div class="flex mb-5 border-b border-gray-300"></div>
          <div class="modal-footer">
            <slot name="footer">
<button class="hover:bg-green-100 text-green-500 font-bold py-2 px-4 rounded inline-flex items-center" @click="createLetter">
  <svg class="fill-current w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
  <span>إضافة</span>
</button>
              <button class="modal-default-button" @click="$emit('close')">
                إلغاء
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { CreateLetter, GetLetters } from "../constants/query.gql"
export default {
  data () {
    return {
      form: {
        barcode: '',
        letterNo: '',
        letterDate: '',
        from: '',
        subject: '',
        status: '',
        related: '',
        timeline: '',
        level: '',
        priority: '',
        entry: ''
      }
    }
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
