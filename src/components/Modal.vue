<template>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container col-xs-4 col-xs-offset-4">

            <div class="modal-header">
                <h3>Move from {{preparedItem.title}}</h3>
            </div>

            <div class="modal-body">
                <div class="form-group">
                    <label for="toName">To:</label>
                    <select class="form-control" name="toName" v-model="toName">
                        <option disabled default value="">
                            Select a Destination
                        </option>
                        <option v-for="list in lists" v-if="list.name !== preparedItem.name" :value="list.name">
                            {{list.title}}
                        </option>
                    </select>
                </div>
                <p>
                  {{preparedItem.text}}
              </p>
            </div>

            <div class="modal-footer">
              <button class="btn btn-md btn-danger" v-on:click="close">
                Cancel
              </button>
              <button class="btn btn-md btn-success" v-on:click="moveItem">Move</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
export default {
  name: 'modal',
  props: ['preparedItem', 'lists', 'showModal'],
  data() {
    return {
      toName: ''
    }
  },
  methods: {
    moveItem() {
      let index = this.lists[this.preparedItem.name].items.indexOf(
        this.preparedItem.text
      )
      this.lists[this.preparedItem.name].items.splice(index, 1)
      this.lists[this.toName].items.push(this.preparedItem.text)
      this.close()
      this.toName = ''
    },
    close() {
      this.$emit('update:showModal', false)
    }
  }
}
</script>

<style scoped>
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
