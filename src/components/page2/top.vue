<template>
<div class="wrapper">
  <p>添加任务：</p>
  <input type="text" v-model="message" placeholder="请输入新的待办事项" v-on:keyup.enter="addItem">
</div>
</template>

<script>
export default {
  name: 'top',
  data () {
    return {
      message: ''
    }
  },
  methods: {
    addItem: function () {
      if (this.message) {
        this.$emit('addItemEmit', this.message)
        this.message = ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper{
    position: relative;
    width: 40%;
    min-width: 500px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  p{
    font-weight: bold;
  }
  input{
    margin-top: -20px;
    width: 100%;
    height: 30px;
  }
</style>
