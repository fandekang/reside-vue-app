<template>
  <div>
    <mt-tab-container v-model="active">
        <mt-tab-container-item id="/home">
            <Home></Home>
        </mt-tab-container-item>
        <mt-tab-container-item id="/processing">
            <Processing></Processing>
        </mt-tab-container-item>
        <mt-tab-container-item id="/receive">
            <Receive></Receive>
        </mt-tab-container-item>
        <mt-tab-container-item id="/complete">
            <Complete></Complete>
        </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import Home from "@/components/layout/case/home"
import Processing from "@/components/layout/case/processing"
import Receive from "@/components/layout/case/Receive"
import Complete from "@/components/layout/case/Complete"

export default {
    components: {
        Home,
        Processing,
        Receive,
        Complete
    },
    props: {
        value: String
    },
    data() {
        return {
            active: this.value
        }
    },
    watch: {
        value(val) {
            this.active = val
        }
    }
};
</script>
<style lang="scss" scoped>
</style>
