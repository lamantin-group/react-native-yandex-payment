What is it
----------

Library for implement Yandex Checkout functionality on React Native environment.

![v1](./.github/v1.gif)

Example
-------

```js
import YandexPayment from 'react-native-payment'

const { token, type } = await YandexPayment.show({
    id: "SHOP_ID",
    token: "live_or_test_SHOP_TOKEN",
    name: 'React shop',
    description: `Your wondering shop description`,
}, {
    amount: 1.01,
    currency: "RUB",
    types: ["BANK_CARD", "SBERBANK"],
})
sendTokenAndPaymentTypeToBackend(token, type)
```

Setup
-----

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

Roadmap
--------

- [x] React Native 60.5
- [x] Types embedded
- [x] Android support
- [x] iOS support
- [x] Bank card, Yandex Wallet, Sberbank, Google Pay and Apple Pay payment types support (you should properly configure your shop for this)
- [ ] Change color scheme
- [ ] Configure test environment