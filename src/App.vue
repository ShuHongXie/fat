<template>
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
