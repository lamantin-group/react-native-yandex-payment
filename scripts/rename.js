const bundle = 'group.lamantin.library'
const libraryName = 'react-native-custom-name'
const libraryNativeName = 'CustomNativeStuff'

const path = require('path')
const fs = require('fs')
const replace = require('./replace-in-file')

const files = [
  'example/.babelrc',
  'example/android/app/build.gradle',
  'example/android/settings.gradle',
  'example/App.js',
  'example/ios/Podfile',
  'package-lock.json',
  'package.json',
]

// todo: need refactor
replace(
  {
    files: files,
    from: 'react-native-library',
    to: libraryName,
  },
  () => {
    replace({
      files: files,
      from: 'react-native-library',
      to: libraryName,
    })
  }
)
