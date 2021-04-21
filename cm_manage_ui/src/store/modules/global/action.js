import {login} from '@/api/login';
import {getUnitByGuid, getManagerById} from '@/api/user';
import {setLocal} from '@/utils/handleCache';
import {setToken} from '@/utils/auth'

export const actions = {
     
   // 用户登录
   LOGIN({commit}, userInfo){
      const {account, password} = userInfo;
      return new Promise((resolve, reject) => {
         login({account, password})
         .then(res => {
            if(res.message == '身份验证通过'){
               resolve("TokenPass");
            }else{
               setToken(res.data.token)
               setLocal('role', res.data.role)
               let {account, belong, role} = res.data;
               resolve({account, belong, role});
            }
            
         })
         .catch(err => {
            reject(err);
         })
      })
   },

   // 获取登陆者及个体用户信息
   GET_INFO({commit}, idList){
      const {account, belong, role} = idList;
      const tableName = role == 'ht' ? 'host' : role == 'cm' ? 'community' : 'admin';
      if(tableName != 'admin'){
         return new Promise((resolve,reject) => {
            getUnitByGuid({guid: belong, tableName: tableName})
            .then(res => {
               setLocal('unitInfo', JSON.stringify(res.data))
               if(res.data.cm_account == account || res.data.ht_account == account){
                  setLocal('userInfo', JSON.stringify(res.data))
                  resolve(res);
               }else{
                  const userTable = role == 'ht' ? 'ht_employees' : 'cm_manager';
                  getManagerById({account: account, tableName: userTable}).then(res => {
                     setLocal('userInfo', JSON.stringify(res.data))
                  })
                  resolve(res);
               }
            })
            .catch(err => {
               reject(err);
            })
         })
      }else{
         return new Promise((resolve,reject) => {
            getManagerById({account: account, tableName: tableName})
            .then(res => {
               setLocal('unitInfo', JSON.stringify(res.data));
               setLocal('userInfo', JSON.stringify(res.data));
               resolve(res);
            })
            .catch(err => {
               reject(err);
            })
         })
      }
      
   }
}

export default actions