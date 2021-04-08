import api_db from '@/api/unit'

export const actions = {
     
    /**
     * 测试（action用途）
     * @func TEST_AXIOS(action名称)
     */
    TEST_AXIOS: ({commit}) => {
        return new Promise((resolve, reject) => {
            api_db.getList().then(result => {
                commit('TEST_COMMIT', 'test_value');
                resolve('connect_successfully!')   
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }
}

export default actions