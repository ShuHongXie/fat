<!--
 * @Author: shuhongxie
 * @Date: 2021-02-17 21:19:41
 * @LastEditors: shuhongxie
 * @LastEditTime: 2021-02-24 14:34:20
 * @FilePath: /fat-ui/src/App.vue
-->
<template>
  <div>123</div>
  <router-view />
</template>

<style lang="scss">
  #app,
  html,
  body {
    width: 100%;
    height: 100%;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
