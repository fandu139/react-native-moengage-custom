package com.moengage.react

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.moengage.core.internal.logger.Logger
import com.moengage.inapp.model.MoEInAppCampaign
import com.moengage.plugin.base.ARGUMENT_PAYLOAD
import com.moengage.plugin.base.inAppCampaignToJson
import com.moengage.plugin.base.model.PushPayload
import com.moengage.plugin.base.model.PushToken
import com.moengage.plugin.base.pushPayloadToJson
import com.moengage.plugin.base.pushTokenToJson

/**
 * @author Umang Chamaria
 * Date: 2020/07/29
 */
class PayloadGenerator {

    private val tag = "${MODULE_TAG}PayloadGenerator"

    fun pushPayloadToWriteableMap(payload: PushPayload): WritableMap {
        val map = Arguments.createMap()
        val pushJson = pushPayloadToJson(payload)
        Logger.v("$tag pushPayloadToWriteableMap() : $pushJson")
        map.putString(ARGUMENT_PAYLOAD, pushJson.toString())
        return map
    }

    fun inAppCampaignToWriteableMap(inAppCampaign: MoEInAppCampaign): WritableMap {
        val map = Arguments.createMap()
        val inAppJson = inAppCampaignToJson(inAppCampaign)
        Logger.v("$tag inAppCampaignToWriteableMap() : $inAppJson")
        map.putString(ARGUMENT_PAYLOAD, inAppJson.toString())
        return map
    }

    fun tokenToWriteableMap(pushToken: PushToken) : WritableMap{
        val map = Arguments.createMap()
        val tokenJson = pushTokenToJson(pushToken)
        Logger.v("$tag tokenToWriteableMap() : $tokenJson")
        map.putString(ARGUMENT_PAYLOAD, tokenJson.toString())
        return map
    }
}