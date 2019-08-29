const bundle = 'group.lamantin.library'
const libraryName = 'CustomNativeStuff'
const replace = require('./lib/replace-in-file')

String.prototype.replaceAll = function(search, replacement) {
  const target = this
  return target.replace(new RegExp(search, 'g'), replacement)
}

const fs = require('fs')

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

function move(oldPath, newPath, callback) {
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

// rename android specific
const androidSrcFolder = 'android/src/main/java/ru/whalemare/rn/library'
const androidSrcNewFoled = `android/src/main/java/${bundle.replaceAll(/\./g, '/')}/`
createDir(androidSrcNewFoled)
const androidFiles = fs.readdirSync(androidSrcFolder)

const files = []
androidFiles.forEach(fileName => {
  const from = `${androidSrcFolder}/${fileName}`
  const to = `${androidSrcNewFoled}${fileName}`
  files.push(to)
  move(from, to)
})

const options = {
  files: files,
  from: 'ru.whalemare.rn.library',
  to: bundle,
}
replace(options)

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
