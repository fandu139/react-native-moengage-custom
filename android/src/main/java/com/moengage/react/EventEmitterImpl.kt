package com.moengage.react

import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.moengage.core.internal.logger.Logger
import com.moengage.plugin.base.EventEmitter
import com.moengage.plugin.base.model.*


/**
 * @author Umang Chamaria
 * Date: 28/07/20
 */
class EventEmitterImpl(private val reactContext: ReactContext) : EventEmitter {
    private val tag = "${MODULE_TAG}EventEmitterImpl"

    override fun emit(event: Event) {
        try {
            Logger.v("$tag emit() : $event")
            when(event){
                is InAppEvent -> emitInAppEvent(event)
                is PushEvent -> emitPushEvent(event)
                is TokenEvent -> emitPushToken(event)
            }
        } catch (e: Exception) {
            Logger.e("$tag emit() : ", e)
        }
    }

    private fun emitInAppEvent(inAppEvent: InAppEvent){
        Logger.v("$tag emitInAppEvent() : Event $inAppEvent")
        val eventName = eventMapping[inAppEvent.eventType] ?: return
        val payload = PayloadGenerator().inAppCampaignToWriteableMap(inAppEvent.inAppCampaign)
        emit(eventName, payload)
    }

    private fun emitPushEvent(pushEvent: PushEvent){
        Logger.v("$tag emitPushEvent() : Event $pushEvent")
        val eventName = eventMapping[pushEvent.eventType] ?: return
        val payload = PayloadGenerator().pushPayloadToWriteableMap(pushEvent.payload)
        emit(eventName, payload)
    }

    private fun emitPushToken(tokenEvent: TokenEvent) {
        Logger.v("$tag emitPushToken() : Event $tokenEvent")
        val eventName = eventMapping[tokenEvent.eventType] ?: return
        val payload = PayloadGenerator().tokenToWriteableMap(tokenEvent.pushToken)
        emit(eventName, payload)
    }

    private fun emit(eventName: String, params: WritableMap) {
        try {
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
        } catch (e: Exception) {
            Logger.e("$tag emit() : ", e)
        }
    }
}

val eventMapping = mapOf<EventType, String>(
    EventType.PUSH_CLICKED to "MoEPushClicked",
    EventType.INAPP_SHOWN to "MoEInAppCampaignShown",
    EventType.INAPP_NAVIGATION to "MoEInAppCampaignClicked",
    EventType.INAPP_CLOSED to "MoEInAppCampaignDismissed",
    EventType.INAPP_CUSTOM_ACTION to "MoEInAppCampaignCustomAction",
    EventType.INAPP_SELF_HANDLED_AVAILABLE to "MoEInAppCampaignSelfHandled",
    EventType.PUSH_TOKEN_GENERATED to "MoEPushTokenGenerated"
)
