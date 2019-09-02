What is it
----------

Bootstrap template for create libraries in React Native environment

How to use it
-------------

Clone repository in development folder (it is created automatically)
```bash
git clone https://github.com/whalemare/react-native-library.git react-native-library-name
```

Move into cloned folder
```bash
cd react-native-library-name
```

Check that sample started correctly
```bash
npm run start:first
```

Reset git repository
```bash
npm run git:reset
```

Update library info in `package.json` to your own
```json
  "name": "react-native-library", // required for correct work renaming
  "author": "whalemare", // required for correct work renaming
  "version": "1.0.0",
  "description": "Library bootstrap",
  "license": "Apache 2.0",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/whalemare/react-native-library.git"
  }
```

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