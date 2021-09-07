package com.moengage.react

import android.content.Context
import com.moengage.core.MoEngage
import com.moengage.core.internal.logger.Logger
import com.moengage.core.internal.model.IntegrationMeta
import com.moengage.plugin.base.PluginInitializer.initialize


/**
 * @author Umang Chamaria
 * Date: 2019-12-03
 */
object MoEInitializer {
    private const val tag = "${MODULE_TAG}MoEInitializer"

    fun initialize(context: Context, builder: MoEngage.Builder) {
        try {
            Logger.v("$tag initialize() : Will try to initialize the sdk.")
            initialize(context, builder, true)
        } catch (e: Exception) {
            Logger.e("$tag initialize() : ", e)
        }
    }

    fun initialize(context: Context, builder: MoEngage.Builder, isSdkEnabled: Boolean) {
        try {
            Logger.v("$tag initialize() : Initialising MoEngage SDK.")
            initialize(
                context, builder,
                IntegrationMeta(INTEGRATION_TYPE, BuildConfig.MOENGAGE_REACT_LIBRARY_VERSION),
                isSdkEnabled
            )
            Logger.v("$tag initialize() : Initialising MoEngage SDK.")
        } catch (e: Exception) {
            Logger.e("$tag initialize() : ", e)
        }
    }
}