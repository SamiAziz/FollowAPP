<template>
      <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
    <div class="flex mb-4 font-semibold text-xl text-gray-700 tracking-tight mr-2">
      <h2>{{ confirmMSG.title }}</h2>
    </div>
          </div>

          <div class="modal-body">
            <slot name="body">

            </slot>
          </div>
<div class="flex mb-5 border-b border-gray-300"></div>
          <div class="modal-footer">
            <slot name="footer">

<div class="flex items-center">
  <div class="flex-1 text-gray-700 text-center">
          <button @click="deleteTaskType(confirmMSG.data.id)" class="shadow bg-green-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
          حذف
      </button>
  </div>
  <div class="flex-1 text-gray-700 text-center"></div>
  <div class="flex-1 text-gray-700 text-center self-end">
                  <button class="align-left shadow bg-red-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" @click="closeModal">
                إلغاء
              </button>
  </div>
</div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex"
import { DeleteTaskType } from "../constants/query.gql"

export default {
  data () {
      return {

      }
  },
  components: {

  },
  computed: {
    confirmMSG() {
        return this.$store.state.confirmModal
      }
  },
    methods: {
        deleteTaskType(ID) {
    const id = ID
      this.$apollo.mutate({
        mutation: DeleteTaskType,
        variables: { id }
      })
            this.$store.state.confirmModal.show = false
            this.$emit('close')
        },
        closeModal() {
            this.$store.state.confirmModal.show = false
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
  width: 400px;
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
