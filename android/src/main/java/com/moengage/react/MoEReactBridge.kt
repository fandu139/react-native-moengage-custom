package com.moengage.react

import android.content.Context
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.moe.pushlibrary.MoEHelper
import com.moengage.core.internal.MoEConstants
import com.moengage.core.internal.logger.Logger
import com.moengage.plugin.base.PluginHelper

/**
 * @author Umang Chamaria
 */
class MoEReactBridge(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val tag = "${MODULE_TAG}MoEReactBridge"

    private val context: Context = reactContext.applicationContext
    private val pluginHelper = PluginHelper()

    override fun getName(): String {
        return "MoEReactBridge"
    }

    @ReactMethod
    fun setAppStatus(payload: String) {
        try {
            Logger.v("$tag setAppStatus() : Payload: $payload")
            pluginHelper.setAppStatus(context, payload)
        } catch (e: Exception) {
            Logger.e("$tag setAppStatus() : ", e)
        }
    }

    @ReactMethod
    fun trackEvent(payload: String) {
        try {
            Logger.v("$tag trackEvent() : Payload: $payload")
            pluginHelper.trackEvent(context, payload)
        } catch (e: Exception) {
            Logger.e("$tag trackEvent() : ", e)
        }
    }

    @ReactMethod
    fun setUserAttribute(payload: String) {
        try {
            Logger.v("$tag setUserAttribute() : Payload: $payload")
            pluginHelper.setUserAttribute(context, payload)
        } catch (e: Exception) {
            Logger.e("$tag setUserAttribute() : ", e)
        }
    }

    @ReactMethod
    fun logout() {
        try {
            Logger.v("$tag logout() : ")
            MoEHelper.getInstance(context).logoutUser()
        } catch (e: Exception) {
            Logger.e("$tag logout() : ", e)
        }
    }

    @ReactMethod
    fun enableLogs() {
        try {
            Logger.v("$tag enableLogs() : ")
            pluginHelper.enableSDKLogs()
        } catch (e: Exception) {
            Logger.e("$tag enableLogs() : ", e)
        }
    }

    @ReactMethod
    fun setAlias(payload: String) {
        try {
            Logger.v("$tag setAlias() : Payload: $payload")
            pluginHelper.setAlias(context, payload)
        } catch (e: Exception) {
            Logger.e("$tag setAlias() : ", e)
        }
    }

    @ReactMethod
    fun setAppContext(payload: String) {
        try {
            Logger.v("$tag setAppContext() : Payload: $payload")
            pluginHelper.setAppContext(context, payload)
        } catch (e: Exception) {
            Logger.e("$tag setAppContext() : ", e)
        }
    }

    @ReactMethod
    fun resetAppContext() {
        try {
            Logger.v("$tag resetAppContext() : ")
            pluginHelper.resetAppContext(context)
        } catch (e: Exception) {
            Logger.e("$tag resetAppContext() : ", e)
        }
    }

    @ReactMethod
    fun showInApp() {
        try {
            Logger.v("$tag showInApp() : Will attempt to show in-app.")
            pluginHelper.showInApp(context)
        } catch (e: Exception) {
            Logger.e("$tag showInApp() : ", e)
        }
    }

    @ReactMethod
    fun getSelfHandledInApp() {
        try {
            Logger.v("$tag getSelfHandledInApp() : Will try to fetch self-handled in-app")
            pluginHelper.getSelfHandledInApp(context)
        } catch (e: Exception) {
            Logger.e("$tag getSelfHandledInApp() : ", e)
        }
    }

    @ReactMethod
    fun passPushToken(payload: String) {
        try {
            Logger.v("$tag passPushToken() : Payload: $payload")
            pluginHelper.passPushToken(context, payload)
        } catch (e: Exception) {
            Logger.e("$tag passPushToken() : ", e)
        }
    }

    @ReactMethod
    fun passPushPayload(payload: String) {
        try {
            Logger.v("$tag passPushPayload() : Payload: $payload")
            pluginHelper.passPushPayload(context, payload)
        } catch (e: Exception) {
            Logger.e("$tag passPushPayload() : ", e)
        }
    }

    @ReactMethod
    override fun initialize() {
        try {
            Logger.v("$tag initialize() ")
            pluginHelper.initialize()
        } catch (e: Exception) {
            Logger.e("$tag initialize() : ", e)
        }
    }

    @ReactMethod
    fun selfHandledCallback(payload: String) {
        try {
            Logger.v("$tag selfHandledCallback() : $payload")
            pluginHelper.selfHandledCallback(context, payload)
        } catch (e: Exception) {
            Logger.e("$tag selfHandledCallback() : ", e)
        }
    }

    @ReactMethod
    fun optOutTracking(payload: String) {
        try {
            pluginHelper.optOutTracking(context, payload)
        } catch (e: Exception) {
            Logger.e("$tag optOutTracking() : ", e)
        }
    }

    @ReactMethod
    fun validateSdkVersion(promise: Promise) {
        Logger.v("$tag validateSdkVersion() : Validating version")
        if (MoEConstants.LIB_VERSION > 12000) {
            Logger.e("$tag validateSdkVersion() : invalid version")
            promise.reject("error", "Use SDK version 11.x.xx")
        } else {
            Logger.v("$tag validateSdkVersion() : valid version")
            promise.resolve("valid version");
        }
    }

    @ReactMethod
    fun updateSdkState(payload: String) {
        try {
            Logger.v("$tag updateSdkState() : $payload")
            pluginHelper.storeFeatureStatus(context, payload)
        } catch (e: Exception) {
            Logger.e("$tag updateSdkState() : ", e)
        }
    }


    init {
        pluginHelper.setEventCallback(EventEmitterImpl(reactContext))
    }
}