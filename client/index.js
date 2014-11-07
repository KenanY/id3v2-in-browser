var dragDrop = require('drag-drop/buffer');
var id3v2 = require('id3v2-parser');
var BufferList = require('bl');
var encode = require('base-64').encode;

dragDrop('body', function(files) {
  var parser = new id3v2();

  parser.on('data', function(tag) {
    console.log(tag);

    // album art
    if (tag.type === 'APIC') {
      var src64 = encode(String.fromCharCode.apply(null, tag.value.data));
      document.getElementById('albumart').src = 'data:' + tag.value.mime +
        ';base64,' + src64;
    }
  });

  var bl = new BufferList();

  bl.append(files[0]);
  bl.pipe(parser);
});