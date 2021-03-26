<template>
  <div>
    <button @click="getRover">Get rover</button>
    <ul>
      <li v-for="r in rover" :key="r.id">
          {{ r.id }}
      </li>
    </ul>
    <p class="error" v-if="errorMessage"></p>
  </div>
</template>

<script>
import API from '../http-constants'
export default {
  name: 'GetRover',
  data () {
    return {
      rover: '',
      errorMessage: ''
    }
  },
  methods: {
    getRover: function () {
      API.get('/api/device/rover/all')
        .then(response => {
          //console.log(response.data)
          this.rover =response.data
        })
        .catch(e => {
          this.errorMessage = e
        })
    }
  }
}
</script>
