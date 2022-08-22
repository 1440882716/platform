<template>
  <Header></Header>
  <div></div>
  <Footer style="position: fixed; bottom: 0"></Footer>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
import { useRouter } from "vue-router"
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"

export default defineComponent({
  components: {
    Header,
    Footer,
  },
  setup() {
    return {}
  },
})
</script>
<style scoped></style>
