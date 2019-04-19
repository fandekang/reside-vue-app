export default {
    state: {
        createCaseData: null
    },
    mutations: {
        changeCreateCaseData(state, options) {
            state.createCaseData = options.createCaseData
        }
    }
}
