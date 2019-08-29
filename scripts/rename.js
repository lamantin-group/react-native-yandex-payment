const bundle = 'group.lamantin.library'
const libraryName = 'CustomNativeStuff'

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

// rename android specific
createDir(`android/src/main/java/${bundle.replaceAll(/\./g, '/')}/`)


// console.log(bundle.replaceAll(/\./g, '/'))

// function move(oldPath, newPath, callback) {
//   fs.rename(oldPath, newPath, function(err) {
//     if (err) {
//       if (err.code === 'EXDEV') {
//         copy()
//       } else {
//         callback(err)
//       }
//       return
//     }
//     callback()
//   })

//   function copy() {
//     let readStream = fs.createReadStream(oldPath)
//     let writeStream = fs.createWriteStream(newPath)

//     readStream.on('error', callback)
//     writeStream.on('error', callback)

//     readStream.on('close', function() {
//       fs.unlink(oldPath, callback)
//     })

//     readStream.pipe(writeStream)
//   }
// }

// const androidPath = 'android/src/main/java'
// const bundlePath = bundle.replaceAll(/\./g, '/')
// createDir(`${androidPath}/${bundlePath}`)
// const androidFiles = fs.readdirSync('android/src/main/java/ru/whalemare/rn/library')
// console.log(androidFiles)

// move('android/src/main/java/ru/whalemare/rn/library/LibraryPackage.java', `android/src/main/java/${bundlePath}/LibraryPackage.java`, (error) => {
//   console.log(error);
// })

// fs.rename('android/src/main/java/ru/whalemare/rn/library', `android/src/main/java/${bundle.replaceAll('.', '/')}`, (error, data) => {
//   console.log(error, data);
// })
