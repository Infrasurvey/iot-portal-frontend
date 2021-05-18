<template>
  <div class="breadcrumb">
    <ul>
      <li
        v-for="(breadcrumb, idx) in breadcrumbList"
        :key="idx"
        @click="routeTo(idx)"
        :class="{'linked': !!breadcrumb.link}">{{ breadcrumb.name }}</li>
    </ul>
  </div>
</template>

<style scoped>
.breadcrumb {
  display: inline-block;
  width: fit-content;
  height: fit-content;
  text-align: center;
  vertical-align: middle;
  margin-left: 15px;
  color: white;
}

.breadcrumb > ul {
  list-style-type: none;
  margin-block-start: 0;
  padding-inline-start: 0;
}

.breadcrumb > ul > li {
  float: left;
}

.breadcrumb > ul > li:not(:last-child)::after {
  content: ' > ';
  margin: 0 .5em;
  cursor: default;
}
</style>

<script>
export default {
  name: 'breadcrumb',
  data () {
    return {
      breadcrumbList: []
    }
  },
  mounted () { this.updateList() },
  watch: { '$route' () { this.updateList() } },
  methods: {
    routeTo (pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link) this.$router.push(this.breadcrumbList[pRouteTo].link)
    },
    updateList () { this.breadcrumbList = this.$route.meta.breadcrumb }
  }
}
</script>
