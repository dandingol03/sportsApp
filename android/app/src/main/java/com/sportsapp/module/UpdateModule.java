package com.sportsapp.module;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.sportsapp.update.CheckUpdateTask;
import com.sportsapp.update.Constants;


public class UpdateModule extends ReactContextBaseJavaModule {
    public UpdateModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "UpdateAndroidModule";
    }

    @ReactMethod
    public void check() {
        new CheckUpdateTask(getReactApplicationContext(), Constants.TYPE_NOTIFICATION, false).execute();
    }
}
