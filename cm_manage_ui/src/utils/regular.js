class regular {
    mobile(data){
        return /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(data)
    }
    
    fixedPhone(data){
        return /^((d{3,4})|d{3,4}-|s)?d{7,14}$/.test(data)
    }

    email(data){
        return /^(\w+\.?)*\w+@(?:\w+\.)\w+$/.test(data)
    }

    IDCard(data){
        return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(data)
    }
}

export default regular
