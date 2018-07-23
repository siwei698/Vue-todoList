<template>
  <div class="container" > <!--最外层容器-->
    <menus @gotoList="gotoList" ref="menus"></menus>
    <todo :selected="selected" @deleteList="deleteList"></todo>
    <p>
      <router-link to="/page2">to page2</router-link>
    </p>
  </div>
</template>
<script>
  import menus from './menus'
  import todo from './todo'
  export  default {
    components: {
      menus,
      todo
    },
    data () {
      return {
        selected: {},
        deleted: {}
      }
    },
    methods: {
      gotoList(myList) {
        this.selected = myList
      },
      deleteList(myList){
        this.$refs.menus.myDelete(myList)
      }
    }
  };
</script>
<style lang="less" scoped>
</style>