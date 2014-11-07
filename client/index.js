var dragDrop = require('drag-drop/buffer');
var id3v2 = require('id3v2-parser');
var BufferList = require('bl');
var nonAscii = require('non-ascii');

dragDrop('body', function(files) {
  var parser = new id3v2();

  parser.on('data', function(tag) {
    console.log(tag);

    // album art
    //
    // make sure `Blob` is available and also ensure that the mime type is ascii
    // because for some reason some of my music's mime types aren't ascii
    if (tag.type === 'APIC' && typeof Blob !== 'undefined' &&
        !nonAscii.test(tag.value.mime)) {
      var blob = new Blob([tag.value.data], {type: tag.value.mime});
      var url = URL.createObjectURL(blob);
      var img = document.getElementById('albumart');
      img.src = url;

      // release the object URL on-load since it is no longer needed once the
      // image has been loaded.
      img.onload = function() {
        URL.revokeObjectURL(this.src);
      }
    }
  });

  var bl = new BufferList();

  bl.append(files[0]);
  bl.pipe(parser);
});