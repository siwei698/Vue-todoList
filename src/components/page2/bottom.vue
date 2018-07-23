<template>
  <div class="wrapper">
    <span>{{uncomplete}}个任务未完成</span>
    <ul class="top">
      <li :class="{filter_all: visibility == 'all'}" @click="visibility = 'all'">所有任务</li>
      <li :class="{filter_completed: visibility == 'completed'}" @click="visibility = 'completed'">已完成的任务</li>
      <li :class="{filter_unCompleted: visibility == 'unCompleted'}" @click="visibility = 'unCompleted'">未完成的任务</li>
    </ul>
    <p>任务列表：</p>
    <p class="nolisttip" v-show="!items.length" >还没有添加任何任务</p>
    <ul class="list" v-show="items.length">
      <li v-for="item in filterItems" v-bind:key=item.id>
        <div class="view" :class="{preventClick: item.isComplete == true}" @dblclick="editorTodo(item)">
          <input type="checkbox" class="myCheckBox" v-model="item.isComplete"/>
          <label :class="{finished: item.isComplete}">
            <div class="noedit" v-show="item != editorTodos">
              {{item.title}}
              <span class="action">
                <span @click="editorTodo(item)" v-show="item.isComplete == false">编辑</span>
                <span @click="myDelete(item)">删除</span>
              </span>
            </div>
            <div class="edit" v-show="item == editorTodos">
              <input
                  type="text"
                  class="editInput"
                  v-model=item.title
                  @keyup.enter="editorEnd(item)"
                  @keyup.esc="editorCancel(item)"
              />
              <span class="cancel" @click="editorCancel(item)">取消</span>
            </div>
          </label>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
var store = {
  save (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  fetch (key) {
    return JSON.parse(window.localStorage.getItem(key)) || []
  }
}
var list = store.fetch('storeData')
export default {
  name: 'bottom',
  props: ['itemData'],
  data () {
    return {
      items: list,
      beforeTitle: '',
      editorTodos: '',
      visibility: 'all'
    }
  },
  computed: {
    uncomplete: function () {
      return this.items.filter(item => {
        return !item.isComplete
      }).length
    },
    filterItems: function () {
      var filter = {
        all: function (items) {
          return items
        },
        completed: function (items) {
          return items.filter(item => {
            return item.isComplete
          })
        },
        unCompleted: function (items) {
          return items.filter(item => {
            return !item.isComplete
          })
        }
      }
      return filter[this.visibility] ? filter[this.visibility](this.items) : this.items
    }
  },
  methods: {
    myDelete: function (item) {
      var index = this.items.indexOf(item)
      this.items.splice(index, 1)
    },
    editorTodo: function (item) {
      this.beforeTitle = item.title
      this.editorTodos = item
    },
    editorEnd: function (item) {
      this.editorTodos = ''
    },
    editorCancel: function (item) {
      item.title = this.beforeTitle
      this.beforeTitle = ''
      this.editorTodos = ''
    }
  },
  watch: {
    itemData: function () {
      if (this.itemData) {
        this.items.push({title: this.itemData, isComplete: false, type: 'default'})
      }
    },
    items: {
      handler: function () {
        store.save('storeData', this.items)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  .wrapper{
    position: relative;
    width: 40%;
    min-width: 500px;
    left: 50%;
    transform: translate(-50%, 0);
    margin-top: 10px;
  }
  span{
    font-size: 12px;
    margin-left: 10px;
    color: red;
  }
  p{
    font-weight: bold;
  }
  ul.top{
    float: right;
    margin-top: 0px;
  }
  ul.top li{
    display: inline;
    font-size: 12px;
    margin-left: 10px;
  }
  ul.list{
    list-style: none;
    padding-left: 0;
  }
  ul.list li{
    width: 100%;
    height: 50px;
    background-color: white;
    border-bottom: 1px solid rgb(240, 240, 240);
    line-height: 50px;
    padding-left: 10px;
    box-sizing: border-box;
  }
  .finished{
    text-decoration: line-through;
    color:rgb(200, 200, 200);
  }
  .nolisttip{
    width: 100%;
    height: 40px;
    background-color: white;
    line-height: 40px;
    padding-left: 10px;
    box-sizing: border-box;
  }
  .myCheckBox{
    pointer-events: all;
  }
  .action{
    float: right;
    margin-right: 10px;
  }
  .action span{
    font-size: 12px;
    color: grey;
    margin-left: 5px;
    pointer-events: all;
  }
  .noedit{
    display: inline;
  }
  .edit{
    display: inline-block;
  }
  .edit input{
    font-size: 14px;
  }
  .edit .cancel{
    color: rgb(200, 200, 200);
    margin-left: 5px;
  }
  .editInput{
    width: 416px;
    height: 25px;
  }
  .filter_all{
    color: orange;
    font-weight: bold;
  }
  .filter_completed{
    color: green;
    font-weight: bold;
  }
  .filter_unCompleted{
    color: red;
    font-weight: bold;
  }
  .preventClick{
    pointer-events: none;
  }
</style>
