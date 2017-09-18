<template>
  <div class="archive container">
    <div class="row">
        <div class="col-xs-6 col-xs-offset-3" >
            <div class="col-xs-12 list">
                <h3>Archived Items:</h3>
                <ul v-for="item in archive">
                    <li v-on:click="prepareItem(item)" class="col-xs-12">
                        {{item}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div v-if="showModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container col-xs-4 col-xs-offset-4">
                <div class="modal-header">
                    <h3>Delete Item?</h3>
                </div>
                <div class="modal-body">
                  <p>
                      {{preparedItem}}
                  </p>
                </div>
                <div class="modal-footer">
                  <button class="btn btn-md btn-primary modal-close-button" v-on:click="close">
                    Cancel
                  </button>
                  <button class="btn btn-md btn-danger" v-on:click="removeItem">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo',
  beforeMount() {
    if (this.$localStorage.get('archive')) {
      this.archive = JSON.parse(this.$localStorage.get('archive'))
    }
  },
  updated() {
    var that = this
    that.$nextTick(function() {
      that.$localStorage.set('archive', JSON.stringify(that.archive))
    })
  },
  data() {
    return {
      archive: [],
      preparedItem: {},
      msg: 'Welcome to Your Vue.js Todo App',
      message: 'You loaded this page on ' + new Date().toLocaleString(),
      showModal: false
    }
  },
  methods: {
    prepareItem(item) {
      this.preparedItem = item
      this.showModal = true
    },
    moveItem() {
      this.removeItem()
      this.lists[this.toName].items.push(this.preparedItem)
      this.close()
      this.toName = ''
    },
    removeItem() {
      let index = this.archive.indexOf(this.preparedItem)
      this.archive.splice(index, 1)
    },
    close() {
      this.showModal = false
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
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-close-button {
  float: left;
}

.modal-default-button {
    float: right;
}
</style>
