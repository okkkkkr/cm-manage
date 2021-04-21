import mutations from './mutation'
import actions from './action'
import {getToken} from '@/utils/auth'
import {getLocal} from '@/utils/handleCache'

const state = {
    // role: getLocal('role'),
    // token: getToken(),
    // userInfo: JSON.parse(getLocal('userInfo')),
    // unitInfo: JSON.parse(getLocal('unitInfo')),
    cm_limit:{},
    ht_limit:{},
    ad_limit:{},
}

mutations,
actions

export default {namespaced: true, state, mutations, actions}