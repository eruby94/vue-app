<template>
  <div class="archive container">
    <div class="row">
        <div class="col-xs-6 col-xs-offset-3" >
            <div class="col-xs-12 list">
                <h3>Archived Items:</h3>
                <div v-for="item in archive" v-on:click="prepareItem(item)" class="col-xs-12 item">
                  {{item}}
                </div>
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
                <div class='modal-body'>
                    <div class='form-group'>
                        <label for='toName'>To:</label>
                        <select class='form-control' name='toName' v-model='toName'>
                            <option disabled default value=''>
                                Select a Destination
                            </option>
                            <option v-for='list in lists' :value='list.name'>
                                {{list.title}}
                            </option>
                        </select>
                    </div>
                    <p>
                      {{preparedItem}}
                    </p>
                </div>
                <div class="modal-footer">
                  <button class="btn btn-md btn-primary modal-close-button" v-on:click="close">
                    Cancel
                  </button>
                  <button class="btn btn-md btn-danger" v-on:click="removeItem">Delete</button>
                  <button class="btn btn-md btn-success" v-on:click="unarchive">Unarchive</button>
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
    if (this.$localStorage.get('lists')) {
      this.lists = JSON.parse(this.$localStorage.get('lists'))
    }
    console.log(this.lists)
  },
  data() {
    return {
      archive: [],
      preparedItem: {},
      lists: {},
      showModal: false,
      toName: ''
    }
  },
  methods: {
    prepareItem(item) {
      this.preparedItem = item
      this.showModal = true
    },
    unarchive() {
      this.removeItem()
      console.log(this.toName)
      this.lists[this.toName].items.push(this.preparedItem)
      console.log(this.lists)
      this.$localStorage.set('lists', JSON.stringify(this.lists))
      this.close()
      this.toName = ''
    },
    removeItem() {
      let index = this.archive.indexOf(this.preparedItem)
      this.archive.splice(index, 1)
      this.$localStorage.set('archive', JSON.stringify(this.archive))
      this.close()
    },
    close() {
      this.showModal = false
    }
  }
}
</script>
<style>
.archive {
  margin-top: 1em;
}
</style>
