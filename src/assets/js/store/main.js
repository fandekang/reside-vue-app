export default {
    state: {
        tabBarActive: '/home', // 底部导航栏的高亮项
        fullPopUpVisible: false,
        materialDialogTitle: '', // 收件材料框标题
        materialDialogVisible: false, // 收件材料框显示
        materialURL: '', // 收件材料列表url
        materialEdit: false, // 收件材料是否修改
        materialItemID: '', // 惦记的菜单列表项id
        topMenuPopVisible: false, // 顶部导航栏响应的弹出框的是否关闭
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
        },
        toggleTopMenuPopVisible(state, option) {
            state.topMenuPopVisible = option.topMenuPopVisible
        },
        changeMaterialURL(state, option) {
            state.materialURL = option.materialURL
        },
        toggleMaterialEdit(state, option) {
            state.materialEdit = option.materialEdit
        },
        changeMaterialItemID(state, option) {
            state.materialItemID = option.materialItemID
        }
    }
}
