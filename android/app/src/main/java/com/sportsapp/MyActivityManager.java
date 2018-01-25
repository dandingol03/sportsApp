package com.sportsapp;

/**
 * Created by youli on 2017/11/27.
 */


import android.app.Activity;

import java.util.ArrayList;
import java.util.List;

public class MyActivityManager {

    private static List<Activity> activityList = new ArrayList<Activity>();
    private static MyActivityManager instance;

    public static MyActivityManager getInstance() {
        if (instance == null) {
            instance = new MyActivityManager();
        }
        return instance;
    }

    /**
     * 添加 Activity 到列表
     *
     * @param activity activity
     */
    public static void addActivity(Activity activity) {
        if (activityList == null) {
            activityList = new ArrayList<Activity>();
        }
        activityList.add(activity);
    }

    /**
     * 获取界面数量
     *
     * @return activity size
     */
    public static int getActivitySize() {
        if (activityList != null) {
            return activityList.size();
        }
        return 0;
    }

    /**
     * 获取当前 Activity - 堆栈中最后一个压入的
     *
     * @return current Activity
     */
    public static Activity getCurrentActivity() {
           if (activityList != null && activityList.size() > 0) {
            Activity activity = activityList.get(activityList.size() - 1);
            return activity;
        }
        return null;
    }

    /**
     * 获取指定类名的 Activity
     *
     * @param cls 指定的类
     * @return Activity
     */
    public static Activity getActivity(Class<?> cls) {
        if (activityList == null) {
            return null;
        }
        for (Activity activity : activityList) {
            if (activity.getClass().equals(cls)) {
                return activity;
            }
        }
        return null;
    }

    /**
     * 结束指定的 Activity
     *
     * @param activity Activity
     */
    public static void removeActivity(Activity activity) {
        if (activity != null) {
            activityList.remove(activity);
        }
    }

    /**
     * 结束指定类名的 Activity
     *
     * @param cls 指定的类
     */
    public static void removeActivity(Class<?> cls) {
        if (activityList == null) {
            return;
        }
        for (Activity activity : activityList) {
            if (activity.getClass().equals(cls)) {
                activityList.remove(activity);
            }
        }
    }

    /**
     * 结束所有Activity
     */
    public static void finishAllActivity() {
        if (activityList == null) {
            return;
        }
        int size = activityList.size();
        for (int i = 0; i < size; i++) {
            if (null != activityList.get(i)) {
                activityList.get(i).finish();
            }
        }
        activityList.clear();
    }

    /**
     * 结束其他所有的Activity
     *
     * @param activity 不需要销毁的Activity
     */
    public static void finishOtherAllActivity(Activity activity) {
        if (activityList == null) {
            return;
        }
        for (int i = 0, size = activityList.size(); i < size; i++) {
            if (activity != activityList.get(i)) {
                activityList.get(i).finish();
                activityList.remove(i);
            }
        }
    }

}