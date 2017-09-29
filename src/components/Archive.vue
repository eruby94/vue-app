<template>
  <div class="archive container">
    <archive-modal :preparedItem="preparedItem"></archive-modal>
    <div class="row">
        <div class="col-xs-6 col-xs-offset-3" >
            <div class="col-xs-12 list">
                <h3>Archive:</h3>
                <draggable v-model="archive" :options="{group: 'archive', draggable: '.item'}">
                  <div v-for="item in archive" v-on:click="prepareItem(item)" class="col-xs-12 item">
                    {{item}}
                  </div>
                </draggable>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import ArchiveModal from './modals/ArchiveModal.vue'
export default {
  name: 'archive',
  components: {
    draggable,
    ArchiveModal
  },
  computed: {
    archive: {
      get() {
        return this.$store.state.archive
      },
      set(updatedArchive) {
        this.$store.commit('setArchiveStore', updatedArchive)
      }
    }
  },
  data() {
    return {
      preparedItem: {}
    }
  },
  methods: {
    prepareItem(item) {
      this.newIndex = ''
      this.preparedItem = item
      this.$modal.show('delete')
    }
  }
}
</script>
<style>
.archive {
  margin-top: 1em;
}
</style>
