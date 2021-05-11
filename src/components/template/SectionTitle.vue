<template>
  <div class="container">
    <h1 class="title">{{ title }}</h1>
    <div class="line"></div>
  </div>
</template>

<style scoped>
.container{
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
}

.title {
  min-width: fit-content;
}

.line {
  height: 1px;
  background: black;
  width: 100%;
  font-size: x-small;
  margin-left: 20px;
  margin-right: 20px
}
</style>

<script>
export default {
  name : 'station-card',
  props:{
      title: {
          type: String,
          required : true
      }
  }
}
</script>