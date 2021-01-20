<template>
  <div class="hello">
    <h1>{{ modelValue }}</h1>
    <button @click="test">测试modelValue</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'HelloWorld',
    props: {
      msg: String,
      modelValue: String
    },
    setup(props, { emit }) {
      const test = () => {
        emit('update:modelValue', '123')
      }
      return {
        test
      }
    }
  })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
