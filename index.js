
import { NativeModules } from 'react-native';

const { NativeLibrary } = NativeModules;

export default class MyLibrary {
  async static getValue() {
    const result = await NativeLibrary.getValue()
    console.log("getValue = ", result)
    return result
  }

  async static getParams() {
    const result = await NativeLibrary.getParams()
    console.log("getParams = ", result)
    return result
  }
}
