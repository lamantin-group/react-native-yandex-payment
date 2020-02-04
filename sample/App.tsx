/* eslint-disable @typescript-eslint/no-use-before-define */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react'
import {
  Alert,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import SheetMenu from 'react-native-sheetmenu'
import YandexPayment, { Currency, PaymentType } from 'react-native-yandex-payment'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { SwitchView } from './SwitchView'
import { config } from './config'

const App = () => {
  const [currency, setCurrency] = useState<Currency>('RUB')
  const [paymentTypesMap, setPayments] = useState<{ [key in PaymentType]: boolean }>({
    BANK_CARD: false,
    PAY: false,
    SBERBANK: false,
    YANDEX_MONEY: false,
    GOOGLE_PAY: false,
  })

  function onSelectCurrency(currency: Currency) {
    setCurrency(currency)
  }

  const onChangePaymentType = (checked: boolean, code: PaymentType) => {
    const payload = { ...paymentTypesMap }
    payload[code] = checked
    setPayments(payload)
  }

  useEffect(() => {
    const invalidConfig = config.id === '000000' || !config.id
    if (invalidConfig) {
      console.warn('You should override sample/config.ts file with creds for your shop')
    }
  }, [config])

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
      <View>
        {Object.entries(paymentTypesMap).map(entry => {
          const type = entry[0] as PaymentType
          const enabled = entry[1]
          return (
            <SwitchView
              key={type}
              title={type}
              style={styles.switch}
              checked={enabled}
              onChanges={checked => {
                onChangePaymentType(checked, type)
              }}
            />
          )
        })}

        <View
          style={{
            backgroundColor: '#fff',
            paddingVertical: 16,
            marginVertical: 16,
            paddingHorizontal: 16,
          }}>
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => {
              new SheetMenu({
                title: 'Select currency:',
                actions: [
                  {
                    title: 'RUB',
                    onPress: () => onSelectCurrency('RUB'),
                  },
                  {
                    title: 'EUR',
                    onPress: () => onSelectCurrency('EUR'),
                  },
                  {
                    title: 'USD',
                    onPress: () => onSelectCurrency('USD'),
                  },
                ],
              }).show()
            }}>
            <Text style={{ flexGrow: 1 }}>Currency</Text>
            <Text>{currency}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <Text style={{marginTop: 45, color: "#000"}}>{JSON.stringify(Object.values(this.state.paymentTypes).filter(it => it !== null))}</Text> */}

      <Button
        title="YandexPayment.show()"
        onPress={async () => {
          const types = Object.keys(
            Object.entries(paymentTypesMap).filter((type, enabled) => enabled)
          ) as PaymentType[]
          const result = await YandexPayment.show(
            {
              id: config.id,
              token: config.token,
              name: 'React shop',
              description: `Buy on ${Platform.OS} ${Platform.Version}`,
            },
            {
              amount: 1.01,
              currency: currency,
              types: types,
            }
          )
          Alert.alert(JSON.stringify(result))
        }}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  switch: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    marginVertical: 1,
    paddingHorizontal: 16,
  },
})

export default App
