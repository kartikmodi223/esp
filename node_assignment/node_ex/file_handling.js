
var fs = require('fs');


fs.writeFile('kartik.txt', 'Hello nodejs kartik here!', function (err) {
  if (err) throw err;
  // console.log('Saved!');
});


fs.appendFile('kartik.txt', 'Hello kartik !', function (err) {
  if (err) throw err;
  console.log('Saved!');
});


fs.readFile('kartik.txt', 'utf-8', function (err, kartik) {
  if (err) throw err;
  console.log(kartik) ;
});


fs.unlink('kartik.txt', function (err) {
  if (err) throw err;
  console.log('File deleted!');
});



fs.rename('kartikmodi.txt', 'kartik.txt', function (err) {
  if (err) throw err;
  console.log('File Renamed!');
});


