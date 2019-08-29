package ru.whalemare.rn.library

import com.facebook.react.bridge.*
import java.util.*

class NativeLibrary(val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  // With this name your library will be available from ReactNative
  override fun getName() = this.javaClass.simpleName

  override fun getConstants(): Map<String, Any> {
    // Export any constants to be used in your native module
    // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
    val constants = HashMap<String, Any>()
    constants["EXAMPLE_CONSTANT"] = "example"

    return constants
  }

  @ReactMethod
  fun exampleMethod() {
    // An example native method that you will expose to React
    // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
  }

  @ReactMethod
  fun getValue(promise: Promise) {
    promise.resolve("A real native value")
  }

  @ReactMethod
  fun getParams(promise: Promise) {
    val map = Arguments.createMap()
    map.putInt("number", 1)
    map.putString("value", "number one")
    promise.resolve(map)
  }

}