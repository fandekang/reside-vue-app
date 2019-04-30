export default {
    state: {
        screeningVisible: false
    },
    mutations: {
        toggleScreeningVisible(state, option) {
            state.screeningVisible = option.screeningVisible
        }
    }
}
