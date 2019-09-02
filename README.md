What is it
----------

Library for implement Yandex Checkout functionality on ReactNative environment.

How to use it
-------------

Add Yandex repository inside `android/build.gradle`
```groovy
allprojects {
    repositories {
      ...
      maven { url 'https://dl.bintray.com/yandex-money/maven' }    
    }
}
```

Enable multidex if needed in `android/app/build.gradle`.
```diff
android {
    defaultConfig {
        ...
+        multiDexEnabled true
    }
}

dependencies {
    ...
+    implementation 'androidx.multidex:multidex:2.0.1'
}
```

Add Yandex Client ID
```groovy
android {
    defaultConfig {
        manifestPlaceholders = [YANDEX_CLIENT_ID: "ваш id приложения в Яндекс.Паспорте"]
    }
}
```

List of [https://www.ibm.com/support/knowledgecenter/en/SSZLC2_7.0.0/com.ibm.commerce.payments.developer.doc/refs/rpylerl2mst97.htm](currency codes)


Roadmap
--------

Common
- [x] VSCode full support
- [x] ESLint for library
- [ ] ESLint for example
- [x] Working example folder
- [x] Hot library replacement in development 
- [x] Autocomplete for library support in example folder
- [x] TypeScript for library development
- [x] Rename library possibility
- [ ] Hot reloading for example (working only reloading)
- [ ] CI for checking build status

Android features
- [x] Android min api 16
- [x] Android target api 29
- [x] Kotlin 1.3.50 support
- [x] Gradle 5.4.1
- [x] Added most popular library-source repositories (jcenter, google, jitpack)
- [ ] Fix local.properties to work on independent environment
- [ ] Extensions mapper to language types from ReactNative types

iOS features
- [ ] Swift support for library ios module
- [ ] iOS library module support