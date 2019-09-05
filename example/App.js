/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'

import YandexPayment from 'react-native-payment'
import SwitchView from './SwitchView';
import config from './config'

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
      <Text style={{textAlign: 'center',}}>{props.text}</Text>
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
    }
  }

  changePaymentType = (checked, code) => {
    const paymentTypes = this.state.paymentTypes
    paymentTypes[code] = checked ? code : null
    this.setState({paymentTypes})
  }

  render() {
    console.log(this.state.paymentTypes);
    console.log(this.state.paymentTypes["BANK_CARD"]);
    
    return (
      <View style={{flex: 1}} >
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View>
            <SwitchView 
              title="BANK_CARD" 
              style={{backgroundColor: "#fff", paddingVertical: 8, marginVertical: 1, paddingHorizontal: 16}}
              checked={!!this.state.paymentTypes["BANK_CARD"]}
              onChanges={checked => {
                this.changePaymentType(checked, "BANK_CARD")
              }} 
            />

            <SwitchView title="PAY"
              style={{backgroundColor: "#fff", paddingVertical: 8, marginVertical: 1, paddingHorizontal: 16}}
              checked={!!this.state.paymentTypes["PAY"]}
              onChanges={checked => {
                this.changePaymentType(checked, "PAY")
              }} 
            />

            <SwitchView title="SBERBANK" 
              style={{backgroundColor: "#fff", paddingVertical: 8, marginVertical: 1, paddingHorizontal: 16}}
              checked={!!this.state.paymentTypes["SBERBANK"]}
              onChanges={checked => {
                this.changePaymentType(checked, "SBERBANK")
              }} 
            />

            <SwitchView title="YANDEX_MONEY"
              style={{backgroundColor: "#fff", paddingVertical: 8, marginVertical: 1, paddingHorizontal: 16}}
              checked={!!this.state.paymentTypes["YANDEX_MONEY"]}
              onChanges={checked => {
                this.changePaymentType(checked, "YANDEX_MONEY")
              }} 
            />
          </View>

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
                  amount: 1,
                  currency: 'RUB',
                  types: Object.values(this.state.paymentTypes).filter(it => it !== null),
                }
              )
              alert(JSON.stringify(result))
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
