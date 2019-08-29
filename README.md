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

Update next library info in `package.json` to your own
```json
  "name": "react-native-library",
  "version": "1.0.0",
  "author": "whalemare",
  "description": "Library bootstrap",
  "license": "Apache 2.0",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/whalemare/react-native-library.git"
  }
```

Roadmap
--------

- [x] eslint
- [x] working example folder
- [x] hot library replacement in development 
- [x] kotlin support for library android module
- [ ] swift support for library ios module
- [ ] hot reloading for example (working only reloading)
- [ ] TypeScript for library development
- [ ] ios library module support
- [x] android library module support
- [x] rename js library possibility
- [ ] rename native library possibility
- [ ] fix local.properties to work on independent environment
- [ ] publish to npm