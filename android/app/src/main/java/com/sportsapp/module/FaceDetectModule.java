package com.sportsapp.module;

/**
 * Created by lixueqing on 2018/4/21.
 */
import android.content.Intent;
import android.text.TextUtils;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.sportsapp.faceDetect.FaceDetectExpActivity;
import com.sportsapp.faceDetect.FaceLivenessExpActivity;
import com.sportsapp.plsteam.SWCameraStreamingActivity;
import com.sportsapp.update.CheckUpdateTask;
import com.sportsapp.update.Constants;


public class FaceDetectModule extends ReactContextBaseJavaModule {
    public FaceDetectModule(ReactApplicationContext reactContext) {
        super(reactContext);

        FaceDetectExpActivity.reactContext=reactContext;
    }

    @Override
    public String getName() {
        return "FaceDetectModule";
    }

    @ReactMethod
    public void faceDetect ()
    {
        Intent intent=new Intent();
        intent.setClass(getCurrentActivity(), FaceDetectExpActivity.class);
        //intent.putExtra("url",url);
        getCurrentActivity().startActivity(intent);
    }


    @ReactMethod
    public void tryPromise(String img,  Promise promise){

        try{
            if(TextUtils.isEmpty(img)){
                promise.reject("0","user name  or psw is empty");
            }
            WritableMap map = Arguments.createMap();
            map.putString("user_id", "success");
            promise.resolve(map);
        }catch(IllegalViewOperationException e){
            promise.reject("2",e.getMessage());
        }
    }
}