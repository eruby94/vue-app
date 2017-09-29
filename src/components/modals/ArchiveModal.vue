<template>
  <modal name="delete">
    <div class="modal-header">
        <h3>Delete Item?</h3>
    </div>
    <div class='modal-body'>
        <div class='form-group'>
            <label for='newIndex'>To:</label>
            <select class='form-control' name='newIndex' v-model='newIndex'>
                <option disabled default value=''>
                    Select a Destination
                </option>
                <option v-for='(list, index) in lists' :value='index'>
                    {{list.title}}
                </option>
            </select>
        </div>
        <p>
          {{preparedItem}}
        </p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-primary modal-close-button" v-on:click="$modal.hide('delete')">
        Cancel
      </button>
      <button class="btn btn-md btn-danger" v-on:click="removeItem">Delete</button>
      <button class="btn btn-md btn-success" v-on:click="unarchive" :disabled="!newIndex">Unarchive</button>
    </div>
  </modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'archive-modal',
  computed: {
    ...mapState(['lists'])
  },
  props: ['preparedItem'],
  data() {
    return {
      newIndex: ''
    }
  },
  methods: {
    unarchive() {
      this.removeItem(this.preparedItem)
      let listUpdate = {
        item: this.preparedItem,
        newIndex: this.newIndex
      }
      this.addItem(listUpdate)
      if (this.lists) {
        this.$localStorage.set('lists', JSON.stringify(this.lists))
      }
    },
    removeItem() {
      this.$modal.hide('delete')
      this.deleteItem(this.preparedItem)
      if (this.archive) {
        this.$localStorage.set('archive', JSON.stringify(this.archive))
      }
    },
    ...mapMutations(['addItem', 'deleteItem'])
  }
}
</script>
