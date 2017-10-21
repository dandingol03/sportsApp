
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
export let fetchPayment=()=>{
    return (dispatch,getState)=>{
        return new Promise((resolve, reject) => {

            var state=getState();

            Proxy.postes({
                url: Config.server + '/func/pay/getPayFormListOfToday',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: {
                }
            }).then((json)=>{
                if(json.re==1){
                    var payments = json.data;
                    var money=0;
                    var money1=0;
                    var money2=0;
                    var tel1=0;
                    var tel2=0;
                    var wx1=0;
                    var wx2=0;
                    var qunhuodong=[];
                    var huaxiao=[];
                    payments.map((payments,i)=>{
                        money+=payments.payment;
                        if(payments.useType=="1"){
                            qunhuodong.push(payments);
                            money1+=payments.payment;
                            if(payments.payType=="1"){
                                tel1+=payments.payment;

                            }
                            if(payments.payType=="2")
                            {
                                wx1+=payments.payment;
                            }


                        }
                        if(payments.useType=="2"){
                            huaxiao.push(payments);
                            money2+=payments.payment;
                            if(payments.payType=="1"){
                                tel2+=payments.payment;

                            }
                            if(payments.payType=="2")
                            {
                                wx2+=payments.payment;
                            }
                        }
                    })
                    money=money+'';
                    s1=money.indexOf(".");
                    str1=money.substring(0,s1);
                    str2=money.substring(s1,s1+3);
                    money=str1+''+str2;
                    dispatch(setPayment(payments,money,qunhuodong,huaxiao,money1,money2,tel1,tel2,wx1,wx2));
                }
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
