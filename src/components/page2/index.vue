<template>
    <div id="wrapper">
        <p id="jump">
          <router-link to="/">to page1</router-link>
        </p>
        <top @addItemEmit="addItem"></top>
        <bottom :itemData="itemData"></bottom>
    </div>
</template>

<script>
import top from '@/components/page2/top.vue'
import bottom from '@/components/page2/bottom.vue'
export default {
  name: 'index',
  components: {
    top,
    bottom
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      itemData: ''
    }
  },
  methods: {
    addItem: function (message) {
      this.itemData = message
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html{
    background-color: rgb(249, 249, 249);
  }
  #wrapper {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: left;
  color: #2c3e50;
  }
  #jump{
    float: right;
    margin: 0 20px 10px 0;
  }
</style>
