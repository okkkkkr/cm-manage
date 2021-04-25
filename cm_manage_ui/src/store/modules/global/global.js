import mutations from './mutation'
import actions from './action'
import {getToken} from '@/utils/auth'
import {getLocal} from '@/utils/handleCache'

const state = {
    // role: JSON.parse(getLocal('role')),
    // token: getToken(),
    // userData: JSON.parse(JSON.parse(getLocal('userInfo'))),
    // unitData: JSON.parse(JSON.parse(getLocal('unitInfo'))),
    cm_limit:{},
    ht_limit:{},
    ad_limit:{},
}

mutations,
actions

export default {namespaced: true, state, mutations, actions}