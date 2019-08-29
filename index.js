/* eslint-disable import/no-unresolved */
import { NativeModules } from 'react-native'

const { NativeLibrary } = NativeModules

export default class MyLibrary {
  static async getValue() {
    const result = await NativeLibrary.getValue()
    console.log('getValue = ', result)
    return `${result}`
  }

  static async getParams() {
    const result = await NativeLibrary.getParams()
    console.log('getParams = ', result)
    return result
  }
}
