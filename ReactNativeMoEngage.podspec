require 'json'
package = JSON.parse(File.read('package.json'))

Pod::Spec.new do |s|
  s.name                = "ReactNativeMoEngage"
  s.version             = package["version"]
  s.description         = package["description"]
  s.summary             = <<-DESC
                            A React Native plugin for implementation of MoEngage-iOS-SDK.
                          DESC
  s.homepage            = "https://www.moengage.com"
  s.license             = package['license']
  s.authors             = "MoEngage Inc."
  s.source              = {:file => './' }
  s.platform            = :ios, "10.0"
  s.source_files        = 'iOS/MoEReactBridge/**/*.{h,m}'
  s.dependency          'React'
  s.dependency          'MoEPluginBase','>= 2.0.2','< 2.1.0'

  s.prepare_command = <<-CMD
    echo // Generated file, do not edit > iOS/MoEReactBridge/MOReactPluginInfo.h
    echo "#define MO_REACT_PLUGIN_VERSION @\\"#{package["version"]}\\"" >> iOS/MoEReactBridge/MOReactPluginInfo.h
  CMD
end
