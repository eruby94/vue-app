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
                  <button class="btn btn-md btn-primary modal-close-button" v-on:click="toggleModal">
                    Cancel
                  </button>
                  <button class="btn btn-md btn-danger" v-on:click="removeItem">Delete</button>
                  <button class="btn btn-md btn-success" v-on:click="unarchive" :disabled="!toName">Unarchive</button>
                </div>
              </div>
            </div>
          </div>
        </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'todo',
  computed: {
    ...mapState(['lists', 'showModal', 'archive'])
  },
  data() {
    return {
      preparedItem: {},
      toName: ''
    }
  },
  methods: {
    prepareItem(item) {
      this.toName = ''
      this.preparedItem = item
      this.toggleModal()
    },
    unarchive() {
      this.removeItem(this.preparedItem)
      let listUpdate = {
        item: this.preparedItem,
        destination: this.toName
      }
      this.addItem(listUpdate)
      if (this.lists) {
        this.$localStorage.set('lists', JSON.stringify(this.lists))
      }
    },
    removeItem() {
      this.deleteItem(this.preparedItem)
      if (this.archive) {
        this.$localStorage.set('archive', JSON.stringify(this.archive))
      }
    },
    ...mapMutations(['toggleModal', 'addItem', 'deleteItem'])
  }
}
</script>
<style>
.archive {
  margin-top: 1em;
}
</style>
