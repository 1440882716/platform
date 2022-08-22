<template>
  <Header></Header>
  <div></div>
  <Footer style="position: fixed; bottom: 0"></Footer>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"
// import turn from '../../utils/turn.js'
export default defineComponent({
  components: {
    Header,
    Footer,
  },
  setup() {
    const turn: any = require("../../utils/turn.js")

    return {}
  },
})
</script>
<style scoped></style>
