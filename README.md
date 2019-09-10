What is it
----------

Library for implement Yandex Checkout functionality on React Native environment.

![v1](./.github/v1.gif)

Example
-------

Usage
=====

```ts
import YandexPayment, { Shop, Payment, PaymentToken } from 'react-native-yandex-payment';

const shop: Shop = {
    id: 'SHOP_ID',
    token: 'test_SHOP_TOKEN',
    name: 'Shop name',
    description: 'Shop description',
}
const payment: Payment = {
    amount: 399.99,
    currency: 'RUB', // 'RUB' | 'USD' | 'EUR'
    types: ['BANK_CARD'], // 'YANDEX_MONEY' | 'BANK_CARD' | 'SBERBANK' | 'PAY'. PAY - means Google Pay or Apple Pay
}
const paymentToken: PaymentToken = await YandexPayment.show(shop, payment)
console.warn(paymentToken.token) // payment token
console.warn(paymentToken.type) // payment method type
```

Install
=======

```bash
npm install react-native-yandex-payment --save 
```
or
```bash
yarn add react-native-yandex-payment
```

Android
-------

Add Yandex repository inside `android/build.gradle`
```groovy
allprojects {
    repositories {
      ...
      maven { url 'https://dl.bintray.com/yandex-money/maven' }    
    }
}
```

Enable multidex if needed in `android/app/build.gradle`
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

Add Yandex Client ID in `android/app/build.gradle`
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

If you have a question or need specific feature, feel free to [open an issue](https://github.com/lamantin-group/react-native-yandex-payment/issues/new) or create pull request.