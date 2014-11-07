var dragDrop = require('drag-drop/buffer');
var id3v2 = require('id3v2-parser');
var BufferList = require('bl');

var parser = new id3v2();

dragDrop('body', function(files) {
  var bl = new BufferList();
  bl.append(files[0])
  bl.pipe(parser);
});

parser.on('data', function(tag) {
  console.log(tag);
});