
import _ from 'lodash'
var bluebird = require('bluebird');
import Config from '../../config';
import Proxy from '../utils/Proxy'


import {
    UPDATE_MAP_CENTER
} from '../constants/MapConstants';

import {
    Geolocation
} from 'react-native-baidu-map';

export let updateMapCenter=(center)=>{
    return {
        type:UPDATE_MAP_CENTER,
        payload:{
            center
        }
    }
}


export let geocode=(city,address)=>{
    return new Promise((resolve, reject) => {

        Geolocation.geocode(city,address).then((json)=>{
            resolve(json)
        })

    })
}

//本地关键字搜索
export  let localSearch=(center,keyword)=>{
    return (dispatch,getState)=> {
        return new Promise((resolve, reject) => {

            var _center=_.cloneDeep(center);
            _center.latitude=''+_center.latitude;
            _center.longitude=''+_center.longitude;
            Geolocation.localSearchByKeyword(keyword,{lat:_center.latitude,lng:_center.longitude}).then((json)=>{
                if(json.re==1)
                {
                    var statistics={
                        target:json.data.length,
                        count:0,
                        results:[]
                    };
                    var poi2=json.data[4]



                    bluebird.reduce(json.data, ( total,poi,i) => {

                        return geocode(poi.city,poi.address).then(res=>{
                            poi.longitude=res.longitude
                            poi.latitude=res.latitude
                            return i++;
                        });
                    }, 0).then(res => {
                        resolve({
                            re:1,
                            data:json.data
                        })
                    });



                }else{
                    resolve(json);
                }
            }).catch((e)=>{
                reject(e)
            })
        });
    }
}

//获取维护的场馆数据
export let fetchMaintainedVenue=()=>{
    return (dispatch,getState)=> {
        return new Promise((resolve, reject) => {

            var state=getState();
            var accessToken = state.user.accessToken;

            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {
                    'Authorization': "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                },
                body: {
                    request: 'getMaintainedVenue',
                }
            }).then((json)=>{
                resolve(json)

            }).catch((e)=>{
                alert(e);
                reject(e);
            })

        })
    }
}
