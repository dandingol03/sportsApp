
import Config from '../../config'
import Proxy from '../utils/Proxy'

import {

    ON_PAYMENT_UPDATE,
    SET_PAYMENT,

} from '../constants/MyProfitConstants'

//设置教练列表
export let setPayment=(payments,money,qunhuodong,huaxiao,money1,money2,tel1,tel2,wx1,wx2)=>{
    return {
        type:SET_PAYMENT,
        payments:payments,
        total:money,
        qunhuodong:qunhuodong,
        huaxiao:huaxiao,
        total1:money1,
        total2:money2,
        tel1:tel1,
        tel2:tel2,
        wx1:wx1,
        wx2:wx2
    }
}



//拉取教练
export let fetchPayment=(clubId)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();
            var payments=null;
            var total=0;
            Proxy.postes({
                url: Config.server + '/func/pay/getPayFormListOfToday1',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    clubId
                }
            }).then((json)=>{
                payments=json.data;
                payments.map((payment,i)=>{
                    total+=payment.payment;
                })

                resolve({re:1,data:payments})

            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        })
    }
}


export let onPaymentUpdate=(payments)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:ON_PAYMENT_UPDATE,
            payload:{
                payments
            }
        })
    }
}
