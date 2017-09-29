<template>
  <modal name="item">
    <div class='modal-header'>
        <h3 v-if="preparedItem.title">Move from {{preparedItem.title}}</h3>
        <h3 v-else>Add Item</h3>
    </div>
    <div class='modal-body'>
        <div class='form-group'>
            <label for='newIndex'>To:</label>
            <select class='form-control' name='newIndex' v-model='newIndex'>
                <option disabled default value=''>
                    Select a Destination
                </option>
                <option v-for='(list, index) in lists' v-if='index !== preparedItem.oldIndex' :value='index'>
                    {{list.title}}
                </option>
            </select>
        </div>
        <p>
          {{preparedItem.text}}
        </p>
    </div>
    <div class='modal-footer'>
      <button class='btn btn-md btn-danger btn-left' v-on:click='$modal.hide("item")'>
        Cancel
      </button>
      <button class='btn btn-md btn-primary' v-on:click='localArchiveItem'>
        Archive
      </button>
      <button class='btn btn-md btn-success' v-on:click='move' :disabled="!newIndex">Move</button>
    </div>
  </modal>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  name: 'item-modal',
  props: ['preparedItem'],
  computed: {
    ...mapState(['lists'])
  },
  data() {
    return {
      newIndex: ''
    }
  },
  methods: {
    move() {
      let payload = {
        preparedItem: this.preparedItem,
        newIndex: this.newIndex
      }
      this.moveItem(payload)
      this.$modal.hide('item')
      this.newIndex = ''
    },
    localArchiveItem() {
      this.$modal.hide('item')
      this.extractItem(this.preparedItem)
      this.archiveItem(this.preparedItem.text)
    },
    ...mapMutations(['extractItem', 'archiveItem']),
    ...mapActions(['moveItem'])
  }
}
</script>
