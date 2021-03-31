import Cookies from 'js-cookie'

/**
 * 浏览器storage缓存处理
 * @param name 名称
 * @param value 参数
 */

 // sessionStorage
export const setSession = (name, value) => {
    if (process.client) {
      window.sessionStorage.setItem(name, value)
    }
}

export const getSession = (name) => {
    if (process.client) {
        let value = window.sessionStorage.getItem(name)
        return JSON.stringify(value)
    }
}

export const removeSession = (name) => {
    if (process.client) {
        window.sessionStorage.removeItem(name)
    }
}

export const clearSession = () => {
    if (process.client) {
        window.sessionStorage.clear()
    }
}

// localStorage
export const setLocal = (name, value) => {
    if (process.client) {
      window.localStorage.setItem(name, value)
    }
}

export const getLocal = (name) => {
    if (process.client) {
        let value = window.localStorage.getItem(name)
        return JSON.stringify(value)
    }
}

export const removeLocal = (name) => {
    if (process.client) {
        window.localStorage.removeItem(name)
    }
}

export const clearLocal = () => {
    if (process.client) {
        window.localStorage.clear()
    }
}

// cookies
export const getCookies = (name) => {
    return Cookies.get(name)
 }
  
export const removeCookies = (name) => {
    return Cookies.remove(name)
}

export const clearCookie = () => {
    var date=new Date();
    date.setTime(date.getTime()-10000);
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i =  keys.length; i--;)
          document.cookie=keys[i]+"=0; expire="+date.toGMTString()+"; path=/";
    }
}