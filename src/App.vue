<template>
  <div id="app">
    <transition name="page_fade" appear> <!--加页面切换动画和初始渲染动画-->
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html{
  background-color: rgb(222, 222, 222);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.page_fade, .appear {
  position: absolute;
  left: 0;
  right: 0;
}
.page_fade-enter-active, .appear-enter-active {
  transition: all 1.5s ease;
}
.page_fade-leave-active .appear-leave-active {
  transition: all .3s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.page_fade-enter, .page_fade-leave-to, .appear-enter, .appear-leave-to
{
  left: 0;
  right: 0;
  transform: translateX(100px);
  opacity: 0;
}
</style>
