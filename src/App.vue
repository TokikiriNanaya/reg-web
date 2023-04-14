<template>
  <div id="app">
    <router-view v-if="isReload"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isReload: true
    }
  },
  methods: {
    reload() {
      this.isReload = false
      this.$nextTick(() => {
        this.isReload = true
      })
    }
  }
}
</script>
<!-- <template>
  <router-view></router-view>
</template> -->

<style>
/* 上下左右居中 */
.reg_flex_center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.a_link:link {
  text-decoration: none;
}

.a_link:visited {
  text-decoration: none;
}

.a_link:hover {
  color: red;
}

ul {
  list-style: none;
}

body {
  margin: 0;
}
</style>
