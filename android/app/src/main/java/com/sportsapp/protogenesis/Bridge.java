package com.sportsapp.protogenesis;

import android.content.Intent;
import android.os.Environment;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.sportsapp.plsteam.SWCameraStreamingActivity;


public class Bridge extends ReactContextBaseJavaModule {

    static int invokeCount=0;

    public Bridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Bridge";
    }

    @ReactMethod
    public static void newThread()
    {
        new Thread(new Runnable() {
            @Override
            public void run() {
                Log.v("bridge",invokeCount+++"");
            }
        }).start();
    }

    @ReactMethod
    public void invokeBufferingActivity()
    {
        String url = "http://192.168.0.199:3000/downloadBufferedMp4";
        String remoteUrl="http://139.129.96.231:3000/downloadBufferedMp4";
        Intent intent = new Intent();
        intent.setClass(getCurrentActivity(), BBVideoPlayer.class);
        intent.putExtra("url", remoteUrl);
        intent.putExtra("cache",
                Environment.getExternalStorageDirectory().getAbsolutePath()
                        + "/VideoCache/" + System.currentTimeMillis() + ".mp4");
        getCurrentActivity().startActivity(intent);
    }

    @ReactMethod
    public void raisePLStream(String url)
    {
        Intent intent=new Intent();
        intent.setClass(getCurrentActivity(), SWCameraStreamingActivity.class);
        intent.putExtra("url",url);
        getCurrentActivity().startActivity(intent);
    }

}
