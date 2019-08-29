const bundle = 'group.lamantin.library'
const libraryName = 'CustomNativeStuff'

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

var fs = require('fs')
console.log(bundle.replaceAll(/\./g, "/"));

function move(oldPath, newPath, callback) {
  fs.rename(oldPath, newPath, function (err) {
      if (err) {
          if (err.code === 'EXDEV') {
              copy();
          } else {
              callback(err);
          }
          return;
      }
      callback();
  });

  function copy() {
      var readStream = fs.createReadStream(oldPath);
      var writeStream = fs.createWriteStream(newPath);

      readStream.on('error', callback);
      writeStream.on('error', callback);

      readStream.on('close', function () {
          fs.unlink(oldPath, callback);
      });

      readStream.pipe(writeStream);
  }
}

function createDir(path, split = '/') {
  let combined = ''
  path.split(split).forEach(part => {
    combined = `${combined}/${part}`
    console.log(combined);
    if (!fs.existsSync(combined)){
      fs.mkdirSync(combined);
    }
  })
}

// rename android specific
const androidPath = "android/src/main/java"
const bundlePath =  bundle.replaceAll(/\./g, "/")
createDir(`${androidPath}/${bundlePath}`)
const androidFiles = fs.readdirSync("android/src/main/java/ru/whalemare/rn/library")
console.log(androidFiles);

// move('android/src/main/java/ru/whalemare/rn/library/LibraryPackage.java', `android/src/main/java/${bundlePath}/LibraryPackage.java`, (error) => {
//   console.log(error);
// })


// fs.rename('android/src/main/java/ru/whalemare/rn/library', `android/src/main/java/${bundle.replaceAll('.', '/')}`, (error, data) => {
//   console.log(error, data);
// })
