const bundle = 'group.lamantin.library'
const libraryName = 'react-native-custom-name'
const libraryNativeName = 'CustomNativeStuff'
const path = require('path')

function replaceAllInString(target, search, replacement) {
  return target.replace(new RegExp(search, 'g'), replacement)
}

const fs = require('fs')
const replace = require('./lib/replace-in-file/types')

function createDir(path, split = '/') {
  const splitted = path.split(split)
  splitted.reduce((combined, next, index) => {
    console.log('path = ', combined)
    if (combined) {
      if (!fs.existsSync(combined)) {
        fs.mkdirSync(combined)
      }
      return `${combined}/${next}`
    }
    return next
  }, '')
}

function move(
  oldPath,
  newPath,
  callback = () => {
    console.log('moved')
  }
) {
  console.log('move from ', oldPath, '; to ', newPath)

  fs.rename(oldPath, newPath, function(err) {
    if (err) {
      if (err.code === 'EXDEV') {
        copy()
      } else {
        callback(err)
      }
      return
    }
    callback()
  })

  function copy() {
    const readStream = fs.createReadStream(oldPath)
    const writeStream = fs.createWriteStream(newPath)

    readStream.on('error', callback)
    writeStream.on('error', callback)

    readStream.on('close', function() {
      fs.unlink(oldPath, callback)
    })

    readStream.pipe(writeStream)
  }
}

/**
 * List all files in a directory recursively in a synchronous fashion
 *
 * @param {String} dir
 * @returns {IterableIterator<String>}
 */
function* walk(dir) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const pathToFile = path.join(dir, file)
    const isDirectory = fs.statSync(pathToFile).isDirectory()
    if (isDirectory) {
      const isNodeModules = pathToFile.includes('node_modules')
      if (!isNodeModules) {
        yield* walk(pathToFile)
      }
    } else {
      yield pathToFile
    }
  }
}

// rename android specific
const androidSrcFolder = 'android/src/main/java/ru/whalemare/rn/library'
const androidSrcNewFoled = `android/src/main/java/${replaceAllInString(bundle, /\./g, '/')}/`
createDir(androidSrcNewFoled)
const androidFiles = fs.readdirSync(androidSrcFolder)

androidFiles.forEach(fileName => {
  const from = `${androidSrcFolder}/${fileName}`
  const to = `${androidSrcNewFoled}${fileName}`
  move(from, to)
})

const absoluteAndroidPath = path.resolve(__dirname, '../android')
const files = []
for (const file of walk(absoluteAndroidPath)) {
  files.push(file)
}
replace({
  files: files,
  from: 'ru.whalemare.rn.library',
  to: bundle,
})

// rename react-native-library
const allFiles = []
for (const file of walk(path.resolve(__dirname, '..'))) {
  allFiles.push(file)
}
replace({
  files: allFiles,
  from: 'react-native-library',
  to: libraryName,
})

// console.log(bundle.replaceAll(/\./g, '/'))

// const androidPath = 'android/src/main/java'
// const bundlePath = bundle.replaceAll(/\./g, '/')
// createDir(`${androidPath}/${bundlePath}`)
// const androidFiles =
// console.log(androidFiles)

// move('android/src/main/java/ru/whalemare/rn/library/LibraryPackage.java', `android/src/main/java/${bundlePath}/LibraryPackage.java`, (error) => {
//   console.log(error);
// })

// fs.rename('android/src/main/java/ru/whalemare/rn/library', `android/src/main/java/${bundle.replaceAll('.', '/')}`, (error, data) => {
//   console.log(error, data);
// })
