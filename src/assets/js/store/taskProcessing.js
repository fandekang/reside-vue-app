export default {
    state: {
        processingURL: process.env.ROOT_API + "task/getTaskList?actType=2"
    },
    mutations: {
        processingURLReload(state) {
            state.processingURL = process.env.ROOT_API + "task/getTaskList?actType=2&dt=" + Math.random()
        }
    }
}
