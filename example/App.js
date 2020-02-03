/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import YandexPayment from 'react-native-payment'
import SheetMenu from 'react-native-sheetmenu'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import config from './config'
import SwitchView from './SwitchView'

const Button = props => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        alignContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        alignSelf: 'center',
        ...props.style,
      }}
      onPress={props.onPress}>
      <Text style={{ textAlign: 'center' }}>{props.text}</Text>
    </TouchableOpacity>
  )
}

class App extends Component {
  state = {
    paymentTypes: {
      BANK_CARD: null,
      PAY: null,
      SBERBANK: null,
      YANDEX_MONEY: null,
    },
    currency: 'RUB',
  }

  changePaymentType = (checked, code) => {
    const paymentTypes = this.state.paymentTypes
    paymentTypes[code] = checked ? code : null
    this.setState({ paymentTypes })
  }

  onSelectCurrency = currency => {
    this.setState({
      currency: currency,
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View>
            <SwitchView
              title="BANK_CARD"
              style={{
                backgroundColor: '#fff',
                paddingVertical: 8,
                marginVertical: 1,
                paddingHorizontal: 16,
              }}
              checked={!!this.state.paymentTypes['BANK_CARD']}
              onChanges={checked => {
                this.changePaymentType(checked, 'BANK_CARD')
              }}
            />

            <SwitchView
              title="PAY"
              style={{
                backgroundColor: '#fff',
                paddingVertical: 8,
                marginVertical: 1,
                paddingHorizontal: 16,
              }}
              checked={!!this.state.paymentTypes['PAY']}
              onChanges={checked => {
                this.changePaymentType(checked, 'PAY')
              }}
            />

            <SwitchView
              title="SBERBANK"
              style={{
                backgroundColor: '#fff',
                paddingVertical: 8,
                marginVertical: 1,
                paddingHorizontal: 16,
              }}
              checked={!!this.state.paymentTypes['SBERBANK']}
              onChanges={checked => {
                this.changePaymentType(checked, 'SBERBANK')
              }}
            />

            <SwitchView
              title="YANDEX_MONEY"
              style={{
                backgroundColor: '#fff',
                paddingVertical: 8,
                marginVertical: 1,
                paddingHorizontal: 16,
              }}
              checked={!!this.state.paymentTypes['YANDEX_MONEY']}
              onChanges={checked => {
                this.changePaymentType(checked, 'YANDEX_MONEY')
              }}
            />

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
                        onPress: () => this.onSelectCurrency('RUB'),
                      },
                      {
                        title: 'EUR',
                        onPress: () => this.onSelectCurrency('EUR'),
                      },
                      {
                        title: 'USD',
                        onPress: () => this.onSelectCurrency('USD'),
                      },
                    ],
                  }).show()
                }}>
                <Text style={{ flexGrow: 1 }}>Currency</Text>
                <Text>{this.state.currency}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* <Text style={{marginTop: 45, color: "#000"}}>{JSON.stringify(Object.values(this.state.paymentTypes).filter(it => it !== null))}</Text> */}

          <Button
            style={{
              marginTop: 100,
              backgroundColor: '#ffcc00',
              borderRadius: 8,
            }}
            text="YandexPayment.show()"
            onPress={async () => {
              const result = await YandexPayment.show(
                {
                  id: config.id,
                  token: config.token,
                  name: 'React shop',
                  description: `Buy on ${Platform.OS} ${Platform.Version}`,
                },
                {
                  amount: 1.01,
                  currency: this.state.currency,
                  types: Object.values(this.state.paymentTypes).filter(it => it !== null),
                }
              )
              alert(JSON.stringify(result))
              console.warn(JSON.stringify(result))
            }}
          />
        </ScrollView>
      </View>
    )
  }
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
})

export default App
