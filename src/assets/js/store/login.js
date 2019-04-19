export default {
    state: {
        loginVisible: false
    },
    mutations: {
        toggleLoginVisible(state, option) {
            state.loginVisible = option.loginVisible
        }
    }
}
