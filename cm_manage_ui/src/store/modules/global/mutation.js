export const mutations = {
    // 设定角色
    SET_ROLE: (state ,Role) => {
        state.role = Role
    },

    // 设定社区方权限
    SET_CM_LIMIT: (state ,powerList) => {
        let limit = powerList.split('')
        state.cm_limit = limit;
    },

    // 设定承办方权限
    SET_HT_LIMIT: (state ,powerList) => {
        let limit = powerList.split('')
        state.ht_limit = limit;
    },

    // 设定管理员权限
    SET_AD_LIMIT: (state ,powerList) => {
        let limit = powerList.split('')
        state.ad_limit = limit;
    }
}

export default mutations