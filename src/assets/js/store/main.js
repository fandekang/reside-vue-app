export default {
    state: {
        tabBarActive: '/home',
        fullPopUpVisible: false,
        materialDialogTitle: '',
        materialDialogVisible: false
    },
    mutations: {
        toggleTabBarActive(state, option) {
            state.tabBarActive = option.tabBarActive
        },
        toggleFullPopUp(state, option) {
            state.fullPopUpVisible = option.fullPopUpVisible
        },
        changeMaterialDialogTitle(state, option) {
            state.materialDialogTitle = option.materialDialogTitle
        },
        toggleMaterialDialogVisible(state, option) {
            state.materialDialogVisible = option.materialDialogVisible
        }
    }
}
