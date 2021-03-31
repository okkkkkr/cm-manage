export const mutations = {

    /**
     * 测试（mutation用途）
     * @func TEST_COMMIT(mutation名)
     */
    TEST_COMMIT(state, value){
        console.log("value");
        console.log("state", state.test_state)
    }
}

export default mutations