package com.sportsapp.protogenesis;

import android.media.MediaPlayer;
import android.net.Uri;
import android.support.annotation.Nullable;
import android.util.Log;
import android.widget.VideoView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.Map;




public class VideoViewManager extends SimpleViewManager<VideoView> {


    //js向native层发布的命令常量
    public static final int COMMAND_PAUSE_ID=1;
    public static final String COMMAND_PAUSE_NAME="pause";
    public static final int COMMAND_START_ID=2;
    public static final String COMMAND_START_NAME="start";

    //初次缓冲长度
    private static final int READY_BUFF = 2000 * 1024;
    //缓冲长度，针对错误重播
    private static final int CACHE_BUFF = 500 * 1024;   //500k

    private boolean isready = false;
    private boolean iserror = false;
    private int errorCnt = 0;
    private int curPosition = 0;
    private long mediaLength = 0;
    private long readSize = 0;

    @Override
    public String getName() {
        return "VideoView";
    }

    @Override
    public Map getExportedCustomDirectEventTypeConstants() {

        MapBuilder.Builder<String, Object> builder = MapBuilder.builder();
        builder.put("onPrepared",MapBuilder.of("registrationName", "onPrepared"));//增加onPrepared回调
        return builder.build();
    }


    @Override
    public Map<String, Integer> getCommandsMap() {
        MapBuilder.Builder<String, Integer> builder = MapBuilder.builder();
        builder.put(COMMAND_PAUSE_NAME,COMMAND_PAUSE_ID);
        builder.put(COMMAND_START_NAME,COMMAND_START_ID);
        return builder.build();
    }

    @Override
    public void receiveCommand(VideoView root, int commandId, @javax.annotation.Nullable ReadableArray args) {
        switch (commandId)
        {
            case COMMAND_PAUSE_ID:
                root.pause();
                break;
            case COMMAND_START_ID:
                root.start();
                break;
        }
    }

    @ReactProp(name = "url")
    public void setUrl(VideoView videoView, @Nullable String url) {
        videoView.setVideoURI(Uri.parse(url));
        //videoView.start();
    }


    @Override
    protected VideoView createViewInstance(ThemedReactContext reactContext) {

        RCTVideoView video=new RCTVideoView(reactContext);
        return  video;
    }

    @Override
    public void onDropViewInstance(VideoView view) {
        super.onDropViewInstance(view);
        view.stopPlayback();

    }


    static class RCTVideoView extends VideoView implements LifecycleEventListener ,
            MediaPlayer.OnPreparedListener,
            MediaPlayer.OnCompletionListener,
            MediaPlayer.OnErrorListener{

        public RCTVideoView(ThemedReactContext reactContext) {
            super(reactContext);
            reactContext.addLifecycleEventListener(this);
            setOnPreparedListener(this);
            setOnCompletionListener(this);
            setOnErrorListener(this);
        }

        @Override
        public void onCompletion(MediaPlayer mp) {

        }

        @Override
        public boolean onError(MediaPlayer mp, int what, int extra) {
            return false;
        }

        @Override
        public void onPrepared(MediaPlayer mp) {
             int duration=mp.getDuration();
             Log.v("VideoView",duration+"");
            WritableMap data= Arguments.createMap();
            data.putInt("duration",duration);
            ReactContext mContext=(ReactContext) getContext();
            mContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                    getId(),//native和js两个视图会依据getId()而关联在一起
                    "onPrepared",//事件名称
                    data   //事件参量
            );
        }

        @Override
        public void onHostResume() {
            Log.v("RCTVideoView","onHostResume");
        }

        @Override
        public void onHostPause() {
            Log.v("RCTVideoView","onHostPause");
        }

        @Override
        public void onHostDestroy() {
            Log.v("RCTVideoView","onHostDestroy");
        }
    }

}
