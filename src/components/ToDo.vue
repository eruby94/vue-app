<template>
  <div class='todo container'>
    <item-modal :preparedItem="preparedItem"></item-modal>
    <div class='row'>
      <draggable v-model="lists" :options="{group: 'lists', draggable: '.list-container'}">
        <div class='col-xs-4 list-container' v-for='(list, index) in lists'>
            <div class='col-xs-12 list'>
                <h3 v-if="!isInEdit(index)" v-on:click.prevent="() => enableListEdit(index)">{{list.title}}:</h3>
                <form v-if="isInEdit(index)" v-on:submit.prevent="() => updateTitle(index)">
                  <input class="col-xs-12 title-edit" type="text" name="newTitle" v-model="list.newTitle" v-on:blur="() => updateTitle(index)" v-focus/>
                </form>
                <draggable v-model="list.items" :options="{group:'todos', draggable: '.item'}" class="drag-area">
                  <div v-for='item in list.items' v-on:click='() => prepareItem(index, list.title, item)' class='col-xs-12 item'>
                    {{item}}
                  </div>
                  <form class="col-xs-12 add-item" slot="footer" v-on:submit.prevent="() => add(index)">
                    <input type="text" class="col-xs-12" v-model="list.newItem" placeholder="Add Item..."/>
                  </form>
                </draggable>
            </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import ItemModal from './modals/ItemModal.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'todo',
  computed: {
    lists: {
      get() {
        return this.$store.state.lists
      },
      set(updatedLists) {
        this.$store.commit('setListStore', updatedLists)
      }
    },
    ...mapState(['archive'])
  },
  components: {
    ItemModal,
    draggable
  },
  directives: {
    focus: {
      inserted: function(el) {
        // Focus the element
        el.focus()
      }
    }
  },
  updated() {
    var that = this
    that.$nextTick(function() {
      if (that.archive) {
        that.$localStorage.set('archive', JSON.stringify(that.archive))
      }
      if (that.lists) {
        that.$localStorage.set('lists', JSON.stringify(that.lists))
      }
    })
  },
  data() {
    return {
      preparedItem: {},
      newTitle: ''
    }
  },
  methods: {
    prepareItem(index, title, text) {
      this.newIndex = ''
      this.preparedItem = {
        oldIndex: index,
        text: text,
        title: title
      }
      this.$modal.show('item')
    },
    isInEdit(listIndex) {
      return this.lists[listIndex].isInEdit
    },
    add(listIndex) {
      let listUpdate = {
        newIndex: listIndex,
        item: this.lists[listIndex].newItem
      }
      this.lists[listIndex].newItem = ''
      this.addItem(listUpdate)
    },
    updateTitle(listIndex, oldTitle) {
      let listUpdate = {
        index: listIndex,
        newTitle: this.lists[listIndex].newTitle
      }
      this.updateListTitle(listUpdate)
      this.newTitle = ''
    },
    ...mapMutations(['addItem', 'updateListTitle', 'enableListEdit'])
  }
}
</script>

<style>
.title-edit {
  margin-top: .5em;
  margin-bottom: .16em;
  text-align: center;
  font-weight: 500;
  font-size: 24px;
  padding-top: 2.5px;
  padding-left: 8.5px;
  background-color: #d6d6d6;
  border-color: transparent;
  border-radius: 3px;
  outline: none;
}
</style>
